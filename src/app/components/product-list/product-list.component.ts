import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Bike, Accessory } from '../../models/product.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  bikes: Bike[] = [];
  accessories: Accessory[] = [];
  loading = true;
  filter: 'all' | 'bikes' | 'accessories' = 'all';

  ngOnInit(): void {
    forkJoin({
      bikes: this.productService.getBikes(),
      accessories: this.productService.getAccessories()
    }).subscribe({
      next: (res) => {
        this.bikes = res.bikes;
        this.accessories = res.accessories;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.loading = false;
      }
    });
  }

  addBikeToCart(bike: Bike): void {
    this.cartService.addBikeToCart(bike.id).subscribe();
  }

  addAccessoryToCart(acc: Accessory): void {
    this.cartService.addAccessoryToCart(acc.id).subscribe();
  }
}
