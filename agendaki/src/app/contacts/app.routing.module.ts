import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { InsertComponent } from './insert/insert.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactResolverGuard } from '../shared/contacts-resolver.guard';

const appRoutes: Routes = [
  {path: 'favorites', component: FavoritesComponent},
  {path: 'contact/:id', component: ContactDetailComponent},
  {path: 'new',
   component: InsertComponent,
   resolve: {
    contact: ContactResolverGuard
    }
  },
  {path: 'contact/:id/edit',
   component: InsertComponent,
   resolve: {
     contact: ContactResolverGuard
   }
  },
  { path: '', component: HomeComponent },
  { path: 'contact', redirectTo: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule {}
