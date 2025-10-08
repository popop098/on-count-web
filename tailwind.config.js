// tailwind.config.js
const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // ...
        // make sure it's pointing to the ROOT node_module
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                pretendard: ['var(--font-pretendard)'],
            },
        },
    },
    darkMode: "class",
    plugins: [
        heroui({
            "themes": {
                "light": {
                    "colors": {
                        "default": {
                            "50": "#eff0f8",
                            "100": "#d9dcee",
                            "200": "#c3c7e3",
                            "300": "#acb2d9",
                            "400": "#969ecf",
                            "500": "#8089c5",
                            "600": "#6a71a3",
                            "700": "#535980",
                            "800": "#3d415e",
                            "900": "#26293b",
                            "foreground": "#000",
                            "DEFAULT": "#8089c5"
                        },
                        "primary": {
                            "50": "#e6eaff",
                            "100": "#c3cbff",
                            "200": "#a0adff",
                            "300": "#7e8fff",
                            "400": "#5b71ff",
                            "500": "#3853ff",
                            "600": "#2e44d2",
                            "700": "#2436a6",
                            "800": "#1b2779",
                            "900": "#11194d",
                            "foreground": "#fff",
                            "DEFAULT": "#3853ff"
                        },
                        "secondary": {
                            "50": "#e9edff",
                            "100": "#cbd4ff",
                            "200": "#adbcff",
                            "300": "#8fa3ff",
                            "400": "#708aff",
                            "500": "#5271ff",
                            "600": "#445dd2",
                            "700": "#3549a6",
                            "800": "#273679",
                            "900": "#19224d",
                            "foreground": "#000",
                            "DEFAULT": "#5271ff"
                        },
                        "success": {
                            "50": "#e3f8ef",
                            "100": "#bbedd8",
                            "200": "#93e3c1",
                            "300": "#6bd9ab",
                            "400": "#43ce94",
                            "500": "#1bc47d",
                            "600": "#16a267",
                            "700": "#127f51",
                            "800": "#0d5d3b",
                            "900": "#083b26",
                            "foreground": "#000",
                            "DEFAULT": "#1bc47d"
                        },
                        "warning": {
                            "50": "#fff5df",
                            "100": "#ffe8b3",
                            "200": "#ffda86",
                            "300": "#ffcc59",
                            "400": "#ffbf2d",
                            "500": "#ffb100",
                            "600": "#d29200",
                            "700": "#a67300",
                            "800": "#795400",
                            "900": "#4d3500",
                            "foreground": "#000",
                            "DEFAULT": "#ffb100"
                        },
                        "danger": {
                            "50": "#ffe9e9",
                            "100": "#ffcaca",
                            "200": "#ffabab",
                            "300": "#ff8d8d",
                            "400": "#ff6e6e",
                            "500": "#ff4f4f",
                            "600": "#d24141",
                            "700": "#a63333",
                            "800": "#792626",
                            "900": "#4d1818",
                            "foreground": "#000",
                            "DEFAULT": "#ff4f4f"
                        },
                        "background": "#f9f7fd",
                        "foreground": "#4a3d77",
                        "content1": {
                            "DEFAULT": "#f2e8ff",
                            "foreground": "#000"
                        },
                        "content2": {
                            "DEFAULT": "#e8daff",
                            "foreground": "#000"
                        },
                        "content3": {
                            "DEFAULT": "#dccbff",
                            "foreground": "#000"
                        },
                        "content4": {
                            "DEFAULT": "#cfbcff",
                            "foreground": "#000"
                        },
                        "focus": "#7828c8",
                        "overlay": "#000000"
                    }
                },
                "dark": {
                    "colors": {
                        "default": {
                            "50": "#08070b",
                            "100": "#100d15",
                            "200": "#181420",
                            "300": "#201a2a",
                            "400": "#282135",
                            "500": "#534d5d",
                            "600": "#7e7a86",
                            "700": "#a9a6ae",
                            "800": "#d4d3d7",
                            "900": "#ffffff",
                            "foreground": "#fff",
                            "DEFAULT": "#282135"
                        },
                        "primary": {
                            "50": "#11194d",
                            "100": "#1b2779",
                            "200": "#2436a6",
                            "300": "#2e44d2",
                            "400": "#3853ff",
                            "500": "#5b71ff",
                            "600": "#7e8fff",
                            "700": "#a0adff",
                            "800": "#c3cbff",
                            "900": "#e6eaff",
                            "foreground": "#fff",
                            "DEFAULT": "#3853ff"
                        },
                        "secondary": {
                            "50": "#1e254d",
                            "100": "#2f3a79",
                            "200": "#404fa6",
                            "300": "#5265d2",
                            "400": "#637aff",
                            "500": "#7e91ff",
                            "600": "#9aa9ff",
                            "700": "#b5c0ff",
                            "800": "#d0d7ff",
                            "900": "#eceeff",
                            "foreground": "#000",
                            "DEFAULT": "#637aff"
                        },
                        "success": {
                            "50": "#0b412a",
                            "100": "#116743",
                            "200": "#178d5c",
                            "300": "#1db374",
                            "400": "#23d98d",
                            "500": "#4ae0a1",
                            "600": "#70e6b5",
                            "700": "#97edc9",
                            "800": "#bdf4dd",
                            "900": "#e4faf1",
                            "foreground": "#000",
                            "DEFAULT": "#23d98d"
                        },
                        "warning": {
                            "50": "#4d3d11",
                            "100": "#79601c",
                            "200": "#a68326",
                            "300": "#d2a730",
                            "400": "#ffca3a",
                            "500": "#ffd35c",
                            "600": "#ffdd7f",
                            "700": "#ffe6a1",
                            "800": "#ffefc4",
                            "900": "#fff8e6",
                            "foreground": "#000",
                            "DEFAULT": "#ffca3a"
                        },
                        "danger": {
                            "50": "#4d2020",
                            "100": "#793333",
                            "200": "#a64646",
                            "300": "#d25858",
                            "400": "#ff6b6b",
                            "500": "#ff8585",
                            "600": "#ff9f9f",
                            "700": "#ffb9b9",
                            "800": "#ffd3d3",
                            "900": "#ffeded",
                            "foreground": "#000",
                            "DEFAULT": "#ff6b6b"
                        },
                        "background": "#1b1526",
                        "foreground": "#d0aaff",
                        "content1": {
                            "DEFAULT": "#392a4a",
                            "foreground": "#fff"
                        },
                        "content2": {
                            "DEFAULT": "#4c3560",
                            "foreground": "#fff"
                        },
                        "content3": {
                            "DEFAULT": "#5e4180",
                            "foreground": "#fff"
                        },
                        "content4": {
                            "DEFAULT": "#704ea0",
                            "foreground": "#fff"
                        },
                        "focus": "#9353d3",
                        "overlay": "#ffffff"
                    }
                }
            },
            "layout": {
                "disabledOpacity": "0.4"
            }
        }),
    ],
};