import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, Client } from '../models/interfaces';
import { AsyncPipe } from '@angular/common';
import { addCustomer, getCustomers, removeCustomer } from '../store/actions';
import { selectTotalCustomers, selectWaitingAverage, selectWaitingCustomers } from '../store/selectors';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  customers$: Observable<Client[]>;
  waitingCustomers$: Observable<Client[]>;
  waitingAverage$: Observable<number>;
  customerList: Client[] = [];
  newCustomerName: string = '';
  newCustomerService: string = '';
  open: boolean = false;


  constructor(private store: Store<{ appState: AppState }>) { 
    this.customers$ = store.select(selectTotalCustomers); 
    this.waitingCustomers$ = store.select(selectWaitingCustomers);
    this.waitingAverage$ = store.select(selectWaitingAverage);
  }

  ngOnInit(): void {
console.log(this.store)
}

// getCustomers(){
//    this.store.dispatch(getCustomers())
 
//   }

  addCustomer(form: NgForm){
    console.log('form',form)
    console.log('value',form)


      const newCustomer: Client = {
        id: Date.now(),
      name: form.value.name,
    service: form.value.service
  }
this.store.dispatch(addCustomer({customer: newCustomer}));
form.reset();
this.open = false

  }

  removeCustomer(id: number){
    this.store.dispatch(removeCustomer({id}))
  }

 toggleForm(){
this.open = !this.open
 }

 calculateWaitingTime(id: any){
  const waitingTimeInMilliseconds = Date.now() - id;
  
    const waitingTimeInMinutes = waitingTimeInMilliseconds / (1000 * 60);
    
    if (waitingTimeInMinutes < 60) {
      return `${Math.floor(waitingTimeInMinutes)} min`;
    } else {
      const waitingTimeInHours = waitingTimeInMinutes / 60;
      return `${waitingTimeInHours.toFixed(1)} hs`;
    }
 }

}
