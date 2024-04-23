import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { UsersComponent } from './pages/users/users.component';
import { CustomMaterialModule } from './shared/custom-material/custom-material.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import { PostersComponent } from './pages/posters/posters.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { AboutComponent } from './pages/about/about.component';
import { CommunityComponent } from './pages/community/community.component';
import { EventsComponent } from './pages/events/events.component';
import { PosterCardComponent } from './components/poster-card/poster-card.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlayComponent } from './pages/play/play.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { ReferComponent } from './components/refer/refer.component';
import { Clipboard } from '@angular/cdk/clipboard'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './pages/admin/admin.component';
import { ChatComponent } from './pages/chat/chat.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { environment } from 'src/environments/environment';
import { WithdrawComponent } from './components/withdraw/withdraw.component';

const socketIoConfig: SocketIoConfig = {
  url: environment.apiUrl.replace("/api", ""),
  options: {}
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    UserCardComponent,
    PostersComponent,
    CollectionsComponent,
    BrandsComponent,
    AboutComponent,
    CommunityComponent,
    EventsComponent,
    PosterCardComponent,
    CartComponent,
    WishlistComponent,
    PlayComponent,
    DialogComponent,
    WalletComponent,
    TransactionComponent,
    ProfileComponent,
    RechargeComponent,
    ReferComponent,
    AdminComponent,
    ChatComponent,
    UserListComponent,
    RequestListComponent,
    TransactionListComponent,
    WithdrawComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    ToastrModule.forRoot({ timeOut: 1500 }),
    NgxSpinnerModule,
    FlexLayoutModule,
    SocketIoModule.forRoot(socketIoConfig)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
