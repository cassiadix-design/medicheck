// Lote 3: interações para 15 medicamentos (5 novos + complemento nos 10 existentes)
const fs   = require('fs');
const path = require('path');
const INT_PATH = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');
const MARKER   = '\nvar mcIECAnomes';

const novas = [

// ══════════════════════════════════════════════════════════════════════════════
// LEFLUNOMIDA — complemento (warfarina, MTX, rifampicina, rituximabe já existem)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["leflunomida","arava"],
  "med2":["vacina bcg","vacina febre amarela","vacina sarampo","vacina varicela","vacina viva","vacina de virus vivo"],
  "nivel":"alto",
  "titulo":"Leflunomida + Vacina de Vírus Vivo (Infecção Disseminada — Contraindicado)",
  "mecanismo":"A leflunomida inibe a DHODH, bloqueando a síntese de novo de pirimidinas em linfócitos T ativos. O sistema imune comprometido não consegue conter a replicação do agente vacinal vivo.",
  "efeito":"Infecção disseminada pelo vírus vacinal — BCG disseminada, febre amarela vacinal, varicela generalizada — potencialmente fatais.",
  "conduta":"❌ Contraindicado. Vacinas de vírus vivo devem ser aplicadas antes do início. Para suspender a leflunomida de emergência, utilizar o protocolo de washout com colestiramina (8g 3×/dia por 11 dias) para remover rapidamente o metabólito ativo (teriflunomida)."
},
{
  "med1":["leflunomida","arava"],
  "med2":["colestiramina","questran","colestipol"],
  "nivel":"moderado",
  "titulo":"Leflunomida + Colestiramina (Washout — Redução Rápida dos Níveis)",
  "mecanismo":"A colestiramina interrompe a circulação entero-hepática do metabólito ativo da leflunomida (teriflunomida), acelerando sua eliminação. Normalmente a meia-vida é de 1–4 semanas; com washout por colestiramina, reduz-se para cerca de 11 dias.",
  "efeito":"Se usado intencionalmente como washout: redução rápida e desejada dos níveis. Se usado inadvertidamente junto: redução não intencional da eficácia da leflunomida.",
  "conduta":"⚠️ Uso concomitante regular reduz a eficácia da leflunomida. Para washout intencional (gravidez planejada, toxicidade, cirurgia): colestiramina 8g 3×/dia por 11 dias consecutivos, confirmada por dosagem sérica de teriflunomida <0,02 mg/L."
},
{
  "med1":["leflunomida","arava"],
  "med2":["hepatotóxico","paracetamol","isoniazida","cetoconazol","itraconazol","metotrexato"],
  "nivel":"moderado",
  "titulo":"Leflunomida + Hepatotóxico (Toxicidade Hepática Aditiva)",
  "mecanismo":"A leflunomida causa elevação de transaminases em 2–4% dos pacientes. A combinação com outros hepatotóxicos potencializa o risco de lesão hepática.",
  "efeito":"Hepatotoxicidade — elevação de AST/ALT, hepatite medicamentosa. Risco maior com paracetamol em doses altas, isoniazida, azóis antifúngicos e especialmente metotrexato.",
  "conduta":"⚠️ Monitorar transaminases mensalmente nos primeiros 6 meses e a cada 6–8 semanas após. Evitar paracetamol acima de 1,5g/dia cronicamente. Suspender se ALT >3× o limite superior normal."
},

