import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SavefilterComponent } from "src/app/components/savefilter/savefilter.component";
import { auditTrailTableFilterPayload } from "src/app/models/tables-filters.model";
import { NotificationService } from "src/app/services/notification.service";
import { BackendApiService } from "src/app/services/backend-api.service";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-audittrials",
  templateUrl: "./audittrials.component.html",
  styleUrls: ["./audittrials.component.scss"],
})
export class AudittrialsComponent implements OnInit {

  matDialgRef!: MatDialogRef<SavefilterComponent>;

  auditTrailTableData: any;
  auditTrailTableFilter: auditTrailTableFilterPayload = {};
  auditTrailTablePerPage: number = 10;
  auditTrailTableCurrentPage: number = 1;
  auditTrailTableTotalData: number = 0;

  noAuditTrailTableDataFlag: boolean = false;

  filterResourceOptionArray: Array<any> = [];
  filterUserOptionArray: Array<any> = [];

  dateRangeStart: string | undefined = '';
  dateRangeEnd: string | undefined = '';

  user = this.authenticationService.userValue;

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private notify: NotificationService,
    private api: BackendApiService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getfilterResourceOptionArray();
    this.getfilterUserOptionArray();

    this.auditTrailTableFilter = {
      currentPage: this.auditTrailTableCurrentPage,
      perPage: this.auditTrailTablePerPage,
      filters: undefined,
      ranges: undefined,
      sort: undefined
    };

    this.getAuditTrailTableData(this.auditTrailTableFilter);
  }

  getAuditTrailTableData(auditTrailTableFilter: auditTrailTableFilterPayload) {
    this.api
      .getAuditTrailTable(auditTrailTableFilter, this.user?.token)
      .subscribe(
        (data) => {
          this.auditTrailTableData = data.result;
          this.auditTrailTableTotalData = data.count;
          if (this.auditTrailTableData.length > 0) {
            this.noAuditTrailTableDataFlag = false;
          } else {
            this.noAuditTrailTableDataFlag = true;
          }
        },
        (error) => {
          this.notify.error(error);
        }
      );
  }

  getfilterResourceOptionArray() {
    this.api
      .getAuditTrailResourceFilterOptions(this.user?.token)
      .subscribe(
        (data) => {
          this.filterResourceOptionArray = data.AuditTrailResources;
        },
        (error) => {
          this.notify.error(error);
        }
      );
  }

  getfilterUserOptionArray() {
    this.api
      .getAuditTrailUserFilterOptions(this.user?.token)
      .subscribe(
        (data) => {
          this.filterUserOptionArray = data;
        },
        (error) => {
          this.notify.error(error);
        }
      );
  }

  resetAuditTrailFilters(auditTrailResource: any, auditTrailUser: any, auditTrailData: any, dateRangeStart: any, dateRangeEnd: any) {
    auditTrailResource.value = undefined;
    auditTrailUser.value = undefined;
    auditTrailData.value = '';
    dateRangeStart.value = '';
    dateRangeEnd.value = '';

    this.dateRangeEnd = '';
    this.dateRangeStart = '';

    this.auditTrailTableFilter = {
      currentPage: this.auditTrailTableCurrentPage,
      perPage: this.auditTrailTablePerPage,
      filters: undefined,
      ranges: undefined,
      sort: undefined
    };

    this.getAuditTrailTableData(this.auditTrailTableFilter);
  }

  applyAuditTrailFilters(auditTrailResource: any, auditTrailUser: any, auditTrailData: any) {
    const resource = auditTrailResource.value ? auditTrailResource.value : undefined;
    const user = auditTrailUser.value ? auditTrailUser.value : undefined;
    const data = auditTrailData.value ? auditTrailData.value : undefined;

    this.auditTrailTableFilter = {
      currentPage: this.auditTrailTableCurrentPage,
      perPage: this.auditTrailTablePerPage,
      filters: {
        resourceFilter: resource ? { values: [resource] } : undefined,
        userNameFilter: user ? { values: [user] } : undefined,
      },
      ranges: {
        bigEquals: this.dateRangeEnd ? this.dateRangeEnd : undefined,
        smallEquals: this.dateRangeStart ? this.dateRangeStart : undefined
      },
      sort: undefined
    };

    this.getAuditTrailTableData(this.auditTrailTableFilter);
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

  onPageEvent = ($event: { pageIndex: any; pageSize: any }) => {
    this.auditTrailTableCurrentPage = $event.pageIndex + 1;
    this.auditTrailTableFilter.currentPage = this.auditTrailTableCurrentPage;
    this.getAuditTrailTableData(this.auditTrailTableFilter);
  };

  openModal() {
    this.matDialgRef = this.matDialog.open(SavefilterComponent, {
      disableClose: true,
    });
  }
}
