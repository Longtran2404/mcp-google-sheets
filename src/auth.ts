import { google } from 'googleapis';
import { authenticate as localAuth } from '@google-cloud/local-auth';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file'
];

const CREDENTIALS_PATH = path.join(__dirname, '..', 'credentials.json');
const TOKEN_PATH = path.join(__dirname, '..', 'token.json');

export async function authenticate(): Promise<any> {
  try {
    // Check if we have service account credentials
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountKey) {
      // Use service account authentication
      const credentials = JSON.parse(serviceAccountKey);
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES
      });
      return auth;
    }

    // Check if we have application default credentials
    const applicationDefaultCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (applicationDefaultCredentials) {
      const auth = new google.auth.GoogleAuth({
        keyFile: applicationDefaultCredentials,
        scopes: SCOPES
      });
      return auth;
    }

    // Try local authentication (OAuth2)
    try {
      const auth = await localAuth({
        keyfilePath: CREDENTIALS_PATH,
        scopes: SCOPES
      });
      return auth;
    } catch (error) {
      console.error('Local authentication failed:', error);
    }

    // Fallback to application default credentials
    const auth = new google.auth.GoogleAuth({
      scopes: SCOPES
    });
    return auth;

  } catch (error) {
    throw new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function validateAuth(auth: any): boolean {
  return auth && typeof auth.getClient === 'function';
}
