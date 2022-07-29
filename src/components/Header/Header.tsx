import React, { useContext } from "react";
import { logoutUserAction } from "../../state/userState/actionCreators";
import { context as userContext } from "../../state/userState/userContext";
import Button from "../Button/Button";
import StyledHeader from "./Header.styles";

const Header = () => {
  const { state: userState, dispatch: userDispatch } = useContext(userContext);
  const logOut = () => {
    userDispatch(logoutUserAction());
  };
  return (
    <StyledHeader>
      <div>
        <h1>Summer Time Animations</h1>
        {userState.user && <p>{`Logged in as: ${userState.user}`}</p>}
      </div>
      <Button onClick={logOut} content="log me out" />
    </StyledHeader>
  );
};

export default Header;
