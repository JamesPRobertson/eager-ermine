import { AppShell, Burger, Button, Group, Text } from "@mantine/core";

import classes from "./App.module.css";
import { useDisclosure } from "@mantine/hooks";
import { Router } from "./Router";

function App() {
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
          <Button component="a" href="/">Landing Page</Button>
          <Button component="a" href="/items">Items</Button>
          <Button component="a">Buildings</Button>
          <Button component="a">Recipes</Button>
          <Button component="a">Planner</Button>
        </AppShell.Navbar>
        <AppShell.Main>
        </AppShell.Main>
      </AppShell>
    </div>
  )
}

export default App;
