import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, AsyncPipe, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private cartService = inject(CartService);
  
  cartCount$ = this.cartService.cart$.pipe(
    map(cart => (cart?.bikes?.length || 0) + (cart?.accessories?.length || 0))
  );
}
