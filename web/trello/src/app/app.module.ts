import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from "./header/header.component";
import { RegisterComponent } from './register/register.component';
import { BoardComponent } from './board/board.component';
import { RouterModule, Routes } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AuthGuardService } from "./services/auth-guard.service"
import { CardComponent} from "./card/card.component";
import { ProjectComponent } from './project/project.component';
import { NewProjectComponent } from './new-project/new-project.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'new-projet', component: NewProjectComponent},
  {path: 'card/:id/:title', component: CardComponent},
  {path: 'board', canActivate: [AuthGuardService], component: BoardComponent},
  {path: '', redirectTo: 'board', pathMatch: 'full'},
  {path: '**', redirectTo: 'board'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BoardComponent,
    HeaderComponent,
    CardComponent,
    ProjectComponent,
    NewProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
