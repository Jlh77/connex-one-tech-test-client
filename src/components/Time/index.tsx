import React, { useEffect, useState } from "react";
import "./Time.css";

import config from "../../config.json";
import Loading from "../Loading";

const Time = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [serverTime, setServerTime] = useState(Date.now());
  const [clientTime, setClientTime] = useState(Date.now());

  useEffect(() => {
    getServerTime();

    const dataRefreshCallInterval = setInterval(getServerTime, 30000);

    const everySecondRefreshInterval = setInterval(() => {
      setClientTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(dataRefreshCallInterval);
      clearInterval(everySecondRefreshInterval);
    };
  }, []);

  const getServerTime = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`${config.serverURI}/time`, {
        headers: { authorization: config.clientSecret },
      });

      if (!res.ok) throw new Error(res.statusText);

      const { epoch } = await res.json();

      setServerTime(epoch);
      setIsLoading(false);
    } catch (err) {
      console.error("[getServerTime Err]: ", err);
      setErr(true);
      setIsLoading(false);
    }
  };

  const getClientServerDifference = () => {
    const timeDiff =
      (Math.floor(clientTime / 1000) - Math.floor(serverTime / 1000)) * 1000;

    return new Date(timeDiff).toISOString().slice(11, 19);
  };

  return (
    <div className="time">
      <h1>/time</h1>

      <h2>Time on server in epoch</h2>

      {isLoading && <Loading />}

      {err && "An error has occured."}

      {!isLoading && (
        <>
          <div>{serverTime}</div>

          <h2>Difference between server & client:</h2>
          <p>{getClientServerDifference()}</p>
        </>
      )}
    </div>
  );
};

export default Time;
