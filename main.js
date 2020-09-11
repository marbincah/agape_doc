const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

app.on('ready', function(){
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', function(){
        app.quit();
    })

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

// function createLabelWindow() {
//     labelWindow = new BrowserWindow({
//         title: 'Label Resep',
//         webPreferences: {
//             nodeIntegration: true
//         }
//     })
// }


const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];


if(process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                submenu: [
                    {
                        label: 'Toggle DevTools',
                        accelerator: process.platform == "darwin" ? 'Command+I' : 'Ctrl+I',
                        click(item, focusedWindow){
                            focusedWindow.toggleDevTools();
                        }
                    },
                    {
                        role: 'reload'
                    }
                ]
            }
        ]
    })
}