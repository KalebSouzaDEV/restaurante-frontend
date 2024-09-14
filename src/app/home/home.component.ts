import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartComponent } from "../cart/cart.component";
import { CartService } from '../cart.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

interface categorie {
	name: string, 
	id: string, 
	createdAt: string
}

interface product {
	id: string, 
	name: string, 
	price: number,
	categorie: string, 
	image: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, CartComponent, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
	categories: categorie[] = [];
	produtos: product[] = [];
	cartIsVisible = false;
	categorieSelected = 'TODOS'

	constructor(private http: HttpClient, public cartService: CartService) {
		this.getAllCategories();
		this.cartIsVisible = this.verifyCartVibility();
	}

	getAllCategories(){
		this.http.get<categorie[]>("https://restaurante-backend-production.up.railway.app/categories").subscribe((response => {
			this.categories = response
			this.getAllProducts()
		}))
	}

	getProductsByCategorie(categorieName: string){
		this.http.get<product[]>(`https://restaurante-backend-production.up.railway.app/product/categorie/${categorieName}`).subscribe((response => {
			this.produtos = response
			console.log("TOMAR NO CUU RES", this.categories)
		}))
	}

	getAllProducts(){
		this.http.get<product[]>("https://restaurante-backend-production.up.railway.app/product").subscribe((response => {
			this.produtos = response
		}))
	}		

	toggleCart(){
		this.cartService.toggleCart();
	}

	verifyCartVibility(){
		return this.cartService.cartIsActive()
	}

	addProductToCart(produto: product){
		this.cartService.addItemToCart(produto.name, 1, produto.image, produto.price)
	}

	selectNewCategorie(categorie: categorie){
		this.categorieSelected = categorie.name
		if (categorie.name.toLowerCase() == 'todos') {
			this.getAllProducts()
		} else { 
			this.getProductsByCategorie(categorie.name)
		}
	}
	
}
