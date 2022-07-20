import styled from "styled-components";

const StyledGifGrid = styled.article`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  .gif-item {
    display: flex;
    flex-direction: column;
    position: relative;
    justify-self: center;
    align-self: center;
    margin: 15px;
    img {
      width: 100%;
      height: 300px;
      border-radius: 10px;
      object-fit: cover;
    }
  }
`;

export default StyledGifGrid;
