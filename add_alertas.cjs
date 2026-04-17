// Script: adicionar alerta_farmaceutico e quando_procurar_medico em cada medicamento
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'medicamentos.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// ─── Regras por nome específico (maior prioridade) ───────────────────────────
const porNome = {
  'metformina': {
    alerta: 'Erro comum no balcão: dispensar metformina de liberação imediata quando o médico prescreveu XR (liberação prolongada) — as formulações não são intercambiáveis em posologia; a XR tem menos efeitos gastrointestinais e é tomada uma vez ao dia.',
    quando: 'Procure médico se: náuseas ou vômitos intensos que impeçam alimentação, dor abdominal súbita, fraqueza extrema ou confusão mental (sinais de acidose láctica — rara, mas grave) ou glicemia acima de 300 mg/dL.'
  },
  'omeprazol': {
    alerta: 'Erro comum no balcão: dispensar omeprazol para qualquer "dor no estômago" sem identificar se o paciente já usa por meses — uso prolongado sem reavaliação reduz absorção de B12, magnésio e ferro, e aumenta risco de infecções intestinais.',
    quando: 'Procure médico se: dor abdominal que não melhora em 2 semanas, fezes escuras ou com sangue, vômito com aspecto de borra de café, perda de peso sem causa ou dificuldade para engolir.'
  },
  'pantoprazol': {
    alerta: 'Erro comum no balcão: orientar tomar pantoprazol depois das refeições — deve ser tomado 30 minutos antes do café da manhã para máxima eficácia. Engolir inteiro, nunca triturar.',
    quando: 'Procure médico se: sintomas persistem após 2 semanas de uso, fezes escuras, vômito com sangue ou sintomas novos como dificuldade para engolir e perda de peso.'
  },
  'levotiroxina': {
    alerta: 'Erro comum no balcão: paciente compra cálcio, ferro ou antiácido junto com levotiroxina e toma no mesmo horário — esses minerais bloqueiam até 40% da absorção. A levotiroxina deve ser tomada em jejum, 30–60 min antes de qualquer outro medicamento ou alimento.',
    quando: 'Procure médico se: palpitações, tremor fino nas mãos, agitação ou perda de peso sem causa (dose alta demais); ou fadiga extrema, ganho de peso, inchaço e frio excessivo (dose insuficiente).'
  },
  'warfarina': {
    alerta: 'Erro comum no balcão: paciente relata que vai tomar dipirona ou ibuprofeno para dor — AINEs potencializam muito o efeito da warfarina e aumentam o risco de sangramento grave. Qualquer analgésico precisa de autorização médica prévia.',
    quando: 'Procure atendimento imediato se: sangramento que não para, urina vermelha ou rosa, fezes escuras ou pretas, sangramento espontâneo na gengiva, hematomas grandes ou cefaleia súbita intensa.'
  },
  'amiodarona': {
    alerta: 'Erro comum no balcão: paciente interrompe amiodarona por conta própria ao sentir efeitos como sensibilidade ao sol — a meia-vida é de 40–55 dias e interrupção sem desmame pode desencadear arritmias graves. Nunca parar sem orientação.',
    quando: 'Procure médico imediatamente se: falta de ar ou tosse persistente (toxicidade pulmonar), visão turva com halos coloridos, pele amarelada, batimentos cardíacos muito lentos ou irregulares.'
  },
  'digoxina': {
    alerta: 'Erro comum no balcão: não alertar que outros medicamentos (diuréticos, amiodarona, antibióticos) elevam os níveis de digoxina — a janela terapêutica é estreita e a intoxicação pode causar arritmias fatais com sintomas sutis como náusea e visão amarelada.',
    quando: 'Procure médico imediatamente se: náusea, vômito, visão amarelada ou com halos, batimentos muito lentos ou irregulares, confusão mental ou fraqueza intensa — todos são sinais de intoxicação digitálica.'
  },
  'lítio': {
    alerta: 'Erro comum no balcão: paciente compra ibuprofeno ou diclofenaco para dor sem saber que AINEs e diuréticos elevam os níveis de lítio — a margem entre dose terapêutica e tóxica é muito pequena. Sempre avisar o médico antes de tomar qualquer medicamento novo.',
    quando: 'Procure médico imediatamente se: tremor fino nas mãos que piora, diarreia intensa, confusão mental, fala arrastada, visão dupla ou descoordenação motora — sinais clássicos de intoxicação por lítio.'
  },
  'isotretinoína': {
    alerta: 'Erro comum no balcão: adolescente começa isotretinoína sem que a farmacêutica confirme se está no programa PRIS e com a notificação de receita especial — a dispensação sem esses requisitos é crime sanitário e o medicamento causa defeitos fetais graves.',
    quando: 'Procure médico se: dor intensa nos olhos ou visão noturna prejudicada, dor óssea ou muscular intensa, sintomas depressivos ou pensamentos de se machucar, dor abdominal intensa (pancreatite) ou pele muito seca com fissuras dolorosas.'
  },
  'metotrexato': {
    alerta: 'Erro comum no balcão: paciente toma metotrexato diariamente por engano — é prescrito uma vez por semana para artrite e psoríase, e a dose diária acidental pode causar toxicidade grave e morte. Confirmar sempre a posologia com o médico e no rótulo.',
    quando: 'Procure médico imediatamente se: febre (metotrexato suprime a imunidade), úlceras na boca intensas, dificuldade para respirar, urina escura, pele amarelada ou sangramento incomum.'
  },
  'clonazepam': {
    alerta: 'Erro comum no balcão: paciente pede para dobrar a dose porque "está sentindo menos efeito" — é sinal de tolerância farmacológica, não de dose insuficiente. Aumentar a dose por conta própria acelera a dependência física e o desmame posterior será mais difícil.',
    quando: 'Procure médico se: necessitar doses crescentes para o mesmo efeito, sentir fissura pelo medicamento fora do horário, convulsões ao tentar reduzir a dose ou sintomas de abstinência como tremor e sudorese intensa.'
  },
  'alprazolam': {
    alerta: 'Erro comum no balcão: paciente solicita alprazolam referindo que o médico "passou, mas acabou" e quer comprar sem receita — benzodiazepínico de ação curta tem alto potencial de dependência e a dispensação sem receita B2 é vedada.',
    quando: 'Procure médico se: sentir necessidade crescente do medicamento, ansiedade intensa entre uma dose e outra (efeito rebote), dificuldade para reduzir a dose, insônia intensa ao tentar parar ou convulsões.'
  },
  'varfarina': {
    alerta: 'Erro comum no balcão: paciente relata que vai tomar dipirona ou ibuprofeno para dor — AINEs potencializam muito o efeito da varfarina e aumentam o risco de sangramento grave. Qualquer analgésico precisa de autorização médica prévia.',
    quando: 'Procure atendimento imediato se: sangramento que não para, urina vermelha, fezes escuras, sangramento espontâneo na gengiva, hematomas grandes ou cefaleia súbita intensa.'
  }
};

