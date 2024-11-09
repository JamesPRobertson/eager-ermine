import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useViewportSize } from "@mantine/hooks";

import { MdHouse, MdAddBox, MdFactory, MdMenuBook, MdGridOn, MdSettings } from "react-icons/md";

import { NavbarLink } from "components/NavbarLink/NavbarLink";

import classes from "./App.module.css";

// TODO: add a little divider between home and the rest
const navOptions = [
  { icon: MdHouse, label: "Home", target: "/home" },
  { icon: MdAddBox, label: "Items", target: "/items" },
  { icon: MdFactory, label: "Buildings", target: "/buildings" },
  { icon: MdMenuBook, label: "Recipes", target: "/recipes" },
  { icon: MdGridOn, label: "Planner", target: "/planner" },
  { icon: MdSettings, label: "Settings", target: "/settings" }
];

// Change this up, we need some flexibility. Maybe another real component? Move these out?
export const App = () => {
  const [active, setActive] = useState<string>("");
  const { height } = useViewportSize();

  const links = navOptions.map((entry) => (
    <NavbarLink {...entry} key={entry.label} active={entry.label === active} onClick={() => setActive(entry.label)} />
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
