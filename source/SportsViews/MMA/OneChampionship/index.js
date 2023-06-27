import React, { useState, useEffect } from 'react';
import { Text, Box, render, Newline } from 'ink';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { Table } from '@alcalzone/ink-table'
import Spinners from '../../../components/Spinners.js'




const getOneEvents = async () => {
    const eventData = [];
    axios.get("https://www.onefc.com/events/").then((resp) => {
        const data = resp.data;
        const $ = cheerio.load(data);
        $('div.post-list.is-simple').find("div.simple-post-card ").each((i, e) => {
            const event = [];
            $(e).find('div.content').each((ind, ele) => {
                const name = $(ele).find('h3').text();
                const timeAndCountry = $(ele).find('div.event-date-time').text().replace(/\s/g, "").trim();
                const [time, location] = timeAndCountry.split('/')
                if (name && timeAndCountry) eventData.push({ name: name, time: time, location: location });
            })
            if (i == 3) return false;
        })
    })
    return eventData;

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
    return (
        <>
            <Text>This is One </Text>
        </>
    )
}

 function OneEvents() {
    const [events, setEvents] = useState([])
    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const OneEvents = await getOneEvents();
                setEvents(OneEvents);
            } catch (error) {
            }
        };
        getData();

        setTimeout(() => {
            setRerender(true)
        }, 2000)
    }, []);


    return (
        <>
            {
                events?.length == 0 ?
                    <Spinners />
                    : (events?.map((ele, i) => {
                        console.log(ele.headline)
                        return (
                            <Box borderStyle="round" marginRight={2} borderColor="yellow" >
                                <Text>
                                    <Text key={ele.name}>{ele.name}</Text>
                                    <Newline />
                                    <Text key={ele.loction}>{ele.location}</Text>
                                    <Newline />
                                    <Text key={i}>{ele.time}</Text>
                                </Text>
                            </Box>
                        )
                    }))
            }
        </>
    )
}


function OneRankings() {
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
                            <Box borderStyle="round" borderColor="yellow" >
                                <Bantamweight />
                                <Featherweight />
                            </Box>
                            <Box borderStyle="round" borderColor="yellow" >
                                <Lightweight />
                                <Atomweight />
                            </Box>
                        </>
                    )
            }
        </>
    )
}

