import { Component, OnInit } from '@angular/core';
import { ContactFormComponent } from '../../contact/contact-form/contact-form.component';
import { User } from '../../../models/user.model';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-contact-page',
  imports: [ContactFormComponent,MatDialogModule,MatButtonModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  standalone: true
})
export class ContactPageComponent {

  users: User[] = [];
  loading = true; // Indicador de carga
  error: string | null = null;
  constructor(private dialog: MatDialog){
  }

}
