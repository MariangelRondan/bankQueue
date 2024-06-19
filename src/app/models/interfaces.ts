export interface AppState {
    waitingCustomers: Client[],
    totalCustomers: Client[],
    serviceTime: number[]
}


export interface Client {
    id: number,
    name: string,
    service: string,

}