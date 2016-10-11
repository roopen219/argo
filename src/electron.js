/* global process */
'use strict';

const path = require('path');
const {app, BrowserWindow, protocol} = require('electron');
const is = require('electron-is');

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

protocol.registerStandardSchemes(['ramiel'])

app.on('ready', function() {
    protocol.registerFileProtocol('ramiel', (request, callback) => {
        const url = request.url.substr(13)
        console.log(url);
        console.log(path.resolve(`${__dirname}/${url}`))

        if (url.length) {
            callback(path.resolve(`${__dirname}/${url}`))
        } else {
            callback(path.resolve(`${__dirname}/index.html`))
        }

    })

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    // if (is.dev()) {
    //     mainWindow.loadURL('http://localhost:8080/index.html');
    //     mainWindow.webContents.openDevTools();
    // } else {
        mainWindow.loadURL('ramiel://app');
    // }

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
