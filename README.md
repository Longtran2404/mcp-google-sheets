# 🚀 MCP Google Sheets Server

**MCP Server đơn giản và nhẹ cho Google Sheets - Cài đặt trực tiếp từ npm, chỉ cần nhập JSON credentials và sử dụng ngay!**

## ✨ **Tính Năng**

### 📊 **Quản lý Spreadsheet**

- ✅ **Đọc dữ liệu** từ range cụ thể
- ✅ **Cập nhật dữ liệu** vào range cụ thể
- ✅ **Tạo spreadsheet mới** với cấu hình tùy chỉnh
- ✅ **Tìm kiếm spreadsheet** theo tên
- ✅ **Chia sẻ spreadsheet** với email cụ thể
- ✅ **Lấy metadata** chi tiết của spreadsheet

### 🔧 **Đặc Điểm Kỹ Thuật**

- 🚀 **Cài đặt từ npm** - Không cần git clone hay build
- 📦 **Dependencies tối thiểu** - Chỉ 3 packages cần thiết
- 🔐 **Xác thực đơn giản** - Chỉ cần service account JSON
- ⚡ **Khởi động nhanh** - Không cần cấu hình phức tạp

## 🚀 **Cài Đặt Nhanh**

### **Cách 1: Cài đặt từ npm (Khuyến nghị)**

```bash
npm install -g @longtran2404/mcp-google-sheets
```

### **Cách 2: Cài đặt local**

```bash
npm install @longtran2404/mcp-google-sheets
```

### **Cách 3: Sử dụng npx (Không cần cài đặt)**

```bash
npx @longtran2404/mcp-google-sheets
```

## 🔐 **Xác Thực**

### **Service Account (Khuyến nghị)**

Chỉ cần set environment variable với JSON credentials:

```bash
export GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
```

**Hoặc trong Cursor MCP config:**

```json
{
  "mcpServers": {
    "mcp-google-sheets": {
      "command": "npx",
      "args": ["@longtran2404/mcp-google-sheets"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_KEY": "your-service-account-json"
      }
    }
  }
}
```

## 📖 **Sử Dụng**

### **Khởi động Server**

```bash
# Nếu cài global
mcp-google-sheets

# Hoặc sử dụng npx
npx @longtran2404/mcp-google-sheets
```

### **Tích hợp với Cursor**

1. **Cập nhật `~/.cursor/mcp.json`** với config trên
2. **Khởi động lại Cursor**
3. **Sử dụng MCP tools** qua Command Palette (Ctrl+Shift+P)

## 🛠️ **Tools Có Sẵn**

### **1. sheets_get_data**

```json
{
  "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  "range": "A1:D10"
}
```

### **2. sheets_update_data**

```json
{
  "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  "range": "A1:D10",
  "values": [
    ["Header1", "Header2"],
    ["Data1", "Data2"]
  ]
}
```

### **3. sheets_create**

```json
{
  "title": "New Spreadsheet",
  "sheets": [{ "properties": { "title": "Sheet1" } }]
}
```

### **4. sheets_search**

```json
{
  "query": "Data-video",
  "maxResults": 5
}
```

### **5. sheets_share**

```json
{
  "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  "email": "user@example.com",
  "role": "writer"
}
```

### **6. sheets_get_metadata**

```json
{
  "spreadsheetId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
}
```

## 🔧 **Development**

### **Scripts Có Sẵn**

```bash
npm run build      # Build TypeScript
npm run dev        # Watch mode
npm start          # Start server
npm run clean      # Clean dist folder
```

### **Cấu Trúc Project**

```
mcp-google-sheets/
├── src/
│   └── index.ts           # Main MCP server
├── dist/                  # Built files
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
└── README.md              # Documentation
```

## 🚨 **Troubleshooting**

### **Lỗi thường gặp:**

1. **Server không khởi động**

   - Kiểm tra `GOOGLE_SERVICE_ACCOUNT_KEY` environment variable
   - Đảm bảo đã cài đặt package đúng cách

2. **Lỗi xác thực**

   - Kiểm tra service account JSON format
   - Đảm bảo service account có quyền truy cập Google Sheets API

3. **Lỗi quyền truy cập**
   - Service account cần được share với spreadsheet
   - Kiểm tra scopes trong Google Cloud Console

## 📝 **Ví Dụ Sử Dụng**

### **Đọc dữ liệu từ sheet**

```typescript
// Sử dụng MCP tool
const result = await callTool("sheets_get_data", {
  spreadsheetId: "your-spreadsheet-id",
  range: "A1:D10",
});
```

### **Cập nhật dữ liệu**

```typescript
const result = await callTool("sheets_update_data", {
  spreadsheetId: "your-spreadsheet-id",
  range: "A2:D2",
  values: [["1", "New Data", "2024-01-18", "Template New"]],
});
```

## 🚀 **Quick Start với Cursor**

### **Cách 1: Sử dụng npx (Khuyến nghị)**

1. **Cập nhật `~/.cursor/mcp.json`:**

   ```json
   {
     "mcpServers": {
       "mcp-google-sheets": {
         "command": "npx",
         "args": ["@longtran2404/mcp-google-sheets"],
         "env": {
           "GOOGLE_SERVICE_ACCOUNT_KEY": "your-service-account-json"
         }
       }
     }
   }
   ```

2. **Khởi động lại Cursor**

3. **Sử dụng MCP tools** qua Command Palette (Ctrl+Shift+P)

### **Cách 2: Cài đặt global**

1. **Cài đặt package:**

   ```bash
   npm install -g @longtran2404/mcp-google-sheets
   ```

2. **Cập nhật `~/.cursor/mcp.json`:**

   ```json
   {
     "mcpServers": {
       "mcp-google-sheets": {
         "command": "mcp-google-sheets",
         "env": {
           "GOOGLE_SERVICE_ACCOUNT_KEY": "your-service-account-json"
         }
       }
     }
   }
   ```

3. **Khởi động lại Cursor**

## 🤝 **Đóng Góp**

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 **License**

MIT License - xem file LICENSE để biết thêm chi tiết.

## 🆘 **Hỗ Trợ**

- 📧 Email: longtran2404@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/Longtran2404/mcp-google-sheets/issues)
- 📖 Documentation: Wiki

---

**Made with ❤️ for the MCP community**

## 🎯 **Ưu Điểm So Với Các Giải Pháp Khác**

- **Đơn giản hơn**: Chỉ cần cài đặt từ npm
- **Nhẹ hơn**: Chỉ 3 dependencies cần thiết
- **Nhanh hơn**: Không cần git clone hay build
- **Dễ sử dụng**: Chỉ cần nhập JSON credentials
- **Tương thích tốt**: Hoạt động với mọi MCP client
- **Cài đặt dễ dàng**: `npm install @longtran2404/mcp-google-sheets`

---

**Đây là MCP server đơn giản nhất cho Google Sheets - Cài đặt từ npm! 🚀**
