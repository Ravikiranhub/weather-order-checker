const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

// Read JSON
const orders = JSON.parse(fs.readFileSync("orders.json", "utf-8"));

// AI Apology Function
function generateApology(customer, city, weather) {
    return `Hi ${customer}, your order to ${city} is delayed due to ${weather.toLowerCase()}. We appreciate your patience!`;
}

// Fetch weather for one order
async function fetchWeather(order) {
    const city = order.city;

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
            },
        });

        const weatherMain = response.data.weather[0].main;

        // Golden Flow Logic
        if (["Rain", "Snow", "Extreme"].includes(weatherMain)) {
            order.status = "Delayed";
            order.message = generateApology(
                order.customer,
                city,
                weatherMain
            );
        }

        return order;

    } catch (error) {
        // Error Handling (invalid city etc.)
        if (error.response) {
            console.log(`Error for city ${city}: ${error.response.data.message}`);
        } else {
            console.log(`Error for city ${city}: ${error.message}`);
        }

        return order; // Continue processing
    }
}

// Main function
async function main() {
    try {
        // Parallel API calls
        const results = await Promise.all(
            orders.map(order => fetchWeather(order))
        );

        // Save updated JSON
        fs.writeFileSync(
            "orders_updated.json",
            JSON.stringify(results, null, 4)
        );

        console.log("Processing completed!");
    } catch (err) {
        console.error("Unexpected error:", err);
    }
}

// Run
main();