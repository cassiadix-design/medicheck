// Lote 3: 5 novas entradas + patches de sinônimos nas 10 existentes
const fs   = require('fs');
const path = require('path');
const MEDS_PATH = path.join(__dirname, 'medicamentos.json');
let meds = JSON.parse(fs.readFileSync(MEDS_PATH, 'utf-8'));

// ── Patches de sinônimos nas entradas existentes ──────────────────────────────
const patches = [
  { busca: 'leflunomida',      sinonimos: ['Arava','Leflunomida','leflunomide'] },
  { busca: 'hidroxicloroquina',sinonimos: ['Reuquinol','Plaquinol','Hidroxicloroquina','hydroxychloroquine','HCQ'] },
  { busca: 'sulfassalazina',   sinonimos: ['Salazopyrin','Azulfidine','Sulfassalazina','sulfasalazine'] },
  { busca: 'alopurinol',       sinonimos: ['Zyloprim','Alopurinol','allopurinol','Zyloric'] },
  { busca: 'colchicina',       sinonimos: ['Colchicina','Colchis','colchicine'] },
  { busca: 'febuxostato',      sinonimos: ['Adenuric','Uloric','Febuxostato','febuxostat'] },
  { busca: 'raloxifeno',       sinonimos: ['Evista','Raloxifeno','raloxifene'] },
  { busca: 'denosumabe',       sinonimos: ['Prolia','Xgeva','Denosumabe','denosumab'] },
  { busca: 'calcitriol',       sinonimos: ['Rocaltrol','Calcitriol','calcitriol','Calcijex'] },
  { busca: 'azatioprina',      sinonimos: ['Imuran','Azatioprina','azathioprine','Imuprin'] },
];

for (const p of patches) {
  const idx = meds.findIndex(m =>
    (m.generico||'').toLowerCase().includes(p.busca) ||
    (m.nome||'').toLowerCase().includes(p.busca)
  );
  if (idx === -1) { console.log('NÃO ENCONTRADO:', p.busca); continue; }
  const atuais = meds[idx].sinonimos || [];
  const novos = p.sinonimos.filter(s => !atuais.some(a => a.toLowerCase()===s.toLowerCase()));
  if (novos.length) {
    meds[idx].sinonimos = [...atuais, ...novos];
    console.log('✓ patch', meds[idx].nome, '→', novos.join(', '));
  }
}

