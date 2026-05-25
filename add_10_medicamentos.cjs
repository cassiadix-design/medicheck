// Adiciona 10 medicamentos ausentes clinicamente prioritários ao medicamentos.json
// + Ácido Mefenâmico (correção de possíveis sinônimos e nomes no mcMedNomes)
const fs   = require('fs');
const path = require('path');

const MEDS_PATH = path.join(__dirname, 'medicamentos.json');
const HTML_PATH = path.join(__dirname, 'public', 'index.html');

const meds = JSON.parse(fs.readFileSync(MEDS_PATH, 'utf-8'));
const norm = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

function jaExiste(generico) {
  return meds.some(m =>
    norm(m.generico).includes(norm(generico)) ||
    norm(m.nome).includes(norm(generico)) ||
    (m.sinonimos || []).some(s => norm(s).includes(norm(generico)))
  );
}

// ─── Entradas ─────────────────────────────────────────────────────────────────
const novosMeds = [

  // ── 1. METILPREDNISOLONA ───────────────────────────────────────────────────
  {
    "nome": "Metilprednisolona (Depo-Medrol / Solu-Medrol / Medrol) — Corticosteróide",
    "generico": "Metilprednisolona",
    "tipo": "Corticosteróide Sistêmico",
    "descricao": "Metilprednisolona é um corticosteróide sintético potente com efeitos anti-inflamatórios, imunossupressores e antialérgicos. É utilizado em diversas formas clínicas: comprimidos (Medrol) para doenças inflamatórias e autoimunes, injeção intravenosa (Solu-Medrol) em situações agudas graves como asma grave, anafilaxia e exacerbações de esclerose múltipla, e injeção intra-articular ou intramuscular de ação prolongada (Depo-Medrol) para artrite e inflamações locais. Age suprimindo a resposta imune e bloqueando mediadores inflamatórios como prostaglandinas e citocinas.",
    "receita": "Sim",
    "receita_nota": "Exige prescrição médica. O uso prolongado requer acompanhamento médico regular.",
    "efeitos": "Com uso de curta duração: hiperglicemia, insônia, alterações de humor, aumento do apetite, retenção de líquidos e elevação da pressão arterial. Com uso prolongado: ganho de peso, osteoporose, supressão do eixo hipotálamo-hipófise-adrenal (risco ao suspender abruptamente), síndrome de Cushing iatrogênica (face em lua, adiposidade central), maior susceptibilidade a infecções, catarata, glaucoma e úlcera gástrica.",
    "aviso_grave": "NUNCA suspender abruptamente após uso prolongado — risco de insuficiência adrenal aguda (crise addisoniana). A retirada deve ser gradual e supervisionada pelo médico. Infecções podem ser mascaradas pelo efeito imunossupressor. Glicemia deve ser monitorada em diabéticos. Evitar vacinas vivas durante o tratamento.",
    "recomendacao": "☎️ LIGUE SAMU (192) se houver fraqueza intensa, confusão mental, tontura severa, vômitos e dor abdominal intensa ao reduzir ou suspender o medicamento — podem ser sinais de insuficiência adrenal.",
    "educacao": "Tome os comprimidos sempre com alimento para proteger o estômago. Se receber injeção intra-articular (Depo-Medrol), evite sobrecarregar a articulação por 48 horas. Não reduza a dose por conta própria — sempre siga o esquema de redução gradual prescrito. Informe qualquer médico ou cirurgião que você usa ou usou corticóide recentemente.",
    "resposta_rapida": [
      "Corticóide anti-inflamatório e imunossupressor",
      "Não suspender abruptamente — retirada gradual obrigatória",
      "Tomar comprimidos com alimento",
      "Monitorar glicemia se for diabético",
      "Informe todos os profissionais de saúde sobre o uso"
    ],
    "sinonimos": ["depo-medrol", "solu-medrol", "medrol", "methylprednisolone", "metilpred"],
    "classe_receita": "TARJADO_PRATICA",
    "receita_display": "🔴 Receita Simples",
    "receita_descricao": "Exige prescrição médica. Receita não retida na maioria dos casos.",
    "receita_cor": "vermelho",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      { "pergunta": "Para que serve a metilprednisolona?", "resposta": "A metilprednisolona é um corticóide (anti-inflamatório hormonal) usado em diversas situações: alergias graves, asma, doenças autoimunes (lúpus, artrite reumatoide), inflamações articulares e exacerbações de doenças neurológicas como esclerose múltipla. Em injeção intra-articular (Depo-Medrol), alivia rapidamente a inflamação em articulações e bursas." },
      { "pergunta": "Qual a diferença entre metilprednisolona, prednisona e dexametasona?", "resposta": "Todos são corticóides, mas com potência e duração diferentes. Prednisona é pró-fármaco (convertido pelo fígado), menos potente, oral. Metilprednisolona é mais potente que prednisona e causa menos retenção de sódio. Dexametasona é a mais potente das três e tem ação mais prolongada — usada em casos mais graves e na gestação (maturação pulmonar fetal)." },
      { "pergunta": "Posso parar de tomar metilprednisolona de repente?", "resposta": "Não. Se usou por mais de alguns dias, a suspensão deve ser gradual e orientada pelo médico. O corticóide suprime a produção natural de cortisol pelas glândulas suprarrenais; suspender abruptamente pode causar insuficiência adrenal — uma situação potencialmente grave com fraqueza intensa, tontura e queda de pressão." },
      { "pergunta": "Metilprednisolona engorda?", "resposta": "Sim, especialmente com uso prolongado. O corticóide estimula o apetite, retém líquidos e redistribui a gordura corporal (acúmulo no abdome, rosto e nuca — síndrome de Cushing). Esses efeitos são dose e tempo-dependentes: cursos curtos têm impacto mínimo." },
      { "pergunta": "Metilprednisolona pode aumentar a glicemia?", "resposta": "Sim. Corticóides elevam a glicemia, especialmente após as refeições. Diabéticos precisam monitorar mais intensamente a glicose durante o tratamento e o médico pode precisar ajustar os antidiabéticos temporariamente." },
      { "pergunta": "Posso tomar metilprednisolona com omeprazol?", "resposta": "Sim, e é frequentemente recomendado. Corticóides podem irritar a mucosa gástrica e aumentar o risco de úlcera, especialmente combinados com AINEs. O uso de protetor gástrico (IBP como omeprazol ou pantoprazol) é preventivo e indicado em muitos protocolos de tratamento." },
      { "pergunta": "A injeção de Depo-Medrol na articulação dói?", "resposta": "Pode haver desconforto local no momento da injeção e nos 1–2 dias seguintes (flare pós-injeção). O alívio da inflamação articular costuma ocorrer em 24–72 horas e pode durar semanas a meses, dependendo da condição tratada." }
    ],
    "descricao_seo": "Metilprednisolona (Depo-Medrol, Solu-Medrol, Medrol) é um corticosteróide indicado para: inflamações articulares, asma grave, doenças autoimunes, alergias severas e exacerbações de esclerose múltipla. Efeitos colaterais mais relatados: hiperglicemia, insônia, ganho de peso e retenção de líquidos. Atenção: nunca suspender abruptamente — a retirada deve ser gradual. Metilprednisolona é vendida com receita médica.",
    "alerta_farmaceutico": "Atenção no balcão: paciente em uso de AINE + metilprednisolona tem risco elevado de úlcera gástrica — recomendar protetor gástrico (IBP). AINEs e corticóides não devem ser combinados sem indicação médica. Verificar interação com anticoagulantes (corticóide pode elevar ou reduzir INR). Pacientes diabéticos: alertar sobre hiperglicemia.",
    "quando_procurar_medico": "Procure médico se: fraqueza intensa ao reduzir/suspender o corticóide, sinais de infecção (febre, secreções), visão turva, pressão elevada difícil de controlar, glicemia muito alta, inchaço intenso, ou dor gástrica/fezes escuras.",
    "interacoes": [
      { "com": ["warfarina", "varfarina"], "nivel": "moderado", "titulo": "Metilprednisolona + Anticoagulante", "efeito": "Corticóides podem alterar o efeito da varfarina (para mais ou para menos) — monitorar INR.", "conduta": "⚠️ Monitorar INR ao iniciar, alterar dose ou suspender o corticóide." },
      { "com": ["ibuprofeno", "naproxeno", "diclofenaco", "ácido mefenâmico"], "nivel": "moderado", "titulo": "Metilprednisolona + AINE", "efeito": "Combinação aumenta o risco de úlcera gástrica e sangramento gastrointestinal.", "conduta": "⚠️ Evitar combinação sem protetor gástrico (IBP). Usar paracetamol para analgesia se possível." },
      { "com": ["insulina", "metformina", "glibenclamida", "glicazida"], "nivel": "moderado", "titulo": "Metilprednisolona + Antidiabético", "efeito": "Corticóides elevam a glicemia — pode ser necessário ajustar dose dos antidiabéticos durante o tratamento.", "conduta": "⚠️ Monitorar glicemia com mais frequência. Ajustar antidiabéticos com orientação médica." }
    ]
  },

  // ── 2. KETOPROFENO ────────────────────────────────────────────────────────
  {
    "nome": "Cetoprofeno / Ketoprofeno (Profenid, Biprofenid) — Anti-inflamatório",
    "generico": "Cetoprofeno",
    "tipo": "Anti-inflamatório Não Esteroide (AINE) — Derivado do Ácido Propiônico",
    "descricao": "Cetoprofeno (também escrito ketoprofeno) é um anti-inflamatório não esteroide (AINE) da mesma família do ibuprofeno e naproxeno. Age inibindo COX-1 e COX-2, reduzindo prostaglandinas responsáveis por dor e inflamação. É indicado para dores musculoesqueléticas, artrite reumatoide, osteoartrite, dismenorreia, dor pós-operatória e dor dentária. Disponível em comprimidos, cápsulas de liberação prolongada (Biprofenid), gel tópico (Profenid Gel) e injeção. O gel tópico tem absorção sistêmica baixa e é opção eficaz com menor risco gastrointestinal.",
    "receita": "Sim",
    "receita_nota": "Forma oral e injetável exigem prescrição. O gel tópico pode ser vendido sem receita em alguns estabelecimentos.",
    "efeitos": "Gastrointestinais (náusea, azia, dor abdominal, úlcera com uso prolongado), retenção de líquidos, elevação da pressão arterial, comprometimento da função renal com uso crônico. O gel pode causar dermatite de contato ou fotossensibilidade — evitar exposição solar na área de aplicação.",
    "aviso_grave": "Assim como outros AINEs, aumenta o risco cardiovascular (infarto, AVC) e gastrointestinal com uso prolongado. Não usar em pacientes com insuficiência renal ou cardíaca grave, úlcera ativa ou hipersensibilidade a AINEs. Evitar no terceiro trimestre da gravidez. Interação importante com anticoagulantes: aumenta risco de sangramento.",
    "recomendacao": "☎️ LIGUE SAMU (192) se houver fezes escuras, vômito com sangue, dor abdominal intensa, dificuldade para respirar ou reação alérgica grave (inchaço do rosto, urticária generalizada).",
    "educacao": "Tome os comprimidos sempre com alimento. O gel tópico deve ser aplicado na área dolorosa e não em pele lesionada ou mucosas — lave as mãos após a aplicação e evite o sol por 2 horas na região tratada. Não use o gel junto com bandagem oclusiva.",
    "resposta_rapida": [
      "AINE para dor muscular, artrite e inflamação",
      "Gel tópico: menor risco GI do que oral",
      "Tome os comprimidos com alimento",
      "Proteja a pele do sol após usar o gel",
      "Evitar em grávidas (3º trimestre) e com úlcera ativa"
    ],
    "sinonimos": ["profenid", "biprofenid", "ketoprofeno", "ketoflex", "profenid gel"],
    "classe_receita": "TARJADO_PRATICA",
    "receita_display": "🔴 Receita Simples",
    "receita_descricao": "Exige prescrição médica (oral/injetável). Gel tópico pode ter venda livre dependendo da concentração.",
    "receita_cor": "vermelho",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      { "pergunta": "Cetoprofeno e Profenid são a mesma coisa?", "resposta": "Sim. Profenid é o principal nome comercial do cetoprofeno no Brasil. Biprofenid é a versão de liberação prolongada (75 mg 2x/dia ou 200 mg 1x/dia), com melhor adesão e picos séricos mais suaves." },
      { "pergunta": "O gel de cetoprofeno funciona bem para dor muscular?", "resposta": "Sim, e com vantagem: o gel tópico tem absorção sistêmica muito menor do que a forma oral, então provoca menos efeitos gastrointestinais. É eficaz para dores musculares superficiais, tendinites e articulações periféricas. Para dores mais profundas ou artrite sistêmica, a forma oral é mais indicada." },
      { "pergunta": "Posso usar o gel de cetoprofeno e tomar ibuprofeno ao mesmo tempo?", "resposta": "Não é recomendado. Apesar do gel ter absorção baixa, combinar dois AINEs (mesmo tópico + oral) aumenta o risco de efeitos gastrointestinais e pode sobrecarregar os rins. Escolha um só, preferencialmente com orientação do farmacêutico ou médico." },
      { "pergunta": "Cetoprofeno pode causar sensibilidade ao sol?", "resposta": "Sim, especialmente o gel tópico. O cetoprofeno é fotossensibilizante — aplicar o gel e se expor ao sol pode causar queimação, vermelhidão e dermatite de contato. Evite o sol ou use protetor solar generoso na região tratada durante o tratamento e até 2 semanas após." },
      { "pergunta": "Posso usar cetoprofeno com pressão alta?", "resposta": "Com cautela. AINEs podem elevar a pressão arterial e reduzir o efeito dos anti-hipertensivos. Se você tem hipertensão, use a menor dose pelo menor tempo e monitore a pressão. Paracetamol é alternativa mais segura para dor em hipertensos." }
    ],
    "descricao_seo": "Cetoprofeno / Ketoprofeno (Profenid, Biprofenid) é um anti-inflamatório AINE indicado para: dor muscular, artrite, tendinite, dor pós-operatória e dismenorreia. Disponível em comprimido, gel tópico e injetável. Efeitos colaterais mais relatados: azia, náusea, fotossensibilidade com o gel. Atenção: proteger do sol a área onde aplicar o gel. Cetoprofeno é vendido com receita médica.",
    "alerta_farmaceutico": "Atenção no balcão: cliente usando varfarina + cetoprofeno tem risco de sangramento GI elevado. O gel tópico tem baixa absorção mas não é nulo — questionar sobre uso concomitante de outros AINEs orais. Fotossensibilidade do gel: orientar sobre proteção solar na área tratada.",
    "quando_procurar_medico": "Procure médico se: dor gástrica intensa, fezes escuras ou com sangue, inchaço nos pés, pressão elevada persistente, reação na pele com o gel (vesículas, queimação intensa), ou se a dor não melhorar em 5–7 dias."
  },

  // ── 3. LEVOCETIRIZINA ─────────────────────────────────────────────────────
  {
    "nome": "Levocetirizina (Xyzal, Zyrtec-L) — Antialérgico",
    "generico": "Levocetirizina",
    "tipo": "Anti-histamínico de 2ª Geração",
    "descricao": "Levocetirizina é o enantiômero ativo da cetirizina — um anti-histamínico H1 de segunda geração com alta seletividade periférica. É usada no tratamento de rinite alérgica (sazonal e perene), urticária crônica idiopática e outras manifestações alérgicas. Comparada à cetirizina, a levocetirizina é duas vezes mais potente em menor dose (5 mg vs 10 mg) e com perfil similar de sonolência — baixo, mas superior aos anti-histamínicos de terceira geração como fexofenadina.",
    "receita": "Sim",
    "receita_nota": "Pode ser vendida sem receita em farmácias. Recomenda-se orientação farmacêutica ou médica.",
    "efeitos": "Sonolência (leve, mais frequente que fexofenadina), cefaleia, boca seca, fadiga. Raramente: palpitações e reações de hipersensibilidade.",
    "aviso_grave": "Evitar o consumo de álcool durante o tratamento — pode potencializar a sonolência. Usar com cautela em pacientes com insuficiência renal grave (ajuste de dose necessário). Não dirigir ou operar máquinas pesadas se sentir sonolência significativa.",
    "recomendacao": "Evite álcool. Se sentir sonolência intensa que comprometa atividades, comunique ao médico para avaliar troca por outro anti-histamínico.",
    "educacao": "Tomar preferencialmente à noite, pois pode causar leve sonolência — aproveite esse efeito para melhorar o sono que muitas vezes é prejudicado pela rinite alérgica. A ação começa em cerca de 1 hora e dura 24 horas, portanto é de uso uma vez ao dia.",
    "resposta_rapida": [
      "Antialérgico para rinite e urticária",
      "1 comprimido ao dia (dose única)",
      "Pode causar leve sonolência — tomar à noite",
      "Evitar álcool durante o uso",
      "Menor dose que cetirizina com mesma eficácia"
    ],
    "sinonimos": ["xyzal", "zyrtec-l", "levo-cetirizina", "levocet"],
    "classe_receita": "MIP",
    "receita_display": "🟢 Venda Livre — MIP",
    "receita_descricao": "Medicamento Isento de Prescrição. Não necessita receita médica.",
    "receita_cor": "verde",
    "receita_obrigatoria": false,
    "tipo_receita": "MIP",
    "retencao_receita": false,
    "perguntas_frequentes": [
      { "pergunta": "Levocetirizina dá sono?", "resposta": "Sim, mas pouco. Ela causa menos sonolência do que os anti-histamínicos de primeira geração (difenidramina, prometazina), mas um pouco mais do que fexofenadina ou bilastina. Por isso é boa estratégia tomá-la à noite — aproveita o leve efeito sedativo para ajudar no sono, que frequentemente é perturbado pela rinite." },
      { "pergunta": "Qual a diferença entre levocetirizina e cetirizina?", "resposta": "Levocetirizina é o princípio ativo da cetirizina — ela é o enantiômero farmacologicamente ativo. Isso significa que 5 mg de levocetirizina têm eficácia equivalente a 10 mg de cetirizina, com metade do princípio ativo. Na prática clínica, a eficácia é similar para a maioria dos pacientes, mas alguns respondem melhor a um ou a outro." },
      { "pergunta": "Posso tomar levocetirizina na gravidez?", "resposta": "Não é o primeiro medicamento de escolha na gestação. Se um anti-histamínico for necessário, loratadina é geralmente preferida por ter mais dados de segurança. Consulte o médico antes de usar qualquer antialérgico na gravidez." },
      { "pergunta": "Levocetirizina pode ser usada em crianças?", "resposta": "Sim, mas com dose ajustada por peso e idade. Para crianças de 6 a 11 anos, a dose típica é 2,5 mg (meio comprimido ou solução oral). Para crianças acima de 12 anos e adultos, 5 mg ao dia. Sempre confirmar com o pediatra." },
      { "pergunta": "Levocetirizina é mais forte que loratadina?", "resposta": "Em termos de potência farmacológica e velocidade de ação, sim — levocetirizina age mais rápido e tem maior afinidade pelo receptor H1. Para urticária crônica, pode ser mais eficaz. Para rinite alérgica leve, os dois são comparáveis." }
    ],
    "descricao_seo": "Levocetirizina (Xyzal, Zyrtec-L) é um anti-histamínico de segunda geração indicado para: rinite alérgica, urticária crônica e outras alergias. Dose: 5 mg uma vez ao dia. Efeitos colaterais mais relatados: sonolência leve e boca seca. Atenção: evitar álcool. Levocetirizina pode ser comprada sem receita (MIP).",
    "alerta_farmaceutico": "Anti-histamínico de segunda geração — sonolência leve possível. Orientar sobre álcool. Ajuste de dose em insuficiência renal (creatinina clearance < 50 mL/min: reduzir para 2,5 mg/dia ou em dias alternados). Interação com depressores do SNC (benzodiazepínicos, opioides): potencializa sedação.",
    "quando_procurar_medico": "Procure médico se: sintomas persistirem mais de 2 semanas sem melhora, urticária piorar, surgir falta de ar, inchaço no rosto/garganta (possível angioedema) ou reação alérgica grave."
  },

  // ── 4. INDOMETACINA ──────────────────────────────────────────────────────
  {
    "nome": "Indometacina (Indocid) — Anti-inflamatório",
    "generico": "Indometacina",
    "tipo": "Anti-inflamatório Não Esteroide (AINE) — Derivado do Ácido Indolacético",
    "descricao": "Indometacina é um dos AINEs mais potentes disponíveis, pertencente à classe dos derivados do ácido indolacético. É especialmente eficaz em crises agudas de gota, artrite reumatoide, espondilite anquilosante e periartrite do ombro. Em neonatologia, é usada (na forma IV) para fechamento do canal arterial patente (PCA). A inibição de COX-1 e COX-2 é mais intensa do que na maioria dos AINEs, o que confere maior eficácia analgésica e anti-inflamatória, mas também maior risco gastrointestinal e renal.",
    "receita": "Sim",
    "receita_nota": "Exige prescrição médica. Uso hospitalar IV exige prescrição hospitalar.",
    "efeitos": "Gastrointestinais: náusea, azia, dor epigástrica e úlcera são mais frequentes do que com ibuprofeno. Efeitos no SNC: cefaleia, tontura e, raramente, depressão — diferencial específico da indometacina entre os AINEs. Retenção de líquidos, elevação de pressão e comprometimento renal com uso prolongado.",
    "aviso_grave": "Por ser um AINE muito potente, tem maior risco gastrointestinal e renal do que ibuprofeno e naproxeno. Contraindicado em úlcera péptica ativa, insuficiência renal grave e insuficiência cardíaca descompensada. Não usar no terceiro trimestre da gravidez. Interação importante com lítio: eleva significativamente o nível sérico, podendo causar toxicidade.",
    "recomendacao": "☎️ LIGUE SAMU (192) se houver fezes escuras ou com sangue, vômito com sangue, confusão mental intensa, pressão arterial muito elevada ou dor abdominal incapacitante.",
    "educacao": "Tome sempre com alimento ou leite para reduzir a irritação gástrica. Na crise de gota, o alívio costuma aparecer em 24–48 horas — não interrompa o tratamento antes do prazo indicado mesmo com melhora. Use a menor dose eficaz pelo menor tempo possível.",
    "resposta_rapida": [
      "AINE muito potente — gota, artrite, espondilite",
      "Tome sempre com alimento",
      "Maior risco GI do que ibuprofeno",
      "Pode causar cefaleia e tontura — diferencial desta classe",
      "Não use com lítio sem monitoramento médico"
    ],
    "sinonimos": ["indocid", "indomethacin", "indometacin"],
    "classe_receita": "TARJADO_PRATICA",
    "receita_display": "🔴 Receita Simples",
    "receita_descricao": "Exige prescrição médica. Receita simples, não retida.",
    "receita_cor": "vermelho",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      { "pergunta": "Para que serve a indometacina?", "resposta": "A indometacina é usada principalmente para crises agudas de gota (artrite gotosa), artrite reumatoide, espondilite anquilosante e inflamações articulares intensas. É um dos AINEs mais eficazes para gota — alivia a crise em 24–48 horas. Também é usada em hospitais para fechar o canal arterial patente em recém-nascidos prematuros." },
      { "pergunta": "Indometacina e Indocid são a mesma coisa?", "resposta": "Sim. Indocid é o nome comercial da indometacina. Existem também versões genéricas com o mesmo princípio ativo." },
      { "pergunta": "Por que a indometacina dói a cabeça?", "resposta": "Cefaleia (dor de cabeça) é um efeito adverso específico da indometacina entre os AINEs — ocorre em uma parcela significativa dos usuários. Curiosamente, a indometacina também é usada para tratar certos tipos raros de cefaleia (hemicrania paroxística, cefaleia idiopática). Se a cefaleia for intensa ou persistente, informe ao médico." },
      { "pergunta": "Indometacina pode substituir colchicina na gota?", "resposta": "Sim, é uma alternativa eficaz. Indometacina é considerada tão eficaz quanto colchicina para crise aguda de gota. A escolha depende da tolerância individual: colchicina causa mais diarreia; indometacina causa mais efeitos gástricos. Nenhuma deve ser usada em insuficiência renal grave sem ajuste." },
      { "pergunta": "Posso beber álcool usando indometacina?", "resposta": "Não é recomendado. O álcool sozinho já irrita a mucosa gástrica; combinado com indometacina, o risco de úlcera e sangramento GI aumenta consideravelmente." }
    ],
    "descricao_seo": "Indometacina (Indocid) é um anti-inflamatório AINE potente indicado para: crise aguda de gota, artrite reumatoide, espondilite anquilosante e dores inflamatórias intensas. Efeitos colaterais mais relatados: dor gástrica, cefaleia e tontura. Atenção: maior risco GI que ibuprofeno — sempre tomar com alimento. Indometacina é vendida com receita médica.",
    "alerta_farmaceutico": "AINE de alta potência: maior risco GI e renal que ibuprofeno. Interação crítica com lítio — elevar nível sérico. Verificar uso de anticoagulantes, metotrexato e anti-hipertensivos (especialmente IECA/diurético). Questionar sobre úlcera péptica antes de dispensar.",
    "quando_procurar_medico": "Procure médico se: dor de estômago intensa, fezes escuras, cefaleia persistente, edema nas pernas, pressão elevada ou se os sintomas que motivaram o uso não melhorarem em 3–5 dias.",
    "interacoes": [
      { "com": ["lítio", "carbonato de lítio"], "nivel": "alto", "titulo": "Indometacina + Lítio", "efeito": "Eleva o nível sérico de lítio em até 60%, com alto risco de toxicidade.", "conduta": "❌ Evitar. Usar paracetamol se necessário. Monitorar litemia se imprescindível." },
      { "com": ["warfarina", "varfarina"], "nivel": "alto", "titulo": "Indometacina + Anticoagulante", "efeito": "Potencializa sangramento GI pelo efeito AINE + anticoagulação.", "conduta": "❌ Evitar. Usar paracetamol para dor em pacientes anticoagulados." }
    ]
  },

  // ── 5. ANASTROZOL ────────────────────────────────────────────────────────
  {
    "nome": "Anastrozol (Arimidex) — Tratamento do Câncer de Mama",
    "generico": "Anastrozol",
    "tipo": "Inibidor de Aromatase — Terapia Hormonal Oncológica",
    "descricao": "Anastrozol é um inibidor de aromatase de terceira geração, não esteroide, utilizado no tratamento do câncer de mama hormônio-receptor positivo (HR+) em mulheres pós-menopausa. A aromatase é a enzima responsável pela conversão de andrógenos em estrogênio nos tecidos periféricos (gordura, músculo); ao inibi-la, anastrozol reduz os níveis de estrogênio circulante em até 99%, suprimindo o crescimento de tumores dependentes de estrogênio. É usado como terapia adjuvante (após cirurgia), terapia neoadjuvante (antes da cirurgia) e no tratamento de doença metastática.",
    "receita": "Sim",
    "receita_nota": "Exige prescrição médica oncológica. Medicamento de alto custo disponível pelo SUS para casos indicados.",
    "efeitos": "Os efeitos mais comuns são decorrentes da privação estrogênica: fogachos (calorões), artralgia e mialgia (dores nas articulações e músculos), ressecamento vaginal, cefaleia, fadiga e insônia. O efeito mais relevante a longo prazo é a perda de densidade óssea — risco de osteoporose e fraturas. Pode ocorrer elevação do colesterol.",
    "aviso_grave": "Monitorar a densidade óssea regularmente durante o tratamento (DXA a cada 1–2 anos). Suplementação de cálcio e vitamina D é frequentemente recomendada. Contraindicado em mulheres na pré-menopausa (pouco eficaz e pode comprometer a fertilidade). NÃO usar em grávidas — teratogênico.",
    "recomendacao": "Informe o oncologista sobre qualquer dor óssea intensa, fratura inesperada ou sintomas cardiovasculares (dor no peito, falta de ar). Mantenha as consultas e os exames de acompanhamento em dia.",
    "educacao": "Tome o comprimido uma vez ao dia, sempre no mesmo horário, com ou sem alimento. O tratamento adjuvante dura geralmente 5 anos — não interrompa sem orientação do oncologista, mesmo se sentir efeitos colaterais. Pratique atividade física com exercícios de resistência para proteger os ossos. Converse com o médico sobre suplementação de cálcio e vitamina D.",
    "resposta_rapida": [
      "Terapia hormonal para câncer de mama HR+",
      "Só eficaz em mulheres pós-menopausa",
      "Tratamento de 5 anos — não interromper sem orientação",
      "Monitorar ossos: risco de osteoporose",
      "Suplementar cálcio + vitamina D conforme orientação"
    ],
    "sinonimos": ["arimidex", "anastrozole", "anastrozol genérico"],
    "classe_receita": "TARJADO_PRATICA",
    "receita_display": "🔴 Receita Simples",
    "receita_descricao": "Exige prescrição médica. Medicamento de uso oncológico.",
    "receita_cor": "vermelho",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      { "pergunta": "Para que serve o anastrozol?", "resposta": "Anastrozol (Arimidex) é usado no tratamento do câncer de mama positivo para receptores hormonais (HR+) em mulheres pós-menopausa. Funciona bloqueando a produção de estrogênio, que estimula o crescimento do tumor. É usado após a cirurgia (tratamento adjuvante) por cerca de 5 anos para reduzir o risco de recidiva." },
      { "pergunta": "Anastrozol engorda?", "resposta": "Diretamente, não. Mas a privação de estrogênio pode causar ganho de peso em algumas mulheres, especialmente com redistribuição de gordura corporal. A redução do metabolismo e a fadiga que dificultam a atividade física também contribuem. Manter exercício regular ajuda a controlar o peso durante o tratamento." },
      { "pergunta": "O anastrozol causa dor nas articulações?", "resposta": "Sim, artralgia (dor nas articulações) é um dos efeitos mais comuns — afeta até 35% das usuárias. As mãos, joelhos e tornozelos são os mais afetados. O exercício físico regular (especialmente musculação e caminhada) ajuda a reduzir esse sintoma. Informe o oncologista se for muito intenso — existem estratégias para manejar." },
      { "pergunta": "Anastrozol causa osteoporose?", "resposta": "Sim, o uso prolongado reduz a densidade mineral óssea porque o estrogênio é importante para a saúde dos ossos. Por isso, o médico solicita densitometria óssea regularmente durante o tratamento e frequentemente prescreve suplementação de cálcio e vitamina D. Em casos de osteoporose, pode adicionar bisfosfonato (como alendronato)." },
      { "pergunta": "Posso tomar anastrozol junto com tamoxifeno?", "resposta": "Não — eles não devem ser usados simultaneamente. Anastrozol e tamoxifeno são hormônios para câncer de mama com mecanismos diferentes. O tamoxifeno antagoniza o receptor de estrogênio; anastrozol reduz a produção de estrogênio. Usar juntos não aumenta eficácia e pode haver interação farmacocinética (tamoxifeno reduz os níveis de anastrozol). São alternativas, não associação." },
      { "pergunta": "Anastrozol está disponível pelo SUS?", "resposta": "Sim. Anastrozol é um dos medicamentos de alto custo dispensados pelo SUS para pacientes com câncer de mama HR+ pós-menopausa, mediante laudo médico e protocolo específico do Ministério da Saúde (PCDT). Procure a farmácia de componente especializado do SUS na sua cidade." }
    ],
    "descricao_seo": "Anastrozol (Arimidex) é um inibidor de aromatase usado no tratamento do câncer de mama hormônio-receptor positivo (HR+) em mulheres pós-menopausa. Reduz os níveis de estrogênio em até 99%. Efeitos colaterais mais relatados: fogachos, dores articulares e risco de osteoporose. Disponível pelo SUS. Anastrozol é vendido com receita médica oncológica.",
    "alerta_farmaceutico": "Medicamento oncológico — verificar prescrição especializada. Interação relevante: tamoxifeno reduz os níveis séricos de anastrozol (não associar). Monitorar densidade óssea durante tratamento. Contraindicado na pré-menopausa e na gravidez.",
    "quando_procurar_medico": "Procure o oncologista se: dor óssea intensa, fratura inesperada, dor no peito ou falta de ar, sangramento vaginal (incomum em pós-menopausa), depressão ou ansiedade intensa, ou efeitos colaterais que impeçam a adesão ao tratamento."
  },

  // ── 6. PROPAFENONA ──────────────────────────────────────────────────────
  {
    "nome": "Propafenona (Rytmonorm) — Antiarrítmico",
    "generico": "Propafenona",
    "tipo": "Antiarrítmico Classe IC",
    "descricao": "Propafenona é um antiarrítmico de classe IC que age bloqueando canais de sódio nas células cardíacas, retardando a condução do impulso elétrico. É utilizada no tratamento e prevenção de arritmias supraventriculares — principalmente fibrilação atrial paroxística, flutter atrial e taquicardia supraventricular paroxística — e, em menor extensão, arritmias ventriculares sintomáticas. A estratégia 'pill-in-the-pocket' (comprimido no bolso para reversão de FA paroxística episódica em ambulatório) é uma aplicação clínica importante para casos selecionados.",
    "receita": "Sim",
    "receita_nota": "Exige prescrição médica cardiológica. Uso deve ser supervisionado com ECG periódico.",
    "efeitos": "Gosto metálico ou amargo na boca (muito característico desta medicação), tontura, náusea, visão turva, cefaleia. Efeitos cardíacos: bradicardia, bloqueio AV, alargamento do QRS — devem ser monitorados por ECG. Em casos raros, pode ter efeito pró-arrítmico (piorar ou criar nova arritmia).",
    "aviso_grave": "Contraindicada em insuficiência cardíaca descompensada, bradicardia grave, bloqueios de condução (BAV de 2º e 3º grau sem marca-passo) e doença pulmonar obstrutiva grave. O efeito pró-arrítmico é o risco mais grave — arritmias ventriculares malignas. Monitorar ECG regularmente. Interação importante com digoxina: eleva os níveis séricos. Interação com varfarina: eleva INR.",
    "recomendacao": "☎️ LIGUE SAMU (192) se sentir palpitações muito rápidas ou irregulares, desmaio, dor no peito ou dificuldade para respirar — podem ser sinais de arritmia grave.",
    "educacao": "Tome nos horários prescritos — a regularidade é fundamental para manter o nível do medicamento estável no sangue. O gosto metálico na boca é normal e esperado. Realize os ECGs de acompanhamento conforme solicitado pelo cardiologista. Não interrompa por conta própria.",
    "resposta_rapida": [
      "Antiarrítmico para fibrilação atrial e taquicardia supraventricular",
      "Gosto metálico: efeito normal e esperado",
      "Fazer ECG regularmente para monitoramento",
      "Nunca interromper sem orientação cardiológica",
      "Informar outros médicos sobre o uso"
    ],
    "sinonimos": ["rytmonorm", "propafenone", "nistaken"],
    "classe_receita": "TARJADO_PRATICA",
    "receita_display": "🔴 Receita Simples",
    "receita_descricao": "Exige prescrição médica. Uso supervisionado com ECG periódico recomendado.",
    "receita_cor": "vermelho",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      { "pergunta": "Para que serve a propafenona?", "resposta": "A propafenona (Rytmonorm) é usada para controlar e prevenir certas arritmias cardíacas — principalmente a fibrilação atrial paroxística (FA que vem e vai), o flutter atrial e a taquicardia supraventricular paroxística (TSVP). O cardiologista a indica quando o coração 'dispara' em ritmo irregular e precisa ser estabilizado." },
      { "pergunta": "Por que a propafenona deixa a boca com gosto amargo?", "resposta": "O gosto metálico ou amargo é um efeito colateral muito característico da propafenona, causado pela excreção do medicamento na saliva. Não é sinal de problema — é esperado e incomoda muitos pacientes, mas não é indicação para parar o medicamento. Pode ajudar mastigar goma sem açúcar ou beber água frequentemente." },
      { "pergunta": "Posso parar de tomar propafenona se me sentir melhor?", "resposta": "Não. A propafenona é usada para prevenir as arritmias — interrompê-la aumenta o risco de novos episódios. Somente o cardiologista deve decidir quando e como reduzir ou suspender. A retirada, quando indicada, costuma ser gradual." },
      { "pergunta": "O que é a estratégia 'pill-in-the-pocket' com propafenona?", "resposta": "É uma estratégia para pacientes com FA paroxística esporádica: o paciente leva um comprimido de propafenona (geralmente 450–600 mg) para tomar somente quando perceber início de um episódio de FA. Foi validada em estudos como segura em pacientes selecionados (sem doença estrutural cardíaca, sem bradicardia, sem bloqueio de condução). O cardiologista define quem é candidato." },
      { "pergunta": "Propafenona pode ser usada com varfarina?", "resposta": "Sim, mas com cuidado. A propafenona inibe o metabolismo da varfarina pelo CYP2C9, elevando o INR. É necessário monitorar o INR com mais frequência ao iniciar, alterar dose ou suspender a propafenona, e pode ser necessário reduzir a dose de varfarina." }
    ],
    "descricao_seo": "Propafenona (Rytmonorm) é um antiarrítmico classe IC indicado para: fibrilação atrial paroxística, flutter atrial e taquicardia supraventricular. Efeitos colaterais mais relatados: gosto metálico, tontura e náusea. Atenção: monitorar ECG regularmente — risco de efeito pró-arrítmico. Propafenona é vendida com receita médica cardiológica.",
    "alerta_farmaceutico": "Antiarrítmico classe IC: contraindicado em ICC descompensada, bradicardia grave e bloqueios de condução. Interações críticas: digoxina (eleva nível sérico — reduzir dose de digoxina), varfarina (eleva INR — monitorar), betabloqueadores (soma efeito cronotrópico negativo). Nunca dispensar sem prescrição cardiológica.",
    "quando_procurar_medico": "Procure o cardiologista se: palpitações novas ou piores, desmaio ou quase-desmaio, dor no peito, falta de ar intensa, ou se os episódios de arritmia ficarem mais frequentes durante o tratamento.",
    "interacoes": [
      { "com": ["digoxina"], "nivel": "moderado", "titulo": "Propafenona + Digoxina", "efeito": "Propafenona eleva os níveis séricos de digoxina em 35–85%, aumentando risco de toxicidade digitálica.", "conduta": "⚠️ Reduzir dose de digoxina ao iniciar propafenona. Monitorar nível sérico de digoxina e ECG." },
      { "com": ["warfarina", "varfarina"], "nivel": "moderado", "titulo": "Propafenona + Varfarina", "efeito": "Inibe CYP2C9, elevando o INR — risco de sangramento.", "conduta": "⚠️ Monitorar INR ao iniciar, alterar dose ou suspender propafenona." }
    ]
  },

  // ── 7. TINIDAZOL ────────────────────────────────────────────────────────
  {
    "nome": "Tinidazol (Fasigyn, Amentyl) — Antiprotozoário / Antibacteriano",
    "generico": "Tinidazol",
    "tipo": "Nitroimidazol — Antiprotozoário e Antibacteriano Anaeróbio",
    "descricao": "Tinidazol é um antibiótico nitroimidazólico com ação contra protozoários e bactérias anaeróbias. Tem perfil semelhante ao metronidazol, mas com meia-vida mais longa, permitindo esquemas de dose única ou tratamentos mais curtos. É indicado para: giardíase, amebíase intestinal e hepática, tricomoníase (DST), vaginose bacteriana (VB) e infecções anaeróbias (como abscessos). Também compõe alguns esquemas de erradicação do Helicobacter pylori.",
    "receita": "Sim",
    "receita_nota": "Exige prescrição médica.",
    "efeitos": "Gosto metálico, náusea, vômito, diarreia, tontura e cefaleia. Raramente: neuropatia periférica (com uso prolongado), leucopenia. Os efeitos são similares ao metronidazol, geralmente bem tolerados em cursos curtos.",
    "aviso_grave": "PROIBIDO consumir álcool durante o tratamento e por pelo menos 72 horas após a última dose — causa reação tipo dissulfiram: taquicardia, rubor, náusea intensa, cefaleia e queda de pressão. Usar com cautela em insuficiência hepática grave. Contraindicado no primeiro trimestre da gravidez.",
    "recomendacao": "Evite qualquer bebida alcoólica e medicamentos com álcool (alguns xaropes, tinturas) durante o uso e por 3 dias após.",
    "educacao": "Tome com alimento para reduzir a náusea. Em tratamentos para tricomoníase, o parceiro deve ser tratado simultaneamente para evitar reinfecção. Na vaginose bacteriana, siga o esquema completo mesmo com melhora precoce.",
    "resposta_rapida": [
      "Antiprotozoário: giardíase, amebíase, tricomoníase",
      "Também age em bactérias anaeróbias",
      "ZERO álcool: durante o uso e 3 dias após",
      "Tomar com alimento para reduzir náusea",
      "Na tricomoníase, tratar parceiro também"
    ],
    "sinonimos": ["fasigyn", "amentyl", "tinidazole"],
    "classe_receita": "TARJADO_PRATICA",
    "receita_display": "🔴 Receita Simples",
    "receita_descricao": "Exige prescrição médica. Receita simples, não retida.",
    "receita_cor": "vermelho",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      { "pergunta": "Para que serve o tinidazol?", "resposta": "O tinidazol (Fasigyn) é usado para tratar infecções causadas por protozoários e bactérias anaeróbias: giardíase (Giardia lamblia), amebíase (Entamoeba histolytica), tricomoníase (IST/DST), vaginose bacteriana e abscessos anaeróbios. Também entra em esquemas de erradicação do H. pylori (úlcera)." },
      { "pergunta": "Qual a diferença entre tinidazol e metronidazol?", "resposta": "Ambos são nitroimidazóis com ação similar, mas tinidazol tem meia-vida mais longa (12–14h vs 6–8h do metronidazol), permitindo cursos mais curtos (muitas vezes dose única para giardíase e tricomoníase). Tinidazol também tende a ser melhor tolerado — menos efeitos gastrointestinais. O metronidazol tem mais usos aprovados e dados de segurança acumulados na gravidez (segundo e terceiro trimestres)." },
      { "pergunta": "Posso beber cerveja depois de 24 horas do tinidazol?", "resposta": "Não. O risco de reação tipo dissulfiram persiste por 72 horas (3 dias) após a última dose de tinidazol — mais tempo do que o metronidazol (24h). Aguarde ao menos 3 dias completos antes de consumir qualquer bebida alcoólica." },
      { "pergunta": "O parceiro precisa tomar tinidazol também?", "resposta": "Na tricomoníase, sim — é obrigatório tratar o parceiro simultaneamente, mesmo sem sintomas, para evitar a reinfecção (pois a tricomoníase é uma DST/IST). Na vaginose bacteriana, o tratamento do parceiro não é rotineiramente recomendado. Na giardíase, se o parceiro também tiver sintomas ou confirmação, deve ser tratado." },
      { "pergunta": "Tinidazol funciona para giardíase em criança?", "resposta": "Sim, e com vantagem: o esquema de dose única (50 mg/kg, máximo 2 g) é prático para crianças. Mas confirmar dose e indicação com o pediatra. Para crianças abaixo de 3 anos, o tinidazol não é aprovado — metronidazol é preferido nessa faixa etária." }
    ],
    "descricao_seo": "Tinidazol (Fasigyn, Amentyl) é um antiprotozoário e antibacteriano indicado para: giardíase, amebíase, tricomoníase (IST), vaginose bacteriana e infecções anaeróbias. Efeitos colaterais mais relatados: gosto metálico, náusea e tontura. Atenção: PROIBIDO beber álcool durante o uso e por 3 dias após. Tinidazol é vendido com receita médica.",
    "alerta_farmaceutico": "Interação grave com álcool (reação dissulfiram-like) persiste 72h após última dose — orientar com ênfase. Verificar interações: varfarina (tinidazol pode inibir CYP2C9 e elevar INR — monitorar), lítio (potencial elevação sérica). Contraindicado no primeiro trimestre da gravidez.",
    "quando_procurar_medico": "Procure médico se: sintomas não melhorarem após término do tratamento, surgirem formigamentos nos pés e mãos (neuropatia), reação grave ao álcool (taquicardia intensa, síncope), ou piora dos sintomas gastrointestinais."
  },

  // ── 8. TIMOLOL ──────────────────────────────────────────────────────────
  {
    "nome": "Timolol (Timoftol, Blocadren) — Colírio para Glaucoma",
    "generico": "Timolol",
    "tipo": "Betabloqueador (Colírio Oftálmico / Oral)",
    "descricao": "Timolol é um betabloqueador não seletivo amplamente utilizado como colírio oftálmico para o tratamento do glaucoma e hipertensão ocular. Age reduzindo a produção de humor aquoso pelo corpo ciliar, diminuindo a pressão intraocular (PIO). É um dos colírios antiglaucomatosos mais usados no mundo. Também existe em comprimidos para hipertensão arterial e prevenção de infarto, mas o uso mais comum no Brasil é a forma oftálmica. Apesar de ser aplicado nos olhos, pode ser absorvido sistemicamente e causar efeitos cardiovasculares e respiratórios — ponto crítico de segurança.",
    "receita": "Sim",
    "receita_nota": "Exige prescrição médica oftalmológica.",
    "efeitos": "Locais: ardência transitória após a aplicação, visão turva momentânea. Sistêmicos (por absorção pela mucosa nasolacrimal): bradicardia, hipotensão, broncoespasmo (perigoso em asmáticos), cansaço, depressão e, raramente, piora da insuficiência cardíaca.",
    "aviso_grave": "CONTRAINDICADO em pacientes com asma, DPOC grave, bradicardia sinusal, bloqueio AV de 2º ou 3º grau e insuficiência cardíaca descompensada. A absorção sistêmica pelo colírio é real e pode precipitar broncoespasmo grave em asmáticos — já relatados óbitos. Somar com betabloqueadores orais pode causar bradicardia intensa.",
    "recomendacao": "Após aplicar o colírio, comprima o canto interno do olho (ponto lacrimal) com o dedo por 2 minutos — isso reduz muito a absorção sistêmica e os efeitos cardiovasculares/respiratórios.",
    "educacao": "Aplique sempre no mesmo horário. Use a técnica de compressão do ponto lacrimal para minimizar a absorção sistêmica. Se usar mais de um colírio, aguarde 5 minutos entre cada aplicação. Informe todos os seus médicos (clínico, cardiologista, pneumologista) que usa este colírio — ele pode interagir com medicamentos cardíacos e respiratórios.",
    "resposta_rapida": [
      "Colírio para glaucoma — reduz pressão intraocular",
      "Comprimir o canto do olho 2 min após pingar",
      "CONTRAINDICADO em asma e DPOC",
      "Informar todos os médicos sobre o uso",
      "Pode causar bradicardia mesmo sendo colírio"
    ],
    "sinonimos": ["timoftol", "blocadren", "timoptic", "timolol maleato"],
    "classe_receita": "TARJADO_PRATICA",
    "receita_display": "🔴 Receita Simples",
    "receita_descricao": "Exige prescrição médica oftalmológica.",
    "receita_cor": "vermelho",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      { "pergunta": "Para que serve o colírio de timolol?", "resposta": "O colírio de timolol é usado para tratar glaucoma e hipertensão ocular — condições em que a pressão dentro do olho (pressão intraocular) está elevada, o que pode danificar o nervo óptico e levar à perda de visão. O timolol reduz a produção do líquido que circula dentro do olho, diminuindo a pressão." },
      { "pergunta": "O colírio de timolol pode afetar o coração?", "resposta": "Sim. Apesar de ser aplicado nos olhos, o timolol é absorvido pela mucosa do nariz e da garganta (via ducto nasolacrimal) e cai na circulação sanguínea. Por ser um betabloqueador, pode causar diminuição da frequência cardíaca (bradicardia) e queda de pressão. Em pacientes com doenças cardíacas ou pulmonares, esse efeito pode ser clinicamente importante." },
      { "pergunta": "Como reduzir os efeitos sistêmicos do colírio de timolol?", "resposta": "Use a técnica de oclusão punctal: após pingar o colírio, feche o olho e pressione com o dedo o canto interno (próximo ao nariz) por 1–2 minutos. Isso bloqueia a entrada do colírio no ducto nasolacrimal, reduzindo a absorção sistêmica em até 50%." },
      { "pergunta": "Posso usar timolol se tenho asma?", "resposta": "Não. Timolol é contraindicado em asma e DPOC grave. Por ser um betabloqueador não seletivo, bloqueia receptores beta-2 nos brônquios, podendo causar broncoespasmo grave — mesmo na forma de colírio. Existem outros colírios antiglaucomatosos sem esse risco (como os análogos de prostaglandina ou inibidores de anidrase carbônica)." },
      { "pergunta": "Por quanto tempo devo usar o colírio de timolol?", "resposta": "O glaucoma é uma doença crônica e o tratamento é geralmente por toda a vida. O timolol controla a pressão ocular mas não cura o glaucoma. A interrupção aumenta a pressão e pode acelerar o dano ao nervo óptico. Use continuamente conforme prescrito e mantenha as consultas de acompanhamento." }
    ],
    "descricao_seo": "Timolol (Timoftol, Blocadren) é um colírio betabloqueador indicado para: glaucoma e hipertensão ocular. Reduz a produção de humor aquoso e diminui a pressão intraocular. Efeitos sistêmicos: bradicardia e broncoespasmo (mesmo sendo colírio). CONTRAINDICADO em asma e DPOC. Vendido com receita médica oftalmológica.",
    "alerta_farmaceutico": "CRÍTICO: mesmo sendo colírio, timolol é absorvido sistemicamente. Verificar: asma, DPOC, bradicardia, bloqueio AV, IC descompensada — CONTRAINDICAÇÕES absolutas. Interação com betabloqueadores orais (propranolol, atenolol): soma bradicardia. Orientar técnica de oclusão punctal. Betabloqueadores não seletivos podem mascarar hipoglicemia em diabéticos.",
    "quando_procurar_medico": "Procure médico se: batimentos cardíacos muito lentos ou irregulares, cansaço intenso, falta de ar ou chiado no peito após iniciar o colírio, tontura ao se levantar, ou visão que piora apesar do tratamento."
  },

  // ── 9. RISEDRONATO ─────────────────────────────────────────────────────
  {
    "nome": "Risedronato (Actonel) — Osteoporose",
    "generico": "Risedronato",
    "tipo": "Bifosfonato — Tratamento da Osteoporose",
    "descricao": "Risedronato de sódio é um bifosfonato de segunda geração indicado para o tratamento e prevenção da osteoporose pós-menopausa, osteoporose induzida por corticóide e doença de Paget. Age inibindo a atividade dos osteoclastos (células que destroem osso), reduzindo a reabsorção óssea e aumentando a densidade mineral óssea. Disponível em comprimidos de 5 mg (diário), 35 mg (semanal — mais comum) e 150 mg (mensal). A adesão é melhor com a formulação semanal ou mensal.",
    "receita": "Sim",
    "receita_nota": "Exige prescrição médica.",
    "efeitos": "Gastrointestinais: náusea, dor abdominal, disfagia (dificuldade para engolir), esofagite e úlcera esofágica — especialmente se não seguir as instruções de administração. Dores musculoesqueléticas (mialgia, artralgia) são comuns nas primeiras semanas. Em uso muito prolongado (>5 anos): risco baixo de osteossarcoma de mandíbula (osteonecrose de mandíbula) e fraturas atípicas de fêmur.",
    "aviso_grave": "A forma de tomar é fundamental: engolir em pé ou sentado, em jejum absoluto, com copo cheio de água (200 mL), e PERMANECER EM PÉ POR PELO MENOS 30 MINUTOS após. Não deitar — o risco de esofagite grave é alto. Contraindicado em insuficiência renal grave (ClCr <30 mL/min) e hipocalcemia não corrigida.",
    "recomendacao": "Tome o comprimido assim que acordar, em jejum, com 200 mL de água mineral (só água — sem café, leite ou suco), e fique sentado ou de pé por 30 minutos. Só então tome o café da manhã e outros medicamentos.",
    "educacao": "Suplementar cálcio e vitamina D durante o tratamento, conforme orientação médica — esses nutrientes são parceiros do bifosfonato para fortalecer o osso. O risedronato semanal pode ser tomado qualquer dia da semana, mas sempre o mesmo dia. Informe o dentista que usa bifosfonato antes de qualquer procedimento dentário invasivo.",
    "resposta_rapida": [
      "Tratamento da osteoporose — fortalece os ossos",
      "Tomar em jejum com copo cheio de água",
      "Ficar em pé ou sentado por 30 min após",
      "Informar dentista antes de procedimentos",
      "Suplementar cálcio + vitamina D conforme orientação"
    ],
    "sinonimos": ["actonel", "risedronate", "risedronato de sódio"],
    "classe_receita": "TARJADO_PRATICA",
    "receita_display": "🔴 Receita Simples",
    "receita_descricao": "Exige prescrição médica.",
    "receita_cor": "vermelho",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      { "pergunta": "Para que serve o risedronato?", "resposta": "O risedronato (Actonel) é um medicamento para tratar e prevenir osteoporose — doença em que os ossos ficam porosos e frágeis, aumentando o risco de fraturas. É especialmente indicado para mulheres pós-menopausa e para quem usa corticóides por longo prazo (que aceleram a perda óssea). Age freando a destruição óssea." },
      { "pergunta": "Por que preciso ficar em pé 30 minutos depois de tomar o risedronato?", "resposta": "O risedronato pode irritar o esôfago se não descer completamente até o estômago. Ficar deitado facilita o refluxo do medicamento para o esôfago, causando esofagite dolorosa e até úlcera esofágica. Ficar de pé ou sentado e beber bastante água garante que o comprimido chegue ao estômago antes de você se deitar." },
      { "pergunta": "O risedronato pode ser tomado com o café da manhã?", "resposta": "Não — deve ser tomado em jejum absoluto. Alimentos (especialmente cálcio do leite), café e sucos reduzem drasticamente a absorção do risedronato. Após tomá-lo, espere pelo menos 30 minutos antes de comer, beber qualquer outra coisa ou tomar outros medicamentos." },
      { "pergunta": "Risedronato pode prejudicar os dentes?", "resposta": "Em uso prolongado e em doses altas (oncológicas), bifosfonatos podem causar osteonecrose de mandíbula — um efeito raro mas sério. No uso para osteoporose em doses habituais, o risco é muito baixo. Mesmo assim, informe o dentista que você usa risedronato antes de extrações, implantes ou outros procedimentos invasivos na boca." },
      { "pergunta": "Por quanto tempo preciso tomar risedronato?", "resposta": "O tratamento geralmente dura 3–5 anos para osteoporose pós-menopausa. Após esse período, o médico avalia fazer uma 'pausa de medicamento' (drug holiday) com base na sua densidade óssea e risco de fratura. Não interrompa por conta própria — a decisão deve ser do médico que acompanha o tratamento." }
    ],
    "descricao_seo": "Risedronato (Actonel) é um bifosfonato indicado para: tratamento da osteoporose pós-menopausa, osteoporose induzida por corticóide e doença de Paget. Efeitos colaterais mais relatados: dor gástrica e disfagia (se tomado incorretamente). Atenção: tomar em jejum, com copo cheio de água e ficar em pé 30 minutos. Informar dentista. Risedronato é vendido com receita médica.",
    "alerta_farmaceutico": "Bifosfonato: instruir detalhadamente a postura de administração — tomado deitado ou sem água suficiente causa esofagite grave. Verificar função renal (CI em ClCr <30 mL/min). Interação com cálcio, antiácidos e ferro: tomados juntos reduzem absorção a zero — espaçar pelo menos 30 min. Alertar sobre informar dentista.",
    "quando_procurar_medico": "Procure médico se: dor ao engolir, azia persistente, dor na mandíbula ou dente que não cura após procedimento dental, dor intensa na coxa ou virilha (fratura de estresse atípica — rara), ou dor óssea intensa nas primeiras semanas de uso."
  },

  // ── 10. PERINDOPRIL ───────────────────────────────────────────────────
  {
    "nome": "Perindopril (Coversyl, Acertil) — Anti-hipertensivo",
    "generico": "Perindopril",
    "tipo": "Inibidor da Enzima Conversora de Angiotensina (IECA)",
    "descricao": "Perindopril é um inibidor da ECA (IECA) de ação prolongada, utilizado no tratamento da hipertensão arterial, insuficiência cardíaca, prevenção de eventos cardiovasculares (infarto e AVC em pacientes de alto risco) e nefropatia diabética. Como IECA, bloqueia a conversão de angiotensina I em angiotensina II — um potente vasoconstritor — reduzindo a resistência vascular periférica e a pressão arterial. Tem meia-vida longa que permite dose única diária.",
    "receita": "Sim",
    "receita_nota": "Exige prescrição médica.",
    "efeitos": "Tosse seca persistente é o efeito adverso mais comum e característico dos IECAs — afeta 10–30% dos pacientes e pode obrigar à troca por um BRA (sartana). Hipotensão (especialmente na 1ª dose em pacientes desidratados), hipercalemia (elevação de potássio), tontura e cefaleia. Em raro mas grave: angioedema (inchaço de lábios, língua e garganta) — emergência médica.",
    "aviso_grave": "CONTRAINDICADO na gravidez — causa lesão renal fetal grave e pode ser letal ao feto no 2º e 3º trimestres (categoria X). Não combinar com aliskiren em diabéticos. Não combinar com AINEs sem monitorar a função renal (tríade IECA + AINE + diurético = risco de IRA). Monitorar potássio — risco de hipercalemia, especialmente com suplementação de potássio ou diuréticos poupadores.",
    "recomendacao": "☎️ LIGUE SAMU (192) imediatamente se surgir inchaço súbito de lábios, língua, garganta ou face (angioedema) — pode obstruir as vias aéreas rapidamente.",
    "educacao": "Tome uma vez ao dia, sempre no mesmo horário, com ou sem alimento. A pressão pode cair mais na primeira dose — sente-se ou levante-se devagar. Se desenvolver tosse seca persistente que incomoda, informe o médico — a troca por uma sartana resolve o problema. Não interrompa por conta própria, mesmo sentindo pressão normal — é o medicamento mantendo-a assim.",
    "resposta_rapida": [
      "IECA para hipertensão e proteção cardíaca/renal",
      "Tosse seca: efeito muito comum — informe o médico",
      "Angioedema (inchaço de lábios/garganta): emergência",
      "PROIBIDO na gravidez",
      "Não combinar com AINEs sem orientação médica"
    ],
    "sinonimos": ["coversyl", "acertil", "perindopril arginina", "perindopril erbumina"],
    "classe_receita": "TARJADO_PRATICA",
    "receita_display": "🔴 Receita Simples",
    "receita_descricao": "Exige prescrição médica.",
    "receita_cor": "vermelho",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      { "pergunta": "Para que serve o perindopril?", "resposta": "O perindopril (Coversyl) é usado para controlar a pressão alta (hipertensão), tratar a insuficiência cardíaca e proteger os rins em diabéticos (nefropatia diabética). Também é prescrito para reduzir o risco de infartos e AVCs em pacientes com histórico cardiovascular. Age dilatando os vasos sanguíneos." },
      { "pergunta": "Por que o perindopril causa tosse?", "resposta": "A tosse seca é um efeito de classe de todos os IECAs — não é exclusivo do perindopril. Quando a ECA é inibida, acumula-se bradicinina nos pulmões, que irrita os receptores da tosse. A tosse é persistente, seca e incomoda principalmente à noite. Se for muito incômoda, o médico pode substituir por um BRA (losartana, valsartana) que não causa esse efeito." },
      { "pergunta": "O inchaço nos lábios com o perindopril é perigoso?", "resposta": "Sim — angioedema é uma emergência. O inchaço pode progredir para a garganta em minutos e obstruir as vias aéreas. Se surgir qualquer inchaço de lábios, língua, face ou garganta, ligue imediatamente para o SAMU (192) ou vá à emergência. O perindopril deve ser suspenso definitivamente e nunca reintroduzido." },
      { "pergunta": "Posso tomar perindopril com ibuprofeno?", "resposta": "Com cautela. AINEs como ibuprofeno e naproxeno antagonizam o efeito anti-hipertensivo dos IECAs e, combinados com diurético, formam a 'tríade nefrotóxica', que pode causar lesão renal aguda — especialmente em idosos e desidratados. Paracetamol é a alternativa mais segura para dor em quem usa perindopril." },
      { "pergunta": "Posso engravidar tomando perindopril?", "resposta": "Não. O perindopril é contraindicado na gravidez — causa malformações renais e pode ser fatal para o feto no 2º e 3º trimestres. Se você planeja engravidar ou suspeita de gravidez, informe o médico imediatamente para trocar o medicamento por um anti-hipertensivo seguro na gestação (como metildopa ou nifedipina)." },
      { "pergunta": "Perindopril pode causar tontura?", "resposta": "Sim, especialmente na primeira dose ou quando a pressão cai de forma rápida. Levante-se devagar da cama ou da cadeira para evitar tontura ao mudar de posição (hipotensão ortostática). Se a tontura for intensa ou frequente, informe ao médico — pode ser necessário ajustar a dose." }
    ],
    "descricao_seo": "Perindopril (Coversyl, Acertil) é um IECA indicado para: hipertensão arterial, insuficiência cardíaca, proteção renal no diabetes e prevenção de infarto/AVC. Efeitos colaterais mais relatados: tosse seca persistente e tontura. Atenção: angioedema é emergência. CONTRAINDICADO na gravidez. Perindopril é vendido com receita médica.",
    "alerta_farmaceutico": "IECA: verificar gestação (CI absoluta). Monitorar potássio — especialmente se associado a diurético poupador de potássio (espironolactona) ou suplemento de K+. Tríade IECA + AINE + diurético: alto risco de IRA — questionar uso de AINEs. Angioedema: contraindicar reintrodução. Tosse seca: orientar que pode trocar por BRA se muito incômoda.",
    "quando_procurar_medico": "Procure médico IMEDIATAMENTE se: inchaço de lábios, língua ou garganta. Procure em breve se: tosse seca persistente que incomoda, tontura intensa ao levantar, pressão muito baixa, fraqueza muscular intensa (hipercalemia), ou se a pressão não for controlada com a dose atual.",
    "interacoes": [
      { "com": ["ibuprofeno", "naproxeno", "diclofenaco", "indometacina", "ácido mefenâmico"], "nivel": "moderado", "titulo": "Perindopril + AINE", "efeito": "AINEs reduzem efeito anti-hipertensivo e, combinados com diurético, elevam risco de lesão renal aguda.", "conduta": "⚠️ Evitar AINEs. Usar paracetamol para dor. Se necessário, monitorar PA e função renal." },
      { "com": ["espironolactona", "cloreto de potássio", "gluconato de potássio"], "nivel": "moderado", "titulo": "Perindopril + Poupador de Potássio", "efeito": "Risco de hipercalemia — potássio elevado pode causar arritmias graves.", "conduta": "⚠️ Monitorar potássio sérico regularmente. Evitar suplementação de potássio sem indicação." }
    ]
  }

];

