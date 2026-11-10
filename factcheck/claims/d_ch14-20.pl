:- discontiguous claim/6, says/4, source/3, depends_on/2, computes/3, event_year/3,
                 order_claim/3, interval_claim/4, variant_ok/3, gap/3, rests_on_gap/2,
                 arc_gap/3, arc_descriptive/3, cite_ok/3, about/2, drift_ok/3,
                 prose_ok/3, common_knowledge/1, certainty_ok/2.
:- multifile claim/6, says/4, source/3, depends_on/2, computes/3, event_year/3,
             order_claim/3, interval_claim/4, variant_ok/3, gap/3, rests_on_gap/2,
             arc_gap/3, arc_descriptive/3, cite_ok/3, about/2, drift_ok/3,
             prose_ok/3, common_knowledge/1, certainty_ok/2.

/*  Structured claims for book chapters 14, 15, 16, 17 and 20, and book-hs chapters 14-16.
    Schema: the header of factcheck/claims.pl. HS chapter 16 restates material from full
    chapters 16, 17 and 20, so its claims sit beside their full-edition twins, and where the
    full edition cites a work for the same statement the HS claim carries that source too.
*/

/* ======================================================= chapter 14 */

claim(d_c14_protochemistry, book, 14, "What the two have in common is a combinatorial structure with rules about what may attach to what.", settled, interpretive).
says(d_c14_protochemistry, language_and_chemistry, shared_mechanism, false).

claim(d_c14_two_true, book, 14, "Two things are nonetheless true and worth separating out.", settled, interpretive).
claim(d_c14hs_two_true, 'book-hs', 14, "But there are two things underneath it that are true, and leaving them out would be its own kind of dishonesty.", settled, interpretive).
says(d_c14_two_true, snow_vocabulary_true_residue, count, 2).      % polysynthesis makes counting meaningless; the sea-ice surveys
says(d_c14hs_two_true, snow_vocabulary_true_residue, count, 2).
depends_on(d_c14_two_true, c14_seaice).
depends_on(d_c14hs_two_true, c14hs_seaice).

claim(d_c14hs_boas_modest, 'book-hs', 14, "He didn't suggest four was a lot or that it meant anything.", settled, historical).
source(d_c14hs_boas_modest, 'Boas', 1911).
says(d_c14hs_boas_modest, boas_snow_roots, count, 4).

% c14_wcs (claims.pl) quotes the full-edition sentence but has no says/4; this one gives
% the HS "more than a hundred languages" a full-edition figure to be compared with.
says(c14_wcs, world_color_survey_languages, count, 110).
claim(d_c14hs_warm_colours, 'book-hs', 14, "Across more than a hundred languages, colours get named most precisely when they belong to things — a ripe fruit, a red flower — and those are mostly warm colours.", settled, empirical).
source(d_c14hs_warm_colours, 'Gibson', 2017).
says(d_c14hs_warm_colours, world_color_survey_languages, count, more_than(100)).

% HS "All four are Arabic." is under 40 characters, so no quote can cover it; the HS claim
% anchors the sentence before it and carries the count.
claim(d_c14_desert_terms, book, 14, "What landscapes reliably multiply is vocabulary for the states of things that matter — the sea-ice terms above, and in deserts the kinds of ground, which geologists found useful enough to borrow: erg, hamada, sabkha, and wadi from Arabic", settled, generalization).
claim(d_c14hs_desert_terms, 'book-hs', 14, "Geologists describing deserts say erg for a sea of dunes, hamada for a bare rocky plateau, sabkha for a salt flat, and wadi for a riverbed that's dry until a storm fills it. All four are Arabic.", settled, empirical).
says(d_c14_desert_terms, arabic_desert_terms_in_geology, count, 4).
says(d_c14hs_desert_terms, arabic_desert_terms_in_geology, count, 4).
computes(d_c14hs_desert_terms, 1 + 1 + 1 + 1, 4).                % erg, hamada, sabkha, wadi
depends_on(d_c14_desert_terms, c14_seaice).