// ── 5 novas entradas ──────────────────────────────────────────────────────────
const novas = [

// ── PENICILAMINA ──────────────────────────────────────────────────────────────
{
  "nome": "Penicilamina 250mg (Cupripen / Trolovol)",
  "generico": "Penicilamina",
  "tipo": "DMARD / Quelante de Metais Pesados",
  "descricao": "Agente quelante e imunomodulador derivado da hidrólise da penicilina (sem atividade antibacteriana). Indicado para artrite reumatoide grave refratária, doença de Wilson (acúmulo de cobre), cistinúria e intoxicação por metais pesados (chumbo, mercúrio, ouro). Mecanismo em AR: reduz os títulos de fator reumatoide e suprime a função linfocitária. Uso cada vez mais restrito na AR pela disponibilidade de DMARDs mais eficazes e seguros.",
  "receita": "Sim",
  "receita_nota": "Receita simples. Uso sob supervisão de reumatologista ou especialista.",
  "efeitos": "Náusea, vômitos, perda do paladar (ageusia) — muito comum no início. Proteinúria, hematúria (nefrotoxicidade). Trombocitopenia, leucopenia. Rash cutâneo. Raramente: síndrome miastênica, lúpus induzido, pênfigo.",
  "aviso_grave": "Monitoração rigorosa obrigatória: hemograma completo e urinálise (proteinúria) a cada 2 semanas no início, depois mensalmente. Suspender imediatamente se: proteinúria >1g/24h, trombocitopenia (<100.000/mm³) ou leucopenia (<3.500/mm³). Contraindicada em insuficiência renal grave. NUNCA usar com outros agentes nefrotóxicos ou mielossupressores sem cautela extrema.",
  "recomendacao": "🔴 URGÊNCIA: fraqueza muscular progressiva (miastenia), erupção cutânea bolhosa, sangramento ou hematomas inexplicados, urina espumosa persistente (proteinúria).",
  "educacao": "Tomar com estômago vazio (1h antes das refeições) — alimentos reduzem a absorção. Iniciar com doses baixas e aumentar gradualmente. Evitar zinco, ferro e antiácidos próximos ao horário da dose. Não interromper abruptamente — a doença pode recrudescer. Guardar em local fresco e seco.",
  "resposta_rapida": [
    "AR grave, Wilson, metais pesados",
    "Tomar em jejum — absorção comprometida com alimentos",
    "Monitorar hemograma + urina mensalmente",
    "Suspender se proteinúria ou citopenia",
    "Receita simples"
  ],
  "sinonimos": ["Cupripen","Trolovol","Penicilamina","penicilamina","penicillamine","D-penicilamina"],
  "classe_receita": "RECEITA_SIMPLES",
  "receita_display": "🟡 Receita Simples",
  "receita_cor": "amarelo",
  "receita_obrigatoria": true,
  "tipo_receita": "simples",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Penicilamina tem relação com penicilina — alérgico à penicilina pode usar?",
      "resposta": "A penicilamina é estruturalmente relacionada à penicilina, mas não é um antibiótico. Pacientes alérgicos à penicilina têm risco aumentado de reação cruzada com a penicilamina — porém a incidência não é universal. Informar obrigatoriamente qualquer alergia a penicilina ao médico antes de iniciar."
    },
    {
      "pergunta": "Por que perco o gosto dos alimentos com penicilamina?",
      "resposta": "A perda ou alteração do paladar (ageusia ou disgeusia) é um efeito muito comum, especialmente nas primeiras semanas. Ocorre pela quelação de zinco e cobre na mucosa oral. Tende a melhorar com o tempo. Suplementação de zinco separada da penicilamina pode ajudar, mas deve ser discutida com o médico."
    },
    {
      "pergunta": "Por que preciso fazer exame de urina frequentemente?",
      "resposta": "A penicilamina pode causar nefrotoxicidade com proteinúria — proteína em quantidade anormal na urina indica lesão glomerular. Se detectada precocemente e o medicamento suspenso, a função renal geralmente se recupera. Por isso a urinálise frequente é essencial."
    }
  ],
  "descricao_seo": "Penicilamina (Cupripen/Trolovol) é DMARD para AR grave, doença de Wilson e intoxicação por metais. Monitoração intensiva de hemograma e urina obrigatória. Tomar em jejum.",
  "quando_procurar_medico": "Urgência: urina espumosa, hematúria, fraqueza muscular progressiva, erupção cutânea bolhosa, sangramento ou equimoses sem causa aparente.",
  "alerta_farmaceutico": "Não dispensar sem exames recentes (hemograma + urinálise). Interações importantes com ferro, zinco, antiácidos e ouro. Separar administração de outros quelantes por 2 horas. Produto sensível à umidade."
},

