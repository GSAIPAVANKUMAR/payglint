import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SideBarComponent implements OnInit {
  errorInfo: any;
  username: any;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];
  isExpanded: boolean = true;
  activeLink !: string;
  isProfileLoaded: any;
  profileImage!: string;
  showSlackIcon: boolean = false;
  workSpaceUrl!: string;
  shortName!: string;
  // userData: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.listenRouting();
  }

  ngOnInit() {
  }

  userLogout(){
    this.authenticationService.logout();
  }

  navigate(value: any) {
    this.router.navigate([value]);
  }


  settingClicked() {
    if (this.isProfileLoaded) {
      this.isExpanded = false;
    } else {
      this.isExpanded = true;
    }
  }

  // back() {
  //   this.location.back();
  // }
  listenRouting() {
    let routerUrl: string, routerList: Array<any>, target: any;
    this.router.events.subscribe((router: any) => {
      if (router.url) {
        let activePath = router.url;
        if (activePath.includes("axiom-test/dashboard/events")) {
          this.activeLink = "events";
        } else if (activePath.includes("axiom-test/dashboard/screenevents")) {
          this.activeLink = "screenevents";
        }
        else if (activePath.includes("axiom-test/dashboard/profilescreen")) {
          this.activeLink = "profilescreen";
        }
        else if (activePath.includes("axiom-test/dashboard/audittrails")) {
          this.activeLink = "audittrails";
        }
        else if (activePath.includes("axiom-test/dashboard/reports")) {
          this.activeLink = "reports";
        }
        else if (activePath.includes("axiom-test/dashboard/analytics")) {
          this.activeLink = "analytics";
        }
        if (activePath.includes("axiom-test/dashboard/dashboard")) {
          this.activeLink = "dashboard";
        }
      }

      // if (router.url == "/home/dashboard" || router.url == "/home") {
      //   this.router.navigate(["/dashboard"]);
      //   return;
      // }
      // routerUrl = router.urlAfterRedirects;
    });
  }
}
