// Interações para os 9 novos medicamentos do Grupo 2 lote 2
const fs   = require('fs');
const path = require('path');
const INT_PATH = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');
const MARKER   = '\nvar mcIECAnomes';

const novas = [

// ══════════════════════════════════════════════════════════════════════════════
// VARDENAFILA — complemento (nitratos/PDE5 já existe; faltam alfa-bloq e IMAO)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["vardenafila","levitra","staxyn"],
  "med2":["doxazosina","carduran","tansulosina","alfuzosina","silodosina","prasozina","alfabloqueador"],
  "nivel":"moderado",
  "titulo":"Vardenafila + Alfabloqueador (Hipotensão Postural Grave)",
  "mecanismo":"Ambos causam vasodilatação: inibidores da PDE-5 via GMPc e alfabloqueadores via bloqueio α1 adrenérgico. O efeito hipotensor é aditivo, especialmente na posição ortostática.",
  "efeito":"Hipotensão postural grave com tontura, síncope (desmaio) e risco de queda — especialmente em idosos. Risco maior na primeira tomada e ao se levantar rapidamente.",
  "conduta":"⚠️ Iniciar vardenafila na menor dose (5mg) em pacientes já usando alfabloqueadores. Respeitar intervalo de pelo menos 6 horas entre as tomadas. Orientar sobre mudanças posturais lentas. A combinação vardenafila + doxazosina é a de maior risco — monitorar com atenção."
},
{
  "med1":["vardenafila","levitra","staxyn"],
  "med2":["inibidor mao","imao","fenelzina","tranilcipromina","selegilina"],
  "nivel":"alto",
  "titulo":"Vardenafila + IMAO (Hipotensão Grave e Risco Cardiovascular)",
  "mecanismo":"IMAOs potencializam a vasodilatação e a resposta simpática mediada pelo NO. A combinação pode amplificar drasticamente o efeito hipotensor da vardenafila e causar instabilidade cardiovascular.",
  "efeito":"Hipotensão grave, taquicardia reflexa, risco de colapso cardiovascular.",
  "conduta":"⚠️ Evitar combinação. Respeitar 14 dias de washout após suspensão do IMAO antes de usar vardenafila."
},

// ══════════════════════════════════════════════════════════════════════════════
// ERGOTAMINA — complemento (triptanos e claritromicina já existem)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["ergotamina","cafertil","cafergot","tartarato de ergotamina","ergot"],
  "med2":["inibidor mao","imao","fenelzina","tranilcipromina","moclobemida"],
  "nivel":"alto",
  "titulo":"Ergotamina + IMAO (Crise Hipertensiva e Vasoespasmo Grave)",
  "mecanismo":"IMAOs potencializam a atividade vasoconstritora e simpaticomimética da ergotamina ao bloquear a metabolização de catecolaminas. Risco de crise hipertensiva e vasoespasmo periférico e coronariano grave.",
  "efeito":"Crise hipertensiva, vasoespasmo coronariano (angina, IAM), isquemia periférica grave.",
  "conduta":"❌ Contraindicado. Respeitar 14 dias de washout após suspensão do IMAO."
},
{
  "med1":["ergotamina","cafertil","cafergot","tartarato de ergotamina","ergot"],
  "med2":["itraconazol","cetoconazol","voriconazol","fluconazol","posaconazol"],
  "nivel":"alto",
  "titulo":"Ergotamina + Azol Antifúngico (Ergotismo Agudo — Contraindicado)",
  "mecanismo":"Azóis inibem potentemente o CYP3A4, principal via de metabolismo da ergotamina. O acúmulo resulta em níveis tóxicos com vasoconstrição intensa e prolongada — ergotismo.",
  "efeito":"Ergotismo: vasoespasmo grave de extremidades com isquemia e risco de gangrena, vasoespasmo coronariano com IAM, dor intensa em membros.",
  "conduta":"❌ Contraindicado. Substituir o antifúngico (usar fluconazol apenas para candidíase vaginal simples — menor inibição CYP3A4) ou suspender a ergotamina durante o tratamento antifúngico."
},
{
  "med1":["ergotamina","cafertil","cafergot","tartarato de ergotamina","ergot"],
  "med2":["betabloqueador","propranolol","atenolol","metoprolol","nadolol"],
  "nivel":"moderado",
  "titulo":"Ergotamina + Betabloqueador (Vasoconstrição Periférica Aditiva)",
  "mecanismo":"Betabloqueadores bloqueiam a vasodilatação mediada por receptores β2 periféricos. Combinados com a vasoconstrição alfa da ergotamina, o resultado é vasoconstrição periférica pronunciada sem mecanismo vasodilatador compensatório.",
  "efeito":"Isquemia periférica: dedos e extremidades frias, cianose, dor isquêmica — especialmente em pacientes com doença vascular periférica prévia.",
  "conduta":"⚠️ Usar com cautela. Monitorar sinais de isquemia periférica. Evitar em pacientes com doença vascular periférica. Preferir triptanos para o tratamento agudo da enxaqueca em pacientes cardiologicamente comprometidos."
},

