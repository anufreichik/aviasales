import React, {Dispatch, SetStateAction, useState} from 'react';
import './TicketTypes.css'
import {FilterType} from "../../types/types";
type Dispatcher<S> = Dispatch<SetStateAction<S>>;
interface IProps {
    setSort: Dispatcher<string>;
}
const TicketTypes:React.FC<IProps> =({setSort}) =>{
    const [sortParam, setSortParam] =useState('time');

    const handleSort=(sortType:string)=>{
        setSort(sortType);
    }
    return (
        <div className='ticket_type_container' >
            <button className='sort_button sort_button_left'
                onClick={() => handleSort('price')}

                //active={sortParam === 'price'}
            >
                Cheapest
            </button>
            <button className='sort_button sort_button_right'
                onClick={() => handleSort('time')}
                //active={sortParam === 'time'}
            >
                Fastest
            </button>
        </div>
    );
}

export default TicketTypes;
