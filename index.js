const {
  app,
  BrowserWindow,
  globalShortcut
} = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })



  mainWindow.loadURL('http://localhost:4200/');
  mainWindow.removeMenu()
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
  globalShortcut.register('CommandOrControl+R', () => {
    console.log('CommandOrControl+R is pressed');
    mainWindow.loadURL('http://localhost:4200');
  })
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