// ── BAZEDOXIFENO ──────────────────────────────────────────────────────────────
{
  "nome": "Viviant / Conbriza (Bazedoxifeno 20mg)",
  "generico": "Bazedoxifeno",
  "tipo": "SERM — Modulador Seletivo do Receptor de Estrogênio",
  "descricao": "Modulador seletivo do receptor de estrogênio (SERM) de terceira geração, com efeito agonista ósseo (previne reabsorção) e antagonista endometrial e mamário. Indicado para tratamento da osteoporose em mulheres pós-menopáusicas com risco aumentado de fratura, especialmente quando outros tratamentos não são adequados. Também disponível em associação com estrogênios conjugados (Duavive) para tratamento dos sintomas da menopausa com proteção endometrial — sem necessidade de progestagênio.",
  "receita": "Sim",
  "receita_nota": "Receita simples.",
  "efeitos": "Fogachos (ondas de calor) — comuns, especialmente nos primeiros meses. Câimbras nas pernas, espasmos musculares. Risco de tromboembolismo venoso (TVP, embolia pulmonar) — classe SERM.",
  "aviso_grave": "Risco de tromboembolismo venoso (TVP, embolia pulmonar) — contraindicado em histórico de trombose venosa ou arterial, imobilização prolongada, cirurgia com risco trombótico. Não usar em gravidez (teratogênico) nem em pré-menopausa. Suspender 72h antes de cirurgias ou imobilização prolongada.",
  "recomendacao": "🔴 URGÊNCIA: dor, inchaço e calor em perna (TVP), falta de ar súbita ou dor no peito (embolia pulmonar) → SAMU 192 imediatamente.",
  "educacao": "Tomar uma vez ao dia, com ou sem alimento. Suplementação de cálcio e vitamina D é necessária em paralelo para maximizar o benefício ósseo. Atividade física regular potencializa o efeito na densidade óssea. Não substitui os estrogênios para alívio de fogachos (pode até piorá-los levemente — exceto na formulação combinada Duavive).",
  "resposta_rapida": [
    "Osteoporose pós-menopausa",
    "SERM — protege osso, não estimula mama/útero",
    "Risco de trombose venosa",
    "Tomar com cálcio + vitamina D",
    "Receita simples"
  ],
  "sinonimos": ["Viviant","Conbriza","Bazedoxifeno","bazedoxifene","Duavive"],
  "classe_receita": "RECEITA_SIMPLES",
  "receita_display": "🟡 Receita Simples",
  "receita_cor": "amarelo",
  "receita_obrigatoria": true,
  "tipo_receita": "simples",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Bazedoxifeno é hormônio? Aumenta risco de câncer?",
      "resposta": "É um SERM — age nos receptores de estrogênio, mas de forma seletiva. No osso, age como estrogênio (protetor). Na mama e no útero, age como antiestrogênio. Estudos não mostram aumento do risco de câncer de mama ou endometrial — diferentemente da TRH clássica. Porém, mulheres com histórico de câncer de mama hormônio-dependente devem discutir o uso com oncologista."
    },
    {
      "pergunta": "Qual a diferença entre Bazedoxifeno e Raloxifeno?",
      "resposta": "Ambos são SERMs para osteoporose, mas o bazedoxifeno tem perfil de segurança endometrial superior — não estimula o endométrio, permitindo sua combinação com estrogênios sem precisar de progestagênio (formulação Duavive). O raloxifeno é mais antigo e tem dados robustos de redução de fratura vertebral e câncer de mama."
    },
    {
      "pergunta": "Por que o bazedoxifeno piora as ondas de calor?",
      "resposta": "Os SERMs podem antagonizar os efeitos estrogênicos no hipotálamo, potencialmente piorando fogachos em algumas mulheres. Isso é mais comum com raloxifeno. Na formulação Duavive (bazedoxifeno + estrogênios), o componente estrogênico alivia os fogachos enquanto o bazedoxifeno protege o endométrio."
    }
  ],
  "descricao_seo": "Bazedoxifeno (Viviant/Conbriza) trata osteoporose pós-menopausa. SERM que protege osso sem estimular útero ou mama. Risco de tromboembolismo venoso. Tomar com cálcio e vitamina D.",
  "quando_procurar_medico": "Urgência: dor e inchaço em perna, falta de ar súbita, dor no peito. Regularmente: acompanhar densitometria óssea e avaliar risco de fratura com o médico.",
  "alerta_farmaceutico": "Verificar histórico de TVP antes de dispensar — contraindicação. Orientar suspensão 72h antes de cirurgia ou viagem longa (imobilização). Necessidade de suplementação concomitante de cálcio/vitamina D."
},

