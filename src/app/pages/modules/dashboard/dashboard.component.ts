import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SavefilterComponent } from '../../savefilter/savefilter.component';

@Component({
  selector: 'dashboard-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  BASE_URL = 'http://localhost:3000';
  mockCsvData!: string;

   mockHeaders = `Severity,Score,Date,Session,UserID,DeviceID,Checkpoint,Amount,Currency,Destination,Status,Resolution
`
    // MatPaginator Inputs
    paginationInfo: any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  selectedRowIndex :any;
  dispalyRow = false;
  rowData: any;
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
  tableData1 = [{ Severity: 'Low', Score: 'Hydrogen1', Date: 'Casual', Session: 1, UserID: 'Hydrogen', DeviceID: 'Casual', Checkpoint: 'Hydrogen', Amount: 'Casual', Currency: 'Hydrogen', Destination: 'Casual', Status: 'Casual', Resolution:'value' },
    { Severity: 'Low', Score: 'Hydrogen2', Date: 'Casual', Session: 1, UserID: 'Hydrogen', DeviceID: 'Casual', Checkpoint: 'Hydrogen', Amount: 'Casual', Currency: 'Hydrogen', Destination: 'Casual', Status: 'Casual',Resolution:'value' },
    { Severity: 'Low', Score: 'Hydrogen3', Date: 'Casual', Session: 1, UserID: 'Hydrogen', DeviceID: 'Casual', Checkpoint: 'Hydrogen', Amount: 'Casual', Currency: 'Hydrogen', Destination: 'Casual', Status: 'Casual', Resolution:'value'},
    { Severity: 'Low', Score: 'Hydrogen4', Date: 'Casual', Session: 1, UserID: 'Hydrogen', DeviceID: 'Casual', Checkpoint: 'Hydrogen', Amount: 'Casual', Currency: 'Hydrogen', Destination: 'Casual', Status: 'Casual',Resolution:'value' },
    { Severity: 'Low', Score: 'Hydrogen5', Date: 'Casual', Session: 1, UserID: 'Hydrogen', DeviceID: 'Casual', Checkpoint: 'Hydrogen', Amount: 'Casual', Currency: 'Hydrogen', Destination: 'Casual', Status: 'Casual', Resolution:'value'},
    { Severity: 'Low', Score: 'Hydrogen6', Date: 'Casual', Session: 1, UserID: 'Hydrogen', DeviceID: 'Casual', Checkpoint: 'Hydrogen', Amount: 'Casual', Currency: 'Hydrogen', Destination: 'Casual', Status: 'Casual', Resolution: 'value' },
    { Severity: 'Low', Score: 'Hydrogen4', Date: 'Casual', Session: 1, UserID: 'Hydrogen', DeviceID: 'Casual', Checkpoint: 'Hydrogen', Amount: 'Casual', Currency: 'Hydrogen', Destination: 'Casual', Status: 'Casual',Resolution:'value' },
    { Severity: 'Low', Score: 'Hydrogen5', Date: 'Casual', Session: 1, UserID: 'Hydrogen', DeviceID: 'Casual', Checkpoint: 'Hydrogen', Amount: 'Casual', Currency: 'Hydrogen', Destination: 'Casual', Status: 'Casual', Resolution:'value'},
    { Severity: 'Low', Score: 'Hydrogen6', Date: 'Casual', Session: 1, UserID: 'Hydrogen', DeviceID: 'Casual', Checkpoint: 'Hydrogen', Amount: 'Casual', Currency: 'Hydrogen', Destination: 'Casual',Status: 'Casual',Resolution:'value'}
  ];
  tableData: any;
    constructor(private httpClient: HttpClient, private matDialog: MatDialog) {
      // this.getPageDetails();
      
    }
    setPageSizeOptions = (setPageSizeOptionsInput: string) => {
      if (setPageSizeOptionsInput) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      }
    }

    ngOnInit(): void {
      // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      // Add 'implements OnInit' to the class.
      this.getPageDetails();
     // this.getPageDetails();
    }

    onPageEvent = ($event: { pageIndex: any; pageSize: any; }) => {
      this.getData($event.pageIndex, $event.pageSize);
    }

    showTestEmit = ($event: { pageIndex: any; pageSize: any; }) => {
      this.EmitResult =  {
        pageNumber: $event.pageIndex,
        pageSize: $event.pageSize
      };
    }

    getData = (pg: number, lmt: any) => {
      // return this.allProjects(pg, lmt).subscribe( res => {
      // this.tableData = [];
      // });
      const start : number = pg*6;
      console.log(this.tableData1.slice(start,start+lmt));
      this.tableData = this.tableData1.slice(start,start+lmt);
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
    hideRow(value:boolean){
      this.dispalyRow = value;
      this.selectedRowIndex = "fsd";
    }
    display(row: any){
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
      Severity : item.Severity.replace(/,/g, ''),
      Score : item.Score,
      Date : item.Date,
      Session : item.Session,
      UserID : item.UserID,
      DeviceID : item.DeviceID,
      Checkpoint : item.Checkpoint,
      Amount : item.Amount,
      Currency : item.Currency,
      Destination : item.Destination,
      Status : item.Status,
      Resolution : item.Resolution
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
}
