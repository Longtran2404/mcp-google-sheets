# 🔐 Hướng Dẫn Chi Tiết: Lấy Google Service Account Key

## 📋 **Tổng Quan**
Google Service Account Key là cách xác thực an toàn và đơn giản nhất để MCP Google Sheets Server có thể truy cập Google Sheets của bạn. Hướng dẫn này sẽ đi qua từng bước một cách chi tiết với hình ảnh mô tả.

## 🚀 **Bước 1: Truy Cập Google Cloud Console**

### **1.1 Mở Google Cloud Console**
- Mở trình duyệt web (Chrome, Firefox, Edge...)
- Truy cập: [https://console.cloud.google.com/](https://console.cloud.google.com/)
- Đăng nhập bằng tài khoản Google của bạn

### **1.2 Giao Diện Chính**
Sau khi đăng nhập, bạn sẽ thấy:
- **Header**: Thanh trên cùng với tìm kiếm và thông tin tài khoản
- **Sidebar**: Menu bên trái với các dịch vụ
- **Main Area**: Khu vực chính hiển thị nội dung

## 🆕 **Bước 2: Tạo Project Mới**

### **2.1 Chọn Project**
- Ở góc trên bên trái, tìm dropdown "Select a project"
- Click vào dropdown này
- Bạn sẽ thấy danh sách các project hiện có

### **2.2 Tạo Project Mới**
- Click "New Project" (nút màu xanh)
- Điền thông tin:
  - **Project name**: `mcp-google-sheets-project` (hoặc tên bạn muốn)
  - **Project ID**: Sẽ tự động điền dựa trên tên
  - **Organization**: Để trống (nếu không có)
- Click "Create"

### **2.3 Chờ Tạo Project**
- Quá trình tạo project mất khoảng 1-2 phút
- Khi hoàn thành, bạn sẽ được chuyển đến project mới

## 🔌 **Bước 3: Bật Google Sheets API**

### **3.1 Mở API Library**
- Trong sidebar bên trái, tìm "APIs & Services"
- Click vào "APIs & Services" > "Library"

### **3.2 Tìm Google Sheets API**
- Trong ô tìm kiếm, gõ: `Google Sheets API`
- Click vào kết quả "Google Sheets API"

### **3.3 Bật API**
- Trang chi tiết API sẽ hiển thị
- Click nút "Enable" (màu xanh)
- Đợi quá trình bật API hoàn thành

## 👤 **Bước 4: Tạo Service Account**

### **4.1 Mở Credentials**
- Trong sidebar, click "APIs & Services" > "Credentials"
- Bạn sẽ thấy trang quản lý credentials

### **4.2 Tạo Service Account**
- Click "Create Credentials" (nút màu xanh)
- Chọn "Service Account" từ dropdown

### **4.3 Điền Thông Tin Service Account**
- **Service account name**: `mcp-google-sheets-sa`
- **Service account ID**: Sẽ tự động điền
- **Description**: `Service account for MCP Google Sheets server`
- Click "Create and Continue"

## 🔑 **Bước 5: Cấp Quyền Cho Service Account**

### **5.1 Chọn Role**
- Ở phần "Grant this service account access to project":
- **Role**: Chọn "Editor" (nếu cần đọc/ghi) hoặc "Viewer" (chỉ đọc)
- **Editor**: Có thể đọc, ghi, tạo, xóa
- **Viewer**: Chỉ có thể đọc

### **5.2 Hoàn Tất**
- Click "Continue"
- Click "Done"

## 📄 **Bước 6: Tạo Và Tải Key JSON**

### **6.1 Mở Service Account**
- Trong danh sách Service Accounts, tìm email vừa tạo
- Click vào email để mở chi tiết

### **6.2 Tạo Key**
- Chuyển sang tab "Keys"
- Click "Add Key" > "Create new key"
- Chọn "JSON"
- Click "Create"

### **6.3 Tải File JSON**
- File JSON sẽ tự động tải về máy
- **Lưu ý**: Đây là file quan trọng, giữ an toàn!

## 📁 **Bước 7: Cấp Quyền Truy Cập Google Sheets**

### **7.1 Mở Google Sheets**
- Mở Google Sheets mà bạn muốn truy cập
- Hoặc tạo Google Sheets mới

### **7.2 Chia Sẻ Với Service Account**
- Click nút "Share" (góc trên bên phải)
- Trong ô "Add people and groups":
  - Nhập email service account: `mcp-google-sheets-sa@project-id.iam.gserviceaccount.com`
  - Thay `project-id` bằng Project ID thực tế
- **Role**: Chọn "Editor" hoặc "Viewer"
- **Notify people**: Bỏ tích (không cần)
- Click "Send"

## ⚙️ **Bước 8: Sử Dụng Trong MCP Server**

### **8.1 Mở File Cấu Hình**
- Mở file: `~/.cursor/mcp.json`
- Trên Windows: `C:\Users\YourUsername\.cursor\mcp.json`

### **8.2 Thêm Cấu Hình MCP**
```json
{
  "mcpServers": {
    "mcp-google-sheets": {
      "command": "npx",
      "args": ["mcp-google-sheets"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_KEY": "{\"type\":\"service_account\",\"project_id\":\"your-project-id\",\"private_key_id\":\"...\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"...\",\"client_id\":\"...\",\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\",\"token_uri\":\"https://oauth2.googleapis.com/token\",\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\":\"https://www.googleapis.com/robot/v1/metadata/x509/...\"}"
      }
    }
  }
}
```

### **8.3 Thay Thế Thông Tin**
- **`your-project-id`**: Thay bằng Project ID thực tế
- **`...`**: Thay bằng nội dung thực tế từ file JSON

## ⚠️ **Lưu Ý Quan Trọng**

### **Bảo Mật**
- **KHÔNG BAO GIỜ** chia sẻ file JSON service account
- **KHÔNG BAO GIỜ** commit file JSON vào Git
- File JSON chứa private key, rất nhạy cảm!

### **Escape JSON**
Khi copy JSON vào mcp.json, cần escape:
- `"` → `\"`
- `\n` → `\\n`
- `\` → `\\`

### **Quyền Truy Cập**
- Service account cần được share với Google Sheets
- Kiểm tra quyền trong Google Drive
- Đảm bảo API đã được bật

## 🔧 **Troubleshooting**

### **Lỗi "GOOGLE_SERVICE_ACCOUNT_KEY not found"**
- Kiểm tra biến môi trường trong mcp.json
- Đảm bảo JSON được escape đúng cách
- Kiểm tra cú pháp JSON

### **Lỗi "Permission denied"**
- Kiểm tra quyền truy cập của service account
- Đảm bảo đã share Google Sheets
- Kiểm tra role của service account

### **Lỗi "Invalid credentials"**
- Kiểm tra file JSON service account
- Đảm bảo Google Sheets API đã được bật
- Kiểm tra Project ID có đúng không

### **Lỗi "API not enabled"**
- Vào Google Cloud Console
- Bật Google Sheets API
- Đợi vài phút để API hoạt động

## 📚 **Ví Dụ Thực Tế**

### **File JSON Service Account (ví dụ)**
```json
{
  "type": "service_account",
  "project_id": "my-mcp-project-123",
  "private_key_id": "abc123def456",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "mcp-google-sheets-sa@my-mcp-project-123.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/mcp-google-sheets-sa%40my-mcp-project-123.iam.gserviceaccount.com"
}
```

### **MCP Config Tương Ứng**
```json
{
  "mcpServers": {
    "mcp-google-sheets": {
      "command": "npx",
      "args": ["mcp-google-sheets"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_KEY": "{\"type\":\"service_account\",\"project_id\":\"my-mcp-project-123\",\"private_key_id\":\"abc123def456\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"mcp-google-sheets-sa@my-mcp-project-123.iam.gserviceaccount.com\",\"client_id\":\"123456789\",\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\",\"token_uri\":\"https://oauth2.googleapis.com/token\",\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\":\"https://www.googleapis.com/robot/v1/metadata/x509/mcp-google-sheets-sa%40my-mcp-project-123.iam.gserviceaccount.com\"}"
      }
    }
  }
}
```

## 🎯 **Kết Luận**

Sau khi hoàn thành tất cả các bước trên:
1. ✅ Google Cloud Project đã được tạo
2. ✅ Google Sheets API đã được bật
3. ✅ Service Account đã được tạo
4. ✅ Key JSON đã được tải về
5. ✅ Google Sheets đã được share
6. ✅ MCP config đã được cập nhật

Bây giờ bạn có thể sử dụng MCP Google Sheets Server trong Cursor!

## 🆘 **Hỗ Trợ Thêm**

Nếu gặp vấn đề:
- 📧 Email: longtran2404@gmail.com
- 🐛 GitHub Issues: [https://github.com/Longtran2404/mcp-google-sheets/issues](https://github.com/Longtran2404/mcp-google-sheets/issues)
- 📖 Documentation: [https://github.com/Longtran2404/mcp-google-sheets](https://github.com/Longtran2404/mcp-google-sheets)

---

**Chúc bạn thành công! 🚀**