// ══════════════════════════════════════════════════════════════════════════════
// HIDROXICLOROQUINA — complemento (antiarrítmicos, digoxina, ciclosporina, AINE já existem)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["hidroxicloroquina","reuquinol","plaquinol","hcq"],
  "med2":["insulina","glibenclamida","gliclazida","glimepirida","metformina","antidiabético"],
  "nivel":"moderado",
  "titulo":"Hidroxicloroquina + Antidiabético / Insulina (Hipoglicemia)",
  "mecanismo":"A hidroxicloroquina aumenta a secreção de insulina pelas células β pancreáticas e melhora a sensibilidade periférica à insulina — efeito hipoglicemiante intrínseco, independente da doença de base.",
  "efeito":"Hipoglicemia — risco aumentado em diabéticos usando insulina ou sulfonilureias. O efeito é clínica e estatisticamente significativo, especialmente em diabéticos com artrite reumatoide ou lúpus.",
  "conduta":"⚠️ Monitorar glicemia com maior frequência ao iniciar hidroxicloroquina em diabéticos. Pode ser necessário reduzir a dose de insulina ou sulfonilureia. Paradoxalmente, esse efeito hipoglicemiante pode ser benéfico — discutir com o médico."
},
{
  "med1":["hidroxicloroquina","reuquinol","plaquinol","hcq"],
  "med2":["tamoxifeno","novaldex"],
  "nivel":"moderado",
  "titulo":"Hidroxicloroquina + Tamoxifeno (Risco Aditivo de Toxicidade Retinal)",
  "mecanismo":"Ambos os medicamentos têm potencial de causar retinopatia por acúmulo em tecidos oculares. A hidroxicloroquina deposita-se na retina (toxicidade cumulativa dose-dependente); o tamoxifeno também causa retinopatia em uso prolongado.",
  "efeito":"Risco aumentado de retinopatia — dano irreversível à mácula com perda permanente de visão central.",
  "conduta":"⚠️ Exame oftalmológico com OCT retinal antes de iniciar e anualmente durante o uso. Reduzir a dose de hidroxicloroquina para o mínimo eficaz (não exceder 5mg/kg/dia de peso real). Informar o oftalmologista de ambas as medicações."
},
{
  "med1":["hidroxicloroquina","reuquinol","plaquinol","hcq"],
  "med2":["metotrexato","mtx","ledertrexato"],
  "nivel":"moderado",
  "titulo":"Hidroxicloroquina + Metotrexato (Combinação Padrão com Monitoração)",
  "mecanismo":"Combinação amplamente usada na artrite reumatoide (dupla DMARD). A hidroxicloroquina pode aumentar levemente os níveis de metotrexato ao reduzir sua eliminação renal, além de ter efeitos hepáticos aditivos.",
  "efeito":"Hepatotoxicidade potencialmente aumentada. Porém, a combinação é a base do tratamento da AR — o benefício supera amplamente o risco quando monitorada adequadamente.",
  "conduta":"⚠️ Monitorar hemograma e transaminases mensalmente. Suplementar ácido fólico (5–10mg/semana) para reduzir a toxicidade do MTX. A combinação tripla (MTX + HCQ + sulfassalazina) é protocolo validado para AR."
},

// ══════════════════════════════════════════════════════════════════════════════
// SULFASSALAZINA — complemento (ácido fólico, azatioprina já existem)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["sulfassalazina","salazopyrin","azulfidine"],
  "med2":["warfarina","varfarina","coumadin"],
  "nivel":"moderado",
  "titulo":"Sulfassalazina + Warfarina (Elevação do INR)",
  "mecanismo":"A sulfassalazina pode inibir o CYP2C9 (principal via de metabolismo da S-warfarina), além de deslocar a warfarina de proteínas plasmáticas. Ambos os mecanismos elevam o efeito anticoagulante.",
  "efeito":"Elevação do INR com risco de sangramento — pode ser pronunciado.",
  "conduta":"⚠️ Monitorar o INR com maior frequência ao iniciar ou suspender a sulfassalazina. Ajustar dose de warfarina conforme necessário."
},
{
  "med1":["sulfassalazina","salazopyrin","azulfidine"],
  "med2":["metotrexato","mtx","ledertrexato"],
  "nivel":"moderado",
  "titulo":"Sulfassalazina + Metotrexato (Mielossupressão Aditiva — Combinação Padrão)",
  "mecanismo":"Ambos causam mielossupressão e, em menor grau, hepatotoxicidade. A combinação é parte do protocolo triplo (MTX + HCQ + sulfassalazina) na AR — usado intencionalmente, mas com monitoração obrigatória.",
  "efeito":"Mielossupressão aditiva (neutropenia, anemia) e hepatotoxicidade potencialmente aumentada.",
  "conduta":"⚠️ Monitorar hemograma completo e transaminases mensalmente. Suplementar ácido fólico. A combinação triple DMARD é protocolo estabelecido — não descontinuar sem orientação do reumatologista."
},
{
  "med1":["sulfassalazina","salazopyrin","azulfidine"],
  "med2":["digoxina","lanoxin"],
  "nivel":"moderado",
  "titulo":"Sulfassalazina + Digoxina (Redução da Absorção da Digoxina)",
  "mecanismo":"A sulfassalazina pode reduzir a absorção oral da digoxina por mecanismos não completamente elucidados (alteração da motilidade intestinal e possível quelação).",
  "efeito":"Redução dos níveis séricos de digoxina — risco de controle insuficiente da frequência ventricular em fibrilação atrial ou insuficiência cardíaca.",
  "conduta":"⚠️ Monitorar níveis séricos de digoxina e frequência cardíaca ao iniciar ou suspender a sulfassalazina. Pode ser necessário ajuste de dose da digoxina."
},
{
  "med1":["sulfassalazina","salazopyrin","azulfidine"],
  "med2":["ferro","sulfato ferroso","fumarato ferroso","gluconato ferroso"],
  "nivel":"moderado",
  "titulo":"Sulfassalazina + Ferro Oral (Quelação — Absorção Reduzida de Ambos)",
  "mecanismo":"O ferro forma quelatos com a sulfassalazina no trato gastrointestinal, reduzindo a absorção de ambos.",
  "efeito":"Redução da eficácia da sulfassalazina (DMARD) e menor absorção do ferro (anemia não tratada adequadamente).",
  "conduta":"⚠️ Separar a administração de ferro e sulfassalazina por pelo menos 3 horas."
},

