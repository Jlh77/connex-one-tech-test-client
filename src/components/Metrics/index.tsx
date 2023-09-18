import React, { useEffect, useState } from "react";

import "./Metrics.css";

import config from "../../config.json";

const Time = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState("");

  useEffect(() => {
    getServerMetrics();
  }, []);

  const getServerMetrics = async () => {
    const res = await fetch(`${config.serverURI}/metrics`, {
      headers: { authorization: config.clientSecret },
    });

    const text = await res.text();

    console.log(text);

    setMetrics(text);
    setIsLoading(false);
  };

  return (
    <div className="metrics">
      <h2>Server Metrics</h2>
      {isLoading && "Loading..."}

      {metrics && <code className="metrics-box">{metrics}</code>}
    </div>
  );
};

export default Time;
