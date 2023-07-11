
import React, { useState, useEffect } from 'react';
import * as cheerio from 'cheerio';
import axios from 'axios';

import { Table } from '@alcalzone/ink-table'
import Spinners from '../../components/Spinners.js'



const getMensRankings = async () => {
    const mensTopFifteen = [];
    axios.get("https://www.espn.co.uk/tennis/rankings").then((resp) => {
        const data = resp.data;
        const $ = cheerio.load(data);
        $("div.ResponsiveTable").find('div.flex').each((_, e) => {
            $(e).find('tbody').find('tr').slice(0, 15).each((index, player) => {
                const rank = index + 1;
                const name = $(player).find('a.AnchorLink').text();
                const points = $(player).find('td.Table__TD:eq(3)').text();
                const age = $(player).find('td.Table__TD:eq(4)').text();
                const country = $(player).find('img.Image.Logo.Logo__sm').attr('title').trim();
                mensTopFifteen.push({ Rank: rank, Name: name, Points: points, Age: age, Country: country });
            })
        })
    })
    return mensTopFifteen;
}


export default function MensTopFifteen() {
    const [tennisPlayers, setTennisPlayers] = useState([])
    const [rerender, setRerender] = useState(false)
    useEffect(() => {
        const getData = async () => {
            try {
                const playersData = await getMensRankings();
                setTennisPlayers(playersData);
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
            {tennisPlayers?.length == 0 && tennisPlayers ? <Spinners /> : <Table data={tennisPlayers}></Table>}
        </>
    )
}



