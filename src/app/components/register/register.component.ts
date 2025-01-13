import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [FormsModule, RouterLink],
})
export class RegisterComponent {

  onSubmit(form: NgForm) {
  const nombre = form.value.nombre;
  const apellido = form.value.apellido;
  const email = form.value.email;
  const password = form.value.password;
  const confirmPassword = form.value.confirmPassword;
  const accessCode = form.value.accessCode;
  }

}
