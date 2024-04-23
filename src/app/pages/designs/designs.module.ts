import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudinaryModule } from '@cloudinary/ng';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { DesignsRoutingModule } from './designs-routing.module';
import { DesignsComponent } from './designs.component';
import { CreateComponent } from './create/create.component';
import { CustomMaterialModule } from '../../shared/custom-material/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DesignsComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    DesignsRoutingModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CloudinaryModule,
    NgxDropzoneModule
  ]
})
export class DesignsModule { }
