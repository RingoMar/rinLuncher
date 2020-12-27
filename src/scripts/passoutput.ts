import * as $ from 'jquery';
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

export function rinConsole(msgType: string, message: string) {
    switch (msgType) {
        case "info":
            $(".dataViewer").append(`<p class="mb-1"><span> <span class="badge rounded-pill bg-info ">[${time}][INFO]</span> <span class="text-info rounded">${message}</span></span></p>`)
            break;
        case "err":
            $(".dataViewer").append(`<p class="mb-1"><span> <span class="badge rounded-pill bg-danger ">[${time}][ERROR]</span> <span class="text-danger rounded">${message}</span></span></p>`)
            break;
        case "warn":
            $(".dataViewer").append(`<p class="mb-1"><span> <span class="badge rounded-pill bg-warning ">[${time}][WARNING]</span> <span class="text-warning rounded">${message}</span></span></p>`)
            break;
        case "success":
            $(".dataViewer").append(`<p class="mb-1"><span> <span class="badge rounded-pill bg-success ">[${time}][SUCCESS]</span> <span class="text-success rounded">${message}</span></span></p>`)
            break;
    }
    // dataViewer  
}

