import React from "react";
import { Grid } from "@mantine/core";

const ShipperBusinessReviewPage = () => {
  return (
    <div>
      <h2>Shipper1 - Business Review</h2>
      <h3>Shippers / Shipper1</h3>
      <br />
      <div class="charts">
        <Grid>
          <Grid.Col span={6}>Chart 1</Grid.Col>
          <Grid.Col span={6}>Chart 2</Grid.Col>
        </Grid>
      </div>
      <br />
      <div class="trip-data">
        <h2>Trips</h2>
        <h3>Table here</h3>
      </div>
    </div>
  );
};

export default ShipperBusinessReviewPage;
