import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(public toastr: ToastrService) { }

    public error(message: string) {
        this.toastr.show(
            '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Oops</span> <span data-notify="message">' + message + '</span></div>',
            "",
            {
                timeOut: 3000,
                closeButton: true,
                enableHtml: true,
                tapToDismiss: false,
                titleClass: "alert-title",
                positionClass: "toast-top-center",
                toastClass:
                    "ngx-toastr alert alert-dismissible alert-danger alert-notify"
            }
        );
    }

    public success(message: string) {
        this.toastr.show(
            '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Success</span> <span data-notify="message">' + message + '</span></div>',
            "",
            {
                timeOut: 3000,
                closeButton: true,
                enableHtml: true,
                tapToDismiss: false,
                titleClass: "alert-title",
                positionClass: "toast-top-center",
                toastClass:
                    "ngx-toastr alert alert-dismissible alert-success alert-notify"
            }
        );
    }

    public info(message: string) {
        this.toastr.show(
            '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Message</span> <span data-notify="message">' + message + '</span></div>',
            "",
            {
                timeOut: 3000,
                closeButton: true,
                enableHtml: true,
                tapToDismiss: false,
                titleClass: "alert-title",
                positionClass: "toast-top-center",
                toastClass:
                    "ngx-toastr alert alert-dismissible alert-info alert-notify"
            }
        );
    }

    public warning(message: string) {
        this.toastr.show(
            '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Warning</span> <span data-notify="message">' + message + '</span></div>',
            "",
            {
                timeOut: 3000,
                closeButton: true,
                enableHtml: true,
                tapToDismiss: false,
                titleClass: "alert-title",
                positionClass: "toast-top-center",
                toastClass:
                    "ngx-toastr alert alert-dismissible alert-warning alert-notify"
            }
        );
    }

}
