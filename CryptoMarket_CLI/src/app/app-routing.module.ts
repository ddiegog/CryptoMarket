import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TransferComponent } from './transfer/transfer.component';
import { NftsComponent } from './nfts/nfts.component';
import { GameComponent } from './game/game.component';

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
  { path: '**', 
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
