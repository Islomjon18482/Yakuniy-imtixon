import { useEffect, useState } from "react";
import axios from "axios";
import "react-alice-carousel/lib/alice-carousel.css";
import styled from "@emotion/styled";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
  color: white;
  cursor: pointer;
`;

const CarouselItem = styled.div`
  display: flex;
  align-items: center;
`;

const Carousel = () => {
  const [currency, setCurrency] = useContext(UserContext);
  const [trending, setTrending] = useState();
  const [symbol, setSymbol] = useState()

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);
      setTrending(response.data)
    } catch (error) {
      console.error('Ma\'lumotlarni yuklashda xatolik:', error);
    }
  };

  useEffect(()=>{
    fetchData()
    if(currency == "USD"){
      setSymbol("$")
    }else if (currency == "EUR") {
      setSymbol("₹")
    } else {
      setSymbol("₽")
    }
  }, [currency])


  const items = trending?.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link to={`/more/${coin.id}`}>
      <CarouselWrapper key={coin.id}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin.symbol}
          &nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol}{coin.current_price.toFixed(2)}
        </span>
      </CarouselWrapper>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    1024: {
      items: 4,
    },
  };

  return (
    <CarouselItem>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </CarouselItem>
  );
};

export default Carousel;
