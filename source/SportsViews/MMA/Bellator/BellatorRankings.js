

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Table } from '@alcalzone/ink-table'
import Spinners from '../../../components/Spinners.js'
import { Text } from 'ink';


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


export default function BellatorRankings() {
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
                    ranks.slice(0, 3).map((e, i) => {
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
