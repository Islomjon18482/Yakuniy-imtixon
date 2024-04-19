import Home from "./pages/Home";
import MoreInfo from "./pages/MoreInfo";
import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const UserContext = createContext();

function App() {
  const [currency, setCurrency] = useState("USD");
  const [watchCard, setWatchCard] = useState(JSON.parse(localStorage.getItem("watchList")) || [])

  

  return (
    <UserContext.Provider value={[currency, setCurrency, watchCard, setWatchCard]}>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/more/:id" element={<MoreInfo></MoreInfo>}></Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
