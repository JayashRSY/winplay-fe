import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { PostersComponent } from './pages/posters/posters.component';
import { EventsComponent } from './pages/events/events.component';
import { CommunityComponent } from './pages/community/community.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { ArtistGuard } from './guards/artist.guard';
import { AuthGuard } from './guards/auth.guard';
import { PlayComponent } from './pages/play/play.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { ReferComponent } from './components/refer/refer.component';
import { ChatComponent } from './pages/chat/chat.component';
import { AdminComponent } from './pages/admin/admin.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  }, ,
  {
    path: 'play',
    component: PlayComponent,
    canActivate: [UserGuard]

  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'wallet',
    component: WalletComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'transactions',
    component: TransactionComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'recharge',
    component: RechargeComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'withdraw',
    component: WithdrawComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'refer',
    component: ReferComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
