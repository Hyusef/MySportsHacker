import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import { EasternRankingsTable,WesternRankingsTable } from './NbaRankings.js';


export default function NBA() {

    return (
        <>
            <Text>NBA</Text>
            <Box>
                <EasternRankingsTable />
                <WesternRankingsTable />
            </Box>
        </>
    )
}



