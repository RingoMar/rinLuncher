import { readFile } from "fs"

// src/electron.js
const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const { dialog } = require("electron")
const fs = require('fs')

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

ipcMain.on('open-directory-dialog', function (event) {
  let options = { properties: ["openDirectory"] }
  var dirs = dialog.showOpenDialog(options)
  dirs.then(ret_val => {
    event.sender.send('open-directory-name', ret_val)
  })



  // dialog.showOpenDialog(null, options, (filePaths) => {
  //     event.sender.send('open-dialog-paths-selected', filePaths)
  //   });

})


app.on('ready', createWindow)
