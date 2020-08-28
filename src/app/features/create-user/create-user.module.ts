import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { CreateUserComponent } from './create-user.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CreateUserModule { }
