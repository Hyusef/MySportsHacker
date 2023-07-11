import React, { useState } from 'react';
import { Text } from 'ink';
import MultiSelects from '../../../components/MultiSelect.js';
import BellatorEvents from './BellatorEvents.js';
import BellatorRankings from './BellatorRankings.js';

export default function Bellator() {
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
            {showEvents && <BellatorEvents />}
            {showRanks && <BellatorRankings />}
        </>
    )
}








