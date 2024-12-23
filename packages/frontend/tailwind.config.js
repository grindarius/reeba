const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./index.html", "./src/**/*.{ts,js,jsx,vue}"],
  theme: {
    purge: [],
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans Thai", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        "pale-yellow": "#D5A755",
        "pale-gray": "#423E41",
        "yellow-hover": "#FFCA28",
        "gray-hover": "#777668",
        "red-disabled": "#8B183C"
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        reeba: {
          primary: "#d5a755",
          secondary: "#423e41",
          accent: "#fff",
          neutral: "#d5a755",
          "base-100": "#423e41",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272"
        }
      }
    ]
  }
}
