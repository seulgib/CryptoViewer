import React from 'react'
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoinTickers } from './api';
interface PriceProps{
    coinId:string;
}

const PriceContainer=styled.div`
    width:100%;
    background-color:rgba(0,0,0,0.5);
    border-radius:10px;
    padding:10px;
`

const PriceInfo=styled.div`
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:10px;
    margin:10px;
    span:first-child{
        font-weight:600;
        text-transform:uppercase;
        margin-bottom:5px;
        color:${props=>props.theme.accentColor}
    };
    span:last-child{
        justify-self:end;
    }
`



interface IPrice{
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
}

function Price({coinId}:PriceProps){
    const {isLoading, data}=useQuery<IPrice>(["prcice",coinId],()=>fetchCoinTickers(coinId));
    return <div>{isLoading? "Loading price...":
    <PriceContainer>
        <PriceInfo>
            <span>Circulating_supply</span>
            <span>${data?.circulating_supply} </span>
         </PriceInfo>
         <PriceInfo>
            <span>Total_supply</span>
            <span>${data?.total_supply} </span>
         </PriceInfo>
         <PriceInfo>
            <span>Max_supply</span>
            <span>${data?.max_supply} </span>
         </PriceInfo>
         <PriceInfo>
            <span>Beta_value</span>
            <span>${data?.beta_value} </span>
         </PriceInfo>
       
    </PriceContainer>
    }</div>
}
export default Price;