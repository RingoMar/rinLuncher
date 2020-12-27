import * as $ from 'jquery';

$(document).ready(function () {

    $(document).on("click", ".30", function () {
        $(".randomInput").val("1800")

    })
    $(document).on("click", ".45", function () {
        $(".randomInput").val("2700")

    })
    $(document).on("click", ".60", function () {
        $(".randomInput").val("3600")

    })
    $(document).on("click", ".130", function () {
        $(".randomInput").val("5400")

    })
    $(document).on("click", ".2", function () {
        $(".randomInput").val("7200")

    })
})