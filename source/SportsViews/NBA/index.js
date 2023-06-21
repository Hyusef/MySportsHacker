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


//create a way of getting input from user and include an option if they want to see both eastern and western standings,
//if its only one then edit the function below to take a parameter which changes which table is scraped
const getEasternRankings = async (rank) => {
    const rankings = [];
    const tableSelect = `div#TableBase-${rank}`
    axios.get("https://www.cbssports.com/nba/standings/").then((resp) => {
        const data = resp.data;
        const $ = cheerio.load(data);
        $(`div.TableBaseWrapper:${rank == 1 ? 'first' : 'eq(1)'}`).find(tableSelect).each((_, e) => {
            $(e).find('tbody').find('tr').each((index, team) => {
                const rank = index + 1;
                const teamName = $(team).find('span>a').text();
                const wins = $(team).find('td.TableBase-bodyTd.TableBase-bodyTd--number').first().text().trim();
                const losses = $(team).find('td.TableBase-bodyTd.TableBase-bodyTd--number').eq(1).text().trim();
                const percentile = $(team).find('td.TableBase-bodyTd.TableBase-bodyTd--number:nth-child(3)').text().trim();
                const pointsPerGame = $(team).find('td.TableBase-bodyTd.TableBase-bodyTd--number:nth-child(5)').text().trim();
                rankings.push({ Rank: rank, Team: teamName, Wins: wins, Losses: losses, Percentile: percentile, PPG: pointsPerGame });
            })
        })
    })
    return rankings;
}


export default function NBA() {

    return (
        <>
            <Text>NBA</Text>
            <Box>
                <EasternRankingsTable />
                <WesternRankingsTable />
            </Box>
        </>
    )
}

function EasternRankingsTable() {
    const [eTeams, setETeams] = useState([])
    const [rerender, setRerender] = useState(false)
    useEffect(() => {
        const getData = async () => {
            try {
                const teamsData = await getEasternRankings(1);
                setETeams(teamsData);
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
            {eTeams?.length == 0 && eTeams ? <Spinners /> : <Table data={eTeams}></Table>}
        </>
    )
}


function WesternRankingsTable() {
    const [eTeams, setETeams] = useState([])
    const [rerender, setRerender] = useState(false)
    useEffect(() => {
        const getData = async () => {
            try {
                const teamsData = await getEasternRankings(2);
                setETeams(teamsData);
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
            {eTeams?.length == 0 && eTeams ? <Spinners /> : <Table data={eTeams}></Table>}
        </>
    )
}


