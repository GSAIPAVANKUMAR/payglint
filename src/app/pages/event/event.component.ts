import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SavefilterComponent } from 'src/app/components/savefilter/savefilter.component';
import { NotificationService } from 'src/app/services/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { eventTableFilterPayload } from '../../models/tables-filters.model';
import { eventTablePayload } from 'src/app/models/table.model';
import { saveAs } from 'file-saver';

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
  noEventTableDataFlag: boolean = false;
  matDialgRef!: MatDialogRef<SavefilterComponent>;

  eventTableData: eventTablePayload[] = [];
  tableDataSize: number = 0;
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
  
  savedFilters:any = [];

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
      perPage: this.eventTablePerPage,
      filters: undefined,
      ranges: undefined
    };
    this.getEventTableData(this.eventTableFilter);
	
	//Get saved filters if any
	this.loadSavedFilters();
  }

  getEventTableData(eventTableFilter: eventTableFilterPayload) {
    this.api.getEventTable(eventTableFilter, this.user?.token)
      .subscribe(
        data => {
          this.eventTableData = data.result;
          this.tableDataSize = data.count;
          if(this.eventTableData.length > 0){
            this.noEventTableDataFlag = false
          }else{
            this.noEventTableDataFlag = true
          }
        },
        error => {
          this.notify.error(error);
          console.log(error);
        }
      );
  }

  dateRangeChange(startDate: any, endDate: any) {
    const sd: string[] = startDate.value.split('/');
    const ed: string[] = endDate.value.split('/');
    if (sd.length != 3) {
      this.dateRangeStart = '';
    }
    else {
      this.dateRangeStart = ''.concat(sd[2], '-', (sd[0].length == 2) ? sd[0] : `0${sd[0]}`, '-', (sd[1].length == 2) ? sd[1] : `0${sd[1]}`, ' 00:00');
    }
    if (ed.length != 3) {
      this.dateRangeEnd = '';
    }
    else {
      this.dateRangeEnd = ''.concat(ed[2], '-', (ed[0].length == 2) ? ed[0] : `0${ed[0]}`, '-', (ed[1].length == 2) ? ed[1] : `0${ed[1]}`, ' 00:00');
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

	this.eventTableCurrentPage = 1;
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
      ranges: (this.dateRangeEnd != '' || this.dateRangeStart != '') ? {
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
	
	this.severitySelected = undefined;
	this.checkpointSelected = undefined;
	this.statusSelected = undefined;
	this.eventTableCurrentPage = 1;
	
    this.resetEventTableFiltersForm();
    this.getEventTableData(this.eventTableFilter);
  }

  resetEventTableFiltersForm() {
    this.eventTableFilter = {
      currentPage: this.eventTableCurrentPage,
      perPage: this.eventTablePerPage,
      filters: undefined,
      ranges: undefined,
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
	  //data :{'name':'Sunil'}
    });
  }

  exportEventTableData() {
    this.api.getEventTable(this.eventTableFilter, this.user?.token)
      .subscribe(
        data => {
          if(data.result.length > 0 ){
            this.downloadEventDataCSV(data.result);
          }else{
            this.notify.info("No Data to export");
          }
        },
        error => {
          this.notify.error(error);
        }
      );
  }

  downloadEventDataCSV(data: any) {
    //download CSV file.
    const file_name = 'event-data.csv';

    const replacer = (key: any, value: any) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map((row: any) =>
      header
        .map((fieldName) => (fieldName != 'json') ? JSON.stringify(row[fieldName], replacer) : null)
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    saveAs(blob, file_name);
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
  
  //Method to get the saved filter data and set it back to UI.
  loadSavedFilters() {
	this.api.getSavedFilterData("", this.user?.token)
      .subscribe(
        data => {
			if (data.length > 0) {
				this.savedFilters = data;
			} else {
				this.savedFilters = [{'filter_name':'No saved Filters'}];
			}
        },
        error => {
          this.notify.error(error);
        }
      );
  }
  
  //set selected saved filter attributes
  setSelectedFilters(filterData: any) {
	  console.log("Selected filter data: " + filterData);
	  if (filterData) {
		    (<HTMLInputElement>document.getElementById("userid")).value=filterData.userid;
			(<HTMLInputElement>document.getElementById("deviceid")).value=filterData.deviceid;
			(<HTMLInputElement>document.getElementById("sessionid")).value=filterData.sessionid;
			(<HTMLInputElement>document.getElementById("requestid")).value=filterData.requestid;
	  }
  }
}
