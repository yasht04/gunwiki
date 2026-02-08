# Gun Wiki Monorepo

A full-stack encyclopedia application for firearm specifications and history, built with a modern enterprise-grade architecture.

## 🛠 Tech Stack

**Frontend:**
* **Next.js 14** (App Router)
* **TypeScript**
* **Tailwind CSS**

**Backend:**
* **NestJS** (Modular Architecture)
* **Mongoose** (ODM)
* **TypeScript**

**Infrastructure:**
* **Database:** MongoDB (Dockerized)
* **Package Manager:** pnpm (Monorepo Workspaces)
* **Containerization:** Docker & Docker Compose

---

## 🚀 Getting Started

### Prerequisites
* Node.js (LTS)
* pnpm (`npm i -g pnpm`)
* Docker Desktop

### Installation

1.  **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd gun-wiki
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Start the Database**
    This spins up MongoDB and Mongo Express (Admin UI) in the background.
    ```bash
    docker-compose up -d
    ```

4.  **Run the Application**
    Starts both the Client (Next.js) and Server (NestJS) concurrently.
    ```bash
    pnpm dev
    ```

---

## 📂 Project Structure

This project follows a Monorepo structure managed by pnpm workspaces.

```text
gun-wiki/
├── apps/
│   ├── client/    # Next.js Frontend (Port 3000)
│   └── server/    # NestJS Backend API (Port 4000)
├── docker-compose.yml
├── package.json
└── pnpm-workspace.yaml
