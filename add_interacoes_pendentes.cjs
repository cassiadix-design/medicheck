// Adiciona Piroxicam ao medicamentos.json e 8 novas interações ao mc-interacoes-data-v3.js
const fs = require('fs');
const path = require('path');

const MEDS_PATH = path.join(__dirname, 'medicamentos.json');
const INT_PATH  = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');

// ─── 1. Piroxicam → medicamentos.json ────────────────────────────────────────
const meds = JSON.parse(fs.readFileSync(MEDS_PATH, 'utf-8'));
const jaExiste = meds.some(m => (m.generico || '').toLowerCase().includes('piroxicam'));

if (jaExiste) {
  console.log('Piroxicam já existe em medicamentos.json — pulando.');
} else {
  const piroxicam = {
    "nome": "Piroxicam 10mg - 20mg",
    "generico": "Piroxicam",
    "tipo": "Anti-inflamatório Não Esteroidal (AINE) — Meia-vida Longa",
    "descricao": "AINE não seletivo com meia-vida extremamente longa (~50 horas), indicado para artrite reumatoide, osteoartrite, espondilite anquilosante e dor musculoesquelética crônica. A meia-vida longa permite dose única diária, mas aumenta o risco de acúmulo e complicações gastrointestinais graves em uso prolongado.",
    "receita": "Sim",
    "receita_nota": "Prescrição médica obrigatória.",
    "efeitos": "Gastrite, náusea, úlcera péptica (risco alto com uso prolongado), edema, tontura, risco cardiovascular com uso crônico, reações dermatológicas raras (síndrome de Stevens-Johnson, eritema multiforme).",
    "aviso_grave": "Alto risco gastrointestinal em comparação com outros AINEs. Contraindicado no terceiro trimestre da gravidez (fechamento prematuro do ducto arterioso). Não usar com anticoagulantes, outros AINEs ou corticoides. Interromper 14 dias antes de procedimentos cirúrgicos.",
    "recomendacao": "🔴 Maior risco de sangramento gastrointestinal que outros AINEs. Proibido no 3º trimestre da gravidez. Não combinar com anticoagulantes, outros anti-inflamatórios ou corticoides. Protetor gástrico (omeprazol) fortemente recomendado.",
    "educacao": "Tome sempre com alimento para reduzir a irritação gástrica. A meia-vida muito longa (~50 horas) faz o efeito durar vários dias após parar o medicamento — informe seu cirurgião ou dentista que usa piroxicam. Não é indicado para uso prolongado sem supervisão médica.",
    "resposta_rapida": [
      "Anti-inflamatório de longa duração (meia-vida ~50 horas)",
      "Uma dose por dia facilita a adesão",
      "Alto risco gastrointestinal — usar protetor gástrico",
      "Proibido no 3º trimestre da gravidez",
      "Parar 14 dias antes de cirurgias"
    ],
    "sinonimos": ["feldene", "piroxicam ems", "pirox"],
    "classe_receita": "TARJADO_PRATICA",
    "receita_display": "🔴 Receita Simples",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_cor": "vermelho",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      {
        "pergunta": "Piroxicam serve para que tipo de dor?",
        "resposta": "Piroxicam é indicado principalmente para dores crônicas de natureza inflamatória: artrite reumatoide, osteoartrite, espondilite anquilosante e dores musculoesqueléticas. Para dores agudas e passageiras, há opções mais seguras como ibuprofeno ou paracetamol."
      },
      {
        "pergunta": "Piroxicam é mais forte que ibuprofeno?",
        "resposta": "Piroxicam e ibuprofeno têm eficácia anti-inflamatória semelhante, mas piroxicam tem meia-vida muito mais longa (~50 horas vs. 2 horas do ibuprofeno). Isso permite dose única diária, porém aumenta o risco de efeitos colaterais gastrointestinais acumulados."
      },
      {
        "pergunta": "Piroxicam pode causar úlcera?",
        "resposta": "Sim. Piroxicam tem maior risco de úlcera e sangramento gástrico que outros AINEs como ibuprofeno ou meloxicam. Estudos mostram risco gastrointestinal mais alto justamente por sua meia-vida longa. Sempre tomar com alimento e associar protetor gástrico (omeprazol) se o uso for prolongado."
      },
      {
        "pergunta": "Posso tomar piroxicam com anticoagulante?",
        "resposta": "Não. Piroxicam com warfarina, apixabana, rivaroxabana ou qualquer anticoagulante é combinação de alto risco — aumenta muito o risco de sangramento grave, inclusive cerebral. Se precisar de anti-inflamatório, informe seu médico sobre o anticoagulante e use paracetamol como alternativa mais segura."
      },
      {
        "pergunta": "Por quanto tempo posso usar piroxicam?",
        "resposta": "O piroxicam deve ser usado pelo menor tempo possível, idealmente até 15 dias sem supervisão médica. Uso prolongado aumenta progressivamente o risco de úlcera, sangramento GI e eventos cardiovasculares. Para dores crônicas, o médico avalia regularmente a necessidade de continuar."
      },
      {
        "pergunta": "Posso usar piroxicam na gravidez?",
        "resposta": "Não no terceiro trimestre — pode causar fechamento prematuro do ducto arterioso fetal, hipertensão pulmonar no bebê e oligohidrâmnio. No primeiro e segundo trimestre, apenas se estritamente necessário com orientação médica."
      },
      {
        "pergunta": "Posso beber álcool tomando piroxicam?",
        "resposta": "Não. O álcool agrava a irritação gástrica causada pelo piroxicam, aumentando muito o risco de úlcera e sangramento. A combinação é perigosa e deve ser evitada durante todo o tratamento."
      },
      {
        "pergunta": "Quanto tempo antes de uma cirurgia devo parar o piroxicam?",
        "resposta": "Pelo menos 14 dias antes de qualquer cirurgia ou procedimento que cause sangramento (incluindo extração dentária). A meia-vida longa significa que o efeito antiagregante plaquetário persiste por vários dias — parar tarde demais aumenta o risco de sangramento cirúrgico."
      },
      {
        "pergunta": "Piroxicam pode aumentar a pressão?",
        "resposta": "Sim. Como todos os AINEs, piroxicam pode elevar a pressão arterial ao reter sódio e reduzir a eficácia de anti-hipertensivos. Pacientes hipertensos devem monitorar a pressão com mais frequência durante o tratamento."
      }
    ],
    "descricao_seo": "Piroxicam 10mg - 20mg é um medicamento anti-inflamatório não esteroidal (AINE) com meia-vida longa (~50 horas). É usado para: artrite reumatoide, osteoartrite, espondilite anquilosante e dor musculoesquelética crônica. Os efeitos colaterais mais relatados são: gastrite, náusea, úlcera péptica, edema e risco cardiovascular com uso crônico. Importante: alto risco gastrointestinal comparado a outros AINEs. Contraindicado no 3º trimestre da gravidez e não deve ser combinado com anticoagulantes. Piroxicam 10mg - 20mg é vendido somente com receita médica — nunca use sem orientação de um profissional de saúde.",
    "alerta_farmaceutico": "Atenção no balcão: piroxicam tem um dos maiores riscos gastrointestinais entre os AINEs — estudos populacionais colocam o risco de sangramento GI acima do ibuprofeno e próximo ao cetorolaco. Pacientes idosos, com histórico de úlcera, em uso de anticoagulantes, ISRS ou corticoides são especialmente vulneráveis. Sempre associar protetor gástrico (IBP) e questionar se há outro AINE em uso simultâneo.",
    "quando_procurar_medico": "Procure médico se: dor de estômago intensa ou persistente, fezes escuras ou com sangue ('borra de café'), vômito com sangue, inchaço súbito nos pés ou pernas, falta de ar, pressão arterial muito elevada, manchas na pele ou bolhas, ou qualquer sinal de sangramento incomum.",
    "interacoes": [
      {
        "com": ["warfarina", "varfarina", "acenocumarol", "apixabana", "rivaroxabana", "dabigatrana", "edoxabana"],
        "nivel": "alto",
        "titulo": "Piroxicam + Anticoagulante (AINE Meia-vida Longa — Risco de Sangramento Prolongado)",
        "efeito": "Piroxicam inibe plaquetas e agride a mucosa gástrica; seu efeito persiste ~5 dias após a última dose. Combinado com anticoagulante, o risco de sangramento grave e prolongado é muito alto.",
        "conduta": "❌ Evitar. Preferir paracetamol para analgesia. Se AINE necessário, usar agente de meia-vida curta (ibuprofeno) com IBP e monitorar INR/coagulação."
      },
      {
        "com": ["warfarina", "varfarina"],
        "nivel": "alto",
        "titulo": "Warfarina + AINE",
        "efeito": "AINEs aumentam muito o risco de sangramento grave em pacientes anticoagulados.",
        "conduta": "❌ Evitar. Usar paracetamol ou dipirona para dor. Informar sempre ao médico."
      },
      {
        "com": ["metotrexato"],
        "nivel": "alto",
        "titulo": "Metotrexato + AINE",
        "efeito": "AINEs reduzem eliminação do metotrexato, causando toxicidade grave na medula óssea.",
        "conduta": "❌ Evitar. Informar sempre ao reumatologista."
      },
      {
        "com": ["prednisona", "prednisolona", "dexametasona", "hidrocortisona"],
        "nivel": "alto",
        "titulo": "Corticoide + AINE",
        "efeito": "Dois agentes agressivos para a mucosa gástrica — risco muito elevado de úlcera péptica e sangramento GI.",
        "conduta": "❌ Evitar. Se necessário, adicionar IBP. Preferir paracetamol para dor."
      },
      {
        "com": ["fluoxetina", "sertralina", "escitalopram", "paroxetina", "citalopram", "venlafaxina", "duloxetina"],
        "nivel": "moderado",
        "titulo": "ISRS / IRSN + AINE",
        "efeito": "ISRS reduzem serotonina plaquetária e AINEs irritam a mucosa — combinação multiplica o risco de sangramento gastrointestinal.",
        "conduta": "⚠️ Adicionar IBP. Preferir paracetamol para dor. Monitorar sinais de sangramento."
      },
      {
        "com": ["enoxaparina", "heparina"],
        "nivel": "alto",
        "titulo": "Heparina / Enoxaparina + AINE",
        "efeito": "AINEs inibem plaquetas e agridem a mucosa — combinação com heparina multiplica o risco de sangramento grave.",
        "conduta": "❌ Evitar AINEs durante uso de heparina/enoxaparina. Usar paracetamol."
      },
      {
        "com": ["ciclosporina"],
        "nivel": "alto",
        "titulo": "AINE + Ciclosporina",
        "efeito": "AINEs + ciclosporina potencializam nefrotoxicidade — risco de insuficiência renal aguda.",
        "conduta": "❌ Evitar. Para dor, preferir paracetamol. Monitorar creatinina se uso inevitável."
      },
      {
        "tipo": "duplicacao",
        "classe": "AINE",
        "nivel": "moderado",
        "titulo": "🔄 Duplicação Terapêutica — Dois Anti-inflamatórios (AINEs)",
        "efeito": "Dois AINEs somam risco de sangramento gástrico sem melhorar a dor.",
        "conduta": "⚠️ Usar apenas um AINE por vez. Para dor mais intensa, associar paracetamol é mais seguro."
      }
    ]
  };

  meds.push(piroxicam);
  fs.writeFileSync(MEDS_PATH, JSON.stringify(meds, null, 2), 'utf-8');
  console.log('✓ Piroxicam adicionado ao medicamentos.json');
}

// ─── 2. Novas interações → mc-interacoes-data-v3.js ─────────────────────────
const novasInteracoes = [
  // Colchicina + Ritonavir/Cobicistate
  {
    "med1": ["colchicina"],
    "med2": ["ritonavir", "cobicistate", "lopinavir", "kaletra", "atazanavir/ritonavir", "darunavir/ritonavir", "elvitegravir/cobicistate", "darunavir/cobicistate"],
    "nivel": "grave",
    "titulo": "Colchicina + Ritonavir / Cobicistate (Dupla Inibição CYP3A4+P-gp — Toxicidade Fatal)",
    "mecanismo": "Ritonavir e cobicistate são inibidores potentes e simultâneos da CYP3A4 (principal via metabólica da colchicina) e da P-glicoproteína (P-gp), transportador responsável pela eliminação intestinal e renal da colchicina. A dupla inibição provoca elevação dramática das concentrações plasmáticas — estudos documentam aumento de 2–5× na AUC. Ao contrário de inibidores isolados, a inibição concomitante de CYP3A4 e P-gp elimina praticamente toda a margem de segurança da colchicina, que já tem janela terapêutica estreita.",
    "efeito": "Toxicidade grave da colchicina com risco de morte: mielossupressão (neutropenia, pancitopenia), miopatia/rabdomiólise, neuropatia periférica, insuficiência de múltiplos órgãos. Relatos de casos fatais com doses terapêuticas na presença de ritonavir. O início pode ser insidioso — diarreia e náuseas precedem em dias a falência hematológica.",
    "conduta": "❌ Contraindicação absoluta em pacientes com insuficiência renal ou hepática. Em função renal e hepática normais: reduzir dose de colchicina drasticamente (máx. 0,3 mg/dose, 1×/dia) OU suspender colchicina enquanto usar ritonavir/cobicistate. Monitorar hemograma semanalmente. Alertar sobre sinais de toxicidade: fraqueza muscular, formigamento, febre, equimoses."
  },
  // Ivermectina + Warfarina
  {
    "med1": ["ivermectina", "ivermectin", "stromectol", "revectina"],
    "med2": ["warfarina", "varfarina", "acenocumarol", "sintrom"],
    "nivel": "moderado",
    "titulo": "Ivermectina + Warfarina (Potencialização do Efeito Anticoagulante — Elevação do INR)",
    "mecanismo": "O mecanismo exato não está totalmente elucidado. Relatos de casos bem documentados descrevem elevação do INR em pacientes anticoagulados após administração de ivermectina — tanto em dose única (escabiose) quanto em doses repetidas (filariose). A hipótese predominante envolve inibição parcial do metabolismo da warfarina pela CYP2C9 ou deslocamento da ligação proteica plasmática.",
    "efeito": "Elevação do INR e potencialização do efeito anticoagulante com risco de sangramento. Relatos descrevem INR acima do alvo terapêutico em 24–72h após dose única de ivermectina.",
    "conduta": "⚠️ Monitorar INR 3–5 dias após dose de ivermectina e ajustar dose de warfarina se necessário. Orientar paciente sobre sinais de sangramento. Em tratamentos prolongados (oncocercose, estrongiloidíase), manter monitoramento por mais tempo."
  },
  // Progesterona Micronizada + Indutores Enzimáticos
  {
    "med1": ["progesterona micronizada", "progesterona", "utrogestan"],
    "med2": ["rifampicina", "carbamazepina", "fenitoína", "fenobarbital", "primidona", "rifabutina", "oxcarbazepina", "felbamato", "topiramato"],
    "nivel": "moderado",
    "titulo": "Progesterona Micronizada + Indutores Enzimáticos (Redução dos Níveis Hormonais por Indução de CYP3A4)",
    "mecanismo": "A progesterona micronizada é extensamente metabolizada pela CYP3A4 hepática na primeira passagem. Rifampicina, carbamazepina, fenitoína, fenobarbital, primidona e oxcarbazepina são indutores potentes da CYP3A4, aumentando o metabolismo de primeira passagem e reduzindo os níveis plasmáticos de progesterona em 50–80%. O impacto é maior com rifampicina (indutor muito potente) e menor, mas clinicamente relevante, com antiepilépticos.",
    "efeito": "Redução dos níveis séricos de progesterona com potencial falha terapêutica: menor proteção endometrial na TRH, risco de sangramento irregular, e possível falha na manutenção da gravidez (uso obstétrico). Em uso contraceptivo, risco de falha.",
    "conduta": "⚠️ Considerar ajuste de dose da progesterona micronizada ao usar indutores enzimáticos potentes. Monitorar resposta clínica e sangramento. Para anticoncepção: método de barreira adicional enquanto usar o indutor e por 28 dias após suspensão. Discutir alternativas com médico se uso prolongado."
  },
  // Dexclorfeniramina + Betametasona + Depressores SNC
  {
    "med1": ["dexclorfeniramina", "dexclorfeniramina + betametasona", "celestamine"],
    "med2": ["diazepam", "alprazolam", "clonazepam", "lorazepam", "bromazepam", "midazolam", "zolpidem", "morfina", "codeína", "tramadol", "oxicodona", "fentanila", "álcool", "etanol"],
    "nivel": "moderado",
    "titulo": "Dexclorfeniramina (Anti-histamínico 1ª geração) + Depressores do SNC / Álcool (Sedação Aditiva)",
    "mecanismo": "A dexclorfeniramina é anti-histamínico H1 de primeira geração com intensa ação anticolinérgica e sedativa central por bloqueio de receptores H1 no SNC. Benzodiazepínicos potencializam GABA-A, opioides agem em receptores mu, e o álcool atua em múltiplos receptores (GABA, NMDA). Todos deprimem o SNC — a associação com dexclorfeniramina é aditiva e pode ser sinérgica.",
    "efeito": "Sedação excessiva, sonolência intensa, comprometimento cognitivo e psicomotor, boca seca acentuada (efeitos anticolinérgicos somados), retenção urinária, e risco de depressão respiratória — especialmente em idosos, crianças e pacientes com DPOC ou apneia do sono.",
    "conduta": "⚠️ Evitar combinação, especialmente em idosos, crianças e pacientes com doença respiratória. Se necessário, usar as menores doses e alertar paciente sobre não dirigir veículos ou operar máquinas. Álcool absolutamente contraindicado durante uso de anti-histamínicos de 1ª geração."
  },
  // Dexclorfeniramina + Betametasona + IMAO
  {
    "med1": ["dexclorfeniramina", "dexclorfeniramina + betametasona", "celestamine"],
    "med2": ["fenelzina", "tranilcipromina", "isocarboxazida", "selegilina", "rasagilina", "moclobemida", "linezolida"],
    "nivel": "grave",
    "titulo": "Dexclorfeniramina + IMAO (Crise Hipertensiva e Síndrome Serotoninérgica)",
    "mecanismo": "A dexclorfeniramina possui atividade inibidora da recaptação de serotonina e noradrenalina. Inibidores da monoamina oxidase (IMAOs) bloqueiam a degradação dessas monoaminas, permitindo acúmulo nas sinapses. A combinação pode precipitar síndrome serotoninérgica (excesso de serotonina) e/ou crise hipertensiva (excesso de noradrenalina/dopamina por acúmulo de aminas vasoativas).",
    "efeito": "Síndrome serotoninérgica (agitação, tremores, mioclonias, hipertermia, taquicardia) e/ou crise hipertensiva grave com risco de AVC ou infarto. Reações graves relatadas mesmo com doses terapêuticas de dexclorfeniramina.",
    "conduta": "❌ Contraindicado. Respeitar washout de 14 dias após suspensão do IMAO antes de iniciar qualquer anti-histamínico de primeira geração. Se síndrome serotoninérgica: ciproheptadina como antagonista 5-HT. Se crise hipertensiva: nitroprussiato IV em UTI."
  },
  // Salmeterol + Betabloqueador
  {
    "med1": ["salmeterol", "salmeterol + propionato de fluticasona", "seretide"],
    "med2": ["propranolol", "nadolol", "timolol", "pindolol", "sotalol", "carvedilol", "atenolol", "metoprolol", "bisoprolol", "labetalol"],
    "nivel": "alto",
    "titulo": "Salmeterol (Beta2-agonista LABA) + Betabloqueador (Antagonismo — Broncoespasmo)",
    "mecanismo": "Betabloqueadores não seletivos (propranolol, carvedilol, nadolol, timolol, sotalol) bloqueiam tanto receptores beta-1 (cardíacos) quanto beta-2 (brônquicos), antagonizando diretamente o efeito broncodilatador do salmeterol. Mesmo betabloqueadores beta-1 seletivos (atenolol, metoprolol, bisoprolol) perdem a seletividade em doses mais altas. Como o salmeterol é de ação prolongada (12h), se ocorrer broncoespasmo, a reversão será bloqueada.",
    "efeito": "Perda do efeito broncodilatador do salmeterol, broncoespasmo potencialmente grave e piora do controle da asma ou DPOC. Betabloqueadores não seletivos em asmáticos podem causar broncoespasmo fatal — relatos de óbito com propranolol em pacientes com asma.",
    "conduta": "❌ Betabloqueadores não seletivos (propranolol, nadolol, carvedilol, timolol, sotalol) são contraindicados em pacientes com asma/DPOC em uso de salmeterol. Se betabloqueador for indispensável (pós-infarto, IC), usar beta-1 seletivo (bisoprolol, metoprolol) na menor dose eficaz, com vigilância respiratória rigorosa."
  },
  // Fluticasona + Ritonavir/Cobicistate
  {
    "med1": ["fluticasona", "salmeterol + propionato de fluticasona", "seretide", "formoterol + fluticasona", "propionato de fluticasona"],
    "med2": ["ritonavir", "cobicistate", "lopinavir", "kaletra", "atazanavir/ritonavir", "darunavir/ritonavir"],
    "nivel": "grave",
    "titulo": "Fluticasona Inalatória + Ritonavir / Cobicistate (Síndrome de Cushing Iatrogênica — Inibição CYP3A4)",
    "mecanismo": "A fluticasona é metabolizada quase exclusivamente pela CYP3A4, com biodisponibilidade sistêmica normalmente muito baixa (<1% inalatória). Ritonavir e cobicistate são inibidores extremamente potentes da CYP3A4 — a inibição pode elevar os níveis sistêmicos de fluticasona em 350–1000×, transformando doses inalatórias em exposição equivalente a corticoide oral em altas doses.",
    "efeito": "Síndrome de Cushing iatrogênica (ganho de peso central, hirsutismo, estrias violáceas, hiperglicemia, osteoporose, miopatia) e supressão do eixo hipotálamo-hipófise-adrenal. Casos publicados de insuficiência adrenal aguda ao interromper a fluticasona. Risco de crise adrenal potencialmente fatal.",
    "conduta": "❌ Evitar fluticasona em pacientes em uso de ritonavir ou cobicistate. Substituir por beclometasona ou budesonida (menor dependência da CYP3A4). Se insuficiência adrenal suspeita (fraqueza extrema, hipotensão, hipoglicemia): cortisol basal urgente + hidrocortisona IV. Desmame de fluticasona deve ser gradual."
  },
  // Piroxicam + Anticoagulante
  {
    "med1": ["piroxicam", "feldene"],
    "med2": ["warfarina", "varfarina", "acenocumarol", "sintrom", "apixabana", "rivaroxabana", "dabigatrana", "edoxabana", "enoxaparina", "heparina"],
    "nivel": "alto",
    "titulo": "Piroxicam (AINE Meia-vida ~50h) + Anticoagulante (Risco de Sangramento Prolongado)",
    "mecanismo": "Piroxicam inibe irreversivelmente a COX-1 plaquetária (antiagregação) e agride a mucosa GI ao reduzir prostaglandinas protetoras. Sua meia-vida ~50 horas significa que esses efeitos persistem por 4–6 dias após a última dose. Em combinação com anticoagulantes, o duplo bloqueio — anticoagulação + disfunção plaquetária + lesão mucosa — cria condições para sangramento grave e prolongado. Com warfarina, há risco adicional de elevação do INR por deslocamento da ligação proteica.",
    "efeito": "Sangramento grave e prolongado, especialmente gastrointestinal (úlcera hemorrágica), com risco aumentado em comparação com AINEs de meia-vida curta. O risco persiste por dias após a última dose.",
    "conduta": "❌ Evitar piroxicam em pacientes anticoagulados. Se AINE necessário, preferir meia-vida curta (ibuprofeno) com IBP e monitoramento. Com warfarina: monitorar INR frequentemente. Preferir paracetamol para analgesia."
  }
];

// Inserir novo bloco de concat no arquivo de interações
let interRaw = fs.readFileSync(INT_PATH, 'utf-8');

// Verificar se estas interações já foram adicionadas (idempotência)
if (interRaw.includes('Colchicina + Ritonavir')) {
  console.log('Interações já adicionadas ao mc-interacoes-data-v3.js — pulando.');
} else {
  const novoBloco = '\n\nmcInteracoesDB = mcInteracoesDB.concat(' +
    JSON.stringify(novasInteracoes, null, 2) +
    ');\n';

  // Inserir após o último ');\n' do concat existente (linha 982 → "});")
  // Encontrar a posição do último `]);` antes das variáveis auxiliares
  const markerAux = '\nvar mcIECAnomes';
  const posAux = interRaw.indexOf(markerAux);
  if (posAux === -1) {
    console.error('Não encontrou marcador das variáveis auxiliares — abortando.');
    process.exit(1);
  }

  interRaw = interRaw.slice(0, posAux) + novoBloco + interRaw.slice(posAux);
  fs.writeFileSync(INT_PATH, interRaw, 'utf-8');
  console.log(`✓ ${novasInteracoes.length} novas interações adicionadas ao mc-interacoes-data-v3.js`);
}