% Full-edition twins of two readings HS ch. 14 now boxes "Still argued about"
% (c14hs_number_meaning, c14hs_narrow_version in claims.pl; the colour reading is
% c14_colour_meaning there). The full text states both unhedged, though its own line 68 says
% "anyone claiming the question is settled in either direction is ahead of the evidence".
% The two says/4 on c14hs_* annotate claims.pl's claims, which have none, so the checker can
% compare the tiers.
claim(d_c14_number_meaning, book, 14, "The researchers' reading is that the difficulty lies not in perceiving or matching exact quantity but in holding one in memory without a symbol for it.", contested, interpretive).   % attributed to the researchers on 2026-11-03, matching the HS box: an interpretation of the result, not the result
source(d_c14_number_meaning, 'Frank', 2008).
says(d_c14_number_meaning, exact_quantity_difficulty, located_in, memory_without_symbol).
says(c14hs_number_meaning, exact_quantity_difficulty, located_in, memory_without_symbol).
claim(d_c14_narrow_version, book, 14, "Habitually used linguistic categories appear to be recruited during cognitive tasks, and to affect speed and accuracy where the categories are relevant.", contested, interpretive).   % hedged in the text ("appear to be"); the HS box agrees
says(d_c14_narrow_version, habitual_category_recruitment, status, supported_narrowly).
says(c14hs_narrow_version, habitual_category_recruitment, status, supported_narrowly).
depends_on(d_c14_narrow_version, c14_colour_meaning).
depends_on(d_c14_narrow_version, d_c14_number_meaning).
depends_on(d_c14_narrow_version, c14_replication).

claim(d_c14_word_compression, book, 14,"A single short token stands for a category with indefinitely many members, no two identical, and makes that category available for combination with others.", settled, generalization).
claim(d_c14hs_word_compression, 'book-hs', 14, "One short sound stands in for a whole category of things, no two of which are identical.", settled, generalization).
says(d_c14_word_compression, word_as_category, lossy, true).
says(d_c14hs_word_compression, word_as_category, lossy, true).

/* ======================================================= chapter 15 */

claim(d_c15_two_differences, book, 15, "This creates parallels with biological evolution, with two differences large enough that the parallel has to be held loosely.", settled, generalization).
claim(d_c15hs_two_differences, 'book-hs', 15, "That sounds like evolution, and it rhymes with it, with two differences big enough to matter.", settled, generalization).
says(d_c15_two_differences, culture_vs_genetic_evolution, differences, 2).   % faster and not parent-to-offspring only; lower fidelity
says(d_c15hs_two_differences, culture_vs_genetic_evolution, differences, 2).
says(d_c15_two_differences, cultural_transmission, fidelity_vs_genetic, lower).
says(d_c15hs_two_differences, cultural_transmission, fidelity_vs_genetic, lower).

