import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BackendApiService } from "../../services/backend-api.service";
import { NotificationService } from "../../services/notification.service";

interface screenEventFilterPayload {
  action?: { values: string[] };
  deviceId?: { values: string[] };
  id?: { values: string[] };
  screenId?: { values: string[] };
  screenListenerType?: { values: string[] };
  sessionId?: { values: string[] };
  userId?: { values: string[] };
  version?: { values: string[] };
};

interface rangePayload {
  bigEquals?: Date;
  smallEquals?: Date;
}

interface sortPayload {
  fieldName?: string;
  order?: string;
}

interface screenEventTableFilterPayload {
  currentPage?: number;
  perPage?: number;
  filters?: screenEventFilterPayload;
  ranges?: rangePayload;
  sort?: sortPayload;
}

@Component({
  selector: "app-screen-event",
  templateUrl: "./screen-event.component.html",
  styleUrls: ["./screen-event.component.scss"],
})
export class ScreenEventComponent implements OnInit {

  filtersArray: string[] = ["filter1", "filter2", "filter3"];
  screenTypeArray: string[] = ['screenType01', 'screenType02', 'screenType03', 'screenType04', 'screenType05'];
  actionArray: string[] = ['action01', 'action02', 'action03', 'action04', 'action05'];

  tableData: any;
  tablePerPageLimit: number = 10;
  tableCurrentPage: number = 1;
  screenEventTableFilters: screenEventTableFilterPayload = {};

  constructor(
    private httpClient: HttpClient,
    private notify: NotificationService,
    private api: BackendApiService,
  ) { }

  ngOnInit() {
    this.screenEventTableFilters = {
      currentPage: this.tableCurrentPage,
      perPage: this.tablePerPageLimit
    };
    this.getScreenEventTableData(this.screenEventTableFilters);
  }

  getScreenEventTableData(screenEventTableFilters: screenEventTableFilterPayload) {
    this.api.getEventTable(screenEventTableFilters)
      .subscribe(
        data => {
          this.tableData = data;
        },
        error => {
          this.notify.error(error);
        }
      );
  }

  onscreenEventFilterSubmit(eventFilterForm: NgForm) {
    const userid: string = eventFilterForm.value.userid? eventFilterForm.value.userid : undefined;
    const deviceid: string = eventFilterForm.value.deviceid? eventFilterForm.value.deviceid : undefined;
    const sessionid: string = eventFilterForm.value.sessionid? eventFilterForm.value.sessionid : undefined;
    const screenid: string = eventFilterForm.value.screenid? eventFilterForm.value.screenid : undefined;

    this.screenEventTableFilters = {
      currentPage: this.tableCurrentPage,
      perPage: this.tablePerPageLimit,
      filters: {
        userId: userid ? { values: [userid] } : undefined,
        deviceId: deviceid ? { values: [deviceid] } : undefined,
        sessionId: sessionid ? { values: [sessionid] } : undefined,
        screenId: screenid ? { values: [screenid] } : undefined
      }
    }

    this.getScreenEventTableData(this.screenEventTableFilters);
  }

  onScreenEventFilterReset() {
    this.notify.success('Hello');
  }

  onPageEvent = ($event: { pageIndex: number }) => {
    this.tableCurrentPage = $event.pageIndex + 1;
    this.screenEventTableFilters.currentPage = this.tableCurrentPage;
    this.getScreenEventTableData(this.screenEventTableFilters);
  };
}
