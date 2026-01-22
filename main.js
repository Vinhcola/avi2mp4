/**
 * Electron Main Process
 * 
 * Responsibilities:
 * - Watch folder D:/avi every 60 seconds
 * - Detect *.avi files
 * - Convert AVI → MP4 using local ffmpeg
 * - Output to D:/mp4
 * - Delete AVI after successful conversion
 * - Send logs to React UI via IPC
 * 
 * Medical IT System - IVF/PACS Environment
 * Stability and reliability are critical
 */

const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration - Medical environment settings
const CONFIG = {
  WATCH_FOLDER: 'D:/ffvn/avi',
  OUTPUT_FOLDER: 'D:/ffvn/mp4',
  INTERVAL_MS: 60000, // 60 seconds
  FFMPEG_PATH: path.join(__dirname, 'ffmpeg', 'bin', 'ffmpeg.exe'), // Local FFmpeg in project folder
  FFMPEG_ARGS: [
    '-y', // Overwrite output files
    '-i', // Input file
    '', // Input file path (will be set dynamically)
    '-c:v', 'libx264', // Video codec: H.264
    '-preset', 'fast', // Encoding preset
    '-crf', '23', // Constant Rate Factor (quality)
    '-c:a', 'aac', // Audio codec: AAC
    '' // Output file path (will be set dynamically)
  ]
};

let mainWindow = null;
let watchInterval = null;
let isWatching = false;

/**
 * Create the main application window
 */
function createWindow() {
  // Icon path - ưu tiên fujifilm.ico, fallback về icon.ico
  const iconPath = path.join(__dirname, 'electron', 'assets', 'fujifilm.ico');
  const fallbackIconPath = path.join(__dirname, 'electron', 'assets', 'icon.ico');
  const defaultIconPath = fsSync.existsSync(iconPath) ? iconPath : 
                          (fsSync.existsSync(fallbackIconPath) ? fallbackIconPath : null);

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    title: 'FFVN Video AutoConvert',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: defaultIconPath,
    show: false, // Don't show until ready
    autoHideMenuBar: true // Ẩn menu bar
  });

  // Ẩn menu bar hoàn toàn
  Menu.setApplicationMenu(null);

  // Load React app
  const isDev = process.env.ELECTRON_IS_DEV === '1' || !app.isPackaged;
  
  if (isDev) {
    // Retry loading React dev server (may take a few seconds to start)
    const loadReactApp = () => {
      mainWindow.loadURL('http://localhost:3333').catch((error) => {
        console.log('React dev server not ready yet, retrying in 2 seconds...');
        setTimeout(loadReactApp, 2000);
      });
    };
    
    // Handle page load errors
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.log(`Failed to load: ${errorCode} - ${errorDescription}`);
      if (errorCode === -106) {
        // ERR_INTERNET_DISCONNECTED or connection refused
        console.log('Retrying connection to React dev server...');
        setTimeout(loadReactApp, 2000);
      }
    });
    
    // Show window when ready
    mainWindow.webContents.once('did-finish-load', () => {
      mainWindow.show();
      // DevTools đã được tắt - không mở tự động
    });
    
    // Start loading
    loadReactApp();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

/**
 * Send log message to React UI
 * @param {string} level - Log level: 'info', 'success', 'error', 'warning'
 * @param {string} message - Log message
 */
function sendLog(level, message) {
  // Format: DD/MM/YYYY HH:mm:ss
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timestamp = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  
  const logEntry = {
    timestamp,
    level,
    message
  };

  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('log', logEntry);
  }
  
  // Also log to console for debugging
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
}

/**
 * Ensure output directory exists
 * @returns {Promise<void>}
 */
async function ensureOutputFolder() {
  try {
    await fs.access(CONFIG.OUTPUT_FOLDER);
    sendLog('info', `Output folder verified: ${CONFIG.OUTPUT_FOLDER}`);
  } catch (error) {
    try {
      await fs.mkdir(CONFIG.OUTPUT_FOLDER, { recursive: true });
      sendLog('info', `Created output folder: ${CONFIG.OUTPUT_FOLDER}`);
    } catch (mkdirError) {
      sendLog('error', `Failed to create output folder: ${mkdirError.message}`);
      throw mkdirError;
    }
  }
}

/**
 * Check if watch folder exists
 * @returns {Promise<boolean>}
 */
async function checkWatchFolder() {
  try {
    await fs.access(CONFIG.WATCH_FOLDER);
    return true;
  } catch (error) {
    sendLog('error', `Watch folder not found: ${CONFIG.WATCH_FOLDER}`);
    return false;
  }
}

/**
 * Get all AVI files in watch folder
 * @returns {Promise<string[]>} Array of file paths
 */
async function getAviFiles() {
  try {
    const files = await fs.readdir(CONFIG.WATCH_FOLDER);
    const aviFiles = files
      .filter(file => file.toLowerCase().endsWith('.avi'))
      .map(file => path.join(CONFIG.WATCH_FOLDER, file));
    
    return aviFiles;
  } catch (error) {
    sendLog('error', `Error reading watch folder: ${error.message}`);
    return [];
  }
}

/**
 * Convert AVI file to MP4 using ffmpeg
 * @param {string} inputPath - Path to input AVI file
 * @returns {Promise<string>} Path to output MP4 file
 */
