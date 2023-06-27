import React, { useState, useEffect } from 'react';
import { Text, Box, render, Newline } from 'ink';
import * as cheerio from 'cheerio';
import axios from 'axios';

import { Table } from '@alcalzone/ink-table'

import Spinners from '../../../components/Spinners.js'

const getBellatorRankings = async () => {
    const ranksData = [];
    axios.get("https://www.cbssports.com/mma/rankings/bellator/").then((resp) => {
        const data = resp.data;
        const $ = cheerio.load(data);
        $('div.RankingsTablesContainer.SectionLayout--2col').find("div.TableBase.TableBase-RankingsTable").each((i, e) => {
            const divisionName = $(e).find('h4.TableBase-title.TableBase-title--large').text().replace(/\n/g, "").trim();
            const division = [];
            $(e).find('tr.TableBase-bodyTr').each((ind, ele) => {
                const rank = $(ele).find("td:first").text().replace(/\n/g, "").trim();
                const fighter = $(ele).find("td:nth-child(2)").text().replace(/\n/g, "").trim();
                division.push({ rank: rank, fighter: fighter })
            })
            ranksData.push({ divisionName: divisionName, division: division });
        })
    })
    return ranksData

}

const getBellatorEvents = async () => {
    const eventData = [];
    axios.get("https://www.bellator.com/event").then((resp) => {
        const data = resp.data;
        const $ = cheerio.load(data);
        $('div.UpcomingEventsstyles__UpcomingEvents-kpxe7z-1.bIlsce').find("div.Eventsstyles__EventContainer-jtjrpn-2.ceEIQG").each((i, e) => {
            const date = $(e).find('span.UpcomingEventCardstyles__Date-gmhvif-1.hXJIly').text();
            $(e).find('div.UpcomingEventCardstyles__UpcomingEventCardContainer-gmhvif-0.dnctcc').each((ind, ele) => {
                const eventname = $(ele).find("p:first").text();
                const fighters = $(ele).find("p:nth-child(2)").text();
                const venue = $(ele).find("p:nth-child(3)").text();
                const country = $(ele).find("p:nth-child(4)").text();
                eventData.push({ eventname: eventname, date: date, fighters: fighters, venue: venue, country: country });
            })
        })
    })
    return eventData
}


export default function Bellator() {

    return (
        <>
            <Text>Belatorr</Text>
        </>
    )
}


function BellatorRankings() {
    const [ranks, setRanks] = useState([])
    const [rerender, setRerender] = useState(false)
    useEffect(() => {
        const getData = async () => {
            try {
                const bellatorRanks = await getBellatorRankings();
                setRanks(bellatorRanks);
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
            {ranks.length == 0
                ? <Spinners />
                : (
                    ranks.map((e, i) => {
                        return (
                            <>
                                <Text>{e.divisionName}</Text>
                                <Table data={e.division} />
                            </>
                        )
                    })

                )}

        </>
    )
}


function BellatorEvents() {

    const [events, setEvents] = useState([])
    const [rerender, setRerender] = useState(false)
    useEffect(() => {
        const getData = async () => {
            try {
                const BellatorEvents = await getBellatorEvents();
                setEvents(BellatorEvents);
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
                        return (
                            <Box borderStyle="round" marginRight={2} borderColor="yellow" >
                                <Text>
                                    <Text key={ele.eventname}>{ele.eventname}</Text>
                                    <Newline />
                                    <Text key={ele.fighters}>{ele.fighters}</Text>
                                    <Newline />
                                    <Text key={i}>{ele.date}</Text>
                                    <Newline />
                                    <Text key={i}>{ele.venue}</Text>
                                    <Newline />
                                    <Text key={i}>{ele.country}</Text>
                                </Text>
                            </Box>
                        )
                    }))
            }
        </>
    )
}




