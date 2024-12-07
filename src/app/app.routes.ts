import { Routes } from '@angular/router';
import { ContactPageComponent } from './features/contact/contact-page/contact-page.component';
import { ContactTableComponent } from './features/contact/contact-table/contact-table.component';

export const routes: Routes = [
  { path: 'contact-page', component: ContactPageComponent },
  { path: 'contact-table', component: ContactTableComponent },
  { path: '' , redirectTo: '/contact-table', pathMatch:'full'},
  { path: '**', component:  ContactTableComponent }
];
