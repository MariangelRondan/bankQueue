import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, Client } from "../models/interfaces";


export const selectAppState = createFeatureSelector<AppState>('customers');

export const selectState = createSelector(
    selectAppState,
    (state: AppState) => state
  
)

export const selectTotalCustomers = createSelector(
    selectAppState,
    (state: AppState) => state.totalCustomers
)

export const selectWaitingCustomers = createSelector(
    selectAppState,
    (state: AppState) => state.waitingCustomers
  );
  
  export const selectWaitingAverage = createSelector(
    selectAppState,
    (state: AppState) => {
      const serviceTimes = state.serviceTime;
      if (serviceTimes.length === 0) return 0;
      const total = serviceTimes.reduce((acc, time) => acc + time, 0);
      return total / serviceTimes.length;
    }
  );
