# Fact checker

Tests the manuscript for statements that contradict each other, arithmetic that doesn't add up, and arguments that claim more than they've shown.

```sh
python3 factcheck/run.py          # needs SWI-Prolog: sudo apt install swi-prolog
```

## In one paragraph, for a ten-year-old

Prolog is a computer language for working things out. Most programs are recipes: do this, then this. Prolog is more like a detective with a notebook. You give it facts ("chapter 9 says the giraffe's nerve is four and a half metres long") and rules ("if two chapters give different numbers for the same thing, that's a problem"). Then you ask it a question ("is there a problem anywhere?") and it checks every fact against every rule, without getting bored, and tells you everything it finds. Tell it that all dogs are mammals and Rex is a dog, and it works out that Rex is a mammal by itself.

## How it works

A Prolog program is a set of facts and rules (Horn clauses). Prolog answers a query by searching for a proof. It *unifies* the query's variables with facts and rule heads, and it *backtracks* through every way the rules can be satisfied. Here every solution is collected, so the search is exhaustive. It also assumes a *closed world*: anything neither stated nor derivable counts as false. So a step the book never supports shows up as missing, instead of being filled in the way a sympathetic reader fills it in.

The facts come in three layers:

| Layer | Where | How it's made |
|---|---|---|
| **The text** | `generated/text.pl` | Automatic. Every sentence of both editions, with its numbers, dates, named authorities, chapter cross-references, certainty and hedge words, and its tier where the text marks one (HS boxes; the full edition's italic author passages). |
| **The companion** | `generated/glossary.pl`, `generated/notation.pl` | Automatic. *Modern Alchemy*'s 119 concepts, and its worked chains as relations: `→` produces, `⊂` kind of, `≈` analogous, `↑` amplifies, `↓` constrains. Plus the "whole arc", one step per arrow across its strands. |
| **The propositions** | `claims.pl`, `claims/*.pl` | By hand. What key sentences *mean*: values, tier, sources, dependencies, arithmetic, dates. Each claim quotes its sentence verbatim, and `generated/anchors.pl` records whether that quote is still in the book. |

`generated/` is rebuilt on every run and is not committed. `refs.pl` there is built from the reference list in `book/19`.

## What it reports

| Severity | Checks |
|---|---|
| **error** | the same quantity stated incompatibly (also across editions) · arithmetic the text gets wrong · events out of order, or a stated gap that the dates contradict · an in-text citation year with no matching reference · a source missing from the reference list · a cross-reference to a chapter that doesn't exist · a heading that promises *n* items and lists a different number · circular support · a claim whose quote has left the text · a duplicate claim id or contradictory event dates |
| **blocker** | a settled claim resting, directly or through a chain, on a contested or author's-own premise · a settled claim resting on an acknowledged gap · a step in the companion's whole arc with no worked chain behind it (a path of up to four chains counts, and the path is printed under info) · an analogy (`≈`) also used as a mechanism (`→`) · a chain that skips a substrate (chemical → cultural) in one arrow |
| **warning** | numbers that drift between related passages · certainty words ("always", "proves") inside contested or author-marked passages · settled empirical claims with no source · sources whose support is not yet checked (`†` in the reference list) · tier mismatches across editions · boxes that claim more scope than the edition's own rule allows |
| **info** | gaps the book itself acknowledges, and arc steps it describes as descriptive rather than mechanistic · coverage |

Exit status is 1 when there are errors or blockers, and 3 when Prolog could not load a file. That second case would otherwise go unnoticed: a stray `/*` inside a comment opens a nested comment in SWI-Prolog and silently swallows the rest of the file.

## Adding a claim

Find sentences that nothing covers yet:

```sh
python3 factcheck/extract.py --uncovered book:14-17 book-hs:14-16
```

Then write the claim in `claims.pl`, or in a file under `claims/`. The schema is in the header of `claims.pl`, and the existing claims are worked examples:

```prolog
claim(c9_giraffe, book, 9, "about four and a half metres of nerve to span a gap of inches", settled, quantitative).
source(c9_giraffe, 'Wedel', 2012).
says(c9_giraffe, giraffe_laryngeal_nerve_path, metres, approx(4.5)).
```

Two rules matter more than the rest:

- **The tier is how the text presents the claim, not how you'd like it to be.** The checker's value is in catching the text overstating itself, and that only works if the encoding is faithful.
- **When both editions state the same fact, use the same subject and property**, so the two get compared.

Check a claims file's quotes without touching anything shared:

```sh
python3 factcheck/extract.py --check-quotes factcheck/claims/your-file.pl
```

## What it cannot do

It cannot establish that anything is *true*. It tests whether the book agrees with itself and with the sources it names, and an error that is consistent everywhere will pass. The automatic layer is literal. It knows that two sentences share a number and four words, not that they are about the same thing, so its drift warnings are prompts for a reader rather than verdicts. And a hand-encoded claim is only as good as its encoding. A wrong tier or a missing dependency hides exactly what the checker exists to find.
