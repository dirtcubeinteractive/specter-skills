#!/usr/bin/env bash
# Refresh the vendored Specter user-manual pages from manual.specterapp.xyz.
# Each page is a GitBook markdown file; the llms.txt index lists them all.
# After running this, re-run: node scripts/generate-manual-references.mjs
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/specs/manual"
INDEX="https://manual.specterapp.xyz/specter-user-manual/llms.txt"
mkdir -p "$OUT"
rm -f "$OUT"/*.md
echo "Fetching page index from $INDEX …"
curl -sL "$INDEX" | grep -oE 'https://manual.specterapp.xyz/specter-user-manual/[^ )]+\.md' | sort -u > "$OUT/.urls"
echo "Downloading $(wc -l < "$OUT/.urls" | tr -d ' ') pages …"
while read -r url; do
  slug=$(echo "$url" | sed -E 's#https://manual.specterapp.xyz/specter-user-manual/##; s#\.md$##; s#/#__#g')
  curl -sL "$url" -o "$OUT/$slug.md"
done < "$OUT/.urls"
echo "Fetching Unity SDK pages …"
curl -sL "https://dirtcube-interactive.gitbook.io/specter-unity-sdk/llms.txt" | grep -oE "https://[^ )]+/specter-unity-sdk/[^ )]+\.md" | sort -u | while read -r url; do slug=$(echo "$url" | sed -E "s#.*/specter-unity-sdk/##; s#\.md$##; s#/#__#g"); curl -sL "$url" -o "$OUT/unity-sdk__$slug.md"; done
rm -f "$OUT/.urls"
echo "✓ vendored $(ls "$OUT"/*.md | wc -l | tr -d ' ') manual pages to specs/manual/"
