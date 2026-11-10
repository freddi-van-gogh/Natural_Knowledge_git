/*  Natural Knowledge — fact checker.

    Loads the generated facts (what the text says) and claims.pl (what the
    text's propositions are, structured), then looks for:

      error    — two statements that cannot both be true, arithmetic the text
                 gets wrong, events out of order, citations that disagree with
                 the reference list, references to chapters that don't exist
      blocker  — a step in an argument that does not follow: a settled
                 conclusion resting on a contested premise, circular support,
                 a step in the book's arc that no chain supports, an analogy
                 used as a mechanism, a chain that jumps tiers without prose
      warning  — worth a look: numbers that drift between passages, certainty
                 words inside contested or author-marked passages, settled
                 claims with no source, sources whose content is unchecked
      info     — coverage, and gaps the book itself acknowledges

    Run through factcheck/run.py, which regenerates the facts first.
*/

:- discontiguous check/3.
:- dynamic claim/6, says/4, source/3, depends_on/2, computes/3, event_year/3,
           order_claim/3, interval_claim/4, variant_ok/3, gap/3, rests_on_gap/2,
           arc_gap/3, arc_descriptive/3, cite_ok/3, about/2, drift_ok/3,
           prose_ok/3, common_knowledge/1, certainty_ok/2.
% Claims are spread across claims.pl and claims/*.pl. Declaring them multifile is what
% lets a second file add clauses instead of silently replacing the first file's.
:- multifile claim/6, says/4, source/3, depends_on/2, computes/3, event_year/3,
             order_claim/3, interval_claim/4, variant_ok/3, gap/3, rests_on_gap/2,
             arc_gap/3, arc_descriptive/3, cite_ok/3, about/2, drift_ok/3,
             prose_ok/3, common_knowledge/1, certainty_ok/2.
:- dynamic sentence/6, number/3, year/2, keywords/2, certainty_word/2, hedged/1,
           xref/2, cites/3, heading_count/6, section_box/5, chapter/4, concept/5,
           substrate_rank/2, chain/6, chain_cycles/1, arc_step/3, ref/6, anchor/2.

load_all :-
    prolog_load_context(directory, Dir), !,
    forall(member(F, ['generated/text.pl', 'generated/glossary.pl', 'generated/notation.pl',
                      'generated/refs.pl', 'generated/anchors.pl', 'claims.pl']),
           ( atomic_list_concat([Dir, '/', F], Path), consult(Path) )),
    atomic_list_concat([Dir, '/claims/*.pl'], Pattern),
    expand_file_name(Pattern, More),
    forall(member(P, More), consult(P)).
:- load_all.

/* ------------------------------------------------------------- values */

interval(N, N, N)           :- number(N), !.
interval(approx(N), L, H)   :- !, L is N * 0.85, H is N * 1.15.
interval(range(L, H), L, H) :- !.
interval(at_least(N), N, inf)  :- !.
interval(more_than(N), N, inf) :- !.
interval(at_most(N), -inf, N)  :- !.

le(-inf, _) :- !.
le(_, inf)  :- !.
le(inf, _)  :- !, fail.
le(_, -inf) :- !, fail.
le(A, B)    :- A =< B.

within(X, V) :- interval(V, L, H), le(L, X), le(X, H).

compatible(V, V) :- !.
compatible(V1, V2) :-
    interval(V1, L1, H1), interval(V2, L2, H2), !,
    le(L1, H2), le(L2, H1).

tier_rank(settled, 3).
tier_rank(contested, 2).
tier_rank(author, 1).

/* ------------------------------------------------------- dependencies */

reaches(A, B) :- reaches(A, B, [A]).
reaches(A, B, _)    :- depends_on(A, B).
reaches(A, B, Seen) :- depends_on(A, C), \+ memberchk(C, Seen), reaches(C, B, [C|Seen]).

where(Id, W) :- claim(Id, Ed, Ch, _, _, _), !, format(atom(W), '~w ch.~w', [Ed, Ch]).
where(_, '?').

/* ============================================================= ERRORS */

check(error, anchor, M) :-
    anchor(Id, missing), where(Id, W),
    format(atom(M), '~w (~w): its quoted sentence is no longer in the text — the claim has drifted from the book', [Id, W]).

check(error, anchor, M) :-
    claim(Id, _, _, _, _, _), \+ anchor(Id, _),
    format(atom(M), '~w: the extractor could not read this claim (check its syntax in claims.pl)', [Id]).

check(error, duplicate, M) :-
    claim(Id, E1, C1, Q1, _, _), claim(Id, E2, C2, Q2, _, _), (E1-C1-Q1) @< (E2-C2-Q2),
    format(atom(M), 'claim id ~w is used twice (~w ch.~w and ~w ch.~w); every claim needs its own id', [Id, E1, C1, E2, C2]).

check(error, chronology, M) :-
    event_year(E, Y1, B1), event_year(E, Y2, B2), Y1 < Y2,
    format(atom(M), 'event ~w is dated ~w (~w) and ~w (~w)', [E, Y1, B1, Y2, B2]).

check(error, conflict, M) :-
    says(A, S, P, V1), says(B, S, P, V2), A @< B,
    \+ compatible(V1, V2), \+ variant_ok(A, B, _), \+ variant_ok(B, A, _),
    where(A, WA), where(B, WB),
    format(atom(M), '~w: ~w says ~w = ~w, but ~w (~w) says ~w', [S, WA, P, V1, B, WB, V2]).

check(error, arithmetic, M) :-
    computes(Id, Expr, Stated), Got is Expr, \+ within(Got, Stated), where(Id, W),
    format(atom(M), '~w (~w): the text states ~w, but ~w = ~4g', [Id, W, Stated, Expr, Got]).

check(error, chronology, M) :-
    order_claim(Id, E1, E2), event_year(E1, Y1, _), event_year(E2, Y2, _), Y1 >= Y2, where(Id, W),
    format(atom(M), '~w (~w): the text puts ~w (~w) before ~w (~w)', [Id, W, E1, Y1, E2, Y2]).

check(error, chronology, M) :-
    interval_claim(Id, E1, E2, Stated), event_year(E1, Y1, _), event_year(E2, Y2, _),
    Gap is Y2 - Y1, \+ within(Gap, Stated), where(Id, W),
    format(atom(M), '~w (~w): the text implies ~w years between ~w and ~w; the dates give ~w', [Id, W, Stated, E1, E2, Gap]).

check(error, citation, M) :-
    setof(S-Name-Y, cites(S, Name, Y), All), member(S-Name-Y, All),
    once((ref(_, _, _, As, _, _), memberchk(Name, As))),
    \+ (ref(_, _, Y, As2, _, _), memberchk(Name, As2)),
    \+ cite_ok(Name, Y, _),
    sentence(S, Ed, Ch, Line, _, _),
    format(atom(M), '~w ch.~w line ~w: "~w … ~w" — no reference by ~w dated ~w', [Ed, Ch, Line, Name, Y, Name, Y]).

check(error, source, M) :-
    source(Id, Name, Y), \+ ref(_, Name, Y, _, _, _), where(Id, W),
    format(atom(M), '~w (~w): cites ~w ~w, which is not in the reference list', [Id, W, Name, Y]).

check(error, xref, M) :-
    xref(S, N), sentence(S, Ed, Ch, Line, _, _), \+ chapter(Ed, N, _, _),
    format(atom(M), '~w ch.~w line ~w: refers to chapter ~w, which this edition does not have', [Ed, Ch, Line, N]).

check(error, heading, M) :-
    heading_count(Ed, Ch, Line, H, Stated, Found), Found > 0, Stated =\= Found,   % 0 = not itemized; nothing to count
    format(atom(M), '~w ch.~w line ~w: "~w" promises ~w, the section has ~w', [Ed, Ch, Line, H, Stated, Found]).

check(error, cycle, M) :-
    claim(A, _, _, _, _, _), reaches(A, A), where(A, W),
    format(atom(M), '~w (~w) supports itself through its own dependencies', [A, W]).

