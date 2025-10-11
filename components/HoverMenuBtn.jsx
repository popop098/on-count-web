import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Dark = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <title>Dark Mode</title>
    <path
      fill="#000000"
      d="M12.741 20.917a9.389 9.389 0 0 1-1.395-.105a9.141 9.141 0 0 1-1.465-17.7a1.177 1.177 0 0 1 1.21.281a1.273 1.273 0 0 1 .325 1.293a8.112 8.112 0 0 0-.353 2.68a8.266 8.266 0 0 0 4.366 6.857a7.628 7.628 0 0 0 3.711.993a1.242 1.242 0 0 1 .994 1.963a9.148 9.148 0 0 1-7.393 3.738ZM10.261 4.05a.211.211 0 0 0-.065.011a8.137 8.137 0 1 0 9.131 12.526a.224.224 0 0 0 .013-.235a.232.232 0 0 0-.206-.136a8.619 8.619 0 0 1-4.188-1.116a9.274 9.274 0 0 1-4.883-7.7a9.123 9.123 0 0 1 .4-3.008a.286.286 0 0 0-.069-.285a.184.184 0 0 0-.133-.057Z"
    ></path>
  </svg>
);
export const Light = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 551 634"
    {...props}
  >
    <title>Light Mode</title>
    <path
      fill="#ffff"
      d="M312.297 99v7c0 27-12 40-37 40s-36-13-36-40v-7c0-26 11-39 36-39s37 13 37 39zm74 32l5-6c15-22 33-25 52-11c20 14 23 33 8 55l-6 5c-15 22-33 25-52 10c-20-14-22-31-7-53zm-226-6l4 6c15 22 13 39-6 53c-20 15-39 12-54-10l-4-5c-15-22-13-41 6-55c20-14 39-9 54 11zm115 66c85 0 155 70 155 156c0 85-70 154-155 154c-86 0-155-69-155-154c0-86 69-156 155-156zm-224 44l7 2c26 8 34 23 27 47c-8 24-24 31-49 23l-7-2c-25-8-34-23-27-47c8-24 24-31 49-23zm441 2l7-2c26-8 42-1 49 23s-1 39-27 47l-6 2c-26 8-42 1-49-23c-8-24 1-39 26-47zm-217 196c47 0 86-39 86-86c0-48-39-87-86-87c-48 0-87 39-87 87c0 47 39 86 87 86zm-246-45l7-2c25-8 41-2 49 22c7 24-1 39-27 47l-7 2c-25 8-41 2-49-22c-7-24 2-39 27-47zm486-2l6 2c26 8 34 23 27 47s-23 30-49 22l-7-2c-25-8-34-23-26-47c7-24 23-30 49-22zm-415 139l4-6c15-22 34-24 54-10c19 14 21 31 6 53l-4 6c-15 22-34 24-54 10c-19-14-21-31-6-53zm345-6l6 6c15 22 12 39-8 53c-19 14-37 12-52-10l-5-6c-15-22-13-39 7-53c19-14 37-12 52 10zm-133 67v8c0 27-12 40-37 40s-36-13-36-40v-8c0-27 11-40 36-40s37 13 37 40z"
    ></path>
  </svg>
);
export default function HoverMenuBtn() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="fixed bottom-5 right-5">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly color="primary" className="p-1" variant="shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 20 20"
            >
              <title>Menu</title>
              <path
                fill="#fff"
                d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
              />
            </svg>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Settings Actions" variant="flat">
          <DropdownItem
            key="DarkMode"
            onPress={() => setTheme(theme === "light" ? "dark" : "light")}
            startContent={theme === "light" ? <Dark /> : <Light />}
          >
            {theme === "light" ? "어둡게" : "밝게"}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
