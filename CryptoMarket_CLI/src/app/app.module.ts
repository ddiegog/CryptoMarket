import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClient, HttpHandler, HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { GameComponent } from './game/game.component';
import { NftsComponent } from './nfts/nfts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from './profile/profile.component';
import { LoaderComponent } from './loader/loader.component';
import { JwtInterceptor } from './jwt.interceptor';
import { TransferComponent } from './transfer/transfer.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    HomeComponent,
    FooterComponent,
    GameComponent,
    NftsComponent,
    ProfileComponent,
    LoaderComponent,
    TransferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
