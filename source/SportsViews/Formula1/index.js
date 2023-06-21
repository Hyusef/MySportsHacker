import React, { useState, useEffect } from 'react';
import { Text, Box, render, Newline } from 'ink';
import * as cheerio from 'cheerio';
import axios from 'axios';
import Spinner from 'ink-spinner';
import { Table } from '@alcalzone/ink-table'
const Spinners = () => {
    return (
        <>
            <Text>
                <Text color="red">
                    <Spinner type="dots" />
                </Text>
                {' Loading'}
            </Text>
        </>
    )
}
const getDriversRankings = async () => {
    let formulaPlayerRankings = [];
    axios.get("https://www.skysports.com/f1/standings").then((resp) => {
        const data = resp.data;
        const $ = cheerio.load(data);
        $('table.standing-table__table').find("tbody:first").each((i, e) => {
            $(e).find('tr.standing-table__row').each((index, playerRow) => {
                const rank = index + 1;
                const name = $(playerRow).find('td.standing-table__cell.standing-table__cell--name').data('long-name');
                const country = $(playerRow).find('td:nth-child(3)').text().trim();
                const team = $(playerRow).find('td:nth-child(4)').text().trim();
                const points = $(playerRow).find('td:nth-child(5)').text().trim();
                formulaPlayerRankings.push({ Rank: rank, Name: name, Country: country, Team: team, Points: points })
            })

        })
    })
    return formulaPlayerRankings;
}

export default function Formula1() {
    return (
        <>
           <DriverRankings/>
        </>
    )
}

 function DriverRankings() {
    const [drivers, SetDrivers] = useState([])
    const [rerender, setRerender] = useState(false)
    useEffect(() => {
        const getData = async () => {
            try {
                const driversData = await getDriversRankings();
                SetDrivers(driversData);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        getData();
        setTimeout(() => {
            setRerender(true)
        }, 2000)

    }, []);

    return (
        <>
            {drivers?.length == 0 && drivers ? <Spinners /> : <Table data={drivers}></Table>}
        </>
    )
}



