import Chart from "../components/Chart";
import CoinCard from "../components/CoinCard";
import Header from "../components/Header";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";


const MainWrapper = styled.div`
  display: flex;
  margin-top: 25px;
  `;

function MoreInfo() {
  const { id } = useParams();


  return (
    <>
      <Header></Header>
      <MainWrapper>
        <CoinCard id={id}></CoinCard>
        <Chart id={id}></Chart>
      </MainWrapper>
    </>
  );
}

export default MoreInfo;
