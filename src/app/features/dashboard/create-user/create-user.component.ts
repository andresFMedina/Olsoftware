import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      identification: [null, Validators.required],
      role: [null, Validators.required],
      status: [null, Validators.required],
      password: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required]
    });
  }

  onSubmit() {
    const user: User = {
      name: this.form.get('name').value,
      lastname: this.form.get('lastname').value,
      identification: this.form.get('identification').value,
      role: this.form.get('role').value,
      status: this.form.get('status').value,
      phone: this.form.get('phone').value,
      email: this.form.get('email').value,
    };
    console.log(user);
    this.userService.createUser(user);
  }

}
