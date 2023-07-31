import { useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
} from "@mantine/core";
import { IconTruckDelivery } from "@tabler/icons-react";
import { Image } from "@mantine/core";
import { NavLink } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },

  version: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    ),
    color: theme.white,
    fontWeight: 700,
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    )}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.1
      ),
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background,
        0.15
      ),
      [`& .${getStylesRef("icon")}`]: {
        opacity: 0.9,
      },
    },
  },
}));

const data = [
  { link: "/dashboard/shippers", label: "Shippers", icon: IconTruckDelivery },
  { link: "/dashboard/settings", label: "OtherPage", icon: IconTruckDelivery },
];

export function SimpleNavBar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Shippers");

  const links = data.map((item) => (
    <NavLink
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      icon={<item.icon className={classes.linkIcon} stroke={1.5} />}
      onClick={() => setActive(item.label)}
      to={item.link}
    >
      {item.label}
    </NavLink>
  ));

  return (
    <Navbar width={{ sm: 200 }} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Image
            width={140}
            src="https://baehynoyclonrpjiwhza.supabase.co/storage/v1/object/public/shipamiga/assets/shipamiga-logo"
          />
        </Group>
        {links}
      </Navbar.Section>

      {/* <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section> */}
    </Navbar>
  );
}