async function convertAviToMp4(inputPath) {
  const fileName = path.basename(inputPath, '.avi');
  const outputPath = path.join(CONFIG.OUTPUT_FOLDER, `${fileName}.mp4`);

  // Build ffmpeg command
  const args = [...CONFIG.FFMPEG_ARGS];
  const inputIndex = args.indexOf('-i') + 1;
  const outputIndex = args.length - 1;
  
  args[inputIndex] = inputPath;
  args[outputIndex] = outputPath;

  const command = `${CONFIG.FFMPEG_PATH} ${args.join(' ')}`;

  sendLog('info', `Starting conversion: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);

  try {
    const { stdout, stderr } = await execAsync(command, {
      maxBuffer: 10 * 1024 * 1024 // 10MB buffer for ffmpeg output
    });

    // Check if output file was created
    try {
      await fs.access(outputPath);
      sendLog('success', `Conversion completed: ${path.basename(outputPath)}`);
      return outputPath;
    } catch (accessError) {
      throw new Error('Output file was not created after conversion');
    }
  } catch (error) {
    sendLog('error', `Conversion failed for ${path.basename(inputPath)}: ${error.message}`);
    throw error;
  }
}

/**
 * Delete AVI file after successful conversion
 * @param {string} filePath - Path to AVI file
 * @returns {Promise<void>}
 */
async function deleteAviFile(filePath) {
  try {
    await fs.unlink(filePath);
    sendLog('info', `Deleted source file: ${path.basename(filePath)}`);
  } catch (error) {
    sendLog('error', `Failed to delete source file ${path.basename(filePath)}: ${error.message}`);
    throw error;
  }
}

/**
 * Process a single AVI file
 * @param {string} aviPath - Path to AVI file
 * @returns {Promise<void>}
 */
async function processAviFile(aviPath) {
  try {
    // Convert AVI to MP4
    await convertAviToMp4(aviPath);
    
    // Note: AVI file is NOT deleted - kept in source folder
    // Original requirement: Delete AVI after conversion
    // Updated requirement: Keep AVI files in source folder
    
    sendLog('success', `Successfully processed: ${path.basename(aviPath)} (AVI file kept in source folder)`);
  } catch (error) {
    sendLog('error', `Failed to process ${path.basename(aviPath)}: ${error.message}`);
    // Don't throw - continue processing other files
  }
}

/**
 * Watch folder and process AVI files
 * This function runs periodically (every 60 seconds)
 */
async function watchAndConvert() {
  if (!isWatching) {
    return;
  }

  try {
    // Check if watch folder exists
    const folderExists = await checkWatchFolder();
    if (!folderExists) {
      return;
    }

    // Ensure output folder exists
    await ensureOutputFolder();

    // Get all AVI files
    const aviFiles = await getAviFiles();

    if (aviFiles.length === 0) {
      sendLog('info', 'No AVI files found in watch folder');
      return;
    }

    sendLog('info', `Found ${aviFiles.length} AVI file(s) to process`);

    // Process each file sequentially to avoid overloading system
    for (const aviFile of aviFiles) {
      await processAviFile(aviFile);
    }
  } catch (error) {
    sendLog('error', `Error in watch cycle: ${error.message}`);
  }
}

/**
 * Start watching folder
 */
function startWatching() {
  if (isWatching) {
    sendLog('warning', 'Watch process is already running');
    return;
  }

  isWatching = true;
  sendLog('success', 'Started watching folder');
  sendLog('info', `Watch folder: ${CONFIG.WATCH_FOLDER}`);
  sendLog('info', `Output folder: ${CONFIG.OUTPUT_FOLDER}`);
  sendLog('info', `Check interval: ${CONFIG.INTERVAL_MS / 1000} seconds`);

  // Run immediately, then every interval
  watchAndConvert();
  watchInterval = setInterval(watchAndConvert, CONFIG.INTERVAL_MS);
}

/**
 * Stop watching folder
 */
function stopWatching() {
  if (!isWatching) {
    sendLog('warning', 'Watch process is not running');
    return;
  }

  isWatching = false;
  if (watchInterval) {
    clearInterval(watchInterval);
    watchInterval = null;
  }
  sendLog('info', 'Stopped watching folder');
}

// IPC Handlers - Communication with React UI

/**
 * Handle START request from React UI
 */
ipcMain.on('start-watch', (event) => {
  startWatching();
  event.reply('watch-status', { isWatching: true });
});

/**
 * Handle STOP request from React UI
 */
ipcMain.on('stop-watch', (event) => {
  stopWatching();
  event.reply('watch-status', { isWatching: false });
});

/**
 * Handle GET-STATUS request from React UI
 */
ipcMain.on('get-status', (event) => {
  event.reply('watch-status', { isWatching });
});

/**
 * Handle GET-CONFIG request from React UI
 */
ipcMain.on('get-config', (event) => {
  event.reply('config', {
    watchFolder: CONFIG.WATCH_FOLDER,
    outputFolder: CONFIG.OUTPUT_FOLDER,
    interval: CONFIG.INTERVAL_MS / 1000
  });
});

// Electron App Lifecycle

app.whenReady().then(() => {
  createWindow();
  sendLog('info', 'Application started');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Stop watching before closing
  stopWatching();
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  // Clean up interval
  stopWatching();
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  sendLog('error', `Uncaught exception: ${error.message}`);
  console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  sendLog('error', `Unhandled rejection: ${reason}`);
  console.error('Unhandled rejection:', reason);
});

