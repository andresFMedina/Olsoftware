import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    const user = this.form.get('user').value;
    const password = this.form.get('password').value;
    this.authService.loginEmailAndPassword(user, password).then(
      (result) => this.router.navigate(['/dashboard'])
    );
  }

}
