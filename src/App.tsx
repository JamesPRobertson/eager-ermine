import { AppShell, Group, rem, Text, Tooltip, UnstyledButton } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { useState } from 'react';

import {
  MdHouse,
  MdOutlineAddBox,
  MdFactory,
  MdMenuBook,
  MdGridOn,
  MdForest
} from "react-icons/md";

import classes from "./App.module.css";

interface NavbarLinkProps {
  icon: typeof MdHouse;
  label: string;
  target: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, target, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        component={Link}
        to={target}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(32), height: rem(32) }} />
      </UnstyledButton>
    </Tooltip>
  );
}

const navOptions = [
  { icon: MdHouse, label: "Home", target: "/home" },
  { icon: MdOutlineAddBox, label: "Items", target: "/items"  },
  { icon: MdFactory, label: "Buildings", target: "/buildings"  },
  { icon: MdMenuBook, label: "Recipes", target: "/recipes"  },
  { icon: MdGridOn, label: "Planner", target: "/planner"  }
]

export const App = () => {
  const [active, setActive] = useState(0);

  const links = navOptions.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return(
    <div className={classes.appMain}>
      <AppShell
        header={{height: 40}}
        navbar={{width: 75, breakpoint: "sm", collapsed: { desktop: false} }}
        classNames={{navbar: classes.navbar}}
      >
        <AppShell.Header>
          <Group px="md" h="100%">
            <MdForest style={{width: rem(25), height: rem(25), marginLeft: 8, fill: "green" }}/>
            <Text>EE Factory Planner</Text>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          {links}
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </div>
  )
}
