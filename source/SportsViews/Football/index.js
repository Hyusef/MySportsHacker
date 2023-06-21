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

const getTodaysFixtures = async () => {
    const tournaments = [];
    axios.get("https://www.sportinglife.com/football/fixtures-results").then((resp) => {
        const data = resp.data;
        const $ = cheerio.load(data);
        $('ul.CompetitionList__CompetitionListWrapper-sc-1f2woz6-0.PJXXy').find("li.CompetitionList__CompetitionListItem-sc-1f2woz6-1.eqnfuA").each((_, e) => {
            const titleOfCompetition = $(e).find('h3.ContentPanel__ContentPanelTitle-sc-1izwmji-1.kWcBOf').text();
            $(e).find('section.ContentPanel__ContentPanelWrapper-sc-1izwmji-0.cpIOrT').each((_, box) => {
                const matches = []
                matches.push(titleOfCompetition);
                $(box).find('div.Item__MatchListItemWrapper-et8305-0.ccaPwX').each((_, match) => {
                    const time = $(match).find('span.time-short').text().slice(0, 5);
                    const teamA = $(match).find('span.Item__TeamA-et8305-6.bZRnjo').text();
                    const teamB = $(match).find('span.Item__TeamB-et8305-8.dqXJJw').text();
                    const teamMatch = teamA + ' V ' + teamB
                    matches.push({ Match: teamMatch, Time: time });
                })
                tournaments.push(matches)
            })
        })
    })
    return tournaments;
}


export default function Football() {
    return (
        <>
            <TodaysFixtures/>

        </>
    )
}


function TodaysFixtures() {
    const [fixtures, setFixtures] = useState([])
    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const fixturesData = await getTodaysFixtures();
                setFixtures(fixturesData);
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
            {fixtures?.length == 0
                ? <Spinners />
                : (
                    fixtures?.map((e, i) => {
                        return (
                            <>
                                <Table data={e.slice(1)} ></Table>
                            </>
                        )
                    })

                )}

        </>
    )

}