import { Component, OnInit } from '@angular/core';
import { ContactFormComponent } from '../../contact/contact-form/contact-form.component';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-contact-page',
  imports: [ContactFormComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {

  users: User[] = [];
  loading = true; // Indicador de carga
  error: string | null = null;
  constructor(){
  }

}
