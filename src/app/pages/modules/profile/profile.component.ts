import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SavefilterComponent } from "../../shared/component/savefilter/savefilter.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  BASE_URL = "http://localhost:3000";
  mockCsvData!: string;

  mockHeaders = `Date,ScreenListenerType,Action,ScreenID,UserID,SessionID,DeviceID,Version
`;
  // MatPaginator Inputs
  paginationInfo: any;
  viewfileter: string = 'View all filters'
  screentypes: string = 'Screen Type(0)'
  pageSizeOptions: number[] = [5, 10, 25, 100];
  showexport = true;
  selectedRowIndex: any;
  dispalyRow = false;
  rowData: any;
  nameplaceholder: string = "name";
  matDialgRef!: MatDialogRef<SavefilterComponent>;
  // Test states
  EmitResult = {
    pageNumber: "",
    pageSize: "",
  };

  testPaginator = {
    length: 1000,
    pageSize: 10,
    pageIndex: 1,
  };

  // states
  tableData1 = [
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo1', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo2', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo3', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo4', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo5', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo6', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo7', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo8', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo9', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo0', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo1', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo2', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo3', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo4', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo5', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo6', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo7', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo8', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo9', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo0', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
    { date: '23/11/2021 10:01', screenListenerType: 'PAYMENT_SCREEN', action: 'END', screenId: '2', userId: 'edo1', sessionId: '7762a0f7a124dfec_13565478995632', deviceId:'26f8d599-0b8d-4538-8ee7-d79c870d9e0b', version:'2.2.23'},
  ];
  tableData: any;
  constructor(private httpClient: HttpClient, private matDialog: MatDialog) {
    this.getPageDetails();
  }
  setPageSizeOptions = (setPageSizeOptionsInput: string) => {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(",")
        .map((str) => +str);
    }
  };

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.getPageDetails();
    // this.getPageDetails();
  }

  onPageEvent = ($event: { pageIndex: any; pageSize: any }) => {
    this.getData($event.pageIndex, $event.pageSize);
  };

  showTestEmit = ($event: { pageIndex: any; pageSize: any }) => {
    this.EmitResult = {
      pageNumber: $event.pageIndex,
      pageSize: $event.pageSize,
    };
  };

  getData = (pg: number, lmt: any) => {
    // return this.allProjects(pg, lmt).subscribe( res => {
    // this.tableData = [];
    // });
    const start: number = pg * 9;
    console.log(this.tableData1.slice(start, start + lmt));
    this.tableData = this.tableData1.slice(start, start + lmt);
  };
  getPageDetails = () => {
    // this.getPageSize().subscribe( res => {
    // this.paginationInfo = this.tableData1;
    // this.getData(0, this.paginationInfo.pageSize);
    // });
    this.paginationInfo = this.tableData1;
    this.getData(0, 9);
  };

  // getData = (pg: number, lmt: any) => {
  //   return this.allProjects(pg, lmt).subscribe( res => {
  //     this.tableData = [];
  //   });
  // }

  allProjects = (page: number, limit: any) => {
    return this.httpClient.get(
      `${this.BASE_URL}/posts?_page=${page + 1}&_limit=${limit}`
    );
  };

  getPageSize = () => {
    return this.httpClient.get(`${this.BASE_URL}/pageSize`);
  };
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
      disableClose: true,
    });
  }
  convertToCSV(objArray: string) {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";

    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line != "") line += ",";
        line += array[i][index];
      }
      str += line + "\r\n";
    }
    return str;
  }

  onTabChanged($event: any) {
    debugger;
    console.log($event);
    if ($event.index == 1) {
      this.showexport = false;
    } else {
      this.showexport = true;
    }
  }
  checkPlaceHolder() {
    console.log(this.nameplaceholder.length);
    debugger;
    if (this.nameplaceholder.length >= 0) {
      this.nameplaceholder = "";
      return;
    } else {
      this.nameplaceholder = "name";
      return;
    }
  }
  selectedView(val: any) {
    this.viewfileter = ""
  }
  selectedscreenView(val: any) {
    this.screentypes = ""
  }
}
