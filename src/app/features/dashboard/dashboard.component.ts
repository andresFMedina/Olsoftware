import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  users: User[];

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
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data.map(e => {
          return {
            ...e.payload.doc.data()
          } as User;
        });
        console.log(this.users);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteRow(user?: User) {
    console.log(user);
    this.userService.deleteUser(user.uid);
  }

  openDialogCreateUser(user?: User) {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '600px',
      data: user
    });
  }

}
