import {IFlight, ITicket} from "../types/types";
export const formatFlightTime = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = Math.round((hours - hours) * 60);

    return `${hours}ч ${minutes}м`;
};

export const formatTime = (departureDate: string, duration: number) => {
    const departureTimestamp = Date.parse(departureDate);
    const durationInMs = duration * 60 * 1000;
    const arrivalTimestamp = departureTimestamp + durationInMs;

    const formatTimeToLocalString = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const departureTime = formatTimeToLocalString(departureTimestamp);
    const arrivalTime = formatTimeToLocalString(arrivalTimestamp);

    return `${departureTime} - ${arrivalTime}`;
};

export const formatPrice = (price: number) => {
    return `${price.toLocaleString('ru-RU')} Р`;
};

export const getFlightDuration = (flight: IFlight) => flight.duration;
export const getTicketFlights = (ticket: ITicket) => ticket.segments;
export const getTicketPrice = (ticket: ITicket) => ticket.price;
export const getTotalFlightDuration = (ticket: ITicket) => {
    const flights = getTicketFlights(ticket);

    return flights.reduce(
        (total, flight) => total + getFlightDuration(flight),
        0
    );
};

export const getTicketByAmountOfStops = (ticket: ITicket, stops: number) => {
    const [toFlight, fromFlight] = ticket.segments;
    const toFlightStopsLength = toFlight.stops.length;
    const fromFlightStopsLength = fromFlight.stops.length;

    if (toFlightStopsLength === stops && fromFlightStopsLength === stops) {
        return ticket;
    }
};
