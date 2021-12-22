import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";
import { screenEventTableFilterPayload } from "../../../models/tables-filters.model";
import { BackendApiService } from "../../../services/backend-api.service";
import { NotificationService } from "../../../services/notification.service";

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

  user = this.authenticationService.userValue;

  constructor(
    private httpClient: HttpClient,
    private notify: NotificationService,
    private api: BackendApiService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.screenEventTableFilters = {
      currentPage: this.tableCurrentPage,
      perPage: this.tablePerPageLimit
    };
    this.getScreenEventTableData(this.screenEventTableFilters);
  }

  getScreenEventTableData(screenEventTableFilters: screenEventTableFilterPayload) {
    this.api.getEventTable(screenEventTableFilters, this.user?.token)
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
    const userid: string = eventFilterForm.value.userid ? eventFilterForm.value.userid : undefined;
    const deviceid: string = eventFilterForm.value.deviceid ? eventFilterForm.value.deviceid : undefined;
    const sessionid: string = eventFilterForm.value.sessionid ? eventFilterForm.value.sessionid : undefined;
    const screenid: string = eventFilterForm.value.screenid ? eventFilterForm.value.screenid : undefined;

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
  }

  onPageEvent = ($event: { pageIndex: number }) => {
    this.tableCurrentPage = $event.pageIndex + 1;
    this.screenEventTableFilters.currentPage = this.tableCurrentPage;
    this.getScreenEventTableData(this.screenEventTableFilters);
  };
}