// ─── Regras por classe (tipo) ─────────────────────────────────────────────────
function classificar(tipo, nome) {
  const t = tipo.toLowerCase();
  const n = nome.toLowerCase();

  // ANTIBIÓTICOS
  if (t.includes('antibiótico') || t.includes('antibiotico')) {
    if (t.includes('tópico') || t.includes('topico')) {
      return {
        alerta: 'Erro comum no balcão: paciente usa antibiótico tópico por semanas sem melhora, sem retornar ao médico — uso prolongado pode favorecer resistência bacteriana e superinfecção fúngica. Uso tópico deve ser limitado ao tempo prescrito.',
        quando: 'Procure médico se: lesão não melhorar em 5–7 dias de uso, surgir vermelhidão intensa ao redor, secreção com odor fétido, febre ou piora da ferida — pode indicar infecção resistente ou fúngica.'
      };
    }
    if (t.includes('urinário') || t.includes('urinario')) {
      return {
        alerta: 'Erro comum no balcão: paciente inicia antibiótico urinário sem urocultura — tratar infecção urinária sem identificar a bactéria pode não eliminar o agente causador e contribui para resistência. Sempre solicitar urocultura antes ou durante.',
        quando: 'Procure médico se: dor ou ardência ao urinar não melhorar em 48h, surgir febre alta ou dor lombar (pode indicar pielonefrite — infecção renal), urina com sangue, calafrios ou náuseas intensas.'
      };
    }
    if (t.includes('fluoroquinolona')) {
      return {
        alerta: 'Erro comum no balcão: não alertar sobre a interação com leite, iogurte, antiácidos e suplementos de cálcio — reduzem em até 50% a absorção das fluoroquinolonas. Tomar 2h antes ou 6h depois desses alimentos.',
        quando: 'Procure médico imediatamente se: dor ou inflamação no tendão (sinal de ruptura — risco real com fluoroquinolonas), confusão mental, convulsões, arritmia ou erupção cutânea com bolhas.'
      };
    }
    if (t.includes('macrolídeo')) {
      return {
        alerta: 'Erro comum no balcão: não alertar que azitromicina e claritromicina têm muitas interações medicamentosas graves — anticoagulantes, estatinas e antiarrítmicos têm seus efeitos amplificados. Sempre revisar outros medicamentos em uso.',
        quando: 'Procure médico se: febre ou sintomas não melhorarem em 48–72h, surgir batimento cardíaco irregular (arritmia por prolongamento do QT), icterícia, rash cutâneo ou diarreia intensa com muco ou sangue.'
      };
    }
    return {
      alerta: 'Erro comum no balcão: paciente interrompe o antibiótico quando os sintomas melhoram — bactérias mais resistentes sobrevivem e a infecção pode voltar mais forte e difícil de tratar. Complete sempre o curso completo.',
      quando: 'Procure médico se: febre persistir após 48–72h de antibiótico, surgirem manchas vermelhas na pele, dificuldade para respirar, diarreia intensa com sangue ou muco, ou os sintomas piorarem em vez de melhorar.'
    };
  }

  // AINE / ANTI-INFLAMATÓRIO NÃO ESTEROIDAL
  if (t.includes('aine') || t.includes('anti-inflamatório não esteroidal') || t.includes('anti-inflamatorio nao esteroidal') || t.includes('cox-2')) {
    return {
      alerta: 'Erro comum no balcão: paciente toma dois AINEs ao mesmo tempo (ex: ibuprofeno + diclofenaco) achando que potencializa o efeito — na verdade duplica o risco de úlcera, sangramento gástrico e lesão renal sem nenhum benefício adicional.',
      quando: 'Procure médico se: dor de estômago intensa ou persistente, fezes escuras ou pretas (sangramento gástrico), inchaço nos pés e tornozelos, pressão alta que piora, urina diminuída ou febre que não cede em 3 dias de uso.'
    };
  }

  // ANTI-INFLAMATÓRIO GENÉRICO / COMBINADOS
  if (t.includes('anti-inflamatório') || t.includes('anti-inflamatorio')) {
    return {
      alerta: 'Erro comum no balcão: paciente combina anti-inflamatório com AAS ou outro analgésico sem perceber — muitos antigripais e analgésicos compostos já contêm anti-inflamatório, levando à sobredose inadvertida.',
      quando: 'Procure médico se: dor de estômago intensa, fezes escuras, inchaço nos pés, pressão alta ou sintomas que não melhoram em 3–5 dias de uso.'
    };
  }

  // ANTIDIABÉTICOS — INSULINAS
  if (t.includes('insulina')) {
    return {
      alerta: 'Erro comum no balcão: trocar a caneta/refil de insulina por outra marca "similar" sem orientação — perfis de ação, concentração e dispositivos são diferentes entre fabricantes. A troca não orientada pode causar hipo ou hiperglicemia grave.',
      quando: 'Procure atendimento imediato se: tremor, suor frio, palidez e confusão (hipoglicemia grave — dar açúcar imediatamente e acionar socorro); glicemia acima de 300 mg/dL, vômitos repetidos ou respiração com cheiro de fruta (cetoacidose).'
    };
  }

  // ANTIDIABÉTICOS — SULFONILUREIAS
  if (t.includes('sulfonilureia')) {
    return {
      alerta: 'Erro comum no balcão: paciente toma sulfonilureia sem alimento — o medicamento estimula a secreção de insulina independentemente da glicemia; em jejum, pode causar hipoglicemia grave, especialmente em idosos.',
      quando: 'Procure atendimento se: tremor, suor frio, palpitações, confusão mental ou desmaio (hipoglicemia) — dar 15g de açúcar imediatamente. Se inconsciente, acionar o SAMU (192).'
    };
  }

  // ANTIDIABÉTICOS — GLP-1
  if (t.includes('glp-1') || t.includes('glp1')) {
    return {
      alerta: 'Erro comum no balcão: paciente armazena agonista GLP-1 em temperatura ambiente — devem ser refrigerados (2°C–8°C) antes do uso. Após aberto, o prazo e temperatura variam por produto; conferir sempre a bula específica.',
      quando: 'Procure médico se: náuseas e vômitos intensos que impeçam alimentação, dor abdominal forte e persistente irradiando para as costas (sinal de pancreatite), batimentos acelerados ou nódulo/massa no pescoço.'
    };
  }

  // ANTIDIABÉTICOS — SGLT2
  if (t.includes('sglt-2') || t.includes('sglt2')) {
    return {
      alerta: 'Erro comum no balcão: não alertar sobre higiene íntima — inibidores SGLT-2 aumentam a glicose na urina, favorecendo infecções genitais fúngicas. Paciente deve ser orientado sobre higiene adequada e retornar se surgir coceira ou corrimento.',
      quando: 'Procure médico se: dor ou ardência genital, corrimento, odor intenso (candidíase genital), dor abdominal com vômitos (cetoacidose — pode ocorrer mesmo com glicemia normal), ou frequência urinária muito aumentada com febre.'
    };
  }

  // ANTIDIABÉTICOS GERAIS
  if (t.includes('antidiabético') || t.includes('antidiabetico') || t.includes('biguanida') || t.includes('glitazona') || t.includes('dpp-4') || t.includes('glinida')) {
    return {
      alerta: 'Erro comum no balcão: substituir um antidiabético por outro "equivalente" sem orientação médica — cada classe tem mecanismo, posologia e riscos diferentes. A troca pode causar hipo ou hiperglicemia grave.',
      quando: 'Procure médico se: glicemia acima de 300 mg/dL, sintomas de hipoglicemia (tremor, suor, confusão), vômitos que impeçam tomar o medicamento, febre alta em diabético (agrava o controle glicêmico) ou piora progressiva dos valores.'
    };
  }

  // ANTIDEPRESSIVOS — TRICÍCLICOS
  if (t.includes('tricíclico') || t.includes('triciclico')) {
    return {
      alerta: 'Erro comum no balcão: paciente compra álcool ou sonífero junto com antidepressivo tricíclico sem saber que a combinação potencializa a sedação e o risco de arritmia — a depressão do SNC pode ser grave. Sempre alertar sobre a interação.',
      quando: 'Procure médico imediatamente se: batimentos cardíacos irregulares ou muito acelerados, confusão mental intensa, boca muito seca com retenção urinária (crise anticolinérgica), pensamentos de se machucar ou convulsões.'
    };
  }

  // ANTIDEPRESSIVOS — ISRS / IRSN
  if (t.includes('isrs') || t.includes('irsn') || t.includes('serotonina') || t.includes('antidepressivo')) {
    return {
      alerta: 'Erro comum no balcão: paciente para o antidepressivo abruptamente quando se sente bem — pode causar síndrome de descontinuação (tontura, "choques elétricos", irritabilidade, insônia). A retirada deve ser sempre gradual sob supervisão médica.',
      quando: 'Procure médico se: agitação intensa, tremor e confusão nas primeiras semanas (síndrome serotoninérgica), pensamentos de se machucar, febre alta com rigidez muscular, piora do humor após melhora inicial ou sangramento incomum.'
    };
  }

  // BENZODIAZEPÍNICOS
  if (t.includes('benzodiazepínico') || t.includes('benzodiazepínico') || t.includes('benzodiazep')) {
    return {
      alerta: 'Erro comum no balcão: paciente relata que "o medicamento não está mais fazendo efeito" e pede dose maior — é tolerância farmacológica, e aumentar a dose por conta própria acelera a dependência física. O médico deve ser consultado para reavaliação.',
      quando: 'Procure médico se: precisar de doses crescentes para o mesmo efeito, sentir ansiedade ou tremor entre doses (efeito rebote), dificuldade para reduzir a dose, convulsões ao tentar parar ou insônia intensa após interrupção.'
    };
  }

  // ANTICOAGULANTES
  if (t.includes('anticoagulante')) {
    return {
      alerta: 'Erro comum no balcão: paciente compra ibuprofeno, naproxeno ou AAS sem informar que usa anticoagulante — qualquer AINE potencializa o efeito e multiplica o risco de sangramento interno grave. Sempre perguntar sobre anticoagulantes antes de dispensar analgésicos.',
      quando: 'Procure atendimento imediato se: sangramento que não para, urina vermelha ou rosa, fezes escuras ou negras, sangramento espontâneo na gengiva, hematomas grandes sem trauma ou cefaleia súbita intensa.'
    };
  }

  // CORTICOIDES INALATÓRIOS / NASAIS
  if ((t.includes('corticoide') || t.includes('corticoesteroide') || t.includes('esteroide')) && (t.includes('inalatório') || t.includes('inalatorio') || t.includes('nasal'))) {
    return {
      alerta: 'Erro comum no balcão: paciente não higieniza a boca após usar corticoide inalatório — o resíduo do medicamento na orofaringe favorece candidíase oral (sapinho). Sempre bochechar e cuspir água após cada uso.',
      quando: 'Procure médico se: surgir mancha branca na boca ou língua (candidíase), sangramento nasal frequente ou rouquidão persistente; e na asma, se as crises aumentarem mesmo usando o corticoide de manutenção.'
    };
  }

  // CORTICOIDES TÓPICOS
  if ((t.includes('corticoide') || t.includes('corticoesteroide')) && t.includes('tópico')) {
    return {
      alerta: 'Erro comum no balcão: paciente usa corticoide tópico de alta potência no rosto por semanas — causa atrofia cutânea, telangectasias e rosacea esteroidal. Corticoides de alta potência são contraindicados no rosto e nas dobras.',
      quando: 'Procure médico se: pele ficou mais fina, com estrias ou vasinhos aparentes no local de uso; surgir infecção secundária (vermelhidão com pus) ou a lesão original piorar em vez de melhorar.'
    };
  }

  // CORTICOIDES SISTÊMICOS
  if (t.includes('corticoide') || t.includes('corticoesteroide') || t.includes('esteroide')) {
    return {
      alerta: 'Erro comum no balcão: paciente para corticoide oral abruptamente após uso prolongado (mais de 2 semanas) — causa insuficiência adrenal aguda com fraqueza extrema, pressão baixa e crise potencialmente fatal. A retirada deve ser sempre gradual.',
      quando: 'Procure médico se: febre ou qualquer sinal de infecção (corticoides mascaram sintomas), glicemia muito elevada, inchaço no rosto e tronco com aparecimento de estrias violáceas, pressão muito baixa ou fraqueza intensa.'
    };
  }

  // ESTATINAS
  if (t.includes('estatina') || t.includes('redutor de colesterol')) {
    return {
      alerta: 'Erro comum no balcão: paciente para a estatina quando o colesterol normaliza, achando que "curou" — o resultado é efeito do medicamento, não cura. Interromper fará o colesterol voltar aos níveis anteriores em semanas.',
      quando: 'Procure médico se: dor muscular intensa ou generalizada (especialmente com urina escura — pode indicar rabdomiólise, condição grave), pele ou olhos amarelados, fadiga intensa ou cãibras musculares persistentes.'
    };
  }

  // ANTI-HIPERTENSIVOS — IECA
  if (t.includes('ieca') || t.includes('inibidor da eca') || t.includes('inibidor da enzima conversora')) {
    return {
      alerta: 'Erro comum no balcão: paciente para o IECA quando a pressão normaliza, achando que foi curado — a hipertensão é crônica e o medicamento precisa ser mantido indefinidamente. A pressão voltará a subir em dias sem o medicamento.',
      quando: 'Procure médico imediatamente se: inchaço repentino nos lábios, língua ou garganta (angioedema — emergência médica), pressão acima de 180/110 mmHg, cefaleia intensa súbita, falta de ar ou dor no peito.'
    };
  }

  // ANTI-HIPERTENSIVOS — BRA / ARA2
  if (t.includes('ara2') || t.includes('bra') || t.includes('bloqueador do receptor de angiotensina') || t.includes('antagonista do receptor de angiotensina')) {
    return {
      alerta: 'Erro comum no balcão: paciente toma AINEs regularmente (ibuprofeno para dor crônica) sem saber que antagonizam o efeito do BRA e elevam a pressão — a combinação também aumenta o risco de lesão renal.',
      quando: 'Procure médico se: pressão acima de 180/110 mmHg, cefaleia intensa e súbita, visão turva, falta de ar, dor no peito, inchaço rápido nos pés e tornozelos ou diminuição do volume de urina.'
    };
  }

  // ANTI-HIPERTENSIVOS — BETABLOQUEADORES
  if (t.includes('betabloqueador') || t.includes('beta-bloqueador') || t.includes('betabloqueador')) {
    return {
      alerta: 'Erro comum no balcão: paciente com asma ou DPOC recebe betabloqueador não seletivo — pode desencadear broncoespasmo grave. Sempre perguntar sobre histórico respiratório antes de dispensar.',
      quando: 'Procure médico se: frequência cardíaca abaixo de 50 bpm, tontura intensa ao levantar, falta de ar ou piora de chiado no peito, frieza intensa nas extremidades ou cansaço desproporcional ao esforço.'
    };
  }

  // ANTI-HIPERTENSIVOS — BLOQUEADORES DE CÁLCIO
  if (t.includes('bloqueador de canal de cálcio') || t.includes('bloqueador de cálcio') || t.includes('bloqueador de canais de cálcio') || t.includes('bcc')) {
    return {
      alerta: 'Erro comum no balcão: paciente consome suco de toranja (grapefruit) junto com bloqueador de cálcio — o suco inibe a metabolização e pode elevar os níveis do medicamento ao dobro, causando hipotensão e taquicardia.',
      quando: 'Procure médico se: inchaço nos tornozelos e pernas (edema periférico frequente com BCCs), tontura intensa ao levantar, palpitações, rubor facial intenso ou pressão muito baixa.'
    };
  }

  // ANTI-HIPERTENSIVOS — DIURÉTICOS
  // (tratado abaixo na seção de diuréticos)

  // ANTI-HIPERTENSIVOS GENÉRICO
  if (t.includes('anti-hipertensivo') || t.includes('anti-hipertensivo')) {
    return {
      alerta: 'Erro comum no balcão: paciente para o medicamento quando a pressão normaliza — a hipertensão é crônica e a pressão voltará a subir sem o tratamento. Hipertensão controlada não é hipertensão curada.',
      quando: 'Procure médico se: pressão acima de 180/110 mmHg, cefaleia intensa e súbita, visão turva, falta de ar, dor no peito ou inchaço rápido nos pés — podem indicar crise hipertensiva ou emergência cardiovascular.'
    };
  }

  // ANTICONVULSIVANTES / ANTIEPILÉPTICOS
  if (t.includes('anticonvulsivante') || t.includes('antiepiléptico') || t.includes('antiepileptico')) {
    return {
      alerta: 'Erro comum no balcão: trocar a marca do anticonvulsivante por conta da genérica — pequenas diferenças na biodisponibilidade entre fabricantes podem alterar os níveis séricos e descontrolar as crises. Sempre informar o médico antes de qualquer troca de marca.',
      quando: 'Procure atendimento imediato se: crise epiléptica durar mais de 5 minutos, ocorrerem múltiplas crises sem recuperação entre elas (status epilepticus), crise com características diferentes das habituais ou surgir febre alta com rigidez muscular.'
    };
  }

  // ANTIPSICÓTICOS
  if (t.includes('antipsicótico') || t.includes('antipsicotico')) {
    return {
      alerta: 'Erro comum no balcão: paciente para o antipsicótico abruptamente quando se sente bem — a melhora é efeito do medicamento, não cura. Interrupção abrupta pode causar recaída da psicose em dias e síndrome de retirada com náuseas e insônia intensa.',
      quando: 'Procure médico imediatamente se: febre alta com rigidez muscular e confusão (síndrome maligna dos neurolépticos — emergência), movimentos involuntários no rosto ou língua (discinesia tardia), dificuldade para engolir, agitação intensa ou pensamentos de se machucar.'
    };
  }

  // ANTIPARKINSONIANO
  if (t.includes('antiparkinsoniano') || t.includes('agonista dopaminérgico') || t.includes('agonista dopaminergico') || t.includes('levodopa')) {
    return {
      alerta: 'Erro comum no balcão: não alertar sobre o risco de hipotensão ortostática nas primeiras semanas — paciente com Parkinson já tem risco de quedas aumentado e a tontura ao levantar pode causar fraturas graves. Orientar a levantar devagar.',
      quando: 'Procure médico se: tontura intensa ao levantar com quedas, alucinações visuais (ver coisas que não existem), impulsos compulsivos como jogo ou compras excessivas (efeito de agonistas dopaminérgicos), ou piora súbita do tremor e rigidez.'
    };
  }

  // OPIÓIDES
  if (t.includes('opioide') || t.includes('opióide') || t.includes('opioide forte') || t.includes('morfina') || t.includes('fentanil') || t.includes('tramadol')) {
    return {
      alerta: 'Erro comum no balcão: paciente ou familiar combina opioide com álcool, benzodiazepínico ou antihistamínico — qualquer depressor do SNC amplifica o risco de depressão respiratória, que pode ser fatal. Sempre perguntar sobre todos os medicamentos e hábitos em uso.',
      quando: 'Procure atendimento imediato se: respiração muito lenta (menos de 12 movimentos por minuto), dificuldade para acordar, lábios ou pontas dos dedos azulados, confusão mental intensa, convulsões ou pupilas muito pequenas.'
    };
  }

  // BRONCODILATADORES — RESGATE (SABA)
  if (t.includes('saba') || (t.includes('broncodilatador') && t.includes('ação rápida')) || (t.includes('broncodilatador') && t.includes('curta'))) {
    return {
      alerta: 'Erro comum no balcão: paciente usa o broncodilatador de resgate (ex: salbutamol) no lugar do corticoide inalatório de manutenção — o resgate alivia a crise imediatamente mas não trata a inflamação. Usar o resgate mais de 2 vezes por semana indica asma fora de controle.',
      quando: 'Procure atendimento se: crise de falta de ar não ceder após 2 doses do broncodilatador de resgate, falta de ar em repouso, unhas ou lábios azulados, ou uso do resgate aumentando progressivamente.'
    };
  }

  // BRONCODILATADORES — MANUTENÇÃO (LABA, LAMA)
  if (t.includes('laba') || t.includes('lama') || (t.includes('broncodilatador') && (t.includes('longa') || t.includes('prolongada')))) {
    return {
      alerta: 'Erro comum no balcão: paciente usa broncodilatador de longa ação (LABA/LAMA) para crises agudas — esses medicamentos são de manutenção preventiva, não de resgate. Em crise, usar o broncodilatador de ação rápida prescrito.',
      quando: 'Procure médico se: falta de ar piorar progressivamente mesmo com uso regular, surgir febre e secreção amarelada (exacerbação infecciosa), ou o medicamento parecer perder efeito ao longo do tempo.'
    };
  }

  // BRONCODILATADORES GENÉRICO
  if (t.includes('broncodilatador') || t.includes('antiasmático') || t.includes('antiastmático') || t.includes('antagonista dos leucotrienos')) {
    return {
      alerta: 'Erro comum no balcão: paciente para o broncodilatador de manutenção quando os sintomas melhoram — o medicamento de fundo deve ser usado diariamente para prevenir as crises, independentemente de como o paciente se sente no dia.',
      quando: 'Procure atendimento se: piora progressiva da falta de ar, crise que não cede com o resgate, febre associada, ou se o intervalo entre crises estiver diminuindo.'
    };
  }

  // DIURÉTICOS
  if (t.includes('diurético') || t.includes('diuretico')) {
    return {
      alerta: 'Erro comum no balcão: paciente para o diurético sozinho por sentir tontura ou cãibra — esses sintomas podem indicar desequilíbrio eletrolítico (baixo potássio ou sódio) que precisa de ajuste da dose, não de interrupção abrupta.',
      quando: 'Procure médico se: cãibras musculares intensas, fraqueza muscular, palpitações ou batimentos irregulares (sinal de baixo potássio), tontura intensa ao levantar, inchaço que piora ou diminuição brusca do volume de urina.'
    };
  }

  // HORMÔNIO TIREOIDIANO
  if (t.includes('hormônio tireoidiano') || t.includes('hormonio tireoidiano')) {
    return {
      alerta: 'Erro comum no balcão: paciente toma levotiroxina junto com cálcio, ferro, antiácido ou leite — esses produtos bloqueiam até 40% da absorção. A levotiroxina deve ser tomada em jejum, 30–60 min antes de qualquer outro medicamento ou alimento.',
      quando: 'Procure médico se: palpitações, tremor fino, agitação ou perda de peso sem causa (dose alta demais); fadiga extrema, ganho de peso, inchaço e intolerância ao frio (dose insuficiente) ou sintomas que não melhoram após 6–8 semanas de tratamento.'
    };
  }

  // IBP / PROTETOR GÁSTRICO
  if (t.includes('inibidor de bomba de prótons') || t.includes('ibp') || t.includes('protetor gástrico') || t.includes('antagonista h2')) {
    return {
      alerta: 'Erro comum no balcão: dispensar IBP para qualquer "azia" sem identificar o tempo de uso — uso crônico sem reavaliação médica reduz absorção de vitamina B12, magnésio e ferro, e aumenta o risco de fraturas e infecções intestinais (C. difficile).',
      quando: 'Procure médico se: sintomas não melhoram em 2 semanas de uso, surgir dificuldade para engolir, perda de peso sem causa, fezes escuras ou vômito com sangue — podem indicar causa mais grave que simples gastrite.'
    };
  }

  // ANTIÁCIDOS
  if (t.includes('antiácido') || t.includes('antiacido')) {
    return {
      alerta: 'Erro comum no balcão: paciente usa antiácido de forma crônica sem investigar a causa da azia — antiácidos comuns não tratam úlceras ou gastrite por H. pylori; mascaram o sintoma e atrasam o diagnóstico correto.',
      quando: 'Procure médico se: azia frequente (mais de 2 vezes por semana), dor que irradia para o peito ou costas, dificuldade para engolir, perda de peso sem motivo ou fezes escuras — a azia crônica pode ter causas que precisam de investigação.'
    };
  }

  // ANTIFÚNGICOS ORAIS
  if (t.includes('antifúngico') || t.includes('antifungico') || t.includes('antimicótico')) {
    if (t.includes('oral') || t.includes('sistêmico')) {
      return {
        alerta: 'Erro comum no balcão: paciente trata candidíase recorrente com antifúngico oral repetidas vezes sem investigar a causa — infecções fúngicas recorrentes podem indicar diabetes descontrolado, imunossupressão ou resistência ao antifúngico usado.',
        quando: 'Procure médico se: sintomas não melhorarem após o tratamento completo, infecção retornar dentro de 2 meses, surgir febre, dificuldade para engolir ou lesões em outros locais do corpo.'
      };
    }
    return {
      alerta: 'Erro comum no balcão: paciente para o antifúngico tópico assim que os sintomas desaparecem — o fungo pode persistir na pele por dias após a resolução dos sintomas. Usar pelo tempo completo prescrito para evitar recidiva.',
      quando: 'Procure médico se: lesão não melhorar em 2–4 semanas de uso correto, surgir vermelhidão intensa ou bolhas ao redor, infecção se espalhar para outras áreas ou surgir febre.'
    };
  }

  // ANTIPARASITÁRIOS
  if (t.includes('antiparasitário') || t.includes('antiparasitario')) {
    return {
      alerta: 'Erro comum no balcão: tratar apenas um membro da família quando há parasitose intestinal — outros conviventes podem estar infectados e causar reinfecção de quem foi tratado. O médico deve avaliar o tratamento de todos os contatos domiciliares.',
      quando: 'Procure médico se: sintomas persistirem após o tratamento completo, surgir febre alta, icterícia (pele ou olhos amarelados), distensão abdominal intensa, sangue nas fezes ou sintomas em outros membros da família.'
    };
  }

  // ANTIEMÉTICO / PROCINÉTICO
  if (t.includes('antiemético') || t.includes('antieméticos') || t.includes('procinético')) {
    return {
      alerta: 'Erro comum no balcão: dispensar metoclopramida para crianças pequenas sem alertar sobre o risco de reações extrapiramidais (movimentos involuntários do pescoço e rosto) — são mais comuns em crianças e idosos. Uso restrito e monitorado nessas faixas etárias.',
      quando: 'Procure médico se: vômitos persistirem após 24–48h de tratamento, surgirem movimentos involuntários no rosto ou pescoço (reação extrapiramidal), sinais de desidratação (boca seca, sem urina, olhos fundos) ou vômito com sangue.'
    };
  }

  // ANTI-HISTAMÍNICOS — 1ª GERAÇÃO (SEDATIVOS)
  if ((t.includes('anti-histamínico') || t.includes('anti-histaminico')) && t.includes('1ª geração')) {
    return {
      alerta: 'Erro comum no balcão: paciente toma anti-histamínico de 1ª geração (difenidramina, clorfeniramina) e dirige em seguida — sedação e reflexos lentos causam acidentes. O efeito sedativo ocorre mesmo sem sonolência percebida pelo paciente.',
      quando: 'Procure médico se: sonolência excessiva que interfere nas atividades diárias, confusão mental (especialmente em idosos), dificuldade para urinar, visão turva ou boca muito seca com retenção urinária.'
    };
  }

  // ANTI-HISTAMÍNICOS — 2ª GERAÇÃO / GENÉRICO
  if (t.includes('anti-histamínico') || t.includes('anti-histaminico')) {
    return {
      alerta: 'Erro comum no balcão: paciente usa anti-histamínico diariamente por meses sem reavaliação — alergias crônicas que precisam de uso contínuo devem ser investigadas (imunoterapia) e não apenas suprimidas com anti-histamínico indefinidamente.',
      quando: 'Procure médico se: sintomas alérgicos graves (inchaço no rosto, lábios ou garganta — angioedema), falta de ar junto com urticária, febre persistente ou sintomas que não melhoram após 3–5 dias de uso.'
    };
  }

  // ANTICONCEPCIONAL HORMONAL
  if (t.includes('anticoncepcional')) {
    return {
      alerta: 'Erro comum no balcão: paciente inicia antibiótico ou anticonvulsivante sem saber que pode reduzir a eficácia do anticoncepcional — alguns medicamentos aceleram o metabolismo dos hormônios. Sempre alertar para usar método adicional de barreira durante e após o tratamento.',
      quando: 'Procure médico se: dor intensa na panturrilha com inchaço (trombose venosa), dor de cabeça muito forte e repentina, visão turva ou perda súbita de visão, dor no peito ou falta de ar — possíveis sinais de tromboembolismo.'
    };
  }

  // BISFOSFONATOS
  if (t.includes('bisfosfonato')) {
    return {
      alerta: 'Erro comum no balcão: paciente toma bisfosfonato e se deita imediatamente após — pode causar esofagite grave e úlceras esofágicas. Deve ser tomado em jejum com copo cheio de água, e o paciente deve permanecer em pé ou sentado por pelo menos 30 minutos.',
      quando: 'Procure médico se: dor ou dificuldade para engolir, dor no peito ao engolir, dor mandibular persistente (osteonecrose do maxilar — rara mas grave), dor óssea intensa ou fraturas por mínimo trauma.'
    };
  }

  // ANTIGOTOSOS
  if (t.includes('antigotoso') || t.includes('xantina oxidase') || t.includes('gota')) {
    return {
      alerta: 'Erro comum no balcão: paciente para alopurinol durante uma crise de gota achando que está piorando — iniciar ou interromper alopurinol durante a crise pode prolongar e intensificar a inflamação. Manter o uso e tratar a crise com anti-inflamatório separado.',
      quando: 'Procure médico se: surgir erupção cutânea (rash) com alopurinol — pode indicar reação grave (síndrome de Stevens-Johnson em pessoas com gene HLA-B*5801, mais comum em asiáticos), febre ou icterícia durante o uso.'
    };
  }

  // RELAXANTE MUSCULAR
  if (t.includes('relaxante muscular')) {
    return {
      alerta: 'Erro comum no balcão: paciente não é alertado sobre a sedação significativa — relaxantes musculares de ação central (ciclobenzaprina, carisoprodol) causam sonolência intensa e não devem ser combinados com álcool ou outros sedativos.',
      quando: 'Procure médico se: sonolência que impede atividades normais ou dirigir, dificuldade para urinar (retenção urinária), batimentos cardíacos irregulares, confusão mental ou dor muscular que piora em vez de melhorar após 5–7 dias.'
    };
  }

  // ANTIRRETROVIRAIS
  if (t.includes('antirretroviral') || t.includes('hiv')) {
    return {
      alerta: 'Erro comum no balcão: paciente solicita ômega-3, suplemento ou fitoterápico sem informar ao médico — muitas interações entre antirretrovirais e outros produtos são graves. A adesão rigorosa e sem adições não orientadas é fundamental para evitar resistência.',
      quando: 'Procure médico se: vômitos intensos que impeçam tomar o medicamento no horário, febre acima de 38°C, icterícia, rash cutâneo extenso, confusão mental ou qualquer nova infecção — o sistema imunológico pode estar comprometido.'
    };
  }

  // IMUNOSSUPRESSORES
  if (t.includes('imunossupressor') || t.includes('imunobiológico') || t.includes('anti-tnf') || t.includes('dmard') || t.includes('jak')) {
    return {
      alerta: 'Erro comum no balcão: paciente toma vacina de vírus vivo (febre amarela, varicela, BCG) durante o uso de imunossupressor — vacinas de vírus vivos são contraindicadas e podem causar a doença que deveriam prevenir. Verificar sempre o calendário vacinal antes do início.',
      quando: 'Procure médico imediatamente se: febre (qualquer temperatura durante imunossupressão é sinal de alerta), ferida que não cicatriza, tosse persistente com febre, ou qualquer sinal de infecção — a resposta imune está reduzida.'
    };
  }

  // LAXANTES
  if (t.includes('laxante')) {
    return {
      alerta: 'Erro comum no balcão: paciente usa laxante estimulante (bisacodil, sene) diariamente por meses — causa dependência intestinal e pode agravar a constipação a longo prazo. Laxantes osmóticos são mais seguros para uso prolongado, mas qualquer constipação crônica deve ser investigada.',
      quando: 'Procure médico se: constipação acompanhada de dor abdominal intensa, sangue nas fezes, perda de peso sem causa, constipação alternada com diarreia (síndrome do intestino irritável) ou nenhuma melhora após 7 dias de uso.'
    };
  }

  // TRIPTANOS — ENXAQUECA
  if (t.includes('triptano') || t.includes('antimigrânoso') || t.includes('antimigranoso')) {
    return {
      alerta: 'Erro comum no balcão: paciente usa triptano mais de 10 dias por mês para enxaqueca — o uso excessivo causa "cefaleia por abuso de medicamento" (cefaleia crônica diária induzida), tornando a dor de cabeça ainda mais frequente e difícil de tratar.',
      quando: 'Procure médico se: cefaleia muito intensa e súbita diferente das habituais ("a pior da vida" — pode ser hemorragia subaracnoide), dor de cabeça com febre e rigidez de nuca, ou frequência de crises aumentando progressivamente.'
    };
  }

  // VASODILATADORES — PDE5 (SILDENAFILA, ETC.)
  if (t.includes('pde-5') || t.includes('pde5') || t.includes('disfunção erétil') || t.includes('disfuncao eretil')) {
    return {
      alerta: 'Erro comum no balcão: paciente usa nitrato (isossorbida, nitroglicerina) para angina e compra sildenafila sem informar o médico — a combinação causa hipotensão grave e pode ser fatal. Nitrato e inibidores da PDE-5 são absolutamente contraindicados juntos.',
      quando: 'Procure atendimento imediato se: dor no peito, tontura intensa ou desmaio após tomar o medicamento (especialmente se usar nitratos), ereção dolorosa que não cede após 4 horas (priapismo — emergência urológica) ou perda súbita de visão.'
    };
  }

  // ANTIRREABSORÇÃO ÓSSEA / SERM / OSTEOPOROSE
  if (t.includes('osteoporose') || t.includes('antiosteoporótico') || t.includes('serm') || t.includes('antirreabsorção')) {
    return {
      alerta: 'Erro comum no balcão: dispensar suplemento de cálcio e vitamina D sem orientar o horário correto — devem ser tomados separados dos bisfosfonatos (pelo menos 2h de intervalo) para não bloquear a absorção do medicamento principal.',
      quando: 'Procure médico se: dor óssea intensa (especialmente no quadril ou coxa em usuários de bisfosfonatos), fratura por trauma mínimo, dor ou inchaço mandibular (osteonecrose), visão turva ou fogachos intensos.'
    };
  }

  // ANTICOLINÉRGICOS / BEXIGA HIPERATIVA
  if (t.includes('anticolinérgico') || t.includes('anticolinergico') || t.includes('antimuscarínico') || t.includes('bexiga hiperativa')) {
    return {
      alerta: 'Erro comum no balcão: dispensar anticolinérgico para idoso com glaucoma de ângulo fechado ou hiperplasia prostática — pode precipitar retenção urinária aguda e aumento da pressão ocular. Sempre perguntar sobre essas condições antes de dispensar.',
      quando: 'Procure médico se: dificuldade ou impossibilidade de urinar (retenção urinária aguda), dor no olho com visão turva e náusea (glaucoma agudo), confusão mental intensa em idosos (síndrome anticolinérgica) ou constipação intensa com distensão abdominal.'
    };
  }

  // ESTIMULANTE SNC / TDAH
  if (t.includes('estimulante do snc') || t.includes('tdah') || t.includes('psicoestimulante')) {
    return {
      alerta: 'Erro comum no balcão: dispensar metilfenidato sem a notificação de receita especial B2 ou sem verificar se a data e o CRM estão preenchidos corretamente — a dispensação irregular é infração sanitária e os medicamentos de controle têm rastreabilidade obrigatória.',
      quando: 'Procure médico se: batimentos cardíacos muito acelerados ou irregulares, pressão arterial elevada, dor no peito, perda de peso intensa, insônia grave ou comportamento agressivo/agitação intensa.'
    };
  }

  // FITOTERÁPICO
  if (t.includes('fitoterápico') || t.includes('fitoterapico') || t.includes('homeopático') || t.includes('homeopatico')) {
    return {
      alerta: 'Erro comum no balcão: paciente acredita que "natural não faz mal" e combina fitoterápico com medicamentos prescritos sem informar o médico — erva-de-são-joão, ginkgo, alho, ginseng e outros têm interações documentadas com anticoagulantes, antidepressivos e imunossupressores.',
      quando: 'Procure médico se: surgir sangramento incomum (interação com anticoagulantes), agitação ou insônia intensa (interação com antidepressivos), reação alérgica, ou se os sintomas que motivaram o uso não melhorarem em 4–6 semanas.'
    };
  }

  // SUPLEMENTO
  if (t.includes('suplemento') || t.includes('vitamina') || t.includes('mineral')) {
    return {
      alerta: 'Erro comum no balcão: paciente toma suplemento de ferro, cálcio ou magnésio no mesmo horário que outros medicamentos (antibióticos, levotiroxina, bisfosfonatos) — minerais reduzem a absorção de vários medicamentos. Tomar com pelo menos 2h de intervalo.',
      quando: 'Procure médico se: sintomas para os quais o suplemento foi indicado não melhorarem após 4–8 semanas de uso regular, surgirem dores abdominais intensas, fezes muito escuras (excesso de ferro) ou sintomas de toxicidade (vitamina D em doses elevadas causa hipercalcemia).'
    };
  }

  // ESTABILIZADOR DE HUMOR
  if (t.includes('estabilizador de humor')) {
    return {
      alerta: 'Erro comum no balcão: paciente para o estabilizador de humor durante períodos de bem-estar — o tratamento é preventivo de recaídas e deve ser contínuo. Interromper aumenta muito o risco de novos episódios maníacos ou depressivos.',
      quando: 'Procure médico se: sintomas de mania (euforia, sem necessidade de sono, gastos impulsivos, fala acelerada), depressão intensa, tremor e confusão (toxicidade por lítio) ou sinais de infecção com supressão da imunidade.'
    };
  }

  // ANTIARRÍTMICO
  if (t.includes('antiarrítmico') || t.includes('antiarritmico')) {
    return {
      alerta: 'Erro comum no balcão: paciente para o antiarrítmico por conta própria ao sentir melhora — arritmias podem ser assintomáticas mas fatais. A interrupção sem desmame supervisionado pode desencadear arritmia de rebote.',
      quando: 'Procure atendimento imediato se: palpitações intensas, sensação de coração "falhando", desmaio ou pré-síncope, dificuldade para respirar em repouso ou dor no peito — sintomas de arritmia grave.'
    };
  }

  // CARDIOTÔNICO / INSUFICIÊNCIA CARDÍACA
  if (t.includes('cardiotônico') || t.includes('glicosídeo cardíaco') || t.includes('neprilisina')) {
    return {
      alerta: 'Erro comum no balcão: não alertar sobre o risco de interação com medicamentos que alteram o potássio (diuréticos) — nível baixo de potássio aumenta drasticamente a toxicidade de glicosídeos cardíacos. Monitorar eletrólitos regularmente.',
      quando: 'Procure médico imediatamente se: náusea, visão amarelada com halos (intoxicação digitálica), batimentos muito lentos ou irregulares, inchaço súbito nas pernas com falta de ar em repouso ou ganho de 2 kg em 3 dias (retenção hídrica).'
    };
  }

  // HIPNÓTICO / SONO
  if (t.includes('hipnótico') || t.includes('hipnotico') || t.includes('indutor do sono') || t.includes('regulador do sono')) {
    return {
      alerta: 'Erro comum no balcão: paciente toma o hipnótico e ainda permanece ativo por horas — os "Z-drugs" (zolpidem) podem causar comportamentos automáticos perigosos (comer, dirigir dormindo) sem memória posterior. Tomar imediatamente antes de deitar.',
      quando: 'Procure médico se: precisar de doses crescentes para dormir, insônia piorar ao tentar parar (efeito rebote), comportamentos estranhos à noite sem memória, sonolência diurna intensa ou sintomas de apneia do sono não investigada.'
    };
  }

  // DESCONGESTIONANTE NASAL
  if (t.includes('descongestionante nasal')) {
    return {
      alerta: 'Erro comum no balcão: paciente usa descongestionante nasal tópico (oximetazolina, nafazolina) por mais de 3–5 dias — causa rinite medicamentosa (congestionamento de rebote pior que o original). Uso restrito a 3 dias consecutivos.',
      quando: 'Procure médico se: congestão persistir após 7–10 dias, surgir secreção amarelada ou esverdeada com febre (sinusite bacteriana), dor forte na face sobre os seios da face ou necessidade de uso contínuo do descongestionante.'
    };
  }

  // ANTIMALÁRICO / HIDROXICLOROQUINA
  if (t.includes('antimalárico') || t.includes('antimalárico') || t.includes('antimalárico')) {
    return {
      alerta: 'Erro comum no balcão: paciente não é orientado sobre o acompanhamento oftalmológico obrigatório — hidroxicloroquina usada cronicamente pode causar retinopatia irreversível. Exame de fundo de olho anual é obrigatório após 5 anos de uso.',
      quando: 'Procure médico se: visão turva, dificuldade para enxergar cores, pontos cegos no campo visual, erupção cutânea extensa ou fraqueza muscular — alguns são sinais de toxicidade ocular ou muscular.'
    };
  }

  // ANSIOLÍTICO NÃO BENZODIAZEPÍNICO
  if (t.includes('ansiolítico não benzodiazepínico') || t.includes('ansiolítico não-benzodiazepínico')) {
    return {
      alerta: 'Erro comum no balcão: paciente espera efeito imediato como o do benzodiazepínico — a buspirona, por exemplo, leva 2–4 semanas para atingir efeito ansiolítico completo. Parar antes do tempo por falta de efeito imediato é o erro mais comum.',
      quando: 'Procure médico se: ansiedade piorar nas primeiras semanas, surgir tonturas intensas, sem melhora após 4–6 semanas de uso regular, ou aparecerem pensamentos de se machucar.'
    };
  }

  // ALFA-BLOQUEADOR (PRÓSTATA)
  if (t.includes('alfabloqueador') || t.includes('uropatia') || t.includes('alfa-bloqueador')) {
    return {
      alerta: 'Erro comum no balcão: não alertar sobre hipotensão da primeira dose — alfuzosina, tansulosina e similares podem causar queda de pressão intensa na primeira tomada. Tomar à noite, após a refeição, e não levantar rapidamente.',
      quando: 'Procure médico se: tontura ou desmaio ao levantar, dificuldade para urinar que piora (retenção urinária) ou sintomas urinários sem melhora após 4–6 semanas — pode ser necessária reavaliação urológica.'
    };
  }

  // INIBIDOR DA 5-ALFA-REDUTASE (FINASTERIDA)
  if (t.includes('5-alfa-redutase') || t.includes('finasterida') || t.includes('antialopecia')) {
    return {
      alerta: 'Erro comum no balcão: mulher em idade fértil manuseia comprimidos de finasterida partidos — a absorção cutânea pode causar malformações nos genitais de feto masculino. Mulheres grávidas não devem tocar nos comprimidos partidos ou esmagados.',
      quando: 'Procure médico se: surgir queda de libido, disfunção erétil ou ejaculação anormal persistentes (efeitos que podem continuar após a parada — síndrome pós-finasterida), sensibilidade ou dor nos mamilos ou sintomas depressivos.'
    };
  }

  // RETINOIDE ORAL (ACITRETINA, ISOTRETINOÍNA)
  if ((t.includes('retinoide') || t.includes('retinoide')) && t.includes('oral')) {
    return {
      alerta: 'Erro comum no balcão: dispensar retinoide oral sem confirmar uso de contracepção dupla e negativa de gravidez — são teratogênicos graves (categoria X). A dispensação sem o programa PRIS e notificação especial é infração sanitária.',
      quando: 'Procure médico se: sintomas depressivos ou pensamentos de se machucar, dor intensa nos olhos (visão noturna prejudicada — pseudotumor cerebral), dor óssea intensa, icterícia ou dor abdominal forte (pancreatite).'
    };
  }

  // ANTINEOPLÁSICO / TAMOXIFENO
  if (t.includes('antineoplásico') || t.includes('antineoplasico') || t.includes('tamoxifeno') || t.includes('serm') || t.includes('indutor da ovulação')) {
    return {
      alerta: 'Erro comum no balcão: paciente toma fitoterápicos com estrogênio vegetal (soja, isoflavonas) junto com antiestrogênicos — podem antagonizar o efeito do tratamento oncológico. Qualquer suplemento deve ser aprovado pelo oncologista.',
      quando: 'Procure médico se: dor ou inchaço na panturrilha, falta de ar (risco de trombose), fogachos muito intensos, sangramento vaginal incomum (risco de câncer endometrial com tamoxifeno) ou visão turva.'
    };
  }

  // DEFAULT — fallback genérico
  return {
    alerta: 'Erro comum no balcão: paciente interrompe o medicamento por conta própria ao sentir melhora, sem comunicar o médico — muitos tratamentos precisam de duração definida para ser efetivos. Sempre orientar a não alterar a posologia sem orientação médica.',
    quando: 'Procure médico se: sintomas não melhorarem no tempo esperado, surgirem efeitos colaterais intensos, a condição piorar durante o tratamento, surgir febre ou reação alérgica (urticária, inchaço, dificuldade para respirar).'
  };
}

