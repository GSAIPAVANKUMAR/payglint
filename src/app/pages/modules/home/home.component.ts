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
        if (activePath.includes("/dashboard")) {
          this.activeLink = "Home";
        } else if (activePath.includes("/profile")) {
          this.activeLink = "profile";
        } 
      }

      if (router.url == "/home/dashboard" || router.url == "/home") {
        this.router.navigate(["/dashboard"]);
        return;
      }
      routerUrl = router.urlAfterRedirects;
    });
  }
}
