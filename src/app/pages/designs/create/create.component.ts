import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/app/services/upload.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  form!: FormGroup;
  files: File[] = [];

  constructor(
    private fb: FormBuilder,
    private _dataService: DataService,
    private _uploadService: UploadService,
    private _toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      designURLs: [[], Validators.required],
      description: [''],
      theme: [''],
      medium: [''],
      genre: [''],
      period: [''],
      brand: [''],
      color: [''],
      artist: [''],
      tags: [''],
    });
  }
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  uploadFiles() {
    // if (!this.files.length) {
    //   this._toastr.warning('No files to upload', 'Warning!');
    //   return;
    // }
    // let uploadedUrls = []
    // for (let file of this.files) {
    //   const fileData = file;
    //   const dataFiles = new FormData();
    //   dataFiles.append('file', fileData);
    //   dataFiles.append('upload_preset', 'displate');
    //   dataFiles.append('cloud_name', environment.cld_name);
    //   this._uploadService.uploadImages(dataFiles).subscribe(res => {
    //     uploadedUrls.push(res.secure_url);
    //     this.form.patchValue({ designURLs: uploadedUrls });
    //   });
    // }
  }
  onSubmit() {
    if (this.form.invalid) {
      this._toastr.warning('Invalid Data', 'Warning!');
      return;
    }

    this._dataService.createDesigns(this.form.value).subscribe(res => {
      if (res.success) {
        this._toastr.success(res.message, 'Success!');
        this.form.reset();
        this.files = [];
      } else {
        this._toastr.error(res.message, 'Error!');
      }
    })
  }
}
