const shopProducts = [
  // =======================================================
  // BELIEBTE REISEGUIDES
  // =======================================================

  {
    id: "aida-kreuzfahrt-guide",
    slug: "aida-kreuzfahrt-guide",
    title:
      "AIDA Info Guide",
    price: 4.99,

    category: "kreuzfahrten",
    categoryLabel: "Kreuzfahrt-Guide",

    destination: null,
    destinationLabel: null,

    popular: true,
    popularRank: 1,

    description: `AIDA ist viel mehr als nur eine Kreuzfahrt – es ist ein komplettes Urlaubssystem mit eigenen Tarifen, Clubstufen, Internetpaketen und Bordleben. Dieser Guide zeigt dir alles, was du vor deiner Reise wirklich wissen musst – klar, verständlich und ohne komplizierte Fachsprache.

                  Statt unübersichtlicher Informationen bekommst du eine strukturierte Übersicht über die wichtigsten AIDA Tarife, Clubstufen, Internet an Bord sowie praktische Tipps für deine Buchung und Reise.

                  Ob Kabinenwahl, Preisunterschiede, Internetnutzung oder Vorteile im AIDA Club – dieser Guide hilft dir dabei, AIDA besser zu verstehen, clever zu buchen und unnötige Kosten zu vermeiden.

                  Perfekt für alle, die ihre erste AIDA Reise planen oder einfach das Maximum aus ihrer Kreuzfahrt herausholen wollen.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FAIDAThumbnail.png?alt=media&token=2b840cd0-16c8-4cbc-94cb-6565a68ac17f",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FAIDAGuide.pdf?alt=media&token=47aa780f-05f9-415b-ab42-14a0f928a0ec",

    format: "PDF",
    active: true,
    discountGroup: "aida",
  },

  {
    id: "mallorca-insider-guide",
    slug: "mallorca-insider-guide",
    title: "Mallorca",
    price: 4.99,

    category: "inseln",
    categoryLabel: "Insel-Guide",

    destination: "spanien",
    destinationLabel: "Spanien",

    popular: true,
    popularRank: 2,

    description: `Mallorca ist viel mehr als Ballermann und Hotelanlagen. Dieser Guide zeigt dir die Insel so, wie wir sie auf unseren Reisen erlebt haben – mit echten Lieblingsorten, versteckten Buchten, besonderen Restaurants und persönlichen Empfehlungen.

                  Statt oberflächlicher Tipps bekommst du eine klare, strukturierte Übersicht über die schönsten Orte der Insel, kombiniert mit echten Erfahrungen, Insider-Spots und praktischen Reisetipps.

                  Ob Strände, Berge, Städte oder Food – dieser Guide hilft dir dabei, Mallorca stressfrei, authentisch und deutlich intensiver zu erleben.

                  Perfekt für alle, die nicht einfach „Urlaub machen“, sondern die Insel wirklich entdecken wollen.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FMallorcaThumbnail.png?alt=media&token=79122bfc-d2eb-4789-b5d8-e837ce29bef9",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FMallorcaGuide.pdf?alt=media&token=00f26e1a-c701-4b24-b088-bf153dc2a077",
    
    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  {
    id: "hamburger-insider-guide",
    slug: "hamburger-insider-guide",
    title: "Hamburg",
    price: 4.99,

    category: "staedte",
    categoryLabel: "Städte-Guide",

    destination: "deutschland",
    destinationLabel: "Deutschland",

    popular: true,
    popularRank: 3,

    description: `Hamburg ist viel mehr als nur Hafen, Reeperbahn und bekannte Sehenswürdigkeiten. Dieser Guide zeigt dir die Stadt so, wie wir sie auf unseren Reisen erlebt haben – mit echten Lieblingsorten, besonderen Vierteln, spannenden Highlights und persönlichen Empfehlungen.

                  Statt oberflächlicher Tipps bekommst du eine klare, strukturierte Übersicht über die wichtigsten Orte der Stadt, kombiniert mit echten Erfahrungen, Insider-Spots und praktischen Reisetipps.

                  Ob Hafen, moderne Stadtviertel, kulinarische Highlights oder kulturelle Orte – dieser Guide hilft dir dabei, Hamburg stressfrei, authentisch und deutlich intensiver zu erleben.

                  Perfekt für alle, die nicht einfach nur durch Hamburg laufen, sondern die Stadt wirklich entdecken wollen.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FHamburgThumbnail.png?alt=media&token=cc137bf0-1017-4193-9ed8-f93ad1b7f7aa",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FHamburgGuide.pdf?alt=media&token=f0157de9-be25-4f53-a98d-56648f64e609",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  {
    id: "karibik-kreuzfahrt-guide",
    slug: "kreuzfahrt-karibische-inseln-ab-dominikanischer-republik",
    title:
      "Karibik Kreuzfahrt",
    price: 18.99,

    category: "kreuzfahrten",
    categoryLabel: "Kreuzfahrt-Guide",

    destination: "karibik",
    destinationLabel: "Karibik",

    popular: true,
    popularRank: 4,

    description: `Diese Kreuzfahrt ist weit mehr als nur eine klassische Schiffsreise durch die Karibik. Sie verbindet einige der schönsten Inseln der Region mit türkisblauem Wasser, weißen Sandstränden und einzigartigen Natur- und Kulturerlebnissen.

                  Statt oberflächlicher Reiseinfos bekommst du eine klare, strukturierte Übersicht über jede Station deiner Route – kombiniert mit echten Ausflugstipps, Strand-Highlights und praktischen Hinweisen für unvergessliche Landgänge in der Karibik.

                  Ob tropische Strände, bunte Inselkulturen, Schnorchelabenteuer oder entspannte Hafenstädte – diese Kreuzfahrt zeigt dir die Karibik auf eine intensive und gleichzeitig entspannte Art.

                  Perfekt für alle, die viele Inseln in kurzer Zeit erleben wollen, ohne selbst jede Route oder jeden Ausflug planen zu müssen.

                  Häfen & Ausflüge:
                    - La Romana (Start / Ziel)
                    - Aruba
                    - Curaçao
                    - Bonaire
                    - Grenada
                    - Barbados
                    - Saint Vincent
                    - Saint Lucia
                    - Dominica
                    - Guadeloupe
                    - Antigua`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FKaribikThumbnail.png?alt=media&token=f776984a-b5bb-4d35-a79c-f12b8ade68ee",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FKaribikGuide.pdf?alt=media&token=b078afb6-b823-44e0-9383-3c9a7955b0f3",

    format: "PDF",
    active: true,
    discountGroup: "cruise",
  },

  {
    id: "kreuzfahrt-norwegens-fjorde-ab-hamburg",
    slug: "kreuzfahrt-norwegens-fjorde-ab-hamburg",
    title: "Norwegen Kreuzfahrt",
    price: 16.99,

    category: "kreuzfahrten",
    categoryLabel: "Kreuzfahrt-Guide",

    destination: "norwegen",
    destinationLabel: "Norwegen",

    bestseller: true,

    popular: true,
    popularRank: 5,

    description: `Diese Kreuzfahrt ist eine Reise durch eine der eindrucksvollsten Naturlandschaften Europas. Zwischen tiefen Fjorden, Wasserfällen und kleinen Hafenstädten erlebst du Norwegen von seiner schönsten Seite.

                  Statt einfacher Routendaten bekommst du eine übersichtliche und praktische Aufbereitung aller Stopps – mit Tipps für Landgänge, Naturerlebnisse und die besten Aussichtspunkte entlang der Fjorde.

                  Ob spektakuläre Landschaften, ruhige Küstenorte oder beeindruckende Naturkulissen – diese Kreuzfahrt steht für echte Ruhe und unvergessliche Ausblicke.

                  Perfekt für alle, die Natur, Weite und besondere Landschaften lieben.

                  Häfen & Stopps:
                    - Hamburg (Start / Ziel)
                    - Bergen
                    - Geirangerfjord
                    - Molde
                    - Åndalsnes
                    - Trondheim
                    - Ålesund
                    - Måløy
                    - Flåm
                    - Eidfjord
                    - Stavanger`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FNorwegensFjordeThumbnail.png?alt=media&token=accbf4c8-f23b-49cb-a460-f5fe014f45ea",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FNorwegenGuide.pdf?alt=media&token=a16faa15-4019-4ed9-8853-9192e487a3a0",

    format: "PDF",
    active: true,
    discountGroup: "cruise",
  },

  {
    id: "rom-in-48-stunden",
    slug: "rom-in-48-stunden",
    title: "Rom in 48 Stunden",
    price: 4.99,

    category: "kurztrips",
    categoryLabel: "Kurztrip",

    destination: "italien",
    destinationLabel: "Italien",

    popular: true,
    popularRank: 6,

    description: `Rom in 48 Stunden – Digitaler Reiseguide 🇮🇹✨

                  Entdecke die Ewige Stadt in nur zwei Tagen! Unser digitaler Rom-Guide zeigt dir, wie du die Highlights der Stadt effizient erlebst, wo du lecker essen gehen kannst 🍕🍷 und welche versteckten Orte einen besonderen Moment wert sind.

                  Für wen ist dieser Guide geeignet?
                    - Für Kurzurlauber, die in 48 Stunden das Beste von Rom erleben möchten ⏰
                    - Für Familien, Paare oder Freundesgruppen, die eine stressfreie Planung lieben 👨👩👧👦💑
                    - Für alle, die Tipps aus erster Hand und Insider-Empfehlungen schätzen 🗺️

                  Für wen ist er eher nicht geeignet?
                    - Für Langzeitreisende, die Rom in Ruhe über Wochen erkunden möchten
                    - Für Reisende, die nur Sightseeing-Listen ohne persönliche Tipps suchen`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FRom48.png?alt=media&token=a424ebbb-ff62-443a-b173-aa5744c690f0",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FRom48Stunden.pdf?alt=media&token=12fe4854-2bd9-4c37-b474-4902b121817f",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  {
    id: "barcelona-in-48-stunden",
    slug: "barcelona-in-48-stunden",
    title: "Barcelona in 48 Stunden",
    price: 4.99,

    category: "kurztrips",
    categoryLabel: "Kurztrip",

    destination: "spanien",
    destinationLabel: "Spanien",

    popular: true,
    popularRank: 7,

    description: `Barcelona in 48 Stunden – Digitaler Reiseguide 🇪🇸☀️

                  Erlebe Barcelona in nur zwei Tagen! Unser digitaler Barcelona-Guide zeigt dir, wie du die Highlights der Stadt entspannt entdeckst, wo du richtig gut essen kannst 🍤🥘 und an welchen Orten du echtes Barcelona-Feeling spürst – Stadt, Strand & Genuss perfekt kombiniert.

                  Für wen ist dieser Guide geeignet?
                    - Für Kurzurlauber, die Barcelona in 48 Stunden optimal nutzen möchten ⏰
                    - Für Familien, Paare oder Freundesgruppen, die stressfrei planen wollen 👨👩👧👦💑
                    - Für alle, die ehrliche Tipps & Genussmomente aus erster Hand lieben 🗺️

                  Für wen ist er eher nicht geeignet?
                    - Für Langzeitreisende, die Barcelona über viele Wochen entdecken möchten
                    - Für Reisende, die nur reine Sehenswürdigkeiten ohne persönliche Empfehlungen suchen

                  ✨ Dieser Guide wurde liebevoll erlebt und zusammengestellt von MamaTochterOnTour – für zwei unvergessliche Tage in Barcelona! ❤️`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FBarcelona48.png?alt=media&token=92662efc-db07-4f71-9bd4-b8e45976e85d",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FBarcelona48Stunden.pdf?alt=media&token=4f9cf91d-a727-4b25-9e5b-605d7ea8c7e5",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  // =======================================================
  // WEITERE KREUZFAHRT-GUIDES
  // =======================================================

  {
    id: "kreuzfahrt-metropolen-ab-hamburg",
    slug: "kreuzfahrt-metropolen-ab-hamburg",
    title: "Kreuzfahrt Metropolen ab Hamburg",
    price: 14.99,

    category: "kreuzfahrten",
    categoryLabel: "Kreuzfahrt-Guide",

    destination: null,
    destinationLabel: null,

    popular: false,
    popularRank: null,

    description: `Diese Kreuzfahrt ist viel mehr als nur eine klassische Nordsee-Route. Sie verbindet einige der schönsten Metropolen Westeuropas mit einzigartigen Hafenmomenten und spannenden Tagesausflügen.

                  Statt oberflächlicher Reiseinfos bekommst du eine klare, strukturierte Übersicht über jede Station deiner Route – kombiniert mit echten Erfahrungen, Ausflugstipps und praktischen Hinweisen für Landgänge in Europas bekanntesten Städten.

                  Ob Großstadtflair, historische Altstädte oder ikonische Sehenswürdigkeiten – diese Kreuzfahrt zeigt dir Europa auf eine intensive und unkomplizierte Art.

                  Perfekt für alle, die in kurzer Zeit viele Städte erleben wollen, ohne selbst alles planen zu müssen.

                  Häfen & Ausflüge:
                    - Hamburg (Start / Ziel)
                    - Zeebrügge → Brüssel
                    - Rotterdam
                    - Le Havre → Paris
                    - Southampton → London`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FMetropolenThumbnail.png?alt=media&token=eb9c23da-04e6-48e8-bd22-b38dab10e075",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FMetropolenGuide.pdf?alt=media&token=2e842ebc-79d6-4fe5-96d3-0e5db43cd369",

    format: "PDF",
    active: true,
    discountGroup: "cruise",
  },

  {
    id: "kreuzfahrt-mediterrane-schaetze-mit-korsika",
    slug: "kreuzfahrt-mediterrane-schaetze-mit-korsika",
    title: "Kreuzfahrt Mediterrane Schätze mit Korsika",
    price: 14.99,

    category: "kreuzfahrten",
    categoryLabel: "Kreuzfahrt-Guide",

    destination: null,
    destinationLabel: null,

    popular: false,
    popularRank: null,

    description: `Diese Kreuzfahrt verbindet mediterranes Lebensgefühl mit einigen der schönsten Küstenstädte Europas. Sonne, Kultur und Küstenorte machen diese Route zu einer der abwechslungsreichsten Kreuzfahrten.

                  Statt allgemeiner Informationen findest du hier eine klare Übersicht über alle Stopps, kombiniert mit echten Tipps für Landgänge, Sehenswürdigkeiten und die schönsten Ausflugsziele in jeder Region.

                  Ob italienische Küstenstädte, französisches Flair oder spanisches Stadtleben – diese Kreuzfahrt vereint Kultur, Genuss und Mittelmeer-Atmosphäre.

                  Perfekt für alle, die Sonne, Städte und mediterrane Vielfalt in einer Reise erleben wollen.

                  Häfen & Ausflüge:
                    - Mallorca (Start / Ziel)
                    - La Spezia → Pisa / Florenz
                    - Civitavecchia → Rom
                    - Korsika
                    - Barcelona`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FMediterraneSchaetzeThumbnail.png?alt=media&token=a1f4f4f9-b307-4ba3-b4ae-ddaf1a3e059b",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FMediterraneSchaetzeGuide.pdf?alt=media&token=01027c64-70ec-48fb-84a4-908c23db071b",

    format: "PDF",
    active: true,
    discountGroup: "cruise",
  },

  // =======================================================
  // SPANIEN
  // =======================================================

  {
    id: "barcelona-insider-guide",
    slug: "barcelona-insider-guide",
    title: "Barcelona Insider Guide",
    price: 4.99,

    category: "staedte",
    categoryLabel: "Städte-Guide",

    destination: "spanien",
    destinationLabel: "Spanien",

    popular: false,
    popularRank: null,

    description: `Barcelona ist viel mehr als nur Sagrada Família, Strand und Tapas. Dieser Guide zeigt dir die Stadt so, wie wir sie erleben – mit echten Lieblingsorten, besonderen Highlights, versteckten Ecken und persönlichen Empfehlungen.

                  Statt oberflächlicher Tipps bekommst du eine klare, strukturierte Übersicht über die wichtigsten Sehenswürdigkeiten, Viertel, Cafés, Restaurants und praktischen Reisetipps für deinen Aufenthalt.

                  Ob Gaudí-Architektur, das Gotische Viertel, Strandspaziergänge oder das pulsierende Nachtleben – dieser Guide hilft dir dabei, Barcelona stressfrei, authentisch und intensiver zu entdecken.

                  Perfekt für alle, die nicht einfach nur durch Barcelona laufen, sondern die Stadt wirklich erleben wollen.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FBarcelonaThumbnail.png?alt=media&token=d2ff9fb4-d093-40cc-9078-7e02abdc6bdc",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FBarcelonaGuide.pdf?alt=media&token=cd904a3c-5b4c-4025-acc3-861daf5a8a4c",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  // =======================================================
  // ITALIEN
  // =======================================================

  {
    id: "cagliari-insider-guide",
    slug: "cagliari-insider-guide",
    title: "Cagliari Insider Guide",
    price: 4.99,

    category: "staedte",
    categoryLabel: "Städte-Guide",

    destination: "italien",
    destinationLabel: "Italien",

    popular: false,
    popularRank: null,

    description: `Cagliari ist viel mehr als nur ein Zwischenstopp auf Sardinien. Dieser Guide zeigt dir die Stadt so, wie wir sie erlebt haben – mit echten Lieblingsorten, besonderen Highlights, schönen Aussichtspunkten und persönlichen Empfehlungen für deinen Aufenthalt.

                  Statt einer einfachen Liste von Sehenswürdigkeiten bekommst du eine klare und strukturierte Übersicht über die wichtigsten Orte in Cagliari, charmante Gassen, lokale Märkte, kulinarische Highlights und praktische Tipps für deinen Besuch.

                  Ob historische Altstadt, mediterranes Lebensgefühl, beeindruckende Ausblicke über das Meer oder sardische Spezialitäten – dieser Guide hilft dir dabei, Cagliari entspannt, authentisch und intensiver zu entdecken.

                  Perfekt für alle, die Cagliari nicht nur kurz besuchen, sondern die besondere Atmosphäre dieser wunderschönen Stadt wirklich erleben möchten.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FCagliariThumbnail.png?alt=media&token=6d9894cc-372d-475f-bbf1-51ca56b8e686",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FCagliariGuide.pdf?alt=media&token=820aae09-7a7d-4f2f-992b-a831fed86fdf",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  {
    id: "rom-insider-guide",
    slug: "rom-insider-guide",
    title: "Rom Insider Guide",
    price: 4.99,

    category: "staedte",
    categoryLabel: "Städte-Guide",

    destination: "italien",
    destinationLabel: "Italien",

    popular: false,
    popularRank: null,

    description: `Rom ist viel mehr als Kolosseum, Vatikan und Trevi-Brunnen. Dieser Guide zeigt dir die Stadt so, wie wir sie erleben – mit echten Lieblingsorten, besonderen Highlights, versteckten Ecken und persönlichen Empfehlungen.

                  Statt oberflächlicher Tipps bekommst du eine klare, strukturierte Übersicht über die wichtigsten Sehenswürdigkeiten, authentische Viertel, Cafés, Restaurants und praktische Reisetipps für deinen Aufenthalt.

                  Ob antike Geschichte, italienisches Lebensgefühl, lebendige Piazzas oder kulinarische Highlights – dieser Guide hilft dir dabei, Rom stressfrei, authentisch und intensiver zu entdecken.

                  Perfekt für alle, die nicht einfach nur durch Rom laufen, sondern die Stadt wirklich erleben wollen.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FRomThumbnail.png?alt=media&token=899fcb7a-377c-4adc-bdbe-ccc516e1de1d",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FRomGuide.pdf?alt=media&token=da5fc0f2-f1c7-47f1-8bed-a52307ce653e",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  {
    id: "venedig-insider-guide",
    slug: "venedig-insider-guide",
    title: "Venedig Insider Guide",
    price: 4.99,

    category: "staedte",
    categoryLabel: "Städte-Guide",

    destination: "italien",
    destinationLabel: "Italien",

    popular: false,
    popularRank: null,

    description: `Venedig ist viel mehr als Gondeln, Kanäle und der Markusplatz. Dieser Guide zeigt dir die Stadt so, wie wir sie erleben – mit echten Lieblingsorten, besonderen Highlights, versteckten Ecken und persönlichen Empfehlungen.

                  Statt oberflächlicher Tipps bekommst du eine klare, strukturierte Übersicht über die wichtigsten Sehenswürdigkeiten, Insider-Spots, Cafés und praktischen Reisetipps für deinen Aufenthalt.

                  Ob historische Plätze, ruhige Viertel, venezianisches Lebensgefühl oder Food-Spots – dieser Guide hilft dir dabei, Venedig stressfrei, authentisch und intensiver zu entdecken.
    
                  Perfekt für alle, die nicht einfach nur durch Venedig laufen, sondern die Stadt wirklich erleben wollen.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FVenedigThumbnail.png?alt=media&token=5c78c619-c45b-4ba3-8114-e1174818c366",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FVenedigGuide.pdf?alt=media&token=29b59ea0-ec77-41dc-8eab-3befe372d38b",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  {
    id: "florenz-insider-guide",
    slug: "florenz-insider-guide",
    title: "Florenz Insider Guide",
    price: 4.99,

    category: "staedte",
    categoryLabel: "Städte-Guide",

    destination: "italien",
    destinationLabel: "Italien",

    popular: false,
    popularRank: null,

    description: `Florenz ist viel mehr als Renaissance, Museen und ein kurzer Stopp auf einer Italienreise. Dieser Guide zeigt dir die Stadt so, wie wir sie erleben – mit echten Lieblingsorten, besonderen Highlights, versteckten Ecken und persönlichen Empfehlungen.

                  Statt oberflächlicher Tipps bekommst du eine klare, strukturierte Übersicht über die wichtigsten Sehenswürdigkeiten, Insider-Spots, Cafés und praktischen Reisetipps für deinen Aufenthalt.

                  Ob Kunst, Architektur, italienisches Lebensgefühl oder Food-Szenen – dieser Guide hilft dir dabei, Florenz stressfrei, authentisch und intensiver zu entdecken.

                  Perfekt für alle, die nicht einfach nur durch Florenz laufen, sondern die Stadt wirklich erleben wollen.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FFlorenzThumbnail.png?alt=media&token=75a6f50b-0c6d-4d6a-b066-b3d555c50a30",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FFlorenzGuide.pdf?alt=media&token=7ce46951-aa8c-4560-ad9f-9faed9ab038e",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  {
    id: "mailand-insider-guide",
    slug: "mailand-insider-guide",
    title: "Mailand Insider Guide",
    price: 4.99,

    category: "staedte",
    categoryLabel: "Städte-Guide",

    destination: "italien",
    destinationLabel: "Italien",

    popular: false,
    popularRank: null,

    description: `Mailand ist viel mehr als Mode, Business und eine Stadt für einen kurzen Zwischenstopp. Dieser Guide zeigt dir die Stadt so, wie wir sie erleben – mit echten Lieblingsorten, besonderen Highlights, versteckten Ecken und persönlichen Empfehlungen.

                  Statt oberflächlicher Tipps bekommst du eine klare, strukturierte Übersicht über die wichtigsten Sehenswürdigkeiten, Insider-Spots, Cafés und praktischen Reisetipps für deinen Aufenthalt.

                  Ob Architektur, Stadtviertel, italienisches Lebensgefühl oder Food-Szenen – dieser Guide hilft dir dabei, Mailand stressfrei, authentisch und intensiver zu entdecken.

                  Perfekt für alle, die nicht einfach nur durch Mailand laufen, sondern die Stadt wirklich erleben wollen.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FMailandThumbnail.png?alt=media&token=9bb67989-b0a4-4ea0-9185-f1848398c6a9",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FMailandGuide.pdf?alt=media&token=80c04f17-d43d-45f5-8746-c9d51677fb15",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  // =======================================================
  // FRANKREICH
  // =======================================================

  {
    id: "ajaccio-insider-guide",
    slug: "ajaccio-insider-guide",
    title: "Ajaccio Insider Guide",
    price: 4.99,

    category: "staedte",
    categoryLabel: "Städte-Guide",

    destination: "frankreich",
    destinationLabel: "Frankreich",

    popular: false,
    popularRank: null,

    description: `Ajaccio ist viel mehr als nur Hafen, Altstadt und mediterrane Kulisse auf Korsika. Dieser Guide zeigt dir die Stadt so, wie sie wirklich erlebt werden kann – mit echten Lieblingsorten, besonderen Aussichtspunkten, versteckten Ecken und persönlichen Empfehlungen.

                  Statt oberflächlicher Tipps bekommst du eine klare, strukturierte Übersicht über die wichtigsten Sehenswürdigkeiten, Strände, Cafés und praktischen Reisetipps für deinen Aufenthalt in der korsischen Hauptstadt.

                  Ob Napoleon-Geschichte, türkisblaues Meer, kleine Gassen oder entspannte Strandmomente – dieser Guide hilft dir dabei, Ajaccio stressfrei, authentisch und intensiver zu entdecken.

                  Perfekt für alle, die nicht nur kurz anlegen oder durchlaufen wollen, sondern Ajaccio wirklich erleben möchten.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FAjaccioThumbnail.png?alt=media&token=9171e699-85fe-4c33-b963-baa90d1892ba",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FAjaccioGuide.pdf?alt=media&token=f10f0b2e-e6c1-4dac-9914-85e5060c6f83",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  {
    id: "paris-insider-guide",
    slug: "paris-insider-guide",
    title: "Paris Insider Guide",
    price: 4.99,

    category: "staedte",
    categoryLabel: "Städte-Guide",

    destination: "frankreich",
    destinationLabel: "Frankreich",

    popular: false,
    popularRank: null,

    description: `Paris ist viel mehr als Eiffelturm, Louvre und eine Stadt für einen kurzen Städtetrip. Dieser Guide zeigt dir die Stadt so, wie wir sie erleben – mit echten Lieblingsorten, besonderen Highlights, versteckten Ecken und persönlichen Empfehlungen.

                  Statt oberflächlicher Tipps bekommst du eine klare, strukturierte Übersicht über die wichtigsten Sehenswürdigkeiten, Insider-Spots, Cafés und praktischen Reisetipps für deinen Aufenthalt.

                  Ob Architektur, Stadtviertel, französisches Lebensgefühl oder Food-Szenen – dieser Guide hilft dir dabei, Paris stressfrei, authentisch und intensiver zu entdecken.

                  Perfekt für alle, die nicht einfach nur durch Paris laufen, sondern die Stadt wirklich erleben wollen.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FParisThumbnail.png?alt=media&token=0dfea857-904a-4fe9-9b56-62b786a140ad",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FParisGuide.pdf?alt=media&token=a692a2ad-c9c9-4029-9dc2-7f276f5bbea8",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  // =======================================================
  // ÖSTERREICH
  // =======================================================

  {
    id: "wien-insider-guide",
    slug: "wien-insider-guide",
    title: "Wien Insider Guide",
    price: 4.99,

    category: "staedte",
    categoryLabel: "Städte-Guide",

    destination: "oesterreich",
    destinationLabel: "Österreich",

    popular: false,
    popularRank: null,

    description: `Wien ist viel mehr als Kaffeehäuser, Stephansdom und klassische Musik. Dieser Guide zeigt dir die Stadt so, wie wir sie erleben – mit echten Lieblingsorten, besonderen Highlights, versteckten Ecken und persönlichen Empfehlungen.

                  Statt oberflächlicher Tipps bekommst du eine klare, strukturierte Übersicht über die wichtigsten Sehenswürdigkeiten, Insider-Spots, Cafés, Heurige und praktischen Reisetipps für deinen Aufenthalt.

                  Ob imperiale Architektur, gemütliche Kaffeehauskultur, moderne Viertel oder entspannte Parks – dieser Guide hilft dir dabei, Wien stressfrei, authentisch und intensiver zu entdecken.

                  Perfekt für alle, die nicht einfach nur durch Wien laufen, sondern die Stadt wirklich erleben wollen.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FWienThumbnail.png?alt=media&token=d77e3522-a2bf-41ae-bb3d-f77d1d823f35",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FWienGuide.pdf?alt=media&token=42c389ff-bf2a-4e71-9110-302a139677ef",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  // =======================================================
  // DEUTSCHLAND
  // =======================================================

  {
    id: "berlin-insider-guide",
    slug: "berlin-insider-guide",
    title: "Berlin Insider Guide",
    price: 4.99,

    category: "staedte",
    categoryLabel: "Städte-Guide",

    destination: "deutschland",
    destinationLabel: "Deutschland",

    popular: false,
    popularRank: null,

    description: `Berlin ist viel mehr als nur Hauptstadt, Politik und bekannte Sehenswürdigkeiten. Dieser Guide zeigt dir die Stadt so, wie wir sie auf unseren Reisen erlebt haben – mit echten Lieblingsorten, besonderen Vierteln, spannenden Highlights und persönlichen Empfehlungen.

                  Statt oberflächlicher Tipps bekommst du eine klare, strukturierte Übersicht über die wichtigsten Orte der Stadt, kombiniert mit echten Erfahrungen, Insider-Spots und praktischen Reisetipps.

                  Ob Geschichte, moderne Kieze, Streetfood oder kulturelle Highlights – dieser Guide hilft dir dabei, Berlin stressfrei, authentisch und deutlich intensiver zu erleben.

                  Perfekt für alle, die nicht einfach nur durch Berlin laufen, sondern die Stadt wirklich entdecken wollen.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FBerlinThumbnail.png?alt=media&token=5e280bab-4028-4460-947a-4725cde84136",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FBerlinGuide.pdf?alt=media&token=9f05d804-000b-4c44-b2f3-a617e7d16a4a",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },

  // =======================================================
  // VEREINIGTES KÖNIGREICH
  // =======================================================

  {
    id: "london-insider-guide",
    slug: "london-insider-guide",
    title: "London Insider Guide",
    price: 4.99,

    category: "staedte",
    categoryLabel: "Städte-Guide",

    destination: "vereinigtes-koenigreich",
    destinationLabel: "Vereinigtes Königreich",

    popular: false,
    popularRank: null,

    description: `London ist viel mehr als Big Ben, rote Busse und der Buckingham Palace. Dieser Guide zeigt dir die Stadt so, wie wir sie erleben – mit echten Lieblingsorten, besonderen Highlights, versteckten Ecken und persönlichen Empfehlungen.

                  Statt oberflächlicher Tipps bekommst du eine klare, strukturierte Übersicht über die wichtigsten Sehenswürdigkeiten, Insider-Spots, Cafés, Pubs und praktischen Reisetipps für deinen Aufenthalt.

                  Ob historische Viertel, moderne Architektur, Streetlife in Soho oder entspannte Parks – dieser Guide hilft dir dabei, London stressfrei, authentisch und intensiver zu entdecken.

                  Perfekt für alle, die nicht einfach nur durch London laufen, sondern die Stadt wirklich erleben wollen.`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/guides_bilder%2FLondonThumbnail.png?alt=media&token=cb3b0c10-731a-4fb0-b9c6-ba403b17dbb7",
    pdfUrl: "https://firebasestorage.googleapis.com/v0/b/reiseapp-mamatocherontour.firebasestorage.app/o/travel_guides%2FLondonGuide.pdf?alt=media&token=1ec36592-ec2c-4857-a928-b9f820d4c834",

    format: "PDF",
    active: true,
    discountGroup: "quantity",
  },
];

export default shopProducts;