import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TransferComponent } from './transfer/transfer.component';
import { NftsComponent } from './nfts/nfts.component';
import { GameComponent } from './game/game.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileGuard } from './guards/profile.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'transfer',
    component: TransferComponent
  },
  {
    path: 'nfts',
    component: NftsComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProfileGuard]
  },
  { path: '**', 
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