// ══════════════════════════════════════════════════════════════════════════════
// COLCHICINA — complemento (macrolídeos, estatina, ciclosporina, verapamil já existem)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["colchicina","colchis"],
  "med2":["fluconazol","cetoconazol","itraconazol","voriconazol"],
  "nivel":"alto",
  "titulo":"Colchicina + Azol Antifúngico (Toxicidade Grave por Acúmulo — P-gp + CYP3A4)",
  "mecanismo":"Azóis inibem CYP3A4 e P-glicoproteína (P-gp), as duas principais vias de eliminação da colchicina. A inibição combinada pode elevar os níveis de colchicina dramaticamente — janela terapêutica estreita.",
  "efeito":"Toxicidade por colchicina: náusea, diarreia, miopatia, neuropatia periférica, mielossupressão e, em casos graves, falência de múltiplos órgãos e morte.",
  "conduta":"⚠️ Reduzir a dose de colchicina para metade (ou menos) ao usar azol antifúngico. Em insuficiência renal, a combinação é especialmente perigosa — considerar suspensão da colchicina durante o tratamento antifúngico."
},
{
  "med1":["colchicina","colchis"],
  "med2":["álcool","alcool","etanol","bebida alcoólica"],
  "nivel":"moderado",
  "titulo":"Colchicina + Álcool (Hepatotoxicidade e Ineficácia no Controle da Gota)",
  "mecanismo":"O álcool é desencadeador bem estabelecido de crises de gota ao elevar a uricemia. Combinado à colchicina (que tem toxicidade hepática), o álcool potencializa a lesão hepatocelular.",
  "efeito":"Crise de gota precipitada pelo álcool (especialmente cerveja e destilados — ricos em purinas ou frutose). Hepatotoxicidade aditiva com uso crônico de ambos.",
  "conduta":"⚠️ Evitar álcool no manejo da gota. Orientar que a colchicina não protege da crise desencadeada pelo álcool — a prevenção é dietética e comportamental."
},

// ══════════════════════════════════════════════════════════════════════════════
// ALOPURINOL — complemento (azatioprina, amoxicilina, warfarina, ciclosporina já existem)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["alopurinol","zyloprim","zyloric"],
  "med2":["hidroclorotiazida","clortalidona","bendroflumetiazida","indapamida","diurético tiazídico"],
  "nivel":"moderado",
  "titulo":"Alopurinol + Diurético Tiazídico (Risco de Reações de Hipersensibilidade Graves)",
  "mecanismo":"Diuréticos tiazídicos elevam a uricemia (reduzem a excreção renal de urato) e podem aumentar os níveis de oxipurinol (metabólito ativo do alopurinol). Esse acúmulo está associado a maior incidência de reações de hipersensibilidade graves ao alopurinol.",
  "efeito":"Risco aumentado de síndrome de hipersensibilidade ao alopurinol (AHS): síndrome de Stevens-Johnson, necrólise epidérmica tóxica, hepatite grave e vasculite — potencialmente fatais. Risco 3× maior em usuários de tiazídicos, especialmente com insuficiência renal.",
  "conduta":"⚠️ Usar a menor dose eficaz de alopurinol. Escalar a dose lentamente. Em pacientes de etnia asiática (HLA-B*58:01), considerar genotipagem antes de iniciar — risco 100× maior de AHS. Monitorar sinais cutâneos precocemente (qualquer rash = suspender imediatamente)."
},
{
  "med1":["alopurinol","zyloprim","zyloric"],
  "med2":["captopril","enalapril","lisinopril","ramipril","ieca","inibidor da eca"],
  "nivel":"moderado",
  "titulo":"Alopurinol + IECA (Risco Aumentado de Síndrome de Hipersensibilidade e Leucopenia)",
  "mecanismo":"IECAs podem potencializar as reações de hipersensibilidade ao alopurinol, especialmente em pacientes com insuficiência renal. Mecanismo relacionado à acumulação de oxipurinol.",
  "efeito":"Síndrome de hipersensibilidade grave ao alopurinol (Stevens-Johnson, hepatite), leucopenia — especialmente em insuficiência renal.",
  "conduta":"⚠️ Monitorar hemograma e sinais cutâneos. Ajustar a dose do alopurinol pela TFG. Qualquer rash = suspender imediatamente o alopurinol."
},
{
  "med1":["alopurinol","zyloprim","zyloric"],
  "med2":["fenitoína","epelin","hidantoína"],
  "nivel":"moderado",
  "titulo":"Alopurinol + Fenitoína (Aumento dos Níveis de Fenitoína)",
  "mecanismo":"O alopurinol inibe enzimas hepáticas envolvidas no metabolismo da fenitoína, elevando seus níveis plasmáticos.",
  "efeito":"Toxicidade por fenitoína: nistagmo, ataxia, diplopia, confusão mental.",
  "conduta":"⚠️ Monitorar níveis séricos de fenitoína ao iniciar o alopurinol. Pode ser necessário reduzir a dose da fenitoína."
},

