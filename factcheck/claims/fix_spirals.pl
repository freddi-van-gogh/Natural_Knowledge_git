:- discontiguous claim/6, says/4, source/3, depends_on/2, computes/3, event_year/3,
                 order_claim/3, interval_claim/4, variant_ok/3, gap/3, rests_on_gap/2,
                 arc_gap/3, arc_descriptive/3, cite_ok/3, about/2, drift_ok/3,
                 prose_ok/2, common_knowledge/1, certainty_ok/2.

% Support for the [unsourced] and [unchecked_source] warnings on chapter 10 and 11 claims
% defined in claims.pl and claims/c_ch10-13.pl. Schema: the header of factcheck/claims.pl.
% Checked 2026-11-03. Every reference marked NEW below is not yet in book/19, so the checker
% reports it as "not in the reference list" until the entry proposed for it is added there.
% Several of these sources support a corrected sentence rather than the current one. Each
% comment says so, and the corrections are proposed separately. They are not settled here.
% The [unchecked_source] warnings (O'Kelly 1982, Ortiz 1947, ICOMOS 2006, Whitney 1986) clear
% only when a dagger is removed from book/19. Facts here cannot clear them.

% c10_newgrange ("built around 3100 BCE"). NEW: Smyth et al. 2025, Antiquity 99(405), open
% access, read in the published version (White Rose eprint 228326). p. 672: radiocarbon dates
% from the 1960s excavations "demonstrated its construction and primary use in the later
% Neolithic, c. 3200-3000 cal BC (O'Kelly 1982; Lynch et al. 2014)". 3100 BCE is the midpoint.
% Guiry et al. 2025 (Proc. Prehist. Soc. 91) give c. 3300-3000 cal BC. O'Kelly 1982 itself was
% not reachable, so its dagger stays.
source(c10_newgrange, 'Smyth', 2025).

% c_c10_newgrange_two_kinds ("Its best-known stones set the two kinds side by side"). NEW: the
% Discovery Programme's published descriptions of its 3D models (2014), read via the Sketchfab
% API. Entrance stone K1: "a series of clockwise and anti-clockwise spirals ... There are also
% lozenges to the left side of the stone." Kerbstone 52, "at the rear of the mound directly
% opposite kerbstone 1": "The lefthand side is decorated with a double spiral, with 2 smaller
% spirals to its right. Below these a series of lozenges picked in relief." This is an
% institutional record, not peer-reviewed. O'Kelly 1982 remains the better source once read,
% and if that happens this line can go.
source(c_c10_newgrange_two_kinds, 'Discovery Programme', 2014).

% c10_ortiz: no new fact. The existing source is right. Ortiz 1947 was read in a scan of the
% FCE edition (Internet Archive), chapter "El enigma de unas figuras indocubanas". p. 32: the
% S-shaped arms give "la idea inequivoca de una actitud rotatoria", turning counterclockwise,
% and are "como dos espirales conjugadas en un solo foco comun". p. 35: the storm can be figured
% "por una simple linea espiral". p. 40: "Interpretacion meteorologica", the figure read as the
% hurricane. p. 45: hurricanes north of the equator are "siempre levogiro". This supports
% removing the dagger from Ortiz 1947.

% c10_plazuelas: no new fact. ICOMOS 2006 was read in full (ICOMOS open archive PDF, Mexico
% section by Murray & Viramontes, p. 5). It gives "more than 1400 petroglyphs" and dates the
% centre, not the carvings, to 750-1200 A.D. It describes the petroglyphs as "principally
% spirals, dot figures and scale models of architectural features", not predominantly spirals.
% INAH dates the city's height to 450-700 CE. The sentence needs correcting before the dagger
% goes.

% c10_rosse. NEW: Whitney 1992, a letter in Physics Today 45(8): 13, by the astronomer himself,
% read in the AIP-hosted scan. He and Boime "independently concluded" that the sky was observed.
% Flammarion "had reproduced the drawing of the Whirlpool nebula by Lord Rosse", and "Van Gogh's
% painting is remarkably similar to Lord Rosse's drawing". The letter does not give the year
% 1845 or mention the mistral. Whitney 1986 itself was not reachable, so its dagger stays.
source(c10_rosse, 'Whitney', 1992).
% Added during the merge: Nasim 2010, British Journal for the History of Science 43(3), abstract
% via Crossref: M51 is followed "beginning with its discovery and first sketch made by the third
% Earl of Rosse in 1845". This supplies the date that Whitney's letter leaves out.
source(c10_rosse, 'Nasim', 2010).

% c10_rope and c10hs_rope. NEW: Glory 2008, the excavator's own account, published
% posthumously (CNRS Editions, open access on OpenEdition), chapter "Lascaux", paragraphs
% 273-279. The cord was about 30 cm long and 7-8 mm thick, and "semblait avoir ete faconnee
% avec trois brins torsades vers la droite". It lay in contact with the reindeer-bone
% palaeosol, which paragraphs 299-300 date to GrN-1632, 17,190 +/- 135 BP ("environ 17 000
% ans"). NEW: Ducasse & Langlais 2019, Paleo 30, open access. That date is "21-20.5 cal ka
% BP", and their new AMS dates on the occupation centre on 21.5-21 cal ka BP. Together these
% support the HS "at least 17,000 years" as it stands. They contradict the full edition's
% "two-ply" (Glory gives three strands) and its "about seventeen thousand years old", which
% is radiocarbon years read as calendar years. A correction is proposed.
source(c10_rope, 'Glory', 2008).
source(c10_rope, 'Ducasse', 2019).
source(c10hs_rope, 'Glory', 2008).
source(c10hs_rope, 'Ducasse', 2019).

% c_c10_five_least (a spiral wave that needs no material rotation). NEW: Winfree 1972, Science
% 175: 634-636, abstract read on Crossref and Europe PMC: the reagent "propagates waves of
% chemical activity", and "If a wave is broken, then spiral waves ... appear, persist". Prigogine
% 1978, already in book/19, mentions chemical waves but not spirals, so it cannot carry this.
% "The one that" reads as unique, but by the chapter's own account growth spirals and
% phyllotaxis need no rotating material either. What is unique is a turning spiral with no
% material rotation. An optional precision is proposed.
source(c_c10_five_least, 'Winfree', 1972).

% c_c10_tendril ("its two sides elongate at different rates"). NEW: Gerbode et al. 2012,
% Science, abstract (PubMed 22936777): coiling "occurs via asymmetric contraction of an internal
% fiber ribbon of specialized cells", which is contraction, not elongation. NEW: Dilly, Derr &
% Zanchi 2026, PNAS, abstract (Europe PMC; full text not reachable): "curvature arises from
% differential growth". The two disagree on the mechanism. Both support a neutral wording, that
% the two sides change length by different amounts, and a correction to that is proposed.
source(c_c10_tendril, 'Gerbode', 2012).
source(c_c10_tendril, 'Dilly', 2026).

% c_c10hs_fixed_amount (a snail grows at the opening by a fixed proportion). Thompson 1917,
% already in book/19, which is the source of the full-edition twin c_c10_fixed_ratio. Read in
% the 1917 Cambridge edition (Internet Archive scan), chapter XI. p. 496: the snail-shell "has
% been conformed by successive and continuous increments". p. 508: the shell grows "by growing
% at one end only", and "this property of continued similarity is found only in the
% logarithmic spiral". p. 509: the gnomon, an addition that "leaves the resultant figure
% similar to the original".
source(c_c10hs_fixed_amount, 'Thompson', 1917).

% c_c11_three_cyclic (at least three cyclic answers). All three are in book/19, none daggered.
% Ashtekar, Pawlowski & Singh 2006, abstract (arXiv gr-qc/0602086): "the big bang is replaced by
% a big bounce". Smolin 1992, abstract (IOP): "all final singularities 'bounce' or tunnel to
% initial singularities of new universes". Penrose 2010: conformal cyclic cosmology's sequence of
% aeons, as chapter 11 states it; this book was not re-read here.
source(c_c11_three_cyclic, 'Ashtekar', 2006).
source(c_c11_three_cyclic, 'Penrose', 2010).
source(c_c11_three_cyclic, 'Smolin', 1992).
