// Adiciona interações para os 9 medicamentos novos ao mc-interacoes-data-v3.js
const fs   = require('fs');
const path = require('path');
const INT_PATH = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');

let raw = fs.readFileSync(INT_PATH, 'utf-8');
const norm = s => (s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();

// Verificar se já existe pelo título normalizado
const arr1 = JSON.parse(raw.match(/var\s+mcInteracoesDB\s*=\s*(\[[\s\S]*?\]);\s*\n/)[1]);
const all = [...arr1];
for (const m of raw.matchAll(/mcInteracoesDB\s*=\s*mcInteracoesDB\.concat\s*\(\s*(\[[\s\S]*?\])\s*\)/g)) {
  all.push(...JSON.parse(m[1]));
}
const titulosExistentes = new Set(all.map(i => norm(i.titulo||'')));

function jaExiste(titulo) {
  return titulosExistentes.has(norm(titulo));
}

// ─── Blocos a adicionar ───────────────────────────────────────────────────────
const novasInteracoes = [

  // ══════════════════════════════════════════════════════════════════════════
  // METILPREDNISOLONA (5 blocos)
  // ══════════════════════════════════════════════════════════════════════════
  {
    "med1": ["metilprednisolona","depo-medrol","solu-medrol","medrol"],
    "med2": ["ibuprofeno","naproxeno","diclofenaco","nimesulida","celecoxibe","ácido mefenâmico","indometacina","cetoprofeno","meloxicam","piroxicam"],
    "nivel": "moderado",
    "titulo": "Metilprednisolona + AINE (Risco Aumentado de Úlcera e Sangramento GI)",
    "mecanismo": "Corticóides inibem a síntese de prostaglandinas citoprotetoras da mucosa gástrica (via bloqueio da fosfolipase A2) e reduzem a produção de muco e bicarbonato gástrico. AINEs inibem a COX-1 com efeito similar. A combinação é sinérgica no dano mucoso — o risco de úlcera péptica e hemorragia GI é 15 vezes maior do que com cada fármaco isolado.",
    "efeito": "Risco elevado de úlcera gástrica e duodenal, hemorragia digestiva e perfuração gástrica — especialmente com uso concomitante prolongado ou em pacientes idosos.",
    "conduta": "⚠️ Evitar a combinação sempre que possível. Quando necessária, associar inibidor de bomba de prótons (IBP: omeprazol, pantoprazol) profilaticamente. Preferir paracetamol para analgesia em pacientes em uso de corticóide. Orientar o paciente a relatar qualquer dor abdominal intensa, fezes escuras ou vômito com sangue."
  },
  {
    "med1": ["metilprednisolona","depo-medrol","solu-medrol","medrol"],
    "med2": ["warfarina","varfarina","acenocumarol"],
    "nivel": "moderado",
    "titulo": "Metilprednisolona + Varfarina (Alteração Imprevisível do INR)",
    "mecanismo": "Corticóides podem tanto aumentar quanto diminuir o efeito da varfarina — o efeito líquido é variável e imprevisível. Mecanismos propostos incluem: alteração da síntese de fatores de coagulação, modificação do metabolismo hepático da varfarina e interação farmacodinâmica. A direção da alteração depende da dose, duração e paciente.",
    "efeito": "INR pode subir (risco de sangramento) ou cair (risco de trombose) de forma imprevisível durante o uso ou ao suspender o corticóide.",
    "conduta": "⚠️ Monitorar INR com mais frequência ao iniciar, alterar dose ou suspender o corticóide. Ajustar dose de varfarina conforme necessário. Alertar o paciente sobre sinais de sangramento (equimoses, hematúria, fezes escuras)."
  },
  {
    "med1": ["metilprednisolona","depo-medrol","solu-medrol","medrol","prednisona","dexametasona","betametasona"],
    "med2": ["insulina","metformina","glibenclamida","glicazida","glipizida","sitagliptina","empagliflozina","dapagliflozina","liraglutida","semaglutida"],
    "nivel": "moderado",
    "titulo": "Corticóide Sistêmico + Antidiabético (Hiperglicemia por Resistência à Insulina)",
    "mecanismo": "Corticóides elevam a glicemia por múltiplos mecanismos: estimulam a gliconeogênese hepática, aumentam a resistência à insulina nos tecidos periféricos e inibem a secreção de insulina pelas células beta pancreáticas. O pico hiperglicêmico é maior nas horas após a tomada do corticóide (especialmente com prednisolona/prednisona matinal).",
    "efeito": "Elevação significativa da glicemia — pacientes diabéticos podem requerer ajuste temporário de antidiabéticos ou insulina. Pacientes sem diabetes prévio podem desenvolver hiperglicemia corticóide-induzida (diabetes iatrogênico).",
    "conduta": "⚠️ Monitorar glicemia com mais frequência durante o uso de corticóide. Ajustar antidiabéticos ou insulina com orientação médica. Em pacientes não diabéticos em uso prolongado de corticóide, monitorar HbA1c e glicemia de jejum periodicamente."
  },
  {
    "med1": ["metilprednisolona","depo-medrol","solu-medrol","medrol","prednisona","dexametasona"],
    "med2": ["vacina febre amarela","vacina varicela","vacina sarampo","vacina rotavírus","vacina bcg","vacina de vírus vivo"],
    "nivel": "alto",
    "titulo": "Corticóide Sistêmico + Vacina de Vírus Vivo (Risco de Infecção Disseminada)",
    "mecanismo": "Corticóides em doses imunossupressoras (≥ 20 mg/dia de prednisona ou equivalente por ≥ 14 dias) comprometem a imunidade celular e humoral. Vacinas de vírus vivos atenuados (febre amarela, varicela, sarampo, rotavírus, BCG) contêm vírus capazes de replicar — em imunossuprimidos, o vírus vacinal pode causar doença sistêmica grave, potencialmente fatal.",
    "efeito": "Risco de infecção disseminada pelo agente vacinal — doença vacinogênica. Descrita com vacina de febre amarela e varicela em pacientes imunossuprimidos.",
    "conduta": "❌ CONTRAINDICADO: não administrar vacinas de vírus vivos em pacientes usando corticóide em dose imunossupressora. Vacinar idealmente antes de iniciar o corticóide (resposta imune preservada) ou aguardar ≥ 1 mês após suspensão. Vacinas inativadas (influenza, pneumococo, hepatite B) são seguras e devem ser mantidas."
  },
  {
    "med1": ["metilprednisolona","depo-medrol","solu-medrol","medrol","prednisona","dexametasona","budesonida","fluticasona"],
    "med2": ["fluconazol","itraconazol","voriconazol","cetoconazol","posaconazol"],
    "nivel": "moderado",
    "titulo": "Corticóide + Antifúngico Azólico (Elevação do Nível do Corticóide)",
    "mecanismo": "Antifúngicos azólicos são potentes inibidores do CYP3A4, principal enzima responsável pelo metabolismo dos corticóides. A inibição resulta em redução do clearance e elevação dos níveis séricos do corticóide — com risco de toxicidade e efeitos cushingóides mesmo em doses terapêuticas habituais.",
    "efeito": "Elevação dos níveis de corticóide com manifestações de hipercortisolismo: ganho de peso, hiperglicemia, hipertensão, supressão do eixo HHA e maior suscetibilidade a infecções.",
    "conduta": "⚠️ Monitorar sinais de excesso de corticóide. Considerar redução de dose do corticóide durante o uso do azólico. Fluconazol e itraconazol têm impacto mais pronunciado que outros azólicos. Preferir antifúngicos sem inibição de CYP3A4 quando disponíveis (anfotericina B, equinocandinas)."
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LEVOCETIRIZINA (2 blocos)
  // ══════════════════════════════════════════════════════════════════════════
  {
    "med1": ["levocetirizina","xyzal","cetirizina","loratadina","desloratadina","fexofenadina","bilastina","rupatadina"],
    "med2": ["álcool","bebida alcoólica","vinho","cerveja","cachaça"],
    "nivel": "moderado",
    "titulo": "Anti-histamínico + Álcool (Potencialização da Sedação)",
    "mecanismo": "Embora anti-histamínicos de segunda geração (levocetirizina, cetirizina, loratadina) tenham menor penetração no SNC do que os de primeira geração, ainda causam discreta sedação em algumas pessoas. O álcool é depressor do SNC e potencializa este efeito de forma aditiva — comprometendo coordenação motora, tempo de reação e julgamento.",
    "efeito": "Aumento da sedação, comprometimento da coordenação e tempo de reação — risco em atividades que exigem atenção, como dirigir veículos e operar máquinas.",
    "conduta": "⚠️ Evitar álcool durante o uso de anti-histamínicos. Se consumo for inevitável, não dirigir. O risco é maior com cetirizina e levocetirizina (maior efeito sedativo) do que com fexofenadina e bilastina (os menos sedantes da classe)."
  },
  {
    "med1": ["levocetirizina","xyzal","cetirizina","loratadina","desloratadina"],
    "med2": ["alprazolam","clonazepam","diazepam","lorazepam","bromazepam","clobazam","midazolam","tramadol","codeína","morfina","oxicodona","zolpidem","zopiclona"],
    "nivel": "moderado",
    "titulo": "Anti-histamínico + Depressor do SNC (Sedação Aditiva)",
    "mecanismo": "Anti-histamínicos H1 de segunda geração mantêm algum grau de antagonismo de receptores histaminérgicos centrais, causando discreta sedação. Quando combinados com benzodiazepínicos, opioides ou hipnóticos, o efeito depressor sobre o SNC é aditivo — levando a sedação clinicamente relevante.",
    "efeito": "Sonolência excessiva, comprometimento cognitivo, lentidão de reflexos — especialmente relevante em idosos (maior sensibilidade a depressores do SNC) e em quem precisa dirigir ou operar máquinas.",
    "conduta": "⚠️ Usar com cautela. Preferir anti-histamínicos com menor sedação (fexofenadina, bilastina) quando o paciente usa benzodiazepínicos ou opioides regularmente. Orientar sobre risco de sonolência excessiva e evitar atividades que exijam atenção plena."
  },

  // ══════════════════════════════════════════════════════════════════════════
  // INDOMETACINA (2 blocos — interações específicas mais graves que outros AINEs)
  // ══════════════════════════════════════════════════════════════════════════
  {
    "med1": ["indometacina","indocid"],
    "med2": ["lítio","carbonato de lítio"],
    "nivel": "alto",
    "titulo": "Indometacina + Lítio (Elevação Sérica de Lítio — Maior Risco que Outros AINEs)",
    "mecanismo": "Indometacina inibe prostaglandinas renais com intensidade superior à maioria dos outros AINEs, reduzindo acentuadamente a excreção renal de lítio. Estudos clínicos mostram elevação de 50–60% nos níveis séricos de lítio — significativamente maior do que com ibuprofeno (~25%) ou naproxeno (~16%). O risco de toxicidade pelo lítio é, portanto, proporcionalmente maior.",
    "efeito": "Toxicidade pelo lítio: tremores (que evoluem de finos para grosseiros), confusão mental, ataxia, náuseas, diarreia e, em casos graves, arritmias, convulsões e coma.",
    "conduta": "❌ Evitar a combinação. Dentre os AINEs, a indometacina é a que mais eleva o lítio. Alternativa mais segura: paracetamol (não afeta a excreção renal de lítio). Se for impossível evitar, monitorar litemia imediatamente após o início e ajustar dose com supervisão do psiquiatra."
  },
  {
    "med1": ["indometacina","indocid"],
    "med2": ["metotrexato"],
    "nivel": "alto",
    "titulo": "Indometacina + Metotrexato (Toxicidade Grave — Mielossupressão e Nefrotoxicidade)",
    "mecanismo": "AINEs — especialmente indometacina — inibem prostaglandinas renais e reduzem a secreção tubular do metotrexato, elevando seus níveis séricos de forma significativa. A indometacina também compete com o metotrexato pela ligação à albumina plasmática, aumentando a fração livre. O resultado é acúmulo de metotrexato com risco de toxicidade grave mesmo em doses baixas (metrotrexato para artrite reumatoide).",
    "efeito": "Mielossupressão (leucopenia, plaquetopenia), mucosite grave, hepatotoxicidade e nefrotoxicidade — podem ocorrer mesmo com doses semanais baixas de metotrexato.",
    "conduta": "❌ Evitar indometacina em pacientes usando metotrexato. Se analgesia for necessária, preferir paracetamol ou discutir com o reumatologista. Para outros AINEs com metotrexato, a interação também existe — sempre avaliar o benefício/risco com o especialista."
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ANASTROZOL (3 blocos)
  // ══════════════════════════════════════════════════════════════════════════
  {
    "med1": ["anastrozol","arimidex"],
    "med2": ["tamoxifeno"],
    "nivel": "moderado",
    "titulo": "Anastrozol + Tamoxifeno (Antagonismo Farmacocinético — Não Associar)",
    "mecanismo": "Estudos clínicos (ATAC trial) demonstraram que o uso concomitante de tamoxifeno reduz os níveis plasmáticos de anastrozol em aproximadamente 27%, provavelmente por indução enzimática. Além disso, os dois mecanismos de ação (bloqueio de receptor de estrogênio vs inibição de aromatase) não são aditivos na prática clínica — os estudos não demonstraram benefício da associação comparado a cada fármaco isolado.",
    "efeito": "Redução dos níveis de anastrozol sem ganho de eficácia terapêutica — a associação não oferece vantagem e pode comprometer o tratamento.",
    "conduta": "❌ Não associar anastrozol com tamoxifeno. São alternativas, não uma combinação. Se houver necessidade de transição de um para o outro, consultar o oncologista sobre o período de washout adequado."
  },
  {
    "med1": ["anastrozol","arimidex","letrozol","exemestano"],
    "med2": ["estradiol","estriol","estrogenio","valerato de estradiol","estrogênio","terapia de reposição hormonal","anticoncepcional","etinilestradiol","drospirenona","noretisterona","tibolona"],
    "nivel": "alto",
    "titulo": "Inibidor de Aromatase + Estrogênio / TRH (Antagonismo do Efeito Terapêutico)",
    "mecanismo": "Inibidores de aromatase (anastrozol, letrozol, exemestano) agem reduzindo os níveis de estrogênio circulante para suprimir tumores hormônio-dependentes. Qualquer fonte exógena de estrogênio — terapia de reposição hormonal (TRH), anticoncepcionais combinados, cremes vaginais com estrogênio — antagoniza diretamente esse efeito, revertendo a supressão estrogênica e potencialmente estimulando o crescimento tumoral.",
    "efeito": "Neutralização do efeito antiestrogênico do inibidor de aromatase — comprometimento do tratamento oncológico e possível progressão tumoral.",
    "conduta": "❌ CONTRAINDICADO: não usar qualquer forma de estrogênio exógeno durante o tratamento com inibidor de aromatase. Para sintomas de menopausa, existem opções não hormonais (venlafaxina, gabapentina, lubricantes vaginais não hormonais). Discutir com o oncologista antes de iniciar qualquer produto hormonal."
  },
  {
    "med1": ["anastrozol","arimidex"],
    "med2": ["warfarina","varfarina","acenocumarol"],
    "nivel": "moderado",
    "titulo": "Anastrozol + Varfarina (Possível Alteração do INR)",
    "mecanismo": "Anastrozol inibe parcialmente o CYP2C9 e o CYP1A2, enzimas envolvidas no metabolismo da varfarina. Caso clínicos e dados pós-comercialização relatam alterações no INR em pacientes que iniciaram ou suspenderam anastrozol durante anticoagulação com varfarina. O mecanismo completo ainda não é totalmente elucidado.",
    "efeito": "Possível elevação do INR com risco de sangramento em pacientes anticoagulados com varfarina.",
    "conduta": "⚠️ Monitorar INR ao iniciar, alterar dose ou suspender o anastrozol. Ajustar dose de varfarina conforme necessário com acompanhamento do médico responsável pela anticoagulação."
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PROPAFENONA (4 blocos)
  // ══════════════════════════════════════════════════════════════════════════
  {
    "med1": ["propafenona","rytmonorm"],
    "med2": ["digoxina","lanoxin"],
    "nivel": "moderado",
    "titulo": "Propafenona + Digoxina (Elevação do Nível Sérico de Digoxina)",
    "mecanismo": "Propafenona inibe a glicoproteína-P (P-gp) intestinal e renal, reduzindo a excreção de digoxina e aumentando seus níveis séricos em 35–85% — de forma dose-dependente. Além disso, a propafenona tem efeito cronotropo negativo que soma ao da digoxina, aumentando o risco de bloqueio AV e bradicardia.",
    "efeito": "Toxicidade digitálica: náusea, vômito, bradiarritmias, bloqueio AV, e em casos graves, taquicardia ventricular bidirecional — potencialmente fatal.",
    "conduta": "⚠️ Reduzir a dose de digoxina em 25–50% ao iniciar propafenona. Monitorar nível sérico de digoxina e ECG com frequência. Sinais de toxicidade digitálica: náusea, visão amarelada/verde, batimentos irregulares — orientar o paciente a procurar urgência imediatamente."
  },
  {
    "med1": ["propafenona","rytmonorm"],
    "med2": ["warfarina","varfarina","acenocumarol"],
    "nivel": "moderado",
    "titulo": "Propafenona + Varfarina (Inibição CYP2C9 — Elevação do INR)",
    "mecanismo": "Propafenona e seu principal metabólito ativo (5-hidroxipropafenona) inibem o CYP2C9, principal enzima responsável pelo metabolismo da S-varfarina (forma mais ativa). A inibição reduz o clearance da varfarina, elevando o INR de forma clinicamente significativa.",
    "efeito": "Elevação do INR com risco de sangramento — relatado aumento de 25–40% no efeito anticoagulante.",
    "conduta": "⚠️ Monitorar INR com mais frequência ao iniciar, alterar dose ou suspender a propafenona. Pode ser necessário reduzir a dose de varfarina temporariamente. Orientar o paciente sobre sinais de sangramento."
  },
  {
    "med1": ["propafenona","rytmonorm"],
    "med2": ["atenolol","propranolol","metoprolol","bisoprolol","carvedilol","nebivolol"],
    "nivel": "moderado",
    "titulo": "Propafenona + Betabloqueador (Bradicardia e Depressão da Condução Cardíaca)",
    "mecanismo": "Propafenona tem leve atividade betabloqueadora intrínseca (especialmente em metabolizadores lentos do CYP2D6, onde se acumula). Combinada com betabloqueadores, os efeitos cronotrópicos e dromotrópicos negativos são aditivos — risco de bradicardia excessiva, bloqueio sinoatrial e prolongamento do intervalo PR.",
    "efeito": "Bradicardia sintomática, tontura, síncope e bloqueio AV — risco maior em idosos, doença do nó sinusal e doença do sistema de condução.",
    "conduta": "⚠️ Usar a combinação com cautela sob supervisão cardiológica. Monitorar ECG e FC. Se bradicardia sintomática (<50 bpm), suspender e acionar o cardiologista. Ajustar doses individuais."
  },
  {
    "med1": ["propafenona","rytmonorm"],
    "med2": ["amiodarona","ancoron"],
    "nivel": "alto",
    "titulo": "Propafenona + Amiodarona (Risco de Arritmia Grave e Toxicidade Cumulativa)",
    "mecanismo": "Amiodarona inibe o CYP2D6 e o CYP3A4, elevando os níveis de propafenona em até 3 vezes. Além disso, ambos prolongam o intervalo QT e têm efeitos depressores sobre a condução cardíaca (bloqueio de sódio e potássio). A combinação aumenta o risco de pró-arritmia — incluindo taquicardia ventricular polimórfica (torsades de pointes) e fibrilação ventricular.",
    "efeito": "Risco de arritmia ventricular grave (torsades de pointes, FV), bloqueio AV de alto grau e morte cardíaca súbita.",
    "conduta": "❌ Evitar a combinação. Se necessária (em contexto hospitalar especializado), reduzir dose de propafenona e monitorar ECG rigorosamente (QTc, largura do QRS). Contraindicada em ambulatório sem supervisão cardiológica especializada."
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TIMOLOL — colírio (4 blocos)
  // ══════════════════════════════════════════════════════════════════════════
  {
    "med1": ["timolol","timoftol","timoptic"],
    "med2": ["atenolol","propranolol","metoprolol","bisoprolol","carvedilol","nebivolol","nadolol"],
    "nivel": "moderado",
    "titulo": "Timolol (Colírio) + Betabloqueador Oral (Bradicardia Grave por Efeito Aditivo)",
    "mecanismo": "Apesar de ser aplicado nos olhos, o timolol é absorvido sistemicamente pela mucosa nasolacrimal — aproximadamente 80% da dose ocular entra na circulação. Combinado com betabloqueadores orais, os efeitos se somam: bloqueio adicional dos receptores beta-1 cardíacos, com risco de bradicardia grave, hipotensão e bloqueio AV.",
    "efeito": "Bradicardia sintomática (< 50 bpm), tontura, síncope, hipotensão postural, fadiga intensa e — raramente — bloqueio AV avançado.",
    "conduta": "⚠️ Monitorar FC e PA ao usar timolol colírio em paciente já usando betabloqueador oral. Ensinar a técnica de oclusão punctal (comprimir o canto do olho por 2 min após pingar) para reduzir absorção sistêmica. Se bradicardia sintomática, avaliar alternativa ao timolol (análogo de prostaglandina, inibidor de anidrase carbônica)."
  },
  {
    "med1": ["timolol","timoftol"],
    "med2": ["verapamil","diltiazem"],
    "nivel": "alto",
    "titulo": "Timolol (Colírio) + Verapamil ou Diltiazem (Bloqueio AV e Colapso Cardiovascular)",
    "mecanismo": "Verapamil e diltiazem são bloqueadores de canal de cálcio não dihidropiridínicos com efeito cronotrópico e dromotrópico negativo intenso. Combinados com o timolol absorvido sistemicamente pelo colírio, os efeitos são sinérgicos sobre o nó sinusal e nó AV — podendo causar bloqueio AV completo, parada sinusal e colapso hemodinâmico.",
    "efeito": "Bloqueio AV de alto grau, bradicardia grave, hipotensão severa e parada cardíaca — mesmo com timolol em dose ocular habitual.",
    "conduta": "❌ Contraindicada a combinação. Se o paciente precisar de colírio antiglaucomatoso e usa verapamil/diltiazem, preferir análogo de prostaglandina (latanoprosta, bimatoprosta) ou inibidor de anidrase carbônica tópico (dorzolamida). Informar o oftalmologista sobre todos os medicamentos cardiovasculares em uso."
  },
  {
    "med1": ["timolol","timoftol"],
    "med2": ["amiodarona","ancoron"],
    "nivel": "alto",
    "titulo": "Timolol (Colírio) + Amiodarona (Risco de Bloqueio AV e Bradicardia Grave)",
    "mecanismo": "A amiodarona prolonga o período refratário do nó AV e inibe o CYP2D6 (elevando os níveis de betabloqueadores metabolizados por essa via). Combinada com o timolol absorvido pelo colírio, há risco real de bloqueio AV avançado e bradicardia sintomática — descrito em relatos de caso.",
    "efeito": "Bradicardia sinusal grave, bloqueio AV de 2º ou 3º grau, síncope.",
    "conduta": "⚠️ Usar com muita cautela. Monitorar ECG e FC regularmente. Ensinar a oclusão punctal para minimizar absorção sistêmica. Se possível, substituir timolol por colírio sem ação betabloqueadora sistêmica. Nunca iniciar a combinação sem avaliação cardiológica prévia."
  },
  {
    "med1": ["timolol","timoftol"],
    "med2": ["insulina","glibenclamida","glicazida","glipizida","metformina"],
    "nivel": "moderado",
    "titulo": "Timolol (Colírio) + Antidiabético (Mascaramento da Hipoglicemia)",
    "mecanismo": "Betabloqueadores não seletivos (como o timolol) bloqueiam receptores beta-2 adrenérgicos, suprimindo os sintomas adrenérgicos da hipoglicemia — taquicardia, tremores e ansiedade. Esses sintomas são os primeiros sinais de alerta de hipoglicemia que o paciente percebe. A sudorese fria pode ser preservada (mediada por receptores muscarínicos), mas outros alertas desaparecem. Isso dificulta a percepção e o tratamento precoce da hipoglicemia.",
    "efeito": "Hipoglicemia não percebida (hipoglicemia assintomática ou desconhecida) — risco de hipoglicemia grave sem sintomas de aviso em diabéticos, especialmente os insulinodependentes.",
    "conduta": "⚠️ Monitorar glicemia com mais frequência em diabéticos que usam timolol colírio. Orientar o paciente a reconhecer sinais alternativos (sudorese fria, confusão mental) mesmo sem taquicardia. Avaliar substituição do timolol por colírio de outra classe se o paciente for diabético insulinodependente com hipoglicemias recorrentes."
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TINIDAZOL — bloco adicional (já tem álcool)
  // ══════════════════════════════════════════════════════════════════════════
  {
    "med1": ["tinidazol","fasigyn","amentyl"],
    "med2": ["warfarina","varfarina","acenocumarol"],
    "nivel": "moderado",
    "titulo": "Tinidazol + Varfarina (Inibição CYP2C9 — Elevação do INR)",
    "mecanismo": "Tinidazol, como o metronidazol, inibe o CYP2C9, principal enzima responsável pelo metabolismo da S-varfarina. A inibição reduz o clearance da varfarina, elevando o INR. O efeito ocorre tipicamente em 3–5 dias após o início do tinidazol.",
    "efeito": "Elevação do INR com risco de sangramento — mesmo cursos curtos de tinidazol (dose única ou 3–5 dias) podem elevar o INR de forma clinicamente significativa.",
    "conduta": "⚠️ Monitorar INR ao iniciar e ao final do tratamento com tinidazol. Pode ser necessário reduzir temporariamente a dose de varfarina. Alertar o paciente sobre sinais de sangramento. Se possível, preferir tratamentos alternativos para infecções protozóicas em pacientes anticoagulados ou monitorar INR intensivamente."
  }

];

// ─── Filtrar apenas os ausentes e adicionar ───────────────────────────────────
const paraAdicionar = novasInteracoes.filter(i => !jaExiste(i.titulo));
const pulados = novasInteracoes.filter(i => jaExiste(i.titulo));

if (pulados.length) {
  console.log('Já existentes (pulando):');
  pulados.forEach(i => console.log('  - ' + i.titulo));
}

console.log('\nAdicionar:');
paraAdicionar.forEach(i => console.log('  + ' + i.titulo));

if (paraAdicionar.length === 0) {
  console.log('\nNada a adicionar.');
  process.exit(0);
}

const novoBloco = '\n\nmcInteracoesDB = mcInteracoesDB.concat(' +
  JSON.stringify(paraAdicionar, null, 2) +
  ');\n';

const markerAux = '\nvar mcIECAnomes';
const posAux = raw.indexOf(markerAux);
if (posAux === -1) {
  console.error('Marcador mcIECAnomes não encontrado — abortando');
  process.exit(1);
}

raw = raw.slice(0, posAux) + novoBloco + raw.slice(posAux);
fs.writeFileSync(INT_PATH, raw, 'utf-8');
console.log(`\n✓ ${paraAdicionar.length} interações adicionadas ao mc-interacoes-data-v3.js`);
