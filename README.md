# Nandan M. — Aerospace Engineering Portfolio

A high-performance, technical aerospace portfolio built for **Nandan M.**, Aerospace Engineering Scholar at **Dayananda Sagar College of Engineering (DSCE)**, Bengaluru.

Designed with an aerodynamic telemetry HUD aesthetic, honoring supersonic aerodynamics, autonomous multi-rotor drones, fixed-wing UAVs, and propulsion research.

---

## Key Capabilities

1. **Aerospace Manifesto & Curated Quotes**:
   - Starting section highlighting the discipline of aerospace engineering.
   - Interactive quote showcase featuring pioneers: **Theodore von Kármán**, **Dr. A.P.J. Abdul Kalam**, **Kalpana Chawla**, and **Neil Armstrong**.
   - Full ability to edit, add, or cycle quotes.

2. **4 Core Technical Sections**:
   - **Fighter Jets**: Delta-wing vortex breakdown analyses, DSI supersonic air intake simulations, and radar cross-section optimization.
   - **Drones**: Heavy-payload multi-rotor frames, PID/LQR flight control systems, and high-speed FPV aerodynamics.
   - **UAVs (Unmanned Aerial Vehicles)**: Long-endurance solar airframes, VTOL tilt-rotor transition dynamics, and low-Reynolds airfoils.
   - **Others & Space Systems**: Solid rocket motor internal ballistics, scramjet supersonic combustion, and orbital mechanics.

3. **PDF Uploads & In-Browser Interactive Previews**:
   - Upload research papers, CAD briefs, or flight test reports (PDF) directly to any project card.
   - Interactive PDF viewer modal with instant preview, zoom, full-screen opening, and direct downloads.
   - Powered by browser **IndexedDB**, allowing fast, persistent storage of large PDF documents directly on the client.

4. **In-Place Editing & Section Reordering**:
   - Toggle **"EDIT PORTFOLIO"** in the top navigation bar.
   - Reorder entire sections up and down with instant arrow controls (`↑` / `↓`).
   - Edit project titles, summaries, technical specifications, and tags in real-time.
   - Add new projects or custom research sections on demand.
   - Export full JSON backup or restore anytime with one click.

---

## How to Host on GitHub Pages (3 Clicks)

This portfolio is 100% static and configured for instant zero-config GitHub Pages hosting:

1. **Push this repository to GitHub**:
   ```bash
   git add .
   git commit -m "Build Nandan M Aerospace Portfolio"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** > **Pages** (under Code and automation).
   - Under **Build and deployment > Source**, select **GitHub Actions**.

3. **Live!**:
   - The included `.github/workflows/deploy.yml` workflow will automatically build and publish your site at `https://<your-username>.github.io/<repo-name>/`.

---

## Local Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```
