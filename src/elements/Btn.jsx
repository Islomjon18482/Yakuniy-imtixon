import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";

const WatchListWrapper = styled.div`
  h2 {
    color: white;
    font-size: 30px;
    font-weight: 500;
    line-height: 24.5px;
    letter-spacing: 0.4px;
    text-align: center;
    text-transform: uppercase;
    margin-top: 32px;
    margin-bottom: 39px;
  }
  .itemsWrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 36px;
    padding: 0px 39px;
  }
  .card {
    border-radius: 25px;
    background: rgb(20, 22, 26);
    padding: 17px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 198px;
    height: 248px;
  }
  p {
    margin-top: 37px;
    color: rgb(255, 255, 255);
    font-size: 20px;
    font-weight: 400;
    line-height: 20.02px;
    letter-spacing: 0.15px;
    text-align: right;
    margin-bottom: 15px;
  }
  button {
    color: rgb(255, 255, 255);
    font-size: 20px;
    font-weight: 400;
    line-height: 20.02px;
    letter-spacing: 0.15px;
    text-align: right;
    border: none;
    padding: 4px 16px;
    background: rgb(255, 0, 0);
    cursor: pointer;
  }
`;

function Btn() {
  const [symbol, setSymbol] = useState();
  const [currency, setCurrency, watchCard, setWatchCard] =
    useContext(UserContext);

  useEffect(() => {
    if (currency == "USD") {
      setSymbol("$");
    } else if (currency == "EUR") {
      setSymbol("₹");
    } else {
      setSymbol("₽");
    }
  }, []);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  function heandleDelete(el) {
    setWatchCard(
      watchCard.filter((element) => {
        return element.id != el.id;
      })
    );
    localStorage.setItem(
      "watchList",
      JSON.stringify(
        watchCard.filter((element) => {
          return element.id != el.id;
        })
      )
    );
  }

  const list = (anchor) => (
    <Box
      sx={{
        width: 511,
        height: "100vh",
        backgroundColor: "rgba(81, 81, 81, 1)",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <WatchListWrapper>
        <h2>WATCHLIST </h2>
        <div className="itemsWrapper">
          {watchCard.map((el, index) => {
            return (
              <div className="card">
                <img width={118} src={el.image} />
                <p>
                  {symbol} {el.current_price}
                </p>
                <button onClick={() => heandleDelete(el)}>Remove</button>
              </div>
            );
          })}
        </div>
      </WatchListWrapper>
    </Box>
  );

  return (
    <>
      {["right"].map((anchor) => (
        <div key={anchor}>
          <Button
            sx={{
              backgroundColor: "rgb(135, 206, 235)",
              color: "rgb(20, 22, 26)",
              ":hover": {
                bgcolor: "rgb(56, 199, 255)",
              },
            }}
            onClick={toggleDrawer(anchor, true)}
            variant="contained"
          >
            WATCH LIST
          </Button>{" "}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </div>
      ))}
    </>
  );
}

export default Btn;
