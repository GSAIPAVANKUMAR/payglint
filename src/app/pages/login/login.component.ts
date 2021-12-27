import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "../../services/notification.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { AppSettings } from "../../settings/app.pattern";
import { AppMessageSetting } from "src/app/settings/app.message";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  response: any = [];
  message: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/home";
    this.validateLoginForm();
    this.message = AppMessageSetting;
  }

  validateLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern(AppSettings.EMAIL)]],
      password: ["", [Validators.required]],
      token: ["", [Validators.required, Validators.pattern(AppSettings.TOKEN)]],
    });
  }

  // convenience getter for easy access to form fields
  get formValue() {
    return this.loginForm.controls;
  }
  onSubmit(user: any): void {
    this.authenticationService.login(user).subscribe(res => {
      this.response = res;
      if (this.response.message != null) {
        this.notification.error(this.response.message);
      }
      else {
        this.router.navigate(["axiom-test/dashboard/dashboard"]);
      }
    });
  }
}
