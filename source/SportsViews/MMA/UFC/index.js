import React, { useState, useEffect } from 'react';
import { Text} from 'ink';
import Spinners from '../../../components/Spinners.js'
import MultiSelects from '../../../components/MultiSelect.js';
import UfcRankings from './UfcRankings.js';
import UfcEvents from './UfcEvents.js';


export default function UFC() {
    const [showRanks, setShowRanks] = useState(false);
    const [showEvents, setShowEvents] = useState(false);


    const handleSubmit = items => {
        items.forEach((e) => {
            if (e.value == 'events') setShowEvents(true)
            if (e.value == 'rankings') setShowRanks(true)
        })
    };

    const items = [{
        label: 'Rankings',
        value: 'rankings'
    }, {
        label: 'Events',
        value: 'events'
    }];

    return (
        <>  
         <MultiSelects items={items} onSubmit={handleSubmit} />
            {showEvents && <UfcEvents />}
            {showRanks && <UfcRankings />}
        </>
    )

}






