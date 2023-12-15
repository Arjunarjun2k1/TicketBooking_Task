import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import LoginPage from "./loginPage";
import BookTickets from "./bookTicket";

const App = ()=>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/bookTickets" element={<BookTickets/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;