import React, { ReactElement } from "react";
import StyledGifGrid from "./GifGrid.styles";

type GifGridProps = {
  gifArr: string[];
};

const GifGrid = ({ gifArr }: GifGridProps): ReactElement => (
  <StyledGifGrid className="gif-grid container">
    {gifArr.map((gifUrl) => (
      <div className="gif-item" key={gifUrl}>
        <img src={gifUrl} alt={gifUrl} />
      </div>
    ))}
  </StyledGifGrid>
);

export default GifGrid;
