import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.scss']
})
export class PostersComponent implements OnInit {
  posters = [];
  constructor(private _dataService: DataService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this._dataService.getAllDesigns().subscribe(res => {
      if (res.success) {
        this.posters = res.data;
        this._toastr.success(res.message, 'Success!');
      } else {
        this._toastr.error(res.message, 'Error!');
      }
    });
  }
}
