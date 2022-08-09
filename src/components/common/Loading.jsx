import React from "react";
import { Circles, TailSpin } from "react-loader-spinner";

function Loading() {
  return (
    <>
      <TailSpin
        type="Oval"
        color="#3d66ba"
        height={30}
        width={30}
        timeout={3000}
      />
    </>
  );
}

export default Loading;
