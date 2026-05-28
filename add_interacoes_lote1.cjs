// add_interacoes_lote1.cjs
// MediCheck — Adição de interações medicamentosas em lote (Lote 1)
// Grupos: Antipsicóticos, Broncodilatadores, Antibióticos, Anticoagulantes,
//         Cardiovasculares, Antidiabéticos, Imunobiológicos

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "medicamentos.json");

// ─────────────────────────────────────────────
// INTERAÇÕES POR MEDICAMENTO
// ─────────────────────────────────────────────

const interacoesPorMedicamento = {

  // ══════════════════════════════════════════
  // GRUPO 1 — ANTIPSICÓTICOS
  // ══════════════════════════════════════════

  "Lurasidona": [
    {
      titulo: "Lurasidona + Cetoconazol ou Claritromicina",
      nivel: "contraindicado",
      descricao: "Esses medicamentos bloqueiam a enzima que elimina a lurasidona do corpo, fazendo os níveis no sangue subirem até 9 vezes. Isso aumenta muito o risco de efeitos graves, como arritmia cardíaca. A combinação é proibida."
    },
    {
      titulo: "Lurasidona + Rifampicina",
      nivel: "contraindicado",
      descricao: "A rifampicina acelera demais a eliminação da lurasidona, deixando-a praticamente sem efeito no organismo. O tratamento psiquiátrico fica comprometido. Não usar juntos."
    },
    {
      titulo: "Lurasidona + Medicamentos que prolongam o QT",
      nivel: "contraindicado",
      descricao: "Quando combinada com outros remédios que afetam o ritmo cardíaco (como amiodarona, sotalol ou certos antibióticos), o risco de arritmia grave — chamada torsades de pointes — aumenta muito. Combinação proibida."
    },
    {
      titulo: "Lurasidona + Lítio",
      nivel: "alto",
      descricao: "A combinação pode causar a síndrome neuroléptica maligna, uma reação grave com febre alta, rigidez muscular e confusão mental. Se for necessário usar os dois, o médico deve monitorar com muita atenção."
    },
    {
      titulo: "Lurasidona + Depressores do sistema nervoso central",
      nivel: "alto",
      descricao: "Com remédios que causam sonolência (como benzodiazepínicos, opioides ou outros antipsicóticos), o efeito sedativo some somado, podendo causar sedação excessiva e dificuldade respiratória."
    },
    {
      titulo: "Lurasidona + Álcool",
      nivel: "alto",
      descricao: "O álcool potencializa o efeito sedativo da lurasidona e pode causar sonolência intensa, tontura e risco de quedas. Evitar completamente durante o tratamento."
    },
    {
      titulo: "Lurasidona + Anti-hipertensivos",
      nivel: "moderado",
      descricao: "A lurasidona pode causar queda de pressão, especialmente ao levantar rápido. Associada a remédios para pressão alta, esse efeito pode ser mais intenso. Levante devagar e informe o médico se sentir tontura."
    }
  ],

  "Paliperidona": [
    {
      titulo: "Paliperidona + Outros antipsicóticos",
      nivel: "contraindicado",
      descricao: "A combinação de dois antipsicóticos que prolongam o intervalo QT do coração aumenta muito o risco de arritmia grave. Evitar a associação sem orientação médica especializada."
    },
    {
      titulo: "Paliperidona + Levodopa",
      nivel: "contraindicado",
      descricao: "A paliperidona bloqueia os receptores de dopamina no cérebro — exatamente o que a levodopa tenta estimular no tratamento do Parkinson. Os dois remédios se anulam. Combinação contraindicada."
    },
    {
      titulo: "Paliperidona + Carbamazepina",
      nivel: "alto",
      descricao: "A carbamazepina acelera a eliminação da paliperidona pelo organismo, reduzindo seus níveis no sangue em até 37%. O remédio pode perder eficácia. O médico pode precisar ajustar a dose."
    },
    {
      titulo: "Paliperidona + Lítio",
      nivel: "alto",
      descricao: "O uso conjunto aumenta o risco de toxicidade neurológica — com sintomas como tremores, confusão e rigidez. Exige monitoramento frequente dos níveis de lítio no sangue."
    },
    {
      titulo: "Paliperidona + Depressores do sistema nervoso central",
      nivel: "alto",
      descricao: "Associada a benzodiazepínicos, opioides ou outros sedativos, a paliperidona pode causar sedação excessiva e comprometimento da respiração. Use com muita cautela."
    },
    {
      titulo: "Paliperidona + Anti-hipertensivos",
      nivel: "moderado",
      descricao: "Pode haver queda adicional de pressão quando associada a remédios para hipertensão. Fique atento a tonturas, especialmente ao se levantar."
    },
    {
      titulo: "Paliperidona + Metoclopramida",
      nivel: "moderado",
      descricao: "Ambos bloqueiam receptores de dopamina e podem potencializar efeitos colaterais como rigidez muscular e movimentos involuntários (efeitos extrapiramidais). Monitorar com atenção."
    }
  ],

  "Ziprasidona": [
    {
      titulo: "Ziprasidona + Amiodarona, Sotalol ou Quinidina",
      nivel: "contraindicado",
      descricao: "Esses medicamentos para arritmia, quando combinados com a ziprasidona, somam o efeito de prolongar o intervalo QT do coração, causando risco real de arritmia fatal (torsades de pointes). Combinação proibida."
    },
    {
      titulo: "Ziprasidona + Eritromicina ou Cetoconazol",
      nivel: "contraindicado",
      descricao: "Esses medicamentos aumentam os níveis de ziprasidona no sangue e também prolongam o QT. A combinação eleva muito o risco de arritmia grave. Contraindicado."
    },
    {
      titulo: "Ziprasidona + Lítio",
      nivel: "alto",
      descricao: "A combinação aumenta o risco de toxicidade neurológica e pode interferir no ritmo cardíaco. Requer monitoramento rigoroso pelo médico."
    },
    {
      titulo: "Ziprasidona + Depressores do sistema nervoso central",
      nivel: "alto",
      descricao: "Com sedativos, opioides ou álcool, o efeito sedativo é somado, com risco de depressão respiratória. Evitar ou usar com extrema cautela."
    },
    {
      titulo: "Ziprasidona + Anti-hipertensivos",
      nivel: "moderado",
      descricao: "Pode ocorrer queda excessiva de pressão. Monitorar pressão arterial, especialmente no início do tratamento."
    },
    {
      titulo: "Ziprasidona + Antiácidos",
      nivel: "moderado",
      descricao: "Antiácidos contendo alumínio ou magnésio podem reduzir a absorção da ziprasidona. Tomar a ziprasidona com alimentos e separar o uso de antiácidos por pelo menos 2 horas."
    }
  ],

  "Trifluoperazina": [
    {
      titulo: "Trifluoperazina + Depressores do SNC em altas doses",
      nivel: "contraindicado",
      descricao: "Em doses elevadas, a associação com sedativos, opioides ou álcool pode causar depressão respiratória grave, perda de consciência e risco de vida. Combinação contraindicada nessa situação."
    },
    {
      titulo: "Trifluoperazina + Anticolinérgicos",
      nivel: "contraindicado",
      descricao: "Ambos bloqueiam a acetilcolina no organismo. A soma pode causar íleo paralítico — uma parada perigosa do funcionamento intestinal — além de retenção urinária e confusão mental grave."
    },
    {
      titulo: "Trifluoperazina + Lítio",
      nivel: "alto",
      descricao: "Risco aumentado de neurotoxicidade: tremores, confusão, rigidez muscular. O médico deve monitorar os níveis de lítio regularmente."
    },
    {
      titulo: "Trifluoperazina + Propranolol",
      nivel: "alto",
      descricao: "A trifluoperazina eleva os níveis de propranolol no sangue — e vice-versa. Isso pode causar queda excessiva de pressão e bradicardia (coração batendo devagar demais)."
    },
    {
      titulo: "Trifluoperazina + Antidepressivos tricíclicos",
      nivel: "moderado",
      descricao: "A combinação potencializa efeitos anticolinérgicos (boca seca, retenção urinária, constipação) e pode aumentar o risco de arritmia. Usar com cautela e monitoramento."
    },
    {
      titulo: "Trifluoperazina + Levodopa",
      nivel: "moderado",
      descricao: "A trifluoperazina bloqueia os receptores de dopamina, reduzindo a eficácia da levodopa no controle do Parkinson. Evitar quando possível."
    }
  ],

  "Flufenazina": [
    {
      titulo: "Flufenazina + Outros fenotiazínicos",
      nivel: "contraindicado",
      descricao: "Combinar dois remédios da mesma classe (fenotiazinas) duplica os riscos de arritmia, sedação excessiva e efeitos colaterais neurológicos graves. Contraindicado."
    },
    {
      titulo: "Flufenazina + Depressores graves do SNC",
      nivel: "contraindicado",
      descricao: "Com sedativos potentes ou opioides em doses elevadas, há risco de depressão respiratória grave e perda de consciência. Combinação proibida."
    },
    {
      titulo: "Flufenazina + Lítio",
      nivel: "alto",
      descricao: "Risco de neurotoxicidade: tremores, desorientação, rigidez muscular. Monitorar níveis de lítio com frequência."
    },
    {
      titulo: "Flufenazina + Anticolinérgicos",
      nivel: "alto",
      descricao: "A combinação potencializa os efeitos anticolinérgicos: retenção urinária, boca seca intensa, confusão mental (especialmente em idosos) e constipação grave."
    },
    {
      titulo: "Flufenazina + Anti-hipertensivos",
      nivel: "moderado",
      descricao: "Pode ocorrer queda adicional de pressão arterial. Monitorar pressão e orientar o paciente sobre tonturas ao se levantar."
    },
    {
      titulo: "Flufenazina + Antidepressivos tricíclicos",
      nivel: "moderado",
      descricao: "Somam efeitos anticolinérgicos e podem aumentar risco de arritmia. Usar com cautela e sob monitoramento médico."
    }
  ],

  "Pimozida": [
    {
      titulo: "Pimozida + Cetoconazol, Eritromicina ou Claritromicina",
      nivel: "contraindicado",
      descricao: "Esses remédios bloqueiam a enzima que elimina a pimozida do corpo, elevando muito seus níveis no sangue e causando risco fatal de arritmia grave (torsades de pointes). Combinação absolutamente proibida."
    },
    {
      titulo: "Pimozida + Fluoxetina ou Paroxetina",
      nivel: "contraindicado",
      descricao: "Esses antidepressivos bloqueiam a eliminação da pimozida, elevando seus níveis a ponto de causar arritmia perigosa. Contraindicado."
    },
    {
      titulo: "Pimozida + Azitromicina",
      nivel: "contraindicado",
      descricao: "A azitromicina por si só já prolonga o QT cardíaco. Combinada à pimozida, o risco de arritmia fatal é muito alto. Proibida a associação."
    },
    {
      titulo: "Pimozida + Outros medicamentos que prolongam o QT",
      nivel: "contraindicado",
      descricao: "A pimozida já tem alto potencial de causar alteração no ritmo cardíaco. Associar qualquer outro medicamento com esse mesmo efeito é extremamente perigoso."
    },
    {
      titulo: "Pimozida + Antiarrítmicos",
      nivel: "alto",
      descricao: "A combinação com medicamentos para arritmia eleva ainda mais o risco de alterações perigosas no ritmo cardíaco. Requer avaliação cardiológica cuidadosa."
    },
    {
      titulo: "Pimozida + Lítio",
      nivel: "alto",
      descricao: "Risco aumentado de toxicidade neurológica e interferência no ritmo cardíaco. Monitoramento frequente é indispensável."
    },
    {
      titulo: "Pimozida + Depressores do SNC",
      nivel: "moderado",
      descricao: "A sedação pode ser potencializada. Evitar dirigir ou operar máquinas. Informar o médico sobre todos os remédios em uso."
    }
  ],

  "Sulpirida": [
    {
      titulo: "Sulpirida + Levodopa",
      nivel: "contraindicado",
      descricao: "A sulpirida bloqueia os receptores de dopamina — exatamente os que a levodopa precisa ativar para tratar o Parkinson. Os dois remédios se anulam completamente. Combinação proibida."
    },
    {
      titulo: "Sulpirida + Antiácidos com alumínio ou magnésio",
      nivel: "contraindicado",
      descricao: "Antiácidos como hidróxido de alumínio ou magnésio reduzem a absorção da sulpirida em mais de 40%, comprometendo gravemente o tratamento. Se precisar usar antiácido, tome a sulpirida pelo menos 2 horas antes."
    },
    {
      titulo: "Sulpirida + Lítio",
      nivel: "alto",
      descricao: "A combinação aumenta o risco de neurotoxicidade: tremores, confusão mental e rigidez muscular. Monitorar os níveis de lítio regularmente."
    },
    {
      titulo: "Sulpirida + Outros antipsicóticos",
      nivel: "alto",
      descricao: "Somar dois antipsicóticos aumenta o risco de efeitos colaterais graves, como alterações no ritmo cardíaco e efeitos neurológicos. Evitar sem indicação médica clara."
    },
    {
      titulo: "Sulpirida + Anti-hipertensivos",
      nivel: "moderado",
      descricao: "Pode ocorrer queda adicional de pressão. Monitorar pressão arterial e ficar atento a tonturas."
    },
    {
      titulo: "Sulpirida + Álcool",
      nivel: "moderado",
      descricao: "O álcool potencializa o efeito sedativo e pode piorar a tontura e a lentidão mental. Evitar durante o tratamento."
    }
  ],

  "Levomepromazina": [
    {
      titulo: "Levomepromazina (Neozine) + Depressores graves do SNC",
      nivel: "contraindicado",
      descricao: "Com sedativos potentes, opioides ou barbitúricos em doses altas, o risco de depressão respiratória grave é muito alto. Combinação perigosa e contraindicada."
    },
    {
      titulo: "Levomepromazina (Neozine) + IMAOs",
      nivel: "contraindicado",
      descricao: "A combinação com inibidores da monoaminoxidase pode causar reações graves, incluindo crises de hipertensão, convulsões e síndrome serotoninérgica. Contraindicado."
    },
    {
      titulo: "Levomepromazina (Neozine) + Anticolinérgicos",
      nivel: "alto",
      descricao: "A soma dos efeitos anticolinérgicos pode causar retenção urinária, constipação grave, boca seca intensa e confusão mental — especialmente perigoso em idosos."
    },
    {
      titulo: "Levomepromazina (Neozine) + Lítio",
      nivel: "alto",
      descricao: "Risco de neurotoxicidade com tremores, rigidez e confusão. Monitorar com frequência os níveis de lítio no sangue."
    },
    {
      titulo: "Levomepromazina (Neozine) + Anti-hipertensivos",
      nivel: "alto",
      descricao: "A levomepromazina já causa queda significativa de pressão. Associada a anti-hipertensivos, pode causar hipotensão severa com risco de desmaio e quedas."
    },
    {
      titulo: "Levomepromazina (Neozine) + Antidepressivos tricíclicos",
      nivel: "moderado",
      descricao: "Potencializa os efeitos anticolinérgicos e sedativos. Monitorar para sinais de toxicidade."
    },
    {
      titulo: "Levomepromazina (Neozine) + Álcool",
      nivel: "moderado",
      descricao: "O álcool intensifica muito a sedação causada pelo remédio. Evitar completamente durante o tratamento."
    }
  ],

  "Periciazina": [
    {
      titulo: "Periciazina (Neuleptil) + IMAOs",
      nivel: "contraindicado",
      descricao: "A combinação pode causar reações graves como crise hipertensiva, convulsões e síndrome serotoninérgica. Contraindicado — respeitar intervalo de pelo menos 14 dias ao trocar de medicação."
    },
    {
      titulo: "Periciazina (Neuleptil) + Depressores graves do SNC",
      nivel: "contraindicado",
      descricao: "Com sedativos potentes ou opioides em doses altas, o risco de depressão respiratória é muito elevado. Combinação contraindicada."
    },
    {
      titulo: "Periciazina (Neuleptil) + Anticolinérgicos",
      nivel: "alto",
      descricao: "A combinação potencializa os efeitos anticolinérgicos: retenção urinária, constipação, boca seca e confusão mental — com risco maior em idosos."
    },
    {
      titulo: "Periciazina (Neuleptil) + Lítio",
      nivel: "alto",
      descricao: "Risco de neurotoxicidade. Monitorar sinais como tremores, confusão e rigidez muscular, além dos níveis de lítio no sangue."
    },
    {
      titulo: "Periciazina (Neuleptil) + Anti-hipertensivos",
      nivel: "moderado",
      descricao: "Pode ocorrer queda adicional de pressão. Atenção a tonturas, especialmente ao levantar."
    },
    {
      titulo: "Periciazina (Neuleptil) + Álcool",
      nivel: "moderado",
      descricao: "O álcool potencializa a sedação. Evitar durante o tratamento."
    },
    {
      titulo: "Periciazina (Neuleptil) + Antidepressivos",
      nivel: "moderado",
      descricao: "Pode haver somação de efeitos sedativos e anticolinérgicos. Usar sob monitoramento médico cuidadoso."
    }
  ],

  // ══════════════════════════════════════════
  // GRUPO 2 — BRONCODILATADORES / RESPIRATÓRIO
  // ══════════════════════════════════════════

  "Salbutamol": [
    {
      titulo: "Salbutamol + Betabloqueadores não seletivos (propranolol, atenolol)",
      nivel: "contraindicado",
      descricao: "Os betabloqueadores não seletivos bloqueiam exatamente os receptores que o salbutamol precisa ativar para abrir os brônquios. O remédio perde o efeito justo quando mais precisa funcionar — durante uma crise de asma. Combinação perigosa e contraindicada."
    },
    {
      titulo: "Salbutamol + Outros simpatomiméticos",
      nivel: "alto",
      descricao: "Combinar dois remédios que estimulam o sistema nervoso simpático (como outros broncodilatadores ou descongestionantes) soma o efeito sobre o coração, causando taquicardia (coração acelerado) e risco de arritmia."
    },
    {
      titulo: "Salbutamol + IMAOs",
      nivel: "alto",
      descricao: "Os inibidores da monoaminoxidase potencializam muito os efeitos cardiovasculares do salbutamol, com risco de taquicardia intensa e crise hipertensiva. Evitar."
    },
    {
      titulo: "Salbutamol + Diuréticos",
      nivel: "moderado",
      descricao: "O salbutamol pode baixar o potássio no sangue (hipocalemia), e muitos diuréticos fazem o mesmo. A soma pode levar a níveis perigosamente baixos de potássio, causando fraqueza muscular e arritmia."
    },
    {
      titulo: "Salbutamol + Digoxina",
      nivel: "moderado",
      descricao: "O salbutamol pode reduzir o potássio, e a digoxina se torna mais tóxica quando o potássio está baixo. Monitorar os níveis de potássio e digoxina regularmente."
    },
    {
      titulo: "Salbutamol + Corticoides sistêmicos",
      nivel: "moderado",
      descricao: "Ambos podem reduzir o potássio no sangue. A combinação exige monitoramento do potássio, especialmente em uso prolongado."
    }
  ],

  "Formoterol": [
    {
      titulo: "Formoterol + Betabloqueadores não seletivos",
      nivel: "contraindicado",
      descricao: "Os betabloqueadores não seletivos bloqueiam os receptores que o formoterol precisa para relaxar os brônquios. Isso pode desencadear broncoespasmo grave. Combinação proibida em pacientes com asma ou DPOC."
    },
    {
      titulo: "Formoterol + IMAOs",
      nivel: "contraindicado",
      descricao: "Os IMAOs potencializam intensamente o efeito do formoterol no coração e nos vasos, com risco de arritmia grave e crise hipertensiva."
    },
    {
      titulo: "Formoterol + Outros beta2-agonistas",
      nivel: "alto",
      descricao: "Combinar dois broncodilatadores da mesma classe (como formoterol + salbutamol em uso crônico simultâneo) some os efeitos cardiovasculares: taquicardia, tremores e queda de potássio."
    },
    {
      titulo: "Formoterol + Antiarrítmicos que prolongam o QT",
      nivel: "alto",
      descricao: "O formoterol pode baixar o potássio e prolongar o QT cardíaco. Combinado com antiarrítmicos que fazem o mesmo, o risco de arritmia grave aumenta significativamente."
    },
    {
      titulo: "Formoterol + Diuréticos",
      nivel: "moderado",
      descricao: "A soma dos efeitos de redução do potássio pode causar hipocalemia. Monitorar os níveis de potássio, especialmente com diuréticos de alça como a furosemida."
    },
    {
      titulo: "Formoterol + Corticoides sistêmicos",
      nivel: "moderado",
      descricao: "Ambos podem reduzir o potássio. Monitorar em uso prolongado."
    },
    {
      titulo: "Formoterol + Teofilina (xantinas)",
      nivel: "moderado",
      descricao: "A combinação potencializa os efeitos cardiovasculares e pode causar taquicardia e tremores mais intensos. Monitorar com atenção."
    }
  ],

  "Brometo de Ipratrópio": [
    {
      titulo: "Brometo de Ipratrópio + Outros anticolinérgicos sistêmicos (em glaucoma de ângulo fechado não tratado)",
      nivel: "contraindicado",
      descricao: "Em pacientes com glaucoma de ângulo fechado não tratado, o uso de anticolinérgicos pode aumentar a pressão ocular de forma perigosa. A combinação com outros anticolinérgicos sistêmicos é contraindicada nessa situação."
    },
    {
      titulo: "Brometo de Ipratrópio + Amantadina ou Antidepressivos tricíclicos",
      nivel: "alto",
      descricao: "Esses medicamentos também têm ação anticolinérgica. A combinação some os efeitos: boca seca, retenção urinária, constipação e confusão mental — especialmente perigoso para idosos."
    },
    {
      titulo: "Brometo de Ipratrópio + Outros broncodilatadores",
      nivel: "moderado",
      descricao: "O uso conjunto com outros broncodilatadores (como salbutamol) é comum e muitas vezes intencional no tratamento da DPOC. Porém, monitorar a frequência cardíaca, pois pode haver aumento do coração acelerado."
    }
  ],

  "Tiotrópio": [
    {
      titulo: "Tiotrópio + Outros anticolinérgicos",
      nivel: "contraindicado",
      descricao: "Combinar dois anticolinérgicos some os efeitos adversos: retenção urinária (principalmente em homens com próstata aumentada), piora do glaucoma e constipação. A duplicação da classe é contraindicada."
    },
    {
      titulo: "Tiotrópio + Amantadina ou Antidepressivos tricíclicos",
      nivel: "alto",
      descricao: "Esses remédios também bloqueiam a acetilcolina. A combinação potencializa os efeitos anticolinérgicos, com risco maior em idosos: confusão mental, retenção urinária e boca seca intensa."
    },
    {
      titulo: "Tiotrópio + Anti-histamínicos de 1ª geração",
      nivel: "alto",
      descricao: "Anti-histamínicos antigos (como prometazina e difenidramina) têm forte ação anticolinérgica. Junto ao tiotrópio, o efeito combinado pode ser intenso e problemático."
    },
    {
      titulo: "Tiotrópio + Diuréticos",
      nivel: "moderado",
      descricao: "Em idosos, a combinação pode aumentar o risco de desidratação. Monitorar a ingestão de líquidos e a função renal."
    }
  ],

  "Glicopirrônio": [
    {
      titulo: "Glicopirrônio + Outros anticolinérgicos",
      nivel: "contraindicado",
      descricao: "A duplicação da classe anticolinérgica aumenta muito os efeitos adversos: retenção urinária, glaucoma, constipação e confusão mental. Não combinar sem orientação especializada."
    },
    {
      titulo: "Glicopirrônio + Amantadina ou Antidepressivos tricíclicos",
      nivel: "alto",
      descricao: "Esses medicamentos potencializam os efeitos anticolinérgicos do glicopirrônio, aumentando o risco de retenção urinária, boca seca intensa e confusão."
    },
    {
      titulo: "Glicopirrônio + Outros broncodilatadores anticolinérgicos",
      nivel: "moderado",
      descricao: "Combinar dois broncodilatadores anticolinérgicos (como glicopirrônio + tiotrópio) representa duplicação desnecessária de classe, sem benefício adicional e com maior risco de efeitos adversos."
    }
  ],

  "Umeclidínio": [
    {
      titulo: "Umeclidínio + Outros anticolinérgicos",
      nivel: "contraindicado",
      descricao: "A combinação duplica os efeitos anticolinérgicos, aumentando o risco de retenção urinária, glaucoma, constipação e confusão mental. Contraindicado."
    },
    {
      titulo: "Umeclidínio + Amantadina ou Antidepressivos tricíclicos",
      nivel: "alto",
      descricao: "Esses medicamentos potencializam a ação anticolinérgica do umeclidínio, com maior risco de efeitos adversos, especialmente em idosos."
    },
    {
      titulo: "Umeclidínio + Outros LAMAs (anticolinérgicos de longa ação)",
      nivel: "moderado",
      descricao: "Combinar dois LAMAs (como umeclidínio + tiotrópio) é uma duplicação desnecessária de classe, sem benefício adicional comprovado e com maior risco de efeitos colaterais."
    }
  ],

  "Roflumilaste": [
    {
      titulo: "Roflumilaste + Teofilina",
      nivel: "contraindicado",
      descricao: "Ambos inibem a fosfodiesterase, a mesma enzima. A combinação some os efeitos e a toxicidade: risco de náuseas intensas, taquicardia, tremores e convulsões. Contraindicado."
    },
    {
      titulo: "Roflumilaste + Rifampicina",
      nivel: "alto",
      descricao: "A rifampicina acelera muito a eliminação do roflumilaste, reduzindo sua eficácia em até 80%. O tratamento da DPOC pode ser completamente comprometido."
    },
    {
      titulo: "Roflumilaste + Enoxacino ou Cimetidina",
      nivel: "alto",
      descricao: "Esses medicamentos reduzem a eliminação do roflumilaste, elevando seus níveis no sangue e aumentando o risco de efeitos adversos como náuseas, diarreia e perda de peso."
    },
    {
      titulo: "Roflumilaste + Contraceptivos orais com gestodeno",
      nivel: "moderado",
      descricao: "O gestodeno (presente em alguns contraceptivos orais) pode aumentar a exposição ao roflumilaste. Informar ao médico sobre o uso de anticoncepcional."
    }
  ],

  // ══════════════════════════════════════════
  // GRUPO 3 — ANTIBIÓTICOS
  // ══════════════════════════════════════════

  "Ceftriaxona": [
    {
      titulo: "Ceftriaxona + Soluções com cálcio intravenoso",
      nivel: "contraindicado",
      descricao: "A mistura de ceftriaxona com soluções contendo cálcio (como Ringer lactato) pode formar precipitados que entopem vasos sanguíneos, com risco fatal — especialmente em recém-nascidos. Nunca administrar juntos na mesma via, mesmo em adultos."
    },
    {
      titulo: "Ceftriaxona + Varfarina",
      nivel: "alto",
      descricao: "A ceftriaxona pode elevar significativamente o efeito anticoagulante da varfarina (aumenta o INR), aumentando o risco de sangramento. Monitorar o INR com mais frequência durante o tratamento."
    },
    {
      titulo: "Ceftriaxona + Aminoglicosídeos",
      nivel: "alto",
      descricao: "A combinação aumenta o risco de dano aos rins (nefrotoxicidade). Monitorar a função renal e os níveis do aminoglicosídeo regularmente."
    },
    {
      titulo: "Ceftriaxona + Probenecida",
      nivel: "moderado",
      descricao: "A probenecida reduz a eliminação da ceftriaxona pelos rins, podendo elevar seus níveis no sangue. Em geral não causa problemas clínicos graves, mas deve ser monitorado."
    },
    {
      titulo: "Ceftriaxona + Álcool",
      nivel: "moderado",
      descricao: "A ceftriaxona pode causar uma reação leve semelhante ao dissulfiram (efeito antabuse) com álcool: rubor, náusea e mal-estar. Evitar bebidas alcoólicas durante o tratamento."
    }
  ],

  "Vancomicina": [
    {
      titulo: "Vancomicina + Outros nefrotóxicos potentes (sem monitoramento rigoroso)",
      nivel: "contraindicado",
      descricao: "A associação com outros remédios que danificam os rins — como anfotericina B ou aminoglicosídeos — sem monitoramento intensivo pode causar insuficiência renal grave. Exige acompanhamento rigoroso de função renal e níveis sanguíneos."
    },
    {
      titulo: "Vancomicina + Aminoglicosídeos",
      nivel: "alto",
      descricao: "Essa combinação é especialmente perigosa para os rins (nefrotoxicidade) e para a audição (ototoxicidade — perda auditiva). Monitorar função renal e audição com frequência."
    },
    {
      titulo: "Vancomicina + Anfotericina B",
      nivel: "alto",
      descricao: "Ambos os medicamentos são tóxicos para os rins. A combinação aumenta muito o risco de insuficiência renal. Usar apenas quando essencial, com monitoramento rigoroso."
    },
    {
      titulo: "Vancomicina + Furosemida em altas doses",
      nivel: "alto",
      descricao: "Furosemida em doses elevadas pode piorar a ototoxicidade (dano à audição) da vancomicina. Monitorar a audição e a função renal durante o uso conjunto."
    },
    {
      titulo: "Vancomicina + Anestésicos",
      nivel: "moderado",
      descricao: "A vancomicina pode causar a síndrome do homem vermelho (rubor, coceira e queda de pressão) — e anestésicos podem potencializar a hipotensão. Administrar a vancomicina lentamente e monitorar a pressão."
    },
    {
      titulo: "Vancomicina + Neurobloqueadores",
      nivel: "moderado",
      descricao: "A vancomicina pode potencializar o efeito dos relaxantes musculares usados em anestesia. Monitorar a função neuromuscular durante procedimentos."
    }
  ],

  "Benzilpenicilina": [
    {
      titulo: "Benzilpenicilina + Probenecida (sem intenção terapêutica)",
      nivel: "contraindicado",
      descricao: "A probenecida bloqueia a eliminação da benzilpenicilina pelos rins, elevando muito seus níveis no sangue. Embora às vezes usado intencionalmente pelo médico para potencializar o efeito, sem essa indicação a combinação é contraindicada."
    },
    {
      titulo: "Benzilpenicilina + Varfarina",
      nivel: "alto",
      descricao: "A benzilpenicilina altera a flora intestinal, reduzindo a produção de vitamina K pelas bactérias intestinais e aumentando o efeito da varfarina. Monitorar o INR com mais frequência."
    },
    {
      titulo: "Benzilpenicilina + Aminoglicosídeos (na mesma seringa)",
      nivel: "alto",
      descricao: "A mistura na mesma seringa ou bolsa de soro causa inativação química dos dois medicamentos. Nunca misturar fisicamente — administrar separados, em vias diferentes ou horários alternados."
    },
    {
      titulo: "Benzilpenicilina + Contraceptivos orais",
      nivel: "moderado",
      descricao: "Há evidência discutida de que a benzilpenicilina pode reduzir a eficácia dos anticoncepcionais orais ao alterar a flora intestinal. Por precaução, recomenda-se usar método contraceptivo adicional durante o tratamento."
    }
  ],

  "Cefadroxila": [
    {
      titulo: "Cefadroxila + Varfarina",
      nivel: "alto",
      descricao: "A cefadroxila pode aumentar o efeito anticoagulante da varfarina. Monitorar o INR com mais frequência durante o tratamento com o antibiótico."
    },
    {
      titulo: "Cefadroxila + Probenecida",
      nivel: "alto",
      descricao: "A probenecida reduz a eliminação da cefadroxila pelos rins, elevando seus níveis no sangue. O médico pode precisar ajustar a dose."
    },
    {
      titulo: "Cefadroxila + Antiácidos",
      nivel: "moderado",
      descricao: "Antiácidos podem reduzir levemente a absorção da cefadroxila. Tomar o antibiótico separado dos antiácidos por pelo menos 2 horas."
    },
    {
      titulo: "Cefadroxila + Álcool",
      nivel: "moderado",
      descricao: "O álcool pode potencializar possíveis efeitos adversos gastrointestinais. Evitar durante o tratamento."
    }
  ],

  "Cefuroxima": [
    {
      titulo: "Cefuroxima + Varfarina",
      nivel: "alto",
      descricao: "A cefuroxima pode aumentar o efeito anticoagulante da varfarina, elevando o risco de sangramento. Monitorar o INR com frequência durante o antibioticoterapia."
    },
    {
      titulo: "Cefuroxima + Probenecida",
      nivel: "alto",
      descricao: "A probenecida reduz a excreção renal da cefuroxima, elevando seus níveis no sangue. Monitorar possíveis efeitos adversos."
    },
    {
      titulo: "Cefuroxima + Antiácidos",
      nivel: "moderado",
      descricao: "Antiácidos reduzem a absorção do comprimido de cefuroxima. Tomar sempre com alimento (melhora a absorção) e separar o antiácido por pelo menos 2 horas."
    },
    {
      titulo: "Cefuroxima + Aminoglicosídeos",
      nivel: "moderado",
      descricao: "A combinação pode aumentar o risco de dano renal. Monitorar função renal, especialmente em pacientes idosos ou com problemas renais prévios."
    }
  ],

  "Cefpodoxima": [
    {
      titulo: "Cefpodoxima + Varfarina",
      nivel: "alto",
      descricao: "Pode elevar o efeito anticoagulante da varfarina. Monitorar o INR durante o uso do antibiótico."
    },
    {
      titulo: "Cefpodoxima + Probenecida",
      nivel: "alto",
      descricao: "A probenecida eleva os níveis de cefpodoxima no sangue ao reduzir sua eliminação renal."
    },
    {
      titulo: "Cefpodoxima + Antiácidos ou IBPs (inibidores de bomba de prótons)",
      nivel: "moderado",
      descricao: "Antiácidos e IBPs (como omeprazol) reduzem significativamente a absorção da cefpodoxima ao elevar o pH do estômago. Tomar a cefpodoxima pelo menos 2 horas antes do antiácido ou, se possível, com alimento ácido (como suco de laranja)."
    },
    {
      titulo: "Cefpodoxima + Aminoglicosídeos",
      nivel: "moderado",
      descricao: "A combinação aumenta o risco de toxicidade renal. Monitorar a função renal."
    }
  ],

  "Fosfomicina": [
    {
      titulo: "Fosfomicina + Metoclopramida",
      nivel: "alto",
      descricao: "A metoclopramida acelera o movimento intestinal e reduz drasticamente a absorção da fosfomicina oral, comprometendo o tratamento. Evitar essa combinação — se necessário usar antiemético, preferir outro."
    },
    {
      titulo: "Fosfomicina + Outros antibióticos",
      nivel: "moderado",
      descricao: "A fosfomicina é frequentemente combinada com outros antibióticos de forma sinérgica para infecções graves. Monitorar efeitos adversos, especialmente função renal."
    },
    {
      titulo: "Fosfomicina + Anticoagulantes",
      nivel: "moderado",
      descricao: "Pode haver alteração no efeito anticoagulante. Monitorar o INR em pacientes em uso de varfarina."
    }
  ],

  // ══════════════════════════════════════════
  // GRUPO 4 — ANTICOAGULANTES
  // ══════════════════════════════════════════

  "Fondaparinux": [
    {
      titulo: "Fondaparinux + Outros anticoagulantes (sem protocolo definido)",
      nivel: "contraindicado",
      descricao: "Combinar dois anticoagulantes sem um protocolo médico claro multiplica o risco de sangramento grave. A associação só é feita em situações específicas e sempre sob supervisão hospitalar."
    },
    {
      titulo: "Fondaparinux + AINEs",
      nivel: "alto",
      descricao: "Anti-inflamatórios como ibuprofeno, diclofenaco e naproxeno aumentam o risco de sangramento ao inibir as plaquetas. A combinação com fondaparinux potencializa esse risco. Evitar ou usar o tempo mínimo necessário."
    },
    {
      titulo: "Fondaparinux + Antiplaquetários (clopidogrel, AAS em doses altas)",
      nivel: "alto",
      descricao: "Associar fondaparinux a antiplaquetários soma os efeitos antitrombóticos e aumenta muito o risco de sangramento. Monitorar sinais de hemorragia."
    },
    {
      titulo: "Fondaparinux + ISRS ou IRSN",
      nivel: "moderado",
      descricao: "Antidepressivos que inibem a recaptação de serotonina (como fluoxetina, sertralina, venlafaxina) reduzem a agregação plaquetária. Associados ao fondaparinux, aumentam o risco de sangramento gastrointestinal."
    },
    {
      titulo: "Fondaparinux + Vitamina E em altas doses",
      nivel: "moderado",
      descricao: "Doses elevadas de vitamina E têm efeito anticoagulante leve. Associadas ao fondaparinux, podem aumentar o risco de sangramento."
    }
  ],

  "Nadroparina": [
    {
      titulo: "Nadroparina + Outros anticoagulantes parenterais simultâneos",
      nivel: "contraindicado",
      descricao: "Combinar duas heparinas ou outros anticoagulantes injetáveis ao mesmo tempo multiplica o risco de sangramento grave. Contraindicado sem protocolo médico específico."
    },
    {
      titulo: "Nadroparina + AINEs",
      nivel: "alto",
      descricao: "Anti-inflamatórios inibem as plaquetas e, junto à nadroparina, aumentam muito o risco de hemorragia. Evitar ou monitorar com atenção."
    },
    {
      titulo: "Nadroparina + Antiplaquetários ou Trombolíticos",
      nivel: "alto",
      descricao: "A associação soma os efeitos antitrombóticos e eleva significativamente o risco de sangramento grave. Usar apenas quando há indicação clínica clara e sob monitoramento rigoroso."
    },
    {
      titulo: "Nadroparina + ISRS",
      nivel: "moderado",
      descricao: "A redução na agregação plaquetária causada pelos antidepressivos ISRS some ao efeito da nadroparina, aumentando o risco de sangramento, especialmente gastrointestinal."
    },
    {
      titulo: "Nadroparina + Vitamina E em altas doses",
      nivel: "moderado",
      descricao: "Doses altas de vitamina E podem potencializar levemente o efeito anticoagulante. Monitorar sinais de sangramento."
    },
    {
      titulo: "Nadroparina + Álcool",
      nivel: "moderado",
      descricao: "O álcool pode aumentar o risco de sangramento gastrointestinal em pacientes anticoagulados. Evitar durante o tratamento."
    }
  ],

  "Dipiridamol": [
    {
      titulo: "Dipiridamol + Adenosina",
      nivel: "contraindicado",
      descricao: "O dipiridamol bloqueia a eliminação da adenosina pelo organismo, potencializando muito o seu efeito. Isso pode causar bradicardia grave (coração muito lento) e queda severa de pressão. Combinação contraindicada — o médico deve usar outro medicamento."
    },
    {
      titulo: "Dipiridamol + Anticoagulantes",
      nivel: "alto",
      descricao: "A associação soma os efeitos antiplaquetários e anticoagulantes, elevando o risco de sangramento. Monitorar sinais de hemorragia com atenção."
    },
    {
      titulo: "Dipiridamol + AINEs",
      nivel: "alto",
      descricao: "Anti-inflamatórios inibem as plaquetas, somando ao efeito do dipiridamol e aumentando o risco de sangramento, especialmente gastrointestinal."
    },
    {
      titulo: "Dipiridamol + Anti-hipertensivos",
      nivel: "moderado",
      descricao: "O dipiridamol pode causar queda de pressão (vasodilatação). Associado a anti-hipertensivos, esse efeito pode ser mais intenso. Monitorar pressão arterial."
    },
    {
      titulo: "Dipiridamol + Inibidores da colinesterase",
      nivel: "moderado",
      descricao: "O dipiridamol pode antagonizar (reduzir) o efeito dos medicamentos para Alzheimer que inibem a colinesterase (como donepezila). Monitorar a eficácia do tratamento para Alzheimer."
    }
  ],

  // ══════════════════════════════════════════
  // GRUPO 5 — CARDIOVASCULARES
  // ══════════════════════════════════════════

  "Nisoldipino": [
    {
      titulo: "Nisoldipino + Rifampicina",
      nivel: "contraindicado",
      descricao: "A rifampicina acelera drasticamente a eliminação do nisoldipino, tornando-o praticamente ineficaz para controlar a pressão arterial. Combinação contraindicada."
    },
    {
      titulo: "Nisoldipino + Suco de grapefruit (toranja)",
      nivel: "contraindicado",
      descricao: "O suco de grapefruit bloqueia a enzima que elimina o nisoldipino, elevando seus níveis no sangue em mais de 4 vezes. Isso aumenta muito o risco de queda de pressão, taquicardia e outros efeitos adversos. Evitar completamente durante o tratamento."
    },
    {
      titulo: "Nisoldipino + Fenitoína",
      nivel: "contraindicado",
      descricao: "A fenitoína (anticonvulsivante) acelera a eliminação do nisoldipino, reduzindo muito sua eficácia no controle da pressão."
    },
    {
      titulo: "Nisoldipino + Cetoconazol ou Itraconazol",
      nivel: "alto",
      descricao: "Esses antifúngicos bloqueiam a enzima que elimina o nisoldipino, elevando seus níveis no sangue e aumentando o risco de efeitos adversos graves como queda de pressão."
    },
    {
      titulo: "Nisoldipino + Cimetidina",
      nivel: "alto",
      descricao: "A cimetidina (usada para azia) reduz a eliminação do nisoldipino, elevando seus níveis. Preferir outros antiácidos ou IBPs, se possível."
    },
    {
      titulo: "Nisoldipino + Betabloqueadores",
      nivel: "moderado",
      descricao: "A combinação pode causar queda excessiva de pressão. Em geral é usada com cuidado, mas o médico deve monitorar a pressão arterial e os batimentos cardíacos."
    },
    {
      titulo: "Nisoldipino + Digoxina",
      nivel: "moderado",
      descricao: "O nisoldipino pode elevar levemente os níveis de digoxina. Monitorar sinais de toxicidade da digoxina: náusea, visão amarelada, bradicardia."
    }
  ],

  "Clonidina": [
    {
      titulo: "Clonidina + Betabloqueadores (ao suspender)",
      nivel: "contraindicado",
      descricao: "Se a clonidina for suspensa abruptamente enquanto o paciente usa betabloqueador, pode ocorrer uma crise hipertensiva rebote grave — pressão muito alta e perigosa. A regra é: sempre suspender o betabloqueador alguns dias ANTES de parar a clonidina, e nunca parar a clonidina de forma abrupta."
    },
    {
      titulo: "Clonidina + Antidepressivos tricíclicos",
      nivel: "alto",
      descricao: "Os antidepressivos tricíclicos (como amitriptilina) bloqueiam o efeito anti-hipertensivo da clonidina, podendo deixar a pressão descontrolada. A combinação reduz a eficácia do tratamento para hipertensão."
    },
    {
      titulo: "Clonidina + Outros anti-hipertensivos",
      nivel: "alto",
      descricao: "A soma dos efeitos pode causar hipotensão grave, especialmente ao se levantar (hipotensão ortostática). Monitorar a pressão com frequência."
    },
    {
      titulo: "Clonidina + Álcool",
      nivel: "moderado",
      descricao: "O álcool potencializa o efeito sedativo da clonidina e pode causar queda de pressão mais intensa. Evitar durante o tratamento."
    },
    {
      titulo: "Clonidina + Benzodiazepínicos",
      nivel: "moderado",
      descricao: "A combinação soma os efeitos sedativos, causando sonolência excessiva. Cuidado ao dirigir ou operar máquinas."
    },
    {
      titulo: "Clonidina + AINEs",
      nivel: "moderado",
      descricao: "Anti-inflamatórios podem reduzir a eficácia da clonidina no controle da pressão. Preferir paracetamol para dor quando possível."
    }
  ],

  "Doxazosina": [
    {
      titulo: "Doxazosina + Outros alfabloqueadores",
      nivel: "contraindicado",
      descricao: "A combinação de dois alfabloqueadores duplica o risco de hipotensão grave, especialmente ao se levantar. Contraindicado."
    },
    {
      titulo: "Doxazosina + Sildenafila, Tadalafila ou Vardenafila",
      nivel: "alto",
      descricao: "Os remédios para disfunção erétil (Viagra, Cialis, Levitra) causam vasodilatação intensa. Combinados à doxazosina, podem provocar queda brusca e grave de pressão, com risco de desmaio. Orientar o paciente sobre esse risco e discutir intervalos de tempo adequados com o médico."
    },
    {
      titulo: "Doxazosina + Anti-hipertensivos",
      nivel: "alto",
      descricao: "A soma dos efeitos pode causar hipotensão excessiva, especialmente na primeira dose (efeito de primeira dose da doxazosina). Iniciar com doses baixas e monitorar a pressão."
    },
    {
      titulo: "Doxazosina + AINEs",
      nivel: "moderado",
      descricao: "Anti-inflamatórios podem reduzir o efeito anti-hipertensivo da doxazosina. Monitorar a pressão arterial."
    },
    {
      titulo: "Doxazosina + Álcool",
      nivel: "moderado",
      descricao: "O álcool causa vasodilatação e pode intensificar a queda de pressão causada pela doxazosina. Evitar durante o tratamento."
    }
  ],

  "Trimetazidina": [
    {
      titulo: "Trimetazidina + Antidiabéticos",
      nivel: "alto",
      descricao: "A trimetazidina pode potencializar levemente o efeito dos remédios para diabetes, com risco de hipoglicemia (queda do açúcar no sangue). Monitorar a glicemia com atenção."
    },
    {
      titulo: "Trimetazidina + Outros cardiotônicos",
      nivel: "moderado",
      descricao: "O uso conjunto com outros medicamentos para o coração deve ser acompanhado pelo médico para evitar efeitos aditivos indesejados."
    },
    {
      titulo: "Trimetazidina + Antiácidos",
      nivel: "leve",
      descricao: "Antiácidos não têm impacto clínico relevante na eficácia da trimetazidina. A interação é considerada de baixíssima relevância."
    }
  ],

  // ══════════════════════════════════════════
  // GRUPO 6 — ANTIDIABÉTICOS
  // ══════════════════════════════════════════

  "Repaglinida": [
    {
      titulo: "Repaglinida + Genfibrozila",
      nivel: "contraindicado",
      descricao: "A genfibrozila (usada para triglicerídeos) bloqueia a eliminação da repaglinida, elevando seus níveis no sangue em até 8 vezes. Isso pode causar hipoglicemia grave e prolongada. Combinação proibida."
    },
    {
      titulo: "Repaglinida + Cetoconazol, Itraconazol ou Claritromicina",
      nivel: "contraindicado",
      descricao: "Esses medicamentos bloqueiam a enzima que elimina a repaglinida, elevando muito seus níveis e aumentando o risco de hipoglicemia grave. Contraindicado."
    },
    {
      titulo: "Repaglinida + Outros hipoglicemiantes",
      nivel: "alto",
      descricao: "Combinar dois remédios que baixam o açúcar soma os efeitos, com risco de hipoglicemia (tontura, tremores, suor frio, desmaio). Monitorar a glicemia com frequência."
    },
    {
      titulo: "Repaglinida + IECAs (captopril, enalapril)",
      nivel: "alto",
      descricao: "Os IECAs podem aumentar a sensibilidade à insulina e potencializar o efeito hipoglicemiante da repaglinida. Monitorar a glicemia, especialmente no início do tratamento."
    },
    {
      titulo: "Repaglinida + Rifampicina",
      nivel: "moderado",
      descricao: "A rifampicina acelera muito a eliminação da repaglinida, reduzindo drasticamente sua eficácia no controle do açúcar. O médico pode precisar aumentar a dose ou trocar o remédio."
    },
    {
      titulo: "Repaglinida + Betabloqueadores",
      nivel: "moderado",
      descricao: "Betabloqueadores mascaram os sintomas de hipoglicemia (como tremores e taquicardia), dificultando a percepção de baixo açúcar. Monitorar a glicemia com mais frequência."
    },
    {
      titulo: "Repaglinida + Álcool",
      nivel: "moderado",
      descricao: "O álcool pode tanto potencializar a hipoglicemia quanto mascarar seus sintomas. Evitar ou consumir com extrema moderação durante o tratamento."
    }
  ],

  "Vildagliptina": [
    {
      titulo: "Vildagliptina + IECAs (captopril, enalapril, lisinopril)",
      nivel: "alto",
      descricao: "A combinação aumenta o risco de angioedema — um inchaço súbito e potencialmente grave em face, lábios, língua ou garganta. Procurar atendimento imediato se ocorrer inchaço na região da face ou dificuldade para respirar."
    },
    {
      titulo: "Vildagliptina + Insulina ou Sulfonilureias",
      nivel: "alto",
      descricao: "A vildagliptina somada a insulina ou sulfonilureias (como glibenclamida) aumenta o risco de hipoglicemia. O médico pode precisar reduzir a dose dos outros medicamentos."
    },
    {
      titulo: "Vildagliptina + Outros antidiabéticos",
      nivel: "moderado",
      descricao: "A combinação com outros remédios para diabetes exige monitoramento da glicemia para evitar hipoglicemia."
    },
    {
      titulo: "Vildagliptina + AINEs",
      nivel: "moderado",
      descricao: "Anti-inflamatórios podem comprometer a função renal, afetando a eliminação da vildagliptina. Monitorar a função renal, especialmente em uso prolongado."
    }
  ],

  "Semaglutida": [
    {
      titulo: "Semaglutida + Insulina ou Sulfonilureias",
      nivel: "alto",
      descricao: "A semaglutida potencializa o efeito hipoglicemiante da insulina e das sulfonilureias. Ao iniciar a semaglutida, o médico geralmente reduz a dose desses outros medicamentos para evitar hipoglicemia."
    },
    {
      titulo: "Semaglutida + Varfarina",
      nivel: "alto",
      descricao: "A semaglutida pode alterar a absorção e o metabolismo da varfarina. Monitorar o INR com mais frequência ao iniciar ou ajustar a dose da semaglutida."
    },
    {
      titulo: "Semaglutida + Contraceptivos orais",
      nivel: "moderado",
      descricao: "A semaglutida retarda o esvaziamento do estômago, podendo reduzir a absorção de medicamentos orais — incluindo a pílula anticoncepcional. Tomar o contraceptivo pelo menos 1 hora antes da semaglutida ou seguir orientação médica."
    },
    {
      titulo: "Semaglutida + Levotiroxina",
      nivel: "moderado",
      descricao: "O retardo no esvaziamento gástrico causado pela semaglutida pode afetar a absorção da levotiroxina (hormônio da tireoide). Tomar a levotiroxina sempre em jejum e separada de outros remédios. Monitorar os níveis de TSH."
    },
    {
      titulo: "Semaglutida + Álcool",
      nivel: "moderado",
      descricao: "O álcool pode potencializar a hipoglicemia, especialmente se combinado com insulina ou sulfonilureias. Consumir com moderação e sempre acompanhado de alimento."
    }
  ],

  // ══════════════════════════════════════════
  // GRUPO 7 — IMUNOBIOLÓGICOS
  // ══════════════════════════════════════════

  "Rituximabe": [
    {
      titulo: "Rituximabe + Vacinas vivas",
      nivel: "contraindicado",
      descricao: "Vacinas com vírus ou bactérias vivos atenuados (como febre amarela, varicela e sarampo) são contraindicadas durante o tratamento com rituximabe e por até 12 meses após, pois o sistema imunológico está suprimido e pode não conseguir controlar o microrganismo da vacina."
    },
    {
      titulo: "Rituximabe + Outros imunossupressores",
      nivel: "alto",
      descricao: "A soma de dois medicamentos que suprimem o sistema imunológico aumenta muito o risco de infecções graves e oportunistas. Monitorar sinais de infecção rigorosamente."
    },
    {
      titulo: "Rituximabe + Cisplatina",
      nivel: "alto",
      descricao: "A combinação aumenta o risco de toxicidade renal (nefrotoxicidade). Monitorar função renal com frequência."
    },
    {
      titulo: "Rituximabe + Anti-hipertensivos",
      nivel: "moderado",
      descricao: "Durante a infusão do rituximabe pode ocorrer queda de pressão. Anti-hipertensivos podem intensificar esse efeito. Monitorar a pressão durante a infusão."
    },
    {
      titulo: "Rituximabe + Anticoagulantes",
      nivel: "moderado",
      descricao: "O rituximabe pode alterar o sistema de coagulação. Monitorar parâmetros de coagulação em pacientes em uso de anticoagulantes."
    }
  ],

  "Tocilizumabe": [
    {
      titulo: "Tocilizumabe + Vacinas vivas",
      nivel: "contraindicado",
      descricao: "Com o sistema imunológico suprimido pelo tocilizumabe, vacinas com microrganismos vivos podem causar infecção real. Atualizar a carteira de vacinação antes de iniciar o tratamento."
    },
    {
      titulo: "Tocilizumabe + Outros biológicos imunossupressores",
      nivel: "contraindicado",
      descricao: "Combinar dois biológicos imunossupressores aumenta drasticamente o risco de infecções graves, inclusive oportunistas e potencialmente fatais. Contraindicado."
    },
    {
      titulo: "Tocilizumabe + Varfarina",
      nivel: "alto",
      descricao: "O tocilizumabe reduz a inflamação e, com isso, normaliza as enzimas do fígado (CYP450) que estavam inibidas pela doença. Isso pode alterar significativamente os níveis de varfarina. Monitorar o INR com frequência ao iniciar ou ajustar o tocilizumabe."
    },
    {
      titulo: "Tocilizumabe + Ciclosporina ou Atorvastatina",
      nivel: "alto",
      descricao: "Assim como a varfarina, o tocilizumabe pode alterar o metabolismo desses medicamentos ao normalizar as enzimas hepáticas suprimidas pela inflamação. Monitorar os níveis e possíveis efeitos adversos."
    },
    {
      titulo: "Tocilizumabe + Metotrexato",
      nivel: "moderado",
      descricao: "A combinação é usada clinicamente no tratamento da artrite reumatoide, mas some os efeitos imunossupressores. Monitorar toxicidade do metotrexato (fígado, medula óssea) com mais atenção."
    }
  ],

  "Etanercepte": [
    {
      titulo: "Etanercepte + Vacinas vivas",
      nivel: "contraindicado",
      descricao: "Com a imunidade reduzida pelo etanercepte, vacinas com vírus vivos podem causar infecção ativa. Atualizar a vacinação antes de iniciar o biológico."
    },
    {
      titulo: "Etanercepte + Anakinra",
      nivel: "contraindicado",
      descricao: "A combinação desses dois biológicos aumenta muito o risco de infecções graves e neutropenia (queda dos glóbulos brancos). Contraindicado."
    },
    {
      titulo: "Etanercepte + Outros biológicos imunossupressores",
      nivel: "alto",
      descricao: "Combinar dois biológicos que suprimem o sistema imunológico aumenta muito o risco de infecções graves. Evitar sem indicação especializada."
    },
    {
      titulo: "Etanercepte + Ciclofosfamida",
      nivel: "alto",
      descricao: "A combinação aumenta o risco de toxicidade grave e infecções. Não é recomendada."
    },
    {
      titulo: "Etanercepte + Metotrexato",
      nivel: "moderado",
      descricao: "A associação é usada clinicamente para artrite reumatoide e proporciona melhor controle da doença. Monitorar função hepática e hemograma regularmente."
    }
  ],

  "Golimumabe": [
    {
      titulo: "Golimumabe + Vacinas vivas",
      nivel: "contraindicado",
      descricao: "Contraindicado durante o tratamento com golimumabe. Atualizar a vacinação antes de iniciar o biológico e evitar contato próximo com pessoas recém-vacinadas com vírus vivos."
    },
    {
      titulo: "Golimumabe + Abatacepte ou Anakinra",
      nivel: "contraindicado",
      descricao: "A combinação de dois biológicos com mecanismos de ação diferentes, mas ambos imunossupressores, eleva muito o risco de infecções graves. Contraindicado."
    },
    {
      titulo: "Golimumabe + Outros imunobiológicos ou imunossupressores",
      nivel: "alto",
      descricao: "Somar imunossupressores aumenta o risco de infecções oportunistas. Monitorar sinais de infecção com atenção."
    },
    {
      titulo: "Golimumabe + Metotrexato",
      nivel: "moderado",
      descricao: "A combinação é usada clinicamente e traz benefício adicional no controle da artrite. Monitorar regularmente a função hepática e o hemograma para detectar toxicidade do metotrexato."
    }
  ],

  "Dupilumabe": [
    {
      titulo: "Dupilumabe + Vacinas vivas",
      nivel: "alto",
      descricao: "Embora o dupilumabe tenha um mecanismo diferente dos imunossupressores tradicionais, vacinas com microrganismos vivos devem ser avaliadas com cautela e discutidas com o médico antes de serem aplicadas durante o tratamento."
    },
    {
      titulo: "Dupilumabe + Outros imunobiológicos",
      nivel: "moderado",
      descricao: "A associação com outros biológicos deve ser avaliada individualmente pelo médico. O risco é menor do que com imunossupressores clássicos, mas ainda requer atenção."
    },
    {
      titulo: "Dupilumabe + Corticoides tópicos",
      nivel: "leve",
      descricao: "A combinação com corticoides tópicos é comum e usada na prática clínica. O dupilumabe pode permitir a redução gradual do corticoide tópico ao controlar a inflamação da pele. Fazer essa redução sempre de forma gradual e orientada pelo médico."
    }
  ]

};

