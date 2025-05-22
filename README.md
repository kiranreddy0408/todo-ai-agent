



# 📝 Todo Summary Assistant

### 🔗 [Live Demo](https://todo-ai-agent.vercel.app/)

![image](https://github.com/user-attachments/assets/098661fa-7721-41fd-87eb-b2ae938e569d)

*A simple yet smart full-stack to-do app with AI-powered summarization and Slack integration.*

---

## 🚀 About the Project

**Todo Summary Assistant** is a full-stack web application that allows users to:
- Create, edit, and delete personal to-do tasks.
- Generate a meaningful summary of all pending to-dos using an actual LLM (Google Gemini).
- Instantly send that summary to a Slack channel using a Slack Incoming Webhook.

### 🔥 Extra Feature
💡 **"AI Improve" Button** – When writing a task, click this button to let the AI rephrase or improve the task description for clarity and completeness!

---

## 🧑‍💻 Tech Stack

| Frontend        | Backend           | Database     | AI & Integrations |
|----------------|-------------------|--------------|--------------------|
| React + Vite   | Node.js (Express) | PostgreSQL  | Gemini API, Slack Webhook |
| Tailwind CSS   | REST APIs         | Aiven |                   |
| Vercel (Hosting) | Vercel (Hosting) | SSL CA-secured |                   |

---


## ⚙️ Environment Variable Setup

### 🔐 Backend (`backend/.env`)
```env
PORT=5000

# Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Slack Webhook
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url

# PostgreSQL Database (Aiven)
DATABASE_URL=postgres://username:password@host:port/database
PGUSER=your_pg_user
PGPASSWORD=your_pg_password
PGHOST=your_pg_host
PGPORT=your_pg_port
PGDATABASE=your_pg_db_name
PGSSLCA=./ca.pem
````

> ✅ Make sure to download your CA certificate (`ca.pem`) from Aiven for PostgreSQL SSL connections.



### 🌐 Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

For deployment, update `VITE_API_BASE_URL` to your backend's deployed URL.

---

## 🔧 How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/todo-summary-assistant.git
cd todo-summary-assistant
```

### 2. Setup Backend

```bash
cd backend
npm install
cp env.txt .env  # Add your own keys
node index.js     # or use nodemon
```



### 3. Setup Frontend

```bash
cd frontend
npm install
cp env.txt .env  # Adjust base URL
npm run dev
```

---

## 💬 Slack Integration Setup

1. Go to [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks).
2. Create a new app and enable **Incoming Webhooks**.
3. Choose a channel and generate a **Webhook URL**.
4. Paste the Webhook URL into your `.env` file under `SLACK_WEBHOOK_URL`.



## 🧠 Gemini LLM Integration Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey) to get your Gemini API Key.
2. Paste the key into your `.env` file under `GEMINI_API_KEY`.



## ✅ Features Overview

* ✅ Add, edit, and delete to-do items
* ✅ AI-generated summary of all pending to-dos
* ✅ Send summary to Slack via Webhook
* ✅ “AI Improve” feature to rewrite task descriptions
* ✅ Hosted on Vercel (optional live demo)






---

## 🙌 Acknowledgments

* [Google Gemini API](https://ai.google.dev/)
* [Slack API](https://api.slack.com/messaging/webhooks)
* [Aiven PostgreSQL Hosting](https://aiven.io/)
* [Vercel](https://vercel.com/)

---


```
