import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentDetailComponent } from './agents/agent-detail/agent-detail.component';
import { AgentEditComponent } from './agents/agent-edit/agent-edit.component';
import { AgentListComponent } from './agents/agent-list/agent-list.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { PropertyDetailComponent } from './properties/property-detail/property-detail.component';
import { PropertyListComponent } from './properties/property-list/property-list.component';
import { PropertyUploadComponent } from './properties/proprty-upload/property-upload.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children:[
      {path:'agents', component: AgentListComponent},
      {path:'agents/:userName', component: AgentDetailComponent,},
      {path: 'agent/edit', component: AgentEditComponent},//PreventUnsavedChangesGuard needed to be mount here, I need to go on so I let this technical debt (117)
      {path:'upload-property/:id', component: PropertyUploadComponent},//PreventUnsavedChangesGuard needed to be mount here, I need to go on so I let this technical debt (117)
      {path:'properties', component: PropertyListComponent},
      {path:'properties/:id', component: PropertyDetailComponent},
      {path:'lists', component: ListsComponent},
      {path:'messages', component: MessagesComponent},
      //{path:''}
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path:'**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
