:- discontiguous claim/6, says/4, source/3, depends_on/2, computes/3, event_year/3,
                 order_claim/3, interval_claim/4, variant_ok/3, gap/3, rests_on_gap/2,
                 arc_gap/3, arc_descriptive/3, cite_ok/3, about/2, drift_ok/3,
                 prose_ok/2, common_knowledge/1, certainty_ok/2.

/*  Structured claims for chapters 10-13 of both editions; schema in claims.pl.
    Claim ids and new event names carry the c_ prefix; subject keys do not.
    Several claims anchor sentences whose existing claim quotes fewer than 40
    characters: checks.pl's covered/1 takes a 40-character prefix and fails on
    shorter quotes, though extract.py --uncovered counts them as covered. */

/* ======================================================= chapter 10 */

% Five ways to make a spiral
claim(c_c10_fixed_ratio, book, 10, "A nautilus adds shell at the opening; the new chamber is larger than the last by a fixed ratio; the shape follows by necessity.", settled, empirical).
source(c_c10_fixed_ratio, 'Thompson', 1917).
says(c_c10_fixed_ratio, edge_growth_spiral_increment, size_vs_previous, fixed_ratio).
claim(c_c10hs_fixed_amount, 'book-hs', 10, "A snail adds shell only at the opening, each new section bigger than the last by a fixed proportion.", settled, empirical).
says(c_c10hs_fixed_amount, edge_growth_spiral_increment, size_vs_previous, fixed_ratio).
% Corrected 2026-11-03: the text had "a fixed amount bigger", which the checker reported as a conflict.
% A fixed amount (a constant difference) is not a fixed ratio, and only a ratio gives the
% logarithmic spiral; the HS paragraph's own lead-in is "Grow at the edge, in proportion."
% Encoded as each edition has it, so the checker reports the conflict.

% Corrected on 2026-11-03 in both editions: "elongate at different rates" chose a side in an
% open question. Gerbode 2012 finds coiling by asymmetric contraction of a fibre ribbon, and Dilly
% 2026 by differential growth. Both editions now say only that the sides end up different lengths.
claim(c_c10_tendril, book, 10, "A tendril coils because its two sides change length by different amounts.", settled, empirical).
says(c_c10_tendril, tendril_coiling, cause, differential_side_length_change).
claim(c_c10_three_mechanisms, book, 10, "Same shape, three mechanisms with nothing in common.", settled, generalization).
says(c_c10_three_mechanisms, helices_from_rotation_and_advance, shared_mechanism, false).

claim(c_c10_fibonacci, book, 10, "Repeat that rule and the angle between successive units converges on about 137.5 degrees, which generates the interlocking spiral families and the Fibonacci counts that go with them.", settled, quantitative).
source(c_c10_fibonacci, 'Douady', 1992).
says(c_c10_fibonacci, phyllotaxis_spiral_counts, sequence, fibonacci).      % c10_golden quotes only 32 characters of this sentence

claim(c_c10_five_least, book, 10, "The least familiar of the five, and the one that makes a turning spiral with no material rotation at all.", settled, empirical).   % reworded on 2026-11-03: shells and seed heads need no material rotation either, so the old wording claimed a uniqueness the mechanism doesn't have
says(c_c10_five_least, excitable_medium_spiral_wave, needs_material_rotation, false).
says(c_c10_five_least, spiral_formation_mechanisms, count_described, 5).
claim(c_c10_five_mechanisms, book, 10, "Five conditions, five mechanisms, one family of shapes.", settled, generalization).
says(c_c10_five_mechanisms, spiral_formation_mechanisms, count_described, 5).

% What the recurrence shows
claim(c_c10_two_cautions, book, 10, "Two cautions keep this from running away.", settled, interpretive).
says(c_c10_two_cautions, spiral_argument_cautions, count, 2).
claim(c_c10_form_not_mechanism, book, 10, "The first is that similar form does not imply shared mechanism.", settled, generalization).
says(c_c10_form_not_mechanism, similar_form, implies_shared_mechanism, false).
claim(c_c10_galaxy_arms, book, 10, "Galaxy arms are not material structures that wind up over time; they are better understood as waves of compression passing through the disc, with stars moving in and out of them.", settled, empirical).
source(c_c10_galaxy_arms, 'Lin', 1964).
says(c_c10_galaxy_arms, galaxy_spiral_arms, nature, density_waves).
claim(c_c10_two_images, book, 10, "Putting those two images side by side invites an inference that the physics does not support.", settled, interpretive).
depends_on(c_c10_two_images, c_c10_galaxy_arms).

