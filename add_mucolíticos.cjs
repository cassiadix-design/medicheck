// Adiciona Acebrofilina ao medicamentos.json,
// interação Acetilcisteína + Antibióticos ao mc-interacoes-data-v3.js,
// e 11 nomes ao mcMedNomes do index.html
const fs = require('fs');
const path = require('path');

const MEDS_PATH = path.join(__dirname, 'medicamentos.json');
const INT_PATH  = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');
const HTML_PATH = path.join(__dirname, 'index.html');

// ─── 1. Acebrofilina → medicamentos.json ─────────────────────────────────────
const meds = JSON.parse(fs.readFileSync(MEDS_PATH, 'utf-8'));

if (meds.some(m => (m.generico||'').toLowerCase().includes('acebrofilina'))) {
  console.log('Acebrofilina já existe em medicamentos.json — pulando.');
} else {
  const acebrofilina = {
    "nome": "Acebrofilina (Acebrox) — Xantina + Mucolítico",
    "generico": "Acebrofilina",
    "tipo": "Broncodilatador Xantínico + Mucolítico",
    "descricao": "Acebrofilina é um derivado da xantina (estrutura relacionada à teofilina) com dupla ação: broncodilatadora (relaxamento do músculo liso brônquico por inibição da fosfodiesterase) e mucolítica/expectorante (fluidifica o muco brônquico facilitando a eliminação). Indicada no tratamento sintomático de bronquite crônica, DPOC e condições respiratórias com hipersecreção brônquica.",
    "receita": "Sim",
    "receita_nota": "Prescrição médica obrigatória.",
    "efeitos": "Náusea, vômito, dor abdominal, diarreia, palpitações, taquicardia, cefaleia, insônia, tremores leves (efeitos xantínicos). Em doses elevadas: arritmias, convulsões.",
    "aviso_grave": "Por conter estrutura xantínica semelhante à teofilina, tem janela terapêutica estreita. Risco de toxicidade com superdosagem: arritmias graves, convulsões e hipotensão. Macrolídeos e fluoroquinolonas podem elevar seus níveis. Evitar em pacientes com arritmias não controladas.",
    "recomendacao": "⚠️ Informar médico sobre todos os medicamentos em uso — especialmente antibióticos e antiepilépticos. Não aumentar a dose por conta própria. Tomar com alimento para reduzir irritação gástrica.",
    "educacao": "Tomar sempre com alimento para reduzir o desconforto gástrico. Evitar cafeína em excesso durante o tratamento (soma-se ao efeito estimulante). Não suspender abruptamente sem orientação médica.",
    "resposta_rapida": [
      "Broncodilatador + mucolítico para bronquite e DPOC",
      "Tomar com alimento para reduzir náusea",
      "Evitar excesso de cafeína",
      "Informar médico se usar antibiótico junto"
    ],
    "sinonimos": ["acebrox", "acebrofiline", "acebrofilina xantina"],
    "classe_receita": "TARJADO_PRATICA",
    "receita_display": "🔴 Receita Simples",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_cor": "vermelho",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      {
        "pergunta": "Para que serve a acebrofilina?",
        "resposta": "Acebrofilina é usada para aliviar sintomas respiratórios de bronquite crônica e DPOC: tosse com catarro difícil de eliminar e falta de ar. Age de duas formas: dilata os brônquios (broncodilatador) e fluidifica o muco (mucolítico), facilitando a expectoração."
      },
      {
        "pergunta": "Acebrofilina pode causar palpitações?",
        "resposta": "Sim. Por ser um derivado xantínico (mesma família da teofilina), pode causar palpitações, taquicardia e tremores — especialmente em doses altas ou em pessoas sensíveis a estimulantes. Informe seu médico se sentir coração acelerado ou irregular."
      },
      {
        "pergunta": "Posso tomar acebrofilina com café ou chá?",
        "resposta": "Com moderação. Café, chá e guaraná contêm cafeína — também uma xantina — e podem somar-se ao efeito estimulante da acebrofilina, aumentando o risco de palpitações, insônia e tremores. Prefira limitar o consumo durante o tratamento."
      },
      {
        "pergunta": "Acebrofilina pode ser tomada com antibiótico?",
        "resposta": "Depende do antibiótico. Macrolídeos (eritromicina, claritromicina) e fluoroquinolonas (ciprofloxacino) podem aumentar os níveis de xantinas no sangue, elevando o risco de toxicidade. Sempre informe o médico que prescreve o antibiótico que você está usando acebrofilina."
      },
      {
        "pergunta": "Como tomar a acebrofilina para fazer mais efeito?",
        "resposta": "Tome no horário prescrito, sempre com alimento para reduzir o desconforto gástrico. Beba bastante água ao longo do dia — a hidratação ajuda a fluidificar o muco e potencializa o efeito mucolítico. Não aumente a dose por conta própria."
      },
      {
        "pergunta": "Acebrofilina pode ser usada na gravidez?",
        "resposta": "Não há dados suficientes de segurança na gravidez. Xantinas atravessam a placenta e podem causar taquicardia e irritabilidade no recém-nascido se usadas próximo ao parto. Use somente com orientação médica e se o benefício superar o risco."
      },
      {
        "pergunta": "Qual a diferença entre acebrofilina, ambroxol e acetilcisteína?",
        "resposta": "Ambroxol e acetilcisteína são mucolíticos puros — só fluidificam o muco. Acebrofilina tem ação dupla: além de fluidificar o muco, é broncodilatadora (dilata os brônquios). Por isso é mais indicada quando há tanto secreção quanto broncoespasmo associados."
      },
      {
        "pergunta": "Posso parar de usar acebrofilina quando a tosse melhorar?",
        "resposta": "Siga o tempo prescrito pelo médico. Em quadros agudos, o tratamento costuma durar 7–14 dias. Em DPOC e bronquite crônica, o uso pode ser mais prolongado. Não suspenda abruptamente sem orientação, pois os sintomas podem retornar."
      }
    ],
    "descricao_seo": "Acebrofilina (Acebrox) é um medicamento broncodilatador e mucolítico derivado das xantinas. Indicado para: bronquite crônica, DPOC e condições respiratórias com hipersecreção brônquica. Efeitos colaterais mais relatados: náusea, palpitações, cefaleia, insônia. Atenção: por ter estrutura xantínica, pode interagir com antibióticos macrolídeos e fluoroquinolonas. Acebrofilina é vendida somente com receita médica.",
    "alerta_farmaceutico": "Atenção no balcão: por ser derivado xantínico, acebrofilina tem perfil de interações semelhante à teofilina. Macrolídeos (eritromicina, claritromicina) e fluoroquinolonas (ciprofloxacino, norfloxacino) inibem o metabolismo — risco de acúmulo e toxicidade. Questionar paciente sobre uso de antibióticos antes de dispensar.",
    "quando_procurar_medico": "Procure médico se: coração acelerado ou irregular persistente, tremores intensos, vômitos que não cessam, confusão mental, convulsões, piora da falta de ar, ou febre durante o tratamento.",
    "interacoes": [
      {
        "com": ["eritromicina", "claritromicina", "azitromicina"],
        "nivel": "moderado",
        "titulo": "Acebrofilina + Macrolídeo (Elevação dos Níveis Xantínicos)",
        "efeito": "Macrolídeos inibem o metabolismo hepático (CYP1A2) de xantinas — risco de acúmulo, palpitações e toxicidade.",
        "conduta": "⚠️ Monitorar sinais de toxicidade xantínica (palpitações, tremores, vômito). Considerar redução de dose com macrolídeos de uso prolongado."
      },
      {
        "com": ["ciprofloxacino", "norfloxacino", "levofloxacino"],
        "nivel": "moderado",
        "titulo": "Acebrofilina + Fluoroquinolona (Inibição CYP1A2 — Toxicidade Xantínica)",
        "efeito": "Fluoroquinolonas inibem CYP1A2 e elevam níveis de xantinas — taquicardia, insônia, convulsões em casos graves.",
        "conduta": "⚠️ Monitorar sinais de toxicidade. Ciprofloxacino tem maior impacto que levofloxacino. Informar médico que prescreveu o antibiótico."
      }
    ]
  };

  meds.push(acebrofilina);
  fs.writeFileSync(MEDS_PATH, JSON.stringify(meds, null, 2), 'utf-8');
  console.log('✓ Acebrofilina adicionada ao medicamentos.json');
}

