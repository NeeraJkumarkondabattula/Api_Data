import React, { useEffect, useState } from 'react'
import covid from './covid.png'

const UseEffectApi = () => {

    const [covid_data, setData] = useState([])
    const [search,setSearch] = useState("")
    const [data,setDatas] = useState([])

    const getData = async () => {
        const res = await fetch('https://api.rootnet.in/covid19-in/stats/latest');
        const data = await res.json();
        setData(data.data.regional);
        setDatas(data.data.summary)
        console.log(covid_data);
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <div className='header'>
                <h2><span id='deaths'>COVID</span> Data In INDIA </h2>
                <img src={covid} />
                <p>You will get all state details with this site...</p>
            </div>
            <div className='search'>
                <input type='text' placeholder='Search State...' onChange={(e)=>{setSearch(e.target.value)}} />
            </div>
            <div className='container'>{
                covid_data.filter(val=>{
                    if(search === ""){
                        return val;
                    }else if(val.loc.toLowerCase().includes(search.toLowerCase())){
                        return val;
                    }
                }).map((val) => {
                    const {loc, deaths ,totalConfirmed ,discharged} = val;
                    const loc1 = loc.replace(/[^a-zA-Z0-9 ]/g, '')
                    return (
                        <div className='card' key={loc}>
                            <h3>{loc1}</h3>
                            <p id="discharged">Discharged : {discharged}</p>
                            <p id='deaths'>Deaths : {deaths}</p>
                            <p>Total Confirmed : {totalConfirmed}</p>
                        </div>
                    )
                })
            }
            </div>
            <div id='summary'>
                <p id='total'>Total : {data.total}</p>
                <p id='indians'>Indians : {data.confirmedCasesIndian}</p>
                <p id='foreigners'>Foreigners : {data.confirmedCasesForeign}</p>
                <p id='discharged'>Discharged : {data.discharged}</p>
                <p id='deaths'>Deaths : {data.deaths}</p>
            </div>
        </>
    );
}

export default UseEffectApi