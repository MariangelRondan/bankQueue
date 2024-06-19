import { createAction, props } from "@ngrx/store";
import { AppState,Client } from "../models/interfaces";
import { AppComponent } from "../app.component";


export const getCustomers = createAction('[Customer] getCustomers');
export const addCustomer = createAction('[Customer] Add', props<{customer: Client}>());
export const getCustomersSuccess = createAction('[Customer] Get Customers Success', props<{ parsedCustomers: { waitingCustomers: Client[], totalCustomers: Client[], serviceTime: number[] } }>());
export const removeCustomer = createAction('[Customer Remove', props<{id: number}>() )

export const updateServiceTime = createAction(
    '[Customer] UpdateTime', props<{time: number}>)

export const getServiceTime = createAction(
    '[Customer] getServiceTime'
)