// ─── 2. Acetilcisteína + Antibióticos → mc-interacoes-data-v3.js ─────────────
let raw = fs.readFileSync(INT_PATH, 'utf-8');

if (raw.includes('Acetilcisteína + Antibiótico') || raw.includes('N-Acetilcisteína.*Antibiótico')) {
  console.log('Interação Acetilcisteína + Antibióticos já existe — pulando.');
} else {
  const novaInteracao = [
    {
      "med1": ["acetilcisteína", "n-acetilcisteína", "nac", "fluimucil"],
      "med2": ["amoxicilina", "cefalexina", "cefuroxima", "ampicilina", "eritromicina", "tetraciclina", "doxiciclina", "ciprofloxacino", "norfloxacino"],
      "nivel": "moderado",
      "titulo": "Acetilcisteína (NAC) + Antibióticos Orais (Separar Administração em 2 Horas)",
      "mecanismo": "A acetilcisteína possui grupos sulfidrila reativos que podem quelar íons metálicos e formar complexos com alguns antibióticos, reduzindo sua absorção oral. O impacto é mais relevante com aminopenicilinas (amoxicilina, ampicilina), cefalosporinas e tetraciclinas. Além disso, o ambiente ácido criado pela NAC pode afetar a estabilidade de alguns antibióticos no trato GI.",
      "efeito": "Redução potencial da biodisponibilidade do antibiótico oral — menor concentração sérica e menor eficácia terapêutica. O impacto clínico varia por antibiótico e forma de administração.",
      "conduta": "⚠️ Separar a administração de acetilcisteína e antibióticos orais por pelo menos 2 horas. Preferir tomar o antibiótico primeiro; aguardar 2h antes de tomar a NAC. Esta separação não é necessária para antibióticos injetáveis (IV/IM). Não suspender nenhum dos dois sem orientação médica."
    }
  ];

  const novoBloco = '\n\nmcInteracoesDB = mcInteracoesDB.concat(' +
    JSON.stringify(novaInteracao, null, 2) +
    ');\n';

  const markerAux = '\nvar mcIECAnomes';
  const posAux = raw.indexOf(markerAux);
  if (posAux === -1) {
    console.error('Marcador auxiliar não encontrado — abortando.');
    process.exit(1);
  }

  raw = raw.slice(0, posAux) + novoBloco + raw.slice(posAux);
  fs.writeFileSync(INT_PATH, raw, 'utf-8');
  console.log('✓ Acetilcisteína + Antibióticos adicionada ao mc-interacoes-data-v3.js');
}

