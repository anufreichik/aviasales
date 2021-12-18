import React, {useEffect, useState} from 'react';
import './Aviasales.css';
import TicketsList from "../TicketsList/TicketsList";
import FiltersList from "../FiltersList/FiltersList";
import useApi from "../../utils/useApi";
import TicketTypes from "../TicketTypes/TicketTypes";
import {FilterType, ITicket, ITicketsResponse} from "../../types/types";
import {getTicketByAmountOfStops} from "../../utils/utils";

interface IProps {
    searchID: string;
}

const Aviasales: React.FC<IProps> = ({searchID}) => {

    const [results, loading, isError, refresh] = useApi<ITicketsResponse>(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchID}`);
    const [stopStatus, setStopStatus] = useState(results?.stop);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [displayTickets, setDisplayTickets] = useState<ITicket[]>([]);
    const [filteredTickets, setFilteredTickets] = useState<ITicket[]>([]);
    const [endSearch, setEndSearch] = useState(false);
    const [filters, setFilters] = useState<FilterType[]>(
        ['all',
            'no-stops',
            '1 stop',
            '2 stops',
            '3 stops'])
    const PAGE_SIZE = 5;


// on results change use effect
    useEffect(() => {
       // console.log('use effect', results, isError, stopStatus, startIndex);

        if (results?.tickets) {
            let filtered =  applyFilters(results?.tickets);
            setFilteredTickets(filtered);
            setDisplayTickets(filtered.slice(startIndex, startIndex + PAGE_SIZE));
            setStartIndex(0);
        }
        else{
            refresh();
        }

    }, [results]);

    //pagination use effect
    useEffect(() => {
        if (filteredTickets.length > startIndex)
            setDisplayTickets(filteredTickets.slice(startIndex, startIndex + PAGE_SIZE));
        // else {
        //     if (results && !stopStatus) {
        //         refresh();
        //         setStopStatus(results?.stop);
        //     } else {
        //         if (stopStatus !== undefined && stopStatus) setEndSearch(true);
        //     }
        // }
    }, [startIndex]);

 //filters change use effect
    useEffect(() => {
       // const filtered: ITicket[] = results && results.tickets.length ? results?.tickets.filter(handleFilter) : [];
        if (results?.tickets) {
            let filtered =  applyFilters(results?.tickets);
            setFilteredTickets(filtered);
            setStartIndex(0);
            setDisplayTickets(filtered.slice(startIndex, startIndex + PAGE_SIZE));

        }

    }, [filters])

    const paginate = () => {
        setStartIndex(prev => prev + PAGE_SIZE + 1);
    }

    const handleFilter = (ticket: ITicket) => {
        const stops = filters.filter(item=>item!=='all').map(el=>{
            switch (el){
                case "no-stops": return 0;
                case "1 stop" : return 1;
                case "2 stops": return 2;
                case "3 stops": return 3;
            }
        });
        let isValidTicketForFilter = false;
        stops.forEach(el=>{
            if( getTicketByAmountOfStops(ticket, el as number) ) {
                isValidTicketForFilter = true;
               if(isValidTicketForFilter)
                   return true;
            }
        })

        return isValidTicketForFilter;
    }

    const applyFilters = (tickets: ITicket[]) => {
        return tickets.filter(handleFilter);
    }

    if (loading) return (<h2>Loading...</h2>);

    return (
        <div className='grid-container'>
            <div className='logo-panel'>Logo Section</div>
            <div className='left-panel'>
                <FiltersList setFilters={setFilters} filters={filters}/>
            </div>
            <div className='right-panel'>
                <TicketTypes/>
                {endSearch && <h2>No More Tickets</h2>}
                <TicketsList tickets={displayTickets}/>
                <button onClick={paginate} className='btn_show_more'>Show {PAGE_SIZE} more tickets!</button>

            </div>
        </div>
    );
}

export default Aviasales;
