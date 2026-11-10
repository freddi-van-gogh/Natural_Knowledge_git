:- discontiguous claim/6, says/4, source/3, depends_on/2, computes/3, event_year/3,
                 order_claim/3, interval_claim/4, variant_ok/3, gap/3, rests_on_gap/2,
                 arc_gap/3, arc_descriptive/3, cite_ok/3, about/2, drift_ok/3,
                 prose_ok/2, common_knowledge/1, certainty_ok/2.

% Support for nine settled claims that had neither a source nor a premise: the five statements
% of the heredity gap (book chs. 1, 16, 17; HS chs. 1, 16), the open-endedness limit (book ch. 4),
% the open prebiotic question (HS ch. 16), the three energy sources (book ch. 3) and the open
% origin of language (book ch. 16). No tier or kind is changed; only source/3 and depends_on/2.
%
% Checked 2026-11-03. Every work's metadata was checked against Crossref; content was read where
% each comment says, and quotations are verbatim from those texts.
% In book/19 already, without a dagger: Szathmáry 2015, Lincoln 2009, Kauffman 1986, Williams 2000.
% NEW, not yet in book/19, so each raises "not in the reference list" until it is added:
% Gianni 2026, Ameta 2021, Orgel 2008, Hauser 2014, Kleidon 2012.
%
% Line comments only in this file: SWI-Prolog nests block comments.

% ============================================== the origin of heredity, stated five times

% Sources sit where the gap is stated in its own right: book ch. 17's list of where the account
% stops, its HS twin in HS ch. 16, and HS ch. 1, whose pointer is to HS ch. 8, where nothing is
% encoded. Where the text points to an encoded claim, the restatement depends on that claim.

% Szathmáry 2015, PNAS full text (PMC4547294), section "Phases of Transitions to Cells": "The
% Origin of the First Hereditary Replicators. This process is still an unsolved problem. By itself,
% this transition is not an evolutionary one because, without hereditary replicators, no Darwinian
% evolution is possible."
source(d_c17_heredity_gap, 'Szathmáry', 2015).
% Gianni et al. 2026 (NEW), Science author manuscript (PMC7618777), first paragraph: "How this
% capacity for heredity and evolution first emerged is unknown." The paper is the newest advance
% (QT45, a 45-nucleotide ribozyme that makes itself and its complement), and its own model finds
% the fidelity reached too low to keep a population of active variants; the gap survives it.
source(d_c17_heredity_gap, 'Gianni', 2026).
% Book ch. 16 says "Chapters 8 and 17 say so"; ch. 8's statement is not encoded, ch. 17's is.
depends_on(c16_break, d_c17_heredity_gap).
% Book ch. 1 previews the gap ch. 17 lists as "The largest one, named already at the end of
% chapter 8", and ends "Chapter 17 lists the others".
depends_on(a_c01_largest_gap, d_c17_heredity_gap).
% HS ch. 16 is ch. 17's twin (both say acknowledged_open_questions/largest); HS twins carry the
% full edition's sources, as in d_ch14-20.pl. Szathmáry 2015, as above.
source(d_c16hs_copying_biggest, 'Szathmáry', 2015).
% Gianni et al. 2026 (NEW), as above.
source(d_c16hs_copying_biggest, 'Gianni', 2026).
% HS ch. 1 points to HS ch. 8, which has no encoded claim, so it takes the sources directly.
% Szathmáry 2015, as above.
source(a_c01hs_largest_gap, 'Szathmáry', 2015).
% Gianni et al. 2026 (NEW), as above.
source(a_c01hs_largest_gap, 'Gianni', 2026).

% ============================================== book ch. 4: nothing evolves open-endedly

