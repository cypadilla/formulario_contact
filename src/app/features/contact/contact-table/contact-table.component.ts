import {Component, ViewChild, AfterViewInit, inject, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe} from '@angular/common';
import { ContactService } from '../../../services/contact.service';
import { User } from '../../../models/user.model';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-contact-table',
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,MatButtonModule, DatePipe, MatDialogModule],
  templateUrl: './contact-table.component.html',
  styleUrl: './contact-table.component.scss'
})
export class ContactTableComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['name', 'last_name', 'date_birthday', 'email', 'addres', 'country', 'Deparment', 'City', 'home_apartment', 'comment', 'Actions' ];
  users: User[] = [];
  userEdit: User = {
    id: 0,
    sex: '',
    date_birthday: '',
    name: '',
    last_name: '',
    email: '',
    addres: '',
    country: '',
    City: '',
    comment: ''
  };
  error: string | null = null;;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatTable) table!: MatTable<User>;

  constructor(
    private contactService:ContactService,
    private dialog: MatDialog,
    private router: Router
  ){}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.userEdit = navigation?.extras.state?.['user'];
    if (this.userEdit) {
      console.log('Recibido:', this.userEdit);
    }
  }

  ngAfterViewInit() {

    this.contactService.getUsers().subscribe({
      next: (data) => {

        this.dataSource.data = data.map((item: any) => ({
          id: item.id,
          sex: item.sex,
          date_birthday: item.date_birthday,
          name: item.name || 'N/A', // Asegura un valor predeterminado
          last_name: item.last_name || 'N/A',
          email: item.email || 'N/A',
          addres: item.addres || 'N/A',
          country: item.country || 'N/A',
          Deparment: item.Deparment || 'N/A',
          City: item.City || 'N/A',
          home_apartment: '',
          comment: item.comment || '',
        }));
        this.dataSource.paginator = this.paginator; // Vincular el paginador
        this.dataSource.sort = this.sort; // Vincular el ordenamiento
        this.isLoadingResults = false;
        console.log(data)
      },
      error: (err) => {
        console.error('Error al cargar los usuarios', err);
        this.error = 'No se pudo cargar la lista de usuarios.';
        this.isLoadingResults = false;
      }
    });
    console.log(this.dataSource.data);
    this.dataSource.data = [...this.dataSource.data, this.userEdit];
  }

  editUser(user: User): void {
    console.log('Editando usuario:', user);
    this.openEditDialog(user);
  }

  addData() {
    this.openEditDialog();
  }

  openEditDialog(user?: User): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '50vw',
      height: '90vh',
      maxWidth: '100vw',
      panelClass: 'custom-dialog',
      data: user || {} // Pasar datos del usuario o un objeto vacío
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Verificar si es un usuario editado o agregado
        // Si el usuario es editado, actualiza los datos en el dataSource
        if (user) {
          const index = this.dataSource.data.findIndex(u => u.id === result.id);
          if (index !== -1) {
            // Actualizar el usuario en el array
            this.dataSource.data[index] = result;
          }
        } else {
          // Si es un nuevo usuario, agregarlo
          this.dataSource.data.push(result);
        }

        // Actualizar la tabla
        this.dataSource._updateChangeSubscription();
        this.table.renderRows();
      }
    });

  }



}

