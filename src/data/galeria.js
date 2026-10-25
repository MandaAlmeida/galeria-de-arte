/* Galeria de Arte — Mestres da Pintura · dados de conteúdo.
   Edite aqui biografias, obras e referências sem tocar na interface.
   As imagens ficam em src/assets (obras/<id> e retratos/<slug>).
   img: nome exato do arquivo no Wikimedia Commons (somente obras em domínio público).
   img: null → obra protegida por direitos autorais; a interface mostra um espaço reservado identificado. */
const GALERIA = (function () {
  var PD = "Domínio público (obra). Reprodução fotográfica fiel de obra bidimensional em domínio público, via Wikimedia Commons.";
  var PROT = "Obra protegida por direitos autorais — imagem não reproduzida neste site educativo. Consulte a instituição responsável.";

  var periods = [
    { key: "renascimento", label: "Renascimento (séc. XV–XVI)" },
    { key: "xix", label: "Século XIX" },
    { key: "xx1", label: "Século XX (1900–1945)" },
    { key: "xx2", label: "Pós-guerra e contemporâneo (1945– )" }
  ];

  var movements = [
    { key: "renascimento", name: "Renascimento", span: "c. 1400–1600", artists: ["leonardo-da-vinci"],
      text: "Retomada dos valores da Antiguidade clássica na Itália e depois na Europa. Os pintores estudam perspectiva linear, anatomia e proporção para representar o mundo de forma racional e convincente, e o artista passa a ser visto como intelectual, não apenas artesão." },
    { key: "impressionismo", name: "Impressionismo", span: "c. 1860–1890", artists: ["claude-monet"],
      text: "Nascido na França, propõe pintar ao ar livre e registrar a luz e a atmosfera de um instante. Pinceladas curtas e visíveis, cores claras e temas do cotidiano moderno. O nome veio de uma crítica irônica a uma tela de Monet, em 1874." },
    { key: "pos-impressionismo", name: "Pós-impressionismo", span: "c. 1886–1905", artists: ["vincent-van-gogh"],
      text: "Termo aplicado depois (pelo crítico Roger Fry, em 1910) a artistas que partiram do impressionismo mas buscaram mais estrutura, simbolismo ou expressão pessoal. Cor e pincelada passam a carregar emoção e ideias, não apenas a aparência da luz." },
    { key: "expressionismo", name: "Expressionismo", span: "c. 1890–1930", artists: ["edvard-munch", "anita-malfatti"],
      text: "Prioriza a expressão de estados interiores sobre a imitação da realidade: cores arbitrárias, formas deformadas e traços intensos. Munch é um dos precursores; Anita Malfatti teve contato com a pintura expressionista na Alemanha e a trouxe ao debate brasileiro." },
    { key: "cubismo", name: "Cubismo", span: "c. 1907–1920s", artists: ["pablo-picasso"],
      text: "Criado por Pablo Picasso e Georges Braque, decompõe objetos e figuras em planos geométricos e os mostra de vários pontos de vista ao mesmo tempo, rompendo com a perspectiva única do Renascimento. Influenciou também modernistas brasileiros como Tarsila." },
    { key: "arte-mexicana", name: "Arte moderna mexicana", span: "c. 1920–1950", artists: ["frida-kahlo"],
      text: "Após a Revolução Mexicana, artistas valorizam raízes indígenas e populares (a chamada mexicanidad). Frida Kahlo é frequentemente associada ao surrealismo pelos surrealistas europeus, associação que ela própria recusava." },
    { key: "modernismo-br", name: "Modernismo brasileiro", span: "c. 1917–1945", artists: ["anita-malfatti", "tarsila-do-amaral", "candido-portinari"],
      text: "Movimento de renovação das artes no Brasil, marcado pela exposição de Anita Malfatti (1917) e pela Semana de Arte Moderna de 1922. Busca uma linguagem moderna e brasileira, dialogando com as vanguardas europeias sem copiá-las — ideia que o Manifesto Antropófago (1928) radicaliza." },
    { key: "pop-art", name: "Pop art e neo-pop", span: "c. 1955– ", artists: ["romero-britto"],
      text: "A pop art surgiu no Reino Unido e nos EUA nos anos 1950–60 incorporando imagens da publicidade, dos quadrinhos e do consumo. Romero Britto é associado ao neo-pop: cores chapadas, contornos pretos e circulação em produtos, campanhas e espaços públicos." }
  ];

  var artists = [
    {
      slug: "vincent-van-gogh", name: "Vincent van Gogh", fullName: "Vincent Willem van Gogh",
      nationality: "Neerlandês", born: "30 de março de 1853, Zundert (Países Baixos)", died: "29 de julho de 1890, Auvers-sur-Oise (França)",
      years: "1853–1890", period: "Século XIX", movement: "Pós-impressionismo", movementKeys: ["pos-impressionismo"],
      cover: "vg-noite-estrelada",
      portrait: { src: "images/foto-vincent-van-gogh.jpg", alt: "Fotografia em preto e branco de Vincent van Gogh aos 19 anos, de terno escuro", title: "Vincent van Gogh aos 19 anos", date: "Janeiro de 1873", location: "Foto: J. M. W. de Louw, Haia · Domínio público" },
      summary: "Em apenas dez anos de carreira, transformou a cor e a pincelada em linguagem de emoção.",
      intro: "Uma década de trabalho obstinado bastou para que a cor deixasse de descrever o mundo e passasse a dizer o que se sente diante dele.",
      bio: [
        { h: "Infância e origem", p: ["Vincent nasceu em Groot-Zundert, no sul dos Países Baixos, filho do pastor protestante Theodorus van Gogh e de Anna Cornelia Carbentus. Teve cinco irmãos; o mais próximo foi Theo, quatro anos mais novo, com quem trocaria centenas de cartas ao longo da vida."] },
        { h: "Primeiros caminhos", p: ["Aos 16 anos começou a trabalhar na Goupil & Cie, firma de comércio de arte, em Haia, Londres e Paris. Depois tentou ser professor e pregador; em 1879 atuou entre mineiros na região do Borinage, na Bélgica. Em 1880, aos 27 anos, decidiu tornar-se artista."] },
        { h: "Formação e influências", p: ["Foi em grande parte autodidata: copiava gravuras, estudava manuais de desenho e frequentou brevemente a academia de Bruxelas e, mais tarde, a de Antuérpia. Em Haia recebeu orientação do pintor Anton Mauve. Admirava Jean-François Millet e a pintura de camponeses, tema de Os Comedores de Batata (1885), pintado em Nuenen com paleta escura."] },
        { h: "Paris e a descoberta da cor", p: ["Entre 1886 e 1888 viveu em Paris com Theo. Ali conheceu os impressionistas e neoimpressionistas e colecionou xilogravuras japonesas (ukiyo-e). Sua paleta clareou, a pincelada ficou mais fragmentada e ele pintou dezenas de autorretratos, em parte por não poder pagar modelos."] },
        { h: "Arles, Saint-Rémy e Auvers", p: ["Em 1888 mudou-se para Arles, no sul da França, buscando luz e cor intensas. Alugou a Casa Amarela e sonhou com uma comunidade de artistas; Paul Gauguin passou ali cerca de dois meses. Após uma crise grave em dezembro de 1888, Van Gogh feriu a própria orelha. Em 1889 internou-se voluntariamente no asilo de Saint-Paul-de-Mausole, em Saint-Rémy, onde pintou A Noite Estrelada.", "Em maio de 1890 mudou-se para Auvers-sur-Oise, perto de Paris, sob cuidados do médico Paul Gachet. Ali pintou em ritmo intenso até morrer, em 29 de julho, dois dias depois de ser atingido por um tiro — episódio geralmente considerado tentativa de suicídio."] },
        { h: "Reconhecimento e importância", p: ["Em vida, vendeu pouco: a venda mais bem documentada é A Vinha Vermelha, comprada pela pintora Anna Boch em 1890. Após sua morte e a de Theo (1891), a cunhada Jo van Gogh-Bonger organizou exposições e publicou as cartas, o que foi decisivo para sua fama. Deixou cerca de 850 pinturas e quase 1.300 obras sobre papel."] }
      ],
      timeline: [
        { y: "1853", t: "Nasce em Groot-Zundert, Países Baixos." },
        { y: "1869", t: "Começa a trabalhar na Goupil & Cie, comércio de arte." },
        { y: "1880", t: "Decide tornar-se artista, aos 27 anos." },
        { y: "1885", t: "Pinta Os Comedores de Batata, em Nuenen." },
        { y: "1886–88", t: "Vive em Paris; contato com impressionistas e gravuras japonesas.", work: "vg-autorretrato-feltro" },
        { y: "1888", t: "Muda-se para Arles; série dos Girassóis e O Quarto.", work: "vg-girassois" },
        { y: "1889", t: "Interna-se em Saint-Rémy; pinta A Noite Estrelada.", work: "vg-noite-estrelada" },
        { y: "1890", t: "Em Saint-Rémy, pinta Amendoeira em Flor para o sobrinho recém-nascido.", work: "vg-amendoeira" },
        { y: "1890", t: "Últimos meses em Auvers-sur-Oise; morre em 29 de julho." }
      ],
      style: {
        features: ["Pinceladas espessas e direcionais, que dão ritmo e movimento à superfície.", "Cores complementares intensas (amarelo e azul, vermelho e verde) usadas pelo efeito expressivo.", "Contornos marcados e áreas de cor chapada, influência das gravuras japonesas.", "Temas simples — quartos, flores, camponeses, paisagens e autorretratos — carregados de sentido pessoal."],
        technique: "Óleo aplicado com frequência em empasto (camadas grossas), às vezes direto do tubo; trabalhava rápido, muitas vezes ao ar livre.",
        materials: "Óleo sobre tela; também desenho a pena de junco, lápis e aquarela. Alguns pigmentos que usava, como certos vermelhos, desbotaram com o tempo.",
        influences: "Jean-François Millet, pintura holandesa, impressionismo, neoimpressionismo e xilogravura japonesa.",
        contributions: "Mostrou que cor e pincelada podem transmitir emoção diretamente, abrindo caminho para o fauvismo e o expressionismo."
      },
      curiosities: [
        "Mais de 800 cartas de Van Gogh sobreviveram, a maioria endereçadas a Theo; são uma das fontes mais ricas sobre o pensamento de um artista.",
        "Pintou mais de 35 autorretratos, a maior parte durante os anos em Paris.",
        "Fez três versões de O Quarto, hoje no Van Gogh Museum, no Art Institute of Chicago e no Musée d'Orsay.",
        "A Noite Estrelada mostra a vista da janela de seu quarto no asilo, mas a aldeia foi em parte imaginada: o quadro foi pintado de memória, no ateliê."
      ],
      legacy: [
        "Sua obra influenciou diretamente fauvistas como Henri Matisse e André Derain e os expressionistas alemães, que viram nele a prova de que pintar podia ser um ato de expressão pessoal.",
        "Hoje é um dos artistas mais conhecidos do mundo. O Van Gogh Museum, em Amsterdã, inaugurado em 1973, guarda a maior coleção de suas obras, em grande parte vinda da família de Theo."
      ],
      refs: [
        { label: "Van Gogh Museum, Amsterdã", url: "https://www.vangoghmuseum.nl" },
        { label: "Vincent van Gogh — The Letters (edição crítica das cartas)", url: "https://vangoghletters.org" },
        { label: "The Museum of Modern Art (MoMA)", url: "https://www.moma.org" },
        { label: "The National Gallery, Londres", url: "https://www.nationalgallery.org.uk" }
      ]
    },
    {
      slug: "frida-kahlo", name: "Frida Kahlo", fullName: "Magdalena Carmen Frida Kahlo y Calderón",
      nationality: "Mexicana", born: "6 de julho de 1907, Coyoacán (México)", died: "13 de julho de 1954, Coyoacán (México)",
      years: "1907–1954", period: "Século XX", movement: "Arte moderna mexicana", movementKeys: ["arte-mexicana"],
      cover: null,
      portrait: { src: "images/fk-retrato-foto.jpg", alt: "Fotografia colorida de Frida Kahlo com flores no cabelo, xale escuro e colares, diante de um fundo verde com flores", title: "Frida Kahlo fotografada por Nickolas Muray", date: "c. 1939", location: "Fotografia — direitos de Nickolas Muray Photo Archives" },
      summary: "Fez do autorretrato um território de identidade, dor física e cultura mexicana.",
      intro: "Pintando sobretudo a si mesma, Frida Kahlo transformou a experiência pessoal em uma reflexão sobre corpo, identidade e pertencimento.",
      bio: [
        { h: "Infância e origem", p: ["Frida nasceu na Casa Azul, em Coyoacán, hoje parte da Cidade do México. Era filha do fotógrafo Guillermo Kahlo, nascido na Alemanha, e de Matilde Calderón, mexicana de ascendência indígena e espanhola. Mais tarde passou a declarar 1910 como ano de nascimento, associando-se simbolicamente à Revolução Mexicana.", "Aos seis anos teve poliomielite, que deixou sua perna direita mais fina."] },
        { h: "O acidente e o início da pintura", p: ["Em 1922 ingressou na Escola Nacional Preparatória, uma das poucas moças admitidas. Em 17 de setembro de 1925, o ônibus em que viajava foi atingido por um bonde; ela sofreu fraturas graves na coluna, na pelve e na perna. Durante a longa recuperação começou a pintar deitada, com um cavalete adaptado e um espelho instalado sobre a cama."] },
        { h: "Diego Rivera e a vida pública", p: ["Em 1929 casou-se com o muralista Diego Rivera. O casamento, marcado por separações, viagens aos Estados Unidos e intensa militância política, terminou em divórcio em 1939; eles voltaram a se casar em 1940. Frida passou a usar trajes tradicionais, sobretudo da região de Tehuantepec, como afirmação de identidade."] },
        { h: "Desenvolvimento do estilo", p: ["Influenciada pela arte popular mexicana, pelos ex-votos (pequenas pinturas de agradecimento religioso) e pelo retrato tradicional, desenvolveu obras de pequeno formato, com figuras frontais, símbolos e cenários planos. Cerca de um terço de sua produção, de aproximadamente 200 pinturas, são autorretratos."] },
        { h: "Reconhecimento e desafios", p: ["Em 1938 fez sua primeira exposição individual, na Julien Levy Gallery, em Nova York. Em 1939 participou de uma mostra em Paris organizada com apoio de André Breton; na ocasião, o Estado francês adquiriu O Quadro (The Frame), hoje no Centre Pompidou. Breton a via como surrealista, mas Frida rejeitava o rótulo."] },
        { h: "Últimos anos e importância", p: ["Sua saúde piorou nos anos 1940 e 1950, com várias cirurgias na coluna e, em 1953, a amputação de parte da perna direita. Nesse ano, em sua única exposição individual no México, compareceu deitada em sua cama. Morreu em 1954, aos 47 anos. A Casa Azul tornou-se o Museo Frida Kahlo em 1958, e sua obra ganhou projeção mundial a partir dos anos 1970–80."] }
      ],
      timeline: [
        { y: "1907", t: "Nasce na Casa Azul, em Coyoacán." },
        { y: "1925", t: "Sofre grave acidente de ônibus; começa a pintar durante a recuperação." },
        { y: "1929", t: "Casa-se com Diego Rivera." },
        { y: "1931", t: "Em São Francisco, pinta Frida e Diego Rivera.", work: "fk-frida-diego" },
        { y: "1938", t: "Primeira exposição individual, em Nova York." },
        { y: "1939", t: "Exposição em Paris; pinta As Duas Fridas.", work: "fk-duas-fridas" },
        { y: "1940", t: "Pinta Autorretrato com Colar de Espinhos e Beija-flor; volta a se casar com Rivera.", work: "fk-colar-espinhos" },
        { y: "1943", t: "Pinta Autorretrato com Macacos.", work: "fk-monos" },
        { y: "1944", t: "Pinta A Coluna Partida, após cirurgia na coluna.", work: "fk-coluna-partida" },
        { y: "1946", t: "Após cirurgia em Nova York, pinta O Veado Ferido.", work: "fk-venado" },
        { y: "1953", t: "Única exposição individual no México." },
        { y: "1954", t: "Morre em Coyoacán." }
      ],
      style: {
        features: ["Autorretratos frontais, olhar direto ao observador.", "Símbolos da natureza e da cultura mexicana: macacos, beija-flores, plantas, raízes, corações.", "Espaço plano e decorativo, herdado dos ex-votos e da pintura popular.", "Representação explícita do corpo, da dor e de experiências íntimas."],
        technique: "Pintura minuciosa, de pincel fino, em camadas lisas e acabamento detalhado; formatos geralmente pequenos.",
        materials: "Óleo sobre tela, masonite (chapa de fibra) e, por vezes, folhas de metal, como nos ex-votos.",
        influences: "Arte popular mexicana, ex-votos, pintura colonial e retratística do século XIX, Diego Rivera e o ambiente pós-revolucionário.",
        contributions: "Ampliou o que podia ser tema de pintura — o corpo feminino, a doença, a identidade cultural — e tornou-se referência para a arte feminista e latino-americana."
      },
      curiosities: [
        "Frida declarava ter nascido em 1910, ano do início da Revolução Mexicana, embora sua certidão registre 1907.",
        "O Quadro (The Frame), adquirido em 1939, foi a primeira obra de um artista mexicano do século XX a entrar para uma coleção pública francesa.",
        "Seu diário ilustrado, mantido na última década de vida, foi publicado em fac-símile em 1995.",
        "Em 2004 foram abertos ao público objetos e vestidos guardados por décadas em um banheiro da Casa Azul, por decisão de Diego Rivera."
      ],
      legacy: [
        "Frida Kahlo tornou-se um dos nomes mais conhecidos da arte do século XX. Sua obra é estudada pela crítica feminista, pelos estudos sobre deficiência e pelos debates sobre identidade latino-americana.",
        "Sua imagem também circula amplamente na cultura de massa, o que muitas vezes simplifica sua obra. Conhecer as pinturas, seus símbolos e seu contexto histórico ajuda a ver a artista para além do ícone."
      ],
      refs: [
        { label: "Museo Frida Kahlo (Casa Azul)", url: "https://www.museofridakahlo.org.mx" },
        { label: "Museo de Arte Moderno, Cidade do México", url: "https://mam.inba.gob.mx" },
        { label: "Museo Dolores Olmedo", url: "https://museodoloresolmedo.org.mx" },
        { label: "Harry Ransom Center, University of Texas at Austin", url: "https://www.hrc.utexas.edu" }
      ]
    },
    {
      slug: "tarsila-do-amaral", name: "Tarsila do Amaral", fullName: "Tarsila do Amaral",
      nationality: "Brasileira", born: "1º de setembro de 1886, Capivari, SP (Brasil)", died: "17 de janeiro de 1973, São Paulo (Brasil)",
      years: "1886–1973", period: "Século XX", movement: "Modernismo brasileiro", movementKeys: ["modernismo-br"],
      cover: null,
      portrait: { src: "images/ta-retrato-foto.jpg", alt: "Fotografia em tom sépia de Tarsila do Amaral de perfil, com cabelo preso em coque, brincos longos e vestido escuro bordado", title: "Retrato fotográfico de Tarsila do Amaral", date: "década de 1920", location: "Autoria da fotografia não identificada — uso didático" },
      summary: "Criou uma imagem moderna do Brasil e inspirou o movimento antropofágico.",
      intro: "Tarsila aprendeu as vanguardas em Paris e as devolveu ao Brasil com cores de fazenda, curvas de morro e uma pergunta: o que é ser moderno e brasileiro?",
      bio: [
        { h: "Infância e origem", p: ["Tarsila nasceu em Capivari, no interior de São Paulo, em uma família de fazendeiros de café. Passou a infância em fazendas da região e estudou em São Paulo e, na adolescência, em Barcelona, onde fez seus primeiros quadros."] },
        { h: "Formação", p: ["Em São Paulo estudou escultura e desenho e teve aulas de pintura com Pedro Alexandrino e Georg Elpons. Em 1920 foi para Paris, onde frequentou a Académie Julian. Seu trabalho, nesse momento, ainda era de linguagem acadêmica."] },
        { h: "A Semana de 1922 e o Grupo dos Cinco", p: ["Tarsila não participou da Semana de Arte Moderna, em fevereiro de 1922, pois estava em Paris. Ao voltar, em junho, aproximou-se de Anita Malfatti, Mário de Andrade, Oswald de Andrade e Menotti Del Picchia, formando o chamado Grupo dos Cinco. Em 1923, em Paris, estudou com André Lhote, Albert Gleizes e Fernand Léger, assimilando o cubismo."] },
        { h: "Pau-Brasil e Antropofagia", p: ["Em 1924 viajou ao Carnaval do Rio e às cidades históricas de Minas Gerais com Oswald, Mário e o poeta suíço Blaise Cendrars. Dessa redescoberta do Brasil nasceu a fase Pau-Brasil: casas coloridas, vegetação, trens e cidades em formas geométricas e cores «caipiras». Casou-se com Oswald em 1926.", "Em 1928 pintou o Abaporu, presente de aniversário para Oswald, que o inspirou a escrever o Manifesto Antropófago: a proposta de «devorar» a cultura estrangeira e transformá-la em algo brasileiro."] },
        { h: "Fase social e últimos anos", p: ["A crise de 1929 afetou a fortuna da família. Em 1931 viajou à União Soviética e expôs em Moscou; em 1932 chegou a ser presa em São Paulo por suas posições políticas. Sua pintura passou a tratar de temas sociais, como em Operários (1933). Nas décadas seguintes retomou temas anteriores e foi homenageada em retrospectivas, como a do Museu de Arte Moderna do Rio, em 1969."] },
        { h: "Importância", p: ["Tarsila é considerada uma das criadoras da identidade visual do modernismo brasileiro. Sua obra une o vocabulário das vanguardas europeias a temas, cores e paisagens do Brasil."] }
      ],
      timeline: [
        { y: "1886", t: "Nasce em Capivari, SP." },
        { y: "1920", t: "Estuda na Académie Julian, em Paris." },
        { y: "1922", t: "Retorna ao Brasil após a Semana de Arte Moderna; forma o Grupo dos Cinco." },
        { y: "1923", t: "Estuda com Lhote, Gleizes e Léger; pinta A Negra.", work: "ta-a-negra" },
        { y: "1924", t: "Viagem a Minas Gerais; início da fase Pau-Brasil." },
        { y: "1926", t: "Primeira exposição individual, na Galerie Percier, em Paris." },
        { y: "1928", t: "Pinta o Abaporu; Oswald lança o Manifesto Antropófago.", work: "ta-abaporu" },
        { y: "1933", t: "Pinta Operários, marco de sua fase social.", work: "ta-operarios" },
        { y: "1973", t: "Morre em São Paulo." }
      ],
      style: {
        features: ["Formas simplificadas e arredondadas, com volumes lisos.", "Cores puras e luminosas — rosas, azuis, verdes e amarelos que ela associava ao interior do Brasil.", "Composição organizada, de influência cubista, especialmente de Fernand Léger.", "Temas brasileiros: paisagem rural, cidades, figuras populares, fauna e flora."],
        technique: "Pintura de superfície lisa, sem marcas evidentes de pincel, com contornos nítidos e áreas de cor bem definidas.",
        materials: "Sobretudo óleo sobre tela; desenhos a lápis e nanquim.",
        influences: "Cubismo, Fernand Léger, André Lhote, Albert Gleizes, arte popular brasileira e o ambiente modernista paulista.",
        contributions: "Deu forma visual às ideias do Pau-Brasil e da Antropofagia, e tornou-se referência para gerações de artistas brasileiros."
      },
      curiosities: [
        "O nome Abaporu vem do tupi e foi traduzido por Tarsila e Oswald como «homem que come gente».",
        "O Abaporu foi vendido em leilão em 1995 ao colecionador argentino Eduardo Costantini e hoje integra o acervo do MALBA, em Buenos Aires.",
        "Tarsila escreveu crônicas sobre arte para jornais durante décadas, textos hoje reunidos em livro."
      ],
      legacy: [
        "Tarsila tornou-se símbolo do modernismo brasileiro. A Antropofagia, que suas pinturas ajudaram a inspirar, foi retomada décadas depois pelo Tropicalismo e continua presente nos debates sobre cultura brasileira.",
        "Exposições internacionais recentes, como a realizada pelo MoMA em 2018, ampliaram o reconhecimento de sua obra fora do Brasil."
      ],
      refs: [
        { label: "Site oficial Tarsila do Amaral", url: "https://tarsiladoamaral.com.br" },
        { label: "MALBA — Museo de Arte Latinoamericano de Buenos Aires", url: "https://www.malba.org.ar" },
        { label: "Museu de Arte Contemporânea da USP (MAC USP)", url: "https://www.mac.usp.br" },
        { label: "Enciclopédia Itaú Cultural de Arte e Cultura Brasileira", url: "https://enciclopedia.itaucultural.org.br" }
      ]
    },
    {
      slug: "leonardo-da-vinci", name: "Leonardo da Vinci", fullName: "Leonardo di ser Piero da Vinci",
      nationality: "Italiano (Florença)", born: "15 de abril de 1452, Vinci (Toscana)", died: "2 de maio de 1519, Amboise (França)",
      years: "1452–1519", period: "Renascimento", movement: "Renascimento", movementKeys: ["renascimento"],
      cover: "ld-mona-lisa",
      portrait: { src: "images/foto-leonardo-da-vinci.jpg", alt: "Desenho a sanguínea do perfil de Leonardo da Vinci, com cabelos e barba longos", title: "Retrato de Leonardo (perfil)", date: "c. 1510", location: "Desenho atribuído a Francesco Melzi · Royal Collection · Domínio público" },
      summary: "Pintor, engenheiro e observador incansável, uniu arte e ciência no Renascimento.",
      intro: "Para Leonardo, pintar era uma forma de conhecimento: antes de retratar um sorriso, era preciso entender o músculo, a luz e o ar entre o olho e o rosto.",
      bio: [
        { h: "Infância e origem", p: ["Leonardo nasceu perto da vila de Vinci, na Toscana, filho ilegítimo do notário Ser Piero e de uma jovem chamada Caterina. Cresceu na casa da família paterna e recebeu educação básica, sem o estudo formal de latim reservado aos letrados."] },
        { h: "Formação no ateliê de Verrocchio", p: ["Ainda adolescente foi aprendiz no ateliê de Andrea del Verrocchio, em Florença, onde aprendeu pintura, escultura, desenho e técnicas de oficina. Em 1472 já estava registrado na guilda dos pintores. Atribui-se a ele o anjo à esquerda no Batismo de Cristo, de Verrocchio (c. 1475)."] },
        { h: "Milão e a corte dos Sforza", p: ["Por volta de 1482 mudou-se para Milão, oferecendo-se a Ludovico Sforza também como engenheiro militar. Lá pintou A Dama com Arminho e A Última Ceia, projetou festas da corte, estudou hidráulica e iniciou um monumental cavalo de bronze que nunca foi fundido."] },
        { h: "Florença, Roma e França", p: ["Com a invasão francesa de Milão, em 1499, passou por Veneza e Florença, onde começou a Mona Lisa por volta de 1503. Viveu novamente em Milão e depois em Roma. Em 1516 aceitou o convite do rei Francisco I e se instalou no solar de Clos Lucé, em Amboise, onde morreu em 1519."] },
        { h: "Arte e ciência", p: ["Seus cadernos, dos quais restam milhares de páginas escritas da direita para a esquerda, reúnem estudos de anatomia, óptica, botânica, geologia, voo e máquinas. Para ele, observar a natureza era a base da pintura: estudou a perspectiva, as proporções do corpo — como no Homem Vitruviano (c. 1490) — e a maneira como a luz modela as formas."] },
        { h: "Importância", p: ["Embora poucas pinturas sejam atribuídas a ele com segurança (menos de vinte), Leonardo é considerado o modelo do artista universal do Renascimento, e suas obras definiram novos padrões de naturalidade e composição."] }
      ],
      timeline: [
        { y: "1452", t: "Nasce em Vinci, na Toscana." },
        { y: "c. 1466–1472", t: "Aprendiz no ateliê de Verrocchio, em Florença." },
        { y: "c. 1482", t: "Muda-se para Milão, a serviço de Ludovico Sforza." },
        { y: "c. 1489–91", t: "Pinta A Dama com Arminho.", work: "ld-dama-arminho" },
        { y: "1495–98", t: "Pinta A Última Ceia no convento de Santa Maria delle Grazie.", work: "ld-ultima-ceia" },
        { y: "c. 1503", t: "Começa a Mona Lisa, em Florença.", work: "ld-mona-lisa" },
        { y: "1516", t: "Muda-se para a França a convite de Francisco I." },
        { y: "1519", t: "Morre em Amboise." }
      ],
      style: {
        features: ["Sfumato: transições suaves de luz e sombra, sem contornos duros, que dão aparência de atmosfera.", "Perspectiva atmosférica: o fundo fica mais azulado e difuso conforme se afasta.", "Composições piramidais e equilibradas.", "Gestos e expressões que revelam estados interiores."],
        technique: "Camadas finíssimas de tinta a óleo translúcida (veladuras), aplicadas lentamente; na Última Ceia, experimentou têmpera e óleo sobre parede seca.",
        materials: "Óleo sobre painéis de madeira (choupo, nogueira); têmpera; desenho a sanguínea, pena e ponta de metal.",
        influences: "Verrocchio, a tradição florentina, a pintura flamenga a óleo e a observação direta da natureza.",
        contributions: "Estabeleceu o sfumato, novos modelos de retrato e de composição narrativa, e a ideia de que a pintura é uma ciência do olhar."
      },
      curiosities: [
        "A Mona Lisa foi roubada do Louvre em 1911 por Vincenzo Peruggia e só foi recuperada em 1913, em Florença.",
        "Leonardo escrevia em escrita especular, da direita para a esquerda; era canhoto.",
        "A técnica experimental da Última Ceia fez a pintura começar a se deteriorar poucas décadas após ser concluída; a última grande restauração durou de 1978 a 1999."
      ],
      legacy: [
        "Rafael, Giorgione e muitos pintores do século XVI absorveram suas inovações de composição e de luz. A Mona Lisa tornou-se a pintura mais reproduzida e comentada do mundo, inclusive por artistas modernos como Marcel Duchamp e Andy Warhol.",
        "Seus cadernos permanecem fonte de estudo para historiadores da arte e da ciência, e a figura de Leonardo segue como símbolo da união entre criatividade e investigação."
      ],
      refs: [
        { label: "Musée du Louvre", url: "https://www.louvre.fr" },
        { label: "Museo del Cenacolo Vinciano, Milão", url: "https://cenacolovinciano.org" },
        { label: "Museu Nacional de Cracóvia", url: "https://mnk.pl" },
        { label: "Encyclopaedia Britannica", url: "https://www.britannica.com" }
      ]
    },
    {
      slug: "claude-monet", name: "Claude Monet", fullName: "Oscar-Claude Monet",
      nationality: "Francês", born: "14 de novembro de 1840, Paris (França)", died: "5 de dezembro de 1926, Giverny (França)",
      years: "1840–1926", period: "Séculos XIX–XX", movement: "Impressionismo", movementKeys: ["impressionismo"],
      cover: "cm-impressao",
      portrait: { src: "images/foto-claude-monet.jpg", alt: "Fotografia de Claude Monet com barba longa e chapéu", title: "Claude Monet fotografado por Nadar", date: "1899", location: "Foto: Nadar · Domínio público" },
      summary: "Perseguiu a luz e a atmosfera até dar nome ao impressionismo.",
      intro: "Monet pintou o mesmo lago, a mesma catedral e o mesmo monte de feno dezenas de vezes, porque nunca eram os mesmos: a luz mudava, e com ela o mundo.",
      bio: [
        { h: "Infância e origem", p: ["Nascido em Paris, Monet cresceu em Le Havre, na Normandia. Na adolescência ficou conhecido pelas caricaturas que vendia. O pintor Eugène Boudin o incentivou a pintar paisagens ao ar livre, experiência que ele mais tarde considerou decisiva."] },
        { h: "Formação", p: ["Em Paris frequentou a Académie Suisse, onde conheceu Camille Pissarro, e depois o ateliê de Charles Gleyre, onde se aproximou de Pierre-Auguste Renoir, Alfred Sisley e Frédéric Bazille. Nos anos 1860 teve obras aceitas no Salão oficial, mas também recusadas."] },
        { h: "O nascimento do impressionismo", p: ["Durante a guerra franco-prussiana (1870–71) esteve em Londres, onde viu obras de Turner e Constable. Em 1874, com colegas, organizou uma exposição independente no antigo ateliê do fotógrafo Nadar. O crítico Louis Leroy usou o título de Impressão, Nascer do Sol para chamar o grupo, ironicamente, de «impressionistas» — e o nome ficou."] },
        { h: "Dificuldades e reconhecimento", p: ["Os anos 1870 foram de dificuldades financeiras. Sua primeira esposa, Camille Doncieux, morreu em 1879. Na década de 1880 sua obra passou a vender melhor, em parte graças ao marchand Paul Durand-Ruel, e em 1883 Monet se instalou em Giverny."] },
        { h: "As séries e Giverny", p: ["A partir de 1890 pintou séries — Montes de Feno, Álamos, Catedral de Rouen — registrando o mesmo motivo em diferentes horas e estações. Em Giverny criou um jardim aquático com ninfeias e uma ponte em estilo japonês, tema de centenas de telas nas últimas três décadas de vida."] },
        { h: "Últimos anos", p: ["Com catarata, sua visão das cores se alterou; operou um dos olhos em 1923. Trabalhou até o fim nas grandes decorações de Nenúfares, doadas ao Estado francês e instaladas no Musée de l'Orangerie, em Paris, inauguradas em 1927, alguns meses após sua morte."] }
      ],
      timeline: [
        { y: "1840", t: "Nasce em Paris; cresce em Le Havre." },
        { y: "c. 1856", t: "Eugène Boudin o apresenta à pintura ao ar livre." },
        { y: "1872", t: "Pinta Impressão, Nascer do Sol, no porto de Le Havre.", work: "cm-impressao" },
        { y: "1874", t: "Primeira exposição do grupo impressionista, em Paris." },
        { y: "1883", t: "Muda-se para Giverny." },
        { y: "1890–94", t: "Séries dos Montes de Feno e da Catedral de Rouen." },
        { y: "1899", t: "Série da ponte japonesa sobre o lago das ninfeias.", work: "cm-ponte-japonesa" },
        { y: "1906", t: "Intensifica a série Nenúfares.", work: "cm-nenufares" },
        { y: "1926", t: "Morre em Giverny." }
      ],
      style: {
        features: ["Pinceladas curtas e soltas, que se misturam no olho do observador.", "Interesse pela luz, pelos reflexos na água e pela atmosfera (névoa, fumaça, neve).", "Sombras coloridas, sem uso do preto puro.", "Séries do mesmo motivo em diferentes condições de luz."],
        technique: "Pintura ao ar livre (en plein air), rápida, muitas vezes com várias telas em andamento ao mesmo tempo para acompanhar a mudança da luz.",
        materials: "Óleo sobre tela; aproveitou os tubos de tinta metálicos e as novas cores sintéticas do século XIX.",
        influences: "Eugène Boudin, Johan Barthold Jongkind, Turner, Constable e as gravuras japonesas que colecionava.",
        contributions: "Definiu o impressionismo e, nas obras tardias, aproximou-se de uma pintura quase abstrata, admirada por pintores abstratos do século XX."
      },
      curiosities: [
        "Monet colecionou mais de 200 gravuras japonesas, ainda expostas em sua casa em Giverny.",
        "Estima-se que tenha pintado cerca de 250 telas com o tema das ninfeias.",
        "O amigo Georges Clemenceau, político francês, apoiou a doação dos Nenúfares ao Estado."
      ],
      legacy: [
        "O impressionismo mudou a ideia do que podia ser uma pintura acabada e abriu caminho para o pós-impressionismo e para a arte moderna.",
        "Os grandes painéis de Nenúfares foram redescobertos nos anos 1950 por artistas e críticos ligados ao expressionismo abstrato, que viram neles um precursor da pintura de grande escala e sem centro."
      ],
      refs: [
        { label: "Musée Marmottan Monet, Paris", url: "https://www.marmottan.fr" },
        { label: "Musée de l'Orangerie, Paris", url: "https://www.musee-orangerie.fr" },
        { label: "The Metropolitan Museum of Art", url: "https://www.metmuseum.org" },
        { label: "Art Institute of Chicago", url: "https://www.artic.edu" },
        { label: "Fondation Claude Monet, Giverny", url: "https://fondation-monet.com" }
      ]
    },
    {
      slug: "pablo-picasso", name: "Pablo Picasso", fullName: "Pablo Ruiz Picasso",
      nationality: "Espanhol", born: "25 de outubro de 1881, Málaga (Espanha)", died: "8 de abril de 1973, Mougins (França)",
      years: "1881–1973", period: "Século XX", movement: "Cubismo", movementKeys: ["cubismo"],
      cover: null,
      portrait: { src: "images/foto-pablo-picasso.jpg", alt: "Fotografia colorida de Pablo Picasso idoso, de camiseta listrada e calça xadrez, sentado em uma cadeira de madeira ao lado de uma pintura apoiada numa cadeira de vime", title: "Pablo Picasso em sua casa em Cannes", date: "c. 1960", location: "Foto: Popperfoto / Getty Images · imagem protegida — uso didático (via biography.com)" },
      summary: "Reinventou a forma de representar figuras e objetos e co-criou o cubismo.",
      intro: "Ao longo de quase oito décadas de trabalho, Picasso desmontou a maneira tradicional de ver uma figura e montou outras tantas no lugar.",
      bio: [
        { h: "Infância e formação", p: ["Picasso nasceu em Málaga, filho de José Ruiz Blasco, pintor e professor de desenho, que foi seu primeiro mestre. A família mudou-se para A Coruña e depois para Barcelona, onde ele estudou na escola de belas-artes de La Llotja; em 1897 passou pela Real Academia de San Fernando, em Madri."] },
        { h: "Períodos azul e rosa", p: ["Em 1900 visitou Paris pela primeira vez e, em 1904, instalou-se no edifício conhecido como Bateau-Lavoir. Entre 1901 e 1904, após o suicídio do amigo Carles Casagemas, pintou figuras marginalizadas em tons de azul (período azul). De 1904 a 1906, os tons ficaram rosados e os temas passaram a incluir artistas de circo e saltimbancos (período rosa)."] },
        { h: "O cubismo", p: ["Em 1907 pintou Les Demoiselles d'Avignon, influenciado por Paul Cézanne, pela escultura ibérica e por objetos africanos vistos em Paris. A partir de 1908, com Georges Braque, desenvolveu o cubismo: primeiro analítico, decompondo as formas em facetas; depois sintético, com colagens e papéis colados a partir de 1912."] },
        { h: "Entre guerras", p: ["Nos anos 1910 e 1920 criou cenários e figurinos para os Balés Russos, alternou cubismo e uma fase de figuras neoclássicas e aproximou-se dos surrealistas. Em 1937, após o bombardeio da cidade basca de Guernica, pintou o grande painel Guernica para o Pavilhão da República Espanhola na Exposição Internacional de Paris."] },
        { h: "Últimos anos", p: ["Durante a Segunda Guerra permaneceu em Paris ocupada. Depois mudou-se para o sul da França, onde também se dedicou à cerâmica, em Vallauris, à escultura e à gravura. Trabalhou até o fim da vida, aos 91 anos, deixando uma das produções mais vastas da história da arte."] },
        { h: "Importância", p: ["Picasso é considerado um dos artistas mais influentes do século XX. Sua obra atravessa vários estilos e técnicas e mudou de forma duradoura a representação da figura humana."] }
      ],
      timeline: [
        { y: "1881", t: "Nasce em Málaga, Espanha." },
        { y: "1895", t: "A família muda-se para Barcelona." },
        { y: "1901–04", t: "Período azul." },
        { y: "1904–06", t: "Instala-se em Paris; período rosa." },
        { y: "1907", t: "Pinta Les Demoiselles d'Avignon.", work: "pp-demoiselles" },
        { y: "1908–14", t: "Desenvolve o cubismo com Georges Braque." },
        { y: "1937", t: "Pinta Guernica e A Mulher que Chora.", work: "pp-guernica" },
        { y: "1948", t: "Dedica-se à cerâmica em Vallauris." },
        { y: "1973", t: "Morre em Mougins, França." }
      ],
      style: {
        features: ["Fragmentação das formas em planos geométricos.", "Vários pontos de vista combinados em uma mesma imagem.", "Distorção expressiva de rostos e corpos.", "Mudanças constantes de estilo ao longo da carreira."],
        technique: "Óleo, colagem (papier collé), assemblage, gravura, escultura e cerâmica; experimentava materiais como tinta industrial.",
        materials: "Óleo sobre tela, papel colado, tinta esmalte, metal, madeira e argila.",
        influences: "Paul Cézanne, El Greco, escultura ibérica antiga, objetos africanos e a tradição espanhola de Velázquez e Goya.",
        contributions: "Co-criou o cubismo e a colagem como técnica artística, abrindo caminho para boa parte da arte moderna."
      },
      curiosities: [
        "Por desejo do próprio artista, Guernica permaneceu no MoMA de Nova York até 1981, quando foi levada à Espanha já democrática.",
        "A modelo de A Mulher que Chora foi a fotógrafa Dora Maar, que também fotografou as etapas de criação de Guernica.",
        "O título Les Demoiselles d'Avignon não foi dado por Picasso; surgiu anos depois, e ele não gostava dele."
      ],
      legacy: [
        "O cubismo influenciou o futurismo, o construtivismo, a abstração e também os modernistas brasileiros. A colagem tornou-se procedimento central da arte do século XX.",
        "Guernica tornou-se um dos símbolos universais contra a guerra e a violência sobre civis."
      ],
      refs: [
        { label: "Museo Nacional Centro de Arte Reina Sofía", url: "https://www.museoreinasofia.es" },
        { label: "The Museum of Modern Art (MoMA)", url: "https://www.moma.org" },
        { label: "Tate", url: "https://www.tate.org.uk" },
        { label: "Musée national Picasso-Paris", url: "https://www.museepicassoparis.fr" }
      ]
    },
    {
      slug: "romero-britto", name: "Romero Britto", fullName: "Romero Britto",
      nationality: "Brasileiro (radicado nos EUA)", born: "6 de outubro de 1963, Recife, PE (Brasil)", died: null,
      years: "1963– ", period: "Contemporâneo", movement: "Pop art / neo-pop", movementKeys: ["pop-art"],
      cover: null,
      portrait: { src: "images/foto-romero-britto.jpg", alt: "Fotografia de Romero Britto sorrindo, de óculos", title: "Romero Britto em Konstanz, Alemanha", date: "2012", location: "Foto: Dirk Vorderstraße · CC BY 3.0" },
      summary: "Levou cores vibrantes e contornos gráficos da pintura a campanhas, produtos e espaços públicos.",
      intro: "Do Recife a Miami, Romero Britto construiu uma linguagem gráfica imediatamente reconhecível, pensada para circular muito além das paredes de uma galeria.",
      bio: [
        { h: "Infância e origem", p: ["Romero Britto nasceu no Recife, em uma família de origem modesta. Começou a pintar ainda criança, de forma autodidata, usando os materiais que tinha à mão, como papel, papelão e jornal."] },
        { h: "Formação e influências", p: ["Sem formação acadêmica em artes, conheceu a obra de mestres modernos por livros e em viagens à Europa nos anos 1980. Ele próprio e a crítica citam como referências o cubismo, Henri Matisse, a pop art de Andy Warhol e Keith Haring e a arte urbana."] },
        { h: "Início da carreira nos EUA", p: ["No fim dos anos 1980 mudou-se para Miami, onde começou a expor e vender em espaços informais. Ganhou projeção internacional ao ser convidado para a campanha Absolut Art, da vodca Absolut, para a qual criou a obra Absolut Britto."] },
        { h: "Arte, marcas e espaços públicos", p: ["A partir dos anos 1990 sua obra passou a circular em colaborações com empresas e instituições, produtos licenciados, esculturas públicas e eventos esportivos, como trabalhos para a Copa do Mundo FIFA de 2010. Mantém galeria e estúdio em Miami, nos Estados Unidos."] },
        { h: "Reconhecimento e debates", p: ["Britto é um dos artistas brasileiros vivos mais conhecidos no exterior. Ao mesmo tempo, sua forte presença comercial divide a crítica especializada: para uns, é a continuidade da pop art; para outros, sua produção se aproxima mais do design e do licenciamento. Esse debate faz parte do estudo de sua obra."] }
      ],
      timeline: [
        { y: "1963", t: "Nasce no Recife, Pernambuco." },
        { y: "anos 1980", t: "Viaja pela Europa e conhece de perto a arte moderna." },
        { y: "fim dos anos 1980", t: "Muda-se para Miami, EUA." },
        { y: "c. 1988–89", t: "Cria Absolut Britto para a campanha Absolut Art.", work: "rb-absolut" },
        { y: "2000", t: "Britto Garden, serigrafia.", work: "rb-garden" },
        { y: "2004", t: "Mona Cat, releitura bem-humorada da Mona Lisa.", work: "rb-mona-cat" },
        { y: "2009–10", t: "Cria arte para a Copa do Mundo FIFA de 2010.", work: "rb-copa-2010" }
      ],
      style: {
        features: ["Cores vibrantes e saturadas, em áreas chapadas.", "Contornos pretos grossos que separam as áreas de cor, como em um vitral ou quadrinho.", "Padrões gráficos — listras, bolinhas, quadriculados — preenchendo as formas.", "Temas otimistas: corações, flores, animais (sobretudo gatos e cães), casais e personalidades."],
        technique: "Composição dividida em campos geométricos, com influência visível do cubismo; produção que inclui pinturas originais e múltiplos (serigrafias e gravuras digitais).",
        materials: "Acrílica sobre tela, serigrafia, esculturas em resina, metal e fibra de vidro, além de objetos licenciados.",
        influences: "Cubismo, Henri Matisse, pop art (Andy Warhol, Keith Haring) e arte urbana.",
        contributions: "Exemplifica a aproximação entre arte, design e cultura de consumo característica da arte pop e do neo-pop contemporâneo."
      },
      curiosities: [
        "Mona Cat dialoga diretamente com a Mona Lisa de Leonardo da Vinci, outro artista desta galeria.",
        "Suas esculturas públicas estão em cidades de vários países, incluindo Estados Unidos e Alemanha.",
        "Grande parte de suas obras mais conhecidas circula como serigrafias em edições numeradas, e não como peças únicas."
      ],
      legacy: [
        "Por ser um artista vivo e em atividade, seu legado ainda está em construção. Sua obra é um bom ponto de partida para discutir as relações entre arte, mercado, publicidade e cultura popular — temas centrais da pop art desde os anos 1960.",
        "Também é frequentemente usado em atividades escolares de releitura, pela clareza de suas formas e cores."
      ],
      note: "Títulos e datas conferidos em catálogos de galerias e em bases de dados de arte (WikiArt, artnet). Para uso de imagens, contate o estúdio do artista.",
      refs: [
        { label: "Site oficial de Romero Britto", url: "https://britto.com" },
        { label: "WikiArt — catálogo de obras de Romero Britto", url: "https://www.wikiart.org/en/romero-britto" },
        { label: "artnet — perfil e obras", url: "https://www.artnet.com/artists/romero-britto/" }
      ]
    },
    {
      slug: "candido-portinari", name: "Cândido Portinari", fullName: "Candido Portinari",
      nationality: "Brasileiro", born: "30 de dezembro de 1903, Brodowski, SP (Brasil)", died: "6 de fevereiro de 1962, Rio de Janeiro (Brasil)",
      years: "1903–1962", period: "Século XX", movement: "Modernismo brasileiro", movementKeys: ["modernismo-br"],
      cover: null,
      portrait: { src: "images/foto-candido-portinari.jpg", alt: "Fotografia em preto e branco de Cândido Portinari, de óculos e gravata", title: "Cândido Portinari", date: "c. 1950", location: "Foto: autoria não identificada · Wikimedia Commons (domínio público)" },
      summary: "Retratou o povo brasileiro, o trabalho no campo e as desigualdades sociais.",
      intro: "Filho de imigrantes que trabalhavam no café, Portinari levou para museus e murais de todo o mundo os rostos, as mãos e as histórias do povo brasileiro.",
      bio: [
        { h: "Infância em Brodowski", p: ["Portinari nasceu em uma fazenda de café em Brodowski, no interior de São Paulo, filho de imigrantes italianos. A infância entre trabalhadores rurais, brincadeiras de rua e paisagens de terra vermelha seria tema constante de sua pintura. Aos 15 anos ajudou pintores que decoravam a igreja local."] },
        { h: "Formação", p: ["Em 1919 mudou-se para o Rio de Janeiro e estudou na Escola Nacional de Belas Artes. Em 1928 ganhou o Prêmio de Viagem ao Estrangeiro e viveu em Paris entre 1929 e 1930. Longe do Brasil, decidiu pintar sua terra e sua gente."] },
        { h: "Reconhecimento internacional", p: ["Em 1935 a tela Café recebeu menção honrosa na exposição internacional do Carnegie Institute, em Pittsburgh (EUA). Nos anos seguintes pintou os murais do Ministério da Educação e Saúde, no Rio, e, em 1940, o MoMA de Nova York realizou a mostra Portinari of Brazil. Em 1941 executou murais para a Biblioteca do Congresso, em Washington."] },
        { h: "Arte e compromisso social", p: ["Nos anos 1940 sua pintura ganhou tom dramático, como na série dos Retirantes (1944), sobre famílias que fugiam da seca no Nordeste. Filiado ao Partido Comunista, candidatou-se a deputado em 1945 e a senador em 1947, sem se eleger, e passou um período no Uruguai."] },
        { h: "Guerra e Paz e últimos anos", p: ["Entre 1952 e 1956 realizou os painéis Guerra e Paz, presente do governo brasileiro à sede da ONU, em Nova York. Já sofria intoxicação pelo chumbo presente nas tintas e tinha recebido recomendação médica para parar de pintar, mas continuou trabalhando. Morreu no Rio de Janeiro em 1962."] },
        { h: "Importância", p: ["Portinari deixou cerca de 5 mil obras, de pequenos esboços a murais monumentais. É um dos artistas brasileiros mais reconhecidos internacionalmente e uma referência da arte de temática social."] }
      ],
      timeline: [
        { y: "1903", t: "Nasce em Brodowski, SP." },
        { y: "1919", t: "Estuda na Escola Nacional de Belas Artes, no Rio de Janeiro." },
        { y: "1928", t: "Ganha o Prêmio de Viagem ao Estrangeiro; vive em Paris em 1929–30." },
        { y: "1934", t: "Pinta O Lavrador de Café.", work: "cp-lavrador" },
        { y: "1935", t: "Café recebe menção honrosa no Carnegie Institute, EUA." },
        { y: "1940", t: "Exposição Portinari of Brazil, no MoMA." },
        { y: "1944", t: "Série Retirantes.", work: "cp-retirantes" },
        { y: "1952–56", t: "Pinta os painéis Guerra e Paz para a ONU.", work: "cp-guerra-paz" },
        { y: "1962", t: "Morre no Rio de Janeiro." }
      ],
      style: {
        features: ["Figuras monumentais, com mãos e pés grandes que enfatizam o trabalho físico.", "Temas do povo brasileiro: lavradores, retirantes, crianças, festas e brincadeiras.", "Paleta de terras e ocres, contrastada com azuis intensos.", "Diálogo com o muralismo mexicano e com o expressionismo nas obras de denúncia social."],
        technique: "Pintura a óleo e afresco; desenvolvia estudos detalhados antes das grandes composições.",
        materials: "Óleo sobre tela e sobre madeira, afresco, têmpera, desenho a grafite e carvão.",
        influences: "Pintura italiana do Renascimento, Picasso, muralismo mexicano e a memória de Brodowski.",
        contributions: "Consolidou a pintura de temática social no Brasil e levou a imagem do trabalhador brasileiro a instituições internacionais."
      },
      curiosities: [
        "O Projeto Portinari, criado em 1979 por seu filho João Candido Portinari, catalogou suas obras e documentos.",
        "Os painéis Guerra e Paz medem cerca de 14 × 10 metros cada e foram expostos no Brasil antes de seguir para Nova York.",
        "Entre 2010 e 2015, Guerra e Paz voltou temporariamente ao Brasil para restauração e exposições."
      ],
      legacy: [
        "Portinari ajudou a fixar uma imagem do Brasil rural e trabalhador no imaginário nacional e internacional. Suas obras estão em museus como o MASP, o MNBA e o MoMA.",
        "A casa onde viveu em Brodowski tornou-se o Museu Casa de Portinari, que preserva pinturas murais feitas por ele."
      ],
      refs: [
        { label: "Projeto Portinari", url: "https://www.portinari.org.br" },
        { label: "MASP — Museu de Arte de São Paulo", url: "https://masp.org.br" },
        { label: "Organização das Nações Unidas", url: "https://www.un.org" },
        { label: "Enciclopédia Itaú Cultural", url: "https://enciclopedia.itaucultural.org.br" }
      ]
    },
    {
      slug: "anita-malfatti", name: "Anita Malfatti", fullName: "Anita Catarina Malfatti",
      nationality: "Brasileira", born: "2 de dezembro de 1889, São Paulo (Brasil)", died: "6 de novembro de 1964, Diadema, SP (Brasil)",
      years: "1889–1964", period: "Século XX", movement: "Modernismo brasileiro / Expressionismo", movementKeys: ["modernismo-br", "expressionismo"],
      cover: null,
      portrait: { src: "images/foto-anita-malfatti.webp", alt: "Retrato fotográfico de Anita Malfatti aos 23 anos", title: "Retrato de Anita Malfatti aos 23 anos", date: "1912", location: "Fotografia de autoria não identificada" },
      summary: "Sua exposição de 1917 provocou o debate que abriu caminho para o modernismo brasileiro.",
      intro: "Anita Malfatti trouxe para São Paulo uma pintura de cores livres e formas tensas, e a reação que ela provocou ajudou a reunir uma geração.",
      bio: [
        { h: "Infância e origem", p: ["Anita nasceu em São Paulo, filha do engenheiro italiano Samuel Malfatti e de Eleonora Elizabeth (Betty) Krug, de origem alemã e norte-americana, que pintava e foi sua primeira professora. Nasceu com uma atrofia no braço e na mão direitos e aprendeu a pintar com a mão esquerda."] },
        { h: "Formação na Alemanha", p: ["Entre 1910 e 1914 estudou em Berlim, onde teve aulas com Lovis Corinth, entre outros, e conheceu a pintura expressionista. Em 1912 visitou a grande exposição Sonderbund, em Colônia, que reunia obras de Van Gogh, Munch, Cézanne e Picasso."] },
        { h: "Nova York", p: ["Em 1915 e 1916 viveu em Nova York, estudou na Art Students League e na Independent School of Art, com Homer Boss, que estimulava a liberdade de cor e de forma. Nesse período pintou A Estudante Russa, O Homem Amarelo e A Boba."] },
        { h: "A exposição de 1917", p: ["Em dezembro de 1917 inaugurou em São Paulo uma exposição com mais de 50 trabalhos. Em 20 de dezembro, Monteiro Lobato publicou no jornal O Estado de S. Paulo uma crítica dura, depois reeditada com o título Paranoia ou mistificação?. A polêmica uniu jovens como Mário de Andrade, Oswald de Andrade e Di Cavalcanti em defesa da pintora e da arte moderna."] },
        { h: "Semana de 22 e trajetória posterior", p: ["Anita participou da Semana de Arte Moderna de 1922 e integrou o Grupo dos Cinco. Entre 1923 e 1928 viveu em Paris com bolsa do Pensionato Artístico do Estado de São Paulo, e sua pintura ficou mais serena. De volta ao Brasil, lecionou e, nas últimas décadas, pintou temas populares e religiosos com linguagem simples."] },
        { h: "Importância", p: ["Anita Malfatti é considerada pioneira do modernismo brasileiro. Sua exposição de 1917 é vista pela historiografia como um dos marcos iniciais do movimento."] }
      ],
      timeline: [
        { y: "1889", t: "Nasce em São Paulo." },
        { y: "1910–14", t: "Estuda em Berlim; contato com o expressionismo." },
        { y: "1915–16", t: "Estuda em Nova York; pinta suas obras mais conhecidas.", work: "am-homem-amarelo" },
        { y: "1917", t: "Exposição de Pintura Moderna em São Paulo; crítica de Monteiro Lobato." },
        { y: "1922", t: "Participa da Semana de Arte Moderna." },
        { y: "1923–28", t: "Vive em Paris como bolsista." },
        { y: "1964", t: "Morre em Diadema, SP." }
      ],
      style: {
        features: ["Cores fortes e não naturalistas (rostos esverdeados, fundos intensos).", "Formas simplificadas e alongadas, com deformações expressivas.", "Pinceladas visíveis e enérgicas.", "Retratos que enfatizam o estado psicológico do modelo."],
        technique: "Óleo aplicado com pinceladas largas e contornos marcados; nas obras de 1915–17, a cor estrutura a composição.",
        materials: "Óleo sobre tela; desenho a carvão e pastel.",
        influences: "Expressionismo alemão, Lovis Corinth, Homer Boss, fauvismo e pós-impressionismo.",
        contributions: "Introduziu no Brasil uma pintura moderna que rompia com o academismo e provocou o debate inicial do modernismo."
      },
      curiosities: [
        "O Homem Amarelo foi comprado por Mário de Andrade e hoje pertence à coleção dele, no Instituto de Estudos Brasileiros da USP.",
        "O título Paranoia ou mistificação? foi dado ao texto de Monteiro Lobato quando ele o republicou em livro; no jornal, chamava-se A propósito da exposição Malfatti.",
        "Anita pintava com a mão esquerda por causa de uma condição congênita no braço direito."
      ],
      legacy: [
        "Sua coragem em expor uma pintura nova num ambiente conservador ajudou a criar o grupo que organizaria a Semana de 1922.",
        "Estudos recentes também revisam a ideia de que a crítica de 1917 teria «encerrado» sua carreira, valorizando as fases posteriores de sua obra."
      ],
      refs: [
        { label: "Instituto de Estudos Brasileiros da USP (IEB)", url: "https://www.ieb.usp.br" },
        { label: "Museu de Arte Contemporânea da USP (MAC USP)", url: "https://www.mac.usp.br" },
        { label: "Enciclopédia Itaú Cultural", url: "https://enciclopedia.itaucultural.org.br" }
      ]
    },
    {
      slug: "edvard-munch", name: "Edvard Munch", fullName: "Edvard Munch",
      nationality: "Norueguês", born: "12 de dezembro de 1863, Løten (Noruega)", died: "23 de janeiro de 1944, Ekely, Oslo (Noruega)",
      years: "1863–1944", period: "Séculos XIX–XX", movement: "Expressionismo (precursor)", movementKeys: ["expressionismo"],
      cover: "em-grito",
      portrait: { src: "images/foto-edvard-munch.jpg", alt: "Fotografia em preto e branco de Edvard Munch idoso, de terno", title: "Edvard Munch fotografado por Anders Beer Wilse", date: "1921", location: "Foto: Anders Beer Wilse · Domínio público" },
      summary: "Pintou a vida interior — amor, medo, perda e também a luz — e antecipou o expressionismo.",
      intro: "Munch quis pintar não o que via, mas o que tinha vivido: por isso suas paisagens tremem, seus céus queimam e seus rostos se tornam máscaras.",
      bio: [
        { h: "Infância e origem", p: ["Munch nasceu em Løten e cresceu em Kristiania (atual Oslo). Seu pai, Christian, era médico militar e muito religioso. A mãe morreu de tuberculose quando Edvard tinha cinco anos, e a irmã Sophie, da mesma doença, quando ele tinha 14. Essas perdas marcaram temas de sua obra, como A Criança Doente (1885–86)."] },
        { h: "Formação", p: ["Abandonou o curso de engenharia para estudar na Escola Real de Desenho de Kristiania e recebeu orientação do pintor naturalista Christian Krohg. Conviveu com a boemia da cidade, que discutia liberdade individual e crítica à moral burguesa."] },
        { h: "Paris e Berlim", p: ["Com uma bolsa, esteve em Paris a partir de 1889, onde conheceu o impressionismo e a obra de Gauguin e Van Gogh. Em 1892, uma exposição sua em Berlim foi fechada após poucos dias por causar escândalo, o que o tornou conhecido e contribuiu para a criação da Secessão de Berlim."] },
        { h: "O Friso da Vida", p: ["Nos anos 1890 concebeu o Friso da Vida, um ciclo de pinturas sobre amor, ansiedade e morte, que inclui O Grito, Madonna e Ansiedade. Também se tornou um grande gravador, com litografias e xilogravuras que exploram os veios da madeira."] },
        { h: "Maturidade e últimos anos", p: ["Após uma crise em 1908, tratou-se em uma clínica em Copenhague e voltou à Noruega. Pintou então os murais do salão nobre da Universidade de Oslo (1909–1916), dominados por O Sol, uma obra luminosa. Em 1916 comprou a propriedade de Ekely, onde pintou paisagens, trabalhadores e autorretratos até morrer, em 1944. Em 1937 os nazistas retiraram dezenas de obras suas de museus alemães, classificando-as como «arte degenerada»."] },
        { h: "Importância", p: ["Munch deixou suas obras para a cidade de Oslo, base do Museu Munch. É considerado um dos precursores do expressionismo e um dos artistas mais importantes da Escandinávia."] }
      ],
      timeline: [
        { y: "1863", t: "Nasce em Løten, Noruega." },
        { y: "1868", t: "Morte da mãe, por tuberculose." },
        { y: "1885–86", t: "Pinta A Criança Doente." },
        { y: "1892", t: "Exposição em Berlim fechada após escândalo." },
        { y: "1893", t: "Pinta O Grito.", work: "em-grito" },
        { y: "1894", t: "Pinta Ansiedade e a Madonna do Nasjonalmuseet.", work: "em-ansiedade" },
        { y: "1909–16", t: "Murais da Universidade de Oslo, incluindo O Sol." },
        { y: "1944", t: "Morre em Ekely, Oslo." }
      ],
      style: {
        features: ["Linhas sinuosas e ondulantes que unem figura e paisagem.", "Cores simbólicas e não naturalistas, como o céu vermelho-alaranjado de O Grito.", "Figuras simplificadas, às vezes com rostos semelhantes a máscaras.", "Temas que se repetem em várias versões ao longo de décadas."],
        technique: "Superfícies às vezes deixadas inacabadas, tinta diluída que escorre, raspagens; experimentação com litografia e xilogravura.",
        materials: "Óleo, têmpera, pastel e lápis sobre tela ou cartão; matrizes de madeira e pedra para gravura.",
        influences: "Naturalismo norueguês, impressionismo, Gauguin, Van Gogh, simbolismo e a literatura escandinava do período.",
        contributions: "Fez da pintura um meio de expressar estados psicológicos, influenciando decisivamente o expressionismo alemão."
      },
      curiosities: [
        "Há uma pequena inscrição a lápis na versão de 1893 de O Grito: «Só pode ter sido pintado por um louco». Em 2021, o Nasjonalmuseet confirmou que a letra é do próprio Munch.",
        "Munch fez várias versões de O Grito: pinturas, pastéis e uma litografia de 1895 que ampliou sua circulação.",
        "As versões de O Grito do Nasjonalmuseet (1994) e do Museu Munch (2004) foram roubadas e depois recuperadas."
      ],
      legacy: [
        "Os expressionistas alemães dos grupos A Ponte e O Cavaleiro Azul viram em Munch um precursor. O Grito tornou-se imagem universal da ansiedade moderna, reproduzida na cultura popular.",
        "Reduzir Munch à angústia, porém, deixa de fora a luz de O Sol, as paisagens de Ekely e seu interesse pelo trabalho e pela natureza. Em 2021 Oslo inaugurou o novo prédio do museu MUNCH."
      ],
      refs: [
        { label: "MUNCH — Museu Munch, Oslo", url: "https://www.munchmuseet.no" },
        { label: "Nasjonalmuseet — Museu Nacional da Noruega", url: "https://www.nasjonalmuseet.no" },
        { label: "Encyclopaedia Britannica", url: "https://www.britannica.com" }
      ]
    }
  ];

  var works = [
    { id: "vg-noite-estrelada", artist: "vincent-van-gogh", title: "A Noite Estrelada", original: "De sterrennacht", date: "Junho de 1889", year: 1889, technique: "Óleo sobre tela", dims: "73,7 × 92,1 cm", ratio: 92.1/73.7, location: "The Museum of Modern Art (MoMA), Nova York", period: "xix", movement: "pos-impressionismo",
      img: "Van Gogh - Starry Night - Google Art Project.jpg",
      desc: "Pintada no asilo de Saint-Rémy, mostra um céu em turbilhão sobre uma aldeia tranquila, com um cipreste escuro em primeiro plano ligando a terra ao céu. As pinceladas curvas e o contraste entre azuis e amarelos dão ao céu um movimento quase sonoro.",
      fact: "Van Gogh a pintou de dia, no ateliê, combinando a vista da janela com elementos imaginados; ele não a considerava uma de suas melhores obras.", featured: true },
    { id: "vg-girassois", artist: "vincent-van-gogh", title: "Girassóis", original: "Zonnebloemen", date: "Agosto de 1888", year: 1888, technique: "Óleo sobre tela", dims: "92,1 × 73 cm", ratio: 73/92.1, location: "The National Gallery, Londres", period: "xix", movement: "pos-impressionismo",
      img: "Vincent Willem van Gogh 127.jpg",
      desc: "Faz parte de uma série pintada em Arles para decorar o quarto destinado a Paul Gauguin na Casa Amarela. Variações de amarelo — sobre fundo também amarelo — mostram flores em diferentes estágios, do botão ao murchamento.",
      fact: "Van Gogh assinou esta tela no vaso, com seu primeiro nome, Vincent, como costumava fazer.", featured: true },
    { id: "vg-quarto", artist: "vincent-van-gogh", title: "O Quarto em Arles", original: "De slaapkamer", date: "Outubro de 1888", year: 1888, technique: "Óleo sobre tela", dims: "72,4 × 91,3 cm", ratio: 91.3/72.4, location: "Van Gogh Museum, Amsterdã", period: "xix", movement: "pos-impressionismo",
      img: "Vincent van Gogh - De slaapkamer - Google Art Project.jpg",
      desc: "O quarto do artista na Casa Amarela, com cores puras e perspectiva inclinada. Em carta a Theo, Van Gogh disse que queria expressar repouso por meio das cores.",
      fact: "Existem três versões; esta é a primeira. As paredes, hoje azuladas, eram originalmente violeta — o pigmento vermelho desbotou." },
    { id: "vg-autorretrato-1889", artist: "vincent-van-gogh", title: "Autorretrato", original: "Portrait de l'artiste", date: "Setembro de 1889", year: 1889, technique: "Óleo sobre tela", dims: "65 × 54,2 cm", ratio: 54.2/65, location: "Musée d'Orsay, Paris", period: "xix", movement: "pos-impressionismo",
      img: "Vincent van Gogh - Self-Portrait - Google Art Project (454045).jpg",
      desc: "Um dos últimos autorretratos, pintado em Saint-Rémy. O fundo de arabescos azul-claros e o casaco se fundem no mesmo ritmo ondulante, enquanto o rosto, em tons alaranjados, se destaca com firmeza.",
      fact: "Van Gogh pintou mais de 35 autorretratos; este pertence ao Musée d'Orsay desde 1986, por doação." },
    { id: "vg-autorretrato-feltro", artist: "vincent-van-gogh", title: "Autorretrato com Chapéu de Feltro Cinza", original: "Zelfportret met grijze vilthoed", date: "1887", year: 1887, technique: "Óleo sobre tela", dims: "44,5 × 37,2 cm", ratio: 37.2/44.5, location: "Van Gogh Museum, Amsterdã", period: "xix", movement: "pos-impressionismo",
      img: "Vincent van Gogh - Self-portrait with grey felt hat - Google Art Project.jpg",
      desc: "Pintado em Paris, mostra a absorção da técnica neoimpressionista: pinceladas curtas, de cores complementares, que se irradiam ao redor da cabeça como um halo.",
      fact: "Nos anos em Paris, autorretratos eram também um modo barato de experimentar cor, já que ele não podia pagar modelos." },
    { id: "vg-girassois-munique", artist: "vincent-van-gogh", title: "Doze Girassóis numa Jarra", original: "Zwölf Sonnenblumen in einer Vase", date: "Agosto de 1888", year: 1888, technique: "Óleo sobre tela", dims: "91 × 72 cm", ratio: 72/91, location: "Neue Pinakothek (Bayerische Staatsgemäldesammlungen), Munique", period: "xix", movement: "pos-impressionismo",
      img: null, local: "images/vg-girassois-munique.jpeg",
      desc: "Outra versão da série pintada em Arles, com doze flores sobre um fundo azul-claro que faz os amarelos vibrarem. As pinceladas grossas modelam pétalas, sementes e a jarra quase como relevo.",
      fact: "Van Gogh pintou várias versões dos Girassóis em Arles; esta pertence ao acervo público da Baviera desde 1912." },
    { id: "vg-amendoeira", artist: "vincent-van-gogh", title: "Amendoeira em Flor", original: "Amandelbloesem", date: "Fevereiro de 1890", year: 1890, technique: "Óleo sobre tela", dims: "73,3 × 92,4 cm", ratio: 92.4/73.3, location: "Van Gogh Museum, Amsterdã", period: "xix", movement: "pos-impressionismo",
      img: "Vincent van Gogh - Almond blossom - Google Art Project.jpg",
      desc: "Galhos floridos contra um céu azul-turquesa, vistos de baixo e recortados como numa gravura japonesa. Pintado em Saint-Rémy, celebra o nascimento do sobrinho Vincent Willem, filho de Theo e Jo.",
      fact: "As flores de amendoeira desabrocham no fim do inverno — por isso eram, para Van Gogh, um símbolo de vida nova.", featured: true },

    { id: "fk-duas-fridas", artist: "frida-kahlo", title: "As Duas Fridas", original: "Las dos Fridas", date: "1939", year: 1939, technique: "Óleo sobre tela", dims: "173,5 × 173 cm", ratio: 1, location: "Museo de Arte Moderno, Cidade do México", period: "xx1", movement: "arte-mexicana",
      img: null, local: "images/fk-duas-fridas.jpg", license: "Domínio público no Brasil desde 1º/1/2025 (autora falecida em 1954; Lei 9.610/98, art. 41). A obra ainda é protegida no México. Imagem enviada pela equipe do projeto.",
      desc: "Duas Fridas sentadas lado a lado, de mãos dadas, com os corações expostos e ligados por uma veia. Uma veste um traje de inspiração europeia; a outra, um traje tehuana. Fato documentado: a obra foi pintada no ano do divórcio de Diego Rivera e exposta em 1940. Interpretação frequente: a tela trataria da dupla herança cultural da artista e da ruptura afetiva.",
      fact: "É uma de suas maiores telas; a maioria de suas obras tem formato pequeno.", featured: true },
    { id: "fk-colar-espinhos", artist: "frida-kahlo", title: "Autorretrato com Colar de Espinhos e Beija-flor", original: "Autorretrato con collar de espinas y colibrí", date: "1940", year: 1940, technique: "Óleo sobre tela", dims: "61,25 × 47 cm", ratio: 47/61.25, location: "Harry Ransom Center, University of Texas at Austin (Coleção Nickolas Muray)", period: "xx1", movement: "arte-mexicana",
      img: null, local: "images/fk-colar-espinhos.webp", license: "Domínio público no Brasil desde 1º/1/2025 (autora falecida em 1954; Lei 9.610/98, art. 41). Ainda protegida no México. Imagem enviada pela equipe do projeto.",
      desc: "Frida aparece de frente, com um colar de espinhos que fere seu pescoço e do qual pende um beija-flor morto; atrás dela, um macaco e um gato preto, e um fundo de folhas. Interpretação: os espinhos remetem à iconografia cristã da paixão; o beija-flor, na tradição popular mexicana, é associado a amuletos de amor.",
      fact: "A tela pertenceu ao fotógrafo Nickolas Muray, amigo e ex-companheiro da artista." },
    { id: "fk-coluna-partida", artist: "frida-kahlo", title: "A Coluna Partida", original: "La columna rota", date: "1944", year: 1944, technique: "Óleo sobre masonite", dims: "39,8 × 30,6 cm", ratio: 30.6/39.8, location: "Museo Dolores Olmedo, Cidade do México", period: "xx1", movement: "arte-mexicana",
      img: null, local: "images/fk-coluna-partida.webp", license: "Domínio público no Brasil desde 1º/1/2025 (autora falecida em 1954; Lei 9.610/98, art. 41). Ainda protegida no México. Imagem enviada pela equipe do projeto.",
      desc: "O corpo da artista aparece aberto, com uma coluna jônica rachada no lugar da espinha, preso por um colete de metal e cravado de pregos, diante de uma paisagem árida. Fato documentado: foi pintada após uma cirurgia na coluna, quando Frida passou a usar coletes ortopédicos.",
      fact: "Apesar das lágrimas, o rosto permanece sereno e encara o observador — um traço recorrente em seus autorretratos." },
    { id: "fk-frida-diego", artist: "frida-kahlo", title: "Frida e Diego Rivera", original: "Frieda y Diego Rivera", date: "1931", year: 1931, technique: "Óleo sobre tela", dims: "100 × 78,7 cm", ratio: 78.7/100, location: "San Francisco Museum of Modern Art (SFMOMA), São Francisco", period: "xx1", movement: "arte-mexicana",
      img: null, local: "images/fk-frida-diego.jpg", license: "Domínio público no Brasil desde 1º/1/2025 (autora falecida em 1954; Lei 9.610/98, art. 41). A obra ainda é protegida no México. Imagem enviada pela equipe do projeto.",
      desc: "Retrato de casamento pintado em São Francisco, onde Diego Rivera fazia murais. Ele segura a paleta e os pincéis; ela, menor e de traje tradicional, apoia-se em seu braço. Uma pomba carrega uma faixa com uma dedicatória, à maneira dos retratos populares mexicanos.",
      fact: "A dedicatória da faixa menciona o colecionador Albert Bender, amigo do casal, para quem o quadro foi pintado." },
    { id: "fk-monos", artist: "frida-kahlo", title: "Autorretrato com Macacos", original: "Autorretrato con monos", date: "1943", year: 1943, technique: "Óleo sobre tela", dims: "81,5 × 63 cm", ratio: 63/81.5, location: "Coleção Jacques e Natasha Gelman (Fundación Vergel), Cuernavaca", period: "xx1", movement: "arte-mexicana",
      img: null, local: "images/fk-monos.jpg", license: "Domínio público no Brasil desde 1º/1/2025 (autora falecida em 1954; Lei 9.610/98, art. 41). A obra ainda é protegida no México. Imagem enviada pela equipe do projeto.",
      desc: "Frida aparece de frente, de blusa branca, cercada por quatro macacos-aranha diante de folhas tropicais e uma ave-do-paraíso. Fato documentado: ela criava macacos na Casa Azul. Interpretação frequente: os animais funcionariam como companhia e proteção, aproximando natureza e afeto.",
      fact: "Os macacos aparecem em vários autorretratos; um deles, chamado Fulang Chang, deu nome a uma pintura de 1937.", featured: true },
    { id: "fk-venado", artist: "frida-kahlo", title: "O Veado Ferido", original: "La venadita / El venado herido", date: "1946", year: 1946, technique: "Óleo sobre masonite", dims: "22,4 × 30 cm", ratio: 30/22.4, location: "Coleção particular", period: "xx2", movement: "arte-mexicana",
      img: null, local: "images/fk-venado.jpg", license: "Domínio público no Brasil desde 1º/1/2025 (autora falecida em 1954; Lei 9.610/98, art. 41). A obra ainda é protegida no México. Imagem enviada pela equipe do projeto.",
      desc: "Um veado com a cabeça de Frida corre por uma floresta, atravessado por nove flechas, com o mar e um céu tempestuoso ao fundo. Fato documentado: foi pintado após uma cirurgia na coluna feita em Nova York, em 1946. Interpretação: o corpo ferido do animal é lido como imagem da dor física e da resistência.",
      fact: "É uma obra de formato muito pequeno — cerca de 22 por 30 centímetros. No canto inferior aparece a palavra «carma»." },

    { id: "ta-abaporu", artist: "tarsila-do-amaral", title: "Abaporu", original: "Abaporu", date: "1928", year: 1928, technique: "Óleo sobre tela", dims: "85 × 73 cm", ratio: 73/85, location: "MALBA — Museo de Arte Latinoamericano de Buenos Aires", period: "xx1", movement: "modernismo-br",
      img: null, local: "images/ta-abaporu.jpg", protectedUse: true, license: "Obra protegida por direitos autorais no Brasil até 31/12/2043 (artista falecida em 1973). Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir. Licenciamento: família Tarsila do Amaral (tarsiladoamaral.com.br).",
      desc: "Uma figura de pés e mãos enormes e cabeça minúscula, sentada ao lado de um cacto sob um sol amarelo. Presente de aniversário de Tarsila para Oswald de Andrade, inspirou o Manifesto Antropófago, lançado no mesmo ano.",
      fact: "É frequentemente citada como a pintura brasileira mais valiosa já vendida.", featured: true },
    { id: "ta-a-negra", artist: "tarsila-do-amaral", title: "A Negra", original: "A Negra", date: "1923", year: 1923, technique: "Óleo sobre tela", dims: "100 × 81,3 cm", ratio: 81.3/100, location: "Museu de Arte Contemporânea da USP (MAC USP), São Paulo", period: "xx1", movement: "modernismo-br",
      img: null, local: "images/ta-a-negra.jpeg", protectedUse: true, license: "Obra protegida por direitos autorais no Brasil até 31/12/2043 (artista falecida em 1973). Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir. Licenciamento: família Tarsila do Amaral (tarsiladoamaral.com.br).",
      desc: "Pintada em Paris, mostra uma mulher negra de formas volumosas e simplificadas diante de faixas geométricas de influência cubista. Interpretação: a obra é lida como referência à memória da escravidão e às amas de leite das fazendas — tema hoje debatido criticamente pela historiografia.",
      fact: "É considerada precursora da fase antropofágica, cinco anos antes do Abaporu." },
    { id: "ta-operarios", artist: "tarsila-do-amaral", title: "Operários", original: "Operários", date: "1933", year: 1933, technique: "Óleo sobre tela", dims: "150 × 205 cm", ratio: 205/150, location: "Acervo Artístico-Cultural dos Palácios do Governo do Estado de São Paulo", period: "xx1", movement: "modernismo-br",
      img: null, local: "images/ta-operarios.jpeg", protectedUse: true, license: "Obra protegida por direitos autorais no Brasil até 31/12/2043 (artista falecida em 1973). Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir. Licenciamento: família Tarsila do Amaral (tarsiladoamaral.com.br).",
      desc: "Dezenas de rostos de trabalhadores, de origens diversas, se empilham diante de chaminés de fábrica. Marca a fase social da artista após a viagem à União Soviética e o contexto da industrialização de São Paulo.",
      fact: "A pintura aborda a diversidade étnica da classe trabalhadora paulista, formada por migrantes e imigrantes." },

    { id: "ld-mona-lisa", artist: "leonardo-da-vinci", title: "Mona Lisa", original: "La Gioconda", date: "c. 1503–1519", year: 1503, technique: "Óleo sobre painel de madeira de choupo", dims: "77 × 53 cm", ratio: 53/77, location: "Musée du Louvre, Paris", period: "renascimento", movement: "renascimento",
      img: "Mona Lisa, by Leonardo da Vinci, from C2RMF retouched.jpg",
      desc: "Retrato de Lisa Gherardini, esposa do comerciante florentino Francesco del Giocondo. O sfumato suaviza os contornos do rosto e das mãos, e a paisagem ao fundo se dissolve em perspectiva atmosférica.",
      fact: "Leonardo continuou trabalhando no quadro por anos e o levou consigo para a França.", featured: true },
    { id: "ld-ultima-ceia", artist: "leonardo-da-vinci", title: "A Última Ceia", original: "Il Cenacolo / L'Ultima Cena", date: "c. 1495–1498", year: 1495, technique: "Têmpera e óleo sobre preparação de gesso (pintura mural)", dims: "460 × 880 cm", ratio: 880/460, location: "Refeitório do convento de Santa Maria delle Grazie, Milão", period: "renascimento", movement: "renascimento",
      img: "The Last Supper - Leonardo Da Vinci - High Resolution 32x16.jpg",
      desc: "O momento em que Cristo anuncia que será traído. Os apóstolos reagem em grupos de três, e todas as linhas da perspectiva convergem para a cabeça de Cristo, no centro da composição.",
      fact: "Por não ser um afresco verdadeiro, a pintura se deteriorou rapidamente; a restauração concluída em 1999 durou cerca de 20 anos.", featured: true },
    { id: "ld-dama-arminho", artist: "leonardo-da-vinci", title: "A Dama com Arminho", original: "Dama con l'ermellino", date: "c. 1489–1491", year: 1489, technique: "Óleo sobre painel de nogueira", dims: "54 × 39 cm", ratio: 39/54, location: "Museu Nacional de Cracóvia (Museu Czartoryski), Polônia", period: "renascimento", movement: "renascimento",
      img: "Lady with an Ermine - Leonardo da Vinci - Google Art Project.jpg",
      desc: "Retrato de Cecilia Gallerani, jovem da corte de Ludovico Sforza, em Milão. O giro do corpo e do olhar, acompanhado pelo animal, cria um movimento inédito no retrato da época.",
      fact: "O arminho pode ser um trocadilho com o sobrenome da retratada (galê, em grego) e uma referência a Ludovico, membro da Ordem do Arminho." },

    { id: "cm-impressao", artist: "claude-monet", title: "Impressão, Nascer do Sol", original: "Impression, soleil levant", date: "1872", year: 1872, technique: "Óleo sobre tela", dims: "48 × 63 cm", ratio: 63/48, location: "Musée Marmottan Monet, Paris", period: "xix", movement: "impressionismo",
      img: "Claude Monet, Impression, soleil levant.jpg",
      desc: "O porto de Le Havre na névoa da manhã, com um sol alaranjado refletido na água. Poucas pinceladas sugerem barcos, guindastes e chaminés.",
      fact: "Exposta em 1874, deu nome ao impressionismo a partir de uma crítica irônica de Louis Leroy.", featured: true },
    { id: "cm-nenufares", artist: "claude-monet", title: "Nenúfares (série)", original: "Nymphéas", date: "1906", year: 1906, technique: "Óleo sobre tela", dims: "89,9 × 94,1 cm", ratio: 94.1/89.9, location: "Art Institute of Chicago (Coleção Mr. and Mrs. Martin A. Ryerson)", period: "xx1", movement: "impressionismo",
      img: "Claude Monet - Water Lilies - 1906, Ryerson.jpg",
      desc: "Uma das cerca de 250 telas da série. Aqui não há horizonte: a superfície do lago, com ninfeias e reflexos do céu, ocupa toda a tela, e a pintura se aproxima da abstração.",
      fact: "O ponto culminante da série são os painéis do Musée de l'Orangerie, em Paris." },
    { id: "cm-ponte-japonesa", artist: "claude-monet", title: "A Ponte Japonesa", original: "Le Bassin aux nymphéas", date: "1899", year: 1899, technique: "Óleo sobre tela", dims: "92,7 × 73,7 cm", ratio: 73.7/92.7, location: "The Metropolitan Museum of Art, Nova York", period: "xix", movement: "impressionismo",
      img: "Bridge over a Pond of Water Lilies MET DT1854.jpg",
      desc: "A ponte de madeira em arco que Monet construiu em seu jardim em Giverny, sobre o lago de ninfeias. É uma de uma série de 12 telas do mesmo ponto de vista, pintadas em 1899.",
      fact: "O jardim aquático foi criado por Monet a partir de 1893, desviando um braço do rio Epte." },

    { id: "pp-guernica", artist: "pablo-picasso", title: "Guernica", original: "Guernica", date: "1937", year: 1937, technique: "Óleo sobre tela", dims: "349,3 × 776,6 cm", ratio: 776.6/349.3, location: "Museo Nacional Centro de Arte Reina Sofía, Madri", period: "xx1", movement: "cubismo",
      img: null, local: "images/pp-guernica.webp", protectedUse: true, license: "Obra protegida por direitos autorais até 31/12/2043 (artista falecido em 1973). © Sucessão Pablo Picasso. Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir.",
      desc: "Painel em preto, branco e cinza pintado após o bombardeio da cidade basca de Guernica, em 26 de abril de 1937, durante a Guerra Civil Espanhola. Figuras fragmentadas — um touro, um cavalo ferido, uma mãe com o filho morto — compõem uma denúncia da violência contra civis.",
      fact: "Picasso concluiu a pintura em pouco mais de um mês, para o Pavilhão da República Espanhola na Exposição Internacional de Paris.", featured: true },
    { id: "pp-demoiselles", artist: "pablo-picasso", title: "Les Demoiselles d'Avignon", original: "Les Demoiselles d'Avignon", date: "1907", year: 1907, technique: "Óleo sobre tela", dims: "243,9 × 233,7 cm", ratio: 233.7/243.9, location: "The Museum of Modern Art (MoMA), Nova York", period: "xx1", movement: "cubismo",
      img: null, local: "images/pp-demoiselles.webp", protectedUse: true, license: "Obra protegida por direitos autorais até 31/12/2043 (artista falecido em 1973). © Sucessão Pablo Picasso. Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir.",
      desc: "Cinco figuras femininas formadas por planos angulosos, com rostos inspirados em escultura ibérica e em máscaras africanas. A obra rompe com a perspectiva tradicional e é considerada precursora do cubismo.",
      fact: "A tela causou estranhamento até entre os amigos de Picasso e só foi exposta publicamente em 1916." },
    { id: "pp-mulher-chora", artist: "pablo-picasso", title: "A Mulher que Chora", original: "La Femme qui pleure", date: "1937", year: 1937, technique: "Óleo sobre tela", dims: "60,8 × 50 cm", ratio: 50/60.8, location: "Tate, Londres", period: "xx1", movement: "cubismo",
      img: null, local: "images/pp-mulher-chora.webp", protectedUse: true, license: "Obra protegida por direitos autorais até 31/12/2043 (artista falecido em 1973). © Sucessão Pablo Picasso. Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir.",
      desc: "Um rosto fragmentado em cores intensas, com um lenço que se confunde com as lágrimas. Desdobra a figura da mãe em luto de Guernica, pintada no mesmo ano.",
      fact: "A modelo foi a fotógrafa e pintora Dora Maar." },

    { id: "rb-absolut", artist: "romero-britto", title: "Absolut Britto", original: "Absolut Britto", date: "c. 1988–1989", year: 1988, technique: "Pintura para a campanha publicitária Absolut Art", dims: "Não verificadas", ratio: 0.8, location: "Coleção Absolut Art (local não verificado)", period: "xx2", movement: "pop-art",
      img: null, local: "images/rb-absolut.webp", protectedUse: true, license: "Obra protegida por direitos autorais (artista vivo). © Romero Britto. Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir.",
      desc: "A garrafa da vodca Absolut reinterpretada com a linguagem de Britto: contornos pretos, áreas de cor e padrões. A campanha Absolut Art, que já havia incluído Andy Warhol, projetou o artista internacionalmente.",
      fact: "A data aparece como 1988 em bases de dados de arte e como 1989 em outras fontes sobre a campanha." },
    { id: "rb-garden", artist: "romero-britto", title: "Britto Garden", original: "Britto Garden", date: "2000", year: 2000, technique: "Serigrafia (edição múltipla)", dims: "c. 73 × 91 cm", ratio: 91/73, location: "Exemplares em coleções diversas", period: "xx2", movement: "pop-art",
      img: null, local: "images/rb-garden.webp", protectedUse: true, license: "Obra protegida por direitos autorais (artista vivo). © Romero Britto. Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir.",
      desc: "Flores e formas orgânicas preenchidas por padrões gráficos, com cores vibrantes separadas por contornos pretos — vocabulário característico do artista.",
      fact: "Como muitas obras de Britto, circula em serigrafias numeradas e assinadas." },
    { id: "rb-mona-cat", artist: "romero-britto", title: "Mona Cat", original: "Mona Cat", date: "2004", year: 2004, technique: "Serigrafia (edição múltipla)", dims: "Variáveis conforme a edição", ratio: 0.78, location: "Exemplares em coleções diversas", period: "xx2", movement: "pop-art",
      img: null, local: "images/rb-mona-cat.webp", protectedUse: true, license: "Obra protegida por direitos autorais (artista vivo). © Romero Britto. Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir.",
      desc: "Releitura bem-humorada da Mona Lisa com um gato no lugar da figura retratada. Ilustra o interesse da pop art por imagens já famosas e amplamente reproduzidas.",
      fact: "É um bom exemplo de diálogo entre a arte contemporânea e o Renascimento de Leonardo, também presente nesta galeria." },
    { id: "rb-copa-2010", artist: "romero-britto", title: "Cartaz da Copa do Mundo FIFA 2010", original: "2010 World Cup South Africa", date: "2009", year: 2009, technique: "Serigrafia / arte gráfica", dims: "c. 102 × 76 cm (serigrafia)", ratio: 412/617, location: "Exemplares em coleções diversas", period: "xx2", movement: "pop-art",
      img: null, local: "images/rb-copa-2010.jpg", protectedUse: true, license: "Obra protegida por direitos autorais (artista vivo). Cartaz oficial — © Romero Britto / FIFA 2009. Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir.",
      desc: "Arte criada para a Copa do Mundo realizada na África do Sul, com a bola, figuras e padrões em cores fortes. Exemplifica a presença do artista em grandes eventos esportivos.",
      fact: "Britto também criou trabalhos ligados ao Super Bowl de 2007 e à Copa de 2014." },

    { id: "cp-lavrador", artist: "candido-portinari", title: "O Lavrador de Café", original: "O Lavrador de Café", date: "1934", year: 1934, technique: "Óleo sobre tela", dims: "100 × 81 cm", ratio: 81/100, location: "MASP — Museu de Arte de São Paulo Assis Chateaubriand", period: "xx1", movement: "modernismo-br",
      img: null, local: "images/cp-lavrador.webp", protectedUse: true, license: "Obra protegida por direitos autorais no Brasil até 31/12/2032 (artista falecido em 1962). © Projeto Portinari. Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir.",
      desc: "Um trabalhador negro, de pés e mãos enormes, segura uma enxada diante de um cafezal e de um trem ao fundo. A monumentalidade da figura destaca a força e a dignidade do trabalho rural que sustentava a economia cafeeira.",
      fact: "A terra vermelha e os pés descalços remetem à infância do artista em Brodowski.", featured: true },
    { id: "cp-retirantes", artist: "candido-portinari", title: "Retirantes", original: "Retirantes", date: "1944", year: 1944, technique: "Óleo sobre tela", dims: "190 × 180 cm", ratio: 180/190, location: "MASP — Museu de Arte de São Paulo Assis Chateaubriand", period: "xx1", movement: "modernismo-br",
      img: null, local: "images/cp-retirantes.webp", protectedUse: true, license: "Obra protegida por direitos autorais no Brasil até 31/12/2032 (artista falecido em 1962). © Projeto Portinari. Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir.",
      desc: "Uma família de retirantes, magra e esquálida, diante de uma paisagem seca com urubus no céu. A obra denuncia a fome e a migração forçada provocadas pela seca no Nordeste.",
      fact: "Faz parte de uma série de 1944 que inclui Criança Morta e Enterro na Rede, também no MASP." },
    { id: "cp-guerra-paz", artist: "candido-portinari", title: "Guerra e Paz", original: "Guerra e Paz", date: "1952–1956", year: 1952, technique: "Óleo sobre madeira compensada (dois painéis)", dims: "c. 14 × 10 m cada painel", ratio: 10/14, location: "Sede da Organização das Nações Unidas, Nova York", period: "xx2", movement: "modernismo-br",
      img: null, local: "images/cp-guerra-paz.webp", protectedUse: true, license: "Obra protegida por direitos autorais no Brasil até 31/12/2032 (artista falecido em 1962). © Projeto Portinari. Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir.",
      desc: "Dois painéis monumentais: Guerra mostra o sofrimento humano sem armas nem soldados; Paz celebra brincadeiras, música e trabalho. Foram doados pelo governo brasileiro à ONU e instalados em 1957.",
      fact: "Portinari não esteve presente na inauguração dos painéis em Nova York." },

    { id: "am-estudante-russa", artist: "anita-malfatti", title: "A Estudante Russa", original: "A Estudante Russa", date: "1915", year: 1915, technique: "Óleo sobre tela", dims: "76 × 61 cm", ratio: 61/76, location: "Instituto de Estudos Brasileiros da USP (Coleção Mário de Andrade)", period: "xx1", movement: "expressionismo",
      img: null, local: "images/am-estudante-russa.webp", protectedUse: true, license: "Obra protegida por direitos autorais no Brasil até 31/12/2034 (artista falecida em 1964). Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir.",
      desc: "Retrato de uma jovem de expressão séria, com cores intensas e contrastantes e formas simplificadas. Mostra a liberdade de cor que a artista desenvolveu na Alemanha e em Nova York.",
      fact: "Foi uma das obras expostas em 1917.", featured: true },
    { id: "am-homem-amarelo", artist: "anita-malfatti", title: "O Homem Amarelo", original: "O Homem Amarelo", date: "1915–1916", year: 1915, technique: "Óleo sobre tela", dims: "61 × 51 cm", ratio: 51/61, location: "Instituto de Estudos Brasileiros da USP (Coleção Mário de Andrade)", period: "xx1", movement: "expressionismo",
      img: null, local: "images/am-homem-amarelo.webp", protectedUse: true, license: "Obra protegida por direitos autorais no Brasil até 31/12/2034 (artista falecida em 1964). Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir.",
      desc: "Um homem de rosto esverdeado e casaco amarelo, com expressão melancólica. A cor não descreve a realidade: ela expressa um estado de espírito.",
      fact: "Mário de Andrade comprou a obra na exposição de 1917, e o quadro marcou sua aproximação com Anita." },
    { id: "am-a-boba", artist: "anita-malfatti", title: "A Boba", original: "A Boba", date: "1915–1916", year: 1915, technique: "Óleo sobre tela", dims: "61 × 50,6 cm", ratio: 50.6/61, location: "Museu de Arte Contemporânea da USP (MAC USP), São Paulo", period: "xx1", movement: "expressionismo",
      img: null, local: "images/am-a-boba.webp", protectedUse: true, license: "Obra protegida por direitos autorais no Brasil até 31/12/2034 (artista falecida em 1964). Reprodução incluída pela equipe do projeto exclusivamente para uso didático em sala de aula — não redistribuir.",
      desc: "Uma figura feminina sentada, de corpo angular e olhar desviado, construída com planos de cor que lembram o cubismo e o expressionismo. É uma das obras mais radicais da artista.",
      fact: "Esteve na exposição de 1917 que provocou a crítica de Monteiro Lobato." },

    { id: "em-grito", artist: "edvard-munch", title: "O Grito", original: "Skrik", date: "1893", year: 1893, technique: "Óleo, têmpera e pastel sobre cartão", dims: "91 × 73,5 cm", ratio: 73.5/91, location: "Nasjonalmuseet (Museu Nacional da Noruega), Oslo", period: "xix", movement: "expressionismo",
      img: "Edvard Munch, 1893, The Scream, oil, tempera and pastel on cardboard, 91 x 73 cm, National Gallery of Norway.jpg",
      desc: "Uma figura de rosto semelhante a uma caveira leva as mãos à cabeça sobre uma ponte, sob um céu vermelho-alaranjado. As linhas ondulantes da paisagem parecem ecoar o grito. Munch descreveu, em anotações, ter sentido «um grito infinito atravessando a natureza» num pôr do sol.",
      fact: "A inscrição a lápis no canto superior esquerdo foi confirmada em 2021 como sendo do próprio Munch.", featured: true },
    { id: "em-madonna", artist: "edvard-munch", title: "Madonna", original: "Madonna", date: "1894–1895", year: 1894, technique: "Óleo sobre tela", dims: "91 × 70,5 cm", ratio: 70.5/91, location: "Nasjonalmuseet (Museu Nacional da Noruega), Oslo", period: "xix", movement: "expressionismo",
      img: "Edvard Munch - Madonna - NG.M.00841 - National Museum of Art, Architecture and Design.jpg",
      desc: "Uma mulher de olhos semicerrados, envolta em um halo vermelho e em linhas ondulantes. A obra une sensualidade e sacralidade e fazia parte do Friso da Vida, ciclo sobre amor e morte.",
      fact: "Munch pintou várias versões e fez uma litografia do tema, com uma moldura de espermatozoides e um feto." },
    { id: "em-ansiedade", artist: "edvard-munch", title: "Ansiedade", original: "Angst", date: "1894", year: 1894, technique: "Óleo sobre tela", dims: "94 × 74 cm", ratio: 74/94, location: "MUNCH — Museu Munch, Oslo", period: "xix", movement: "expressionismo",
      img: "Edvard Munch - Anxiety - Google Art Project.jpg",
      desc: "Um grupo de pessoas de rostos pálidos caminha em direção ao observador, sob o mesmo céu vermelho e a mesma paisagem do fiorde de O Grito. A angústia aqui é coletiva.",
      fact: "Junto com O Grito e Desespero, forma uma tríade de pinturas ambientadas no mesmo local." },
    { id: "em-sol-ref", artist: "edvard-munch", title: "O Sol", original: "Solen", date: "1909–1916", year: 1909, technique: "Óleo sobre tela", dims: "455 × 780 cm", ratio: 780/455, location: "Aula (salão nobre) da Universidade de Oslo", period: "xx1", movement: "expressionismo",
      img: "Edvard Munch - The Sun - Google Art Project.jpg",
      desc: "Um sol radiante nasce sobre o fiorde e a costa rochosa, irradiando faixas de luz colorida. A obra central dos murais da universidade mostra um Munch luminoso e otimista.",
      fact: "Os murais foram inaugurados em 1916, depois de anos de debate sobre os projetos do artista." }
  ];

  return {
    site: { name: "Galeria de Arte — Mestres da Pintura", teacher: "Bruna Neves" },
    licensePD: PD, licenseProtected: PROT,
    periods: periods, movements: movements, artists: artists, works: works,
    generalRefs: [
      { label: "Wikimedia Commons — reproduções de obras em domínio público", url: "https://commons.wikimedia.org" },
      { label: "The Metropolitan Museum of Art — Heilbrunn Timeline of Art History", url: "https://www.metmuseum.org/toah/" },
      { label: "Rijksmuseum", url: "https://www.rijksmuseum.nl" },
      { label: "Musée d'Orsay", url: "https://www.musee-orsay.fr" },
      { label: "Pinacoteca de São Paulo", url: "https://pinacoteca.org.br" },
      { label: "Enciclopédia Itaú Cultural de Arte e Cultura Brasileira", url: "https://enciclopedia.itaucultural.org.br" },
      { label: "Encyclopaedia Britannica", url: "https://www.britannica.com" }
    ]
  };
})();

export default GALERIA;