// ══════════════════════════════════════════════════════════════════════════════
// RALOXIFENO — complemento (warfarina, colestiramina, estrogênios já existem)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["raloxifeno","evista"],
  "med2":["ampicilina","amoxicilina"],
  "nivel":"moderado",
  "titulo":"Raloxifeno + Ampicilina / Amoxicilina (Absorção Reduzida em 28%)",
  "mecanismo":"Ampicilina reduz a biodisponibilidade oral do raloxifeno em até 28%, provavelmente por alteração da flora intestinal que participa da circulação entero-hepática dos conjugados do raloxifeno.",
  "efeito":"Redução dos níveis plasmáticos de raloxifeno com potencial comprometimento da eficácia na proteção óssea e na prevenção de câncer de mama.",
  "conduta":"⚠️ Para cursos curtos de antibiótico, a interação tem impacto clínico mínimo. Em uso prolongado, monitorar densitometria óssea periodicamente."
},
{
  "med1":["raloxifeno","evista"],
  "med2":["levotiroxina","puran","euthyrox"],
  "nivel":"moderado",
  "titulo":"Raloxifeno + Levotiroxina (Redução da Absorção da Levotiroxina)",
  "mecanismo":"O raloxifeno pode reduzir a absorção intestinal da levotiroxina, possivelmente por ligação no intestino ou alteração do trânsito intestinal.",
  "efeito":"Hipotireoidismo por subdosagem efetiva da levotiroxina — TSH elevado, fadiga, ganho de peso.",
  "conduta":"⚠️ Administrar levotiroxina pelo menos 4 horas antes do raloxifeno. Monitorar TSH ao iniciar o raloxifeno."
},

// ══════════════════════════════════════════════════════════════════════════════
// DENOSUMABE — complemento (cálcio/vitamina D já existe)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["denosumabe","prolia","xgeva"],
  "med2":["bisfosfonato","alendronato","risedronato","zoledronato","ibandronato","ácido zoledrônico"],
  "nivel":"moderado",
  "titulo":"Denosumabe + Bisfosfonato (Hipocalcemia Aditiva — Monitoração Rigorosa)",
  "mecanismo":"Ambos são antirreabsortivos ósseos potentes que suprimem a atividade osteoclástica. A combinação causa supressão óssea profunda com risco aumentado de hipocalcemia grave, especialmente ao trocar de um para o outro.",
  "efeito":"Hipocalcemia grave — câimbras, parestesias, tetania, arritmias. Ao suspender o denosumabe sem substituição por bisfosfonato, pode ocorrer hipercalcemia de rebote por reativação excessiva de osteoclastos.",
  "conduta":"⚠️ Não combinar em rotina. Na transição de denosumabe para bisfosfonato (necessária para evitar rebote ósseo na suspensão do denosumabe), monitorar cálcio sérico intensivamente. Suplementar cálcio e vitamina D generosamente."
},
{
  "med1":["denosumabe","prolia","xgeva"],
  "med2":["imunossupressor","ciclosporina","tacrolimo","prednisona","metotrexato"],
  "nivel":"moderado",
  "titulo":"Denosumabe + Imunossupressor (Risco Aumentado de Infecções Sérias)",
  "mecanismo":"O denosumabe inibe o RANKL, reduzindo não apenas a atividade osteoclástica mas também comprometendo a resposta imune em tecidos que expressam RANKL (incluindo células imunes). A combinação com imunossupressores potencializa o risco infeccioso.",
  "efeito":"Risco aumentado de infecções graves — celulite, infecções cutâneas, sepse. Casos de osteonecrose da mandíbula em dose oncológica (Xgeva).",
  "conduta":"⚠️ Monitorar sinais de infecção. Manter higiene dental rigorosa. Verificar avaliação odontológica antes de iniciar o Xgeva (dose oncológica)."
},

