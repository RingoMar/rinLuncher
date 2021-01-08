import * as request from "request-promise-native";
import * as $ from "jquery";
import { Remarkable } from 'remarkable';
var md = new Remarkable();

(async () => {
    var options = {
        uri:
            "https://raw.githubusercontent.com/RingoMar/androyd/master/change.md",
    };

    const result = await request.get(options);

    $(".changeLog").append(md.render(result));
})();