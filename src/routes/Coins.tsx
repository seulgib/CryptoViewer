import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import axios from "axios";
import { fetchCoins } from "./api";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";
const Container=styled.div`
    padding:0px 20px;
    max-width:480px;
    margin: 0 auto;
`;

const Header=styled.header`
    height:17vh;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
`;

const CoinsList=styled.ul``;

const Coin=styled.li`
    background-color:white;
    color:${props=>props.theme.bgColor};
    margin-bottom:10px;
    padding:20px;
    border-radius:15px;
    a{
        //색변화가 0.5초에 걸쳐 이루어짐.
        transition:color 0.2s ease-in;
        display:flex;
        align-items:center;
    }
    &:hover{
        a{
            color:${props=>props.theme.accentColor};
        }
    }
`;

const Title=styled.h1`
    font-size:48px;
    color:${props=>props.theme.accentColor};
`

const Loader = styled.span`
    text-align:center;
`

const CoinImg=styled.img`
    width:25px;
    height:25px;
    margin-right:10px;
`

const ToggleBtn=styled.button`
    border-style:none;
    border-radius:  5px;
    background-color: ${props=>props.theme.textColor};
    color:${props=>props.theme.bgColor};
`

interface CoinInterface {
    id:string,
    name:string,
    symbol:string,
    rank:number,
    is_new:boolean,
    is_active:boolean,
    type:string;
}



function Coins(){
    //useQuery가 fetcher function을 부르고, fetcher 함수가 끝나면 fetcher function은 해당 json을 data에 넣음.
    //allCoins: query의 고유 식별자, data: fetcher 함수
    const {isLoading,data }=useQuery<CoinInterface[]>("allCoins", fetchCoins);
    const setterDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom =()=> setterDarkAtom((prev)=>!prev);
    return (
    <Container>
        <Header>
            <Title>Coin</Title>
            <ToggleBtn onClick={toggleDarkAtom}>Toggle Mode</ToggleBtn>
        </Header>
        {isLoading? (<Loader>"Loading..."</Loader>):(
             <CoinsList>
             {data?.slice(0,100).map(coin=>(
             <Coin key={coin.id}>
                {/* state 전달하기 */}
                <Link to={`/${coin.id}`} state={{name:coin.name}}>
                    <CoinImg src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
                    {coin.name} &rarr;
                </Link>
            </Coin>))}
         </CoinsList>   
        )}
            
    </Container>)
}
export default Coins;