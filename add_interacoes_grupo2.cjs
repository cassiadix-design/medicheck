// Interações para Semaglutida, Rituximabe, Tocilizumabe e Tacrolimo sistêmico
const fs   = require('fs');
const path = require('path');
const INT_PATH = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');
const MARKER   = '\nvar mcIECAnomes';

const novas = [

// ══════════════════════════════════════════════════════════════════════════════
// SEMAGLUTIDA INJETÁVEL (OZEMPIC / WEGOVY) — complemento aos 9 já existentes
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["semaglutida","ozempic","wegovy","semaglutida injetável","agonista glp-1","glp-1"],
  "med2":["contraceptivo oral","pílula anticoncepcional","anticoncepcional oral","etinilestradiol","levonorgestrel"],
  "nivel":"moderado",
  "titulo":"Semaglutida + Contraceptivo Oral (Absorção Reduzida — Falha Contraceptiva)",
  "mecanismo":"A semaglutida retarda o esvaziamento gástrico de forma pronunciada, reduzindo a velocidade de absorção de medicamentos orais. Contraceptivos orais com janela de absorção sensível podem ter biodisponibilidade reduzida, especialmente nas primeiras semanas de tratamento (quando o efeito no esvaziamento gástrico é mais intenso).",
  "efeito":"Possível redução na eficácia do contraceptivo oral — especialmente nas primeiras 4–8 semanas de tratamento com semaglutida ou após aumento de dose, quando o esvaziamento gástrico está mais lentificado.",
  "conduta":"⚠️ Usar método contraceptivo adicional (preservativo) nas primeiras 4 semanas de tratamento com semaglutida e nas 4 semanas após cada aumento de dose. Após estabilização da dose, o risco diminui. Pacientes que desejam engravidar devem ser orientadas separadamente — suspender semaglutida pelo menos 2 meses antes de tentar gestação."
},
{
  "med1":["semaglutida","ozempic","wegovy","semaglutida injetável","glp-1"],
  "med2":["álcool","alcool","etanol","bebida alcoólica"],
  "nivel":"moderado",
  "titulo":"Semaglutida + Álcool (Hipoglicemia e Náusea Exacerbada)",
  "mecanismo":"O álcool inibe a gliconeogênese hepática e potencializa a redução glicêmica promovida pela semaglutida. Além disso, ambos causam retardo do esvaziamento gástrico — efeito aditivo na motilidade digestiva.",
  "efeito":"Risco de hipoglicemia (especialmente em jejum ou combinada com insulina/sulfonilureia). Exacerbação de náusea, vômitos e desconforto gastrointestinal — efeitos colaterais já comuns da semaglutida tornam-se mais intensos com álcool.",
  "conduta":"⚠️ Evitar consumo de álcool, especialmente em jejum. Se consumido, fazê-lo com alimento e monitorar glicemia. O risco é maior nas primeiras semanas de tratamento, quando os efeitos GI são mais intensos."
},
{
  "med1":["semaglutida","ozempic","wegovy","semaglutida injetável","glp-1"],
  "med2":["orlistate","xenical"],
  "nivel":"moderado",
  "titulo":"Semaglutida + Orlistate (Efeitos Gastrointestinais Aditivos)",
  "mecanismo":"Ambos os medicamentos causam efeitos gastrointestinais significativos. A semaglutida retarda o esvaziamento gástrico e reduz a absorção de gordura ao diminuir a secreção pancreática; o orlistate inibe lipases intestinais. A combinação potencializa efeitos GI adversos.",
  "efeito":"Náusea grave, diarreia intensa, fezes oleosas, incontinência fecal e cólicas — comprometendo a adesão ao tratamento e a qualidade de vida.",
  "conduta":"⚠️ Combinação raramente indicada. Se prescrita, iniciar com doses baixas de ambos. Orientar o paciente sobre a piora esperada dos efeitos GI. Hidratação adequada para evitar desidratação por diarreia."
},

