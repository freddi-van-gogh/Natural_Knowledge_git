/*  Structured claims: the manuscript's propositions, in a form logic can test.

    The generated facts capture every sentence; this file says what some of them
    *mean*. Each claim quotes its sentence exactly (whitespace and Markdown
    emphasis ignored). If the book changes and the quote no longer appears, the
    checker reports the claim as drifted rather than silently testing stale text.

    claim(Id, Edition, Chapter, "verbatim quote", Tier, Kind).
        Tier: settled | contested | author — as the text presents it, not as we
              would like it to be. The HS edition marks tiers with boxes; the full
              edition in prose.
        Kind: quantitative | historical | empirical | generalization | interpretive
    says(Id, Subject, Property, Value).
        Value: N | approx(N) | range(Lo, Hi) | at_least(N) | more_than(N) | at_most(N) | atom
        Two claims with the same Subject and Property must have compatible Values.
    source(Id, FirstAuthor, Year).          must exist in book/19's reference list
    depends_on(Id, OtherId).                Id's argument uses OtherId as a premise
    computes(Id, Expression, StatedValue).  arithmetic the text performs or implies
    event_year(Event, Year, Basis).         dated anchors for chronology checks
    order_claim(Id, Earlier, Later).        the text puts Earlier first
    interval_claim(Id, From, To, Years).    the text states the gap between them
    gap(GapId, Description, WhereTheBookSaysSo).
    rests_on_gap(Id, GapId).
    arc_gap(X, Y, GapId) / arc_descriptive(X, Y, Where).   annotate Modern Alchemy's arc
    variant_ok(Id1, Id2, Why) / cite_ok(Name, Year, Why) / certainty_ok(Fragment, Why)
    prose_ok(ChainInputs, ChainOutput, Where) / common_knowledge(Id) / about(Id, ConceptId)
*/

:- discontiguous claim/6, says/4, source/3, depends_on/2, computes/3, event_year/3,
                 order_claim/3, interval_claim/4, variant_ok/3, gap/3, rests_on_gap/2,
                 arc_gap/3, arc_descriptive/3, cite_ok/3, about/2, drift_ok/3,
                 prose_ok/3, common_knowledge/1, certainty_ok/2.

/* ===================================================== acknowledged gaps */

gap(heredity_origin,
    "how a chemical system first came to copy a pattern reliably enough for differences to accumulate is not known",
    'book chs. 4, 8, 16, 17, 20; HS ch. 1').
% Since 2026-11-03 the arc has two strands, following the author's capture reading in
% ch. 20. Copying joins the protocell through Pc + H → NS, so the gap now sits on the
% copying strand itself, at RN → H.
arc_gap('RN', 'H', heredity_origin).

arc_descriptive('L', 'CT', 'book ch. 16: "Shared vocabulary rather than shared mechanism, above language"').
arc_descriptive('CT', 'Re', 'book ch. 16: "Shared vocabulary rather than shared mechanism, above language"').

prose_ok(['H', 'Va', 'Sl'], 'NS', 'book chs. 8–9 carry heredity into selection; the crossing is the subject of both').
prose_ok(['Pc', 'H'], 'NS', 'book ch. 20: a copier taken into a protocell, after the coupling measured in chs. 5 and 17').
prose_ok(['Mx', 'Sp', 'NS'], 'PR', 'book ch. 13: perception and representation built by nervous systems, from the retina up').
prose_ok(['Mx', 'Sp', 'NS'], 'PR', 'book ch. 16: "through multicellularity, specialization, nervous systems, and the capacity to build and use internal models"').

claim(c16_break, book, 16, "How a chemical system first came to copy a pattern reliably enough for differences to accumulate across generations is not known.", settled, empirical).
says(c16_break, heredity_origin, known, false).
claim(c4_open_ended, book, 4, "no demonstrated autocatalytic system evolves open-endedly.", settled, empirical).
says(c4_open_ended, open_ended_chemical_evolution, demonstrated, false).

/* ============================================ chapter 3: the trial count */

claim(c3_table_day, book, 3, "Suppose one such cycle completes every six minutes.", settled, supposition).   % an explicit supposition; the text then shows the result does not depend on it
computes(c3_table_day, 24 * 60 / 6, 240).
computes(c3_table_day, 24 * 60 / 6 * 365, approx(88000)).
computes(c3_table_day, 24 * 60 / 6 * 365 * 100, approx(8.8e6)).
computes(c3_table_day, 24 * 60 / 6 * 365 * 1.0e7, approx(1.0e12)).
claim(c3_hourly, book, 3, "Make the cycle an hour instead and the trial count falls by a factor of ten, to around 9 × 10<sup>10</sup>.", settled, quantitative).
computes(c3_hourly, 24 * 365 * 1.0e7, approx(9.0e10)).
claim(c3_daily, book, 3, "Make it a full day and it falls by a factor of 240, to around 4 × 10<sup>9</sup>.", settled, quantitative).
computes(c3_daily, 365 * 1.0e7, approx(4.0e9)).
common_knowledge(c3_hourly).
common_knowledge(c3_daily).

claim(c3hs_hourly, 'book-hs', 3, "Say the pool only resets once an hour. That cuts the total by ten — about ninety billion.", settled, quantitative).
computes(c3hs_hourly, 24 * 365 * 1.0e7, approx(9.0e10)).
claim(c3hs_daily, 'book-hs', 3, "Say once a day. That cuts it by 240 — about four billion.", settled, quantitative).
computes(c3hs_daily, 365 * 1.0e7, approx(4.0e9)).
common_knowledge(c3hs_hourly).
common_knowledge(c3hs_daily).
says(c3_hourly, trials_hourly_cycle_ten_million_years, count, approx(9.0e10)).
says(c3hs_hourly, trials_hourly_cycle_ten_million_years, count, approx(9.0e10)).
says(c3_daily, trials_daily_cycle_ten_million_years, count, approx(4.0e9)).
says(c3hs_daily, trials_daily_cycle_ten_million_years, count, approx(4.0e9)).

/* ======================================================== chapter 4 */

claim(c4_formose, book, 4, "known since Butlerov described it in 1861", settled, historical).
source(c4_formose, 'Butlerow', 1861).
cite_ok('Butlerov', 1861, 'the reference spells it Butlerow, the German transliteration').

claim(c4_peptide, book, 4, "In 1996 a research group reported a peptide (a short protein-like chain) 32 amino acids long", settled, empirical).
source(c4_peptide, 'Lee', 1996).
says(c4_peptide, ghadiri_peptide, residues, 32).
claim(c4_nucleic, book, 4, "Comparable systems had already been built from short nucleic acid strands a decade earlier", settled, historical).
source(c4_nucleic, 'Kiedrowski', 1986).
event_year(nucleic_acid_replicator, 1986, 'von Kiedrowski 1986').
event_year(peptide_replicator, 1996, 'Lee et al. 1996').
interval_claim(c4_nucleic, nucleic_acid_replicator, peptide_replicator, approx(10)).

claim(c4_kauffman, book, 4, "Stuart Kauffman argued in 1986 that such collectively autocatalytic sets should appear almost unavoidably", contested, empirical).
source(c4_kauffman, 'Kauffman', 1986).
claim(c4_status, book, 4, "Whether real prebiotic chemistry was rich enough, and whether the catalysts available were specific enough, is not settled.", contested, empirical).
depends_on(c4_status, c4_kauffman).

% Before 2026-11-03 this read "Self-sustaining reaction networks are chemistry, demonstrated in chapter 4."
% and depended on c4_status, which chapter 4 marks as not settled. The checker flagged the
% settled-on-contested dependency; the text now separates what is shown from what is open.
claim(c16_lower_half, book, 16, "chapter 4 shows autocatalysis demonstrated, and small collectively self-sustaining networks built in the laboratory", settled, empirical).
depends_on(c16_lower_half, c4_peptide).
% A plain statement that a question is open is settled as presented, in both editions
% (d_c16hs_prebiotic_open). c4_status stands for the open question itself, which is why it
% is contested and why this claim no longer rests on it (re-encoded 2026-11-03). It is empirical,
% like its HS twin, and shares that twin's sources (fix_origins.pl).
claim(c16_prebiotic_open, book, 16, "Whether prebiotic chemistry was rich enough to produce them unaided is, as chapter 4 says, not settled.", settled, empirical).
claim(c16_no_new_principle, book, 16, "Nothing in this stretch requires a new principle at any step; what remains open is whether early Earth supplied the conditions", settled, interpretive).
depends_on(c16_no_new_principle, c16_lower_half).

/* ======================================================== chapter 6 */

% Corrected on 2026-11-03. The text had Margulis "submitting the paper ... since 1964", but her
% own account (Margulis 1995) says she wrote it in 1966, and the paper is marked "Received 8 June
% 1966". No source gives 1964, so that date is gone from the text, along with the event and the
% order claim that rested on it.
claim(c6_margulis, book, 6, "recalled that the paper that set out the modern case was turned down by around fifteen journals", settled, historical).
source(c6_margulis, 'Margulis', 1995).
event_year(margulis_publication, 1967, 'Sagan 1967').
says(c6_margulis, endosymbiosis_paper_rejections, count, approx(15)).
cite_ok('Margulis', 1967, 'she published as Lynn Sagan; the reference is Sagan 1967').

claim(c6_mito, book, 6, "The human mitochondrial genome carries thirty-seven.", settled, quantitative).
source(c6_mito, 'Anderson', 1981).
says(c6_mito, human_mitochondrial_genes, count, 37).

/* ======================================================== chapter 8 */

claim(c8_codons, book, 8, "Four possible nucleotides in three positions gives 4 × 4 × 4 combinations — 64 codons.", settled, quantitative).
computes(c8_codons, 4 ** 3, 64).
common_knowledge(c8_codons).
claim(c8hs_codons, 'book-hs', 8, "Four letters in three slots gives 64 possible triplets.", settled, quantitative).
computes(c8hs_codons, 4 ** 3, 64).
common_knowledge(c8hs_codons).
claim(c8hs_meanings, 'book-hs', 8, "64 triplets, 21 meanings.", settled, quantitative).
computes(c8hs_meanings, 20 + 1, 21).
common_knowledge(c8hs_meanings).

claim(c8_million, book, 8, "they found roughly one in a million random codes performed better than the real one", settled, quantitative).
claim(c8hs_million, 'book-hs', 8, "Only about one in a million random codes did better than the real one.", settled, quantitative).
source(c8_million, 'Freeland', 1998).
source(c8hs_million, 'Freeland', 1998).
says(c8_million, codes_beating_standard_code, fraction, approx(1.0e-6)).
says(c8hs_million, codes_beating_standard_code, fraction, approx(1.0e-6)).

/* ======================================================== chapter 9 */

claim(c9_giraffe, book, 9, "about four and a half metres of nerve to span a gap of inches", settled, quantitative).
claim(c9hs_giraffe, 'book-hs', 9, "About four and a half metres of nerve, to cross a gap of inches.", settled, quantitative).
source(c9_giraffe, 'Wedel', 2012).
source(c9hs_giraffe, 'Wedel', 2012).
says(c9_giraffe, giraffe_laryngeal_nerve_path, metres, approx(4.5)).
says(c9hs_giraffe, giraffe_laryngeal_nerve_path, metres, approx(4.5)).

claim(c9hs_eyes, 'book-hs', 9, "surveys put it somewhere above forty, depending on how strictly you count", settled, quantitative).
source(c9hs_eyes, 'Salvini-Plawen', 1977).
says(c9hs_eyes, independent_eye_origins, count, more_than(40)).

claim(c9_multiple_origins, book, 9, "Here the author would go further: that early Earth, running an enormous number of parallel chemical experiments", author, interpretive).

/* ======================================================= chapter 10 */

claim(c10_golden, book, 10, "converges on about 137.5 degrees", settled, quantitative).
claim(c10hs_golden, 'book-hs', 10, "The angle between seeds settles at about 137.5 degrees", settled, quantitative).
computes(c10_golden, 360 * (1 - 1 / ((1 + sqrt(5)) / 2)), range(137.0, 138.0)).
computes(c10hs_golden, 360 * (1 - 1 / ((1 + sqrt(5)) / 2)), range(137.0, 138.0)).
common_knowledge(c10_golden).
common_knowledge(c10hs_golden).
says(c10_golden, phyllotaxis_divergence_angle, degrees, approx(137.5)).
says(c10hs_golden, phyllotaxis_divergence_angle, degrees, approx(137.5)).

claim(c10_douady, book, 10, "Douady and Couder produced the same spirals in 1992", settled, empirical).
claim(c10hs_douady, 'book-hs', 10, "in 1992, researchers dropped magnetized droplets into a dish", settled, empirical).
source(c10_douady, 'Douady', 1992).
source(c10hs_douady, 'Douady', 1992).
says(c10_douady, magnetic_droplet_phyllotaxis, year, 1992).
says(c10hs_douady, magnetic_droplet_phyllotaxis, year, 1992).

claim(c10_thompson, book, 10, "D'Arcy Wentworth Thompson worked this out in detail in 1917", settled, historical).
source(c10_thompson, 'Thompson', 1917).

claim(c10_schumann, book, 10, "These are the Schumann resonances, predicted in 1952 and confirmed experimentally within the decade.", settled, historical).
source(c10_schumann, 'Schumann', 1952).
event_year(schumann_prediction, 1952, 'Schumann 1952').
event_year(schumann_confirmation, 1960, 'Balser & Wagner 1960').
interval_claim(c10_schumann, schumann_prediction, schumann_confirmation, range(0, 10)).
claim(c10_lightning, book, 10, "roughly fifty strikes somewhere on the planet every second", settled, quantitative).
source(c10_lightning, 'Christian', 2003).
says(c10_lightning, global_lightning_rate, per_second, approx(50)).

claim(c10_spiral_principle, book, 10, "a spiral is what extension looks like when something must keep a fixed relationship to where it has already been", settled, generalization).
claim(c10hs_spiral_principle, 'book-hs', 10, "A spiral is what growing looks like when something has to keep its connection to where it's already been.", settled, generalization).

% Corrected on 2026-11-03. The excavator (Glory 2008) describes three strands, not two. The
% cord lay on a palaeosol dated 17,190 ± 135 radiocarbon years BP, which calibrates to about
% 21,000 years (Ducasse & Langlais 2019). The HS "at least 17,000 years" stays true. The subject
% is no longer "oldest_laid_rope": neither edition claims it is the oldest, and older plied cord
% exists (Abri du Maras, 41–52 ka).
claim(c10_rope, book, 10, "What appears to be three-strand laid rope, about twenty-one thousand years old, was found in the cave at Lascaux.", settled, historical).
claim(c10hs_rope, 'book-hs', 10, "People have made twisted rope for at least 17,000 years.", settled, historical).
says(c10_rope, twisted_rope_making, years_attested, approx(21000)).
says(c10hs_rope, twisted_rope_making, years_attested, at_least(17000)).

claim(c10_nucleosomes, book, 10, "146 base pairs at a time and about thirty million times in each human cell", settled, quantitative).
claim(c10hs_nucleosomes, 'book-hs', 10, "about thirty million in each cell", settled, quantitative).
source(c10_nucleosomes, 'Luger', 1997).
says(c10_nucleosomes, nucleosomes_per_human_cell, count, approx(3.0e7)).
says(c10hs_nucleosomes, nucleosomes_per_human_cell, count, approx(3.0e7)).

claim(c10_supercoil, book, 10, "Circular DNA from a virus was found twisted on itself in 1965, and the writhing number was defined in 1971", settled, historical).
source(c10_supercoil, 'Vinograd', 1965).
event_year(supercoiled_dna_found, 1965, 'Vinograd et al. 1965').
event_year(writhe_defined, 1971, 'Fuller 1971').
order_claim(c10_supercoil, supercoiled_dna_found, writhe_defined).

claim(c10hs_coil_rule, 'book-hs', 10, "The twist-and-coil rule is real mathematics, partly worked out because of DNA.", settled, historical).
source(c10hs_coil_rule, 'Fuller', 1971).
claim(c10hs_storage, 'book-hs', 10, "A coil is the shape of something long that's meant to be paid out later, in order.", author, interpretive).
depends_on(c10hs_storage, c10hs_spiral_principle).
depends_on(c10hs_storage, c10hs_coil_rule).

claim(c10_newgrange, book, 10, "The passage tomb at Newgrange in Ireland, built around 3100 BCE", settled, historical).
% O'Kelly 1982 (†), the excavation report, could not be read, and the text doesn't name it. Since
% 2026-11-03 the claim rests on Smyth et al. 2025 (fix_spirals.pl). O'Kelly stays in the reading
% list, still marked unchecked.
% Corrected on 2026-11-03 from ICOMOS 2006 (Murray & Viramontes, p. 5): "principally spirals, dot
% figures and scale models of architectural features". The 750–1200 dates belonged to the site,
% not the carvings, and INAH dates the city's height earlier, so the dates are gone.
claim(c10_plazuelas, book, 10, "More than 1,400 petroglyphs at Las Plazuelas in central Mexico are mainly spirals, dot figures, and carved models of buildings", settled, empirical).
source(c10_plazuelas, 'ICOMOS', 2006).

claim(c10_starry, book, 10, "Vincent van Gogh painted The Starry Night in June 1889, from the window of his room in the asylum at Saint-Rémy-de-Provence, where he had admitted himself the month before.", settled, historical).
common_knowledge(c10_starry).
event_year(van_gogh_admitted, 1889.35, 'Saint-Paul-de-Mausole, 8 May 1889').
event_year(starry_night_painted, 1889.45, 'mid-June 1889').
event_year(rosse_whirlpool_drawing, 1845, 'Nasim 2010: discovery and first sketch, 1845').
order_claim(c10_starry, van_gogh_admitted, starry_night_painted).
claim(c10_rosse, book, 10, "tracing the image to Lord Rosse's 1845 drawing of the Whirlpool galaxy", contested, historical).
% Whitney 1986 (†) could not be read. Since 2026-11-03 the claim rests on Whitney's own 1992
% letter, read in full (fix_spirals.pl), and on Nasim 2010 for the date of the drawing. The 1986
% paper stays in the reading list, still marked unchecked.
order_claim(c10_rosse, rosse_whirlpool_drawing, starry_night_painted).
claim(c10_turbulence, book, 10, "In 2024 a team of fluid dynamicists tried measuring the painting instead of interpreting it.", settled, empirical).
source(c10_turbulence, 'Ma', 2024).
claim(c10_degas, book, 10, "and obtained the same slope", settled, empirical).
source(c10_degas, 'Bourgault', 2025).
claim(c10_ortiz, book, 10, "the Cuban scholar Fernando Ortiz argued in 1947", contested, interpretive).
source(c10_ortiz, 'Ortiz', 1947).

claim(c10_potter, book, 10, "A comment from the author, not a finding: the potter's wheel may be the plainest case of a person working with a spiral rather than drawing one.", author, interpretive).
claim(c10hs_potter, 'book-hs', 10, "Not a fact, only a way of seeing it: a potter's wheel lets a person work with a spiral instead of drawing one.", author, interpretive).
claim(c10_newgrange_reading, book, 10, "Here the author would go further. The pairing reads as a record of the two ways a bounded space gets filled.", author, interpretive).

/* ======================================================= chapter 11 */

claim(c11_ice, book, 11, "The longest continuous Antarctic record reaches back about 800,000 years, across eight glacial cycles", settled, quantitative).
source(c11_ice, 'EPICA community members', 2004).
says(c11_ice, longest_antarctic_ice_record, years, approx(800000)).

claim(c11_smolin_proposal, book, 11, "proposed by Lee Smolin in 1992", settled, historical).          % the theory is contested; that he proposed it is not
source(c11_smolin_proposal, 'Smolin', 1992).
claim(c11_smolin_limit, book, 11, "which Smolin put at about 1.6 times the mass of the Sun", settled, historical).
source(c11_smolin_limit, 'Brown', 1994).
says(c11_smolin_limit, cns_neutron_star_limit, solar_masses, approx(1.6)).
event_year(cns_proposed, 1992, 'Smolin 1992').
event_year(kaon_calculations, 1994, 'Brown & Bethe 1994').
event_year(first_two_solar_mass_pulsar, 2010, 'Demorest et al. 2010').
order_claim(c11_smolin_limit, cns_proposed, kaon_calculations).
order_claim(c11_smolin_limit, kaon_calculations, first_two_solar_mass_pulsar).

claim(c11_stakes, book, 11, "a neutron star heavier than about 1.5 solar masses would be troubling for the theory, and one of 2.5 would certainly refute it", settled, historical).
source(c11_stakes, 'Smolin', 2007).
certainty_ok("would certainly refute it", 'reports what Smolin wrote, in his words').
claim(c11_measured, book, 11, "A pulsar of nearly two solar masses was measured in 2010; one at roughly 2.08 followed, and another at around 2.35 after that.", settled, quantitative).
source(c11_measured, 'Demorest', 2010).
claim(c11_exceeded, book, 11, "The limit he committed to has been exceeded several times.", settled, quantitative).
computes(c11_exceeded, min(1.97, min(2.08, 2.35)), more_than(1.6)).
depends_on(c11_exceeded, c11_measured).
depends_on(c11_exceeded, c11_smolin_limit).
claim(c11_not_reached, book, 11, "The higher figure he named as certain refutation has not yet been reached.", settled, quantitative).
computes(c11_not_reached, max(1.97, max(2.08, 2.35)), at_most(2.5)).
depends_on(c11_not_reached, c11_measured).
depends_on(c11_not_reached, c11_stakes).
common_knowledge(c11_exceeded).
common_knowledge(c11_not_reached).

/* ======================================================= chapter 12 */

claim(c12_definitions, book, 12, "One compilation counts over a hundred and twenty distinct published definitions of life", settled, quantitative).
claim(c12hs_definitions, 'book-hs', 12, "One survey counted over a hundred and twenty published definitions of life.", settled, quantitative).
source(c12_definitions, 'Trifonov', 2011).
source(c12hs_definitions, 'Trifonov', 2011).
says(c12_definitions, published_definitions_of_life, count, more_than(120)).
says(c12hs_definitions, published_definitions_of_life, count, more_than(120)).
computes(c12_definitions, 123, more_than(120)).

claim(c12_malformed, book, 12, "\"When did life begin\" is malformed in the same way \"when did it become a heap\" is malformed.", settled, interpretive).

/* ======================================================= chapter 13 */

claim(c13_retina, book, 13, "A human retina holds something like ninety-six million photoreceptors.", settled, quantitative).
claim(c13hs_retina, 'book-hs', 13, "There are about ninety-six million of them in one retina.", settled, quantitative).
source(c13_retina, 'Curcio', 1990).
source(c13hs_retina, 'Curcio', 1990).
says(c13_retina, photoreceptors_per_retina, count, approx(9.6e7)).
says(c13hs_retina, photoreceptors_per_retina, count, approx(9.6e7)).
claim(c13_fibres, book, 13, "The optic nerve carrying their output to the brain contains roughly one million fibres.", settled, quantitative).
claim(c13hs_fibres, 'book-hs', 13, "The optic nerve has about one million fibres.", settled, quantitative).
says(c13_fibres, optic_nerve_fibres, count, approx(1.0e6)).
says(c13hs_fibres, optic_nerve_fibres, count, approx(1.0e6)).
claim(c13_ratio, book, 13, "Around a hundred receptors feed each one", settled, quantitative).
claim(c13hs_ratio, 'book-hs', 13, "So roughly a hundred sensors feed each outgoing wire.", settled, quantitative).
computes(c13_ratio, 9.6e7 / 1.0e6, approx(100)).
computes(c13hs_ratio, 9.6e7 / 1.0e6, approx(100)).
depends_on(c13_ratio, c13_retina).
depends_on(c13_ratio, c13_fibres).
depends_on(c13hs_ratio, c13hs_retina).
depends_on(c13hs_ratio, c13hs_fibres).
common_knowledge(c13_fibres).
common_knowledge(c13hs_fibres).
common_knowledge(c13_ratio).
common_knowledge(c13hs_ratio).

/* ======================================================= chapter 14 */

claim(c14_boas, book, 14, "Franz Boas, in 1911, noted four distinct roots", settled, historical).
claim(c14hs_boas, 'book-hs', 14, "In 1911, an anthropologist noted four root words", settled, historical).
source(c14_boas, 'Boas', 1911).
source(c14hs_boas, 'Boas', 1911).
says(c14_boas, boas_snow_roots, count, 4).
says(c14hs_boas, boas_snow_roots, count, 4).
claim(c14_whorf, book, 14, "Benjamin Lee Whorf, in a 1940 article, repeated the observation with seven, three of which he did not source.", settled, historical).
claim(c14hs_whorf, 'book-hs', 14, "A later writer repeated it with seven, three of which he didn't source.", settled, historical).
source(c14_whorf, 'Whorf', 1940).
source(c14hs_whorf, 'Whorf', 1940).
computes(c14_whorf, 7 - 3, 4).          % the four he did source are Boas's four
computes(c14hs_whorf, 7 - 3, 4).
depends_on(c14_whorf, c14_boas).
depends_on(c14hs_whorf, c14hs_boas).
event_year(boas_handbook, 1911, 'Boas 1911').
event_year(whorf_article, 1940, 'Whorf 1940').
event_year(martin_traces_history, 1986, 'Martin 1986').
event_year(pullum_essay, 1989, 'Pullum 1989').
order_claim(c14_whorf, boas_handbook, whorf_article).
claim(c14_martin, book, 14, "Laura Martin traced this history in 1986, and Geoffrey Pullum's 1989 essay popularizing her case", settled, historical).
source(c14_martin, 'Martin', 1986).
order_claim(c14_martin, martin_traces_history, pullum_essay).

claim(c14_seaice, book, 14, "Surveys across roughly ten Inuit and Yupik dialects have recorded on the order of seventy terms for ice conditions in one Alaskan dialect, around forty snow descriptors in Central Siberian Yupik, and some fifty in a Canadian Inuit dialect.", settled, quantitative).
claim(c14hs_seaice, 'book-hs', 14, "Surveys across about ten Inuit and Yupik dialects recorded something like seventy terms for ice conditions in one Alaskan dialect, around forty snow terms in another language, about fifty in a third.", settled, quantitative).
source(c14_seaice, 'Krupnik', 2010).
source(c14hs_seaice, 'Krupnik', 2010).
says(c14_seaice, alaskan_ice_terms, count, approx(70)).
says(c14hs_seaice, alaskan_ice_terms, count, approx(70)).
says(c14_seaice, siberian_yupik_snow_terms, count, approx(40)).
says(c14hs_seaice, siberian_yupik_snow_terms, count, approx(40)).
says(c14_seaice, canadian_inuit_snow_terms, count, approx(50)).
says(c14hs_seaice, canadian_inuit_snow_terms, count, approx(50)).
says(c14_seaice, dialects_surveyed, count, approx(10)).
says(c14hs_seaice, dialects_surveyed, count, approx(10)).

claim(c14_russian, book, 14, "In a 2007 study, Russian speakers were faster at telling two blues apart", settled, empirical).          % a report of what the study found
claim(c14hs_russian, 'book-hs', 14, "In a 2007 experiment, Russian speakers were faster at telling two blues apart", settled, empirical).
source(c14_russian, 'Winawer', 2007).
source(c14hs_russian, 'Winawer', 2007).
claim(c14_replication, book, 14, "And a 2020 study attempting to replicate it did not find the effect.", settled, empirical).
claim(c14hs_replication, 'book-hs', 14, "And then a 2020 attempt to repeat that study didn't find the effect", settled, empirical).
source(c14_replication, 'Martinovic', 2020).
source(c14hs_replication, 'Martinovic', 2020).
event_year(russian_blues_study, 2007, 'Winawer et al. 2007').
event_year(russian_blues_replication, 2020, 'Martinovic et al. 2020').
order_claim(c14_replication, russian_blues_study, russian_blues_replication).

% Corrected on 2026-11-03: Pirahã has three quantity words (hói, hoí, baágiso; Everett 2005,
% Frank 2008), and two of them were glossed as numerals. The glosses were Everett's own
% (Everett 2008), so "the same researcher" holds. Sources are in fix_culture.pl.
claim(c14_number, book, 14, "two of whose quantity words were initially glossed as one and two", settled, empirical).
claim(c14hs_number, 'book-hs', 14, "two of whose quantity words were first translated as \"one\" and \"two,\"", settled, empirical).
source(c14_number, 'Frank', 2008).
says(c14_number, piraha_words_glossed_as_numerals, count, 2).
says(c14hs_number, piraha_words_glossed_as_numerals, count, 2).

% What the results mean. Until 2026-11-03 the HS edition covered these with one box
% reading "Everything in this section", against its own rule that a box covers only
% what is inside it. The interpretations now have their own boxes; the reports stand unboxed.
claim(c14hs_colour_meaning, 'book-hs', 14, "The original reading was that the language was being used live, during the task, rather than having permanently rewired anyone's eyes.", contested, interpretive).
says(c14hs_colour_meaning, russian_blues_interpretation, reading, live_recruitment).
depends_on(c14hs_colour_meaning, c14hs_russian).
claim(c14_colour_meaning, book, 14, "which the authors read as the language being recruited during the discrimination itself rather than having permanently restructured perception", contested, interpretive).   % was "which indicates", stated as settled; aligned with the HS box 2026-11-03
says(c14_colour_meaning, russian_blues_interpretation, reading, live_recruitment).
depends_on(c14_colour_meaning, c14_russian).
claim(c14hs_number_meaning, 'book-hs', 14, "The difficulty doesn't seem to be seeing or matching exact quantity.", contested, interpretive).
depends_on(c14hs_number_meaning, c14hs_number).
claim(c14hs_narrow_version, 'book-hs', 14, "The narrow version: words you use constantly get recruited while you do mental work", contested, interpretive).
depends_on(c14hs_narrow_version, c14hs_colour_meaning).
depends_on(c14hs_narrow_version, c14hs_replication).

claim(c14_wcs, book, 14, "Across the 110 languages of the World Color Survey, warm colours are communicated more precisely than cool ones", settled, empirical).
source(c14_wcs, 'Gibson', 2017).
claim(c14_hanunoo, book, 14, "Among the Hanunóo of the Philippines, the term that covers green also means fresh", settled, empirical).
source(c14_hanunoo, 'Conklin', 1955).
claim(c14hs_landscape, 'book-hs', 14, "A landscape fills a language with words for the differences that can hurt you or feed you", settled, generalization).
depends_on(c14hs_landscape, c14hs_seaice).

/* ======================================================= chapter 15 */

claim(c15_nixta_equipment, book, 15, "dating to roughly 1500–1200 BCE, which would put it well over three thousand years ago", settled, historical).
computes(c15_nixta_equipment, 1200 + 2026, more_than(3000)).
% Corrected on 2026-11-03 (Santini et al. 2022): the identification is microscopic, comes from
% a single site, and dates to the Late and Terminal Classic, around the eighth and ninth
% centuries CE.
claim(c15_nixta_direct, book, 15, "first reported from the Maya site of San Bartolo and dating to the Late and Terminal Classic, around the eighth and ninth centuries CE", settled, historical).
source(c15_nixta_direct, 'Santini', 2022).

claim(c15_pellagra, book, 15, "between 1906 and 1940 it affected more than three million people and killed over a hundred thousand", settled, quantitative).
claim(c15hs_pellagra, 'book-hs', 15, "between 1906 and 1940 it affected more than three million people and killed over a hundred thousand", settled, quantitative).
source(c15_pellagra, 'Bollet', 1992).
source(c15hs_pellagra, 'Bollet', 1992).
says(c15_pellagra, us_pellagra_cases_1906_1940, count, more_than(3.0e6)).
says(c15hs_pellagra, us_pellagra_cases_1906_1940, count, more_than(3.0e6)).
says(c15_pellagra, us_pellagra_deaths_1906_1940, count, more_than(1.0e5)).
says(c15hs_pellagra, us_pellagra_deaths_1906_1940, count, more_than(1.0e5)).
claim(c15_vitamin, book, 15, "and the specific vitamin was identified in 1937", settled, historical).
claim(c15hs_vitamin, 'book-hs', 15, "The specific vitamin wasn't identified until 1937.", settled, historical).
source(c15_vitamin, 'Elvehjem', 1937).
source(c15hs_vitamin, 'Elvehjem', 1937).
says(c15_vitamin, niacin_identified, year, 1937).
says(c15hs_vitamin, niacin_identified, year, 1937).
event_year(goldberger_trial, 1915, 'Goldberger et al. 1915').
event_year(niacin_identified, 1937, 'Elvehjem et al. 1937').
order_claim(c15_vitamin, goldberger_trial, niacin_identified).

/* ======================================================= chapter 17 */

claim(c17_gould, book, 17, "Gould's image, from Full House (1996), is a random walk beside a wall", settled, interpretive).
source(c17_gould, 'Gould', 1996).

/* ============================================================ exemptions */

certainty_ok("never revisiting what it has already laid down", 'describes edge growth by definition, not a claim of certainty').
certainty_ok("never reaches a resting state", 'the author''s own reading, marked as such, of what recursion means').
certainty_ok("became impossible to change", 'states the content of the frozen-accident hypothesis inside the box that marks it as argued about').
