import React, { useEffect } from 'react';
import SelectInput from 'ink-select-input';
import MMA from '../SportsViews/MMA/index.js';
import { useInput } from 'ink';
import { SportsCategories } from '../Data/SelectorData.js';


export default function Selector() {
    const [selectedSport, setSelectedSport] = React.useState(null);
    const [leftArrowPressed, setLeftArrowPressed] = React.useState(false);
    const handleSelect = (item) => {
        setSelectedSport(item.value)
    }

    React.useEffect(() => {
        if (leftArrowPressed) {
            setSelectedSport(null);
            setLeftArrowPressed(false);
        }
    }, [leftArrowPressed, selectedSport]);

    useInput((_, key) => {
        if (key.leftArrow) {
            setLeftArrowPressed(true)
        }
    });


    return (
        <>
            {!selectedSport ? <SelectInput items={SportsCategories} onSelect={handleSelect} /> : null}
            {selectedSport && {
                'mma': <MMA />,
            }[selectedSport]}
        </>
    );
};