// ══════════════════════════════════════════════════════════════════════════════
// CALCITRIOL — complemento (teriparatida, tiazídico, sequestrantes já existem)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["calcitriol","rocaltrol"],
  "med2":["digoxina","lanoxin","digitoxina"],
  "nivel":"moderado",
  "titulo":"Calcitriol + Digoxina (Hipercalcemia Aumenta Toxicidade Digitálica)",
  "mecanismo":"A hipercalcemia induzida pelo calcitriol em excesso potencializa a toxicidade da digoxina: o cálcio elevado e a digoxina têm efeitos aditivos sobre a excitabilidade cardíaca.",
  "efeito":"Toxicidade digitálica com arritmias — bradiarritmias, bloqueios, bigeminismo — desencadeadas ou agravadas pela hipercalcemia.",
  "conduta":"⚠️ Monitorar cálcio sérico regularmente em pacientes usando calcitriol com digoxina. Manter cálcio sérico no limite inferior do normal."
},
{
  "med1":["calcitriol","rocaltrol"],
  "med2":["magnésio","hidróxido de magnésio","carbonato de magnésio","leite de magnésia"],
  "nivel":"moderado",
  "titulo":"Calcitriol + Magnésio (Hipermagnesemia em Insuficiência Renal)",
  "mecanismo":"O calcitriol aumenta a absorção intestinal de magnésio além do cálcio. Em insuficiência renal (principal indicação do calcitriol), a eliminação renal de magnésio está reduzida — o magnésio pode acumular.",
  "efeito":"Hipermagnesemia em pacientes com insuficiência renal: fraqueza muscular, hipotensão, bradicardia, depressão respiratória.",
  "conduta":"⚠️ Evitar antiácidos com magnésio em pacientes renais usando calcitriol. Monitorar magnésio sérico periodicamente."
},

// ══════════════════════════════════════════════════════════════════════════════
// PENICILAMINA — novas interações
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["penicilamina","cupripen","trolovol","d-penicilamina"],
  "med2":["ouro","auranofin","sais de ouro"],
  "nivel":"alto",
  "titulo":"Penicilamina + Ouro (Nefrotoxicidade e Mielotoxicidade Graves — Contraindicado)",
  "mecanismo":"Ambos os agentes causam nefrotoxicidade (síndrome nefrótica) e mielossupressão independentemente. A combinação potencializa dramaticamente esses riscos.",
  "efeito":"Síndrome nefrótica grave, glomerulonefrite membranosa, mielossupressão com pancitopenia — potencialmente fatais.",
  "conduta":"❌ Contraindicada a associação. Não usar penicilamina e sais de ouro simultaneamente ou em sequência próxima."
},
{
  "med1":["penicilamina","cupripen","trolovol","d-penicilamina"],
  "med2":["ferro","sulfato ferroso","fumarato ferroso","gluconato ferroso"],
  "nivel":"moderado",
  "titulo":"Penicilamina + Ferro Oral (Quelação — Absorção Drasticamente Reduzida)",
  "mecanismo":"O ferro forma quelatos insolúveis com a penicilamina no trato gastrointestinal, reduzindo a absorção de ambos em até 66%.",
  "efeito":"Falha terapêutica da penicilamina (DMARD ou quelante de Wilson) e menor absorção do ferro.",
  "conduta":"⚠️ Separar a administração por pelo menos 2 horas. Tomar a penicilamina em jejum (1h antes das refeições) e o ferro separado."
},
{
  "med1":["penicilamina","cupripen","trolovol","d-penicilamina"],
  "med2":["antiácido","hidróxido de alumínio","hidróxido de magnésio","maalox"],
  "nivel":"moderado",
  "titulo":"Penicilamina + Antiácido (Quelação — Absorção Reduzida)",
  "mecanismo":"Ions metálicos (Al³⁺, Mg²⁺) dos antiácidos quelam a penicilamina, reduzindo sua absorção oral.",
  "efeito":"Redução dos níveis plasmáticos de penicilamina com comprometimento do efeito terapêutico.",
  "conduta":"⚠️ Separar administração por pelo menos 2 horas."
},
{
  "med1":["penicilamina","cupripen","trolovol","d-penicilamina"],
  "med2":["imunossupressor","metotrexato","azatioprina","ciclofosfamida"],
  "nivel":"moderado",
  "titulo":"Penicilamina + Imunossupressor (Mielossupressão e Nefrotoxicidade Aditivas)",
  "mecanismo":"A penicilamina causa mielossupressão e nefrotoxicidade independentemente. Em combinação com outros imunossupressores, o risco é potencializado.",
  "efeito":"Mielossupressão grave (neutropenia, trombocitopenia) e nefrotoxicidade aditiva.",
  "conduta":"⚠️ Evitar combinação quando possível. Se necessária, monitorar hemograma e urinálise (proteinúria) rigorosamente."
},

