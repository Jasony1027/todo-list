import React, { useContext } from "react";
import { AppContext } from "./AppProvider";
import Switch from "react-switch";
import { IoMdMoon as Moon, IoMdSunny as Sun } from "react-icons/io";

const ThemeSwitcher = () => {
  const { toggleTheme, themeMode } = useContext(AppContext);
  const handleThemeChange = (e) => {
    toggleTheme();
  };
  return (
      <Switch
        checked={themeMode === "lightTheme" ? true : false}
        className="theme-switch"
        height={20}
        width={45}
        checkedIcon={
          <Sun
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 20,
              paddingLeft: 5,
            }}
            color={themeMode === "lightTheme" ? "icon" : "yellow"}
            className="light"
          />
        }
        uncheckedIcon={
          <Moon
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 20,
              paddingLeft: 5,
            }}
            color={themeMode === "darkTheme" ? "icon" : "blue"}
            className="dark"
          />
        }
        onChange={handleThemeChange}
      />
  );
};

export default ThemeSwitcher;
