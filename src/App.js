import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Sidebar from "react-sidebar";
import { useForm } from "react-hook-form";
import CoinCard from "./components/CoinCard";

const root = document.querySelector("#root");

const App = () => {
  const { register, handleSubmit, errors } = useForm();

  let [coins, setCoins] = useState();
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
        setTracking([...tracking, response.data.data.coin]);
      });
  }

  console.log(coins, tracking);

  return (
    <div>
      <Sidebar
        sidebar={
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="search"
                placeholder="Search symbol (BTC)"
                name="searchCoins"
                ref={register}
              />

              <input type="submit" />
            </form>
            <ListGroup variant="flush">
              {coins &&
                coins.map(coin => (
                  <ListGroup.Item key={coin.id}>
                    {coin.name}
                    <div>
                      <Button
                        onClick={trackCoin}
                        data-id={coin.id}
                        variant="dark"
                        style={{ alignContent: "right" }}
                      >
                        Track
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
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
            {tracking && tracking.map(trackee => <CoinCard data={trackee} />)}
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default App;
