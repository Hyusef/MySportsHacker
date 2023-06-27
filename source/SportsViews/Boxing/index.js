import React, { useState, useEffect } from 'react';
import { Text, Box, render, Newline } from 'ink';
import * as cheerio from 'cheerio';
import axios from 'axios';
import Spinners from '../../components/Spinners.js'

import { Table } from '@alcalzone/ink-table'


const BoxerTables = ({ data, title }) => {
  console.log(data)
const WBCData = (data[0]['WBC'])
const WBAData = (data[1]['WBA'])
const IBFData = (data[2]['IBF'])
const WBOData = (data[3]['WBO'])
  return (
    <>
      <Box>
        <Table data={WBCData} />
        <Table data={WBAData} />
        <Table data={IBFData} />
        <Table data={WBOData} />
      </Box>
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

  let heavyweightdata = [];
  let cruiserweightdata = [];
  let lightheavyweightdata = [];
  let supermiddleweightdata = [];
  let middleweightdata = [];
  let superwelterweightdata = [];
  let welterweightdata = [];
  let superlightweightdata = [];
  let lightweightdata = [];
  let superfeatherweightdata = [];
  let featherweightdata = [];
  let superbantamweightdata = [];
  let bantamweightdata = [];
  let superflyweightdata = [];
  let flyweightdata = [];
  let juniorflyweightdata = [];
  let minimumweightdata = [];




  if (boxers.length > 1) {
    boxers[2].forEach((e) => {
      heavyweightdata.push(e);
    });

    boxers[3].forEach((e) => {
      cruiserweightdata.push(e);
    });

    boxers[4].forEach((e) => {
      lightheavyweightdata.push(e);
    });

    boxers[5].forEach((e) => {
      supermiddleweightdata.push(e);
    });

    boxers[6].forEach((e) => {
      middleweightdata.push(e);
    });

    boxers[7].forEach((e) => {
      superwelterweightdata.push(e);
    });

    boxers[8].forEach((e) => {
      lightweightdata.push(e);
    });

    boxers[9].forEach((e) => {
      superfeatherweightdata.push(e);
    });

    boxers[10].forEach((e) => {
      featherweightdata.push(e);
    });

    boxers[11].forEach((e) => {
      superbantamweightdata.push(e);
    });

    boxers[12].forEach((e) => {
      bantamweightdata.push(e);
    });

    boxers[13].forEach((e) => {
      superflyweightdata.push(e);
    });


    boxers[14].forEach((e) => {
      flyweightdata.push(e);
    });

    boxers[15].forEach((e) => {
      juniorflyweightdata.push(e);
    });

    boxers[16].forEach((e) => {
      minimumweightdata.push(e);
    });
  }



  return (
    <>
      <Text>boxxers</Text>
      {
        boxers.length == 0 ?
          <Spinners />
          :
          (
            <>
            <BoxerTables data={heavyweightdata}/>
            <BoxerTables data={featherweightdata}/>
            <BoxerTables data={lightheavyweightdata}/>
            </>
          )

      }</>
  )
}

