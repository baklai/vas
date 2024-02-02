const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  receive: async (channel, data) => {
    const validChannels = ['versions', 'tasks', 'tasks-list'];
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