import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Bike, Accessory } from '../../models/product.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private cartService = inject(CartService);
  cart$ = this.cartService.cart$;

  totalPrice$ = this.cart$.pipe(
    map(cart => {
      if (!cart) return 0;
      const bikesTotal = cart.bikes.reduce((sum, b) => sum + b.price, 0);
      const accTotal = cart.accessories.reduce((sum, a) => sum + a.price, 0);
      return bikesTotal + accTotal;
    })
  );

  removeBike(bike: Bike): void {
    this.cartService.removeBikeFromCart(bike.id).subscribe();
  }

  removeAccessory(acc: Accessory): void {
    this.cartService.removeAccessoryFromCart(acc.id).subscribe();
  }
}
