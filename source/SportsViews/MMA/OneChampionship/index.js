import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import OneEvents from './OneEvents.js'
import OneRankings from './OneRankings.js'
import MultiSelects from '../../../components/MultiSelect.js';

export default function OneChampionship() {
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
            {showEvents && <OneEvents />}
            {showRanks && <OneRankings />}
        </>
    )
}


