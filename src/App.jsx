import { useState } from "react";
import { MantineProvider, AppShell, Header } from "@mantine/core";
import { SimpleNavBar } from "./Components/SimpleNavBar";
import HomePage from "./Pages/HomePage";
import ShippersPage from "./Pages/ShippersPage";
import ShipperBusinessReviewPage from "./Pages/ShipperBusinessReviewPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  // init shipperdata to prop into shipper biz review page and shipper
  const [shipperData, setShipperData] = useState([
    {
      id: "recjLPXLxSKFtMHGc",
      name: "Coca Cola",
      tripsLink: "[URL for trips link]",
    },
    {
      id: "recRIiu9EgDBYcjFl",
      name: "Pepsi",
      tripsLink: "[URL for trips link]",
    },
  ]);

  return (
    <MantineProvider
      theme={{
        globalStyles: (theme) => ({
          "*, *::before, *::after": {
            boxSizing: "border-box",
          },

          body: {
            ...theme.fn.fontStyles(),
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight,
          },

          ".your-class": {
            backgroundColor: "red",
          },

          "#your-id > [data-active]": {
            backgroundColor: "pink",
          },
        }),
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Router>
        <AppShell
          padding="md"
          navbar={<SimpleNavBar />}
          header={
            <Header height={0} p="xs">
              ShipAmiga Dashboard
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to="/dashboard/home" />}
            ></Route>
            <Route path="/dashboard/home" element={<HomePage />} />
            <Route
              path="/dashboard/shippers"
              element={
                <ShippersPage
                  shipperData={shipperData}
                  setShipperData={setShipperData}
                />
              }
            />
            <Route
              path="/dashboard/shippers/businessreview/:id"
              element={<ShipperBusinessReviewPage shipperData={shipperData} />}
            />
          </Routes>
        </AppShell>
      </Router>
    </MantineProvider>
  );
}

export default App;
