import { createReducer, on } from "@ngrx/store";
import {  AppState, Client } from "../models/interfaces";
import { addCustomer, getCustomers, getCustomersSuccess, removeCustomer } from "./actions";

export const initialState: AppState = {
    waitingCustomers: [],
    totalCustomers: [],
    serviceTime: []
};


//si quiero tener un total clients of the day tengo que tener un store para todos los clients, un store para los pendings,
//un store para los finished. 
//el calculo para el average time per client => cada vez que ejecuto removeclient, tengo que restar date.now - client.id
//el resultado de esa resta, los guardo tambien en el store, como un array de numeros.
//el valor de average time mostrado en la card va a ser el promedio de ese array
//al final del dia, tiene que haber un boton para resetear la store y que comience el dia sin clientes.


export const customerReducer = createReducer(
    initialState,
    on(addCustomer, (state, {customer}) => ({
        ...state, 
        waitingCustomers: [...state.waitingCustomers, customer],
        totalCustomers: [...state.totalCustomers, customer],
        serviceTime: [...state.serviceTime] 
       
    })),

    on(removeCustomer, (state, { id }) => {
        const removedCustomer = state.waitingCustomers.find(customer => customer.id === id);
        let updatedServiceTime = state.serviceTime
        if(removedCustomer && removedCustomer.id){
            const restaMilis = Date.now() - removedCustomer.id;
            const waitingInMinutes = restaMilis /( 1000 * 60)
        console.log('min', Math.floor(waitingInMinutes))

                updatedServiceTime = [...state.serviceTime, Math.floor(waitingInMinutes)];
            

            }
        
            return {
              ...state,
              waitingCustomers: state.waitingCustomers.filter(customer => customer.id !== id),
              serviceTime: updatedServiceTime
            };
      }),
      on(getCustomersSuccess, (state, { parsedCustomers  }) => ({
        ...state,
    waitingCustomers: parsedCustomers.waitingCustomers,
    totalCustomers: parsedCustomers.totalCustomers,
    serviceTime: parsedCustomers.serviceTime
      }))
    
     
  




);