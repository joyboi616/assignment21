/* import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } */

//=== Copied File ===//

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { EditHeroComponent } from './components/edit-hero/edit-hero.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-hero' },
  { path: 'add-hero', component: AddHeroComponent },
  { path: 'edit-hero/:id', component: EditHeroComponent },
  { path: 'heroes-list', component: HeroesListComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }