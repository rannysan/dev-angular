import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatCheckboxModule
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HomeComponent } from './contacts/home/home.component';
// import { routing } from './app.routing';
import { FavoritesComponent } from './contacts/favorites/favorites.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './contacts/card/card.component';
import {NgxMaskModule} from 'ngx-mask';
import { AppRoutingModule } from './contacts/app.routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { MyDialogComponent } from './contacts/shared/my-dialog/my-dialog.component';
import { InsertComponent } from './contacts/insert/insert.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    FavoritesComponent,
    CardComponent,
    InsertComponent,
    ContactDetailComponent,
    MyDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    AppRoutingModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    NgxMaskModule.forRoot(),
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  entryComponents: [
    MyDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
