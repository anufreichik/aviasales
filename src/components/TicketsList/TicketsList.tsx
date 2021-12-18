import React from 'react';
import {ITicket} from "../../types/types";
import Ticket from "../Ticket/Ticket";
interface IProps{
    tickets:ITicket[];
}

const TicketsList:React.FC<IProps>=({tickets})=> {
    return (
        <div>
            {tickets &&
            tickets?.map((el, i)=>
               <Ticket ticket={el} key={i}/>
            )
            }
        </div>
    );
}

export default TicketsList;
