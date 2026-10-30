# matchaxmoxie Scratch starters (`.sb3`)

Archive. The Scratch studio is **retired from the public homepage**. There is no `scratch-studio.html` in `site/` right now. Playground: [`../scratch-play.html`](../scratch-play.html).

Original geometric costumes and teaching scripts. Not affiliated with Scratch Team. No Scratch Team library art.

| File | How-to |
|------|--------|
| `jumping-game.sb3` | Jumping Game |
| `catch-game.sb3` | Catch Game |
| `pong-game.sb3` | Pong Game |
| `clicker-game.sb3` | Clicker Game |
| `scrolling-background.sb3` | Scrolling Background |
| `virtual-pet.sb3` | Virtual Pet |
| `story.sb3` | Story |
| `character-designer.sb3` | Character Designer |

Studio intro stays text-only (no starter file).

## Play on this site (archive)

1. Open the [playground](../scratch-play.html?project=jumping).
2. Green flag runs on matchaxmoxie (same origin) when the player files are present.
3. Optional: download the `.sb3` to remix offline in Scratch later.

站内播放器用 `../scratch-player/`（TurboWarp Scaffolding）。重建说明见该目录 README。

## Optional: publish share URLs (Jade)

So the studio can link “See live on Scratch” later:

1. Sign in as the Scratch account you want to own the projects.
2. **File → Load from your computer** → open each `.sb3`.
3. **File → Save now**, then **Share**.
4. Copy each project URL (`https://scratch.mit.edu/projects/...`).
5. Paste into `scratch-studio.html` next to the matching download button (optional second link).

Regenerate files after costume/script edits:

```bash
python3 scripts/generate-scratch-starters.py
```
