import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebarAdminComponent {
  @Input() activePage: string = '';

  constructor(private route: Router){
    
  }

  isActive(page: string){
    return this.activePage == page;
  }

  navigateToPage(page: string){
    this.route.navigate([page])
  }

  
}
