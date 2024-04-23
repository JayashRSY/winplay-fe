import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    CustomMaterialModule,
    ToastrModule.forRoot({ timeOut: 1500 }),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
