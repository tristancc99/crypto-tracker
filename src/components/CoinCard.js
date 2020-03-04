import React from "react"
import ReactDOM from "react-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Card from "react-bootstrap/Card"

const CoinCard = props => {
  return (
    <Card
      className="bg-dark text-white"
      style={{ width: "20rem", margin: "3rem" }}
    >
      <Card.Img
        src={props.data.iconUrl}
        style={{ opacity: "0.35" }}
        alt="Card image"
      />
      <Card.ImgOverlay>
        <Card.Title>{props.data.name}</Card.Title>
        <Card.Text>{props.data.description}</Card.Text>
        <Card.Text>Price currently at : ${props.data.price}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  )
}

export default CoinCard
