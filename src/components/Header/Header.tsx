import React, { useContext } from "react";
import { UserContext } from "../../state/userState/userContext";
import Button from "../Button/Button";
import StyledHeader from "./Header.styles";

const Header = () => {
  const { user } = useContext(UserContext);
  const logOut = () => {};
  return (
    <StyledHeader>
      <div>
        <h1>Summer Time Animations</h1>
        {user && <p>{`Logged in as: ${user}`}</p>}
      </div>
      <Button onClick={logOut} content="log me out" />
    </StyledHeader>
  );
};

export default Header;
