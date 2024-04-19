import styled from "@emotion/styled";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";

const CoinCardWrapper = styled.div`
  width: 547px;
  height: 787px;
  padding: 0px 25px;
  border-right: 2px solid rgb(128, 128, 128);
  img {
    margin: 0px auto;
    display: flex;
    margin-bottom: 20px;
  }
  h2 {
    color: rgb(255, 255, 255);
    font-family: Montserrat;
    font-size: 48px;
    font-weight: 700;
    line-height: 56.02px;
    letter-spacing: 0%;
    text-align: center;
    margin-bottom: 20px;
  }
  p {
    color: rgb(255, 255, 255);
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0.15px;
    text-align: left;
    margin-bottom: 30px;
  }
  h3 {
    margin-bottom: 20px;
    color: rgb(255, 255, 255);
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 700;
    line-height: 32.02px;
    letter-spacing: 0%;
    text-align: left;
  }
  span {
    color: rgb(255, 255, 255);
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 400;
    line-height: 32.02px;
    letter-spacing: 0%;
    text-align: left;
  }
`;

function CoinCard({ id }) {
  const [symbol, setSymbol] = useState();
  const [coinInfo, setCoinInfo] = useState();
  const [currency, setCurrency, watchCard, setWatchCard] =
    useContext(UserContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    fetchData();
    localStorage.setItem("watchList", JSON.stringify(watchCard));
  }, []);

  const fetchData = async () => {
    setShow(true)
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoinInfo(response.data);
      setShow(false)
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
    }
  };

  useEffect(() => {
    fetchData();
    if (currency == "USD") {
      setSymbol("$");
    } else if (currency == "EUR") {
      setSymbol("₹");
    } else {
      setSymbol("₽");
    }
  }, [currency]);

  return (
    <>
      {show ? (
        <Stack spacing={1} sx={{padding: "0px 25px"}}>
          {" "}
          <Skeleton variant="text" height={60} sx={{ fontSize: "1rem" }} />
          <Skeleton variant="circular" width={100} height={100} />
          <Skeleton variant="rectangular" width={547} height={250} />
          <Skeleton variant="rounded" width={547} height={270} />
        </Stack>
      ) : (
        <CoinCardWrapper>
          <img src={coinInfo?.image.large} />
          <h2>{coinInfo?.name}</h2>
          <p>{coinInfo?.description.en.split(". ")[0]}</p>
          <h3>
            Rank: <span> {coinInfo?.market_cap_rank}</span>
          </h3>
          <h3>
            Current Price:{" "}
            <span>
              {" "}
              {symbol}{" "}
              {coinInfo?.market_data.current_price[currency.toLowerCase()]}
            </span>
          </h3>
          <h3>
            Market Cap:{" "}
            <span>
              {" "}
              {symbol}{" "}
              {coinInfo?.market_data.market_cap[currency.toLowerCase()]}M
            </span>
          </h3>
        </CoinCardWrapper>
      )}
    </>
  );
}

export default CoinCard;
