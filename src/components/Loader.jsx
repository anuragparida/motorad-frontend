import React from "react";
import Spinner from "react-loader-spinner";

export default function Loader(props) {
  return (
    <div className={props.className + " d-inline-block"}>
      {/* <Spinner type="ThreeDots" color="#FF4141" height={30} width={30} /> */}
      <Spinner type="ThreeDots" height={30} width={30} className="loaderSpinner"/>
    </div>
  );
}
