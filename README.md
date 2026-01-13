# AI-Side-Hustle-Roadmap-Generator
Architecture Design &amp; MVP Prototype
Below is a polished, native‑sounding English technical document based on your original text. I’ve kept the tone professional and aligned with common SaaS/AI product documentation styles, while ensuring clarity and coherence throughout.

---

# **AI Side‑Hustle Roadmap Generator — Architecture Design & MVP Prototype**

## **Project Overview**
This project aims to build an **AI‑powered Side‑Hustle Roadmap Generator** designed for indie developers and freelancers. By collecting user inputs such as skills, interests, available time, and budget, the system uses large language models (LLMs) to automatically generate a **6–12‑month personalized side‑hustle roadmap**. The roadmap includes project recommendations, MVP feature sets, marketing strategies, and estimated revenue.  

The service is delivered as a SaaS product with a free trial and subscription‑based monetization model.

---

## **Project Scaffold & Quick Start（从简单开始）**

为了帮助你“练中学、快速上线”，当前仓库先提供**最小可运行框架**，包含前端与后端的基础文件结构。你可以在此基础上逐步增强功能。

### **目录结构**
```
apps/
  web/                # Next.js 前端（最小可运行）
    app/
      layout.js
      page.js
    styles/
      globals.css
    next.config.js
    package.json
  api/                # FastAPI 后端（最小可运行）
    main.py
    requirements.txt
PRACTICE_PLAN.md      # 项目实践计划
README.md             # 项目说明
```

### **本地运行**
> 先从最小版本跑起来，再逐步加功能。

**1) 启动前端（Next.js，使用 pnpm）**
```bash
cd apps/web
pnpm install
pnpm dev
```
默认地址：`http://localhost:3000`

**2) 启动后端（FastAPI，使用 uv）**
```bash
cd apps/api
uv venv .venv
source .venv/bin/activate
uv pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
健康检查：`http://localhost:8000/health`

### **下一步建议（练中学路线）**
1. **替换页面文案**：先把 Landing 页内容改成你自己的价值主张。  
2. **接通 API**：从 `/api/roadmap` 开始做最小的请求‑响应。  
3. **迭代问卷与结果页**：每周只做 1 个小改动并上线验证。  

---

## **部署到 Vercel（前端）**
> 说明：当前仓库的前端位于 `apps/web`，推荐先将前端部署到 Vercel；后端（FastAPI）可后续部署到 Render/Railway。

### **方式一：Vercel 控制台部署（推荐）**
1. 将项目推送到 GitHub。
2. 登录 Vercel，点击 **New Project**，选择该仓库。
3. 在 **Root Directory** 选择 `apps/web`。
4. 设置构建命令与输出：
   - Build Command：`pnpm build`
   - Output Directory：`.next`
   - Install Command：`pnpm install`
5. 点击 **Deploy**，等待构建完成即可访问线上地址。

### **方式二：Vercel CLI 部署**
```bash
pnpm add -g vercel
cd apps/web
vercel
```
按提示选择项目并完成部署。

---

## **Technology Stack**

To enable rapid iteration and easy maintenance, the following stack is recommended:

- **Frontend: Next.js (React + TypeScript)**  
  Provides modern SSR/CSR hybrid rendering for fast initial load and SEO benefits; TypeScript ensures type safety.

- **Styling & UI: Tailwind CSS + shadcn/ui**  
  Tailwind enables fast responsive UI development; shadcn/ui offers elegant prebuilt components.

- **Backend: Node.js (Next.js API Routes) or Python FastAPI**  
  - Use Next.js API Routes for a unified full‑stack environment.  
  - Choose FastAPI if you prefer the Python ecosystem.

- **Database: PostgreSQL (Supabase recommended)**  
  Stores user accounts, roadmap records, and subscription data. Supabase provides hosted Postgres and simple authentication.

- **AI Services: OpenAI / Claude / Gemini APIs**  
  Used to generate roadmap content. API keys are stored securely via environment variables.

- **Email / Notifications: SendGrid or Telegram Bot**  
  Sends generated roadmaps or subscription reminders to users.

- **Deployment: Vercel**  
  Ideal for Next.js projects with one‑click deployment.  
  For FastAPI, consider Render or Railway.

This stack enables fast prototyping and leverages AI tools to significantly reduce research and design time.

---

## **System Architecture**

The system is divided into frontend and backend layers:

### **1. Frontend Application (Next.js)**
- Renders the user interface: landing page, questionnaire, results page, and user dashboard.
- Calls backend APIs to generate roadmaps and handle authentication/subscriptions.
- Uses NextAuth or Supabase Auth for identity management.

### **2. Backend Services**
- Exposes REST (or GraphQL) endpoints such as:
  - `POST /api/roadmap` — generate a roadmap  
  - `GET /api/roadmap/{id}` — retrieve a saved roadmap  
  - `POST /api/subscribe` — manage subscriptions  
