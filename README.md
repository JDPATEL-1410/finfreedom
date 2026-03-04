# 🚀 FinFreedom33 - Premium Financial Advisory Platform

A high-performance, aesthetically pleasing wealth management platform designed for **FinFreedom33 LLP**. Built with React, TypeScript, and Tailwind CSS, this platform empowers investors with goal-based planning, real-time research, and disciplined investment strategies.

## ✨ Key Features

-   **🎯 Goal-Based Planning:** Automated SIP, Lumpsum, and Retirement calculators with downloadable PDF reports.
-   **📊 Market Research Hub:** Live fund search and performance analytics using real-time AMFI data APIs.
-   **📰 Knowledge Center:** Real-time financial news and expert articles via Economic Times RSS integration.
-   **🛡️ Wealth Protection:** Comprehensive landing pages for Insurance, Fixed Deposits, and Equity Advisory.
-   **📱 Responsive & Interactive:** Fluid glassmorphic UI, optimized for mobile and desktop, powered by Framer Motion.

---

## 🛠️ Technology Stack

-   **Frontend:** React 18, Vite, Typecript, Tailwind CSS, Framer Motion
-   **Icons:** Lucide React
-   **Validation:** Zod + React Hook Form
-   **State/Data:** Axios, React Router, React Helmet Async
-   **Backend:** Node.js, Express, Nodemailer, RSS-Parser (for RSS Proxy)

---

## 🚦 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-repo/finfreedom.git
    cd finfreedom
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Backend Server:**
    ```bash
    cd server
    npm install
    ```

4.  **Configuration:**
    -   Create a `.env` file in the `server` directory (refer to `.env.example`).
    -   Add your SMTP credentials for contact form functionality.

### Running the Project

1.  **Start the Backend (Port 5000):**
    ```bash
    cd server
    node index.js
    ```

2.  **Start the Frontend (Port 5173):**
    ```bash
    # In a new terminal
    npm run dev
    ```

---

## 📁 Project Structure

```text
finfreedom/
├── server/             # Express.js backend (RSS Proxy & Contact API)
├── src/
│   ├── components/     # Reusable UI components (layout, calculators)
│   ├── data/           # Static content, image mappings
│   ├── pages/          # Page components (Home, Services, Blog, etc.)
│   ├── services/       # API integration layers (mfapi.in, backend)
│   ├── utils/          # Formatting and calculation logic
│   └── App.tsx         # Routing and core logic
├── public/             # Static assets
└── tailwind.config.js  # Theme and design tokens
```

---

## 📖 License

This project is proprietary. All rights reserved by **FinFreedom33 LLP**.
Developed with ❤️ by the Advanced Agentic Coding team.
