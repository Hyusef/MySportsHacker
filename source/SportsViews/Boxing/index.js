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



const getBoxingRankings = async () => {
  let BoxingRanksData = [];
  axios.get("https://www.boxingscene.com/rankings").then((resp) => {
    const data = resp.data;
    const $ = cheerio.load(data);
    let rankingCategory;
    $('section.rankings').find("div.col-12").each((i, e) => {
      let orgArray = [];
      rankingCategory = $(e).find('h3.ranking-category-title').text();
      $(e).find('div.d-flex.flex-column').each((ind, el) => {
        let divArray = []
        const rankingOrg = $(el).find('h5.ranking-org-title').text();
        $(el).find('tbody').each((inde, ele) => {
          let champion = $(ele).find('td.first > div').text().trim()
          if (champion.match(/\n/)) { champion = champion.split(/\n|\s{2,}/).filter(s => s != '').join(' and ') }
          divArray.push({ name: champion, rank: 'champion' })
          $(el).find('tr').each((index, elem) => {
            const name = $(elem).find('td.count-item').text().trim();
            if (index != 0) divArray.push({ name: name, rank: index });
          })
        })
        orgArray.push({ [rankingOrg]: divArray })
      })

      if (BoxingRanksData)
        BoxingRanksData.push(orgArray)

    })
    BoxingRanksData = BoxingRanksData.slice(2)
  })
  return (BoxingRanksData);
}


export default function Boxing() {
  const [boxers, setBoxers] = useState([])
  const [rerender, setRerender] = useState(false)
  useEffect(() => {
    const getBoxerData = async () => {
      try {
        const boxerRanks = await getBoxingRankings();
        setBoxers(boxerRanks);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    getBoxerData();

    setTimeout(() => {
      setRerender(true)
    }, 2000)

  }, []);


  return (
    <>
    <Text>boxxers</Text>
      {
        boxers.length == 0 ?
          <Spinners />
          : (boxers?.map((ele, i) => {
            console.log(boxers,ele,i)
            return (
                <Text>{''}</Text>
            )
          }))
      }</>
  )
}

