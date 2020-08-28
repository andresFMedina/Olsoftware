import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  users: User[] = [
    {
      id: 1,
      name: 'Andrés Felipe',
      lastname: 'Medina Tascón',
      identification: '1658992569',
      role: 2,
      status: 'A',
      phone: '3502148698',
      email: 'andresfelipe.medinat@gmail.com',

    }
  ];

  displayedColumns = [
    'name',
    'lastname',
    'identification',
    'role',
    'status',
    'phone',
    'email',
    'action',
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
    ) { }

  deleteRow(index, row) {

  }

  openDialogCreateUser() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '600px'
    });
  }

}
