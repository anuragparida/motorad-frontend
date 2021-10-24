import React from "react";
import Spinner from "react-loader-spinner";

export default function Loader(props) {
  return (
    <div className={props.className + " d-inline-block"}>
      {/* <Spinner type="ThreeDots" color="#FF4141" height={30} width={30} /> */}
      <Spinner type="ThreeDots" color="#10B068" height={30} width={30} />
    </div>
  );
}
