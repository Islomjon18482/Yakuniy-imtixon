import styled from "@emotion/styled";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from "@mui/styles";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import EyeIcon from "../assets/Eye.svg";
import White from "../assets/White.svg"

const TableWrapper = styled.div`
  margin: 18px auto;
  text-align: center;
  width: max-content;
  h2 {
    color: rgb(255, 255, 255);
    font-family: Montserrat;
    font-size: 34px;
    font-weight: 400;
    line-height: 41.99px;
    letter-spacing: 0.25px;
    text-align: center;
  }
  table {
    width: 1232px;
  }
  thead tr {
    background-color: rgba(135, 206, 235, 1);
    padding: 19px 16px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-top-right-radius: 1px;
    border-top-left-radius: 1px;
  }
  tbody tr {
    padding: 16px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(81, 81, 81, 1);
  }
  tbody td .table__text {
    display: flex;
    flex-direction: column;
  }
  .tdWrapper {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  td {
    color: rgb(255, 255, 255);
    font-size: 14px;
    font-weight: 400;
    line-height: 20.02px;
    letter-spacing: 0.15px;
    text-align: right;
  }
  .table__text h2 {
    color: rgb(255, 255, 255);
    font-size: 22px;
    font-weight: 400;
    line-height: 31.46px;
    letter-spacing: 0.15px;
    text-align: left;
    text-transform: uppercase;
  }
  .table__text p {
    color: rgb(169, 169, 169);
    font-size: 14px;
    font-weight: 400;
    line-height: 20.02px;
    letter-spacing: 0.15px;
    text-align: left;
  }
`;

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "skyblue",
    },
  },
}));

function Table() {
  const [symbol, setSymbol] = useState();
  const [currency, setCurrency, watchCard, setWatchCard] = useContext(UserContext);
  const [trending, setTrending] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [show, setShow] = useState(false)

  function heandleThrow(el){
    const isIncludes = watchCard.some((element) =>  element.id == el.id);
    console.log(isIncludes)
    if(!isIncludes){
      setWatchCard(prevData => [...prevData, el])
    }
    localStorage.setItem("watchList", JSON.stringify(watchCard))
  }


  const fetchData = async () => {
    setShow(true)
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=${pageNumber}&sparkline=false&price_change_percentage=24h`
      );
      setTrending(response.data);
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
  }, [pageNumber, currency]);

  const classes = useStyles();

  return (
    <>
      <TableWrapper>
        <h2>Cryptocurrency Prices by Market Cap</h2>
        <TextField
          sx={{
            margin: "12px 0px 20px 0px",
            border: "1px solid rgba(255, 255, 255, 0.23)",
            borderRadius: "4px",
            ":focus": {
              bgcolor: "rgb(56, 199, 255)",
            },
          }}
          fullWidth
          placeholder="Search For a Crypto Currency.."
          id="fullWidth"
          InputProps={{
            style: { color: "rgba(255, 255, 255, 0.7)" },
          }}
        />
        <table>
          <thead>
            <tr>
              <th style={{ width: "36.15%", textAlign: "left" }}>Coin</th>
              <th style={{ width: "21.35%", textAlign: "right" }}>Price</th>
              <th style={{ width: "21.01%", textAlign: "right" }}>
                24h Change
              </th>
              <th style={{ width: "21.49%", textAlign: "right" }}>
                Market Cap
              </th>
            </tr>
          </thead>
          {
            show ? <CircularProgress
            style={{ color: "skyblue" }}
            size={250}
            thickness={1}
          /> :
          <tbody>
            {trending?.map((el, index) => {
              const profit = el.price_change_percentage_24h >= 0;
              const isInclude = watchCard.some((item)=>{
                return item.id == el.id
              })
              console.log(isInclude)
              return (
                <Link to={`/more/${el.id}`} onClick={() => heandleThrow(el)}>
                  <tr key={index}>
                    <td style={{ minWidth: "36.15%", textAlign: "left" }}>
                      <div className="tdWrapper">
                        <img width={50} src={el.image} />
                        <div className="table__text">
                          <h2>{el.symbol}</h2>
                          <p>{el.name}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ minWidth: "21.35%", textAlign: "right" }}>
                      {symbol} {numberWithCommas(el.current_price.toFixed(2))}
                    </td>
                    <td
                      style={{
                        minWidth: "21.01%",
                        textAlign: "right",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        gap: "18px",
                      }}
                    >
                      <img src={isInclude ? White  : EyeIcon} />{" "}
                      <span
                        style={{
                          color: profit ? "rgba(14, 203, 129, 1)" : "red",
                        }}
                      >
                        {profit ? "+" : ""}
                        {el.price_change_percentage_24h.toFixed(2)} %{" "}
                      </span>
                    </td>
                    <td style={{ minWidth: "21.49%", textAlign: "right" }}>
                      {symbol} {el.market_cap.toString().slice(0, -6)}M
                    </td>
                  </tr>
                </Link>
              );
            })}
          </tbody>
          }
          
        </table>
      </TableWrapper>
      <Pagination
        count={10}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.ul }}
        onChange={(_, value) => {
          setPageNumber(value);
          window.scroll(0, 450);
        }}
        color="primary"
      />
    </>
  );
}

export default Table;
