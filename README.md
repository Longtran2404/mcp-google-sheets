# 🚀 MCP Google Sheets Server v2.0.0

> **Advanced MCP Server for Google Sheets** - Install directly from npm, access powerful Google Sheets features with AI assistance!

[![npm version](https://img.shields.io/npm/v/mcp-google-sheets-server.svg)](https://www.npmjs.com/package/mcp-google-sheets-server)
[![npm downloads](https://img.shields.io/npm/dm/mcp-google-sheets-server.svg)](https://www.npmjs.com/package/mcp-google-sheets-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## ✨ **NEW in v2.0.0 - Advanced Features!**

- 📊 **Enhanced Data Operations** - Advanced formatting, conditional formatting, data validation
- 📈 **Chart & Visualization** - Create and manage charts (Column, Line, Pie, Bar, Area, Scatter)
- 🔒 **Data Protection** - Protect ranges, set validation rules, control access
- 📋 **Sheet Management** - Create, duplicate, delete sheets with advanced options
- ⚡ **Batch Operations** - Perform multiple operations in single requests for better performance
- 🎨 **Professional Formatting** - Colors, fonts, borders, alignment, merge cells
- 📐 **Formula Support** - Set formulas, calculate results, advanced calculations
- 🚀 **Performance Optimized** - Batch operations, efficient API usage

---

## 🚀 Quick Installation

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
See [GOOGLE_SERVICE_ACCOUNT_SETUP.md](GOOGLE_SERVICE_ACCOUNT_SETUP.md) for step-by-step instructions on how to get Google Service Account Key.

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

## 📋 **Complete Tool Collection (30+ Tools!)**

### **🔧 Basic Operations**
| Tool | Description | Parameters |
|------|-------------|------------|
| **`sheets_get_data`** | Get data with formatting options | `spreadsheetId`, `range`, `valueRenderOption`, `dateTimeRenderOption` |
| **`sheets_update_data`** | Update data with input options | `spreadsheetId`, `range`, `values`, `valueInputOption` |
| **`sheets_create`** | Create spreadsheet with theme | `title`, `initialData`, `theme` |

### **🎨 Advanced Formatting**
| Tool | Description | Parameters |
|------|-------------|------------|
| **`sheets_format_cells`** | Apply professional formatting | `spreadsheetId`, `range`, `backgroundColor`, `textColor`, `fontSize`, `bold`, `italic`, `alignment`, `borders` |
| **`sheets_conditional_formatting`** | Set conditional rules | `spreadsheetId`, `range`, `ruleType`, `value`, `colors` |
| **`sheets_merge_cells`** | Merge cells with options | `spreadsheetId`, `range`, `mergeType` |

### **📈 Charts & Visualization**
| Tool | Description | Parameters |
|------|-------------|------------|
| **`sheets_create_chart`** | Create professional charts | `spreadsheetId`, `chartType`, `dataRange`, `title`, `position` |
| **`sheets_update_chart`** | Update existing charts | `spreadsheetId`, `chartId`, `title`, `dataRange` |

### **🔒 Data Validation & Protection**
| Tool | Description | Parameters |
|------|-------------|------------|
| **`sheets_set_data_validation`** | Set validation rules | `spreadsheetId`, `range`, `ruleType`, `values`, `message` |
| **`sheets_protect_range`** | Protect ranges from editing | `spreadsheetId`, `range`, `description`, `warningOnly` |

### **📊 Advanced Data Operations**
| Tool | Description | Parameters |
|------|-------------|------------|
| **`sheets_insert_rows`** | Insert rows at position | `spreadsheetId`, `sheetId`, `startIndex`, `endIndex` |
| **`sheets_insert_columns`** | Insert columns at position | `spreadsheetId`, `sheetId`, `startIndex`, `endIndex` |
| **`sheets_delete_rows`** | Delete rows from position | `spreadsheetId`, `sheetId`, `startIndex`, `endIndex` |
| **`sheets_delete_columns`** | Delete columns from position | `spreadsheetId`, `sheetId`, `startIndex`, `endIndex` |

### **📐 Formula & Calculation**
| Tool | Description | Parameters |
|------|-------------|------------|
| **`sheets_set_formula`** | Set formulas in cells | `spreadsheetId`, `range`, `formulas` |
| **`sheets_calculate_formula`** | Calculate formula results | `spreadsheetId`, `formula` |

### **📋 Sheet Management**
| Tool | Description | Parameters |
|------|-------------|------------|
| **`sheets_create_sheet`** | Create new sheets | `spreadsheetId`, `title`, `index` |
| **`sheets_duplicate_sheet`** | Duplicate existing sheets | `spreadsheetId`, `sheetId`, `newTitle` |
| **`sheets_delete_sheet`** | Delete sheets | `spreadsheetId`, `sheetId` |

### **⚡ Batch Operations**
| Tool | Description | Parameters |
|------|-------------|------------|
| **`sheets_batch_update`** | Multiple operations in one request | `spreadsheetId`, `requests` |
| **`sheets_batch_get`** | Get data from multiple ranges | `spreadsheetId`, `ranges`, `valueRenderOption` |

### **🔍 Search & Sharing**
| Tool | Description | Parameters |
|------|-------------|------------|
| **`sheets_search`** | Search spreadsheets | `query`, `maxResults` |
| **`sheets_share`** | Share with permissions | `spreadsheetId`, `email`, `role`, `message` |
| **`sheets_get_metadata`** | Get comprehensive metadata | `spreadsheetId`, `includeGridData` |

### **🧹 Utility Operations**
| Tool | Description | Parameters |
|------|-------------|------------|
| **`sheets_clear_range`** | Clear content and formatting | `spreadsheetId`, `range` |
| **`sheets_copy_to`** | Copy sheets between spreadsheets | `spreadsheetId`, `sheetId`, `destinationSpreadsheetId` |

---

## 🛠️ Advanced Setup Examples

### **Create Professional Spreadsheet with Formatting**
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

### **Create Formatted Table with Charts**
```typescript
// 1. Create spreadsheet
const spreadsheet = await mcp.callTool('sheets_create', {
  title: 'Sales Report 2024',
  theme: 'LIGHT'
});

// 2. Add data
await mcp.callTool('sheets_update_data', {
  spreadsheetId: spreadsheet.spreadsheetId,
  range: 'A1:D5',
  values: [
    ['Month', 'Sales', 'Expenses', 'Profit'],
    ['January', 10000, 6000, 4000],
    ['February', 12000, 7000, 5000],
    ['March', 15000, 8000, 7000],
    ['April', 18000, 9000, 9000]
  ]
});

// 3. Apply formatting
await mcp.callTool('sheets_format_cells', {
  spreadsheetId: spreadsheet.spreadsheetId,
  range: 'A1:D1',
  backgroundColor: { red: 0.2, green: 0.6, blue: 0.9, alpha: 1 },
  textColor: { red: 1, green: 1, blue: 1, alpha: 1 },
  bold: true,
  fontSize: 14,
  horizontalAlignment: 'CENTER'
});

// 4. Create chart
await mcp.callTool('sheets_create_chart', {
  spreadsheetId: spreadsheet.spreadsheetId,
  chartType: 'COLUMN',
  dataRange: 'A1:D5',
  title: 'Monthly Sales Performance'
});
```

### **Batch Operations for Performance**
```typescript
// Perform multiple operations in one request
await mcp.callTool('sheets_batch_update', {
  spreadsheetId: 'your-spreadsheet-id',
  requests: [
    {
      updateCells: {
        range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
        rows: [{ values: [{ userEnteredValue: { stringValue: 'Header' } }] }],
        fields: 'userEnteredValue'
      }
    },
    {
      mergeCells: {
        range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 3 },
        mergeType: 'MERGE_ALL'
      }
    }
  ]
});
```

---

## 🔧 Troubleshooting

### **Common errors:**

| Error | Solution |
|-------|----------|
| **"GOOGLE_SERVICE_ACCOUNT_KEY not found"** | • Check environment variable in mcp.json<br>• Ensure JSON is properly escaped |
| **"Permission denied"** | • Check service account access permissions<br>• Ensure Google Sheets are shared with service account |
| **"Invalid credentials"** | • Check service account JSON file<br>• Ensure Google Sheets API is enabled |

---

## 🚀 **Advantages Over Other Solutions**

- ✅ **30+ Advanced Tools** - Most comprehensive Google Sheets MCP server
- ✅ **Professional Formatting** - Colors, fonts, borders, conditional formatting
- ✅ **Chart Creation** - 6 chart types with customization options
- ✅ **Data Validation** - Set rules and protect sensitive data
- ✅ **Batch Operations** - High-performance multiple operations
- ✅ **Sheet Management** - Full control over sheets and structure
- ✅ **Formula Support** - Advanced calculations and automation
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

---

## ⭐ Star the Project

**If this project is helpful, please give it a star!** ⭐

---

<div align="center">

**Made with ❤️ by [Longtran2404](https://github.com/Longtran2404)**

**🚀 Now with 30+ Advanced Google Sheets Tools! 🚀**

</div>
