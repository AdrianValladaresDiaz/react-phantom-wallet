import React, { ReactElement } from "react";

const Background = (): ReactElement => <div className="background" />;

export default Background;

export const MemoizedBackground = React.memo(Background);
