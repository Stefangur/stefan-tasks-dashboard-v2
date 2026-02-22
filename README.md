# Stefan's Tasks Dashboard v2.0

## 📋 Aufgaben & Abfall Management Dashboard

**Live URL:** [stefan-tasks-dashboard-v2.onrender.com](https://stefan-tasks-dashboard-v2.onrender.com)

### 🎯 Features

- **🗑️ Abfallkalender** - Pellendorf + Maishofen Termine
- **📅 Task Management** - Heute, Morgen, Kommende Aufgaben  
- **📍 Multi-Location** - Standort-spezifische Tasks
- **✅ Interactive** - Aufgaben abhaken/erledigen
- **🔄 Dual Refresh** - Manual + Auto (30min Cron)
- **📱 Mobile-First** - iPad/iPhone optimiert

### 🚀 Technical Stack

- **Framework:** Next.js 15.5.12 + TypeScript
- **Styling:** Inline Styles (Render-optimiert)
- **Data:** SQLite + JSON fallback
- **Deployment:** Render.com
- **Refresh:** 80px Touch-Button + Cron automation

### 📊 Data Sources

- **SQLite:** `tasks-tracking.db` (local)
- **JSON:** `tasks-tracking.json` (dashboard fallback)
- **Cron:** OpenClaw 30min auto-updates
- **Manual:** Stefan's on-demand refresh

### 🗑️ Abfall Schedule Integration

**Pellendorf + Maishofen:**
- Restmüll Termine automatisch
- Priorität: High (heute), Normal (kommend)  
- Status: Pending → Completed
- Location Icons: 🏠 (Pellendorf), 🏔️ (Maishofen)

### 🔧 Development

```bash
npm install
npm run dev    # localhost:3004
npm run build  # Production build
```

### 📱 Mobile Optimization

- 80px Refresh Button (touch-friendly)
- Responsive Grid Layout
- Glassmorphism UI Design
- Priority Color Coding
- Task Completion Interface

---

**Stefan's 4th Dashboard in the ecosystem!** 📋✨