import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppSettings } from "../../settings/app.pattern";
import { AppMessageSetting } from "src/app/settings/app.message";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  signupForm!: FormGroup;
  message: any;
  confirmPasswordError: any
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  get confirmPassword() {
    return this.signupForm.get("confirmPassword");
  }
  get password() {
    return this.signupForm.get("password");
  }

  ngOnInit(): void {
    this.validateSignupForm();
    this.message = AppMessageSetting;
  }

  validateSignupForm(){
    this.signupForm = this.formBuilder.group({
      password:[
        "",
        [Validators.required]
      ],
      confirmPassword:[
        "",
        [Validators.required]
      ],
      token:[
        "",
        [Validators.required, Validators.pattern(AppSettings.TOKEN) ]
      ]
    })

    // confirm password check
    this.confirmPassword?.valueChanges.subscribe(
      (value) => {
        console.log("Confirm password value",value)
        if(this.password?.value !== this.confirmPassword?.value ){
          this.confirmPassword?.setErrors({ MatchPassword: true });
        }else{
          return
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  

  onSubmit(data:any):void{
    if(this.signupForm.valid){
      /***
       * 
       * Do API call for the Registration
       * 
       * 
       * **/
      console.log("Form data:",data);
    }
  }

}
