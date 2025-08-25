const { spawn } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting MCP Google Sheets test...');

// Đọc environment variables với encoding UTF-16
let envVars = {};
try {
  const envContent = fs.readFileSync('.env', 'utf16le');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      if (value) {
        envVars[key.trim()] = value;
      }
    }
  });
  console.log('✅ Environment variables loaded successfully');
} catch (error) {
  console.log('❌ Error loading .env file:', error.message);
  // Fallback to process.env
  envVars = process.env;
}

// Sử dụng PowerShell để chạy MCP
const mcpProcess = spawn('powershell.exe', [
  '-Command',
  `$env:GOOGLE_SERVICE_ACCOUNT_KEY = '${envVars.GOOGLE_SERVICE_ACCOUNT_KEY}'; npx mcp-google-sheets-server@2.1.2`
], {
  env: { ...process.env, ...envVars },
  stdio: ['pipe', 'pipe', 'pipe']
});

let output = '';
let errorOutput = '';

mcpProcess.stdout.on('data', (data) => {
  const message = data.toString();
  output += message;
  console.log('📤 Output:', message);
});

mcpProcess.stderr.on('data', (data) => {
  const message = data.toString();
  errorOutput += message;
  console.log('❌ Error:', message);
});

mcpProcess.on('close', (code) => {
  console.log(`🔚 MCP process exited with code ${code}`);
  console.log('📋 Final output:', output);
  if (errorOutput) {
    console.log('❌ Final errors:', errorOutput);
  }
});

// Wait for server to start
setTimeout(() => {
  console.log('🔍 Testing MCP Google Sheets...');
  
  // Initialize request
  const initRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: {
        name: "test-client",
        version: "1.0.0"
      }
    }
  };

  console.log('📤 Sending initialize request...');
  mcpProcess.stdin.write(JSON.stringify(initRequest) + '\n');

  // Wait and send list tools request
  setTimeout(() => {
    const listToolsRequest = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list"
    };

    console.log('📤 Sending list tools request...');
    mcpProcess.stdin.write(JSON.stringify(listToolsRequest) + '\n');

    // Wait and get sheet data
    setTimeout(() => {
      const getDataRequest = {
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: {
          name: "sheets_get_data",
          arguments: {
            spreadsheetId: "1erP0PAWwrCDdXrhLgC_KvAJR8qrV6qmRZuYgOjQltVY",
            range: "A1:Z100"
          }
        }
      };

      console.log('📤 Sending get data request for sheet "1erP0PAWwrCDdXrhLgC_KvAJR8qrV6qmRZuYgOjQltVY"...');
      mcpProcess.stdin.write(JSON.stringify(getDataRequest) + '\n');

      // Wait and exit
      setTimeout(() => {
        console.log('🔚 Closing MCP process...');
        mcpProcess.kill();
      }, 3000);

    }, 2000);

  }, 2000);

}, 2000);
