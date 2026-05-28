// add_interacoes_imaos_antiepi_imuno.cjs
'use strict';
const fs = require('fs');
const raw = fs.readFileSync('./src/data/medicamento.json', 'utf8');
const txt = raw.charCodeAt(0) === 0xFEFF ? raw.slice(1) : raw;
const data = JSON.parse(txt);

const MEDS = [

  // ─── IMAOs ───────────────────────────────────────────────────────────────

  {
    slug: 'moclobemida-150mg-300mg',
    nome: 'Moclobemida 150mg - 300mg',
    interacoes: [
      {
        com: ['Fluoxetina', 'Paroxetina', 'Sertralina', 'Escitalopram', 'Citalopram', 'SSRIs'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica — CONTRAINDICADO',
        efeito: 'IMAOs + SSRIs causam acúmulo grave de serotonina: hipertermia, rigidez muscular, agitação, convulsões e morte. Moclobemida, mesmo sendo reversível, mantém esse risco.',
        conduta: 'CONTRAINDICADO. Aguardar pelo menos 14 dias após suspensão do SSRI antes de iniciar moclobemida (5 semanas para fluoxetina). Após moclobemida, aguardar 24h antes de iniciar SSRI.'
      },
      {
        com: ['Venlafaxina', 'Duloxetina', 'Desvenlafaxina', 'SNRIs'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica com SNRIs — CONTRAINDICADO',
        efeito: 'SNRIs combinados com IMAOs causam síndrome serotoninérgica grave pelo mesmo mecanismo que os SSRIs.',
        conduta: 'CONTRAINDICADO. Respeitar intervalo de pelo menos 7 dias após SNRIs de meia-vida curta antes de iniciar moclobemida.'
      },
      {
        com: ['Tramadol', 'Meperidina', 'Dextrometorfano'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica com opioides serotoninérgicos',
        efeito: 'Tramadol e meperidina têm ação serotoninérgica; combinados com IMAOs, causam síndrome serotoninérgica potencialmente fatal.',
        conduta: 'CONTRAINDICADO. Usar morfina ou oxicodona como alternativa analgésica — opioides puros sem ação serotoninérgica são mais seguros.'
      },
      {
        com: ['Sumatriptano', 'Rizatriptano', 'Zolmitriptano', 'Triptanos'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica com triptanos',
        efeito: 'Triptanos são agonistas serotoninérgicos; a associação com IMAO potencializa a atividade serotoninérgica com risco de síndrome serotoninérgica e vasoespasmo.',
        conduta: 'CONTRAINDICADO. Orientar paciente a não usar nenhum triptano durante o tratamento com moclobemida.'
      },
      {
        com: ['Pseudoefedrina', 'Fenilefrina', 'Efedrina', 'Simpaticomiméticos'],
        nivel: 'alto',
        titulo: 'Crise hipertensiva por estimulação simpática',
        efeito: 'Moclobemida inibe a MAO-A, reduzindo a degradação de aminas simpaticomiméticas. Descongestionantes nasais e vasoconstritores podem causar crise hipertensiva grave.',
        conduta: 'Evitar descongestionantes com pseudoefedrina ou fenilefrina (Neosoro com efedrina, Claritin-D, Allegra-D). Preferir saline nasal ou sprays sem vasoconstritor.'
      },
      {
        com: ['Linezolida'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica — CONTRAINDICADO',
        efeito: 'Linezolida é um antibiótico com atividade inibitória da MAO; a combinação com moclobemida causa dupla inibição da MAO e risco elevado de síndrome serotoninérgica.',
        conduta: 'CONTRAINDICADO. Se antibioticoterapia for necessária, escolher alternativa sem ação MAO (não quinolonas, não linezolida).'
      },
      {
        tipo: 'duplicacao',
        classe: 'imao',
        nivel: 'alto',
        titulo: 'Duplicação de IMAO',
        efeito: 'Dois IMAOs causam inibição excessiva da monoamina oxidase com risco de crises hipertensivas e síndrome serotoninérgica grave.',
        conduta: 'CONTRAINDICADO. Nunca combinar dois IMAOs.'
      }
    ]
  },

  {
    slug: 'fenelzina-15mg',
    nome: 'Fenelzina 15mg',
    interacoes: [
      {
        com: ['Fluoxetina', 'Paroxetina', 'Sertralina', 'Escitalopram', 'Citalopram', 'SSRIs', 'Venlafaxina', 'Duloxetina', 'SNRIs', 'Amitriptilina', 'Imipramina', 'Tricíclicos'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica fatal — CONTRAINDICADO',
        efeito: 'Fenelzina é IMAO irreversível. A combinação com qualquer antidepressivo serotoninérgico é uma das interações mais perigosas em farmacologia clínica — provoca síndrome serotoninérgica frequentemente fatal.',
        conduta: 'CONTRAINDICADO absolutamente. Aguardar 14 dias após suspensão da fenelzina antes de qualquer antidepressivo. Aguardar 14 dias após SSRIs/SNRIs de meia-vida curta; 5 semanas após fluoxetina.'
      },
      {
        com: ['Tiramina em alimentos', 'Queijos curados', 'Vinho tinto', 'Cervejas não pasteurizadas', 'Carnes defumadas', 'Fígado de frango'],
        nivel: 'alto',
        titulo: 'Crise hipertensiva por tiramina — "Queijo Reaction"',
        efeito: 'IMAOs irreversíveis bloqueiam a MAO intestinal e hepática responsável por degradar a tiramina alimentar. A tiramina acumulada libera noradrenalina em excesso, causando crise hipertensiva grave (PA > 200 mmHg) com risco de AVC hemorrágico.',
        conduta: 'Dieta pobre em tiramina é obrigatória durante e até 2 semanas após fenelzina. Orientar paciente sobre lista de alimentos a evitar. Monitorar PA regularmente.'
      },
      {
        com: ['Tramadol', 'Meperidina', 'Fentanil', 'Dextrometorfano'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica e/ou depressão respiratória — CONTRAINDICADO',
        efeito: 'Opioides serotoninérgicos e IMAOs irreversíveis causam síndrome serotoninérgica grave. Meperidina está especialmente contraindicada pela alta letalidade da combinação.',
        conduta: 'CONTRAINDICADO. Usar morfina ou hidromorfona para analgesia (menor risco serotoninérgico), sempre com cautela e monitoramento.'
      },
      {
        com: ['Pseudoefedrina', 'Efedrina', 'Anfetaminas', 'Fenilefrina', 'Metildopa'],
        nivel: 'alto',
        titulo: 'Crise hipertensiva grave',
        efeito: 'IMAOs irreversíveis potencializam dramaticamente os efeitos pressores de simpaticomiméticos diretos e indiretos, causando crises hipertensivas com risco de AVC e infarto.',
        conduta: 'CONTRAINDICADO. Paciente deve evitar todos os descongestionantes, remédios para resfriado com vasoconstritores e qualquer simpaticomimético.'
      },
      {
        com: ['Insulina', 'Glibenclamida', 'Metformina', 'Antidiabéticos'],
        nivel: 'moderado',
        titulo: 'Hipoglicemia potencializada',
        efeito: 'IMAOs podem potencializar o efeito hipoglicemiante da insulina e sulfonilureias, aumentando risco de hipoglicemia.',
        conduta: 'Monitorar glicemia com frequência. Ajustar dose do antidiabético se necessário.'
      },
      {
        tipo: 'duplicacao',
        classe: 'imao',
        nivel: 'alto',
        titulo: 'Duplicação de IMAO',
        efeito: 'Dois IMAOs causam inibição excessiva da MAO com crises hipertensivas e síndrome serotoninérgica graves.',
        conduta: 'CONTRAINDICADO. Nunca combinar dois IMAOs.'
      }
    ]
  },

  {
    slug: 'tranilcipromina-10mg',
    nome: 'Tranilcipromina 10mg',
    interacoes: [
      {
        com: ['Fluoxetina', 'Paroxetina', 'Sertralina', 'Escitalopram', 'Citalopram', 'SSRIs', 'Venlafaxina', 'Duloxetina', 'SNRIs', 'Amitriptilina', 'Clomipramina', 'Tricíclicos'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica fatal — CONTRAINDICADO',
        efeito: 'Tranilcipromina é IMAO irreversível com estrutura anfetamínica. A combinação com antidepressivos serotoninérgicos causa síndrome serotoninérgica grave e frequentemente fatal.',
        conduta: 'CONTRAINDICADO. Aguardar 14 dias após suspensão da tranilcipromina; 14 dias após SSRIs/SNRIs curtos; 5 semanas após fluoxetina.'
      },
      {
        com: ['Tiramina em alimentos', 'Queijos curados', 'Vinho tinto', 'Cervejas fermentadas', 'Carnes processadas', 'Shoyu', 'Extrato de levedura'],
        nivel: 'alto',
        titulo: 'Crise hipertensiva por tiramina — CONTRAINDICADO com esses alimentos',
        efeito: 'Tranilcipromina inibe irreversivelmente a MAO intestinal, impedindo a degradação da tiramina dietética. A tiramina acumulada provoca liberação maciça de catecolaminas com crise hipertensiva grave e risco de AVC.',
        conduta: 'Dieta restrita em tiramina é obrigatória durante e até 2 semanas após suspensão. Fornecer lista escrita de alimentos proibidos ao paciente.'
      },
      {
        com: ['Tramadol', 'Meperidina', 'Dextrometorfano', 'Fentanil'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica com opioides — CONTRAINDICADO',
        efeito: 'Opioides com ação serotoninérgica + IMAO irreversível causam síndrome serotoninérgica potencialmente fatal.',
        conduta: 'CONTRAINDICADO. Se analgesia necessária, usar morfina com extrema cautela e monitoramento rigoroso.'
      },
      {
        com: ['Pseudoefedrina', 'Efedrina', 'Anfetaminas', 'Metanfetamina', 'Fenilefrina'],
        nivel: 'alto',
        titulo: 'Crise hipertensiva grave',
        efeito: 'Simpaticomiméticos + IMAO irreversível causam crise hipertensiva com PA podendo ultrapassar 200/120 mmHg, com risco de AVC e morte.',
        conduta: 'CONTRAINDICADO. Proibir todos os descongestionantes e medicamentos para resfriado com vasoconstritores.'
      },
      {
        com: ['Linezolida', 'Metazolida'],
        nivel: 'alto',
        titulo: 'Dupla inibição da MAO — CONTRAINDICADO',
        efeito: 'Linezolida é antibiótico com atividade inibitória da MAO; combinada com tranilcipromina, causa inibição MAO excessiva com síndrome serotoninérgica e crises hipertensivas.',
        conduta: 'CONTRAINDICADO. Usar antibiótico alternativo sem ação MAO.'
      },
      {
        tipo: 'duplicacao',
        classe: 'imao',
        nivel: 'alto',
        titulo: 'Duplicação de IMAO',
        efeito: 'Dois IMAOs irreversíveis causam inibição excessiva da MAO com crises hipertensivas e síndrome serotoninérgica graves.',
        conduta: 'CONTRAINDICADO. Nunca combinar dois IMAOs.'
      }
    ]
  },

  {
    slug: 'isocarboxazida-10mg',
    nome: 'Isocarboxazida 10mg',
    interacoes: [
      {
        com: ['Fluoxetina', 'Paroxetina', 'Sertralina', 'Escitalopram', 'SSRIs', 'Venlafaxina', 'Duloxetina', 'SNRIs', 'Amitriptilina', 'Nortriptilina', 'Tricíclicos'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica fatal — CONTRAINDICADO',
        efeito: 'Isocarboxazida é IMAO irreversível. Combinada com antidepressivos serotoninérgicos, causa síndrome serotoninérgica grave: hipertermia, rigidez, convulsões e morte.',
        conduta: 'CONTRAINDICADO absolutamente. Aguardar 14 dias após suspensão da isocarboxazida antes de iniciar antidepressivos. Aguardar 14 dias após SSRIs (5 semanas para fluoxetina) antes de iniciar isocarboxazida.'
      },
      {
        com: ['Tiramina em alimentos', 'Queijos curados', 'Vinho', 'Cervejas', 'Carnes processadas', 'Molho de soja'],
        nivel: 'alto',
        titulo: 'Crise hipertensiva por tiramina — "Cheese Reaction"',
        efeito: 'Isocarboxazida bloqueia irreversivelmente a MAO intestinal e hepática. A tiramina dietética não é degradada e provoca liberação maciça de noradrenalina com crise hipertensiva grave.',
        conduta: 'Dieta restrita em tiramina obrigatória durante tratamento e por 2 semanas após suspensão. Orientação escrita ao paciente é essencial.'
      },
      {
        com: ['Tramadol', 'Meperidina', 'Dextrometorfano'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica com opioides — CONTRAINDICADO',
        efeito: 'Tramadol e meperidina têm ação serotoninérgica intrínseca, causando síndrome serotoninérgica grave quando combinados com IMAOs irreversíveis.',
        conduta: 'CONTRAINDICADO. Usar morfina como alternativa analgésica, com cautela.'
      },
      {
        com: ['Pseudoefedrina', 'Efedrina', 'Fenilefrina', 'Anfetaminas'],
        nivel: 'alto',
        titulo: 'Crise hipertensiva grave',
        efeito: 'IMAOs irreversíveis amplificam dramaticamente o efeito pressor de simpaticomiméticos, causando crises com risco de AVC e morte.',
        conduta: 'CONTRAINDICADO. Proibir descongestionantes e qualquer vasopressor enquanto usa isocarboxazida e por 2 semanas após suspensão.'
      },
      {
        com: ['Insulina', 'Antidiabéticos orais'],
        nivel: 'moderado',
        titulo: 'Hipoglicemia potencializada',
        efeito: 'IMAOs podem potencializar o efeito hipoglicemiante, aumentando risco e duração das hipoglicemias.',
        conduta: 'Monitorar glicemia com frequência. Ajustar doses dos antidiabéticos.'
      },
      {
        tipo: 'duplicacao',
        classe: 'imao',
        nivel: 'alto',
        titulo: 'Duplicação de IMAO',
        efeito: 'Dois IMAOs irreversíveis causam risco de crises hipertensivas e síndrome serotoninérgica graves.',
        conduta: 'CONTRAINDICADO. Nunca combinar dois IMAOs.'
      }
    ]
  },

  {
    slug: 'selegilina-5mg-10mg',
    nome: 'Selegilina 5mg - 10mg',
    interacoes: [
      {
        com: ['Fluoxetina', 'Paroxetina', 'Sertralina', 'SSRIs'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica — CONTRAINDICADO',
        efeito: 'Mesmo em doses antiparkinsoniana (≤10mg/dia), a selegilina inibe a MAO-B e, em menor grau, a MAO-A. Com SSRIs, o risco de síndrome serotoninérgica é real e documentado.',
        conduta: 'CONTRAINDICADO com fluoxetina e paroxetina. Aguardar 14 dias após suspensão da selegilina antes de SSRIs (5 semanas para fluoxetina). Avaliar individualmente com outros SSRIs sob supervisão neurológica.'
      },
      {
        com: ['Tramadol', 'Meperidina', 'Dextrometorfano'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica com opioides serotoninérgicos',
        efeito: 'Tramadol e meperidina combinados com selegilina provocam síndrome serotoninérgica com risco de hiperpirexia, rigidez e convulsões.',
        conduta: 'CONTRAINDICADO. Usar morfina ou oxicodona se analgesia opioide for necessária.'
      },
      {
        com: ['Sumatriptano', 'Rizatriptano', 'Zolmitriptano', 'Triptanos'],
        nivel: 'alto',
        titulo: 'Síndrome serotoninérgica com triptanos',
        efeito: 'Triptanos são agonistas 5-HT1B/D; combinados com selegilina, aumentam o tônus serotoninérgico com risco de síndrome serotoninérgica.',
        conduta: 'Evitar associação. Discutir alternativa para enxaqueca com o neurologista.'
      },
      {
        com: ['Carbidopa + Levodopa'],
        nivel: 'moderado',
        titulo: 'Potencialização dopaminérgica — uso combinado monitorado',
        efeito: 'Selegilina inibe o metabolismo da dopamina, potencializando o efeito da levodopa. Combinação usada terapeuticamente, mas pode aumentar discinesias e efeitos adversos dopaminérgicos.',
        conduta: 'Combinação intencional no Parkinson. Reduzir dose de levodopa em 10–30% ao introduzir selegilina. Monitorar discinesias, alucinações e hipotensão ortostática.'
      },
      {
        com: ['Tiramina em alimentos (em doses altas de selegilina)'],
        nivel: 'moderado',
        titulo: 'Risco de crise hipertensiva em doses altas',
        efeito: 'Em doses ≤10mg/dia para Parkinson, a seletividade MAO-B reduz o risco de "cheese reaction". Em doses maiores ou com patch transdérmico, a seletividade é perdida e o risco de crise hipertensiva com tiramina aumenta.',
        conduta: 'Nas doses antiparkinsoniana padrão (5–10mg), restrição dietética de tiramina não é obrigatória, mas prudente evitar excessos. Com doses altas ou adesivo transdérmico, seguir dieta restrita.'
      },
      {
        tipo: 'duplicacao',
        classe: 'imao',
        nivel: 'alto',
        titulo: 'Duplicação de IMAO',
        efeito: 'Combinação com outro IMAO causa inibição excessiva com crises hipertensivas e síndrome serotoninérgica.',
        conduta: 'CONTRAINDICADO. Nunca combinar selegilina com outro IMAO (moclobemida, fenelzina, tranilcipromina, rasagilina).'
      }
    ]
  },

  // ─── ANTIEPILÉTICOS ──────────────────────────────────────────────────────

  {
    slug: 'levetiracetam-250mg-500mg-750mg-1000mg-solucao-oral',
    nome: 'Levetiracetam 250mg - 500mg - 750mg - 1000mg',
    interacoes: [
      {
        com: ['Álcool', 'Benzodiazepínicos', 'Opioides', 'Anti-histamínicos sedativos'],
        nivel: 'moderado',
        titulo: 'Sedação aditiva',
        efeito: 'Levetiracetam tem efeito sedativo; combinado com outros depressores do SNC, potencializa sonolência, tontura e risco de queda — especialmente em idosos.',
        conduta: 'Evitar álcool. Usar benzodiazepínicos e opioides com cautela e em doses mínimas. Alertar paciente sobre comprometimento da capacidade de dirigir.'
      },
      {
        com: ['Carbamazepina'],
        nivel: 'moderado',
        titulo: 'Aumento da toxicidade neurológica',
        efeito: 'A combinação de levetiracetam com carbamazepina pode aumentar efeitos adversos neurológicos como tontura, diplopia e ataxia, especialmente em doses altas.',
        conduta: 'Monitorar efeitos adversos neurológicos. Ajustar doses conforme tolerabilidade, sob orientação do neurologista.'
      },
      {
        com: ['Probenecida'],
        nivel: 'moderado',
        titulo: 'Aumento dos níveis de levetiracetam',
        efeito: 'Probenecida inibe o transportador renal OAT, reduzindo a excreção do principal metabólito do levetiracetam e podendo elevar seus níveis plasmáticos.',
        conduta: 'Monitorar sinais de toxicidade (sedação excessiva, tontura). Ajustar dose se necessário.'
      },
      {
        com: ['Metotrexato'],
        nivel: 'moderado',
        titulo: 'Possível aumento dos níveis plasmáticos',
        efeito: 'Levetiracetam e metotrexato competem pelos mesmos transportadores renais, podendo elevar os níveis de um ou ambos os fármacos.',
        conduta: 'Monitorar toxicidade de ambos os fármacos durante uso concomitante. Avaliar com reumatologista/neurologista.'
      },
      {
        com: ['Anticoncepcionais orais'],
        nivel: 'baixo',
        titulo: 'Levetiracetam não interfere com contraceptivos',
        efeito: 'Ao contrário de muitos outros antiepiléticos, o levetiracetam não induz enzimas hepáticas e não reduz a eficácia de anticoncepcionais hormonais — uma vantagem clínica importante.',
        conduta: 'Nenhuma ação necessária. Paciente pode usar contracepção hormonal normalmente durante tratamento com levetiracetam.'
      },
      {
        tipo: 'duplicacao',
        classe: 'antiepiletico',
        nivel: 'moderado',
        titulo: 'Politerapia antiepiléptica — monitoramento necessário',
        efeito: 'A combinação de múltiplos antiepiléticos pode aumentar toxicidade do SNC (sedação, ataxia, tontura) sem necessariamente melhorar o controle das crises.',
        conduta: 'Politerapia antiepiléptica deve ser conduzida exclusivamente por neurologista com monitoramento clínico e de níveis séricos quando aplicável.'
      }
    ]
  },

  {
    slug: 'lacosamida-50mg-100mg-150mg-200mg',
    nome: 'Lacosamida 50mg - 100mg - 150mg - 200mg',
    interacoes: [
      {
        com: ['Betabloqueadores', 'Bloqueadores de canal de cálcio não-diidropiridínicos', 'Diltiazem', 'Verapamil', 'Amiodarona', 'Digoxina'],
        nivel: 'alto',
        titulo: 'Prolongamento do intervalo PR e bloqueio AV',
        efeito: 'Lacosamida prolonga o intervalo PR no ECG por inativação dos canais de sódio. Combinada com outros fármacos que retardam a condução cardíaca, aumenta o risco de bloqueio atrioventricular e arritmias.',
        conduta: 'Realizar ECG antes de iniciar lacosamida. Monitorar ECG durante titulação. Usar com cautela com qualquer fármaco que prolongue o PR.'
      },
      {
        com: ['Carbamazepina', 'Fenitoína', 'Fenobarbital', 'Rifampicina'],
        nivel: 'moderado',
        titulo: 'Redução dos níveis de lacosamida por indução enzimática',
        efeito: 'Indutores potentes do CYP3A4 e CYP2C9 aumentam o metabolismo da lacosamida, podendo reduzir sua eficácia antiepiléptica.',
        conduta: 'Monitorar controle das crises. Pode ser necessário aumentar a dose de lacosamida. Ajustar sob orientação do neurologista.'
      },
      {
        com: ['Álcool', 'Benzodiazepínicos', 'Opioides'],
        nivel: 'moderado',
        titulo: 'Sedação e tontura aditivas',
        efeito: 'Lacosamida causa tontura e sonolência; depressores do SNC amplificam esses efeitos, aumentando risco de queda e acidentes.',
        conduta: 'Proibir álcool. Usar outros sedativos com cautela. Alertar sobre risco de dirigir ou operar máquinas.'
      },
      {
        com: ['Inibidores de CYP2C9', 'Fluconazol', 'Amiodarona'],
        nivel: 'moderado',
        titulo: 'Aumento dos níveis de lacosamida',
        efeito: 'Inibidores do CYP2C9 reduzem o metabolismo da lacosamida, podendo elevar seus níveis e intensificar efeitos adversos (tontura, náusea, diplopia).',
        conduta: 'Monitorar efeitos adversos. Reduzir dose de lacosamida se necessário.'
      },
      {
        tipo: 'duplicacao',
        classe: 'antiepiletico_canal_sodio',
        nivel: 'moderado',
        titulo: 'Duplicação de bloqueador de canal de sódio',
        efeito: 'Associar lacosamida com outros bloqueadores de canal de sódio (carbamazepina, oxcarbazepina, lamotrigina) pode aumentar toxicidade cardíaca e neurológica.',
        conduta: 'Politerapia com bloqueadores de canal de sódio deve ser avaliada com cuidado pelo neurologista, com monitoramento de ECG.'
      }
    ]
  },

  {
    slug: 'perampanel-2mg-4mg-6mg-8mg-10mg-12mg',
    nome: 'Perampanel 2mg - 4mg - 6mg - 8mg - 10mg - 12mg',
    interacoes: [
      {
        com: ['Carbamazepina', 'Fenitoína', 'Oxcarbazepina', 'Fenobarbital', 'Rifampicina'],
        nivel: 'alto',
        titulo: 'Redução muito significativa dos níveis de perampanel',
        efeito: 'Indutores potentes do CYP3A4 reduzem os níveis plasmáticos de perampanel em 50–67%, podendo comprometer completamente o controle das crises.',
        conduta: 'Pode ser necessário triplicar a dose de perampanel quando combinado com indutores potentes. Ajuste obrigatório sob orientação do neurologista com monitoramento das crises.'
      },
      {
        com: ['Álcool', 'Benzodiazepínicos', 'Opioides', 'Anti-histamínicos sedativos'],
        nivel: 'alto',
        titulo: 'Sedação, tontura e agressividade potencializadas',
        efeito: 'Perampanel causa sonolência, tontura e, em alguns pacientes, alterações comportamentais (hostilidade, agressividade). Depressores do SNC amplificam esses efeitos, especialmente o álcool.',
        conduta: 'Proibir álcool — aumenta especialmente o risco de comportamento hostil. Usar sedativos com cautela. Monitorar comportamento, sobretudo em adolescentes.'
      },
      {
        com: ['Anticoncepcionais com levonorgestrel'],
        nivel: 'moderado',
        titulo: 'Redução da eficácia do contraceptivo hormonal',
        efeito: 'Em doses de perampanel ≥12mg/dia, pode haver indução do CYP3A4 suficiente para reduzir os níveis de levonorgestrel, comprometendo a anticoncepção.',
        conduta: 'Em doses ≥12mg/dia, orientar uso de método contraceptivo adicional não hormonal (camisinha). Discutir com ginecologista alternativa ao levonorgestrel.'
      },
      {
        com: ['Valproato de sódio'],
        nivel: 'moderado',
        titulo: 'Leve aumento dos níveis de perampanel',
        efeito: 'Valproato pode inibir parcialmente o metabolismo do perampanel, elevando ligeiramente seus níveis plasmáticos.',
        conduta: 'Monitorar efeitos adversos (tontura, sonolência) ao combinar com valproato. Combinação usada clinicamente — avaliar com neurologista.'
      },
      {
        tipo: 'duplicacao',
        classe: 'antiepiletico',
        nivel: 'moderado',
        titulo: 'Politerapia antiepiléptica — monitoramento necessário',
        efeito: 'Múltiplos antiepiléticos aumentam carga de efeitos adversos no SNC sem garantia de melhor controle das crises.',
        conduta: 'Politerapia antiepiléptica conduzida exclusivamente por neurologista.'
      }
    ]
  },

  {
    slug: 'zonisamida-25mg-50mg-100mg',
    nome: 'Zonisamida 25mg - 50mg - 100mg',
    interacoes: [
      {
        com: ['Topiramato', 'Acetazolamida'],
        nivel: 'alto',
        titulo: 'Nefrolitíase e distúrbios metabólicos aditivos',
        efeito: 'Zonisamida e topiramato inibem a anidrase carbônica; a combinação causa acidose metabólica hiperclorêmica, hipocalemia e aumento do risco de cálculos renais.',
        conduta: 'Evitar associação. Se necessária, monitorar gasometria, bicarbonato sérico, potássio e função renal. Manter hidratação adequada.'
      },
      {
        com: ['Carbamazepina', 'Fenitoína', 'Fenobarbital', 'Rifampicina'],
        nivel: 'moderado',
        titulo: 'Redução dos níveis de zonisamida por indução enzimática',
        efeito: 'Indutores do CYP3A4 aumentam o metabolismo da zonisamida, reduzindo seus níveis plasmáticos em até 50% e comprometendo o controle das crises.',
        conduta: 'Monitorar controle epiléptico. Ajustar dose de zonisamida sob orientação neurológica.'
      },
      {
        com: ['Valproato de sódio'],
        nivel: 'moderado',
        titulo: 'Possível aumento dos níveis de zonisamida',
        efeito: 'Valproato inibe CYP3A4 e pode aumentar a exposição à zonisamida, elevando o risco de efeitos adversos (anorexia, sonolência, nefrolitíase).',
        conduta: 'Monitorar efeitos adversos e peso corporal. Acompanhar com neurologista.'
      },
      {
        com: ['Diuréticos', 'Furosemida', 'Hidroclorotiazida', 'Clortalidona'],
        nivel: 'moderado',
        titulo: 'Risco aumentado de nefrolitíase e desidratação',
        efeito: 'Diuréticos reduzem o volume urinário e podem concentrar cálcio e oxalato urinários; combinados com zonisamida (inibidor da anidrase carbônica), aumentam o risco de cálculos renais.',
        conduta: 'Manter ingestão hídrica de pelo menos 2 litros/dia. Monitorar função renal e pesquisa de cálculos se dor lombar ou hematúria.'
      },
      {
        com: ['Álcool', 'Benzodiazepínicos'],
        nivel: 'moderado',
        titulo: 'Sedação aditiva',
        efeito: 'Zonisamida causa sonolência e tontura; depressores do SNC amplificam esses efeitos.',
        conduta: 'Proibir álcool. Usar sedativos com cautela. Alertar sobre risco de dirigir.'
      },
      {
        tipo: 'duplicacao',
        classe: 'antiepiletico_inibidor_anidrase',
        nivel: 'alto',
        titulo: 'Duplicação de inibidor da anidrase carbônica',
        efeito: 'Zonisamida + topiramato ou acetazolamida: inibição aditiva da anidrase carbônica com acidose metabólica e nefrolitíase.',
        conduta: 'Evitar associação sem indicação específica do neurologista.'
      }
    ]
  },

  {
    slug: 'etossuximida-250mg-500mg',
    nome: 'Etossuximida 250mg - 500mg',
    interacoes: [
      {
        com: ['Valproato de sódio'],
        nivel: 'moderado',
        titulo: 'Alteração bidirecional dos níveis plasmáticos',
        efeito: 'Valproato pode elevar ou reduzir os níveis de etossuximida de forma imprevisível, dependendo da dose e do paciente. A combinação é usada clinicamente para epilepsia de ausência refratária.',
        conduta: 'Monitorar frequência das crises de ausência. Dosagem de níveis séricos de etossuximida útil para ajuste. Acompanhamento neurológico obrigatório.'
      },
      {
        com: ['Carbamazepina', 'Fenitoína', 'Fenobarbital', 'Rifampicina'],
        nivel: 'moderado',
        titulo: 'Redução dos níveis de etossuximida por indução enzimática',
        efeito: 'Indutores do CYP3A4 aumentam o metabolismo da etossuximida, reduzindo seus níveis plasmáticos e podendo piorar o controle das ausências.',
        conduta: 'Monitorar crises epilépticas. Ajustar dose de etossuximida conforme necessário sob orientação neurológica.'
      },
      {
        com: ['Isoniazida'],
        nivel: 'moderado',
        titulo: 'Aumento dos níveis de etossuximida',
        efeito: 'Isoniazida inibe o CYP3A4, podendo elevar os níveis plasmáticos de etossuximida e aumentar o risco de toxicidade (náusea, letargia, ataxia).',
        conduta: 'Monitorar efeitos adversos. Considerar redução de dose de etossuximida durante tratamento com isoniazida.'
      },
      {
        com: ['Álcool', 'Benzodiazepínicos', 'Anti-histamínicos sedativos'],
        nivel: 'moderado',
        titulo: 'Sedação aditiva',
        efeito: 'Etossuximida pode causar sonolência; depressores do SNC amplificam esse efeito.',
        conduta: 'Evitar álcool. Usar sedativos com cautela. Orientar sobre risco de dirigir e operar máquinas.'
      },
      {
        tipo: 'duplicacao',
        classe: 'antiepiletico_ausencia',
        nivel: 'moderado',
        titulo: 'Politerapia para epilepsia de ausência',
        efeito: 'A combinação de etossuximida com lamotrigina ou valproato pode ser intencional em ausências refratárias, mas aumenta carga de efeitos adversos.',
        conduta: 'Politerapia conduzida exclusivamente por neurologista especializado em epilepsia.'
      }
    ]
  },

  // ─── IMUNOSSUPRESSORES ───────────────────────────────────────────────────

  {
    slug: 'prograf-advagraf-tacrolimo-sistemico',
    nome: 'Prograf / Advagraf (Tacrolimo Sistêmico)',
    interacoes: [
      {
        com: ['Azóis', 'Fluconazol', 'Itraconazol', 'Voriconazol', 'Posaconazol', 'Cetoconazol'],
        nivel: 'alto',
        titulo: 'Aumento drástico dos níveis de tacrolimo por inibição do CYP3A4',
        efeito: 'Antifúngicos azólicos são inibidores potentes do CYP3A4 e P-gp, podendo elevar os níveis de tacrolimo em 3 a 10 vezes — com alto risco de nefrotoxicidade, neurotoxicidade e imunossupressão excessiva.',
        conduta: 'Monitorar nível mínimo (vale) de tacrolimo com frequência. Antecipar necessidade de redução de 50–75% da dose. Ajuste obrigatório pelo médico transplantador.'
      },
      {
        com: ['Rifampicina', 'Fenitoína', 'Carbamazepina', 'Fenobarbital', 'Dexametasona em dose alta'],
        nivel: 'alto',
        titulo: 'Redução grave dos níveis de tacrolimo — risco de rejeição',
        efeito: 'Indutores potentes do CYP3A4 e P-gp reduzem drasticamente os níveis de tacrolimo, podendo levar a rejeição aguda do órgão transplantado.',
        conduta: 'Evitar combinação. Se inevitável, monitorar tacrolimemia diariamente e aumentar dose substancialmente. Consulta obrigatória com médico transplantador.'
      },
      {
        com: ['Aminoglicosídeos', 'Gentamicina', 'Amicacina', 'Anfotericina B', 'Vancomicina', 'AINEs'],
        nivel: 'alto',
        titulo: 'Nefrotoxicidade aditiva',
        efeito: 'Tacrolimo é nefrotóxico; combinado com outros agentes nefrotóxicos, o risco de lesão renal aguda é muito elevado — podendo levar à necessidade de diálise.',
        conduta: 'Evitar associação com agentes nefrotóxicos sempre que possível. Se necessário, monitorar creatinina, ureia e diurese diariamente. Ajustar doses com base na função renal.'
      },
      {
        com: ['Claritromicina', 'Eritromicina', 'Diltiazem', 'Verapamil', 'Amiodarona', 'Ciclosporina'],
        nivel: 'alto',
        titulo: 'Aumento dos níveis de tacrolimo por inibição de CYP3A4/P-gp',
        efeito: 'Esses fármacos inibem o CYP3A4 e/ou a P-glicoproteína, elevando significativamente os níveis de tacrolimo com risco de toxicidade renal e neurológica.',
        conduta: 'Monitorar tacrolimemia. Reduzir dose de tacrolimo conforme necessário. Evitar ciclosporina concomitante — combinação contraindicada por nefrotoxicidade aditiva grave.'
      },
      {
        com: ['Vacinas vivas', 'BCG', 'Febre amarela', 'MMR', 'Varicela', 'Rotavírus'],
        nivel: 'alto',
        titulo: 'Doença grave por vacina viva — CONTRAINDICADO',
        efeito: 'Tacrolimo suprime a imunidade; vacinas vivas podem causar infecção sistêmica grave pelo agente vacinal em pacientes imunossuprimidos.',
        conduta: 'CONTRAINDICADO. Vacinas vivas são absolutamente contraindicadas durante uso de tacrolimo. Verificar cartão vacinal e atualizar com vacinas inativadas antes do transplante.'
      },
      {
        com: ['Diuréticos poupadores de K+', 'Espironolactona', 'Amilorida', 'Inibidores da ECA', 'BRAs'],
        nivel: 'moderado',
        titulo: 'Hipercalemia',
        efeito: 'Tacrolimo pode causar hipercalemia por redução da excreção renal de potássio; combinado com poupadores de K+ ou bloqueadores do SRAA, o risco é amplificado.',
        conduta: 'Monitorar potássio sérico regularmente. Evitar suplementação de potássio desnecessária.'
      },
      {
        tipo: 'duplicacao',
        classe: 'inibidor_calcineurina',
        nivel: 'alto',
        titulo: 'Duplicação de inibidor de calcineurina',
        efeito: 'Tacrolimo + ciclosporina: nefrotoxicidade aditiva grave e imunossupressão excessiva. Combinação contraindicada.',
        conduta: 'CONTRAINDICADO. Nunca combinar dois inibidores de calcineurina.'
      }
    ]
  },

  {
    slug: 'cellcept-myfortic-micofenolato',
    nome: 'CellCept / Myfortic (Micofenolato)',
    interacoes: [
      {
        com: ['Azatioprina'],
        nivel: 'alto',
        titulo: 'Mielossupressão aditiva grave — CONTRAINDICADO',
        efeito: 'Micofenolato e azatioprina inibem a síntese de purinas por mecanismos complementares. A combinação causa mielossupressão grave com leucopenia profunda e risco de infecções oportunistas fatais.',
        conduta: 'CONTRAINDICADO. Usar apenas um deles — a escolha entre micofenolato e azatioprina deve ser feita pelo médico transplantador/reumatologista.'
      },
      {
        com: ['Colestiramina', 'Colestipol'],
        nivel: 'alto',
        titulo: 'Redução grave dos níveis de micofenolato',
        efeito: 'Colestiramina e colestipol interrompem a circulação êntero-hepática do ácido micofenólico, reduzindo sua absorção em até 40% e comprometendo a imunossupressão.',
        conduta: 'Evitar combinação. Se necessário tratamento de dislipidemia, preferir estatinas ou ezetimiba.'
      },
      {
        com: ['Rifampicina'],
        nivel: 'alto',
        titulo: 'Redução dos níveis de micofenolato',
        efeito: 'Rifampicina induz a glicuronidação do ácido micofenólico e interrompe a circulação êntero-hepática, reduzindo significativamente seus níveis com risco de rejeição.',
        conduta: 'Evitar combinação. Se antituberculoso for necessário, considerar esquema alternativo sem rifampicina. Monitorar rejeição se uso inevitável.'
      },
      {
        com: ['Antiácidos com magnésio e alumínio', 'Hidróxido de magnésio', 'Hidróxido de alumínio'],
        nivel: 'moderado',
        titulo: 'Redução da absorção do micofenolato',
        efeito: 'Antiácidos com Mg/Al reduzem a biodisponibilidade do micofenolato mofetil em até 17–38%.',
        conduta: 'Tomar micofenolato pelo menos 2 horas antes ou 4 horas após antiácidos. Preferir IBP (omeprazol) para proteção gástrica.'
      },
      {
        com: ['Aciclovir', 'Ganciclovir', 'Valaciclovir'],
        nivel: 'moderado',
        titulo: 'Aumento mútuo dos níveis plasmáticos',
        efeito: 'Micofenolato e antivirais competem pela excreção tubular renal, podendo elevar os níveis de ambos — especialmente relevante em insuficiência renal.',
        conduta: 'Monitorar função renal. Ajustar doses de antiviral conforme creatinina. Monitorar toxicidade hematológica do micofenolato.'
      },
      {
        com: ['Vacinas vivas', 'BCG', 'Febre amarela', 'MMR', 'Varicela'],
        nivel: 'alto',
        titulo: 'Doença grave por vacina viva — CONTRAINDICADO',
        efeito: 'Imunossupressão pelo micofenolato impede a resposta imune adequada e pode causar infecção sistêmica grave pelo agente vacinal.',
        conduta: 'CONTRAINDICADO. Atualizar vacinação com vacinas inativadas antes do início da imunossupressão.'
      },
      {
        tipo: 'duplicacao',
        classe: 'imunossupressor_antimetabolito',
        nivel: 'alto',
        titulo: 'Duplicação de antimetabólito imunossupressor',
        efeito: 'Micofenolato + azatioprina causa mielossupressão grave por inibição aditiva da síntese de purinas.',
        conduta: 'CONTRAINDICADO. Escolher apenas um dos dois antimetabólitos.'
      }
    ]
  },

  {
    slug: 'leflunomida-10mg-20mg',
    nome: 'Leflunomida 10mg - 20mg',
    interacoes: [
      {
        com: ['Metotrexato'],
        nivel: 'alto',
        titulo: 'Hepatotoxicidade aditiva — monitoramento rigoroso',
        efeito: 'Leflunomida e metotrexato são hepatotóxicos; a combinação (usada em AR refratária) aumenta significativamente o risco de lesão hepática grave.',
        conduta: 'Monitorar enzimas hepáticas (ALT/AST) mensalmente. Se ALT > 3× limite superior da normalidade, suspender leflunomida e iniciar protocolo de washout (colestiramina). Uso combinado apenas sob supervisão reumatológica rigorosa.'
      },
      {
        com: ['Rifampicina'],
        nivel: 'alto',
        titulo: 'Aumento dos níveis do metabólito ativo (A77 1726)',
        efeito: 'Rifampicina induz o CYP1A2 e aumenta paradoxalmente os níveis do metabólito ativo da leflunomida (A77 1726), podendo causar toxicidade por acúmulo do imunossupressor.',
        conduta: 'Evitar combinação. Se rifampicina for necessária (tuberculose), considerar alternativa à leflunomida durante o tratamento. Monitorar hepatotoxicidade.'
      },
      {
        com: ['Varfarina', 'Acenocumarol'],
        nivel: 'moderado',
        titulo: 'Potencialização do efeito anticoagulante',
        efeito: 'Leflunomida pode inibir o CYP2C9, reduzindo o metabolismo da varfarina e elevando o INR com risco de sangramento.',
        conduta: 'Monitorar INR com maior frequência ao iniciar, ajustar ou suspender leflunomida. Ajustar dose de varfarina conforme necessário.'
      },
      {
        com: ['Colestiramina', 'Carvão ativado'],
        nivel: 'moderado',
        titulo: 'Protocolo de washout — uso intencional para acelerar eliminação',
        efeito: 'Colestiramina e carvão ativado interrompem a circulação êntero-hepática do metabólito ativo da leflunomida, acelerando sua eliminação. Usados intencionalmente em caso de toxicidade ou necessidade de gravidez.',
        conduta: 'Protocolo de washout: colestiramina 8g 3×/dia por 11 dias (ou carvão ativado 50g 4×/dia por 11 dias). Verificar nível plasmático de A77 1726 após washout antes de gravidez.'
      },
      {
        com: ['AINEs', 'Ibuprofeno', 'Naproxeno', 'Diclofenaco'],
        nivel: 'moderado',
        titulo: 'Hepatotoxicidade e nefrotoxicidade aditivas',
        efeito: 'AINEs combinados com leflunomida aumentam o risco de toxicidade hepática e renal.',
        conduta: 'Monitorar função hepática e renal. Usar AINEs na menor dose e pelo menor tempo possível. Preferir paracetamol para analgesia simples.'
      },
      {
        com: ['Vacinas vivas', 'BCG', 'Febre amarela', 'MMR'],
        nivel: 'alto',
        titulo: 'Doença grave por vacina viva — CONTRAINDICADO',
        efeito: 'Leflunomida suprime a imunidade; vacinas vivas podem causar infecção sistêmica grave.',
        conduta: 'CONTRAINDICADO. Atualizar vacinação com vacinas inativadas antes do início do tratamento.'
      },
      {
        tipo: 'duplicacao',
        classe: 'dmard_imunossupressor',
        nivel: 'moderado',
        titulo: 'Dupla imunossupressão com DMARDs',
        efeito: 'Leflunomida + outro DMARD imunossupressor (azatioprina, ciclosporina) causa imunossupressão excessiva com alto risco de infecções graves.',
        conduta: 'Evitar dupla imunossupressão fora de protocolos específicos. Discutir com reumatologista.'
      }
    ]
  },

  {
    slug: 'tofacitinibe-xeljanz',
    nome: 'Tofacitinibe (Xeljanz)',
    interacoes: [
      {
        com: ['Imunossupressores biológicos', 'Anti-TNF', 'Rituximabe', 'Abatacepte', 'Tocilizumabe'],
        nivel: 'alto',
        titulo: 'Imunossupressão excessiva — CONTRAINDICADO',
        efeito: 'A combinação de tofacitinibe com imunobiológicos causa imunossupressão profunda com alto risco de infecções graves, tuberculose e malignidades.',
        conduta: 'CONTRAINDICADO. Tofacitinibe não deve ser usado com imunobiológicos. Se troca de medicamento, respeitar período de washout adequado.'
      },
      {
        com: ['Inibidores potentes de CYP3A4', 'Cetoconazol', 'Itraconazol', 'Claritromicina', 'Ritonavir'],
        nivel: 'alto',
        titulo: 'Aumento dos níveis de tofacitinibe',
        efeito: 'Inibidores potentes do CYP3A4 reduzem o metabolismo do tofacitinibe, aumentando sua concentração plasmática e o risco de imunossupressão excessiva.',
        conduta: 'Reduzir dose de tofacitinibe para 5mg uma vez ao dia quando combinado com inibidores potentes de CYP3A4. Monitorar infecções e hemograma.'
      },
      {
        com: ['Rifampicina', 'Fenitoína', 'Carbamazepina'],
        nivel: 'alto',
        titulo: 'Redução dos níveis de tofacitinibe — perda de eficácia',
        efeito: 'Indutores potentes do CYP3A4 reduzem significativamente os níveis de tofacitinibe, podendo comprometer a resposta clínica na AR ou colite.',
        conduta: 'Evitar combinação. Se necessária, monitorar resposta clínica e considerar aumento de dose.'
      },
      {
        com: ['Vacinas vivas', 'BCG', 'Febre amarela', 'MMR', 'Varicela', 'Herpes-zóster viva'],
        nivel: 'alto',
        titulo: 'Doença grave por vacina viva — CONTRAINDICADO',
        efeito: 'Tofacitinibe compromete gravemente a resposta imune; vacinas vivas podem causar infecção sistêmica pelo agente vacinal.',
        conduta: 'CONTRAINDICADO. Atualizar vacinação antes do tratamento (incluindo herpes-zóster viva). Durante o tratamento, usar apenas vacinas inativadas.'
      },
      {
        com: ['Metotrexato'],
        nivel: 'moderado',
        titulo: 'Aumento dos níveis de tofacitinibe e hepatotoxicidade',
        efeito: 'Metotrexato aumenta a exposição ao tofacitinibe em ~10% e ambos têm potencial hepatotóxico. Combinação usada clinicamente na AR.',
        conduta: 'Monitorar hemograma e enzimas hepáticas mensalmente nos primeiros meses. Reduzir dose de tofacitinibe se necessário.'
      },
      {
        tipo: 'duplicacao',
        classe: 'inibidor_jak',
        nivel: 'alto',
        titulo: 'Duplicação de inibidor de JAK',
        efeito: 'Dois inibidores de JAK (tofacitinibe + baricitinibe ou upadacitinibe) causam imunossupressão excessiva sem benefício adicional.',
        conduta: 'CONTRAINDICADO. Usar apenas um inibidor de JAK por vez.'
      }
    ]
  },

  {
    slug: 'baricitinibe-olumiant',
    nome: 'Baricitinibe (Olumiant)',
    interacoes: [
      {
        com: ['Imunossupressores biológicos', 'Anti-TNF', 'Rituximabe', 'Abatacepte', 'Tocilizumabe'],
        nivel: 'alto',
        titulo: 'Imunossupressão excessiva — CONTRAINDICADO',
        efeito: 'Baricitinibe combinado com imunobiológicos causa imunossupressão profunda com risco de infecções oportunistas graves, tuberculose e malignidades.',
        conduta: 'CONTRAINDICADO. Não combinar baricitinibe com imunobiológicos. Respeitar período de washout ao trocar de medicamento.'
      },
      {
        com: ['Probenecida'],
        nivel: 'alto',
        titulo: 'Aumento marcado dos níveis de baricitinibe',
        efeito: 'Probenecida inibe o transportador OAT3, que é responsável pela eliminação renal de baricitinibe. A combinação aumenta a exposição ao baricitinibe em ~2 vezes.',
        conduta: 'Reduzir dose de baricitinibe para 1mg uma vez ao dia quando combinado com probenecida. Monitorar hemograma e sinais de imunossupressão excessiva.'
      },
      {
        com: ['Inibidores de OAT3', 'Pirfenidona', 'Furosemida em altas doses'],
        nivel: 'moderado',
        titulo: 'Possível aumento dos níveis de baricitinibe',
        efeito: 'Outros inibidores do transportador OAT3 podem elevar os níveis de baricitinibe, embora em menor grau que probenecida.',
        conduta: 'Monitorar efeitos adversos e hemograma. Considerar redução de dose se necessário.'
      },
      {
        com: ['Vacinas vivas', 'BCG', 'Febre amarela', 'MMR', 'Varicela', 'Herpes-zóster viva'],
        nivel: 'alto',
        titulo: 'Doença grave por vacina viva — CONTRAINDICADO',
        efeito: 'Baricitinibe compromete a imunidade celular e humoral; vacinas vivas podem causar infecção sistêmica grave.',
        conduta: 'CONTRAINDICADO. Atualizar vacinação antes do tratamento. Durante baricitinibe, usar somente vacinas inativadas.'
      },
      {
        com: ['Metotrexato'],
        nivel: 'moderado',
        titulo: 'Uso combinado na AR — monitoramento necessário',
        efeito: 'Combinação usada clinicamente para melhorar eficácia na AR, mas aumenta risco de infecções, mielossupressão e hepatotoxicidade.',
        conduta: 'Monitorar hemograma completo e enzimas hepáticas mensalmente nos primeiros 3 meses. Atenção a sinais de infecção.'
      },
      {
        tipo: 'duplicacao',
        classe: 'inibidor_jak',
        nivel: 'alto',
        titulo: 'Duplicação de inibidor de JAK',
        efeito: 'Dois inibidores de JAK causam imunossupressão excessiva sem benefício adicional.',
        conduta: 'CONTRAINDICADO. Usar apenas um inibidor de JAK por vez.'
      }
    ]
  },

  {
    slug: 'upadacitinibe-15mg-30mg-45mg',
    nome: 'Upadacitinibe 15mg - 30mg - 45mg',
    interacoes: [
      {
        com: ['Imunossupressores biológicos', 'Anti-TNF', 'Rituximabe', 'Abatacepte', 'Tocilizumabe', 'IL-17', 'IL-23'],
        nivel: 'alto',
        titulo: 'Imunossupressão excessiva — CONTRAINDICADO',
        efeito: 'Upadacitinibe combinado com imunobiológicos causa imunossupressão profunda com risco elevado de infecções oportunistas, tuberculose e malignidades.',
        conduta: 'CONTRAINDICADO. Não combinar com imunobiológicos. Respeitar período de washout adequado ao trocar de medicamento.'
      },
      {
        com: ['Inibidores potentes de CYP3A4', 'Cetoconazol', 'Itraconazol', 'Claritromicina', 'Ritonavir'],
        nivel: 'alto',
        titulo: 'Aumento dos níveis de upadacitinibe',
        efeito: 'Inibidores potentes do CYP3A4 elevam significativamente os níveis de upadacitinibe, aumentando o risco de imunossupressão excessiva e efeitos adversos.',
        conduta: 'Evitar combinação. Se necessária, usar com cautela e monitorar efeitos adversos. Considerar redução de dose.'
      },
      {
        com: ['Rifampicina', 'Carbamazepina', 'Fenitoína'],
        nivel: 'alto',
        titulo: 'Redução dos níveis de upadacitinibe — risco de falha terapêutica',
        efeito: 'Indutores potentes do CYP3A4 reduzem substancialmente os níveis de upadacitinibe, podendo comprometer a eficácia no tratamento da AR, psoríase ou DII.',
        conduta: 'Evitar combinação. Monitorar resposta clínica se uso inevitável e considerar aumento de dose.'
      },
      {
        com: ['Vacinas vivas', 'BCG', 'Febre amarela', 'MMR', 'Varicela', 'Herpes-zóster viva'],
        nivel: 'alto',
        titulo: 'Doença grave por vacina viva — CONTRAINDICADO',
        efeito: 'Upadacitinibe compromete a imunidade; vacinas vivas podem causar infecção sistêmica pelo agente vacinal.',
        conduta: 'CONTRAINDICADO. Vacinar com imunizantes inativados antes do início do tratamento. Considerar vacina anti-herpes-zóster inativada (Shingrix) antes de iniciar upadacitinibe.'
      },
      {
        com: ['Metotrexato'],
        nivel: 'moderado',
        titulo: 'Uso combinado — monitoramento necessário',
        efeito: 'Upadacitinibe é frequentemente usado com metotrexato na AR e outras doenças imunomediadas. A combinação aumenta risco de infecções e toxicidade hematológica.',
        conduta: 'Monitorar hemograma e enzimas hepáticas regularmente. Atenção a sinais de infecção respiratória, herpes e tuberculose.'
      },
      {
        tipo: 'duplicacao',
        classe: 'inibidor_jak',
        nivel: 'alto',
        titulo: 'Duplicação de inibidor de JAK',
        efeito: 'Dois inibidores de JAK causam imunossupressão excessiva sem benefício adicional.',
        conduta: 'CONTRAINDICADO. Usar apenas um inibidor de JAK por vez.'
      }
    ]
  }

];

let ok = 0, nok = 0;
for (const med of MEDS) {
  const idx = data.findIndex(m => m.slug === med.slug);
  if (idx === -1) {
    console.log('NAO ENCONTRADO:', med.nome, '| slug:', med.slug);
    nok++;
  } else {
    data[idx].interacoes = med.interacoes;
    console.log('OK:', med.nome, '—', med.interacoes.length, 'interações');
    ok++;
  }
}

fs.writeFileSync('./src/data/medicamento.json', JSON.stringify(data, null, 2), 'utf8');
console.log('\nTotal atualizado:', ok, '| Não encontrado:', nok);
