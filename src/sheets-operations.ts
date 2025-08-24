import { sheets_v4, drive_v3 } from 'googleapis';

// Get data from spreadsheet
export async function getSpreadsheetData(sheets: sheets_v4.Sheets, args: any) {
  const { spreadsheetId, range } = args;
  
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: range || 'A1:Z1000'
    });

    return {
      content: [
        {
          type: 'text',
          text: `Data retrieved from ${spreadsheetId}:\n${JSON.stringify(response.data, null, 2)}`
        }
      ]
    };
  } catch (error) {
    throw new Error(`Failed to get spreadsheet data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Update data in spreadsheet
export async function updateSpreadsheetData(sheets: sheets_v4.Sheets, args: any) {
  const { spreadsheetId, range, values } = args;
  
  try {
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: { values }
    });

    return {
      content: [
        {
          type: 'text',
          text: `Data updated successfully in ${spreadsheetId}:\n${JSON.stringify(response.data, null, 2)}`
        }
      ]
    };
  } catch (error) {
    throw new Error(`Failed to update spreadsheet data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Create new spreadsheet
export async function createSpreadsheet(sheets: sheets_v4.Sheets, args: any) {
  const { title, sheets: sheetConfigs = [] } = args;
  
  try {
    const response = await sheets.spreadsheets.create({
      requestBody: {
        properties: { title },
        sheets: sheetConfigs
      }
    });

    return {
      content: [
        {
          type: 'text',
          text: `Spreadsheet created successfully:\nID: ${response.data.spreadsheetId}\nTitle: ${response.data.properties?.title}\nURL: ${response.data.spreadsheetUrl}`
        }
      ]
    };
  } catch (error) {
    throw new Error(`Failed to create spreadsheet: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Delete spreadsheet
export async function deleteSpreadsheet(drive: drive_v3.Drive, args: any) {
  const { spreadsheetId } = args;
  
  try {
    await drive.files.delete({ fileId: spreadsheetId });
    
    return {
      content: [
        {
          type: 'text',
          text: `Spreadsheet ${spreadsheetId} deleted successfully`
        }
      ]
    };
  } catch (error) {
    throw new Error(`Failed to delete spreadsheet: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Get spreadsheet metadata
export async function getSpreadsheetMetadata(sheets: sheets_v4.Sheets, args: any) {
  const { spreadsheetId } = args;
  
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
      ranges: [],
      includeGridData: false
    });

    return {
      content: [
        {
          type: 'text',
          text: `Spreadsheet metadata for ${spreadsheetId}:\n${JSON.stringify(response.data, null, 2)}`
        }
      ]
    };
  } catch (error) {
    throw new Error(`Failed to get spreadsheet metadata: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Search spreadsheets
export async function searchSpreadsheets(drive: drive_v3.Drive, args: any) {
  const { query, maxResults = 10 } = args;
  
  try {
    const response = await drive.files.list({
      q: `name contains '${query}' and mimeType='application/vnd.google-apps.spreadsheet'`,
      fields: 'files(id,name,webViewLink,createdTime,modifiedTime)',
      pageSize: maxResults,
      orderBy: 'modifiedTime desc'
    });

    return {
      content: [
        {
          type: 'text',
          text: `Search results for '${query}':\n${JSON.stringify(response.data.files, null, 2)}`
        }
      ]
    };
  } catch (error) {
    throw new Error(`Failed to search spreadsheets: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Copy spreadsheet
export async function copySpreadsheet(drive: drive_v3.Drive, args: any) {
  const { spreadsheetId, title } = args;
  
  try {
    const response = await drive.files.copy({
      fileId: spreadsheetId,
      requestBody: { name: title }
    });

    return {
      content: [
        {
          type: 'text',
          text: `Spreadsheet copied successfully:\nNew ID: ${response.data.id}\nTitle: ${response.data.name}`
        }
      ]
    };
  } catch (error) {
    throw new Error(`Failed to copy spreadsheet: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Share spreadsheet
export async function shareSpreadsheet(drive: drive_v3.Drive, args: any) {
  const { spreadsheetId, email, role } = args;
  
  try {
    const response = await drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: {
        type: 'user',
        role,
        emailAddress: email
      }
    });

    return {
      content: [
        {
          type: 'text',
          text: `Spreadsheet shared successfully with ${email} (${role})`
        }
      ]
    };
  } catch (error) {
    throw new Error(`Failed to share spreadsheet: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Get spreadsheet revisions
export async function getSpreadsheetRevisions(drive: drive_v3.Drive, args: any) {
  const { spreadsheetId } = args;
  
  try {
    const response = await drive.revisions.list({ fileId: spreadsheetId });

    return {
      content: [
        {
          type: 'text',
          text: `Revision history for ${spreadsheetId}:\n${JSON.stringify(response.data, null, 2)}`
        }
      ]
    };
  } catch (error) {
    throw new Error(`Failed to get spreadsheet revisions: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Batch update spreadsheet
export async function batchUpdateSpreadsheet(sheets: sheets_v4.Sheets, args: any) {
  const { spreadsheetId, requests } = args;
  
  try {
    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests }
    });

    return {
      content: [
        {
          type: 'text',
          text: `Batch update completed successfully:\n${JSON.stringify(response.data, null, 2)}`
        }
      ]
    };
  } catch (error) {
    throw new Error(`Failed to batch update spreadsheet: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
