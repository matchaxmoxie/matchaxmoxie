# Monorepo only: sync from matchaxmoxie/matchaxmoxie

This file is **not** copied from the mirror. `pull-mirror.sh` overwrites `README.md` and `docs/` from the mirror, so long-lived UCM-only notes live here.

## Scripts

| Script | Role |
| :--- | :--- |
| [`pull-mirror.sh`](pull-mirror.sh) | Full archive sync from remote `matchaxmoxie` `main` into this folder. |
| [`pull-mirror-if-changed.sh`](pull-mirror-if-changed.sh) | `git fetch`, then run `pull-mirror.sh` only if `main` advanced. Writes `.git/matchaxmoxie-last-pulled`. |

## Automatic checks (macOS)

GitHub cannot push to your Mac when the mirror changes, so “keep me updated” means **polling** on a schedule (or run `pull-mirror-if-changed.sh` yourself).

1. Copy [`launchd.matchaxmoxie-sync.plist.example`](launchd.matchaxmoxie-sync.plist.example) to `~/Library/LaunchAgents/` and rename (for example `com.yourname.ucm-matchaxmoxie-sync.plist`).
2. Replace `UCM_ROOT_PLACEHOLDER` with your absolute path to the UCM repo (keep the path inside single quotes in the `cd` string).
3. Load once: `launchctl load ~/Library/LaunchAgents/com.yourname.ucm-matchaxmoxie-sync.plist`

The example uses `StartInterval` 3600 (seconds). Adjust or add `StandardOutPath` / `StandardErrorPath` in the plist if you want logs.

## Force a full pull

Delete `.git/matchaxmoxie-last-pulled` if you want the next `pull-mirror-if-changed.sh` run to compare fresh and re-sync even when the remote SHA matches what was last recorded.
