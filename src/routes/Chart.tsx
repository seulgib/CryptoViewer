import React from 'react'
import ApexChart from 'react-apexcharts';
import { useParams } from 'react-router-dom';
import { fetchCoinHistory } from './api';
import { useQuery } from 'react-query';
import {useRecoilValue} from "recoil";
import { isDarkAtom } from '../atom';
interface ChartProps{
    coinId:string;
}
interface IHistorical{
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}
function Chart({coinId}:ChartProps,){
    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading, data}=useQuery<IHistorical[]>(["ohlcv",coinId],()=>fetchCoinHistory(coinId));
    if(isLoading){
        return <div>Loading chart...</div>
    }
    return <div>{isLoading? "Loading chart...":<ApexChart 
    type="line" 
    series={[
        {
            name:"sales",
            data: data?.map((price)=>Number(price.close)) as number[]
        },
    ]}
    options={{
        theme:{
            mode: isDark? "dark":"light",
        },
        chart:{
            height:500,
            width:500,
            background:"#fff",
        },
        grid:{show:false},
        stroke:{
            curve:"smooth",
            width:5,
        },
        yaxis:{
            show:false,
        },
        xaxis:{
            axisBorder:{show:false},
            axisTicks:{show:false},
            labels:{show:false},
            type:"datetime",
            categories:data?.map((price)=>price.time_close),
        },
        fill:{
            type:"gradient",
            gradient:{gradientToColors:["blue"],stops:[0,100],}
        },
        colors:["red"],
        tooltip:{
            y:{
                //소수점 아래 3자리까지만
                formatter:(value)=>`$ ${value.toFixed(3)}`,
            }
        }

        
       
    }} />}</div>;
}
export default Chart;