# 🚀 MCP Google Sheets Server v2.2.1

> **Official TaskKit MCP Server for Google Sheets** - 37 tools for sheet management, formatting, charts, and automation.

This is an official open-source package in the [TaskKit](https://www.taskkit.vn) ecosystem, maintained by [Trần Minh Long](https://www.taskkit.vn/tran-minh-long).

[TaskKit open-source catalog](https://www.taskkit.vn/ma-nguon-mo) · [npm](https://www.npmjs.com/package/mcp-google-sheets-server) · [GitHub](https://github.com/Longtran2404/mcp-google-sheets)

Version 2.2.1 aligns the package with TaskKit's canonical identity and updates the MCP and Google API dependencies to patched supported releases.

**Runtime requirement:** Node.js 20 or newer.

[![npm version](https://img.shields.io/npm/v/mcp-google-sheets-server.svg)](https://www.npmjs.com/package/mcp-google-sheets-server)
[![npm downloads](https://img.shields.io/npm/dm/mcp-google-sheets-server.svg)](https://www.npmjs.com/package/mcp-google-sheets-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## ✨ Complete Sheet Management & Enhanced Charts

- 📋 **Complete Sheet Management** - Create, rename, hide/show, move, duplicate, delete sheets
- 📊 **Advanced Chart Creation** - Create charts with data, from tables, update chart data
- 🔍 **Sheet Information** - Get detailed sheet properties, list all sheets
- 🎨 **Professional Formatting** - Colors, fonts, borders, conditional formatting
- 🔒 **Data Protection** - Validation rules, range protection, access control
- ⚡ **Performance Optimized** - Batch operations, efficient API usage
- 🚀 **Enterprise Ready** - 37 tools for professional Google Sheets management

---

## 🚀 Quick Installation

Install [Node.js 20 or newer](https://nodejs.org/) before using the package.

### **Method 1: Install from npm (Recommended)**

```bash
npm install -g mcp-google-sheets-server
```

### **Method 2: Local installation**

```bash
npm install mcp-google-sheets-server
```

### **Method 3: Use npx (No installation needed)**

```bash
npx mcp-google-sheets-server
```

---

## 🔐 Google Service Account Authentication

### **Detailed Guide**

See the [Google Service Account setup guide](https://github.com/Longtran2404/mcp-google-sheets/blob/master/GOOGLE_SERVICE_ACCOUNT_SETUP.md) for step-by-step instructions on how to get a Google Service Account key.

### **Quick Configuration**

```json
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
```

---

## 📋 **Complete Tool Collection (37 Tools)**

### **🔧 Basic Operations**

| Tool                     | Description                      | Parameters                                                            |
| ------------------------ | -------------------------------- | --------------------------------------------------------------------- |
| **`sheets_get_data`**    | Get data with formatting options | `spreadsheetId`, `range`, `valueRenderOption`, `dateTimeRenderOption` |
| **`sheets_update_data`** | Update data with input options   | `spreadsheetId`, `range`, `values`, `valueInputOption`                |
| **`sheets_create`**      | Create spreadsheet with theme    | `title`, `initialData`, `theme`                                       |

### **🎨 Advanced Formatting**

| Tool                                | Description                   | Parameters                                                                                                     |
| ----------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **`sheets_format_cells`**           | Apply professional formatting | `spreadsheetId`, `range`, `backgroundColor`, `textColor`, `fontSize`, `bold`, `italic`, `alignment`, `borders` |
| **`sheets_conditional_formatting`** | Set conditional rules         | `spreadsheetId`, `range`, `ruleType`, `value`, `colors`                                                        |
| **`sheets_merge_cells`**            | Merge cells with options      | `spreadsheetId`, `range`, `mergeType`                                                                          |

### **📈 Enhanced Charts & Visualization**

| Tool                                 | Description               | Parameters                                                                     |
| ------------------------------------ | ------------------------- | ------------------------------------------------------------------------------ |
| **`sheets_create_chart`**            | Create basic charts       | `spreadsheetId`, `chartType`, `dataRange`, `title`, `position`                 |
| **`sheets_create_chart_with_data`**  | Create charts with data   | `spreadsheetId`, `chartType`, `dataRange`, `title`, `position`, `chartOptions` |
| **`sheets_create_chart_from_table`** | Create charts from tables | `spreadsheetId`, `chartType`, `tableRange`, `title`, `useFirstRowAsLabels`     |
| **`sheets_update_chart`**            | Update existing charts    | `spreadsheetId`, `chartId`, `title`, `dataRange`                               |
| **`sheets_update_chart_data`**       | Update chart data         | `spreadsheetId`, `chartId`, `newDataRange`, `updateTitle`                      |
| **`sheets_delete_chart`**            | Delete charts             | `spreadsheetId`, `chartId`                                                     |
| **`sheets_list_charts`**             | List all charts           | `spreadsheetId`                                                                |

### **📋 Complete Sheet Management**

| Tool                              | Description                   | Parameters                             |
| --------------------------------- | ----------------------------- | -------------------------------------- |
| **`sheets_create_sheet`**         | Create new sheets             | `spreadsheetId`, `title`, `index`      |
| **`sheets_duplicate_sheet`**      | Duplicate existing sheets     | `spreadsheetId`, `sheetId`, `newTitle` |
| **`sheets_delete_sheet`**         | Delete sheets                 | `spreadsheetId`, `sheetId`             |
| **`sheets_rename_sheet`**         | Rename sheets                 | `spreadsheetId`, `sheetId`, `newTitle` |
| **`sheets_hide_sheet`**           | Hide sheets from view         | `spreadsheetId`, `sheetId`             |
| **`sheets_show_sheet`**           | Show hidden sheets            | `spreadsheetId`, `sheetId`             |
| **`sheets_move_sheet`**           | Move sheets to new position   | `spreadsheetId`, `sheetId`, `newIndex` |
| **`sheets_get_sheet_info`**       | Get all sheet information     | `spreadsheetId`, `includeGridData`     |
| **`sheets_get_sheet_properties`** | Get specific sheet properties | `spreadsheetId`, `sheetId`             |

### **🔒 Data Validation & Protection**

| Tool                             | Description                 | Parameters                                                |
| -------------------------------- | --------------------------- | --------------------------------------------------------- |
| **`sheets_set_data_validation`** | Set validation rules        | `spreadsheetId`, `range`, `ruleType`, `values`, `message` |
| **`sheets_protect_range`**       | Protect ranges from editing | `spreadsheetId`, `range`, `description`, `warningOnly`    |

### **📊 Advanced Data Operations**

| Tool                        | Description                  | Parameters                                           |
| --------------------------- | ---------------------------- | ---------------------------------------------------- |
| **`sheets_insert_rows`**    | Insert rows at position      | `spreadsheetId`, `sheetId`, `startIndex`, `endIndex` |
| **`sheets_insert_columns`** | Insert columns at position   | `spreadsheetId`, `sheetId`, `startIndex`, `endIndex` |
| **`sheets_delete_rows`**    | Delete rows from position    | `spreadsheetId`, `sheetId`, `startIndex`, `endIndex` |
| **`sheets_delete_columns`** | Delete columns from position | `spreadsheetId`, `sheetId`, `startIndex`, `endIndex` |

### **📐 Formula & Calculation**

| Tool                           | Description               | Parameters                           |
| ------------------------------ | ------------------------- | ------------------------------------ |
| **`sheets_set_formula`**       | Set formulas in cells     | `spreadsheetId`, `range`, `formulas` |
| **`sheets_calculate_formula`** | Calculate formula results | `spreadsheetId`, `formula`           |

### **⚡ Batch Operations**

| Tool                      | Description                        | Parameters                                     |
| ------------------------- | ---------------------------------- | ---------------------------------------------- |
| **`sheets_batch_update`** | Multiple operations in one request | `spreadsheetId`, `requests`                    |
| **`sheets_batch_get`**    | Get data from multiple ranges      | `spreadsheetId`, `ranges`, `valueRenderOption` |

### **🔍 Search & Sharing**

| Tool                      | Description                | Parameters                                  |
| ------------------------- | -------------------------- | ------------------------------------------- |
| **`sheets_search`**       | Search spreadsheets        | `query`, `maxResults`                       |
| **`sheets_share`**        | Share with permissions     | `spreadsheetId`, `email`, `role`, `message` |
| **`sheets_get_metadata`** | Get comprehensive metadata | `spreadsheetId`, `includeGridData`          |

### **🧹 Utility Operations**

| Tool                     | Description                      | Parameters                                             |
| ------------------------ | -------------------------------- | ------------------------------------------------------ |
| **`sheets_clear_range`** | Clear content and formatting     | `spreadsheetId`, `range`                               |
| **`sheets_copy_to`**     | Copy sheets between spreadsheets | `spreadsheetId`, `sheetId`, `destinationSpreadsheetId` |

---

## 🛠️ Advanced Setup Examples

### **Create Professional Spreadsheet with Multiple Sheets**

```json
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
```

---

## 📚 **Advanced Usage Examples**

### **Complete Sheet Management Workflow**

```typescript
// 1. Create spreadsheet
const spreadsheet = await mcp.callTool("sheets_create", {
  title: "Business Dashboard 2024",
  theme: "LIGHT",
});

// 2. Create multiple sheets
await mcp.callTool("sheets_create_sheet", {
  spreadsheetId: spreadsheet.spreadsheetId,
  title: "Sales Data",
  index: 1,
});

await mcp.callTool("sheets_create_sheet", {
  spreadsheetId: spreadsheet.spreadsheetId,
  title: "Charts",
  index: 2,
});

// 3. Add data to Sales Data sheet
await mcp.callTool("sheets_update_data", {
  spreadsheetId: spreadsheet.spreadsheetId,
  range: "Sales Data!A1:D6",
  values: [
    ["Month", "Revenue", "Expenses", "Profit"],
    ["January", 50000, 30000, 20000],
    ["February", 55000, 32000, 23000],
    ["March", 60000, 35000, 25000],
    ["April", 65000, 38000, 27000],
    ["May", 70000, 40000, 30000],
  ],
});

// 4. Create professional chart
await mcp.callTool("sheets_create_chart_from_table", {
  spreadsheetId: spreadsheet.spreadsheetId,
  chartType: "COLUMN",
  tableRange: "Sales Data!A1:D6",
  title: "Monthly Financial Performance",
  useFirstRowAsLabels: true,
});

// 5. Rename and organize sheets
await mcp.callTool("sheets_rename_sheet", {
  spreadsheetId: spreadsheet.spreadsheetId,
  sheetId: 0, // First sheet
  newTitle: "Summary",
});

// 6. Move Charts sheet to the end
await mcp.callTool("sheets_move_sheet", {
  spreadsheetId: spreadsheet.spreadsheetId,
  sheetId: 2, // Charts sheet
  newIndex: 3, // Move to end
});

// 7. Hide a temporary sheet if needed
await mcp.callTool("sheets_hide_sheet", {
  spreadsheetId: spreadsheet.spreadsheetId,
  sheetId: 1, // Hide Sales Data sheet
});
```

### **Advanced Chart Management**

```typescript
// Create chart with custom options
await mcp.callTool("sheets_create_chart_with_data", {
  spreadsheetId: "your-spreadsheet-id",
  chartType: "LINE",
  dataRange: "A1:C10",
  title: "Trend Analysis",
  chartOptions: {
    colors: ["#4285F4", "#34A853"],
    legendPosition: "RIGHT_LEGEND",
  },
});

// Update chart data when source data changes
await mcp.callTool("sheets_update_chart_data", {
  spreadsheetId: "your-spreadsheet-id",
  chartId: 12345,
  newDataRange: "A1:C15", // Extended range
  updateTitle: "Updated Trend Analysis",
});

// List all charts in spreadsheet
const charts = await mcp.callTool("sheets_list_charts", {
  spreadsheetId: "your-spreadsheet-id",
});

// Delete unwanted charts
await mcp.callTool("sheets_delete_chart", {
  spreadsheetId: "your-spreadsheet-id",
  chartId: 12345,
});
```

### **Sheet Information and Properties**

```typescript
// Get information about all sheets
const sheetInfo = await mcp.callTool("sheets_get_sheet_info", {
  spreadsheetId: "your-spreadsheet-id",
  includeGridData: false,
});

// Get properties of specific sheet
const sheetProps = await mcp.callTool("sheets_get_sheet_properties", {
  spreadsheetId: "your-spreadsheet-id",
  sheetId: 0,
});

// Check if sheet is hidden
if (sheetProps.properties.hidden) {
  // Show the sheet
  await mcp.callTool("sheets_show_sheet", {
    spreadsheetId: "your-spreadsheet-id",
    sheetId: 0,
  });
}
```

---

## 🔧 Troubleshooting

### **Common errors:**

| Error                                      | Solution                                                                                             |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **"GOOGLE_SERVICE_ACCOUNT_KEY not found"** | • Check environment variable in mcp.json<br>• Ensure JSON is properly escaped                        |
| **"Permission denied"**                    | • Check service account access permissions<br>• Ensure Google Sheets are shared with service account |
| **"Invalid credentials"**                  | • Check service account JSON file<br>• Ensure Google Sheets API is enabled                           |

---

## 🚀 **Advantages Over Other Solutions**

- ✅ **37 Advanced Tools** - Complete Google Sheets MCP tool collection
- ✅ **Complete Sheet Management** - Full control over sheets (create, rename, hide, move, delete)
- ✅ **Enhanced Chart Creation** - Create charts with data, from tables, update dynamically
- ✅ **Professional Formatting** - Colors, fonts, borders, conditional formatting
- ✅ **Data Validation** - Set rules and protect sensitive data
- ✅ **Batch Operations** - High-performance multiple operations
- ✅ **Sheet Information** - Get detailed properties and status of all sheets
- ✅ **Performance Optimized** - Efficient API usage and batch processing

---

## 📄 License

**MIT License** - See [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

All contributions are welcome! Please:

1. 🍴 **Fork** the project
2. 🌿 **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. 🚀 **Push** to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 **Open** a Pull Request

---

## 📞 Support

If you encounter issues:

1. 🔍 **Check** [Issues](https://github.com/Longtran2404/mcp-google-sheets/issues) first
2. 🆕 **Create** a new issue if none exists
3. 📝 **Describe** the problem in detail and how to reproduce it
4. 🌐 **TaskKit**: [Official open-source catalog](https://www.taskkit.vn/ma-nguon-mo)

---

## ⭐ Star the Project

**If this project is helpful, please give it a star!** ⭐

---

<div align="center">

**Made with ❤️ by [Longtran2404](https://github.com/Longtran2404)**

**Founder profile: [Trần Minh Long](https://www.taskkit.vn/tran-minh-long)**

**🚀 37 Tools for Complete Google Sheets Management 🚀**

</div>
