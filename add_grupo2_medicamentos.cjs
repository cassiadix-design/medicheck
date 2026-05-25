// Adiciona/atualiza 8 entradas no medicamentos.json (Grupo 2 prioritários)
const fs   = require('fs');
const path = require('path');
const MEDS_PATH = path.join(__dirname, 'medicamentos.json');

let meds = JSON.parse(fs.readFileSync(MEDS_PATH, 'utf-8'));

// ── 1. Patch sinônimos em entradas existentes ─────────────────────────────────
const patches = {
  'clopidogrel': { sinonimos: ['Plavix','Clopidogrel','Clopaliv','Iscover','Trombex'] },
  'digoxina':    { sinonimos: ['Lanoxin','Digoxin','Cardioxin','Digoxina'] },
  'metotrexato': { sinonimos: ['Methotrexate','MTX','Tecnomet','Metrexato','Ledertrexato','Methofar'] },
  'amiodarona':  { sinonimos: ['Cordarone','Ancoron','Atlansil','Amiodarona'] },
};

for (const [key, patch] of Object.entries(patches)) {
  const idx = meds.findIndex(m =>
    (m.generico||'').toLowerCase().includes(key) ||
    (m.nome||'').toLowerCase().includes(key)
  );
  if (idx === -1) { console.log('NÃO ENCONTRADO:', key); continue; }
  meds[idx] = { ...meds[idx], ...patch };
  console.log('✓ Sinônimos adicionados a:', meds[idx].nome);
}

