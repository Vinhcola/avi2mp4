# Application Icons

## Required Files

Place the following icon files in this directory:

- **fujifilm.ico** - Main application icon (Fujifilm logo)
  - Format: .ico (Windows icon format)
  - Recommended sizes: 16x16, 32x32, 48x48, 256x256 pixels
  - This icon will be used for:
    - Electron BrowserWindow icon
    - Application tray icon (if exists)
    - Window title bar icon
    - Built .exe file icon

## Icon Requirements

- File name: `fujifilm.ico`
- Format: ICO format (multi-resolution)
- Minimum sizes: 16x16, 32x32, 48x48, 256x256
- The icon should be the official Fujifilm logo

## Fallback

If `fujifilm.ico` is not found, the application will attempt to use `icon.ico` as a fallback.

## Notes

- Ensure the icon file is properly formatted for Windows
- The icon will be bundled into the .exe during the build process
- For best results, use a professional icon editor to create multi-resolution ICO files