// ══════════════════════════════════════════════════════════════════════════════
// ETONOGESTREL — complemento (indutores enzimáticos já exist via progestágeno)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["etonogestrel","implanon","implante subdérmico","nexplanon"],
  "med2":["rifampicina","rifampin","fenitoína","epelin","carbamazepina","tegretol","fenobarbital","primidona","topiramato","oxcarbazepina"],
  "nivel":"alto",
  "titulo":"Etonogestrel (Implanon) + Indutor Enzimático (Falha Contraceptiva)",
  "mecanismo":"Rifampicina, antiepilépticos indutores (fenitoína, carbamazepina, fenobarbital) e outros indutores do CYP3A4 aumentam o metabolismo do etonogestrel, reduzindo seus níveis plasmáticos a valores subterapêuticos.",
  "efeito":"Falha contraceptiva — gravidez não planejada durante uso do implante, especialmente com rifampicina (indutora mais potente) e antiepilépticos de longa data.",
  "conduta":"⚠️ Em uso crônico de indutores enzimáticos, o implante de etonogestrel pode não ser confiável. Discutir método contraceptivo alternativo não hormonal (DIU de cobre) ou progestágeno em dose mais alta. A associação com barreira (preservativo) é recomendada."
},
{
  "med1":["etonogestrel","implanon","implante subdérmico","nexplanon"],
  "med2":["lamotrigina","lamictal"],
  "nivel":"moderado",
  "titulo":"Etonogestrel (Implanon) + Lamotrigina (Redução dos Níveis de Lamotrigina)",
  "mecanismo":"Progestágenos podem reduzir os níveis plasmáticos de lamotrigina por mecanismo não completamente elucidado (possível indução da glucuronidação). A redução pode comprometer o controle das crises epilépticas.",
  "efeito":"Piora do controle das crises epilépticas — aumento da frequência ou intensidade das crises em pacientes usando lamotrigina para epilepsia.",
  "conduta":"⚠️ Monitorar o controle clínico das crises ao iniciar o implante. Pode ser necessário ajuste da dose de lamotrigina. Avaliar com o neurologista."
},

