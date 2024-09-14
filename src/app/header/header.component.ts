import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    cartIsVisible = false;
    constructor(private cartService: CartService, private route: Router, private authService: AuthService) {

    }
    toggleCart(){
      console.log("teste?")
      this.cartService.toggleCart();
    }

    navigatePage(page: string){
      if (this.authService.isAuthenticated('admin')) {
        this.route.navigate(['admin/products'])
      } else {
        this.route.navigate([page])
      }
    }

    scrollToSection(id: string) {
      const element = document.getElementById(id);
      if (element) {  
        element.scrollIntoView({behavior: 'smooth'});
      }
    }
}
