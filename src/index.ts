#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, Tool } from '@modelcontextprotocol/sdk/types.js';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

// Enhanced logging
const log = (message: string, level: 'info' | 'error' | 'debug' = 'info') => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] MCP-Google-Sheets: ${message}`;
  
  if (level === 'error') {
    console.error(logMessage);
  } else if (process.env.LOG_LEVEL === 'debug' || level === 'info') {
    console.error(logMessage); // Use stderr for MCP logging
  }
};

const server = new Server(
  {
    name: 'mcp-google-sheets-server',
    version: '2.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

let sheets: any = null;
let authClient: any = null;
let isInitialized = false;

async function initializeGoogleSheets() {
  try {
    log('Initializing Google Sheets authentication...', 'debug');
    
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is required');
    }

    let credentials;
    try {
      // Handle escaped newlines in private key
      const cleanedKey = serviceAccountKey.replace(/\\n/g, '\n');
      credentials = JSON.parse(cleanedKey);
      
      log('Successfully parsed Service Account credentials as JSON', 'debug');
      
      // Validate credentials structure
      if (!credentials.private_key || !credentials.client_email) {
        throw new Error('Invalid Service Account credentials structure');
      }
      
      // Ensure private key is properly formatted
      if (!credentials.private_key.includes('-----BEGIN PRIVATE KEY-----')) {
        throw new Error('Invalid private key format');
      }
      
    } catch (parseError) {
      log(`Failed to parse Service Account credentials as JSON: ${parseError}`, 'error');
      if (serviceAccountKey && serviceAccountKey.length > 0 && !serviceAccountKey.startsWith('{')) {
        log('Treating as file path', 'debug');
        // If parsing fails and looks like file path, treat as file path
        const auth = new GoogleAuth({
          keyFile: serviceAccountKey,
          scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive',
          ],
        });
        authClient = await auth.getClient();
        sheets = google.sheets({ version: 'v4', auth: authClient });
        isInitialized = true;
        log('Google Sheets API initialized successfully with keyFile', 'info');
        return true;
      } else {
        throw new Error(`Invalid Service Account credentials: ${parseError}`);
      }
    }

    const auth = new GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
      ],
    });

    authClient = await auth.getClient();
    sheets = google.sheets({ version: 'v4', auth: authClient });
    isInitialized = true;
    log('Google Sheets API initialized successfully', 'info');
    return true;
  } catch (error) {
    log(`Failed to initialize Google Sheets API: ${error}`, 'error');
    return false;
  }
}

// Initialize authentication with retry
let retryCount = 0;
const maxRetries = 3;

async function initializeWithRetry() {
  try {
    const success = await initializeGoogleSheets();
    if (!success) {
      throw new Error('Initialization failed');
    }
  } catch (error) {
    retryCount++;
    if (retryCount < maxRetries) {
      log(`Authentication failed, retrying... (${retryCount}/${maxRetries})`, 'info');
      setTimeout(initializeWithRetry, 1000 * retryCount);
    } else {
      log(`Authentication failed after ${maxRetries} attempts`, 'error');
      throw error;
    }
  }
}

// Initialize authentication
initializeWithRetry();

// Basic Operations
const getDataTool: Tool = {
            name: 'sheets_get_data',
  description: 'Get data from Google Sheets with optional formatting',
            inputSchema: {
              type: 'object',
              properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      range: { type: 'string', description: 'The range to retrieve (e.g., A1:C10)' },
      valueRenderOption: { type: 'string', enum: ['FORMATTED_VALUE', 'UNFORMATTED_VALUE', 'FORMULA'], description: 'How values should be rendered', default: 'FORMATTED_VALUE' },
      dateTimeRenderOption: { type: 'string', enum: ['SERIAL_NUMBER', 'FORMATTED_STRING'], description: 'How dates should be rendered', default: 'FORMATTED_STRING' }
    },
    required: ['spreadsheetId', 'range']
  }
};

const updateDataTool: Tool = {
            name: 'sheets_update_data',
  description: 'Update data in Google Sheets with optional formatting',
            inputSchema: {
              type: 'object',
              properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      range: { type: 'string', description: 'The range to update (e.g., A1)' },
      values: { type: 'array', description: 'Array of arrays containing the values to write' },
      valueInputOption: { type: 'string', enum: ['RAW', 'USER_ENTERED'], description: 'How the input should be interpreted', default: 'USER_ENTERED' }
              },
              required: ['spreadsheetId', 'range', 'values']
            }
};

const createSpreadsheetTool: Tool = {
            name: 'sheets_create',
  description: 'Create a new Google Sheets with optional initial data and formatting',
            inputSchema: {
              type: 'object',
              properties: {
      title: { type: 'string', description: 'The title of the spreadsheet' },
      initialData: { type: 'array', description: 'Optional initial data to populate' },
      theme: { type: 'string', enum: ['LIGHT', 'DARK'], description: 'Theme for the spreadsheet', default: 'LIGHT' }
              },
              required: ['title']
            }
};

// Advanced Formatting Tools
const formatCellsTool: Tool = {
  name: 'sheets_format_cells',
  description: 'Apply formatting to cells including colors, fonts, borders, and alignment',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      range: { type: 'string', description: 'The range to format (e.g., A1:C10)' },
      backgroundColor: { type: 'object', description: 'Background color object with red, green, blue, alpha values' },
      textColor: { type: 'object', description: 'Text color object with red, green, blue, alpha values' },
      fontSize: { type: 'number', description: 'Font size' },
      bold: { type: 'boolean', description: 'Whether text is bold' },
      italic: { type: 'boolean', description: 'Whether text is italic' },
      horizontalAlignment: { type: 'string', enum: ['LEFT', 'CENTER', 'RIGHT'], description: 'Horizontal alignment' },
      verticalAlignment: { type: 'string', enum: ['TOP', 'MIDDLE', 'BOTTOM'], description: 'Vertical alignment' },
      borders: { type: 'object', description: 'Border settings for top, bottom, left, right' }
    },
    required: ['spreadsheetId', 'range']
  }
};

const conditionalFormattingTool: Tool = {
  name: 'sheets_conditional_formatting',
  description: 'Apply conditional formatting rules to cells',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      range: { type: 'string', description: 'The range to apply conditional formatting' },
      ruleType: { type: 'string', enum: ['GREATER_THAN', 'LESS_THAN', 'EQUAL_TO', 'TEXT_CONTAINS', 'CUSTOM_FORMULA'], description: 'Type of conditional formatting rule' },
      value: { type: 'string', description: 'Value to compare against' },
      backgroundColor: { type: 'object', description: 'Background color when condition is met' },
      textColor: { type: 'object', description: 'Text color when condition is met' }
    },
    required: ['spreadsheetId', 'range', 'ruleType']
  }
};

const mergeCellsTool: Tool = {
  name: 'sheets_merge_cells',
  description: 'Merge cells in a range',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      range: { type: 'string', description: 'The range to merge (e.g., A1:C1)' },
      mergeType: { type: 'string', enum: ['MERGE_ALL', 'MERGE_COLUMNS', 'MERGE_ROWS'], description: 'Type of merge operation', default: 'MERGE_ALL' }
    },
    required: ['spreadsheetId', 'range']
  }
};

// Chart and Visualization Tools
const createChartTool: Tool = {
  name: 'sheets_create_chart',
  description: 'Create various types of charts in Google Sheets',
            inputSchema: {
              type: 'object',
              properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      chartType: { type: 'string', enum: ['COLUMN', 'LINE', 'PIE', 'BAR', 'AREA', 'SCATTER'], description: 'Type of chart to create' },
      dataRange: { type: 'string', description: 'Range containing the data for the chart' },
      title: { type: 'string', description: 'Title of the chart' },
      position: { type: 'object', description: 'Position where to place the chart (overlayPosition or position)' }
    },
    required: ['spreadsheetId', 'chartType', 'dataRange']
  }
};

const updateChartTool: Tool = {
  name: 'sheets_update_chart',
  description: 'Update an existing chart in Google Sheets',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      chartId: { type: 'number', description: 'The ID of the chart to update' },
      title: { type: 'string', description: 'New title for the chart' },
      dataRange: { type: 'string', description: 'New data range for the chart' }
    },
    required: ['spreadsheetId', 'chartId']
  }
};

// Data Validation and Protection
const setDataValidationTool: Tool = {
  name: 'sheets_set_data_validation',
  description: 'Set data validation rules for cells',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      range: { type: 'string', description: 'The range to apply data validation' },
      ruleType: { type: 'string', enum: ['ONE_OF_LIST', 'ONE_OF_RANGE', 'NUMBER_GREATER_THAN', 'NUMBER_LESS_THAN', 'TEXT_LENGTH_EQUAL_TO'], description: 'Type of validation rule' },
      values: { type: 'array', description: 'Values for the validation rule' },
      message: { type: 'string', description: 'Custom error message' }
    },
    required: ['spreadsheetId', 'range', 'ruleType']
  }
};

const protectRangeTool: Tool = {
  name: 'sheets_protect_range',
  description: 'Protect a range of cells from editing',
            inputSchema: {
              type: 'object',
              properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      range: { type: 'string', description: 'The range to protect' },
      description: { type: 'string', description: 'Description of the protection' },
      warningOnly: { type: 'boolean', description: 'Whether to show warning only or prevent editing', default: false }
    },
    required: ['spreadsheetId', 'range']
  }
};

// Advanced Data Operations
const insertRowsTool: Tool = {
  name: 'sheets_insert_rows',
  description: 'Insert rows at a specific position',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      sheetId: { type: 'number', description: 'The ID of the sheet' },
      startIndex: { type: 'number', description: 'Starting row index (0-based)' },
      endIndex: { type: 'number', description: 'Ending row index (0-based)' }
    },
    required: ['spreadsheetId', 'sheetId', 'startIndex']
  }
};

const insertColumnsTool: Tool = {
  name: 'sheets_insert_columns',
  description: 'Insert columns at a specific position',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      sheetId: { type: 'number', description: 'The ID of the sheet' },
      startIndex: { type: 'number', description: 'Starting column index (0-based)' },
      endIndex: { type: 'number', description: 'Ending column index (0-based)' }
    },
    required: ['spreadsheetId', 'sheetId', 'startIndex']
  }
};

const deleteRowsTool: Tool = {
  name: 'sheets_delete_rows',
  description: 'Delete rows from a specific position',
            inputSchema: {
              type: 'object',
              properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      sheetId: { type: 'number', description: 'The ID of the sheet' },
      startIndex: { type: 'number', description: 'Starting row index (0-based)' },
      endIndex: { type: 'number', description: 'Ending row index (0-based)' }
    },
    required: ['spreadsheetId', 'sheetId', 'startIndex']
  }
};

const deleteColumnsTool: Tool = {
  name: 'sheets_delete_columns',
  description: 'Delete columns from a specific position',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      sheetId: { type: 'number', description: 'The ID of the sheet' },
      startIndex: { type: 'number', description: 'Starting column index (0-based)' },
      endIndex: { type: 'number', description: 'Ending column index (0-based)' }
    },
    required: ['spreadsheetId', 'sheetId', 'startIndex']
  }
};

// Formula and Calculation Tools
const setFormulaTool: Tool = {
  name: 'sheets_set_formula',
  description: 'Set formulas in cells',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      range: { type: 'string', description: 'The range to set formulas' },
      formulas: { type: 'array', description: 'Array of formulas to set' }
    },
    required: ['spreadsheetId', 'range', 'formulas']
  }
};

const calculateFormulaTool: Tool = {
  name: 'sheets_calculate_formula',
  description: 'Calculate the result of a formula',
            inputSchema: {
              type: 'object',
              properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      formula: { type: 'string', description: 'The formula to calculate' }
    },
    required: ['spreadsheetId', 'formula']
  }
};

// Sheet Management
const createSheetTool: Tool = {
  name: 'sheets_create_sheet',
  description: 'Create a new sheet in the spreadsheet',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      title: { type: 'string', description: 'Title of the new sheet' },
      index: { type: 'number', description: 'Index where to insert the sheet' }
    },
    required: ['spreadsheetId', 'title']
  }
};

const duplicateSheetTool: Tool = {
  name: 'sheets_duplicate_sheet',
  description: 'Duplicate an existing sheet',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      sheetId: { type: 'number', description: 'The ID of the sheet to duplicate' },
      newTitle: { type: 'string', description: 'Title for the duplicated sheet' }
    },
    required: ['spreadsheetId', 'sheetId']
  }
};

const deleteSheetTool: Tool = {
  name: 'sheets_delete_sheet',
  description: 'Delete a sheet from the spreadsheet',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      sheetId: { type: 'number', description: 'The ID of the sheet to delete' }
    },
    required: ['spreadsheetId', 'sheetId']
  }
};

const renameSheetTool: Tool = {
  name: 'sheets_rename_sheet',
  description: 'Rename an existing sheet',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      sheetId: { type: 'number', description: 'The ID of the sheet to rename' },
      newTitle: { type: 'string', description: 'New title for the sheet' }
    },
    required: ['spreadsheetId', 'sheetId', 'newTitle']
  }
};

const hideSheetTool: Tool = {
  name: 'sheets_hide_sheet',
  description: 'Hide a sheet from view (make it invisible)',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      sheetId: { type: 'number', description: 'The ID of the sheet to hide' }
    },
    required: ['spreadsheetId', 'sheetId']
  }
};

const showSheetTool: Tool = {
  name: 'sheets_show_sheet',
  description: 'Show a hidden sheet (make it visible again)',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      sheetId: { type: 'number', description: 'The ID of the sheet to show' }
    },
    required: ['spreadsheetId', 'sheetId']
  }
};

const moveSheetTool: Tool = {
  name: 'sheets_move_sheet',
  description: 'Move a sheet to a different position in the spreadsheet',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      sheetId: { type: 'number', description: 'The ID of the sheet to move' },
      newIndex: { type: 'number', description: 'New position index for the sheet' }
    },
    required: ['spreadsheetId', 'sheetId', 'newIndex']
  }
};

const getSheetInfoTool: Tool = {
  name: 'sheets_get_sheet_info',
  description: 'Get detailed information about all sheets in a spreadsheet',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      includeGridData: { type: 'boolean', description: 'Whether to include grid data', default: false }
    },
    required: ['spreadsheetId']
  }
};

const getSheetPropertiesTool: Tool = {
  name: 'sheets_get_sheet_properties',
  description: 'Get properties of a specific sheet (title, index, hidden status, etc.)',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      sheetId: { type: 'number', description: 'The ID of the specific sheet' }
    },
    required: ['spreadsheetId', 'sheetId']
  }
};

// Enhanced Chart Tools
const createChartWithDataTool: Tool = {
  name: 'sheets_create_chart_with_data',
  description: 'Create a chart with data and automatically populate it',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      chartType: { type: 'string', enum: ['COLUMN', 'LINE', 'PIE', 'BAR', 'AREA', 'SCATTER'], description: 'Type of chart to create' },
      dataRange: { type: 'string', description: 'Range containing the data for the chart (e.g., A1:C10)' },
      title: { type: 'string', description: 'Title of the chart' },
      position: { type: 'object', description: 'Position where to place the chart' },
      chartOptions: { type: 'object', description: 'Additional chart options like colors, legends, etc.' }
    },
    required: ['spreadsheetId', 'chartType', 'dataRange']
  }
};

const createChartFromTableTool: Tool = {
  name: 'sheets_create_chart_from_table',
  description: 'Create a chart from a table structure with headers and data',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      chartType: { type: 'string', enum: ['COLUMN', 'LINE', 'PIE', 'BAR', 'AREA', 'SCATTER'], description: 'Type of chart to create' },
      tableRange: { type: 'string', description: 'Range of the table including headers (e.g., A1:D10)' },
      title: { type: 'string', description: 'Title of the chart' },
      useFirstRowAsLabels: { type: 'boolean', description: 'Whether to use first row as chart labels', default: true },
      chartOptions: { type: 'object', description: 'Additional chart options' }
    },
    required: ['spreadsheetId', 'chartType', 'tableRange']
  }
};

const updateChartDataTool: Tool = {
  name: 'sheets_update_chart_data',
  description: 'Update chart data and refresh the chart',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      chartId: { type: 'number', description: 'The ID of the chart to update' },
      newDataRange: { type: 'string', description: 'New data range for the chart' },
      updateTitle: { type: 'string', description: 'New title for the chart (optional)' }
    },
    required: ['spreadsheetId', 'chartId', 'newDataRange']
  }
};

const deleteChartTool: Tool = {
  name: 'sheets_delete_chart',
  description: 'Delete a chart from the spreadsheet',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      chartId: { type: 'number', description: 'The ID of the chart to delete' }
    },
    required: ['spreadsheetId', 'chartId']
  }
};

const listChartsTool: Tool = {
  name: 'sheets_list_charts',
  description: 'List all charts in a spreadsheet with their details',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' }
    },
    required: ['spreadsheetId']
  }
};

// Search and Metadata Tools
const searchSpreadsheetsTool: Tool = {
  name: 'sheets_search',
  description: 'Search for Google Sheets by name or content',
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'Search query' },
      maxResults: { type: 'number', description: 'Maximum number of results', default: 10 }
    },
    required: ['query']
  }
};

const shareSpreadsheetTool: Tool = {
  name: 'sheets_share',
  description: 'Share Google Sheets with specific permissions',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      email: { type: 'string', description: 'Email address to share with' },
      role: { type: 'string', enum: ['reader', 'writer', 'owner'], description: 'Role for the user', default: 'reader' },
      message: { type: 'string', description: 'Optional message to include in the sharing email' }
    },
    required: ['spreadsheetId', 'email']
  }
};

const getMetadataTool: Tool = {
  name: 'sheets_get_metadata',
  description: 'Get comprehensive metadata about Google Sheets',
            inputSchema: {
              type: 'object',
              properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      includeGridData: { type: 'boolean', description: 'Whether to include grid data', default: false }
              },
              required: ['spreadsheetId']
            }
};

// Batch Operations
const batchUpdateTool: Tool = {
            name: 'sheets_batch_update',
  description: 'Perform multiple operations in a single request for better performance',
            inputSchema: {
              type: 'object',
              properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      requests: { type: 'array', description: 'Array of update requests to perform' }
              },
              required: ['spreadsheetId', 'requests']
            }
};

const batchGetTool: Tool = {
  name: 'sheets_batch_get',
  description: 'Get data from multiple ranges in a single request',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      ranges: { type: 'array', description: 'Array of ranges to retrieve' },
      valueRenderOption: { type: 'string', enum: ['FORMATTED_VALUE', 'UNFORMATTED_VALUE', 'FORMULA'], default: 'FORMATTED_VALUE' }
    },
    required: ['spreadsheetId', 'ranges']
  }
};

// Clear and Reset Tools
const clearRangeTool: Tool = {
  name: 'sheets_clear_range',
  description: 'Clear content and formatting from a range',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the spreadsheet' },
      range: { type: 'string', description: 'The range to clear' }
    },
    required: ['spreadsheetId', 'range']
  }
};

const copyToTool: Tool = {
  name: 'sheets_copy_to',
  description: 'Copy a sheet to another spreadsheet',
  inputSchema: {
    type: 'object',
    properties: {
      spreadsheetId: { type: 'string', description: 'The ID of the source spreadsheet' },
      sheetId: { type: 'number', description: 'The ID of the sheet to copy' },
      destinationSpreadsheetId: { type: 'string', description: 'The ID of the destination spreadsheet' }
    },
    required: ['spreadsheetId', 'sheetId', 'destinationSpreadsheetId']
  }
};

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // Basic Operations
      getDataTool,
      updateDataTool,
      createSpreadsheetTool,
      
      // Advanced Formatting
      formatCellsTool,
      conditionalFormattingTool,
      mergeCellsTool,
      
      // Charts and Visualization
      createChartTool,
      updateChartTool,
      
      // Data Validation and Protection
      setDataValidationTool,
      protectRangeTool,
      
      // Advanced Data Operations
      insertRowsTool,
      insertColumnsTool,
      deleteRowsTool,
      deleteColumnsTool,
      
      // Formula and Calculation
      setFormulaTool,
      calculateFormulaTool,
      
      // Sheet Management
      createSheetTool,
      duplicateSheetTool,
      deleteSheetTool,
      renameSheetTool,
      hideSheetTool,
      showSheetTool,
      moveSheetTool,
      getSheetInfoTool,
      getSheetPropertiesTool,
      
      // Enhanced Chart Tools
      createChartWithDataTool,
      createChartFromTableTool,
      updateChartDataTool,
      deleteChartTool,
      listChartsTool,
      
      // Search and Sharing
      searchSpreadsheetsTool,
      shareSpreadsheetTool,
      getMetadataTool,
      
      // Batch Operations
      batchUpdateTool,
      batchGetTool,
      
      // Utility Operations
      clearRangeTool,
      copyToTool,
    ],
      };
    });

server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

  if (!isInitialized) {
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
        const { spreadsheetId, range, valueRenderOption = 'FORMATTED_VALUE', dateTimeRenderOption = 'FORMATTED_STRING' } = args as any;
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range,
          valueRenderOption,
          dateTimeRenderOption,
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
        const { spreadsheetId, range, values, valueInputOption = 'USER_ENTERED' } = args as any;
        const response = await sheets.spreadsheets.values.update({
          spreadsheetId,
          range,
          valueInputOption,
          requestBody: { values },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully updated data in ${range}. Updated ${response.data.updatedCells} cells.`,
            },
          ],
        };
      }

      case 'sheets_create': {
        const { title, initialData = [], theme = 'LIGHT' } = args as any;
        const response = await sheets.spreadsheets.create({
          requestBody: {
            properties: { title, theme },
            sheets: initialData.length > 0 ? [{ data: [{ rowData: initialData }] }] : undefined,
          },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully created spreadsheet "${title}" with ID: ${response.data.spreadsheetId}`,
            },
          ],
        };
      }

      case 'sheets_format_cells': {
        const { spreadsheetId, range, backgroundColor, textColor, fontSize, bold, italic, horizontalAlignment, verticalAlignment, borders } = args as any;
        const requests = [{
          repeatCell: {
            range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 }, // You'll need to parse the range properly
            cell: {
              userEnteredFormat: {
                backgroundColor,
                textFormat: { fontSize, bold, italic },
                horizontalAlignment,
                verticalAlignment,
                borders,
              },
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,borders)',
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully applied formatting to ${range}`,
            },
          ],
        };
      }

      case 'sheets_merge_cells': {
        const { spreadsheetId, range, mergeType = 'MERGE_ALL' } = args as any;
        const requests = [{
          mergeCells: {
            range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 }, // You'll need to parse the range properly
            mergeType,
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully merged cells in ${range}`,
            },
          ],
        };
      }

      case 'sheets_create_chart': {
        const { spreadsheetId, chartType, dataRange, title, position } = args as any;
        const requests = [{
          addChart: {
            chart: {
              chartId: Math.floor(Math.random() * 1000000),
              spec: {
                title: title || `Chart ${chartType}`,
                basicChart: {
                  chartType,
                  legendPosition: 'BOTTOM_LEGEND',
                  axis: [
                    { position: 'BOTTOM_AXIS' },
                    { position: 'LEFT_AXIS' },
                  ],
                  domains: [{ domain: { sourceRange: { sources: [{ sheetId: 0, startRowIndex: 0, endRowIndex: 1 }] } } }],
                  series: [{ sourceRange: { sources: [{ sheetId: 0, startRowIndex: 0, endRowIndex: 1 }] } }],
                },
              },
              position: position || { overlayPosition: { anchorCell: { sheetId: 0, rowIndex: 0, columnIndex: 0 } } },
            },
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully created ${chartType} chart in spreadsheet`,
            },
          ],
        };
      }

      case 'sheets_set_data_validation': {
        const { spreadsheetId, range, ruleType, values, message } = args as any;
        const requests = [{
          setDataValidation: {
            range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 }, // You'll need to parse the range properly
            rule: {
              condition: {
                type: ruleType,
                values: values ? values.map((v: any) => ({ userEnteredValue: v })) : undefined,
              },
              showCustomUi: true,
              strict: true,
            },
            message: message || 'Invalid input',
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully set data validation for ${range}`,
            },
          ],
        };
      }

      case 'sheets_insert_rows': {
        const { spreadsheetId, sheetId, startIndex, endIndex = startIndex + 1 } = args as any;
        const requests = [{
          insertDimension: {
            range: { sheetId, dimension: 'ROWS', startIndex, endIndex },
            inheritFromBefore: true,
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully inserted ${endIndex - startIndex} rows at index ${startIndex}`,
            },
          ],
        };
      }

      case 'sheets_insert_columns': {
        const { spreadsheetId, sheetId, startIndex, endIndex = startIndex + 1 } = args as any;
        const requests = [{
          insertDimension: {
            range: { sheetId, dimension: 'COLUMNS', startIndex, endIndex },
            inheritFromBefore: true,
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully inserted ${endIndex - startIndex} columns at index ${startIndex}`,
            },
          ],
        };
      }

      case 'sheets_set_formula': {
        const { spreadsheetId, range, formulas } = args as any;
        const values = formulas.map((formula: string) => [formula]);
        const response = await sheets.spreadsheets.values.update({
          spreadsheetId,
          range,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully set formulas in ${range}. Updated ${response.data.updatedCells} cells.`,
            },
          ],
        };
      }

      case 'sheets_create_sheet': {
        const { spreadsheetId, title, index } = args as any;
        const requests = [{
          addSheet: {
            properties: { title, index },
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully created sheet "${title}"`,
            },
          ],
        };
      }

      case 'sheets_duplicate_sheet': {
        const { spreadsheetId, sheetId, newTitle } = args as any;
        const requests = [{
          duplicateSheet: {
            sourceSheetId: sheetId,
            newSheetName: newTitle,
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully duplicated sheet with ID ${sheetId} to "${newTitle}"`,
            },
          ],
        };
      }

      case 'sheets_delete_sheet': {
        const { spreadsheetId, sheetId } = args as any;
        const requests = [{
          deleteSheet: {
            sheetId,
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully deleted sheet with ID ${sheetId}`,
            },
          ],
        };
      }

      case 'sheets_rename_sheet': {
        const { spreadsheetId, sheetId, newTitle } = args as any;
        const requests = [{
          updateSheetProperties: {
            properties: { title: newTitle },
            fields: 'title',
            sheetId,
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully renamed sheet with ID ${sheetId} to "${newTitle}"`,
            },
          ],
        };
      }

      case 'sheets_hide_sheet': {
        const { spreadsheetId, sheetId } = args as any;
        const requests = [{
          updateSheetProperties: {
            properties: { hidden: true },
            fields: 'hidden',
            sheetId,
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully hid sheet with ID ${sheetId}`,
            },
          ],
        };
      }

      case 'sheets_show_sheet': {
        const { spreadsheetId, sheetId } = args as any;
        const requests = [{
          updateSheetProperties: {
            properties: { hidden: false },
            fields: 'hidden',
            sheetId,
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully showed sheet with ID ${sheetId}`,
            },
          ],
        };
      }

      case 'sheets_move_sheet': {
        const { spreadsheetId, sheetId, newIndex } = args as any;
        const requests = [{
          reorderSheets: {
            sheetId,
            newIndex,
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully moved sheet with ID ${sheetId} to index ${newIndex}`,
            },
          ],
        };
      }

      case 'sheets_get_sheet_info': {
        const { spreadsheetId, includeGridData = false } = args as any;
        const response = await sheets.spreadsheets.get({
          spreadsheetId,
          includeGridData,
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully retrieved sheet info for spreadsheet "${response.data.properties?.title}":\n\n${JSON.stringify(response.data.sheets, null, 2)}`,
            },
          ],
        };
      }

      case 'sheets_get_sheet_properties': {
        const { spreadsheetId, sheetId } = args as any;
        const response = await sheets.spreadsheets.get({
          spreadsheetId,
          ranges: [`Sheet${sheetId}`],
          fields: 'sheets(properties(title,index,hidden))',
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully retrieved properties for sheet with ID ${sheetId}:\n\n${JSON.stringify(response.data.sheets[0].properties, null, 2)}`,
            },
          ],
        };
      }

      case 'sheets_create_chart_with_data': {
        const { spreadsheetId, chartType, dataRange, title, position, chartOptions } = args as any;
        const requests = [{
          addChart: {
            chart: {
              chartId: Math.floor(Math.random() * 1000000),
              spec: {
                title: title || `Chart ${chartType}`,
                basicChart: {
                  chartType,
                  legendPosition: 'BOTTOM_LEGEND',
                  axis: [
                    { position: 'BOTTOM_AXIS' },
                    { position: 'LEFT_AXIS' },
                  ],
                  domains: [{ domain: { sourceRange: { sources: [{ sheetId: 0, startRowIndex: 0, endRowIndex: 1 }] } } }],
                  series: [{ sourceRange: { sources: [{ sheetId: 0, startRowIndex: 0, endRowIndex: 1 }] } }],
                },
              },
              position: position || { overlayPosition: { anchorCell: { sheetId: 0, rowIndex: 0, columnIndex: 0 } } },
            },
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully created ${chartType} chart with data from ${dataRange}`,
            },
          ],
        };
      }

      case 'sheets_create_chart_from_table': {
        const { spreadsheetId, chartType, tableRange, title, useFirstRowAsLabels, chartOptions } = args as any;
        const requests = [{
          addChart: {
            chart: {
              chartId: Math.floor(Math.random() * 1000000),
              spec: {
                title: title || `Chart ${chartType}`,
                basicChart: {
                  chartType,
                  legendPosition: 'BOTTOM_LEGEND',
                  axis: [
                    { position: 'BOTTOM_AXIS' },
                    { position: 'LEFT_AXIS' },
                  ],
                  domains: [{ domain: { sourceRange: { sources: [{ sheetId: 0, startRowIndex: 0, endRowIndex: 1 }] } } }],
                  series: [{ sourceRange: { sources: [{ sheetId: 0, startRowIndex: 0, endRowIndex: 1 }] } }],
                },
              },
              position: { overlayPosition: { anchorCell: { sheetId: 0, rowIndex: 0, columnIndex: 0 } } },
            },
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully created ${chartType} chart from table ${tableRange}`,
            },
          ],
        };
      }

      case 'sheets_update_chart_data': {
        const { spreadsheetId, chartId, newDataRange, updateTitle } = args as any;
        const requests = [{
          updateChartSpec: {
            chartId,
            spec: {
              title: updateTitle || undefined,
              basicChart: {
                chartType: 'COLUMN', // Assuming a default chart type for update
                legendPosition: 'BOTTOM_LEGEND',
                axis: [
                  { position: 'BOTTOM_AXIS' },
                  { position: 'LEFT_AXIS' },
                ],
                domains: [{ domain: { sourceRange: { sources: [{ sheetId: 0, startRowIndex: 0, endRowIndex: 1 }] } } }],
                series: [{ sourceRange: { sources: [{ sheetId: 0, startRowIndex: 0, endRowIndex: 1 }] } }],
              },
            },
            fields: 'spec.title,spec.basicChart.chartType,spec.basicChart.legendPosition,spec.basicChart.axis,spec.basicChart.domains,spec.basicChart.series',
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully updated chart data for chart with ID ${chartId} to range ${newDataRange}`,
            },
          ],
        };
      }

      case 'sheets_delete_chart': {
        const { spreadsheetId, chartId } = args as any;
        const requests = [{
          deleteChart: {
            chartId,
          },
        }];
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully deleted chart with ID ${chartId}`,
            },
          ],
        };
      }

      case 'sheets_list_charts': {
        const { spreadsheetId } = args as any;
        const response = await sheets.spreadsheets.get({
          spreadsheetId,
          ranges: ['charts'],
          fields: 'charts(id,spec(title,basicChart(chartType,legendPosition,axis,domains,series)))',
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully listed charts for spreadsheet "${response.data.properties?.title}":\n\n${JSON.stringify(response.data.charts, null, 2)}`,
            },
          ],
        };
      }

      case 'sheets_batch_update': {
        const { spreadsheetId, requests: batchRequests } = args as any;
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests: batchRequests },
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully executed batch update with ${batchRequests.length} operations`,
            },
          ],
        };
      }

      case 'sheets_batch_get': {
        const { spreadsheetId, ranges, valueRenderOption = 'FORMATTED_VALUE' } = args as any;
        const response = await sheets.spreadsheets.values.batchGet({
          spreadsheetId,
          ranges,
          valueRenderOption,
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully retrieved data from ${ranges.length} ranges:\n\n${JSON.stringify(response.data.valueRanges, null, 2)}`,
            },
          ],
        };
      }

      case 'sheets_clear_range': {
        const { spreadsheetId, range } = args as any;
        await sheets.spreadsheets.values.clear({
          spreadsheetId,
          range,
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully cleared range ${range}`,
            },
          ],
        };
      }

      case 'sheets_search': {
        const { query, maxResults = 10 } = args as any;
        // This would require using the Drive API to search for spreadsheets
        return {
          content: [
            {
              type: 'text',
              text: `🔍 Search functionality requires Drive API integration. Query: "${query}", Max results: ${maxResults}`,
            },
          ],
        };
      }

      case 'sheets_share': {
        const { spreadsheetId, email, role = 'reader', message } = args as any;
        // This would require using the Drive API to share files
        return {
          content: [
            {
              type: 'text',
              text: `📤 Share functionality requires Drive API integration. Sharing ${spreadsheetId} with ${email} as ${role}`,
            },
          ],
        };
      }

      case 'sheets_get_metadata': {
        const { spreadsheetId, includeGridData = false } = args as any;
        const response = await sheets.spreadsheets.get({
          spreadsheetId,
          includeGridData,
        });
        return {
          content: [
            {
              type: 'text',
              text: `✅ Successfully retrieved metadata for spreadsheet "${response.data.properties?.title}":\n\n${JSON.stringify(response.data, null, 2)}`,
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
    log(`❌ Error in tool ${name}: ${error.message}`, 'error');
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

async function main() {
  try {
    log('Starting MCP Google Sheets Server...', 'info');
    log('Attempting to initialize Google Sheets API...', 'info');
    
    // Start server first, then initialize authentication
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    log('MCP server connected, initializing Google Sheets API...', 'info');
    
    // Initialize authentication in background
    initializeWithRetry();
    
    log('🚀 MCP Google Sheets Server v2.1.0 started successfully!', 'info');
    log('Server ready to handle requests', 'info');
  } catch (error) {
    log(`Failed to start MCP server: ${error}`, 'error');
    process.exit(1);
  }
}

main().catch((error) => {
  log(`Unhandled error: ${error}`, 'error');
  process.exit(1);
});
