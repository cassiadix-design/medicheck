// add_prioridade3.cjs — 21 medicamentos relevantes restantes
'use strict';
const fs = require('fs');

const novas = [

  // ─── ZAFIRLUCASTE ────────────────────────────────────────────────────────────
  {
    med1: ['zafirlucaste','accolate'],
    med2: ['warfarina','varfarina','acenocumarol','sintrom'],
    nivel: 'moderado',
    titulo: 'Zafirlucaste + Warfarina (Inibição CYP2C9 — Aumento do RNI)',
    mecanismo: 'O zafirlucaste inibe CYP2C9 e CYP3A4 de forma dose-dependente. A S-warfarina (isômero farmacologicamente mais ativo) é substrato de CYP2C9 — sua inibição reduz o clearance da warfarina, elevando os níveis plasmáticos e o efeito anticoagulante.',
    efeito: 'Elevação do RNI com risco de sangramento. Em estudos, a coadministração de zafirlucaste 160 mg/dia aumentou a AUC da S-warfarina em ~63% e o tempo de protrombina significativamente.',
    conduta: '⚠️ Monitorar RNI com maior frequência ao iniciar, ajustar dose ou suspender zafirlucaste. Pode ser necessário reduzir a dose de warfarina. Considerar montelucaste como alternativa antileucotrieno, que não tem interação significativa com CYP2C9.'
  },
  {
    med1: ['zafirlucaste','accolate'],
    med2: ['eritromicina','claritromicina','azitromicina'],
    nivel: 'moderado',
    titulo: 'Zafirlucaste + Macrolídeos (Redução dos Níveis de Zafirlucaste)',
    mecanismo: 'A eritromicina reduz a biodisponibilidade do zafirlucaste em ~40%, possivelmente por inibição de transportadores intestinais (P-gp) ou alteração do metabolismo de first-pass. O mecanismo exato não é completamente elucidado.',
    efeito: 'Redução dos níveis plasmáticos de zafirlucaste com potencial perda de controle da asma. Risco de exacerbação asmática durante curso de eritromicina.',
    conduta: '⚠️ Monitorar controle da asma durante uso de eritromicina. Considerar azitromicina ou amoxicilina como alternativa se possível. Ajustar dose de zafirlucaste se necessário.'
  },
  {
    med1: ['zafirlucaste','accolate'],
    med2: ['teofilina','aminofilina'],
    nivel: 'leve',
    titulo: 'Zafirlucaste + Teofilina (Redução de Nível)',
    mecanismo: 'A teofilina reduz os níveis plasmáticos de zafirlucaste em ~30% por mecanismo não completamente esclarecido (possivelmente alteração da absorção ou indução metabólica leve). A direção inversa — efeito do zafirlucaste sobre a teofilina — é clínica e farmacocineticamente pouco relevante.',
    efeito: 'Redução modesta da exposição ao zafirlucaste. Em geral, sem impacto clínico significativo no controle da asma, mas pode ser relevante em asma grave.',
    conduta: '✅ Monitorar controle da asma em uso combinado. Considerar ajuste de dose de zafirlucaste se controle for insuficiente. Em asma não controlada com teofilina, considerar troca para montelucaste (sem esta interação).'
  },

  // ─── TANSULOSINA ─────────────────────────────────────────────────────────────
  {
    med1: ['tansulosina','cloridrato de tansulosina','flomax','omnic'],
    med2: ['sildenafila','viagra','tadalafila','cialis','vardenafila','levitra','avanafila'],
    nivel: 'moderado',
    titulo: 'Tansulosina + Inibidores de PDE5 (Hipotensão Sintomática)',
    mecanismo: 'A tansulosina bloqueia receptores alfa-1A adrenérgicos na próstata e bexiga, causando vasodilatação periférica. Os inibidores de PDE5 promovem vasodilatação por via do GMPc. A combinação resulta em queda pressórica aditiva, especialmente postural.',
    efeito: 'Hipotensão ortostática sintomática — tontura, pré-síncope e síncope, especialmente nas primeiras horas após uso do inibidor de PDE5. Risco maior com tadalafila (meia-vida longa) e nas primeiras semanas de uso.',
    conduta: '⚠️ A associação é possível com precaução. Iniciar inibidor de PDE5 na menor dose disponível. Orientar o paciente a não usar logo após levantar e a sentar-se caso sinta tontura. Monitorar pressão arterial. Com vardenafila: a combinação com tansulosina é explicitamente contraindicada em bula.'
  },
  {
    med1: ['tansulosina','cloridrato de tansulosina','flomax','omnic'],
    med2: ['cetoconazol','ketoconazol','itraconazol','voriconazol','claritromicina','ritonavir'],
    nivel: 'moderado',
    titulo: 'Tansulosina + Inibidores Fortes CYP3A4 (Aumento de Exposição)',
    mecanismo: 'A tansulosina é metabolizada por CYP3A4 e CYP2D6. Inibidores potentes de CYP3A4 reduzem seu clearance, podendo elevar a AUC em 2–3 vezes com cetoconazol.',
    efeito: 'Hipotensão aumentada, tontura, palpitações e risco de síncope por vasodilatação excessiva.',
    conduta: '⚠️ Evitar coadministração com inibidores fortes de CYP3A4. Se necessário, monitorar pressão arterial e sintomas posturais. Preferir alternativa antifúngica com menor inibição de CYP3A4 (fluconazol tópico, nistatina).'
  },
  {
    med1: ['tansulosina','cloridrato de tansulosina','flomax','omnic'],
    med2: ['fluoxetina','paroxetina','cimetidina'],
    nivel: 'leve',
    titulo: 'Tansulosina + Inibidores CYP2D6/Cimetidina (Aumento de Nível)',
    mecanismo: 'Fluoxetina e paroxetina inibem CYP2D6 (via metabólica secundária da tansulosina). A cimetidina inibe CYP2D6 e a secreção tubular renal. Em combinação, os níveis de tansulosina podem aumentar modestamente.',
    efeito: 'Leve aumento da exposição à tansulosina — hipotensão postural discreta, tontura. Clinicamente relevante principalmente em pacientes com hipotensão basal.',
    conduta: '✅ Geralmente sem necessidade de ajuste. Monitorar sintomas posturais ao iniciar a associação. Preferir ranitidina, famotidina ou IBP como alternativa à cimetidina.'
  },

  // ─── HIDRALAZINA ─────────────────────────────────────────────────────────────
  {
    med1: ['hidralazina','hydralazine','apresolina'],
    med2: ['diazóxido','minoxidil','nitratos','nitroglicerina','nitroprussiato'],
    nivel: 'moderado',
    titulo: 'Hidralazina + Outros Vasodilatadores (Hipotensão Aditiva)',
    mecanismo: 'Todos os vasodilatadores diretos compartilham o mecanismo de relaxamento da musculatura lisa vascular. A combinação de hidralazina com outros agentes vasodilatadores produz queda pressórica aditiva e taquicardia reflexa.',
    efeito: 'Hipotensão grave, taquicardia reflexa excessiva, tontura e síncope. Risco aumentado em pacientes com volume circulante reduzido.',
    conduta: '⚠️ Monitorar pressão arterial e frequência cardíaca. Em ICC refratária, a combinação hidralazina + nitrato é estratégia validada (estudo A-HeFT) — neste contexto o benefício supera o risco com titulação cuidadosa. Titular a partir das menores doses.'
  },
  {
    med1: ['hidralazina','hydralazine','apresolina'],
    med2: ['ibuprofeno','diclofenaco','naproxeno','cetoprofeno','meloxicam','celecoxibe','aine','anti-inflamatório'],
    nivel: 'moderado',
    titulo: 'Hidralazina + AINEs (Redução do Efeito Anti-hipertensivo)',
    mecanismo: 'Os AINEs inibem a síntese de prostaglandinas vasodilatadoras renais (PGE2, PGI2), causando retenção de sódio e água e vasoconstricção. Este efeito antagoniza diretamente a vasodilatação mediada pela hidralazina.',
    efeito: 'Perda parcial ou total do controle da pressão arterial. Risco de IRA aguda por redução do fluxo renal em pacientes com doença renal crônica ou insuficiência cardíaca.',
    conduta: '⚠️ Evitar uso regular de AINEs em hipertensos. Se analgesia necessária, preferir paracetamol. Monitorar a pressão arterial ao introduzir AINE. Avaliar função renal periodicamente.'
  },
  {
    med1: ['hidralazina','hydralazine','apresolina'],
    med2: ['inibidor mao','imao','fenelzina','tranilcipromina','moclobemida'],
    nivel: 'moderado',
    titulo: 'Hidralazina + IMAOs (Hipotensão Grave)',
    mecanismo: 'Os IMAOs inibem a degradação de catecolaminas e potencializam a vasodilatação periférica. Combinados com hidralazina, causam hipotensão sinérgica por mecanismos complementares.',
    efeito: 'Hipotensão grave, colapso hemodinâmico, tontura intensa e síncope.',
    conduta: '⚠️ Evitar combinação. Se necessária, iniciar hidralazina com dose mínima e monitorar pressão arterial em posição supina e ortostática. Ter disponibilidade de fluidos IV para correção de hipotensão grave.'
  },

  // ─── SULPIRIDA ───────────────────────────────────────────────────────────────
  {
    med1: ['sulpirida','sulpiride','dogmatil','equilid'],
    med2: ['amiodarona','sotalol','dronedarona','haloperidol','clorpromazina','tioridazina','ziprasidona','metadona','ciprofloxacino','levofloxacino','moxifloxacino','azitromicina','domperidona'],
    nivel: 'moderado',
    titulo: 'Sulpirida + Fármacos que Prolongam QTc (Risco de Torsades de Pointes)',
    mecanismo: 'A sulpirida bloqueia receptores D2 dopaminérgicos e tem efeito intrínseco sobre canais de potássio cardíacos (bloqueio de IKr), prolongando o intervalo QTc. A combinação com outros fármacos que prolongam o QT é aditiva.',
    efeito: 'Prolongamento excessivo do QTc (>500 ms) com risco de torsades de pointes e morte súbita. O risco é maior em mulheres, hipocalemia e bradicardia.',
    conduta: '⚠️ Realizar ECG basal e periódico. Corrigir hipocalemia e hipomagnesemia. Evitar combinação com outros antipsicóticos ou agentes que prolongam QT. Suspender se QTc >500 ms.'
  },
  {
    med1: ['sulpirida','sulpiride','dogmatil','equilid'],
    med2: ['levodopa','carbidopa','pramipexol','ropinirol','bromocriptina','cabergolina'],
    nivel: 'moderado',
    titulo: 'Sulpirida + Agonistas Dopaminérgicos (Antagonismo Terapêutico)',
    mecanismo: 'A sulpirida bloqueia receptores D2 dopaminérgicos de forma seletiva. Os agonistas dopaminérgicos usados no Parkinson e hiperprolactinemia estimulam justamente estes receptores. Há antagonismo farmacológico direto.',
    efeito: 'Redução da eficácia dos agonistas dopaminérgicos — piora do Parkinson (rigidez, tremor, bradicinesia) e elevação da prolactina com retorno de galactorreia ou amenorreia.',
    conduta: '🚫 Contraindicado em pacientes com Parkinson. Em hiperprolactinemia tratada com cabergolina/bromocriptina, evitar sulpirida. Considerar antipsicótico alternativo com menor bloqueio D2 (quetiapina, clozapina) se antipsicótico for imprescindível no Parkinson.'
  },
  {
    med1: ['sulpirida','sulpiride','dogmatil','equilid'],
    med2: ['antiácido','hidróxido de magnésio','hidróxido de alumínio','sucralfato'],
    nivel: 'leve',
    titulo: 'Sulpirida + Antiácidos (Redução de Absorção)',
    mecanismo: 'Os antiácidos à base de hidróxido de alumínio ou magnésio e o sucralfato reduzem a absorção oral da sulpirida por adsorção e aumento do pH gástrico, diminuindo sua biodisponibilidade em até 40%.',
    efeito: 'Redução dos níveis plasmáticos de sulpirida, com possível perda parcial de eficácia antipsicótica ou antiemética.',
    conduta: '✅ Espaçar a sulpirida e antiácidos por pelo menos 2 horas. Preferir IBP ou bloqueador H2 como alternativa antiácida de longo prazo se necessário.'
  },

  // ─── DROPERIDOL ──────────────────────────────────────────────────────────────
  {
    med1: ['droperidol','inapsine'],
    med2: ['amiodarona','sotalol','haloperidol','clorpromazina','tioridazina','ziprasidona','quetiapina','metadona','ciprofloxacino','moxifloxacino','azitromicina','ondansetrona','domperidona','cisaprida'],
    nivel: 'grave',
    titulo: 'Droperidol + Fármacos que Prolongam QTc (Torsades de Pointes — Contraindicado)',
    mecanismo: 'O droperidol é um butirofenona com potente bloqueio de canais de potássio cardíacos (IKr/hERG), causando prolongamento significativo do QTc. A combinação com outros agentes que prolongam o QT amplifica o risco de forma aditiva e potencialmente sinérgica.',
    efeito: 'Torsades de pointes, fibrilação ventricular e morte súbita. Casos fatais levaram ao acréscimo de black box warning pela FDA. O risco é dose-dependente e maior em mulheres, hipocalemia e insuficiência cardíaca.',
    conduta: '🚫 Contraindicado com outros prolongadores de QT. Realizar ECG antes da administração (QTc basal >440 ms em homens ou >450 ms em mulheres contraindica o droperidol). Monitorar ECG por 2–3 horas após administração. Corrigir eletrólitos antes do uso.'
  },
  {
    med1: ['droperidol','inapsine'],
    med2: ['depressor snc','álcool','opioide','fentanila','morfina','tramadol','benzodiazepínico','midazolam','diazepam','clonazepam','propofol','cetamina'],
    nivel: 'moderado',
    titulo: 'Droperidol + Depressores do SNC (Sedação e Depressão Respiratória Aditivas)',
    mecanismo: 'O droperidol tem efeito depressor do SNC via bloqueio dopaminérgico e antagonismo alfa-adrenérgico. A combinação com opioides, benzodiazepínicos e outros anestésicos amplifica a depressão neurológica e respiratória de forma aditiva.',
    efeito: 'Sedação profunda, depressão respiratória, apneia e hipotensão. Em contexto perioperatório, é combinação intencionalmente usada — o risco é de subdosagem ou superdosagem por interação imprevista.',
    conduta: '⚠️ Em contexto de sedação/anestesia: reduzir doses de ambos os agentes. Monitorar ventilação e oximetria continuamente. Ter antagonistas disponíveis (naloxona para opioides, flumazenil para benzodiazepínicos). Em uso off-label como antiemético em pronto-socorro: evitar associação não monitorizada.'
  },

  // ─── HIDROXIZINA ─────────────────────────────────────────────────────────────
  {
    med1: ['hidroxizina','cloridrato de hidroxizina','atarax','ucerax'],
    med2: ['álcool','benzodiazepínico','opioide','barbitúrico','antidepressivo tricíclico','mirtazapina','quetiapina','clonazepam','diazepam','alprazolam','morfina','codeína'],
    nivel: 'moderado',
    titulo: 'Hidroxizina + Depressores do SNC (Sedação Aditiva)',
    mecanismo: 'A hidroxizina é antagonista H1 de primeira geração com penetração no SNC. Depressores do SNC (benzodiazepínicos, opioides, álcool, antidepressivos sedativos) amplificam seu efeito sedativo por ação aditiva sobre diferentes receptores.',
    efeito: 'Sedação excessiva, déficit cognitivo, comprometimento psicomotor, depressão respiratória em doses elevadas. Risco aumentado de quedas em idosos.',
    conduta: '⚠️ Iniciar com doses baixas. Orientar sobre prejuízo na condução de veículos e operação de máquinas. Evitar álcool. Em idosos: preferir alternativas com menor penetração no SNC (cetirizina, loratadina para alergias). Monitorar sedação e função respiratória.'
  },
  {
    med1: ['hidroxizina','cloridrato de hidroxizina','atarax','ucerax'],
    med2: ['amiodarona','sotalol','haloperidol','tioridazina','clorpromazina','metadona','ciprofloxacino','moxifloxacino','azitromicina','eritromicina'],
    nivel: 'moderado',
    titulo: 'Hidroxizina + Fármacos que Prolongam QTc',
    mecanismo: 'A hidroxizina bloqueia canais de potássio cardíacos (IKr/hERG) de forma concentração-dependente, prolongando o QTc. A combinação com outros prolongadores de QT produz efeito aditivo sobre a repolarização ventricular.',
    efeito: 'Prolongamento do QTc com risco de torsades de pointes. O risco é especialmente relevante em doses elevadas de hidroxizina (>50 mg), hipocalemia, insuficiência cardíaca e em idosos.',
    conduta: '⚠️ ECG basal em pacientes com fatores de risco cardiovascular antes de iniciar hidroxizina em doses ≥50 mg. Evitar combinação com outros QT-prolongadores. Corrigir hipocalemia e hipomagnesemia. Usar a menor dose eficaz pelo menor tempo necessário.'
  },
  {
    med1: ['hidroxizina','cloridrato de hidroxizina','atarax','ucerax'],
    med2: ['inibidor mao','imao','fenelzina','tranilcipromina','selegilina','moclobemida'],
    nivel: 'moderado',
    titulo: 'Hidroxizina + IMAOs (Potencialização Anticolinérgica e Sedação)',
    mecanismo: 'Os IMAOs potencializam os efeitos anticolinérgicos e sedativos dos anti-histamínicos H1 ao inibir a degradação de acetilcolina e neurotransmissores monoaminérgicos. A hidroxizina, com sua carga anticolinérgica intrínseca, tem seus efeitos amplificados.',
    efeito: 'Sedação excessiva, confusão mental, retenção urinária, constipação, visão turva e potencial crise hipertensiva paradoxal por efeito adrenérgico residual.',
    conduta: '⚠️ Evitar combinação. Se uso for imprescindível, iniciar com dose mínima e monitorar pressão arterial, estado mental e sinais anticolinérgicos. Washout de 14 dias após suspensão do IMAO é prudente.'
  },

  // ─── CLORDIAZEPÓXIDO ─────────────────────────────────────────────────────────
  {
    med1: ['clordiazepóxido','clordiazepoxido','librium'],
    med2: ['álcool','opioide','barbitúrico','morfina','codeína','fentanila','fenobarbital','quetiapina','mirtazapina'],
    nivel: 'grave',
    titulo: 'Clordiazepóxido + Depressores do SNC / Álcool (Depressão Respiratória)',
    mecanismo: 'O clordiazepóxido potencializa o GABA no SNC (agonista de receptor GABA-A). Depressores do SNC e álcool atuam por mecanismos complementares — opioides via receptores µ, barbitúricos via GABA-A (sítio diferente), álcool via múltiplos canais. A combinação é sinérgica.',
    efeito: 'Depressão respiratória grave, coma, morte. Risco especialmente elevado com opioides — combinação responsável pela maioria das mortes por overdose intencional e não-intencional de benzodiazepínicos.',
    conduta: '🚫 Evitar combinação com opioides e álcool. Se uso concomitante for imprescindível: monitorização contínua da oximetria, ter naloxona disponível para o componente opioide, e flumazenil para o benzodiazepínico. Orientar enfaticamente sobre o risco de consumo de álcool.'
  },
  {
    med1: ['clordiazepóxido','clordiazepoxido','librium'],
    med2: ['fluconazol','itraconazol','cetoconazol','ketoconazol','eritromicina','cimetidina'],
    nivel: 'moderado',
    titulo: 'Clordiazepóxido + Inibidores CYP3A4 (Aumento de Exposição — Sedação Prolongada)',
    mecanismo: 'O clordiazepóxido é metabolizado por CYP3A4 a metabólitos ativos (desmetilclordiazepóxido, demoxepam) que têm meia-vida longa. Inibidores de CYP3A4 reduzem o clearance do fármaco pai e de seus metabólitos, acumulando efeito sedativo.',
    efeito: 'Sedação prolongada e excessiva, ataxia, confusão mental, comprometimento da memória. Em idosos: risco de quedas e delirium.',
    conduta: '⚠️ Monitorar sedação ao introduzir inibidor de CYP3A4. Considerar redução de dose de clordiazepóxido ou substituição por oxazepam/lorazepam (conjugação direta, sem dependência de CYP3A4). Preferir ranitidina ou IBP no lugar da cimetidina.'
  },

  // ─── TIBOLONA ────────────────────────────────────────────────────────────────
  {
    med1: ['tibolona','livial'],
    med2: ['warfarina','varfarina','acenocumarol','sintrom'],
    nivel: 'moderado',
    titulo: 'Tibolona + Anticoagulantes Cumarínicos (Redução do RNI)',
    mecanismo: 'A tibolona e seus metabólitos têm atividade androgênica e estrogênica mista. O componente estrogênico aumenta a síntese de fatores de coagulação hepáticos, tendendo a reduzir o efeito da warfarina. Adicionalmente, a tibolona pode alterar o metabolismo hepático da warfarina via CYP.',
    efeito: 'Queda do RNI com risco de inadequação da anticoagulação — risco trombótico. A direção oposta (elevação do RNI) também foi descrita em casos isolados, tornando o efeito imprevisível.',
    conduta: '⚠️ Monitorar RNI com maior frequência ao iniciar ou suspender tibolona. Ajustar dose de anticoagulante conforme necessário. Informar o paciente sobre sinais de trombose e sangramento.'
  },
  {
    med1: ['tibolona','livial'],
    med2: ['rifampicina','rifampin','carbamazepina','fenitoína','fenobarbital'],
    nivel: 'moderado',
    titulo: 'Tibolona + Indutores Enzimáticos CYP3A4 (Redução de Eficácia)',
    mecanismo: 'A tibolona é extensamente metabolizada por CYP3A4. Indutores potentes desta isoenzima aumentam seu clearance, reduzindo significativamente os níveis plasmáticos dos metabólitos ativos.',
    efeito: 'Perda de eficácia do tratamento de sintomas do climatério (fogachos, ressecamento vaginal) e da ação preventiva sobre a densidade óssea.',
    conduta: '⚠️ Evitar combinação com rifampicina. Com antiepilépticos indutores (carbamazepina, fenitoína): considerar alternativa hormonal não dependente de CYP3A4 ou troca para antiepiléptico não-indutor (levetiracetam, lamotrigina).'
  },
  {
    med1: ['tibolona','livial'],
    med2: ['tamoxifeno','letrozol','anastrozol','exemestano'],
    nivel: 'grave',
    titulo: 'Tibolona + Terapia Hormonal para Câncer de Mama (Antagonismo — Contraindicado)',
    mecanismo: 'A tibolona possui atividade estrogênica intrínseca via seus metabólitos. Em mulheres com câncer de mama hormônio receptor-positivo em tratamento com tamoxifeno (SERM anti-estrogênico) ou inibidores de aromatase, a atividade estrogênica da tibolona antagoniza diretamente a terapia oncológica.',
    efeito: 'Estimulação estrogênica de células tumorais residuais — potencial aumento do risco de recorrência do câncer de mama. O estudo LIBERATE demonstrou maior recorrência de câncer de mama em pacientes usando tibolona com histórico de câncer.',
    conduta: '🚫 Contraindicado em mulheres com histórico de câncer de mama ou em uso de tamoxifeno/inibidores de aromatase. Para sintomas do climatério neste contexto, considerar alternativas não-hormonais (venlafaxina para fogachos, lubrificantes vaginais).'
  },

  // ─── TESTOSTERONA ────────────────────────────────────────────────────────────
  {
    med1: ['testosterona','testosterona cipionato','testosterona enantato','testosterona undecanoato','androgel','nebido'],
    med2: ['warfarina','varfarina','acenocumarol','sintrom'],
    nivel: 'moderado',
    titulo: 'Testosterona + Anticoagulantes Cumarínicos (Potencialização do Efeito)',
    mecanismo: 'Os androgênios reduzem a síntese hepática dos fatores de coagulação dependentes de vitamina K (II, VII, IX, X) e podem alterar o metabolismo hepático da warfarina via CYP2C9. O efeito líquido é uma potencialização do anticoagulante.',
    efeito: 'Elevação do RNI com risco de sangramento. A interação é clinicamente relevante e descrita em bula — o início de testosterona em pacientes anticoagulados pode levar a elevação marcada e rápida do RNI.',
    conduta: '⚠️ Monitorar RNI semanalmente nas primeiras 4–6 semanas após início da testosterona. Reduzir dose de warfarina proativamente em ~25–30% ao iniciar testosterona. Ajustar conforme resposta clínica. O mesmo cuidado se aplica à suspensão da testosterona (RNI pode cair).'
  },
  {
    med1: ['testosterona','testosterona cipionato','testosterona enantato','androgel','nebido'],
    med2: ['insulina','insulina nph','insulina glargina','insulina asparte','glibenclamida','glicazida','glimepirida','metformina'],
    nivel: 'moderado',
    titulo: 'Testosterona + Antidiabéticos (Potencialização Hipoglicêmica)',
    mecanismo: 'A testosterona aumenta a sensibilidade à insulina e promove captação de glicose pelo músculo esquelético. Em diabéticos em uso de insulina ou secretagogos, esta melhora da sensibilidade pode resultar em hipoglicemia se as doses não forem reajustadas.',
    efeito: 'Hipoglicemia, especialmente nas primeiras semanas de reposição de testosterona. O efeito é benéfico para o controle glicêmico a longo prazo, mas exige monitoramento no período de adaptação.',
    conduta: '⚠️ Monitorar glicemia com maior frequência ao iniciar testosterona em diabéticos. Pode ser necessário reduzir doses de insulina ou secretagogos. O benefício metabólico da normalização da testosterona em hipogonadismo é real — não contraindicar, mas ajustar o esquema hipoglicemiante.'
  },
  {
    med1: ['testosterona','testosterona cipionato','testosterona enantato','androgel','nebido'],
    med2: ['corticosteroide','prednisona','prednisolona','dexametasona','hidrocortisona','betametasona'],
    nivel: 'leve',
    titulo: 'Testosterona + Corticosteroides (Edema e Retenção Hídrica Aditivos)',
    mecanismo: 'Tanto a testosterona quanto os corticosteroides causam retenção de sódio e água por mecanismos distintos (androgênio via receptores androgênicos renais; corticosteroide via receptor mineralocorticoide). A combinação amplifica a retenção hídrica.',
    efeito: 'Edema periférico, elevação da pressão arterial, exacerbação de insuficiência cardíaca. Em homens com ICC, a associação requer monitoramento rigoroso.',
    conduta: '⚠️ Monitorar peso, pressão arterial e sinais de edema. Em pacientes com ICC ou hipertensão mal controlada, reavaliar a necessidade da combinação. Reduzir a dose de corticosteroide ao mínimo necessário.'
  },

  // ─── TERIPARATIDA ────────────────────────────────────────────────────────────
  {
    med1: ['teriparatida','pth 1-34','forteo'],
    med2: ['digoxina','digitoxina'],
    nivel: 'moderado',
    titulo: 'Teriparatida + Digoxina (Hipercalcemia → Toxicidade Digitálica)',
    mecanismo: 'A teriparatida eleva transitoriamente o cálcio sérico (hipercalcemia aguda nas horas após injeção). A hipercalcemia potencia a toxicidade da digoxina ao aumentar a afinidade do glicosídeo pela Na-K-ATPase miocárdica, reduzindo o limiar de arritmias.',
    efeito: 'Arritmias digitálicas (extrassístoles, bigeminismo, bloqueio AV) associadas aos picos de calcemia pós-injeção de teriparatida.',
    conduta: '⚠️ Monitorar calcemia e ECG periodicamente. Preferir administrar teriparatida quando o paciente não estiver em uso de digoxina, ou discutir com o cardiologista a necessidade de reduzir a dose de digoxina. Monitorar sinais de toxicidade digitálica (náusea, visão amarelada, bradiarritmias).'
  },
  {
    med1: ['teriparatida','pth 1-34','forteo'],
    med2: ['calcitriol','alfacalcidol','vitamina d ativa','rocaltrol'],
    nivel: 'moderado',
    titulo: 'Teriparatida + Calcitriol / Vitamina D Ativa (Hipercalcemia Aditiva)',
    mecanismo: 'A teriparatida estimula a produção renal de calcitriol (1,25-OH vitamina D) e aumenta a absorção intestinal de cálcio. O calcitriol exógeno soma este efeito, podendo causar hipercalcemia clinicamente relevante.',
    efeito: 'Hipercalcemia: náuseas, poliúria, nefrolitíase, calcificação de tecidos moles, arritmias em casos graves. Confusão mental em idosos.',
    conduta: '⚠️ Monitorar calcemia e calciúria de 24h ao iniciar teriparatida em pacientes já usando calcitriol. Pode ser necessário reduzir ou suspender o calcitriol. Manter ingestão hídrica adequada. Suplementação de cálcio elementar (500–1.000 mg/dia) é suficiente na maioria dos pacientes em teriparatida sem necessidade de calcitriol.'
  },

  // ─── RALOXIFENO ──────────────────────────────────────────────────────────────
  {
    med1: ['raloxifeno','cloridrato de raloxifeno','evista'],
    med2: ['warfarina','varfarina','acenocumarol','sintrom'],
    nivel: 'moderado',
    titulo: 'Raloxifeno + Anticoagulantes Cumarínicos (Redução do RNI)',
    mecanismo: 'O raloxifeno compete com a warfarina pela ligação a proteínas plasmáticas e pode reduzir modestamente o RNI por mecanismo ainda não completamente esclarecido — possivelmente relacionado à sua atividade parcialmente estrogênica sobre a síntese de fatores de coagulação hepáticos.',
    efeito: 'Redução do RNI em 10% com o estudo de warfarina; o efeito é modesto mas pode ser clinicamente relevante em pacientes com anticoagulação difícil de controlar. Risco de subcoagulação.',
    conduta: '⚠️ Monitorar RNI ao iniciar ou suspender raloxifeno. Ajustar dose de warfarina se necessário. Informar o paciente sobre a interação e os sinais de tromboembolismo (dor em panturrilha, dispneia).'
  },
  {
    med1: ['raloxifeno','cloridrato de raloxifeno','evista'],
    med2: ['colestiramina','questran'],
    nivel: 'moderado',
    titulo: 'Raloxifeno + Colestiramina (Redução de Absorção em 60%)',
    mecanismo: 'A colestiramina, resina sequestrador de ácidos biliares, liga-se ao raloxifeno no trato gastrointestinal, impedindo sua absorção e circulação entero-hepática. A biodisponibilidade do raloxifeno é reduzida em aproximadamente 60%.',
    efeito: 'Redução marcante da eficácia do raloxifeno na prevenção e tratamento da osteoporose e na redução do risco de câncer de mama.',
    conduta: '⚠️ Não coadministrar. Espaçar os dois fármacos por pelo menos 4–6 horas. Idealmente, evitar o uso combinado crônico — considerar estatina ou ezetimiba no lugar da colestiramina para controle lipídico em pacientes usando raloxifeno.'
  },
  {
    med1: ['raloxifeno','cloridrato de raloxifeno','evista'],
    med2: ['estrogênio','estradiol','estriol','conjugated estrogens','premarin','tibolona'],
    nivel: 'grave',
    titulo: 'Raloxifeno + Estrogênios (Antagonismo Farmacológico — Contraindicado)',
    mecanismo: 'O raloxifeno é um modulador seletivo do receptor de estrogênio (SERM) com atividade antagonista no tecido mamário e uterino. A administração simultânea de estrogênios exógenos compete pelos mesmos receptores e antagoniza os efeitos preventivos do raloxifeno sobre câncer de mama.',
    efeito: 'Perda da eficácia protetora do raloxifeno contra câncer de mama. Adicionalmente, a combinação promove estimulação endometrial não antagonizada, aumentando o risco de hiperplasia e carcinoma endometrial.',
    conduta: '🚫 Contraindicado. Raloxifeno não deve ser usado concomitantemente com nenhuma forma de estrogênio sistêmico. Se a paciente precisar de alívio de sintomas vasomotores intensos, discutir estratégias alternativas com o ginecologista.'
  },

  // ─── MESALAZINA ──────────────────────────────────────────────────────────────
  {
    med1: ['mesalazina','mesalamine','pentasa','asacol','mezavant'],
    med2: ['azatioprina','imuran','mercaptopurina','purinethol'],
    nivel: 'moderado',
    titulo: 'Mesalazina + Azatioprina / 6-Mercaptopurina (Inibição de TPMT — Mielossupressão)',
    mecanismo: 'A mesalazina (5-ASA) e seus metabólitos inibem a tiopurina metiltransferase (TPMT), a enzima responsável pela inativação da 6-tioguanina (metabólito citotóxico da azatioprina). A inibição resulta em acúmulo de 6-TGN — elevando o risco de toxicidade hematológica.',
    efeito: 'Leucopenia, trombocitopenia e anemia — às vezes grave. O efeito é análogo ao que ocorre com a sulfassalazina e é mais pronunciado em indivíduos com atividade basal reduzida de TPMT (metabolizadores intermediários ou lentos).',
    conduta: '⚠️ Monitorar hemograma mensalmente. Considerar genotipagem ou fenotipagem de TPMT antes de combinar. Reduzir dose de azatioprina em 25–50% ao associar mesalazina. Esta combinação é usada na doença de Crohn — o benefício pode superar o risco com monitoramento adequado.'
  },
  {
    med1: ['mesalazina','mesalamine','pentasa','asacol'],
    med2: ['lactulose','laxante osmótico'],
    nivel: 'leve',
    titulo: 'Mesalazina + Lactulose (Redução da Liberação Colônica)',
    mecanismo: 'Formulações de mesalazina com liberação pH-dependente requerem pH colônico básico para liberar o fármaco. A lactulose produz ácidos orgânicos (ácido láctico, ácido acético) pela fermentação bacteriana, acidificando o lúmen colônico e reduzindo a dissolução das formulações de mesalazina com cobertura entérica.',
    efeito: 'Redução da biodisponibilidade colônica da mesalazina — potencial perda de eficácia no tratamento de colite ulcerativa.',
    conduta: '✅ Preferir formulações de mesalazina com liberação por tempo ou pressão (ex: Pentasa® multimatrix) ao invés das pH-dependentes quando lactulose for necessária. Se não for possível trocar a formulação, monitorar resposta clínica e endoscópica.'
  },

  // ─── TOXINA BOTULÍNICA ───────────────────────────────────────────────────────
  {
    med1: ['toxina botulínica','toxina botulinica','botox','dysport','xeomin','botulinum toxin'],
    med2: ['amicacina','gentamicina','tobramicina','estreptomicina','neomicina','aminoglicosídeo'],
    nivel: 'moderado',
    titulo: 'Toxina Botulínica + Aminoglicosídeos (Potencialização do Bloqueio Neuromuscular)',
    mecanismo: 'Os aminoglicosídeos inibem a liberação de acetilcolina na junção neuromuscular (interferência com a entrada de Ca²⁺ pré-sináptico). A toxina botulínica bloqueia a exocitose de vesículas de acetilcolina. Os mecanismos são complementares — produzindo bloqueio neuromuscular aditivo.',
    efeito: 'Fraqueza muscular generalizada mais intensa do que o esperado, disfagia, dispneia e, em casos graves, insuficiência respiratória por paralisia dos músculos respiratórios.',
    conduta: '⚠️ Evitar aminoglicosídeos sistêmicos nas semanas antes e após aplicação de toxina botulínica. Monitorar força muscular, deglutição e função respiratória. Em pacientes que requerem aminoglicosídeo por infecção grave, postergar a aplicação da toxina ou reduzir a dose.'
  },
  {
    med1: ['toxina botulínica','toxina botulinica','botox','dysport','xeomin'],
    med2: ['bloqueador neuromuscular','vecurônio','rocurônio','atracúrio','pancurônio','succinilcolina'],
    nivel: 'grave',
    titulo: 'Toxina Botulínica + Bloqueadores Neuromusculares (Paralisia Potencializada)',
    mecanismo: 'Os bloqueadores neuromusculares competitivos (vecurônio, rocurônio) e despolarizantes (succinilcolina) atuam na placa motora — o mesmo local onde a toxina botulínica bloqueia a liberação de acetilcolina. A combinação resulta em bloqueio neuromuscular profundo e prolongado.',
    efeito: 'Paralisia neuromuscular muito prolongada com necessidade de ventilação mecânica por período estendido. Recuperação da função neuromuscular significativamente atrasada após o procedimento anestésico.',
    conduta: '⚠️ Informar o anestesiologista sobre o uso recente de toxina botulínica antes de qualquer cirurgia. Reduzir a dose de bloqueador neuromuscular e monitorar com neuroestimulador (train-of-four). Ter disponibilidade de sugamadex para reversão de rocurônio/vecurônio.'
  },

  // ─── COLESEVELAM ─────────────────────────────────────────────────────────────
  {
    med1: ['colesevelam','welchol'],
    med2: ['levotiroxina','tiroxina','synthroid','puran','euthyrox'],
    nivel: 'moderado',
    titulo: 'Colesevelam + Levotiroxina (Redução de Absorção — Hipotireoidismo)',
    mecanismo: 'O colesevelam, como resina sequestrador de ácidos biliares, liga-se à levotiroxina no trato gastrointestinal impedindo sua absorção. Em estudos, o colesevelam reduz a absorção de levotiroxina de forma clinicamente relevante.',
    efeito: 'Redução dos níveis séricos de T4 livre e T3 com piora do hipotireoidismo — fadiga, ganho de peso, constipação, intolerância ao frio. TSH pode elevar-se mesmo sem mudança de dose de levotiroxina.',
    conduta: '⚠️ Administrar levotiroxina ≥4 horas antes do colesevelam. Monitorar TSH 6–8 semanas após início do colesevelam. Pode ser necessário aumentar a dose de levotiroxina. O ajuste inverso é necessário ao suspender o colesevelam.'
  },
  {
    med1: ['colesevelam','welchol'],
    med2: ['fenitoína','hidantal','carbamazepina','tegretol','ciclosporina','sandimmun','etinilestradiol','anticoncepcional oral'],
    nivel: 'moderado',
    titulo: 'Colesevelam + Múltiplos Fármacos (Adsorção Intestinal — Redução de Absorção)',
    mecanismo: 'O colesevelam adsorve fármacos lipofílicos e de circulação entero-hepática no lúmen intestinal, reduzindo sua absorção. Fenitoína, carbamazepina, ciclosporina e contraceptivos orais (etinilestradiol) têm biodisponibilidade reduzida de forma clínica e farmacocineticamente significativa.',
    efeito: 'Redução dos níveis plasmáticos com risco de falha terapêutica — crises epilépticas com antiepilépticos, rejeição de transplante com ciclosporina, gestação não planejada com contraceptivos orais.',
    conduta: '⚠️ Administrar todos os fármacos orais ≥4 horas antes do colesevelam, preferencialmente com monitoramento de níveis séricos quando disponível. Para anticoncepção: considerar método de barreira adicional. Com ciclosporina: monitorar nível sérico com maior frequência.'
  },
  {
    med1: ['colesevelam','welchol'],
    med2: ['warfarina','varfarina','acenocumarol'],
    nivel: 'leve',
    titulo: 'Colesevelam + Warfarina (Redução de Absorção de Vitamina K — Variação Imprevisível)',
    mecanismo: 'O colesevelam reduz a absorção de vitamina K lipossolúvel ao sequestrá-la junto com os ácidos biliares, potencialmente aumentando o RNI. Paradoxalmente, pode também reduzir a absorção da própria warfarina se administrados próximos. O efeito líquido é variável entre pacientes.',
    efeito: 'Instabilidade do RNI — elevação ou queda dependendo do balanço entre menor absorção de warfarina e menor absorção de vitamina K.',
    conduta: '⚠️ Monitorar RNI com maior frequência ao iniciar colesevelam. Administrar warfarina ≥4 horas antes do colesevelam para minimizar a interação. Manter ingestão de vitamina K estável.'
  },

  // ─── FEXOFENADINA ────────────────────────────────────────────────────────────
  {
    med1: ['fexofenadina','allegra','fexofenadine'],
    med2: ['eritromicina','claritromicina','cetoconazol','ketoconazol','itraconazol'],
    nivel: 'moderado',
    titulo: 'Fexofenadina + Eritromicina / Cetoconazol (Inibição P-gp e OATP — Aumento de Nível)',
    mecanismo: 'A fexofenadina é substrato de P-glicoproteína (P-gp) intestinal e dos transportadores OATP1A2/OATP2B1. A eritromicina inibe P-gp e aumenta a absorção intestinal da fexofenadina em ~82%. O cetoconazol inibe adicionalmente CYP3A4 e transportadores orgânicos. Nenhuma das interações envolve sedação significativa, mas aumenta exposição.',
    efeito: 'Elevação de 2–3 vezes nos níveis plasmáticos de fexofenadina. Em doses habituais, a fexofenadina tem perfil seguro mesmo com níveis elevados — mas o risco de prolongamento de QTc aumenta em doses muito altas em combinação com eritromicina.',
    conduta: '⚠️ Evitar doses supraterapêuticas de fexofenadina em uso combinado. Monitorar ECG se fexofenadina + eritromicina em doses elevadas ou em pacientes com cardiopatia. A interação tem relevância clínica limitada em doses habituais (120–180 mg/dia).'
  },
  {
    med1: ['fexofenadina','allegra','fexofenadine'],
    med2: ['suco de maçã','suco de toranja','suco de laranja','grapefruit'],
    nivel: 'moderado',
    titulo: 'Fexofenadina + Sucos de Frutas (Redução de Absorção via OATP)',
    mecanismo: 'Sucos de maçã, toranja (grapefruit) e laranja inibem potentemente os transportadores OATP1A2 e OATP2B1 intestinais, responsáveis pela absorção ativa da fexofenadina. O suco de toranja reduz a AUC da fexofenadina em até 36–47%.',
    efeito: 'Redução significativa dos níveis plasmáticos de fexofenadina — potencial perda de controle de sintomas alérgicos (rinorreia, espirros, urticária).',
    conduta: '⚠️ Orientar o paciente a tomar fexofenadina com água, não com sucos de frutas. Espaçar o consumo de sucos por pelo menos 4 horas da tomada do comprimido. Esta é uma das raras interações fármaco-alimento que reduz (não aumenta) a absorção.'
  },

  // ─── TRIMETAZIDINA ───────────────────────────────────────────────────────────
  {
    med1: ['trimetazidina','vastarel','preductal'],
    med2: ['levodopa','carbidopa','pramipexol','ropinirol','bromocriptina','amantadina'],
    nivel: 'moderado',
    titulo: 'Trimetazidina + Agentes Antiparkinsonianos (Antagonismo Dopaminérgico)',
    mecanismo: 'A trimetazidina é uma piperazina que pode causar parkinsonismo e síndrome das pernas inquietas ao interferir com a transmissão dopaminérgica central (mecanismo não completamente esclarecido, possivelmente inibição de DOPA descarboxilase). Combinada com antiparkinsonianos, pode antagonizar seu efeito ou mascarar a progressão da doença.',
    efeito: 'Piora dos sintomas parkinsonianos — aumento de tremor, rigidez e bradicinesia. Síndrome das pernas inquietas de difícil controle. Em alguns pacientes, a trimetazidina por si só pode induzir parkinsonismo reversível.',
    conduta: '⚠️ Evitar trimetazidina em pacientes com Parkinson ou síndrome das pernas inquietas. Monitorar sintomas motores em todos os pacientes em uso crônico. Suspender trimetazidina ao primeiro sinal de parkinsonismo ou síndrome das pernas inquietas — os sintomas são reversíveis após descontinuação (geralmente em 4 meses).'
  },
  {
    med1: ['trimetazidina','vastarel','preductal'],
    med2: ['metformina','glucoformin','glifage'],
    nivel: 'leve',
    titulo: 'Trimetazidina + Metformina (Possível Piora da Função Renal)',
    mecanismo: 'A trimetazidina é eliminada por via renal. Em pacientes com função renal limítrofe, a associação com metformina (que também requer função renal normal para segurança) pode aumentar o risco de acúmulo de ambos os fármacos.',
    efeito: 'Em insuficiência renal, acúmulo de trimetazidina pode potencializar parkinsonismo. Acúmulo de metformina aumenta risco de acidose láctica. O risco é pequeno em função renal normal.',
    conduta: '✅ Monitorar função renal periodicamente. Ajustar ou suspender ambos os fármacos se TFG < 45 mL/min (trimetazidina contraindicada em TFG <30, metformina em TFG <30–45 conforme protocolo).'
  },

  // ─── VILDAGLIPTINA / ALOGLIPTINA (DPP-4) ─────────────────────────────────────
  {
    med1: ['vildagliptina','galvus','alogliptina','nesina','saxagliptina','onglyza','sitagliptina','januvia','linagliptina','tradjenta'],
    med2: ['insulina','insulina nph','insulina glargina','insulina asparte','glibenclamida','glicazida','glimepirida'],
    nivel: 'moderado',
    titulo: 'Inibidores DPP-4 + Insulina / Sulfonilureias (Hipoglicemia Aditiva)',
    mecanismo: 'Os inibidores de DPP-4 potencializam a secreção de insulina induzida pela glicose ao prolongar a ação de GLP-1 e GIP endógenos. Em combinação com insulina exógena ou sulfonilureias (que estimulam a secreção de insulina de forma glicose-independente), o risco de hipoglicemia é aditivo.',
    efeito: 'Hipoglicemia sintomática, especialmente no período pós-prandial. Com sulfonilureias: risco de hipoglicemia em jejum também. O risco é menor do que com combinações de dois secretagogos, mas real.',
    conduta: '⚠️ Reduzir dose da sulfonilureia ou insulina em 20–25% ao iniciar inibidor DPP-4. Monitorar glicemia de jejum e pós-prandial mais frequentemente nas primeiras 4–6 semanas. Orientar paciente sobre reconhecimento e tratamento de hipoglicemia.'
  },
  {
    med1: ['vildagliptina','galvus','alogliptina','nesina'],
    med2: ['enalapril','lisinopril','ramipril','captopril','ieca','inibidor da eca'],
    nivel: 'leve',
    titulo: 'Inibidores DPP-4 + IECAs (Risco Aumentado de Angioedema)',
    mecanismo: 'Os IECAs reduzem a degradação de bradicinina, elevando seus níveis plasmáticos — já que a ECA é responsável pela inativação da bradicinina. Os inibidores de DPP-4 também inibem a degradação de alguns peptídeos vasoativos incluindo substratos relacionados à bradicinina, amplificando levemente o efeito do IECA.',
    efeito: 'Aumento do risco de angioedema — edema de face, língua, laringe e/ou intestinal. O risco é mais relevante com vildagliptina e saxagliptina do que com sitagliptina e linagliptina. A combinação amplifica o angioedema induzido pelo IECA, que por si só afeta 0,1–0,5% dos pacientes.',
    conduta: '⚠️ Monitorar para angioedema, especialmente nas primeiras semanas. Orientar o paciente a procurar emergência imediatamente em caso de edema de face ou dificuldade para engolir/respirar. Em pacientes com histórico de angioedema por IECA: evitar inibidores DPP-4, especialmente vildagliptina. Considerar BRA no lugar do IECA.'
  },

  // ─── CALCITRIOL ──────────────────────────────────────────────────────────────
  {
    med1: ['calcitriol','rocaltrol','calcijex','1,25-dihidroxivitamina d','alfacalcidol','uno alfa'],
    med2: ['hidroclorotiazida','clortalidona','indapamida','bendroflumetiazida','tiazídico'],
    nivel: 'moderado',
    titulo: 'Calcitriol + Diuréticos Tiazídicos (Hipercalcemia)',
    mecanismo: 'Os diuréticos tiazídicos aumentam a reabsorção tubular renal de cálcio (via inibição do co-transportador Na-Cl no túbulo distal, com reabsorção compensatória de cálcio). O calcitriol aumenta a absorção intestinal e a mobilização óssea de cálcio. Os efeitos somam-se.',
    efeito: 'Hipercalcemia com sintomas que variam de fraqueza e constipação (leve) a calcificação renal, nefrolitíase, arritmias e alteração do nível de consciência (grave). Síndrome leite-álcali em pacientes que também tomam suplemento de cálcio.',
    conduta: '⚠️ Monitorar calcemia periodicamente (a cada 3 meses em uso crônico). Orientar hidratação adequada. Ajustar a dose de calcitriol se hipercalcemia detectada. Considerar furosemida como alternativa diurética se hipercalcemia persistir — furosemida aumenta excreção de cálcio.'
  },
  {
    med1: ['calcitriol','rocaltrol','alfacalcidol'],
    med2: ['colestiramina','questran','colestipol','colesevelam'],
    nivel: 'moderado',
    titulo: 'Calcitriol + Sequestradores de Ácidos Biliares (Redução de Absorção)',
    mecanismo: 'Os sequestradores de ácidos biliares (colestiramina, colestipol, colesevelam) ligam-se a vitaminas lipossolúveis (A, D, E, K) e hormônios derivados delas no intestino, reduzindo sua absorção. A absorção do calcitriol e de outros metabólitos da vitamina D pode ser reduzida em até 40–50%.',
    efeito: 'Redução dos níveis séricos de calcitriol com piora da absorção intestinal de cálcio — hiocalcemia, hiperparatireoidismo secundário e piora da doença óssea (osteomalácia, raquitismo, doença renal óssea).',
    conduta: '⚠️ Administrar calcitriol pelo menos 2 horas antes ou 6 horas após o sequestrador de ácidos biliares. Monitorar calcemia e PTH periodicamente. Ajustar dose de calcitriol conforme necessário.'
  },

  // ─── MISOPROSTOL ─────────────────────────────────────────────────────────────
  {
    med1: ['misoprostol','cytotec'],
    med2: ['ocitocina','oxitocina','syntocinon','pitocin'],
    nivel: 'grave',
    titulo: 'Misoprostol + Ocitocina (Hipertonia Uterina — Contraindicado em Simultâneo)',
    mecanismo: 'O misoprostol (análogo da prostaglandina E1) e a ocitocina são uterotônicos de mecanismos distintos mas com efeito final complementar sobre a contratilidade uterina. A combinação simultânea produz tônus uterino excessivo.',
    efeito: 'Hipertonia uterina, taquissistolia, sofrimento fetal agudo por redução do fluxo uteroplacentário, rotura uterina (especialmente em úteros com cicatriz) e óbito fetal.',
    conduta: '🚫 Contraindicado uso simultâneo. Em protocolos de indução: usar misoprostol e ocitocina sequencialmente com intervalo mínimo de 4 horas. Monitorar cardiotocografia continuamente durante indução. Em caso de hipertonia: descontinuar uterotônico imediatamente e considerar tocolítico (terbutalina, nifedipina).'
  },
  {
    med1: ['misoprostol','cytotec'],
    med2: ['antiácido','hidróxido de magnésio','carbonato de cálcio','bicarbonato de sódio'],
    nivel: 'leve',
    titulo: 'Misoprostol + Antiácidos com Magnésio (Piora da Diarreia)',
    mecanismo: 'O misoprostol causa diarreia dose-dependente por estimulação da secreção de cloreto e inibição da absorção de sódio e água na mucosa intestinal. Os antiácidos à base de Mg²⁺ têm efeito laxativo intrínseco por osmose e estimulação da motilidade. Os efeitos somam-se.',
    efeito: 'Diarreia amplificada e mais prolongada — pode levar a desidratação, especialmente em idosos. A diarreia é já o principal efeito adverso limitante do misoprostol.',
    conduta: '⚠️ Evitar antiácidos à base de magnésio durante uso de misoprostol. Substituir por carbonato de cálcio ou IBP. Se diarreia grave: suspender temporariamente o misoprostol, garantir hidratação oral e eletrólitos.'
  },
  {
    med1: ['misoprostol','cytotec'],
    med2: ['ibuprofeno','indometacina','diclofenaco','naproxeno','aine'],
    nivel: 'moderado',
    titulo: 'Misoprostol + AINEs (Antagonismo do Efeito Gastroprotetor)',
    mecanismo: 'O misoprostol é prescrito para proteção gástrica em pacientes usando AINEs (os AINEs inibem PGE2 da mucosa gástrica). Paradoxalmente, os AINEs inibem a COX e reduzem a produção endógena de prostaglandinas que potencializam a ação do misoprostol. O efeito gastroprotetor do misoprostol pode ser parcialmente antagonizado pelos próprios AINEs.',
    efeito: 'Redução da eficácia gastroprotetora do misoprostol. Maior risco de úlcera péptica e sangramento gastrointestinal do que o esperado. O efeito é mais relevante com doses baixas de misoprostol (200 mcg/dia) e AINEs em doses anti-inflamatórias plenas.',
    conduta: '⚠️ Preferir IBP (omeprazol, pantoprazol) à misoprostol para gastroproteção em usuários crônicos de AINEs — maior eficácia e melhor tolerabilidade. Se misoprostol for usado, garantir dose adequada (200 mcg 4×/dia) e avaliar endoscopicamente se sintomas persistirem.'
  },

  // ─── FAMOTIDINA / RANITIDINA ─────────────────────────────────────────────────
  {
    med1: ['famotidina','pepcid','ranitidina','zantac'],
    med2: ['cetoconazol','ketoconazol','itraconazol','posaconazol'],
    nivel: 'moderado',
    titulo: 'Bloqueadores H2 (Famotidina/Ranitidina) + Antifúngicos Azólicos (Redução de Absorção)',
    mecanismo: 'Cetoconazol e itraconazol (forma cápsula) requerem meio ácido gástrico para se dissolverem e serem absorvidos. Os bloqueadores H2 elevam o pH gástrico, reduzindo drasticamente a solubilização e a absorção desses antifúngicos.',
    efeito: 'Redução da biodisponibilidade do cetoconazol em até 95% e do itraconazol cápsulas em 66% com omeprazol (bloqueadores H2 têm efeito menor mas ainda relevante). Falha terapêutica antifúngica — risco de progressão de micose sistêmica.',
    conduta: '⚠️ Evitar combinação com cetoconazol oral. Com itraconazol: usar formulação solução oral (absorção ácido-independente) em vez de cápsulas. Voriconazol e fluconazol têm absorção independente do pH. Substituir bloqueador H2 por IBP apenas se pH-dependência for problemática — ou espaçar ≥2 horas (eficácia parcial).'
  },
  {
    med1: ['famotidina','pepcid','ranitidina','zantac'],
    med2: ['atazanavir','reyataz'],
    nivel: 'moderado',
    titulo: 'Bloqueadores H2 + Atazanavir (Redução de Absorção do Antirretroviral)',
    mecanismo: 'O atazanavir requer pH gástrico ácido para sua dissolução e absorção. Bloqueadores H2 elevam o pH gástrico, podendo reduzir a Cmax do atazanavir em 18–40% dependendo da dose e do tempo de administração.',
    efeito: 'Redução dos níveis plasmáticos de atazanavir com risco de falha virológica e seleção de resistência ao antirretroviral.',
    conduta: '⚠️ Administrar atazanavir (com ritonavir como booster) simultaneamente com a refeição e ≥2 horas antes ou 10 horas após o bloqueador H2. Com famotidina: dose máxima de 40 mg/dia. IBPs são contraindicados com atazanavir/ritonavir sem booster adicional. Preferir outros ARVs em pacientes que requerem supressão ácida intensa.'
  },

  // ─── ACECLOFENACO ────────────────────────────────────────────────────────────
  {
    med1: ['aceclofenaco','preservex','airtal'],
    med2: ['warfarina','varfarina','acenocumarol','sintrom','heparina','apixabana','rivaroxabana','dabigatrana'],
    nivel: 'moderado',
    titulo: 'Aceclofenaco + Anticoagulantes (Risco de Sangramento Aumentado)',
    mecanismo: 'O aceclofenaco inibe COX-1 (reduzindo tromboxano plaquetário e agregação) e lesa a mucosa gastrointestinal. Em combinação com anticoagulantes, o risco de sangramento — especialmente GI — é aditivo. Com warfarina, o aceclofenaco também pode inibir CYP2C9 (modestamente), elevando o RNI.',
    efeito: 'Sangramento gastrointestinal alto (úlcera, gastrite erosiva) e baixo (enterocolopatia por AINEs). Risco de hematúria, epistaxe e equimoses graves em anticoagulados.',
    conduta: '⚠️ Evitar AINEs em pacientes anticoagulados. Se imprescindível: usar por período mínimo, proteger com IBP em dose plena (omeprazol 40 mg ou pantoprazol 40 mg), monitorar RNI com warfarina. Preferir paracetamol como analgésico de primeira linha.'
  },
  {
    med1: ['aceclofenaco','preservex','airtal'],
    med2: ['carbonato de lítio','lítio','litio'],
    nivel: 'moderado',
    titulo: 'Aceclofenaco + Lítio (Elevação do Nível Sérico de Lítio)',
    mecanismo: 'Os AINEs inibem a síntese de prostaglandinas vasodilatadoras renais, reduzindo o fluxo sanguíneo renal e a filtração glomerular. Como o lítio é eliminado exclusivamente por via renal, sua depuração diminui e seus níveis séricos elevam.',
    efeito: 'Toxicidade por lítio: tremor fino evoluindo para grosseiro, ataxia, confusão mental, poliúria paradoxal, convulsões em casos graves. O lítio tem janela terapêutica estreita (0,6–1,2 mEq/L) — elevações de 30–50% podem ser tóxicas.',
    conduta: '⚠️ Monitorar litemia 5–7 dias após início do AINE. Preferir paracetamol como analgésico em pacientes em uso de lítio. Se AINE for necessário, sulindac é o que menos afeta a excreção renal de lítio — mas ainda requer monitoramento.'
  },
  {
    med1: ['aceclofenaco','preservex','airtal'],
    med2: ['metotrexato','methotrexate'],
    nivel: 'grave',
    titulo: 'Aceclofenaco + Metotrexato (Toxicidade por Metotrexato — Potencialmente Fatal)',
    mecanismo: 'Os AINEs reduzem o fluxo sanguíneo renal e inibem os transportadores tubulares OAT1/OAT3, comprometendo a eliminação renal do metotrexato. Em doses anti-inflamatórias baixas (<25 mg/semana para artrite), o risco é menor — em doses oncológicas (>100 mg/m²), pode ser fatal.',
    efeito: 'Acúmulo de metotrexato com toxicidade multissistêmica: mucosites graves, mielossupressão, hepatotoxicidade, nefrotoxicidade e síndrome de Stevens-Johnson. Em doses oncológicas: óbito.',
    conduta: '🚫 Contraindicado com metotrexato em doses oncológicas. Em doses antirreumatológicas baixas: evitar AINEs nas 24–48h ao redor da tomada semanal de metotrexato; se necessário, monitorar toxicidade (hemograma, creatinina, transaminases). Sempre informar ao paciente para não tomar AINE junto com metotrexato sem orientação médica.'
  },
  {
    med1: ['aceclofenaco','preservex','airtal'],
    med2: ['enalapril','lisinopril','ramipril','captopril','losartana','valsartana','irbesartana','ieca','bra','sartana'],
    nivel: 'moderado',
    titulo: 'Aceclofenaco + IECAs/BRAs + Diuréticos (Tríplice Combinação Nefrotóxica)',
    mecanismo: 'IECAs/BRAs dilatam a arteríola eferente renal; os AINEs inibem a dilatação da arteríola aferente (via PGE2/PGI2). Em conjunto, o fluxo glomerular é reduzido de ambos os lados simultaneamente. Diuréticos agravam a depleção de volume. Esta tríplice combinação compromete criticamente a autorregulação renal.',
    efeito: 'IRA aguda — "tríplice whammy" — com risco de insuficiência renal que pode requerer diálise. O risco existe mesmo em pacientes com função renal previamente normal, especialmente em idosos, desidratados ou com ICC.',
    conduta: '🚫 Evitar a tríplice combinação AINE + IECA/BRA + diurético. Se AINE for imprescindível em paciente com IECA/BRA: monitorar creatinina em 48–72h. Hidratação adequada. Suspender diurético temporariamente se possível. Preferir paracetamol como alternativa analgésica.'
  }
];