% Dawkins and the word "meme" (added 2026-11-06 at the author's request; both editions).
% Checked in Wikipedia's "Meme" and "The Selfish Gene" (offline copy, 2025-08): coined by the
% evolutionary biologist in The Selfish Gene (1976); his examples included melodies, catchphrases
% and fashion; "mimeme", from the Greek for "imitated thing", shortened to sound like "gene".
claim(d_c15_meme_coined, book, 15, "The word was coined in 1976 by the evolutionary biologist Richard Dawkins, in The Selfish Gene, on the model of gene, for a tune, a catchphrase or a fashion copied from one mind to another as a gene is copied from parent to offspring.", settled, historical).
source(d_c15_meme_coined, 'Dawkins', 1976).
says(d_c15_meme_coined, meme_word, coined_by, dawkins).
says(d_c15_meme_coined, meme_word, year_coined, 1976).
claim(d_c15hs_meme_book, 'book-hs', 15, "In 1976 Richard Dawkins, a biologist who studies evolution, wrote a book called The Selfish Gene.", settled, historical).
source(d_c15hs_meme_book, 'Dawkins', 1976).
says(d_c15hs_meme_book, meme_word, year_coined, 1976).
claim(d_c15hs_meme_named, 'book-hs', 15, "In it he made up a word for a tune, a catchphrase or a fashion that spreads by being copied from one person to the next, the way a gene is copied from parent to child.", settled, historical).
source(d_c15hs_meme_named, 'Dawkins', 1976).
says(d_c15hs_meme_named, meme_word, coined_by, dawkins).
claim(d_c15hs_meme_greek, 'book-hs', 15, "He took mimeme, from an old Greek word meaning \"something imitated\", and cut it short so it would sound like gene.", settled, historical).
source(d_c15hs_meme_greek, 'Dawkins', 1976).
claim(d_c15hs_meme_online, 'book-hs', 15, "Today the word mostly means a funny picture that spreads online.", settled, generalization).
common_knowledge(d_c15hs_meme_online).
claim(d_c15hs_meme_argued, 'book-hs', 15, "Whether memes really explain how culture works is an open question.", contested, interpretive).
claim(d_c15hs_meme_caveats, 'book-hs', 15, "They get copied far less faithfully, and they can't be pulled apart from the people who hold them.", contested, interpretive).

claim(d_c15_two_kinds, book, 15, "How early is worth stating carefully, because the evidence comes in two kinds.", settled, historical).
source(d_c15_two_kinds, 'Santini', 2022).
says(d_c15_two_kinds, nixtamalization_dating_evidence, kinds, 2).   % equipment (c15_nixta_equipment); residues (c15_nixta_direct)
% On 2026-11-03 the Staller & Carrasco volume was replaced by the chapter that carries the
% support, Green 2010 (fix_culture.pl).

% The full edition's span is now "more than a thousand years, and perhaps for over three
% thousand". The direct evidence is eighth or ninth century CE (c15_nixta_direct). The
% equipment, which line 25 calls only "suggestive", is 1200–1500 BCE.
claim(d_c15_thousands, book, 15, "The practice worked for more than a thousand years, and perhaps for over three thousand, without anyone knowing why.", settled, historical).
% The HS twin had the same unhedged "thousands of years" and was aligned on 2026-11-03.
claim(d_c15hs_thousands, 'book-hs', 15, "The practice worked for more than a thousand years, and maybe for over three thousand, with nobody knowing why.", settled, historical).
depends_on(d_c15hs_thousands, c15_nixta_equipment).
depends_on(d_c15hs_thousands, c15_nixta_direct).
says(d_c15_thousands, nixtamalization_unexplained_span, years, at_least(1000)).
says(d_c15hs_thousands, nixtamalization_unexplained_span, years, at_least(1000)).
depends_on(d_c15_thousands, c15_nixta_equipment).

claim(d_c15_mcount, book, 15, "In such chains, content that is mildly counterintuitive survives better than content that is either entirely ordinary or wildly strange.", settled, empirical).
source(d_c15_mcount, 'Barrett', 2001).
source(d_c15_mcount, 'Norenzayan', 2006).
says(d_c15_mcount, mildly_counterintuitive_content, transmission_retention, higher).

claim(d_c15_list_caveats, book, 15, "Two things need saying plainly about the list of functions, because lists of this kind are easy to misread.", settled, interpretive).
says(d_c15_list_caveats, religion_function_list_caveats, count, 2).  % function is not origin; no single origin or function

claim(d_c15_talk_past, book, 15, "Two people may be addressing genuinely overlapping concerns — why there is suffering, what obligations people have to one another, what happens at the end — in terms that do not map onto each other at any point.", settled, generalization).

/* ======================================================= chapter 16 */

claim(d_c16_sixteen_in, book, 16, "Sixteen chapters in, the shape of the argument can be set out in one place.", settled, interpretive).

claim(d_c16_biology_stretch, book, 16, "Once templates are copied with variation in a population, standard evolutionary biology carries the account through multicellularity, specialization, nervous systems, and the capacity to build and use internal models.", settled, generalization).
claim(d_c16_language_weaker, book, 16, "That representation became externally transmissible is clear. How, and in what stages, is not, and this book says little about it that would survive a linguist's scrutiny.", settled, empirical).
says(d_c16_language_weaker, language_origin_stages, known, false).
claim(d_c16_above_language, book, 16, "Cultural selection, economic persistence, and religious transmission are described here with the same terms used for chemistry and biology, and the machinery is unrelated.", settled, interpretive).
claim(d_c16hs_above_language, 'book-hs', 16, "Cultural selection and biological selection get described with the same words, and the machinery is unrelated.", settled, interpretive).
says(d_c16_above_language, cultural_and_biological_selection, shared_mechanism, false).
says(d_c16hs_above_language, cultural_and_biological_selection, shared_mechanism, false).
depends_on(d_c16_above_language, d_c15_two_differences).          % "Chapter 15 makes it explicit for transmission fidelity."

% "in principle" keeps the verdict off c16_prebiotic_open, so there is no edge to it.
claim(d_c16_verdict, book, 16, "An honest reader should take the progression as firm in principle in its lower half, broken at one specific joint, firm again through biology, and increasingly a matter of description rather than mechanism towards the top.", settled, interpretive).
depends_on(d_c16_verdict, c16_lower_half).
depends_on(d_c16_verdict, c16_no_new_principle).
depends_on(d_c16_verdict, c16_break).
depends_on(d_c16_verdict, d_c16_biology_stretch).
depends_on(d_c16_verdict, d_c16_language_weaker).
depends_on(d_c16_verdict, d_c16_above_language).

% The full edition qualified this stretch on 2026-11-03 ("in principle"; c16_prebiotic_open).
% HS ch. 16 line 13 still states it flatly, while HS ch. 4 line 35 boxes the premise
% "Still argued about". c4_status is that box's full-edition twin. The nearest HS claim is
% a_c04hs_theory_shown, but it covers the box's mathematical sentence, not the "rich enough"
% clause; retarget the edge if an HS twin of c4_status is added.
% HS ch. 16 repeated the overstatement fixed in full ch. 16; corrected the same way on 2026-11-03.
claim(d_c16hs_lower_half, 'book-hs', 16, "Self-sustaining reactions are chemistry: chapter 4 shows them working, and small ones built in labs.", settled, empirical).
depends_on(d_c16hs_lower_half, c4_peptide).
claim(d_c16hs_prebiotic_open, 'book-hs', 16, "Whether early Earth's chemistry was rich enough to make them on its own is still argued about, as chapter 4 says.", settled, empirical).
says(d_c16hs_prebiotic_open, prebiotic_sufficiency_question, open, true).
says(c16_prebiotic_open, prebiotic_sufficiency_question, open, true).

claim(d_c16_four_recurring, book, 16, "Four things appear at nearly every level, and unlike the vocabulary they are structural rather than terminological.", settled, generalization).
says(d_c16_four_recurring, recurring_structural_features, count, 4).
computes(d_c16_four_recurring, 1 + 1 + 1 + 1, 4).   % boundary, throughput, differential persistence, something carried forward; the "fifth" is announced separately

claim(d_c16_two_routes, book, 16, "The two routes are the same process at different stages, and most relationships never finish the journey.", settled, generalization).
says(d_c16_two_routes, routes_to_organization, count, 2).          % nesting; relationship

/* ======================================================= chapter 17 */

claim(d_c17_labelled, book, 17, "Every comparison in this book is supposed to be labelled as a comparison, and chapters 9, 10, and 14 go out of their way to show where surface similarity hides unrelated mechanisms.", settled, interpretive).
depends_on(d_c17_labelled, d_c14_protochemistry).

/* --- three claims, and what happened when they were checked */

% "each tied to a particular chapter": the third is tied to two, chapters 14 and 15.
claim(d_c17_three_offered, book, 17, "An earlier draft of this chapter offered three, each tied to a particular chapter, and presented them as tests someone might run.", settled, interpretive).
claim(d_c16hs_three_listed, 'book-hs', 16, "An earlier version of this chapter listed three claims this framework makes that could be tested, and presented them as experiments somebody should run.", settled, interpretive).
says(d_c17_three_offered, framework_checkable_claims, count, 3).
says(d_c16hs_three_listed, framework_checkable_claims, count, 3).

claim(d_c17_cycling, book, 17, "Repeated wet–dry cycling drives nucleotides to polymerize into long chains without chemical activation, in conditions resembling those at volcanic hot springs", settled, empirical).
source(d_c17_cycling, 'Rajamani', 2008).
source(d_c17_cycling, 'Damer', 2020).
claim(d_c17_compartments, book, 17, "Ribozymes encapsulated in model protocells adapt faster under selection than the same sequences unencapsulated, and compartmentalization protects a cooperative replicating system from being overrun by parasitic sequences that would otherwise destroy it.", settled, empirical).
source(d_c17_compartments, 'Lai', 2021).
source(d_c17_compartments, 'Matsumura', 2016).
% Line 48 used to say chapters 14 and 15 claim retention is biased toward what is easy to
% transmit "rather than what is accurate or useful". That contradicted chapter 14's colour
% vocabulary tracking usefulness and chapter 15's useful practice. Since 2026-11-03: "not only by".
claim(d_c17_retention_bias, book, 17, "Transmission-chain experiments — passing material along a line of participants and measuring what degrades — have identified several specific biases.", settled, empirical).
source(d_c17_retention_bias, 'Mesoudi', 2006).
source(d_c17_retention_bias, 'Barrett', 2001).
source(d_c17_retention_bias, 'Kalish', 2007).
source(d_c17_retention_bias, 'Bartlett', 1932).
says(d_c17_retention_bias, mildly_counterintuitive_content, transmission_retention, higher).
depends_on(d_c17_retention_bias, d_c15_mcount).

claim(d_c17_already_investigated, book, 17, "All three have already been investigated, by people who would not describe themselves as working on anything in this book.", settled, empirical).
claim(d_c16hs_already_run, 'book-hs', 16, "Then came the check: all three had already been run. Cycling really does help prebiotic chemistry accumulate. Enclosing things in bags really does help them persist and adapt. Cultural transmission really does have measurable biases in what survives.", settled, empirical).
source(d_c17_already_investigated, 'Rajamani', 2008).
source(d_c17_already_investigated, 'Lai', 2021).
source(d_c17_already_investigated, 'Mesoudi', 2006).
source(d_c16hs_already_run, 'Rajamani', 2008).
source(d_c16hs_already_run, 'Lai', 2021).
source(d_c16hs_already_run, 'Mesoudi', 2006).
says(d_c17_already_investigated, framework_checkable_claims, already_tested, true).
says(d_c16hs_already_run, framework_checkable_claims, already_tested, true).

claim(d_c17_all_held, book, 17, "So the framework's three checkable claims were checked, and all three held.", settled, interpretive).
claim(d_c16hs_all_favour, 'book-hs', 16, "All three came out in the book's favour. That's a worse result than it sounds, and here's why.", settled, interpretive).
says(d_c17_all_held, framework_checkable_claims, count, 3).
says(d_c17_all_held, framework_checkable_claims, held, 3).
says(d_c16hs_all_favour, framework_checkable_claims, held, 3).
computes(d_c17_all_held, 1 + 1 + 1, 3).          % one "survives" verdict under each of claims 1, 2 and 3
depends_on(d_c17_all_held, d_c17_cycling).
depends_on(d_c17_all_held, d_c17_compartments).
depends_on(d_c17_all_held, d_c17_retention_bias).
depends_on(d_c16hs_all_favour, d_c16hs_already_run).

claim(d_c17_not_predictions, book, 17, "A prediction reverse-engineered from results already in circulation is not a prediction.", settled, interpretive).
claim(d_c17_undiminished, book, 17, "Until it does, the objection in the previous section stands undiminished, and the three results above are better understood as the framework being compatible with the evidence than as the framework having earned anything.", settled, interpretive).
claim(d_c16hs_objection_stands, 'book-hs', 16, "What would count is a prediction this framework makes that a specialist wouldn't expect. I don't have one. Until I do, the objection above stands.", settled, interpretive).
says(d_c17_undiminished, strongest_objection, status, stands).
says(d_c16hs_objection_stands, strongest_objection, status, stands).
says(d_c17_undiminished, framework_novel_prediction, exists, false).  % "The chapter does not have one."
says(d_c16hs_objection_stands, framework_novel_prediction, exists, false).
depends_on(d_c17_undiminished, d_c17_not_predictions).
depends_on(d_c17_undiminished, d_c17_all_held).
depends_on(d_c16hs_objection_stands, d_c16hs_all_favour).

/* --- where the account stops */

claim(d_c17_four_places, book, 17, "Four places where the framework identifies genuine uncertainty rather than papering over a gap.", settled, interpretive).
says(d_c17_four_places, acknowledged_open_questions, count, 4).
computes(d_c17_four_places, 1 + 1 + 1 + 1, 4).   % heredity, consciousness, direction of complexity, collective threshold

claim(d_c17_heredity_gap, book, 17, "How a chemical system first came to copy a pattern reliably enough for selection to accumulate across generations is not known, and nothing in this book narrows it.", settled, empirical).
claim(d_c16hs_copying_biggest, 'book-hs', 16, "How copying started. The biggest one. Named several times already, and not narrowed by anything in this book.", settled, empirical).
says(d_c17_heredity_gap, heredity_origin, known, false).
says(d_c16hs_copying_biggest, heredity_origin, known, false).
says(d_c17_heredity_gap, acknowledged_open_questions, largest, heredity_origin).
says(d_c16hs_copying_biggest, acknowledged_open_questions, largest, heredity_origin).
% "Named twice already": before this line the HS edition states the gap in ch. 1 (line 45),
% ch. 8 (line 59), ch. 12 (line 59) and earlier in this chapter (line 15).
says(d_c16hs_copying_biggest, hs_prior_statements_of_heredity_gap, count, at_least(3)).
computes(d_c16hs_copying_biggest, 1 + 1 + 1 + 1, at_least(3)).    % "several"; it said "twice" until 2026-11-03

claim(d_c17_two_statements, book, 17, "The relationship between those two statements needs more care than it has been given here.", settled, interpretive).
claim(d_c16hs_not_squared, 'book-hs', 16, "This book describes organization piling up. It also says evolution has no push towards complexity. Both are defensible and I haven't squared them.", settled, interpretive).
says(d_c17_two_statements, complexity_direction_tension, resolved, false).
says(d_c16hs_not_squared, complexity_direction_tension, resolved, false).

claim(d_c17_two_explanations, book, 17, "There are two explanations for an apparent increase.", settled, interpretive).
says(d_c17_two_explanations, complexity_increase_explanations, count, 2).   % a drive; spread from a floor

claim(d_c17_passive_favoured, book, 17, "Where the question has been examined empirically, the tests have tended to favour the passive explanation and have not found evidence of a drive.", settled, empirical).
source(d_c17_passive_favoured, 'McShea', 1996).
says(d_c17_passive_favoured, complexity_trend_evidence, favours, passive_diffusion).
% HS ch. 16 states this finding both inside and outside a box. The box (line 55) is a label
% between paragraphs, written "**Still argued about** —" without the full stop the other
% boxes use. By book-hs/00 ("each box covers what's inside it") the paragraphs after it are
% unboxed, i.e. settled. Encoded as presented.
% The two HS ch. 16 boxes used to sit beside the paragraphs they labelled; since 2026-11-03 the
% paragraphs are inside them, so what follows the box label carries the box's tier.
% Restructured on 2026-11-03. The box now holds only the open question. The evidence report
% is unboxed and settled, as in full ch. 17, and Marcot & McShea 2007 confirms it: phylogenetic
% tests mostly could not reject equal rates of increase and decrease.
claim(d_c16hs_complexity_box, 'book-hs', 16, "Whether anything pushes life towards complexity at all.", contested, interpretive).
claim(d_c16hs_passive_favoured, 'book-hs', 16, "Where this has been studied properly, the evidence has tended to favour that boring explanation over a drive towards complexity", settled, empirical).
source(d_c16hs_passive_favoured, 'McShea', 1996).
source(d_c16hs_passive_favoured, 'Marcot', 2007).
source(d_c17_passive_favoured, 'Marcot', 2007).
says(d_c16hs_passive_favoured, complexity_trend_evidence, favours, passive_diffusion).

claim(d_c17_wall, book, 17, "The honest version is that much of what the later chapters describe as accumulation may be a distribution spreading from a wall, observed by something that happens to be at the far end of it.", settled, interpretive).
depends_on(d_c17_wall, d_c17_passive_favoured).
depends_on(d_c17_wall, c17_gould).

% The full edition flags this item in italics as "the author's speculation". The HS puts
% "**My own idea**, and a shaky one." in a box above the paragraph, not around it, so the
% paragraph is unboxed, i.e. settled by the HS rule. Encoded as presented.
claim(d_c17_collective, book, 17, "Whether a population can be said to model its own modelling in any sense beyond the metaphorical is genuinely unclear", author, interpretive).
claim(d_c16hs_collective, 'book-hs', 16, "Whether a whole society can be said to model its own modelling in any way that isn't merely a metaphor is unclear, and people treating it as settled in either direction haven't convinced me.", author, interpretive).
says(d_c17_collective, collective_self_modelling, status, unclear).
says(d_c16hs_collective, collective_self_modelling, status, unclear).

/* --- what would count against all of this */

% "for the reason given in the previous section": the previous section is "Where the account
% stops"; the reason (both candidates already checked) is given two sections back, in
% "Three claims, and what happened when they were checked".
claim(d_c17_two_struck, book, 17, "Two candidates have to be struck from this list, for the reason given in the section on the three tested claims.", settled, interpretive).   % pointed at "the previous section" until 2026-11-03
says(d_c17_two_struck, struck_falsifier_candidates, count, 2).
computes(d_c17_two_struck, 1 + 1, 2).            % the two italicised conditionals that follow
depends_on(d_c17_two_struck, d_c17_all_held).

% The full sentence "This is the most likely of the three." is 37 characters, too short to cover.
claim(d_c17_most_likely, book, 17, "If the origin of heredity is explained by chemistry that owes nothing to search, selection, or compression, then the vocabulary was decoration over the interesting part. This is the most likely of the three.", settled, interpretive).
claim(d_c16hs_most_likely, 'book-hs', 16, "That last one is the most likely of the three.", settled, interpretive).
says(d_c17_most_likely, most_likely_falsifier, which, heredity_explained_without_framework).
says(d_c16hs_most_likely, most_likely_falsifier, which, heredity_explained_without_framework).
says(d_c17_most_likely, remaining_falsifiers, count, 3).
says(d_c16hs_most_likely, remaining_falsifiers, count, 3).
computes(d_c16hs_most_likely, 1 + 1 + 1, 3).     % the cheapest test; a single unifying mechanism; copying explained without the framework

claim(d_c17_three_falsifiers, book, 17, "Three falsifiers, one of them cheap and unrun.", settled, interpretive).
claim(d_c16hs_cheapest, 'book-hs', 16, "The cheapest test is one nobody has run, including me.", settled, interpretive).
says(d_c17_three_falsifiers, remaining_falsifiers, count, 3).
computes(d_c17_three_falsifiers, 1 + 1 + 1, 3).  % the three bullets under "What remains"
says(d_c17_three_falsifiers, cheapest_falsification_test, run, false).
says(d_c16hs_cheapest, cheapest_falsification_test, run, false).
depends_on(d_c17_three_falsifiers, d_c17_two_struck).

/* ======================================================= chapter 20 */

claim(d_c20_summary, book, 20, "The honest summary of twenty chapters is that the recurrence is real and uneven.", settled, interpretive).
claim(d_c16hs_summary, 'book-hs', 16, "The honest summary is that the continuity is real and uneven.", settled, interpretive).
says(d_c20_summary, cross_level_continuity, character, real_and_uneven).
says(d_c16hs_summary, cross_level_continuity, character, real_and_uneven).
depends_on(d_c20_summary, d_c16_verdict).
depends_on(d_c16hs_summary, d_c16hs_lower_half).
depends_on(d_c16hs_summary, d_c16hs_above_language).

% Line 23 was rewritten on 2026-11-03 at the author's direction. It used to say that
% vesicles (ch. 5) were "becoming" replicators (ch. 8), which crosses the heredity gap,
% and that the two were "the same process", which contradicted ch. 2's table (different
% rows, "share no machinery"). It now gives the measured coupling as settled, followed by
% the author's capture reading. That reading rests on the gap, which stays open.
claim(d_c20_different_rows, book, 20, "Selection among fatty acid vesicles in chapter 5 and selection among early replicators in chapter 8 sit in different rows of chapter 2's table", settled, interpretive).
depends_on(d_c20_different_rows, a_c02_three_rows).
claim(d_c20_encloses, book, 20, "A vesicle encloses a sample of the water it forms in and whatever that water holds, RNA included.", settled, empirical).
source(d_c20_encloses, 'Hanczyc', 2003).
claim(d_c20_coupling, book, 20, "RNA inside a vesicle makes it grow at the expense of emptier neighbours", settled, empirical).
depends_on(d_c20_coupling, a_c05_osmotic).
claim(d_c20_protocells, book, 20, "ribozymes inside model protocells adapt faster under selection than the same sequences outside", settled, empirical).
depends_on(d_c20_protocells, d_c17_compartments).
claim(d_c20_capture, book, 20, "On this reading the first cell arose by combination, chapter 6's two evolutionary histories merging into one", author, interpretive).
depends_on(d_c20_capture, b_c06_combination).
depends_on(d_c20_capture, d_c20_coupling).
rests_on_gap(d_c20_capture, heredity_origin).

