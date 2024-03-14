import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(resolvedTheme === "dark");

  useEffect(() => {
    setIsChecked(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const toggleTheme = () => {
    const newTheme = isChecked ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <div className={styles.themeSwitcher}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          id="themeSwitch"
          checked={isChecked}
          onChange={toggleTheme}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
