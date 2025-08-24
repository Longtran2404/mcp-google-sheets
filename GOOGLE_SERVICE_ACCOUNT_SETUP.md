# Google Service Account Setup Guide

## Overview

This guide provides step-by-step instructions for setting up a Google Service Account to use with the MCP Google Sheets Server. A service account allows the server to authenticate with Google APIs without requiring user interaction.

## Prerequisites

- A Google account
- Access to Google Cloud Console
- Basic understanding of Google Cloud services

## Step-by-Step Setup

### Step 1: Access Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Create a new project or select an existing one

### Step 2: Enable Required APIs

1. In the Google Cloud Console, navigate to **APIs & Services** > **Library**
2. Search for and enable the following APIs:
   - **Google Sheets API**
   - **Google Drive API** (for advanced features)

### Step 3: Create a Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the service account details:
   - **Service account name**: `mcp-google-sheets`
   - **Service account ID**: Will be auto-generated
   - **Description**: `Service account for MCP Google Sheets Server`
4. Click **Create and Continue**

### Step 4: Grant Permissions

1. In the **Grant this service account access to project** section:
   - **Role**: Select **Editor** (or create a custom role with minimal permissions)
2. Click **Continue**
3. Click **Done**

### Step 5: Create and Download the Key

1. In the **Credentials** page, find your service account
2. Click on the service account email
3. Go to the **Keys** tab
4. Click **Add Key** > **Create new key**
5. Select **JSON** format
6. Click **Create**
7. The JSON key file will be downloaded automatically

### Step 6: Share Google Sheets

1. Open the Google Sheets you want to access
2. Click **Share** button
3. Add your service account email (found in the JSON file under `client_email`)
4. Grant **Editor** permissions
5. Click **Send**

## Configuration

### Using the Service Account Key

1. Open the downloaded JSON file
2. Copy the entire content
3. In your `mcp.json` file, set the `GOOGLE_SERVICE_ACCOUNT_KEY` environment variable:

```json
{
  "mcpServers": {
    "mcp-google-sheets": {
      "command": "npx",
      "args": ["mcp-google-sheets-server"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_KEY": "{\"type\":\"service_account\",\"project_id\":\"your-project-id\",...}"
      }
    }
  }
}
```

**Important**: Make sure to properly escape the JSON string in your configuration file.

## Security Best Practices

### Key Management

- **Never commit** the service account key to version control
- **Store keys securely** using environment variables or secure key management systems
- **Rotate keys regularly** for production environments
- **Use minimal permissions** - only grant the necessary access

### Access Control

- **Limit sharing** to only the specific Google Sheets needed
- **Monitor usage** through Google Cloud Console
- **Review permissions** regularly

## Troubleshooting

### Common Issues

#### "Permission denied" Error

- Ensure the service account has access to the Google Sheets
- Check that the Google Sheets are shared with the service account email
- Verify the service account has the correct role

#### "Invalid credentials" Error

- Verify the JSON key is correctly copied
- Check that the key hasn't expired
- Ensure the service account is still active

#### "API not enabled" Error

- Verify that Google Sheets API is enabled
- Check that Google Drive API is enabled (if using advanced features)

### Getting Help

If you encounter issues:

1. Check the [Google Cloud documentation](https://cloud.google.com/docs)
2. Review the [Google Sheets API documentation](https://developers.google.com/sheets/api)
3. Create an issue in the [GitHub repository](https://github.com/Longtran2404/mcp-google-sheets/issues)
4. Contact support at: **tranminhlong2404@gmail.com**

## Advanced Configuration

### Custom Roles

For production environments, consider creating custom roles with minimal permissions:

1. Go to **IAM & Admin** > **Roles**
2. Click **Create Role**
3. Add only the necessary permissions:
   - `sheets.spreadsheets.read`
   - `sheets.spreadsheets.write`
   - `drive.files.read` (if using Drive features)

### Environment Variables

Instead of hardcoding the key in `mcp.json`, use environment variables:

```bash
export GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
```

Then reference it in your configuration:

```json
{
  "mcpServers": {
    "mcp-google-sheets": {
      "command": "npx",
      "args": ["mcp-google-sheets-server"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_KEY": "${GOOGLE_SERVICE_ACCOUNT_KEY}"
      }
    }
  }
}
```

## Support

For additional support or questions:

- **Email**: tranminhlong2404@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/Longtran2404/mcp-google-sheets/issues)
- **Documentation**: [GitHub README](https://github.com/Longtran2404/mcp-google-sheets#readme)

---

**Note**: This setup guide is specifically designed for the MCP Google Sheets Server. For other use cases, refer to the official Google Cloud documentation.
