import React, { Children, useEffect, useContext, useState } from 'react';
import SelectInput from 'ink-select-input';
import MMA from '../SportsViews/MMA/index.js';
import { useInput, render, Box, Text } from 'ink';
import { SportsCategories } from '../Data/SelectorData.js';
import UFC from '../SportsViews/MMA/UFC/index.js';
import Bellator from '../SportsViews/MMA/Bellator/index.js';
import OneChampionship from '../SportsViews/MMA/OneChampionship/index.js';
import Boxing from '../SportsViews/Boxing/index.js';
import Football from '../SportsViews/Football/index.js';
import Formula1 from '../SportsViews/Formula1/index.js';
import NBA from '../SportsViews/NBA/index.js';
import Tennis from '../SportsViews/Tennis/index.js';


export default function Selector() {
    const [selectedSport, setSelectedSport] = React.useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);


    const handleSelect = (item) => {
        if (!selectedSport) {
            setSelectedSport(item.value);
        } else if (!selectedCategory) {
            if(selectedCategory != 'Boxing' || setSelectedCategory != 'Football') return;
            setSelectedCategory(item.value);
        }
    };

    const handleBack = () => {
        if (selectedCategory) {
            setSelectedCategory(null);
        } else if (selectedSport) {
            setSelectedSport(null);
        }
    };

    useInput((input, key) => {
        if (key.leftArrow) {
            handleBack();
        }
    })

    const renderOptions = () => {
        if (!selectedSport) {
            return SportsCategories.sports.map((sport) => ({
                label: sport.name,
                value: sport.name
            }));
        } else if (!selectedCategory) {
            const selectedSportData = SportsCategories.sports.find(
                (sport) => sport.name === selectedSport
            );
            if (selectedSportData) {
                const subcategories = selectedSportData.subcategories.map((subcategory) => ({
                    label: subcategory.name,
                    value: subcategory.name
                }));

                return [...subcategories];
            }
        }
        return [];
    };
    return (
        <>
            <Box flexDirection="column" marginTop={1} marginLeft={2}>
                <SelectInput items={renderOptions()} onSelect={handleSelect} />
                {selectedSport =='Boxing'?<Boxing/>:null}
                {selectedSport =='Football'?<Football/>:null}
                {selectedSport =='Formula-1'?<Formula1/>:null}
                {selectedSport =='Tennis'?<Tennis/>:null}
                {selectedSport =='NBA'?<NBA/>:null}
                {selectedSport && selectedCategory && (
                    <Box flexDirection="column">
                        <Text>This is SelectedSport{selectedSport || null} </Text>
                        <Text>This is SelectedSport{selectedCategory || null} </Text>
                        {selectedCategory && {
                            'UFC': <UFC />,
                            'Bellator': <Bellator />,
                            'One-Championships': <OneChampionship />,
                        }[selectedCategory]}
                    </Box>
                )}
            </Box>
        </>
    );
};