// ── ZOLEDRONATO ───────────────────────────────────────────────────────────────
{
  "nome": "Aclasta / Zometa (Zoledronato / Ácido Zoledrônico)",
  "generico": "Ácido Zoledrônico (Zoledronato)",
  "tipo": "Bisfosfonato / Antirreabsortivo Ósseo",
  "descricao": "Bisfosfonato nitrogenado de terceira geração, o mais potente da classe. Administrado por infusão intravenosa. Aclasta (5mg/100mL, 1×/ano) é indicado para osteoporose pós-menopausa, osteoporose masculina e doença de Paget óssea. Zometa (4mg, a cada 3–4 semanas) é indicado para hipercalcemia maligna, metástases ósseas osteolíticas (mama, próstata, mieloma múltiplo) e prevenção de eventos esqueléticos em câncer. Disponível no SUS para osteoporose grave.",
  "receita": "Sim",
  "receita_nota": "Uso hospitalar ou ambulatorial com monitoração. Aplicação IV por profissional de saúde.",
  "efeitos": "Reação de fase aguda (muito comum após 1ª dose): febre, calafrios, dores musculares e articulares, cefaleia — duram 1–3 dias e diminuem nas doses subsequentes. Hipocalcemia (especialmente se vitamina D insuficiente). Nefrotoxicidade — risco com infusão rápida ou hidratação inadequada.",
  "aviso_grave": "Osteonecrose de mandíbula (ONM) — risco aumentado em pacientes com câncer usando doses oncológicas (Zometa), especialmente com extrações dentárias, higiene oral precária ou diabetes. Avaliação odontológica obrigatória antes de iniciar e durante o tratamento. Fraturas atípicas de fêmur com uso prolongado (>5 anos). Contraindicado em TFG <35 mL/min e hipocalcemia.",
  "recomendacao": "🔴 URGÊNCIA pós-infusão: febre acima de 39°C persistente, dor mandibular intensa, adormecimento da face (ONM), câimbras tetânicas (hipocalcemia grave) → pronto-socorro.",
  "educacao": "Infusão IV lenta (mínimo 15 minutos) com boa hidratação antes e após. Suplementação obrigatória de cálcio (1000–1200mg/dia) e vitamina D (800–1000 UI/dia). Avisar o dentista antes de qualquer procedimento dentário invasivo. Paracetamol pode aliviar a reação de fase aguda.",
  "resposta_rapida": [
    "Bisfosfonato IV — 1×/ano (Aclasta)",
    "Osteoporose, Paget, metástases ósseas",
    "⚠️ Avisar dentista antes de extrações",
    "Suplementar cálcio + vitamina D",
    "Risco de febre nas primeiras 24–72h"
  ],
  "sinonimos": ["Aclasta","Zometa","Zoledronato","ácido zoledrônico","zoledronate","Zoledronic acid","zoledronico"],
  "classe_receita": "USO_HOSPITALAR",
  "receita_display": "🏥 Uso Ambulatorial/Hospitalar",
  "receita_cor": "roxo",
  "receita_obrigatoria": true,
  "tipo_receita": "hospitalar",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Por que o zoledronato é dado só uma vez por ano?",
      "resposta": "Por sua potência e meia-vida óssea muito longa: se liga fortemente à hidroxiapatita óssea e permanece no osso por anos. Uma infusão anual é suficiente para suprimir a reabsorção óssea de forma contínua — vantagem enorme para adesão comparado a comprimidos diários ou semanais."
    },
    {
      "pergunta": "O que é osteonecrose de mandíbula e como evitar?",
      "resposta": "É a exposição de osso da mandíbula ou maxila sem cicatrização, associada ao uso de bisfosfonatos. Risco muito maior com doses oncológicas mensais (Zometa) do que com doses anuais para osteoporose (Aclasta). Para minimizar o risco: avaliação dental completa antes de iniciar, tratar todos os focos infecciosos dentários, manter boa higiene oral e informar sempre o dentista que usa bisfosfonato."
    },
    {
      "pergunta": "Posso fazer extração de dente usando Zoledronato?",
      "resposta": "Proceda com extrema cautela — informe obrigatoriamente o dentista que usa bisfosfonato. O risco de osteonecrose após extração existe, especialmente com doses oncológicas. Para osteoporose (Aclasta 1×/ano), o risco é menor mas não desprezível. Discutir com o médico se uma 'janela de droga' é viável antes de procedimentos invasivos."
    }
  ],
  "descricao_seo": "Zoledronato (Aclasta/Zometa) é bisfosfonato IV para osteoporose, Paget e metástases ósseas. Infusão anual (osteoporose) ou mensal (câncer). Risco de osteonecrose mandibular — avisar dentista sempre.",
  "quando_procurar_medico": "Urgência: dor mandibular persistente, adormecimento facial, febre prolongada pós-infusão, câimbras musculares intensas, dor nova no fêmur ou quadril.",
  "alerta_farmaceutico": "Infusão mínima de 15 min — infusão rápida causa nefrotoxicidade aguda. Hidratação adequada obrigatória antes/após. Verificar TFG (contraindicado <35 mL/min). Confirmar suplementação de Ca/vitamina D. Duas doses distintas: Aclasta 5mg/ano (osteoporose) ≠ Zometa 4mg/3–4 sem (oncologia) — não intercambiar."
},

