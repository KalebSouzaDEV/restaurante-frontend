import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface cartItem {
  name: string, 
  quantity: number, 
  img: string, 
  price: number
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(public cartService: CartService, private http: HttpClient, private authService: AuthService, private route: Router, private snackBar: MatSnackBar) {
    
  }

  createNewOrder(){
    if (this.authService.isAuthenticated('client')) {
      this.http.post("https://restaurante-backend-production.up.railway.app/order ", {valueOrder: this.cartService.valueCartTotal, method: "PIX", client: this.authService.getNameToken()}, {responseType: "text"}).subscribe(response => {
        this.cartService.clearCart()
      })
      this.snackBar.open("Compra efetuada com sucesso!", 'Fechar', {duration: 6000})
    } else {
      this.route.navigate(['login'])
    }
  }
}