// ─── Adicionar ao array (inserção alfabética) ─────────────────────────────────
let adicionados = 0;
for (const med of novosMeds) {
  if (jaExiste(med.generico)) {
    console.log(`  JÁ EXISTE: ${med.generico}`);
    continue;
  }
  const idx = meds.findIndex(m => (m.nome || '').localeCompare(med.nome, 'pt') > 0);
  if (idx === -1) meds.push(med);
  else meds.splice(idx, 0, med);
  adicionados++;
  console.log(`  ✓ ${med.generico}`);
}

fs.writeFileSync(MEDS_PATH, JSON.stringify(meds, null, 2), 'utf-8');
console.log(`\n✓ medicamentos.json atualizado — ${adicionados} adicionados (total: ${meds.length})`);

// ─── mcMedNomes ────────────────────────────────────────────────────────────────
let html = fs.readFileSync(HTML_PATH, 'utf-8');
const lineMatch = html.match(/(const mcMedNomes = \[)(.*?)(\];)/);
let arr = JSON.parse('[' + lineMatch[2] + ']');
let nAdicionados = 0;

const nomesParaAdicionar = [
  // Metilprednisolona → após Metilfenidato
  { nome: 'Metilprednisolona', após: 'Metilfenidato' },
  { nome: 'Depo-Medrol',      após: 'Metilprednisolona' },
  { nome: 'Solu-Medrol',      após: 'Depo-Medrol' },
  // Cetoprofeno → após Carvedilol (seção C)
  { nome: 'Cetoprofeno',      após: 'Carvedilol' },
  { nome: 'Profenid',         após: 'Cetoprofeno' },
  { nome: 'Biprofenid',       após: 'Profenid' },
  // Levocetirizina → após Levodopa (L)
  { nome: 'Levocetirizina',   após: 'Levotiroxina' },
  { nome: 'Xyzal',            após: 'Levocetirizina' },
  // Indometacina → após Ibuprofeno
  { nome: 'Indometacina',     após: 'Ibuprofeno' },
  { nome: 'Indocid',          após: 'Indometacina' },
  // Anastrozol → após Amiodarona
  { nome: 'Anastrozol',       após: 'Amiodarona' },
  { nome: 'Arimidex',         após: 'Anastrozol' },
  // Propafenona → após Prednisona
  { nome: 'Propafenona',      após: 'Prednisona' },
  { nome: 'Rytmonorm',        após: 'Propafenona' },
  // Tinidazol → após Tenoxicam (T)
  { nome: 'Tinidazol',        após: 'Tramadol' },
  { nome: 'Fasigyn',          após: 'Tinidazol' },
  // Timolol → após Tinidazol
  { nome: 'Timolol',          após: 'Fasigyn' },
  // Risedronato → após Rifampicina (R)
  { nome: 'Risedronato',      após: 'Rifampicina' },
  { nome: 'Actonel',          após: 'Risedronato' },
  // Perindopril → após Paroxetina
  { nome: 'Perindopril',      após: 'Paroxetina' },
  { nome: 'Coversyl',         após: 'Perindopril' },
];

for (const { nome, após } of nomesParaAdicionar) {
  if (arr.some(n => n.toLowerCase() === nome.toLowerCase())) {
    console.log(`  mcMedNomes: ${nome} já existe`);
    continue;
  }
  const idx = arr.findIndex(n => n.toLowerCase() === após.toLowerCase());
  if (idx === -1) {
    arr.push(nome);
    console.log(`  mcMedNomes: ${nome} → no final (âncora "${após}" não encontrada)`);
  } else {
    arr.splice(idx + 1, 0, nome);
    console.log(`  mcMedNomes: ${nome} → após "${após}"`);
  }
  nAdicionados++;
}

if (nAdicionados > 0) {
  const novaLinha = 'const mcMedNomes = ' + JSON.stringify(arr) + ';';
  html = html.replace(/const mcMedNomes = \[.*?\];/, novaLinha);
  fs.writeFileSync(HTML_PATH, html, 'utf-8');
  console.log(`\n✓ mcMedNomes atualizado — ${nAdicionados} nomes adicionados (total: ${arr.length})`);
}
