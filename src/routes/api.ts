//fetcher function 생성
const BASE_URL=`https://api.coinpaprika.com/v1`;

export async function fetchCoins(){
    return fetch(`${BASE_URL}/coins`).then(response=>response.json());
}

//coinInfo 정보 fetch
export function fetchCoinInfo(coinId:string){
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response)=>response.json());
}

//priceData 정보 fetch
export function fetchCoinTickers(coinId:string){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response)=>response.json());
}

export function fetchCoinHistory(coinId:string){
    //const endDate=Math.floor(Date.now()/1000);
    //60*60*24*7 = 일주일을 초로 나타낸 것
    //const startDate=endDate-60*60*24*7;
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response)=>
    response.json()
    );
}
