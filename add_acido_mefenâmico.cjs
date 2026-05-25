// Adiciona Ácido Mefenâmico ao medicamentos.json, mc-interacoes-data-v3.js e mcMedNomes
const fs   = require('fs');
const path = require('path');

const MEDS_PATH = path.join(__dirname, 'medicamentos.json');
const INT_PATH  = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');
const HTML_PATH = path.join(__dirname, 'public', 'index.html');

// ─── 1. medicamentos.json ─────────────────────────────────────────────────────
const meds = JSON.parse(fs.readFileSync(MEDS_PATH, 'utf-8'));

if (meds.some(m => (m.generico || '').toLowerCase().includes('mefenâmico'))) {
  console.log('Ácido Mefenâmico já existe — pulando medicamentos.json');
} else {
  const acidoMefenanico = {
    "nome": "Ácido Mefenâmico (Ponstan) — Anti-inflamatório",
    "generico": "Ácido Mefenâmico",
    "tipo": "Anti-inflamatório Não Esteroide (AINE) — Ácido Fenâmico",
    "descricao": "Ácido mefenâmico é um anti-inflamatório não esteroide (AINE) da classe dos ácidos fenâmicos. É utilizado principalmente no alívio da dismenorreia primária (cólica menstrual intensa), dores de intensidade leve a moderada (cefaleia, dor dentária, musculoesquelética) e processos inflamatórios agudos. Age inibindo as enzimas COX-1 e COX-2, reduzindo a síntese de prostaglandinas responsáveis pela dor e inflamação. O início de ação ocorre em 30–60 minutos, com duração de 6–8 horas.",
    "receita": "Sim",
    "receita_nota": "Exige prescrição médica. A receita geralmente não é retida na farmácia.",
    "efeitos": "Os efeitos mais comuns são gastrointestinais: náusea, dor abdominal, diarreia, azia e dispepsia. Com uso prolongado, pode causar úlcera gástrica e sangramento. Outros efeitos incluem cefaleia, tontura e retenção de líquidos. Em casos raros, pode ocorrer anemia hemolítica (Coombs positiva) — característica específica do ácido mefenâmico entre os AINEs.",
    "aviso_grave": "Não usar em pacientes com histórico de úlcera gástrica ativa, insuficiência renal ou hepática grave, ou hipersensibilidade a AINEs. Evitar no terceiro trimestre da gravidez (risco ao feto). O uso concomitante com anticoagulantes (varfarina) é de alto risco — pode causar sangramento grave. Atenção especial em pacientes em uso de lítio ou anti-hipertensivos. Interromper imediatamente se houver fezes escuras, vômito com sangue, ou sinais de reação alérgica grave.",
    "recomendacao": "☎️ LIGUE SAMU (192) se houver fezes escuras ou com sangue, vômito com aspecto de borra de café, dificuldade para respirar, inchaço no rosto ou garganta, ou dor abdominal muito intensa.",
    "educacao": "Tome sempre após as refeições para reduzir a irritação gástrica. Não use por mais de 7 dias consecutivos sem orientação médica. Na cólica menstrual, o melhor resultado é iniciar o tratamento logo ao aparecer os primeiros sintomas — não espere a dor se instalar. Evite associar com outros AINEs, aspirina ou álcool.",
    "resposta_rapida": [
      "AINE para cólica menstrual e dores leves/moderadas",
      "Tome após as refeições para proteger o estômago",
      "Não usar com anticoagulantes (risco de sangramento)",
      "Evitar no terceiro trimestre da gravidez",
      "Uso máximo: 7 dias sem orientação médica"
    ],
    "sinonimos": ["ponstan", "ponstil", "mefenamic acid", "acido mefenanico"],
    "classe_receita": "TARJADO_PRATICA",
    "receita_display": "🔴 Receita Simples",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_cor": "vermelho",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      {
        "pergunta": "Para que serve o ácido mefenâmico?",
        "resposta": "O ácido mefenâmico (Ponstan) é usado principalmente para tratar cólica menstrual intensa (dismenorreia primária) e dores de intensidade leve a moderada, como dor de cabeça, dor de dente e dores musculares. Também é usado em processos inflamatórios agudos de curta duração."
      },
      {
        "pergunta": "Qual a diferença entre ácido mefenâmico e ibuprofeno?",
        "resposta": "Ambos são AINEs e aliviam dor e inflamação, mas pertencem a classes químicas diferentes. O ácido mefenâmico também tem leve efeito antiprostaglandina uterino, tornando-o especialmente útil na cólica menstrual. O ibuprofeno é mais amplamente estudado e tem perfil de segurança melhor documentado para uso prolongado. O ácido mefenâmico é geralmente reservado para ciclos curtos de até 7 dias."
      },
      {
        "pergunta": "Posso tomar ácido mefenâmico em jejum?",
        "resposta": "Não é recomendado. O ácido mefenâmico pode irritar bastante a mucosa gástrica. Tome sempre após as refeições ou com leite para reduzir o risco de náusea, azia e úlcera."
      },
      {
        "pergunta": "Ácido mefenâmico pode ser tomado durante a menstruação todos os meses?",
        "resposta": "Sim, pode ser usado ciclicamente para cólica menstrual intensa, sempre por ciclos curtos (máximo 3 dias por ciclo). Iniciar o uso logo ao surgirem os primeiros sintomas melhora muito a eficácia. Se precisar usar todo mês, converse com o médico para investigar a causa da dismenorreia."
      },
      {
        "pergunta": "Ácido mefenâmico pode causar sonolência?",
        "resposta": "É possível, mas não é o efeito mais comum. Tontura e cefaleia são mais frequentes. Se sentir sonolência intensa, evite dirigir ou operar máquinas durante o uso."
      },
      {
        "pergunta": "Posso tomar ácido mefenâmico com anticoagulante (Warfarina/Marevan)?",
        "resposta": "Não — esta combinação é de alto risco. O ácido mefenâmico potencializa muito o efeito anticoagulante da varfarina, podendo causar sangramentos graves. Se você usa anticoagulante oral, consulte o médico antes de tomar qualquer AINE. Paracetamol é geralmente a alternativa mais segura para dor nesse caso."
      },
      {
        "pergunta": "Pode tomar ácido mefenâmico na gravidez?",
        "resposta": "Deve ser evitado, especialmente no terceiro trimestre, pois pode causar fechamento prematuro do ducto arterioso no feto e comprometer a função renal fetal. No primeiro e segundo trimestres, o uso deve ser restrito e sempre com orientação médica."
      },
      {
        "pergunta": "Qual a dose correta de ácido mefenâmico?",
        "resposta": "A dose habitual é 500 mg a cada 8 horas (3x ao dia), sempre após as refeições. Para cólica menstrual, iniciar no aparecimento dos sintomas e manter por até 3 dias. Para outras dores, não exceder 7 dias sem orientação médica. A dose máxima diária é 1.500 mg."
      },
      {
        "pergunta": "O que é Ponstan?",
        "resposta": "Ponstan é o nome comercial mais conhecido do ácido mefenâmico no Brasil. Existem outros genéricos e similares com o mesmo princípio ativo. A eficácia é equivalente entre o original e os genéricos, pois contêm a mesma substância ativa."
      }
    ],
    "descricao_seo": "Ácido Mefenâmico (Ponstan) é um anti-inflamatório não esteroide (AINE) indicado principalmente para: cólica menstrual (dismenorreia primária), dor de cabeça, dor dentária e dores musculares leves a moderadas. Efeitos colaterais mais relatados: náusea, dor abdominal, diarreia e azia. Atenção: não use com anticoagulantes (varfarina) — risco de sangramento grave. Evitar no terceiro trimestre da gravidez. Ácido mefenâmico é vendido com receita médica simples (não retida).",
    "alerta_farmaceutico": "Atenção no balcão: paciente em uso de varfarina, acenocumarol ou NOACs não deve usar ácido mefenâmico — potencializa anticoagulação e risco de sangramento GI grave. Também interagem: lítio (elevação sérica → toxicidade), IECA/BRA/diuréticos (redução do efeito anti-hipertensivo e risco renal). Questionar sobre anticoagulantes, lítio e medicamentos para pressão antes de dispensar.",
    "quando_procurar_medico": "Procure médico se: fezes escuras ou com sangue, vômito com sangue ou aspecto de borra de café, dor abdominal intensa, inchaço nos pés ou pernas, tontura intensa, reação alérgica (urticária, inchaço facial, dificuldade para respirar), ou se os sintomas não melhorarem em 3–5 dias.",
    "interacoes": [
      {
        "com": ["varfarina", "warfarina", "acenocumarol", "rivaroxabana", "apixabana", "dabigatrana", "edoxabana"],
        "nivel": "alto",
        "titulo": "Ácido Mefenâmico + Anticoagulante (Risco Elevado de Sangramento)",
        "efeito": "AINEs inibem a agregação plaquetária e podem causar erosão gástrica, potencializando o sangramento em pacientes anticoagulados. O risco de hemorragia gastrointestinal grave aumenta significativamente.",
        "conduta": "❌ Evitar combinação. Usar paracetamol para analgesia em pacientes anticoagulados. Se AINE for indispensável, monitorar INR rigorosamente e considerar protetor gástrico (IBP)."
      },
      {
        "com": ["lítio", "carbonato de lítio"],
        "nivel": "moderado",
        "titulo": "Ácido Mefenâmico + Lítio (Elevação do Nível Sérico)",
        "efeito": "AINEs reduzem a excreção renal de lítio por inibição das prostaglandinas renais, elevando os níveis séricos e o risco de toxicidade pelo lítio (tremores, confusão, convulsões, arritmias).",
        "conduta": "⚠️ Monitorar nível sérico de lítio ao iniciar, alterar dose ou suspender o AINE. Alertar o paciente sobre sintomas de toxicidade. Paracetamol é alternativa mais segura para analgesia."
      },
      {
        "com": ["enalapril", "captopril", "lisinopril", "ramipril", "losartana", "valsartana", "amlodipino", "anlodipino", "hidroclorotiazida", "furosemida", "espironolactona"],
        "nivel": "moderado",
        "titulo": "Ácido Mefenâmico + Anti-hipertensivo (Redução do Efeito)",
        "efeito": "AINEs inibem prostaglandinas vasodilatadoras renais, reduzindo o efeito dos anti-hipertensivos (especialmente IECA, BRA e diuréticos) e podendo elevar a pressão arterial. Também aumenta o risco de lesão renal aguda (especialmente a tríade IECA/AINE/diurético).",
        "conduta": "⚠️ Monitorar pressão arterial. Usar a menor dose eficaz pelo menor tempo possível. Evitar a tríade IECA + AINE + diurético (nefrotoxicidade). Preferir paracetamol para analgesia em hipertensos."
      }
    ]
  };

  // Inserir em posição alfabética pelo nome
  const idx = meds.findIndex(m =>
    (m.nome || '').localeCompare(acidoMefenanico.nome, 'pt') > 0
  );
  if (idx === -1) meds.push(acidoMefenanico);
  else meds.splice(idx, 0, acidoMefenanico);

  fs.writeFileSync(MEDS_PATH, JSON.stringify(meds, null, 2), 'utf-8');
  console.log('✓ Ácido Mefenâmico adicionado ao medicamentos.json (total:', meds.length, ')');
}

