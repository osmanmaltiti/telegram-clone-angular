import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatCardComponent } from './components/home/chat-card/chat-card.component';
import { SidebarComponent } from './components/home/sidebar/sidebar.component';
import { ClickOutsideDirective } from './directives/shared/click-outside.directive';
import { IconsDirective } from './directives/sidebar/Icons.directive';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatCardComponent,
    SidebarComponent,
    IconsDirective,
    ClickOutsideDirective,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
