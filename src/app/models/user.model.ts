export interface User {
  id: number; // Identificador único del usuario
  sex: string; // Sexo del usuario,
  date_birthday: string; // Fecha de nacimiento en formato
  name: string; // Nombre del usuario
  last_name: string; // Apellido del usuario
  email: string; // Correo electrónico
  addres: string; // Dirección del usuario
  country: string; // País
  Deparment?: string; // Departamento
  City: string; // Ciudad
  home_apartment?:string; //Casa/ aPARTAMENTO
  comment: string; // Comentarios adicionales
}
