# Battle of Waterloo — Interactive Map

An interactive map that lets you watch the Battle of Waterloo unfold step by step. You can move through 12 phases of the battle (from 11:00 AM to 8:15 PM on June 18, 1815) and see where each army was, what happened, and how the battle progressed.

## What Does This Project Do?

When you open the app in your browser, you see:

- **A map** of the Waterloo battlefield (near Brussels, Belgium) with colored dots showing where each army's units are positioned.
- **A timeline slider** at the bottom that lets you move forward and backward through the battle — like scrubbing through a video.
- **A detail panel** on the right side that shows what is happening during each phase: a summary, the weather, key events, and how many troops each side has.
- **A play button** that automatically moves through the phases every 3 seconds, like a slideshow.

The three armies are color-coded:

| Color | Army |
|-------|------|
| **Blue** | French (Napoleon) |
| **Red** | Allied (Wellington — British, Dutch, German troops) |
| **Dark gray** | Prussian (Blücher — arriving later in the battle) |

## How to Run the Project

You need [Node.js](https://nodejs.org/) installed on your computer (version 18 or newer).

1. Open a terminal and navigate to the project folder.
2. Install the required packages:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open your browser and go to [http://localhost:3000](http://localhost:3000).

That's it — the map should appear and you can start exploring the battle.

## Where Is the Data and How to Change It

All the content you see on the screen lives in simple text files inside the project. Here is what each file controls and how you can edit it.

### Battle Phases and Troop Positions

**File:** `data/timeline-events.ts`

This is the most important file. It contains all 12 phases of the battle. Each phase has:

- **time** — what time of day it is (e.g. `"11:00 AM"`)
- **title** — a short name for the phase (e.g. `"Assault on Hougoumont"`)
- **weather** — what the weather was like
- **overview** — a paragraph explaining what is happening
- **keyEvents** — a list of important things that happened during this phase
- **troopStrength** — how many soldiers and guns each side has
- **troops** — a list of army units with their position on the map (`lat` and `lng`), their commander, strength, and status

To change what is shown for a phase, open this file and edit the text. For example, to change the overview of the first phase, find the line that starts with `overview:` and replace the text in quotes.

To move a unit on the map, change its `lat` (latitude — up/down) and `lng` (longitude — left/right) numbers. Small changes make a big difference because the map area is small.

Each unit also has a **status** that can be one of: `"fresh"`, `"engaged"`, `"advancing"`, `"retreating"`, or `"routed"`. This changes how the unit looks on the map.

### Army Colors

**File:** `data/factions.ts`

This file defines the three armies (French, Allied, Prussian) and what color they appear as on the map. You can change the colors here if you want.

### Map Locations

**File:** `components/leaflet-map.tsx`

This file draws the map. Near the top, you'll find a list called `LOCATIONS` with the key places on the battlefield (Hougoumont, La Haye Sainte, Plancenoit, etc.). Each location has a name and map coordinates.

### Page Layout and Styling

**File:** `app/page.tsx` — the main page that puts everything together.
**File:** `app/globals.css` — the visual styling (colors, fonts, spacing).

## Project Structure

Here is a simplified view of the project folder:

```
waterloo-battle/
├── app/                     ← The main application
│   ├── page.tsx             ← The page you see in the browser
│   ├── layout.tsx           ← Page setup (title, fonts)
│   └── globals.css          ← Visual styling
├── components/              ← Building blocks of the page
│   ├── battlefield-map.tsx  ← Map wrapper
│   ├── leaflet-map.tsx      ← The actual map with markers
│   ├── timeline-slider.tsx  ← The timeline control at the bottom
│   ├── detail-panel.tsx     ← The info panel on the right
│   ├── header.tsx           ← The top bar
│   └── legend.tsx           ← The color legend
├── data/                    ← All the battle content
│   ├── timeline-events.ts   ← The 12 phases, troop positions, and text
│   └── factions.ts          ← Army names and colors
├── types/                   ← Data shape definitions
│   └── index.ts
└── package.json             ← List of libraries the project uses
```

## How It All Works Together

1. When the page loads, it reads the battle data from the `data/` folder.
2. The **map** shows the troop positions for the current phase.
3. The **timeline slider** lets you pick which phase to view. When you move the slider (or press play), the map updates to show the new positions.
4. The **detail panel** updates with the story, weather, and key events for that phase.
5. You can also use the **left/right arrow keys** on your keyboard to step through phases, or press **space** to play/pause.

No internet connection is needed after the initial setup, except for loading the map tiles (the satellite/terrain background images).

## Built With

- [Next.js](https://nextjs.org/) — the framework that runs the app
- [React](https://react.dev/) — the library for building the user interface
- [Leaflet](https://leafletjs.com/) — the library for the interactive map
- [Tailwind CSS](https://tailwindcss.com/) — the library for styling