// ─── Processar todos os medicamentos ─────────────────────────────────────────
let adicionados = 0;
let jaExistiam = 0;

for (const med of data) {
  const nomeKey = med.generico
    ? med.generico.toLowerCase().replace(/[^a-z]/g, '')
    : med.nome.toLowerCase().replace(/[^a-z]/g, '');

  // Checar correspondência por nome específico
  let conteudo = null;
  for (const [chave, val] of Object.entries(porNome)) {
    if (nomeKey.includes(chave.replace(/[^a-z]/g, ''))) {
      conteudo = val;
      break;
    }
  }

  // Fallback para classe
  if (!conteudo) {
    conteudo = classificar(med.tipo || '', med.nome || '');
  }

  const jaTemAlerta = !!med.alerta_farmaceutico;
  const jaTemQuando = !!med.quando_procurar_medico;

  if (!jaTemAlerta) med.alerta_farmaceutico = conteudo.alerta;
  if (!jaTemQuando) med.quando_procurar_medico = conteudo.quando;

  if (!jaTemAlerta || !jaTemQuando) adicionados++;
  else jaExistiam++;
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');
console.log(`✅ Concluído — ${adicionados} medicamentos atualizados, ${jaExistiam} já tinham os campos`);
console.log(`Total: ${data.length} medicamentos`);
