import { rinConsole } from "../scripts/passoutput.js";
import * as $ from "jquery";
import { ipcRenderer } from "electron";
const ipc = ipcRenderer;
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";

const dir = process.env.APPDATA + "/oybotLuncher";

if (!existsSync(dir)) {
  console.log("making dir", dir);
  mkdirSync(dir);
  let data = `{"baseDir": ""}`;
  writeFileSync(`${dir}/settings.json`, data);
}

const dataSettings = readFileSync(`${dir}/settings.json`, {
  encoding: "utf8",
  flag: "r",
});

const dataSetting = JSON.parse(dataSettings);

if (dataSetting["baseDir"]) {
  rinConsole("info", "Your base folder was found!");
  $("#fileId").val(dataSetting["baseDir"]);
} else {
  rinConsole("err", "Your base folder could not be found!");
  $("#fileId").addClass("missing");
}

const errorBtn = document.getElementById("btnLoadFile");

errorBtn.addEventListener("click", function () {
  rinConsole("info", "Opening to find folder path!");
  ipc.send("open-directory-dialog");
});

ipc.on("open-directory-name", function (event, argv) {
  var stringForFile = argv.filePaths[0];
  $("#fileId").val(stringForFile.replace(/\\/g, "/"));
  $("#fileId").removeClass("missing");
  var data = `{"baseDir": "${stringForFile.replace(/\\/g, "/")}"}`;
  writeFileSync(`${dir}/settings.json`, data);
  rinConsole("success", "Got your folder path!");
});

export const downloadedUser = dataSetting["baseDir"];
