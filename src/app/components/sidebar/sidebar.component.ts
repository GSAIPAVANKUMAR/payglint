import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { environment } from 'src/environments/environment';

const route_prefix = environment.routePrefix;

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

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.listenRouting();
  }

  ngOnInit() {
  }

  userLogout() {
    this.authenticationService.logout();
    this.router.navigate([route_prefix + 'login']);
  }

  navigate(value: any) {
    this.router.navigate([route_prefix + value]);
  }


  settingClicked() {
    if (this.isProfileLoaded) {
      this.isExpanded = false;
    } else {
      this.isExpanded = true;
    }
  }

  listenRouting() {
    let routerUrl: string, routerList: Array<any>, target: any;
    this.router.events.subscribe((router: any) => {
      if (router.url) {
        let activePath = router.url;
        if (activePath.includes(route_prefix + "events")) {
          this.activeLink = "events";
        } else if (activePath.includes(route_prefix + "screenevents")) {
          this.activeLink = "screenevents";
        }
        else if (activePath.includes(route_prefix + "profilescreen")) {
          this.activeLink = "profilescreen";
        }
        else if (activePath.includes(route_prefix + "audittrails")) {
          this.activeLink = "audittrails";
        }
        else if (activePath.includes(route_prefix + "reports")) {
          this.activeLink = "reports";
        }
        else if (activePath.includes(route_prefix + "analytics")) {
          this.activeLink = "analytics";
        }
        if (activePath.includes(route_prefix + "dashboard")) {
          this.activeLink = "dashboard";
        }
      }
    });
  }
}
