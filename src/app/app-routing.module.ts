import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'about', title:'', component: AboutComponent},
  {path:'contact', title:'', component: ContactComponent},
  {path: 'news' ,title:'', component: NewsComponent},
  {path:'home',title:'', component: HomeComponent},
  {path: '',title:'',   redirectTo: '/home', pathMatch: 'full' },
  {path: '**',title:'', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
