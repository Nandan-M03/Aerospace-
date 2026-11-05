import { PortfolioData } from '../types/portfolio';
import { initialPortfolioData } from '../data/initialData';

const PORTFOLIO_STORAGE_KEY = 'nandan_aerospace_portfolio_v1';
const DB_NAME = 'AerospacePortfolioDB';
const DB_VERSION = 1;
const PDF_STORE_NAME = 'project_pdfs';

// Initialize IndexedDB for PDF binary blobs
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported in this browser.'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(PDF_STORE_NAME)) {
        db.createObjectStore(PDF_STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

// Save PDF Blob / Base64 into IndexedDB
export async function savePdfToStorage(id: string, fileData: Blob | string, fileName: string): Promise<void> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(PDF_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(PDF_STORE_NAME);
      const record = {
        id,
        data: fileData,
        fileName,
        updatedAt: Date.now(),
      };
      const request = store.put(record);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to save PDF to IndexedDB:', err);
    throw err;
  }
}

// Retrieve PDF from IndexedDB as an Object URL or Data URL
export async function getPdfFromStorage(id: string): Promise<{ dataUrl: string; fileName: string } | null> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(PDF_STORE_NAME, 'readonly');
      const store = transaction.objectStore(PDF_STORE_NAME);
      const request = store.get(id);
      request.onsuccess = () => {
        const result = request.result;
        if (!result) {
          resolve(null);
          return;
        }

        if (result.data instanceof Blob) {
          const url = URL.createObjectURL(result.data);
          resolve({ dataUrl: url, fileName: result.fileName });
        } else if (typeof result.data === 'string') {
          // If stored as base64 string
          resolve({ dataUrl: result.data, fileName: result.fileName });
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to retrieve PDF from IndexedDB:', err);
    return null;
  }
}

// Delete PDF from IndexedDB
export async function deletePdfFromStorage(id: string): Promise<void> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(PDF_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(PDF_STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to delete PDF from IndexedDB:', err);
  }
}

// Load portfolio data from localStorage or fallback to defaults
export function loadPortfolioData(): PortfolioData {
  try {
    const serialized = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!serialized) {
      return initialPortfolioData;
    }
    const parsed = JSON.parse(serialized);
    if (!parsed.sections || !Array.isArray(parsed.sections)) {
      return initialPortfolioData;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to load portfolio data from storage:', e);
    return initialPortfolioData;
  }
}

// Save portfolio data to localStorage
export function savePortfolioData(data: PortfolioData): void {
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save portfolio data to storage:', e);
  }
}

// Reset portfolio data to default
export function resetPortfolioData(): PortfolioData {
  localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
  return initialPortfolioData;
}

