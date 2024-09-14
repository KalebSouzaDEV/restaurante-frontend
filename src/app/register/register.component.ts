import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  cpf = '';
  password = '';
  name = '';
  phone = '';
  address = '';
  constructor(private renderer: Renderer2, private route: Router, private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Altera a cor de fundo do body quando o componente for inicializado
    this.renderer.setStyle(document.body, 'backgroundColor', '#DDD8C9');
  }

  ngOnDestroy(): void {
    // Reseta a cor de fundo quando o componente for destruído (navegação para outro componente)
    this.renderer.removeStyle(document.body, 'backgroundColor');
  }
  navigatePage(page: string){
    this.route.navigate([page])
  }

  registerAccount() {
    if (this.cpf.length > 0 && this.password.length > 0 && this.name.length > 0 && this.phone.length > 0 && this.address.length > 0) {
      this.http.post("https://restaurante-backend-production.up.railway.app/users", {login: this.cpf, password: this.password, nome: this.name, address: this.address, phone: this.phone}, {responseType: 'text'}).subscribe(response => {
        this.snackBar.open("Cadastro concluído com sucesso", 'Fechar', {duration: 3000})
        this.route.navigate(['login'])

      })
    } else {
      this.snackBar.open("Preencha todas as informações para criar uma conta.", 'Fechar', {duration: 3000})
    }
  }

  onInputCPF(event: any) {
    let input = event.target.value;

    // Remover qualquer caractere que não seja número
    input = input.replace(/\D/g, '');

    // Limitar ao tamanho do CPF (11 dígitos)
    if (input.length > 11) {
      input = input.substring(0, 11);
    }

    // Aplicar a formatação (XXX.XXX.XXX-XX)
    if (input.length > 9) {
      input = input.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (input.length > 6) {
      input = input.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (input.length > 3) {
      input = input.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }

    // Atualizar o valor do modelo
    this.cpf = input;
  }

  onInputPhone(event: any) {
    let input = event.target.value;

    // Remover qualquer caractere que não seja número
    input = input.replace(/\D/g, '');

    // Limitar o número de dígitos ao máximo de 11 (DDD + 9 dígito + número)
    if (input.length > 11) {
      input = input.substring(0, 11);
    }

    // Aplicar a formatação (XX) 9XXXX-XXXX
    if (input.length > 6) {
      input = input.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2$3-$4');
    } else if (input.length > 2) {
      input = input.replace(/(\d{2})(\d{1,4})/, '($1) $2');
    } else {
      input = input.replace(/(\d{0,2})/, '($1');
    }

    // Atualizar o valor do modelo
    this.phone = input;
  }
}
