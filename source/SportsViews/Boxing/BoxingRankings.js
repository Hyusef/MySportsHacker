import React, { useState, useEffect } from 'react';
import { Text, Box, render, Newline } from 'ink';
import * as cheerio from 'cheerio';
import axios from 'axios';
import Spinners from '../../components/Spinners.js'
import { Table } from '@alcalzone/ink-table'
import MultiSelects from '../../components/MultiSelect.js'

const BoxerTables = ({ data, title }) => {

  const WBCData = (data[0]['WBC'])
  const WBAData = (data[1]['WBA'])
  const IBFData = (data[2]['IBF'])
  const WBOData = (data[3]['WBO'])
  return (
    <>
      <Box width={180} height={35} >
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
          divArray.push({ Name: champion, Rank: 'C' })
          $(el).find('tr').each((index, elem) => {
            const name = $(elem).find('td.count-item').text().trim();
            if (index != 0) divArray.push({ Name: name, Rank: index });
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

export default function BoxingRankings() {
  const [boxers, setBoxers] = useState([])
  const [rerender, setRerender] = useState(false)
  const [weights, setWeights] = useState([])

  const items = [{
    label: 'Heavy Weight',
    value: 'heavyweightdata'
  }, {
    label: 'Cruiser Weight',
    value: 'cruiserweightdata'
  },
  {
    label: 'Light HeavyWeight',
    value: 'lightheavyweightdata'
  },
  {
    label: 'Super MiddleWeight',
    value: 'supermiddleweightdata'
  }, {
    label: 'Middleweight',
    value: 'middleweightdata'
  }, {
    label: 'Super Welterweight',
    value: 'superwelterweightdata'
  },
  {
    label: 'Welter Weight',
    value: 'welterweightdata'
  },
  {
    label: 'Super Lightweight',
    value: 'superlightweightdata'
  },
  {
    label: 'Lightweight',
    value: 'lightweightdata'
  },
  {
    label: 'Super Featherweight',
    value: 'superfeatherweightdata'
  },
  {
    label: 'Featherweight',
    value: 'featherweightdata'
  },
  {
    label: 'Super Bantamweight',
    value: 'superbantamweightdata'
  },
  {
    label: 'bantamweight',
    value: 'bantamweightdata'
  },
  {
    label: 'Super Flyweight',
    value: 'superflyweightdata'
  },
  {
    label: 'Flyweight',
    value: 'flyweightdata'
  },
  {
    label: 'Junior Flyweight',
    value: 'juniorflyweightdata'
  },
  {
    label: 'Minimumweight',
    value: 'minimumweightdata'
  }

  ];

  const handleSubmit = items => {
    items.forEach((e)=>{
      setWeights(previtems=>[...previtems,e.value]);
    })
  }
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

  let heavyweightdata = [], cruiserweightdata = [], lightheavyweightdata = [],
    supermiddleweightdata = [], middleweightdata = [], superwelterweightdata = [],
    welterweightdata = [], superlightweightdata = [], lightweightdata = [],
    superfeatherweightdata = [], featherweightdata = [], superbantamweightdata = [],
    superflyweightdata = [], flyweightdata = [], bantamweightdata = [],
    juniorflyweightdata = [], minimumweightdata = [];

const arrays = {
  heavyweightdata,
  cruiserweightdata,
  lightheavyweightdata,
  supermiddleweightdata,
  middleweightdata,
  superwelterweightdata,
  welterweightdata,
  superlightweightdata,
  lightweightdata,
  superfeatherweightdata,
  featherweightdata,
  superbantamweightdata,
  superflyweightdata,
  flyweightdata,
  bantamweightdata,
  juniorflyweightdata,
  minimumweightdata
};

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
    //welterweight
    boxers[7].forEach((e) => {
      superwelterweightdata.push(e);
    });

    boxers[8].forEach((e) => {
      welterweightdata.push(e);
    });

    boxers[9].forEach((e) => {
      superlightweightdata.push(e);
    });

    //super lightweight
    boxers[10].forEach((e) => {
      lightweightdata.push(e);
    });

    boxers[11].forEach((e) => {
      superfeatherweightdata.push(e);
    });

    boxers[12].forEach((e) => {
      featherweightdata.push(e);
    });

    boxers[13].forEach((e) => {
      superbantamweightdata.push(e);
    });

    boxers[14].forEach((e) => {
      bantamweightdata.push(e);
    });

    boxers[15].forEach((e) => {
      superflyweightdata.push(e);
    });


    boxers[16].forEach((e) => {
      flyweightdata.push(e);
    });

    boxers[17].forEach((e) => {
      juniorflyweightdata.push(e);
    });

    boxers[18].forEach((e) => {
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
            <MultiSelects items={items} onSubmit={handleSubmit}/>
            {weights.map((e)=>{
              return <BoxerTables data={arrays[e]}/>
            })}
            </>
          )
      }</>
  )
}