claim(d_c20_rate, book, 20, "Each level of organization in this book operates faster than the one beneath it. Geological and cosmic change proceeds over billions of years; biological evolution over millions; cultural change over thousands; technological change over decades.", settled, generalization).
says(d_c20_rate, rate_comparison_categories, count, 4).
computes(d_c20_rate, 1 + 1 + 1 + 1, 4).          % geological and cosmic; biological; cultural; technological
depends_on(d_c20_rate, d_c15_two_differences).   % line 35: transmission between contemporaries outpaces parent to offspring
claim(d_c20_incommensurable, book, 20, "The comparison is less clean than it sounds, because the four categories are not commensurable.", settled, interpretive).
says(d_c20_incommensurable, rate_comparison_categories, count, 4).

claim(d_c20_break, book, 20, "There is a break in this account, at heredity, and it is not a small one: how a chemical system first came to copy a pattern reliably is not known, and this book does not narrow it.", settled, empirical).
says(d_c20_break, heredity_origin, known, false).
depends_on(d_c20_break, c16_break).               % "chapters 16 and 17 both say"
depends_on(d_c20_break, d_c17_heredity_gap).

claim(d_c20_two_senses, book, 20, "The two senses of the word have to be kept apart.", settled, interpretive).
claim(d_c16hs_two_meanings, 'book-hs', 16, "But there are two meanings of \"break\" and they have to be kept apart.", settled, interpretive).
says(d_c20_two_senses, break_senses, count, 2).
says(d_c16hs_two_meanings, break_senses, count, 2).

