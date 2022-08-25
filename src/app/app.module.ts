import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InMemoryCache } from '@apollo/client/core';
import { StoreModule } from '@ngrx/store';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HighlightDirective } from './directives/home/highlight.directive';
import { ScrollBottomDirective } from './directives/home/scrollToBottom.directive';
import { ClickOutsideDirective } from './directives/shared/click-outside.directive';
import { IconsDirective } from './directives/sidebar/Icons.directive';
import { ChatAreaComponent } from './features/home/chat-area/chat-area.component';
import { ChatBubbleComponent } from './features/home/chat-area/chat-bubble/chat-bubble.component';
import { ChatCardComponent } from './features/home/chat-card/chat-card.component';
import { HomeComponent } from './home/home.component';
import { DateTransformPipe } from './pipes/date.pipe';
import { SafeUrlPipe } from './pipes/image.pipe';
import Store from './store/store';

const config: SocketIoConfig = {
  url: 'http://localhost:5000',
  options: {
    transports: ['websocket'],
  },
};

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
    DateTransformPipe,
    ScrollBottomDirective,
    LoginComponent,
    SignupComponent,
    AuthComponent,
    SafeUrlPipe,
    FileUploadComponent,
  ],
  imports: [
    FormsModule,
    ApolloModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(Store),
    SocketIoModule.forRoot(config),
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
