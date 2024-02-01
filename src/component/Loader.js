import { useState } from "react";

const Loader = () => {
  const [ctr, Updatectr] = useState(0);
  setInterval(() => {
    Updatectr((ctr + 1) % 10);
  }, 10000);
  return (
    <>
      <div className="section-center lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};
export default Loader;
