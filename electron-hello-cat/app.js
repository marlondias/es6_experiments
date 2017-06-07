const electron = require('electron');
electron.app.on('ready', () => {
	let mainWindow = new electron.BrowserWindow({width: 600, height: 600});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
});