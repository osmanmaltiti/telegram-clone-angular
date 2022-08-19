import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatAreaComponent } from './components/home/chat-area/chat-area.component';
import { ChatBubbleComponent } from './components/home/chat-area/chat-bubble/chat-bubble.component';
import { ChatCardComponent } from './components/home/chat-card/chat-card.component';
import { SidebarComponent } from './components/home/sidebar/sidebar.component';
import { HighlightDirective } from './directives/home/highlight.directive';
import { ClickOutsideDirective } from './directives/shared/click-outside.directive';
import { IconsDirective } from './directives/sidebar/Icons.directive';
import { HomeComponent } from './home/home.component';
import store from './store/store';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatCardComponent,
    SidebarComponent,
    IconsDirective,
    ClickOutsideDirective,
    ChatAreaComponent,
    ChatBubbleComponent,
    HighlightDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(store),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
