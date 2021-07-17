import { Component, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/authentication/account.service';
import { AgentsService } from 'src/app/services/agents.service';
import { Agent } from 'src/app/_models/Agent';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.css']
})
export class AgentEditComponent implements OnInit, SimpleChange{

  agent: Agent;
  user: User;
  @ViewChild('EditForm') editForm: NgForm;
  @ViewChild('EditFormTwo') editFormTwo: NgForm;
  @ViewChild('EditFormThree') editFormThree: NgForm;

  isChanged: boolean = false;

  constructor(
    private accountService: AccountService, 
    private agentService: AgentsService,
    private router: Router,
    private toastr: ToastrService) { 

    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
    
  }
  previousValue: any;
  currentValue: any;
  firstChange: boolean;
  isFirstChange(): boolean {
    this.agent === null ? console.log('is still undefined') : console.log(this.agent); 
    return true;
  }

  ngOnInit(): void {
    this.loadAgent();
     
  }

  ngOnChanges(){
    this.agent === null ? console.log('is still undefined') : console.log(this.agent); 
  }


  /***************************************** */
  
  loadAgent(){
    this.agentService.getAgent(this.user.userName).subscribe(agent => {
      this.agent = agent;
    });
  }

  udateAgent(){

    console.log('entering the method updateAgent');

    this.agentService.updateAgent(this.agent).subscribe(() => {

        this.toastr.success('Perfil Actualizado Exitosamente.');
        this.editForm.reset(this.agent);
        this.editFormTwo.reset(this.agent);
        this.editFormThree.reset(this.agent);
      
    });

    // console.log('is form1 dirty? response: '+  this.editForm.dirty);
    // console.log('is form2 dirty? response: '+  this.editFormTwo.dirty);
    // console.log('is form3 dirty? response: '+  this.editFormThree.dirty);
  }

  uploadProperty(){
    this.router.navigateByUrl('upload-property/'+this.agent.id);
  }


}
