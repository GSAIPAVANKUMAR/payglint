import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdduserComponent } from 'src/app/components/adduser/adduser.component';
import { EdituserComponent } from 'src/app/components/edituser/edituser.component';
import { SavefilterComponent } from 'src/app/components/savefilter/savefilter.component';
import { auditTrailTableFilterPayload } from 'src/app/models/tables-filters.model';
import { NotificationService } from 'src/app/services/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  matDialgRefmodel!: MatDialogRef<AdduserComponent>;
  EmitResult = {
    pageNumber: '',
    pageSize: ''
  };
  testPaginator = {
    length: 1000,
    pageSize: 10,
    pageIndex: 1
  };
  // tableData1 = [
  //   { Date: 'Low', LogedInUser: 'Email', Resource: 'Role', Sessionid: 'Created ', Path: 'Updated' },
  //   { Date: 'Low', LogedInUser: 'Email', Resource: 'Role', Sessionid: 'Created ', Path: 'Updated' },
  //   { Date: 'Low', LogedInUser: 'Email', Resource: 'Role', Sessionid: 'Created ', Path: 'Updated' },
  //   { Date: 'Low', LogedInUser: 'Email', Resource: 'Role', Sessionid: 'Created ', Path: 'Updated' },
  //   { Date: 'Low', LogedInUser: 'Email', Resource: 'Role', Sessionid: 'Created ', Path: 'Updated' }
  // ];

  tableData: any;
  matDialgeditRef!: MatDialogRef<EdituserComponent>;
  rowData: any;

  noAuditTrailTableDataFlag: boolean = false;

  auditTrailTableFilter: auditTrailTableFilterPayload = {};
  auditTrailTablePerPage: number = 10;
  auditTrailTableCurrentPage: number = 1;
  auditTrailTableTotalData: number = 0;

  user = this.authenticationService.userValue;

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private notify: NotificationService,
    private api: BackendApiService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.auditTrailTableFilter = {
      currentPage: this.auditTrailTableCurrentPage,
      perPage: this.auditTrailTablePerPage
    };

    this.getAuditTrailTableData(this.auditTrailTableFilter);
  }

  getAuditTrailTableData(auditTrailTableFilter: auditTrailTableFilterPayload) {
    this.api.getAuditTrailTable(auditTrailTableFilter, this.user?.token)
      .subscribe(
        data => {
          this.tableData = data.result;
          this.auditTrailTableTotalData = data.count;
          if (this.tableData.length > 0) {
            this.noAuditTrailTableDataFlag = false
          } else {
            this.noAuditTrailTableDataFlag = true
          }
        },
        error => {
          this.notify.error(error);
        }
      );
  }


  setPageSizeOptions = (setPageSizeOptionsInput: string) => {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onPageEvent = ($event: { pageIndex: any; pageSize: any; }) => {
    this.auditTrailTableCurrentPage = $event.pageIndex + 1;
    this.auditTrailTableFilter.currentPage = this.auditTrailTableCurrentPage;
    this.getAuditTrailTableData(this.auditTrailTableFilter);
  }
  showTestEmit = ($event: { pageIndex: any; pageSize: any; }) => {
    this.EmitResult = {
      pageNumber: $event.pageIndex,
      pageSize: $event.pageSize
    };
  }
  // getData = (pg: number, lmt: any) => {
  //   const start: number = pg * 9;
  //   console.log(this.tableData1.slice(start, start + lmt));
  //   this.tableData = this.tableData1.slice(start, start + lmt);
  // }
  // getPageDetails = () => {
  //   this.paginationInfo = this.tableData1;
  //   this.getData(0, 9);
  // }
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
    this.matDialgRefmodel = this.matDialog.open(AdduserComponent, {
      disableClose: true
    })
  }

  editModal(row: any) {
    this.rowData = row;
    this.matDialgeditRef = this.matDialog.open(EdituserComponent, {
      data: { row: this.rowData },
      disableClose: true
    })

  }
}
