import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: String;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    debugger;
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    } else {
      let user = new User(this.f.username.value, this.f.password.value);
      try {
        this.authService.login(user);
      } catch (err) {
        this.error = err;
      }
      this.router.navigate(["/home"]);
    }
  }
}
