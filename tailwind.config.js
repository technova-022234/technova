/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                glow: "0 0 1px rgba(0, 255, 255, 0.8)",
            },
            backgroundImage: {
                "custom-gif": "url('/images/galaxy.gif')",
            },
            transformStyle: {
                "preserve-3d": "preserve-3d",
            },
            rotate: {
                "y-180": "rotateY(180deg)",
            },
            keyframes: {
                radar: {
                    '0%': { transform: 'scale(0.1)', opacity: '1' },
                    '70%': { opacity: '0.2' },
                    '100%': { transform: 'scale(2.5)', opacity: '0' },
                },
            },
            animation: {
                radar: 'radar 2s linear infinite',
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".clip-slant": {
                    clipPath: "polygon(0% 0, 100% 0, 95% 100%, 0% 100%)",
                },
                ".box-shadow-custom": {
                    boxShadow: "inset 0px 0px 0px 2px white, 2px 0 0 0 white",
                },
                ".skewed-container-r": {
                    transform:
                        "skewX(-30deg)" /* Apply the skew to the container */,
                },

                ".inner-content-r": {
                    transform: "skewX(30deg)" /* Undo the skew on the text */,
                },
                ".skewed-container-l": {
                    transform:
                        "skewX(30deg)" /* Apply the skew to the container */,
                },

                ".inner-content-l": {
                    transform: "skewX(-30deg)" /* Undo the skew on the text */,
                },
            });
        }),
    ],
};
