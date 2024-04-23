import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import VanillaTilt from "vanilla-tilt";

@Component({
  selector: 'app-poster-card',
  templateUrl: './poster-card.component.html',
  styleUrls: ['./poster-card.component.scss']
})
export class PosterCardComponent implements OnInit {
  @Input() poster: any;
  constructor(private el: ElementRef, private _dataService: DataService, private _toastr: ToastrService) { }

  ngOnInit() {
    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll(".tilt-zone"), { max: 20, speed: 300, scale: 1.05 }
    );
  }
  onAddToCart(poster: any) {
    console.log("🚀 ~ file: poster-card.component.ts:21 ~ poster:", poster);
    const payload = {
      productId: poster._id,
      quantity: 1
    }
    this._dataService.addToCart(payload).subscribe(res => {
      if (res.success) {
        this._toastr.success(res.message, 'Success!');
      } else {
        this._toastr.error(res.message, 'Error!');
      }
    });
  }
  onAddToWishlist(poster) {
    const payload = {
      productId: poster._id
    }
    this._dataService.addToWishlist(payload).subscribe(res => {
      if (res.success) {
        this._toastr.success(res.message, 'Success!');
      } else {
        this._toastr.error(res.message, 'Error!');
      }
    });
  }
}
