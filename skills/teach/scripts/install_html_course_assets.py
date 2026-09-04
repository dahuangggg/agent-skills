#!/usr/bin/env python3
"""Install the bundled offline HTML course assets into a teaching workspace."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


SKILL_ROOT = Path(__file__).resolve().parent.parent
SOURCE = SKILL_ROOT / "assets" / "html-course"


def copy_file(source: Path, target: Path, force: bool) -> None:
    if target.exists() and not force:
        raise FileExistsError(f"Refusing to overwrite {target}; pass --force to refresh it")
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, target)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("workspace", type=Path, help="Teaching workspace root")
    parser.add_argument("--with-template", action="store_true", help="Install a sample lesson")
    parser.add_argument("--force", action="store_true", help="Overwrite existing bundled assets")
    args = parser.parse_args()

    workspace = args.workspace.expanduser().resolve()
    destination = workspace / "assets"
    files = [path for path in SOURCE.rglob("*") if path.is_file() and "templates" not in path.parts]
    for source in files:
        copy_file(source, destination / source.relative_to(SOURCE), args.force)

    if args.with_template:
        copy_file(
            SOURCE / "templates" / "lesson-template.html",
            workspace / "lessons" / "0001-lesson-template.html",
            args.force,
        )

    print(f"Installed {len(files)} HTML course assets into {destination}")
    if args.with_template:
        print("Installed lessons/0001-lesson-template.html")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

