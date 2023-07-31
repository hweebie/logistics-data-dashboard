import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

import { MantineProvider, AppShell, Navbar, Header } from "@mantine/core";

function App() {
  return (
    <MantineProvider
      theme={{ fontFamily: "Open Sans" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} height={500} p="xs">
            {/* First section with normal height (depends on section content) */}
            <Navbar.Section>First section</Navbar.Section>

            {/* Last section with normal height (depends on section content) */}
            <Navbar.Section>Second section</Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60} p="xs">
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
        {`App content`}
      </AppShell>
    </MantineProvider>
  );
}

export default App;
