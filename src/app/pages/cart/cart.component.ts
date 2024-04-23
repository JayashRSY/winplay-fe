import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems = [];
  constructor(private _dataService: DataService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCartItems()
  }
  getCartItems() {
    this._dataService.getCart().subscribe((res: any) => {
      if (res.success) {
        this.cartItems = res.data;
        this._toastr.success(res.message, 'Success');
      } else {
        this._toastr.error(res.message, 'Error');
      }
    }, (error) => {
      this._toastr.error(error.error.message, 'Error')
    });
  }
  removeFromCart(item: any) {
    const payload = {
      productId: item.product._id,
    }
    this._dataService.removeFromCart(payload).subscribe(res => {
      if (res.success) {
        this.getCartItems()
        // this.removeFromCart(item);
        this._toastr.success(res.message, 'Success');
      } else {
        this._toastr.error(res.message, 'Error');
      }
    }, (error) => {
      this._toastr.error(error.error.message, 'Error')
    });
  }

  emptyCart() {
    this._dataService.emptyCart().subscribe(res => {
      if (res.success) {
        this.cartItems = [];
        this._toastr.success(res.message, 'Success');
      } else {
        this._toastr.error(res.message, 'Error');
      }
    })
  }
  increaseQuantity(item: any) {
    const payload = {
      productId: item.product._id,
      quantity: item.quantity + 1
    }
    this._dataService.addToCart(payload).subscribe(res => {
      if (res.success) {
        this.getCartItems()
        this._toastr.success(res.message, 'Success');
      } else {
        this._toastr.error(res.message, 'Error');
      }
    });
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      const payload = {
        productId: item.product._id,
        quantity: item.quantity - 1
      }
      this._dataService.addToCart(payload).subscribe(res => {
        if (res.success) {
          this.getCartItems()
          this._toastr.success(res.message, 'Success');
        } else {
          this._toastr.error(res.message, 'Error');
        }
      });
    } else {
      const payload = {
        productId: item.product._id,
      }
      this._dataService.removeFromCart(payload).subscribe(res => {
        if (res.success) {
          this.getCartItems()
          // this.removeFromCart(item);
          this._toastr.success(res.message, 'Success');
        } else {
          this._toastr.error(res.message, 'Error');
        }
      });
    }
  }
  buyNow() {

  }
}
