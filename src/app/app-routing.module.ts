import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { InfoComponent } from './info/info.component';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  { path: '', component: InfoComponent },
  { path: 'lista', component: ListaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
