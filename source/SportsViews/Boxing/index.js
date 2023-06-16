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

const BoxerTables = ({ WBCData,title }) => {
  console.log(WBCData);
  return (
    <>
      <Box>
        <Text>{title}</Text>
        <Table data={WBCData} />
        {/*<Table data={WBAData} />
        <Table data={IBFData} />
        <Table data={WBOData} /> */}
      </Box>
    </>
  )}



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
      console.log(boxers); // Check the structure of the boxers array
      console.log(boxers[0][0]); // Check the value at boxers[0][0]
      console.log(boxers[0][0]["WBC"]);
      boxers[0].forEach((e) => {
        heavyweightdata.push(e);
      });

      boxers[1].forEach((e) => {
        cruiserweightdata.push(e);
      });

      boxers[2].forEach((e) => {
        lightheavyweightdata.push(e);
      });

      boxers[3].forEach((e) => {
        supermiddleweightdata.push(e);
      });

      boxers[4].forEach((e) => {
        middleweightdata.push(e);
      });

      boxers[5].forEach((e) => {
        superwelterweightdata.push(e);
      });

      boxers[6].forEach((e) => {
        lightweightdata.push(e);
      });

      boxers[6].forEach((e) => {
        superfeatherweightdata.push(e);
      });

      boxers[7].forEach((e) => {
        featherweightdata.push(e);
      });

      boxers[8].forEach((e) => {
        superbantamweightdata.push(e);
      });

      boxers[9].forEach((e) => {
        bantamweightdata.push(e);
      });

      boxers[10].forEach((e) => {
        superflyweightdata.push(e);
      });


      boxers[11].forEach((e) => {
        flyweightdata.push(e);
      });

      boxers[12].forEach((e) => {
        juniorflyweightdata.push(e);
      });

      boxers[14].forEach((e) => {
        minimumweightdata.push(e);
      });
      console.log(boxers[0].WBC)
    }



    return (
      <>
        <Text>boxxers</Text>
        {
          boxers.length == 0 ?
            <Spinners />
            :
            (
              <BoxerTables title={'HeavyWeight'} WBCData={heavyweightdata}/*  WBAData={heavyweightdata.WBA} WBOData={heavyweightdata.WBO} IBFData={heavyweightdata.IBF} */ />
            )

        }</>
    )
  }

