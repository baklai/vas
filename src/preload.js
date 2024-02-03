const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  versions: () => {
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
  },

  receive: async (channel, data) => {
    const validChannels = ['tasks', 'tasks-list'];
    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel, data);
    }
  },

  send: (channel, data) => {
    const validChannels = ['close', 'minimize', 'maximize'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  on: (channel, func) => {
    const validChannels = ['isMaximized', 'isRestored'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});

window.addEventListener('DOMContentLoaded', () => {});