% The third example used to be "a code tolerating error because of the order its parts arrived
% in", which is chapter 8's "neutral origin", one of three readings that chapter calls open.
% Since 2026-11-03 it is the model result chapter 8 reports as shown ("Models of this kind
% produce codes nearly as error-tolerant as the real one"), not a claim about what happened.
claim(d_c20_no_sequence_break, book, 20, "The second has not been found anywhere, and every transition that has been worked out in detail — amphiphiles closing into vesicles, vesicles competing by osmotic pressure, a model code gaining its tolerance for error from nothing but the order its parts arrived in — turned out to need nothing beyond what was already there.", settled, generalization).
claim(d_c16hs_no_sequence_break, 'book-hs', 16, "A break in the sequence would be a place where something showed up that the previous step couldn't supply — and in every transition that has been worked out in detail, nothing like that has been found.", settled, generalization).
says(d_c20_no_sequence_break, sequence_break, found, false).
says(d_c16hs_no_sequence_break, sequence_break, found, false).
depends_on(d_c20_no_sequence_break, c16_no_new_principle).

% "What I make of everything" (added 2026-11-06): the author's own passage, in the author's words,
% full edition only. Its lead-in marks the rest of the section as the author's. The eye figure is
% the one chapter 13 states and checks, so the claim depends on that one. (A says/4 fact here
% would be reported as a tier mismatch: the same figure, settled there and the author's here.)
claim(d_c20_rant_lead, book, 20, "What follows is the author's own rant about what it all means, and the author wants this read as prose rather than a scientific theory.", author, interpretive).
claim(d_c20_every_religion, book, 20, "So in a way, every religion is true — they're just incomplete in the way the human eye throws away ninety-nine per cent of what it takes in.", author, interpretive).
depends_on(d_c20_every_religion, c_c13_discard).
claim(d_c20_holobiont_guiding, book, 20, "Maybe it's the bacteria / holobiont guiding each and every one of us and we're just little carbon-based armour for an immensely complex and orchestrated system of life, energy, and cooperation.", author, interpretive).
