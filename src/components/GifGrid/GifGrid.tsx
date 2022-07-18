import React, { ReactElement } from "react";

type GifGridProps = {
  gifArr: string[];
};

const GifGrid = ({ gifArr }: GifGridProps): ReactElement => (
  <article className="gif-grid container">
    {gifArr.map((gifUrl) => (
      <div className="gif-item" key={gifUrl}>
        <img src={gifUrl} alt={gifUrl} />
      </div>
    ))}
  </article>
);

export default GifGrid;
