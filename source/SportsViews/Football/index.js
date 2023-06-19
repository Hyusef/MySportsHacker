import React from 'react'
import { Text } from 'ink';


const getTodaysFixtures = async () => {
    axios.get("https://www.sportinglife.com/football/fixtures-results").then((resp) => {
        const data = resp.data;
        const $ = cheerio.load(data);
        const tournaments = [];
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
                    matches.push({ match: teamMatch, time: time });
                })
                tournaments.push(matches)
            })
        })
    })
    return tournaments;
}


export default function Football() {
    return (
        <Text>Football</Text>
    )

}