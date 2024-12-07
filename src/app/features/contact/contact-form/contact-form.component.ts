import { Component, Inject, Injectable } from '@angular/core';
import {MatFormFieldModule ,} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';

import { v4 as uuidv4 } from 'uuid';

import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-contact-form',
  imports: [MatFormFieldModule,MatSelectModule,ReactiveFormsModule, MatInputModule ,CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  standalone: true
})
export class ContactFormComponent {

  user : User[] = [];

  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {


    this.form = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date_birthday: ['', Validators.required],
      sex: ['', Validators.required],
      addres: ['', Validators.required],
      country: ['', Validators.required],
      Deparment: [{ value: '', disabled: true }, Validators.required], // Se establece como deshabilitado por defecto
      City: ['', Validators.required],
      home_apartment: [''],
      comment: ['', Validators.required],
    });

    if(this.data !== null && this.data !== undefined){
      this.form.patchValue({
        id: data.id,
        name: data.name,
        last_name: data.last_name,
        email:data.email,
        date_birthday: data.date_birthday,
        sex: data.sex,
        addres: data.addres,
        country: data.country,
        Deparment: data.Deparment,
        City: data.City,
        home_apartment: data.home_apartment,
        comment: data.comment
      })
    }

    console.log(this.user)
    // Reactivar "Deparment" cuando el país sea "Colombia"
    this.form.controls['country'].valueChanges.subscribe((value) => {
      if (value === 'Colombia') {
        this.form.controls['Deparment'].enable();
      } else {
        this.form.controls['Deparment'].disable();
      }
    });
  }

  calculateAge(birthday: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    if (month < birthday.getMonth() || (month === birthday.getMonth() && day < birthday.getDate())) {
      age--;
    }
    return age;
  }

  onSubmit() {
    if (this.form.valid) {
      const birthday = new Date(this.form.value.date_birthday);
      const age = this.calculateAge(birthday);

      if (age < 18) {
        alert('No puedes registrarte, debes ser mayor de edad.');
      } else {
        const formValueWithId = {
          ...this.form.value,
          id: this.data?.id || uuidv4(), // Generar ID único
          Deparment: this.form.controls['Deparment'].disabled ? '' : this.form.value.Deparment,
        };
        console.log(formValueWithId);
        this.dialogRef.close(formValueWithId);
        this.router.navigate(['/contact-table']);
      }
    }
  }


}
