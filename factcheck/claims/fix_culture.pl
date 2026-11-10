:- discontiguous claim/6, says/4, source/3, depends_on/2, computes/3, event_year/3,
                 order_claim/3, interval_claim/4, variant_ok/3, gap/3, rests_on_gap/2,
                 arc_gap/3, arc_descriptive/3, cite_ok/3, about/2, drift_ok/3,
                 prose_ok/2, common_knowledge/1, certainty_ok/2.

/*  Support for the [unsourced] and [unchecked_source] warnings on chapters 13-15 of both
    editions: cognition (13), language (14) and culture (15). Schema: the header of
    factcheck/claims.pl. The claims are defined in claims.pl and the other files under
    claims/; this file only adds support to them, which works because checks.pl declares
    the predicates multifile. (SWI-Prolog nests block comments, so a glob written with a
    slash and an asterisk inside one of these comments swallows the rest of the file.)

    Checked 2026-11-03, each against the work itself (abstract, full text, or the text of
    the original printing) unless a comment says otherwise.

    An [unchecked_source] warning clears only when the † comes off the reference in
    book/19, or when the source fact is replaced. Seven references cited below are not in
    book/19 yet: Salvi 2016, Danek 2017, Laukkonen 2020, Everett 2008, Jackson 1997,
    Green 2010 and Cagnato 2024. Until they are added, each raises "source not in refs".

    Three of the sentences supported here are wrong or overstated as the text now stands.
    The sources below support the corrected wording, and the corrections must go in with
    them: c_c13_no_signal (and the sentence after it), c14_number/c14hs_number ("two
    quantity words"), and c15_nixta_direct ("chemical"; the century).
*/

/* ======================================================= chapter 13 */

% c_c13_no_signal: "The capacity has no internal signal distinguishing the two cases." The
% experimental work on the feeling of insight finds a signal that is real but unreliable,
% so it supports "no reliable internal signal". It contradicts the next sentence, that the
% feeling of sudden fit is "if anything stronger for the false ones". All three abstracts
% were read in Europe PMC or PubMed.
% Salvi et al. 2016 (PMC5035115), four experiments: "participants' self-judged insight
% solutions were, on average, more accurate than their analytic ones".
source(c_c13_no_signal, 'Salvi', 2016).
% Danek & Wiley 2017 (PMC5247466), 70 people solving magic tricks: "false insights exist",
% but correct solutions led to "stronger Aha! experiences". "Strong Aha! experiences are
% clearly, but not exclusively linked to correct solutions."
source(c_c13_no_signal, 'Danek', 2017).
% Laukkonen et al. 2020, preregistered, n = 300: statements shown with a solved anagram got
% "higher truth ratings ... even if the facts were false", most of all after an Aha.
% Feelings of insight "can be overgeneralized and bias how true an idea or fact appears".
source(c_c13_no_signal, 'Laukkonen', 2020).

/* ======================================================= chapter 14 */

% c14_hanunoo (claims.pl) already rests on Conklin 1955. Read in the OCR text of the
% original issue, Southwestern Journal of Anthropology 11(4), on the Internet Archive
% (item sim_journal-of-anthropological-research_winter-1955_11_4). p. 342: "there is an
% opposition between dryness or desiccation and wetness or freshness (succulence) in
% visible components of the natural environment which are reflected in the terms raraʔ
% and latuy respectively"; "A shiny, wet, brown-colored section of newly-cut bamboo is
% malatuy (not mararaʔ)." The same page gives malatuy as "light green, and mixtures of
% green, yellow, and light brown". The sentence is supported; the † can come off.

