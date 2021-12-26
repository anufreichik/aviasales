import React, {Dispatch, SetStateAction, useState} from 'react';
import './TicketTypes.css'
import {FilterType} from "../../types/types";
type Dispatcher<S> = Dispatch<SetStateAction<S>>;
interface IProps {
    setSort: Dispatcher<string>;
}
const TicketTypes:React.FC<IProps> =({setSort}) =>{
    const [sortParam, setSortParam] =useState('time');

    const changeSortType=(sortType:string)=>{
        setSort(sortType);
        setSortParam(sortType);
    }
    return (
        <div className='ticket_type_container' >
            <button className={`sort_button sort_button_left ${sortParam==='price'? 'active':''}`}
                onClick={() => changeSortType('price')}
            >
                Cheapest
            </button>
            <button className={`sort_button sort_button_right  ${sortParam==='time'? 'active':''}`}
                onClick={() => changeSortType('time')}
            >
                Fastest
            </button>
        </div>
    );
}

export default TicketTypes;