// ─── 2. mc-interacoes-data-v3.js ──────────────────────────────────────────────
let raw = fs.readFileSync(INT_PATH, 'utf-8');

if (raw.toLowerCase().includes('mefenâmico')) {
  console.log('Interações do Ácido Mefenâmico já existem — pulando');
} else {
  const novasInteracoes = [
    {
      "med1": ["ácido mefenâmico", "acido mefenanico", "ponstan", "ponstil"],
      "med2": ["varfarina", "warfarina", "acenocumarol", "rivaroxabana", "apixabana", "dabigatrana", "edoxabana"],
      "nivel": "alto",
      "titulo": "Ácido Mefenâmico + Anticoagulante (Risco Elevado de Sangramento)",
      "mecanismo": "AINEs inibem a agregação plaquetária via COX-1 (reduzindo tromboxano A2) e lesam a mucosa gástrica, aumentando o risco de hemorragia em pacientes anticoagulados. O ácido mefenâmico também pode deslocar a varfarina de proteínas plasmáticas, elevando a fração livre e o efeito anticoagulante.",
      "efeito": "Risco elevado de hemorragia gastrointestinal grave, sangramento em mucosas e, em casos extremos, hemorragia intracraniana.",
      "conduta": "❌ Evitar combinação. Para analgesia em pacientes anticoagulados, preferir paracetamol. Se o AINE for indispensável, monitorar INR com frequência e associar protetor gástrico (IBP). Orientar o paciente a relatar qualquer sinal de sangramento."
    },
    {
      "med1": ["ácido mefenâmico", "acido mefenanico", "ponstan", "ponstil"],
      "med2": ["lítio", "carbonato de lítio"],
      "nivel": "moderado",
      "titulo": "Ácido Mefenâmico + Lítio (Elevação do Nível Sérico)",
      "mecanismo": "AINEs inibem a síntese de prostaglandinas renais (especialmente PGE2), que regulam a excreção de sódio e lítio. Com a redução das prostaglandinas, a reabsorção renal de lítio aumenta, elevando os níveis séricos até 25–50% acima do basal.",
      "efeito": "Elevação do nível sérico de lítio com risco de toxicidade: tremores finos progredindo para grosseiros, confusão mental, ataxia, vômitos, arritmias e convulsões em casos graves.",
      "conduta": "⚠️ Monitorar litemia ao iniciar, alterar dose ou suspender o AINE. Alertar o paciente sobre sintomas de toxicidade pelo lítio. Paracetamol é alternativa mais segura para analgesia. Se necessário usar AINE, ajustar dose de lítio com acompanhamento psiquiátrico."
    },
    {
      "med1": ["ácido mefenâmico", "acido mefenanico", "ponstan", "ponstil"],
      "med2": ["enalapril", "captopril", "lisinopril", "ramipril", "losartana", "valsartana", "irbesartana", "olmesartana", "amlodipino", "anlodipino", "hidroclorotiazida", "furosemida", "espironolactona", "atenolol", "propranolol", "metoprolol"],
      "nivel": "moderado",
      "titulo": "Ácido Mefenâmico + Anti-hipertensivo (Redução do Efeito e Risco Renal)",
      "mecanismo": "AINEs inibem prostaglandinas vasodilatadoras renais (PGE2, PGI2), antagonizando o efeito dos IECA, BRA e diuréticos. Essa interação também reduz o fluxo sanguíneo renal, com risco de lesão renal aguda — especialmente na tríade IECA/BRA + AINE + diurético (síndrome dos três pilares).",
      "efeito": "Redução do efeito anti-hipertensivo com elevação da pressão arterial. Em pacientes de risco (idosos, insuficiência cardíaca, desidratados), pode precipitar lesão renal aguda.",
      "conduta": "⚠️ Monitorar pressão arterial ao iniciar ou suspender o AINE. Usar a menor dose pelo menor tempo possível. Evitar a combinação IECA/BRA + AINE + diurético (risco renal). Preferir paracetamol para controle da dor em hipertensos."
    }
  ];

  const novoBloco = '\n\nmcInteracoesDB = mcInteracoesDB.concat(' +
    JSON.stringify(novasInteracoes, null, 2) +
    ');\n';

  const markerAux = '\nvar mcIECAnomes';
  const posAux = raw.indexOf(markerAux);
  if (posAux === -1) {
    console.error('Marcador mcIECAnomes não encontrado — abortando');
    process.exit(1);
  }

  raw = raw.slice(0, posAux) + novoBloco + raw.slice(posAux);
  fs.writeFileSync(INT_PATH, raw, 'utf-8');
  console.log('✓ 3 interações do Ácido Mefenâmico adicionadas ao mc-interacoes-data-v3.js');
}

// ─── 3. mcMedNomes em public/index.html ───────────────────────────────────────
let html = fs.readFileSync(HTML_PATH, 'utf-8');
const lineMatch = html.match(/(const mcMedNomes = \[)(.*?)(\];)/);
if (!lineMatch) { console.error('mcMedNomes não encontrado'); process.exit(1); }

let arr = JSON.parse('[' + lineMatch[2] + ']');
let adicionados = 0;

const inserções = [
  // "Ácido Mefenâmico" — alfabeticamente após Aciclovir, antes de Acitretina
  { nome: 'Ácido Mefenâmico', após: 'Aciclovir' },
  { nome: 'Ponstan',          após: 'Piracetam'  },
  { nome: 'Ponstil',          após: 'Ponstan'    },
];

for (const { nome, após } of inserções) {
  if (arr.some(n => n.toLowerCase() === nome.toLowerCase())) {
    console.log(`  ${nome}: já existe`);
    continue;
  }
  const idx = arr.findIndex(n => n.toLowerCase() === após.toLowerCase());
  if (idx === -1) {
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
  console.log('mcMedNomes: nenhum nome novo para adicionar');
}
