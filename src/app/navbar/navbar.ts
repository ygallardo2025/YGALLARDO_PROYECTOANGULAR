import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutePath } from '../shared/route-path';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  RoutePath = RoutePath;
}
