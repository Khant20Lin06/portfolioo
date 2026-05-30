# portfolio.ts — IDE-style Developer Portfolio

A senior full-stack developer portfolio that looks **exactly like VS Code**.
The entire portfolio *is* an open TypeScript file, rendered with authentic
syntax highlighting (GitHub Dark theme), a file tree, minimap, and status bar.

Built with **React + Vite + Tailwind CSS**. Frontend only — no backend.

## Run it

```bash
npm install
npm run dev      # → http://localhost:5173
```

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Editing content

All portfolio content lives in **one file**: [src/data.js](src/data.js).
Change your name, skills, projects, and contact info there — the editor
renders them as TypeScript code automatically.

- `me` — name, title, experience, stats
- `frontend` / `backend` / `infra` — skill arrays (`level: 1–5` = green bar segments)
- `projects` — each renders as a left-border accent card (`accent: blue | orange | purple | green`)
- `contact` — email, github, linkedin (rendered as clickable strings)

## Structure

```
src/
  data.js               # ← edit your content here
  App.jsx               # layout: chrome → 3-col split → status bar
  components/
    WindowChrome.jsx     # traffic lights + file tabs
    FileTree.jsx         # left sidebar
    EditorTopBar.jsx     # breadcrumb + copy-link / hire-me
    CodeEditor.jsx       # the code body (renders data.js as TS)
    SkillChip.jsx        # inline skill chip w/ level bar
    ProjectCard.jsx      # inline project card
    Minimap.jsx          # right-side density map
    StatusBar.jsx        # bottom bar
    tokens.jsx           # syntax-highlight token spans
```

## Theme

Colors and fonts are defined in [tailwind.config.js](tailwind.config.js)
(GitHub Dark syntax palette + JetBrains Mono). Adjust them in one place.
