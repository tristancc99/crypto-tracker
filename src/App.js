import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "react-sidebar";
import { useForm } from "react-hook-form";
import CoinCard from "./components/CoinCard";
import SearchForm from "./components/SearchForm";
import CoinSearchResults from "./components/CoinSearchResults";
import ListGroup from "react-bootstrap/ListGroup";

const root = document.querySelector("#root");

const App = () => {
  const { register, handleSubmit, errors } = useForm();

  let [coins, setCoins] = useState([]);
  let [sidebarOpen, setSidebarOpen] = useState(true);
  let [tracking, setTracking] = useState([]);

  const url = "https://api.coinranking.com/v1/public/coins";

  useEffect(() => {
    axios.get(url).then(function(response) {
      setCoins(response.data.data.coins);
    });
  }, []);

  const onSubmit = data => {
    axios
      .get(
        `https://api.coinranking.com/v1/public/coins?prefix=${data.searchCoins}`
      )
      .then(response => setCoins(response.data.data.coins));
  };

  function trackCoin(e) {
    console.log(e.target.getAttribute("data-id"));
    let coinID = e.target.getAttribute("data-id");
    axios
      .get(`https://api.coinranking.com/v1/public/coin/${coinID}`)
      .then(function(response) {
        console.log(response);
        let trackee = response.data.data.coin;
        trackee.isViewed = false;
        setTracking([...tracking, trackee]);
        console.log(trackee);
        axios
          .post("http://localhost:3000/api/tracking", {
            id: `${trackee.id}`,
            name: trackee.name
          })
          .then(response => console.log(response));
      });
  }

  function removeCoin(id) {
    axios
      .delete(`https://localhost:3000/api/tracking/${id}`)
      .then(function(response) {
        setTracking(response);
      });
  }

  console.log(coins, tracking);

  return (
    <div>
      <Sidebar
        sidebar={
          <div>
            <SearchForm submit={onSubmit} />
            <CoinSearchResults track={trackCoin} coinList={coins} />
          </div>
        }
        open={sidebarOpen}
        docked={true}
        style={{ sidebar: { background: "grey" } }}
      >
        <div className="content">
          <h1>&#x1F50D; Crypto Tracker</h1>
          <hr />
          <div className="trackingList">
            <ListGroup variant="flush">
              {tracking &&
                tracking.map(trackee => (
                  <CoinCard data={trackee} remove={removeCoin} />
                ))}
            </ListGroup>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default App;
