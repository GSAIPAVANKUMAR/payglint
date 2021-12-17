import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
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
  ) {
    this.listenRouting();
  }

  ngOnInit() {
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
        if (activePath.includes("/events")) {
          this.activeLink = "events";
        } else if (activePath.includes("/screenevents")) {
          this.activeLink = "screenevents";
        }
        else if (activePath.includes("/profilescreen")) {
          this.activeLink = "profilescreen";
        }
        else if (activePath.includes("/audittrails")) {
          this.activeLink = "audittrails";
        }
        else if (activePath.includes("/reports")) {
          this.activeLink = "reports";
        }
        else if (activePath.includes("/analytics")) {
          this.activeLink = "analytics";
        }
        if (activePath.includes("/dashboard")) {
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