// ══════════════════════════════════════════════════════════════════════════════
// RITUXIMABE
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["rituximabe","mabthera","mabtera","rituximab"],
  "med2":["vacina bcg","vacina febre amarela","vacina sarampo","vacina varicela","vacina rotavirus","vacina viva","vacina de virus vivo"],
  "nivel":"alto",
  "titulo":"Rituximabe + Vacina de Vírus Vivo (Infecção Disseminada — Contraindicado)",
  "mecanismo":"O rituximabe depleta os linfócitos B, eliminando a capacidade de resposta imune humoral por 6–9 meses após a última infusão. Vacinas de vírus vivo (BCG, febre amarela, sarampo, varicela) podem causar infecção sistêmica disseminada pelo agente vacinal em pacientes com imunidade comprometida.",
  "efeito":"Infecção disseminada pelo agente vacinal — potencialmente fatal. BCG disseminada, sarampo vacinal progressivo, encefalite por varicela. Casos fatais documentados em imunossuprimidos.",
  "conduta":"❌ Contraindicado. Todas as vacinas de vírus vivo devem ser aplicadas pelo menos 4 semanas ANTES do início do rituximabe, e são contraindicadas durante o tratamento e por pelo menos 12 meses após. Vacinas inativadas (influenza, pneumococo) podem ser aplicadas, mas a resposta imune é diminuída."
},
{
  "med1":["rituximabe","mabthera","mabtera","rituximab"],
  "med2":["natalizumabe","tysabri"],
  "nivel":"alto",
  "titulo":"Rituximabe + Natalizumabe (LMP — Leucoencefalopatia Multifocal Progressiva Fatal)",
  "mecanismo":"Ambos causam imunodeficiência profunda de mecanismos distintos. O natalizumabe bloqueia o tráfico de linfócitos para o SNC; o rituximabe depleta linfócitos B. A combinação multiplica o risco de leucoencefalopatia multifocal progressiva (LMP) por infecção pelo vírus JC no SNC.",
  "efeito":"LMP — infecção oportunista cerebral por vírus JC com mortalidade de 50% e sequelas neurológicas graves nos sobreviventes.",
  "conduta":"❌ Contraindicada a combinação. Respeitar período de washout adequado (mínimo 12 semanas após a última dose de natalizumabe) antes de iniciar rituximabe. Monitorar anticorpos anti-JC."
},
{
  "med1":["rituximabe","mabthera","mabtera","rituximab"],
  "med2":["ciclosporina","ciclosporine","sandimmun","tacrolimo","prograf","micofenolato","cellcept","azatioprina","imuran","imunossupressor"],
  "nivel":"alto",
  "titulo":"Rituximabe + Imunossupressor Sistêmico (Imunossupressão Grave — Infecções Fatais)",
  "mecanismo":"Rituximabe deprime intensamente a imunidade humoral (linfócitos B). A combinação com outros imunossupressores potentes (inibidores de calcineurina, antimetabólitos) resulta em imunossupressão profunda e prolongada.",
  "efeito":"Risco muito aumentado de infecções oportunistas graves: pneumocistose, CMV disseminado, aspergilose invasiva, reativação de tuberculose e vírus JC (LMP). Hipogamaglobulinemia severa com risco de infecções recorrentes.",
  "conduta":"⚠️ Usar apenas em protocolos específicos (transplante, oncologia). Monitorar hemograma, níveis de imunoglobulinas e sinais de infecção periodicamente. Profilaxia contra Pneumocystis jirovecii (cotrimoxazol) frequentemente indicada."
},
{
  "med1":["rituximabe","mabthera","mabtera","rituximab"],
  "med2":["leflunomida","arava"],
  "nivel":"moderado",
  "titulo":"Rituximabe + Leflunomida (Imunossupressão Aditiva — Risco de Infecção)",
  "mecanismo":"A leflunomida inibe a síntese de pirimidinas em linfócitos T ativos. Combinada ao rituximabe (que depleta linfócitos B), a imunossupressão resulta de mecanismos complementares — T e B simultaneamente comprometidos.",
  "efeito":"Risco aumentado de infecções graves, especialmente infecções respiratórias, oportunistas e reativação de tuberculose. Hepatotoxicidade aditiva.",
  "conduta":"⚠️ Uso possível em artrite reumatoide refratária sob monitoração rigorosa. Hepatotoxicidade combinada é preocupação adicional — monitorar transaminases mensalmente. Rastrear tuberculose latente antes de iniciar a combinação."
},
{
  "med1":["rituximabe","mabthera","mabtera","rituximab"],
  "med2":["antineoplásico","quimioterapia","ciclofosfamida","doxorrubicina","vincristina","clorambucila"],
  "nivel":"moderado",
  "titulo":"Rituximabe + Quimioterapia (Mielossupressão Aditiva — Monitoração Intensiva)",
  "mecanismo":"Rituximabe potencializa a mielossupressão induzida por agentes alquilantes (ciclofosfamida) e outros quimioterápicos. Esquema R-CHOP (rituximabe + ciclofosfamida + doxorrubicina + vincristina + prednisona) é padrão no DLBCL — porém a combinação exige monitoração hematológica intensa.",
  "efeito":"Neutropenia profunda e prolongada com risco de infecções bacterianas e fúngicas graves. Anemia e trombocitopenia. Risco de febre neutropênica — emergência oncológica.",
  "conduta":"⚠️ Monitorar hemograma completo antes de cada ciclo. Suporte com G-CSF (filgrastim) quando indicado. Em caso de febre com neutropenia (<500 neutrófilos/mm³): hospitalização e antibioticoterapia empírica imediata."
},

