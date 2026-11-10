:- discontiguous claim/6, says/4, source/3, depends_on/2, computes/3, event_year/3,
                 order_claim/3, interval_claim/4, variant_ok/3, gap/3, rests_on_gap/2,
                 arc_gap/3, arc_descriptive/3, cite_ok/3, about/2, drift_ok/3,
                 prose_ok/2, common_knowledge/1, certainty_ok/2.

% Support for the warnings on cells, Margulis, the major-transitions critics, skin, the double
% jaw joint and nucleosomes: book chs. 6, 7, 9 and 10 and their HS twins. Only source/3 is added.
% No tier, kind or quote is changed, and every fact attaches to a claim defined in another file.
%
% Checked 2026-11-03. Every new work's metadata was checked against Crossref. Content was read
% where each comment says, and quotations are verbatim from those texts.
% Already in book/19 without a dagger: Sagan 1967, Luger 1997.
% NEW, not yet in book/19, so each raises "not in the reference list" until it is added:
% Anthwal 2013, Eme 2011, Harper 2006, McFall-Ngai 2013, McShea 2011, Schwartz 2019, Sender 2016.
%
% Not cleared here, deliberately:
% - The dagger warnings (O'Malley 2016, Margulis 1995, Luo 2011) clear only when the dagger is
%   removed in book/19. The evidence for each decision is in the comments below.
% - Margulis 1995 does not support "since 1964" (b_c06_sagan, c6_margulis). Her account says
%   "In 1966, I wrote a paper", and the JTB paper is marked "(Received 8 June 1966)". No source
%   for 1964 was found anywhere, so a text correction is proposed instead of a source.
% - Two chapter 6 sentences are sourced here for the reading the evidence supports, and need a
%   text correction to match it. The billion-year gap holds for animals, not for multicellularity
%   in general. And most of HS's thirty trillion cells have no nucleus, so "Every one of them"
%   cannot carry division machinery.
%
% Line comments only in this file: SWI-Prolog nests block comments.

% ================================================================= chapter 6

% The machinery's age. Eme et al. 2011, abstract (Europe PMC, PMID 21943402): "Taken together
% our analyses indicated that LECA had a complex and highly controlled modern-like cell cycle."
source(b_c06_billion_years, 'Eme', 2011).
% The gap. McFall-Ngai et al. 2013, full text (PMC3587249), "Bacteria and the Origin of Animals":
% "Animals diverged from their protistan ancestors 700–800 Mya, some 3 billion years after
% bacterial life originated and as much as 1 billion years after the first appearance of
% eukaryotic cells". Cross-check: LECA at 1866–1679 Ma (Parfrey et al. 2011, abstract) to the
% Cryogenian, 850–635 Ma (Erwin et al. 2011, abstract), is 829–1231 Myr. About a billion years,
% but for ANIMALS. Aktipis 2015 (book/19) has red algae reaching complex multicellularity
% "around 1.2 billion years ago", only a few hundred million years after LECA.
source(b_c06_billion_years, 'McFall-Ngai', 2013).
% HS twin of the above: same work, same caveat.
source(b_c06hs_billion_years, 'Eme', 2011).
% HS twin of the above: same work, same caveat.
source(b_c06hs_billion_years, 'McFall-Ngai', 2013).

% Sender, Fuchs & Milo 2016, full text (PMC4991899): "revise past estimates to 3.0·10^13 human
% cells" for the 70 kg reference man. It also finds "almost 90% of the cells are estimated to be
% enucleated cells (26·10^12 cells), mostly red blood cells and platelets", which is the reason
% for the correction to the HS sentence that follows this one.
source(b_c06hs_cells, 'Sender', 2016).

% McShea & Simpson 2011, the critique itself, read in full (PDF on co-author C. Simpson's site,
% pp. 19–34): "In sum, we cannot find any theoretical unity in the Maynard Smith and Szathmáry
% list of major transitions"; "a series of miscellaneous transitions with no obvious unity beyond
% their salience for us". O'Malley & Powell 2016 (dagger) stays attached in b_ch06-09.pl. Its
% abstract (Springer) says MTE "has been criticized for inconsistently combining different types
% of event", and its reference list includes McShea & Simpson 2011.
source(b_c06_critics, 'McShea', 2011).

% For "in 1967": Sagan 1967 itself, read in a PDF reproduction of the paper: "J. Theoret. Biol.
% (1967) 14, 225-274", byline "LYNN SAGAN", "(Received 8 June 1966)". "Around fifteen" comes from
% Margulis 1995 (edge.org reproduction of The Third Culture, ch. 7): "The paper was rejected by
% about fifteen scientific journals ... Finally, James F. Danielli, the editor of The Journal of
% Theoretical Biology, accepted it". Nothing in this HS sentence depends on the 1964 date.
source(b_c06hs_rejected, 'Sagan', 1967).

% ================================================================= chapter 7

% "That environment" is a world whose surfaces bacteria had occupied for billions of years.
% McFall-Ngai et al. 2013 (PMC3587249): animals appeared "some 3 billion years after bacterial
% life originated"; animal development "both originated and evolved in a microbe-rich
% environment"; "Since the dawn of metazoan evolution, the ecology of animals has depended on
% bacterial communities." All skin is younger than the first animals, so it evolved into an
% occupied world and was not colonized after the fact.
source(b_c07_into_occupied, 'McFall-Ngai', 2013).

% ================================================================= chapter 9

% Anthwal, Joshi & Tucker 2013, full text (PMC3552421): "the first step in the process of
% formation of a mammalian-like ear and jaw was the development of a double jaw joint, that is,
% two side by side joints, one between the articular and the quadrate and the other between the
% dentary and the squamosal"; "A clear double jaw joint is evident in the prototypical basal
% mammaliform Morganucodon". A verified alternative to Luo 2011 (dagger), whose text could not
% be reached: Annual Reviews blocked access, and its abstract does not mention the double joint.
source(b_c09_two_joints, 'Anthwal', 2013).
% HS twin ("the old one, and a new one right next to it made from different bones"): same work.
source(b_c09hs_two_joints, 'Anthwal', 2013).

% ================================================================= chapter 10

% Schwartz et al. 2019, full text (PMC6379673), introduction: "the human genome is covered by
% ∼30 million nucleosome cores, which are separated by DNA linkers whose length is cell-type
% specific and ranges between 20 and 75 bp". Arithmetic: the diploid genome is 6.27 Gbp (male)
% or 6.37 Gbp (female) (Piovesan et al. 2019, abstract). Divided by a 147 bp core plus a 20–75 bp
% linker, that is 28–38 million, and 31–34 million at a typical 185–200 bp repeat.
source(c10hs_nucleosomes, 'Schwartz', 2019).
% The full edition's twin. Its only source, Luger 1997, gives 146 bp in its abstract but no
% per-cell count, so its "about thirty million" was unsupported too.
source(c10_nucleosomes, 'Schwartz', 2019).
% "46 very long strands": Harper 2006, abstract (Europe PMC, PMID 16463025): "The correct
% determination of the human diploid chromosome number as 46, by J-H Tjio and A Levan".
source(c_c10hs_46_strands, 'Harper', 2006).
% "about thirty million in each cell": Schwartz et al. 2019, as above.
source(c_c10hs_46_strands, 'Schwartz', 2019).
% "wound around tiny protein spools": Luger 1997, abstract: "how the histone protein octamer is
% assembled and how 146 base pairs of DNA are organized into a superhelix around it".
source(c_c10hs_46_strands, 'Luger', 1997).
