# MCP Google Sheets Server v2.1.0

Complete MCP Server for Google Sheets - 40+ tools for professional sheet management, advanced charts, and enterprise features!

NEW IN V2.1.0 - COMPLETE SHEET MANAGEMENT & ENHANCED CHARTS
-----------------------------------------------------------

- Complete Sheet Management - Create, rename, hide/show, move, duplicate, delete sheets
- Advanced Chart Creation - Create charts with data, from tables, update chart data
- Sheet Information - Get detailed sheet properties, list all sheets
- Professional Formatting - Colors, fonts, borders, conditional formatting
- Data Protection - Validation rules, range protection, access control
- Performance Optimized - Batch operations, efficient API usage
- Enterprise Ready - 40+ tools for professional Google Sheets management

FEATURES
--------

- Read data from Google Sheets with formatting options
- Update data in Google Sheets with input options
- Create new spreadsheets with themes and initial data
- Search spreadsheets by name or content
- Share spreadsheets with specific permissions
- Get comprehensive spreadsheet metadata
- Simple installation - just npm install
- Easy authentication with Service Account

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

COMPLETE TOOL COLLECTION (40+ TOOLS!)
-------------------------------------

Basic Operations
- sheets_get_data - Get data with formatting options
- sheets_update_data - Update data with input options
- sheets_create - Create spreadsheet with theme

Advanced Formatting
- sheets_format_cells - Apply professional formatting
- sheets_conditional_formatting - Set conditional rules
- sheets_merge_cells - Merge cells with options

Enhanced Charts & Visualization
- sheets_create_chart - Create basic charts
- sheets_create_chart_with_data - Create charts with data
- sheets_create_chart_from_table - Create charts from tables
- sheets_update_chart - Update existing charts
- sheets_update_chart_data - Update chart data
- sheets_delete_chart - Delete charts
- sheets_list_charts - List all charts

Complete Sheet Management
- sheets_create_sheet - Create new sheets
- sheets_duplicate_sheet - Duplicate existing sheets
- sheets_delete_sheet - Delete sheets
- sheets_rename_sheet - Rename sheets
- sheets_hide_sheet - Hide sheets from view
- sheets_show_sheet - Show hidden sheets
- sheets_move_sheet - Move sheets to new position
- sheets_get_sheet_info - Get all sheet information
- sheets_get_sheet_properties - Get specific sheet properties

Data Validation & Protection
- sheets_set_data_validation - Set validation rules
- sheets_protect_range - Protect ranges from editing

Advanced Data Operations
- sheets_insert_rows - Insert rows at position
- sheets_insert_columns - Insert columns at position
- sheets_delete_rows - Delete rows from position
- sheets_delete_columns - Delete columns from position

Formula & Calculation
- sheets_set_formula - Set formulas in cells
- sheets_calculate_formula - Calculate formula results

Batch Operations
- sheets_batch_update - Multiple operations in one request
- sheets_batch_get - Get data from multiple ranges

Search & Sharing
- sheets_search - Search spreadsheets
- sheets_share - Share with permissions
- sheets_get_metadata - Get comprehensive metadata

Utility Operations
- sheets_clear_range - Clear content and formatting
- sheets_copy_to - Copy sheets between spreadsheets

ADVANCED USAGE EXAMPLES
-----------------------

Complete Sheet Management Workflow
1. Create spreadsheet with multiple sheets
2. Add data to specific sheets
3. Create professional charts from data
4. Rename and organize sheets
5. Move sheets to desired positions
6. Hide/show sheets as needed

Advanced Chart Management
1. Create charts with custom options
2. Update chart data dynamically
3. List and manage all charts
4. Delete unwanted charts

Sheet Information and Properties
1. Get information about all sheets
2. Check sheet properties and status
3. Manage hidden/visible sheets

ADVANCED SETUP EXAMPLES
------------------------

Create Professional Spreadsheet with Multiple Sheets
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

ADVANTAGES OVER OTHER SOLUTIONS
-------------------------------

- 40+ Advanced Tools - Most comprehensive Google Sheets MCP server
- Complete Sheet Management - Full control over sheets (create, rename, hide, move, delete)
- Enhanced Chart Creation - Create charts with data, from tables, update dynamically
- Professional Formatting - Colors, fonts, borders, conditional formatting
- Data Validation - Set rules and protect sensitive data
- Batch Operations - High-performance multiple operations
- Sheet Information - Get detailed properties and status of all sheets
- Performance Optimized - Efficient API usage and batch processing

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

Now with 40+ Tools for Complete Google Sheets Management!
