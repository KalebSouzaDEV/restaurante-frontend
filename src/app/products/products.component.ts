import { Component } from '@angular/core';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DecimalCommaPipe } from '../decimal-comma.pipe';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


interface Categorie {
  id: string, 
  name: string,
  createdAt: string
}

interface product {
	id: String, 
	name: String, 
	price: number,
	categorie: String, 
	image: String
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SidebarAdminComponent, CommonModule, FormsModule, DecimalCommaPipe, MatSnackBarModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})


export class ProductsComponent {
  linkImage = "";
  allCategories: Categorie[] = [];
  allProducts: product[] = [];
  page = 'creating';
  productSelected: product = {id: '', name: '', price: 0.0, categorie: '', image: ''};
  //

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getAllCategories();
    this.getAllProducts();
  }

  changePage(page: string) {
    this.page = page;
    this.productSelected = {id: '', name: '', price: 0.0, categorie: '', image: ''}
    if (page == 'creating') {
      this.getAllCategories()
    } else {
      this.getAllProducts()
    }
  }

  selectProductToEditing(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectValue =selectElement.value;

    this.productSelected = this.allProducts.find(product => product.name === selectValue) || {id: '', name: '', price: 0.0, categorie: '', image: ''}
    
  }

  onPriceInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(',', '.');
    this.productSelected.price = parseFloat(value);
  }

  getAllCategories(){
    this.http.get<Categorie[]>("https://restaurante-backend-production.up.railway.app/categories").subscribe(response => {
      this.allCategories = response
    })
  }

  getAllProducts(){
    this.http.get<product[]>("https://restaurante-backend-production.up.railway.app/product").subscribe(response => {
      this.allProducts = response
    })
  }

  createProduct(){
    console.log(this.productSelected, 'categoria')
    this.http.post<string>("https://restaurante-backend-production.up.railway.app/product", this.productSelected, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text' as 'json'
    }).subscribe(response=> {
      this.snackBar.open(response.toString(), 'Fechar', {duration: 3000})
    })
  }

  editProduct(){
    console.log("APERTA MEU C ", this.productSelected)
    this.http.put<string>(`https://restaurante-backend-production.up.railway.app/product/${this.productSelected.id}`, this.productSelected, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text' as 'json'
    }).subscribe(response=> {
      this.snackBar.open("Produto editado com sucesso", 'Fechar', {duration: 3000})
    })
  }
}
