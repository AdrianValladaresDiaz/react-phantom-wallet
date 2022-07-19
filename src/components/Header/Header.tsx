import React, { useContext } from "react";
import { UserContext } from "../../state/userState/userContext";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header>
      <div>
        <h1>Summer Time Animations</h1>
        {user && <p>{`Logged in as: ${user}`}</p>}
      </div>
    </header>
  );
};

export default Header;
