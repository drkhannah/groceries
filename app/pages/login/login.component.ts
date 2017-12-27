import { Component } from "@angular/core";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  providers: [UserService],
  templateUrl: "./pages/login/login.html",
  styleUrls: ["./pages/login/login-common.css", "./pages/login/login.css"]
})
export class LoginComponent {
  user: User;
  isLoggingIn = true;

  constructor(private router: Router, private userService: UserService) {
    this.user = new User();
    this.user.email = "my.test.account@nativescript.org";
    this.user.password = "password";
  }
  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }
  login() {
    this.userService
      .login(this.user)
      .subscribe(
        res => this.router.navigate(["/list"]),
        error => alert("Unfortunately we could not find your account.")
      );
  }
  signUp() {
    this.userService.register(this.user).subscribe(
      res => {
        alert("Your account was successfully created: " + res);
        this.toggleDisplay();
      },
      res => {
        alert("Unfortunately we were unable to create your account: " + res);
        console.log(res);
      }
    );
  }
  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}