// ── 2. Novas entradas ─────────────────────────────────────────────────────────
const novas = [

// ── SEMAGLUTIDA INJETÁVEL (OZEMPIC / WEGOVY) ──────────────────────────────────
{
  "nome": "Ozempic / Wegovy (Semaglutida Injetável)",
  "generico": "Semaglutida Injetável",
  "tipo": "Agonista do GLP-1 / Antidiabético e Antiobesidade",
  "descricao": "Semaglutida injetável de aplicação subcutânea semanal. O Ozempic (0,5–2mg) é indicado para diabetes tipo 2 e redução de risco cardiovascular. O Wegovy (2,4mg) é indicado especificamente para obesidade. Ambos promovem perda de peso significativa (10–15% do peso corporal) por redução do apetite e retardo do esvaziamento gástrico.",
  "receita": "Sim",
  "receita_nota": "⚠️ RECEITA OBRIGATÓRIA COM RETENÇÃO desde 23/06/2025. Validade: 90 dias.",
  "efeitos": "Náusea (muito comum no início), vômito, diarreia, constipação, dor abdominal. Risco de pancreatite aguda. Possível piora de retinopatia diabética. Reações no local de aplicação.",
  "aviso_grave": "Contraindicado em histórico pessoal ou familiar de câncer medular de tireoide ou síndrome MEN2 (neoplasia endócrina múltipla tipo 2). Não usar em gravidez ou aleitamento. Em caso de pancreatite (dor abdominal intensa irradiando para as costas), suspender imediatamente e procurar emergência.",
  "recomendacao": "🔴 EMERGÊNCIA se: dor abdominal intensa e persistente, vômitos incoercíveis, sinais de hipoglicemia grave (confusão, inconsciência). Ligue 192 (SAMU).",
  "educacao": "Aplicar por via subcutânea (barriga, coxa ou braço) uma vez por semana — sempre no mesmo dia da semana. Iniciar com dose baixa e aumentar gradualmente conforme orientação médica para reduzir náusea. Conservar em geladeira (2°C–8°C) até o primeiro uso; após o primeiro uso do dispositivo, pode ser mantido fora da geladeira por até 56 dias (conferir bula do produto específico).",
  "resposta_rapida": [
    "Injeção semanal subcutânea",
    "Diabetes tipo 2 e obesidade",
    "Ozempic = DM2 | Wegovy = obesidade",
    "⚠️ RECEITA com retenção obrigatória",
    "Conservar na geladeira"
  ],
  "sinonimos": [
    "Ozempic","Wegovy","Semaglutida","semaglutida injetável","GLP-1","ozempic 0,5mg","ozempic 1mg","ozempic 2mg","wegovy 2,4mg"
  ],
  "classe_receita": "RECEITA_ESPECIAL",
  "receita_display": "🔴 Receita com Retenção",
  "receita_cor": "vermelho",
  "receita_obrigatoria": true,
  "tipo_receita": "simples",
  "retencao_receita": true,
  "perguntas_frequentes": [
    {
      "pergunta": "Qual a diferença entre Ozempic e Wegovy?",
      "resposta": "Têm o mesmo princípio ativo (semaglutida injetável), mas doses diferentes e indicações distintas. Ozempic (até 2mg) é indicado para diabetes tipo 2 e redução de risco cardiovascular. Wegovy (2,4mg) é indicado para obesidade (IMC ≥30 ou ≥27 com comorbidade). A perda de peso é maior com o Wegovy pela dose mais alta."
    },
    {
      "pergunta": "Ozempic emagrece mesmo sem diabetes?",
      "resposta": "Sim, a semaglutida promove emagrecimento independentemente do diabetes, pois reduz o apetite e retarda o esvaziamento gástrico. O Wegovy foi aprovado especificamente para obesidade sem diabetes. O uso de Ozempic para emagrecimento sem indicação diabética é 'off-label' no Brasil."
    },
    {
      "pergunta": "Como aplicar o Ozempic?",
      "resposta": "Subcutânea (sob a pele) uma vez por semana — barriga, coxa ou parte superior do braço. Rotacionar os locais a cada semana. Pode ser aplicado em qualquer horário do dia, com ou sem alimento."
    },
    {
      "pergunta": "O que fazer se sentir muita náusea?",
      "resposta": "Náusea é muito comum no início e tende a melhorar após as primeiras semanas. Comer devagar, em porções menores e evitar alimentos gordurosos ajuda. Se for insuportável, não aumente a dose — mantenha a dose atual por mais tempo conforme orientação médica."
    },
    {
      "pergunta": "Posso tomar outros medicamentos junto com o Ozempic?",
      "resposta": "Sim, mas avise seu médico de tudo que toma. O Ozempic pode retardar a absorção de medicamentos orais ao lento esvaziamento gástrico. Em especial, anticoagulantes, contraceptivos e antibióticos podem ter absorção alterada."
    }
  ],
  "descricao_seo": "Ozempic/Wegovy (Semaglutida Injetável) é indicado para diabetes tipo 2 e obesidade. Aplicação subcutânea semanal com perda de peso significativa. Requer receita com retenção obrigatória.",
  "quando_procurar_medico": "Procure médico se: dor abdominal intensa (possível pancreatite), vômitos que impedem alimentação, nódulo no pescoço (sinal de tireoide), episódios de hipoglicemia ou hiperglicemia persistente.",
  "alerta_farmaceutico": "Verificar conservação: deve ser refrigerado. Após primeiro uso, prazo fora da geladeira varia por produto. Confirmar dose prescrita (Ozempic tem dispositivos diferentes para 0,25–0,5mg e 1–2mg). Não agitar o dispositivo."
},

// ── RITUXIMABE ────────────────────────────────────────────────────────────────
{
  "nome": "MabThera / Mabtera (Rituximabe)",
  "generico": "Rituximabe",
  "tipo": "Anticorpo Monoclonal Anti-CD20 / Imunobiológico",
  "descricao": "Anticorpo monoclonal quimérico que se liga ao antígeno CD20 presente em linfócitos B, promovendo sua depleção. Indicado para linfoma não-Hodgkin de células B, leucemia linfocítica crônica (LLC), artrite reumatoide (em combinação com metotrexato) e vasculites associadas a ANCA. Disponível via SUS para algumas indicações oncológicas.",
  "receita": "Sim",
  "receita_nota": "Uso exclusivamente hospitalar ou ambulatorial especializado. Prescrição por oncologista ou reumatologista.",
  "efeitos": "Reações infusionais (febre, calafrios, hipotensão — maioria na 1ª infusão). Infecções oportunistas graves por depleção de linfócitos B. Reativação de hepatite B (potencialmente fatal). Leucoencefalopatia multifocal progressiva (LMP) — rara mas grave.",
  "aviso_grave": "Risco de reativação do vírus da hepatite B (HBV) — potencialmente fatal. Triagem obrigatória para HBsAg e anti-HBc antes do tratamento. Portadores devem receber profilaxia antiviral. Contraindicado em infecção ativa grave. Risco de LMP (infecção cerebral oportunista por vírus JC) em pacientes imunossuprimidos.",
  "recomendacao": "🔴 Infusão hospitalar com monitoração contínua. Em caso de reação infusional grave (broncoespasmo, hipotensão, angioedema) interromper e acionar equipe médica imediatamente.",
  "educacao": "Administrado por infusão intravenosa lenta (2–6 horas) em ambiente hospitalar. O paciente recebe pré-medicação (corticoide, anti-histamínico, paracetamol) para reduzir reações infusionais. O efeito imunossupressor persiste por meses após o tratamento — evitar vacinas de vírus vivo por pelo menos 6 meses.",
  "resposta_rapida": [
    "Anticorpo monoclonal anti-linfócitos B",
    "Linfoma, LLC, Artrite Reumatoide grave",
    "Infusão IV hospitalar",
    "⚠️ Rastrear hepatite B antes",
    "Imunossupressão prolongada"
  ],
  "sinonimos": [
    "MabThera","Mabtera","Rituximabe","Rituxan","rituximab","CD20","anti-CD20"
  ],
  "classe_receita": "USO_HOSPITALAR",
  "receita_display": "🏥 Uso Hospitalar",
  "receita_cor": "roxo",
  "receita_obrigatoria": true,
  "tipo_receita": "hospitalar",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "O rituximabe cura o linfoma?",
      "resposta": "Depende do tipo e estágio do linfoma. Nos linfomas difusos de grandes células B (DLBCL) o esquema R-CHOP com rituximabe alcança remissão completa em cerca de 60–70% dos casos. Em outros tipos, é usado para controle da doença."
    },
    {
      "pergunta": "Por que preciso fazer exame de hepatite antes de tomar rituximabe?",
      "resposta": "Porque o rituximabe pode reativar o vírus da hepatite B em portadores inativos, causando hepatite fulminante e fatal. A triagem é obrigatória para todos. Se positivo para HBsAg ou anti-HBc, você receberá medicamento antiviral preventivo durante e após o tratamento."
    },
    {
      "pergunta": "Quanto tempo dura o efeito do rituximabe no sistema imune?",
      "resposta": "O rituximabe depleta os linfócitos B por 6–9 meses após a última infusão. Durante esse período, a imunidade está significativamente reduzida — evite contato com pessoas doentes e informe ao médico antes de tomar qualquer vacina."
    }
  ],
  "descricao_seo": "Rituximabe (MabThera) é anticorpo monoclonal usado em linfoma, leucemia linfocítica crônica e artrite reumatoide grave. Administrado por infusão hospitalar com risco de reativação de hepatite B.",
  "quando_procurar_medico": "Urgência: febre durante ou após infusão, sintomas de infecção (febre persistente, tosse, dispneia), icterícia (hepatite B), confusão mental ou fraqueza progressiva (LMP).",
  "alerta_farmaceutico": "Verificar resultado de HBsAg e anti-HBc antes de dispensar. Produto deve ser refrigerado (2°C–8°C). Não agitar. Uso exclusivo IV — não SC. Pré-medicação padrão: metilprednisolona + difenidramina + paracetamol."
},