- Integrates LLM APIs: constructs prompts based on user input and returns structured results.  
  Following AI MVP guidelines, the MVP focuses on a single core feature and may use semi‑automated or human‑reviewed outputs to ensure quality.
- Uses Prisma ORM (Node.js) or SQLAlchemy (Python) for database operations.
- Handles payment integration (Stripe / Alipay / WeChat Pay).

### **3. AI Processing Module**
- Defines unified prompt templates including user info, project domain, and goals.
- Pre‑filters suitable project directions based on user skills/interests before generating the full roadmap.
- Produces structured outputs: project overview, MVP features, marketing plan, timeline, and revenue estimates.
- Supports pluggable model providers for easy switching or comparison.

### **4. Email & Notification Service**
- Uses SendGrid or Telegram Bot to deliver generated roadmaps or updates.
- Supports daily/weekly trend updates or new templates to improve user retention.

### **High‑Level Data Flow**
1. User fills out the questionnaire on the frontend.  
2. Frontend sends the data to the backend API.  
3. Backend constructs a prompt and calls the LLM API to generate the roadmap.  
4. Backend stores the result in the database and returns it to the frontend; optionally triggers email/notification.  
5. Frontend displays the roadmap and allows PDF export or copying.

---

## **Frontend Pages & Prototype Design**

### **1. Login / Registration**
- Supports email login and third‑party authentication via Supabase Auth.
- Unauthenticated users can only access the free trial.

### **2. Questionnaire Page**
Users provide the following fields:

| Field | Description |
|-------|-------------|
| Primary Skills | e.g., programming, design, marketing |
| Interest Areas | e.g., education, gaming, health |
| Available Time | Hours per week or per day |
| Initial Budget | Amount of money available |
| Income Goal | Target monthly revenue |

All fields are required or semi‑required, using dropdowns or radio buttons for simplicity.

### **3. Roadmap Results Page**
Displays the generated roadmap, including:

- **Project Recommendations** — name, description, market opportunity  
- **MVP Features** — core features to build first  
- **Marketing Strategy** — suitable channels and tactics  
- **Timeline** — phased action plan  
- **Estimated Revenue Range** — model‑generated projections  

Users can **save/download as PDF** or **regenerate** a new roadmap.

### **4. User Dashboard / Subscription Management**
Users can:
- View past roadmaps  
- Update profile  
- Manage subscription plans and payment methods  

---

## **Backend API Design**

Recommended API endpoints:

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/roadmap | Generate a roadmap from questionnaire data |
| GET | /api/roadmap/:id | Retrieve a specific roadmap |
| POST | /api/subscribe | Create or update a subscription |
| GET | /api/user | Get current user information |

Responses return JSON with status codes, messages, and data.  
Authenticated endpoints must validate user tokens.

---

## **Data Model Design**

Relational database schema:

- **User**: id, email, name, created_at, subscription_status  
- **Roadmap**: id, user_id (FK), input_data (JSON), output_data (JSON), created_at  
- **Subscription**: id, user_id, plan, status, started_at, expires_at  

A **Feedback** table may be added later for user ratings and prompt improvements.

---

## **MVP Development Process**

Following AI MVP development guidelines, the recommended iteration plan is:

1. **Identify the Problem & Validate Assumptions (Week 1)**  
   Use surveys and quick interviews to confirm demand for personalized side‑hustle roadmaps.

2. **Define the Minimum Feature Set (Week 2)**  
   Focus solely on generating roadmaps; exclude multilingual or collaboration features.

3. **Prepare Data & Templates (Week 2)**  
   Collect side‑hustle examples, design prompt templates, and build a small dataset to guide model outputs.

4. **Frontend & UI Development (Week 3)**  
   Use Figma for rapid prototyping; implement questionnaire and results pages with Tailwind + shadcn/ui.

5. **Backend & Model Integration (Weeks 3–4)**  
   Build API services and integrate LLMs. Start with simple rules or semi‑automated outputs, then improve automation.

6. **Internal Testing & Feedback (Week 5)**  
   Invite early users to test and evaluate roadmap usefulness and accuracy.

7. **Soft Launch (Week 6)**  
   Deploy to Vercel, enable subscriptions, monitor feedback, and fix issues.

8. **Continuous Iteration (Week 7+)**  
   Improve UI, prompts, and algorithms; add payments, history, and a template marketplace.

---

## **Conclusion**
This architecture and development plan provides a clear path to launching the **AI Side‑Hustle Roadmap Generator** quickly and effectively. By combining a modern tech stack with LLM‑powered content generation, you can dramatically shorten the time from idea to MVP.  

This document should serve as a practical guide as you begin implementing the project on GitHub.

---
