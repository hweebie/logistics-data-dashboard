import React from "react";
import { Grid } from "@mantine/core";

const ShipperBusinessReviewPage = () => {
  return (
    <div>
      <h2>Shipper1 - Business Review</h2>
      <p>Shippers / Shipper1</p>
      <br />
      <div class="charts">
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
      <div class="trip-data">
        <h2>Trips</h2>
        <p>Search bar, date filter</p>
        <p>Table</p>
      </div>
    </div>
  );
};

export default ShipperBusinessReviewPage;