% Coiled for storage
claim(c_c10_linking_number, book, 10, "For a strand whose ends cannot turn freely, a quantity called the linking number stays fixed, and it is the sum of two others: twist, how far the strand turns about its own axis, and writhe, how far that axis coils through space.", settled, quantitative).
claim(c_c10hs_twist_plus_coil, 'book-hs', 10, "That's a rule, not bad luck: for a long strand whose ends can't spin freely, the amount it twists plus the amount it coils stays the same.", settled, quantitative).
source(c_c10_linking_number, 'Fuller', 1971).
source(c_c10hs_twist_plus_coil, 'Fuller', 1971).
says(c_c10_linking_number, strand_twist_plus_writhe, conserved_when_ends_fixed, true).
says(c_c10hs_twist_plus_coil, strand_twist_plus_writhe, conserved_when_ends_fixed, true).

% Was "Most of them hold 46"; by count most human cells are red blood cells, which have no nucleus.
claim(c_c10hs_46_strands, 'book-hs', 10, "Most kinds of cell in your body hold 46 very long strands of DNA, wound around tiny protein spools — about thirty million in each cell — and folded again.", settled, quantitative).
says(c_c10hs_46_strands, human_chromosomes_per_cell, count, 46).      % c10hs_nucleosomes quotes only 33 characters of this sentence

claim(c_c10_one_kind, book, 10, "Rope, cable, line, and chromosome are one kind of object: a one-dimensional sequence that has to be packed into three dimensions and later unpacked in the order it went in.", author, interpretive).
depends_on(c_c10_one_kind, c10_spiral_principle).       % "this chapter's principle, extension that keeps its own history, put to practical use"
depends_on(c_c10_one_kind, c_c10_linking_number).       % "one piece of accounting covers a hose and a chromosome"

% Spirals people make
claim(c_c10_newgrange_two_kinds, book, 10, "Its best-known stones set the two kinds side by side.", settled, empirical).
% O'Kelly 1982 (†) could not be read, and the text doesn't name it. Since 2026-11-03 the claim
% rests on the Discovery Programme's records of kerbstones K1 and K52 (fix_spirals.pl).
says(c_c10_newgrange_two_kinds, newgrange_motif_kinds, count, 2).        % curved and straight-edged
claim(c_c10_pairing, book, 10, "The pairing reads as a record of the two ways a bounded space gets filled.", author, interpretive).
depends_on(c_c10_pairing, c_c10_newgrange_two_kinds).
depends_on(c_c10_pairing, c10_spiral_principle).
% c10_newgrange_reading opens with "Here the author would go further.", which the splitter makes
% a 33-character sentence of its own, so that claim anchors no sentence; this one anchors the reading.

% HS twins (added 2026-11-06: the author asked for Book 1's neolithic spiral art in the HS
% edition, "without more research, just simplify and use our same resources/references").
% Same sources as the full edition's c10_newgrange and c_c10_newgrange_two_kinds.
claim(c_c10hs_newgrange, 'book-hs', 10, "Newgrange, a huge stone tomb in Ireland, was built around 3100 BCE, more than five thousand years ago.", settled, historical).
source(c_c10hs_newgrange, 'Smyth', 2025).
claim(c_c10hs_newgrange_two_kinds, 'book-hs', 10, "The carving at the entrance puts spirals and diamonds side by side, and so does the stone directly opposite, at the back of the mound.", settled, empirical).
source(c_c10hs_newgrange_two_kinds, 'Discovery Programme', 2014).
claim(c_c10hs_newgrange_families, 'book-hs', 10, "Many of its stones carry carvings that come in a few repeating families: curvy ones, like circles and spirals, and straight-edged ones, like zigzags, parallel lines and diamond shapes.", settled, empirical).
source(c_c10hs_newgrange_families, 'Discovery Programme', 2014).
says(c_c10hs_newgrange_families, newgrange_motif_kinds, count, 2).        % curved and straight-edged

