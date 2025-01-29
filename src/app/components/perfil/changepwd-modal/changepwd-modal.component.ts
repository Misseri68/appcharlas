import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Usuario } from '../../../models/Usuario';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-changepwd-modal',
  templateUrl: './changepwd-modal.component.html',
  styleUrls: ['./changepwd-modal.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ChangepwdModalComponent {
  @Input() user: any;

  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private _loginService: LoginService) {
    this.changePasswordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      alert("Inválido. Introduzca datos correctos.");
    } else {
      let newPwd = this.changePasswordForm.value.newPassword
      this.comprobarContraseña().then(correcta => {
        if (correcta == true) {
          this._loginService.cambiarContraseña(newPwd).then(response => {
            if (response == 200) {
              alert("Contraseña cambiada correctamente");
            }
          });
        }else{
          alert("Contraseña incorrecta")
        }
      })
    }
  }

  async comprobarContraseña(): Promise<boolean> {
    let correcta: boolean = false;
    await this._loginService.login(this.user.email, this.changePasswordForm.value.currentPassword).then(response => {
      console.log(response)
      if (response === 200) {
        console.log("Contraseña actual correcta");
        correcta = true
      }
    });
    return correcta;
  }

  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.closePopup.emit();
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.closePopup.emit();
    }
  }
}
