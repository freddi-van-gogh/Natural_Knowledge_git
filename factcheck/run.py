#!/usr/bin/env python3
"""Run the fact checker: regenerate the facts from the manuscript (if present), then ask Prolog.

    python3 factcheck/run.py            # report; warnings capped at 25
    python3 factcheck/run.py --all      # every warning
    python3 factcheck/extract.py --uncovered book:10-13 book-hs:10-13   # sentences no claim covers yet
    python3 factcheck/extract.py --check-quotes factcheck/claims/x.pl   # verify a claims file's quotes

Exit status is 1 if there are errors or blockers, 3 if Prolog could not load a file, and 0
otherwise, so it can gate a commit.
Needs SWI-Prolog:  sudo apt install swi-prolog
"""

from __future__ import annotations

import re
import shutil
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent


def main() -> int:
    if not shutil.which("swipl"):
        print("SWI-Prolog is not installed. Install it with:  sudo apt install swi-prolog", file=sys.stderr)
        return 2
    # The facts are rebuilt from the manuscript when it is here. A copy without it (such as
    # the public repository, which ships the books as PDFs) checks the facts already saved
    # in generated/, which were extracted from the text of the printed editions.
    if all((HERE.parent / d).is_dir() for d in ("book", "book-hs", "modern_alchemy")):
        gen = subprocess.run([sys.executable, str(HERE / "extract.py")])
        if gen.returncode:
            return gen.returncode
    else:
        print("No manuscript here, so checking the saved facts in factcheck/generated/.\n", file=sys.stderr)
    args = ["swipl", "-q", "-g", "main", str(HERE / "checks.pl")]
    if "--all" in sys.argv[1:]:
        args += ["--", "--all"]
    # When Prolog can't load a file, it reports the problem on stderr and carries on. That covers
    # a syntax error, and also a stray "/*" inside a comment, which opens a nested comment and
    # swallows the rest of the file. Left alone, a broken claims file would pass with its claims
    # silently missing, so any ERROR counts as a failure.
    run = subprocess.run(args, cwd=HERE, stderr=subprocess.PIPE, text=True)
    sys.stderr.write(run.stderr)
    if re.search(r"^ERROR\b", run.stderr, re.M):
        print("\nProlog could not load everything (see above), so these results are incomplete.", file=sys.stderr)
        return max(run.returncode, 3)
    return run.returncode


if __name__ == "__main__":
    raise SystemExit(main())
