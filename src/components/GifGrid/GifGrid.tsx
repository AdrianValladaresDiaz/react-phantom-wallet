import React, { ReactElement } from "react";
import { GifArray } from "../../interfaces/gif";
import StyledGifGrid from "./GifGrid.styles";

type GifGridProps = {
  gifArr: GifArray;
};

const GifGrid = ({ gifArr }: GifGridProps): ReactElement => (
  <StyledGifGrid className="gif-grid container">
    {gifArr.map((gif) => (
      <div className="gif-item" key={gif.gifLink}>
        <img src={gif.gifLink} alt={gif.gifLink} />
      </div>
    ))}
  </StyledGifGrid>
);

export default GifGrid;