// ══════════════════════════════════════════════════════════════════════════════
// BAZEDOXIFENO
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["bazedoxifeno","viviant","conbriza","duavive"],
  "med2":["colestiramina","questran","colestipol"],
  "nivel":"moderado",
  "titulo":"Bazedoxifeno + Colestiramina (Absorção Reduzida em até 60%)",
  "mecanismo":"A colestiramina interrompe a circulação entero-hepática do bazedoxifeno, reduzindo sua biodisponibilidade de forma semelhante ao raloxifeno.",
  "efeito":"Redução marcante dos níveis plasmáticos de bazedoxifeno, comprometendo a eficácia na prevenção de fraturas.",
  "conduta":"⚠️ Não administrar colestiramina e bazedoxifeno simultaneamente. Separar por pelo menos 4 horas ou usar alternativa para hipercolesterolemia (estatina, ezetimiba)."
},
{
  "med1":["bazedoxifeno","viviant","conbriza","duavive"],
  "med2":["anticoagulante","warfarina","varfarina","heparina"],
  "nivel":"moderado",
  "titulo":"Bazedoxifeno + Anticoagulante (Risco de TVP — Efeitos Opostos)",
  "mecanismo":"O bazedoxifeno, como todo SERM, aumenta o risco de tromboembolismo venoso (TVP, EP). O anticoagulante é frequentemente prescrito preventivamente, mas a combinação exige atenção ao ajuste.",
  "efeito":"O bazedoxifeno aumenta o risco trombótico — em pacientes anticoagulados, a decisão de usar bazedoxifeno deve ser cuidadosamente avaliada. Se o anticoagulante for warfarina, monitorar INR.",
  "conduta":"⚠️ Em pacientes com histórico de TVP, o bazedoxifeno é contraindicado. Em pacientes anticoagulados por outra razão, avaliar risco-benefício com o especialista."
},
{
  "med1":["bazedoxifeno","viviant","conbriza","duavive"],
  "med2":["estrogênio","estradiol","estrogênios conjugados","premarin"],
  "nivel":"moderado",
  "titulo":"Bazedoxifeno + Estrogênio (Combinação Terapêutica — Duavive)",
  "mecanismo":"A combinação é intencional no Duavive: o bazedoxifeno antagoniza os receptores de estrogênio no endométrio (proteção endometrial), enquanto o estrogênio alivia os fogachos. O bazedoxifeno elimina a necessidade de progestagênio.",
  "efeito":"Combinação terapêutica validada para menopausa sintomática. Fora dessa formulação, estrogênios e SERMs geralmente se antagonizam.",
  "conduta":"✅ Combinação intencional apenas no Duavive (formulação fixa). Não combinar bazedoxifeno com estrogênios separados fora desse esquema — podem se antagonizar."
},

