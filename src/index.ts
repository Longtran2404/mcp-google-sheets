#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

const server = new Server(
  {
    name: 'mcp-google-sheets-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Google Sheets API client
let sheets: any = null;
let authClient: any = null;

// Initialize Google Sheets API
async function initializeGoogleSheets(serviceAccountKey: string) {
  try {
    const credentials = JSON.parse(serviceAccountKey);
    const auth = new GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
      ],
    });

    authClient = await auth.getClient();
    sheets = google.sheets({ version: 'v4', auth: authClient });
    
    console.error('✅ Google Sheets API initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize Google Sheets API:', error);
    return false;
  }
}

// Tool: Get data from Google Sheets
const getDataTool: Tool = {
  name: 'sheets_get_data',
  description: 'Get data from a specific range in Google Sheets',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: {
        type: 'string',
        description: 'The ID of the spreadsheet',
      },
      range: {
        type: 'string',
        description: 'The range to read (e.g., A1:D10)',
      },
    },
    required: ['spreadsheetId', 'range'],
  },
};

// Tool: Update data in Google Sheets
const updateDataTool: Tool = {
  name: 'sheets_update_data',
  description: 'Update data in a specific range in Google Sheets',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: {
        type: 'string',
        description: 'The ID of the spreadsheet',
      },
      range: {
        type: 'string',
        description: 'The range to update (e.g., A1:D10)',
      },
      values: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        description: 'The values to write',
      },
    },
    required: ['spreadsheetId', 'range', 'values'],
  },
};

// Tool: Create new spreadsheet
const createSpreadsheetTool: Tool = {
  name: 'sheets_create',
  description: 'Create a new Google Spreadsheet',
  inputSchema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'The title of the spreadsheet',
      },
      sheets: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            properties: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                },
              },
            },
          },
        },
        description: 'Array of sheet properties',
      },
    },
    required: ['title'],
  },
};

// Tool: Search spreadsheets
const searchSpreadsheetsTool: Tool = {
  name: 'sheets_search',
  description: 'Search for spreadsheets by name',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query',
      },
      maxResults: {
        type: 'number',
        description: 'Maximum number of results',
        default: 10,
      },
    },
    required: ['query'],
  },
};

// Tool: Share spreadsheet
const shareSpreadsheetTool: Tool = {
  name: 'sheets_share',
  description: 'Share a spreadsheet with specific permissions',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: {
        type: 'string',
        description: 'The ID of the spreadsheet',
      },
      email: {
        type: 'string',
        description: 'Email address to share with',
      },
      role: {
        type: 'string',
        enum: ['reader', 'writer', 'owner'],
        description: 'Role for the user',
        default: 'reader',
      },
    },
    required: ['spreadsheetId', 'email'],
  },
};

// Tool: Get spreadsheet metadata
const getMetadataTool: Tool = {
  name: 'sheets_get_metadata',
  description: 'Get metadata about a spreadsheet',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: {
        type: 'string',
        description: 'The ID of the spreadsheet',
      },
    },
    required: ['spreadsheetId'],
  },
};

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      getDataTool,
      updateDataTool,
      createSpreadsheetTool,
      searchSpreadsheetsTool,
      shareSpreadsheetTool,
      getMetadataTool,
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // Check if Google Sheets API is initialized
  if (!sheets || !authClient) {
    return {
      content: [
        {
          type: 'text',
          text: '❌ Google Sheets API not initialized. Please check your service account credentials.',
        },
      ],
    };
  }

  try {
    switch (name) {
      case 'sheets_get_data': {
        const { spreadsheetId, range } = args as { spreadsheetId: string; range: string };
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range,
        });

        const values = response.data.values || [];
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully retrieved data from ${range}:\n\n${JSON.stringify(values, null, 2)}`,
            },
          ],
        };
      }

      case 'sheets_update_data': {
        const { spreadsheetId, range, values } = args as { spreadsheetId: string; range: string; values: string[][] };
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range,
          valueInputOption: 'RAW',
          requestBody: {
            values,
          },
        });

        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully updated data in ${range}`,
            },
          ],
        };
      }

      case 'sheets_create': {
        const { title, sheets: sheetProperties = [{ properties: { title: 'Sheet1' } }] } = args as { title: string; sheets?: any[] };
        const response = await sheets.spreadsheets.create({
          requestBody: {
            properties: { title },
            sheets: sheetProperties,
          },
        });

        const spreadsheetId = response.data.spreadsheetId;
        const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;

        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully created spreadsheet "${title}"\nSpreadsheet ID: ${spreadsheetId}\nURL: ${spreadsheetUrl}`,
            },
          ],
        };
      }

      case 'sheets_search': {
        const { query, maxResults = 10 } = args as { query: string; maxResults?: number };
        const drive = google.drive({ version: 'v3', auth: authClient });
        
        const response = await drive.files.list({
          q: `name contains '${query}' and mimeType='application/vnd.google-apps.spreadsheet'`,
          pageSize: maxResults,
          fields: 'files(id,name,createdTime,modifiedTime,webViewLink)',
        });

        const files = response.data.files || [];
        return {
          content: [
            {
              type: 'text',
              text: `✅ Found ${files.length} spreadsheets matching "${query}":\n\n${JSON.stringify(files, null, 2)}`,
            },
          ],
        };
      }

      case 'sheets_share': {
        const { spreadsheetId, email, role = 'reader' } = args as { spreadsheetId: string; email: string; role?: string };
        const drive = google.drive({ version: 'v3', auth: authClient });
        
        await drive.permissions.create({
          fileId: spreadsheetId,
          requestBody: {
            role,
            type: 'user',
            emailAddress: email,
          },
        });

        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully shared spreadsheet with ${email} (${role})`,
            },
          ],
        };
      }

      case 'sheets_get_metadata': {
        const { spreadsheetId } = args as { spreadsheetId: string };
        const response = await sheets.spreadsheets.get({
          spreadsheetId,
        });

        const metadata = {
          spreadsheetId: response.data.spreadsheetId,
          title: response.data.properties?.title,
          sheets: response.data.sheets?.map((sheet: any) => ({
            title: sheet.properties?.title,
            sheetId: sheet.properties?.sheetId,
          })),
          createdTime: response.data.properties?.createdTime,
          modifiedTime: response.data.properties?.modifiedTime,
        };

        return {
          content: [
            {
              type: 'text',
              text: `✅ Spreadsheet metadata:\n\n${JSON.stringify(metadata, null, 2)}`,
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: 'text',
              text: `❌ Unknown tool: ${name}`,
            },
          ],
        };
    }
  } catch (error: any) {
    console.error(`❌ Error in tool ${name}:`, error);
    return {
      content: [
        {
          type: 'text',
          text: `❌ Error executing tool ${name}: ${error.message}`,
        },
      ],
    };
  }
});

// Initialize server
async function main() {
  // Check for service account key in environment
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  
  if (serviceAccountKey) {
    await initializeGoogleSheets(serviceAccountKey);
  } else {
    console.error('⚠️ GOOGLE_SERVICE_ACCOUNT_KEY not found in environment variables');
    console.error('Please set the environment variable with your service account JSON');
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('🚀 MCP Google Sheets Server started');
}

main().catch(console.error);
