import React, { useEffect, useState } from "react";
import "./Time.css";

import config from "../../config.json";

const Time = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [serverTime, setServerTime] = useState(null);

  useEffect(() => {
    getServerTime();
  }, []);

  const getServerTime = async () => {
    try {
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

  return (
    <div className="time">
      <h2>Time on server in epoch</h2>

      {isLoading && "Loading..."}

      {err && "An error has occured."}

      {serverTime || null}
    </div>
  );
};

export default Time;
