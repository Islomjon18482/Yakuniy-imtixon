import styled from "@emotion/styled";
import Carousel from "../elements/Carusel";

const SlayderWrapper = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  padding: 34px;
  background-image: url(https://s3-alpha-sig.figma.com/img/caf5/016f/97f154adfd88d0e48d9a7fc87e5ab035?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HDk5f5EpidKB9yrKEGJ9eXDMpGTY-HwrXxyTsJjK6qdeB~jW1oSLEnuL6uyYGk4X7~8YMrLPzF8y5frRv2A0ZDmHlxWRaFqlB4V8~3EXJ~9oeL0czb8Nw7y~rhh-N3flC38zbHHxPWGomCkBU89fdOTufJZWyFiCXHGGBYyV~Nby4cAlgx5yuuKbw6Woxnt9z4R0emiPnDCisFXkUZ4wmCYnbAdosxiJIKTZloKii5JC4CpH1NpxhQ1N1gZb-tFsoNj~MhVy4MYdFMzX6OGVdgP4OcZaP9PDwqST11pX0ozAbOht95IyCcAj7YEIBXeNUqcGxoivRDY-1cMBL-h8DA__);
  h2 {
    color: rgb(135, 206, 235);
    font-size: 60px;
    font-weight: 700;
    line-height: 72px;
    font-family: Montserrat;
    letter-spacing: -0.5px;
    text-align: center;
  }
  p {
    color: rgb(169, 169, 169);
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    line-height: 21.98px;
    letter-spacing: 0.1px;
    text-align: center;
    text-transform: capitalize;
    margin-bottom: 42px;
  }
  .carusel {
    height: 50%;
    display: flex;
    align-items: center;
  }
  .slide-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
  }
`;

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Slayder() {
  return (
    <SlayderWrapper>
      <h2>CRYPTOFOLIO WATCH LIST</h2>
      <p>Get all the Info regarding your favorite Crypto Currency</p>
      <Carousel></Carousel>
    </SlayderWrapper>
  );
}

export default Slayder;
