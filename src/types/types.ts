export type SortType = 'price' | 'time';

export type FilterType = 'all' | 'no-stops' | '1 stop' | '2 stops' | '3 stops';

export type StatusType = 'idle' | 'loading' | 'resolved' | 'rejected';


export interface ITicket {
    // Цена в рублях
    price: number
    // Код авиакомпании (iata)
    carrier: string
    // Массив перелётов.
    // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
    segments: [
        {
            // Код города (iata)
            origin: string
            // Код города (iata)
            destination: string
            // Дата и время вылета туда
            date: string
            // Массив кодов (iata) городов с пересадками
            stops: string[]
            // Общее время перелёта в минутах
            duration: number
        },
        {
            // Код города (iata)
            origin: string
            // Код города (iata)
            destination: string
            // Дата и время вылета обратно
            date: string
            // Массив кодов (iata) городов с пересадками
            stops: string[]
            // Общее время перелёта в минутах
            duration: number
        }
    ]
}

export type ISearchID = {searchId:string}

export interface ITicketsResponse{
    tickets: ITicket[] | [];
    stop: boolean;
}

export interface IFlight {
    origin: string;
    destination: string;
    date: string;
    stops: string[];
    duration: number;
}

