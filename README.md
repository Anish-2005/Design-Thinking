<div align="center">
  <img src="./public/dt-logo.svg" alt="Design Thinking Lab logo" width="88" />
  <h1>Design Thinking Lab</h1>
  <p>
    Interactive showcase of the <strong>5-stage Design Thinking framework</strong>,
    brought to life through a real product case study: a Time Management App.
  </p>
</div>

<p align="center">
  <a href="https://design-thinking-lab.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Site-design--thinking--lab.vercel.app-0B3D2E?style=for-the-badge" alt="Live site badge" />
  </a>
  <a href="https://time-management-app-theta.vercel.app">
    <img src="https://img.shields.io/badge/Case%20Study-Live%20Time%20Management%20App-1E6F9F?style=for-the-badge" alt="Case study app badge" />
  </a>
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react" alt="React 19 badge" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 6 badge" />
  <img src="https://img.shields.io/badge/Three.js-0.176-black?style=for-the-badge&logo=three.js" alt="Three.js badge" />
</p>

## Why This Project

This repository documents a semester Design Thinking journey from research to prototyping and iteration.  
The core output is a polished website that communicates both the process and a practical solution for time-management challenges faced by students.

## Experience Links

| Experience | URL | Purpose |
| --- | --- | --- |
| Main Showcase | https://design-thinking-lab.vercel.app | Explore the complete design thinking narrative |
| Time Management App | https://time-management-app-theta.vercel.app | Interact with the case study prototype |

## Design Thinking Flow

```mermaid
flowchart LR
    A[Empathize] --> B[Define]
    B --> C[Ideate]
    C --> D[Prototype]
    D --> E[Test]
    E --> F[Iterate]
    F --> C
```

## Product Highlights

| Area | What You See | Why It Matters |
| --- | --- | --- |
| Immersive UI | Three.js-powered space background and layered visual depth | Makes the learning experience memorable |
| Structured Storytelling | Dedicated sections for process, case study, insights, and reflection | Keeps the journey easy to follow |
| Motion Design | Scroll-triggered reveal behavior and smooth transitions | Improves clarity and perceived polish |
| Responsive Build | Mobile-first navigation and adaptable layout | Works cleanly across device sizes |
| Real Case Study | Time Management App with problem framing and solution strategy | Connects theory to practice |

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, React DOM |
| Build Tooling | Vite 6, ESLint 9 |
| Visuals and Motion | Three.js, GSAP, Intersection Observer |
| Deployment | Vercel |

## Quick Start

### Prerequisites

- Node.js 18+ (Node.js 20 LTS recommended)
- npm 9+

### Setup

```bash
git clone https://github.com/Anish-2005/Design-Thinking.git
cd Design-Thinking
npm install
npm run dev
```

Open `http://localhost:5173`.

### Scripts

```bash
npm run dev      # Start local dev server
npm run build    # Create production build
npm run preview  # Preview the production build
npm run lint     # Run lint checks
```

## Project Structure

```text
.
|-- public/
|   |-- dt-logo.svg
|   |-- dt.png
|   |-- robots.txt
|   `-- sitemap.xml
|-- src/
|   |-- components/
|   |-- data/
|   |-- hooks/
|   |-- App.jsx
|   |-- root.jsx
|   `-- main.jsx
|-- eslint.config.js
|-- vite.config.js
|-- vercel.json
`-- README.md
```

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).

## Contact

- LinkedIn: [Anish Seth](https://linkedin.com/in/anishseth)
- Email: anishseth0510@gmail.com
