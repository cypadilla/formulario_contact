import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [ContactService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'formulario_contacto';
}
