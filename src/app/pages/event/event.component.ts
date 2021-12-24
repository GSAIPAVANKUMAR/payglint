import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SavefilterComponent } from 'src/app/components/savefilter/savefilter.component';
import { NotificationService } from 'src/app/services/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { eventTableFilterPayload } from '../../models/tables-filters.model';
import { eventTablePayload } from 'src/app/models/table.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})

export class EventComponent implements OnInit {
  // MatPaginator Inputs
  showexport = true;
  selectedRowIndex: any;
  dispalyRow = false;
  rowData: any;

  matDialgRef!: MatDialogRef<SavefilterComponent>;

  tableData: eventTablePayload[] = [];
  eventTableFilter: eventTableFilterPayload = {};

  checkpointSelected: any;
  severitySelected: any;
  statusSelected: any;

  dateRangeStart: string | undefined = '';
  dateRangeEnd: string | undefined = '';

  // Number of data per page.
  eventTablePerPage: number = 10;
  eventTableCurrentPage: number = 1;

  user = this.authenticationService.userValue;

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private notify: NotificationService,
    private api: BackendApiService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.eventTableCurrentPage = 1;
    this.eventTableFilter = {
      currentPage: this.eventTableCurrentPage,
      perPage: this.eventTablePerPage
    };
    this.getEventTableData(this.eventTableFilter);
  }

  getEventTableData(eventTableFilter: eventTableFilterPayload) {
    this.api.getEventTable(eventTableFilter, this.user?.token)
      .subscribe(
        data => {
          this.tableData = data;
        },
        error => {
          this.notify.error(error);
        }
      );
  }

  dateRangeChange(startDate: any, endDate: any) {
    try {
      this.dateRangeStart = '';
      this.dateRangeEnd = '';
      const sd = startDate.value.split('/');
      this.dateRangeStart = this.dateRangeStart.concat(sd[2], '-', sd[0], '-', sd[1], ' 00:00');
      const ed = endDate.value.split('/');
      this.dateRangeEnd = this.dateRangeEnd.concat(ed[2], '-', ed[0], '-', ed[1], ' 00:00');
    }
    catch (e) {
      this.dateRangeStart = undefined;
      this.dateRangeEnd = undefined;
    }
  }

  applyEventTableFiltersEvent() {
    this.updateEventTableFiltersForm();
    this.getEventTableData(this.eventTableFilter);
  }

  updateEventTableFiltersForm() {
    const userid = (<HTMLInputElement>document.getElementById("userid"))?.value;
    const deviceid = (<HTMLInputElement>document.getElementById("deviceid"))?.value;
    const sessionid = (<HTMLInputElement>document.getElementById("sessionid"))?.value;
    const requestid = (<HTMLInputElement>document.getElementById("requestid"))?.value;

    this.eventTableFilter = {
      currentPage: this.eventTableCurrentPage,
      perPage: this.eventTablePerPage,
      filters: (userid || deviceid || sessionid || requestid || this.severitySelected || this.checkpointSelected || this.statusSelected) ? {
        userId: userid ? { values: [userid] } : undefined,
        deviceId: deviceid ? { values: [deviceid] } : undefined,
        sessionId: sessionid ? { values: [sessionid] } : undefined,
        requestId: requestid ? { values: [requestid] } : undefined,
        severity: this.severitySelected ? { values: [this.severitySelected] } : undefined,
        checkpoint: this.checkpointSelected ? { values: [this.checkpointSelected] } : undefined,
        status: this.statusSelected ? { values: [this.statusSelected] } : undefined,
      } : undefined,
      ranges: (this.dateRangeEnd && this.dateRangeStart) ? {
        bigEquals: this.dateRangeEnd ? this.dateRangeEnd : undefined,
        smallEquals: this.dateRangeStart ? this.dateRangeStart : undefined,
      } : undefined
    }
  }

  resetEventTableFiltersEvent(startDate: any, endDate: any, requestid: any, userid: any, deviceid: any, sessionid: any, severity: any, checkpoint: any, status: any) {
    startDate.value = '';
    endDate.value = '';
    requestid.value = '';
    userid.value = '';
    deviceid.value = '';
    sessionid.value = '';
    severity.value = undefined;
    checkpoint.value = undefined;
    status.value = undefined;
    this.resetEventTableFiltersForm();
    this.getEventTableData(this.eventTableFilter);
  }

  resetEventTableFiltersForm() {
    this.eventTableFilter = {
      currentPage: this.eventTableCurrentPage,
      perPage: this.eventTablePerPage,
      filters: undefined,
      ranges: undefined
    }
  }

  onEventTablePageEvent = ($event: { pageIndex: any; }) => {
    this.eventTableCurrentPage = $event.pageIndex + 1;
    this.eventTableFilter.currentPage = this.eventTableCurrentPage;
    this.getEventTableData(this.eventTableFilter);
  }

  hideRow(value: boolean) {
    this.dispalyRow = value;
    this.selectedRowIndex = "fsd";
  }

  display(row: any) {
    this.dispalyRow = true;
    this.selectedRowIndex = row;
    this.rowData = row;
  }

  openModal() {
    this.matDialgRef = this.matDialog.open(SavefilterComponent, {
      disableClose: true
    });
  }

  exportEventTableData() {
    this.api.getEventTable(this.eventTableFilter, this.user?.token)
      .subscribe(
        data => {
          this.downloadEventDataCSV(data);
        },
        error => {
          this.notify.error(error);
        }
      );
  }

  downloadEventDataCSV(data: any) {
    //download CSV file.
  }

  onTabChanged($event: any) {
    debugger;
    console.log($event);
    if ($event.index == 1) {
      this.showexport = false;
    }
    else {
      this.showexport = true;
    }
  }

  selectedCheckpoint(val: any) {
    this.checkpointSelected = val;
  }

  selectedView(val: any) {
  }

  selectedSeverity(val: any) {
    this.severitySelected = val;
  }

  selectedStatus(val: any) {
    this.statusSelected = val;
  }
}
