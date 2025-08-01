/** @type {import('tailwindcss').Config} */
import tailwindcssForms from "@tailwindcss/forms";
import tailwindcssTypography from "@tailwindcss/typography";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssDottedBackground from "tailwindcss-dotted-background";

const config = {
  variants: {
    extend: {
      display: ["group-hover"],
      textColor: ["group-increment-hover", "group-decrement-hover"],
    },
  },
  darkMode: ["class"],
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}",
  ],
  safelist: [
    "bg-status-blue",
    "bg-status-green",
    "bg-status-red",
    "bg-status-yellow",
  ],
  important: false,
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1400px",
        "3xl": "1500px",
      },
    },
    extend: {
      screens: {
        xl: "1200px",
        "2xl": "1400px",
        "3xl": "1500px",
      },
      keyframes: {
        // Overlay animations
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        overlayHide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },

        // Content animations - now including both scale and clip in one animation
        contentShow: {
          from: {
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0.95)",
            clipPath: "inset(50% 0)",
            boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.1)", // Smaller shadow
          },
          to: {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
            clipPath: "inset(0% 0)",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
        },
        contentHide: {
          from: {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
            clipPath: "inset(0% 0)",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          to: {
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0.95)",
            clipPath: "inset(50% 0)",
            boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.1)",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "scale(100%)" },
          "50%": { transform: "scale(120%)" },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "pulse-pink": {
          "0%, 100%": { backgroundColor: "hsla(var(--accent-pink), 1)" },
          "50%": { backgroundColor: "hsla(var(--accent-pink), 0.4)" },
        },
      },
      animation: {
        // Animation definitions
        overlayShow: "overlayShow 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayHide: "overlayHide 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentHide: "contentHide 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        wiggle: "wiggle 150ms ease-in-out 1",
        "pulse-pink": "pulse-pink 2s linear infinite",
        "slow-wiggle": "wiggle 500ms ease-in-out 1",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      colors: {
        "frozen-blue": "rgba(128, 190, 219, 0.86)", // Custom blue color for the frozen effect
        "frosted-glass": "rgba(255, 255, 255, 0.8)", // Custom frosted glass effect
        "component-icon": "var(--component-icon)",
        "flow-icon": "var(--flow-icon)",
        "low-indigo": "var(--low-indigo)",
        "chat-send": "var(--chat-send)",
        connection: "var(--connection)",
        "almost-dark-gray": "var(--almost-dark-gray)",
        "almost-light-blue": "var(--almost-light-blue)",
        "almost-medium-gray": "var(--almost-medium-gray)",
        "almost-medium-green": "var(--almost-medium-green)",
        "almost-medium-red": "var(--almost-medium-red)",
        "btn-shadow": "var(--round-btn-shadow)",
        "build-trigger": "var(--build-trigger)",
        "chat-trigger": "var(--chat-trigger)",
        "chat-trigger-disabled": "var(--chat-trigger-disabled)",
        "dark-blue": "var(--dark-blue)",
        "dark-gray": "var(--dark-gray)",
        "dark-red": "var(--dark-red)",
        error: {
          DEFAULT: "var(--error)",
          background: "var(--error-background)",
          foreground: "var(--error-foreground)",
        },
        "high-dark-gray": "var(--high-dark-gray)",
        "high-indigo": "var(--high-indigo)",
        "high-light-gray": "var(--high-light-gray)",
        "info-background": "var(--info-background)",
        "info-foreground": "var(--info-foreground)",
        "light-blue": "var(--light-blue)",
        "light-gray": "var(--light-gray)",
        "light-slate": "var(--light-slate)",
        "medium-blue": "var(--medium-blue)",
        "status-blue": "var(--status-blue)",
        "medium-dark-gray": "var(--medium-dark-gray)",
        "medium-dark-green": "var(--medium-dark-green)",
        "medium-dark-red": "var(--medium-dark-red)",
        "medium-emerald": "var(--medium-emerald)",
        "medium-gray": "var(--medium-gray)",
        "medium-high-indigo": "var(--medium-high-indigo)",
        "medium-indigo": "var(--medium-indigo)",
        "medium-low-gray": "var(--medium-low-gray)",
        "note-amber": "hsl(var(--note-amber))",
        "note-neutral": "hsl(var(--note-neutral))",
        "note-rose": "hsl(var(--note-rose))",
        "note-blue": "hsl(var(--note-blue))",
        "note-lime": "hsl(var(--note-lime))",
        "status-green": "var(--status-green)",
        "status-red": "var(--status-red)",
        "status-yellow": "var(--status-yellow)",
        "status-gray": "var(--status-gray)",
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          text: "hsl(var(--warning-text))",
        },
        "success-background": "var(--success-background)",
        "success-foreground": "var(--success-foreground)",
        "accent-pink-foreground": "hsl(var(--accent-pink-foreground))",
        "accent-purple-foreground": "hsl(var(--accent-purple-foreground))",
        "accent-red-foreground": "hsl(var(--accent-red-foreground))",
        filter: {
          foreground: "var(--filter-foreground)",
          background: "var(--filter-background)",
        },
        beta: {
          background: "var(--beta-background)",
          foreground: "var(--beta-foreground)",
          "foreground-soft": "var(--beta-foreground-soft)",
        },
        "chat-bot-icon": "var(--chat-bot-icon)",
        "chat-user-icon": "var(--chat-user-icon)",
        "code-background": "hsl(var(--code-background))",
        "code-description-background":
          "hsl(var(--code-description-background))",
        "code-foreground": "hsl(var(--code-foreground))",
        canvas: {
          DEFAULT: "hsl(var(--canvas))",
          dot: "hsl(var(--canvas-dot))",
        },
        ice: "var(--ice)",
        selected: "var(--selected)",
        hover: "var(--hover)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        "error-red": "hsl(var(--error-red))",
        "error-red-border": "hsl(var(--error-red-border))",
        "node-selected": "hsl(var(--node-selected))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "emerald-smooth": "hsl(var(--emaral-smooth))",
        "emerald-hard": "hsl(var(--emeral-hard))",
        placeholder: "hsl(var(--placeholder))",
        "hard-zinc": "hsl(var(--hard-zinc))",
        "smooth-red": "hsl(var(--smooth-red))",
        "placeholder-foreground": "hsl(var(--placeholder-foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        "accent-amber": {
          DEFAULT: "hsl(var(--accent-amber))",
          foreground: "hsl(var(--accent-amber-foreground))",
        },
        "accent-emerald": {
          DEFAULT: "hsl(var(--accent-emerald))",
          foreground: "hsl(var(--accent-emerald-foreground))",
          hover: "hsl(var(--accent-emerald-hover))",
        },
        "accent-indigo": {
          DEFAULT: "hsl(var(--accent-indigo))",
          foreground: "hsl(var(--accent-indigo-foreground))",
        },
        "accent-pink": {
          DEFAULT: "hsl(var(--accent-pink))",
          foreground: "hsl(var(--accent-pink-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        tooltip: {
          DEFAULT: "hsl(var(--tooltip))",
          foreground: "hsl(var(--tooltip-foreground))",
        },
        "code-block": {
          DEFAULT: "#18181B",
          muted: "#27272A",
        },
        "datatype-yellow": {
          DEFAULT: "hsl(var(--datatype-yellow))",
          foreground: "hsl(var(--datatype-yellow-foreground))",
        },
        "datatype-blue": {
          DEFAULT: "hsl(var(--datatype-blue))",
          foreground: "hsl(var(--datatype-blue-foreground))",
        },
        "datatype-gray": {
          DEFAULT: "hsl(var(--datatype-gray))",
          foreground: "hsl(var(--datatype-gray-foreground))",
        },
        "datatype-lime": {
          DEFAULT: "hsl(var(--datatype-lime))",
          foreground: "hsl(var(--datatype-lime-foreground))",
        },
        "datatype-red": {
          DEFAULT: "hsl(var(--datatype-red))",
          foreground: "hsl(var(--datatype-red-foreground))",
        },
        "datatype-violet": {
          DEFAULT: "hsl(var(--datatype-violet))",
          foreground: "hsl(var(--datatype-violet-foreground))",
        },
        "datatype-emerald": {
          DEFAULT: "hsl(var(--datatype-emerald))",
          foreground: "hsl(var(--datatype-emerald-foreground))",
        },
        "datatype-fuchsia": {
          DEFAULT: "hsl(var(--datatype-fuchsia))",
          foreground: "hsl(var(--datatype-fuchsia-foreground))",
        },
        "datatype-purple": {
          DEFAULT: "hsl(var(--datatype-purple))",
          foreground: "hsl(var(--datatype-purple-foreground))",
        },
        "datatype-cyan": {
          DEFAULT: "hsl(var(--datatype-cyan))",
          foreground: "hsl(var(--datatype-cyan-foreground))",
        },
        "datatype-indigo": {
          DEFAULT: "hsl(var(--datatype-indigo))",
          foreground: "hsl(var(--datatype-indigo-foreground))",
        },
        "node-ring": "hsl(var(--node-ring))",
        "neon-fuschia": "hsl(var(--neon-fuschia))",
        "digital-orchid": "hsl(var(--digital-orchid))",
        "plasma-purple": "hsl(var(--plasma-purple))",
        "electric-blue": "hsl(var(--electric-blue))",
        "holo-frost": "hsl(var(--holo-frost))",
        "terminal-green": "hsl(var(--terminal-green))",
        "cosmic-void": "hsl(var(--cosmic-void))",
        "slider-input-border": "var(--slider-input-border)",
        "zinc-foreground": "hsl(var(--zinc-foreground))",
        "red-foreground": "hsl(var(--red-foreground))",
        "indigo-foreground": "hsl(var(--indigo-foreground))",
        "discord-color": "var(--discord-color)",
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        1.75: "1.75px",
        1.5: "1.5px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
        chivo: ["var(--font-chivo)", ...fontFamily.sans],
      },
      boxShadow: {
        "frozen-ring": "0 0 10px 2px rgba(128, 190, 230, 0.5)",
        node: "0 0px 15px -3px rgb(0 0 0 / 0.1), 0 0px 6px -4px rgb(0 0 0 / 0.1);",
        "frosted-ring": "0 0 10px 2px rgba(128, 190, 230, 0.7)",
      },
      backdropBlur: {
        xs: "2px",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        999: "999",
      },
      fontSize: {
        xxs: "11px",
        mmd: "13px",
      },
    },
  },

  plugins: [
    tailwindcssAnimate,
    tailwindcssForms({
      strategy: "class", // only generate classes
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".truncate-multiline": {
          display: "-webkit-box",
          "-webkit-line-clamp":
            "3" /* Change this number to the number of lines you want to show */,
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
          "text-overflow": "ellipsis",
        },
        ".truncate-doubleline": {
          display: "-webkit-box",
          "-webkit-line-clamp":
            "2" /* Change this number to the number of lines you want to show */,
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
          "text-overflow": "ellipsis",
        },
        ".word-break-break-word": {
          wordBreak: "break-word",
        },
        ".arrow-hide": {
          "&::-webkit-datatype-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "&::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
        },
        ".password": {
          "-webkit-text-security": "disc",
          "font-family": "text-security-disc",
        },
        ".stop": {
          "-webkit-animation-play-state": "paused",
          "-moz-animation-play-state": "paused",
          "animation-play-state": "paused",
        },
        ".custom-scroll": {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "hsl(var(--muted))",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "hsl(var(--border))",
            borderRadius: "999px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "hsl(var(--placeholder-foreground))",
          },
          "&::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
          },
          cursor: "auto",
        },
        ".dark .theme-attribution .react-flow__attribution": {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          padding: "0px 5px",
        },
        ".dark .theme-attribution .react-flow__attribution a": {
          color: "black",
        },
        ".text-align-last-left": {
          "text-align-last": "left",
        },
        ".text-align-last-right": {
          "text-align-last": "right",
        },
        ":focus-visible": {
          outline: "none  !important",
          outlineOffset: "0px !important",
        },
        ".note-node-markdown": {
          lineHeight: "1",
          "& ul li::marker": {
            color: "black",
          },
          "& ol li::marker": {
            color: "black",
          },
          "& h1, & h2, & h3, & h4, & h5, & h6, & p, & ul, & ol": {
            marginBottom: "0.25rem",
          },
        },
      });
    }),
    tailwindcssTypography,
    tailwindcssDottedBackground,
    plugin(({ addUtilities, theme, e }) => {
      const colors = theme("colors");

      const generateUtilities = (colors, prefix = "") => {
        return Object.keys(colors).reduce((acc, colorName) => {
          const colorValue = colors[colorName];
          const className = prefix ? `${prefix}-${e(colorName)}` : e(colorName);

          if (typeof colorValue === "string") {
            acc[`.truncate-${className}`] = {
              position: "relative",
              overflow: "hidden",
              pointerEvents: "none",
              "&::after": {
                content: '""',
                position: "absolute",
                inset: "0 0 0 0",
                background: `linear-gradient(to right, transparent 80%, ${colorValue})`,
              },
            };
          } else if (typeof colorValue === "object") {
            // Use the DEFAULT value for the base class if it exists
            if (colorValue.DEFAULT) {
              acc[`.truncate-${className}`] = {
                position: "relative",
                overflow: "hidden",
                pointerEvents: "none",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: "0 0 0 0",
                  background: `linear-gradient(to right, transparent 80%, ${colorValue.DEFAULT})`,
                },
              };
            }
            // Recursively generate utilities for nested color objects
            Object.assign(acc, generateUtilities(colorValue, className));
          }

          return acc;
        }, {});
      };

      const newUtilities = generateUtilities(colors);

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(({ addVariant }) => {
      addVariant("group-increment-hover", ":merge(.group-increment):hover &");
      addVariant("group-decrement-hover", ":merge(.group-decrement):hover &");
    }),
  ],
};

export default config;
