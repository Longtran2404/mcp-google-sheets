#!/bin/bash

# MCP Google Sheets Auto-Install Script for Cursor
# This script automatically installs the MCP Google Sheets server into Cursor

echo "🚀 Installing MCP Google Sheets Server into Cursor..."

# Get the current directory
CURRENT_DIR=$(pwd)
MCP_PATH="$CURRENT_DIR/dist/index.js"

# Check if the built files exist
if [ ! -f "$MCP_PATH" ]; then
    echo "❌ Error: MCP server not built. Please run 'npm run build' first."
    exit 1
fi

# Get Cursor MCP config path
CURSOR_MCP_PATH="$HOME/.cursor/mcp.json"

# Check if Cursor MCP config exists
if [ ! -f "$CURSOR_MCP_PATH" ]; then
    echo "❌ Error: Cursor MCP config not found at $CURSOR_MCP_PATH"
    echo "Please make sure Cursor is installed and has been run at least once."
    exit 1
fi

# Create backup of current config
cp "$CURSOR_MCP_PATH" "$CURSOR_MCP_PATH.backup"
echo "✅ Created backup of current MCP config"

# Check if google-sheets MCP already exists and remove it
if grep -q '"google-sheets"' "$CURSOR_MCP_PATH"; then
    echo "⚠️  Warning: google-sheets MCP already exists. Updating configuration..."
    
    # Remove existing google-sheets configuration (simple approach)
    # This is a basic implementation - for production use, consider using jq
    sed -i '/"google-sheets":/,/}/d' "$CURSOR_MCP_PATH"
    
    # Clean up any trailing commas
    sed -i 's/,\s*}/}/g' "$CURSOR_MCP_PATH"
    sed -i 's/,\s*]/]/g' "$CURSOR_MCP_PATH"
fi

# Add new google-sheets MCP configuration
# Find the last } before the final } and insert our config
sed -i 's/}$/    "google-sheets": {\n      "command": "node",\n      "args": ["'"$MCP_PATH"'"],\n      "env": {\n        "GOOGLE_SERVICE_ACCOUNT_KEY": "YOUR_SERVICE_ACCOUNT_KEY_HERE"\n      }\n    }\n  }/' "$CURSOR_MCP_PATH"

echo "✅ Successfully updated MCP config at $CURSOR_MCP_PATH"

echo ""
echo "🎉 MCP Google Sheets Server installed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Replace 'YOUR_SERVICE_ACCOUNT_KEY_HERE' with your actual Google service account key"
echo "2. Restart Cursor to load the new MCP server"
echo "3. Use Command Palette (Ctrl+Shift+P) and search for 'MCP' to see available commands"
echo ""
echo "🔧 Available tools:"
echo "   - sheets_get_data: Get data from spreadsheet"
echo "   - sheets_update_data: Update data in spreadsheet"
echo "   - sheets_create: Create new spreadsheet"
echo "   - sheets_delete: Delete spreadsheet"
echo "   - sheets_search: Search for spreadsheets"
echo "   - sheets_share: Share spreadsheet with users"
echo "   - And 4 more tools..."
echo ""
echo "📖 For more information, see README.md"
echo ""
echo "💡 If you encounter issues, restore from backup: cp $CURSOR_MCP_PATH.backup $CURSOR_MCP_PATH"
