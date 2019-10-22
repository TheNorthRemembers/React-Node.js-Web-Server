// @flow
import ReactDOM from "react-dom";
import React from "react";
import { Container, Grid } from "@material-ui/core";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import SearchFilters from "./SearchFilters";

type $Props = any;
type $State = any;

class App extends React.Component<$Props, $State> {
  render() {
    const data = [
      { name: "Data Point 1", uv: 400, pv: 2400, amt: 2400 },
      { name: "Data Point 2 ", uv: 300, pv: 2400, amt: 2400 },
      { name: "Data Point 3", uv: 150, pv: 2400, amt: 2400 },
    ];

    return (
      <Container>
        <Grid container justify="center" spacing={2}>
          React Node.js Web Server Starter Kit
        </Grid>
        <SearchFilters>
          <Grid container justify="center" spacing={2}>
            <LineChart width={600} height={300} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </Grid>
        </SearchFilters>
      </Container>
    );
  }
}

const root = document.getElementById("root");

if (root) {
  ReactDOM.render(<App />, root);
}