claim(c_c10_form_constants, book, 10, "Geometric hallucinations fall into four recurring families, two of which are lattices and spirals — the pair carved together at Newgrange — and mathematical models of the wiring between the eye and the visual cortex reproduce those families from the structure of the cortex itself.", settled, empirical).
source(c_c10_form_constants, 'Bressloff', 2001).
says(c_c10_form_constants, hallucination_form_constants, count, 4).
claim(c_c10_entoptic, book, 10, "Archaeologists have argued that Irish passage-tomb art, and much older cave art, draws on imagery of this kind.", contested, empirical).
source(c_c10_entoptic, 'Dronfield', 1995).
source(c_c10_entoptic, 'Lewis-Williams', 1988).
depends_on(c_c10_entoptic, c_c10_form_constants).

% The quote stops before "and concluded that van Gogh must have observed real turbulent flow",
% the conclusion the next two paragraphs take apart (c_c10_vase_test).
claim(c_c10_kolmogorov_slope, book, 10, "Treating the brightness of the paint as a stand-in for a quantity carried by a flow, they found that its spectrum — how much variation there is at each scale, from the largest swirl to the smallest — falls off with the same slope that Andrei Kolmogorov's 1941 theory predicts for fully developed turbulence", settled, empirical).
source(c_c10_kolmogorov_slope, 'Ma', 2024).
source(c_c10_kolmogorov_slope, 'Kolmogorov', 1941).
event_year(c_kolmogorov_turbulence_theory, 1941, 'Kolmogorov 1941').
event_year(c_starry_night_spectrum_study, 2024, 'Ma et al. 2024').
order_claim(c_c10_kolmogorov_slope, c_kolmogorov_turbulence_theory, c_starry_night_spectrum_study).
claim(c_c10_earlier_study, book, 10, "An earlier study had reported a related match in the statistics of brightness across several of his late paintings.", settled, empirical).
source(c_c10_earlier_study, 'Aragón', 2008).
event_year(c_van_gogh_luminance_study, 2008, 'Aragón et al. 2008').
order_claim(c_c10_earlier_study, c_van_gogh_luminance_study, c_starry_night_spectrum_study).
claim(c_c10_vase_test, book, 10, "A test that a vase of flowers also passes cannot be what identifies turbulence.", settled, interpretive).
depends_on(c_c10_vase_test, c10_degas).

% Becoming rather than being: the full edition marks the whole section as the author's reading.
% The HS edition states unboxed ("Spirals are shapes of still going") what its later
% "My own idea" box restates.
claim(c_c10hs_still_going, 'book-hs', 10, "Those are shapes of having arrived. Spirals are shapes of still going.", settled, generalization).
claim(c_c10hs_two_groups, 'book-hs', 10, "Things sort into two groups: settled ones, shaped by the forces on them right now, and running ones — growing, circulating — whose shape also records the path they took. The spirals are all in the second group.", author, interpretive).
says(c_c10hs_still_going, spirals, system_class, still_running).
% The box's own claim is the sorting of every system into settled and running, which the
% full edition also marks as the author's ("Becoming rather than being"). Spirals as shapes
% of still going is unmarked in both editions (full ch. 10, "What the recurrence shows").
says(c_c10hs_two_groups, all_systems, sorting, settled_or_running).
depends_on(c_c10hs_still_going, c10hs_spiral_principle).
depends_on(c_c10hs_two_groups, c10hs_spiral_principle).

% Since 2026-11-03 this paragraph has its own heading ("Where the reading stops"), outside the
% author's section, so the developmental fact is settled, as in the HS edition.
claim(c_c10_hair_whorl, book, 10, "Hair whorls arise from the orientation of follicles during skin development", settled, empirical).
claim(c_c10hs_hair_whorl, 'book-hs', 10, "Hair whorls come from the direction follicles point as skin develops", settled, empirical).
source(c_c10_hair_whorl, 'Guo', 2004).
source(c_c10hs_hair_whorl, 'Guo', 2004).
says(c_c10_hair_whorl, hair_whorl, origin, follicle_orientation_in_development).
says(c_c10hs_hair_whorl, hair_whorl, origin, follicle_orientation_in_development).