module.exports = novas;

if (require.main === module) {
  console.log(`Novas interações P3: ${novas.length}`);

  // ── mc-interacoes-data-v3.js ──
  const jsRaw = fs.readFileSync('public/mc-interacoes-data-v3.js', 'utf8');
  const matchJs = jsRaw.match(/(var mcInteracoesDB\s*=\s*\[)([\s\S]*?)(\];\s*\n\s*var)/);
  if (!matchJs) { console.error('Não encontrou mcInteracoesDB em mc-interacoes-data-v3.js'); process.exit(1); }
  const newJs = jsRaw.replace(
    matchJs[0],
    matchJs[1] + matchJs[2] + ',\n' + novas.map(o => JSON.stringify(o)).join(',\n') + '\n' + matchJs[3]
  );
  fs.writeFileSync('public/mc-interacoes-data-v3.js', newJs, 'utf8');
  // contar
  const dbNovo = JSON.parse('[' + (matchJs[1] + matchJs[2]).replace('var mcInteracoesDB = [','') + ',\n' + novas.map(o=>JSON.stringify(o)).join(',\n') + '\n]');
  console.log(`✅ mc-interacoes-data-v3.js: ${dbNovo.length} entradas`);

  // ── interacoes.json ──
  const interacoes = JSON.parse(fs.readFileSync('public/interacoes.json', 'utf8'));
  const antes = interacoes.regras.length;
  interacoes.regras.push(...novas);
  fs.writeFileSync('public/interacoes.json', JSON.stringify(interacoes, null, 2), 'utf8');
  console.log(`✅ interacoes.json: ${antes} → ${interacoes.regras.length} regras`);

  // ── index.html ──
  let html = fs.readFileSync('index.html', 'utf8');
  const closeMarker = '\r\n                ];\r\n';
  const idx = html.lastIndexOf(closeMarker);
  if (idx === -1) { console.error('Não encontrou fechamento do mcInteracoesDB no index.html'); process.exit(1); }
  const injection = ',\r\n' + novas.map(o => '                    ' + JSON.stringify(o)).join(',\r\n');
  html = html.slice(0, idx) + injection + html.slice(idx);
  fs.writeFileSync('index.html', html, 'utf8');
  const count = (html.match(/\{ med1:/g) || []).length;
  console.log(`✅ index.html: ${count} entradas no mcInteracoesDB`);

  console.log('\n🎉 Prioridade 3 concluída!');
}
