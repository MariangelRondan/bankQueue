import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addCustomer, getCustomers, getCustomersSuccess, removeCustomer, updateServiceTime } from "./actions";
import { map, tap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectState, selectTotalCustomers } from "./selectors";
import { AppState, Client } from "../models/interfaces";


@Injectable()
export class CustomerEffects {
 

    saveCustomers$ = createEffect(() => this.actions$.pipe(
        ofType(addCustomer), //you can pass multiple actions inside ofType
        withLatestFrom(this.store.select(selectState)),
        tap(([action, customers]) => {
            console.log(action);
            localStorage.setItem('customers', JSON.stringify(customers))

        })
    ), {dispatch: false} //this is to specify that this effect does not dispatch an action once its done
 );

  removeCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(removeCustomer, updateServiceTime),
    withLatestFrom(this.store.select(selectState)),
    tap(([action, customers]) => {
      localStorage.setItem('customers', JSON.stringify(customers))

    })
  ), {dispatch: false});

  loadCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(getCustomers),
    tap(() => {
      const customers = localStorage.getItem('customers');
      if (customers) {
      const parsedCustomers = JSON.parse(customers);
      if (parsedCustomers) {
        this.store.dispatch(getCustomersSuccess({ parsedCustomers }));
      } else {
        console.error('Failed to parse customers:', customers);
      }
    }
    })
  ), { dispatch: false });


    constructor(private actions$: Actions, private store: Store<AppState>){
      console.log('store', this.store)
    }
}

