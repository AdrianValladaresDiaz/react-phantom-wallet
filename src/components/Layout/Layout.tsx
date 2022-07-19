import React, { ReactElement } from "react";

const Layout = ({ walletAddress }: any): ReactElement => (
  <div className="header-container">
    <p className="header">🏖 Summer Time Animations 🏖</p>
    <p>{walletAddress}</p>
    <p className="sub-text">View your GIF collection in the metaverse ✨</p>
  </div>
);

export default Layout;
