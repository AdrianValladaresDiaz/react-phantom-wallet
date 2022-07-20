import styled from "styled-components";
import dimensions from "../../global_styles/dimensions";

const StyledMain = styled.main`
  box-sizing: border-box;
  width: 100vw;
  height: calc(100% - ${dimensions.headerHeight});
  top: ${dimensions.headerHeight};
  margin: 0;
  padding: 0;
  overflow-y: scroll;
`;

export default StyledMain;