check(error, concept, M) :-
    about(Id, C), \+ concept(C, _, _, _, _),
    format(atom(M), '~w: refers to companion concept ~w, which does not exist', [Id, C]).

check(error, concept, M) :-
    ( chain(N, _, _, L, R, _), append(L, R, Syms) ; arc_step(N, X, Y), Syms = [X, Y] ),
    member(Sym, Syms), \+ concept(_, _, Sym, _, _),
    format(atom(M), 'notation chain ~w uses symbol ~w, which the glossary does not define', [N, Sym]).

/* =========================================================== BLOCKERS */

check(blocker, tier, M) :-
    claim(A, _, _, _, TA, _), reaches(A, B), claim(B, _, _, _, TB, _),
    tier_rank(TA, RA), tier_rank(TB, RB), RA > RB, where(A, WA), where(B, WB),
    format(atom(M), '~w (~w, ~w) rests on ~w (~w, ~w): the conclusion is stated more firmly than its premise', [A, WA, TA, B, WB, TB]).

check(blocker, gap, M) :-
    claim(A, _, _, _, settled, _),
    ( rests_on_gap(A, G) ; reaches(A, B), rests_on_gap(B, G) ), gap(G, Desc, _), where(A, W),
    format(atom(M), '~w (~w) is stated as settled but rests on an open gap: ~w', [A, W, Desc]).

/* An arc step X → Y is supported when worked "produces" chains lead from X to Y.
   The arc compresses chains, so a path is allowed, capped at four links so that
   generic concepts cannot connect everything to everything. The shortest path is
   reported (info), which keeps the support auditable rather than assumed. */
step(X, Y, N) :- chain(N, _, produces, L, R, _), memberchk(X, L), memberchk(Y, R).

arc_path(X, Y, Max, Path) :- between(1, Max, D), path_of(D, X, Y, [X], Path), !.
path_of(1, X, Y, _, [N]) :- step(X, Y, N).
path_of(D, X, Y, Seen, [N|Rest]) :- D > 1, step(X, Z, N), \+ memberchk(Z, Seen),
    D1 is D - 1, path_of(D1, Z, Y, [Z|Seen], Rest).

arc_supported(X, Y) :- arc_path(X, Y, 4, _).

formula(N, F) :-
    chain(N, _, _, [X], R, _), chain_cycles(N), !, atomic_list_concat(R, ' + ', RS),
    format(atom(F), '~w ↺ ~w → ~w', [X, X, RS]).
formula(N, F) :-
    chain(N, _, _, L, R, _), atomic_list_concat(L, ' + ', LS), atomic_list_concat(R, ' + ', RS),
    format(atom(F), '~w → ~w', [LS, RS]).

check(blocker, arc, M) :-
    arc_step(I, X, Y), \+ arc_supported(X, Y), \+ arc_gap(X, Y, _), \+ arc_descriptive(X, Y, _),
    concept(_, TX, X, _, _), concept(_, TY, Y, _, _),
    format(atom(M), 'step ~w of the whole arc, ~w → ~w (~w → ~w), has no worked chain behind it and is not declared a gap', [I, X, Y, TX, TY]).

check(blocker, analogy, M) :-
    chain(N1, _, analogous, [X], [Y], _),
    ( step(X, Y, _) ; step(Y, X, _) ),          % direct only: a path is not a mechanism claim
    format(atom(M), 'chain ~w marks ~w ≈ ~w as analogy only, but another chain treats one as producing the other', [N1, X, Y]).

/* The notation's rule: "Crossing a tier boundary demands prose. A chain from CH to
   MC has smuggled in an analogy." What changes across a boundary is the substrate —
   chemical, biological, cultural — so tiers are grouped by substrate. PH, CH and PL
   are one physical substrate; a chain that stays inside it is chemistry throughout. */
substrate_group(ph, physical). substrate_group(ch, physical). substrate_group(pl, physical).
substrate_group(bi, biological). substrate_group(mc, cultural).
group_rank(physical, 1). group_rank(biological, 2). group_rank(cultural, 3).
group_of(Sym, G, R) :- concept(_, _, Sym, T, _), substrate_group(T, G), group_rank(G, R).

