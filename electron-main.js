import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import Store from 'electron-store'


const store = new Store({
  "name": "notesData",
  "defaults": {},
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });

  // Load the app
  const startUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, 'dist/index.html')}`;

  win.loadURL(startUrl).catch(err => {
    console.error('Failed to load URL:', err);
    app.quit();
  });

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('electron-store-get', (event, key) => {
      return store.get(key);
  });

  ipcMain.handle('electron-store-set', (event, key, val) => {
      store.set(key, val);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});