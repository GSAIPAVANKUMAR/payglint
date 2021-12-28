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

  dateRangeStartSE: string = '';
  dateRangeEndSE: string = '';

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
      perPage: this.tablePerPageLimit,
      filters: undefined,
      ranges: undefined,
    };
    this.getScreenEventTableData(this.screenEventTableFilters);
  }

  getScreenEventTableData(screenEventTableFilters: screenEventTableFilterPayload) {
    this.api.getScreenEventTable(screenEventTableFilters, this.user?.token)
      .subscribe(
        data => {
          this.screenEventTableData = data.result;
          this.tableDataSize = data.count;
          if (this.screenEventTableData.length > 0) {
            this.noScreenEventTableDataFlag = false
          } else {
            this.noScreenEventTableDataFlag = true
          }
        },
        error => {
          this.notify.error(error);
        }
      );
  }

  onscreenEventFilterSubmit(screenEventFilterForm: NgForm) {
    console.log(screenEventFilterForm.value);
    const userid: string = screenEventFilterForm.value.userid ? screenEventFilterForm.value.userid : undefined;
    const deviceid: string = screenEventFilterForm.value.deviceid ? screenEventFilterForm.value.deviceid : undefined;
    const sessionid: string = screenEventFilterForm.value.sessionid ? screenEventFilterForm.value.sessionid : undefined;
    const screenid: string = screenEventFilterForm.value.screenid ? screenEventFilterForm.value.screenid : undefined;
    const screenType: string = screenEventFilterForm.value.screenType ? screenEventFilterForm.value.screenType : undefined;
    const action: string = screenEventFilterForm.value.action ? screenEventFilterForm.value.action : undefined;

    this.screenEventTableFilters = {
      currentPage: this.tableCurrentPage,
      perPage: this.tablePerPageLimit,
      filters: {
        userId: userid ? { values: [userid] } : undefined,
        deviceId: deviceid ? { values: [deviceid] } : undefined,
        sessionId: sessionid ? { values: [sessionid] } : undefined,
        screenId: screenid ? { values: [screenid] } : undefined,
        action: action ? { values: [action] } : undefined,
        screenListenerType: screenType ? { values: [screenType] } : undefined
      },
      ranges: {
        bigEquals: this.dateRangeEndSE ? this.dateRangeEndSE : undefined,
        smallEquals: this.dateRangeStartSE ? this.dateRangeStartSE : undefined,
      }
    }

    this.getScreenEventTableData(this.screenEventTableFilters);
  }

  onScreenEventFilterReset(screenEventFilterForm: any, startDateSE: any, endDateSE: any) {
    screenEventFilterForm.reset();
    startDateSE.value = '';
    endDateSE.value = '';
    this.screenEventTableFilters = {
      currentPage: this.tableCurrentPage,
      perPage: this.tablePerPageLimit,
      filters: undefined,
      ranges: undefined
    }
    this.getScreenEventTableData(this.screenEventTableFilters);
  }

  dateRangeChangeSE(startDateSE: any, endDateSE: any) {
    const sd: string[] = startDateSE.value.split('/');
    const ed: string[] = endDateSE.value.split('/');
    if (sd.length != 3) {
      this.dateRangeStartSE = '';
    }
    else {
      this.dateRangeStartSE = ''.concat(sd[2], '-', (sd[0].length == 2) ? sd[0] : `0${sd[0]}`, '-', (sd[1].length == 2) ? sd[1] : `0${sd[1]}`, ' 00:00');
    }
    if (ed.length != 3) {
      this.dateRangeEndSE = '';
    }
    else {
      this.dateRangeEndSE = ''.concat(ed[2], '-', (ed[0].length == 2) ? ed[0] : `0${ed[0]}`, '-', (ed[1].length == 2) ? ed[1] : `0${ed[1]}`, ' 00:00');
    }
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
