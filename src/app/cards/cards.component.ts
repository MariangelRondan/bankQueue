import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Store, select } from '@ngrx/store';
import { AppState, Client } from '../models/interfaces';
import { Observable } from 'rxjs';
import { selectTotalCustomers, selectWaitingAverage, selectWaitingCustomers } from '../store/selectors';
import { getCustomers } from '../store/actions';

interface Card {
  title: string;
  number: number;
  img: string;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {

todayCustomers = 0;
totalPending=0;
averageTime=0;
totalCustomers$: Observable<Client[]>;
  waitingCustomers$: Observable<Client[]>;
  waitingAverage$: Observable<number>;
cards: Card[] = []
  


  constructor( private store: Store<{customers: AppState}>){
    this.totalCustomers$ = this.store.pipe(select(selectTotalCustomers));
    this.waitingCustomers$ = this.store.pipe(select(selectWaitingCustomers));
    this.waitingAverage$ = this.store.pipe(select(selectWaitingAverage));
    }
    
//     ngOnInit(): void {
//       this.loadCustomers()
// this.waitingAverage$.subscribe(value => {console.log('average' , value)  }) //el console.log da 0
// this.totalCustomers$.subscribe(value => console.log(value)) //console.log da []
// this.waitingCustomers$.subscribe(value => this.totalPending = value.length)

//      this.cards = [{title: 'Today Customers', number: this.todayCustomers, img:"../../assets/play.png"}, 
//       {title: 'Total pending', number: this.averageTime, img:"../../assets/play.png"},
//       {title:'Average time per customer', number: this.totalPending, img:"../../assets/play.png"}]
      
//       }

// loadCustomers(){
//   this.store.dispatch(getCustomers())
// }
ngOnInit(): void {
  this.loadCustomers();
  
  this.totalCustomers$.subscribe(clients => {
    console.log('Total Customers:', clients);
    this.todayCustomers = clients.length;
    this.updateCards();
  });

  this.waitingCustomers$.subscribe(clients => {
    console.log('Waiting Customers:', clients);
    this.totalPending = clients.length;
    this.updateCards();
  });

  this.waitingAverage$.subscribe(average => {
    console.log('Waiting Average:', average);
    this.averageTime = average;
    this.updateCards();
  });
}

loadCustomers() {
  this.store.dispatch(getCustomers());
}

updateCards() {
  this.cards = [
    { title: 'Today Customers', number: this.todayCustomers, img: "../../assets/play.png" },
    { title: 'Total pending', number: this.totalPending, img: "../../assets/play.png" },
    { title: 'Average time per customer (min)', number: this.averageTime, img: "../../assets/play.png" }
  ];
}
}


 //por cada nombre, una carta. 
 //total costumers, me traigo el store, y va a ser 



