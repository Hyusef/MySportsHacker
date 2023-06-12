import React, { useState, useEffect } from 'react';
import { Text, Box, render } from 'ink';
import * as cheerio from 'cheerio';
import axios from 'axios';
import Spinner from 'ink-spinner';
import { Table } from '@alcalzone/ink-table'

const getFighters = async () => {
    const f = []
    axios.get("https://www.ufc.com/rankings").then((resp) => {
        const data = resp.data;
        const $ = cheerio.load(data);
        $('div.l-container__content').find("div.view-grouping-content").each((ind, ele) => {
            const division = [];
            const champion = $(ele).find('h5 > a').text();
            $(ele).find("td.views-field.views-field-title").each((i, ele) => {
                const fighters = $(ele).text().trim();
                const fighterRankings = i + 1 + ': ' + fighters;
                switch (ind) {
                    case 0:
                        if (i == 1) division.push({ 'Pound-For-Pound': champion + ' 👑GOAT👑' })
                        division.push({ 'Pound-For-Pound': fighterRankings })
                        break;
                    case 1:
                        if (i == 0) division.push({ Flyweight: champion + ' 👑' });
                        division.push({ Flyweight: fighterRankings })
                        break;

                    case 2:
                        if (i == 0) division.push({ Bantamweight: champion + ' 👑' });
                        division.push({ Bantamweight: fighterRankings })
                        break;
                    case 3:
                        if (i == 0) division.push({ Featherweight: champion + ' 👑' });
                        division.push({ Featherweight: fighterRankings })
                        break;
                    case 4:
                        if (i == 0) division.push({ Lightweight: champion + ' 👑' });
                        division.push({ Lightweight: fighterRankings })
                        break;
                    case 5:
                        if (i == 0) division.push({ Welterweight: champion + ' 👑' });
                        division.push({ Welterweight: fighterRankings })
                        break;
                    case 6:
                        if (i == 0) division.push({ Middleweight: champion + ' 👑' });
                        division.push({ Middleweight: fighterRankings })
                        break;
                    case 7:
                        if (i == 0) division.push({ 'Light-Heavyweight': champion + ' 👑' });
                        division.push({ 'Light-Heavyweight': fighterRankings })
                        break;
                    case 8:
                        if (i == 0) division.push({ 'Heavyweight': champion + ' 👑' });
                        division.push({ 'Heavyweight': fighterRankings })
                        break;
                    case 9:
                        if (i == 0) division.push({ 'Women-P4P': champion + ' 👑' });
                        division.push({ 'Women-P4P': fighterRankings })
                        break;
                    case 10:
                        if (i == 0) division.push({ 'Women-Strawweight': champion + ' 👑' });
                        division.push({ 'Women-Strawweight': fighterRankings })
                        break;
                    case 11:
                        if (i == 0) division.push({ 'Women-Flyweight': champion + ' 👑' });
                        division.push({ 'Women-Flyweight': fighterRankings })
                        break;
                    case 12:
                        if (i == 0) division.push({ 'Women-Bantamweight': champion + ' 👑' });
                        division.push({ 'Women-Bantamweight': fighterRankings })
                        break;

                }
            });
            f.push(division);
        })
    })
    return f;
}



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

export default function UFC() {







}

function UfcRankings() {
    const [div, setDiv] = useState([])
    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const fighters = await getFighters();
                setDiv(fighters);
                console.log(div);
            } catch (error) {
                console.error("Error fetching fighters:", error);
            }
        };
        getData();
        setTimeout(() => {
            setRerender(true)
        }, 1000)
    }, []);

    let P4Pdata = [];
    let flyweightData = [];
    let bantamweightData = [];
    let featherweightData = [];
    let lightweightData = [];
    let welterweightData = [];
    let middleweightData = [];
    let lightheavyweightData = [];
    let heavyweightData = [];
    let womenp4pData = [];
    let strawweightData = [];
    let womenFlyweightData = [];
    let womenBantamweightData = [];

    if (div.length > 0) {
        div[0].slice(1).forEach((e, i) => {
            P4Pdata.push(e)
        });
        div[1].forEach((e, i) => {
            flyweightData.push(e)
        });

        div[2].forEach((e, i) => {
            bantamweightData.push(e)
        });

        div[3].forEach((e, i) => {
            featherweightData.push(e)
        });

        div[4].forEach((e, i) => {
            lightweightData.push(e)
        });

        div[5].forEach((e, i) => {
            welterweightData.push(e)
        });

        div[6].forEach((e, i) => {
            middleweightData.push(e)
        });

        div[7].forEach((e, i) => {
            lightheavyweightData.push(e)
        });

        div[8].forEach((e, i) => {
            heavyweightData.push(e)
        });

        div[9].forEach((e, i) => {
            womenp4pData.push(e)
        });

        div[10].forEach((e, i) => {
            strawweightData.push(e)
        });

        div[11].forEach((e, i) => {
            womenFlyweightData.push(e)
        });

        div[12].forEach((e, i) => {
            womenBantamweightData.push(e)
        });

    }

    const P4P = () => <Table data={P4Pdata} />
    const Flyweight = () => <Table data={flyweightData} />
    const Bantamweight = () => <Table data={bantamweightData} />
    const Featherweight = () => <Table data={featherweightData} />
    const Lightweight = () => <Table data={lightweightData} />
    const Welterweight = () => <Table data={welterweightData} />
    const Middleweight = () => <Table data={middleweightData} />
    const LightHeavyWeight = () => <Table data={lightheavyweightData} />
    const Heavyweight = () => <Table data={heavyweightData} />
    const Womenp4p = () => <Table data={womenp4pData} />
    const Strawweight = () => <Table data={strawweightData} />
    const WomenFlyweight = () => <Table data={womenFlyweightData} />
    const WomenBantamweight = () => <Table data={womenBantamweightData} />
    return (
        <>
            {div.length == 0 ? <Spinners /> :
                <>
                    <Box>
                        <P4P />
                        <Flyweight />
                        <Bantamweight />
                        <Featherweight />
                    </Box>
                    <Box>
                        <Lightweight />
                        <Welterweight />
                        <Middleweight />
                        <LightHeavyWeight />
                    </Box>
                    <Box>
                        <Heavyweight />
                        <Womenp4p />
                        <Strawweight />
                        <WomenFlyweight />
                    </Box>
                    <WomenBantamweight />
                </>
            }
        </>
    )

}

