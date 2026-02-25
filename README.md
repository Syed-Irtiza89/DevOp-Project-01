# 🚀 Nexus Ops - My DevOps Dashboard Project

Welcome to my personal project! I built **Nexus Ops** because I wanted to learn how to visualize complex infrastructure data using React. It's a dashboard that simulates what a real-life Cloud/Platform Engineer might use to monitor clusters and deployments.

## 🧐 Why I built this
I've been learning about DevOps and I realized that most production tools (like Prometheus or Datadog) can be really overwhelming for beginners. I wanted to see if I could build a cleaner, more "modern" looking interface that highlights only the most important metrics.

## ✨ Cool Stuff in this Project
- **Live Terminal (Simulation)**: If you click on any of the active pipelines, you'll see a terminal stream that simulates build and deployment logs.
- **Cluster Monitoring**: I added a section to track K8s clusters and storage usage with some basic "Critical Alert" logic.
- **Glassmorphism UI**: I spent a lot of time on the CSS to make sure it looks premium and sleek (lots of blur and transparency!).

## 🛠 What I used
- **React 18** & **Vite** (Super fast dev experience)
- **Lucide Icons** (For those clean UI icons)
- **Vanila CSS** (I didn't use Tailwind here because I wanted full control over the glassmorphism effects)

## 🏗 How to run it locally
1. Clone the repo
2. Run `npm install`
3. Hit `npm run dev`
4. Open your browser and go to the port shown in your terminal!

---
*Note: This is a work in progress. I'm planning to add a real backend later to pull in actual AWS or Docker data!*

Made with ☕ by [Your Name/Syed Irtiza]
