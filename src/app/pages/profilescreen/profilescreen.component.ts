import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdduserComponent } from 'src/app/components/adduser/adduser.component';
import { EdituserComponent } from 'src/app/components/edituser/edituser.component';
import { SavefilterComponent } from 'src/app/components/savefilter/savefilter.component';
import { profileFilterPayload } from 'src/app/models/tables-filters.model';
import { NotificationService } from 'src/app/services/notification.service';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profilescreen',
  templateUrl: './profilescreen.component.html',
  styleUrls: ['./profilescreen.component.scss']
})
export class ProfileScreenComponent implements OnInit {
  paginationInfo: any;
  matDialgRef!: MatDialogRef<SavefilterComponent>;
  matDialgRefmodel!: MatDialogRef<AdduserComponent>;
  matDialgeditRef!: MatDialogRef<EdituserComponent>;
  rowData: any;

  profileTableData: any;
  profileTableDataSize: number = 0;
  profileTableFilter: profileFilterPayload = {};

  profileTablePerPage: number = 10;
  profileTableCurrentPage: number = 1;

  noProfileTableDataFlag: boolean = false;

  dateRangeStart: string | undefined = '';
  dateRangeEnd: string | undefined = '';

  user = this.authenticationService.userValue;

  constructor(
    private matDialog: MatDialog,
    private notify: NotificationService,
    private api: BackendApiService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.profileTableFilter = {
      currentPage: this.profileTableCurrentPage,
      perPage: this.profileTablePerPage,
      filters: undefined,
      ranges: undefined,
      sort: undefined
    };
    this.getProfileTableData(this.profileTableFilter);
  }

  getProfileTableData(profileTableFilter: profileFilterPayload) {
    this.api.getProfileTable(profileTableFilter, this.user?.token)
      .subscribe(
        data => {
          this.profileTableData = data.result;
          this.profileTableDataSize = data.count;
          if (this.profileTableData.length > 0) {
            this.noProfileTableDataFlag = false
          } else {
            this.noProfileTableDataFlag = true
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

  applyProfileFilters(profilename: any, profileemail: any, profilerole: any) {
    const pname = profilename.value;
    const pemail = profileemail.value;
    const prole = profilerole.value;

    this.profileTableFilter = {
      currentPage: this.profileTableCurrentPage,
      perPage: this.profileTablePerPage,
      filters: {
        nameFilter: pname ? { values: [pname] } : undefined,
        emailFilter: pemail ? { values: [pemail] } : undefined,
        roleFilter: prole ? { values: [prole] } : undefined,
      },
      ranges: {
        bigEquals: this.dateRangeEnd ? this.dateRangeEnd : undefined,
        smallEquals: this.dateRangeStart ? this.dateRangeStart : undefined,
      },
      sort: undefined
    };
    this.getProfileTableData(this.profileTableFilter);
  }

  resetProfileFilters(profilename: any, profileemail: any, profilerole: any, dateRangeStart: any, dateRangeEnd: any) {
    profilename.value = '';
    profileemail.value = '';
    profilerole.value = undefined;
    dateRangeStart.value = '';
    dateRangeEnd.value = '';

    this.profileTableFilter = {
      currentPage: this.profileTableCurrentPage,
      perPage: this.profileTablePerPage,
      filters: undefined,
      ranges: undefined,
      sort: undefined
    };
    this.getProfileTableData(this.profileTableFilter);
  }

  onProfileTablePageEvent = ($event: { pageIndex: any; }) => {
    this.profileTableCurrentPage = $event.pageIndex + 1;
    this.profileTableFilter.currentPage = this.profileTableCurrentPage;
    this.getProfileTableData(this.profileTableFilter);
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