// ══════════════════════════════════════════════════════════════════════════════
// TOCILIZUMABE
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["tocilizumabe","actemra","tocilizumab","anti-il-6"],
  "med2":["vacina bcg","vacina febre amarela","vacina sarampo","vacina varicela","vacina rotavirus","vacina viva","vacina de virus vivo"],
  "nivel":"alto",
  "titulo":"Tocilizumabe + Vacina de Vírus Vivo (Infecção Disseminada — Contraindicado)",
  "mecanismo":"O tocilizumabe compromete a imunidade ao bloquear IL-6, citocina essencial na resposta imune adaptativa. Vacinas de vírus vivo podem causar infecção disseminada pelo agente vacinal em pacientes imunossuprimidos.",
  "efeito":"Infecção disseminada pelo agente vacinal — febre amarela disseminada, sarampo vacinal progressivo, meningite por varicela — potencialmente fatais.",
  "conduta":"❌ Contraindicado. Vacinas de vírus vivo devem ser aplicadas pelo menos 4 semanas antes do início do tocilizumabe. Vacinas inativadas são permitidas, mas a resposta imune está reduzida. Não vacinar durante o tratamento ativo."
},
{
  "med1":["tocilizumabe","actemra","tocilizumab","anti-il-6"],
  "med2":["warfarina","varfarina","coumadin"],
  "nivel":"moderado",
  "titulo":"Tocilizumabe + Warfarina (Instabilidade do INR por Normalização do CYP)",
  "mecanismo":"A IL-6 suprime a expressão de enzimas CYP450 (especialmente CYP1A2, CYP3A4 e CYP2C9). Em doenças inflamatórias ativas, os níveis dessas enzimas são reduzidos — elevando os níveis de warfarina. Ao bloquear a IL-6, o tocilizumabe restaura a atividade do CYP, aumentando o metabolismo da warfarina e reduzindo o INR.",
  "efeito":"Queda do INR — efeito anticoagulante insuficiente com risco trombótico (TVP, AVC, embolia pulmonar). O efeito é mais pronunciado ao iniciar o tocilizumabe ou após resolução de inflamação intensa.",
  "conduta":"⚠️ Monitorar o INR com frequência aumentada ao iniciar, ajustar ou suspender o tocilizumabe. O mesmo princípio se aplica ao baricitinibe e outros inibidores de JAK. Ajustar dose de warfarina conforme necessário."
},
{
  "med1":["tocilizumabe","actemra","tocilizumab","anti-il-6"],
  "med2":["sinvastatina","atorvastatina","lovastatina","rosuvastatina","estatina"],
  "nivel":"moderado",
  "titulo":"Tocilizumabe + Estatina (Aumento dos Níveis de Estatina por Normalização do CYP3A4)",
  "mecanismo":"IL-6 suprime CYP3A4 em estados inflamatórios. Ao iniciar tocilizumabe e reduzir a inflamação, a atividade do CYP3A4 é restaurada — porém em pacientes com inflamação muito intensa, o efeito inverso pode ocorrer: a normalização do CYP pode elevar os níveis de estatinas metabolizadas pelo CYP3A4 (sinvastatina, atorvastatina).",
  "efeito":"Potencial elevação dos níveis de estatina com aumento do risco de miopatia e elevação de CPK. Clinicamente relevante especialmente com sinvastatina em doses altas.",
  "conduta":"⚠️ Monitorar CPK e sintomas musculares ao iniciar tocilizumabe em pacientes usando estatinas. Preferir rosuvastatina ou pravastatina (metabolismo CYP independente) em pacientes de alto risco."
},
{
  "med1":["tocilizumabe","actemra","tocilizumab","anti-il-6"],
  "med2":["abatacepte","belimumabe","natalizumabe","anti-tnf","adalimumabe","etanercepte","certolizumabe","golimumabe","infliximabe"],
  "nivel":"alto",
  "titulo":"Tocilizumabe + Outro Biológico Imunossupressor (Imunossupressão Excessiva)",
  "mecanismo":"A combinação de dois imunobiológicos de mecanismos distintos resulta em imunossupressão sinérgica e imprevisível. As diretrizes internacionais de artrite reumatoide contraindicam a combinação de biológicos.",
  "efeito":"Risco muito aumentado de infecções graves, oportunistas e fatais. Mielossupressão, reativação de tuberculose, sepse fúngica.",
  "conduta":"❌ Contraindicada a combinação de dois biológicos imunossupressores. Usar tocilizumabe em combinação com DMARDs convencionais (metotrexato, leflunomida), não com outros biológicos."
},
{
  "med1":["tocilizumabe","actemra","tocilizumab","anti-il-6"],
  "med2":["metotrexato","mtx","ledertrexato"],
  "nivel":"moderado",
  "titulo":"Tocilizumabe + Metotrexato (Hepatotoxicidade Aditiva — Monitoração Obrigatória)",
  "mecanismo":"Combinação padrão no tratamento de AR moderada a grave (TCZ + MTX). O metotrexato pode causar hepatotoxicidade e mielossupressão; o tocilizumabe pode elevar transaminases de forma independente. A combinação potencializa o risco hepático.",
  "efeito":"Elevação de transaminases (ALT/AST), hepatotoxicidade — geralmente reversível com ajuste de dose. Neutropenia aditiva em doses altas de MTX.",
  "conduta":"⚠️ Monitorar hemograma completo e função hepática (transaminases) a cada 4–8 semanas. Se ALT >3× o limite superior normal, suspender temporariamente o metotrexato. Suplementação com ácido fólico (5–10mg/semana) para reduzir toxicidade do MTX."
},
{
  "med1":["tocilizumabe","actemra","tocilizumab","anti-il-6"],
  "med2":["tofacitinibe","baricitinibe","upadacitinibe","inibidor jak","jak1","jak2"],
  "nivel":"alto",
  "titulo":"Tocilizumabe + Inibidor de JAK (Imunossupressão Excessiva — Contraindicado)",
  "mecanismo":"Tocilizumabe (anti-IL-6) e inibidores de JAK (que bloqueiam vias de sinalização de múltiplas citocinas, incluindo IL-6) têm efeitos imunomoduladores sobrepostos e complementares. A combinação não agrega benefício clínico mas multiplica os riscos.",
  "efeito":"Imunossupressão grave com risco aumentado de infecções oportunistas, tromboembolismo venoso (associado a inibidores de JAK) e malignidades.",
  "conduta":"❌ Contraindicada a combinação. Usar tocilizumabe OU inibidor de JAK, nunca ambos simultaneamente."
},

