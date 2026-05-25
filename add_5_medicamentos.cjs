// Tarefa: 5 medicamentos — Aspirina patch, Ondansetrona check, Levodopa patch,
// Testosterona check, Adalimumabe novo + interações para todos no mc-interacoes.
const fs   = require('fs');
const path = require('path');

const MEDS_PATH = path.join(__dirname, 'medicamentos.json');
const INT_PATH  = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');
const HTML_PATH = path.join(__dirname, 'public', 'index.html');

const meds = JSON.parse(fs.readFileSync(MEDS_PATH, 'utf-8'));
const norm = s => (s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().trim();

// ══════════════════════════════════════════════════════════════════════════════
// 1. PATCH: Aspirina / AAS — adicionar aviso_grave e sinonimos
// ══════════════════════════════════════════════════════════════════════════════
const aspirina = meds.find(m => norm(m.generico||'').includes('acetilsalicilico'));
if (aspirina) {
  if (!aspirina.aviso_grave) {
    aspirina.aviso_grave = "Em crianças e adolescentes com quadros virais (gripe, varicela): CONTRAINDICADO — risco de Síndrome de Reye, doença rara e potencialmente fatal que afeta cérebro e fígado. Usar paracetamol ou ibuprofeno nesses casos. Em doses antiagregantes (100–200 mg/dia): NUNCA suspender abruptamente em pacientes com stent coronário sem orientação do cardiologista — risco de trombose do stent com infarto. Risco de sangramento gastrointestinal aumenta com AINEs, varfarina e álcool. Contraindicado em pacientes com histórico de úlcera ativa ou sangramento GI recente.";
    console.log('✓ Aspirina: aviso_grave adicionado');
  }
  if (!aspirina.sinonimos || aspirina.sinonimos.length === 0) {
    aspirina.sinonimos = ["aas","aspirina","melhoral","ácido acetilsalicílico","aspirin","acido acetilsalicilico","bufferin","infantil aspirina"];
    console.log('✓ Aspirina: sinonimos adicionados');
  }
  // Garantir nomes comerciais no nome se ausentes
  if (!aspirina.nome.includes('Aspirina')) {
    aspirina.nome = aspirina.nome.replace('Ácido Acetilsalicílico', 'Ácido Acetilsalicílico (Aspirina, AAS, Melhoral)');
    console.log('✓ Aspirina: nome comercial atualizado');
  }
} else {
  console.log('ERRO: Aspirina não encontrada em medicamentos.json');
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. PATCH: Carbidopa + Levodopa — adicionar aviso_grave e sinonimos
// ══════════════════════════════════════════════════════════════════════════════
const levodopa = meds.find(m => norm(m.generico||'').includes('levodopa'));
if (levodopa) {
  if (!levodopa.aviso_grave) {
    levodopa.aviso_grave = "NUNCA interromper abruptamente — risco de síndrome maligna da levodopa (hipertermia, rigidez muscular intensa, instabilidade autonômica, semelhante à síndrome maligna dos neurolépticos). Reduzir sempre de forma gradual com supervisão neurológica. IMAOs não seletivos (fenelzina, tranilcipromina) são CONTRAINDICADOS — risco de crise hipertensiva grave. Hipotensão ortostática é comum — paciente deve sentar antes de se levantar. Alucinações e distúrbios do controle de impulsos (jogo patológico, hipersexualidade) podem ocorrer — relatar ao neurologista.";
    console.log('✓ Levodopa: aviso_grave adicionado');
  }
  if (!levodopa.sinonimos || levodopa.sinonimos.length === 0) {
    levodopa.sinonimos = ["sinemet","prolopa","levodopa","carbidopa","levodopa + carbidopa","levodopa + benserazida","madopar"];
    console.log('✓ Levodopa: sinonimos adicionados');
  }
  if (!levodopa.nome.includes('Sinemet') && !levodopa.nome.includes('Prolopa')) {
    const nomeCurto = levodopa.nome.replace(/Carbidopa \+ Levodopa.*/, 'Carbidopa + Levodopa (Sinemet / Prolopa) — Parkinson');
    if (nomeCurto !== levodopa.nome) { levodopa.nome = nomeCurto; console.log('✓ Levodopa: nome comercial atualizado'); }
  }
} else {
  console.log('ERRO: Levodopa não encontrada');
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. PATCH: Ondansetrona — garantir Vonau nos sinônimos
// ══════════════════════════════════════════════════════════════════════════════
const ondans = meds.find(m => norm(m.generico||'').includes('ondansetrona'));
if (ondans) {
  if (!ondans.sinonimos) ondans.sinonimos = [];
  const vonau = ondans.sinonimos.some(s => norm(s).includes('vonau'));
  if (!vonau) {
    ondans.sinonimos.push('Vonau', 'Vonau Flash', 'ondansetron');
    console.log('✓ Ondansetrona: Vonau adicionado aos sinônimos');
  } else {
    console.log('  Ondansetrona: Vonau já existe');
  }
} else {
  console.log('ERRO: Ondansetrona não encontrada');
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. NOVO: Adalimumabe (Humira) — entrada completa
// ══════════════════════════════════════════════════════════════════════════════
const jaTemAdalimumabe = meds.some(m =>
  norm(m.generico||'').includes('adalimumabe') ||
  (m.sinonimos||[]).some(s => norm(s).includes('humira'))
);

if (!jaTemAdalimumabe) {
  const adalimumabe = {
    "nome": "Adalimumabe (Humira) — Imunobiológico Anti-TNF",
    "generico": "Adalimumabe",
    "tipo": "Agente Biológico — Anticorpo Monoclonal Anti-TNF-α",
    "descricao": "Adalimumabe é um anticorpo monoclonal totalmente humano que se liga especificamente ao TNF-α (fator de necrose tumoral alfa), uma citocina pró-inflamatória central em diversas doenças autoimunes. Ao bloquear o TNF-α, reduz a cascata inflamatória e o dano tecidual progressivo. É indicado para artrite reumatoide moderada a grave (quando metotrexato isolado é insuficiente), artrite psoriásica, espondilite anquilosante, doença de Crohn moderada a grave, retocolite ulcerativa, psoríase em placas moderada a grave, uveíte não infecciosa e artrite idiopática juvenil. Disponível pelo SUS para indicações aprovadas no PCDT do Ministério da Saúde. Administrado via injeção subcutânea — geralmente a cada 2 semanas para artrite reumatoide.",
    "receita": "Sim",
    "receita_nota": "Exige prescrição médica especializada (reumatologista, gastroenterologista, dermatologista ou oftalmologista). Medicamento de alto custo dispensado pelo SUS via componente especializado.",
    "efeitos": "Infecções das vias aéreas superiores (resfriado, sinusite, bronquite) são os efeitos mais comuns — o imunossupressor facilita infecções oportunistas. Reações no local da injeção: dor, vermelhidão e inchaço (em cerca de 20% dos pacientes). Cefaleia, náusea e elevação de enzimas hepáticas. Riscos mais graves (menos frequentes): tuberculose reativada, infecções graves (pneumonia, sepse, infecções fúngicas invasivas), linfomas e outros cânceres — especialmente com uso prolongado.",
    "aviso_grave": "TRIAGEM OBRIGATÓRIA PARA TUBERCULOSE antes de iniciar — teste tuberculínico (PPD) e/ou IGRA (QuantiFERON). TB latente deve ser tratada por pelo menos 1 mês (geralmente 9 meses) antes do adalimumabe. Monitorar sinais de infecção durante todo o tratamento — febre, tosse persistente, suores noturnos exigem investigação imediata. Não usar em insuficiência cardíaca grave (NYHA III/IV). SUSPENDER imediatamente se infecção grave ou sepse. Não administrar vacinas de vírus vivo durante o tratamento. Risco aumentado de linfoma e câncer de pele não melanoma — proteção solar e dermatologista anual.",
    "recomendacao": "☎️ LIGUE SAMU (192) se: febre alta com calafrios, dificuldade para respirar intensa, confusão mental ou pressão muito baixa — podem indicar infecção grave ou sepse.",
    "educacao": "A injeção subcutânea pode ser aprendida para aplicação em casa — o médico ou enfermeiro orientará a técnica. Alternar o local de aplicação a cada injeção (abdome, coxas). Guardar sempre na geladeira (2–8°C), nunca no freezer — retirar 30 min antes de aplicar para atingir temperatura ambiente e reduzir a dor. Não pular doses sem avisar o reumatologista. Atualizar vacinas inativadas (influenza anual, pneumococo, hepatite B) antes ou durante o tratamento.",
    "resposta_rapida": [
      "Imunobiológico anti-TNF — artrite, psoríase, Crohn, espondilite",
      "Injeção subcutânea a cada 2 semanas (AR)",
      "Triagem obrigatória para TB antes de iniciar",
      "Guardar na geladeira — nunca congelar",
      "Relatar qualquer febre ou infecção ao médico imediatamente"
    ],
    "sinonimos": ["humira","adalimumab","adalimumabe biosimilar","cyltezo","hadlima","hyrimoz","imraldi"],
    "classe_receita": "TARJADO_PRATICA",
    "receita_display": "🔴 Receita Simples",
    "receita_descricao": "Exige prescrição médica especializada. Medicamento de alto custo dispensado pelo SUS.",
    "receita_cor": "vermelho",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      {
        "pergunta": "Para que serve o adalimumabe (Humira)?",
        "resposta": "O adalimumabe é um medicamento biológico usado para tratar doenças autoimunes inflamatórias moderadas a graves quando os tratamentos convencionais (como metotrexato) não foram suficientes. As principais indicações incluem: artrite reumatoide, artrite psoriásica, psoríase em placas, doença de Crohn, retocolite ulcerativa, espondilite anquilosante e uveíte não infecciosa."
      },
      {
        "pergunta": "O adalimumabe está disponível pelo SUS?",
        "resposta": "Sim, para indicações aprovadas no Protocolo Clínico e Diretrizes Terapêuticas (PCDT) do Ministério da Saúde. O paciente precisa de laudo médico de especialista, documentação da falha de tratamentos anteriores e solicitação via Sistema Único de Saúde. A dispensação ocorre nas farmácias de componente especializado (alto custo) do SUS. Biosimilares do adalimumabe também estão disponíveis, com eficácia e segurança equivalentes."
      },
      {
        "pergunta": "Por que preciso fazer exame de tuberculose antes de iniciar o adalimumabe?",
        "resposta": "O adalimumabe suprime o TNF-α, que é fundamental na formação dos granulomas que 'encapsulam' a tuberculose latente. Ao bloquear o TNF-α, o organismo perde a capacidade de manter a TB controlada, e a infecção latente pode se reativar — às vezes de forma grave e disseminada. Por isso, todo paciente deve ser rastreado (PPD/IGRA) e, se positivo, tratar a TB latente antes de iniciar o biológico."
      },
      {
        "pergunta": "Posso tomar vacinas durante o tratamento com adalimumabe?",
        "resposta": "Vacinas inativadas (influenza, pneumococo, hepatite B, tétano) são seguras e altamente recomendadas — idealmente atualizar antes de iniciar o tratamento, quando a resposta imune ainda é plena. Vacinas de vírus vivos (febre amarela, varicela, BCG, sarampo) são CONTRAINDICADAS durante o tratamento. Se precisar de vacina de febre amarela por viagem, discuta com o reumatologista sobre janela terapêutica."
      },
      {
        "pergunta": "A injeção do adalimumabe dói muito?",
        "resposta": "A maioria dos pacientes descreve a injeção como de leve a moderada — semelhante a uma picada. Para reduzir o desconforto: retire da geladeira 30 minutos antes, aplique gelo local por 2–3 minutos antes, injete devagar e alterne os locais de aplicação (abdome, coxas, braços). A dor tende a diminuir com o tempo à medida que o paciente se familiariza com a técnica."
      },
      {
        "pergunta": "Posso engravidar tomando adalimumabe?",
        "resposta": "Os dados disponíveis não indicam risco aumentado de malformações. O adalimumabe atravessa a placenta especialmente no 2º e 3º trimestres, e bebês expostos in utero têm imunossupressão temporária — não devem receber vacinas de vírus vivos nos primeiros 6 meses de vida. Discuta com o reumatologista e o obstetra antes de engravidar — a decisão envolve equilíbrio entre atividade da doença e risco fetal."
      },
      {
        "pergunta": "Quanto tempo leva para o adalimumabe fazer efeito?",
        "resposta": "A resposta inicial pode ser percebida em 2–4 semanas, mas a melhora máxima costuma ocorrer em 3–6 meses de tratamento. Não interrompa por falta de resposta precoce — dê o tempo necessário. Se após 6 meses não houver melhora significativa, o reumatologista avaliará trocar para outro biológico."
      },
      {
        "pergunta": "Posso usar adalimumabe com metotrexato?",
        "resposta": "Sim — a combinação é frequente e bem estabelecida na artrite reumatoide. O metotrexato potencializa o efeito do adalimumabe e reduz a formação de anticorpos anti-medicamento (que podem diminuir sua eficácia com o tempo). É necessário monitorar enzimas hepáticas regularmente, pois ambos os medicamentos têm potencial hepatotóxico somado."
      }
    ],
    "descricao_seo": "Adalimumabe (Humira) é um anticorpo monoclonal anti-TNF-α indicado para: artrite reumatoide, psoríase, doença de Crohn, retocolite ulcerativa e espondilite anquilosante. Administrado por injeção subcutânea a cada 2 semanas. Disponível pelo SUS. Efeitos colaterais mais relatados: infecções e reações no local da injeção. Atenção: triagem obrigatória para tuberculose antes de iniciar.",
    "alerta_farmaceutico": "Dispensação especializada. Verificar: (1) Triagem TB realizada e documentada. (2) Não associar com outros biológicos — risco de infecção grave e reações graves. (3) Contraindicado em IC grave (NYHA III/IV). (4) Vacinas vivas contraindicadas. (5) Armazenamento: 2–8°C — verificar cadeia de frio antes de dispensar. Biosimilares disponíveis — verificar indicação e concordância com o prescritor antes de substituição.",
    "quando_procurar_medico": "Procure médico URGENTE se: febre alta (>38,5°C) com calafrios, tosse persistente com expectoração (possível TB reativada), dificuldade para respirar, confusão mental, sinais de infecção grave. Procure em breve: reação intensa no local da injeção que não melhora, nódulos, manchas na pele novas, sintomas neurológicos (formigamento, fraqueza).",
    "interacoes": [
      {
        "com": ["metotrexato"],
        "nivel": "moderado",
        "titulo": "Adalimumabe + Metotrexato (Combinação Frequente — Monitorar Hepatotoxicidade)",
        "efeito": "Combinação amplamente usada na AR — aumenta a eficácia e reduz anticorpos anti-adalimumabe. Porém, hepatotoxicidade pode ser aditiva.",
        "conduta": "⚠️ Monitorar enzimas hepáticas (TGO, TGP) a cada 3 meses. Suplementar ácido fólico conforme prescrito. Evitar álcool."
      },
      {
        "com": ["anakinra","abatacepte","tocilizumabe","rituximabe","certolizumabe","golimumabe","infliximabe","etanercepte","secuquinumabe","ixequizumabe","ustequinumabe"],
        "nivel": "alto",
        "titulo": "Adalimumabe + Outro Biológico (Contraindicado — Risco de Infecção Grave)",
        "efeito": "Imunossupressão excessiva — infecções graves, sepse e morte foram relatados.",
        "conduta": "❌ Contraindicado. Nunca combinar dois biológicos. Respeitar período de washout ao trocar de biológico."
      }
    ]
  };

  const idx = meds.findIndex(m => (m.nome||'').localeCompare(adalimumabe.nome,'pt') > 0);
  if (idx === -1) meds.push(adalimumabe);
  else meds.splice(idx, 0, adalimumabe);
  console.log('✓ Adalimumabe adicionado ao medicamentos.json');
} else {
  console.log('  Adalimumabe já existe');
}

// ══════════════════════════════════════════════════════════════════════════════
// Salvar medicamentos.json
// ══════════════════════════════════════════════════════════════════════════════
fs.writeFileSync(MEDS_PATH, JSON.stringify(meds, null, 2), 'utf-8');
console.log('✓ medicamentos.json salvo (total:', meds.length, ')');

// ══════════════════════════════════════════════════════════════════════════════
// mcMedNomes — adicionar Adalimumabe, Humira e outros ausentes
// ══════════════════════════════════════════════════════════════════════════════
let html = fs.readFileSync(HTML_PATH, 'utf-8');
const lineMatch = html.match(/(const mcMedNomes = \[)(.*?)(\];)/);
let arr = JSON.parse('[' + lineMatch[2] + ']');
let nAdd = 0;

const inserções = [
  { nome: 'Adalimumabe', após: 'Acetilcisteína' },
  { nome: 'Humira',      após: 'Adalimumabe'    },
  { nome: 'Melhoral',    após: 'Metilfenidato'  },
  { nome: 'Vonau',       após: 'Valsartana'     },
  { nome: 'Vonau Flash', após: 'Vonau'          },
  { nome: 'Sinemet',     após: 'Sildenafila'    },
  { nome: 'Prolopa',     após: 'Sinemet'        },
  { nome: 'Durateston',  após: 'Doxiciclina'    },
  { nome: 'Nebido',      após: 'Durateston'     },
];

for (const { nome, após } of inserções) {
  if (arr.some(n => n.toLowerCase() === nome.toLowerCase())) continue;
  const idx = arr.findIndex(n => n.toLowerCase() === após.toLowerCase());
  if (idx === -1) { arr.push(nome); console.log('  mcMedNomes: '+nome+' → final'); }
  else { arr.splice(idx + 1, 0, nome); console.log('  mcMedNomes: '+nome+' → após "'+após+'"'); }
  nAdd++;
}

if (nAdd > 0) {
  html = html.replace(/const mcMedNomes = \[.*?\];/, 'const mcMedNomes = ' + JSON.stringify(arr) + ';');
  fs.writeFileSync(HTML_PATH, html, 'utf-8');
  console.log('✓ mcMedNomes: '+nAdd+' nomes adicionados (total: '+arr.length+')');
}

// ══════════════════════════════════════════════════════════════════════════════
// INTERAÇÕES — mc-interacoes-data-v3.js
// ══════════════════════════════════════════════════════════════════════════════
let raw = fs.readFileSync(INT_PATH, 'utf-8');
const arr1 = JSON.parse(raw.match(/var\s+mcInteracoesDB\s*=\s*(\[[\s\S]*?\]);\s*\n/)[1]);
const allInt = [...arr1];
for (const m of raw.matchAll(/mcInteracoesDB\s*=\s*mcInteracoesDB\.concat\s*\(\s*(\[[\s\S]*?\])\s*\)/g)) {
  allInt.push(...JSON.parse(m[1]));
}
const titulosExistentes = new Set(allInt.map(i => norm(i.titulo||'')));
const jaExiste = t => titulosExistentes.has(norm(t));

const novasInteracoes = [

  // ── ASPIRINA / AAS ─────────────────────────────────────────────────────────
  {
    "med1": ["ácido acetilsalicílico","aas","aspirina","melhoral"],
    "med2": ["warfarina","varfarina","acenocumarol","rivaroxabana","apixabana","dabigatrana","edoxabana"],
    "nivel": "alto",
    "titulo": "AAS + Anticoagulante (Risco Elevado de Hemorragia)",
    "mecanismo": "O AAS inibe irreversivelmente a COX-1 plaquetária, suprimindo a síntese de tromboxano A2 e reduzindo a agregação plaquetária. Combinado com anticoagulantes orais (varfarina ou NOACs), o duplo bloqueio da hemostasia — antiagregação + anticoagulação — multiplica o risco de hemorragia gastrointestinal, intracraniana e em outros sítios. O risco é dose-dependente para o AAS: doses acima de 100 mg/dia associam-se a risco significativamente maior.",
    "efeito": "Risco muito elevado de sangramento grave — hemorragia GI, hematúria, sangramento intracraniano. O risco de sangramento GI é 3–4 vezes maior do que com cada fármaco isolado.",
    "conduta": "⚠️ A combinação é usada em indicações específicas (ex: síndrome coronariana aguda + FA com anticoagulação), sempre com avaliação rigorosa do risco-benefício pelo cardiologista. Fora dessas indicações: EVITAR. Monitorar INR regularmente se usando varfarina. Associar protetor gástrico (IBP) obrigatoriamente quando a combinação é necessária."
  },
  {
    "med1": ["ácido acetilsalicílico","aas","aspirina"],
    "med2": ["ibuprofeno","naproxeno","cetoprofeno"],
    "nivel": "moderado",
    "titulo": "AAS (Dose Baixa) + Ibuprofeno / Naproxeno (Bloqueio Competitivo da COX-1 — Perda do Efeito Antiagregante)",
    "mecanismo": "O efeito antiagregante do AAS em dose baixa (100 mg) depende da acetilação irreversível do sítio ativo da COX-1 plaquetária. AINEs como ibuprofeno e naproxeno se ligam reversivelmente ao mesmo sítio ANTES do AAS — se tomados juntos ou pouco antes — impedindo fisicamente o acesso do AAS à COX-1. Isso impede a acetilação irreversível e elimina o efeito antiagregante do AAS, que é transitório, não cumprindo a proteção cardiovascular esperada.",
    "efeito": "Perda do efeito antiagregante do AAS — especialmente relevante em pacientes com doença coronariana, stent ou AVC prévio que dependem do AAS para prevenção de eventos trombóticos.",
    "conduta": "⚠️ Se necessário usar AINE, tomar o AAS pelo menos 30 minutos ANTES do ibuprofeno/naproxeno — ou preferir paracetamol, que não interfere. Celecoxibe e outros inibidores seletivos de COX-2 não interferem no efeito do AAS. Alertar o paciente sobre esse conflito."
  },
  {
    "med1": ["ácido acetilsalicílico","aas","aspirina"],
    "med2": ["metotrexato"],
    "nivel": "alto",
    "titulo": "AAS + Metotrexato (Elevação da Toxicidade do Metotrexato)",
    "mecanismo": "O AAS compete com o metotrexato pela secreção tubular renal (via transportadores orgânicos OAT1/OAT3), reduzindo a eliminação renal e elevando os níveis séricos do metotrexato. Em doses altas de AAS (analgésicas/anti-inflamatórias) o risco é maior. Em doses antiagregantes baixas (≤100 mg) o impacto clínico é menor mas presente — especialmente em pacientes com função renal reduzida.",
    "efeito": "Acúmulo de metotrexato com risco de toxicidade hematológica (mielossupressão), mucosa (mucosite) e renal — mesmo em doses baixas de metotrexato para artrite.",
    "conduta": "⚠️ Monitorar hemograma e função renal regularmente. Informar ao reumatologista se usar AAS além da dose antiagregante habitual. Dose baixa de AAS (100 mg/dia) em pacientes estáveis em metotrexato semanal costuma ser razoável com monitoramento."
  },

  // ── ONDANSETRONA ───────────────────────────────────────────────────────────
  {
    "med1": ["ondansetrona","vonau","vonau flash","zofran"],
    "med2": ["amiodarona","ancoron","sotalol","haloperidol","haldol","clorpromazina","droperidol","azitromicina","ciprofloxacino","levofloxacino","fluconazol","citalopram","escitalopram","metadona"],
    "nivel": "alto",
    "titulo": "Ondansetrona + Fármacos que Prolongam o QT (Risco de Torsades de Pointes)",
    "mecanismo": "A ondansetrona bloqueia receptores 5-HT3 mas também inibe canais de potássio hERG, prolongando o intervalo QTc de forma dose-dependente — mais relevante com doses altas (IV > 32 mg dose única, ou ≥ 32 mg/dia oral). Combinada com outros fármacos que prolongam o QT (antiarrítmicos, antipsicóticos, antibióticos, antidepressivos), o prolongamento se soma, elevando o risco de taquicardia ventricular polimórfica (torsades de pointes — TdP), que pode degenerar em fibrilação ventricular.",
    "efeito": "Prolongamento do QTc com risco de arritmia ventricular grave (torsades de pointes) e morte súbita cardíaca.",
    "conduta": "⚠️ Monitorar o ECG (QTc) ao combinar ondansetrona com outros fármacos que prolongam o QT. Limitar a dose máxima de ondansetrona IV a 16 mg por dose (e 32 mg/dia). Corrigir hipocalemia e hipomagnesemia antes de administrar. Evitar a associação em pacientes com QTc basal > 500 ms ou síndrome do QT longo congênito."
  },
  {
    "med1": ["ondansetrona","vonau","zofran"],
    "med2": ["tramadol","tramal"],
    "nivel": "moderado",
    "titulo": "Ondansetrona + Tramadol (Redução do Efeito Analgésico do Tramadol)",
    "mecanismo": "O tramadol exerce parte de seu efeito analgésico através de mecanismo serotoninérgico, incluindo agonismo indireto em receptores 5-HT3. A ondansetrona, sendo antagonista 5-HT3, bloqueia essa via e pode reduzir o componente analgésico serotonérgico do tramadol. Estudos clínicos demonstraram redução de 30–50% na eficácia analgésica do tramadol quando co-administrado com ondansetrona.",
    "efeito": "Redução significativa do efeito analgésico do tramadol — o paciente pode necessitar de doses maiores ou de analgésico alternativo para controle adequado da dor.",
    "conduta": "⚠️ Evitar a combinação em pacientes que precisam de analgesia com tramadol. Preferir analgésicos sem componente 5-HT3 (paracetamol, dipirona, opioides puros) quando ondansetrona for necessária. Se ambos forem usados, monitorar eficácia analgésica e considerar aumentar dose do tramadol ou trocar o analgésico."
  },
  {
    "med1": ["ondansetrona","vonau","zofran"],
    "med2": ["sertralina","fluoxetina","paroxetina","escitalopram","citalopram","venlafaxina","duloxetina"],
    "nivel": "moderado",
    "titulo": "Ondansetrona + ISRS / IRSN (Síndrome Serotoninérgica — Risco Baixo mas Presente)",
    "mecanismo": "Paradoxalmente, embora a ondansetrona bloqueie receptores 5-HT3, o bloqueio desse subtipo em neurônios inibitórios pode, em alguns casos, aumentar a atividade serotoninérgica líquida em outras vias. Associada a antidepressivos que aumentam a serotonina sináptica (ISRS, IRSN), há relatos de síndrome serotoninérgica leve a moderada — embora o risco seja menor do que com outros antiemético (metoclopramida, por exemplo).",
    "efeito": "Síndrome serotoninérgica leve: agitação, tremores, hiperreflexia, diarreia e sudorese excessiva. Em casos raros, síndrome mais grave.",
    "conduta": "⚠️ Monitorar sinais de síndrome serotoninérgica ao usar a combinação: agitação súbita, tremor, diarreia, sudorese ou temperatura elevada. Se sintomas surgirem, suspender e buscar avaliação médica. O risco aumenta com doses altas de ondansetrona IV."
  },

  // ── LEVODOPA (adicionais — já tem 4 blocos) ────────────────────────────────
  {
    "med1": ["levodopa","carbidopa + levodopa","sinemet","prolopa","levodopa + benserazida"],
    "med2": ["fenelzina","tranilcipromina","isocarboxazida"],
    "nivel": "alto",
    "titulo": "Levodopa + IMAO Não Seletivo (Crise Hipertensiva Grave — Contraindicado)",
    "mecanismo": "IMAOs não seletivos (fenelzina, tranilcipromina) inibem a monoaminoxidase A e B, bloqueando a degradação de dopamina, norepinefrina e serotonina. A levodopa aumenta a disponibilidade de dopamina e seus precursores. A combinação causa acúmulo maciço de catecolaminas — levando a crise hipertensiva grave, taquiarritmias e risco de hemorragia intracraniana.",
    "efeito": "Crise hipertensiva (PA diastólica >120 mmHg), taquiarritmia, dor de cabeça excruciante, sudorese intensa e risco de AVC hemorrágico.",
    "conduta": "❌ CONTRAINDICADO. Suspender o IMAO não seletivo pelo menos 14 dias antes de iniciar a levodopa. Selegilina e rasagilina (IMAOs seletivos-B, usados no próprio Parkinson) podem ser combinados com cautela e sob protocolo específico. Safinamida tem perfil de interação diferente — verificar com o neurologista."
  },
  {
    "med1": ["levodopa","carbidopa + levodopa","sinemet","prolopa"],
    "med2": ["sulfato ferroso","fumarato ferroso","gluconato ferroso","ferro polimaltosado"],
    "nivel": "moderado",
    "titulo": "Levodopa + Ferro Oral (Redução Significativa da Absorção)",
    "mecanismo": "Íons de ferro (Fe²⁺ e Fe³⁺) formam quelatos insolúveis com a levodopa no trato gastrointestinal, reduzindo sua absorção em até 50%. O efeito é dose-dependente da quantidade de ferro e da proximidade temporal entre as administrações. A carbidopa sofre a mesma quelação.",
    "efeito": "Redução de até 50% na biodisponibilidade da levodopa — piora do controle dos sintomas de Parkinson, com retorno de tremor, rigidez e bradicinesia.",
    "conduta": "⚠️ Separar a administração de levodopa e ferro oral por pelo menos 2 horas (ferro primeiro, levodopa depois; ou levodopa primeiro e ferro 2h depois). Se ferro for imprescindível, monitorar o controle do Parkinson e considerar ajuste de dose com o neurologista."
  },

  // ── ADALIMUMABE (adicionais — já tem blocos para anti-TNF genérico) ─────────
  {
    "med1": ["adalimumabe","humira"],
    "med2": ["metotrexato"],
    "nivel": "moderado",
    "titulo": "Adalimumabe + Metotrexato (Combinação Sinérgica — Monitorar Hepatotoxicidade)",
    "mecanismo": "A combinação de adalimumabe com metotrexato é a estratégia padrão em artrite reumatoide moderada a grave — o metotrexato reduz a imunogenicidade (formação de anticorpos anti-adalimumabe) e potencializa o efeito terapêutico. No entanto, ambos têm potencial hepatotóxico: o metotrexato causa lesão hepática cumulativa e o adalimumabe pode elevar enzimas hepáticas independentemente. A imunossupressão combinada também eleva o risco infeccioso.",
    "efeito": "Hepatotoxicidade aditiva (elevação de TGO/TGP, raramente fibrose hepática com metotrexato prolongado) e imunossupressão aumentada com maior suscetibilidade a infecções.",
    "conduta": "⚠️ Monitorar enzimas hepáticas (TGO, TGP, fosfatase alcalina) a cada 1–3 meses. Suplementar ácido fólico (5–10 mg/semana) para reduzir toxicidade do metotrexato. Evitar álcool. Rastrear e tratar TB latente antes de iniciar a combinação. Vacinas inativadas em dia."
  },
  {
    "med1": ["adalimumabe","humira","infliximabe","etanercepte","certolizumabe","golimumabe"],
    "med2": ["prednisolona","prednisona","metilprednisolona","dexametasona","budesonida"],
    "nivel": "moderado",
    "titulo": "Anti-TNF + Corticóide Sistêmico (Imunossupressão Cumulativa — Infecções e TB)",
    "mecanismo": "Biológicos anti-TNF e corticóides sistêmicos têm efeitos imunossupressores distintos mas complementares — anti-TNF bloqueando a via do TNF-α e corticóides suprimindo amplamente a imunidade celular e humoral. A combinação eleva substancialmente o risco de infecções oportunistas (tuberculose, pneumocistose, fungos invasivos, infecções bacterianas graves).",
    "efeito": "Risco aumentado de infecções graves e oportunistas — especialmente tuberculose, pneumonia por Pneumocystis jirovecii e fungos invasivos.",
    "conduta": "⚠️ Usar a menor dose de corticóide pelo menor tempo possível. Manter triagem e profilaxia para TB em dia. Considerar profilaxia para Pneumocystis em uso prolongado de doses imunossupressoras de corticóide. Monitorar sinais de infecção ativamente."
  }

];

const paraAdicionar = novasInteracoes.filter(i => !jaExiste(i.titulo));
const pulados       = novasInteracoes.filter(i => jaExiste(i.titulo));

if (pulados.length) {
  console.log('\nInterações já existentes (puladas):');
  pulados.forEach(i => console.log('  - '+i.titulo));
}

console.log('\nInterações a adicionar:');
paraAdicionar.forEach(i => console.log('  + '+i.titulo));

if (paraAdicionar.length > 0) {
  const novoBloco = '\n\nmcInteracoesDB = mcInteracoesDB.concat(' +
    JSON.stringify(paraAdicionar, null, 2) + ');\n';
  const markerAux = '\nvar mcIECAnomes';
  const posAux = raw.indexOf(markerAux);
  if (posAux === -1) { console.error('Marcador não encontrado'); process.exit(1); }
  raw = raw.slice(0, posAux) + novoBloco + raw.slice(posAux);
  fs.writeFileSync(INT_PATH, raw, 'utf-8');
  console.log('\n✓ ' + paraAdicionar.length + ' interações adicionadas ao mc-interacoes-data-v3.js');
}