// ─────────────────────────────────────────────
// FUNÇÃO PRINCIPAL
// ─────────────────────────────────────────────

function adicionarInteracoes() {
  if (!fs.existsSync(DB_PATH)) {
    console.error(`❌ Arquivo não encontrado: ${DB_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(DB_PATH, "utf-8");
  const db = JSON.parse(raw);

  const medicamentos = db.medicamentos || db;
  const lista = Array.isArray(medicamentos) ? medicamentos : Object.values(medicamentos);

  let totalMedicamentosAtualizados = 0;
  let totalInteracoesAdicionadas = 0;
  const naoEncontrados = [];

  for (const [nomeBusca, novasInteracoes] of Object.entries(interacoesPorMedicamento)) {
    const chave = nomeBusca.toLowerCase().trim();
    const med = lista.find(
      (m) =>
        m.nome?.toLowerCase().trim() === chave ||
        m.nome?.toLowerCase().trim().startsWith(chave) ||
        m.nome?.toLowerCase().trim().includes(chave) ||
        m.nomeComercial?.toLowerCase().trim() === chave ||
        m.nomeComercial?.toLowerCase().trim().includes(chave) ||
        (Array.isArray(m.sinonimos) &&
          m.sinonimos.some((s) => s.toLowerCase().trim() === chave || s.toLowerCase().trim().includes(chave)))
    );

    if (!med) {
      naoEncontrados.push(nomeBusca);
      continue;
    }

    if (!Array.isArray(med.interacoes)) {
      med.interacoes = [];
    }

    let adicionadas = 0;
    for (const interacao of novasInteracoes) {
      const jaExiste = med.interacoes.some(
        (i) => i.titulo?.toLowerCase().trim() === interacao.titulo.toLowerCase().trim()
      );
      if (!jaExiste) {
        med.interacoes.push(interacao);
        adicionadas++;
      }
    }

    if (adicionadas > 0) {
      totalMedicamentosAtualizados++;
      totalInteracoesAdicionadas += adicionadas;
      console.log(`✅ ${nomeBusca}: ${adicionadas} interação(ões) adicionada(s)`);
    } else {
      console.log(`⚠️  ${nomeBusca}: todas as interações já existiam (nenhuma duplicada)`);
    }
  }

  // Salvar de volta no arquivo
  const dbAtualizado = Array.isArray(db.medicamentos)
    ? { ...db, medicamentos: lista }
    : Array.isArray(db)
    ? lista
    : db;

  fs.writeFileSync(DB_PATH, JSON.stringify(dbAtualizado, null, 2), "utf-8");

  console.log("\n─────────────────────────────────────────");
  console.log(`📦 Medicamentos atualizados : ${totalMedicamentosAtualizados}`);
  console.log(`💊 Interações adicionadas   : ${totalInteracoesAdicionadas}`);
  if (naoEncontrados.length > 0) {
    console.log(`\n⚠️  Não encontrados no banco (verificar nome):`);
    naoEncontrados.forEach((n) => console.log(`   - ${n}`));
  }
  console.log("─────────────────────────────────────────\n");
}

adicionarInteracoes();
