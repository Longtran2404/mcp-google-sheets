# 🚀 Hướng Dẫn Deploy Lên GitHub

## 📋 **Chuẩn Bị**

### **1. Kiểm tra Git status**

```bash
git status
```

### **2. Kiểm tra remote origin**

```bash
git remote -v
# Phải có: https://github.com/Longtran2404/mcp-google-sheets.git
```

## 🔧 **Commit và Push**

### **1. Add tất cả thay đổi**

```bash
git add .
```

### **2. Commit với message rõ ràng**

```bash
git commit -m "feat: Complete MCP Google Sheets server for npm deployment

- Simplified server structure with single index.ts file
- Updated package.json for npm publishing
- Added comprehensive README with npm installation guide
- Fixed TypeScript configuration
- Ready for npm publish"
```

### **3. Push lên GitHub**

```bash
git push origin master
```

## 📦 **Deploy lên NPM (Tùy chọn)**

### **1. Đăng nhập npm**

```bash
npm login
```

### **2. Publish package**

```bash
npm publish
```

### **3. Kiểm tra package**

```bash
npm view @longtran2404/mcp-google-sheets
```

## 🎯 **Kết Quả Cuối Cùng**

### **Package có thể cài đặt bằng:**

```bash
npm install -g @longtran2404/mcp-google-sheets
```

### **Sử dụng trong Cursor:**

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

### **Hoặc sử dụng npx trực tiếp:**

```bash
npx @longtran2404/mcp-google-sheets
```

## 🚀 **Ưu Điểm Của Package Mới**

1. **Cài đặt dễ dàng**: Chỉ cần `npm install`
2. **Không cần git clone**: Package có sẵn trên npm
3. **Không cần build**: Đã được build sẵn
4. **Tự động update**: Có thể update bằng `npm update`
5. **Tương thích tốt**: Hoạt động với mọi MCP client

## 📚 **Tài Liệu Tham Khảo**

- [GitHub Repository](https://github.com/Longtran2404/mcp-google-sheets)
- [NPM Package](https://www.npmjs.com/package/@longtran2404/mcp-google-sheets)
- [MCP Protocol](https://modelcontextprotocol.io/)

---

**Package đã sẵn sàng để sử dụng! 🎉**
