import React from "react"
import ReactDOM from "react-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"

const CoinSearchItem = props => {
  const coinList = props.coinList
  const trackCoin = props.track

  return (
    <ListGroup variant="flush">
      {coinList &&
        coinList.map(coin => (
          <ListGroup.Item key={coin.id}>
            {coin.name}
            <div>
              <Button
                key={coin.id}
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
  )
}

export default CoinSearchItem
