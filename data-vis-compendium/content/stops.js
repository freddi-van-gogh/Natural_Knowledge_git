// SPDX-License-Identifier: CC-BY-SA-4.0
// The compendium's content: every stop, side road and source. Text and data in this file are
// CC BY-SA 4.0, like the books. Add a stop by adding an entry; the page, README and credits follow.
// Pictures come from content/pictures.js (their credits); videos are YouTube ids whose titles and
// channels were checked against YouTube's own oEmbed records.
(function (root) {
  const NKC = (root.NKC = root.NKC || {});
  const P = NKC.PICTURES || (typeof require === "function" ? require("./pictures.js").PICTURES : {});

  // YouTube ids → [exact title, exact channel], as YouTube reports them.
  const V = {
    "V4f_1_r80RY": ["Flight of the Starlings: Watch This Eerie but Beautiful Phenomenon | Short Film Showcase", "National Geographic"],
    "YW5zDD70x8o": ["Flight log of 30 autonomous drones at 6 m/s in a confined area with obstacles", "COLLMOT"],
    "oqZXmguqrmQ": ["The Greatest Mammal Migration | Waterhole: Africa's Animal Oasis | BBC Earth", "BBC Earth"],
    "UVko9jyAkQg": ["Ten Million Starlings Swarm (7 Tonnes of Bird Poo) | Superswarm | BBC Earth", "BBC Earth"],
    "E4XpyG4eMKE": ["Optimized flocking of autonomous drones in confined environments", "COLLMOT"],
    "0gvpk8fpyVY": ["Wildebeest Migration Time-lapse", "Will Burrard-Lucas"],
    "J4J__lOOV2E": ["Pedestrian-dynamics experiment: lane formation in counter flow", "PhysicsWorld1"],
    "Qd2s02_AKFY": ["Dust devil weather phenomenon", "Met Office - UK Weather"],
    "B6uA4Hzg73M": ["How does a stalagmite form?", "Media & Methods Lab UTL ETH Zurich"],
    "4Rs5Xn0CXUQ": ["Pucallpa, Peru - Earth Timelapse", "Google Earth"],
    "QLyoMIK7GkY": ["What happens when an emulsion fails?", "Harvard Online"],
    "VhUIIONM6A0": ["A Protocell Forming from Fatty Acids", "WIRED"],
    "MPzWrv6l9l0": ["The \"RNA World\" Hypothesis - Jack Szostak (Harvard/HHMI)", "iBiology Techniques"],
    "o72GGxQqWt8": ["The Belousov-Zhabotinsky Reaction - Christmas Lectures with Ian Stewart", "The Royal Institution"],
    "4V9BtQT6IPs": ["Growth of protocells - Jack Szostak (Harvard/HHMI)", "iBiology Techniques"],
    "plVk4NVIUh8": ["The Evolution of Bacteria on a “Mega-Plate” Petri Dish (Kishony Lab)", "Harvard Medical School"],
    "-ksYl2VvIHc": ["How Did Multicellularity Evolve?", "Journey to the Microcosmos"],
    "hCv-HzdhILQ": ["Corals as engineers", "Massachusetts Institute of Technology (MIT)"],
    "y2BYatmFJaI": ["Watch Jellyfish Go Through Their “Stack of Pancakes” Phase | Deep Look", "Deep Look"],
    "ITVfXHrfudw": ["The Undying Hydra: A Freshwater Mini-Monster That Defies Aging | Deep Look", "Deep Look"],
    "zK8XGEDcTfo": ["Great Transitions: The Origin of Tetrapods | HHMI BioInteractive Video", "biointeractive"],
    "zeFt_JCA3b4": ["Simple Explanation of the K-Nearest Neighbors (KNN) Algorithm", "Science Buddies"],
    "zpOoBtFNYuw": ["What it means if you can see faces in objects - Susan G. Wardle", "TED-Ed"],
    "SqK7XXvfiXs": ["The Indo-European Connection", "Langfocus"],
    "fb6ZuGSa3CU": ["What is Dreamtime?", "Evolve Communities"],
    "DZv8VyIQ7YU": ["Seven Million Years of Human Evolution #datavisualization", "American Museum of Natural History"],
    "i3zql33Lg6Q": ["Where Are the Denisovans? The Answer is in our DNA", "New Scientist"],
    "ewI3i5v0LzE": ["Hobbit histories: the origins of Homo floresiensis", "nature video"],
    "Gl9_mi6Nj0c": ["Winter Solstice Illumination of Newgrange Chamber", "National Monuments Service"],
    "x7RH23IH1BQ": ["Assembly, Structure, and Function of the Bacterial Flagellum", "ARC Centre for Cryo-EM of Membrane Proteins"],
    "yYUt3Y1zMk4": ["Did You Know: The History of Smallpox, Inoculation, and Vaccination | Encyclopaedia Britannica", "Encyclopaedia Britannica"],
    "fOn-zhqpQGM": ["Van Gogh's Starry Night as seen by an astrophysicist | Janna Levin | MoMA BBC | THE WAY I SEE IT", "The Museum of Modern Art"],
    "6AJx8IVcL_c": ["Girih Tiles: Decagonal Geometry in Seljuq Architecture, Metropolitan Museum of Art lecture", "Peter Lu"],
    "C97kMKwZ2-g": ["STRANDBEEST EVOLUTION 2021", "theo jansen"],
    "3sjCA8OPobw": ["Before Beatlemania, There Was Lisztomania", "Great Big Story"],
    "3jiSv64rtPw": ["Made In Britain: Jungle", "BBC Radio 1Xtra"],
    "Al-WH4TeMzs": ["Amen, Brother", "The Winstons - Topic"],
    "FFKMtv8tU0U": ["The History Of The Amen break | Mixmag Originals", "Mixmag"],
    "pTZ211cIjX8": ["Amazing footage of sponges pumping!", "BlueWorldTV"],
    "CJl_relCddQ": ["These Mudskipper Fins Were Made For Walking | Deep Look", "Deep Look"],
    "CW0TijmAUqY": ["Jesus Christ Lizard | National Geographic", "National Geographic"],
    "FPvcfmiuyIg": ["Bulk Diffusion of Food Coloring in Water", "usfstars"],
    "bibd1i5BhZg": ["The formation of the Bénard-Marangoni convection cells in cooking oil", "Charles Xie"],
    "Uau_eKoRn6c": ["At home science - Jumping candle flame experiment - ExpeRimental #13", "The Royal Institution"],
    "DEMjNto9FaE": ["Agar.io Mobile Update - OUT NOW on iOS and Android!", "Agar.io"],
    "VYQQD0KNOis": ["The RNA Origin of Life", "NOVA PBS Official"],
    "CsLSXxM7Wgk": ["Kim Lewis – Teixobactin Discovery", "Northeastern"],
    "wR_K_kex3iM": ["Climbing Mt. Evolution", "Michigan State University"],
    "3xDexh8vJv0": ["Specimen Spotlight-Winogradsky", "Harvard Museum of Natural History"],
    "zNtSAQHNONo": ["Beautiful Spider Web Build Time-lapse | BBC Earth", "BBC Earth"],
    "WGJOlq6-upY": ["SPORE - Leipzig Trailer", "Electronic Arts"],
    "w1_w_-46rV0": ["SpaceChem, by Zachtronics Industries", "Zachtronics"],
  };

  const clip = (id, start) => ({ id, title: V[id][0], channel: V[id][1], ...(start ? { start } : {}) });
  const vid = (id, start) => ({ type: "video", video: clip(id, start) });
  const one = (key, alt, caption) => ({ ...P[key], alt, ...(caption ? { caption } : {}) });
  const pic = (key, alt, caption) => ({ type: "picture", picture: one(key, alt, caption) });
  const gallery = (...items) => ({ type: "gallery", pictures: items.map((i) => one(...i)) });
  const src = (text, url, checked = true) => ({ text, ...(url ? { url } : {}), checked });
  const NK = "../Natural_Knowledge-paperback-interior.pdf";
  const MA = "../Modern_Alchemy_Expanded_Edition-paperback-interior.pdf";
  const book = (where) => src(`*Natural Knowledge*, ${where}.`, NK);
  const alchemy = (where) => src(`*Modern Alchemy*, ${where}.`, MA);

  NKC.ENTRIES = [
    // ------------------------------------------------------------------ 1
    {
      kind: "stop", id: "brownian", number: "1", title: "Random jostling: Brownian motion", label: "settled",
      text: "Anything small is knocked about by countless tiny hits from the molecules around it. Left at rest, those hits spread things out until everything is diluted. Below, each bird starts with no neighbours to follow: slide the number up and watch order appear.",
      visuals: [
        { type: "sim", id: "flock", opts: { clips: { starlings: clip("V4f_1_r80RY"), drones: clip("YW5zDD70x8o"), herd: clip("oqZXmguqrmQ") } } },
        { type: "anim", id: "dye", caption: "An illustration, sped up: each speck of dye knocked about at random. In a real glass, currents do most of the spreading." },
        { ...vid("FPvcfmiuyIg"), caption: "A real drop of food colouring in water. Most of this spreading is currents in the water; diffusion alone would take far longer." },
      ],
      sideRoads: [
        {
          id: "starlings", title: "Starlings: a shape that doesn't dissipate", label: "measured",
          text: "Starling flocks over Rome were filmed in 3D: each bird reacts to about six or seven of its nearest neighbours, however near or far they are, and that holds the flock together when a falcon strikes. A 2013 study of the same flocks found six or seven gives the best balance between the flock agreeing and each bird's effort.",
          visuals: [vid("UVko9jyAkQg"), pic("starlings-rome", "A murmuration of starlings over Termini station in Rome", "Starlings over Termini station, Rome: the site of the 2008 study.")],
          sources: [
            src("Ballerini, M., et al. (2008). Interaction ruling animal collective behavior depends on topological rather than metric distance: Evidence from a field study. *PNAS* 105(4): 1232–1237.", "https://doi.org/10.1073/pnas.0711437105"),
            src("Young, G. F., Scardovi, L., Cavagna, A., Giardina, I., & Leonard, N. E. (2013). Starling Flock Networks Manage Uncertainty in Consensus at Low Cost. *PLOS Computational Biology* 9(1): e1002894.", "https://doi.org/10.1371/journal.pcbi.1002894"),
            src("Bialek, W., et al. (2012). Statistical mechanics for natural flocks of birds. *PNAS* 109(13): 4786–4791. (By another method: about seven or eight.)", "https://doi.org/10.1073/pnas.1118633109"),
            book("ch. 13, on flocks"),
          ],
        },
        {
          id: "drones", title: "Drones flying by similar rules", label: "analogy",
          text: "In 2018 a team in Budapest flew 30 drones as a flock with no leader. Each drone keeps its distance and matches its neighbours' speed: rules of the same kind as the starlings', though not the same rules, since the drones watch everyone within set distances rather than their nearest few.",
          visuals: [vid("E4XpyG4eMKE")],
          sources: [
            src("Vásárhelyi, G., Virágh, C., Somorjai, G., Nepusz, T., Eiben, A. E., & Vicsek, T. (2018). Optimized flocking of autonomous drones in confined environments. *Science Robotics* 3(20): eaat3536.", "https://doi.org/10.1126/scirobotics.aat3536"),
            src("The authors' open-source flocking code, csviragh/robotsim, src/algo_spp_evol.c (MIT licence).", "https://github.com/csviragh/robotsim/blob/master/src/algo_spp_evol.c"),
          ],
        },
        {
          id: "herding", title: "Herding: the selfish herd", label: "argued",
          text: "Herds bunch for a second reason too. In the “selfish herd” idea, each animal tries to keep others between itself and the predator, so the herd packs tight. Sheep tracked by GPS did that when a dog approached. The slider's 20 is an illustration: nobody has measured how many neighbours a wildebeest watches.",
          visuals: [vid("0gvpk8fpyVY"), pic("wildebeest-serengeti", "A herd of wildebeest stretching across the Serengeti plain")],
          sources: [
            src("Hamilton, W. D. (1971). Geometry for the selfish herd. *Journal of Theoretical Biology* 31(2): 295–311.", "https://doi.org/10.1016/0022-5193(71)90189-5", false),
            src("King, A. J., et al. (2012). Selfish-herd behaviour of sheep under threat. *Current Biology* 22(14): R561–R562.", "https://doi.org/10.1016/j.cub.2012.05.008"),
          ],
        },
        {
          id: "crowds", title: "Crowds: lanes that form by themselves", label: "analogy",
          text: "In two-way foot traffic, people sort themselves into lanes without anyone deciding to: each walker steers by what they see ahead. Simple local rules, like the birds', reproduce it. People aren't starlings, but the pattern is the same kind of thing.",
          visuals: [vid("J4J__lOOV2E")],
          sources: [
            src("Helbing, D., & Molnár, P. (1995). Social force model for pedestrian dynamics. *Physical Review E* 51(5): 4282–4286.", "https://doi.org/10.1103/PhysRevE.51.4282"),
            src("Moussaïd, M., Helbing, D., & Theraulaz, G. (2011). How simple rules determine pedestrian behavior and crowd disasters. *PNAS* 108(17): 6884–6888.", "https://doi.org/10.1073/pnas.1016507108"),
          ],
        },
        {
          id: "dust-devil", title: "A dust devil: a shape from nothing, then gone", label: "settled",
          text: "Strongly heated ground sets the air above it spinning upwards: a whirling column that lasts only while the heat keeps flowing, usually a few minutes. Dust devils form on Mars too.",
          visuals: [vid("Qd2s02_AKFY"), pic("dust-devil-serengeti", "A tall dust devil rising from the Serengeti plain")],
          sources: [
            src("US National Weather Service, Flagstaff office. “Dust Devils”.", "https://www.weather.gov/fgz/DustDevil"),
            src("Balme, M., & Greeley, R. (2006). Dust devils on Earth and Mars. *Reviews of Geophysics* 44(3): RG3003.", "https://doi.org/10.1029/2005RG000188"),
          ],
        },
        {
          id: "stalagmite", title: "A stalagmite: drip by drip, what stays adds up", label: "settled",
          text: "Each drip from a cave roof leaves a film of calcite behind, and the layers build up. A global study put the average stalagmite's growth at about a metre in 11,000 years. Stalagmites grow and take their shape from their history, but they don't copy themselves.",
          visuals: [pic("stalagmite-layers", "A cut stalagmite glowing under ultraviolet light, showing its growth layers"), vid("B6uA4Hzg73M")],
          sources: [
            src("US National Park Service, Carlsbad Caverns National Park. “Cave Geology” (visitor handout).", "https://www.nps.gov/cave/planyourvisit/upload/cave_geology.pdf"),
            src("Baker, A., et al. (2021). The Properties of Annually Laminated Stalagmites: A Global Synthesis. *Reviews of Geophysics* 59(2): e2020RG000722.", "https://doi.org/10.1029/2020RG000722"),
            src("UNSW Sydney (2021, 23 April). “‘Like a metronome’: stalagmite growth found to be surprisingly constant”.", "https://www.unsw.edu.au/newsroom/news/2021/04/_like-a-metronome--stalagmite-growth-found-to-be-surprisingly-co"),
            book("ch. 12, on things that grow without reproducing"),
          ],
        },
        {
          id: "oxbow", title: "A river oxbow shifting", label: "own",
          text: "A river bend eats into its outer bank and builds up its inner one, so the bend grows until the river cuts through the neck and leaves the old loop behind as an oxbow lake. The pattern stays while the river keeps changing: order kept up by flow.",
          visuals: [{ ...vid("4Rs5Xn0CXUQ"), caption: "Credit: Google Earth Timelapse (Google, Landsat, Copernicus)." }, pic("ucayali", "Satellite view of the winding Ucayali River in Peru with its oxbow lakes")],
          sources: [
            src("Constantine, J. A., & Dunne, T. (2008). Meander cutoff and the controls on the production of oxbow lakes. *Geology* 36(1): 23–26.", "https://doi.org/10.1130/G24130A.1"),
            src("Ritter, M. E. *The Physical Environment*, “Alluvial Landforms”.", "https://people.ohio.edu/dyer/TPE/tpe_3e/fluvial_systems/alluvial_landforms_page_2.html"),
            src("Google. “About Earth Timelapse” (licence and credit).", "https://developers.google.com/earth-engine/timelapse/about"),
          ],
        },
      ],
      sources: [
        book("ch. 3, on diffusion and Brownian motion"),
        alchemy("glossary PH-08 (Brownian motion) and PH-09 (diffusion)"),
        src("Nobel Prize Outreach. “Jean Baptiste Perrin: Facts” (molecular collisions confirmed).", "https://www.nobelprize.org/prizes/physics/1926/perrin/facts/"),
        src("Pearle, P., et al. (2010). What Brown saw and you can too. *American Journal of Physics* 78(12): 1278–1289.", "https://doi.org/10.1119/1.3475685"),
      ],
    },
    // ------------------------------------------------------------------ 1.2
    {
      kind: "stop", id: "flows", number: "1.2", title: "Shapes that last only while something flows", label: "settled",
      text: "Heat a shallow pan of oil evenly from below and, past a threshold, the oil organizes itself into cells, often six-sided, that last only as long as heat keeps flowing through it: turn the heat off and they vanish. A candle flame is the same kind of shape, and the trail that rises from a blown-out candle looks like smoke but is wax vapour: hold a flame in it straight away and the flame runs down to relight the wick.",
      visuals: [
        { ...vid("bibd1i5BhZg"), caption: "Cooking oil heating in a pan, filmed with an infrared camera: the colours show temperature, and the cells form as you watch." },
        pic("benard-cells", "Drawing of a dish of liquid patterned with closely packed cells, beside a cut-away of six-sided cells with a loop of flow inside and an arrow marked heat",
          "Bénard cells, drawn: heated from below, a shallow dish of liquid tiles itself into cells (left), and each cell turns over in a loop (right, cut away). Cropped from a page of text."),
        { ...vid("Uau_eKoRn6c"), caption: "The relighting trick, from the Royal Institution, where Faraday gave his candle lectures." },
        pic("milk-coffee", "Milk pouring from a jug into a cup of black coffee",
          "Milk poured into coffee: the start of the mixing. Left unstirred it keeps mixing for a while: a cup is a place to watch convection."),
      ],
      sideRoads: [],
      sources: [
        book("ch. 4, on dissipative structures"),
        book("ch. 6, on convection cells and bodies"),
        alchemy("glossary PH-15 (dissipative structures)"),
        src("Prigogine, I. (1978). Time, Structure, and Fluctuations. *Science* 201(4358): 777–785. (Nobel lecture: “dissipative structures”.)", "https://doi.org/10.1126/science.201.4358.777"),
        src("Faraday, M. (1861). *A Course of Six Lectures on the Chemical History of a Candle*, ed. W. Crookes. London: Griffin, Bohn and Co. Lecture I, pp. 19–20 (relighting the vapour: “a train of fire”), and Lecture II (the vapour is the wax).", "https://archive.org/details/acoursesixlectu00faragoog"),
      ],
    },
    // ------------------------------------------------------------------ 1.5
    {
      kind: "stop", id: "mayonnaise", number: "1.5", title: "The mayonnaise demo", label: "settled",
      text: "Shake oil and vinegar together and they separate again within minutes. Add egg yolk and you get mayonnaise, which stays mixed: molecules in the yolk have a water-loving end and an oily end, and they sit between the two.",
      visuals: [vid("QLyoMIK7GkY")],
      sideRoads: [],
      sources: [
        book("ch. 5, on amphiphiles"),
        src("Anton, M. (2013). Egg yolk: structures, functionalities and processes. *Journal of the Science of Food and Agriculture* 93(12): 2871–2880.", "https://doi.org/10.1002/jsfa.6247"),
      ],
    },
    // ------------------------------------------------------------------ 2
    {
      kind: "stop", id: "vesicle", number: "2", title: "A vesicle forms", label: "settled",
      text: "Molecules with oily tails pack into sheets, and the sheets curl round and close into a sac on their own, with water inside and out. Fatty acids, simple molecules that form readily without life, do the same.",
      visuals: [
        { type: "anim", id: "vesicle", caption: "An illustration, sped up: heads (green) face the water inside and out; tails (copper) tuck in between." },
        pic("vesicle-diagram", "Cross-sections of a sac-shaped vesicle, a micelle, and a flat bilayer", "Three shapes the same kind of molecule makes: a sac (vesicle), a ball with no inside (micelle), and a flat sheet."),
        vid("VhUIIONM6A0"),
      ],
      sideRoads: [
        {
          id: "absorbing", title: "A game of absorbing: agar.io", label: "analogy",
          text: "In *agar.io*, a browser game made by Matheus Valadares in 2015 and published by Miniclip, each player is a blob that grows by swallowing smaller blobs and can be swallowed by bigger ones. Model protocells (stop 4) do something that looks the same: in a 2004 experiment, fatty-acid sacs filled with RNA grew at the expense of emptier neighbours, which shrank. It's an analogy, the same picture but not the same mechanism: nothing in the lab is swallowed, as the fuller sacs take membrane molecules from the emptier ones.",
          visuals: [{ ...vid("DEMjNto9FaE"), caption: "The game's own trailer, for its 2015 mobile version." }],
          sources: [
            src("Chen, I. A., Roberts, R. W., & Szostak, J. W. (2004). The Emergence of Competition Between Model Protocells. *Science* 305(5689): 1474–1476.", "https://doi.org/10.1126/science.1100757"),
            book("ch. 5, on vesicles that grow at their emptier neighbours' expense"),
            src("Christian, J. (2016, 4 January). A Browser Game Called Agar.io Got Googled More in 2015 Than Fallout 4. *Vice*.", "https://www.vice.com/en/article/a-browser-game-called-agario-got-googled-more-in-2015-than-fallout-4"),
          ],
        },
      ],
      sources: [
        book("ch. 5, on micelles and vesicles"),
        alchemy("glossary PL-01 (lipid vesicle)"),
        src("Hanczyc, M. M., Fujikawa, S. M., & Szostak, J. W. (2003). Experimental Models of Primitive Cellular Compartments: Encapsulation, Growth, and Division. *Science* 302(5645): 618–622.", "https://doi.org/10.1126/science.1089904"),
      ],
    },
    // ------------------------------------------------------------------ 3
    {
      kind: "stop", id: "autocatalysis", number: "3", title: "Reactions that feed themselves", label: "argued",
      text: "A reaction whose product speeds up the making of more of itself starts slowly, then takes off. Chemists have built RNA molecules that copy each other, and in 2026 found a small RNA that can make a copy of itself, slowly and in ice. None yet evolves open-endedly, and none arose without help.",
      visuals: [
        { type: "anim", id: "autocat", caption: "An illustration: what a self-copying RNA strand could look like, sped up. Not a simulation of real chemistry." },
        vid("MPzWrv6l9l0"),
        { ...vid("VYQQD0KNOis"), caption: "NOVA's short animated overview of the RNA world, which it presents as a hypothesis, not as what happened: “the scientific answer is: we don't entirely know”." },
        { type: "sim", id: "dish", title: "Interact with chemical properties to make fun shapes", caption: "A model of a dish, not a dish. Spots that divide, worms, mazes, and the beginnings of spirals all come from one pair of rules with two numbers changed. Turing proposed that chemicals that react and spread could pattern living things, but these aren't Turing patterns: a drop starts them. The real dish, with full spirals, is the BZ reaction in the side road below." },
      ],
      sideRoads: [
        {
          id: "bz-reaction", title: "A chemical clock: the BZ reaction", label: "settled",
          text: "A chemical mixture that cycles between colours and draws travelling waves and spirals, for as long as its ingredients last. It isn't alive and doesn't copy itself: it's order without life.",
          visuals: [vid("o72GGxQqWt8"), pic("bz-patterns", "Spiral and ring waves in a dish of the Belousov–Zhabotinsky reaction")],
          sources: [
            book("ch. 4, on the Belousov–Zhabotinsky reaction"),
            src("Zhabotinsky, A. M. (2007). Belousov-Zhabotinsky reaction. *Scholarpedia* 2(9): 1435.", "https://doi.org/10.4249/scholarpedia.1435"),
            src("Winfree, A. T. (1972). Spiral Waves of Chemical Activity. *Science* 175(4022): 634–636.", "https://doi.org/10.1126/science.175.4022.634"),
          ],
        },
      ],
      sources: [
        book("ch. 4, on autocatalysis, and ch. 8"),
        src("Lincoln, T. A., & Joyce, G. F. (2009). Self-Sustained Replication of an RNA Enzyme. *Science* 323(5918): 1229–1232.", "https://doi.org/10.1126/science.1167856"),
        src("Gianni, E., et al. (2026). A small polymerase ribozyme that can synthesize itself and its complementary strand. *Science* 391(6789): 1022–1028.", "https://doi.org/10.1126/science.adt2760"),
        src("Gray, P., & Scott, S. K. (1984). Autocatalytic reactions in the isothermal, continuous stirred tank reactor: Oscillations and instabilities in the system A + 2B → 3B; B → C. *Chemical Engineering Science* 39(6): 1087–1097.", "https://doi.org/10.1016/0009-2509(84)87017-7"),
        src("Pearson, J. E. (1993). Complex Patterns in a Simple System. *Science* 261(5118): 189–192. (Gray and Scott's reactions, studied in a stirred tank, spread across a simulated dish, as here: the map of what grows; at its ratio of diffusion rates, “there are no stable Turing patterns”.)", "https://doi.org/10.1126/science.261.5118.189"),
        src("Turing, A. M. (1952). The chemical basis of morphogenesis. *Philosophical Transactions of the Royal Society of London B* 237(641): 37–72.", "https://doi.org/10.1098/rstb.1952.0012"),
        book("ch. 4, on the Belousov–Zhabotinsky reaction"),
      ],
    },
    // ------------------------------------------------------------------ 4
    {
      kind: "stop", id: "protocell", number: "4", title: "A protocell", label: "argued",
      text: "Put self-copying chemistry inside the sac and you have a protocell. In the lab, fatty-acid sacs grow by taking up more fatty acid and split when stretched, keeping what's inside. Not yet alive: nobody has yet joined a self-copying genome to a self-copying sac.",
      visuals: [{ type: "anim", id: "protocell", caption: "An illustration, sped up." }, vid("4V9BtQT6IPs")],
      sideRoads: [],
      sources: [
        book("ch. 5, on protocells"),
        alchemy("glossary PL-04 (protocell)"),
        src("Zhu, T. F., & Szostak, J. W. (2009). Coupled Growth and Division of Model Protocell Membranes. *JACS* 131(15): 5705–5713.", "https://doi.org/10.1021/ja900919c"),
      ],
    },
    { kind: "gap", id: "gap-heredity", text: "How chemistry first came to copy itself reliably is not known." },
    // ------------------------------------------------------------------ 5
    {
      kind: "stop", id: "selection", number: "5", title: "Copies and selection", label: "settled",
      text: "Once copies carry their differences forward, variants that copy better become more common, generation after generation. In the books' words: before heredity, chemical systems could persist; after it, they could accumulate.",
      visuals: [
        { type: "anim", id: "selection", caption: "The green kind copies 15% faster. Chance plays a part in every generation: the faster kind usually takes over, but now and then chance wipes it out first." },
        vid("plVk4NVIUh8"),
        pic("darwin-tree", "Darwin's 1837 notebook sketch of a branching tree, headed “I think”", "Darwin's first sketch of the tree of life, 1837."),
      ],
      sideRoads: [
        {
          id: "parallel-trials", title: "Many trials at once: plates, pipettes, and time", label: "own",
          text: "The books read the early Earth as countless cheap trials run side by side, nearly all of which failed within minutes; a lab can do the same on purpose, with many trials at once and nothing to pull but time and cycles. Many at once: Kim Lewis's and Slava Epstein's labs at Northeastern grow soil bacteria one cell to a chamber, in hundreds of tiny chambers buried back in the soil, and in 2015 a screen of 10,000 of them, with the company NovoBiotic, found a new antibiotic, teixobactin. Time and cycles: Richard Lenski's experiment, begun in 1988 and still running, moves 1 per cent of each of twelve flasks of *E. coli* into fresh food every day, about 6.7 generations a day, over 75,000 generations so far.",
          visuals: [
            pic("multichannel-pipette", "Gloved hands using a multichannel pipette to fill a row of wells in a clear 96-well plate, with a Petri dish beside it",
              "Many small trials set up at once: a multichannel pipette filling a row of a 96-well plate. An ordinary lab tool, not the iChip."),
            { ...vid("CsLSXxM7Wgk"), caption: "Kim Lewis on finding teixobactin, from Northeastern University." },
            pic("lenski-flasks", "Twelve small capped glass flasks, labelled A-1 to A-6 and A+1 to A+6",
              "Lenski's twelve flasks of *E. coli* on 25 June 2008, about a day after a transfer."),
            { ...vid("wR_K_kex3iM"), caption: "Michigan State University on the experiment when it passed 50,000 generations." },
          ],
          sources: [
            book("ch. 3, on the early Earth as a search space"),
            src("Nichols, D., et al. (2010). Use of ichip for high-throughput in situ cultivation of “uncultivable” microbial species. *Applied and Environmental Microbiology* 76(8): 2445–2450.", "https://doi.org/10.1128/AEM.01754-09"),
            src("Ling, L. L., et al. (2015). A new antibiotic kills pathogens without detectable resistance. *Nature* 517(7535): 455–459.", "https://doi.org/10.1038/nature14098"),
            src("Shukla, R., et al. (2023). An antibiotic from an uncultured bacterium binds to an immutable target. *Cell* 186(19): 4059–4073.e27. (Clovibactin: a later find by the same method.)", "https://doi.org/10.1016/j.cell.2023.07.038"),
            src("Lenski, R. E. (2017). Experimental evolution and the dynamics of adaptation and genome evolution in microbial populations. *The ISME Journal* 11(10): 2181–2194.", "https://doi.org/10.1038/ismej.2017.69"),
            src("Michigan State University (2025, November). “‘Evolution under a microscope’ going strong at MSU”. *MSU Today*. (Begun at UC Irvine in 1988; at Michigan State from 1991, then in Texas, and now back at Michigan State.)", "https://msutoday.msu.edu/news/2025/11/evolution-under-a-microscope-going-strong-at-msu"),
            src("Michigan State University (2022, 27 June). “MSU’s famous evolution-in-a-flask experiment moves, but not the science”. *EurekAlert!* (The move to Jeffrey Barrick's lab at UT Austin in 2022, with samples from 75,000 generations.)", "https://www.eurekalert.org/news-releases/957174"),
          ],
        },
      ],
      sources: [
        book("ch. 8, on heredity, and ch. 9, on evolution"),
        src("Baym, M., et al. (2016). Spatiotemporal microbial evolution on antibiotic landscapes. *Science* 353(6304): 1147–1151.", "https://doi.org/10.1126/science.aag0822"),
      ],
    },
    // ------------------------------------------------------------------ 6
    {
      kind: "stop", id: "cells", number: "6", title: "Cells working together", label: "settled",
      text: "The mitochondria that power our cells began as free-living bacteria taken in by another cell, and they still carry a little DNA of their own. Later, cells began living together as one body: multicellular life evolved many times over.",
      visuals: [vid("-ksYl2VvIHc"), pic("volvox", "A Volvox colony: thousands of green cells forming a hollow ball")],
      sideRoads: [
        {
          id: "winogradsky", title: "A Winogradsky column: mud that sorts itself into layers", label: "settled",
          text: "A Winogradsky column is a clear tube of mud enriched with leaf litter and a source of sulfate, then left in the light: no organisms are added, yet over the following weeks the mud sorts itself into layers that can be watched through the wall. Oxygen falls away with depth and sulfide rises from the blackening mud below, so each depth suits different bacteria, and kinds that were rare in the starting mud can become common. The textbook bands, green with red-violet above it, are typical but not guaranteed: in one survey of columns they did not appear.",
          visuals: [
            pic("winogradsky-column", "A tall glass cylinder of black mud with patches of green and red-violet and a pale band near the top",
              "One column, not the pattern every column follows: black mud, patches of green and red-violet, and a pale band near the top."),
            { ...vid("3xDexh8vJv0"), caption: "The Harvard Museum of Natural History's giant column, explained by one of the museum's cell biologists." },
          ],
          sources: [
            book("ch. 7, on the Winogradsky column"),
            src("Esteban, D. J., et al. (2015). Temporal and Spatial Distribution of the Microbial Community of Winogradsky Columns. *PLOS ONE* 10(8): e0134588.", "https://doi.org/10.1371/journal.pone.0134588"),
            src("Rundell, E. A., Banta, L. M., Ward, D. V., et al. (2014). 16S rRNA Gene Survey of Microbial Communities in Winogradsky Columns. *PLoS ONE* 9(8): e104134.", "https://doi.org/10.1371/journal.pone.0104134"),
          ],
        },
      ],
      sources: [
        book("ch. 6, on endosymbiosis"),
        src("Sagan, L. (1967). On the origin of mitosing cells. *Journal of Theoretical Biology* 14(3): 225–274.", "https://doi.org/10.1016/0022-5193(67)90079-3"),
        src("Grosberg, R. K., & Strathmann, R. R. (2007). The Evolution of Multicellularity: A Minor Major Transition? *Annual Review of Ecology, Evolution, and Systematics* 38: 621–654.", "https://doi.org/10.1146/annurev.ecolsys.36.102403.114735"),
        src("Kirk, D. L. (2005). A twelve-step program for evolving multicellularity and a division of labor. *BioEssays* 27(3): 299–310.", "https://doi.org/10.1002/bies.20197"),
      ],
    },
    // ------------------------------------------------------------------ 6.1 (the nitrogen cycle)
    {
      kind: "stop", id: "nitrogen-cycle", number: "6.1", title: "Nitrogen cycle demo: multi-organism nutrient cycling", label: "own",
      subtitle: "About 78% of the atmosphere on Earth is N₂, your lungs are consistently breathing in air where O₂, the chemical we need, is the minority gas but the most important one for us.",
      text: "While Winogradsky columns are useful demonstrations of microcosm, we can look at the environment and see a larger network of bacteria interacting in the soil along with other organisms like plants and fungi. Below you can see the nitrogen cycle, one of Earth's largest nutrient cycling systems. The ecosystem can function with less soil and trees, but it's more efficient when we have more diversity and larger forests for the cycle to run. Among trees, nitrates are very important nutrients for farming and crops require it in the soil to grow.",
      visuals: [{ type: "sim", id: "ncycle", caption: "A model of the cycle's shape, not of measured rates. In real soil each step the microbes do is done by many kinds of microbe, and not all are bacteria: archaea fix nitrogen and oxidize ammonia too. Some do two steps at once: certain *Nitrospira* take ammonium all the way to nitrate. Trees and crops take up ammonium as well as nitrate. Keeping the cycle turning is a balancing act, and more kinds of plant make it easier. A forest is something like many Winogradsky columns run in parallel, with a host this time: each tree and its microbes can be called a holobiont." }],
      sideRoads: [],
      sources: [
        src("Kuypers, M. M. M., Marchant, H. K., & Kartal, B. (2018). The microbial nitrogen-cycling network. *Nature Reviews Microbiology* 16(5): 263–276. (Nitrogen is “the main nutrient limiting life on our planet”, the air holds “by far, the largest inventory” of it, and a tidy cycle of separate steps “does not exist” in nature.)", "https://doi.org/10.1038/nrmicro.2018.9"),
        src("Fowler, D., et al. (2013). The global nitrogen cycle in the twenty-first century. *Philosophical Transactions of the Royal Society B* 368(1621): 20130164. (Fixation brings about 413 million tonnes of nitrogen a year into ecosystems on land and at sea, half of it through people; the Haber–Bosch process alone fixed 120 million tonnes in 2010.)", "https://doi.org/10.1098/rstb.2013.0164"),
        src("Bernhard, A. (2010). The Nitrogen Cycle: Processes, Players, and Human Impact. *Nature Education Knowledge* 3(10): 25.", "https://www.nature.com/scitable/knowledge/library/the-nitrogen-cycle-processes-players-and-human-15644632/"),
        src("Baldrian, P. (2017). Forest microbiome: diversity, complexity and dynamics. *FEMS Microbiology Reviews* 41(2): 109–130.", "https://doi.org/10.1093/femsre/fuw040"),
        src("Tilman, D., Wedin, D., & Knops, J. (1996). Productivity and sustainability influenced by biodiversity in grassland ecosystems. *Nature* 379(6567): 718–720. (In 147 grassland plots, more plant species used the soil's nitrogen more fully and lost less of it to leaching.)", "https://doi.org/10.1038/379718a0"),
        src("Cardinale, B. J., et al. (2012). Biodiversity loss and its impact on humanity. *Nature* 486(7401): 59–67. (The field's consensus: losing species makes communities less efficient at recycling nutrients, an effect that levels off.)", "https://doi.org/10.1038/nature11148", false),
        src("Likens, G. E., Bormann, F. H., Johnson, N. M., Fisher, D. W., & Pierce, R. S. (1970). Effects of Forest Cutting and Herbicide Treatment on Nutrient Budgets in the Hubbard Brook Watershed-Ecosystem. *Ecological Monographs* 40(1): 23–47. (A standing forest holds its nitrogen: after one was felled and kept bare, the nitrate in its stream rose 41-fold the first year and 56-fold the second.)", "https://doi.org/10.2307/1942440"),
        src("Hachiya, T., & Sakakibara, H. (2017). Interactions between nitrate and ammonium in their uptake, allocation, assimilation, and signaling in plants. *Journal of Experimental Botany* 68(10): 2501–2512. (Plants take up nitrogen mainly as nitrate and ammonium.)", "https://doi.org/10.1093/jxb/erw449"),
        src("Xu, G., Fan, X., & Miller, A. J. (2012). Plant Nitrogen Assimilation and Use Efficiency. *Annual Review of Plant Biology* 63: 153–182. (“Crop productivity relies heavily on nitrogen (N) fertilization.”)", "https://doi.org/10.1146/annurev-arplant-042811-105532"),
        src("NASA Goddard Space Flight Center, NSSDCA. “Earth Fact Sheet”. (Dry air by volume: 78.08% nitrogen, 20.95% oxygen.)", "https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html"),
        src("Dos Santos, P. C., Fang, Z., Mason, S. W., Setubal, J. C., & Dixon, R. (2012). Distribution of nitrogen fixation and nitrogenase-like sequences amongst microbial genomes. *BMC Genomics* 13: 162. (Archaea fix nitrogen too.)", "https://doi.org/10.1186/1471-2164-13-162"),
        src("Daims, H., et al. (2015). Complete nitrification by *Nitrospira* bacteria. *Nature* 528(7583): 504–509.", "https://doi.org/10.1038/nature16461"),
        src("van Kessel, M. A. H. J., et al. (2015). Complete nitrification by a single microorganism. *Nature* 528(7583): 555–559.", "https://doi.org/10.1038/nature16459"),
        src("Voříšková, J., & Baldrian, P. (2013). Fungal community on decomposing leaf litter undergoes rapid successional changes. *The ISME Journal* 7(3): 477–486. (“Fungi are considered the primary decomposers of dead plant biomass in terrestrial ecosystems.”)", "https://doi.org/10.1038/ismej.2012.116"),
        src("Kroupova, H., Machova, J., & Svobodova, Z. (2005). Nitrite influence on fish: a review. *Veterinární Medicína* 50(11): 461–471.", "https://doi.org/10.17221/5650-VETMED"),
        src("World Health Organization. *Guidelines for Drinking-water Quality*, chemical fact sheet “Nitrate and nitrite”. (Nitrite in people: methaemoglobinaemia, in bottle-fed babies most of all.)", "https://www.who.int/docs/default-source/wash-documents/wash-chemicals/nitrate-nitrite-chemical-fact-sheet.pdf"),
        src("Kaiser, W. M., & Huber, S. C. (2001). Post-translational regulation of nitrate reductase: mechanism, physiological relevance and environmental triggers. *Journal of Experimental Botany* 52(363): 1981–1989. (Nitrite is toxic to plants at higher concentrations.)", "https://doi.org/10.1093/jexbot/52.363.1981"),
        book("ch. 7, on the holobiont"),
        alchemy("glossary BI-12 (holobiont)"),
        src("Vandenkoornhuyse, P., Quaiser, A., Duhamel, M., Le Van, A., & Dufresne, A. (2015). The importance of the microbiome of the plant holobiont. *New Phytologist* 206(4): 1196–1206.", "https://doi.org/10.1111/nph.13312"),
      ],
    },
    // ------------------------------------------------------------------ 6.2 (Anabaena)
    {
      kind: "stop", id: "anabaena", number: "6.2", title: "*Anabaena*: one filament, two kinds of cell", label: "settled",
      text: "*Anabaena* is a chain of bacterial cells. Its ordinary cells photosynthesize, which makes sugar and also oxygen, but the enzyme that fixes nitrogen from the air is damaged by oxygen. So about one cell in every 10 to 20 becomes a heterocyst: it stops making oxygen, wraps itself in extra walls, and fixes nitrogen, trading it with its neighbours for sugar.",
      visuals: [
        { type: "anim", id: "anabaena", caption: "Our diagram, not to scale. A small signal (a peptide, PatS) spreading from each heterocyst stops its neighbours from changing too, which keeps the heterocysts spaced out: separate compartments, each doing work the others can't." },
        pic("anabaena-filaments", "Stained Anabaena filaments under a microscope, like beads on a string", "*Anabaena* filaments, stained, at 400×."),
      ],
      sideRoads: [],
      sources: [
        src("Kumar, K., Mella-Herrera, R. A., & Golden, J. W. (2010). Cyanobacterial heterocysts. *Cold Spring Harbor Perspectives in Biology* 2(4): a000315.", "https://doi.org/10.1101/cshperspect.a000315"),
        src("Flores, E., & Herrero, A. (2010). Compartmentalized function through cell differentiation in filamentous cyanobacteria. *Nature Reviews Microbiology* 8: 39–50.", "https://doi.org/10.1038/nrmicro2242"),
        src("Herrero, A., Stavans, J., & Flores, E. (2016). The multicellular nature of filamentous heterocyst-forming cyanobacteria. *FEMS Microbiology Reviews* 40(6): 831–854.", "https://doi.org/10.1093/femsre/fuw029"),
        src("Yoon, H. S., & Golden, J. W. (1998). Heterocyst pattern formation controlled by a diffusible peptide. *Science* 282(5390): 935–938.", "https://doi.org/10.1126/science.282.5390.935"),
        alchemy("glossary CO-15 (compartmentalization) and CO-06 (specialization)"),
      ],
    },
    // ------------------------------------------------------------------ 6.3 (sponges)
    {
      kind: "stop", id: "sponges", number: "6.3", title: "Sponges building structure from repeated little houses", label: "settled",
      text: "A sponge is built from thousands of tiny repeated chambers, from about 1,900 to 12,000 in a cubic millimetre, each lined with about 95 to 260 collar cells. Their beating whips pull water in through tiny pores and push it out of the top, so a sponge filters many times its own volume of water every hour. Glass sponges build their skeletons the same way: tiny glass spheres in rings, rings in rods, and rods in bundles that make a lattice.",
      visuals: [
        { type: "anim", id: "sponge", caption: "Our diagram, not to scale." },
        pic("barrel-sponge", "A red barrel sponge on a reef, seen from above: a tall, rough-ridged barrel with a wide opening at the top",
          "A giant barrel sponge, *Xestospongia muta*, the kind the video below shows pumping. The water leaves by the wide opening at the top, the osculum."),
        vid("pTZ211cIjX8"),
      ],
      sources: [
        src("Leys, S. P., Yahel, G., Reidenbach, M. A., Tunnicliffe, V., Shavit, U., & Reiswig, H. M. (2011). The sponge pump: the role of current induced flow in the design of the sponge body plan. *PLOS ONE* 6(12): e27787. (Chambers per cubic millimetre and collar cells per chamber: its Table 1.)", "https://doi.org/10.1371/journal.pone.0027787"),
        src("Aizenberg, J., Weaver, J. C., Thanawala, M. S., Sundar, V. C., Morse, D. E., & Fratzl, P. (2005). Skeleton of *Euplectella* sp.: structural hierarchy from the nanoscale to the macroscale. *Science* 309(5732): 275–278.", "https://doi.org/10.1126/science.1112255"),
        src("NOAA Photo Library, reef3860 (Twilight Zone Expedition Team 2007, NOAA Ocean Exploration), via Wikimedia Commons. (*Xestospongia muta*, the barrel sponge; Caribbean Sea, Cayman Islands.)", "https://commons.wikimedia.org/wiki/File:Reef3860_-_Flickr_-_NOAA_Photo_Library.jpg"),
      ],
      sideRoads: [],
    },
    // ------------------------------------------------------------------ 6.4 (coral)
    {
      kind: "stop", id: "coral", number: "6.4", title: "Coral: tiny cells moving water", label: "settled",
      text: "A coral's surface is covered in tiny beating hairs (cilia). Together they whirl the water next to it into little vortices, which bring in nutrients and oxygen and carry waste away far faster than still water would.",
      visuals: [vid("hCv-HzdhILQ"), pic("coral-polyps", "Polyps of the coral Pocillopora damicornis under a microscope")],
      sideRoads: [],
      sources: [src("Shapiro, O. H., et al. (2014). Vortical ciliary flows actively enhance mass transport in reef corals. *PNAS* 111(37): 13391–13396.", "https://doi.org/10.1073/pnas.1323094111")],
    },
    // ------------------------------------------------------------------ 6.5 (Hydra)
    {
      kind: "stop", id: "hydra", number: "6.5", title: "Hydra and jellyfish life cycles", label: "settled",
      text: "The moon jelly has two body plans in one life: a small polyp fixed to a rock, which stacks itself into discs that swim off as jellyfish. Its freshwater relative Hydra stays a polyp all its life, and can regrow a whole body from a small piece.",
      visuals: [
        vid("y2BYatmFJaI"),
        pic("aurelia-cycle", "Diagram of the moon jelly's life cycle: larva, polyp, stacked discs, young jellyfish, and adult"),
        vid("ITVfXHrfudw"),
      ],
      sideRoads: [],
      sources: [
        src("Helm, R. R. (2018). Evolution and development of scyphozoan jellyfish. *Biological Reviews* 93(2): 1228–1250.", "https://doi.org/10.1111/brv.12393"),
        src("Hammond, G. (2009). “Hydrozoa”. *Animal Diversity Web*, University of Michigan Museum of Zoology.", "https://animaldiversity.org/accounts/Hydrozoa/"),
        src("Galliot, B. (2012). Hydra, a fruitful model system for 270 years. *International Journal of Developmental Biology* 56(6–8): 411–423.", "https://doi.org/10.1387/ijdb.120086bg"),
      ],
    },
    // ------------------------------------------------------------------ 6.6 (the march)
    {
      kind: "stop", id: "march", number: "6.6", title: "Fish → legs → ape → human", label: "oversimplified",
      date: "about 375 million years ago to today",
      text: "The “march of progress” began as Rudolph Zallinger's 1965 line of primates; later versions start from a fish. Here it is, redrawn by us. Zallinger himself worried it would mislead: life is a branching bush. The lobe-finned fish and the early four-legged animal were cousins on side branches, and apes and humans share an ancestor; neither came from the other.",
      visuals: [
        { type: "anim", id: "march" },
        vid("zK8XGEDcTfo"),
        { ...vid("CJl_relCddQ"), caption: "Mudskippers today: fish that walk on mud with their front fins and take in oxygen through their skin. They're not our ancestors (vertebrates took to land more than once), but researchers use them as living models of how early four-legged animals may have moved." },
        { ...vid("CW0TijmAUqY"), caption: "And the funny inversion: a land lizard that runs on water. A basilisk escapes predators by dashing across the surface, pushing each foot down into the water hard enough to hold itself up." },
        pic("tiktaalik", "A life restoration of Tiktaalik, a fish with sturdy limb-like fins, in shallow water", "Tiktaalik, about 375 million years ago: a cousin of our ancestors, not an ancestor itself."),
      ],
      sideRoads: [],
      sources: [
        src("Giller, G., & Conniff, R. (2014). “March of progress”. *Yale Alumni Magazine*.", "https://yalealumnimagazine.org/articles/3977-march-of-progress"),
        src("Daeschler, E. B., Shubin, N. H., & Jenkins, F. A. (2006). A Devonian tetrapod-like fish and the evolution of the tetrapod body plan. *Nature* 440: 757–763.", "https://doi.org/10.1038/nature04639"),
        src("University of Chicago Medical Center (2006). “Newly found species fills evolutionary gap between fish and land animals”.", "https://www.eurekalert.org/news-releases/838893"),
        src("Smithsonian National Museum of Natural History, Human Origins Program. “How Do We Know Humans Are Primates?” (a common ancestor 8–6 million years ago).", "https://humanorigins.si.edu/education/how-do-we-know/how-do-we-know-humans-are-primates"),
        book("ch. 16, on reading the sequence as a ladder"),
        src("Quigley, Z. M. G., Blob, R. W., & Kawano, S. M. (2022). Kinematic comparisons between mudskipper fins and salamander limbs during terrestrial locomotion. *Journal of Experimental Zoology A* 337(6): 612–625.", "https://doi.org/10.1002/jez.2594"),
        src("Hsieh, S. T., & Lauder, G. V. (2004). Running on water: Three-dimensional force generation by basilisk lizards. *PNAS* 101(48): 16784\u201316788.", "https://doi.org/10.1073/pnas.0405736101"),
        src("Zada, G. (2026, 30 June). Meet the mudskipper: the fish that ditched the water. *KQED Science* (Deep Look).", "https://www.kqed.org/science/2001332/this-fish-walks-on-land-and-leaps-for-love"),
      ],
    },
    // ------------------------------------------------------------------ 7
    {
      kind: "stop", id: "pattern", number: "7", title: "Pattern recognition, ELI10", label: "oversimplified",
      text: "Teach the computer by putting red and blue dots on the board. To sort any other spot, it asks one question: which colours are closest? That's a real method (“nearest neighbours”), and a very simple picture of what spotting a pattern means.",
      visuals: [{ type: "anim", id: "pattern" }, vid("zeFt_JCA3b4")],
      sideRoads: [
        {
          id: "faces-in-clouds", title: "Faces in clouds", label: "settled",
          text: "Brains are so quick to find faces that they find them in clouds, rocks, and wood grain. The brain's face areas treat them as real faces for a fraction of a second, and monkeys see them too. The famous “Face on Mars” became an ordinary hill in a sharper photo.",
          visuals: [pic("face-on-mars", "The 1976 “Face on Mars” beside a 2007 close-up showing an eroded hill"), vid("zpOoBtFNYuw")],
          sources: [
            src("Wardle, S. G., Taubert, J., Teichmann, L., & Baker, C. I. (2020). Rapid and dynamic processing of face pareidolia in the human brain. *Nature Communications* 11: 4518.", "https://doi.org/10.1038/s41467-020-18325-8"),
            src("Taubert, J., et al. (2017). Face pareidolia in the rhesus monkey. *Current Biology* 27(16): 2505–2509.", "https://doi.org/10.1016/j.cub.2017.06.075"),
            src("NASA / JPL / University of Arizona, HiRISE image PSP_003234_2210.", "https://commons.wikimedia.org/wiki/File:Face_on_Mars_with_Inset.jpg"),
          ],
        },
      ],
      sources: [
        src("Cover, T. M., & Hart, P. E. (1967). Nearest neighbor pattern classification. *IEEE Transactions on Information Theory* 13(1): 21–27.", "https://doi.org/10.1109/TIT.1967.1053964"),
        alchemy("glossary MC-01 (pattern recognition)"),
      ],
    },
    { kind: "shift", id: "shift-language", text: "From here on: the same words, not the same machinery." },
    // ------------------------------------------------------------------ 8
    {
      kind: "stop", id: "sounds", number: "8", title: "Sounds that echo and repeat", label: "analogy",
      text: "Early words as a kind of “protochemistry”: a few sounds combining and recombining, like reacting units. That's an analogy, not a mechanism. Below, one word in all ten branches of the Indo-European family: the likeness counts as evidence of shared descent only because the sound changes between languages are regular.",
      visuals: [
        { type: "anim", id: "langtree", caption: "One word, *three*, across the ten branches of the Indo-European family, spelled as the source gives them." },
        vid("SqK7XXvfiXs"),
      ],
      sideRoads: [
        {
          id: "dreaming", title: "The Dreaming", label: "account",
          text: "*Aboriginal and Torres Strait Islander readers are advised that the linked material may contain images and voices of people who have died.* The Dreaming is, in the words of the First Nations organization Common Ground, “First Nations peoples' understanding of the world and its creation”. It isn't ours to retell, so here are their own accounts. In the video, Aunty Munya Andrews, an Aboriginal Elder from the Kimberley and a director of Evolve Communities, explains what the Dreaming is. A Gumbaynggirr story of where the different Aboriginal languages came from, told by Elder Ken Walker, is on the Nambucca–Bellingen Storylines site as “Dreaming story: the emergence of the different Aboriginal languages” (linked below).",
          visuals: [vid("fb6ZuGSa3CU")],
          links: [{ text: "Elder Ken Walker's Gumbaynggirr story on Storylines", url: "https://nambucca-bellingen.storylines.com.au/?p=571" }],
          sources: [
            src("Common Ground. “The Dreaming”.", "https://www.commonground.org.au/learn/the-dreaming"),
            src("Storylines (Nambucca–Bellingen). “Dreaming story: the emergence of the different Aboriginal languages”. Told by Gumbaynggirr Elder Ken Walker; footage from *Stories from the Bagga Bagga*, contributed by Gary Cattanach, Nambucca Heads High School (2016).", "https://nambucca-bellingen.storylines.com.au/?p=571"),
            src("Evolve Communities. “Meet the team” (Aunty Munya Andrews: director, Aboriginal Elder, and cultural educator, from the Kimberley).", "https://www.evolves.com.au/meet-the-team/"),
            src("Janke, T. (2019). *Protocols for using First Nations Cultural and Intellectual Property in the Arts* (3rd ed.). Creative Australia.", "https://creative.gov.au/investment-and-development/protocols-and-resources/protocols-for-using-first-nations-cultural-and-intellectual-property-in-the-arts"),
          ],
        },
      ],
      sources: [
        alchemy("glossary MF-02 (language as protochemistry: analogy, not mechanism)"),
        book("ch. 14, on language"),
        src("Linguistics Research Center, University of Texas at Austin. *Indo-European Lexicon*, Pokorny etymon “trei-”.", "https://lrc.la.utexas.edu/lex/master/2032"),
      ],
    },
    // ------------------------------------------------------------------ 9
    {
      kind: "stop", id: "out-of-africa", number: "9", title: "Out of Africa: peoples and languages diverge", label: "settled",
      date: "about 60,000–40,000 years ago",
      text: "Modern humans spread out of Africa and across the world between about 60,000 and 40,000 years ago. On the way they met, and had children with, Neanderthals and Denisovans: about 2% of most non-African DNA is Neanderthal. Languages split as peoples did, but no language family reaches back that far; Indo-European is about 8,000 years old.",
      visuals: [
        { type: "anim", id: "quilt", opts: { caption: "An illustration: two seams carry sourced figures; the other proportions are symbolic." } },
        vid("DZv8VyIQ7YU", 246),
      ],
      sideRoads: [
        {
          id: "denisovans", title: "The Denisovans", label: "settled",
          text: "Known first from a finger bone in Denisova Cave, Siberia, and since from a jaw on the Tibetan Plateau and finds in Taiwan and China. They left up to about 5% of the DNA of some people in Oceania, and most of all in the Ayta of the Philippines. Tibetans' variant of a gene for living at altitude came from Denisovan-like DNA.",
          visuals: [pic("xiahe-jaw", "The Xiahe jaw: a Denisovan lower jaw from the Tibetan Plateau"), vid("i3zql33Lg6Q", 72)],
          sources: [
            src("Krause, J., et al. (2010). The complete mitochondrial DNA genome of an unknown hominin from southern Siberia. *Nature* 464: 894–897.", "https://doi.org/10.1038/nature08976"),
            src("Reich, D., et al. (2010). Genetic history of an archaic hominin group from Denisova Cave in Siberia. *Nature* 468: 1053–1060.", "https://doi.org/10.1038/nature09710"),
            src("Chen, F., et al. (2019). A late Middle Pleistocene Denisovan mandible from the Tibetan Plateau. *Nature* 569: 409–412.", "https://doi.org/10.1038/s41586-019-1139-x"),
            src("Sankararaman, S., Mallick, S., Patterson, N., & Reich, D. (2016). The combined landscape of Denisovan and Neanderthal ancestry in present-day humans. *Current Biology* 26: 1241–1247.", "https://doi.org/10.1016/j.cub.2016.03.037"),
            src("Larena, M., et al. (2021). Philippine Ayta possess the highest level of Denisovan ancestry in the world. *Current Biology* 31: 4219–4230.", "https://doi.org/10.1016/j.cub.2021.07.022"),
            src("Huerta-Sánchez, E., et al. (2014). Altitude adaptation in Tibetans caused by introgression of Denisovan-like DNA. *Nature* 512: 194–197.", "https://doi.org/10.1038/nature13408"),
            src("Tsutaya, T., et al. (2025). A male Denisovan mandible from Pleistocene Taiwan. *Science* 388: 176–180.", "https://doi.org/10.1126/science.ads3888"),
          ],
        },
        {
          id: "floresiensis", title: "The “hobbits” of Flores: *Homo floresiensis*", label: "settled",
          text: "A small human species from the island of Flores in Indonesia, about 1.06 m tall. Its bones are about 100,000 to 60,000 years old and its stone tools up to 190,000 years old; a population ancestral to it was on Flores 700,000 years ago.",
          visuals: [pic("floresiensis-cast", "A museum cast of the Homo floresiensis skull"), vid("ewI3i5v0LzE")],
          sources: [
            src("Brown, P., et al. (2004). A new small-bodied hominin from the Late Pleistocene of Flores, Indonesia. *Nature* 431: 1055–1061.", "https://doi.org/10.1038/nature02999"),
            src("Smithsonian National Museum of Natural History, Human Origins Program. “Homo floresiensis”.", "https://humanorigins.si.edu/evidence/human-fossils/species/homo-floresiensis"),
            src("Sutikna, T., et al. (2016). Revised stratigraphy and chronology for *Homo floresiensis* at Liang Bua in Indonesia. *Nature* 532: 366–369.", "https://doi.org/10.1038/nature17179"),
            src("Brumm, A., et al. (2016). Age and context of the oldest known hominin fossils from Flores. *Nature* 534: 249–253.", "https://doi.org/10.1038/nature17663"),
          ],
        },
      ],
      sources: [
        src("Bergström, A., Stringer, C., Hajdinjak, M., Scerri, E. M. L., & Skoglund, P. (2021). Origins of modern human ancestry. *Nature* 590: 229–237.", "https://doi.org/10.1038/s41586-021-03244-5"),
        src("Iasi, L. N. M., et al. (2024). Neanderthal ancestry through time: Insights from genomes of ancient and present-day humans. *Science* 386: eadq3010.", "https://doi.org/10.1126/science.adq3010"),
        src("Prüfer, K., et al. (2017). A high-coverage Neandertal genome from Vindija Cave in Croatia. *Science* 358: 655–658. (1.8–2.6% outside Africa and Oceania.)", "https://doi.org/10.1126/science.aao1887"),
        src("Sankararaman, S., Mallick, S., Patterson, N., & Reich, D. (2016). The combined landscape of Denisovan and Neanderthal ancestry in present-day humans. *Current Biology* 26: 1241–1247. (Up to about 5% Denisovan in Oceania.)", "https://doi.org/10.1016/j.cub.2016.03.037"),
        src("Heggarty, P., et al. (2023). Language trees with sampled ancestors support a hybrid model for the origin of Indo-European languages. *Science* 381: eabg0818.", "https://doi.org/10.1126/science.abg0818"),
      ],
    },
    // ------------------------------------------------------------------ 10
    {
      kind: "stop", id: "village", number: "10", title: "Hunter-gatherers become a village", label: "settled",
      date: "from about 15,000 years ago",
      text: "In the Near East, hunter-gatherers began settling in one place from about 15,000 years ago, grinding wild grain and baking bread thousands of years before farming. Settled people could specialize, as cells did in stop 6: an analogy, not the same machinery.",
      visuals: [gallery(
        ["eynan-mortars", "Natufian stone mortars from Eynan, used to grind wild grain", "Natufian stone mortars from Eynan (Ain Mallaha), for grinding wild grain."],
        ["gobekli-f", "T-shaped stone pillars standing in a circular building at Göbekli Tepe", "Göbekli Tepe, about 11,500–10,000 years ago: monumental building by people still mostly hunting and gathering."],
      )],
      sideRoads: [
        {
          id: "earth-building", title: "Building with the ground itself: adobe pueblos and Petra", label: "settled",
          text: "Taos Pueblo, in New Mexico, is a living community of multi-storey adobe houses, built of earth mixed with water and straw; UNESCO dates the settlement to the late 13th and early 14th centuries, while its people trace their presence in the valley to time immemorial. Paquimé, in Chihuahua, Mexico, was a town of some 2,000 rooms, built mostly of adobe, that grew between 700 and 1475 and was at its height in the 14th and 15th centuries. At Petra, in Jordan, the Nabataeans also worked the ground the other way, cutting into it: Al-Khazneh, the Treasury, is a façade about 39 m high carved into the sandstone cliff, probably in the early 1st century CE, though no inscription dates it.",
          visuals: [gallery(
            ["taos-pueblo", "Multi-storey adobe houses at Taos Pueblo, stepped back in tiers, with mountains behind", "Taos Pueblo, New Mexico: houses of adobe, still lived in today."],
            ["paquime", "The excavated earth walls of Paquimé, a maze of rooms", "Paquimé, Chihuahua, Mexico: the adobe walls of a town that grew between 700 and 1475."],
            ["petra-khazneh", "Al-Khazneh at Petra: a tall columned façade cut into a rose-red cliff", "Al-Khazneh (the Treasury), Petra, Jordan: carved, not built. It appears in *Indiana Jones and the Last Crusade* (1989) as the Holy Grail's resting place."],
          )],
          sources: [
            src("UNESCO World Heritage Centre. “Taos Pueblo” (ref. 492), Brief synthesis.", "https://whc.unesco.org/en/list/492"),
            src("Taos Pueblo. “About” (adobe: earth mixed with water and straw).", "https://taospueblo.com/about/"),
            src("UNESCO World Heritage Centre. “Archaeological Zone of Paquimé, Casas Grandes” (ref. 560), Brief synthesis.", "https://whc.unesco.org/en/list/560"),
            src("UNESCO World Heritage Centre. “Petra” (ref. 326), short description and Brief synthesis.", "https://whc.unesco.org/en/list/326"),
            src("Macaulay-Lewis, E. “Petra: Rock Cut Façades”. Smarthistory, republished in *Art History I* (Lumen Learning, LibreTexts).", "https://human.libretexts.org/Bookshelves/Art/Art_History_I_(Lumen)/06%3A_The_Art_of_Ancient_Greece_II/6.14%3A_Petra-_Rock_Cut_Facades"),
          ],
        },
      ],
      sources: [
        src("Richter, T., et al. (2017). High resolution AMS dates from Shubayqa 1, northeast Jordan reveal complex origins of Late Epipalaeolithic Natufian in the Levant. *Scientific Reports* 7: 17025.", "https://doi.org/10.1038/s41598-017-17096-5"),
        src("Arranz-Otaegui, A., et al. (2018). Archaeobotanical evidence reveals the origins of bread 14,400 years ago in northeastern Jordan. *PNAS* 115(31): 7925–7930.", "https://doi.org/10.1073/pnas.1801071115"),
        src("Clare, L. (2020). Göbekli Tepe, Turkey. A brief summary of research at a new World Heritage Site (2015–2019). *e-Forschungsberichte des DAI* 2020(2).", "https://doi.org/10.34780/efb.v0i2.1012"),
        book("ch. 16, on culture described with biology's words but not its machinery"),
      ],
    },
    // ------------------------------------------------------------------ 10.1
    {
      kind: "stop", id: "circles", number: "10.1", title: "Circles: rings that grow, and rings people built", label: "settled",
      date: "from about 5,000 years ago",
      text: "A tree adds a growth ring each year, and a fairy ring is a fungus spreading outward underground, its mushrooms fruiting at the edge. People built rings too: Stonehenge began about 3000 BCE as a circular ditch, five centuries before its stones; the Greek theatre at Epidaurus, from the 4th century BCE, wraps its seats round a circular floor; and Rome's Colosseum, opened in 80 CE, is a closed oval.",
      visuals: [
        { type: "anim", id: "rings", caption: "The ring widths here are invented: in a real trunk, each ring's width records that year's water, temperature, and competition." },
        pic("redwood-plaques", "A slab of redwood trunk, its fine rings crossed by a crack, with small dated plaques fixed along them",
          "A real trunk: a redwood felled in 1934, in Henry Cowell Redwoods State Park, California, with plaques the park fixed to its rings."),
        gallery(
          ["fairy-ring", "A wide ring of pale mushrooms on a lawn", "A fairy ring in Houston, Texas: mushrooms at the edge of a fungus spreading underground. Why it grows as a ring and not a disc is still being studied."],
          ["stonehenge", "Stonehenge: a ring of standing stones capped with lintels, on grass", "Stonehenge: a circular ditch about 3000 BCE, the stones set up about 2500 BCE."],
          ["avebury-aerial", "Avebury from the air: a great ring of bank and ditch round fields, standing stones, and a village", "Avebury from the air: the largest prehistoric stone circle in the world, with a village inside its ring."],
          ["epidaurus-theatre", "The ancient theatre at Epidaurus: a bowl of stone seats round a circular floor, open on one side", "The theatre at Epidaurus, 4th century BCE: a Greek theatre, open on one side."],
          ["colosseum", "The Colosseum at dusk, its curved outer wall of stacked arches lit from inside", "The Colosseum, Rome, opened in 80 CE: a Roman amphitheatre, a closed oval."],
          ["lincoln-financial-field", "Lincoln Financial Field from the upper deck: tiers of green seats curving round an American football field, EAGLES painted in its end zones",
            "Lincoln Financial Field, Philadelphia, opened in 2003: the amphitheatre's bowl, grown to seat over 69,000 round the pitch."],
          ["berlin-philharmonie", "Inside the Berlin Philharmonie's concert hall: beyond the stage's empty chairs, music stands, and drums, terraces of seats rise ahead and to both sides; standing concert-goers fill the right of the frame",
            "The Berlin Philharmonie, seen from the smaller arc of seats behind the orchestra: the theatre's bowl come indoors. David Geffen Hall at Lincoln Center, New York, rebuilt inside and reopened in 2022, also has seats behind its orchestra; we found no open-licensed photograph of it."],
        ),
      ],
      sideRoads: [],
      sources: [
        book("ch. 11, on tree rings"),
        src("Intermountain Herbarium, Utah State University. “Fairy Rings” (Fun facts about fungi).", "https://artsci.usu.edu/herbarium/activities_fun-stuff/fun-facts-about-fungi/fairy-rings"),
        src("Olsson, B., Thorén, M. H., Eriksson, O., & Johannesson, H. (2026). Spatial structure and growth dynamics of fairy rings formed by *Marasmius oreades*. *Royal Society Open Science* 13(8): 260575.", "https://doi.org/10.1098/rsos.260575"),
        src("English Heritage. “History of Stonehenge”.", "https://www.english-heritage.org.uk/visit/places/stonehenge/history-and-stories/history/"),
        src("UNESCO World Heritage Centre. “Stonehenge, Avebury and Associated Sites” (ref. 373), Brief synthesis.", "https://whc.unesco.org/en/list/373"),
        src("UNESCO World Heritage Centre. “Sanctuary of Asklepios at Epidaurus” (ref. 491), short description and Brief synthesis.", "https://whc.unesco.org/en/list/491"),
        src("Cartwright, M. (2018, 29 May). Colosseum. *World History Encyclopedia*.", "https://www.worldhistory.org/colosseum/"),
        src("Philadelphia Eagles. “The World Cup is coming to Lincoln Financial Field!” (The stadium first opened to the public on 3 August 2003.)", "https://www.philadelphiaeagles.com/news/world-cup-fifa-philadelphia-lincoln-financial-field"),
        src("Philadelphia Eagles, careers page. (Lincoln Financial Field “boasts a seating capacity of over 69,000”.)", "https://www.philadelphiaeagles.com/careers/employment-opportunities"),
        src("Lunden, J. (2022, 7 October). Stripped to the bones: Why a new NYC concert hall sounds so much better. *NPR*. (David Geffen Hall “opens this week”; its seats “envelop the orchestra”, and “there are even seats behind it”.)", "https://www.npr.org/sections/deceptivecadence/2022/10/07/1126599633/new-york-philharmonic-david-geffen-hall-classical-music-concerts-acoustics"),
        src("Klack, G. (2024, 19 May). Berliner Philharmonie, Berlin (photograph). Wikimedia Commons.", "https://commons.wikimedia.org/wiki/File:2024-05-19-Berliner-Philharmonie.jpg"),
      ],
    },
    // ------------------------------------------------------------------ 10.2
    {
      kind: "stop", id: "pyramids", number: "10.2", title: "Pyramids: the same heap on four continents", label: "settled",
      date: "about 5,000 to 1,200 years ago",
      text: "From Caral in Peru, a city about 5,000 years old, to Borobudur on Java, built in the 8th and 9th centuries CE, people on four continents built pyramids for different ends: royal tombs in Egypt and Nubia, platforms for a temple in Mesopotamia and Mesoamerica, and on Java a Buddhist stupa built in terraces round a hill. Those of the Americas were not copied from Egypt's: in the Maya area, monumental building began with earthen platforms about 1000 BCE, and Caral is older still.",
      visuals: [
        { type: "anim", id: "pyramids", caption: "Our drawing, not to scale: four shapes, with one example of each." },
        gallery(
          ["saqqara-step", "Djoser's step pyramid at Saqqara: six stacked stone tiers, with a camel resting in front", "Djoser's step pyramid, Saqqara, Egypt, about 2670 BCE: six stacked tiers, and Egypt's first pyramid."],
          ["giza-pyramids", "The three pyramids of Giza in the desert, with smaller pyramids in front", "Giza, Egypt. The Great Pyramid, built for Khufu about 2560 BCE, was the tallest structure in the world for 3,800 years."],
          ["teotihuacan-sun", "The Pyramid of the Sun at Teotihuacan: broad sloping tiers rising to a flat top", "The Pyramid of the Sun, Teotihuacan, Mexico, about 200 CE."],
          ["borobudur", "Borobudur from the air: square terraces rising to round terraces of small stupas and a large stupa at the top", "Borobudur, Java, 8th and 9th centuries CE: a Buddhist stupa built in terraces round a hill."],
          ["ur-ziggurat", "The ziggurat of Ur: a massive mud-brick platform with long stairways up its front", "The ziggurat of Ur, Iraq, about 2100 BCE: a mud-brick temple platform, its front restored."],
          ["meroe-pyramids", "A steep, narrow stone pyramid behind a small gateway, at Meroë in the desert", "Meroë, Sudan: from the 3rd century BCE, most royal burials of the Kingdom of Kush were here, under pyramids."],
          ["caral-pyramid", "A ruined stepped platform of stone and earth under a grey sky at Caral", "A pyramid platform at Caral, Peru. UNESCO calls the 5,000-year-old city the oldest centre of civilization in the Americas."],
        ),
      ],
      sideRoads: [],
      sources: [
        src("Egypt's Ministry of Tourism and Antiquities. “The Step Pyramid Complex of Djoser”.", "https://egymonuments.gov.eg/en/monuments/the-step-pyramid-complex-of-djoser/"),
        src("Egypt's Ministry of Tourism and Antiquities. “Old Kingdom”.", "https://egymonuments.gov.eg/en/historical-periods/old-kingdom"),
        src("UNESCO World Heritage Centre. “Memphis and its Necropolis – the Pyramid Fields from Giza to Dahshur” (ref. 86), Brief synthesis.", "https://whc.unesco.org/en/list/86"),
        src("World History Encyclopedia. “Great Ziggurat of Ur” (image page).", "https://www.worldhistory.org/image/197/great-ziggurat-of-ur/"),
        src("UNESCO World Heritage Centre. “The Ahwar of Southern Iraq” (ref. 1481).", "https://whc.unesco.org/en/list/1481"),
        src("UNESCO World Heritage Centre. “Archaeological Sites of the Island of Meroe” (ref. 1336).", "https://whc.unesco.org/en/list/1336"),
        src("UNESCO World Heritage Centre. “Pre-Hispanic City of Teotihuacan” (ref. 414).", "https://whc.unesco.org/en/list/414"),
        src("Sugiyama, N., Sugiyama, S., & Sarabia G., A. (2013). Inside the Sun Pyramid at Teotihuacan, Mexico: 2008–2011 Excavations and Preliminary Results. *Latin American Antiquity* 24(4): 403–432.", "https://doi.org/10.7183/1045-6635.24.4.403"),
        src("UNESCO World Heritage Centre. “Borobudur Temple Compounds” (ref. 592).", "https://whc.unesco.org/en/list/592"),
        src("UNESCO World Heritage Centre. “Sacred City of Caral-Supe” (ref. 1269).", "https://whc.unesco.org/en/list/1269"),
        src("Inomata, T., Triadan, D., Vázquez López, V. A., Fernandez-Diaz, J. C., Omori, T., Méndez Bauer, M. B., García Hernández, M., Beach, T., Cagnato, C., Aoyama, K., & Nasu, H. (2020). Monumental architecture at Aguada Fénix and the rise of Maya civilization. *Nature* 582(7813): 530–533.", "https://doi.org/10.1038/s41586-020-2343-4"),
      ],
    },
    // ------------------------------------------------------------------ 11
    {
      kind: "stop", id: "early-art", number: "11", title: "Early art: spirals, and other patterns people matched", label: "settled",
      text: "Spirals grow in nature, as in a fern's unrolling frond, and people have carved them for over 5,000 years: at Newgrange in Ireland, built around 3100 BCE, long before Celtic art. Greeks ran meanders round their pots; in the Caribbean, the Taíno carved faces and spirals into rock.",
      visuals: [
        { ...vid("zNtSAQHNONo"), caption: "An orb spider builds its web, in time-lapse: after the frame and spokes, a widely spaced temporary spiral from the hub outwards, then the closely spaced sticky spiral from the edge inwards, guided by the first, which the spider rolls up as it goes." },
        gallery(
          ["fern", "A fern frond unrolling in a tight spiral", "A fern unrolling: a growth spiral."],
          ["newgrange-entrance", "Newgrange's entrance stone, carved with spirals and lozenges", "Newgrange's entrance stone, about 3100 BCE: spirals beside lozenges."],
          ["newgrange-triskele", "A triple spiral carved on a stone inside Newgrange", "The triple spiral inside the chamber that the winter-solstice sun reaches."],
          ["taino-piedra-escrita", "Taíno rock carvings of faces and spirals at La Piedra Escrita, Puerto Rico", "Taíno petroglyphs at La Piedra Escrita, Jayuya, Puerto Rico."],
          ["jayuya-arms", "The coat of arms of Jayuya, with a sun face in its lower field", "The Sol de Jayuya on the town's coat of arms: a modern emblem, based on a reported Taíno carving."],
          ["greek-krater", "A Greek pottery krater with a running meander band at its rim", "A Greek krater, about 750–735 BCE, with a meander round the rim."],
          ["syracuse-coin", "A silver coin of Syracuse with three running legs around a face", "A triskeles of three running legs, on a coin of Syracuse, about 317 BCE."],
          ["battersea-shield", "The Battersea Shield, a bronze shield decorated with curving spirals", "The Battersea Shield, Iron Age Britain: La Tène (“Celtic”) spirals."],
        ),
        vid("Gl9_mi6Nj0c"),
      ],
      sideRoads: [
        {
          id: "spiral-shapes", title: "The same spiral in a flagellum, a nautilus, and a roller coaster", label: "analogy",
          text: "A bacterial flagellum is a helix turned by a rotary motor; a nautilus shell is a spiral grown by adding a little at its edge; a roller coaster's corkscrew is engineered. Same shape, three causes with nothing in common. DNA is a helix too, though its twist comes from stacked base pairs, not a motor; a conch and a ram's horn (blown as a shofar) are spirals grown by adding to one end, as the nautilus is. And the nautilus is not a golden-ratio spiral: measured shells come out near 1.3, not 1.618.",
          visuals: [
            gallery(
              ["flagellum", "Diagram of a bacterial flagellum: a motor in the cell wall, a hook, and a long helical filament"],
              ["dna-helix", "An illustration of a DNA double helix: two gold strands winding round each other, joined by coloured rungs", "DNA, drawn: the rungs are pairs of bases, stacked with a slight twist."],
              ["corkscrew", "Roller-coaster cars upside down in a corkscrew turn"],
              ["nautilus-log", "A cut nautilus shell with a fitted logarithmic spiral drawn over it", "A logarithmic spiral fits the shell."],
              ["nautilus-golden", "The same nautilus shell with a golden spiral drawn over it, visibly not fitting", "A golden spiral doesn't."],
              ["conch-spire", "A queen conch shell seen from its tip: the whorls wind outwards in a spiral, each larger than the one before", "A queen conch from its tip: each whorl larger than the one before."],
              ["bighorn-ram", "A live bighorn ram in low sunlight, its ridged horn curling round in an open spiral beside its face", "A bighorn sheep ram: its horn grows from the base, as a shell grows at its lip."],
              ["shofar", "A shofar: a ram's horn, ridged and curving, with a polished mouthpiece at its narrow end", "A shofar, a ram's horn blown in Jewish ritual."],
            ),
            vid("x7RH23IH1BQ"),
          ],
          sources: [
            book("ch. 10, on spirals"),
            book("ch. 10, on helices and growth spirals"),
            src("Bartlett, C. (2019). Nautilus Spirals and the Meta-Golden Ratio Chi. *Nexus Network Journal* 21(3): 641–656.", "https://doi.org/10.1007/s00004-018-0419-3"),
            src("American Coaster Enthusiasts. “Coaster Landmark: Corkscrew”.", "https://www.ridewithace.com/coasters/cstr-lndmrk-corkscrew"),
            src("San Diego Zoo Global. Bighorn sheep fact sheet, “Characteristics” (a horn's keratin sheath grows from the base), as reproduced in the IELC library guide.", "https://ielc.libguides.com/sdzg/factsheets/bighornsheep/characteristics"),
          ],
        },
        {
          id: "gunpowder", title: "Chinese alchemists and gunpowder: “fire medicine”", label: "settled",
          text: "Chinese alchemists heated minerals in search of elixirs of long life. A ninth-century text warns elixir-makers against heating sulfur, realgar, and saltpetre with honey: a weak gunpowder. The Chinese word for gunpowder, *huoyao*, still means “fire medicine”.",
          visuals: [pic("wujing-zongyao", "A page of Chinese text giving a gunpowder formula", "From the *Wujing zongyao* (compiled 1040–1044), in a later printing.")],
          sources: [alchemy("the primer, on alchemy and gunpowder (with its sources)")],
        },
        {
          id: "variolation", title: "Smallpox variolation", label: "settled",
          text: "Before vaccines, people protected children from smallpox by giving them a small, deliberate dose of it. The first written account is Chinese, from 1549; the practice was also old in North Africa and the Ottoman Empire, where Lady Mary Wortley Montagu had her son inoculated. Onesimus, an enslaved African man, had told Cotton Mather how it was done; in Boston's 1721 epidemic, of 280 people inoculated, 6 died, against 844 deaths among 5,759 who caught smallpox naturally.",
          visuals: [gallery(
            ["golden-mirror-pox", "An 18th-century Chinese medical illustration of a child with smallpox", "From an 18th-century Chinese medical book."],
            ["montagu", "Lady Mary Wortley Montagu with her son in Constantinople", "Lady Mary Wortley Montagu and her son, Constantinople, about 1717."],
          ), vid("yYUt3Y1zMk4")],
          sources: [
            src("Boylston, A. (2012). The origins of inoculation. *Journal of the Royal Society of Medicine* 105(7): 309–313.", "https://doi.org/10.1258/jrsm.2012.12k044"),
            src("Boylston, Z. (1726). *An historical account of the small-pox inoculated in New England*. London: S. Chandler.", "https://archive.org/details/b30541608"),
            src("Mather, C. (1721). *Some account of what is said of inoculating or transplanting the small pox*. Boston: S. Gerrish.", "https://archive.org/details/2562061R.nlm.nih.gov"),
          ],
        },
      ],
      sources: [
        book("ch. 10, on Newgrange and spirals in nature"),
        book("ch. 10, on spider webs and spiral staircases"),
        src("Australian Museum. “Spider webs”.", "https://australian.museum/learn/animals/spiders/spider-webs/"),
        src("Zschokke, S. (2011). Spiral and web asymmetry in the orb webs of *Araneus diadematus* (Araneae: Araneidae). *Journal of Arachnology* 39(2): 358–362.", "https://doi.org/10.1636/CB10-61.1"),
        src("Puerto Rico State Historic Preservation Office. *Información Arqueológica del Municipio de Jayuya* (the Zamas petroglyph site).", "https://docs.pr.gov/files/OECH/"),
        src("The Metropolitan Museum of Art, collection record 14.130.14 (terracotta krater).", "https://www.metmuseum.org/art/collection/search/248904"),
      ],
    },
    // ------------------------------------------------------------------ 11.5
    {
      kind: "stop", id: "hexagons", number: "11.5", title: "Ways to fill space with shapes", label: "own",
      text: "At the back of Newgrange, one carved stone sets spirals above a lattice of lozenges: read as growth from a centre and tiling to the edge, the two ways a bounded space gets filled. Nature finds the hexagon (the least wall for equal cells, as Hales proved) in honeycomb, though how bees make it is still argued, and in the Causeway's cracked basalt, mostly six-sided. The heated pan at stop 1.2 makes cells, often six-sided, for as long as the heat flows. People fill space in other ways: hedge mazes that branch, like the dish's maze at stop 3; labyrinths of one path, some about four thousand years old, some much younger; and tatau and mehndi, patterns worn on skin.",
      visuals: [
        gallery(
          ["newgrange-k52", "A long carved kerbstone at the foot of Newgrange's stone wall: spirals at upper left, a lattice of lozenges beneath them, and arcs, circles, and cup-marks on the right", "The stone at the back of Newgrange, kerbstone 52: spirals above, a lattice of lozenges beneath."],
          ["honeycomb", "A torn slab of honeycomb, close up: rows of six-sided wax cells and a few bees, and below them the flat, hexagon-embossed foundation sheet the comb was built on", "Honeycomb on a beekeeper's foundation sheet, whose embossed hexagons set the plan; the walls are the bees' own."],
          ["causeway-tops", "The weathered tops of basalt columns seen from above, fitted together like paving, with grass in the joints", "The tops of the Causeway's columns from above: weathered polygons, not all of them six-sided (cropped)."],
          ["causeway-columns", "The Giant's Causeway: tightly packed basalt columns stepping down to a rough sea, with cliffs of columns behind", "The Giant's Causeway, Northern Ireland. As the cracks grew inwards through the cooling lava, the corners where three cracks met shifted from right angles towards 120°, a hexagon's angle."],
          ["glendurgan-maze", "A hedge maze of clipped laurel on a valley slope, seen from above, its curving paths readable, with a thatched shelter among the hedges", "A maze, which branches: Glendurgan's cherry laurel maze in Cornwall, planted in 1833, seen from above."],
          ["hampton-court-maze-plan", "A plan of the Hampton Court maze: a trapezoid of green hedges, its white paths winding to an open space in the middle", "A plan of Hampton Court's maze, the oldest surviving hedge maze, planted for William III around 1690–1700."],
          ["mogor-labyrinth", "A labyrinth-like carving at Mogor, Galicia: concentric curved grooves in a weathered rock, round a small cup mark", "Mogor, Galicia: labyrinth-like rather than a perfect labyrinth. Galicia's labyrinths, dated by the rock art beside them to about 2500–1800 BCE, may be the oldest known."],
          ["naquane-labyrinth", "A labyrinth carved into a smooth, cracked grey rock face at Naquane, Val Camonica, beside other small carved figures", "Naquane, Val Camonica, Italy: a labyrinth beside other carvings, probably early Iron Age, about 750–500 BCE (cropped)."],
          ["rocky-valley-labyrinth", "A labyrinth carved into a rock face in Rocky Valley, Cornwall: one path winding round in seven rings to a centre", "Rocky Valley, Cornwall: the classical labyrinth, one path and no choices. Often called Bronze Age, it was probably carved in the 18th century CE."],
          ["samoan-malu", "A drawing of the malu, the Sāmoan women's tatau: columns of small geometric motifs down the thighs and a motif above, on an outline of the hips and legs", "Sāmoan tatau: the malu, the women's tattoo, from a German colonial-era record of 1899 (the uploader's legend and the numbered pointers removed). Most tufuga, tattoo artists, follow one structure; the detail within it is each artist's own."],
          ["mehndi-hands", "Two hands with fresh henna paste: a fine lattice of diamonds across the palms and wrists, spirals on the fingers, and a dotted, scalloped edge", "Mehndi, the paste still on: a lattice of diamonds beside spirals, as on the Newgrange stone. Henna is used in many places, among them Morocco, Sudan, India, and Singapore, often for weddings and festivals."],
        ),
      ],
      sideRoads: [],
      sources: [
        book("ch. 10, on Newgrange's back stone and the two ways a bounded space gets filled"),
        book("ch. 4, on hexagonal convection cells"),
        src("Hales, T. C. (2001). The Honeycomb Conjecture. *Discrete & Computational Geometry* 25(1): 1–22.", "https://doi.org/10.1007/s004540010071"),
        src("Karihaloo, B. L., Zhang, K., & Wang, J. (2013). Honeybee combs: how the circular cells transform into rounded hexagons. *Journal of the Royal Society Interface* 10(86): 20130299.", "https://doi.org/10.1098/rsif.2013.0299"),
        src("Bauer, D., & Bienefeld, K. (2013). Hexagonal comb cells of honeybees are not produced via a liquid equilibrium process. *Naturwissenschaften* 100(1): 45–49.", "https://doi.org/10.1007/s00114-012-0992-3"),
        src("UNESCO World Heritage Centre. “Giant's Causeway and Causeway Coast” (ref. 369), short description and Brief synthesis.", "https://whc.unesco.org/en/list/369"),
        src("Goehring, L., Mahadevan, L., & Morris, S. W. (2009). Nonequilibrium scale selection mechanism for columnar jointing. *PNAS* 106(2): 387–392.", "https://doi.org/10.1073/pnas.0805132106"),
        src("Hofmann, M., Anderssohn, R., Bahr, H.-A., Weiß, H.-J., & Nellesen, J. (2015). Why Hexagonal Basalt Columns? *Physical Review Letters* 115(15): 154301.", "https://doi.org/10.1103/PhysRevLett.115.154301"),
        src("The Discovery Programme (2014). Kerbstone 52, Newgrange: 3D model and description. Sketchfab.", "https://sketchfab.com/3d-models/stone-52-newgrange-56659e39771945da85ea6fbb7b063a78"),
        src("Guinness World Records. “Oldest hedge maze”.", "https://www.guinnessworldrecords.com/world-records/66467-oldest-maze-hedge-maze"),
        src("Historic Royal Palaces. “The Maze”, Hampton Court Palace.", "https://www.hrp.org.uk/hampton-court-palace/whats-on/the-maze/", false),
        src("National Trust. “Glendurgan Garden”.", "https://www.nationaltrust.org.uk/visit/cornwall/glendurgan-garden"),
        src("Saward, J. (2017). *The First Labyrinths*. Labyrinthos Archive (reprint).", "https://labyrinthos.net/First%20Labyrinths.pdf"),
        src("Museum of New Zealand Te Papa Tongarewa, Collections Online. “Sāmoan tatau (tattooing)”.", "https://collections.tepapa.govt.nz/topic/1560"),
        src("National Heritage Board, Singapore. Roots.sg, Intangible Cultural Heritage inventory, “Henna” (ICH-106).", "https://www.roots.gov.sg/ich-landing/ich/Henna"),
        src("Australian Museum. “Henna”, Body Art exhibition pages.", "https://australian.museum/about/history/exhibitions/body-art/henna/"),
      ],
    },
    // ------------------------------------------------------------------ 11.6
    {
      kind: "stop", id: "three-d", number: "11.6", title: "3D constraints", label: "settled",
      text: "Hexagons tile a flat page but can never close round a ball: each pentagon puckers the sheet a little, and Euler's count of corners, edges, and faces says closing it takes exactly twelve pentagons. The 1970 Telstar football, the molecule C₆₀, and many virus shells close with twelve pentagons among their hexagons; C₆₀ is named after Buckminster Fuller, whose geodesic domes are nets of triangles: where one closes, the same rule holds.",
      visuals: [
        gallery(
          ["telstar-1970", "A black-and-white football in a display case: black pentagons among white hexagons, printed in gold for the 1970 World Cup in Mexico", "A Telstar marked for the 1970 World Cup: 12 black pentagons and 20 white hexagons, made to stand out on black-and-white television. The name is short for “television star”."],
          ["c60-model", "A ball-and-stick model of C60, buckminsterfullerene: sixty carbon atoms joined in rings of five and six", "A model of C₆₀: 60 carbon atoms, 12 pentagons, and 20 hexagons. Its finders likened it to a football in 1985 and named it after Buckminster Fuller and his geodesic domes."],
          ["biosphere-montreal", "The Biosphère in Montreal at dusk: a steel geodesic dome, a net of triangles, rising above bare trees, with the moon beside it", "The Biosphère, Montreal: Buckminster Fuller's geodesic dome for Expo 67, a steel net of triangles 76 m wide and 62 m tall, so not a whole sphere. The city has run it as a museum since 2021."],
          ["spaceship-earth", "Spaceship Earth at Epcot: a huge sphere clad in silver triangular facets, raised on legs above a plaza with visitors", "Spaceship Earth, Epcot, opened in 1982: a sphere of triangles, 165 feet (about 50 m) across; where it closes, the same rule holds."],
          ["tbsv-capsid", "A computer rendering of the protein shell of tomato bushy stunt virus: groups of five proteins in orange at the corners, groups of six in blue and green between them", "The shell of tomato bushy stunt virus, drawn from its Protein Data Bank structure (2TBV): 180 copies of one protein, twelve groups of five at the corners and twenty groups of six between."],
          ["phage-micrograph", "Detail of an electron micrograph: bacteriophage heads with flat faces and angular outlines, attached to the edge of a bacterium", "Bacteriophages on a bacterium (detail), in an electron micrograph, not a drawing. Each head is a protein shell with flat faces and five-fold corners, the same kind of shell as the capsid beside it."],
          ["t4-model", "A structural model of bacteriophage T4, in detail: the head, a net of hexamers and pentamers studded with fibres, and the top of the tail", "Bacteriophage T4, a model built from the solved structures, not a photograph (detail: head and upper tail). Its head is a stretched icosahedron, hexamers on the faces and pentamers at the corners; the tail is the syringe that injects the phage's DNA."],
        ),
      ],
      sideRoads: [],
      sources: [
        src("Fernique, T. (2026). Telstar Balls Gone Wild. arXiv:2606.28415 (section 2.1, “Twelve pentagons”).", "https://arxiv.org/abs/2606.28415"),
        src("adidas Group. “How adidas Has Shaped the History of World Cup Balls from 1970 to the Present Day”.", "https://www.adidas-group.com/en/magazine/innovation/how-adidas-has-shaped-the-history-of-world-cup-balls-from-1970-to-the-present-day"),
        src("FIFA (2020). “The adidas Telstar begins ball chain”. inside.fifa.com, 31 May 2020.", "https://inside.fifa.com/news/telstar-story-fifa-world-cup-ball-3073424"),
        src("Kroto, H. W., Heath, J. R., O'Brien, S. C., Curl, R. F., & Smalley, R. E. (1985). C60: Buckminsterfullerene. *Nature* 318(6042): 162–163.", "https://doi.org/10.1038/318162a0"),
        src("The Royal Swedish Academy of Sciences (1996). Press release: the Nobel Prize in Chemistry 1996.", "https://www.nobelprize.org/prizes/chemistry/1996/press-release/"),
        src("Noakes, T. C. (2021). Montreal Biosphere. *The Canadian Encyclopedia*, Historica Canada.", "https://www.thecanadianencyclopedia.ca/en/article/montreal-biosphere"),
        src("D23, The Walt Disney Company. Disney A to Z, “Spaceship Earth”.", "https://d23.com/a-to-z/spaceship-earth/"),
        src("Caspar, D. L. D., & Klug, A. (1962). Physical Principles in the Construction of Regular Viruses. *Cold Spring Harbor Symposia on Quantitative Biology* 27: 1–24.", "https://doi.org/10.1101/SQB.1962.027.001.005", false),
        src("RCSB Protein Data Bank, PDB-101. “Quasisymmetry in Icosahedral Viruses”, Structural Biology Highlights.", "https://pdb101.rcsb.org/learn/structural-biology-highlights/quasisymmetry-in-icosahedral-viruses"),
        src("Klug, A. (1982). From Macromolecules to Biological Assemblies. Nobel Lecture, 8 December 1982.", "https://www.nobelprize.org/uploads/2018/06/klug-lecture.pdf"),
        src("Twarock, R., & Luque, A. (2019). Structural puzzles in virology solved with an overarching icosahedral design principle. *Nature Communications* 10: 4414.", "https://doi.org/10.1038/s41467-019-12367-3"),
        src("Fokine, A., Chipman, P. R., Leiman, P. G., Mesyanzhinov, V. V., Rao, V. B., & Rossmann, M. G. (2004). Molecular architecture of the prolate head of bacteriophage T4. *PNAS* 101(16): 6003–6008.", "https://pubmed.ncbi.nlm.nih.gov/15071181/"),
      ],
    },
    // ------------------------------------------------------------------ 12
    {
      kind: "stop", id: "later-art", number: "12", title: "Later art: *The Starry Night*, and art imitating nature", label: "settled",
      text: "Van Gogh painted *The Starry Night* in June 1889 from his window at Saint-Rémy; its great swirl may echo Lord Rosse's 1845 drawing of a spiral galaxy. Across the world and its faiths, art keeps returning to the same few shapes: rings, spirals, stars, and interlace. Each is simple, but repeated and made intricate, it fills a whole surface: the mandalas, the Kells page, the girih in the side road below, and, at stops 11.5 and 3, the mehndi and the dish's maze.",
      visuals: [
        pic("starry-night", "Van Gogh's The Starry Night: a swirling night sky over a village"),
        pic("m51-sketch", "Lord Rosse's 1845 drawing of the Whirlpool galaxy, a spiral of stars", "Lord Rosse's drawing of the Whirlpool galaxy, 1845."),
        vid("fOn-zhqpQGM"),
        gallery(
          ["peru-tunic", "A woven tunic covered in bold stepped spirals", "Man's tunic, Central Coast of Peru, 1000–1476: stepped spirals."],
          ["wari-tunic", "A tapestry tunic with columns of curling motifs", "Tapestry tunic, Wari, Peru, 7th–9th century."],
          ["kuba-overskirt", "A raffia overskirt covered in interlocking geometric patterns", "Ceremonial overskirt, Kuba peoples, DR Congo, about 1900."],
          ["chakrasamvara", "A painted Buddhist mandala of circles and squares", "Buddhist: Chakrasamvara mandala, Nepal, about 1100."],
          ["surya-mandala", "A painted mandala with the Hindu sun god Surya at its centre", "Hindu: mandala of the sun god Surya, Nepal, likely 1379."],
          ["chi-rho", "The Chi Rho page of the Book of Kells, dense with spirals and knotwork", "Christian: the Chi Rho page of the Book of Kells, about 800."],
          ["leningrad-codex", "A manuscript page with a star in a square, drawn in tiny Hebrew letters", "Jewish: a carpet page of the Leningrad Codex, its lines made of Hebrew letters."],
          ["jain-map", "A Jain map of the world as concentric rings of land and ocean", "Jain: the two and a half continents where humans live, India, 1900."],
          ["daoist-robe", "A Daoist priest's robe embroidered with the Eight Trigrams", "Daoist: a priest's robe with the Eight Trigrams, China, 19th century."],
          ["urnes", "Carved wooden panels of looping, interlaced animals at Urnes stave church", "Norse: the Urnes stave church portal, Norway, 11th century."],
        ),
      ],
      sideRoads: [
        {
          id: "islamic-geometry", title: "Islamic geometric patterns", label: "argued",
          text: "Medieval Islamic artists built star-and-polygon patterns (girih) of astonishing regularity. In 2007 two physicists argued that a shrine in Isfahan, built in 1453, has patterns almost like Penrose tilings, ordered but never repeating. Others argue the pattern repeats after all.",
          visuals: [pic("darb-e-imam", "A ten-pointed star panel of tilework at the Darb-e Imam shrine in Isfahan"), vid("6AJx8IVcL_c")],
          sources: [
            src("Lu, P. J., & Steinhardt, P. J. (2007). Decagonal and Quasi-Crystalline Tilings in Medieval Islamic Architecture. *Science* 315(5815): 1106–1110.", "https://doi.org/10.1126/science.1135491"),
            src("Makovicky, E. (2007). Comment on “Decagonal and Quasi-Crystalline Tilings in Medieval Islamic Architecture”. *Science* 318(5855): 1383.", "https://doi.org/10.1126/science.1146262"),
            src("Ball, P. (2007). Islamic tiles reveal sophisticated maths. *Nature* news.", "https://www.nature.com/news/2007/070219/full/news070219-9.html"),
          ],
        },
        {
          id: "kinetic", title: "Art that moves by physics", label: "analogy",
          text: "Since 1990 Theo Jansen has built wind-driven “beach animals” from plastic pipe that walk rather than roll. He calls their development evolution; the evolving happens in his workshop, not in the beasts themselves.",
          visuals: [vid("C97kMKwZ2-g")],
          sources: [src("Ashworth, W. B., Jr. (2024). Theo Jansen. *Scientist of the Day*, Linda Hall Library.", "https://lindahall.org/about/news/scientist-of-the-day/theo-jansen")],
        },
        {
          id: "walkable-spirals", title: "Spirals you can walk: the Round Tower and the staircase", label: "settled",
          text: "Christian IV had Copenhagen's Round Tower, the Rundetaarn, built in 1637–1642 so that astronomers from the University of Copenhagen could study the sky. The way up is a ramp, not stairs: it winds 7½ times round the tower's hollow core, 281 m long along the outer wall and 93.5 m along the inner, and only a short staircase at the top finishes the climb. Ramp or staircase, it is the books' kind of spiral: extension that keeps a fixed relationship to where it has already been, each turn directly above the last.",
          visuals: [gallery(
            ["round-tower-ramp", "Inside the Round Tower: a brick-paved ramp curving up round a white central core, lit by arched windows", "Inside the Round Tower, Copenhagen: the ramp curving round the core."],
            ["momo-staircase", "Looking down a spiral stair at the Vatican Museums: broad, shallow steps winding down inside an ornate metal balustrade, with visitors on them", "Giuseppe Momo's stair at the Vatican Museums, 1929–1932: a double helix, two ramps winding round each other."],
          )],
          sources: [
            book("ch. 10, on spider webs and spiral staircases"),
            src("Rundetaarn. “The Observatory”.", "https://www.rundetaarn.dk/en/intro/the-observatory/"),
            src("VisitCopenhagen (Wonderful Copenhagen). “Rundetårn”.", "https://www.visitcopenhagen.com/copenhagen/planning/rundetarn-gdk410741"),
            src("Rundetaarn. “The Spiral Ramp”.", "https://www.rundetaarn.dk/en/intro/the-spiral-ramp/"),
            src("Rundetaarn. “Measure and Weight”.", "https://www.rundetaarn.dk/en/article/measure-and-weight/"),
            src("Di Paola, F., & Pedone, P. (2016). Genesi geometrica della scala di Momo ai Musei Vaticani. *Environmental and Territorial Security*, IEMEST (invited paper).", "https://www.iemest.eu/life-safety-and-security/images/Doc/ARTICOLI/2016/dipaola_26/FrancescoDiPaola01.pdf"),
          ],
        },
      ],
      sources: [
        book("ch. 10, on *The Starry Night*"),
        src("The Metropolitan Museum of Art, Open Access collection records (dates and places of the pieces shown).", "https://www.metmuseum.org/art/collection"),
      ],
    },
    // ------------------------------------------------------------------ 13
    {
      kind: "stop", id: "memes", number: "13", title: "Memes: Lisztomania", label: "settled", date: "1840s",
      text: "A meme, in Richard Dawkins's 1976 word, is a tune, a catchphrase, or a fashion copied from mind to mind. In 1844 the poet Heinrich Heine wrote about “Lisztomania”, the frenzy around Franz Liszt's concerts, half mocking it.",
      visuals: [pic("liszt-hosemann", "A caricature of Liszt at the piano before a swooning concert audience", "Theodor Hosemann's caricature of a Liszt concert, 1842."), vid("3sjCA8OPobw")],
      sideRoads: [],
      sources: [
        book("ch. 15, on memes"),
        src("Heine, H. “The Musical Season of 1844, First Paper” (25 April 1844). In *The Works of Heinrich Heine*, Vol. IV, trans. C. G. Leland (1893), pp. 416–418.", "https://archive.org/details/worksofheinrichh04heinuoft"),
      ],
    },
    // ------------------------------------------------------------------ 14
    {
      kind: "stop", id: "jungle", number: "14", title: "Jungle: fusion and remixing", label: "settled", date: "early 1990s",
      text: "In early-1990s Britain, producers dug out old drum breaks, the Amen break most of all, and built fast new music on them: jungle. It was made by remixing what came before, which is how a lot of culture grows. The books' licence says the same: “Share it, remix it, build on it, sell it — credit the source and release derivative work under the same terms.”",
      visuals: [vid("3jiSv64rtPw")],
      sideRoads: [],
      sources: [
        src("Otzen, E. (2015, 29 March). Six seconds that shaped 1,500 songs. *BBC News*.", "https://www.bbc.co.uk/news/magazine-32087287"),
        book("front matter, the licence"),
      ],
    },
    // ------------------------------------------------------------------ 14.1
    {
      kind: "stop", id: "amen-break", number: "14.1", title: "The Amen Break", label: "settled", date: "1969",
      text: "In 1969 Gregory C. Coleman, drummer of the Winstons, played a six-second break in the middle of a B-side, “Amen, Brother”. Sampled more than 1,800 times by 2015, it helped build hip hop and jungle, yet no Winston earned anything from the sampling. Coleman died homeless in 2006; in 2015 fans and DJs raised £24,000 for the band leader, Richard L. Spencer.",
      visuals: [
        vid("Al-WH4TeMzs", 86),
        vid("FFKMtv8tU0U"),
        pic("amen-single", "The 1969 seven-inch single label of “Amen, Brother” by the Winstons"),
      ],
      sideRoads: [],
      sources: [
        src("Otzen, E. (2015, 29 March). Six seconds that shaped 1,500 songs. *BBC News*.", "https://www.bbc.co.uk/news/magazine-32087287"),
        src("BBC News (2015, 11 November). Amen Break musician finally gets paid.", "https://www.bbc.com/news/entertainment-arts-34785551"),
      ],
    },
    // ------------------------------------------------------------------ 14.2
    {
      kind: "stop", id: "audio-storage", number: "14.2", title: "Audio storage solutions: spirals and concentric circles", label: "settled",
      text: "A record's groove is one spiral, running from the edge inwards, and a stylus rides in it as the disc turns: the record at 14.1, the spirals at 11. A cassette moves its tape from one hub to the other, so the two reels change size as it plays. A hard disk also spins under a head on an arm, but it stores magnetized bits on concentric tracks, not a spiral.",
      visuals: [
        gallery(
          ["turntable-stylus-groove", "A stylus resting in the groove of a record on a turntable, close up, in black and white", "A stylus in the groove of a record (detail). The groove is one continuous spiral from the edge towards the centre, though at this angle it reads as rings; the stylus follows it as the disc turns."],
          ["cassette-open-reels", "An open compact cassette with its top shell removed: a full pancake of tape on one hub and a thin layer on the other", "An opened cassette, part played: the reels are unequal, a full pancake of tape on one hub and a thin layer on the take-up hub. The picture carries the uploader's labels."],
          ["open-hard-drive", "A hard disk drive with its cover off: a mirror-bright platter and the read-and-write arm reaching in over it", "A hard disk with its cover off: a head on its arm over the spinning platter, like a stylus on a record. It reads magnetized bits on concentric tracks, and flies often tens of nanometres above the surface."],
        ),
      ],
      sideRoads: [],
      sources: [
        src("Wikipedia. “Phonograph record”: a modulated spiral groove, played with a stylus.", "https://en.wikipedia.org/wiki/Phonograph_record"),
        src("Wikipedia. “Compact Cassette”: two spools, tape wound between them; introduced in August 1963; tape 3.81 mm wide.", "https://en.wikipedia.org/wiki/Compact_Cassette"),
        src("Wikipedia. “Hard disk drive”: magnetized regions on platters, heads on an actuator arm, flying height often tens of nanometres.", "https://en.wikipedia.org/wiki/Hard_disk_drive"),
        src("IBM Heritage. “RAMAC”: the 1956 disk drive, whose magnetic arm could not touch the disk, unlike a record-player needle.", "https://www.ibm.com/history/ramac"),
        src("Wikipedia. “Analog recording”: sound stored as a physical texture on a record, or as a fluctuation in magnetic field strength.", "https://en.wikipedia.org/wiki/Analog_recording"),
      ],
    },
    // ------------------------------------------------------------------ 15
    {
      kind: "stop", id: "strange-loop", number: "15", title: "The strange loop", label: "own",
      text: "For the harder questions about brains there is a lot more out there, such as Douglas Hofstadter's *Gödel, Escher, Bach* (1979) and *I Am a Strange Loop* (2007). Consciousness is strange to me: when it goes, after a knock on the head, say, the very faculties that could report on what was missing go with it, leaving the brain to describe itself in a degraded state, with what little still runs busy breathing and staying alive rather than taking notes. The only view from outside is other people's reports of what I was like, lossy and incomplete, and they can't feel what my body felt. Consciousness and questions like it are complex and interesting because there is a lot still to learn, and so much in the natural world lines up with esoteric practices and mainstream religions alike that I try to meet any idea with an open mind.\n\nPart of the inspiration for this whole project was *Spore* (Maxis and Electronic Arts, 2008), where competition, variation, adaptation, and specialization play out in a toyish and over-simplified version of early life; another was *SpaceChem* (Zachtronics, 2011), an indie puzzle game of building reactor patterns; a third was *Sid Meier's Civilization V* (Firaxis, 2010): A game where you play various civilizations around the world evolving through various cultural achievements and empire expansion, even ending in diplomacy and victories that can be based on the Space Race, winning a majority favour at the United Nations, or even military domination. Games and data visualization often put an image in the mind that does more for understanding than an explanation or a book alone.",
      visuals: [
        { ...vid("WGJOlq6-upY"), caption: "Evolution wouldn't be much fun, but here's a game's attempt at it: keep in mind that *Science*, a highly circulated research journal, gave it an F. Electronic Arts' trailer from 2007, a year before release, stage by stage: cell, creature, tribe, civilization, and space." },
        { ...vid("w1_w_-46rV0"), caption: "Zachtronics' own trailer. Each reactor is an assembly line the player programs to build molecules, fantasy nuclear fusion included; the puzzles leave room for creative solutions, and the game is usually cheap." },
        { type: "picture", picture: { ...one("covers", "The four books of the series side by side: Natural Knowledge, the high school edition, Modern Alchemy, and the Prolog logicbase", "The series."), link: true } },
      ],
      links: [
        { text: "The series on Amazon", url: "https://www.amazon.com/dp/B0HQGK8BQ8" },
        { text: "The repository", url: "https://github.com/freddi-van-gogh/Natural_Knowledge_git" },
        { text: "*Sid Meier's Civilization V* on Steam", url: "https://store.steampowered.com/app/8930/Sid_Meiers_Civilization_V/" },
        { text: "*Spore* on Steam", url: "https://store.steampowered.com/app/17390/SPORE/" },
        { text: "*SpaceChem* on Steam", url: "https://store.steampowered.com/app/92800/SpaceChem/" },
      ],
      coda: "More to come.",
      sideRoads: [],
      sources: [
        src("Hofstadter, D. R. (1979). *Gödel, Escher, Bach: an Eternal Golden Braid*. Basic Books.", "https://www.hachettebookgroup.com/titles/douglas-r-hofstadter/godel-escher-bach/9780465026562/"),
        src("Hofstadter, D. R. (2007). *I Am a Strange Loop*. Basic Books.", "https://www.hachettebookgroup.com/titles/douglas-r-hofstadter/i-am-a-strange-loop/9780465030798/"),
        book("ch. 13, on the strange loop"),
        book("ch. 17, on the hard problem of consciousness"),
        src("Wikipedia. “Spore (2008 video game)” (read 10 November 2026).", "https://en.wikipedia.org/wiki/Spore_(2008_video_game)"),
        src("Bohannon, J. (2008). Flunking Spore. *Science* 322(5901): 531 (graded by area: evolutionary biology F, sociology B+).", "https://doi.org/10.1126/science.322.5901.531b"),
        src("Wikipedia. “SpaceChem” (read 10 November 2026).", "https://en.wikipedia.org/wiki/SpaceChem"),
        src("Wikipedia. “Civilization V” (read 11 November 2026).", "https://en.wikipedia.org/wiki/Civilization_V"),
      ],
    },
  ];

  if (typeof module === "object" && module.exports) module.exports = NKC;
})(typeof window !== "undefined" ? window : globalThis);
