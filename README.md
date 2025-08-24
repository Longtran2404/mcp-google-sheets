# 🚀 MCP Google Sheets Server

> **Simple and lightweight MCP Server for Google Sheets** - Install directly from npm, just input JSON credentials and use immediately!

[![npm version](https://img.shields.io/npm/v/mcp-google-sheets-server.svg)](https://www.npmjs.com/package/mcp-google-sheets-server)
[![npm downloads](https://img.shields.io/npm/dm/mcp-google-sheets-server.svg)](https://www.npmjs.com/package/mcp-google-sheets-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## ✨ Features

- 📊 **Read data** from Google Sheets
- ✏️ **Update data** in Google Sheets  
- 🆕 **Create new spreadsheets**
- 🔍 **Search spreadsheets**
- 👥 **Share spreadsheets**
- 📋 **Get spreadsheet metadata**
- 🚀 **Simple installation** - just npm install
- 🔐 **Easy authentication** with Service Account

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

## 📋 Available Tools

| Tool | Description | Parameters | Example |
|------|-------------|------------|---------|
| **`sheets_get_data`** | Get data from Google Sheets | `spreadsheetId`, `range` | `sheets_get_data("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms", "A1:C10")` |
| **`sheets_update_data`** | Update data in Google Sheets | `spreadsheetId`, `range`, `values` | `sheets_update_data("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms", "A1", [["Hello", "World"]])` |
| **`sheets_create`** | Create new Google Sheets | `title` | `sheets_create("My New Spreadsheet")` |
| **`sheets_search`** | Search Google Sheets | `query` | `sheets_search("budget 2024")` |
| **`sheets_share`** | Share Google Sheets | `spreadsheetId`, `email`, `role` | `sheets_share("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms", "user@example.com", "writer")` |
| **`sheets_get_metadata`** | Get Google Sheets metadata | `spreadsheetId` | `sheets_get_metadata("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms")` |

---

## 🛠️ Advanced Setup

### **Method 1: Use npx (Recommended)**

1. **Update `~/.cursor/mcp.json`:**
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

2. **Restart Cursor**

### **Method 2: Global installation**

1. **Install package:**
   ```bash
   npm install -g mcp-google-sheets-server
   ```

2. **Update `~/.cursor/mcp.json`:**
   ```json
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
   ```

### **Method 3: Local installation**

1. **Clone and build:**
   ```bash
   git clone https://github.com/Longtran2404/mcp-google-sheets.git
   cd mcp-google-sheets
   npm install
   npm run build
   ```

2. **Update `~/.cursor/mcp.json`:**
   ```json
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

## 📚 Usage Examples

### **In Cursor with MCP:**

```typescript
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
```

---

## 🚀 Advantages Over Other Solutions

- ✅ **Easy installation**: `npm install mcp-google-sheets-server`
- ✅ **No build needed**: Automatically builds when publishing
- ✅ **Built-in integration**: Works immediately with Cursor MCP
- ✅ **Light and fast**: Only needs credentials, no complex setup
- ✅ **Full support**: All basic Google Sheets API functionality
- ✅ **TypeScript**: Safe code and easy to maintain

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

</div>
