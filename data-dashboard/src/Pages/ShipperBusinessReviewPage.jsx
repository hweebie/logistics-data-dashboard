import { useState, useEffect, React } from "react";
import { Grid } from "@mantine/core";
import { Link, useParams } from "react-router-dom";

const ShipperBusinessReviewPage = (props) => {
  //get shippername by shipper ID to display on page
  const [shipperName, setShipperName] = useState("");
  const shipperID = useParams();
  const getShipperName = () => {
    const tempArray = props.shipperData;
    const result = tempArray.find((item) => item.id === shipperID.id);
    setShipperName(result.name);
  };

  useEffect(() => {
    getShipperName();
  }, []);

  return (
    <div>
      <h2>{shipperName} - Business Review</h2>
      <p>
        <Link to="/dashboard/shippers"> Shippers</Link> / {shipperName}
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
