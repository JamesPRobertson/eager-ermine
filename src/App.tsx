import { AppShell, Burger, Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet } from "react-router-dom";

import classes from "./App.module.css";

export const App = () => {
  const [isNavOpen, {toggle: toggleNavOpen}] = useDisclosure(true);

  return(
    <div className={classes.appMain}>
      <AppShell
        header={{height: 40}}
        navbar={{width: 200, breakpoint: "sm", collapsed: { desktop: isNavOpen}}}
        classNames={{navbar: classes.navbar}}
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
