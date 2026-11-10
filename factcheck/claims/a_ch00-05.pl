:- discontiguous claim/6, says/4, source/3, depends_on/2, computes/3, event_year/3,
                 order_claim/3, interval_claim/4, variant_ok/3, gap/3, rests_on_gap/2,
                 arc_gap/3, arc_descriptive/3, cite_ok/3, about/2, drift_ok/3,
                 prose_ok/2, common_knowledge/1, certainty_ok/2.

/*  Without this, SWI-Prolog (9.0.4) treats a second file that defines claim/6,
    says/4, ... as a redefinition and wipes the clauses claims.pl already loaded
    ("Redefined static procedure"), even though checks.pl declares them dynamic.
    Declaring them multifile makes this file, and every claims file loaded after
    it, add to claims.pl instead of replacing it. Harmless when loaded alone. */
:- multifile claim/6, says/4, source/3, depends_on/2, computes/3, event_year/3,
             order_claim/3, interval_claim/4, variant_ok/3, gap/3, rests_on_gap/2,
             arc_gap/3, arc_descriptive/3, cite_ok/3, about/2, drift_ok/3,
             prose_ok/2, common_knowledge/1, certainty_ok/2.

/*  Structured claims for full-edition chapters 0-5 and HS chapters 0-5.
    Schema: see the header of factcheck/claims.pl.

    Not encoded (number-bearing sentences left uncovered on purpose):
      - book ch.0 front matter (licence, attribution): not propositions; and since
        00-front-matter.md and 00-preface.md share chapter number 0, extract.py's
        chapter_texts() keeps only the preface, so no front-matter quote can anchor.
      - Sentences under 40 characters cannot be matched by checks.pl's covered/1
        (it takes the first 40 characters of a quote): book ch.5 "The first five
        improve the chemistry."; HS ch.1 "Three completely different machines.";
        HS ch.2 "Two molecules ...", "Two puppies ...", "Two retellings ...",
        "All eight are descriptions.", "Three rows, one heading."; HS ch.3
        "Four billion tries."
      - HS ch.1 "How this book checks itself" is skipped (being written separately).
*/

/* ======================================================== chapter 1 (full) */

claim(a_c01_same_word, book, 1, "The same word can be correctly applied to a chemical reaction network and to a language without the two sharing any machinery.", settled, generalization).
says(a_c01_same_word, shared_vocabulary, establishes_shared_mechanism, false).

claim(a_c01_three_selections, book, 1, "Selection in a population of molecules, in a population of organisms, and in a population of ideas are three unrelated processes that a single word happens to fit.", settled, interpretive).
says(a_c01_three_selections, selection_mechanisms_compared, count, 3).

claim(a_c01_largest_gap, book, 1, "The largest one is named in chapter 8: how chemistry first came to copy a pattern reliably enough for selection to accumulate across generations is not known, and nothing here narrows it.", settled, empirical).
says(a_c01_largest_gap, heredity_origin, known, false).

claim(a_c01_three_voices, book, 1, "Presenting all three in the same confident voice would be the easiest way to mislead, and the hardest to detect.", settled, interpretive).
says(a_c01_three_voices, statement_tiers, count, 3).       % settled / disputed / the author's own

claim(a_c01_three_code_accounts, book, 1, "It is why chapter 8 gives three competing accounts of why the genetic code is error-tolerant and declines to pick, rather than presenting the most popular one as settled.", settled, interpretive).
says(a_c01_three_code_accounts, genetic_code_error_tolerance_accounts, count, 3).   % book ch.8 l.41 and HS ch.8 l.31 both give three

claim(a_c01_borrowing_limits, book, 1, "The limits of the borrowing should be stated plainly, because the two enterprises settle questions by completely different means.", settled, interpretive).
says(a_c01_borrowing_limits, talmud_and_this_book, settle_questions_by_same_means, false).