// ── CALCITONINA ───────────────────────────────────────────────────────────────
{
  "nome": "Miacalcin / Calcimar (Calcitonina Salmão)",
  "generico": "Calcitonina Salmão",
  "tipo": "Hormônio Regulador do Cálcio / Antirreabsortivo Ósseo",
  "descricao": "Hormônio peptídico análogo da calcitonina humana, derivado do salmão (10× mais potente que a humana). Inibe os osteoclastos, reduzindo a reabsorção óssea. Disponível em spray nasal (200 UI/dia) e solução injetável (SC/IM). Indicações atuais: osteoporose pós-menopausa (quando outros tratamentos não são tolerados), hipercalcemia aguda (emergência), doença de Paget óssea e analgesia em fraturas vertebrais osteoporóticas agudas. Uso decrescente na osteoporose pela menor eficácia comparada a bisfosfonatos e pelo sinal de segurança de leve aumento de neoplasias.",
  "receita": "Sim",
  "receita_nota": "Receita simples.",
  "efeitos": "Spray nasal: irritação nasal, epistaxe (sangramento nasal), rinite. Injetável: náusea, rubor facial, reações no local de injeção. Desenvolvimento de anticorpos neutralizantes com uso prolongado (taquifilaxia).",
  "aviso_grave": "Sinal de segurança da EMA/ANVISA: uso oral e nasal prolongado associado a leve aumento de risco de neoplasias malignas — não usar por mais de 3 meses consecutivos na osteoporose (exceto quando claramente indicado por especialista). Contraindicada em hipocalcemia.",
  "recomendacao": "🟡 Reavalie regularmente com o médico a necessidade de continuar o tratamento após 3 meses.",
  "educacao": "Spray nasal: aplicar em uma narina alternada diariamente, mantendo a cabeça levemente inclinada para a frente. Conservar frasco em uso em temperatura ambiente (até 25°C) por até 30 dias; frasco fechado na geladeira. Não usar em hipocalcemia — corrigir antes. Suplementar cálcio e vitamina D durante o tratamento.",
  "resposta_rapida": [
    "Osteoporose, hipercalcemia, dor em fratura",
    "Spray nasal ou injetável",
    "Não usar >3 meses consecutivos",
    "Conservar na geladeira (frasco fechado)",
    "Receita simples"
  ],
  "sinonimos": ["Miacalcin","Calcimar","Calcitonina","calcitonina salmão","salmon calcitonin","calcitonin"],
  "classe_receita": "RECEITA_SIMPLES",
  "receita_display": "🟡 Receita Simples",
  "receita_cor": "amarelo",
  "receita_obrigatoria": true,
  "tipo_receita": "simples",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Calcitonina nasal é segura para uso longo?",
      "resposta": "Não é recomendado o uso prolongado (>3 meses consecutivos). A EMA identificou leve aumento de risco de neoplasias com uso oral e nasal prolongado. Para osteoporose de longo prazo, os bisfosfonatos e denosumabe têm melhor perfil de eficácia e segurança."
    },
    {
      "pergunta": "Calcitonina serve para dor de fratura de coluna?",
      "resposta": "Sim — a calcitonina tem efeito analgésico documentado em fraturas vertebrais osteoporóticas agudas, provavelmente por elevar betaendorfinas. Essa é uma das indicações atuais mais relevantes: alívio da dor aguda por 2–4 semanas. O efeito analgésico não depende do efeito ósseo."
    }
  ],
  "descricao_seo": "Calcitonina salmão (Miacalcin) trata osteoporose, hipercalcemia e dor em fraturas vertebrais. Não usar por mais de 3 meses consecutivos (risco de neoplasia). Spray nasal ou injetável.",
  "quando_procurar_medico": "Urgência: sangramento nasal intenso, câimbras musculares graves (hipocalcemia), dor severa pós-uso injetável.",
  "alerta_farmaceutico": "Sinal de segurança ANVISA/EMA — não dispensar para uso >3 meses sem reavaliação médica. Não usar em hipocalcemia. Produto perecível — verificar conservação e validade."
},

