import { AppShell, Burger, Button, Group, Text } from "@mantine/core";

import classes from "./App.module.css";
import { useDisclosure } from "@mantine/hooks";

import { Link, Outlet, Routes, Route } from "react-router-dom";
import { ItemsPage } from "./pages/Items/ItemsPage";
import { LandingPage } from "./pages/LandingPage/LandingPage";

const AppLayout = () => {
  const [isNavOpen, {toggle: toggleNavOpen}] = useDisclosure(true);

  return(
    <div className={classes.appMain}>
      <AppShell
        header={{height: 40}}
        navbar={{width: 200, breakpoint: "sm", collapsed: { desktop: isNavOpen}}}
        classNames={{navbar: classes.navbar}}
        padding="md"
      >
        <AppShell.Header>
          <Group px="md" h="100%">
            <Burger opened={!isNavOpen} onClick={toggleNavOpen} />
            <Text>Eager Ermine</Text>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <Button component={Link} to="/home">Landing Page</Button>
          <Button component={Link} to="/items">Items</Button>
          <Button component={Link} to="/buildings">Buildings</Button>
          <Button component={Link} to="/recipes">Recipes</Button>
          <Button component={Link} to="/planner" disabled={true} >Planner</Button>
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="home" element={<LandingPage />}/>
        <Route path="items" element={<ItemsPage />}/>
      </Route>
      <Route path="*" element={<AppLayout />} />
    </Routes>
  )
}

export default App;
