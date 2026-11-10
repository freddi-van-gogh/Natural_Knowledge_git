# Natural Knowledge - a collection

Four connected books about how complexity accumulates, from prebiotic chemistry through biology, cognition, language, and culture, and the fact checker that tests them.

*By Freddi Van Gogh · [CC BY-SA 4.0](./LICENSE)*

---

## The books

Each PDF is a paperback interior: the whole book, laid out for print, without its cover.

| # | Book | PDF | Pages |
|---|---|---|---:|
| 1 | *Natural Knowledge* (main edition): spirals, memes, and art | [Natural_Knowledge-paperback-interior.pdf](./Natural_Knowledge-paperback-interior.pdf) | 220 |
| 2 | *Natural Knowledge* (high school edition): spirals, memes, and art | [Natural_Knowledge_High_School_Edition-paperback-interior.pdf](./Natural_Knowledge_High_School_Edition-paperback-interior.pdf) | 144 |
| 3 | *Modern Alchemy*: a reference apparatus for Natural Knowledge (expanded edition) | [Modern_Alchemy_Expanded_Edition-paperback-interior.pdf](./Modern_Alchemy_Expanded_Edition-paperback-interior.pdf) | 82 |
| 4 | *Prolog Logicbase*: the fact checker behind Natural Knowledge | [Prolog_Logicbase-paperback-interior.pdf](./Prolog_Logicbase-paperback-interior.pdf) | 118 |

**1. *Natural Knowledge*, main edition.** How complexity accumulates, from prebiotic chemistry through life, mind, language, and culture, with every claim marked as established, contested, or the author's own. It argues that the same vocabulary (variation, selection, retention, amplification, compression, transmission) is useful across very different systems, while insisting, repeatedly, that a shared vocabulary is not a shared mechanism.

**2. *Natural Knowledge*, high school edition.** The same account, shorter and plainer, for younger readers, with each idea boxed as settled, still argued about, or the author's own. It is not the full edition with shorter words. What did not go is the honesty about what nobody knows: the origin of heredity is still named as unexplained, and the strongest objection to the whole framework is still quoted in full.

**3. *Modern Alchemy*.** The book's concepts as a numbered glossary with a notation for combining them, and a frank list of what the notation cannot say. It opens with a primer on alchemy. It is oversimplified on purpose and says so on its first page: the point is not to replace understanding but to give it handles.

**4. *Prolog Logicbase*.** The fact checker behind the series: the books' key claims written as logic and tested for contradictions and overstatement. The program it prints is in [`factcheck/`](./factcheck/), and runs as described below.

---

## The fact checker

[`factcheck/`](./factcheck/) is written in Prolog. It holds every sentence of both editions of *Natural Knowledge* as a fact, alongside *Modern Alchemy*'s concepts and worked chains and 426 hand-encoded claims. It then tests them for contradictions, arithmetic errors, citation and chronology problems, and arguments that claim more than they've shown. [`factcheck/README.md`](./factcheck/README.md), the opening chapter of *Prolog Logicbase*, explains how it works, what it reports, and what it cannot do.

### Setting up

You need **SWI-Prolog**, and **Python 3** for the runner script.

| System | Install SWI-Prolog with |
|---|---|
| Debian, Ubuntu | `sudo apt install swi-prolog` |
| macOS ([Homebrew](https://brew.sh)) | `brew install swi-prolog` |
| Windows, and anything else | the installer from [swi-prolog.org/Download.html](https://www.swi-prolog.org/Download.html) |

Then check that it's on your path:

```sh
swipl --version
```

On Windows, tick the option to add SWI-Prolog to the `PATH` when the installer offers it, and type `python` (or `py`) wherever this page says `python3`. The checker was last run with SWI-Prolog 9.0.4 and Python 3.12.

### Running it

From the top of the repository:

```sh
python3 factcheck/run.py          # the report, with warnings capped at 25
python3 factcheck/run.py --all    # every warning
```

Or with Prolog alone:

```sh
cd factcheck
swipl -q -g main checks.pl
```

On the facts as shipped, the report is 0 errors, 0 blockers, 1 warning (a source whose support is not yet checked) and 12 info notes, followed by the coverage figures.

The exit status is 0 when there are no errors or blockers, 1 when there are, 2 when SWI-Prolog isn't installed, and 3 when Prolog could not load a file. The last matters more than it looks: a stray `/*` inside a comment opens a nested comment in SWI-Prolog and silently swallows the rest of the file, so `run.py` treats any load error as a failure.

### Asking it your own questions

Load the facts and rules into an interactive session:

```sh
cd factcheck
swipl checks.pl
```

Then type queries at the `?-` prompt. End each one with a full stop, press `;` for the next answer, and type `halt.` to leave.

```prolog
?- claim(c9_giraffe, Edition, Chapter, Quote, Tier, Kind).
?- says(c9_giraffe, Subject, Property, Value).
?- check(Severity, Kind, Message).
?- aggregate_all(count, claim(_, _, _, _, contested, _), N).
```

The first asks what the claim about the giraffe's nerve quotes, and how it's tiered; the second what it states as a value. The third lists every finding, and the fourth counts the claims the books present as contested. The claims schema is in the header of `claims.pl`.

### What's in `factcheck/`

| Path | What it is |
|---|---|
| `checks.pl` | The rules: what counts as an error, a blocker, a warning, or info |
| `claims.pl`, `claims/*.pl` | The hand-encoded claims, each quoting its sentence verbatim |
| `generated/*.pl` | The text as facts: every sentence of both editions, the companion's glossary and chains, the reference list, and whether each claim's quote is still in the text |
| `run.py` | Runs the checker and sets the exit status |
| `extract.py` | Rebuilds `generated/` from the manuscript |

### What this repository leaves out

The books' Markdown sources aren't here, only the PDFs. So `generated/` is a saved snapshot, extracted from the same text as the printed editions, and `run.py` checks that snapshot instead of rebuilding it. (`factcheck/README.md` was written for the full source tree, where `generated/` is rebuilt on every run and not committed.)

`extract.py` needs the manuscript (`book/`, `book-hs/` and `modern_alchemy/`), so its `--uncovered` and `--check-quotes` options don't run here. You can still change the rules and the existing claims and run the checker. A *new* claim will report an `[anchor]` error, though, because only `extract.py` can confirm that its quote is in the text.

---

## How this was written

The book is a synthesis of the author's own notes, worked through in extended conversation with several large language models — principally OpenAI's ChatGPT (GPT-5.4) and Anthropic's Claude. Google's Gemini was also used to summarize parts of the email correspondence, and other tools were used occasionally. The ideas, the selection, the structure, and the judgement about what survives scrutiny are the author's. A substantial amount of the prose was drafted by machine and then revised.

This is stated plainly rather than buried: a book arguing for making compression visible would be a poor advertisement for itself if it hid its own. Each book also says how it was made, on a page of its own after the copyright page.

---

## Licence

[Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](./LICENSE).

Share it, remix it, build on it, sell it — but credit the source and release what you build under the same terms.

**Attribution:**

> Freddi Van Gogh, *Natural Knowledge* (2026). Licensed CC BY-SA 4.0.

The ShareAlike term is deliberate. The argument in *Natural Knowledge* is that systems stay healthy when the way they encode things remains visible and nobody can quietly enclose it. A licence that let this be absorbed into something closed would contradict the book.