// ── ALFACALCIDOL ──────────────────────────────────────────────────────────────
{
  "nome": "One-Alpha (Alfacalcidol 0,25mcg - 0,5mcg - 1mcg)",
  "generico": "Alfacalcidol",
  "tipo": "Análogo da Vitamina D / Pró-hormônio Calciotrópico",
  "descricao": "Pró-hormônio sintético da vitamina D ativa. O alfacalcidol é convertido no fígado em calcitriol (1,25-dihidroxivitamina D3), a forma ativa da vitamina D, sem necessidade de ativação renal — isso o diferencia do colecalciferol e torna-o especialmente útil em insuficiência renal crônica (onde a ativação renal está comprometida). Indicado para osteodistrofia renal, hipoparatireoidismo, raquitismo e osteomalácia dependentes de vitamina D, e osteoporose em idosos com insuficiência renal.",
  "receita": "Sim",
  "receita_nota": "Receita simples.",
  "efeitos": "Hipercalcemia (principal — dose-dependente): fraqueza, náusea, vômitos, constipação, poliúria, polidipsia, confusão mental. Hipercalciúria com risco de nefrolitíase. Calcificações de tecidos moles com uso prolongado em doses altas.",
  "aviso_grave": "Risco de hipercalcemia — janela terapêutica estreita. Monitoração de cálcio sérico, fósforo e creatinina obrigatória, especialmente no início e após ajustes de dose. Evitar suplementação excessiva de cálcio concomitante. Em insuficiência renal, o risco de hipercalcemia é maior pela menor excreção de cálcio.",
  "recomendacao": "🔴 URGÊNCIA: confusão mental, fraqueza intensa, vômitos, arritmia cardíaca — podem indicar hipercalcemia grave. Dosar cálcio sérico imediatamente.",
  "educacao": "Tomar no mesmo horário diariamente, com ou sem alimento. Monitorar sinais de hipercalcemia: sede excessiva, urinação frequente, fraqueza, confusão. Limitar ingestão de cálcio na dieta e suplementos ao que o médico prescreveu — o alfacalcidol já aumenta a absorção intestinal de cálcio. Manter hidratação adequada.",
  "resposta_rapida": [
    "Vitamina D ativa — sem ativação renal",
    "Insuficiência renal, hipoparatireoidismo",
    "⚠️ Monitorar cálcio sérico",
    "Risco de hipercalcemia",
    "Receita simples"
  ],
  "sinonimos": ["One-Alpha","Alfacalcidol","alfacalcidol","1-alfa-calcidol","1-alpha-calcidol","Etalpha"],
  "classe_receita": "RECEITA_SIMPLES",
  "receita_display": "🟡 Receita Simples",
  "receita_cor": "amarelo",
  "receita_obrigatoria": true,
  "tipo_receita": "simples",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Qual a diferença entre alfacalcidol e calcitriol?",
      "resposta": "O calcitriol JÁ é a vitamina D completamente ativa (1,25-dihidroxivitamina D3). O alfacalcidol é um pró-hormônio que o fígado converte em calcitriol — portanto sua ativação depende do fígado mas NÃO dos rins. Ambos são indicados em insuficiência renal (onde os rins não conseguem ativar a vitamina D). A dose do alfacalcidol é geralmente o dobro da dose equivalente de calcitriol."
    },
    {
      "pergunta": "Por que preciso monitorar o cálcio no sangue?",
      "resposta": "O alfacalcidol aumenta muito a absorção intestinal de cálcio. Em excesso, o cálcio acumula no sangue (hipercalcemia) — perigoso para o coração, rins e nervos. A janela entre a dose eficaz e a tóxica é estreita. Monitoração periódica é fundamental para manter o cálcio na faixa ideal."
    },
    {
      "pergunta": "Posso tomar suplemento de cálcio junto?",
      "resposta": "Somente na dose prescrita pelo médico. Como o alfacalcidol já maximiza a absorção intestinal de cálcio, suplementos em excesso aumentam o risco de hipercalcemia. O médico calculará o cálcio dietético + suplementar adequado para cada caso."
    }
  ],
  "descricao_seo": "Alfacalcidol (One-Alpha) é análogo da vitamina D ativa para insuficiência renal e hipoparatireoidismo. Não requer ativação renal. Risco de hipercalcemia — monitorar cálcio sérico.",
  "quando_procurar_medico": "Urgência: confusão mental, vômitos intensos, sede excessiva, fraqueza, batimentos irregulares — sinais de hipercalcemia.",
  "alerta_farmaceutico": "Monitorar Ca2+ e creatinina periodicamente. Não confundir com colecalciferol (vitamina D3 comum) — o alfacalcidol é 5–10× mais potente. Dose errada pode causar hipercalcemia grave. Verificar todos os suplementos de cálcio em uso."
}

];

// Inserção com verificação de duplicatas
let adicionados = 0;
for (const nova of novas) {
  const existe = meds.find(m =>
    (m.generico||'').toLowerCase().replace(/\s/g,'') ===
    (nova.generico||'').toLowerCase().replace(/\s/g,'')
  );
  if (existe) { console.log('⚠️  Já existe:', nova.nome); continue; }
  meds.push(nova);
  console.log('✓  Adicionado:', nova.nome);
  adicionados++;
}

fs.writeFileSync(MEDS_PATH, JSON.stringify(meds, null, 2), 'utf-8');
console.log(`\nAdicionados: ${adicionados} | Total: ${meds.length}`);
