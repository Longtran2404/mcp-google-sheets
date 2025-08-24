# MCP Google Sheets Server

🚀 **MCP Server hoàn chỉnh cho Google Sheets với đầy đủ tính năng**

## ✨ **Tính năng**

### 📊 **Quản lý Spreadsheet**

- ✅ **Đọc dữ liệu** từ range cụ thể
- ✅ **Cập nhật dữ liệu** vào range cụ thể
- ✅ **Tạo spreadsheet mới** với cấu hình tùy chỉnh
- ✅ **Xóa spreadsheet** theo ID
- ✅ **Sao chép spreadsheet** với tên mới

### 🔍 **Tìm kiếm & Metadata**

- ✅ **Tìm kiếm spreadsheet** theo tên
- ✅ **Lấy metadata** chi tiết của spreadsheet
- ✅ **Lịch sử revisions** của spreadsheet
- ✅ **Thông tin sheets** và cấu trúc

### 👥 **Chia sẻ & Quyền**

- ✅ **Chia sẻ spreadsheet** với email cụ thể
- ✅ **Phân quyền** (reader, writer, owner)
- ✅ **Quản lý permissions** chi tiết

### 🔧 **Nâng cao**

- ✅ **Batch updates** cho nhiều thay đổi cùng lúc
- ✅ **Hỗ trợ A1 notation** và R1C1 notation
- ✅ **Error handling** chi tiết
- ✅ **Logging** và debugging

## 🚀 **Cài đặt**

### **Yêu cầu hệ thống**

- Node.js >= 18.0.0
- npm hoặc yarn

### **Bước 1: Clone repository**

```bash
git clone <your-repo-url>
cd mcp-google-sheets
```

### **Bước 2: Cài đặt dependencies**

```bash
npm install
```

### **Bước 3: Build project**

```bash
npm run build
```

## 🔐 **Xác thực**

### **Phương thức 1: Service Account (Khuyến nghị)**

```bash
export GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
```

### **Phương thức 2: Application Default Credentials**

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/credentials.json"
```

### **Phương thức 3: OAuth2 Local Auth**

Tạo file `credentials.json` trong thư mục gốc với OAuth2 credentials.

## 📖 **Sử dụng**

### **Khởi động server**

```bash
npm start
```

### **Tích hợp với Cursor**

Thêm vào `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "google-sheets": {
      "command": "node",
      "args": ["/path/to/mcp-google-sheets/dist/index.js"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_KEY": "your-service-account-json"
      }
    }
  }
}
```

## 🛠️ **Tools có sẵn**

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

## 🔧 **Development**

### **Scripts có sẵn**

```bash
npm run build      # Build TypeScript
npm run dev        # Watch mode
npm start          # Start server
```

### **Cấu trúc project**

```
mcp-google-sheets/
├── src/
│   ├── index.ts           # Main server
│   ├── auth.ts            # Authentication
│   └── sheets-operations.ts # Google Sheets operations
├── dist/                  # Built files
├── package.json
├── tsconfig.json
└── README.md
```

## 🚨 **Troubleshooting**

### **Lỗi xác thực**

- Kiểm tra `GOOGLE_SERVICE_ACCOUNT_KEY` environment variable
- Đảm bảo service account có quyền truy cập Google Sheets API
- Kiểm tra scopes trong Google Cloud Console

### **Lỗi quyền truy cập**

- Service account cần được share với spreadsheet
- Kiểm tra quyền trong Google Drive
- Đảm bảo API đã được enable

### **Lỗi build**

- Kiểm tra Node.js version (>= 18.0.0)
- Xóa `node_modules` và `dist`, chạy lại `npm install`
- Kiểm tra TypeScript configuration

## 📝 **Ví dụ sử dụng**

### **Đọc dữ liệu từ sheet**

```typescript
// Sử dụng MCP tool
const result = await callTool("sheets_get_data", {
  spreadsheetId: "1erP0PAWwrCDdXrhLgC_KvAJR8qrV6qmRZuYgOjQltVY",
  range: "A1:D10",
});
```

### **Cập nhật dữ liệu**

```typescript
const result = await callTool("sheets_update_data", {
  spreadsheetId: "1erP0PAWwrCDdXrhLgC_KvAJR8qrV6qmRZuYgOjQltVY",
  range: "A2:D2",
  values: [["1", "New Data", "2024-01-18", "Template New"]],
});
```

## 🤝 **Đóng góp**

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 **License**

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🆘 **Hỗ trợ**

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/mcp-google-sheets/issues)
- 📖 Documentation: [Wiki](https://github.com/your-username/mcp-google-sheets/wiki)

---

**Made with ❤️ for the MCP community**
