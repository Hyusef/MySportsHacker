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


const getFighterRankings = async () => {
    const ranksData = [];
    axios.get("https://www.onefc.com/rankings/").then((resp) => {
        const data = resp.data;
        const $ = cheerio.load(data);
        $('div.d-flex.flex-column.gap-5.gap-md-6').find("div.athlete-rankings-card.d-flex.gap-4").each((i, e) => {
            const division = [];
            $(e).find('tr').each((ind, ele) => {
                const name = $(ele).find('a.is-link > h3').text();
                const rank = $(ele).find('td.rank.is-center.is-distinct.text-uppercase').text().replace(/\s/g, "").trim();
                const country = $(ele).find('td.country').text().replace(/\s/g, "").trim();
                if (name && rank && country) division.push({ name: name, rank: rank, country: country });
            })
            ranksData.push(division);
        })
    })
    console.log(ranksData);
    return ranksData;
}

export default function OneChampionship() {
    const [division, setDivision] = useState([])
    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const fighters = await getFighterRankings();
                setDivision(fighters);
            } catch (error) {
            }
        };

        getData();
        setTimeout(() => {
            setRerender(true)
        }, 2000)

    }, []);


    let strawweightData = [],
        flyweightData = [],
        bantamweightData = [],
        featherweightData = [],
        atomweightData = [],
        lightweightData = []


    if (division.length > 0) {

        division[0].forEach((e, i) => {
            strawweightData.push(e)
        });

        division[2].forEach((e, i) => {
            flyweightData.push(e)
        });

        division[5].forEach((e, i) => {
            bantamweightData.push(e)
        });

        division[8].forEach((e, i) => {
            featherweightData.push(e)
        });

        division[11].forEach((e, i) => {
            lightweightData.push(e)
        });

        division[12].forEach((e, i) => {
            atomweightData.push(e)
        });
    }

    const Strawweight = () => <Table data={strawweightData} />
    const Flyweight = () => <Table data={flyweightData} />
    const Bantamweight = () => <Table data={bantamweightData} />
    const Featherweight = () => <Table data={featherweightData} />
    const Lightweight = () => <Table data={lightweightData} />
    const Atomweight = () => <Table data={atomweightData} />
    return (
        <>
            {
                division.length == 0 ?
                    <Spinners />
                    : (
                        <>
                            <Box borderStyle="round" borderColor="yellow" >
                                <Strawweight />
                                <Flyweight />
                            </Box>
                            <Box borderStyle="round"  borderColor="yellow" >
                                <Bantamweight />
                                <Featherweight />
                            </Box>
                            <Box borderStyle="round"  borderColor="yellow" >
                                <Lightweight />
                                <Atomweight />
                            </Box>
                        </>
                    )
            }
        </>
    )
}
