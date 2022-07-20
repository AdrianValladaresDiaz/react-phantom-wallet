import React, { ReactElement } from "react";
import Background from "../Background/Background";
import Header from "../Header/Header";
import StyledMain from "./Layout.styles";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps): ReactElement => (
  <>
    <Background />
    <Header />
    <StyledMain>{children}</StyledMain>
  </>
);

Layout.defaultProps = {
  children: {},
};

export default Layout;
