import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-checkpopup',
  templateUrl: './checkpopup.component.html',
  styleUrls: ['./checkpopup.component.scss']
})
export class CheckpopupComponent implements OnInit {
  showgeninf = true;
  dis = false;
  showuserinf = true;
  showreasoninf = true;
  ip: any;
  userID: any;
  checkpoint: any;
  riskScore: any;
  severity: any;
  requestID: any;
  device: any;
  session: any;
  email: any;
  emailVerification: any;
  phone: any;
  phoneVerification: any;
  @Input() row: any;
  @Output() newEvent = new EventEmitter<boolean>();
  response: any;
  notification: any;
  router: any;

  user = this.authenticationService.userValue;

  constructor(
    private service: BackendApiService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    console.log(this.row);
    this.getRequestRowData(this.row.requestId)
  }

  getRequestRowData(requestid: any) {
    this.service.getRequestData(requestid, this.user?.token).subscribe((res: any) => {
      this.response = res;
      console.log(this.response)
      this.ip = this.response.ip;
      this.userID = this.response.userId;
      this.checkpoint = this.response.checkPointType;
      this.riskScore = this.response.score;
      this.severity = this.response.riskLevel;
      this.requestID = this.response.requestId;
      this.device = this.response.deviceId;
      this.session = this.response.sessionId;
      this.email = this.response.user.email;
      this.emailVerification = this.response.user.isEmailVerified;
      this.phone = this.response.user.phoneUser;
      this.phoneVerification = this.response.user.isPhoneUserVerified;
    })
  }
  addNew(value: boolean) {
    this.newEvent.emit(this.dis);
  }
  gencollapse() {
    console.log(this.showgeninf);
    if (this.showgeninf == true) {
      this.showgeninf = false;
      return;
    }
    this.showgeninf = true;
  }
  usercollapse() {
    console.log(this.showgeninf);
    if (this.showuserinf == true) {
      this.showuserinf = false;
      return;
    }
    this.showuserinf = true;
  }
  reasoncollapse() {
    if (this.showreasoninf == true) {
      this.showreasoninf = false;
      return;
    }
    this.showreasoninf = true;
  }
}
