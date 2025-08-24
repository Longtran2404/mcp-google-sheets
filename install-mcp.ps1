# MCP Google Sheets Auto-Install Script for Cursor
# This script automatically installs the MCP Google Sheets server into Cursor

Write-Host "🚀 Installing MCP Google Sheets Server into Cursor..." -ForegroundColor Green

# Get the current directory
$currentDir = Get-Location
$mcpPath = Join-Path $currentDir "dist\index.js"

# Check if the built files exist
if (-not (Test-Path $mcpPath)) {
    Write-Host "❌ Error: MCP server not built. Please run 'npm run build' first." -ForegroundColor Red
    exit 1
}

# Get Cursor MCP config path
$cursorMCPPath = "$env:USERPROFILE\.cursor\mcp.json"

# Check if Cursor MCP config exists
if (-not (Test-Path $cursorMCPPath)) {
    Write-Host "❌ Error: Cursor MCP config not found at $cursorMCPPath" -ForegroundColor Red
    Write-Host "Please make sure Cursor is installed and has been run at least once." -ForegroundColor Yellow
    exit 1
}

# Read current MCP config
try {
    $mcpConfig = Get-Content $cursorMCPPath -Raw | ConvertFrom-Json
}
catch {
    Write-Host "❌ Error: Failed to read MCP config. Please check the file format." -ForegroundColor Red
    exit 1
}

# Check if google-sheets MCP already exists
if ($mcpConfig.mcpServers.PSObject.Properties.Name -contains "google-sheets") {
    Write-Host "⚠️  Warning: google-sheets MCP already exists. Updating configuration..." -ForegroundColor Yellow
    
    # Remove existing configuration
    $mcpConfig.mcpServers.PSObject.Properties.Remove("google-sheets")
}

# Add new google-sheets MCP configuration
$googleSheetsConfig = @{
    command = "node"
    args    = @($mcpPath)
    env     = @{
        GOOGLE_SERVICE_ACCOUNT_KEY = "YOUR_SERVICE_ACCOUNT_KEY_HERE"
    }
}

$mcpConfig.mcpServers | Add-Member -MemberType NoteProperty -Name "google-sheets" -Value $googleSheetsConfig

# Write updated config back to file
try {
    $mcpConfig | ConvertTo-Json -Depth 10 | Set-Content $cursorMCPPath -Encoding UTF8
    Write-Host "✅ Successfully updated MCP config at $cursorMCPPath" -ForegroundColor Green
}
catch {
    Write-Host "❌ Error: Failed to write MCP config. Please check file permissions." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 MCP Google Sheets Server installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Replace 'YOUR_SERVICE_ACCOUNT_KEY_HERE' with your actual Google service account key" -ForegroundColor White
Write-Host "2. Restart Cursor to load the new MCP server" -ForegroundColor White
Write-Host "3. Use Command Palette (Ctrl+Shift+P) and search for 'MCP' to see available commands" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Available tools:" -ForegroundColor Cyan
Write-Host "   - sheets_get_data: Get data from spreadsheet" -ForegroundColor White
Write-Host "   - sheets_update_data: Update data in spreadsheet" -ForegroundColor White
Write-Host "   - sheets_create: Create new spreadsheet" -ForegroundColor White
Write-Host "   - sheets_delete: Delete spreadsheet" -ForegroundColor White
Write-Host "   - sheets_search: Search for spreadsheets" -ForegroundColor White
Write-Host "   - sheets_share: Share spreadsheet with users" -ForegroundColor White
Write-Host "   - And 4 more tools..." -ForegroundColor White
Write-Host ""
Write-Host "For more information, see README.md" -ForegroundColor Cyan
