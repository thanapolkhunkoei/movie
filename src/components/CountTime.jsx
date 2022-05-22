import React, { useEffect, useState } from "react";

const CountTime = ({ paymentShow, setPaymentShow }) => {
  const [count, setCount] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && setPaymentShow(false);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h4>With in :</h4>
      <h2 className="text-danger">{count}</h2>
    </div>
  );
};

export default CountTime;