% Lincoln & Joyce 2009, the "pairs of RNA enzymes that make each other" of ch. 4; NIH author
% manuscript (PMC2652413). Recombinants did take over its population, but from a fixed menu:
% "only two genetic loci with, at present, only 12 alleles per locus". It ends: "The self-sustained
% evolution of RNA with open-ended opportunities for discovering novel function likely has not
% occurred on Earth since the time of the RNA world, and continues to present an intriguing
% research opportunity."
source(c4_open_ended, 'Lincoln', 2009).
% Szathmáry 2015 (PMC4547294): for autocatalytic networks without templates, calculations show
% "limited evolvability, provided that reflexively autocatalytic networks are compartmentalized";
% and "we still have no general RNA-based replicase that could replicate a great variety of
% sequences, including copies of its own."
source(c4_open_ended, 'Szathmáry', 2015).
% Ameta et al. 2021 (NEW), a review judging experimental autocatalytic systems for Darwinian
% evolution; open full text (PMC8066523): "so far, there is no unambiguous experimental
% demonstration of the generation of such variation"; "The realization of Darwinian evolution in
% minimal chemical systems ... will require intensive investigations".
source(c4_open_ended, 'Ameta', 2021).
% Gianni et al. 2026 (NEW), the state this year: earlier polymerase ribozymes "have so far fallen
% short of self-replication"; QT45 makes its two strands only in separate reactions, "with further
% improvements in synthetic efficiency and fidelity likely required to overcome chemical
% degradation and achieve self-sustained replication".
source(c4_open_ended, 'Gianni', 2026).

% ============================================== HS ch. 16: was early chemistry rich enough?

% One side: Kauffman 1986 (abstract, Europe PMC): such sets "may be an essentially inevitable
% collective property of any sufficiently complex set of polypeptides".
source(d_c16hs_prebiotic_open, 'Kauffman', 1986).
% The other: Orgel 2008 (NEW), open full text (PMC2211548), answering that paper by name: that a
% cycle written down on paper "would self-organize spontaneously" is "unlikely because peptide
% molecules do not have the properties that Kauffman assigns to them"; Ghadiri's networks
% "illustrate 'intelligent design' of input peptides, not spontaneous self-organization".
source(d_c16hs_prebiotic_open, 'Orgel', 2008).
% Still open: Ameta et al. 2021 (NEW; PMC8066523), on autocatalytic systems that "spontaneously
% emerge from an abiotic chemical mixture": "Although there are theoretical studies that discuss
% the conditions for such an emergence, there are no experimental demonstrations so far."
source(d_c16hs_prebiotic_open, 'Ameta', 2021).

% ============================================== book ch. 3: three engines

% Empirical: the Sun, the interior and the tides are separate, continuing energy supplies. The
% book's own: counting them as three engines, and "Each pushed in one direction".
% Kleidon 2012 (NEW), read in arXiv:1103.2014v2, the revised submission of August 2011 (the
% published PDF was not reachable): the drivers of free-energy generation in the Earth system are
% "solar heat engines", "solar photochemical engines", "gravitational engines: gravitational
% forces by the Moon and the Sun ... in form of tides" and "interior heat engines: radioactive
% decay, crystallization of the core, and secular cooling of the interior". Four drivers from the
% book's three sources. It describes today's Earth, and its interior engine runs on "the depletion
% of the initial conditions of the planet", so "none of them was going to run out" holds over the
% chapter's timescales rather than forever.
source(a_c03_three_engines, 'Kleidon', 2012).
% Williams 2000 (abstract, via Crossref): tidal rhythmites record strong tides through the
% Precambrian, at 620 Ma and 2450 Ma, with the Moon closer than now (relative distance 0.965 and
% 0.906), so the tidal supply ran on through deep time. Its record starts at 2450 Ma.
source(a_c03_three_engines, 'Williams', 2000).

% ============================================== book ch. 16: how language arose is open

% Hauser et al. 2014 (NEW), abstract (open access, Europe PMC): "essentially no explanation of how
% and why our linguistic computations and representations evolved", the evidence "leaving details
% of origins and selective pressure unresolved" among "the many open hypotheses". A deliberately
% sceptical survey; the sentence claims much less. Nothing in book/19 covers this: Szathmáry 2015
% sketches a staged scenario for language but presents it as a scenario, not as settled.
source(d_c16_language_weaker, 'Hauser', 2014).
% Christiansen & Kirby 2003 (added at the author's request, alongside Hauser), abstract checked
% in Europe PMC: how language "came to be this way" is among "old unsolved questions", with
% "major remaining controversies (such as gestural origins of language)".
source(d_c16_language_weaker, 'Christiansen', 2003).

% ============================================== added during the merge (2026-11-03)

% The full edition's twin of d_c16hs_prebiotic_open, re-encoded as empirical to match it; the
% same three sources apply.
source(c16_prebiotic_open, 'Kauffman', 1986).
source(c16_prebiotic_open, 'Orgel', 2008).
source(c16_prebiotic_open, 'Ameta', 2021).
% c4_status is contested, so it raised no warning, but the same two works state its open
% question directly (quotations above).
source(c4_status, 'Orgel', 2008).
source(c4_status, 'Ameta', 2021).
