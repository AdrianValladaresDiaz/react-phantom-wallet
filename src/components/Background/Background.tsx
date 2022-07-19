import React, { ReactElement, useContext } from "react";
import { UserContext, UserState } from "../../state/userState/userContext";

const Background = (): ReactElement => {
  const { user, loggedIn } = useContext(UserContext) as UserState;
  // return <div className="background" />;
  return (
    <div className="background">
      <p>{`user is: ${user}`}</p>
      <p>{`is logged in?: ${loggedIn}`}</p>
    </div>
  );
};

export default Background;
