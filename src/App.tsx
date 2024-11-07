import { AppShell, Group, rem, Text, Tooltip, UnstyledButton } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useViewportSize } from "@mantine/hooks";

import { MdHouse, MdOutlineAddBox, MdFactory, MdMenuBook, MdGridOn, MdForest } from "react-icons/md";

import classes from "./App.module.css";

interface NavbarLinkProps {
  icon: typeof MdHouse;
  label: string;
  target: string;
  active?: boolean;
  onClick?(): void;
}

const NavbarLink = ({ icon: Icon, label, target, active, onClick }: NavbarLinkProps) => {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 125, transition: "fade-right" }}>
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
};

// TODO: add a little divider between home and the rest
const navOptions = [
  { icon: MdHouse, label: "Home", target: "/home" },
  { icon: MdOutlineAddBox, label: "Items", target: "/items" },
  { icon: MdFactory, label: "Buildings", target: "/buildings" },
  { icon: MdMenuBook, label: "Recipes", target: "/recipes" },
  { icon: MdGridOn, label: "Planner", target: "/planner" }
];

export const App = () => {
  const [active, setActive] = useState(0);
  const { height } = useViewportSize();

  const links = navOptions.map((link, index) => (
    <NavbarLink {...link} key={link.label} active={index === active} onClick={() => setActive(index)} />
  ));

  return (
    <div className={classes.appMain}>
      <AppShell
        navbar={{ width: 65, breakpoint: "sm", collapsed: { desktop: false } }}
        classNames={{ navbar: classes.navbar }}
        styles={{
          main: {
            height: height
          }
        }}
      >
        <AppShell.Navbar>{links}</AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </div>
  );
};