// ══════════════════════════════════════════════════════════════════════════════
// MICOFENOLATO — complemento (ganciclovir já existe)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["micofenolato","cellcept","myfortic","mofetila de micofenolato","micofenolato sódico","mmf"],
  "med2":["rifampicina","rifampin"],
  "nivel":"alto",
  "titulo":"Micofenolato + Rifampicina (Queda Drástica dos Níveis — Risco de Rejeição)",
  "mecanismo":"A rifampicina induz potentemente a glucuronidação intestinal e hepática do ácido micofenólico (metabólito ativo), além de induzir transportadores intestinais. Isso pode reduzir os níveis do micofenolato em até 70%.",
  "efeito":"Imunossupressão insuficiente com risco grave de rejeição aguda do enxerto — potencialmente levando à perda do órgão transplantado.",
  "conduta":"❌ Evitar rifampicina em transplantados usando micofenolato. Se antibiótico antimicobacteriano for necessário, considerar rifabutina (menor interação) ou outras alternativas. Monitorar rigorosamente os níveis de micofenolato e função do enxerto se a combinação for inevitável."
},
{
  "med1":["micofenolato","cellcept","myfortic","mofetila de micofenolato","micofenolato sódico","mmf"],
  "med2":["colestiramina","colestipol","questran"],
  "nivel":"moderado",
  "titulo":"Micofenolato + Colestiramina (Interrupção da Circulação Entero-Hepática)",
  "mecanismo":"A colestiramina interrompe a circulação entero-hepática do ácido micofenólico ao ligar-se a ele no intestino, impedindo sua reabsorção. Isso reduz significativamente a exposição total ao micofenolato.",
  "efeito":"Redução dos níveis de micofenolato com risco de imunossupressão insuficiente e rejeição do enxerto.",
  "conduta":"⚠️ Evitar colestiramina em transplantados usando micofenolato. Se hipercolesterolemia precisar ser tratada, usar estatina ou ezetimiba como alternativa. Se uso temporário de colestiramina for inevitável, administrar pelo menos 4 horas após o micofenolato."
},
{
  "med1":["micofenolato","cellcept","myfortic","mofetila de micofenolato","mmf"],
  "med2":["antiácido","hidróxido de alumínio","hidróxido de magnésio","maalox","mylanta"],
  "nivel":"moderado",
  "titulo":"Micofenolato + Antiácido (Absorção Reduzida)",
  "mecanismo":"Antiácidos contendo alumínio e magnésio reduzem a absorção oral do micofenolato ao elevar o pH gástrico e por quelação direta.",
  "efeito":"Redução dos níveis do micofenolato — pode comprometer a imunossupressão em transplantados.",
  "conduta":"⚠️ Não administrar antiácidos concomitantemente. Separar por pelo menos 2 horas. Preferir IBP (pantoprazol, omeprazol) para controle de acidez em transplantados, com atenção ao impacto no pH na formulação de liberação entérica (Myfortic)."
},
{
  "med1":["micofenolato","cellcept","myfortic","mofetila de micofenolato","mmf"],
  "med2":["azatioprina","imuran"],
  "nivel":"alto",
  "titulo":"Micofenolato + Azatioprina (Mielossupressão Grave — Contraindicado)",
  "mecanismo":"Ambos inibem a síntese de purinas por vias complementares: micofenolato inibe IMPDH; azatioprina é convertida a 6-mercaptopurina que inibe múltiplas enzimas da síntese de purinas. A combinação resulta em inibição profunda e sinérgica da proliferação linfocitária e de outras células mieloides.",
  "efeito":"Mielossupressão grave — pancitopenia, aplasia de medula óssea, risco de infecções oportunistas fatais.",
  "conduta":"❌ Contraindicada a associação. Os dois medicamentos não são usados simultaneamente em protocolos de transplante — são alternativas, não complementares."
},

// ══════════════════════════════════════════════════════════════════════════════
// DOXAZOSINA — complemento (verapamil já existe)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["doxazosina","carduran","aradois","cardura","alfabloqueador"],
  "med2":["sildenafila","viagra","tadalafila","cialis","vardenafila","levitra","avanafila","inibidor pde5","inibidor da pde-5"],
  "nivel":"moderado",
  "titulo":"Doxazosina + Inibidor da PDE-5 (Hipotensão Postural — Risco de Síncope)",
  "mecanismo":"Efeito hipotensor aditivo: doxazosina bloqueia receptores α1 (vasodilatação arteriolar); inibidores da PDE-5 causam vasodilatação via GMPc. A combinação potencializa a queda da pressão arterial, especialmente na posição ortostática.",
  "efeito":"Hipotensão postural com tontura, lipotimia e síncope — risco de quedas e trauma, especialmente em homens idosos com HPB usando doxazosina para sintomas urinários.",
  "conduta":"⚠️ Usar a menor dose inicial de inibidor da PDE-5 (sildenafila 25mg, tadalafila 5mg) em pacientes com doxazosina. Orientar sobre levantadas lentas e gradativas. A tansulosina tem menos hipotensão sistêmica que a doxazosina — considerar troca se necessário."
},
{
  "med1":["doxazosina","carduran","aradois","cardura"],
  "med2":["anti-hipertensivo","enalapril","losartana","amlodipino","hidroclorotiazida","furosemida","betabloqueador"],
  "nivel":"moderado",
  "titulo":"Doxazosina + Anti-hipertensivo (Hipotensão Aditiva)",
  "mecanismo":"Efeito hipotensor aditivo com qualquer anti-hipertensivo. A doxazosina é especialmente hipotensora nas primeiras doses e ao se levantar rapidamente.",
  "efeito":"Hipotensão postural com risco de síncope e quedas — especialmente em idosos com múltiplos anti-hipertensivos.",
  "conduta":"⚠️ Iniciar com dose baixa de doxazosina (1mg/noite) ao adicionar ao esquema anti-hipertensivo. Monitorar pressão em diferentes posições (deitado, sentado, em pé). Revisar a necessidade de cada anti-hipertensivo para evitar hipotensão excessiva."
},

