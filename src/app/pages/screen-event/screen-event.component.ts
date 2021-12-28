import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";
import { screenEventTableFilterPayload } from "../../models/tables-filters.model";
import { BackendApiService } from "../../services/backend-api.service";
import { NotificationService } from "../../services/notification.service";

@Component({
  selector: "app-screen-event",
  templateUrl: "./screen-event.component.html",
  styleUrls: ["./screen-event.component.scss"],
})
export class ScreenEventComponent implements OnInit {

  filtersArray: string[] = ["filter1", "filter2", "filter3"];
  screenTypeArray: string[] = ['LOGIN_FORM', 'GENERAL', 'TRANSACTION_DETAILS', 'PAYMENT_SCREEN', 'GENERAL_FORM', 'CONTACTS'];
  actionArray: string[] = ['START', 'END'];

  screenEventTableData: any;
  tableDataSize: number = 0;
  tablePerPageLimit: number = 10;
  tableCurrentPage: number = 1;
  screenEventTableFilters: screenEventTableFilterPayload = {};

  selectedRowIndex: any;

  user = this.authenticationService.userValue;

  noScreenEventTableDataFlag: boolean = false;

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
          this.screenEventTableData = data.result;
          this.tableDataSize = data.count;
          if(this.screenEventTableData.length > 0){
            this.noScreenEventTableDataFlag = false
          }else{
            this.noScreenEventTableDataFlag = true
          }
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

  display(row: any) {
    // this.dispalyRow = true;
    // this.selectedRowIndex = row;
    // this.rowData = row;
  }
}
