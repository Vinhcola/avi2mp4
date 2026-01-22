/**
 * Preload Script - IPC Bridge
 * 
 * This script runs in a context with access to both Node.js APIs
 * and the renderer process. It safely exposes IPC methods to React.
 * 
 * Security: contextIsolation is enabled, so we expose only what's needed.
 */

const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process
// to use ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Start watching folder
  startWatch: () => ipcRenderer.send('start-watch'),
  
  // Stop watching folder
  stopWatch: () => ipcRenderer.send('stop-watch'),
  
  // Get current watch status
  getStatus: () => ipcRenderer.send('get-status'),
  
  // Get configuration
  getConfig: () => ipcRenderer.send('get-config'),
  
  // Listen for log messages from main process
  onLog: (callback) => {
    ipcRenderer.on('log', (event, logEntry) => callback(logEntry));
  },
  
  // Listen for watch status updates
  onWatchStatus: (callback) => {
    ipcRenderer.on('watch-status', (event, status) => callback(status));
  },
  
  // Listen for config updates
  onConfig: (callback) => {
    ipcRenderer.on('config', (event, config) => callback(config));
  },
  
  // Remove listeners (cleanup)
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});