// ══════════════════════════════════════════════════════════════════════════════
// CICLOFOSFAMIDA
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["ciclofosfamida","endoxan","cyclophosphamide","cfa"],
  "med2":["alopurinol","zyloprim"],
  "nivel":"moderado",
  "titulo":"Ciclofosfamida + Alopurinol (Mielotoxicidade Aumentada)",
  "mecanismo":"O alopurinol inibe a xantina oxidase, enzima que também participa do metabolismo de metabólitos da ciclofosfamida. O bloqueio pode aumentar a exposição a metabólitos citotóxicos, potencializando a mielossupressão.",
  "efeito":"Mielossupressão mais intensa e prolongada — neutropenia mais grave, maior risco de infecção, anemia e trombocitopenia.",
  "conduta":"⚠️ Monitorar hemograma mais frequentemente ao combinar. Em hiperuricemia por lise tumoral, o alopurinol é frequentemente usado durante quimioterapia — monitoração rigorosa é essencial."
},
{
  "med1":["ciclofosfamida","endoxan","cyclophosphamide","cfa"],
  "med2":["warfarina","varfarina","coumadin"],
  "nivel":"moderado",
  "titulo":"Ciclofosfamida + Warfarina (Alteração Imprevisível do INR)",
  "mecanismo":"A ciclofosfamida pode tanto inibir quanto induzir o metabolismo da warfarina por mecanismos não completamente elucidados — resultando em alterações imprevisíveis do INR (elevação ou redução).",
  "efeito":"INR instável com risco tanto de sangramento (INR elevado) quanto de trombose (INR reduzido). A imprevisibilidade torna o manejo difícil.",
  "conduta":"⚠️ Monitorar o INR com maior frequência durante e após ciclos de ciclofosfamida. Ajustar a dose de warfarina conforme o INR."
},
{
  "med1":["ciclofosfamida","endoxan","cyclophosphamide","cfa"],
  "med2":["succinilcolina","suxamônio","bloqueador neuromuscular"],
  "nivel":"moderado",
  "titulo":"Ciclofosfamida + Succinilcolina (Apneia Prolongada)",
  "mecanismo":"A ciclofosfamida inibe a pseudocolinesterase plasmática, enzima responsável pela hidrólise rápida da succinilcolina. O bloqueio pode prolongar dramaticamente o efeito paralisante da succinilcolina.",
  "efeito":"Apneia prolongada durante procedimentos anestésicos — paralisia muscular por tempo muito superior ao esperado, com risco de hipóxia.",
  "conduta":"⚠️ Informar o anestesista sobre o uso de ciclofosfamida antes de qualquer procedimento cirúrgico. Pode ser necessário evitar succinilcolina ou estar preparado para ventilação mecânica prolongada."
},
{
  "med1":["ciclofosfamida","endoxan","cyclophosphamide","cfa"],
  "med2":["álcool","alcool","etanol","bebida alcoólica"],
  "nivel":"moderado",
  "titulo":"Ciclofosfamida + Álcool (Hepatotoxicidade e Toxicidade Aumentadas)",
  "mecanismo":"O álcool pode alterar o metabolismo hepático da ciclofosfamida via CYP2E1 e competição enzimática, potencialmente elevando metabólitos tóxicos. Hepatotoxicidade é aditiva.",
  "efeito":"Hepatotoxicidade aumentada, náuseas e vômitos mais intensos, possível alteração da eficácia antineoplásica.",
  "conduta":"⚠️ Evitar álcool durante o tratamento com ciclofosfamida."
},

