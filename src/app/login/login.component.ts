import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface acess { 
    acessToken: string, 
    expiresIn: number,
    roles: {
      name: string, 
      roleId: number
    }[]
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = '';
  password = '';
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

  onInputCPF(event: any) {
    let input = event.target.value;
  
    // Verificar se o valor é numérico antes de processar
    if (isNaN(Number(input))) {
      // Se não for numérico, limpar o campo ou tratar de acordo com a lógica desejada
      this.login = input;
      return;
    }
  
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
    this.login = input;
  }
  

  loginAccount(){
    this.http.post<acess>("https://restaurante-backend-production.up.railway.app/login", {login: this.login, password: this.password}, {responseType: "json"}).subscribe(response => {
      sessionStorage.setItem("accessToken", response.acessToken)
      if (response.roles.at(0)?.name == 'client') {
        this.route.navigate(['user'])
      } else {
        this.route.navigate(['admin/products'])
      }
    }, error => {
      this.snackBar.open("Dados incorretos", 'Fechar', {duration: 3000})
    })
  }
}
