import { readFileSync, readFile } from 'fs';
import * as $ from 'jquery';
import { rinConsole } from '../scripts/passoutput.js';
import * as child_process from 'child_process';
import * as request from "request-promise-native";

const dir = process.env.APPDATA + '/oybotLuncher/settings.json'
const downloadDir = process.env.APPDATA + '\\oybotLuncher\\'
const dataSettings = readFileSync(dir, { encoding: 'utf8', flag: 'r' });
const dataSetting = JSON.parse(dataSettings);
var updateReady: boolean = true;
var updateNumber: string = "";

readFile(`${dataSetting["baseDir"]}/version.json`, { encoding: 'utf8', flag: 'r' }, function (err, stats) {
    if (err) {
        (async () => {
            var options = {
                uri: "https://raw.githubusercontent.com/RingoMar/androyd/master/version.json"
            };

            const result = await request.get(options);
            const resultJson = JSON.parse(result);
            let cloudVerson = resultJson.version;
            updateNumber = cloudVerson
            rinConsole("info", "Oybot version file is missing!");

            rinConsole("success", "Oybot cloud connected.")
            rinConsole("info", `Oybot version ${cloudVerson} ready!`)
            $(".updaterbutton").append(cloudVerson);

        })()

    }
    rinConsole("info", "Oybot version file was found!");
    rinConsole("info", "Checking for new update....");
    let versionNumber = readFileSync(`${dataSetting["baseDir"]}/version.json`, { encoding: 'utf8', flag: 'r' });
    const versionJson = JSON.parse(versionNumber);
    let verString: number = +versionJson["version"];

    (async () => {
        var options = {
            uri: "https://raw.githubusercontent.com/RingoMar/androyd/master/version.json"
        };

        const result = await request.get(options);
        const resultJson = JSON.parse(result);
        let cloudVerson = resultJson.version;
        rinConsole("success", "Oybot cloud connected.")
        let verCloud: number = cloudVerson;
        updateNumber = cloudVerson
        if (verString < verCloud) {
            $(".updaterbutton").append(cloudVerson);
            rinConsole("info", `Oybot version ${cloudVerson} ready! (Local:${verString})`)
        } else {
            updateReady = false
            $(".updaterbutton").removeClass("btn-success");
            $(".updaterbutton").addClass("btn-danger");
            $(".updaterbutton").append(cloudVerson);
            rinConsole("info", `Oybot is already up to date! ${cloudVerson}`)
        }

    })()

});

function rinTrain() {
    const python = child_process.spawn(`${dataSetting["baseDir"]}\\Artificial\\train.bat`);
    python.stdout.on('data', function (data) {
        const stringdata: string = data.toString()
        let pprtyData = stringdata.split("\r\n")
        pprtyData.forEach(element => {
            if (element == "\r" || element == " " || element == "") {
                scollDown()
            } else {

                rinConsole("info", element)
                scollDown()
            }
        });
    });


    python.on('close', (code) => {
        rinConsole("success", `Closed Python with code ${code}`)

    });

}

function rinUpdate() {
    const python = child_process.spawn('python', [`${process.env.INIT_CWD}\\src\\dic\\rinZip.py`, `https://github.com/RingoMar/androyd/releases/download/${updateNumber}/oybot.zip`, dataSetting["baseDir"]]);
    python.stdout.on('data', function (data) {
        const stringdata: string = data.toString()
        let pprtyData = stringdata.split("\n")
        pprtyData.forEach(element => {
            if (element == "") {
                rinConsole("success", "Download done!")
            } else {

                rinConsole("info", element)
            }
        });
    });


    python.on('close', (code) => {
        rinConsole("success", `Closed Python with code ${code}`)
        updateReady = false
        rinConsole("warn", "NOW STARTING OYBOT AI TRAINER")
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