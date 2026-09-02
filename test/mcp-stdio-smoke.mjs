import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const testDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(testDirectory, '..');
const serverEntryPoint = resolve(repositoryRoot, 'dist', 'index.js');

const childEnvironment = Object.fromEntries(
  Object.entries(process.env).filter(
    ([name, value]) => name !== 'GOOGLE_SERVICE_ACCOUNT_KEY' && typeof value === 'string',
  ),
);

const transport = new StdioClientTransport({
  command: process.execPath,
  args: [serverEntryPoint],
  cwd: repositoryRoot,
  env: childEnvironment,
  stderr: 'pipe',
});

let serverStderr = '';
transport.stderr?.on('data', (chunk) => {
  serverStderr += chunk.toString();
});

const client = new Client(
  { name: 'mcp-google-sheets-release-smoke', version: '1.0.0' },
  { capabilities: {} },
);

try {
  await client.connect(transport, { timeout: 10_000 });

  const serverVersion = client.getServerVersion();
  assert.equal(serverVersion?.name, 'mcp-google-sheets-server');
  assert.equal(serverVersion?.version, '2.2.1');

  const { tools } = await client.listTools(undefined, { timeout: 10_000 });
  const toolNames = new Set(tools.map((tool) => tool.name));

  assert.equal(tools.length, 37, `Expected 37 tools, received ${tools.length}`);
  for (const requiredTool of [
    'sheets_get_data',
    'sheets_update_data',
    'sheets_create_sheet',
    'sheets_create_chart_with_data',
    'sheets_batch_update',
  ]) {
    assert.ok(toolNames.has(requiredTool), `Missing required MCP tool: ${requiredTool}`);
  }

  // The previous startup path retried missing credentials in the background and
  // could terminate after three seconds. Prove discovery stays usable past that point.
  await delay(3_250);
  const secondListing = await client.listTools(undefined, { timeout: 10_000 });
  assert.equal(secondListing.tools.length, 37);

  console.log(`MCP stdio smoke passed: ${tools.length} tools listed without Google credentials.`);
} catch (error) {
  if (serverStderr) {
    console.error('Server stderr:\n' + serverStderr);
  }
  throw error;
} finally {
  await client.close();
}
