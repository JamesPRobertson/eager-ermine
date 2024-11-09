import { rem, Tooltip, UnstyledButton } from "@mantine/core";
import { Link } from "react-router-dom";

import { MdHouse } from "react-icons/md";

import classes from "./NavbarLink.module.css";

interface NavbarLinkProps {
  icon: typeof MdHouse;
  label: string;
  target: string;
  active?: boolean;
  onClick?(): void;
}

export const NavbarLink = ({ icon: Icon, label, target, active, onClick }: NavbarLinkProps) => {
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
