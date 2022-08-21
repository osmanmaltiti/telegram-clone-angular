import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InMemoryCache } from '@apollo/client/core';
import { StoreModule } from '@ngrx/store';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

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
import Store from './store/store';

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
    StoreModule.forRoot(Store),
    FormsModule,
    ApolloModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      deps: [HttpLink],
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:5000/graphql',
          }),
        };
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