// ══════════════════════════════════════════════════════════════════════════════
// ZOLEDRONATO
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["zoledronato","aclasta","zometa","ácido zoledrônico","zoledronico"],
  "med2":["aminoglicosídeo","gentamicina","amicacina","tobramicina"],
  "nivel":"alto",
  "titulo":"Zoledronato + Aminoglicosídeo (Hipocalcemia Grave Sinérgica)",
  "mecanismo":"Aminoglicosídeos reduzem os níveis séricos de cálcio e magnésio por mecanismo renal. O zoledronato já causa hipocalcemia ao inibir a reabsorção óssea. A combinação pode levar a hipocalcemia grave.",
  "efeito":"Hipocalcemia grave com câimbras tetânicas, parestesias, arritmias cardíacas e convulsões.",
  "conduta":"⚠️ Monitorar cálcio e magnésio séricos rigorosamente. Suplementar cálcio e vitamina D antes da infusão de zoledronato e durante o curso de aminoglicosídeos."
},
{
  "med1":["zoledronato","aclasta","zometa","ácido zoledrônico","zoledronico"],
  "med2":["anti-inflamatório","aine","ibuprofeno","diclofenaco","naproxeno","cetoprofeno"],
  "nivel":"moderado",
  "titulo":"Zoledronato + AINE (Nefrotoxicidade Aditiva)",
  "mecanismo":"O zoledronato é potencialmente nefrotóxico (especialmente em infusão rápida ou em pacientes com hidratação insuficiente). AINEs reduzem a perfusão renal via inibição das prostaglandinas vasodilatadoras. A combinação eleva o risco de lesão renal aguda.",
  "efeito":"Insuficiência renal aguda — especialmente em idosos, diabéticos ou pacientes com função renal prévia limítrofe.",
  "conduta":"⚠️ Hidratação adequada obrigatória antes e após a infusão. Evitar AINEs no dia da infusão e nas 48h seguintes. Monitorar creatinina antes da infusão."
},
{
  "med1":["zoledronato","aclasta","zometa","ácido zoledrônico","zoledronico"],
  "med2":["denosumabe","prolia","xgeva"],
  "nivel":"moderado",
  "titulo":"Zoledronato + Denosumabe (Hipocalcemia Grave — Dupla Antirreabsortiva)",
  "mecanismo":"Ambos suprimem a atividade osteoclástica por mecanismos distintos. A combinação — raramente indicada — pode causar hipocalcemia grave por supressão dupla da liberação óssea de cálcio.",
  "efeito":"Hipocalcemia grave com risco de tetania, arritmias e parada cardíaca.",
  "conduta":"⚠️ Não combinar em rotina. Na transição entre os dois (por falha ou efeito adverso de um), aguardar o intervalo adequado e monitorar cálcio intensivamente."
},
{
  "med1":["zoledronato","aclasta","zometa","ácido zoledrônico","zoledronico"],
  "med2":["talidomida","lenalidomida","pomalidomida"],
  "nivel":"moderado",
  "titulo":"Zoledronato + Talidomida / Lenalidomida (Risco de Osteonecrose Mandibular no Mieloma)",
  "mecanismo":"No mieloma múltiplo, o Zometa (dose oncológica) combinado com talidomida ou lenalidomida aumenta o risco de osteonecrose da mandíbula em comparação ao Zometa isolado.",
  "efeito":"Osteonecrose da mandíbula com risco de exposição óssea, dor intensa, infecção secundária e perda dentária.",
  "conduta":"⚠️ Avaliação odontológica obrigatória antes de iniciar e durante o tratamento do mieloma. Higiene oral rigorosa. Evitar extrações e implantes durante o tratamento."
},

// ══════════════════════════════════════════════════════════════════════════════
// CALCITONINA
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["calcitonina","miacalcin","calcimar","calcitonina salmão"],
  "med2":["lítio","carbonato de lítio","lítio carbonato"],
  "nivel":"moderado",
  "titulo":"Calcitonina + Lítio (Redução dos Níveis de Lítio)",
  "mecanismo":"A calcitonina pode aumentar a excreção renal de lítio, reduzindo seus níveis plasmáticos. Mecanismo relacionado às alterações da homeostase do cálcio e sódio renais que afetam o transporte de lítio.",
  "efeito":"Redução dos níveis de lítio — perda do efeito estabilizador do humor em pacientes com transtorno bipolar.",
  "conduta":"⚠️ Monitorar lítio sérico ao iniciar ou suspender a calcitonina. Ajustar dose de lítio se necessário."
},
{
  "med1":["calcitonina","miacalcin","calcimar","calcitonina salmão"],
  "med2":["bisfosfonato","alendronato","risedronato","zoledronato"],
  "nivel":"moderado",
  "titulo":"Calcitonina + Bisfosfonato (Hipocalcemia Aditiva)",
  "mecanismo":"Ambos reduzem a reabsorção óssea e, consequentemente, a mobilização de cálcio do osso. A combinação pode resultar em hipocalcemia mais pronunciada.",
  "efeito":"Hipocalcemia — câimbras, parestesias, tetania em casos graves.",
  "conduta":"⚠️ A combinação raramente é indicada. Suplementar cálcio e vitamina D. Monitorar cálcio sérico."
},

