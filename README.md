# 🌦️ Weather-Based Order Delay System

## 📌 Description
This project checks the current weather conditions for different cities using the OpenWeatherMap API and updates order delivery status accordingly.

If the weather condition is **Rain, Snow, or Extreme**, the order is marked as **Delayed**, and a personalized apology message is generated.
---

## 🛠️ Technologies Used
- Node.js
- Axios (for API calls)
- OpenWeatherMap API
- dotenv

---

##  Project Structure

weather-orders/
│
├── script.js
├── orders.json
├── orders_updated.json
├── ai_log.txt
├── .gitignore
└── README.md


---

## ▶️ How to Run the Project

### 1. Install dependencies
```bash
1. npm install

2. Create .env file

API_KEY=your_openweather_api_key

3. Run the script

node script.js
