
import React, { useState, useEffect } from 'react';
import { Text, Box, Newline } from 'ink';
import * as cheerio from 'cheerio';
import axios from 'axios';
import Spinners from '../../../components/Spinners.js'

const getEvents = async () => {
    const eventData = [];
    axios.get("https://www.ufc.com/events").then((resp) => {
        const data = resp.data;
        const $ = cheerio.load(data);
        $('div.view.view-events-upcoming-past-solr.view-id-events_upcoming_past_solr.view-display-id-upcoming').find("article.c-card-event--result").each((_, ele) => {
            const headline = $(ele).find('h3.c-card-event--result__headline > a ').text()
            const date = $(ele).find('div.c-card-event--result__date > a').text();
            const venue = $(ele).find('div.field.field--name-taxonomy-term-title > h5').text().replace(/[\n]/g, "").trim();
            const city = $(ele).find('p.address > span.locality').text()
            const country = $(ele).find('p.address > span.country').text()
            eventData.push({
                headline: headline,
                date: date,
                venue: venue,
                city: city,
                country: country,
            })
        })
    })
    return eventData;
}



export default function UfcEvents() {
    const [events, setEvents] = useState([])
    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        const getEventData = async () => {
            try {
                const ufcEvents = await getEvents();
                setEvents(ufcEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        getEventData();
        setTimeout(() => {
            setRerender(true)
        }, 1000)
    }, []);

    return (
        <>
            {
                events.length == 0 ?
                    <Spinners />
                    : (events.map((ele, i) => {
                        console.log(ele.headline)
                        return (
                            <Box borderStyle="round" marginRight={2} borderColor="yellow" >
                                <Text>
                                    <Text key={ele.headline}>{ele.headline}</Text>
                                    <Newline />
                                    <Text key={ele.city}>{ele.city}</Text>
                                    <Newline />
                                    <Text key={i}>{ele.country}</Text>
                                    <Newline />
                                    <Text key={i}>{ele.date}</Text>
                                    <Newline />
                                    <Text key={ele.venue + i}>{ele.venue}</Text>
                                </Text>

                            </Box>
                        )
                    }))
            }
        </>
    )
}
