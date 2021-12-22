import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SavefilterComponent } from '../../shared/component/savefilter/savefilter.component';
import { NotificationService } from '../../../services/notification.service';
import { BackendApiService } from '../../../services/backend-api.service';
import { eventTableFilterPayload } from '../../../models/tables-filters.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { eventTablePayload } from 'src/app/models/table.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})

export class EventComponent implements OnInit {
  BASE_URL = 'http://localhost:3000';
  mockCsvData!: string;

  mockHeaders = `Severity,Score,Date,Session,UserID,DeviceID,Checkpoint,Amount,Currency,Destination,Status,Resolution
`
  // MatPaginator Inputs
  paginationInfo: any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  showexport = true;
  selectedRowIndex: any;
  dispalyRow = false;
  rowData: any;
  nameplaceholder: string = 'Name(0)';
  viewfileter: string = 'View all filters'
  checkvalue: string = "Checkpoint (0)"
  status: string = "Status (0)"
  startdate = "Start Date to Date End"
  matDialgRef!: MatDialogRef<SavefilterComponent>;
  // Test states
  EmitResult = {
    pageNumber: '',
    pageSize: ''
  };

  testPaginator = {
    length: 1000,
    pageSize: 10,
    pageIndex: 1
  };


  tableData: eventTablePayload[] = [];
  tableFilters: eventTableFilterPayload = {};

  checkpointSelected: any;
  severitySelected: any;
  statusSelected: any;

  dateRangeStart: string | undefined = '';
  dateRangeEnd: string | undefined = '';

  // Number of data per page.
  tableDataPerPage: number = 10;
  tableCurrentPage: number = 1;

  user = this.authenticationService.userValue;

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private notify: NotificationService,
    private api: BackendApiService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.tableCurrentPage = 1;
    this.tableFilters = {
      currentPage: this.tableCurrentPage,
      perPage: this.tableDataPerPage
    };
    this.getEventTableData(this.tableFilters);
  }

  getEventTableData(tableFilters: eventTableFilterPayload) {
    this.api.getEventTable(tableFilters, this.user?.token)
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

  applyFiltersEvent() {
    this.updateTableFiltersForm();
    this.getEventTableData(this.tableFilters);
  }

  updateTableFiltersForm() {
    const userid = (<HTMLInputElement>document.getElementById("userid"))?.value;
    const deviceid = (<HTMLInputElement>document.getElementById("deviceid"))?.value;
    const sessionid = (<HTMLInputElement>document.getElementById("sessionid"))?.value;
    const requestid = (<HTMLInputElement>document.getElementById("requestid"))?.value;

    this.tableFilters = {
      currentPage: this.tableCurrentPage,
      perPage: this.tableDataPerPage,
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

  resetFiltersEvent(startDate: any, endDate: any, requestid: any, userid: any, deviceid: any, sessionid: any, severity: any, checkpoint: any, status: any) {
    startDate.value = '';
    endDate.value = '';
    requestid.value = '';
    userid.value = '';
    deviceid.value = '';
    sessionid.value = '';
    severity.value = undefined;
    checkpoint.value = undefined;
    status.value = undefined;
    this.resetTableFiltersForm();
    this.getEventTableData(this.tableFilters);
  }

  resetTableFiltersForm() {
    this.tableFilters = {
      currentPage: this.tableCurrentPage,
      perPage: this.tableDataPerPage,
      filters: undefined,
      ranges: undefined
    }
  }

  setPageSizeOptions = (setPageSizeOptionsInput: string) => {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onPageEvent = ($event: { pageIndex: any; }) => {
    this.tableCurrentPage = $event.pageIndex + 1;
    this.tableFilters.currentPage = this.tableCurrentPage;
    this.getEventTableData(this.tableFilters);
  }

  showTestEmit = ($event: { pageIndex: any; pageSize: any; }) => {
    this.EmitResult = {
      pageNumber: $event.pageIndex,
      pageSize: $event.pageSize
    };
  }

  allProjects = (page: number, limit: any) => {
    return this.httpClient.get(`${this.BASE_URL}/posts?_page=${page + 1}&_limit=${limit}`);
  }

  getPageSize = () => {
    return this.httpClient.get(`${this.BASE_URL}/pageSize`);
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
    })

  }

  exportEventTableData() {
    this.api.getEventTable(this.tableFilters, this.user?.token)
      .subscribe(
        data => {
          this.downloadEventDataCSV(data);
        },
        error => {
          this.notify.error(error);
        }
      );
  }

  downloadEventDataCSV(data: any){
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
    this.viewfileter = ""
  }

  selectedSeverity(val: any) {
    this.severitySelected = val;
  }

  selectedStatus(val: any) {
    this.statusSelected = val;
  }
}
