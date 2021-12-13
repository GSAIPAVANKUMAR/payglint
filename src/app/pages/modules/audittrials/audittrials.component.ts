import { AddmodelComponent } from './../../component/addmodel/addmodel.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EdituserComponent } from 'src/app/edituser/edituser.component';
import { SavefilterComponent } from '../../savefilter/savefilter.component';

@Component({
  selector: 'app-audittrials',
  templateUrl: './audittrials.component.html',
  styleUrls: ['./audittrials.component.scss']
})
export class AudittrialsComponent implements OnInit {
  BASE_URL = 'http://localhost:3000';
  paginationInfo: any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  matDialgRef!: MatDialogRef<SavefilterComponent>;
  matDialgRefmodel!: MatDialogRef<AddmodelComponent>;
  EmitResult = {
    pageNumber: '',
    pageSize: ''
  };
  testPaginator = {
    length: 1000,
    pageSize: 10,
    pageIndex: 1
  };
  tableData1 = [{ Date: 'Low', LogedInUser: 'Email', Resource: 'Role', Sessionid: 'Created ', Path: 'Updated' },
    { Date: 'Low', LogedInUser: 'Email', Resource: 'Role', Sessionid: 'Created ', Path: 'Updated' },
    { Date: 'Low', LogedInUser: 'Email', Resource: 'Role', Sessionid: 'Created ', Path: 'Updated' },
    { Date: 'Low', LogedInUser: 'Email', Resource: 'Role', Sessionid: 'Created ', Path: 'Updated' },
    { Date: 'Low', LogedInUser: 'Email', Resource: 'Role', Sessionid: 'Created ', Path: 'Updated' }

  ];
  tableData: any;
  matDialgeditRef!: MatDialogRef<EdituserComponent>;
  rowData: any;
  

  constructor(private httpClient: HttpClient, private matDialog: MatDialog) {
    this.getPageDetails();
   
  }
  setPageSizeOptions = (setPageSizeOptionsInput: string) => {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  ngOnInit(): void {
    this.getPageDetails();
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
    const start : number = pg*9;
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
  allProjects = (page: number, limit: any) => {
    return this.httpClient.get(`${this.BASE_URL}/posts?_page=${page + 1}&_limit=${limit}`);
  }

  getPageSize = () => {
    return this.httpClient.get(`${this.BASE_URL}/pageSize`);
  }
  openModal() {
    this.matDialgRef = this.matDialog.open(SavefilterComponent, {
      disableClose: true
    })
  }
  openaddModal() {
    this.matDialgRefmodel = this.matDialog.open(AddmodelComponent, {
      disableClose: true
    })
  }

  editModal(row: any) {
    this.rowData = row;
    this.matDialgeditRef = this.matDialog.open(EdituserComponent, {data: {row:this.rowData},
      disableClose: true
    })
    
  }
}
