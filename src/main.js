'use strict';
const electron = require('electron');
const { app, BrowserWindow } = electron;
const { autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');

require('./electron-config')();
require('electron-debug')({showDevTools: isDev});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
      width: 1000,
      height: 700,
      minWidth: 515,
      minHeight: 400,
      title: 'OmniPlaylist',
      frame: false,
      icon: __dirname + '/assets/images/omniplaylist-icon.ico'
  });
  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/home/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// Initialize autoupdater
autoUpdater.on('update-downloaded', (info) => {
    setTimeout(function() {
        autoUpdater.quitAndInstall();
    }, 3000)
});
// Update messages
function sendStatusToWindow(text) {
    mainWindow.webContents.send('message', text);
}

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
});

autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
});

autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater.');
});

autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded; will install in 3 seconds');
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
    createWindow();
    if (!isDev) {
        autoUpdater.checkForUpdates();
    }
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});