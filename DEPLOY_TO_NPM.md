# 🚀 Hướng Dẫn Deploy Lên NPM

## 📋 **Chuẩn Bị**

### **1. Đăng ký tài khoản npm**

```bash
npm adduser
# Hoặc
npm login
```

### **2. Kiểm tra package.json**

Đảm bảo các trường sau đã được cập nhật:

- `name`: `@longtran2404/mcp-google-sheets`
- `version`: `1.0.0`
- `description`: Mô tả rõ ràng
- `author`: Thông tin tác giả
- `repository`: Link GitHub
- `publishConfig.access`: `"public"`

## 🔧 **Build Project**

### **1. Clean và build**

```bash
npm run clean
npm run build
```

### **2. Kiểm tra dist folder**

```bash
ls -la dist/
# Phải có: index.js, index.d.ts, và các file khác
```

## 📦 **Publish Package**

### **1. Kiểm tra package trước khi publish**

```bash
npm pack --dry-run
```

### **2. Publish package**

```bash
npm publish
```

### **3. Kiểm tra package đã publish**

```bash
npm view @longtran2404/mcp-google-sheets
```

## 🧪 **Test Package**

### **1. Cài đặt package từ npm**

```bash
npm install -g @longtran2404/mcp-google-sheets
```

### **2. Test MCP server**

```bash
mcp-google-sheets
```

### **3. Test với Cursor**

Cập nhật `~/.cursor/mcp.json`:

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

## 🔄 **Cập Nhật Package**

### **1. Tăng version**

```bash
npm version patch    # 1.0.0 -> 1.0.1
npm version minor    # 1.0.0 -> 1.1.0
npm version major    # 1.0.0 -> 2.0.0
```

### **2. Build và publish**

```bash
npm run build
npm publish
```

## 🚨 **Troubleshooting**

### **Lỗi thường gặp:**

1. **Package name đã tồn tại**

   - Đổi tên package hoặc sử dụng scope `@longtran2404/`

2. **Lỗi authentication**

   - Chạy `npm login` để đăng nhập

3. **Lỗi publish**

   - Kiểm tra `package.json` có đúng format
   - Đảm bảo đã build project

4. **Package không hoạt động**
   - Kiểm tra `main` field trong `package.json`
   - Đảm bảo `dist/index.js` tồn tại

## 📚 **Tài Liệu Tham Khảo**

- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Package.json Fields](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)
- [Scoped Packages](https://docs.npmjs.com/about-scopes)

## 🎯 **Bước Tiếp Theo Sau Khi Publish**

1. **Cập nhật README.md** với link npm
2. **Tạo release** trên GitHub
3. **Quảng bá package** trong cộng đồng MCP
4. **Thu thập feedback** và cải thiện

---

**Package sẽ có thể cài đặt bằng:**

```bash
npm install -g @longtran2404/mcp-google-sheets
```

**Và sử dụng trong Cursor với:**

```json
"command": "npx",
"args": ["@longtran2404/mcp-google-sheets"]
```
