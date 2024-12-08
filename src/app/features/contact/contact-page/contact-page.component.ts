import { Component, OnInit } from '@angular/core';
import { ContactFormComponent } from '../../contact/contact-form/contact-form.component';
import { User } from '../../../models/user.model';
import { MatDialog, MatDialogModule,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-contact-page',
  imports: [ContactFormComponent,MatDialogModule],
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
