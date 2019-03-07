import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { InsertComponent } from './insert/insert.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

const APP_ROUTES: Routes = [
  {path: 'favorites', component: FavoritesComponent},
  {path: 'contact/:id', component: ContactDetailComponent},
  {path: 'test', component: InsertComponent},
  { path: '', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
