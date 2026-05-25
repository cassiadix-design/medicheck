// Segundo lote: interações para medicamentos restantes da lista de 49 sem cobertura
const fs   = require('fs');
const path = require('path');

const INT_PATH = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');
const MARKER   = '\nvar mcIECAnomes';

const novas = [

// ── BENZOATO DE RIZATRIPTANA (TRIPTANO) ──────────────────────────────────────
{
  "med1":["rizatriptana","benzoato de rizatriptana","maxalt"],
  "med2":["inibidor mao","imao","fenelzina","tranilcipromina","isocarboxazida","selegilina","moclobemida"],
  "nivel":"alto",
  "titulo":"Rizatriptana + IMAO (Crise Serotonérgica e Hipertensiva Grave — Contraindicado)",
  "mecanismo":"A rizatriptana é agonista 5-HT1B/1D. Os IMAOs bloqueiam a MAO-A, principal enzima que metaboliza a rizatriptana e serotonina. O acúmulo resulta em estimulação serotonérgica excessiva e pode desencadear crise hipertensiva via estimulação adrenérgica.",
  "efeito":"Síndrome serotonérgica (agitação, diaforese, tremor, hipertermia, convulsão), crise hipertensiva e risco de AVC hemorrágico.",
  "conduta":"❌ Contraindicação absoluta. Respeitar intervalo de 14 dias após suspensão do IMAO antes de usar rizatriptana. Usar analgésico convencional para tratar crises de enxaqueca nesse período."
},
{
  "med1":["rizatriptana","benzoato de rizatriptana","maxalt"],
  "med2":["ergotamina","di-hidroergotamina","ergot","cafergot","tartarato de ergotamina"],
  "nivel":"alto",
  "titulo":"Rizatriptana + Ergotamina (Vasoespasmo Grave — Contraindicado)",
  "mecanismo":"Vasoconstrição aditiva: triptanos e ergotamínicos são ambos vasoconstritores. A combinação pode causar vasoespasmo coronariano e periférico grave com isquemia.",
  "efeito":"Vasoespasmo grave, angina, isquemia cardíaca e periférica. Risco de infarto agudo do miocárdio e isquemia de extremidades.",
  "conduta":"❌ Contraindicado. Respeitar intervalo de pelo menos 24h após uso de triptano antes de usar ergotamínico, e vice-versa."
},
{
  "med1":["rizatriptana","benzoato de rizatriptana","maxalt"],
  "med2":["fluoxetina","sertralina","paroxetina","citalopram","escitalopram","venlafaxina","duloxetina","isrs","irsn"],
  "nivel":"moderado",
  "titulo":"Rizatriptana + ISRS / IRSN (Síndrome Serotonérgica)",
  "mecanismo":"Efeito serotonérgico aditivo: triptanos são agonistas 5-HT1; ISRS/IRSN elevam a serotonina na fenda sináptica. Em combinação, o risco de estimulação serotonérgica excessiva é aumentado.",
  "efeito":"Síndrome serotonérgica: confusão mental, agitação, mioclonias, hiperreflexia, febre, taquicardia e diaforese — potencialmente fatal em casos graves.",
  "conduta":"⚠️ Usar com cautela. Risco real, porém a combinação é comumente prescrita. Orientar o paciente a comunicar imediatamente sintomas como agitação inexplicada, tremores ou febre após uso conjunto."
},
{
  "med1":["rizatriptana","benzoato de rizatriptana","maxalt"],
  "med2":["propranolol","nadolol"],
  "nivel":"moderado",
  "titulo":"Rizatriptana + Propranolol (Elevação dos Níveis de Rizatriptana em até 70%)",
  "mecanismo":"O propranolol inibe a MAO-A e reduz o clearance hepático da rizatriptana via inibição da MAO periférica, elevando seus níveis plasmáticos em até 70%.",
  "efeito":"Efeitos adversos aumentados da rizatriptana: tontura, fadiga, taquicardia reflexa, parestesias. Risco aumentado de vasoespasmo.",
  "conduta":"⚠️ Reduzir a dose de rizatriptana para 5mg (em vez de 10mg) em pacientes usando propranolol. O nadolol e outros betabloqueadores têm interação menor."
},

// ── BROMIDRATO DE FENOTEROL (BETA-2) ──────────────────────────────────────────
{
  "med1":["fenoterol","bromidrato de fenoterol","berotec"],
  "med2":["betabloqueador","propranolol","atenolol","metoprolol","carvedilol","bisoprolol"],
  "nivel":"alto",
  "titulo":"Fenoterol + Betabloqueador (Antagonismo — Broncoespasmo e Perda de Efeito)",
  "mecanismo":"Os betabloqueadores (especialmente não-seletivos como propranolol) bloqueiam os receptores β2 nos brônquios, antagonizando diretamente o efeito broncodilatador do fenoterol e potencialmente causando broncoespasmo paradoxal.",
  "efeito":"Perda da broncodilatação com piora da dispneia — potencialmente fatal em crise asmática. Betabloqueadores não-seletivos são a maior ameaça; betabloqueadores cardiosseletivos (atenolol, bisoprolol, metoprolol) têm risco menor mas não desprezível.",
  "conduta":"❌ Evitar betabloqueadores não-seletivos em pacientes asmáticos usando fenoterol. Se betabloqueador for necessário (cardiopatia, arritmia), usar cardiosseletivos em doses baixas com monitoração cuidadosa da função respiratória."
},
{
  "med1":["fenoterol","bromidrato de fenoterol","berotec"],
  "med2":["digoxina","lanoxin"],
  "nivel":"moderado",
  "titulo":"Fenoterol + Digoxina (Hipocalemia e Risco de Arritmia Digitálica)",
  "mecanismo":"O fenoterol estimula receptores β2 que ativam a Na/K-ATPase, causando entrada de potássio nas células e hipocalemia. A digoxina tem janela terapêutica estreita e sua toxicidade é potencializada pela hipocalemia.",
  "efeito":"Hipocalemia induzida pelo fenoterol aumenta a sensibilidade do miocárdio à toxicidade digitálica: arritmias, bloqueios e fibrilação ventricular.",
  "conduta":"⚠️ Monitorar eletrólitos (especialmente potássio) regularmente. Corrigir hipocalemia prontamente. Monitorar sinais de toxicidade digitálica (náuseas, bradicardia, distúrbios visuais)."
},
{
  "med1":["fenoterol","bromidrato de fenoterol","berotec"],
  "med2":["imao","inibidor mao","fenelzina","tranilcipromina"],
  "nivel":"moderado",
  "titulo":"Fenoterol + IMAO (Potencialização Simpatomiméticae Crise Hipertensiva)",
  "mecanismo":"Os IMAOs bloqueiam a metabolização de catecolaminas. O fenoterol tem atividade simpaticomimética que, potencializada pelos IMAOs, pode causar estimulação cardiovascular excessiva.",
  "efeito":"Taquicardia intensa, arritmias e risco de crise hipertensiva.",
  "conduta":"⚠️ Usar com cautela. Monitorar pressão arterial e frequência cardíaca. Preferir ipratrópio ou corticosteroide inalatório quando disponível."
},

// ── VILDAGLIPTINA + METFORMINA ────────────────────────────────────────────────
{
  "med1":["vildagliptina + metformina","vildagliptina metformina","galvusmet","icandra"],
  "med2":["álcool","alcool","etanol","bebida alcoólica"],
  "nivel":"moderado",
  "titulo":"Vildagliptina + Metformina + Álcool (Acidose Láctica e Hipoglicemia)",
  "mecanismo":"O componente metformina potencializa o acúmulo de lactato induzido pelo álcool. A vildagliptina, ao potencializar a insulinosecreção pós-prandial, pode contribuir para hipoglicemia em jejum com álcool.",
  "efeito":"Risco de acidose láctica (do componente metformina + álcool) e hipoglicemia em jejum.",
  "conduta":"⚠️ Evitar álcool, especialmente em jejum ou em grandes quantidades. Mesmas precauções da metformina isolada."
},
{
  "med1":["vildagliptina + metformina","vildagliptina metformina","galvusmet","icandra"],
  "med2":["contraste iodado","contraste radiológico","contraste radiologico"],
  "nivel":"moderado",
  "titulo":"Vildagliptina + Metformina + Contraste Iodado (Risco de Acidose Láctica)",
  "mecanismo":"O contraste iodado pode causar nefrotoxicidade aguda transitória. A metformina, ao depender da excreção renal, acumula-se em caso de insuficiência renal aguda, aumentando o risco de acidose láctica.",
  "efeito":"Acidose láctica — potencialmente fatal. Risco maior em pacientes com função renal limítrofe ou idosos.",
  "conduta":"⚠️ Suspender a medicação 48h antes de exame com contraste iodado. Reintroduzir somente após 48h e confirmação de que a função renal está estável (creatinina e TFG normais)."
},
{
  "med1":["vildagliptina + metformina","vildagliptina metformina","galvusmet","icandra"],
  "med2":["furosemida","hidroclorotiazida","indapamida","diurético","diuretico"],
  "nivel":"moderado",
  "titulo":"Vildagliptina + Metformina + Diurético (Risco de Hiperglicemia e Comprometimento Renal)",
  "mecanismo":"Diuréticos tiazídicos e de alça podem causar hiperglicemia e redução da perfusão renal. A metformina exige função renal preservada; a vildagliptina pode ter menor eficácia com hiperglicemia induzida pelo diurético.",
  "efeito":"Piora do controle glicêmico e, se a função renal for comprometida, risco de acúmulo da metformina.",
  "conduta":"⚠️ Monitorar função renal e glicemia. Ajustar a terapia antidiabética se o diurético for adicionado ou a dose aumentada."
},

// ── PARACETAMOL + PSEUDOEFEDRINA ──────────────────────────────────────────────
{
  "med1":["paracetamol + pseudoefedrina","paracetamol pseudoefedrina","sinutab","resfenol"],
  "med2":["inibidor mao","imao","fenelzina","tranilcipromina","isocarboxazida","selegilina"],
  "nivel":"alto",
  "titulo":"Paracetamol + Pseudoefedrina + IMAO (Crise Hipertensiva pela Pseudoefedrina)",
  "mecanismo":"A pseudoefedrina libera catecolaminas endógenas. Os IMAOs bloqueiam sua metabolização pela MAO-A, causando acúmulo com estimulação adrenérgica intensa e crise hipertensiva.",
  "efeito":"Crise hipertensiva grave: cefaleia intensa, rubor, palpitações, arritmias, risco de AVC hemorrágico e morte.",
  "conduta":"❌ Contraindicado. Respeitar 14 dias de washout após suspensão do IMAO. Para alívio de sintomas de resfriado, usar apenas paracetamol simples durante uso de IMAO."
},
{
  "med1":["paracetamol + pseudoefedrina","paracetamol pseudoefedrina","sinutab","resfenol"],
  "med2":["anti-hipertensivo","betabloqueador","amlodipino","enalapril","losartana"],
  "nivel":"moderado",
  "titulo":"Paracetamol + Pseudoefedrina + Anti-hipertensivo (Antagonismo do Controle Pressórico)",
  "mecanismo":"A pseudoefedrina eleva a pressão arterial por agonismo adrenérgico, antagonizando o efeito dos anti-hipertensivos.",
  "efeito":"Perda do controle pressórico em hipertensos — elevação da pressão arterial.",
  "conduta":"⚠️ Evitar em pacientes hipertensos. Usar paracetamol simples ou ibuprofeno (com cautela) para alívio sintomático de resfriado."
},

// ── PARACETAMOL + CLORFENIRAMINA + FENILEFRINA ────────────────────────────────
{
  "med1":["paracetamol + clorfeniramina + fenilefrina","paracetamol fenilefrina clorfeniramina","coristina","trimedal","benegrip"],
  "med2":["inibidor mao","imao","fenelzina","tranilcipromina","selegilina"],
  "nivel":"alto",
  "titulo":"Paracetamol + Fenilefrina + IMAO (Crise Hipertensiva Grave — Contraindicado)",
  "mecanismo":"A fenilefrina é agonista alfa-adrenérgico direto com efeito vasoconstritor. Os IMAOs potencializam esse efeito ao bloquear a degradação de aminas simpaticomiméticas.",
  "efeito":"Crise hipertensiva grave com risco de AVC, edema pulmonar e morte.",
  "conduta":"❌ Contraindicado. Respeitar 14 dias após suspensão do IMAO. Para sintomas de resfriado, usar apenas paracetamol simples."
},
{
  "med1":["paracetamol + clorfeniramina + fenilefrina","paracetamol fenilefrina clorfeniramina","coristina","trimedal","benegrip"],
  "med2":["anticolinérgico","biperideno","oxibutinina","solifenacina","escopolamina"],
  "nivel":"moderado",
  "titulo":"Paracetamol + Clorfeniramina + Anticolinérgico (Síndrome Anticolinérgica Aditiva)",
  "mecanismo":"A clorfeniramina tem efeito anticolinérgico significativo. Em combinação com outros anticolinérgicos, os efeitos são aditivos.",
  "efeito":"Boca seca, retenção urinária, constipação, visão turva, confusão mental — especialmente em idosos.",
  "conduta":"⚠️ Avaliar carga anticolinérgica total. Em idosos, preferir antigripais sem componente anticolinérgico."
},
{
  "med1":["paracetamol + clorfeniramina + fenilefrina","paracetamol fenilefrina clorfeniramina","coristina","trimedal","benegrip"],
  "med2":["anti-hipertensivo","betabloqueador","amlodipino","enalapril","losartana"],
  "nivel":"moderado",
  "titulo":"Paracetamol + Fenilefrina + Anti-hipertensivo (Antagonismo Pressórico)",
  "mecanismo":"A fenilefrina eleva a pressão arterial por vasoconstrição alfa-adrenérgica direta, antagonizando o efeito dos anti-hipertensivos.",
  "efeito":"Elevação da pressão arterial com perda do controle de HAS.",
  "conduta":"⚠️ Evitar em hipertensos. Usar formulações sem fenilefrina ou pseudoefedrina."
},

// ── LEVAMISOL ─────────────────────────────────────────────────────────────────
{
  "med1":["levamisol","decaris","ergamisol"],
  "med2":["warfarina","varfarina","coumadin"],
  "nivel":"moderado",
  "titulo":"Levamisol + Warfarina (Potencialização do Efeito Anticoagulante)",
  "mecanismo":"O levamisol pode inibir enzimas hepáticas responsáveis pelo metabolismo da warfarina, elevando seus níveis plasmáticos e o INR.",
  "efeito":"Elevação do INR com risco de sangramento — equimoses, sangramento gengival, hematúria.",
  "conduta":"⚠️ Monitorar o INR após iniciar o levamisol. Ajustar a dose de warfarina conforme necessário."
},
{
  "med1":["levamisol","decaris","ergamisol"],
  "med2":["álcool","alcool","etanol","bebida alcoólica"],
  "nivel":"moderado",
  "titulo":"Levamisol + Álcool (Reação Tipo Dissulfiram)",
  "mecanismo":"O levamisol, assim como o metronidazol e o dissulfiram, inibe a aldeído desidrogenase. O álcool é convertido em acetaldeído que não é metabolizado, causando acúmulo tóxico.",
  "efeito":"Reação tipo dissulfiram: rubor intenso, cefaleia pulsátil, náuseas, vômitos, palpitações e queda da pressão arterial — minutos após a ingestão de álcool.",
  "conduta":"⚠️ Evitar absolutamente qualquer consumo de álcool durante o tratamento com levamisol. Orientar sobre a reação e que até pequenas quantidades (como em preparações farmacêuticas com álcool) podem desencadeá-la."
},

// ── TINTURA DE ÓPIO CANFORADA ─────────────────────────────────────────────────
{
  "med1":["tintura de ópio canforada","tintura de opio canforada","paregórica","paregorica"],
  "med2":["álcool","alcool","etanol","bebida alcoólica"],
  "nivel":"alto",
  "titulo":"Tintura de Ópio Canforada + Álcool (Depressão Respiratória Grave)",
  "mecanismo":"A tintura de ópio canforada contém morfina (opioide) e está formulada em álcool. O consumo adicional de álcool potencializa a depressão do SNC e dos centros respiratórios de forma aditiva e sinérgica.",
  "efeito":"Depressão respiratória grave, sedação profunda, coma e risco de morte — especialmente em crianças, idosos e em doses supraterapêuticas.",
  "conduta":"❌ Proibir consumo de álcool durante o uso. Produto com janela terapêutica estreita — usar apenas sob prescrição médica. Atenção: a formulação em álcool já contribui para a carga alcoólica total."
},
{
  "med1":["tintura de ópio canforada","tintura de opio canforada","paregórica","paregorica"],
  "med2":["benzodiazepínico","diazepam","alprazolam","clonazepam","lorazepam","midazolam"],
  "nivel":"alto",
  "titulo":"Tintura de Ópio Canforada + Benzodiazepínico (Depressão Respiratória — Black Box Warning)",
  "mecanismo":"Efeito sinérgico entre opioides (morfina) e benzodiazepínicos na depressão do SNC e dos centros respiratórios do tronco cerebral.",
  "efeito":"Depressão respiratória fatal — combinação associada ao Black Box Warning do FDA. Risco de apneia, coma e morte.",
  "conduta":"❌ Evitar combinação. Se absolutamente necessária, usar doses mínimas, monitorar continuamente e ter naloxona disponível."
},
{
  "med1":["tintura de ópio canforada","tintura de opio canforada","paregórica","paregorica"],
  "med2":["imao","inibidor mao","fenelzina","tranilcipromina"],
  "nivel":"alto",
  "titulo":"Tintura de Ópio Canforada + IMAO (Síndrome Serotonérgica e Depressão do SNC)",
  "mecanismo":"Os IMAOs potencializam os efeitos dos opioides (incluindo morfina) por mecanismos serotonérgicos e de inibição do metabolismo. Risco de síndrome serotonérgica e depressão grave do SNC.",
  "efeito":"Síndrome serotonérgica, depressão respiratória grave, hipotensão e risco de coma.",
  "conduta":"❌ Contraindicado. Respeitar 14 dias após suspensão do IMAO."
},

// ── HIDRÓXIDO DE MAGNÉSIO + HIDRÓXIDO DE ALUMÍNIO (ANTIÁCIDO) ────────────────
{
  "med1":["hidróxido de magnésio + hidróxido de alumínio","hidroxido de magnesio + hidroxido de aluminio","maalox","mylanta","leite de magnésia","leite de magnesia"],
  "med2":["levotiroxina","puran","euthyrox"],
  "nivel":"moderado",
  "titulo":"Antiácido (Al/Mg) + Levotiroxina (Absorção Reduzida — Hipotireoidismo por Subdose)",
  "mecanismo":"O hidróxido de alumínio forma quelatos com a levotiroxina no trato gastrointestinal, reduzindo sua absorção em até 40%.",
  "efeito":"Hipotireoidismo por subdose efetiva: TSH elevado persistente, fadiga, ganho de peso, bradicardia.",
  "conduta":"⚠️ Tomar levotiroxina em jejum, pelo menos 4 horas antes ou após o antiácido. Monitorar TSH ao iniciar ou alterar o uso do antiácido."
},
{
  "med1":["hidróxido de magnésio + hidróxido de alumínio","hidroxido de magnesio + hidroxido de aluminio","maalox","mylanta","leite de magnésia"],
  "med2":["ciprofloxacino","levofloxacino","norfloxacino","moxifloxacino","quinolona"],
  "nivel":"moderado",
  "titulo":"Antiácido (Al/Mg) + Quinolona (Absorção Reduzida em até 90%)",
  "mecanismo":"Ions de alumínio e magnésio quelam quinolonas no trato gastrointestinal, formando complexos insolúveis e reduzindo drasticamente sua absorção — até 90% com alguns agentes.",
  "efeito":"Falha terapêutica da quinolona com risco de infecção não tratada adequadamente.",
  "conduta":"⚠️ Administrar a quinolona pelo menos 2 horas antes ou 6 horas após o antiácido. Ou substituir por antibiótico não afetado pela quelação."
},
{
  "med1":["hidróxido de magnésio + hidróxido de alumínio","hidroxido de magnesio + hidroxido de aluminio","maalox","mylanta","leite de magnésia"],
  "med2":["tetraciclina","doxiciclina","minociclina"],
  "nivel":"moderado",
  "titulo":"Antiácido (Al/Mg) + Tetraciclina / Doxiciclina (Quelação e Falha Terapêutica)",
  "mecanismo":"Ions metálicos (Al³⁺, Mg²⁺) formam quelatos insolúveis com tetraciclinas, reduzindo sua absorção oral em até 80%.",
  "efeito":"Níveis subterapêuticos da tetraciclina com falha no tratamento da infecção.",
  "conduta":"⚠️ Administrar a tetraciclina pelo menos 2–3 horas antes ou 6 horas após o antiácido. A doxiciclina é ligeiramente menos afetada mas o espaçamento ainda é recomendado."
},
{
  "med1":["hidróxido de magnésio + hidróxido de alumínio","hidroxido de magnesio + hidroxido de aluminio","maalox","mylanta","leite de magnésia"],
  "med2":["itraconazol","cetoconazol","posaconazol"],
  "nivel":"moderado",
  "titulo":"Antiácido (Al/Mg) + Azol Antifúngico (Absorção Reduzida)",
  "mecanismo":"Itraconazol e cetoconazol requerem pH ácido gástrico para dissolução e absorção. Antiácidos elevam o pH gástrico, reduzindo significativamente sua absorção.",
  "efeito":"Falha antifúngica por níveis plasmáticos subterapêuticos dos azóis.",
  "conduta":"⚠️ Administrar itraconazol/cetoconazol pelo menos 2 horas antes do antiácido, preferencialmente com alimento ácido (cola diet). Considerar formulação líquida de itraconazol (absorção independente do pH)."
},

// ── SACCHAROMYCES BOULARDII ───────────────────────────────────────────────────
{
  "med1":["saccharomyces boulardii","floratil","repoflor"],
  "med2":["fluconazol","cetoconazol","itraconazol","voriconazol","anfotericina","antifúngico"],
  "nivel":"alto",
  "titulo":"Saccharomyces boulardii + Antifúngico (Inativação do Probiótico)",
  "mecanismo":"O Saccharomyces boulardii é um fungo (levedura probiótica). Antifúngicos sistêmicos eliminam diretamente esse organismo no trato gastrointestinal e na circulação, destruindo completamente o benefício terapêutico.",
  "efeito":"Inativação completa do probiótico. Em pacientes imunocomprometidos, há risco teórico adicional de fungemia por S. boulardii disseminada caso o antifúngico não cubra adequadamente.",
  "conduta":"⚠️ Não utilizar concomitantemente — o antifúngico mata o probiótico. Suspender S. boulardii durante o tratamento antifúngico e retomar após seu término."
},

// ── SUBCITRATO DE BISMUTO POTÁSSICO ───────────────────────────────────────────
{
  "med1":["subcitrato de bismuto potássico","subcitrato de bismuto","bismuto","de-nol","denol"],
  "med2":["tetraciclina","doxiciclina"],
  "nivel":"moderado",
  "titulo":"Bismuto + Tetraciclina (Quelação e Redução da Absorção Mútua)",
  "mecanismo":"O bismuto forma quelatos com tetraciclinas no trato gastrointestinal, reduzindo a absorção de ambos.",
  "efeito":"Redução da eficácia da tetraciclina. Paradoxalmente, a associação tripla (bismuto + tetraciclina + metronidazol) é usada no tratamento do H. pylori — nesse caso, é combinação terapêutica intencional, não adversa.",
  "conduta":"⚠️ Se a associação for intencional (esquema anti-H. pylori), seguir o protocolo prescrito. Se for uso concomitante inadvertido, separar a administração por 2 horas."
},
{
  "med1":["subcitrato de bismuto potássico","subcitrato de bismuto","bismuto","de-nol"],
  "med2":["aspirina","ácido acetilsalicílico","aas","salicilato"],
  "nivel":"moderado",
  "titulo":"Bismuto + Aspirina (Risco de Toxicidade por Salicilato — Encefalopatia de Reye em Crianças)",
  "mecanismo":"O bismuto é absorvido e reage com salicilatos (AAS) presentes na dieta ou medicação, formando salicilato de bismuto com maior absorção sistêmica de salicilato. Em crianças, isso aumenta o risco da síndrome de Reye.",
  "efeito":"Em adultos: elevação dos níveis de salicilato, com risco de zumbido, tontura e distúrbios da coagulação. Em crianças: risco aumentado de encefalopatia de Reye — potencialmente fatal.",
  "conduta":"⚠️ Evitar uso concomitante, especialmente em crianças. Em adultos monitorar sintomas de salicilismo (zumbido, tontura). Bismuto é contraindicado em menores de 12 anos."
},

// ── CEFADROXILA ───────────────────────────────────────────────────────────────
{
  "med1":["cefadroxila","cefadroxila monoidratada","cefadril","duricef"],
  "med2":["warfarina","varfarina","coumadin"],
  "nivel":"moderado",
  "titulo":"Cefadroxila + Warfarina (Elevação do INR por Redução da Flora Intestinal)",
  "mecanismo":"Antibióticos de amplo espectro como a cefadroxila reduzem a flora intestinal produtora de vitamina K, potencializando o efeito anticoagulante da warfarina.",
  "efeito":"Elevação do INR com risco de sangramento — geralmente moderado mas pode ser significativo em pacientes com INR já no limite superior.",
  "conduta":"⚠️ Monitorar o INR após 3–5 dias de tratamento. Orientar o paciente a comunicar sangramentos incomuns."
},
{
  "med1":["cefadroxila","cefadroxila monoidratada","cefadril","duricef"],
  "med2":["metotrexato","methotrexate"],
  "nivel":"moderado",
  "titulo":"Cefadroxila + Metotrexato (Redução do Clearance Renal)",
  "mecanismo":"A cefadroxila compete com o metotrexato pela secreção tubular renal, reduzindo seu clearance e elevando os níveis plasmáticos.",
  "efeito":"Toxicidade por metotrexato: mielossupressão, mucosite, hepatotoxicidade — risco maior em altas doses oncológicas.",
  "conduta":"⚠️ Evitar combinação em doses altas de metotrexato. Em doses reumatológicas baixas, monitorar hemograma e sinais de toxicidade."
}

];

// ── Inserção ──────────────────────────────────────────────────────────────────
let raw = fs.readFileSync(INT_PATH, 'utf-8');
const idx = raw.indexOf(MARKER);
if (idx === -1) { console.error('MARKER não encontrado'); process.exit(1); }

const existing = new Set();
for (const m of raw.matchAll(/"titulo"\s*:\s*"([^"]+)"/g)) existing.add(m[1]);

const paraInserir = novas.filter(n => {
  if (existing.has(n.titulo)) { console.log('  já existe:', n.titulo); return false; }
  return true;
});

if (!paraInserir.length) { console.log('Nenhuma nova interação para inserir.'); process.exit(0); }

const bloco = '\nmcInteracoesDB = mcInteracoesDB.concat(' + JSON.stringify(paraInserir, null, 2) + ');\n';
const novo = raw.slice(0, idx) + bloco + raw.slice(idx);
fs.writeFileSync(INT_PATH, novo, 'utf-8');

console.log(`✓ ${paraInserir.length} interações inseridas:`);
paraInserir.forEach(n => console.log('  +', n.titulo));
