import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "../../services/notification.service";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  response: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      token: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/home";
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
        this.router.navigate(["/events"]);
      }
    });
  }
}