% Courts and legislatures (added 2026-11-06 at the author's request: "don't cite any specific
% country to avoid any citation adds"). General statements about common institutional practice,
% so common_knowledge rather than a source; the HS twins below say the same.
claim(a_c01_courts_dissent, book, 1, "In many courts a judge who disagrees with a ruling can publish a dissenting opinion beside it, and a later court sometimes adopts reasoning that first appeared in dissent.", settled, generalization).
says(a_c01_courts_dissent, dissenting_opinions, sometimes_adopted_later, true).
common_knowledge(a_c01_courts_dissent).
claim(a_c01_precedent, book, 1, "Courts that follow precedent explain each decision against the earlier cases it follows or departs from, so the reasons travel with the ruling.", settled, generalization).
common_knowledge(a_c01_precedent).
claim(a_c01_legislative_record, book, 1, "Many legislatures keep a verbatim record of their debates, with the amendments that failed and how members voted, so the case against a law stays on the record after the law passes.", settled, generalization).
says(a_c01_legislative_record, legislatures, keep_record_of_debates, true).
common_knowledge(a_c01_legislative_record).
claim(a_c01_courts_limits, book, 1, "These institutions settle questions by authority and by vote rather than by experiment, so the limits stated above apply to them too.", settled, interpretive).
says(a_c01_courts_limits, courts_legislatures_and_this_book, settle_questions_by_same_means, false).

claim(a_c01_order_departure, book, 1, "Chapters 5, 6, and 7 follow boundaries as a theme — compartments, then compartments inside compartments, then an organism and the organisms living on it — which means chapters 6 and 7 describe things that already require heredity, while chapter 8, where heredity arrives, comes after them.", settled, interpretive).
says(a_c01_order_departure, book_chapter_order, strictly_chronological, false).   % agrees with book ch.8 l.65

/* ========================================================== chapter 1 (HS) */

claim(a_c00hs_three_kinds, 'book-hs', 0, "Every book like this mixes three different kinds of statement.", settled, interpretive).
says(a_c00hs_three_kinds, statement_tiers, count, 3).

claim(a_c01hs_shared_question, 'book-hs', 1, "That question is worth asking in all three cases. The answer is different every time, and the answer is the part that matters.", settled, interpretive).
says(a_c01hs_shared_question, selection_mechanisms_compared, count, 3).

claim(a_c01hs_largest_gap, 'book-hs', 1, "There is a big one, and chapter 8 is where you hit it: nobody knows how chemistry first started copying itself reliably.", settled, empirical).
says(a_c01hs_largest_gap, heredity_origin, known, false).

claim(a_c01hs_three_code_accounts, 'book-hs', 1, "In chapter 8 there are three competing explanations for something, and I don't pick.", settled, interpretive).
says(a_c01hs_three_code_accounts, genetic_code_error_tolerance_accounts, count, 3).

claim(a_c01hs_borrowing_limits, 'book-hs', 1, "The two things are not the same, and I want to be clear about that. Those texts settle questions by authority and tradition.", settled, interpretive).
says(a_c01hs_borrowing_limits, talmud_and_this_book, settle_questions_by_same_means, false).

% Courts and parliaments, the HS twins of the a_c01_ claims above (2026-11-06).
claim(a_c01hs_courts_dissent, 'book-hs', 1, "Sometimes, years later, another court ends up agreeing with the dissent.", settled, generalization).
says(a_c01hs_courts_dissent, dissenting_opinions, sometimes_adopted_later, true).
common_knowledge(a_c01hs_courts_dissent).
claim(a_c01hs_dissent_published, 'book-hs', 1, "In many courts, a judge who disagrees with a decision can write a dissent, explaining why, and it's published right next to the ruling.", settled, generalization).
common_knowledge(a_c01hs_dissent_published).
claim(a_c01hs_legislative_record, 'book-hs', 1, "Many parliaments keep a word-for-word record of their debates, so the arguments against a law are still there after it passes.", settled, generalization).
says(a_c01hs_legislative_record, legislatures, keep_record_of_debates, true).
common_knowledge(a_c01hs_legislative_record).
claim(a_c01hs_courts_limits, 'book-hs', 1, "They settle things by authority and by vote, though, not by experiment, so the same limits apply to them too.", settled, interpretive).
says(a_c01hs_courts_limits, courts_legislatures_and_this_book, settle_questions_by_same_means, false).

/* ======================================================== chapter 2 (full) */

claim(a_c02_word_warning, book, 2, "A word that correctly applies to a chemical reaction and to a language has not shown that the two have anything in common beyond being describable.", settled, generalization).
says(a_c02_word_warning, shared_vocabulary, establishes_shared_mechanism, false).

claim(a_c02_rhyme, book, 2, "That abstraction is useful for noticing that two situations rhyme. It is useless for establishing that they work alike, and the step from one to the other is where arguments of this kind usually fail.", settled, interpretive).
says(a_c02_rhyme, shared_vocabulary, establishes_shared_mechanism, false).

claim(a_c02_three_rows, book, 2, "Three rows under the heading \"selection.\" The processes share no machinery.", settled, interpretive).
says(a_c02_three_rows, selection_mechanisms_compared, count, 3).

claim(a_c02_shared_question, book, 2, "What the shared term buys is the question — is something being varied, and is something treating the variants unequally? — which is worth asking in all three cases.", settled, interpretive).
says(a_c02_shared_question, selection_mechanisms_compared, count, 3).

claim(a_c02_companion, book, 2, "These concepts and roughly a hundred more are set out in Modern Alchemy, the companion volume, with permanent identifiers, one symbol each, and a notation for combining them.", settled, quantitative).
says(a_c02_companion, companion_concepts_beyond_chapter2, count, approx(100)).
computes(a_c02_companion, 119 - 16, approx(100)).   % 119 concepts in generated/glossary.pl less the 16 terms this chapter defines (snapshot; update if either changes)
common_knowledge(a_c02_companion).                  % a statement about the book's own companion; no outside source applies

/* ========================================================== chapter 2 (HS) */

claim(a_c02hs_eight_words, 'book-hs', 2, "Eight words do most of the work in this book.", settled, interpretive).
says(a_c02hs_eight_words, hs_core_vocabulary_terms, count, 8).   % the chapter lists eight bolded terms

claim(a_c02hs_rhyme, 'book-hs', 2, "That's useful for noticing that two situations rhyme. It is useless for showing they work the same way.", settled, interpretive).
says(a_c02hs_rhyme, shared_vocabulary, establishes_shared_mechanism, false).

/* ======================================================== chapter 3 (full) */

claim(a_c03_three_engines, book, 3, "Early Earth had three largely independent sources. Each pushed in one direction, and none of them was going to run out.", settled, empirical).
says(a_c03_three_engines, early_earth_energy_sources, count, 3).   % the Sun, the planet's interior, the Moon
claim(a_c03_three_together, book, 3, "The three together matter more than any one of them.", settled, interpretive).
depends_on(a_c03_three_together, a_c03_three_engines).

% Added 2026-11-07 from the author's sticky note ("SOX / NOX / sulfates and silica … taken by the
% winds"): three settled sentences drafted and sourced, then the author's own last sentence (contested).
claim(a_c03_volcanic_material, book, 3, "Volcanoes also supplied raw material: sulfur dioxide and hydrogen sulfide, which dissolve in water as sulfite and sulfide, and silica-rich hot-spring water that crusts surfaces with sinter.", settled, empirical).
source(a_c03_volcanic_material, 'Ranjan', 2018).
source(a_c03_volcanic_material, 'Djokic', 2017).
says(a_c03_volcanic_material, volcanic_sulfur_gases_in_water, forms, sulfite_and_sulfide).
says(a_c03_volcanic_material, hot_spring_silica, deposits_as, sinter).
claim(a_c03_lightning_nitrogen, book, 3, "The same lightning, like that of ordinary storms, turned nitrogen from the air into nitrogen oxides, which end up in water as nitrite and, mostly, nitrate.", settled, empirical).
source(a_c03_lightning_nitrogen, 'Navarro-González', 2001).
source(a_c03_lightning_nitrogen, 'Aroskay', 2024).
source(a_c03_lightning_nitrogen, 'Ranjan', 2019).
says(a_c03_lightning_nitrogen, prebiotic_dissolved_nitrogen_oxides, dominant_form, nitrate).
claim(a_c03_ash_and_sulfate, book, 3, "Coarse ash blankets the ground near the vent; sulfur gas lofted high becomes sulfate droplets that stay aloft for about a year, spreading on the wind.", settled, empirical).
source(a_c03_ash_and_sulfate, 'Robock', 2000).
says(a_c03_ash_and_sulfate, volcanic_sulfate_aerosol_residence, years, approx(1)).
% The author's own sentence. Ranjan et al.'s models agree with its second half: shallow lakes could
% hold useful sulfite, and nitrite and nitrate were likely scarce in the ocean, if not in some ponds.
claim(a_c03_amounts_contested, book, 3, "Whether these compounds were at concentrations to matter is still contested, although one can imagine smaller pools and lakes accumulating meaningful levels more so than the ocean.", contested, empirical).
source(a_c03_amounts_contested, 'Ranjan', 2018).
source(a_c03_amounts_contested, 'Ranjan', 2019).
says(a_c03_amounts_contested, prebiotic_pool_sulfur_and_nitrogen_anion_levels, known, false).

claim(a_c03_rounding_error, book, 3, "Ten million years is a rounding error in Earth's history.", settled, quantitative).
says(a_c03_rounding_error, pool_trial_window, years, 1.0e7).
says(a_c03_rounding_error, ten_million_years, share_of_earth_history, negligible).
common_knowledge(a_c03_rounding_error).

% Added 2026-11-07 from the author's sticky note (the "mega-cycle" count); the author chose the
% Earth's-age sentence alone. 4.54e9 / 1e7 = 454.
claim(a_c03_earth_spans, book, 3, "Earth is about 4.54 billion years old, so its history holds about 450 ten-million-year spans.", settled, quantitative).
source(a_c03_earth_spans, 'Dalrymple', 2001).
says(a_c03_earth_spans, earth_age, years, approx(4.54e9)).
computes(a_c03_earth_spans, 4.54e9 / 1.0e7, approx(450)).

claim(a_c03_invented, book, 3, "The six-minute figure is invented, and the honest thing is to say so and then show that it does not matter.", settled, supposition).
says(a_c03_invented, supposed_pool_cycle, minutes, 6).

% The italic note that follows (l.48) says "This way of framing the problem is the
% author's", and ch.1 lists "the reading of early Earth as a vast parallel trial"
% among the author's own; so author, though the extractor sees no marker here.
claim(a_c03_parallel_picture, book, 3, "So the picture is not one slow process grinding away for four billion years. It is an extremely large number of short, parallel, independent, cheap experiments, nearly all of which failed within minutes, running simultaneously across an entire planet.", author, interpretive).
says(a_c03_parallel_picture, origin_of_life_search, framing, many_short_parallel_trials).
depends_on(a_c03_parallel_picture, c3_table_day).
depends_on(a_c03_parallel_picture, c3_daily).

claim(a_c03_components_established, book, 3, "The underlying components — wet–dry cycling, spontaneous assembly of amphiphiles, the role of mineral surfaces — are well established and are taken up again in chapters 4, 5, and 17.", settled, empirical).
source(a_c03_components_established, 'Rajamani', 2008).
source(a_c03_components_established, 'Damer', 2020).
says(a_c03_components_established, prebiotic_cycling_and_self_assembly, established, true).

claim(a_c03_selection_bias, book, 3, "This is selection bias, and it is unusually severe in this case, because the surviving lineage is the only one that produced observers capable of asking about it.", settled, interpretive).
claim(a_c03_probability_unknown, book, 3, "How probable life was, given early Earth's conditions, remains genuinely unknown.", settled, empirical).
says(a_c03_probability_unknown, probability_of_life_given_early_earth, known, false).
depends_on(a_c03_probability_unknown, a_c03_selection_bias).

/* ========================================================== chapter 3 (HS) */

claim(a_c03hs_six_minutes, 'book-hs', 3, "Now suppose the pool gets stirred and resettles every six minutes.", settled, supposition).
says(a_c03hs_six_minutes, supposed_pool_cycle, minutes, 6).
computes(a_c03hs_six_minutes, 24 * 60 / 6, 240).
computes(a_c03hs_six_minutes, 24 * 60 / 6 * 365, approx(88000)).
computes(a_c03hs_six_minutes, 24 * 60 / 6 * 365 * 100, approx(8.8e6)).
computes(a_c03hs_six_minutes, 24 * 60 / 6 * 365 * 1.0e7, approx(1.0e12)).   % "about a trillion"

claim(a_c03hs_nothing, 'book-hs', 3, "Ten million years is nothing in Earth's history.", settled, quantitative).
says(a_c03hs_nothing, pool_trial_window, years, 1.0e7).
says(a_c03hs_nothing, ten_million_years, share_of_earth_history, negligible).
common_knowledge(a_c03hs_nothing).

claim(a_c03hs_made_up, 'book-hs', 3, "I made up the six minutes, and I should say so, because you should always be suspicious of a number someone picked.", settled, supposition).
says(a_c03hs_made_up, supposed_pool_cycle, minutes, 6).

claim(a_c03hs_cut_ten, 'book-hs', 3, "That cuts the total by ten — about ninety billion.", settled, quantitative).
computes(a_c03hs_cut_ten, (24 * 60 / 6) / 24, 10).
computes(a_c03hs_cut_ten, 24 * 365 * 1.0e7, approx(9.0e10)).
says(a_c03hs_cut_ten, trials_hourly_cycle_ten_million_years, count, approx(9.0e10)).
common_knowledge(a_c03hs_cut_ten).

claim(a_c03hs_cut_240, 'book-hs', 3, "That cuts it by 240 — about four billion.", settled, quantitative).
computes(a_c03hs_cut_240, (24 * 60 / 6) / 1, 240).
computes(a_c03hs_cut_240, 365 * 1.0e7, approx(4.0e9)).
says(a_c03hs_cut_240, trials_daily_cycle_ten_million_years, count, approx(4.0e9)).
common_knowledge(a_c03hs_cut_240).

% Unboxed, so settled by the HS edition's own rule, although the "My own idea" box
% right after it (l.42) says this framing is the author's. The full edition marks
% the same framing as the author's (a_c03_parallel_picture).
claim(a_c03hs_parallel_picture, 'book-hs', 3, "So the picture isn't one slow process grinding away forever. It's an absurd number of short, cheap, parallel experiments, almost all of which failed within minutes, running everywhere at the same time.", author, interpretive).   % boxed as the author's since 2026-11-03, as the full edition marks it
says(a_c03hs_parallel_picture, origin_of_life_search, framing, many_short_parallel_trials).
depends_on(a_c03hs_parallel_picture, a_c03hs_six_minutes).

% Moved out of the "My own idea" box on 2026-11-03, so settled, as in the full edition.
claim(a_c03hs_components_solid, 'book-hs', 3, "The pieces underneath it are solid: wet–dry cycles really do drive chemistry, those split-personality molecules really do assemble on their own, and both have been demonstrated in labs many times.", settled, empirical).
source(a_c03hs_components_solid, 'Rajamani', 2008).
source(a_c03hs_components_solid, 'Damer', 2020).
says(a_c03hs_components_solid, prebiotic_cycling_and_self_assembly, established, true).

/* ======================================================== chapter 4 (full) */

% Both claims below were rewritten on 2026-11-03 at the author's direction. The
% window used to be "minutes to hours, from chapter 3", which is ch. 3's invented
% cycle time inside a framing ch. 3 marks as the author's. An environment is now
% treated as a concept that can be drawn at any scale, and the window as "enough time
% for something to happen". Line 19 was qualified to match, since some environments
% (deep pore water) do hold still for ten thousand years.
claim(a_c04_ten_thousand_years, book, 4, "Reactions that are thermodynamically allowed but take ten thousand years at ambient temperature might as well not happen in most places, because few conditions hold still that long.", settled, generalization).

claim(a_c04_reachable, book, 4, "It changes which possibilities are reachable within the time a given environment stays put.", settled, generalization).
claim(a_c04_environment_concept, book, 4, "It names a concept people made, not a unit nature hands over.", settled, interpretive).
says(a_c04_environment_concept, environment, kind, human_concept).
claim(a_c04_window, book, 4, "the only measure that matters is whether there was enough time for something to happen", settled, interpretive).
says(a_c04_window, relevant_timescale, measure, enough_time_for_something_to_happen).

claim(a_c04_template_ligation, book, 4, "Presented with two shorter fragments corresponding to its own halves, it binds them against itself and accelerates their joining into another complete copy.", settled, empirical).
source(a_c04_template_ligation, 'Lee', 1996).
says(a_c04_template_ligation, ghadiri_peptide_fragments, count, 2).

claim(a_c04_self_repro, book, 4, "Self-reproduction is a chemical property available to fairly simple molecules, and not something that had to wait for life to invent it.", settled, generalization).
depends_on(a_c04_self_repro, c4_peptide).
depends_on(a_c04_self_repro, c4_nucleic).

claim(a_c04_theory_solid, book, 4, "The theoretical result is solid: in a sufficiently rich network, self-sustaining subsets are expected.", settled, generalization).
source(a_c04_theory_solid, 'Hordijk', 2004).
says(a_c04_theory_solid, collective_autocatalysis_in_rich_networks, expected_in_theory, true).

claim(a_c04_convection, book, 4, "Past a threshold, the liquid abruptly organizes itself into a tiling of convection cells, often hexagonal, each circulating in a fixed direction.", settled, empirical).
says(a_c04_convection, benard_convection_cells, typical_sides, 6).
common_knowledge(a_c04_convection).

claim(a_c04_prigogine, book, 4, "Ilya Prigogine's work on these systems, recognized with a Nobel Prize in 1977, is the reason the phrase exists.", settled, historical).
source(a_c04_prigogine, 'Prigogine', 1978).
says(a_c04_prigogine, prigogine_nobel_prize, year, 1977).
event_year(a_prigogine_nobel, 1977, 'Nobel Prize in Chemistry 1977').

% Rewritten on 2026-11-03 at the author's direction. "Steps 1 through 5 are supported"
% rested on collectively autocatalytic sets, whose prebiotic relevance the same chapter
% calls not settled. The text now separates what is directly demonstrated from what has
% been shown only in the laboratory, and calls the sequence a conjecture.
claim(a_c04_steps_shown, book, 4, "Steps 1 through 3 are directly demonstrated", settled, interpretive).
depends_on(a_c04_steps_shown, c4_formose).
claim(a_c04_steps_lab_only, book, 4, "Steps 4 and 5 have been shown only in the laboratory, in systems that are small and mostly designed rather than found", settled, empirical).
depends_on(a_c04_steps_lab_only, c4_peptide).
claim(a_c04_conjecture, book, 4, "So the sequence as a whole is a conjecture, and stays a conjecture until the chemistry is better understood.", contested, interpretive).
depends_on(a_c04_conjecture, c4_status).
claim(a_c04_step6, book, 4, "Step 6 is where the account becomes genuinely incomplete.", settled, interpretive).

claim(a_c04_three_limits, book, 4, "Three honest limits, since a chapter that presents only the encouraging results is not worth much.", settled, interpretive).
says(a_c04_three_limits, chapter4_stated_limits, count, 3).

/* ========================================================== chapter 4 (HS) */

% Full edition: formaldehyde "plausibly abundant on the early Earth". Since 2026-11-03 the HS
% sentence separates presence (almost certain) from amount (uncertain), matching that hedge.
claim(a_c04hs_formose, 'book-hs', 4, "This is real, it's been known since 1861, and it uses a chemical the early Earth almost certainly made, though maybe not in the amounts the reaction needs.", settled, historical).
source(a_c04hs_formose, 'Butlerow', 1861).
says(a_c04hs_formose, formose_reaction_described, year, 1861).

claim(a_c04hs_peptide, 'book-hs', 4, "Better: in 1996 researchers built a small protein, 32 building blocks long, that makes copies of itself.", settled, empirical).
source(a_c04hs_peptide, 'Lee', 1996).
says(a_c04hs_peptide, ghadiri_peptide, residues, 32).

claim(a_c04hs_template_ligation, 'book-hs', 4, "Give it the two halves of itself and it grabs them, holds them against its own body, and helps them join into a complete new copy.", settled, empirical).
source(a_c04hs_template_ligation, 'Lee', 1996).
says(a_c04hs_template_ligation, ghadiri_peptide_fragments, count, 2).

% "How long is long enough?" was added on 2026-11-03 at the author's direction. It is the
% full edition's environment point (a_c04_environment_concept, a_c04_window) in second
% person, using the same subjects so that the two editions get compared.
claim(a_c04hs_environment_concept, 'book-hs', 4, "An environment isn't something nature hands you; it's an idea people use, and you can draw it at any size.", settled, interpretive).
says(a_c04hs_environment_concept, environment, kind, human_concept).
claim(a_c04hs_window, 'book-hs', 4, "There's no single right timescale, only the question of whether there was enough time for something to happen.", settled, interpretive).
says(a_c04hs_window, relevant_timescale, measure, enough_time_for_something_to_happen).

% QT45 (Gianni et al. 2026), added on 2026-11-03 at the author's request. Checked against the
% published structured abstract (Science; a copy saved by the author) and the accepted
% manuscript (PMC7618777). It is 45 nt, selected from random pools and then evolved and
% engineered further. It works with triplet substrates in mildly alkaline eutectic ice. It makes
% the (-) strand at 94.1% per-nucleotide fidelity, and a copy of itself with defined substrates,
% both at about 0.2% in 72 days, in separate reactions. At the observed fidelities the paper's
% quasispecies model leaves under 0.5% of variants active.
event_year(qt45_reported, 2026, 'Gianni et al. 2026').
claim(a_c04_qt45, book, 4, "In 2026 a group reported an RNA enzyme only 45 nucleotides long that copies RNA templates.", settled, empirical).
source(a_c04_qt45, 'Gianni', 2026).
says(a_c04_qt45, qt45_ribozyme, length_nt, 45).
claim(a_c04_qt45_strands, book, 4, "it can make both its complementary strand and a copy of itself, which are the two halves of a replication cycle", settled, empirical).
source(a_c04_qt45_strands, 'Gianni', 2026).
claim(a_c04_qt45_limits, book, 4, "with yields of about 0.2 per cent after 72 days and about 6 per cent of letters copied wrongly", settled, quantitative).
source(a_c04_qt45_limits, 'Gianni', 2026).
says(a_c04_qt45_limits, qt45_ribozyme, yield_after_72_days, approx(0.002)).
says(a_c04_qt45_limits, qt45_ribozyme, error_rate_per_letter, approx(0.06)).
claim(a_c04_qt45_reading, book, 4, "Its discoverers note that 45 letters approaches the lengths unaided chemistry may be able to string together", settled, interpretive).
source(a_c04_qt45_reading, 'Gianni', 2026).
claim(a_c04hs_qt45, 'book-hs', 4, "The newest one, reported in 2026, is different in one way: it didn't start as a design.", settled, historical).
source(a_c04hs_qt45, 'Gianni', 2026).
claim(a_c04hs_qt45_strands, 'book-hs', 4, "It's only 45 letters long, and it can build both strands a copy needs", settled, empirical).
source(a_c04hs_qt45_strands, 'Gianni', 2026).
says(a_c04hs_qt45_strands, qt45_ribozyme, length_nt, 45).
claim(a_c04hs_qt45_limits, 'book-hs', 4, "it gets about one letter in seventeen wrong, and after 72 days only about two copies in a thousand are finished", settled, quantitative).
source(a_c04hs_qt45_limits, 'Gianni', 2026).
says(a_c04hs_qt45_limits, qt45_ribozyme, yield_after_72_days, approx(0.002)).
says(a_c04hs_qt45_limits, qt45_ribozyme, error_rate_per_letter, approx(0.059)).

% Moved out of the "Still argued about" box on 2026-11-03, so settled, as the full
% edition calls the same theoretical result "solid" (a_c04_theory_solid).
claim(a_c04hs_theory_shown, 'book-hs', 4, "It's been shown that in a big enough, messy enough mixture, loops like this should turn up almost unavoidably.", settled, generalization).
source(a_c04hs_theory_shown, 'Hordijk', 2004).
says(a_c04hs_theory_shown, collective_autocatalysis_in_rich_networks, expected_in_theory, true).

claim(a_c04hs_convection, 'book-hs', 4, "Then past a certain temperature the whole thing suddenly organizes itself into a tidy grid of circulating cells, often six-sided, like a honeycomb.", settled, empirical).
says(a_c04hs_convection, benard_convection_cells, typical_sides, 6).
common_knowledge(a_c04hs_convection).

claim(a_c04hs_three_limits, 'book-hs', 4, "Three honest problems, because a chapter with only good news isn't worth much.", settled, interpretive).
says(a_c04hs_three_limits, chapter4_stated_limits, count, 3).

/* ======================================================== chapter 5 (full) */

claim(a_c05_amphiphile_ends, book, 5, "Amphiphiles have two ends with opposite preferences: one that associates readily with water, one that does not.", settled, empirical).
says(a_c05_amphiphile_ends, amphiphile_ends, count, 2).
common_knowledge(a_c05_amphiphile_ends).

claim(a_c05_bilayer, book, 5, "The structure that does contain something is a bilayer vesicle — two sheets of amphiphiles back to back, tails meeting in the middle, water-facing heads on both outer surfaces, the whole thing curved around and closed.", settled, empirical).
source(a_c05_bilayer, 'Israelachvili', 1976).
says(a_c05_bilayer, bilayer_vesicle_wall, sheets, 2).

claim(a_c05_film, book, 5, "That arrangement encloses a volume of water, separated from the water outside by a film two molecules thick.", settled, quantitative).
says(a_c05_film, bilayer_membrane, thickness_in_molecules, 2).
common_knowledge(a_c05_film).

claim(a_c05_two_tails, book, 5, "Those with two tails, which cannot taper to a point, pack into sheets instead, and sheets close into vesicles.", settled, empirical).
source(a_c05_two_tails, 'Israelachvili', 1976).
says(a_c05_two_tails, double_tailed_amphiphiles, packing, bilayer_sheets).

claim(a_c05_phospholipid_tails, book, 5, "The phospholipids in every cell membrane have two tails.", settled, empirical).
says(a_c05_phospholipid_tails, membrane_phospholipid_tails, count, 2).
common_knowledge(a_c05_phospholipid_tails).   % textbook generalization ("every" admits exceptions such as four-chain cardiolipin)

claim(a_c05_gradient, book, 5, "It can hold a difference in the concentration and electrical charge of ions between its two sides — an electrochemical gradient.", settled, empirical).
common_knowledge(a_c05_gradient).

claim(a_c05_osmotic, book, 5, "The consequence, observed in the laboratory, is that vesicles with more encapsulated content grow — and they grow at the expense of emptier vesicles nearby, which shrink as their membrane molecules migrate.", settled, empirical).
source(a_c05_osmotic, 'Chen', 2004).
says(a_c05_osmotic, osmotic_vesicle_competition, demonstrated, true).
claim(a_c05_selection_without_life, book, 5, "This is as close as chemistry comes to selection without life, and it arrives early, from the geometry of amphiphilic molecules and the behaviour of water.", settled, interpretive).
depends_on(a_c05_selection_without_life, a_c05_osmotic).

claim(a_c05_vents, book, 5, "Some proposals for the origin of life invert the usual order here and start from gradients that already existed — the natural differences in acidity and chemistry across the mineral walls of alkaline hydrothermal vents, where the geology supplies the gradient and the first membranes only have to take advantage of it.", contested, empirical).
source(a_c05_vents, 'Martin', 2003).
source(a_c05_vents, 'Lane', 2010).
says(a_c05_vents, vent_gradients_before_membranes, proposed, true).

/* ========================================================== chapter 5 (HS) */

claim(a_c05hs_bilayer, 'book-hs', 5, "The structure that does have an inside is a double layer: two sheets of these molecules back to back, greasy tails pointed at each other in the middle, water-friendly ends facing out on both faces.", settled, empirical).
source(a_c05hs_bilayer, 'Israelachvili', 1976).
says(a_c05hs_bilayer, bilayer_vesicle_wall, sheets, 2).

claim(a_c05hs_film, 'book-hs', 5, "Curl that around and close it up and you have a bag — a pocket of water, sealed off from the water outside by a film two molecules thick.", settled, quantitative).
says(a_c05hs_film, bilayer_membrane, thickness_in_molecules, 2).
common_knowledge(a_c05hs_film).

claim(a_c05hs_two_tails, 'book-hs', 5, "Two tails, and they can't taper to a point, so they form sheets instead — and sheets close into bags.", settled, empirical).
source(a_c05hs_two_tails, 'Israelachvili', 1976).
says(a_c05hs_two_tails, double_tailed_amphiphiles, packing, bilayer_sheets).

claim(a_c05hs_phospholipid_tails, 'book-hs', 5, "The molecules in your cell membranes have two tails.", settled, empirical).
says(a_c05hs_phospholipid_tails, membrane_phospholipid_tails, count, 2).
common_knowledge(a_c05hs_phospholipid_tails).

claim(a_c05hs_gradient, 'book-hs', 5, "A membrane can also hold a difference between its two sides — more of some charged particle inside than outside.", settled, empirical).
common_knowledge(a_c05hs_gradient).

% Boxed "Still argued about" on 2026-11-03, so contested, as the full edition presents it as a proposal.
claim(a_c05hs_vents, 'book-hs', 5, "Some researchers flip the order entirely and start from differences that were already there — the natural gaps in acidity across the rock walls of deep-sea vents, where the planet supplies the gradient and the first membranes only have to take advantage of it.", contested, empirical).
source(a_c05hs_vents, 'Martin', 2003).
source(a_c05hs_vents, 'Lane', 2010).
says(a_c05hs_vents, vent_gradients_before_membranes, proposed, true).
