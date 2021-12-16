import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SavefilterComponent } from '../../shared/component/savefilter/savefilter.component';
import { NotificationService } from '../../services/notification.service';
import { BackendApiService } from '../../services/backend-api.service';

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


  // states
  tableData1 = [{ Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  { Severity: 'Low', Score: '147', Date: '25/10/2021 10:01', Session: "6b39922cccb091f26_163 b021-4cc2601e7ce9", UserID: 'text', DeviceID: 'abcde460-2c29-4574-b574-4895625', Checkpoint: 'LOGIN', Amount: '', Currency: '', Destination: '', Status: '', Resolution: 'Safe' },
  ];
  tableData: any;

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private notify: NotificationService,
    private api: BackendApiService,
  ) { }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.getPageDetails();
    // this.getPageDetails();

    // this.api.getEventTable({"currentPage": 1, "perPage": 10})
    // .subscribe(
    //   data => {
    //     console.log(JSON.stringify(data));
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    
  }

  setPageSizeOptions = (setPageSizeOptionsInput: string) => {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onPageEvent = ($event: { pageIndex: any; pageSize: any; }) => {
    this.getData($event.pageIndex, $event.pageSize);
  }

  showTestEmit = ($event: { pageIndex: any; pageSize: any; }) => {
    this.EmitResult = {
      pageNumber: $event.pageIndex,
      pageSize: $event.pageSize
    };
  }

  getData = (pg: number, lmt: any) => {
    // return this.allProjects(pg, lmt).subscribe( res => {
    // this.tableData = [];
    // });
    const start: number = pg * 9;
    console.log(this.tableData1.slice(start, start + lmt));
    this.tableData = this.tableData1.slice(start, start + lmt);
  }
  getPageDetails = () => {
    // this.getPageSize().subscribe( res => {
    // this.paginationInfo = this.tableData1;
    // this.getData(0, this.paginationInfo.pageSize);
    // });
    this.paginationInfo = this.tableData1;
    this.getData(0, 9);
  }

  // getData = (pg: number, lmt: any) => {
  //   return this.allProjects(pg, lmt).subscribe( res => {
  //     this.tableData = [];
  //   });
  // }

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
  convertToCSV(objArray: string) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','
        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }

  formatToCsvData() {
    let itemsFormatted: any[] = [];
    this.tableData1.forEach((item) => {
      itemsFormatted.push({
        Severity: item.Severity.replace(/,/g, ''),
        Score: item.Score,
        Date: item.Date,
        Session: item.Session,
        UserID: item.UserID,
        DeviceID: item.DeviceID,
        Checkpoint: item.Checkpoint,
        Amount: item.Amount,
        Currency: item.Currency,
        Destination: item.Destination,
        Status: item.Status,
        Resolution: item.Resolution
      });
    });
    const jsonObject = JSON.stringify(itemsFormatted);
    const csv = this.convertToCSV(jsonObject);
    this.mockCsvData = this.mockHeaders + csv;
  }
  download() {
    this.formatToCsvData()
    console.log('hi');
    const exportedFilenmae = 'export' + '.csv';

    const blob = new Blob([this.mockCsvData], { type: 'text/csv;charset=utf-8;' });
    // if (navigator.msSaveBlob) {
    // // IE 10+
    // navigator.msSaveBlob(blob, exportedFilenmae);
    // } else {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', exportedFilenmae);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // }
      // }
    }
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
  // checkPlaceHolder() {
  //   console.log(this.nameplaceholder.length)
  //   debugger;
  //   if (this.nameplaceholder.length >= 0) {
  //     this.nameplaceholder = ''
  //     return;
  //   } else {
  //     this.nameplaceholder = 'name'
  //     return
  //   }
  // }
  selectedValue(val: any) {
    debugger;
    this.nameplaceholder = ""
  }
  selectedView(val: any) {
    this.viewfileter = ""
  }
  selectedcheckValue(val: any) {
    this.checkvalue = ""
  }
  selectedstatusValue(val: any) {
    this.status = ""
  }
  selecteddateValue(val: any) {
    this.startdate = ""
  }
}
