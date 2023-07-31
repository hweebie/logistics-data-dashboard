import React from "react";
import { Grid } from "@mantine/core";
import { Link } from "react-router-dom";

const ShipperBusinessReviewPage = () => {
  return (
    <div>
      <h2>Shipper1 - Business Review</h2>
      <p>
        <Link to="/dashboard/shippers"> Shippers</Link> / Shipper1
      </p>
      <br />
      <div className="charts">
        <Grid>
          <Grid.Col span={6}>
            <h3>On-time delivery</h3> <br />
            Chart 1
          </Grid.Col>
          <Grid.Col span={6}>
            <h3>Total trips</h3> <br />
            Chart 2
          </Grid.Col>
        </Grid>
      </div>
      <br />
      <div className="trip-data">
        <h2>Trips</h2>
        <p>Search bar, date filter</p>
        <p>Table</p>
      </div>
    </div>
  );
};

export default ShipperBusinessReviewPage;
