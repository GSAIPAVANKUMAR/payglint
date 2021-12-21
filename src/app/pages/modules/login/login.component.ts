import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { from } from "rxjs";
import { BackendApiService } from "../../../services/backend-api.service";
import { NotificationService } from "../../../services/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  response: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private service: BackendApiService,
    private notification: NotificationService
  ) {}

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
  onSubmit (user: any): void  {
    this.service.login(user).subscribe(res=>{
      this.response = res;
      if(this.response.message!=null){
        this.notification.error(this.response.message);  
      }else{
        this.service.token = this.response.token;
        console.log(this.service.token);
        this.router.navigate(["/dashboard"]);
      }
    });
  } 
}
