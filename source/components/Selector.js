import React, { Children, useEffect, useContext, useState } from 'react';
import SelectInput from 'ink-select-input';
import MMA from '../SportsViews/MMA/index.js';
import { useInput, render, Box, Text } from 'ink';
import { SportsCategories } from '../Data/SelectorData.js';
import UFC from '../SportsViews/MMA/UFC/index.js';

export default function Selector() {
    const [selectedSport, setSelectedSport] = React.useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);


    const handleSelect = (item) => {
        if (!selectedSport) {
            setSelectedSport(item.value);
        } else if (!selectedCategory) {
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
                {selectedSport && selectedCategory && (
                    <Box flexDirection="column">
                        <UFC />
                    </Box>
                )}
            </Box>
        </>
    );
};



