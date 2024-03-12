import React, {useState, useEffect} from "react";
import {Routes, Route, useParams} from "react-router"
import styled from "styled-components";
import { useLocation, Link, useMatch } from "react-router-dom";
import axios from 'axios';
import Chart from './Chart';
import Price from './Price';
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import { useQuery } from "react-query";
import {Helmet} from "react-helmet";

interface RouteState {
    from: string;
    name?: string;
}
const CoinImg=styled.img`
    width:25px;
    height:25px;
    margin-right:10px;
`

const Container=styled.div`
    padding:0px 20px;
    max-width:480px;
    margin: 0 auto;
`;

const Header=styled.header`
    height:10vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Title=styled.h1`
    font-size:48px;
    color:${props=>props.theme.accentColor};
`

const Loader = styled.span`
    text-align:center;
`
const Overview=styled.div`
display:flex;
justify-content:space-between;
background-color:rgba(0,0,0,0.5);
padding:10px 20px;
border-radius:10px;
`

const OverviewItem=styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;

    span:first-child{
        font-size:10px;
        font-weight:400;
        text-transform:uppercase;
        margin-bottom:5px;

    }
`

const Description=styled.p`
    margin:20px 0px;
    line-height:2;
`

const Tabs=styled.div`
    display:grid;
    grid-template-columns:repeat(2,1fr);
    margin:25px 0px;
    gap:10px;
`

const Tab=styled.span<{isActive:boolean}>`
    text-align:center;
    text-transform:uppercase;
    font-size:12px;
    font-weight:700;
    background-color:rgba(0,0,0,0.5);
    padding:7px 0px;
    border-radius:10px;
    color:${props=>props.isActive?props.theme.accentColor:props.theme.textColor};
    a{
        display:block;
    }
`
const BackContainer=styled.div`
    display:flex;
    height: 50px;
    justify-content:left;
    align-items:center;
    margin:25px 0px;
`

const BackBtn=styled.div`
    background-color:rgba(0,0,0,0.5);
    border-radius:10px;
    padding:7px 7px 7px 7px;
    font-size:15px;
    font-weight:bold;
    margin:10px;

    a{
        display:block;
    }
`
function Coin(){
    //const [loading, setLoading]=useState(true);
    const params=useParams();
    const coinId=params.coinId;
    //속도 빨라짐. 근데 홈 화면 없이 direct하게 Coin.tsx 페이지로 넘어가면 오류남.
    //Home화면에서 전달받은 state가 undefined로 설정되기 때문에.
    //coin component에서 직접 API 부르지 않고, user에게 coinName 보여주기
    const location=useLocation();
    const state=location.state as RouteState;
    //console.log("name: ",state.name);

    //useRouteMatch hook 사용하기
    //만약 url이 useRouteMatch를 만족한다면, Object를 얻고 아니면 null을 얻음.
    const priceMatch=useMatch(":coinId/price");
    console.log(priceMatch);
    const chartMatch=useMatch(":coinId/chart");
    console.log(chartMatch);

    const {isLoading:infoLoading, data:infoData}=useQuery<InfoData>(["info",coinId], ()=>fetchCoinInfo(coinId!));
    const {isLoading:tickersLoading, data:tickersData}=useQuery<PriceData>(["tickers",coinId], ()=>fetchCoinTickers(coinId!));
    interface CoinInterface {
        id:string,
        name:string,
        symbol:string,
        rank:number,
        is_new:boolean,
        is_active:boolean,
        type:string;
    }
    
    //alt+ shift + i: 커서 여러줄
    //ctrl+d: 특정문자만
    interface InfoData{
        id:string;
        name:    string;
        symbol:    string;
        rank:    number;
        is_new:    boolean;
        is_active:    boolean;
        type:    string;
        logo:    string;
        tags:    object;
        team:    object;
        description:    string;
        message:    string;
        open_source:    boolean;
        started_at:    string;
        development_status:    string;
        hardware_wallet:    boolean;
        proof_type:    string;
        org_structure:    string;
        hash_algorithm:    string;
        links:    object;
        links_extended:    object;
        whitepaper:    object;
        first_data_at:    string;
        last_data_at:    string;

    }
 

    interface PriceData{
        id:   string;
        name:    string;
        symbol:    string;
        rank:    number;
        circulating_supply:    number;
        total_supply:    number;
        max_supply:    number;
        beta_value:    number;
        first_data_at:    string;
        last_updated:    string;
        quotes:    {
            USD:{
                ath_date:string;
            ath_price:number;
            market_cap:number;
            market_cap_change_24h:number;
            percent_change_1h:number;
            percent_change_1y:number;
            percent_change_6h:number;
            percent_change_7d:number;
            percent_change_12h:number;
            percent_change_15m:number;
            percent_change_24h:number;
            percent_change_30d:number;
            percent_change_30m:number;
            percent_from_price_ath:number;
            price:number;
            volume_24h:number;
            volume_24h_change_24h:number;
            }

        };

    }
    
   
    const loading=infoLoading || tickersLoading;
    return <Container>
        <Helmet>
        <title>
        {state?.name ? state.name : (loading ? "Loading..." : infoData?.name)}
    </title>
        </Helmet>
        <BackContainer>
            <BackBtn>
                <Link to="/">Go Back</Link>
            </BackBtn>
        </BackContainer>
        
    <Header>
        {/* 바로 Coin.tsx 페이지로 접속해도 에러 안나도록 */}
        <Title>{state?.name ? <><CoinImg src={`https://cryptocurrencyliveprices.com/img/${infoData?.id}.png`}/>
        {state.name}</>: loading? "Loading...":
        <><CoinImg src={`https://cryptocurrencyliveprices.com/img/${infoData?.id}.png`}/>{infoData?.name}</>}</Title>
    </Header>
    {loading? (<Loader>Loading...</Loader>):(
        <><Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>${infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>OpenSource:</span>
                    <span>{infoData?.open_source ? "YES" : "NO"}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Price:</span>
                    <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
                </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
                <OverviewItem>
                    <span>Total Sypply:</span>
                    <span>{tickersData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Max Supply:</span>
                    <span>{tickersData?.max_supply}</span>
                </OverviewItem>
            </Overview>
            {/* Chart, Price 탭 제작, Route를 사용하기때문에 button같은거 만들 필요 X */}
            <Tabs>
                {/* Tab에 props 전달 */}
                <Tab isActive={priceMatch !== null}>
                    <Link to={`/${coinId}/price`}>Price</Link>
                </Tab>
                <Tab isActive={chartMatch !== null}>
                    <Link to={`/${coinId}/chart`}>Chart</Link>
                </Tab>
            </Tabs>

            <Routes>
                {/* 상대경로 지원 */}
                <Route path="chart" element={<Chart coinId={coinId!} />}/>
                <Route path="price" element={<Price coinId={coinId!}/>}/>
                
            </Routes>
            </>
    )}

    </Container>
}
export default Coin;