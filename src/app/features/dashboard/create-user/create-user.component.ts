import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    console.log(user);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [(!this.user) ? null : this.user.name, Validators.required],
      lastname: [(!this.user) ? null : this.user.lastname, Validators.required],
      identification: [(!this.user) ? null : this.user.identification, Validators.required],
      role: [(!this.user) ? null : this.user.role, Validators.required],
      status: [(!this.user) ? null : this.user.status, Validators.required],
      password: [null],
      phone: [(!this.user) ? null : this.user.phone, Validators.required],
      email: [(!this.user) ? null : this.user.email, Validators.required]
    });
  }

  onSubmit() {
    if (!this.user) {
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
      this.userService.createUser(user).then(_ => this.dialogRef.close);
    } else {
      this.userService.updateUser(this.user, this.user.uid).then(result => console.log(result)).catch(error => console.error(error));
    }
  }

}
