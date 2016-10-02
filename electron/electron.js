/* global process */
'use strict';

const path = require('path');
const electron = require('electron');

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

    if (process.env.NODE_ENV === 'dev') {
        mainWindow.loadURL('http://localhost:8080/index.html');
    } else {
        mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));
    }

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
