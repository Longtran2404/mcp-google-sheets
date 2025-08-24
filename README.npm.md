MCP Google Sheets Server
========================

Simple and lightweight MCP Server for Google Sheets - Install directly from npm, just input JSON credentials and use immediately!

FEATURES
--------

* Read data from Google Sheets
* Update data in Google Sheets
* Create new spreadsheets
* Search spreadsheets
* Share spreadsheets
* Get spreadsheet metadata
* Simple installation - just npm install
* Easy authentication with Service Account

QUICK INSTALLATION
------------------

Method 1: Install from npm (Recommended)
npm install -g mcp-google-sheets-server

Method 2: Local installation
npm install mcp-google-sheets-server

Method 3: Use npx (No installation needed)
npx mcp-google-sheets-server

GOOGLE SERVICE ACCOUNT AUTHENTICATION
------------------------------------

Detailed Guide
See GOOGLE_SERVICE_ACCOUNT_SETUP.md for step-by-step instructions on how to get Google Service Account Key.

Quick Configuration
{
  "mcpServers": {
    "mcp-google-sheets": {
      "command": "npx",
      "args": ["mcp-google-sheets-server"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_KEY": "your-service-account-json"
      }
    }
  }
}

AVAILABLE TOOLS
---------------

1. sheets_get_data
   Description: Get data from Google Sheets
   Parameters: spreadsheetId, range
   Example: sheets_get_data("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms", "A1:C10")

2. sheets_update_data
   Description: Update data in Google Sheets
   Parameters: spreadsheetId, range, values
   Example: sheets_update_data("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms", "A1", [["Hello", "World"]])

3. sheets_create
   Description: Create new Google Sheets
   Parameters: title
   Example: sheets_create("My New Spreadsheet")

4. sheets_search
   Description: Search Google Sheets
   Parameters: query
   Example: sheets_search("budget 2024")

5. sheets_share
   Description: Share Google Sheets
   Parameters: spreadsheetId, email, role
   Example: sheets_share("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms", "user@example.com", "writer")

6. sheets_get_metadata
   Description: Get Google Sheets metadata
   Parameters: spreadsheetId
   Example: sheets_get_metadata("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms")

ADVANCED SETUP
--------------

Method 1: Use npx (Recommended)

1. Update ~/.cursor/mcp.json:
   {
     "mcpServers": {
       "mcp-google-sheets": {
         "command": "npx",
         "args": ["mcp-google-sheets-server"],
         "env": {
           "GOOGLE_SERVICE_ACCOUNT_KEY": "your-service-account-json"
         }
       }
     }
   }

2. Restart Cursor

Method 2: Global installation

1. Install package:
   npm install -g mcp-google-sheets-server

2. Update ~/.cursor/mcp.json:
   {
     "mcpServers": {
       "mcp-google-sheets": {
         "command": "mcp-google-sheets-server",
         "env": {
           "GOOGLE_SERVICE_ACCOUNT_KEY": "your-service-account-json"
         }
       }
     }
   }

Method 3: Local installation

1. Clone and build:
   git clone https://github.com/Longtran2404/mcp-google-sheets.git
   cd mcp-google-sheets
   npm install
   npm run build

2. Update ~/.cursor/mcp.json:
   {
     "mcpServers": {
       "mcp-google-sheets": {
         "command": "node",
         "args": ["/path/to/mcp-google-sheets/dist/index.js"],
         "env": {
           "GOOGLE_SERVICE_ACCOUNT_KEY": "your-service-account-json"
         }
       }
     }
   }

TROUBLESHOOTING
---------------

Common errors:

1. "GOOGLE_SERVICE_ACCOUNT_KEY not found"
   - Check environment variable in mcp.json
   - Ensure JSON is properly escaped

2. "Permission denied"
   - Check service account access permissions
   - Ensure Google Sheets are shared with service account

3. "Invalid credentials"
   - Check service account JSON file
   - Ensure Google Sheets API is enabled

USAGE EXAMPLES
--------------

In Cursor with MCP:

// Get data from Google Sheets
const data = await mcp.callTool('sheets_get_data', {
  spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  range: 'A1:C10'
});

// Update data
await mcp.callTool('sheets_update_data', {
  spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  range: 'A1',
  values: [['New Data', 'Updated']]
});

ADVANTAGES OVER OTHER SOLUTIONS
-------------------------------

* Easy installation: npm install mcp-google-sheets-server
* No build needed: Automatically builds when publishing
* Built-in integration: Works immediately with Cursor MCP
* Light and fast: Only needs credentials, no complex setup
* Full support: All basic Google Sheets API functionality
* TypeScript: Safe code and easy to maintain

LICENSE
-------

MIT License - See LICENSE file for details.

CONTRIBUTING
------------

All contributions are welcome! Please:

1. Fork the project
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

SUPPORT
-------

If you encounter issues:

1. Check Issues first
2. Create a new issue if none exists
3. Describe the problem in detail and how to reproduce it

If this project is helpful, please give it a star!
