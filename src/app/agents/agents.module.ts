import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentCardComponent } from './agent-card/agent-card.component';
import { AgentDetailComponent } from './agent-detail/agent-detail.component';
import { AgentEditComponent } from './agent-edit/agent-edit.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { SharedModule } from '../shared/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PropertiesModule } from '../properties/properties.module';



@NgModule({
  declarations: [
    AgentCardComponent,
    AgentDetailComponent,
    AgentEditComponent,
    AgentListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    PropertiesModule,
    ReactiveFormsModule ,
  ],
  exports: [
    SharedModule,
  ]
})
export class AgentsModule { }
