/* global process */
'use strict';

const path = require('path');
const {electron, ipcMain} = require('electron');
const is = require('electron-is');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    if (is.dev()) {
        mainWindow.loadURL('http://localhost:8080/index.html');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));
    }

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    ipcMain.on();
});