// ══════════════════════════════════════════════════════════════════════════════
// TACROLIMO SISTÊMICO — complemento aos 13 já existentes
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["tacrolimo","tacrolimus","prograf","advagraf","fk506"],
  "med2":["vacina bcg","vacina febre amarela","vacina sarampo","vacina varicela","vacina viva","vacina de virus vivo"],
  "nivel":"alto",
  "titulo":"Tacrolimo + Vacina de Vírus Vivo (Infecção Disseminada — Contraindicado)",
  "mecanismo":"O tacrolimo é potente imunossupressor que inibe a calcineurina e a ativação de linfócitos T. Em pacientes imunossuprimidos, vacinas de vírus vivo podem causar infecção sistêmica disseminada pelo agente vacinal.",
  "efeito":"BCG disseminada, febre amarela vacinal, varicela disseminada — potencialmente fatais em imunossuprimidos.",
  "conduta":"❌ Contraindicado durante o tratamento com tacrolimo. Atualizar o calendário vacinal antes do transplante. Após transplante, usar apenas vacinas inativadas (influenza, pneumococo, hepatite B). Discutir calendário com a equipe de transplante."
},
{
  "med1":["tacrolimo","tacrolimus","prograf","advagraf","fk506"],
  "med2":["enalapril","captopril","lisinopril","ramipril","losartana","valsartana","irbesartana","ieca","sartana","ara ii"],
  "nivel":"moderado",
  "titulo":"Tacrolimo + IECA / Sartana (Hipercalemia Grave)",
  "mecanismo":"O tacrolimo causa hipercalemia por redução da excreção renal de potássio (inibe a aldosterona e reduz a expressão de canais de potássio tubulares) e por nefrotoxicidade. IECA e sartanas bloqueiam a aldosterona — mecanismo aditivo de retenção de potássio.",
  "efeito":"Hipercalemia grave — risco de arritmias cardíacas fatais (fibrilação ventricular, bloqueio cardíaco), fraqueza muscular e parada cardíaca.",
  "conduta":"⚠️ Monitorar potássio sérico e função renal com frequência aumentada. Restringir ingestão de potássio na dieta. Ajustar doses de ambos os medicamentos. Evitar uso concomitante de outros agentes poupadores de potássio (espironolactona, amilorida)."
},
{
  "med1":["tacrolimo","tacrolimus","prograf","advagraf","fk506"],
  "med2":["espironolactona","amilorida","triantereno","diurético poupador de potássio"],
  "nivel":"moderado",
  "titulo":"Tacrolimo + Diurético Poupador de Potássio (Hipercalemia)",
  "mecanismo":"Efeito aditivo de retenção de potássio: tacrolimo reduz a excreção renal de K⁺ e diuréticos poupadores de potássio bloqueiam sua excreção tubular distal.",
  "efeito":"Hipercalemia — risco de arritmias cardíacas potencialmente fatais.",
  "conduta":"⚠️ Evitar combinação quando possível. Monitorar K⁺ sérico rigorosamente se uso simultâneo for necessário. Preferir furosemida ou hidroclorotiazida (perdem potássio) quando diurético for necessário no pós-transplante."
},
{
  "med1":["tacrolimo","tacrolimus","prograf","advagraf","fk506"],
  "med2":["sinvastatina","atorvastatina","lovastatina","rosuvastatina","pravastatina","estatina"],
  "nivel":"moderado",
  "titulo":"Tacrolimo + Estatina (Miopatia e Nefrotoxicidade Aditivas)",
  "mecanismo":"O tacrolimo inibe CYP3A4, elevando os níveis de estatinas metabolizadas por essa via (sinvastatina, atorvastatina, lovastatina). Além disso, tacrolimo causa nefrotoxicidade que pode agravar a eliminação das estatinas e seus metabólitos. A combinação aumenta o risco de miopatia e rabdomiólise.",
  "efeito":"Miopatia — dor muscular, fraqueza, elevação de CPK. Em casos graves: rabdomiólise com mioglobinúria e insuficiência renal aguda, agravando a nefrotoxicidade do tacrolimo.",
  "conduta":"⚠️ Usar a menor dose eficaz de estatina. Preferir rosuvastatina (menor dependência de CYP3A4) ou pravastatina (sem metabolismo CYP3A4 significativo). Monitorar CPK e função renal periodicamente. Suspender a estatina se CPK >5× o limite superior normal."
},
{
  "med1":["tacrolimo","tacrolimus","prograf","advagraf","fk506"],
  "med2":["metoclopramida","plasil"],
  "nivel":"moderado",
  "titulo":"Tacrolimo + Metoclopramida (Elevação dos Níveis de Tacrolimo)",
  "mecanismo":"A metoclopramida acelera o esvaziamento gástrico, aumentando a velocidade de absorção do tacrolimo oral. Isso eleva o pico plasmático (Cmax) do tacrolimo, podendo resultar em níveis acima da janela terapêutica.",
  "efeito":"Elevação dos níveis de tacrolimo com risco de nefrotoxicidade aguda (oligúria, elevação de creatinina), neurotoxicidade (tremores, confusão) e outros efeitos tóxicos dose-dependentes.",
  "conduta":"⚠️ Monitorar os níveis séricos de tacrolimo (trough) ao iniciar ou suspender metoclopramida. Considerar domperidona como alternativa (interação menos documentada). Ajustar dose de tacrolimo conforme níveis séricos."
},
{
  "med1":["tacrolimo","tacrolimus","prograf","advagraf","fk506"],
  "med2":["sirolimo","rapamicina","rapamune","everolimo","certican"],
  "nivel":"alto",
  "titulo":"Tacrolimo + Sirolimo / Everolimo (Nefrotoxicidade Sinérgica)",
  "mecanismo":"Tacrolimo (inibidor de calcineurina) e sirolimo/everolimo (inibidores de mTOR) causam nefrotoxicidade por mecanismos distintos e sinérgicos. Estudos mostraram piora progressiva da função renal a longo prazo com a combinação.",
  "efeito":"Insuficiência renal crônica progressiva no enxerto e nos rins nativos. Proteinúria, hipertensão e nefrotoxicidade acelerada.",
  "conduta":"⚠️ Usar somente em protocolos específicos com justificativa clara. Preferir regimes poupadores de tacrolimo (redução de dose) quando associado a inibidores de mTOR. Monitorar função renal, proteinúria e níveis séricos de ambos intensivamente."
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
