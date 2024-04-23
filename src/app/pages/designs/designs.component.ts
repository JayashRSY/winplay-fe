import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-designs',
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.scss']
})
export class DesignsComponent implements OnInit {
  designs = [];
  constructor(
    private _dataService: DataService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllDesigns();
  }
  getAllDesigns() {
    this._dataService.getAllDesigns().subscribe(res => {
      if (res.success) {
        this.designs = res.data;
        this._toastr.success(res.message, 'Success!');
      } else {
        this._toastr.error(res.message, 'Error!');
      }
    });
  }
}
