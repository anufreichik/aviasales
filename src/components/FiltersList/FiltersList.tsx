import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';
import './FiltersList.css';
import {FilterType} from "../../types/types";

const checkboxes = [
    {name: 'all', label: 'All Stops'},
    {
        name: 'no-stops',
        label: 'No Stops'
    },
    {
        name: '1 stop',
        label: '1 stop'
    },
    {
        name: '2 stops',
        label: '2 stops'
    },
    {
        name: '3 stops',
        label: '3 stops'
    }
];
type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps {
    setFilters: Dispatcher<FilterType[]>;
    filters: FilterType[];
}

const FiltersList: React.FC<IProps> = ({setFilters, filters}) => {
    const [allChecked, setAllChecked] = useState(filters.length===checkboxes.length);
    const [checkedList, setCheckedList]=useState<FilterType[]>(filters);

    //on checkedList change update filters and all checked checkbox
    useEffect(() => {
        setAllChecked(checkedList.length === checkboxes.length);
       setFilters(checkedList);
    }, [checkedList]);

    //select all
    const handleSelectAll = (  e:ChangeEvent<HTMLInputElement>) => {
        const allCheckboxNames = checkboxes.map(
            (checkbox) => checkbox.name as FilterType
        );

        setCheckedList(e.target.checked ? allCheckboxNames : []);
        setAllChecked(e.target.checked);
    }
    //check checkbox handler
    const handleChange = ( e:ChangeEvent<HTMLInputElement>) => {
       const checked = e.target.checked;
       const checkedName = e.target.name as FilterType;

       if(checked)
           setCheckedList([...checkedList, checkedName]);
       else
           setCheckedList(checkedList.filter(el=>el!==checkedName))
    }

    return (
        <div className='filters_wrapper'>
            <h2 className='header'>Number stops</h2>
            <div className='option_item'>
                <input type='checkbox' className='option_check' name='all' checked={allChecked}
                       onChange={(e) => handleSelectAll(e)}/>
                <label className='option_label'>All</label>
            </div>
            {checkboxes.slice(1).map(el =>

                <div className='option_item' key={el.name}>
                    <input type='checkbox' className='option_check' name={el.name}
                           checked={checkedList.includes(el.name as FilterType)}
                           onChange={handleChange}/>
                    <label className='option_label'>{el.label}</label>
                </div>
            )}
        </div>
    );
}

export default FiltersList;
