import React from 'react';
import SelectInput from 'ink-select-input';
import UFC from './UFC/index.js';
import Bellator from './Bellator/index.js';
import OneChampionship from './OneChampionship/index.js';
import { useInput } from 'ink';
import { MMAOrgs } from '../../Data/SelectorData.js';

export default function MmaSelector() {
    const [selectedOrg, setSelectedOrg] = React.useState(null);
    const handleSelect = item => { setSelectedOrg(item.value) };

    useInput((_, key) => {
        if (key.leftArrow) {
            setSelectedOrg(null);

        }
    });
    return (
        <>
            {!selectedOrg && <SelectInput items={MMAOrgs} onSelect={handleSelect} />}
            {selectedOrg && {
                'ufc': <UFC />,
                'bellator': <Bellator />,
                'one-championship': <OneChampionship />
            }[selectedOrg]}

        </>
    );

};




