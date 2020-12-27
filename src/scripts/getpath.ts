import * as rinLib from '../scripts/passoutput.js';
import * as $ from 'jquery';
import * as electron from 'electron';
const ipc = electron.ipcRenderer
import * as fs from 'fs';
import * as popper from 'popper.js';

const dir = process.env.APPDATA + '/oybotLuncher'

if (!fs.existsSync(dir)) {
    console.log("making dir", dir)
    fs.mkdirSync(dir);
    let data = `{"baseDir": ""}`;
    fs.writeFileSync(`${dir}/settings.json`, data);
};

const dataSettings = fs.readFileSync(`${dir}/settings.json`,
    { encoding: 'utf8', flag: 'r' });

const dataSetting = JSON.parse(dataSettings);

if (dataSetting["baseDir"]) {

    rinLib.rinConsole("info", "Your base folder was found!")
    $("#fileId").val(dataSetting["baseDir"]);
} else {
    rinLib.rinConsole("err", "Your base folder could not be found!")
    $("#fileId").addClass("missing")
}

const errorBtn = document.getElementById('btnLoadFile')

errorBtn.addEventListener('click', function () {
    rinLib.rinConsole("info", "Opening to find folder path!")
    ipc.send('open-directory-dialog')
})

ipc.on("open-directory-name", function (event, argv) {
    var stringForFile = argv.filePaths[0]
    $("#fileId").val(stringForFile.replace(/\\/g, "/"));
    $("#fileId").removeClass("missing")
    var data = `{"baseDir": "${stringForFile.replace(/\\/g, "/")}"}`;
    fs.writeFileSync(`${dir}/settings.json`, data);
    rinLib.rinConsole("success", "Got your folder path!")
})

