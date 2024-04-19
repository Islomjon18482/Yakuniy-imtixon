import styled from "@emotion/styled";
import Logo from "../assets/Logo.svg";
import Btn from "../elements/Btn";
import SelectCurrency from "../elements/SelectCurrency";

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 12px 180px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.12),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header__btns {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <img src={Logo} alt="Logo icon" />
      <div className="header__btns">
        <SelectCurrency></SelectCurrency>
        <Btn></Btn>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
