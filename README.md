# FFVN Video AutoConvert

Desktop application built with Electron + React for automatic AVI to MP4 conversion for medical IT systems (Medical IT Utility).

## Features

- ✅ Compact desktop interface, single-page layout (no scrolling)
- ✅ Automatically monitors folder `D:/ffvn/avi` every 60 seconds
- ✅ Detects and converts `*.avi` files to MP4 (H.264)
- ✅ **Preserves original AVI files** after conversion (does not delete)
- ✅ Displays real-time logs with full date and time (DD/MM/YYYY HH:mm:ss)
- ✅ START/STOP control via interface
- ✅ Layout optimized for 1366×768 and 1920×1080 displays
- ✅ Stable for medical environments (IVF/PACS)

## System Requirements

- **Windows 10/11**
- **Node.js** (v16 or higher)
- **FFmpeg** placed in the project's `ffmpeg/bin/` folder

### FFmpeg Setup

FFmpeg is located in the project folder:
- Path: `ffmpeg/bin/ffmpeg.exe`
- If not present, copy FFmpeg to the `ffmpeg/bin/` folder
- See detailed instructions in `electron/assets/README.md` (if available)

## Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Run application in development mode

```bash
npm run dev
```

This will:
- Start React development server on port **3333** (http://localhost:3333)
- Automatically open Electron window (browser will not open)
- **Does not** automatically open DevTools (menu bar is hidden)

### 3. Build application as .exe file

```bash
npm run build
```

The `.exe` file will be created in the `dist/` folder with the name **FFVN Video AutoConvert**.

## Configuration

Default configuration in `main.js`:

```javascript
const CONFIG = {
  WATCH_FOLDER: 'D:/ffvn/avi',      // Watch folder
  OUTPUT_FOLDER: 'D:/ffvn/mp4',     // Output folder
  INTERVAL_MS: 60000,                // 60 seconds
  FFMPEG_PATH: path.join(__dirname, 'ffmpeg', 'bin', 'ffmpeg.exe') // FFmpeg in project
};
```

To change configuration, edit `main.js` and rebuild the application.

## Usage

1. **Launch application**
   - Run `npm run dev` (development) or open the `.exe` file (production)

2. **Check configuration**
   - View Watch Folder, Output Folder, and Interval information on the interface
   - Compact layout, all information displayed on one screen

3. **Start conversion**
   - Click **START** button to begin monitoring the folder
   - Application will automatically check folder `D:/ffvn/avi` every 60 seconds
   - AVI files will be preserved in the source folder after conversion

4. **View logs**
   - All conversion activities will be displayed in the Log Panel
   - Logs display full date and time: `[DD/MM/YYYY HH:mm:ss]`
   - Logs update in real-time
   - Log panel has its own scroll (page does not scroll)

5. **Stop conversion**
   - Click **STOP** button to stop the monitoring process

## Interface

- **Layout**: Compact single-page, no scrolling
- **Max width**: 960px, centered
- **Header**: Compact with title "FFVN Video AutoConvert" and subtitle "Medical IT Utility"
- **Configuration**: Displayed in one row (Watch Folder | Output Folder | Interval)
- **Controls**: START/STOP buttons and status indicator inline
- **Logs**: Fixed panel with internal scrolling
- **Theme**: Neutral medical blue + white, suitable for medical environments

## Project Structure

```
ffvn-video-autoconvert/
├── main.js              # Electron main process (conversion logic)
├── preload.js           # IPC bridge (React ↔ Electron communication)
├── package.json         # Dependencies and scripts
├── electron/
│   └── assets/          # Application icons (fujifilm.ico)
├── ffmpeg/
│   └── bin/
│       └── ffmpeg.exe   # FFmpeg binary
├── public/
│   └── index.html       # HTML template
└── src/
    ├── index.js         # React entry point
    ├── index.css        # Global styles
    ├── App.js           # React main component
    └── App.css          # Component styles
```

## FFmpeg Encoding Settings

The application uses the following encoding parameters:

- **Video Codec**: H.264 (libx264)
- **Preset**: fast
- **CRF**: 23 (good quality)
- **Audio Codec**: AAC

Sample command:
```bash
ffmpeg -y -i input.avi -c:v libx264 -preset fast -crf 23 -c:a aac output.mp4
```

## Log Format

Logs display with full date and time format:

```
[22/01/2026 10:30:45] [INFO] Starting conversion: video.avi → video.mp4
[22/01/2026 10:32:15] [SUCCESS] Conversion completed: video.mp4
[22/01/2026 10:32:15] [SUCCESS] Successfully processed: video.avi (AVI file kept in source folder)
```

## File Handling

- **Input**: AVI files in `D:/ffvn/avi`
- **Output**: MP4 files in `D:/ffvn/mp4`
- **Source files**: AVI files are **NOT deleted** after successful conversion
- Both AVI and MP4 files will coexist (AVI in source folder, MP4 in output folder)

## Notes for Medical Environments

- ✅ **Stable**: Logic runs in main process, does not block UI
- ✅ **Error handling**: Comprehensive error handling, application does not crash
- ✅ **Logging**: Detailed logging with full date and time for IT team
- ✅ **Non-blocking**: Uses async/await, does not block thread
- ✅ **Medical-grade**: Suitable for IVF/PACS environments
- ✅ **Compact UI**: Optimized layout, no scrolling, easy to use
- ✅ **File safety**: Preserves source files, no automatic deletion

## Troubleshooting

### FFmpeg not found

- Check that FFmpeg is placed in `ffmpeg/bin/ffmpeg.exe`
- If not present, copy FFmpeg to the `ffmpeg/bin/` folder
- Or edit `CONFIG.FFMPEG_PATH` in `main.js` to point to the full path

### Folder does not exist

- Application will automatically create the output folder (`D:/ffvn/mp4`) if it doesn't exist
- Ensure the watch folder (`D:/ffvn/avi`) exists

### Conversion failed

- Check logs in the UI to see error details
- Ensure AVI file is not corrupted
- Check available disk space
- Check folder access permissions

### Port 3333 already in use

- Kill the process using port 3333: `Get-Process -Id (Get-NetTCPConnection -LocalPort 3333).OwningProcess | Stop-Process -Force`
- Or change PORT in the `.env` file

### DevTools not opening

- DevTools does not open automatically on startup (by design)
- If debugging is needed, press `Ctrl+Shift+I` to open DevTools

## Application Branding

- **Application Name**: FFVN Video AutoConvert
- **Subtitle**: Medical IT Utility
- **Icon**: Fujifilm logo (fujifilm.ico) - place in `electron/assets/`
- **Window Title**: FFVN Video AutoConvert
- **Menu Bar**: Completely hidden (autoHideMenuBar: true)

## License

MIT License - Medical IT Systems

## Support

Contact IT team for support.
