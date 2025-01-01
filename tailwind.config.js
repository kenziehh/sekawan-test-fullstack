import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    sm: "1rem",
                    lg: "2rem",
                    xl: "2rem",
                    "2xl": "2rem",
                },
            },
            colors: {
                black: "#0F0F0F",
                "primary-blue": "#256BED",
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