check(blocker, tier_crossing, M) :-
    chain(N, Sec, produces, L, [Out], _), \+ prose_ok(L, Out, _),
    group_of(Out, GO, RO), member(In, L), group_of(In, GI, RI), abs(RO - RI) >= 2,
    format(atom(M), 'chain ~w (~w): ~w (~w) → ~w (~w) skips a substrate in one arrow — the notation calls this a smuggled analogy', [N, Sec, In, GI, Out, GO]).

check(warning, tier_crossing, M) :-
    chain(N, Sec, produces, L, [Out], _), \+ prose_ok(L, Out, _),
    group_of(Out, GO, RO), member(In, L), group_of(In, GI, RI), abs(RO - RI) =:= 1,
    format(atom(M), 'chain ~w (~w): ~w (~w) → ~w (~w) crosses a substrate; say where the prose that carries it is (prose_ok/2)', [N, Sec, In, GI, Out, GO]).

/* =========================================================== WARNINGS */

check(warning, drift, M) :-
    number(S1, V1, U), U \== none, keywords(S1, K1),
    number(S2, V2, U), S1 @< S2, V1 =\= V2, keywords(S2, K2),
    Diff is abs(V1 - V2) / max(abs(V1), abs(V2)), Diff > 0.15,
    intersection(K1, K2, Common), length(Common, NC), NC >= 4,
    sentence(S1, E1, C1, L1, _, T1), sentence(S2, E2, C2, L2, _, T2),
    \+ (drift_ok(F1, F2, _), (sub_string(T1, _, _, _, F1), sub_string(T2, _, _, _, F2) ; sub_string(T1, _, _, _, F2), sub_string(T2, _, _, _, F1))),
    format(atom(M), '~w ~w (~w ch.~w l.~w) vs ~w ~w (~w ch.~w l.~w), shared words ~w', [V1, U, E1, C1, L1, V2, U, E2, C2, L2, Common]).

check(warning, certainty, M) :-
    certainty_word(S, W), sentence(S, Ed, Ch, Line, T, Text), memberchk(T, [contested, author]),
    \+ (certainty_ok(Frag, _), sub_string(Text, _, _, _, Frag)),
    sub_string(Text, 0, 90, _, Start),
    format(atom(M), '~w ch.~w line ~w: "~w" inside a passage marked ~w — "~w…"', [Ed, Ch, Line, W, T, Start]).

check(warning, unsourced, M) :-
    claim(Id, _, _, _, settled, Kind), memberchk(Kind, [empirical, quantitative, historical]),
    \+ source(Id, _, _), \+ common_knowledge(Id),
    \+ depends_on(Id, _),          % a claim built on other encoded claims inherits their support
    where(Id, W),
    format(atom(M), '~w (~w): a settled ~w claim with no source attached and no encoded premise', [Id, W, Kind]).

check(warning, unchecked_source, M) :-
    source(Id, Name, Y), ref(_, Name, Y, _, _, dagger), where(Id, W),
    format(atom(M), '~w (~w) rests on ~w ~w, whose support for it is not yet checked (†)', [Id, W, Name, Y]).

check(warning, tier_mismatch, M) :-
    says(A, S, P, _), says(B, S, P, _), A @< B,
    claim(A, _, _, _, TA, _), claim(B, _, _, _, TB, _), TA \== TB, where(A, WA), where(B, WB),
    format(atom(M), '~w/~w is ~w in ~w but ~w in ~w', [S, P, TA, WA, TB, WB]).

check(warning, tier_marking, M) :-
    claim(Id, Ed, Ch, Q, Tier, _), Tier \== settled,
    prefix40(Q, Q40),
    sentence(_, Ed, Ch, _, ST, Text), sub_string(Text, _, _, _, Q40),
    ST == unmarked, Ed == 'book-hs',
    format(atom(M), '~w: encoded as ~w, but the HS text shows it unboxed (which the HS edition says means settled)', [Id, Tier]).

check(warning, box_scope, M) :-
    section_box(Ed, Ch, Line, Tier, Heading),
    format(atom(M), '~w ch.~w line ~w: a ~w box claims to cover its whole section ("~w"), but the edition''s stated rule is that a box covers only what is inside it', [Ed, Ch, Line, Tier, Heading]).

