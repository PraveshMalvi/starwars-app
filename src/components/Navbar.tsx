import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconArrowRight,
  IconArrowLeft,
  IconLogout,
  IconFunctionFilled,
  IconChartHistogram,
  IconPlanet,
  IconMovie,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Box, Group, Image, Menu } from "@mantine/core";
import { IconSettings, IconPhoto } from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import { useAppStore, useAuthStore } from "../store/app.store";
import toggleIcon from "../assets/icons/toggle.png";

const data = [
  { link: "/dashboard", label: "Dashboard", icon: IconChartHistogram },
  { link: "/planets", label: "Planets", icon: IconPlanet },
  { link: "/films", label: "Films", icon: IconMovie },
  { link: "/people", label: "Residents", icon: IconUsersGroup },
];

function Navbar() {
  const [toggle, setToggle] = useState(true);
  const [toggleForMob, setToggleForMob] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const clearStorage = useAppStore((state) => state.clearStorage);
  const { pathname } = useLocation();

  const links = data.map((item) => (
    <Link
      to={item.link}
      className={classes.link}
      data-active={pathname.includes(item.link) ? "true" : undefined}
      key={item.label}
      style={{
        justifyContent: toggle ? "center" : "left",
        gap: toggle ? 0 : "10px",
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{!toggle ? item.label : ""}</span>
    </Link>
  ));

  const clearAllLocalStorage = () => {
    logout();
    clearStorage();
    localStorage.removeItem("auth-storage");
    localStorage.removeItem("app-storage");
  };

  return (
    <>
      <nav className={classes.navbar}>
        <Box
          w={30}
          h={30}
          sx={{
            visibility: "hidden",
            "@media (max-width: 400px)": {
              visibility: "visible",
              transform: toggleForMob ? "translateX(80px)" : "translateX(0)",
              transition: "transform 0.3s ease-in-out",
            },
          }}
        >
          <Image
            src={toggleIcon}
            alt="toggle"
            onClick={() => setToggleForMob(!toggleForMob)}
          />
        </Box>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <div className={classes.userToggle}>
              <div className={classes.avatar}>
                <p style={{ color: "#ffffff" }}>A</p>
              </div>
              <p>Hi, Admin</p>
            </div>
          </Menu.Target>

          <Menu.Dropdown
            p={5}
            bg={"#f1f1f1"}
            sx={{ border: "1px solid #cccccc" }}
          >
            <Menu.Item
              sx={{ fontSize: "16px", marginBottom: "6px" }}
              icon={<IconSettings size={24} />}
            >
              Profile
            </Menu.Item>
            <Menu.Item sx={{ fontSize: "16px" }} icon={<IconPhoto size={24} />}>
              Gallery
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </nav>
      <aside
        className={classes.sidebar}
        style={{
          width: !toggle ? "250px" : "80px",
          position: "fixed",
          top: 0,
          left: window.innerWidth < 400 && !toggleForMob ? "-100px" : 0,
          animationDuration: "300",
        }}
      >
        <div onClick={() => setToggle(!toggle)} className={classes.toggleIcon}>
          {toggle ? (
            <IconArrowRight color="#5203fc" size={28} />
          ) : (
            <IconArrowLeft color="#5203fc" size={28} />
          )}
        </div>
        <div className={classes.sidebarMain}>
          <Group className={classes.sidebarHeader}>
            <div>
              <IconFunctionFilled color="#000000" size={48} />
            </div>
          </Group>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {links}
          </div>
        </div>

        <div className={classes.footer}>
          <button
            className={classes.link}
            onClick={clearAllLocalStorage}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>{!toggle ? "Logout" : ""}</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
