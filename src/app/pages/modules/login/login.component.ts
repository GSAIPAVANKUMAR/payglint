import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { from } from "rxjs";
import { ApiService } from "../../api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  users: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      token: ['', Validators.required]
  });
  this.api.get('users?page=1').subscribe(res => {
    this.users = res;
    console.log('data response', this.users);
  });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/home";
  }

  // convenience getter for easy access to form fields
  get formValue() {
    return this.loginForm.controls;
  }
  login() {
    let formData = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.router.navigate(["/dashboard"]);
  }
}
