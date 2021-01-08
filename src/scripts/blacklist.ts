import * as $ from "jquery";
import { downloadedUser } from "../scripts/getpath";
import * as fs from "fs";

if (!fs.existsSync(`${downloadedUser}\\config.json`)) {
  console.info("Config file missing ... making a new one...");
  let data = `{
        "talk": [
            "Zaq smells raccPog"
        ],
        "interval": 1800,
        "blacklisthello": [
            "tahhp",
            "richardharrow_",
            "oythebrave",
            "dwingert",
            "MsOtaku",
            "nightbot",
            "jediknight223",
            "classickerobel"
        ]
    }`;
  fs.writeFileSync(`${downloadedUser}\\config.json`, data);
}

const dataSettings = fs.readFileSync(`${downloadedUser}\\config.json`, {
  encoding: "utf8",
  flag: "r",
});
const dataSetting = JSON.parse(dataSettings);

function populateTable() {
  $(".allTheMessages").children("tr").remove();
  var messageNum: number = 0;
  dataSetting.blacklisthello.forEach((element) => {
    $(".allTheMessages").append(`
    
    <tr>
    <th scope="row">${messageNum}</th>
    <th scope="row" class="text-wrap">${element}</th>
    <th><button type="button" class="btn btn-outline-secondary editerBtn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${element}" id="edit">EDIT</button></th>
    <th><button type="button" class="btn btn-outline-secondary delBtn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${element}" id="del">REMOVE</button></th>
  </tr>
    `);
    messageNum++;
  });
}

populateTable();

$(document).ready(function () {
  $(".editerBtn").click(function (event) {
    let removeName: string = event.target.dataset.bsWhatever;
    dataSetting.blacklisthello.splice(dataSetting.talk.indexOf(removeName), 1);
  });

  $(".delBtn").click(function (event) {
    let removeName: string = event.target.dataset.bsWhatever;
    dataSetting.blacklisthello.splice(dataSetting.talk.indexOf(removeName), 1);
  });

  $(document).on("click", ".btnPass", function (event) {
    let personname: string = $("#recipient-name").val();
    var typeOfpass: string = $(".modal-title")[0].outerText;
    var typeOfpassString: string[] = typeOfpass.split(" ");
    if (typeOfpassString[0] == "Edit") {
      dataSetting.blacklisthello.push(personname);
      fs.writeFileSync(
        `${downloadedUser}\\config.json`,
        JSON.stringify(dataSetting)
      );
      
      $("#exampleModal").modal("dispose");
      populateTable();
    } else {
      fs.writeFileSync(
        `${downloadedUser}\\config.json`,
        JSON.stringify(dataSetting)
      );
      
      $("#exampleModal").modal("dispose");
      populateTable();
    }
  });
});