// ── TOCILIZUMABE ──────────────────────────────────────────────────────────────
{
  "nome": "Actemra (Tocilizumabe)",
  "generico": "Tocilizumabe",
  "tipo": "Anticorpo Monoclonal Anti-IL-6 / Imunobiológico",
  "descricao": "Anticorpo monoclonal que bloqueia o receptor de interleucina-6 (IL-6), citocina central na cascata inflamatória. Indicado para artrite reumatoide de moderada a grave (quando outros DMARDs falharam), artrite idiopática juvenil sistêmica e poliarticular, e síndrome de liberação de citocinas (SLC) induzida por terapia com células CAR-T. Ganhou destaque no tratamento de COVID-19 grave (síndrome de tempestade de citocinas).",
  "receita": "Sim",
  "receita_nota": "Prescrição por reumatologista, imunologista ou em contexto hospitalar.",
  "efeitos": "Infecções das vias aéreas superiores, nasofaringite, cefaleia, hipertensão. Elevação de transaminases, neutropenia, trombocitopenia. Risco de infecções graves e reativação de tuberculose.",
  "aviso_grave": "Risco de infecções graves — incluindo tuberculose latente (triagem obrigatória com PPD/IGRA antes do início). Pode mascarar febre e sintomas de infecção (por bloquear IL-6, que é mediador da resposta febril) — infecções graves podem se apresentar de forma atípica, sem febre. Perfuração gastrointestinal relatada em pacientes com doença diverticular.",
  "recomendacao": "🔴 EMERGÊNCIA: febre alta, dor abdominal intensa, dispneia, confusão mental durante ou após infusão — procure pronto-socorro imediatamente.",
  "educacao": "Disponível em formulação IV (infusão hospitalar a cada 4 semanas) e SC (injeção subcutânea semanal ou quinzenal para AR). A formulação SC permite autoaplicação após treinamento. Não tomar vacinas de vírus vivo durante o tratamento.",
  "resposta_rapida": [
    "Bloqueia IL-6 — reduz inflamação",
    "Artrite Reumatoide grave, COVID grave, CAR-T",
    "IV hospitalar ou SC domiciliar",
    "⚠️ Triagem TB obrigatória antes",
    "Pode mascarar infecções (sem febre)"
  ],
  "sinonimos": [
    "Actemra","Tocilizumabe","tocilizumab","anti-IL-6","IL-6 receptor antagonist","RoActemra"
  ],
  "classe_receita": "USO_HOSPITALAR",
  "receita_display": "🏥 Uso Especializado",
  "receita_cor": "roxo",
  "receita_obrigatoria": true,
  "tipo_receita": "hospitalar",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Para que serve o tocilizumabe além da artrite?",
      "resposta": "Foi amplamente usado em COVID-19 grave para tratar a síndrome de liberação de citocinas (tempestade de citocinas). Também é indicado para artrite idiopática juvenil sistêmica e síndrome de ativação macrofágica, além de ser o tratamento de primeira linha para síndrome de liberação de citocinas por CAR-T."
    },
    {
      "pergunta": "Por que preciso fazer PPD/tuberculina antes de usar tocilizumabe?",
      "resposta": "Porque o tocilizumabe suprime o sistema imune. Tuberculose latente (sem sintomas) pode ser reativada durante o tratamento, causando tuberculose ativa grave. O rastreamento e tratamento profilático da TB latente antes de iniciar é obrigatório."
    },
    {
      "pergunta": "O tocilizumabe pode mascarar uma infecção?",
      "resposta": "Sim — e isso é especialmente importante. A IL-6 é um mediador essencial da febre. Ao bloqueá-la, o tocilizumabe pode suprimir a febre em infecções graves, fazendo com que o paciente não perceba que está gravemente infectado. Qualquer mal-estar, mesmo sem febre, deve ser comunicado ao médico."
    }
  ],
  "descricao_seo": "Tocilizumabe (Actemra) é anticorpo monoclonal que bloqueia IL-6, usado em artrite reumatoide grave, COVID grave e síndrome de tempestade de citocinas. Pode mascarar infecções. Triagem de tuberculose obrigatória.",
  "quando_procurar_medico": "Urgência: febre, infecção suspeita (qualquer localização), dor abdominal intensa (perfuração intestinal), neutropenia sintomática ou icterícia.",
  "alerta_farmaceutico": "Atenção: tocilizumabe suprime IL-6 — marcadores inflamatórios (PCR, ferritina, IL-6) ficam artificialmente baixos durante o tratamento, mesmo em infecções ativas. Não usar esses marcadores como único critério de controle de infecção nesse paciente."
},

