const config = require('./config.json')
const appInsights = require("applicationinsights")
if (config.appInsightsInstrumentationKey !== undefined)
    appInsights.setup(config.appInsightsInstrumentationKey)
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .start()

const setupEvents = require('./installer/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit, so don't do anything else
    return
}

const { app, BrowserWindow} = require('electron')

let mainWindow = null

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        kiosk: true,
        autoHideMenuBar: true
    })

    mainWindow.loadURL(`file://${__dirname}/kiosk.html`)

    mainWindow.on('close', _ => {
        mainWindow = null
        app.quit()
    })
})