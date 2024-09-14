import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar-client.component.html',
  styleUrl: './sidebar-client.component.css'
})
export class SidebarClientComponent {
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