// ── TACROLIMO SISTÊMICO (PROGRAF) ────────────────────────────────────────────
{
  "nome": "Prograf / Advagraf (Tacrolimo Sistêmico)",
  "generico": "Tacrolimo (Sistêmico)",
  "tipo": "Imunossupressor / Inibidor de Calcineurina",
  "descricao": "Potente imunossupressor macrólido inibidor da calcineurina, utilizado na prevenção e tratamento da rejeição de transplantes de órgãos sólidos (rim, fígado, coração, pulmão) e medula óssea. Também usado no tratamento de síndrome nefrótica corticorresistente e algumas doenças autoimunes refratárias. Possui janela terapêutica extremamente estreita — monitoração dos níveis séricos é obrigatória.",
  "receita": "Sim",
  "receita_nota": "Medicamento de controle especial — uso exclusivo em centros de transplante e especialistas.",
  "efeitos": "Nefrotoxicidade (risco dose-dependente e cumulativo), neurotoxicidade (tremores, cefaleia, parestesias, convulsões), hipertensão, hiperglicemia induzida (diabetes pós-transplante — NODAT), hipercalemia, infecções oportunistas. Risco aumentado de linfoma e neoplasias de pele.",
  "aviso_grave": "Janela terapêutica estreita — superdose causa nefrotoxicidade e neurotoxicidade graves; subdose causa rejeição do enxerto. Monitoração dos níveis de tacrolimo (nível mínimo — 'trough') é obrigatória. Inúmeras interações medicamentosas por CYP3A4 e P-glicoproteína que podem alterar drasticamente os níveis. Risco aumentado de linfoma não-Hodgkin e câncer de pele — usar protetor solar diariamente.",
  "recomendacao": "🔴 EMERGÊNCIA se: sinais de rejeição (febre, dor no enxerto, queda da função do órgão), infecção grave ou convulsões. Ligue imediatamente para o centro de transplante.",
  "educacao": "Tomar sempre no mesmo horário, sem variação. Não alterar a marca ou formulação sem orientação do transplantólogo — Prograf (liberação imediata, 2×/dia) e Advagraf (liberação prolongada, 1×/dia) NÃO são intercambiáveis sem ajuste de dose. Evitar suco de grapefruit. Proteger a pele do sol. Relatar qualquer novo medicamento ao médico do transplante antes de iniciar.",
  "resposta_rapida": [
    "Imunossupressor pós-transplante",
    "Janela terapêutica estreitíssima",
    "Monitorar nível sérico obrigatório",
    "Inúmeras interações (CYP3A4)",
    "Risco de nefrotoxicidade e linfoma"
  ],
  "sinonimos": [
    "Prograf","Advagraf","Tacrolimo","Tacrolimus","FK506","tacrolimus oral","tacrolimus sistêmico"
  ],
  "classe_receita": "RECEITA_ESPECIAL",
  "receita_display": "🔴 Controle Especial",
  "receita_cor": "vermelho",
  "receita_obrigatoria": true,
  "tipo_receita": "especial",
  "retencao_receita": true,
  "perguntas_frequentes": [
    {
      "pergunta": "Por que preciso medir o nível de tacrolimo no sangue?",
      "resposta": "Porque a janela terapêutica é muito estreita — a dose exata varia entre pessoas e ao longo do tempo. Nível abaixo do alvo = risco de rejeição do transplante. Nível acima = risco de toxicidade renal (nefrotoxicidade) e neurológica. O 'trough level' (colhido imediatamente antes da dose) é o parâmetro padrão."
    },
    {
      "pergunta": "Posso trocar o Prograf pelo Advagraf?",
      "resposta": "Não sem orientação médica. Embora tenham o mesmo princípio ativo, os perfis de absorção são diferentes — Prograf é tomado duas vezes ao dia e Advagraf uma vez ao dia. A troca sem ajuste de dose pode resultar em subdosagem ou superdosagem, com risco de rejeição ou toxicidade."
    },
    {
      "pergunta": "Por que devo evitar o grapefruit?",
      "resposta": "O grapefruit inibe o CYP3A4 intestinal, a enzima responsável pelo metabolismo do tacrolimo. Mesmo pequenas quantidades podem elevar dramaticamente os níveis do medicamento, causando toxicidade grave."
    },
    {
      "pergunta": "Posso tomar antibiótico junto com o tacrolimo?",
      "resposta": "Apenas com autorização do transplantólogo — muitos antibióticos (claritromicina, eritromicina, fluconazol, rifampicina) interagem fortemente com o tacrolimo, alterando muito seus níveis. Antes de qualquer novo medicamento, mesmo automedicação, consulte seu médico do transplante."
    },
    {
      "pergunta": "Por que preciso usar protetor solar com o tacrolimo?",
      "resposta": "A imunossupressão crônica aumenta significativamente o risco de câncer de pele, especialmente carcinoma espinocelular. O protetor solar diário (FPS ≥50) e evitar exposição excessiva ao sol são medidas fundamentais de prevenção em transplantados."
    }
  ],
  "descricao_seo": "Tacrolimo sistêmico (Prograf/Advagraf) é imunossupressor essencial no pós-transplante. Janela terapêutica estreita exige monitoração contínua dos níveis séricos. Inúmeras interações com CYP3A4.",
  "quando_procurar_medico": "Urgência: febre, qualquer sinal de infecção, tremores ou convulsões, queda da função renal, icterícia (transplante hepático), redução súbita da diurese (transplante renal) ou dor no local do enxerto.",
  "alerta_farmaceutico": "NUNCA substituir Prograf por Advagraf ou genérico sem ajuste de dose e nova dosagem do nível sérico. Verificar formulação na prescrição. Produto sensível à luz — manter embalagem fechada. Monitorar glicemia: pode induzir diabetes (NODAT) em até 20% dos transplantados."
}

];

// ── Verificar duplicatas antes de adicionar ───────────────────────────────────
for (const nova of novas) {
  const existe = meds.find(m =>
    (m.generico||'').toLowerCase() === (nova.generico||'').toLowerCase() ||
    (m.nome||'').toLowerCase() === (nova.nome||'').toLowerCase()
  );
  if (existe) {
    console.log('⚠️  Já existe (pulando):', nova.nome);
  } else {
    meds.push(nova);
    console.log('✓  Adicionado:', nova.nome);
  }
}

fs.writeFileSync(MEDS_PATH, JSON.stringify(meds, null, 2), 'utf-8');
console.log('\nTotal medicamentos.json:', meds.length);
