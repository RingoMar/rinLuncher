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
$(".randomInput").val(dataSetting["interval"]);
$(".saveInterval").addClass("disabled");

function populateTable() {
    $(".allTheMessages").children("tr").remove();
    var messageNum: number = 0;
    dataSetting.talk.forEach((element) => {
        $(".allTheMessages").append(`
    
    <tr>
    <th scope="row">${messageNum}</th>
    <th scope="row" class="text-wrap">${element}</th>
    <th><button type="button" class="btn btn-outline-secondary editerBtn" id="${element}">EDIT</button></th>
    <th><button type="button" class="btn btn-outline-secondary delBtn" id="${element}">REMOVE</button></th>
  </tr>
    `);
        messageNum++;
    });
}

populateTable();

$(document).ready(function () {
    // TODO: Convert to switches

    $(document).on("click", ".30", function () {
        $(".randomInput").val("1800");
        $(".saveInterval").removeClass("disabled");
    });
    $(document).on("click", ".45", function () {
        $(".randomInput").val("2700");
        $(".saveInterval").removeClass("disabled");
    });
    $(document).on("click", ".60", function () {
        $(".randomInput").val("3600");
        $(".saveInterval").removeClass("disabled");
    });
    $(document).on("click", ".130", function () {
        $(".randomInput").val("5400");
        $(".saveInterval").removeClass("disabled");
    });
    $(document).on("click", ".2", function () {
        $(".randomInput").val("7200");
        $(".saveInterval").removeClass("disabled");
    });
});

$(".resetInterval").click(function () {
    $(".randomInput").val(dataSetting["interval"]);
    $(".saveInterval").addClass("disabled");
});

function updateInterval(timeInt) {
    dataSetting["interval"] = timeInt;
    fs.writeFileSync(
        `${downloadedUser}\\config.json`,
        JSON.stringify(dataSetting)
    );
    $(".saveInterval").addClass("disabled");
}

$(".adderButn").click(function () {
    $("#addNewMod").modal("toggle");
    $(".invalid-tooltip").css("display", "none");
});

$(".delBtn").click(function () {
    dataSetting.talk.splice(dataSetting.talk.indexOf(this.id), 1);
    $("#delConfim").modal("toggle");
});

$(".editerBtn").click(function () {
    $("#editConfim").modal("toggle");
    $(".invalid-tooltip").css("display", "none");
    var removedEl = dataSetting.talk.splice(dataSetting.talk.indexOf(this.id), 1);
    $("#validationTooltip03").val("");
    $("#validationTooltip03").val(removedEl);
});

$(document).ready(function () {
    $(document).on("click", "#confirmBtnEdit", function (event) {
        let editVal: string = $("#validationTooltip03").val();
        if (!editVal) {
            $(".invalid-tooltip").css("display", "flex");
        } else {
            dataSetting.talk.push(editVal);
            fs.writeFileSync(
                `${downloadedUser}\\config.json`,
                JSON.stringify(dataSetting)
            );
            $("#editConfim").modal("toggle");
            populateTable();
        }
    });

    $(document).on("click", "#delConfim", function (event) {
        fs.writeFileSync(
            `${downloadedUser}\\config.json`,
            JSON.stringify(dataSetting)
        );
        $("#delConfim").modal("toggle");
        populateTable();
    });

    $(document).on("click", "#confirmBtnadd", function (event) {
        let newAdd: string = $("#validationTooltip04").val();
        if (!newAdd) {
            $(".invalid-tooltip").css("display", "flex");
        } else {
            dataSetting.talk.push(newAdd);
            fs.writeFileSync(
                `${downloadedUser}\\config.json`,
                JSON.stringify(dataSetting)
            );
            $("#addNewMod").modal("toggle");
            populateTable();

        }

    });
});

$(".saveInterval").click(function () {
    updateInterval($(".randomInput").val());
});

$(".randomInput").on("input", function () {
    $(".saveInterval").removeClass("disabled");
});

// var update_entry = (id, st, et, fn) => {
//     var old_instance = JSON.parse(fs.readFileSync(`${fn}`, 'utf-8'));
//     let found = old_instance.find(record => { return record.talk }); // Find the object by Id
//     st != null ? found.startTime = st : ''; // If not null, set value
//     et != null ? found.endTime = et : ''; // If not null, set value
//     let new_instance = old_instance.filter(record => { return record.talk  }); // Copy original array besides found record
//     new_instance.push(found);return new_instance; // Add found record to new array and return
// }

$(document).on('show.bs.modal', '.modal', function () {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});

$(document).on('hidden.bs.modal', '.modal', function () {
    $('.modal:visible').length && $(document.body).addClass('modal-open');
});