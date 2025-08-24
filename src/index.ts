#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { google } from 'googleapis';
import { authenticate } from './auth.js';
import { 
  getSpreadsheetData, 
  updateSpreadsheetData, 
  createSpreadsheet, 
  deleteSpreadsheet,
  getSpreadsheetMetadata,
  searchSpreadsheets,
  copySpreadsheet,
  shareSpreadsheet,
  getSpreadsheetRevisions,
  batchUpdateSpreadsheet
} from './sheets-operations.js';

class GoogleSheetsMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'google-sheets-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'sheets_get_data',
            description: 'Get data from a specific range in a Google Spreadsheet',
            inputSchema: {
              type: 'object',
              properties: {
                spreadsheetId: {
                  type: 'string',
                  description: 'The ID of the spreadsheet to retrieve data from'
                },
                range: {
                  type: 'string',
                  description: 'The A1 notation or R1C1 notation of the values to retrieve'
                }
              },
              required: ['spreadsheetId']
            }
          },
          {
            name: 'sheets_update_data',
            description: 'Update data in a specific range of a Google Spreadsheet',
            inputSchema: {
              type: 'object',
              properties: {
                spreadsheetId: {
                  type: 'string',
                  description: 'The ID of the spreadsheet to update'
                },
                range: {
                  type: 'string',
                  description: 'The A1 notation of the values to update'
                },
                values: {
                  type: 'array',
                  description: 'The data to write'
                }
              },
              required: ['spreadsheetId', 'range', 'values']
            }
          },
          {
            name: 'sheets_create',
            description: 'Create a new Google Spreadsheet',
            inputSchema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'The title of the spreadsheet'
                },
                sheets: {
                  type: 'array',
                  description: 'Array of sheet objects to create'
                }
              },
              required: ['title']
            }
          },
          {
            name: 'sheets_delete',
            description: 'Delete a Google Spreadsheet',
            inputSchema: {
              type: 'object',
              properties: {
                spreadsheetId: {
                  type: 'string',
                  description: 'The ID of the spreadsheet to delete'
                }
              },
              required: ['spreadsheetId']
            }
          },
          {
            name: 'sheets_get_metadata',
            description: 'Get metadata about a Google Spreadsheet',
            inputSchema: {
              type: 'object',
              properties: {
                spreadsheetId: {
                  type: 'string',
                  description: 'The ID of the spreadsheet'
                }
              },
              required: ['spreadsheetId']
            }
          },
          {
            name: 'sheets_search',
            description: 'Search for Google Spreadsheets',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query string'
                },
                maxResults: {
                  type: 'number',
                  description: 'Maximum number of results to return'
                }
              },
              required: ['query']
            }
          },
          {
            name: 'sheets_copy',
            description: 'Copy a Google Spreadsheet',
            inputSchema: {
              type: 'object',
              properties: {
                spreadsheetId: {
                  type: 'string',
                  description: 'The ID of the spreadsheet to copy'
                },
                title: {
                  type: 'string',
                  description: 'The title for the new spreadsheet'
                }
              },
              required: ['spreadsheetId', 'title']
            }
          },
          {
            name: 'sheets_share',
            description: 'Share a Google Spreadsheet with specific users',
            inputSchema: {
              type: 'object',
              properties: {
                spreadsheetId: {
                  type: 'string',
                  description: 'The ID of the spreadsheet to share'
                },
                email: {
                  type: 'string',
                  description: 'Email address to share with'
                },
                role: {
                  type: 'string',
                  description: 'Role: reader, writer, or owner',
                  enum: ['reader', 'writer', 'owner']
                }
              },
              required: ['spreadsheetId', 'email', 'role']
            }
          },
          {
            name: 'sheets_get_revisions',
            description: 'Get revision history of a Google Spreadsheet',
            inputSchema: {
              type: 'object',
              properties: {
                spreadsheetId: {
                  type: 'string',
                  description: 'The ID of the spreadsheet'
                }
              },
              required: ['spreadsheetId']
            }
          },
          {
            name: 'sheets_batch_update',
            description: 'Perform batch updates on a Google Spreadsheet',
            inputSchema: {
              type: 'object',
              properties: {
                spreadsheetId: {
                  type: 'string',
                  description: 'The ID of the spreadsheet to update'
                },
                requests: {
                  type: 'array',
                  description: 'Array of update requests'
                }
              },
              required: ['spreadsheetId', 'requests']
            }
          }
        ]
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        // Authenticate before any operation
        const auth = await authenticate();
        const sheets = google.sheets({ version: 'v4', auth: auth as any });
        const drive = google.drive({ version: 'v3', auth: auth as any });

        switch (name) {
          case 'sheets_get_data':
            return await getSpreadsheetData(sheets, args);

          case 'sheets_update_data':
            return await updateSpreadsheetData(sheets, args);

          case 'sheets_create':
            return await createSpreadsheet(sheets, args);

          case 'sheets_delete':
            return await deleteSpreadsheet(drive, args);

          case 'sheets_get_metadata':
            return await getSpreadsheetMetadata(sheets, args);

          case 'sheets_search':
            return await searchSpreadsheets(drive, args);

          case 'sheets_copy':
            return await copySpreadsheet(drive, args);

          case 'sheets_share':
            return await shareSpreadsheet(drive, args);

          case 'sheets_get_revisions':
            return await getSpreadsheetRevisions(drive, args);

          case 'sheets_batch_update':
            return await batchUpdateSpreadsheet(sheets, args);

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing tool ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ]
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Google Sheets MCP server running on stdio');
  }
}

const server = new GoogleSheetsMCPServer();
server.run().catch(console.error);