// ─── 3. mcMedNomes → index.html ───────────────────────────────────────────────
let html = fs.readFileSync(HTML_PATH, 'utf-8');
const lineMatch = html.match(/(const mcMedNomes = \[)(.*?)(\];)/);
if (!lineMatch) {
  console.error('mcMedNomes não encontrado no index.html');
  process.exit(1);
}

let arr = JSON.parse('[' + lineMatch[2] + ']');
const antes = arr.length;

// Nomes a adicionar com posição de inserção preferida (após qual nome)
const inserções = [
  // Acebrofilina: inserir em ordem alfabética (antes de Acetilcisteína)
  { nome: 'Acebrofilina', após: 'Acetazolamida' },
  { nome: 'Acebrox',      após: 'Acebrofilina'  },
  // Acetilcisteína já existe; adicionar aliases logo depois
  { nome: 'Fluimucil',    após: 'Acetilcisteína' },
  { nome: 'NAC',          após: 'Fluimucil'      },
  // Ambroxol já existe; adicionar aliases logo depois
  { nome: 'Mucosolvan',   após: 'Ambroxol'       },
  { nome: 'Ambrox',       após: 'Mucosolvan'     },
  // Carbocisteína e aliases: inserir após Bupropiona (seção C)
  { nome: 'Carbocisteína', após: 'Carvedilol'    },
  { nome: 'Mucodyne',      após: 'Carbocisteína' },
  { nome: 'Carbotoss',     após: 'Mucodyne'      },
  { nome: 'Lisomucil',     após: 'Carbotoss'     },
  // N-Acetilcisteína: inserir após NAC
  { nome: 'N-Acetilcisteína', após: 'NAC'        },
];

let adicionados = 0;
for (const { nome, após } of inserções) {
  if (arr.some(n => n.toLowerCase() === nome.toLowerCase())) {
    console.log(`  ${nome}: já existe`);
    continue;
  }
  const idx = arr.findIndex(n => n.toLowerCase() === após.toLowerCase());
  if (idx === -1) {
    // fallback: append
    arr.push(nome);
    console.log(`  ${nome}: adicionado no final (âncora "${após}" não encontrada)`);
  } else {
    arr.splice(idx + 1, 0, nome);
    console.log(`  ${nome}: inserido após "${após}"`);
  }
  adicionados++;
}

if (adicionados > 0) {
  const novaLinha = 'const mcMedNomes = ' + JSON.stringify(arr) + ';';
  html = html.replace(/const mcMedNomes = \[.*?\];/, novaLinha);
  fs.writeFileSync(HTML_PATH, html, 'utf-8');
  console.log(`✓ ${adicionados} nomes adicionados ao mcMedNomes (total: ${arr.length})`);
} else {
  console.log('Nenhum nome novo para adicionar ao mcMedNomes.');
}
