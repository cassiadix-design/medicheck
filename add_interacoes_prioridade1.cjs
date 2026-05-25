// Adiciona interações para os 10 medicamentos prioritários sem cobertura
const fs   = require('fs');
const path = require('path');

const INT_PATH = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');
const MARKER   = '\nvar mcIECAnomes';

const novas = [

// ── REPAGLINIDA ────────────────────────────────────────────────────────────────
{
  "med1":["repaglinida","prandin","novonorm"],
  "med2":["genfibrozila","lopid"],
  "nivel":"alto",
  "titulo":"Repaglinida + Genfibrozila (Hipoglicemia Grave — Nível até 8× Mais Alto)",
  "mecanismo":"A genfibrozila inibe fortemente o CYP2C8, principal enzima responsável pelo metabolismo da repaglinida. A inibição é potente e prolonga drasticamente a meia-vida da repaglinida.",
  "efeito":"Elevação dos níveis plasmáticos da repaglinida em até 8 vezes — hipoglicemia grave e prolongada com risco de coma hipoglicêmico, convulsão e morte. Interação considerada contraindicação absoluta pelas principais agências regulatórias.",
  "conduta":"❌ Contraindicada. Substituir a genfibrozila por fenofibrato (sem interação significativa com CYP2C8) ou substituir a repaglinida por outro antidiabético oral. Se a combinação for inevitável, redução extrema da dose e monitoração intensiva da glicemia são necessárias."
},
{
  "med1":["repaglinida","prandin","novonorm"],
  "med2":["rifampicina","rifampin","rimactane"],
  "nivel":"alto",
  "titulo":"Repaglinida + Rifampicina (Perda do Efeito Antidiabético)",
  "mecanismo":"A rifampicina é potente indutor de CYP2C8, OATP1B1 e CYP3A4 — todas as vias de metabolismo e transporte da repaglinida. A indução aumenta o clearance da repaglinida em até 8 vezes.",
  "efeito":"Redução drástica dos níveis plasmáticos da repaglinida com perda do controle glicêmico, hiperglicemia e risco de cetoacidose diabética em pacientes com DM2.",
  "conduta":"⚠️ Evitar combinação quando possível. Se necessária, aumentar a dose da repaglinida com monitoração intensiva da glicemia. Ao suspender a rifampicina, reduzir gradualmente a dose da repaglinida para evitar hipoglicemia de rebote."
},
{
  "med1":["repaglinida","prandin","novonorm"],
  "med2":["álcool","alcool","etanol","bebida alcoólica"],
  "nivel":"moderado",
  "titulo":"Repaglinida + Álcool (Hipoglicemia Prolongada)",
  "mecanismo":"O álcool inibe a gliconeogênese hepática e potencializa o efeito insulinossecretor da repaglinida, resultando em queda glicêmica sinérgica e prolongada.",
  "efeito":"Hipoglicemia prolongada, especialmente em jejum. Sintomas mascarados (sudorese e taquicardia podem ser confundidos com intoxicação alcoólica), retardando o diagnóstico.",
  "conduta":"⚠️ Evitar consumo de álcool, especialmente em jejum. Orientar o paciente sobre os sintomas de hipoglicemia e a necessidade de monitorar a glicemia após ingestão de álcool."
},
{
  "med1":["repaglinida","prandin","novonorm"],
  "med2":["claritromicina","eritromicina","cetoconazol","itraconazol","fluconazol"],
  "nivel":"moderado",
  "titulo":"Repaglinida + Inibidores de CYP3A4/CYP2C8 (Risco de Hipoglicemia)",
  "mecanismo":"Claritromicina, eritromicina e azóis inibem CYP3A4 e/ou CYP2C8, reduzindo o metabolismo da repaglinida e elevando seus níveis plasmáticos.",
  "efeito":"Aumento dos níveis de repaglinida com risco de hipoglicemia — pode ser intensa com azóis (especialmente fluconazol, que inibe CYP2C8). Sintomas: sudorese, tremores, confusão, palpitações.",
  "conduta":"⚠️ Monitorar glicemia com maior frequência ao iniciar ou suspender esses medicamentos. Pode ser necessário reduzir a dose da repaglinida temporariamente."
},

// ── OXAZEPAM ───────────────────────────────────────────────────────────────────
{
  "med1":["oxazepam","seresta","urbanol"],
  "med2":["álcool","alcool","etanol","bebida alcoólica"],
  "nivel":"alto",
  "titulo":"Oxazepam + Álcool (Depressão do SNC com Risco de Apneia)",
  "mecanismo":"Efeito aditivo no GABA-A: tanto o oxazepam quanto o álcool são depressores do SNC que potencializam a inibição gabaérgica. A combinação resulta em depressão sinérgica do sistema nervoso central.",
  "efeito":"Sedação excessiva, comprometimento psicomotor grave, amnésia, risco aumentado de quedas. Em doses elevadas: depressão respiratória, apneia e risco de morte — especialmente em idosos e em contexto de overdose.",
  "conduta":"❌ Contraindicado o consumo de álcool durante o tratamento com oxazepam. Orientar firmemente o paciente. Em caso de dependência alcoólica, considerar que o oxazepam é paradoxalmente usado no tratamento da abstinência — nesse contexto, a combinação é controlada e monitorada clinicamente."
},
{
  "med1":["oxazepam","seresta","urbanol"],
  "med2":["tramadol","morfina","codeína","oxicodona","opiáceo","opioide","fentanil","meperidina"],
  "nivel":"alto",
  "titulo":"Oxazepam + Opioide (Depressão Respiratória Fatal — Black Box Warning FDA)",
  "mecanismo":"Depressão sinérgica do SNC: benzodiazepínicos potencializam a ação inibitória dos opioides sobre os centros respiratórios do tronco cerebral via receptores GABA-A e µ-opioide, respectivamente.",
  "efeito":"Risco drasticamente aumentado de depressão respiratória grave, sedação profunda, coma e morte. O FDA emitiu Black Box Warning para a combinação de benzodiazepínicos com opioides. Responsável por grande parte das mortes por overdose.",
  "conduta":"❌ Evitar combinação quando possível. Se inevitável (ex.: dor oncológica refratária), iniciar com doses mínimas de ambos, titular lentamente e monitorar de perto a função respiratória. Ter naloxona disponível. Jamais combinar em automedicação."
},
{
  "med1":["oxazepam","seresta","urbanol"],
  "med2":["clozapina"],
  "nivel":"alto",
  "titulo":"Oxazepam + Clozapina (Colapso Cardiorrespiratório)",
  "mecanismo":"Potenciação mútua da depressão do SNC e do sistema cardiovascular. Casos de colapso cardiorrespiratório fatal foram relatados mesmo com doses baixas de benzodiazepínicos em pacientes iniciando clozapina.",
  "efeito":"Colapso cardiorrespiratório, hipotensão grave, parada cardíaca. Risco especialmente elevado nas primeiras semanas de tratamento com clozapina.",
  "conduta":"❌ Evitar combinação, especialmente no período de titulação da clozapina. Se imprescindível, realizar apenas em ambiente hospitalar com monitoração intensiva."
},

// ── PERICIAZINA ────────────────────────────────────────────────────────────────
{
  "med1":["periciazina","neuleptil"],
  "med2":["amiodarona","sotalol","quinidina","droperidol","haloperidol","tioridazina","ziprasidona"],
  "nivel":"alto",
  "titulo":"Periciazina + Outros Prolongadores de QT (Torsades de Pointes)",
  "mecanismo":"A periciazina (fenotiazina) bloqueia canais de potássio cardíacos hERG, prolongando o intervalo QT. A combinação com outros fármacos que prolongam o QT (antiarrítmicos classe IA/III, outros antipsicóticos) é aditiva e pode desencadear arritmias ventriculares graves.",
  "efeito":"Prolongamento excessivo do intervalo QT com risco de torsades de pointes — arritmia ventricular potencialmente fatal que pode degenerar em fibrilação ventricular.",
  "conduta":"❌ Contraindicada a combinação com outros agentes que prolongam o QT. Monitorar ECG (QTc) antes e durante o tratamento. Corrigir hipocalemia e hipomagnesemia. Em caso de QTc >500ms, suspender o medicamento."
},
{
  "med1":["periciazina","neuleptil"],
  "med2":["álcool","alcool","etanol","bebida alcoólica"],
  "nivel":"moderado",
  "titulo":"Periciazina + Álcool (Sedação Excessiva e Hipotensão)",
  "mecanismo":"A periciazina deprime o SNC e causa bloqueio alfa-adrenérgico. O álcool potencializa ambos os efeitos.",
  "efeito":"Sedação excessiva, hipotensão ortostática grave com risco de síncope e quedas, comprometimento cognitivo e motor. Risco aumentado em idosos.",
  "conduta":"⚠️ Orientar o paciente a evitar álcool durante o tratamento. Instruir sobre risco de quedas ao se levantar rapidamente (hipotensão postural)."
},
{
  "med1":["periciazina","neuleptil"],
  "med2":["levodopa","carbidopa","carbidopa+levodopa","sinemet","prolopa"],
  "nivel":"moderado",
  "titulo":"Periciazina + Levodopa (Antagonismo e Piora do Parkinsonismo)",
  "mecanismo":"A periciazina bloqueia receptores dopaminérgicos D2, antagonizando o efeito da levodopa. Pode precipitar ou agravar o parkinsonismo.",
  "efeito":"Perda do controle motor com piora do tremor, rigidez e bradicinesia. Pode também precipitar síndrome neuroléptica maligna em pacientes com Parkinson.",
  "conduta":"⚠️ Evitar combinação em pacientes com doença de Parkinson. Se for necessário tratar psicose em parkinsonianos, preferir antipsicóticos com menos efeito extrapiramidal (quetiapina, clozapina)."
},
{
  "med1":["periciazina","neuleptil"],
  "med2":["anticolinérgico","biperideno","triexifenidil","escopolamina","hioscina"],
  "nivel":"moderado",
  "titulo":"Periciazina + Anticolinérgico (Síndrome Anticolinérgica)",
  "mecanismo":"A periciazina possui atividade anticolinérgica intrínseca. A combinação com outros anticolinérgicos é aditiva, podendo resultar em síndrome anticolinérgica.",
  "efeito":"Boca seca intensa, retenção urinária, constipação, visão turva, taquicardia, hipertermia, confusão mental e delírio (especialmente em idosos). Em casos graves: íleo paralítico e crise de glaucoma de ângulo fechado.",
  "conduta":"⚠️ Usar com cautela. Minimizar a polimedicação anticolinérgica. Monitorar sinais de toxicidade, especialmente em idosos. Se possível, reduzir a dose ou substituir um dos agentes."
},

// ── FEBUXOSTATO ────────────────────────────────────────────────────────────────
{
  "med1":["febuxostato","febuxostat","adenuric","uloric"],
  "med2":["azatioprina","mercaptopurina","tiopurina","imuran","purinethol"],
  "nivel":"alto",
  "titulo":"Febuxostato + Azatioprina / Mercaptopurina (Toxicidade Fatal — Contraindicado)",
  "mecanismo":"A xantina oxidase é a enzima responsável pela metabolização e inativação da azatioprina e mercaptopurina. O febuxostato inibe potentemente essa enzima, levando ao acúmulo de metabólitos tóxicos (6-tioguanina nucleotídeos) em concentrações potencialmente letais.",
  "efeito":"Toxicidade hematológica grave: mielossupressão severa com pancitopenia, aplasia de medula e risco de infecções oportunistas fatais. Casos de morte relatados. Esta é uma das interações mais perigosas em oncologia e reumatologia.",
  "conduta":"❌ Contraindicação absoluta. Não deve ser prescrito em pacientes usando azatioprina ou mercaptopurina. Se for necessário tratar hiperuricemia/gota nesses pacientes, usar alopurinol com monitoração rigorosa (a interação também existe com alopurinol, mas é mais previsível e manejável)."
},
{
  "med1":["febuxostato","febuxostat","adenuric","uloric"],
  "med2":["warfarina","varfarina","coumadin"],
  "nivel":"moderado",
  "titulo":"Febuxostato + Warfarina (Potencialização Anticoagulante)",
  "mecanismo":"Mecanismo não completamente elucidado. O febuxostato pode inibir o metabolismo hepático da warfarina, elevando seus níveis plasmáticos e o INR.",
  "efeito":"Aumento do efeito anticoagulante com risco de sangramento — equimoses, sangramento gengival, hematúria, sangramento gastrointestinal.",
  "conduta":"⚠️ Monitorar o INR com maior frequência ao iniciar ou suspender o febuxostato em pacientes em uso de warfarina. Ajustar a dose da warfarina conforme necessário."
},
{
  "med1":["febuxostato","febuxostat","adenuric","uloric"],
  "med2":["teofilina","aminofilina"],
  "nivel":"moderado",
  "titulo":"Febuxostato + Teofilina (Elevação dos Níveis de Teofilina)",
  "mecanismo":"A xantina oxidase participa do metabolismo da teofilina. O febuxostato, ao inibir essa enzima, pode reduzir o clearance da teofilina e elevar seus níveis plasmáticos.",
  "efeito":"Elevação dos níveis de teofilina com risco de toxicidade: náuseas, vômitos, taquicardia, arritmias, tremores e, em casos graves, convulsões.",
  "conduta":"⚠️ Monitorar os níveis séricos de teofilina ao iniciar o febuxostato. Ajustar a dose da teofilina se necessário. O índice terapêutico estreito da teofilina exige atenção redobrada."
},

// ── MICONAZOL ─────────────────────────────────────────────────────────────────
{
  "med1":["miconazol","daktarin","gelmax","micoset"],
  "med2":["warfarina","varfarina","coumadin"],
  "nivel":"alto",
  "titulo":"Miconazol (mesmo Tópico/Bucal) + Warfarina (Sangramento Grave — INR Perigoso)",
  "mecanismo":"O miconazol inibe fortemente CYP2C9, principal enzima responsável pelo metabolismo da S-warfarina (forma mais potente). Mesmo aplicações tópicas ou gel oral (mucosa oral absorve miconazol sistemicamente) podem causar interação clínica significativa.",
  "efeito":"Elevação importante do INR com risco de sangramento grave — hematomas espontâneos, hemorragia digestiva, hematúria, sangramento intracraniano. Casos relatados com miconazol gel oral.",
  "conduta":"⚠️ Monitorar o INR com frequência aumentada ao iniciar o miconazol em qualquer formulação. Reduzir a dose de warfarina preventivamente (geralmente 25–50%). Preferir nistatina (antifúngico sem interação com warfarina) para candidíase oral quando possível."
},
{
  "med1":["miconazol","daktarin","gelmax","micoset"],
  "med2":["glibenclamida","glipizida","gliclazida","glimepirida","sulfonilureia"],
  "nivel":"moderado",
  "titulo":"Miconazol + Sulfonilureia (Hipoglicemia por Inibição do CYP2C9)",
  "mecanismo":"O miconazol inibe CYP2C9, que metaboliza sulfonilureias (glibenclamida, gliclazida). O acúmulo dessas drogas eleva o risco de hipoglicemia.",
  "efeito":"Hipoglicemia — episódios de sudorese, tremor, confusão, palpitações e, em casos graves, convulsão e coma hipoglicêmico.",
  "conduta":"⚠️ Monitorar a glicemia com frequência aumentada durante o uso concomitante, especialmente na primeira semana. Considerar redução da dose da sulfonilureia ou substituir por nistatina."
},
{
  "med1":["miconazol","daktarin","gelmax","micoset"],
  "med2":["fenitoína","epelin","hidantoína"],
  "nivel":"moderado",
  "titulo":"Miconazol + Fenitoína (Toxicidade por Elevação da Fenitoína)",
  "mecanismo":"O miconazol inibe CYP2C9, principal via de metabolismo da fenitoína, elevando seus níveis plasmáticos.",
  "efeito":"Toxicidade por fenitoína: nistagmo, ataxia, diplopia, confusão mental e convulsões paradoxais em doses excessivas.",
  "conduta":"⚠️ Monitorar níveis séricos de fenitoína ao iniciar o miconazol. Reduzir a dose da fenitoína se necessário. Preferir antifúngico alternativo (nistatina) quando possível."
},

// ── MECLIZINA ─────────────────────────────────────────────────────────────────
{
  "med1":["meclizina","meclicot","anti-emético"],
  "med2":["álcool","alcool","etanol","bebida alcoólica"],
  "nivel":"moderado",
  "titulo":"Meclizina + Álcool (Sedação Excessiva e Comprometimento Motor)",
  "mecanismo":"A meclizina tem efeito anticolinérgico e anti-histamínico (H1) com importante ação sedativa no SNC. O álcool potencializa esse efeito por depressão aditiva do SNC.",
  "efeito":"Sedação excessiva, lentidão de reflexos, comprometimento da atenção e coordenação — risco aumentado de acidentes de trânsito e quedas. Em doses elevadas, risco de depressão respiratória.",
  "conduta":"⚠️ Evitar álcool durante o tratamento com meclizina. Orientar sobre risco de dirigir ou operar máquinas. Cautela especial em idosos pelo risco de quedas."
},
{
  "med1":["meclizina","meclicot"],
  "med2":["tramadol","morfina","codeína","oxicodona","opioide","fentanil"],
  "nivel":"moderado",
  "titulo":"Meclizina + Opioide (Potencialização da Sedação e Depressão Respiratória)",
  "mecanismo":"Depressão aditiva do SNC: a meclizina potencializa o efeito sedativo e antiemético dos opioides, mas também aumenta o risco de depressão respiratória.",
  "efeito":"Sedação profunda, confusão mental, depressão respiratória — risco maior em idosos e em uso de doses altas de opioides.",
  "conduta":"⚠️ Usar com cautela. Iniciar com doses baixas e monitorar sinais de sedação excessiva. Preferir metoclopramida ou ondansetrona como antiemético alternativo em pacientes em uso de opioides."
},
{
  "med1":["meclizina","meclicot"],
  "med2":["anticolinérgico","biperideno","escopolamina","hioscina","oxibutinina","solifenacina","tolterodina"],
  "nivel":"moderado",
  "titulo":"Meclizina + Anticolinérgico (Síndrome Anticolinérgica Aditiva)",
  "mecanismo":"A meclizina possui atividade anticolinérgica significativa. A combinação com outros anticolinérgicos é aditiva.",
  "efeito":"Boca seca, retenção urinária, constipação, visão turva, taquicardia, hipertermia e confusão mental. Risco maior em idosos — critérios de Beers alertam para uso de anticolinérgicos múltiplos.",
  "conduta":"⚠️ Avaliar a carga anticolinérgica total do paciente. Em idosos, considerar substituição por anti-histamínico com menor efeito anticolinérgico ou outro antivertiginoso."
},

// ── METOCARBAMOL ───────────────────────────────────────────────────────────────
{
  "med1":["metocarbamol","robaxin"],
  "med2":["álcool","alcool","etanol","bebida alcoólica"],
  "nivel":"moderado",
  "titulo":"Metocarbamol + Álcool (Depressão do SNC)",
  "mecanismo":"O metocarbamol é relaxante muscular de ação central. O álcool potencializa seu efeito depressor sobre o SNC de forma aditiva.",
  "efeito":"Sedação excessiva, comprometimento da coordenação motora, lentidão de reflexos — risco de acidentes, quedas e incapacidade de dirigir com segurança.",
  "conduta":"⚠️ Evitar álcool durante o tratamento. Orientar o paciente a não dirigir ou operar máquinas durante o uso."
},
{
  "med1":["metocarbamol","robaxin"],
  "med2":["tramadol","morfina","codeína","opioide","benzodiazepínico","diazepam","alprazolam","clonazepam","lorazepam"],
  "nivel":"moderado",
  "titulo":"Metocarbamol + Opioide / Benzodiazepínico (Depressão Aditiva do SNC)",
  "mecanismo":"O metocarbamol, os opioides e os benzodiazepínicos compartilham efeitos depressores sobre o SNC. A combinação é aditiva e pode resultar em comprometimento significativo da função neurológica.",
  "efeito":"Sedação excessiva, confusão, tontura, comprometimento psicomotor — risco aumentado de quedas e acidentes. Em doses altas ou em pacientes vulneráveis: risco de depressão respiratória.",
  "conduta":"⚠️ Usar com cautela. Iniciar com doses menores. Orientar sobre risco de dirigir. Evitar combinação em idosos sempre que possível."
},
{
  "med1":["metocarbamol","robaxin"],
  "med2":["piridostigmina","neostigmina"],
  "nivel":"moderado",
  "titulo":"Metocarbamol + Inibidor de Colinesterase (Antagonismo em Miastenia Gravis)",
  "mecanismo":"O metocarbamol pode antagonizar os efeitos neuromusculares dos inibidores de colinesterase. A combinação pode prejudicar a força muscular em pacientes com miastenia gravis.",
  "efeito":"Piora da fraqueza muscular em pacientes com miastenia gravis — risco de crise miastênica com comprometimento respiratório.",
  "conduta":"⚠️ Contraindicado em miastenia gravis. Se necessário tratar espasmo muscular nesse contexto, discutir alternativas com o neurologista."
},

// ── AMOXICILINA + CLAVULANATO ──────────────────────────────────────────────────
{
  "med1":["amoxicilina + clavulanato","amoxicilina + clavulanato de potássio","amoxicilina clavulanato","augmentin","clavulin","amoxicilina clavulânico"],
  "med2":["metotrexato","methotrexate"],
  "nivel":"alto",
  "titulo":"Amoxicilina + Clavulanato + Metotrexato (Toxicidade Grave por Metotrexato)",
  "mecanismo":"A amoxicilina inibe a secreção tubular renal do metotrexato via competição pelos transportadores OAT3/OAT1, reduzindo seu clearance renal. Isso resulta em acúmulo de metotrexato em concentrações tóxicas.",
  "efeito":"Toxicidade grave por metotrexato: mielossupressão severa com pancitopenia, mucosite grave, hepatotoxicidade e nefrotoxicidade. Casos de morte relatados, especialmente em pacientes com função renal reduzida.",
  "conduta":"⚠️ Evitar combinação — especialmente em altas doses de metotrexato (oncológicas). Se imprescindível (baixas doses reumatológicas), monitorar hemograma completo, creatinina e transaminases com frequência aumentada. Ter resgate com leucovorina disponível."
},
{
  "med1":["amoxicilina + clavulanato","amoxicilina clavulanato","augmentin","clavulin","amoxicilina clavulânico"],
  "med2":["warfarina","varfarina","coumadin"],
  "nivel":"moderado",
  "titulo":"Amoxicilina + Clavulanato + Warfarina (Elevação do INR)",
  "mecanismo":"Antibióticos de amplo espectro reduzem a flora intestinal produtora de vitamina K, potencializando o efeito anticoagulante da warfarina. O clavulanato também pode contribuir com mecanismo adicional.",
  "efeito":"Elevação do INR com risco de sangramento — equimoses, sangramento gengival, hematúria. O risco é maior em pacientes com INR já elevado ou com histórico de sangramento.",
  "conduta":"⚠️ Monitorar o INR após 3–5 dias de tratamento antibiótico. Orientar o paciente a comunicar qualquer sangramento incomum. Pode ser necessário reduzir temporariamente a dose de warfarina."
},
{
  "med1":["amoxicilina + clavulanato","amoxicilina clavulanato","augmentin","clavulin","amoxicilina clavulânico"],
  "med2":["alopurinol","zyloprim"],
  "nivel":"moderado",
  "titulo":"Amoxicilina + Alopurinol (Risco Aumentado de Reação Cutânea)",
  "mecanismo":"O alopurinol eleva a frequência de reações de hipersensibilidade à amoxicilina, especialmente rush cutâneo maculopapular. O mecanismo exato não é completamente compreendido, mas envolve alteração da resposta imune.",
  "efeito":"Aumento de 2–3× na frequência de rash cutâneo com amoxicilina (especialmente maculopapular). Geralmente não indica alergia penicilínica verdadeira, mas pode ser confundido com ela, levando a restrições desnecessárias.",
  "conduta":"⚠️ Informar ao paciente sobre o risco aumentado de rash. Qualquer reação cutânea deve ser avaliada — diferenciar rash simples de urticária/anafilaxia (que indicaria alergia real). Registrar o episódio no prontuário para orientação futura."
},

// ── FEXOFENADINA + PSEUDOEFEDRINA ─────────────────────────────────────────────
{
  "med1":["fexofenadina + pseudoefedrina","allegra d","fexodina d","fexofenadin pseudoefedrina"],
  "med2":["inibidor mao","imao","fenelzina","tranilcipromina","isocarboxazida","selegilina"],
  "nivel":"alto",
  "titulo":"Fexofenadina + Pseudoefedrina + IMAO (Crise Hipertensiva Potencialmente Fatal)",
  "mecanismo":"A pseudoefedrina estimula a liberação de catecolaminas endógenas (noradrenalina, dopamina). Os IMAOs bloqueiam sua metabolização, causando acúmulo de catecolaminas com estimulação adrenérgica maciça.",
  "efeito":"Crise hipertensiva grave com cefaleia intensa, rubor, palpitações, arritmias e risco de AVC hemorrágico, edema pulmonar e morte.",
  "conduta":"❌ Contraindicada. Respeitar intervalo de segurança de 14 dias após suspensão do IMAO antes de usar qualquer simpaticomiméticos. Em urgência hipertensiva por essa combinação: fentolamina IV ou nitroprussiato."
},
{
  "med1":["fexofenadina + pseudoefedrina","allegra d","fexodina d"],
  "med2":["anti-hipertensivo","metildopa","guanetidina","reserpina","betabloqueador"],
  "nivel":"moderado",
  "titulo":"Fexofenadina + Pseudoefedrina + Anti-hipertensivo (Antagonismo do Efeito Hipotensor)",
  "mecanismo":"A pseudoefedrina é um agonista alfa e beta-adrenérgico que eleva a pressão arterial. Antagoniza diretamente o efeito de anti-hipertensivos, especialmente metildopa e betabloqueadores.",
  "efeito":"Perda do controle pressórico — elevação da pressão arterial com risco de emergência hipertensiva em pacientes com HAS já controlada.",
  "conduta":"⚠️ Evitar uso de descongestionantes com pseudoefedrina em hipertensos. Usar anti-histamínico sem componente simpatomimétic (fexofenadina simples, loratadina simples, cetirizina) como alternativa."
},
{
  "med1":["fexofenadina + pseudoefedrina","allegra d","fexodina d"],
  "med2":["suco de laranja","suco de maçã","suco de toranja"],
  "nivel":"moderado",
  "titulo":"Fexofenadina + Suco de Frutas (Redução da Absorção em até 73%)",
  "mecanismo":"O suco de laranja, maçã e toranja inibem transportadores intestinais OATP (proteínas transportadoras de ânions orgânicos) responsáveis pela absorção da fexofenadina. A absorção pode cair até 73% com suco de laranja.",
  "efeito":"Redução marcante dos níveis plasmáticos de fexofenadina, com perda do efeito antialérgico esperado — sintomas alérgicos não controlados.",
  "conduta":"⚠️ Tomar fexofenadina (e Allegra D) com água, não com suco de frutas. Manter intervalo de pelo menos 4 horas entre o suco e a medicação."
},

// ── LORATADINA + PSEUDOEFEDRINA ───────────────────────────────────────────────
{
  "med1":["loratadina + pseudoefedrina","claritin d","loratadina pseudoefedrina","loratemp d"],
  "med2":["inibidor mao","imao","fenelzina","tranilcipromina","isocarboxazida","selegilina"],
  "nivel":"alto",
  "titulo":"Loratadina + Pseudoefedrina + IMAO (Crise Hipertensiva Potencialmente Fatal)",
  "mecanismo":"A pseudoefedrina estimula liberação de catecolaminas endógenas. Os IMAOs bloqueiam a MAO-A e MAO-B, impedindo sua metabolização e causando acúmulo maciço com estimulação adrenérgica intensa.",
  "efeito":"Crise hipertensiva grave com cefaleia intensa, hipertermia, arritmias e risco de AVC hemorrágico e morte.",
  "conduta":"❌ Contraindicada. Respeitar 14 dias de washout após suspensão do IMAO. Em crise: fentolamina IV."
},
{
  "med1":["loratadina + pseudoefedrina","claritin d","loratadina pseudoefedrina","loratemp d"],
  "med2":["anti-hipertensivo","metildopa","betabloqueador","clonidina"],
  "nivel":"moderado",
  "titulo":"Loratadina + Pseudoefedrina + Anti-hipertensivo (Antagonismo Hipotensor)",
  "mecanismo":"A pseudoefedrina eleva a pressão arterial via agonismo adrenérgico, antagonizando diretamente o efeito de anti-hipertensivos.",
  "efeito":"Elevação da pressão arterial com perda do controle de HAS previamente controlada — risco de emergência hipertensiva.",
  "conduta":"⚠️ Evitar em pacientes hipertensos. Substituir por loratadina simples, cetirizina ou fexofenadina (sem pseudoefedrina) para controle alérgico."
},
{
  "med1":["loratadina + pseudoefedrina","claritin d","loratadina pseudoefedrina","loratemp d"],
  "med2":["claritromicina","eritromicina","cetoconazol","itraconazol"],
  "nivel":"moderado",
  "titulo":"Loratadina + Pseudoefedrina + Inibidores de CYP3A4 (Elevação da Loratadina)",
  "mecanismo":"A loratadina é metabolizada pelo CYP3A4. A inibição dessa enzima por claritromicina, eritromicina ou azóis eleva os níveis de loratadina e seu metabólito ativo (desloratadina).",
  "efeito":"Geralmente bem tolerado com loratadina simples (não causa QT significativo). Porém, o componente de pseudoefedrina mantém o risco cardiovascular. Monitorar pressão arterial e sintomas adrenérgicos.",
  "conduta":"⚠️ Monitorar pressão arterial. Em pacientes cardiovasculares, preferir anti-histamínico simples sem pseudoefedrina."
}

];

// ── Inserção ──────────────────────────────────────────────────────────────────
let raw = fs.readFileSync(INT_PATH, 'utf-8');
const idx = raw.indexOf(MARKER);
if (idx === -1) { console.error('MARKER não encontrado'); process.exit(1); }

// Verificar duplicatas simples por título
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
