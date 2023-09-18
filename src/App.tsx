import React from "react";
import "./App.css";

import Footer from "./components/Footer";
import Time from "./components/Time";
import Metrics from "./components/Metrics";

function App() {
  return (
    <div className="App">
      <main className="App-main">
        <Time />
        <Metrics />
      </main>

      <Footer />
    </div>
  );
}

export default App;