% Coda: a planet that hums
claim(c_c10_schumann_freq, book, 10, "The cavity has resonant frequencies, the lowest around 7.8 Hz, and they are measurable with the right instruments anywhere on Earth.", settled, quantitative).
source(c_c10_schumann_freq, 'Balser', 1960).
says(c_c10_schumann_freq, schumann_resonance_fundamental, hz, approx(7.8)).

/* ======================================================= chapter 11 */

claim(c_c11_two_things, book, 11, "It is a way of holding two things at once — that a process repeats, and that repeating it changes what it repeats into.", settled, interpretive).
claim(c_c11_same_constraint, book, 11, "Chapter 10 described this in space — extension that cannot revisit its own past. This is the same constraint operating in time.", settled, interpretive).
depends_on(c_c11_same_constraint, c10_spiral_principle).

claim(c_c11_ice_cycles_co2, book, 11, "across eight glacial cycles, and carries a direct record of past carbon dioxide — not inferred from a proxy, but measured from the air itself", settled, empirical).
claim(c_c11hs_ice, 'book-hs', 11, "The longest Antarctic record goes back about 800,000 years, through eight ice ages.", settled, quantitative).
claim(c_c11hs_co2, 'book-hs', 11, "The carbon dioxide levels of 800,000 years ago aren't estimated from something else.", settled, empirical).
source(c_c11_ice_cycles_co2, 'EPICA community members', 2004).
source(c_c11_ice_cycles_co2, 'Lüthi', 2008).
source(c_c11hs_ice, 'EPICA community members', 2004).
source(c_c11hs_co2, 'Lüthi', 2008).
says(c_c11hs_ice, longest_antarctic_ice_record, years, approx(800000)).
says(c_c11_ice_cycles_co2, longest_antarctic_ice_record, glacial_cycles, 8).
says(c_c11hs_ice, longest_antarctic_ice_record, glacial_cycles, 8).
says(c_c11_ice_cycles_co2, ice_core_co2_record, measured_directly, true).
says(c_c11hs_co2, ice_core_co2_record, measured_directly, true).
says(c_c11_ice_cycles_co2, ice_core_co2_record, years, approx(800000)).
says(c_c11hs_co2, ice_core_co2_record, years, approx(800000)).

% An aside on cycles at the largest scale ("None of it is established"). As with
% c11_smolin_proposal: who proposed what, and when, is settled; the proposals are not.
claim(c_c11_three_cyclic, book, 11, "The question of whether the universe had a beginning or a previous state has several live answers, and at least three of them take a cyclic shape.", settled, empirical).
says(c_c11_three_cyclic, cyclic_cosmological_proposals, count, at_least(3)).
claim(c_c11_ccc_history, book, 11, "Conformal cyclic cosmology, developed by Roger Penrose and set out for general readers in Cycles of Time (2010)", settled, historical).
source(c_c11_ccc_history, 'Penrose', 2010).
event_year(c_cycles_of_time_published, 2010, 'Penrose 2010').
claim(c_c11_hawking_points, book, 11, "Penrose and collaborators argued in 2020 that faint circular features in the cosmic microwave background are traces of black hole evaporation in a previous aeon.", contested, empirical).
source(c_c11_hawking_points, 'An', 2020).
event_year(c_hawking_points_claim, 2020, 'An et al. 2020').
claim(c_c11_cns_interesting, book, 11, "Cosmological natural selection, proposed by Lee Smolin in 1992, is the most structurally interesting of the three for this book's purposes, because it applies the vocabulary of chapter 9 to physics itself.", settled, interpretive).
says(c_c11_cns_interesting, cyclic_cosmological_proposals, count, 3).      % c11_smolin_proposal quotes only 30 characters of this sentence

% The text dates the statement 2004; the reference list has it only as Smolin 2007.
claim(c_c11_stakes_2004, book, 11, "He stated the stakes plainly in 2004: a neutron star heavier than about 1.5 solar masses would be troubling for the theory", settled, historical).
source(c_c11_stakes_2004, 'Smolin', 2007).
event_year(c_smolin_stakes_stated, 2004, 'the text: "in 2004"; listed as Smolin 2007').
order_claim(c_c11_stakes_2004, cns_proposed, c_smolin_stakes_stated).
order_claim(c_c11_stakes_2004, c_smolin_stakes_stated, first_two_solar_mass_pulsar).

