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
  { path: '', pathMatch: 'full', redirectTo: 'add-student' },
  { path: 'add-student', component: AddHeroComponent },
  { path: 'edit-student/:id', component: EditHeroComponent },
  { path: 'students-list', component: HeroesListComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }