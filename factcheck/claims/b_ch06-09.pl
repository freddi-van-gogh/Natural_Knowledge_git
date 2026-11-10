:- discontiguous claim/6, says/4, source/3, depends_on/2, computes/3, event_year/3,
                 order_claim/3, interval_claim/4, variant_ok/3, gap/3, rests_on_gap/2,
                 arc_gap/3, arc_descriptive/3, cite_ok/3, about/2, drift_ok/3,
                 prose_ok/3, common_knowledge/1, certainty_ok/2.

/*  Structured claims for chapters 6-9 of both editions (book/ and book-hs/).
    Schema and conventions: the header of ../claims.pl. Tiers are as the text
    presents them; comments say where that presentation looks wrong. Quotes
    under 40 characters are whole sentences that are themselves that short.
*/

/* ======================================================== chapter 6 */

claim(b_c06_transitions_proposed, book, 6, "John Maynard Smith and Eörs Szathmáry proposed in 1995 that the history of life is punctuated by a small number of major transitions", settled, historical).   % that they proposed it is settled; the list is disputed (b_c06_critics)
source(b_c06_transitions_proposed, 'Maynard Smith', 1995).

claim(b_c06_eight_entries, book, 6, "Their list has eight entries.", settled, quantitative).
source(b_c06_eight_entries, 'Maynard Smith', 1995).
says(b_c06_eight_entries, major_transitions_list, entries, 8).
% the next sentence names them: compartments; chromosomes; DNA/protein division of labour; eukaryotes;
% sexual populations; multicellularity; colonies of non-reproducers; societies organized by language
computes(b_c06_eight_entries, 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1, 8).

claim(b_c06_critics, book, 6, "Critics have argued that the eight entries lack theoretical unity — that they were assembled because each is a large change rather than because they share a mechanism.", contested, interpretive).
source(b_c06_critics, 'O’Malley', 2016).

claim(b_c06_signature_survives, book, 6, "The signature is the part that survives the dispute, and it is the useful part.", settled, interpretive).
claim(b_c06hs_signature_agreed, 'book-hs', 6, "The signature is the part that survives the argument.", settled, interpretive).   % moved out of the HS "Still argued about" box on 2026-11-03, and worded as the full edition words it
says(b_c06_signature_survives, major_transitions_signature, survives_list_dispute, true).
says(b_c06hs_signature_agreed, major_transitions_signature, survives_list_dispute, true).

% 2026-11-04: the sentence now names what independence is exchanged for, "a dependency on
% cooperation". The claim is unchanged: what is given up is the capacity to continue alone.
claim(b_c06_given_up, book, 6, "Something is given up every time, and it is always the same thing: the capacity to continue alone, exchanged for a dependency on cooperation.", settled, generalization).
depends_on(b_c06_given_up, b_c06_signature_survives).

% The Margulis rejection history. Corrected on 2026-11-03: "since 1964" had no source. Margulis
% 1995 says she wrote the paper in 1966, and Sagan 1967 is marked "Received 8 June 1966". The full
% edition now says she "recalled" about fifteen rejections; it was published in 1967 (c6_margulis).
claim(b_c06_sagan, book, 6, "Lynn Margulis — publishing in 1967 under the name Lynn Sagan — recalled that the paper that set out the modern case was turned down by around fifteen journals", settled, historical).
source(b_c06_sagan, 'Sagan', 1967).
source(b_c06_sagan, 'Margulis', 1995).
says(b_c06_sagan, endosymbiosis_modern_case_paper, published, 1967).
% Until 2026-11-03 the HS text read "When this was proposed properly in 1967, it was rejected by
% around fifteen journals before one took it", which put the rejections after publication. It
% now has them before "one published it, in 1967".
claim(b_c06hs_rejected, 'book-hs', 6, "The paper that made the case properly was rejected by around fifteen journals before one published it, in 1967.", settled, historical).
source(b_c06hs_rejected, 'Margulis', 1995).
says(b_c06hs_rejected, endosymbiosis_paper_rejections, count, approx(15)).
says(b_c06hs_rejected, endosymbiosis_modern_case_paper, published, 1967).

claim(b_c06hs_two_reasons, 'book-hs', 6, "That's worth remembering for two reasons, and people usually only take the first.", settled, interpretive).
says(b_c06hs_two_reasons, margulis_episode_lessons, count, 2).
claim(b_c06hs_vindicated, 'book-hs', 6, "Also: a theory being rejected fifteen times and later vindicated is a real pattern, and it tells you nothing about any particular rejected theory.", settled, generalization).
claim(b_c06_declined_correctly, book, 6, "Most ideas that fifteen journals decline are declined correctly.", settled, generalization).
claim(b_c06hs_declined_correctly, 'book-hs', 6, "Most ideas that fifteen journals turn down were turned down correctly.", settled, generalization).
says(b_c06_declined_correctly, ideas_declined_by_many_journals, mostly_declined_correctly, true).
says(b_c06hs_declined_correctly, ideas_declined_by_many_journals, mostly_declined_correctly, true).

claim(b_c06hs_fission, 'book-hs', 6, "They don't get built from scratch — they split in two, like bacteria.", settled, empirical).
common_knowledge(b_c06hs_fission).

claim(b_c06_mito_ancestor, book, 6, "The ancestral bacterium would have carried something on the order of a few thousand genes.", settled, quantitative).
claim(b_c06hs_mito_ancestor, 'book-hs', 6, "The original bacterium would have carried a few thousand genes.", settled, quantitative).
source(b_c06_mito_ancestor, 'Timmis', 2004).
source(b_c06hs_mito_ancestor, 'Timmis', 2004).
says(b_c06_mito_ancestor, mitochondrial_ancestor_genes, count, range(2000, 9000)).
says(b_c06hs_mito_ancestor, mitochondrial_ancestor_genes, count, range(2000, 9000)).

claim(b_c06hs_thirty_seven, 'book-hs', 6, "Your mitochondria have thirty-seven.", settled, quantitative).
source(b_c06hs_thirty_seven, 'Anderson', 1981).
says(b_c06hs_thirty_seven, human_mitochondrial_genes, count, 37).

claim(b_c06_genes_migrated, book, 6, "The rest were not discarded — the great majority migrated to the host cell's nucleus, where they remain", settled, empirical).
source(b_c06_genes_migrated, 'Timmis', 2004).

claim(b_c06_integration, book, 6, "Integration at this level is not cooperation between two parties; it is the construction of a single system that can no longer be separated into the things it was made from.", settled, interpretive).
claim(b_c06hs_not_two_partners, 'book-hs', 6, "That's not two partners cooperating.", settled, interpretive).
says(b_c06_integration, mitochondrial_integration, kind, single_inseparable_system).
says(b_c06hs_not_two_partners, mitochondrial_integration, kind, single_inseparable_system).
depends_on(b_c06_integration, b_c06_mito_ancestor).
depends_on(b_c06_integration, c6_mito).
depends_on(b_c06_integration, b_c06_genes_migrated).
depends_on(b_c06hs_not_two_partners, b_c06hs_mito_ancestor).
depends_on(b_c06hs_not_two_partners, b_c06hs_thirty_seven).

claim(b_c06_combination, book, 6, "They can arise by combination — two evolutionary histories merging into one.", settled, generalization).
depends_on(b_c06_combination, b_c06_integration).

% Corrected on 2026-11-03. The head start is over animal multicellularity, since red algae are
% older (Aktipis 2015). The HS edition now excludes cells with no nucleus, which by count are most
% of them (Sender 2016).
claim(b_c06_billion_years, book, 6, "They carry machinery for division that predates animal multicellularity by a billion years.", settled, quantitative).
claim(b_c06hs_billion_years, 'book-hs', 6, "Every one of them that has a nucleus still carries the machinery to divide — machinery that's a billion years older than animals.", settled, quantitative).
says(b_c06_billion_years, division_machinery_head_start_on_multicellularity, years, approx(1.0e9)).
says(b_c06hs_billion_years, division_machinery_head_start_on_multicellularity, years, approx(1.0e9)).

claim(b_c06hs_cells, 'book-hs', 6, "Your body is a deal between about thirty trillion cells.", settled, quantitative).   % no entry in book/19 gives a cell count; the extractor has no "trillion" scale and records 30
says(b_c06hs_cells, human_body_cells, count, approx(3.0e13)).

claim(b_c06_cancer, book, 6, "Cancer is what the arrangement looks like when the checks fail.", settled, interpretive).
source(b_c06_cancer, 'Aktipis', 2015).
claim(b_c06_suppression, book, 6, "The general shape is this: a higher level of organization persists only while it suppresses competition at the level below it, and the suppression is never complete.", settled, generalization).
depends_on(b_c06_suppression, b_c06_cancer).

/* ======================================================== chapter 7 */

claim(b_c07_skin_sites, book, 7, "Two sites on the same person can differ more from each other than the same site differs between two people.", settled, empirical).
claim(b_c07hs_skin_sites, 'book-hs', 7, "Two spots on your own body can differ from each other more than the same spot differs between you and a stranger.", settled, empirical).
source(b_c07_skin_sites, 'Grice', 2011).
source(b_c07hs_skin_sites, 'Grice', 2011).
says(b_c07_skin_sites, skin_microbiome_site_variation, within_person_can_exceed_between_people, true).
says(b_c07hs_skin_sites, skin_microbiome_site_variation, within_person_can_exceed_between_people, true).

claim(b_c07_into_occupied, book, 7, "Skin as it now exists — layered, cornified, chemically selective — evolved into that environment.", settled, historical).
claim(b_c07_two_follow, book, 7, "Two things follow that are worth stating plainly.", settled, interpretive).   % the skin sets conditions rather than assembling its microbiome; the barrier is a process
says(b_c07_two_follow, skin_barrier_consequences, count, 2).
depends_on(b_c07_two_follow, b_c07_into_occupied).

claim(b_c07_two_records, book, 7, "So a single molecule carries two records at once: what selection could never permit to change, and what it never had reason to protect.", settled, interpretive).
claim(b_c07hs_two_records, 'book-hs', 7, "So one molecule carries two records at once: what could never be allowed to change, and what there was never any reason to protect.", settled, interpretive).
says(b_c07_two_records, rrna_16s_gene, records_carried, 2).
says(b_c07hs_two_records, rrna_16s_gene, records_carried, 2).

% Was "form a domain of life" (1977); "domain" is the 1990 term. Corrected 2026-11-03.
claim(b_c07_woese, book, 7, "Carl Woese used this gene in 1977 to establish that archaea are a primary branch of life distinct from bacteria", settled, historical).   % Woese & Fox 1977 said "primary kingdom"; the rank "domain" is Woese, Kandler & Wheelis 1990
source(b_c07_woese, 'Woese', 1977).

% Winogradsky columns (added 2026-11-06 at the author's request; both editions). Sources, read in
% the open-access texts: Rundell et al. 2014 (PLoS ONE 9: e104134) for the column, the oxygen and
% sulfide gradients, cellulose breakdown, ferrous sulfide, the green and red-violet zones, and
% their absence in that survey's columns; Esteban et al. 2015 (PLOS ONE 10: e0134588) for
% blackening "within the first week", orange "most likely iron oxides", the light-dependent
% surface biofilm with its cyanobacteria, and rare taxa becoming abundant.
claim(b_c07_winogradsky, book, 7, "A Winogradsky column, named for the microbiologist Sergei Winogradsky, who devised it, is a clear tube filled with sediment enriched with a source of cellulose, such as leaf litter, and a source of sulfate, then left in the light.", settled, empirical).
source(b_c07_winogradsky, 'Rundell', 2014).
source(b_c07_winogradsky, 'Esteban', 2015).
claim(b_c07_oxygen_falls, book, 7, "At the top there is oxygen, and it falls away with depth, so the mud below is anoxic, without oxygen.", settled, empirical).
source(b_c07_oxygen_falls, 'Rundell', 2014).
claim(b_c07_cellulose, book, 7, "Decomposers break the cellulose into simpler carbon compounds that other microbes ferment.", settled, empirical).
source(b_c07_cellulose, 'Rundell', 2014).
claim(b_c07_blackening, book, 7, "Down in the anoxic mud, bacteria respire sulfate in place of oxygen and release hydrogen sulfide, which combines with iron to form ferrous sulfide; the mud turns black, in one study within the first week.", settled, empirical).
source(b_c07_blackening, 'Rundell', 2014).
source(b_c07_blackening, 'Esteban', 2015).
says(b_c07_blackening, winogradsky_blackening, within_weeks, 1).
claim(b_c07_sulfide_up, book, 7, "The sulfide diffuses upwards towards the oxygen, so each depth offers a different mix, and a different niche.", settled, empirical).
source(b_c07_sulfide_up, 'Rundell', 2014).
claim(b_c07_bands, book, 7, "Green sulfur bacteria typically form a green zone in the lower middle of the column, and purple bacteria a red-violet zone above it.", settled, empirical).
source(b_c07_bands, 'Rundell', 2014).
says(b_c07_bands, winogradsky_green_zone, below_red_violet_zone, true).
claim(b_c07_orange, book, 7, "Near the top, patches of orange appear, most likely iron oxides.", settled, empirical).
source(b_c07_orange, 'Esteban', 2015).
claim(b_c07_surface_film, book, 7, "On the inside of the tube, a biofilm grows that is less diverse than the mud behind it, with cyanobacteria among its commonest members; in columns kept in the dark, no visible surface community forms.", settled, empirical).
source(b_c07_surface_film, 'Esteban', 2015).
says(b_c07_surface_film, winogradsky_surface_biofilm, needs_light, true).
claim(b_c07_bands_typical, book, 7, "The textbook bands are typical, not guaranteed: in one survey of columns, distinct green and red-violet zones did not appear.", settled, empirical).
source(b_c07_bands_typical, 'Rundell', 2014).
says(b_c07_bands_typical, winogradsky_bands, always_appear, false).
claim(b_c07_rare_abundant, book, 7, "Organisms that are rare in the starting mud can become abundant once conditions suit them, so the column does not import a community; it selects one from what was already there.", settled, empirical).
source(b_c07_rare_abundant, 'Esteban', 2015).
says(b_c07_rare_abundant, winogradsky_rare_taxa, can_become_abundant, true).
% The author's "mini holobiont, in a way, if logical to say so": logical only as a labelled
% analogy, since the chapter's own definition requires a host.
claim(b_c07_not_holobiont, book, 7, "A column is not a holobiont in the sense used above, because there is no host.", author, interpretive).
claim(b_c07_holobiont_analogy, book, 7, "But the whole tube behaves a little like one: a self-contained system whose members live on one another's by-products, with a boundary, a division of labour, and conditions that its own residents keep remaking.", author, interpretive).
depends_on(b_c07_holobiont_analogy, b_c07_not_holobiont).

% HS twins: "A jar of mud" (ch. 7).
claim(b_c07hs_jar, 'book-hs', 7, "Science classes do this: fill a clear jar with pond mud, mix in some dead leaves and a little calcium sulfate, and leave it in the light.", settled, empirical).
source(b_c07hs_jar, 'Esteban', 2015).
common_knowledge(b_c07hs_jar).
claim(b_c07hs_blackening, 'book-hs', 7, "In one study, the bottom turned black within the first week.", settled, empirical).
source(b_c07hs_blackening, 'Esteban', 2015).
says(b_c07hs_blackening, winogradsky_blackening, within_weeks, 1).
claim(b_c07hs_sulfide, 'book-hs', 7, "Down there, where there's no oxygen, bacteria use sulfate the way you use oxygen, and give off hydrogen sulfide, the gas that smells of rotten eggs.", settled, empirical).
source(b_c07hs_sulfide, 'Rundell', 2014).
claim(b_c07hs_iron, 'book-hs', 7, "It reacts with iron in the mud and makes a black mineral.", settled, empirical).
source(b_c07hs_iron, 'Rundell', 2014).
claim(b_c07hs_bands, 'book-hs', 7, "Over the following weeks, bands of colour can appear in between: green, and higher up, reddish purple, made by bacteria that use that gas for photosynthesis.", settled, empirical).
source(b_c07hs_bands, 'Rundell', 2014).
says(b_c07hs_bands, winogradsky_green_zone, below_red_violet_zone, true).
claim(b_c07hs_orange, 'book-hs', 7, "Near the top, patches of rusty orange can show up within days.", settled, empirical).
source(b_c07hs_orange, 'Esteban', 2015).
claim(b_c07hs_film, 'book-hs', 7, "A film you can see grows on the inside of the jar, but only in the light.", settled, empirical).
source(b_c07hs_film, 'Esteban', 2015).
says(b_c07hs_film, winogradsky_surface_biofilm, needs_light, true).
claim(b_c07hs_not_always, 'book-hs', 7, "The bands don't always appear.", settled, empirical).
source(b_c07hs_not_always, 'Rundell', 2014).
says(b_c07hs_not_always, winogradsky_bands, always_appear, false).
claim(b_c07hs_rare, 'book-hs', 7, "In one study, most of the film was made of kinds that had been rare in the mud at the start.", settled, empirical).
source(b_c07hs_rare, 'Esteban', 2015).
says(b_c07hs_rare, winogradsky_rare_taxa, can_become_abundant, true).

/* ======================================================== chapter 8 */

claim(b_c08_one_molecule, book, 8, "A single class of molecule doing both jobs is an attractive way to connect chemical activity with heredity, because it removes the need for two separate inventions.", settled, interpretive).   % the appeal of the RNA world, not its truth; the hypothesis itself is presented as contested

claim(b_c08_codon_length, book, 8, "Three nucleotides make a codon.", settled, quantitative).
claim(b_c08hs_read_three, 'book-hs', 8, "They're read three at a time.", settled, quantitative).
claim(b_c08hs_four_letters, 'book-hs', 8, "DNA is written in four letters.", settled, quantitative).
says(b_c08_codon_length, codon, nucleotides, 3).
says(b_c08hs_read_three, codon, nucleotides, 3).
says(b_c08hs_four_letters, dna_alphabet, letters, 4).
common_knowledge(b_c08_codon_length).
common_knowledge(b_c08hs_read_three).
common_knowledge(b_c08hs_four_letters).

claim(b_c08_meanings, book, 8, "Those 64 specify 20 standard amino acids plus a stop instruction. More codons than meanings means the code is redundant", settled, quantitative).
claim(b_c08hs_amino_acids, 'book-hs', 8, "Those 64 triplets specify 20 amino acids — the building blocks of proteins — plus a \"stop here\" instruction.", settled, quantitative).
says(b_c08_meanings, standard_genetic_code, amino_acids, 20).
says(b_c08hs_amino_acids, standard_genetic_code, amino_acids, 20).
computes(b_c08_meanings, 64 - (20 + 1), more_than(0)).
common_knowledge(b_c08_meanings).
common_knowledge(b_c08hs_amino_acids).

claim(b_c08_third_four, book, 8, "For many amino acids, all four nucleotides in the third position of the codon specify the same amino acid.", settled, empirical).
claim(b_c08hs_third_four, 'book-hs', 8, "For a lot of amino acids, all four options in the third slot mean the same thing.", settled, empirical).
says(b_c08_third_four, fourfold_degenerate_third_position, synonymous_nucleotides, 4).
says(b_c08hs_third_four, fourfold_degenerate_third_position, synonymous_nucleotides, 4).
common_knowledge(b_c08_third_four).
common_knowledge(b_c08hs_third_four).

claim(b_c08_wobble, book, 8, "The flexibility of this position is sometimes described through the wobble in how transfer RNA pairs with the third base, a mechanism proposed by Crick in 1966.", settled, historical).   % that Crick proposed it in 1966 is not in dispute
source(b_c08_wobble, 'Crick', 1966).

claim(b_c08_first_two, book, 8, "The first two positions carry most of the meaning.", settled, empirical).
claim(b_c08hs_first_two, 'book-hs', 8, "The first two letters carry most of the meaning.", settled, empirical).
says(b_c08_first_two, codon_positions_carrying_most_meaning, count, 2).
says(b_c08hs_first_two, codon_positions_carrying_most_meaning, count, 2).
common_knowledge(b_c08_first_two).
common_knowledge(b_c08hs_first_two).

claim(b_c08_compression, book, 8, "That arrangement is what information compression looks like when it is working well: discard what can be discarded without losing the message, and protect what cannot.", settled, interpretive).
depends_on(b_c08_compression, b_c08_third_four).
depends_on(b_c08_compression, b_c08_first_two).

claim(b_c08_freeland, book, 8, "Freeland and Hurst compared it in 1998 against large numbers of randomly generated alternative codes, scoring each by how much damage a copying or reading error would do.", settled, empirical).
claim(b_c08hs_freeland, 'book-hs', 8, "In 1998 two researchers compared the real code against enormous numbers of randomly scrambled alternative codes, scoring each by how much damage a typical error would do.", settled, empirical).
source(b_c08_freeland, 'Freeland', 1998).
source(b_c08hs_freeland, 'Freeland', 1998).
says(b_c08_freeland, freeland_hurst_code_study, year, 1998).
says(b_c08hs_freeland, freeland_hurst_code_study, year, 1998).
says(b_c08_freeland, freeland_hurst_code_study, authors, 2).
says(b_c08hs_freeland, freeland_hurst_code_study, authors, 2).

% "The figure" is the one-in-a-million result (c8_million). Both editions say plainly that it
% depends on the model and has been argued over (the HS caveat was added on 2026-11-03), so it is
% settled as presented. The claim is about the figure's robustness, not about its value.
claim(b_c08_figure_argued, book, 8, "The figure depends on which chemical property is weighted and which model of error is assumed, and it has been argued over since.", settled, interpretive).
says(b_c08_figure_argued, codes_beating_standard_code, figure_robustness, model_dependent).
claim(b_c08hs_figure_argued, 'book-hs', 8, "The exact figure depends on how you score the damage, and it's been argued over ever since.", settled, interpretive).
says(b_c08hs_figure_argued, codes_beating_standard_code, figure_robustness, model_dependent).
claim(b_c08hs_held_up, 'book-hs', 8, "What has held up is the main result: the real code is far better than a typical random code.", settled, empirical).
source(b_c08hs_held_up, 'Freeland', 1998).
depends_on(b_c08hs_held_up, c8hs_million).

% QT45 at the heredity gap, added on 2026-11-03; sources and checks as for a_c04_qt45. The
% accepted manuscript (PMC7618777) says "How this capacity for heredity and evolution first
% emerged is unknown."
claim(b_c08_qt45, book, 8, "The nearest approach so far is the 45-nucleotide RNA described in chapter 4", settled, empirical).
source(b_c08_qt45, 'Gianni', 2026).
says(b_c08_qt45, qt45_ribozyme, length_nt, 45).
claim(b_c08_qt45_unknown, book, 8, "Its discoverers still write that how the capacity for heredity first emerged is unknown.", settled, historical).
source(b_c08_qt45_unknown, 'Gianni', 2026).
claim(b_c08hs_qt45, 'book-hs', 8, "The closest anyone has come is the 45-letter RNA from chapter 4", settled, empirical).
source(b_c08hs_qt45, 'Gianni', 2026).
says(b_c08hs_qt45, qt45_ribozyme, length_nt, 45).
claim(b_c08_codon_usage, book, 8, "One line of criticism is specific and substantial: when the differing frequencies with which organisms actually use particular codons are taken into account, the apparent optimization shrinks considerably.", settled, empirical).
source(b_c08_codon_usage, 'Archetti', 2004).
event_year(b_freeland_hurst_comparison, 1998, 'Freeland & Hurst 1998').
event_year(b_codon_usage_criticism, 2004, 'Archetti 2004').
order_claim(b_c08_codon_usage, b_freeland_hurst_comparison, b_codon_usage_criticism).   % "argued over since"
claim(b_c08_held_up, book, 8, "The general finding — that the standard code sits far out in the tail rather than in the middle — has held up.", settled, empirical).
source(b_c08_held_up, 'Freeland', 1998).
depends_on(b_c08_held_up, c8_million).
depends_on(b_c08_held_up, b_c08_codon_usage).

claim(b_c08_three_readings, book, 8, "Three readings of that fact compete, and the differences matter:", contested, interpretive).
claim(b_c08hs_three_answers, 'book-hs', 8, "Why it's like that is genuinely unsettled, and there are three serious answers.", contested, interpretive).
says(b_c08_three_readings, genetic_code_origin_readings, count, 3).
says(b_c08hs_three_answers, genetic_code_origin_readings, count, 3).

claim(b_c08_frozen, book, 8, "Crick's 1968 proposal: the assignments were largely arbitrary, fixed very early, and became impossible to change afterwards", contested, interpretive).
source(b_c08_frozen, 'Crick', 1968).
claim(b_c08_neutral_interesting, book, 8, "The most interesting of the three for this book's purposes, and the one most easily missed.", settled, interpretive).   % the author's emphasis on the neutral-origin reading, not a verdict on it
claim(b_c08_neutral_models, book, 8, "Models of this kind produce codes nearly as error-tolerant as the real one.", settled, empirical).
source(b_c08_neutral_models, 'Massey', 2008).

claim(b_c08_resemblance, book, 8, "The two arrive at related behaviour by unrelated means — which is a resemblance, not a shared mechanism.", settled, interpretive).

/* ======================================================== chapter 9 */

claim(b_c09_two_kinds, book, 9, "Two kinds of evidence are worth examining closely, because they point in opposite directions and are both informative.", settled, interpretive).
claim(b_c09hs_two_kinds, 'book-hs', 9, "Two kinds of evidence show this, and they point in opposite directions.", settled, interpretive).
says(b_c09_two_kinds, evolution_record_evidence_kinds, count, 2).
says(b_c09hs_two_kinds, evolution_record_evidence_kinds, count, 2).

claim(b_c09_eyes, book, 9, "Light-sensitive structures have arisen independently many times across the animal kingdom — a frequently cited survey put the number somewhere above 40", settled, quantitative).
source(b_c09_eyes, 'Salvini-Plawen', 1977).
says(b_c09_eyes, independent_eye_origins, count, more_than(40)).

claim(b_c09_flight, book, 9, "Powered flight evolved in insects, in pterosaurs, in birds, and in bats — four times, from four different starting anatomies.", settled, quantitative).
claim(b_c09hs_flight, 'book-hs', 9, "Powered flight evolved four separate times: insects, pterosaurs, birds, bats.", settled, quantitative).
claim(b_c09hs_bodies, 'book-hs', 9, "Four different starting bodies.", settled, quantitative).
says(b_c09_flight, powered_flight_origins, count, 4).
says(b_c09hs_flight, powered_flight_origins, count, 4).
says(b_c09_flight, powered_flight_origins, starting_anatomies, 4).
says(b_c09hs_bodies, powered_flight_origins, starting_anatomies, 4).
common_knowledge(b_c09_flight).
common_knowledge(b_c09hs_flight).
common_knowledge(b_c09hs_bodies).

claim(b_c09_physics, book, 9, "The physics of focusing light, of binding oxygen reversibly, and of generating lift are the same everywhere, and they permit only a limited range of workable solutions.", settled, generalization).
depends_on(b_c09_physics, b_c09_eyes).
depends_on(b_c09_physics, b_c09_flight).

claim(b_c09_ear_bones, book, 9, "Two of the three small bones that transmit sound from the eardrum to the inner ear are modified from bones that formed the jaw joint in earlier vertebrates", settled, empirical).
claim(b_c09hs_ear_bones, 'book-hs', 9, "Two of the three tiny bones that carry sound from your eardrum to your inner ear were, in your distant ancestors, part of the jaw joint.", settled, empirical).
source(b_c09_ear_bones, 'Shubin', 2008).
source(b_c09hs_ear_bones, 'Shubin', 2008).
says(b_c09_ear_bones, middle_ear_ossicles, count, 3).
says(b_c09hs_ear_bones, middle_ear_ossicles, count, 3).
says(b_c09_ear_bones, middle_ear_ossicles_from_jaw_joint, count, 2).
says(b_c09hs_ear_bones, middle_ear_ossicles_from_jaw_joint, count, 2).

claim(b_c09_two_joints, book, 9, "Some early mammal relatives had two working jaw joints at once: the older one, between quadrate and articular, and a new one between different bones alongside it.", settled, empirical).
claim(b_c09hs_two_joints, 'book-hs', 9, "Some early mammal relatives had two working jaw joints at the same time — the old one, and a new one right next to it made from different bones.", settled, empirical).
% Luo 2011 (†) was these claims' source, but its text could not be checked, and chapter 9 does
% not cite it by name. Since 2026-11-03 they rest on Anthwal 2013, read in full (fix_cells.pl).
% Luo stays in the reading list, still marked unchecked.
says(b_c09_two_joints, early_mammal_relative_jaw_joints, working_at_once, 2).
says(b_c09hs_two_joints, early_mammal_relative_jaw_joints, working_at_once, 2).

claim(b_c09_modify_only, book, 9, "Taken together these are the signature of a process that can only modify what is already present.", settled, interpretive).
depends_on(b_c09_modify_only, c9_giraffe).
depends_on(b_c09_modify_only, b_c09_ear_bones).
depends_on(b_c09_modify_only, b_c09_two_joints).

claim(b_c09_syncytin_lineages, book, 9, "Syncytins have been identified in primates, in several separate rodent groups, in carnivores, in ruminants, and in marsupials.", settled, empirical).
source(b_c09_syncytin_lineages, 'Lavialle', 2013).
source(b_c09_syncytin_lineages, 'Cornelis', 2015).
claim(b_c09_syncytin_independent, book, 9, "They come from unrelated retroviruses, captured independently at different times in different lineages, and co-opted for the same job each time.", settled, empirical).
source(b_c09_syncytin_independent, 'Lavialle', 2013).
claim(b_c09_borrowed_parts, book, 9, "They acquired it repeatedly, from whatever virus was available, which is convergent evolution running on borrowed parts.", settled, interpretive).
depends_on(b_c09_borrowed_parts, b_c09_syncytin_lineages).
depends_on(b_c09_borrowed_parts, b_c09_syncytin_independent).

claim(b_c09_two_complications, book, 9, "Two complications sit on top of that.", settled, interpretive).   % "ancestor" means a population; the early tree was web-like
says(b_c09_two_complications, luca_complications, count, 2).