// ══════════════════════════════════════════════════════════════════════════════
// ALFACALCIDOL
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["alfacalcidol","one-alpha","1-alfa-calcidol","etalpha"],
  "med2":["digoxina","lanoxin"],
  "nivel":"moderado",
  "titulo":"Alfacalcidol + Digoxina (Hipercalcemia Potencializa Toxicidade Digitálica)",
  "mecanismo":"A hipercalcemia induzida pelo alfacalcidol em excesso potencializa a toxicidade da digoxina — cálcio elevado e digoxina têm efeitos aditivos sobre a excitabilidade cardíaca e a condução.",
  "efeito":"Arritmias por toxicidade digitálica: bradicardia, bloqueios, extrassístoles — desencadeadas pela hipercalcemia.",
  "conduta":"⚠️ Monitorar cálcio sérico regularmente. Manter cálcio no limite inferior do normal. Monitorar ECG em pacientes com digoxina."
},
{
  "med1":["alfacalcidol","one-alpha","1-alfa-calcidol","etalpha"],
  "med2":["hidróxido de alumínio","antiácido com alumínio","sucralfato"],
  "nivel":"moderado",
  "titulo":"Alfacalcidol + Antiácido com Alumínio (Hipermagnesemia / Hipercalcemia por Alumínio)",
  "mecanismo":"O alfacalcidol aumenta a absorção intestinal de alumínio quando há antiácido com alumínio na dieta. Em insuficiência renal (principal indicação do alfacalcidol), o alumínio não é eliminado adequadamente, podendo acumular.",
  "efeito":"Toxicidade por alumínio em pacientes renais: osteodistrofia aluminosa (paradoxalmente piora a doença óssea), encefalopatia aluminosa e anemia microcítica.",
  "conduta":"❌ Evitar antiácidos contendo alumínio em pacientes renais usando alfacalcidol. Substituir por antiácidos de cálcio (carbonato de cálcio) ou IBP."
},
{
  "med1":["alfacalcidol","one-alpha","1-alfa-calcidol","etalpha"],
  "med2":["hidroclorotiazida","clortalidona","indapamida","diurético tiazídico"],
  "nivel":"moderado",
  "titulo":"Alfacalcidol + Diurético Tiazídico (Hipercalcemia Aditiva)",
  "mecanismo":"Diuréticos tiazídicos reduzem a excreção renal de cálcio (efeito hipocalciúrico). O alfacalcidol aumenta a absorção intestinal de cálcio. A combinação eleva o cálcio sérico de forma aditiva.",
  "efeito":"Hipercalcemia — fraqueza, náusea, confusão, poliúria, arritmias.",
  "conduta":"⚠️ Monitorar cálcio sérico com maior frequência. Pode ser necessário reduzir a dose de alfacalcidol ou do tiazídico."
},
{
  "med1":["alfacalcidol","one-alpha","1-alfa-calcidol","etalpha"],
  "med2":["fenitoína","epelin","carbamazepina","tegretol","fenobarbital","rifampicina"],
  "nivel":"moderado",
  "titulo":"Alfacalcidol + Indutor Enzimático (Redução da Atividade da Vitamina D Ativa)",
  "mecanismo":"Indutores de CYP3A4 (fenitoína, carbamazepina, fenobarbital, rifampicina) aumentam o catabolismo do alfacalcidol e de seus metabólitos ativos, reduzindo sua eficácia.",
  "efeito":"Hipovitaminose D funcional com risco de hipocalcemia, osteomalácia e agravamento da osteodistrofia renal.",
  "conduta":"⚠️ Pode ser necessário aumentar a dose de alfacalcidol em pacientes usando antiepilépticos indutores cronicamente. Monitorar cálcio sérico e PTH."
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

if (!paraInserir.length) { console.log('Nenhuma nova interação.'); process.exit(0); }

const bloco = '\nmcInteracoesDB = mcInteracoesDB.concat(' + JSON.stringify(paraInserir, null, 2) + ');\n';
const novo = raw.slice(0, idx) + bloco + raw.slice(idx);
fs.writeFileSync(INT_PATH, novo, 'utf-8');

console.log(`✓ ${paraInserir.length} interações inseridas:`);
paraInserir.forEach(n => console.log('  +', n.titulo));
