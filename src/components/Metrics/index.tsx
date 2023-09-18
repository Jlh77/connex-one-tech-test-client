import React, { useEffect, useState } from "react";

import "./Metrics.css";

import config from "../../config.json";
import Loading from "../Loading";

const Time = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [metrics, setMetrics] = useState<string | null>(null);

  useEffect(() => {
    getServerMetrics();
  }, []);

  const getServerMetrics = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`${config.serverURI}/metrics`, {
        headers: { authorization: config.clientSecret },
      });

      const text = await res.text();

      console.log(text);

      setMetrics(text);
      setIsLoading(false);
    } catch (err) {
      console.error("[getMetrics] err: ", err);
      setIsLoading(false);
      setErr(true);
    }
  };

  return (
    <div className="metrics">
      <h1>/metrics</h1>

      <h2>Server Metrics</h2>
      {isLoading && <Loading />}

      {err && "An error has occured."}

      {metrics && <code className="metrics-box">{metrics}</code>}
    </div>
  );
};

export default Time;
