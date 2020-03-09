import React from "react"
import ReactDOM from "react-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Card from "react-bootstrap/Card"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import timestampToDate from "timestamp-to-date"
import ListGroup from "react-bootstrap/ListGroup"

const CoinCard = props => {
  let [graphData, setGraphData] = useState()

  function getGraphData(e) {
    axios
      .get(
        `https://api.coinranking.com/v1/public/coin/${
          props.data.id
        }/history/${e.target.getAttribute("data-time")}`
      )
      .then(function(response) {
        setGraphData(response.data.data.history)
      })

    if (e.target.className == "graphButton") {
      props.data.isViewed = !props.data.isViewed
    }
  }

  console.log(graphData)
  console.dir(props.data.isViewed)

  if (graphData) {
    graphData.map(point => {
      point.timestamp = timestampToDate(point.timestamp, "MM-dd").toString()
    })
  }

  return (
    <ListGroup.Item key={props.data.id}>
      <h3>
        {props.data.name} &#124;
        <img
          src={props.data.iconUrl}
          height="30px"
          width="30px"
          style={{ marginLeft: "1%", marginRight: "1%" }}
        />
        &#124;
        <ul className="socials">
          {props.data.socials.map(social => (
            <a
              href={social.url}
              target="_blank"
              className={`fa fa-${social.type}`}
            />
          ))}
        </ul>
        &#124; Rank #{props.data.rank}
      </h3>
      <h4>
        Current Price : $
        {props.data.price > 1 ? Math.round(props.data.price) : props.data.price}
      </h4>
      <p>{props.data.description}</p>

      {props.data.isViewed && graphData && (
        <div style={{ width: "90%", height: "400px" }}>
          Change over
          <ul>
            <button
              data-time="1y"
              onClick={getGraphData}
              className="timeFrameSelector"
            >
              1 Year
            </button>
            <button
              data-time="30d"
              onClick={getGraphData}
              className="timeFrameSelector"
            >
              30 Days
            </button>
            <button
              data-time="7d"
              onClick={getGraphData}
              className="timeFrameSelector"
            >
              7 Days
            </button>
            <button
              data-time="24h"
              onClick={getGraphData}
              className="timeFrameSelector"
            >
              24 Hours
            </button>
          </ul>
          <ResponsiveContainer>
            <LineChart data={graphData}>
              <Line
                type="monotone"
                dataKey="price"
                stroke={props.data.color ? props.data.color : "#000000"}
              />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="timestamp" />
              <YAxis dataKey="price" padding={{ top: 100 }} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      <button data-time="1y" onClick={getGraphData} className="graphButton">
        Graph...
      </button>
    </ListGroup.Item>
  )
}

export default CoinCard

/* <Card
className="bg-dark text-white"
style={
  !props.data.isViewed
    ? { width: "20rem", margin: "3rem" }
    : { width: "60rem", margin: "3rem" }
}
key={props.data.id}
>
<Card.Img
  src={props.data.iconUrl}
  style={{ opacity: "0.35" }}
  alt="Card image"
/>
<Card.ImgOverlay>
  <Card.Title>
    {props.data.name}
    <button className="removeButton">&times;</button>
  </Card.Title>
  <Card.Text>{props.data.description}</Card.Text>
  <Card.Text>Price currently at : ${props.data.price}</Card.Text>
  {props.data.isViewed && graphData && (
    <div>
      <LineChart width={600} height={400} data={graphData}>
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="timestamp" />
        <YAxis dataKey="price" padding={{ top: 100 }} />
        <Tooltip />
      </LineChart>
    </div>
  )}

  <button onClick={getGraphData} className="graphButton">
    Graph...
  </button>
</Card.ImgOverlay>
</Card> */