claim(c_c11_attraction_three, book, 11, "The attraction of all three is obvious, and it is worth being explicit about why that is a reason for caution rather than confidence.", settled, interpretive).
says(c_c11_attraction_three, cyclic_cosmological_proposals, count, 3).

/* ======================================================= chapter 12 */

claim(c_c12_giant_viruses, book, 12, "Giant viruses discovered in the last two decades have genomes larger than those of some free-living bacteria and encode components of the protein-synthesis machinery that viruses were supposed to lack entirely.", settled, empirical).
claim(c_c12hs_giant_viruses, 'book-hs', 12, "Giant viruses found in the last twenty years have more genes than some free-living bacteria, and carry bits of protein-building machinery that viruses were supposedly defined by not having.", settled, empirical).
source(c_c12_giant_viruses, 'Raoult', 2004).
source(c_c12hs_giant_viruses, 'Raoult', 2004).
says(c_c12_giant_viruses, giant_virus_discovery, years_before_manuscript, approx(20)).
says(c_c12hs_giant_viruses, giant_virus_discovery, years_before_manuscript, approx(20)).
says(c_c12_giant_viruses, giant_viruses, genome_exceeds_some_free_living_bacteria, true).
says(c_c12hs_giant_viruses, giant_viruses, genome_exceeds_some_free_living_bacteria, true).
says(c_c12_giant_viruses, giant_viruses, encode_protein_synthesis_components, true).
says(c_c12hs_giant_viruses, giant_viruses, encode_protein_synthesis_components, true).
computes(c_c12_giant_viruses, 2026 - 2004, approx(20)).        % Mimivirus genome (Raoult 2004) to the manuscript's date
computes(c_c12hs_giant_viruses, 2026 - 2004, approx(20)).

claim(c_c12_not_converged, book, 12, "A hundred and twenty attempts have not converged, and the failure to converge may not be a failure of effort.", settled, interpretive).
says(c_c12_not_converged, published_definitions_of_life, count, approx(120)).
says(c_c12_not_converged, definition_of_life, agreed, false).
depends_on(c_c12_not_converged, c12_definitions).

% The HS "Still argued about" box holds a statement of fact (there is no agreed definition)
% that the full edition makes plainly; what is argued about is what life is.
claim(c_c12hs_no_agreed, 'book-hs', 12, "There's no agreed definition of life, and the disagreement isn't close to being resolved.", settled, interpretive).   % unboxed on 2026-11-03: a plain fact about the field, as the full edition states it
says(c_c12hs_no_agreed, definition_of_life, agreed, false).
claim(c_c12hs_not_pinned, 'book-hs', 12, "A thing with a hundred and twenty has not.", settled, interpretive).
says(c_c12hs_not_pinned, published_definitions_of_life, count, approx(120)).
says(c_c12hs_not_pinned, life_concept, pinned_down, false).
depends_on(c_c12hs_not_pinned, c12hs_definitions).
depends_on(c_c12hs_no_agreed, c_c12hs_not_pinned).      % the box ends "What follows is why."

/* ======================================================= chapter 13 */

claim(c_c13_discard, book, 13, "It is a device that throws away about ninety-nine per cent of what it collects before transmission", settled, quantitative).
claim(c_c13hs_discard, 'book-hs', 13, "Your eye discards about ninety-nine per cent of what it collects before sending anything.", settled, quantitative).
says(c_c13_discard, eye_input_discarded_before_transmission, percent, approx(99)).
says(c_c13hs_discard, eye_input_discarded_before_transmission, percent, approx(99)).
computes(c_c13_discard, 100 * (1 - 1.0e6 / 9.6e7), approx(99)).
computes(c_c13hs_discard, 100 * (1 - 1.0e6 / 9.6e7), approx(99)).
depends_on(c_c13_discard, c13_retina).
depends_on(c_c13_discard, c13_fibres).
depends_on(c_c13hs_discard, c13hs_retina).
depends_on(c_c13hs_discard, c13hs_fibres).
common_knowledge(c_c13_discard).
common_knowledge(c_c13hs_discard).

