import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AgentEditComponent } from '../agents/agent-edit/agent-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate( component: AgentEditComponent): boolean  {

    if(component.editForm.dirty){
      return confirm('Seguro que quieres continuar? todos los cambios sin actualizar se perderan.')
    }
    
    return true;
  }
  
}
