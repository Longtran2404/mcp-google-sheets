MCP Google Sheets Server v2.0.0
==============================

Advanced MCP Server for Google Sheets - Install directly from npm, access powerful Google Sheets features with AI assistance!

NEW IN V2.0.0 - ADVANCED FEATURES
----------------------------------

- Enhanced Data Operations - Advanced formatting, conditional formatting, data validation
- Chart & Visualization - Create and manage charts (Column, Line, Pie, Bar, Area, Scatter)
- Data Protection - Protect ranges, set validation rules, control access
- Sheet Management - Create, duplicate, delete sheets with advanced options
- Batch Operations - Perform multiple operations in single requests for better performance
- Professional Formatting - Colors, fonts, borders, alignment, merge cells
- Formula Support - Set formulas, calculate results, advanced calculations
- Performance Optimized - Batch operations, efficient API usage

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

COMPLETE TOOL COLLECTION (30+ TOOLS!)
-------------------------------------

Basic Operations
- sheets_get_data - Get data with formatting options
- sheets_update_data - Update data with input options
- sheets_create - Create spreadsheet with theme

Advanced Formatting
- sheets_format_cells - Apply professional formatting
- sheets_conditional_formatting - Set conditional rules
- sheets_merge_cells - Merge cells with options

Charts & Visualization
- sheets_create_chart - Create professional charts
- sheets_update_chart - Update existing charts

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

Sheet Management
- sheets_create_sheet - Create new sheets
- sheets_duplicate_sheet - Duplicate existing sheets
- sheets_delete_sheet - Delete sheets

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

Create Formatted Table with Charts
1. Create spreadsheet
2. Add data
3. Apply formatting
4. Create chart

Batch Operations for Performance
Perform multiple operations in one request for better performance

ADVANCED SETUP EXAMPLES
------------------------

Create Professional Spreadsheet with Formatting
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

- 30+ Advanced Tools - Most comprehensive Google Sheets MCP server
- Professional Formatting - Colors, fonts, borders, conditional formatting
- Chart Creation - 6 chart types with customization options
- Data Validation - Set rules and protect sensitive data
- Batch Operations - High-performance multiple operations
- Sheet Management - Full control over sheets and structure
- Formula Support - Advanced calculations and automation
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

Now with 30+ Advanced Google Sheets Tools!
