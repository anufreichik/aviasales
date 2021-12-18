import React from 'react';
import {ITicket} from "../../types/types";
import './Ticket.css';
import {formatFlightTime, formatTime, getTicketFlights, getTicketPrice} from "../../utils/utils";
interface IProps{
    ticket:ITicket;
}
const Ticket:React.FC<IProps>=({ticket})=>{
    const price = getTicketPrice(ticket);
    const [toFlight, fromFlight] = getTicketFlights(ticket);

    return (
        <div className='ticket_wrapper'>
           <div className='ticket_right_column'>
               <p className='price'>{price}</p>
                <div className='ticket_info_wrapper'>
                    <p className='ticket_subtitle'>
                        {toFlight.origin} - {toFlight.destination}
                    </p>
                    <p className='ticket_info'>
                        {formatTime(toFlight.date, toFlight.duration)}
                    </p>
                </div>
               <div className='ticket_info_wrapper'>
                   <p className='ticket_subtitle'>
                       {fromFlight.origin} - {fromFlight.destination}
                   </p>
                   <p className='ticket_info'>
                       {formatTime(fromFlight.date, fromFlight.duration)}
                   </p>
               </div>
           </div>
           <div className='ticket_middle_column'>
               <div className='ticket_info_wrapper'>
                   <p className='ticket_subtitle'>
                       In Route
                   </p>
                   <p className='ticket_info'>
                       {formatFlightTime(toFlight.duration)}
                   </p>
               </div>
               <div className='ticket_info_wrapper'>
                   <p className='ticket_subtitle'>
                       In Route
                   </p>
                   <p className='ticket_info'>
                       {formatFlightTime(fromFlight.duration)}
                   </p>
               </div>
           </div>
           <div className='ticket_right_column'>
               <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`}  className='carrier_logo'/>
               <div className='ticket_info_wrapper'>
                   <p className='ticket_subtitle'>
                       {`${fromFlight.stops.length} stops`}
                   </p>
                   <p className='ticket_info'>
                       {fromFlight.stops.join(', ')}
                   </p>
               </div>
               <div className='ticket_info_wrapper'>
                   <p className='ticket_subtitle'>
                       {`${toFlight.stops.length} stops`}
                   </p>
                   <p className='ticket_info'>
                       {toFlight.stops.join(', ')}
                   </p>
               </div>
           </div>
        </div>
    );
}

export default Ticket;
