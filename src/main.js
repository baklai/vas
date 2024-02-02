import { app, Tray, Menu, nativeImage, BrowserWindow, Notification, ipcMain } from 'electron';
import { join } from 'path';

import phrases from './data/phrases/index.js';
import { searchTask, taskList } from './data/tasks/index.js';

if (require('electron-squirrel-startup')) {
  app.quit();
}

function showNotification(title, body, onclick) {
  if (!title || !body) return;
  new Notification({ title, body }).show();
}

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 600,
    title: 'Voice Assistant System',
    icon: join(__dirname, '..', 'build', 'icons', 'win', 'icon.ico'),
    frame: false,

    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.setBackgroundColor('#292524');

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('isMaximized');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('isRestored');
  });

  ipcMain.on('minimize', (event, args) => {
    mainWindow.minimize();
  });

  ipcMain.on('maximize', (event, args) => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });

  // Open Dev Tools
  // mainWindow.webContents.openDevTools();
};

app.on('ready', async () => {
  createWindow();

  ipcMain.on('close', (event, args) => {
    app.quit();
  });

  const icon = nativeImage.createFromPath(
    join(__dirname, '..', 'build', 'icons', 'win', 'icon.ico')
  );

  const tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Відкрити', type: 'normal' },
    { type: 'separator' },
    {
      label: 'Вихід',
      type: 'normal',
      click: () => app.quit()
    }
  ]);

  tray.setTitle('VAS | Vasyl'); 

  tray.setToolTip('Voice Assistant System');

  tray.setContextMenu(contextMenu);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('tasks', (event, args) => {
  return '';
});

ipcMain.handle('tasks-list', (event, args) => {
  const tasks = taskList();
  return tasks;
});

ipcMain.handle('versions', (event, args) => {
  const versions = [
    { key: 'version', title: 'Version' },
    { key: 'chrome', title: 'Chromium' },
    { key: 'electron', title: 'Electron' },
    { key: 'node', title: 'Node.js' },
    { key: 'v8', title: 'V8' }
  ];

  return versions.map(item => {
    return {
      ...item,
      version: process.versions[item.key] || '-'
    };
  });
});