% c14hs_number, and its full-edition twin c14_number (which already rests on Frank 2008).
% Everett 2008, read by full-text search of the 2008 Pantheon edition on the Internet
% Archive (item dontsleeptherear00ever; page not visible): "At first I thought that the
% Pirahãs had the numbers one, two, and 'many'", and later "what I and previous workers
% thought were numbers were only relative quantities". So the glosses were first his, and
% "the same researcher" holds.
source(c14hs_number, 'Everett', 2008).
source(c14_number, 'Everett', 2008).
% Frank et al. 2008, pp. 819-820 (PDF from the first author's site): Gordon 2004 glossed the
% words "one" (hói), "two" (hoí) and "many" (baagiso); in the elicitation every answer was
% "one of the three words hói, hoí, and baágiso", and in the decreasing order "hói was used
% to refer to quantities as large as six".
source(c14hs_number, 'Frank', 2008).
% Everett 2005, read in the author's manuscript posted on his site (section "No
% numerals", examples 9-11, and Appendix Three): "There are three words in Pirahã that are
% easy to confuse with numerals": hói 'small size or amount', hoí 'somewhat larger size or
% amount', baágiso 'cause to come together (loosely "many")'. That supports the
% reanalysis. Together with Frank, it
% shows the language has three such words, not two, in both editions.
source(c14hs_number, 'Everett', 2005).
source(c14_number, 'Everett', 2005).

% d_c14hs_desert_terms, and its full-edition twin d_c14_desert_terms, which until now rested
% only on c14_seaice and so had nothing behind the desert terms. Jackson 1997, the AGI
% Glossary of Geology (4th ed.), read by full-text search on the Internet Archive (item
% glossaryofgeolog0000unse_k9a5; the 1973, 1980 and 1987 editions agree). It has entries
% for erg ("a sand sea"), hammada/hamada, sabkha and wadi, which shows that geologists use
% the words. It gives sabkha "Etymol: Arabic. Also spelled: sabkhah; sebkha", wadi "Etymol:
% Arabic. Variant plurals: wadis ...", and hammada "Etymol: Arabic, hammadah" (1987
% edition). For erg it says "Etymol: Hamitic. Pl: areg; ergs", though its own entry for
% areg reads "Arabic plural of erg". The American Heritage Dictionary (ahdictionary.com)
% gives erg as "[Colloquial Arabic (Maghrebi dialect) ʿarq, ʿarg, from Arabic ʿirq ...]",
% so "All four are Arabic" stands on the usual etymology.
source(d_c14hs_desert_terms, 'Jackson', 1997).
source(d_c14_desert_terms, 'Jackson', 1997).

/* ======================================================= chapter 15 */

% c15_nixta_equipment, d_c15_two_kinds, d_c15_thousands now rest on Staller & Carrasco 2010
% (†), a whole edited volume. The support is in one chapter of it, Green 2010, pp. 315-343,
% note 3, which Springer's chapter page shows: "The culinary equipment for the
% nixtamalization process was found archaeologically, suggesting its use in south coastal
% Guatemala between 1500 bc and 1200 bc." The note cites nothing for that sentence. The
% same note repeats the bound-niacin account that chapter 15 says is wrong. The wording
% follows Coe 1994 (America's First Cuisines, which Green cites for neighbouring points):
% "typical household equipment for making nixtamal out of maize is known on the south
% coast of Guatemala at dates between 1500 and 1200 b.c." Neither names the equipment or
% the excavation, which fits the text's "suggestive". Cite the chapter, not the volume,
% and delete the three source(_, 'Staller', 2010) facts in claims.pl and d_ch14-20.pl.
source(c15_nixta_equipment, 'Green', 2010).
source(d_c15_two_kinds, 'Green', 2010).
source(d_c15_thousands, 'Green', 2010).
% "More than a thousand years" rests on the direct evidence, as the comment on the claim in
% d_ch14-20.pl says; c15_nixta_direct carries Santini 2022.
depends_on(d_c15_thousands, c15_nixta_direct).
% c15_nixta_direct (claims.pl) rests on Santini et al. 2022. Its abstract (SSRN preprint
% via Crossref; the published abstract via AGRIS is identical) describes microbotanical
% remains, "maize starch spherulites, a unique byproduct of nixtamalization", from two
% chultuns "in a Late and Terminal Classic period residential group at the site of San
% Bartolo". So the identification is microscopic, not chemical. The lead author dated the
% deposits as "probably the eighth or ninth century CE" (Boston University release,
% Futurity). At merge (2026-11-03) the text was made to say what this first report shows:
% one Maya site, San Bartolo, Late and Terminal Classic, around the eighth and ninth centuries
% CE. Cagnato et al. 2024 (La Corona) was not added. No abstract could be reached, and
% support resting on a title alone falls short of the reference list's rule.

% c15_pellagra and c15hs_pellagra (claims.pl) already rest on Bollet 1992. Read in the
% full text, PMC2589605. p. 211: "The epidemic of pellagra, which caused over 3 million
% cases and 100,000 deaths in the U.S."; p. 213: "the epidemic of pellagra, which lasted
% from about 1906 to 1940, resulted in roughly 3 million cases, with 100,000 deaths in
% the reporting states". p. 212: the reporting area left out Alabama, Arkansas, Texas
% and West Virginia, "and the true extent of the epidemic always was greatly
% underestimated". The years and the cases are as the text gives them. "Over a hundred
% thousand" deaths is Bollet's 100,000 for the reporting states, which he says is an
% undercount. Supported; the † can come off.
