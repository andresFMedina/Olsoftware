import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'protractor';

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
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<CreateUserComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    console.log(user);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 1000
    });
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
        role: parseInt(this.form.get('role').value),
        status: this.form.get('status').value,
        phone: this.form.get('phone').value,
        email: this.form.get('email').value,
      };
      const password = this.form.get('password').value;
      console.log(user);
      this.authService.singupWithEmailAndPassword(user.email, password)
        .then(user => {
          return user.user.uid;
        })
        .then(uid => this.userService.createUser(user, uid)
          .then(_ => this.openSnackBar('Usuario creado')))
        .catch(error => {
          this.openSnackBar('No se pudo crear el usuario');
          console.error(error);
        });

    } else {
      this.userService.updateUser(this.user, this.user.uid)
        .then(_ => this.openSnackBar('Usuario actualizado'))
        .catch(error => {
          this.openSnackBar('No se ha podido actualizar el usuario');
          console.error(error);
        });
    }
  }

}