% Corrected in both editions on 2026-11-03. The text had five receptors per fibre at the centre
% of vision and thousands at the edge. Curcio & Allen 1990 found more ganglion cells than cones
% at the fovea, enough for each cone to have its own fibre and perhaps an ON and an OFF one. The
% average is about a hundred to one, so the periphery runs to hundreds.
claim(c_c13_convergence_range, book, 13, "the reduction is not uniform — at the centre of vision each receptor has an output fibre to itself, and may have two, while towards the edge a single fibre serves hundreds", settled, quantitative).
claim(c_c13hs_convergence_range, 'book-hs', 13, "(It isn't even — at the centre of your vision each sensor gets at least one wire to itself, maybe two, and at the edges one wire serves hundreds.", settled, quantitative).
source(c_c13_convergence_range, 'Curcio', 1990).
source(c_c13hs_convergence_range, 'Curcio', 1990).
says(c_c13_convergence_range, central_vision_receptors_per_fibre, count, at_most(1)).
says(c_c13hs_convergence_range, central_vision_receptors_per_fibre, count, at_most(1)).
says(c_c13_convergence_range, peripheral_receptors_per_fibre, count, at_least(100)).
says(c_c13hs_convergence_range, peripheral_receptors_per_fibre, count, at_least(100)).

claim(c_c13_humans_good, book, 13, "Humans are unusually good at transferring patterns across domains — noticing that two unlike systems seem to work alike — and this supports analogy, invention, scientific insight, and storytelling.", settled, generalization).
claim(c_c13hs_humans_good, 'book-hs', 13, "Humans are unusually good at noticing that two unrelated things seem to work alike — which gives us analogy, invention, science, and storytelling.", settled, generalization).
says(c_c13_humans_good, human_cross_domain_pattern_finding, ability, unusually_good).
says(c_c13hs_humans_good, human_cross_domain_pattern_finding, ability, unusually_good).
% Corrected on 2026-11-03 in both editions. The text said there was no signal at all, and
% that the feeling of fit was "if anything stronger for the false ones". The experiments
% (Salvi 2016, Danek & Wiley 2017, Laukkonen 2020; fix_culture.pl) find a real but
% unreliable signal: insight solutions are more often right, the feeling is stronger for
% right ones, false insights occur, and an unrelated "aha" can make falsehoods feel true.
claim(c_c13_no_signal, book, 13, "The capacity has no reliable internal signal distinguishing the two cases.", settled, empirical).
says(c_c13_no_signal, pattern_finding_faculty, internal_signal_true_vs_false, unreliable).
claim(c_c13_only_correction, book, 13, "It is the only available correction for a faculty that cannot reliably audit itself.", settled, interpretive).
depends_on(c_c13_only_correction, c_c13_no_signal).

% A fugue is an exercise. Rewritten on 2026-11-03 at the author's direction. The section
% used to state flatly that demanding exercises change the systems that perform them, and
% then call the direction of causation genuinely unsettled. The claim is now offered as a
% theory, beside an undisputed bodily case (calluses). The fugue "exercises" the capacity,
% and "builds" it only if the theory holds.
claim(c_c13_exercise_changes, book, 13, "That is a demanding exercise, and the theory is that demanding exercises change the systems that perform them.", contested, generalization).
claim(c_c13_calluses, book, 13, "a guitarist's fingertips harden into calluses where the strings press", settled, empirical).
common_knowledge(c_c13_calluses).
claim(c_c13_musicians, book, 13, "Trained musicians show measurable differences in auditory and motor regions relative to non-musicians, and the differences scale with training.", settled, empirical).
source(c_c13_musicians, 'Hyde', 2009).
claim(c_c13_causation_unsettled, book, 13, "The direction of causation is genuinely unsettled, and the honest version has to say so", contested, empirical).
claim(c_c13_fugue_trains, book, 13, "a cultural artefact built to be complex in a specific way, which exercises the capacity needed to handle it", settled, interpretive).
claim(c_c13_fugue_builds, book, 13, "which exercises the capacity needed to handle it and, if the theory holds, builds it.", contested, interpretive).
depends_on(c_c13_exercise_changes, c_c13_musicians).
depends_on(c_c13_exercise_changes, c_c13_causation_unsettled).
depends_on(c_c13_fugue_builds, c_c13_exercise_changes).
