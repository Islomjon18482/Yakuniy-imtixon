import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";
import {CircularProgress, createTheme, ThemeProvider, } from "@mui/material";
import { makeStyles } from '@mui/styles';
import SelectButton from "../elements/SelectDate";
import { useContext } from "react";
import { UserContext } from "../App";

const Chart = ({id}) => {
  const [currency, setCurrency] = useContext(UserContext);
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [show, setShow] = useState(false)

  const fetchData = async () => {
    setShow(true)
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      setHistoricData(response.data.prices);
      setShow(false)
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [days]);

  
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40
    },
  }));

  const classes = useStyles();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });


  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData || show ? (
          <CircularProgress
            style={{ color: "skyblue" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData?.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "skyblue",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                }
              }}
              
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {[1, 30, 90, 365].map((day) => (
                <SelectButton
                  key={day}
                  onClick={() => {
                    setDays(day);
                  }}
                  selected={day === days}
                >
                  {day} day
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Chart;
