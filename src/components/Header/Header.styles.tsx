import styled from "styled-components";

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center
  color: black;
  padding: 0.05rem;
  widht: 100%;
  top: 0;
  background-color: papayawhip;
  h1 {
    margin-top: 0.5em;
    margin-bottom: 0.2em;
  }
  p {
    padding-top: 0;
    margin-top: 0;
  }
  button {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    &:hover {
      color: deeppink;
      border-color: deeppink;
    }
  }
`;

export default StyledHeader;
