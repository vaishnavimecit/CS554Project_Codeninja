import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

function StatsHook() {
  const [covidStats, setCovidStats] = useState(undefined);
  const [latest, setLatest] = useState(undefined);
  useEffect(() => {
    async function fetchData() {
      const covidData = await axios
        .get("https://coronavirus-tracker-api.herokuapp.com/v2/locations")
        .then((res) => {
          let response = res;
          setCovidStats(response.data.latest); //global stats
          return response.data.locations;
        });
      setLatest(covidData); //location stats
    }
    fetchData();
  }, []);
  return covidStats, latest;
}

function CovidGlobalTracker() {
  let stats,
    l_stats = StatsHook();
  const items = [];
  console.log(covidData);
  //console.log(l_stats);
  return (
    <div>
      <div>
        <p className="l_stats">l_stats</p>
      </div>
      <div>
        <p>map</p>
      </div>
    </div>
  );
}

export default CovidGlobalTracker;
