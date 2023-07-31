import { useState } from "react";
import { MantineProvider, AppShell, Navbar, Header } from "@mantine/core";
import { SimpleNavBar } from "./Components/SimpleNavBar";
import ShippersPage from "./Pages/ShippersPage";
import ShipperBusinessReviewPage from "./Pages/ShipperBusinessReviewPage";
function App() {
  return (
    <MantineProvider
      // theme={{ fontFamily: "Open Sans" }}
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
        {<ShipperBusinessReviewPage />}
      </AppShell>
    </MantineProvider>
  );
}

export default App;
