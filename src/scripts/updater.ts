import * as fs from 'fs';
import * as $ from 'jquery';
import * as rinLib from '../scripts/passoutput.js';
import { spawn } from 'child_process';
import * as request from "request-promise-native";

const dir = process.env.APPDATA + '/oybotLuncher/settings.json'
const downloadDir = process.env.APPDATA + '\\oybotLuncher\\'
const dataSettings = fs.readFileSync(dir, { encoding: 'utf8', flag: 'r' });
const dataSetting = JSON.parse(dataSettings);
var updateReady: boolean = true;
var updateNumber: string = "";

fs.readFile(`${dataSetting["baseDir"]}/version.json`, { encoding: 'utf8', flag: 'r' }, function (err, stats) {
    if (err) {
        (async () => {
            var options = {
                uri: "https://raw.githubusercontent.com/RingoMar/androyd/master/version.json"
            };

            const result = await request.get(options);
            const resultJson = JSON.parse(result);
            let cloudVerson = resultJson.version;
            updateNumber = cloudVerson
            rinLib.rinConsole("info", "Oybot version file is missing!");

            rinLib.rinConsole("success", "Oybot cloud connected.")
            rinLib.rinConsole("info", `Oybot version ${cloudVerson} ready!`)
            $(".updaterbutton").append(cloudVerson);

        })()

    }
    rinLib.rinConsole("info", "Oybot version file was found!");
    rinLib.rinConsole("info", "Checking for new update....");
    let versionNumber = fs.readFileSync(`${dataSetting["baseDir"]}/version.json`, { encoding: 'utf8', flag: 'r' });
    const versionJson = JSON.parse(versionNumber);
    let verString: number = +versionJson["version"];

    (async () => {
        var options = {
            uri: "https://raw.githubusercontent.com/RingoMar/androyd/master/version.json"
        };

        const result = await request.get(options);
        const resultJson = JSON.parse(result);
        let cloudVerson = resultJson.version;
        rinLib.rinConsole("success", "Oybot cloud connected.")
        let verCloud: number = cloudVerson;
        updateNumber = cloudVerson
        if (verString < verCloud) {
            $(".updaterbutton").append(cloudVerson);
            rinLib.rinConsole("info", `Oybot version ${cloudVerson} ready! (Local:${verString})`)
        } else {
            updateReady = false
            $(".updaterbutton").removeClass("btn-success");
            $(".updaterbutton").addClass("btn-danger");
            $(".updaterbutton").append(cloudVerson);
            rinLib.rinConsole("info", `Oybot is already up to date! ${cloudVerson}`)
        }

    })()

});

function rinTrain() {
    const python = spawn(`${dataSetting["baseDir"]}\\Artificial\\train.bat`);
    python.stdout.on('data', function (data) {
        const stringdata: string = data.toString()
        let pprtyData = stringdata.split("\r\n")
        pprtyData.forEach(element => {
            if (element == "\r" || element == " " || element == "") {
                scollDown()
            } else {

                rinLib.rinConsole("info", element)
                scollDown()
            }
        });
    });


    python.on('close', (code) => {
        rinLib.rinConsole("success", `Closed Python with code ${code}`)

    });

}

function rinUpdate() {
    const python = spawn('python', [`${process.env.INIT_CWD}\\src\\dic\\rinZip.py`, `https://github.com/RingoMar/androyd/releases/download/${updateNumber}/oybot.zip`, dataSetting["baseDir"]]);
    python.stdout.on('data', function (data) {
        const stringdata: string = data.toString()
        let pprtyData = stringdata.split("\n")
        pprtyData.forEach(element => {
            if (element == "") {

                rinLib.rinConsole("success", "Download done!")
            } else {

                rinLib.rinConsole("info", element)
            }
        });
    });


    python.on('close', (code) => {
        rinLib.rinConsole("success", `Closed Python with code ${code}`)
        updateReady = false
        rinLib.rinConsole("warn", "NOW STARTING OYBOT AI TRAINER")
        rinTrain();

    });

}


$(".updaterbutton").click(function () {

    if (updateReady) {
        rinUpdate()
    } else {
        $("#confirmBoot").modal("show")
    }
});

$(document).ready(function () {

    $(document).on("click", "#confirmBtn", function () {

        $("#confirmBoot").modal("hide")
        rinUpdate()
    });
});

function scollDown() {
    try {
        let scroller = $(".dataViewer")[0].scrollHeight
        $('.dataViewer ').stop().animate({
            scrollTop: scroller * 3
        }, 800);
    } catch (error) {
    }
}