/* ============================================================== INFO */

check(info, arc, M) :-
    arc_step(I, X, Y), arc_path(X, Y, 4, Path),
    findall(F, (member(N, Path), formula(N, F)), Fs), atomic_list_concat(Fs, '; then ', Via),
    format(atom(M), 'arc step ~w, ~w → ~w, is carried by: ~w', [I, X, Y, Via]).

check(info, gap, M) :-
    arc_step(I, X, Y), \+ arc_supported(X, Y), arc_gap(X, Y, G), gap(G, Desc, Where),
    format(atom(M), 'arc step ~w, ~w → ~w: unsupported, and acknowledged by the book (~w): ~w', [I, X, Y, Where, Desc]).

check(info, gap, M) :-
    arc_step(I, X, Y), \+ arc_supported(X, Y), arc_descriptive(X, Y, Where),
    format(atom(M), 'arc step ~w, ~w → ~w: descriptive rather than mechanistic, as the book itself says (~w)', [I, X, Y, Where]).

prefix40(Q, P) :- string_length(Q, L), ( L =< 40 -> P = Q ; sub_string(Q, 0, 40, _, P) ).

covered(S) :- sentence(S, Ed, Ch, _, _, Text), claim(_, Ed, Ch, Q, _, _),
              prefix40(Q, Q40), sub_string(Text, _, _, _, Q40), !.

stats :-
    aggregate_all(count, sentence(_, book, _, _, _, _), SF),
    aggregate_all(count, sentence(_, 'book-hs', _, _, _, _), SH),
    aggregate_all(count, (sentence(S, _, _, _, _, _), once((number(S, _, _) ; year(S, _)))), SN),
    aggregate_all(count, (sentence(S, _, _, _, _, _), once((number(S, _, _) ; year(S, _))), covered(S)), SC),
    aggregate_all(count, claim(_, _, _, _, _, _), NC),
    aggregate_all(count, depends_on(_, _), ND),
    aggregate_all(count, concept(_, _, _, _, _), NK),
    aggregate_all(count, chain(_, _, _, _, _, _), NCh),
    aggregate_all(count, ref(_, _, _, _, _, _), NR),
    aggregate_all(count, (sentence(_, _, _, _, T, _), T \== unmarked), NT),
    Pct is round(100 * SC / max(SN, 1)),
    Tot is SF + SH,
    format('~nCaptured: ~w sentences (full ~w, HS ~w), ~w carrying numbers or dates, ~w in explicitly tier-marked passages.~n', [Tot, SF, SH, SN, NT]),
    format('Encoded:  ~w structured claims, ~w dependencies; ~w companion concepts; ~w notation chains; ~w reference facts.~n', [NC, ND, NK, NCh, NR]),
    format('Coverage: ~w of ~w number- or date-bearing sentences (~w%) are tied to a structured claim.~n', [SC, SN, Pct]).

/* ============================================================== REPORT */

severity_order([error, blocker, warning, info]).

report(Max) :-
    severity_order(Sevs),
    forall(member(Sev, Sevs),
           ( findall(Check-Msg, check(Sev, Check, Msg), L0), sort(L0, L),
             length(L, N),
             ( N =:= 0 -> format('~n~w: none~n', [Sev])
             ; format('~n~w: ~w~n', [Sev, N]),
               ( Sev == warning, N > Max ->
                   length(Show, Max), append(Show, _, L),
                   forall(member(C-Msg, Show), format('  [~w] ~w~n', [C, Msg])),
                   Rest is N - Max, format('  … and ~w more (run with --all to see them)~n', [Rest])
               ; forall(member(C-Msg, L), format('  [~w] ~w~n', [C, Msg])) ) ) )),
    stats.

main :-
    current_prolog_flag(argv, Argv),
    ( memberchk('--all', Argv) -> Max = 100000 ; Max = 25 ),
    report(Max),
    ( (check(error, _, _) ; check(blocker, _, _)) -> halt(1) ; halt(0) ).
