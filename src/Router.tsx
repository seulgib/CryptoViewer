import React from "react";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function Router(){
    //return 다음에 줄바꿈이 있으면, 
    //그 줄에서 반환문이 종료된 것으로 간주
    
    return ( 
        <BrowserRouter>
        <Routes>
            <Route path="/:coinId/*" element={<Coin />} />
            <Route path="/" element={<Coins />} />
        </Routes>
    </BrowserRouter>

    )

}
export default Router;
