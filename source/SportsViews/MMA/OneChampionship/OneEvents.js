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




export default function OneEvents() {
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



