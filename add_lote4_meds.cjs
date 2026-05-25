#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const MEDS_PATH = path.join(__dirname, 'medicamentos.json');
const meds = JSON.parse(fs.readFileSync(MEDS_PATH, 'utf-8'));

// ── Patch sinonimos em existentes ──────────────────────────────────────────
const patches = [
  {
    match: 'Benzilpenicilina',
    sinonimos: ['Benzetacil', 'Penicilina Benzatina', 'benzilpenicilina benzatina', 'penicilina G benzatina']
  },
];

patches.forEach(({ match, sinonimos }) => {
  const idx = meds.findIndex(m => m.nome && m.nome.toLowerCase().includes(match.toLowerCase()));
  if (idx === -1) { console.log('✗ não encontrado:', match); return; }
  const prev = meds[idx].sinonimos || [];
  const added = sinonimos.filter(s => !prev.includes(s));
  meds[idx].sinonimos = [...prev, ...added];
  console.log('✓ patch', meds[idx].nome, '→', added.join(', '));
});

// ── Novas fichas ───────────────────────────────────────────────────────────
const novas = [
  {
    nome: 'Talidomida 50mg - 100mg',
    generico: 'Talidomida',
    tipo: 'Imunomodulador / Antineoplásico',
    descricao: 'Indicada para eritema nodoso hansênico (hanseníase) e mieloma múltiplo em combinação. Inibe o TNF-α e possui efeito antiangiogênico. Uso sujeito a programa rigoroso de gestão de risco por alto potencial teratogênico.',
    receita: 'Sim',
    receita_nota: 'Receita de Controle Especial (Lista C5). Prescrição exclusiva por médicos cadastrados. Distribuição apenas em farmácias habilitadas.',
    efeitos: 'Sonolência intensa, constipação, neuropatia periférica (formigamento/dormência), trombose venosa profunda, neutropenia, hipotensão ortostática, bradicardia.',
    aviso_grave: 'TERATOGÊNICO GRAVE: uma dose única pode causar focomelia. Mulheres em idade fértil devem usar dois métodos contraceptivos. Alto risco de tromboembolismo venoso — profilaxia anticoagulante obrigatória.',
    recomendacao: '🔴 Uso exclusivo sob protocolo com programa de gestão de risco. Jamais compartilhar o medicamento.',
    educacao: 'Em mieloma, talidomida é sempre associada a dexametasona. Profilaxia com AAS ou HBPM é mandatória. Tomar à noite para minimizar sonolência diurna.',
    resposta_rapida: [
      'Tomar à noite — causa sonolência intensa',
      'Profilaxia anticoagulante obrigatória no mieloma',
      'Contraindicada na gravidez — teratogênica',
      'Monitorar formigamento/dormência nos pés (neuropatia)'
    ],
    sinonimos: ['Talidomida', 'Thalidomide', 'Thalidomid', 'Talidomida Celgene'],
    classe_receita: 'C5',
    receita_display: '🔴 Controle Especial — Lista C5 (Programa de Risco)',
    receita_cor: 'vermelho',
    receita_obrigatoria: true,
    tipo_receita: 'Receita de Controle Especial C5 — programa de gestão de risco',
    retencao_receita: true,
    perguntas_frequentes: [
      { pergunta: 'Por que talidomida exige tantos controles?', resposta: 'Devido ao histórico de teratogenicidade nos anos 1960 (focomelia em bebês). O Brasil mantém o programa NOTIVISA para garantir uso seguro e evitar exposição fetal.' },
      { pergunta: 'Preciso tomar anticoagulante junto com talidomida?', resposta: 'No mieloma múltiplo, sim — profilaxia antitrombótica com AAS (75–100 mg/dia) ou heparina de baixo peso molecular é recomendada, pois o risco de TVP é alto com a combinação talidomida + dexametasona.' },
      { pergunta: 'O que é neuropatia periférica por talidomida?', resposta: 'Formigamento, dormência ou dor nos pés e mãos que pode ser irreversível. Avise imediatamente seu médico se sentir esses sintomas, pois pode ser necessário reduzir a dose.' },
      { pergunta: 'Talidomida causa sonolência?', resposta: 'Sim, a sonolência é um dos efeitos mais comuns. Por isso recomenda-se tomá-la à noite. Evite dirigir ou operar máquinas durante o tratamento.' }
    ],
    descricao_seo: 'Talidomida 50mg/100mg: imunomodulador indicado para mieloma múltiplo e eritema nodoso hansênico. Uso controlado sob programa de gestão de risco. Contraindicada na gravidez.',
    quando_procurar_medico: 'Procure médico imediatamente se: formigamento ou dormência nos pés/mãos, sinais de trombose (dor e inchaço na perna), febre com neutropenia, hipotensão grave ou suspeita de gravidez.',
    alerta_farmaceutico: 'Jamais dispensar talidomida sem conferir o cadastro no programa de gestão de risco (NOTIVISA). Verificar se a paciente assinou o termo de responsabilidade e usa contracepção adequada.',
    interacoes: []
  },
  {
    nome: 'Upadacitinibe 15mg - 30mg - 45mg',
    generico: 'Upadacitinibe',
    tipo: 'Inibidor JAK1 / Imunossupressor',
    descricao: 'Inibidor seletivo da JAK1 indicado para artrite reumatoide, artrite psoriásica, espondilite anquilosante, dermatite atópica moderada a grave e colite ulcerativa. Bloqueia a sinalização intracelular de citocinas inflamatórias como IL-6, IL-4 e interferon.',
    receita: 'Sim',
    receita_nota: 'Medicamento de prescrição médica. Uso em rheumatologia, dermatologia e gastroenterologia especializada.',
    efeitos: 'Infecções de vias aéreas superiores, herpes zóster, náusea, acne, aumento de CPK, anemia, neutropenia, hipercolesterolemia.',
    aviso_grave: 'Risco aumentado de infecções graves (tuberculose, fúngicas, bacterianas). Rastreio de TB obrigatório antes do início. Risco de TVP/TEP e eventos cardiovasculares maiores (MACE). Não usar em pacientes com infecção ativa.',
    recomendacao: '🔴 Rastreio de TB, hepatite B e C antes do início. Vacinar contra herpes zóster (preferencialmente). Não iniciar com infecção ativa.',
    educacao: 'Tomar com ou sem alimentos. Em AR, frequentemente combinado com metotrexato. Monitorar lipídeos e hemograma regularmente.',
    resposta_rapida: [
      'Fazer rastreio de TB antes de iniciar',
      'Vacinas de vírus vivos contraindicadas',
      'Monitorar sinais de infecção durante o tratamento',
      'Pode ser tomado com ou sem alimentos'
    ],
    sinonimos: ['Rinvoq', 'Upadacitinibe', 'upadacitinib', 'ABT-494'],
    classe_receita: 'TARJADO_VERMELHO',
    receita_display: '🔴 Receita Obrigatória — Imunobiológico',
    receita_cor: 'vermelho',
    receita_obrigatoria: true,
    tipo_receita: 'Receita Médica (especialidade)',
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: 'O que é upadacitinibe (Rinvoq)?', resposta: 'É um inibidor JAK1, medicamento oral que bloqueia sinais inflamatórios em doenças autoimunes como artrite reumatoide, dermatite atópica e colite ulcerativa.' },
      { pergunta: 'Posso tomar vacinas usando upadacitinibe?', resposta: 'Vacinas de vírus vivos (como febre amarela e varicela) são contraindicadas. Vacinas inativadas (gripe, pneumococo, COVID-19) são permitidas, preferencialmente antes de iniciar o tratamento.' },
      { pergunta: 'Preciso fazer exames antes de iniciar upadacitinibe?', resposta: 'Sim: teste para tuberculose (PPD/IGRA), hepatite B e C, hemograma completo e lipidograma são exigidos antes do início.' },
      { pergunta: 'Upadacitinibe causa herpes zóster?', resposta: 'Sim, há maior risco de herpes zóster (cobreiro) com inibidores JAK. Se possível, vacinar contra zóster antes de iniciar o tratamento.' }
    ],
    descricao_seo: 'Upadacitinibe (Rinvoq) 15mg/30mg/45mg: inibidor JAK1 indicado para artrite reumatoide, dermatite atópica, artrite psoriásica e colite ulcerativa. Uso sob acompanhamento especializado.',
    quando_procurar_medico: 'Procure médico se: febre, sinais de infecção (tosse persistente, feridas que não cicatrizam), sintomas de herpes zóster, dor nas pernas (suspeita de TVP) ou palpitações.',
    alerta_farmaceutico: 'Verificar rastreio de TB e sorologias antes da dispensação. Alertar sobre risco de herpes zóster e necessidade de afastar infecções ativas.',
    interacoes: []
  },
  {
    nome: 'Natalizumabe 300mg Injetável (IV)',
    generico: 'Natalizumabe',
    tipo: 'Anticorpo Monoclonal — Anti-α4-integrina',
    descricao: 'Anticorpo monoclonal humanizado que bloqueia a migração de linfócitos para o sistema nervoso central e intestino. Indicado para esclerose múltipla remitente-recorrente e doença de Crohn moderada a grave com resposta insuficiente a terapias convencionais.',
    receita: 'Sim',
    receita_nota: 'Uso hospitalar/ambulatorial especializado. Administração IV mensal por equipe treinada.',
    efeitos: 'Cefaleia, fadiga, infecções do trato respiratório e urinário, artralgia, náusea, reação à infusão. Risco raro mas grave de LMP (leucoencefalopatia multifocal progressiva).',
    aviso_grave: 'RISCO DE LMP (leucoencefalopatia multifocal progressiva) pelo vírus JC, especialmente com anticorpos anti-JC positivos. Não associar a imunossupressores. Monitorar com RNM cerebral.',
    recomendacao: '🔴 Triagem para vírus JC (anti-JCV) obrigatória antes e a cada 6 meses. Não combinar com imunossupressores.',
    educacao: 'Natalizumabe é administrado uma vez por mês em infusão de 1 hora. Permaneça em observação por pelo menos 1 hora após a infusão por risco de reação hipersensibilidade.',
    resposta_rapida: [
      'Infusão IV mensal em centro especializado',
      'Triagem para vírus JC obrigatória a cada 6 meses',
      'Não combinar com imunossupressores (risco de LMP)',
      'Reportar qualquer confusão mental, fraqueza ou alteração visual'
    ],
    sinonimos: ['Tysabri', 'Natalizumabe', 'natalizumab'],
    classe_receita: 'USO_HOSPITALAR',
    receita_display: '🏥 Uso Especializado / Hospitalar',
    receita_cor: 'vermelho',
    receita_obrigatoria: true,
    tipo_receita: 'hospitalar',
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: 'O que é LMP e por que é perigosa com natalizumabe?', resposta: 'LMP (leucoencefalopatia multifocal progressiva) é uma infecção grave do cérebro pelo vírus JC, que pode ser ativado quando natalizumabe impede que células imunes patrulhem o SNC. Pode causar invalidez grave ou morte.' },
      { pergunta: 'O que é o teste anti-JCV?', resposta: 'É um exame de sangue que detecta anticorpos contra o vírus JC. Pacientes com anticorpos positivos têm maior risco de LMP e precisam de monitoração mais cuidadosa.' },
      { pergunta: 'Posso tomar natalizumabe com outro imunossupressor?', resposta: 'Não. A combinação aumenta muito o risco de LMP e infecções graves. Natalizumabe deve ser usado em monoterapia.' }
    ],
    descricao_seo: 'Natalizumabe (Tysabri) 300mg: anticorpo monoclonal anti-α4-integrina indicado para esclerose múltipla remitente-recorrente e doença de Crohn grave.',
    quando_procurar_medico: 'Procure emergência se: confusão mental, alteração de visão, fraqueza progressiva, distúrbios de memória ou fala (sinais de LMP). Reportar qualquer infecção grave.',
    alerta_farmaceutico: 'Dispensação sob programa de monitoramento TOUCH. Verificar status anti-JCV antes de cada dispensação e alertar sobre risco de LMP.',
    interacoes: []
  },
  {
    nome: 'Abatacepte 125mg Injetável SC / 250mg IV',
    generico: 'Abatacepte',
    tipo: 'Modulador da Coestimulação Linfocitária — CTLA4-Ig',
    descricao: 'Proteína de fusão CTLA4-Ig que bloqueia a ativação de linfócitos T ao inibir o sinal coestimulatório CD80/CD86. Indicado para artrite reumatoide moderada a grave, artrite psoriásica e artrite idiopática juvenil. Disponível em formulação SC semanal e IV mensal.',
    receita: 'Sim',
    receita_nota: 'Imunobiológico. Uso em reumatologia especializada. Formulação SC pode ser autoadministrada após treinamento.',
    efeitos: 'Infecções de vias aéreas (resfriado, sinusite), náusea, cefaleia, reação no local da injeção. Risco de infecções oportunistas e reativação de TB.',
    aviso_grave: 'Não associar a anti-TNF (adalimumabe, infliximabe) — risco elevado de infecções graves sem benefício adicional. Rastreio de TB obrigatório antes do início.',
    recomendacao: '🔴 Rastreio de TB obrigatório. Vacinas de vírus vivos contraindicadas durante o tratamento. Não combinar com anti-TNF.',
    educacao: 'Abatacepte SC pode ser autoadministrado no abdômen, coxas ou parte externa dos braços. Rodar os locais de injeção. Guardar refrigerado (2–8°C).',
    resposta_rapida: [
      'Rastreio de TB obrigatório antes de iniciar',
      'Não combinar com anti-TNF (adalimumabe, infliximabe)',
      'Vacinas de vírus vivos contraindicadas',
      'Guardar refrigerado — não congelar'
    ],
    sinonimos: ['Orencia', 'Abatacepte', 'abatacept'],
    classe_receita: 'TARJADO_VERMELHO',
    receita_display: '🔴 Receita Obrigatória — Imunobiológico',
    receita_cor: 'vermelho',
    receita_obrigatoria: true,
    tipo_receita: 'Receita Médica (especialidade)',
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: 'Abatacepte pode ser usado com metotrexato?', resposta: 'Sim, a combinação com metotrexato é a estratégia padrão na artrite reumatoide, aumentando a eficácia sem aumentar significativamente os riscos.' },
      { pergunta: 'Por que não posso combinar abatacepte com anti-TNF?', resposta: 'Estudos clínicos mostraram que a combinação não oferece benefício adicional de eficácia, mas dobra o risco de infecções graves e eventos adversos.' },
      { pergunta: 'Abatacepte pode ser aplicado em casa?', resposta: 'Sim, a formulação subcutânea (SC) pode ser autoadministrada após treinamento adequado realizado pela equipe de saúde.' }
    ],
    descricao_seo: 'Abatacepte (Orencia) 125mg SC / 250mg IV: imunobiológico CTLA4-Ig indicado para artrite reumatoide e artrite psoriásica. Não combinar com anti-TNF.',
    quando_procurar_medico: 'Procure médico se: febre, tosse persistente, feridas que não cicatrizam, sintomas de infecção urinária ou respiratória grave.',
    alerta_farmaceutico: 'Verificar rastreio de TB antes de dispensar. Alertar sobre conservação refrigerada e incompatibilidade com anti-TNF.',
    interacoes: []
  },
  {
    nome: 'Certolizumabe Pegol 200mg Injetável SC',
    generico: 'Certolizumabe Pegol',
    tipo: 'Anti-TNF-α Peguilado / Imunobiológico',
    descricao: 'Anticorpo anti-TNF-α peguilado sem porção Fc, o que resulta em menor transferência placentária (único anti-TNF considerado mais seguro na gravidez). Indicado para artrite reumatoide, doença de Crohn, espondilite anquilosante e artrite psoriásica.',
    receita: 'Sim',
    receita_nota: 'Imunobiológico. Uso em reumatologia, gastroenterologia e dermatologia especializada.',
    efeitos: 'Infecções do trato respiratório e urinário, reação no local da injeção, cefaleia, fadiga. Risco de infecções oportunistas e reativação de tuberculose.',
    aviso_grave: 'Rastreio obrigatório para TB, hepatite B e C antes do início. Não usar com infecção ativa. Risco de reativação de TB latente. Risco de linfoma e outras neoplasias (especialmente combinado com tiopurinas).',
    recomendacao: '🔴 Rastreio de TB e hepatites virais antes de iniciar. Não combinar com anakinra ou abatacepte — risco de infecção grave.',
    educacao: 'Certolizumabe é o único anti-TNF peguilado sem porção Fc, resultando em menor passagem pela placenta. Em mulheres que precisam de tratamento biológico durante a gravidez, pode ser uma opção discutida com reumatologista.',
    resposta_rapida: [
      'Rastreio de TB e hepatites B/C antes de iniciar',
      'Único anti-TNF com menor transferência placentária',
      'Vacinas de vírus vivos contraindicadas',
      'Guardar refrigerado (2–8°C) — não congelar'
    ],
    sinonimos: ['Cimzia', 'Certolizumabe', 'certolizumab pegol', 'CDP870'],
    classe_receita: 'TARJADO_VERMELHO',
    receita_display: '🔴 Receita Obrigatória — Imunobiológico',
    receita_cor: 'vermelho',
    receita_obrigatoria: true,
    tipo_receita: 'Receita Médica (especialidade)',
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: 'O que diferencia certolizumabe dos outros anti-TNF?', resposta: 'Certolizumabe é o único anti-TNF peguilado sem porção Fc. Isso resulta em menor passagem pela placenta e pelo leite materno, tornando-o a opção de anti-TNF com mais dados de segurança na gravidez.' },
      { pergunta: 'Posso usar certolizumabe na gravidez?', resposta: 'Precisa de avaliação individualizada com reumatologista. Dentre os anti-TNF, certolizumabe tem os melhores dados de segurança gestacional por sua baixa transferência placentária.' },
      { pergunta: 'Certolizumabe pode ser combinado com metotrexato?', resposta: 'Sim, a combinação com metotrexato é comum e aumenta a eficácia na artrite reumatoide, sem aumentar proporcionalmente os riscos.' }
    ],
    descricao_seo: 'Certolizumabe Pegol (Cimzia) 200mg: anti-TNF peguilado sem porção Fc, indicado para artrite reumatoide, doença de Crohn e espondiloartrites. Menor transferência placentária entre os anti-TNF.',
    quando_procurar_medico: 'Procure médico se: febre, tosse persistente, suores noturnos (suspeita TB), perda de peso inexplicada, sinais de infecção grave ou reação alérgica à injeção.',
    alerta_farmaceutico: 'Verificar rastreio de TB e hepatites antes de dispensar. Informar sobre conservação e descarte adequado das seringas usadas.',
    interacoes: []
  }
];

let adicionados = 0;
novas.forEach(novo => {
  const key = novo.generico.toLowerCase();
  const existe = meds.find(m => m.nome.toLowerCase().includes(key) || (m.generico && m.generico.toLowerCase().includes(key)));
  if (existe) {
    console.log('⚠ já existe:', existe.nome, '— pulado');
    return;
  }
  meds.push(novo);
  adicionados++;
  console.log('✓  Adicionado:', novo.nome);
});

fs.writeFileSync(MEDS_PATH, JSON.stringify(meds, null, 2), 'utf-8');
console.log(`\nAdicionados: ${adicionados} | Total: ${meds.length}`);
