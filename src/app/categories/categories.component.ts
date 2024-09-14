import { Component } from '@angular/core';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface categorie {
  id: string,
  name: string,
  createdAt: string
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SidebarAdminComponent, CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})

export class CategoriesComponent {
  page = 'creating';
  nameCategorie = '';
  categories: categorie[] = [];
  categorieSelected = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getAllCategories();
  }

  changePage(page: string) {
    this.page = page;
    if (page == 'editing') {
      this.getAllCategories();
    }
  }

  createCategorie() {
    if (this.nameCategorie.length > 0) {
      this.http.post("https://restaurante-backend-production.up.railway.app/categories", {name: this.nameCategorie}, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).subscribe(response => {
        this.snackBar.open("Categoria criada com sucesso", 'Fechar', {duration: 3000})
      })
    } else {
      this.snackBar.open("Digite pelo menos uma letra", 'Fechar', {duration: 3000})

    }
  }

  editCategorie(){
    if (this.categorieSelected) {
      if (this.nameCategorie.length > 0) {
        this.http.put(`https://restaurante-backend-production.up.railway.app/categories/${this.categorieSelected}`, {name: this.nameCategorie}).subscribe(response => {
          this.snackBar.open("Modificado com sucesso", 'Fechar', {duration: 3000})
          this.getAllCategories();
        })
      } else {
        this.snackBar.open("Digite pelo menos uma letra", 'Fechar', {duration: 3000})
      }
    } else { 
      this.snackBar.open("Escolha uma categoria para editar", 'Fechar', {duration: 3000})
    }
  }

  deleteCategorie(){
    if (this.categorieSelected) {
      this.http.delete(`https://restaurante-backend-production.up.railway.app/categories/${this.categorieSelected}`, { responseType: 'text' }).subscribe(response => {
        console.log("cuu")
        this.categories = [];
        this.getAllCategories();
        this.snackBar.open("Deletado com sucesso", 'Fechar', {duration: 3000})
      })
    } else {
      this.snackBar.open("Escolha uma categoria para deletar", 'Fechar', {duration: 3000})
    }
  }

  getAllCategories() {
    this.http.get<categorie[]>("https://restaurante-backend-production.up.railway.app/categories").subscribe(response=> {
      this.categories = response
    })
  }
}