// ══════════════════════════════════════════════════════════════════════════════
// GOLIMUMABE — complemento (biológicos em geral e corticoide já existem)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["golimumabe","simponi","golimumab"],
  "med2":["vacina bcg","vacina febre amarela","vacina sarampo","vacina varicela","vacina rotavirus","vacina viva","vacina de virus vivo"],
  "nivel":"alto",
  "titulo":"Golimumabe + Vacina de Vírus Vivo (Infecção Disseminada — Contraindicado)",
  "mecanismo":"O golimumabe bloqueia o TNF-alfa, comprometendo a imunidade inata e adaptativa. Vacinas de vírus vivo podem causar infecção disseminada pelo agente vacinal em pacientes imunossuprimidos.",
  "efeito":"Infecção disseminada pelo agente vacinal — febre amarela disseminada, BCG disseminada, varicela generalizada — potencialmente fatais.",
  "conduta":"❌ Contraindicado. Vacinar (incluindo febre amarela) pelo menos 4 semanas antes de iniciar o golimumabe. Não vacinar durante o tratamento ativo."
},
{
  "med1":["golimumabe","simponi","golimumab"],
  "med2":["rituximabe","mabthera","abatacepte","belimumabe","certolizumabe","etanercepte","adalimumabe","infliximabe","tocilizumabe","actemra"],
  "nivel":"alto",
  "titulo":"Golimumabe + Outro Biológico Imunossupressor (Imunossupressão Excessiva)",
  "mecanismo":"A combinação de dois imunobiológicos de mecanismos distintos resulta em imunossupressão sinérgica. Não há benefício clínico adicional documentado, apenas aumento proporcional dos riscos.",
  "efeito":"Risco muito aumentado de infecções graves, oportunistas e fatais. Reativação de TB, CMV, fungos endêmicos e sepse.",
  "conduta":"❌ Contraindicada a combinação de biológicos. Usar golimumabe em combinação com DMARDs convencionais (metotrexato), nunca com outro biológico simultaneamente."
},
{
  "med1":["golimumabe","simponi","golimumab"],
  "med2":["abatacepte","orencia"],
  "nivel":"alto",
  "titulo":"Golimumabe + Abatacepte (Combinação de Biológicos — Contraindicado)",
  "mecanismo":"Golimumabe (anti-TNF) e abatacepte (inibidor de coestimulação de células T) têm mecanismos complementares de imunossupressão. Estudos clínicos mostraram aumento significativo de infecções graves sem aumento de eficácia.",
  "efeito":"Infecções graves e oportunistas com risco de morte — sem benefício adicional terapêutico.",
  "conduta":"❌ Contraindicada a combinação. Escolher um dos dois biológicos conforme o perfil do paciente e a recomendação do especialista."
},

// ══════════════════════════════════════════════════════════════════════════════
// EPLERENONA — complemento (IECA + K+ já existe)
// ══════════════════════════════════════════════════════════════════════════════
{
  "med1":["eplerenona","inspra","eplerenone"],
  "med2":["cetoconazol","itraconazol","ritonavir","nelfinavir","claritromicina","nefazodona"],
  "nivel":"alto",
  "titulo":"Eplerenona + Inibidor Potente de CYP3A4 (Níveis até 5× Mais Altos — Contraindicado)",
  "mecanismo":"A eplerenona é metabolizada quase exclusivamente pelo CYP3A4. Inibidores potentes dessa enzima (cetoconazol, itraconazol, ritonavir, claritromicina) elevam dramaticamente os níveis plasmáticos da eplerenona.",
  "efeito":"Hipercalemia grave e hipotensão — potencialmente fatais. Cetoconazol oral eleva a eplerenona em ~500% — cinco vezes acima do esperado.",
  "conduta":"❌ Contraindicação absoluta com inibidores potentes de CYP3A4. Verificar o perfil de interações antes de prescrevê-la. Substitutos: fluconazol (menor inibição CYP3A4) para antifúngico; verificar alternativas para ritonavir."
},
{
  "med1":["eplerenona","inspra","eplerenone"],
  "med2":["espironolactona","amilorida","triantereno"],
  "nivel":"alto",
  "titulo":"Eplerenona + Outro Poupador de Potássio (Hipercalemia — Contraindicado)",
  "mecanismo":"Efeito aditivo na retenção de potássio — todos agem no túbulo coletor renal inibindo a excreção de K⁺ por mecanismos distintos (aldosterona, canal ENaC). A combinação eleva o K⁺ sérico de forma pronunciada.",
  "efeito":"Hipercalemia grave com arritmias cardíacas potencialmente fatais.",
  "conduta":"❌ Não combinar dois diuréticos poupadores de potássio. Usar um ou outro, não ambos simultaneamente."
},
{
  "med1":["eplerenona","inspra","eplerenone"],
  "med2":["aine","ibuprofeno","naproxeno","diclofenaco","indometacina","cetoprofeno","meloxicam","piroxicam"],
  "nivel":"moderado",
  "titulo":"Eplerenona + AINE (Hipercalemia e Redução do Efeito Anti-hipertensivo)",
  "mecanismo":"AINEs inibem a síntese de prostaglandinas renais, reduzindo a perfusão renal e a excreção de potássio — potencializando a hipercalemia induzida pela eplerenona. Também antagonizam o efeito anti-hipertensivo.",
  "efeito":"Hipercalemia, deterioração da função renal (especialmente em idosos e insuficiência cardíaca) e perda do controle pressórico.",
  "conduta":"⚠️ Evitar AINEs regularmente em pacientes usando eplerenona. Para analgesia, preferir paracetamol. Monitorar K⁺ e função renal se AINE for necessário."
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
