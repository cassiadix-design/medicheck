// add_interacoes_30meds.cjs — interações para 30 medicamentos de média prioridade
'use strict';
const fs = require('fs');

const raw = fs.readFileSync('./src/data/medicamento.json', 'utf8');
const txt = raw.charCodeAt(0) === 0xFEFF ? raw.slice(1) : raw;
const data = JSON.parse(txt);

const MEDS = [
  {
    slug: 'clindamicina-150mg-300mg-injetavel',
    nome: 'Clindamicina 150mg - 300mg - Injetável',
    interacoes: [
      {
        com: ['Eritromicina', 'Azitromicina'],
        nivel: 'grave',
        titulo: 'Antagonismo antibacteriano',
        efeito: 'Eritromicina e clindamicina competem pelo mesmo sítio de ligação no ribossomo bacteriano (50S), reduzindo a eficácia de ambas.',
        conduta: 'Evitar uso concomitante. Escolha um dos dois conforme o perfil do agente infeccioso.'
      },
      {
        com: ['Bloqueadores neuromusculares', 'Rocurônio', 'Vecurônio', 'Succinilcolina'],
        nivel: 'grave',
        titulo: 'Potencialização do bloqueio neuromuscular',
        efeito: 'Clindamicina potencializa o efeito dos bloqueadores neuromusculares, podendo prolongar a paralisia muscular e causar apneia.',
        conduta: 'Monitoramento rigoroso em ambiente cirúrgico. Dose do bloqueador deve ser ajustada pelo anestesiologista.'
      },
      {
        com: ['Loperamida'],
        nivel: 'moderado',
        titulo: 'Risco aumentado de colite por C. difficile',
        efeito: 'Loperamida retarda o trânsito intestinal, podendo acumular toxinas de Clostridioides difficile e agravar colite associada à clindamicina.',
        conduta: 'Evitar loperamida em pacientes com diarreia em uso de clindamicina; investigar C. difficile.'
      },
      {
        com: ['Varfarina', 'Acenocumarol'],
        nivel: 'moderado',
        titulo: 'Aumento do efeito anticoagulante',
        efeito: 'Clindamicina pode alterar a flora intestinal produtora de vitamina K, aumentando o INR em pacientes anticoagulados.',
        conduta: 'Monitorar INR com mais frequência durante e após o curso de clindamicina.'
      },
      {
        com: ['Antiácidos com caolim'],
        nivel: 'leve',
        titulo: 'Redução da absorção oral da clindamicina',
        efeito: 'Caolim-pectina reduz a absorção gastrointestinal da clindamicina oral em até 90% se tomados simultaneamente.',
        conduta: 'Tomar clindamicina oral 2 horas antes ou 3–4 horas após antiácidos com caolim.'
      },
      {
        tipo: 'duplicacao',
        classe: 'lincosamida',
        nivel: 'moderado',
        titulo: 'Duplicação de antibiótico lincosamida',
        efeito: 'Combinação sem benefício adicional e com maior risco de efeitos adversos e resistência bacteriana.',
        conduta: 'Não combinar dois antibióticos da mesma classe.'
      }
    ]
  },
  {
    slug: 'clortalidona-125mg-25mg-50mg',
    nome: 'Clortalidona 12,5mg - 25mg - 50mg',
    interacoes: [
      {
        com: ['Digoxina'],
        nivel: 'grave',
        titulo: 'Toxicidade da digoxina por hipocalemia',
        efeito: 'Clortalidona causa perda de potássio; a hipocalemia resultante potencializa a toxicidade da digoxina, podendo causar arritmias graves.',
        conduta: 'Monitorar potássio sérico e sinais de toxicidade digitálica regularmente. Suplementar potássio se necessário.'
      },
      {
        com: ['Lítio'],
        nivel: 'grave',
        titulo: 'Toxicidade do lítio',
        efeito: 'Clortalidona reduz a excreção renal de lítio, elevando seus níveis plasmáticos e o risco de toxicidade (tremores, confusão, arritmia).',
        conduta: 'Monitorar litemia com frequência; ajustar dose do lítio sob orientação médica.'
      },
      {
        com: ['Anti-inflamatórios (AINEs)', 'Ibuprofeno', 'Naproxeno', 'Diclofenaco'],
        nivel: 'moderado',
        titulo: 'Redução do efeito diurético e anti-hipertensivo',
        efeito: 'AINEs inibem a síntese de prostaglandinas renais, reduzindo a eficácia da clortalidona e podendo elevar a pressão arterial.',
        conduta: 'Preferir paracetamol como analgésico. Se AINE for necessário, monitorar pressão e função renal.'
      },
      {
        com: ['Insulina', 'Metformina', 'Glibenclamida', 'Antidiabéticos orais'],
        nivel: 'moderado',
        titulo: 'Hiperglicemia e piora do controle glicêmico',
        efeito: 'Diuréticos tiazídicos podem elevar a glicemia, reduzindo a eficácia dos antidiabéticos.',
        conduta: 'Monitorar glicemia com mais frequência; ajustar dose do antidiabético se necessário.'
      },
      {
        com: ['Corticosteroides', 'Prednisona', 'Dexametasona'],
        nivel: 'moderado',
        titulo: 'Hipocalemia aditiva',
        efeito: 'Corticosteroides e clortalidona causam perda de potássio de forma aditiva, aumentando o risco de hipocalemia grave.',
        conduta: 'Monitorar potássio sérico; considerar suplementação de potássio se necessário.'
      },
      {
        tipo: 'duplicacao',
        classe: 'diuretico_tiazidico',
        nivel: 'moderado',
        titulo: 'Duplicação de diurético tiazídico',
        efeito: 'Combinação com hidroclorotiazida ou outros tiazídicos sem benefício adicional e com maior risco de desidratação e hipocalemia.',
        conduta: 'Evitar associação de dois diuréticos tiazídicos. Discutir com médico se necessário escalonamento.'
      }
    ]
  },
  {
    slug: 'torasemida-5mg-20mg',
    nome: 'Torasemida 5mg - 20mg',
    interacoes: [
      {
        com: ['Digoxina'],
        nivel: 'grave',
        titulo: 'Toxicidade da digoxina por hipocalemia',
        efeito: 'Torasemida causa perda renal de potássio; a hipocalemia potencializa a toxicidade da digoxina, gerando risco de arritmias graves.',
        conduta: 'Monitorar potássio sérico e ECG. Suplementar potássio se necessário.'
      },
      {
        com: ['Aminoglicosídeos', 'Gentamicina', 'Amicacina', 'Tobramicina'],
        nivel: 'grave',
        titulo: 'Ototoxicidade aditiva',
        efeito: 'Torasemida e aminoglicosídeos são ototóxicos; a combinação aumenta significativamente o risco de surdez irreversível.',
        conduta: 'Evitar uso simultâneo sempre que possível. Se necessário, monitorar função auditiva e níveis séricos dos aminoglicosídeos.'
      },
      {
        com: ['Lítio'],
        nivel: 'grave',
        titulo: 'Toxicidade do lítio',
        efeito: 'Torasemida pode reduzir a excreção renal de lítio, elevando sua concentração plasmática e o risco de toxicidade.',
        conduta: 'Monitorar litemia regularmente; ajustar dose do lítio sob orientação médica.'
      },
      {
        com: ['Anti-inflamatórios (AINEs)', 'Ibuprofeno', 'Naproxeno'],
        nivel: 'moderado',
        titulo: 'Redução do efeito diurético',
        efeito: 'AINEs inibem prostaglandinas renais, antagonizando o efeito diurético da torasemida e podendo levar à retenção de sódio e água.',
        conduta: 'Preferir paracetamol como analgésico. Monitorar edema, pressão arterial e função renal.'
      },
      {
        com: ['Antidiabéticos', 'Insulina', 'Metformina'],
        nivel: 'moderado',
        titulo: 'Hiperglicemia',
        efeito: 'Diuréticos de alça podem elevar a glicemia, interferindo no controle do diabetes.',
        conduta: 'Monitorar glicemia; ajustar dose do antidiabético se necessário.'
      },
      {
        tipo: 'duplicacao',
        classe: 'diuretico_ansa',
        nivel: 'moderado',
        titulo: 'Duplicação de diurético de alça',
        efeito: 'Associar torasemida com furosemida ou bumetanida aumenta o risco de desidratação, hipocalemia e insuficiência renal aguda.',
        conduta: 'Evitar combinação de dois diuréticos de alça. Discussão médica obrigatória.'
      }
    ]
  },
  {
    slug: 'cilostazol-50mg-100mg',
    nome: 'Cilostazol 50mg - 100mg',
    interacoes: [
      {
        com: ['Varfarina', 'Acenocumarol'],
        nivel: 'grave',
        titulo: 'Risco aumentado de sangramento',
        efeito: 'Cilostazol tem efeito antiagregante plaquetário; combinado com anticoagulantes, o risco de sangramento grave é significativamente aumentado.',
        conduta: 'Monitorar INR e sinais de sangramento. Uso combinado exige vigilância clínica rigorosa.'
      },
      {
        com: ['Inibidores de CYP3A4', 'Cetoconazol', 'Itraconazol', 'Eritromicina', 'Claritromicina', 'Fluconazol'],
        nivel: 'grave',
        titulo: 'Aumento dos níveis plasmáticos de cilostazol',
        efeito: 'Inibidores do CYP3A4 reduzem o metabolismo do cilostazol, podendo dobrar sua concentração plasmática e aumentar efeitos adversos cardiovasculares.',
        conduta: 'Reduzir dose de cilostazol para 50mg duas vezes ao dia quando associado a inibidores potentes de CYP3A4. Monitorar efeitos adversos.'
      },
      {
        com: ['Omeprazol', 'Lansoprazol', 'Inibidores de CYP2C19'],
        nivel: 'moderado',
        titulo: 'Aumento dos níveis de cilostazol por inibição do CYP2C19',
        efeito: 'Inibidores do CYP2C19 aumentam a exposição ao metabólito ativo do cilostazol, podendo intensificar efeitos adversos.',
        conduta: 'Reduzir dose de cilostazol para 50mg duas vezes ao dia. Monitorar palpitações, dor de cabeça e diarreia.'
      },
      {
        com: ['Aspirina', 'AAS'],
        nivel: 'moderado',
        titulo: 'Antiagregação aditiva',
        efeito: 'A combinação aumenta o efeito antiagregante plaquetário; embora usada clinicamente em alguns casos, eleva o risco de sangramento.',
        conduta: 'Usar com cautela. Monitorar sinais de sangramento gastrointestinal e hematomas.'
      },
      {
        tipo: 'duplicacao',
        classe: 'antiagregante_plaquetario',
        nivel: 'moderado',
        titulo: 'Duplicação de antiagregante plaquetário',
        efeito: 'Associação com clopidogrel, ticagrelor ou prasugrel sem indicação formal aumenta o risco de sangramento sem benefício adicional comprovado.',
        conduta: 'Avaliar risco-benefício da tripla antiagregação com o cardiologista.'
      }
    ]
  },
  {
    slug: 'edoxabana-15mg-30mg-60mg',
    nome: 'Edoxabana 15mg - 30mg - 60mg',
    interacoes: [
      {
        com: ['Rifampicina'],
        nivel: 'grave',
        titulo: 'Redução significativa dos níveis de edoxabana',
        efeito: 'Rifampicina é potente indutor de CYP3A4 e P-glicoproteína, reduzindo drasticamente a concentração plasmática de edoxabana e sua eficácia anticoagulante.',
        conduta: 'Evitar combinação. Considerar anticoagulante alternativo durante e até 2 semanas após suspensão da rifampicina.'
      },
      {
        com: ['AINEs', 'Ibuprofeno', 'Diclofenaco', 'Naproxeno', 'Aspirina em dose alta'],
        nivel: 'grave',
        titulo: 'Risco aumentado de sangramento',
        efeito: 'AINEs inibem a função plaquetária e causam lesão gástrica, potencializando o risco de sangramento gastrointestinal com edoxabana.',
        conduta: 'Evitar uso concomitante. Preferir paracetamol. Se AINE necessário, usar por menor tempo possível com proteção gástrica (IBP).'
      },
      {
        com: ['Amiodarona', 'Verapamil', 'Quinidina', 'Dronedarona'],
        nivel: 'moderado',
        titulo: 'Aumento dos níveis de edoxabana por inibição de P-gp',
        efeito: 'Estes fármacos inibem a P-glicoproteína, reduzindo a eliminação de edoxabana e elevando seus níveis plasmáticos com risco de sangramento.',
        conduta: 'Reduzir dose de edoxabana para 30mg/dia quando associada a esses inibidores de P-gp. Monitorar sangramento.'
      },
      {
        com: ['Outros anticoagulantes', 'Heparina', 'Varfarina', 'Rivaroxabana', 'Apixabana'],
        nivel: 'grave',
        titulo: 'Risco de sangramento grave por duplicação anticoagulante',
        efeito: 'Sobreposição de anticoagulantes sem protocolo de transição aumenta o risco de sangramento potencialmente fatal.',
        conduta: 'Transição entre anticoagulantes deve ser realizada conforme protocolo específico, sob orientação médica.'
      },
      {
        tipo: 'duplicacao',
        classe: 'anticoagulante_oral',
        nivel: 'grave',
        titulo: 'Duplicação de anticoagulante oral',
        efeito: 'Combinação com outros anticoagulantes orais (rivaroxabana, apixabana, varfarina) sem protocolo de transição é perigosa.',
        conduta: 'Nunca combinar dois anticoagulantes sem protocolo médico específico de transição.'
      }
    ]
  },
  {
    slug: 'dalteparina-2500-5000-10000-ui',
    nome: 'Dalteparina 2.500 - 5.000 - 10.000 UI',
    interacoes: [
      {
        com: ['AINEs', 'Ibuprofeno', 'Naproxeno', 'Diclofenaco'],
        nivel: 'grave',
        titulo: 'Risco de sangramento aditivo',
        efeito: 'AINEs inibem a função plaquetária e causam lesão da mucosa gástrica, aumentando consideravelmente o risco de sangramento com heparinas.',
        conduta: 'Evitar uso simultâneo. Preferir paracetamol. Se necessário AINE, associar proteção gástrica com IBP e monitorar sangramento.'
      },
      {
        com: ['Aspirina', 'AAS', 'Clopidogrel', 'Ticagrelor'],
        nivel: 'grave',
        titulo: 'Antiagregação e anticoagulação simultâneas',
        efeito: 'A combinação de antiagregante plaquetário com heparina de baixo peso molecular aumenta significativamente o risco de sangramento.',
        conduta: 'Uso combinado só em indicações específicas (SCA, stent). Monitorar ativamente sinais de sangramento.'
      },
      {
        com: ['Trombolíticos', 'Alteplase', 'Estreptoquinase'],
        nivel: 'grave',
        titulo: 'Risco de sangramento grave',
        efeito: 'A associação de heparina com trombolítico aumenta drasticamente o risco de sangramento, inclusive intracraniano.',
        conduta: 'Uso apenas em protocolos hospitalares específicos com monitoramento intensivo.'
      },
      {
        com: ['Inibidores da ECA', 'Espironolactona', 'Suplementos de potássio'],
        nivel: 'moderado',
        titulo: 'Hipercalemia',
        efeito: 'Heparinas podem inibir a síntese de aldosterona, causando hipercalemia, especialmente quando combinadas com outros agentes que elevam o potássio.',
        conduta: 'Monitorar potássio sérico durante uso prolongado de heparina, especialmente em pacientes com insuficiência renal.'
      },
      {
        tipo: 'duplicacao',
        classe: 'anticoagulante_heparina',
        nivel: 'grave',
        titulo: 'Duplicação de anticoagulação heparínica',
        efeito: 'Combinação com outras heparinas (enoxaparina, nadroparina, fondaparinux) aumenta drasticamente o risco de sangramento.',
        conduta: 'Nunca combinar duas heparinas ou heparina com fondaparinux sem protocolo específico.'
      }
    ]
  },
  {
    slug: 'nitrofurantoina-100mg-100mg-macrocristal',
    nome: 'Nitrofurantoína 100mg',
    interacoes: [
      {
        com: ['Probenecida', 'Sulfinpirazona'],
        nivel: 'moderado',
        titulo: 'Redução da excreção renal e aumento da toxicidade',
        efeito: 'Probenecida e sulfinpirazona reduzem a secreção tubular renal de nitrofurantoína, elevando seus níveis séricos e reduzindo concentrações urinárias (perda de eficácia).',
        conduta: 'Evitar associação. Escolher antibiótico alternativo para infecção urinária.'
      },
      {
        com: ['Quinolonas', 'Norfloxacina', 'Ciprofloxacino'],
        nivel: 'moderado',
        titulo: 'Antagonismo antibacteriano',
        efeito: 'Quinolonas e nitrofurantoína podem ser antagonistas em alguns isolados bacterianos, reduzindo a eficácia de ambas.',
        conduta: 'Não combinar rotineiramente; escolher um dos dois conforme antibiograma.'
      },
      {
        com: ['Antiácidos com magnésio', 'Hidróxido de magnésio'],
        nivel: 'leve',
        titulo: 'Redução da absorção da nitrofurantoína',
        efeito: 'Antiácidos com magnésio reduzem a biodisponibilidade oral da nitrofurantoína.',
        conduta: 'Tomar nitrofurantoína 2 horas antes ou 2 horas após antiácidos com magnésio.'
      },
      {
        com: ['Álcool'],
        nivel: 'leve',
        titulo: 'Aumento de efeitos adversos gastrointestinais',
        efeito: 'O álcool pode potencializar náuseas e desconforto gástrico causados pela nitrofurantoína.',
        conduta: 'Evitar álcool durante o tratamento. Tomar o medicamento com alimentos para reduzir efeitos GI.'
      },
      {
        tipo: 'duplicacao',
        classe: 'antibiotico_urinario',
        nivel: 'moderado',
        titulo: 'Duplicação de antibiótico urinário',
        efeito: 'Associação com fosfomicina ou outro antibiótico urinário sem indicação aumenta o risco de efeitos adversos sem ganho de eficácia.',
        conduta: 'Usar monoterapia conforme antibiograma; discutir combinação com médico se infecção complicada.'
      }
    ]
  },
  {
    slug: 'clobazam',
    nome: 'Clobazam',
    interacoes: [
      {
        com: ['Álcool', 'Opioides', 'Outros benzodiazepínicos', 'Zolpidem', 'Anti-histamínicos sedativos'],
        nivel: 'grave',
        titulo: 'Depressão grave do sistema nervoso central',
        efeito: 'A combinação de clobazam com depressores do SNC potencializa sedação, risco de parada respiratória e morte, especialmente com opioides.',
        conduta: 'Evitar associação. Se inevitável, usar doses mínimas, monitorar respiração e alertar para risco de depressão respiratória.'
      },
      {
        com: ['Inibidores de CYP2C19', 'Fluconazol', 'Fluvoxamina', 'Omeprazol', 'Esomeprazol'],
        nivel: 'moderado',
        titulo: 'Aumento do metabólito ativo (N-desmetilclobazam)',
        efeito: 'Inibidores de CYP2C19 reduzem o metabolismo do principal metabólito ativo do clobazam, aumentando sedação e efeitos adversos.',
        conduta: 'Monitorar sedação excessiva; reduzir dose de clobazam se necessário. Considerar substituto para o inibidor de CYP2C19.'
      },
      {
        com: ['Carbamazepina', 'Fenitoína', 'Rifampicina'],
        nivel: 'moderado',
        titulo: 'Redução dos níveis de clobazam por indução enzimática',
        efeito: 'Indutores enzimáticos aumentam o metabolismo do clobazam, reduzindo sua eficácia como antiepilético.',
        conduta: 'Monitorar controle das crises epilépticas; pode ser necessário ajuste de dose de clobazam.'
      },
      {
        com: ['Valproato de sódio'],
        nivel: 'moderado',
        titulo: 'Inibição do metabolismo do clobazam',
        efeito: 'Valproato inibe o CYP2C19, elevando os níveis do metabólito ativo do clobazam e potencializando a sedação.',
        conduta: 'Monitorar sedação e ajustar dose de clobazam se necessário. Combinação usada em epilepsia — avaliar com neurologista.'
      },
      {
        tipo: 'duplicacao',
        classe: 'benzodiazepínico',
        nivel: 'grave',
        titulo: 'Duplicação de benzodiazepínico',
        efeito: 'Associação de dois benzodiazepínicos aumenta risco de sedação excessiva, depressão respiratória e dependência.',
        conduta: 'Evitar combinação de dois benzodiazepínicos. Discutir esquema com neurologista ou psiquiatra.'
      }
    ]
  },
  {
    slug: 'nitrazepam-5mg-10mg',
    nome: 'Nitrazepam 5mg - 10mg',
    interacoes: [
      {
        com: ['Álcool', 'Anti-histamínicos sedativos', 'Outros benzodiazepínicos', 'Zolpidem'],
        nivel: 'grave',
        titulo: 'Depressão grave do SNC',
        efeito: 'Nitrazepam somado a outros depressores do SNC causa sedação profunda, prejuízo respiratório e risco de morte, especialmente em idosos.',
        conduta: 'Evitar uso concomitante. Alertar paciente para não consumir álcool durante o tratamento.'
      },
      {
        com: ['Opioides', 'Morfina', 'Codeína', 'Tramadol'],
        nivel: 'grave',
        titulo: 'Depressão respiratória grave',
        efeito: 'A associação de benzodiazepínico com opioide pode causar depressão respiratória severa, sedação profunda e morte.',
        conduta: 'Contraindicado na maioria dos casos. Se absolutamente necessário, usar doses mínimas, com monitoramento de saturação de O₂.'
      },
      {
        com: ['Cimetidina'],
        nivel: 'moderado',
        titulo: 'Aumento dos níveis de nitrazepam',
        efeito: 'Cimetidina inibe o metabolismo hepático do nitrazepam, prolongando e intensificando seus efeitos sedativos.',
        conduta: 'Monitorar sedação excessiva; preferir ranitidina ou IBP como alternativa à cimetidina.'
      },
      {
        tipo: 'duplicacao',
        classe: 'benzodiazepínico',
        nivel: 'grave',
        titulo: 'Duplicação de benzodiazepínico',
        efeito: 'Dois benzodiazepínicos sem indicação específica aumentam o risco de dependência e depressão do SNC.',
        conduta: 'Evitar combinação. Discutir esquema com médico especialista.'
      }
    ]
  },
  {
    slug: 'oxazepam-15mg',
    nome: 'Oxazepam 15mg',
    interacoes: [
      {
        com: ['Álcool', 'Anti-histamínicos sedativos', 'Outros benzodiazepínicos', 'Barbitúricos'],
        nivel: 'grave',
        titulo: 'Depressão grave do SNC',
        efeito: 'A associação de oxazepam com depressores do SNC potencializa sedação profunda, perda de coordenação e risco de queda e depressão respiratória.',
        conduta: 'Evitar uso concomitante. Contraindicado com álcool. Alertar paciente sobre risco de quedas, especialmente idosos.'
      },
      {
        com: ['Opioides', 'Morfina', 'Codeína', 'Tramadol'],
        nivel: 'grave',
        titulo: 'Depressão respiratória grave',
        efeito: 'Benzodiazepínico com opioide: risco de depressão respiratória severa e morte. Combinação com alta mortalidade documentada.',
        conduta: 'Evitar. Se uso simultâneo for inevitável, usar doses mínimas, monitorar saturação de O₂ e ter naloxona disponível.'
      },
      {
        com: ['Clozapina'],
        nivel: 'grave',
        titulo: 'Hipotensão grave e parada respiratória',
        efeito: 'Associação de oxazepam com clozapina pode causar hipotensão grave, colapso cardiovascular e parada respiratória.',
        conduta: 'Contraindicado. Não usar oxazepam em pacientes em uso de clozapina.'
      },
      {
        tipo: 'duplicacao',
        classe: 'benzodiazepínico',
        nivel: 'grave',
        titulo: 'Duplicação de benzodiazepínico',
        efeito: 'Dois benzodiazepínicos aumentam risco de sedação, dependência e depressão respiratória.',
        conduta: 'Evitar. Usar o benzodiazepínico mais adequado ao perfil do paciente.'
      }
    ]
  },
  {
    slug: 'clordiazepoxido-5mg-25mg',
    nome: 'Clordiazepóxido 5mg - 25mg',
    interacoes: [
      {
        com: ['Álcool', 'Anti-histamínicos sedativos', 'Barbitúricos', 'Outros benzodiazepínicos'],
        nivel: 'grave',
        titulo: 'Depressão profunda do SNC',
        efeito: 'Clordiazepóxido somado a outros depressores do SNC causa sedação intensa, risco de queda, confusão mental e depressão respiratória.',
        conduta: 'Evitar uso concomitante. Paciente deve ser alertado sobre risco com álcool.'
      },
      {
        com: ['Opioides', 'Morfina', 'Codeína', 'Tramadol'],
        nivel: 'grave',
        titulo: 'Depressão respiratória grave',
        efeito: 'A combinação de clordiazepóxido com opioides é uma das causas mais comuns de overdose fatal.',
        conduta: 'Contraindicado na maioria dos casos. Monitoramento rigoroso se inevitável.'
      },
      {
        com: ['Cimetidina'],
        nivel: 'moderado',
        titulo: 'Aumento dos efeitos sedativos',
        efeito: 'Cimetidina inibe o metabolismo hepático do clordiazepóxido, prolongando e intensificando a sedação.',
        conduta: 'Monitorar sedação. Substituir cimetidina por ranitidina ou IBP quando possível.'
      },
      {
        com: ['Antidepressivos tricíclicos', 'Amitriptilina', 'Imipramina'],
        nivel: 'moderado',
        titulo: 'Efeitos anticolinérgicos e sedativos aditivos',
        efeito: 'Combinação causa boca seca intensa, constipação, retenção urinária, confusão e sedação, especialmente em idosos.',
        conduta: 'Usar com cautela em idosos. Monitorar efeitos anticolinérgicos e cognitivos.'
      },
      {
        tipo: 'duplicacao',
        classe: 'benzodiazepínico',
        nivel: 'grave',
        titulo: 'Duplicação de benzodiazepínico',
        efeito: 'Dois benzodiazepínicos aumentam risco de dependência, sedação excessiva e depressão respiratória.',
        conduta: 'Usar apenas um benzodiazepínico por vez.'
      }
    ]
  },
  {
    slug: 'vardenafila-5mg-10mg-20mg-levitra-staxyn',
    nome: 'Vardenafila 5mg - 10mg - 20mg',
    interacoes: [
      {
        com: ['Nitratos', 'Nitroglicerina', 'Isossorbida', 'Nitroprussiato'],
        nivel: 'grave',
        titulo: 'Hipotensão grave — CONTRAINDICADO',
        efeito: 'A combinação de vardenafila com nitratos causa hipotensão arterial grave e potencialmente fatal por efeito vasodilatador sinérgico.',
        conduta: 'CONTRAINDICADO. Não usar vardenafila em pacientes que fazem uso de qualquer forma de nitrato (incluindo amil nitrito).'
      },
      {
        com: ['Alfa-bloqueadores', 'Doxazosina', 'Tansulosina', 'Prazosina'],
        nivel: 'grave',
        titulo: 'Hipotensão ortostática grave',
        efeito: 'Alfa-bloqueadores e vardenafila somam efeito vasodilatador, causando queda grave da pressão arterial ao levantar, com risco de desmaio.',
        conduta: 'Iniciar alfa-bloqueador na dose mais baixa e estabilizar antes de introduzir vardenafila. Monitorar pressão arterial.'
      },
      {
        com: ['Inibidores de CYP3A4', 'Ritonavir', 'Cetoconazol', 'Itraconazol', 'Eritromicina', 'Claritromicina'],
        nivel: 'grave',
        titulo: 'Aumento significativo dos níveis de vardenafila',
        efeito: 'Inibidores potentes do CYP3A4 aumentam muito os níveis plasmáticos de vardenafila, elevando risco de priapismo, hipotensão e efeitos cardíacos.',
        conduta: 'Evitar combinação. Com ritonavir, vardenafila é contraindicada. Com outros inibidores moderados, reduzir dose e ampliar intervalo.'
      },
      {
        com: ['Antiarrítmicos classe IA e III', 'Quinidina', 'Amiodarona', 'Sotalol'],
        nivel: 'grave',
        titulo: 'Prolongamento do intervalo QT',
        efeito: 'Vardenafila prolonga o QT; combinada com antiarrítmicos que também prolongam o QT, aumenta o risco de arritmias graves (torsades de pointes).',
        conduta: 'CONTRAINDICADO com antiarrítmicos que prolongam o QT. Realizar ECG antes de iniciar vardenafila em pacientes de risco.'
      },
      {
        tipo: 'duplicacao',
        classe: 'inibidor_pde5',
        nivel: 'moderado',
        titulo: 'Duplicação de inibidor de PDE5',
        efeito: 'Associação com sildenafila ou tadalafila sem indicação aumenta risco de hipotensão grave e priapismo.',
        conduta: 'Não combinar dois inibidores de PDE5.'
      }
    ]
  },
  {
    slug: 'tizanidina-2mg-4mg',
    nome: 'Tizanidina 2mg - 4mg',
    interacoes: [
      {
        com: ['Ciprofloxacino'],
        nivel: 'grave',
        titulo: 'Aumento drástico dos níveis de tizanidina — CONTRAINDICADO',
        efeito: 'Ciprofloxacino inibe fortemente o CYP1A2, responsável pelo metabolismo da tizanidina. A concentração plasmática pode aumentar mais de 10 vezes, causando hipotensão grave, bradicardia e sedação profunda.',
        conduta: 'CONTRAINDICADO. Não usar tizanidina com ciprofloxacino. Substituir o antibiótico ou suspender tizanidina.'
      },
      {
        com: ['Fluvoxamina'],
        nivel: 'grave',
        titulo: 'Aumento muito significativo dos níveis de tizanidina — CONTRAINDICADO',
        efeito: 'Fluvoxamina é inibidor potente de CYP1A2; a associação com tizanidina causa aumento de mais de 30 vezes na concentração plasmática, com risco de hipotensão grave e colapso.',
        conduta: 'CONTRAINDICADO. Não combinar fluvoxamina com tizanidina.'
      },
      {
        com: ['Anti-hipertensivos', 'Losartana', 'Enalapril', 'Anlodipino'],
        nivel: 'moderado',
        titulo: 'Hipotensão aditiva',
        efeito: 'Tizanidina tem ação agonista alfa-2 central com propriedade hipotensora; combinada com anti-hipertensivos, pode causar hipotensão sintomática.',
        conduta: 'Monitorar pressão arterial regularmente, especialmente ao levantar. Ajustar doses se necessário.'
      },
      {
        com: ['Álcool', 'Benzodiazepínicos', 'Opioides'],
        nivel: 'moderado',
        titulo: 'Sedação aditiva',
        efeito: 'Depressores do SNC potencializam o efeito sedativo da tizanidina, aumentando risco de sonolência excessiva e acidentes.',
        conduta: 'Evitar álcool. Usar com cautela combinações com outros sedativos. Alertar paciente para não dirigir.'
      },
      {
        com: ['Anticoncepcionais orais'],
        nivel: 'moderado',
        titulo: 'Aumento dos níveis de tizanidina',
        efeito: 'Contraceptivos orais inibem parcialmente o CYP1A2, podendo elevar os níveis plasmáticos de tizanidina e intensificar seus efeitos.',
        conduta: 'Iniciar tizanidina com dose menor em mulheres em uso de anticoncepcionais orais; ajustar conforme resposta.'
      },
      {
        tipo: 'duplicacao',
        classe: 'relaxante_muscular_central',
        nivel: 'moderado',
        titulo: 'Duplicação de relaxante muscular de ação central',
        efeito: 'Associação com baclofeno ou ciclobenzaprina aumenta sedação e hipotensão sem benefício adicional.',
        conduta: 'Evitar combinação de dois relaxantes musculares de ação central.'
      }
    ]
  },
  {
    slug: 'cloroquina-250mg',
    nome: 'Cloroquina 250mg',
    interacoes: [
      {
        com: ['Amiodarona', 'Sotalol', 'Quinidina', 'Antipsicóticos', 'Haloperidol', 'Azitromicina'],
        nivel: 'grave',
        titulo: 'Prolongamento do QT e arritmias graves',
        efeito: 'Cloroquina prolonga o intervalo QT; combinada com outros fármacos que também prolongam o QT, aumenta o risco de torsades de pointes e parada cardíaca.',
        conduta: 'Contraindicado com amiodarona e outros prolongadores de QT. Realizar ECG antes e durante o tratamento.'
      },
      {
        com: ['Mefloquina'],
        nivel: 'grave',
        titulo: 'Convulsões e arritmias — CONTRAINDICADO',
        efeito: 'A associação de cloroquina com mefloquina aumenta o risco de convulsões e toxicidade cardíaca.',
        conduta: 'CONTRAINDICADO. Não combinar cloroquina com mefloquina.'
      },
      {
        com: ['Insulina', 'Sulfonilureias', 'Glibenclamida', 'Metformina'],
        nivel: 'moderado',
        titulo: 'Hipoglicemia potencializada',
        efeito: 'Cloroquina tem efeito hipoglicemiante; combinada com antidiabéticos, pode causar hipoglicemia significativa.',
        conduta: 'Monitorar glicemia com mais frequência durante uso de cloroquina. Ajustar dose do antidiabético se necessário.'
      },
      {
        com: ['Antiácidos', 'Hidróxido de magnésio', 'Hidróxido de alumínio'],
        nivel: 'leve',
        titulo: 'Redução da absorção da cloroquina',
        efeito: 'Antiácidos reduzem a absorção gastrointestinal da cloroquina, diminuindo sua eficácia.',
        conduta: 'Tomar cloroquina 2 horas antes ou 4 horas após antiácidos.'
      },
      {
        tipo: 'duplicacao',
        classe: 'antimalárico_aminoquinolona',
        nivel: 'moderado',
        titulo: 'Duplicação de antimalárico aminoquinolona',
        efeito: 'Associação com hidroxicloroquina sem indicação aumenta toxicidade ocular e cardíaca sem benefício adicional.',
        conduta: 'Não combinar cloroquina com hidroxicloroquina.'
      }
    ]
  },
  {
    slug: 'metildopa-250mg-500mg',
    nome: 'Metildopa 250mg - 500mg',
    interacoes: [
      {
        com: ['Levodopa', 'Carbidopa + Levodopa'],
        nivel: 'grave',
        titulo: 'Antagonismo e piora do parkinsonismo',
        efeito: 'Metildopa pode antagonizar a ação da levodopa e piorar os sintomas da doença de Parkinson. A metildopa também é convertida em falso neurotransmissor.',
        conduta: 'Evitar associação em pacientes com doença de Parkinson. Escolher anti-hipertensivo alternativo.'
      },
      {
        com: ['Lítio'],
        nivel: 'moderado',
        titulo: 'Aumento dos níveis de lítio e toxicidade',
        efeito: 'Metildopa pode aumentar os níveis plasmáticos do lítio, elevando o risco de toxicidade (tremores, confusão, arritmia).',
        conduta: 'Monitorar litemia com frequência. Ajustar dose do lítio conforme necessário.'
      },
      {
        com: ['AINEs', 'Ibuprofeno', 'Naproxeno'],
        nivel: 'moderado',
        titulo: 'Redução do efeito anti-hipertensivo',
        efeito: 'AINEs reduzem a eficácia dos anti-hipertensivos por retenção de sódio e inibição das prostaglandinas renais.',
        conduta: 'Monitorar pressão arterial. Preferir paracetamol para analgesia.'
      },
      {
        com: ['Suplementos de ferro', 'Sulfato ferroso'],
        nivel: 'moderado',
        titulo: 'Redução da absorção da metildopa',
        efeito: 'O ferro quelata a metildopa no trato gastrointestinal, reduzindo significativamente sua absorção e eficácia anti-hipertensiva.',
        conduta: 'Tomar metildopa e suplemento de ferro com intervalo mínimo de 2 horas.'
      },
      {
        tipo: 'duplicacao',
        classe: 'anti_hipertensivo_acao_central',
        nivel: 'moderado',
        titulo: 'Duplicação de anti-hipertensivo de ação central',
        efeito: 'Associar metildopa com clonidina ou moxonidina aumenta risco de hipotensão grave e bradicardia sem benefício adicional.',
        conduta: 'Evitar dois anti-hipertensivos de ação central. Associar classes diferentes conforme necessidade.'
      }
    ]
  },
  {
    slug: 'amantadina-100mg',
    nome: 'Amantadina 100mg',
    interacoes: [
      {
        com: ['Anticolinérgicos', 'Triexifenidil', 'Biperideno', 'Escopolamina'],
        nivel: 'grave',
        titulo: 'Efeitos anticolinérgicos graves',
        efeito: 'Amantadina tem efeito anticolinérgico moderado; combinada com anticolinérgicos, pode causar alucinações, confusão, retenção urinária e glaucoma agudo.',
        conduta: 'Usar com cautela; reduzir dose do anticolinérgico ou da amantadina se surgirem efeitos adversos. Monitorar estado mental.'
      },
      {
        com: ['Trimetoprima', 'Cotrimoxazol (TMP-SMX)'],
        nivel: 'moderado',
        titulo: 'Acúmulo de amantadina por redução da excreção renal',
        efeito: 'Trimetoprima reduz a secreção tubular renal de amantadina, elevando sua concentração plasmática e risco de toxicidade (confusão, alucinação).',
        conduta: 'Monitorar sinais de toxicidade da amantadina. Considerar antibiótico alternativo.'
      },
      {
        com: ['Estimulantes dopaminérgicos', 'Anfetaminas', 'Metilfenidato'],
        nivel: 'moderado',
        titulo: 'Potencialização dopaminérgica e risco de psicose',
        efeito: 'A combinação pode causar superestimulação dopaminérgica com risco de psicose, alucinações e agitação.',
        conduta: 'Evitar combinação. Monitorar estado mental do paciente.'
      },
      {
        com: ['Álcool'],
        nivel: 'leve',
        titulo: 'Aumento de efeitos adversos do SNC',
        efeito: 'Álcool pode potencializar os efeitos do SNC da amantadina, como tontura e confusão.',
        conduta: 'Evitar consumo de álcool durante tratamento com amantadina.'
      },
      {
        tipo: 'duplicacao',
        classe: 'agente_dopaminérgico',
        nivel: 'moderado',
        titulo: 'Duplicação dopaminérgica',
        efeito: 'Associação com levodopa/carbidopa ou rasagilina pode causar discinesias e psicose dopaminérgica.',
        conduta: 'Usar combinação apenas sob orientação neurológica rigorosa, com titulação cuidadosa.'
      }
    ]
  },
  {
    slug: 'galantamina-8mg-16mg-24mg',
    nome: 'Galantamina 8mg - 16mg - 24mg',
    interacoes: [
      {
        com: ['Anticolinérgicos', 'Oxibutinina', 'Biperideno', 'Escopolamina', 'Clorfeniramina'],
        nivel: 'grave',
        titulo: 'Antagonismo direto da ação colinérgica',
        efeito: 'Anticolinérgicos antagonizam o mecanismo de ação da galantamina, eliminando seu benefício cognitivo em pacientes com doença de Alzheimer.',
        conduta: 'Evitar uso concomitante. Revisar necessidade de medicamentos anticolinérgicos; considerar alternativas não anticolinérgicas.'
      },
      {
        com: ['Betabloqueadores', 'Atenolol', 'Propranolol', 'Metoprolol'],
        nivel: 'moderado',
        titulo: 'Bradicardia aditiva',
        efeito: 'Galantamina aumenta o tônus colinérgico no coração, causando bradicardia que pode ser agravada por betabloqueadores.',
        conduta: 'Monitorar frequência cardíaca. Considerar ECG de base antes de iniciar galantamina em pacientes com betabloqueadores.'
      },
      {
        com: ['Inibidores de CYP2D6', 'Fluoxetina', 'Paroxetina', 'Duloxetina'],
        nivel: 'moderado',
        titulo: 'Aumento dos níveis de galantamina',
        efeito: 'Inibidores do CYP2D6 reduzem o metabolismo da galantamina, podendo elevar seus níveis plasmáticos e aumentar efeitos adversos colinérgicos (náusea, vômito).',
        conduta: 'Monitorar efeitos adversos gastrointestinais. Ajustar dose de galantamina se necessário.'
      },
      {
        com: ['Inibidores de CYP3A4', 'Cetoconazol', 'Eritromicina', 'Ritonavir'],
        nivel: 'moderado',
        titulo: 'Aumento dos níveis de galantamina',
        efeito: 'Inibidores de CYP3A4 também contribuem para elevação dos níveis de galantamina, potencializando efeitos adversos.',
        conduta: 'Monitorar tolerabilidade; reduzir dose de galantamina se necessário durante uso do inibidor.'
      },
      {
        tipo: 'duplicacao',
        classe: 'inibidor_colinesterase',
        nivel: 'moderado',
        titulo: 'Duplicação de inibidor da colinesterase',
        efeito: 'Associar galantamina com donepezila ou rivastigmina não traz benefício adicional e aumenta risco de toxicidade colinérgica (bradicardia, convulsões).',
        conduta: 'Usar apenas um inibidor de colinesterase por vez.'
      }
    ]
  },
  {
    slug: 'pirazinamida-500mg',
    nome: 'Pirazinamida 500mg',
    interacoes: [
      {
        com: ['Alopurinol'],
        nivel: 'moderado',
        titulo: 'Antagonismo no tratamento da hiperuricemia',
        efeito: 'Pirazinamida causa hiperuricemia por inibição da excreção renal de ácido úrico, antagonizando o efeito do alopurinol e podendo desencadear crises de gota.',
        conduta: 'Monitorar uricemia durante o tratamento com pirazinamida. Aumentar ingestão de líquidos; ajustar dose do alopurinol se necessário.'
      },
      {
        com: ['Álcool'],
        nivel: 'moderado',
        titulo: 'Hepatotoxicidade aumentada',
        efeito: 'O álcool potencializa a hepatotoxicidade da pirazinamida, aumentando o risco de lesão hepática grave.',
        conduta: 'Proibir consumo de álcool durante todo o tratamento com pirazinamida. Monitorar enzimas hepáticas (ALT, AST).'
      },
      {
        com: ['Rifampicina', 'Isoniazida'],
        nivel: 'moderado',
        titulo: 'Hepatotoxicidade aditiva do esquema RIPE',
        efeito: 'Os três antituberculosos têm potencial hepatotóxico; a combinação (parte do esquema RIPE) exige monitoramento hepático rigoroso.',
        conduta: 'Monitorar função hepática mensalmente durante tratamento. Suspender se ALT > 3× o limite superior da normalidade com sintomas.'
      },
      {
        com: ['Probenecida'],
        nivel: 'moderado',
        titulo: 'Antagonismo uricosúrico',
        efeito: 'Pirazinamida antagoniza o efeito uricosúrico da probenecida, reduzindo sua eficácia no tratamento da gota.',
        conduta: 'Monitorar uricemia; avaliar alternativas ao tratamento simultâneo.'
      },
      {
        tipo: 'duplicacao',
        classe: 'antituberculoso',
        nivel: 'moderado',
        titulo: 'Esquema antituberculoso — não duplicar fora do protocolo',
        efeito: 'Pirazinamida é parte do esquema RIPE padronizado. Modificações fora do protocolo aumentam risco de resistência e toxicidade.',
        conduta: 'Manter esquema conforme protocolo do Ministério da Saúde. Modificações apenas por infectologista ou pneumologista.'
      }
    ]
  },
  {
    slug: 'etambutol-400mg-solucao-oral',
    nome: 'Etambutol 400mg - Solução Oral',
    interacoes: [
      {
        com: ['Antiácidos com hidróxido de alumínio'],
        nivel: 'moderado',
        titulo: 'Redução da absorção do etambutol',
        efeito: 'Antiácidos com alumínio formam quelatos com o etambutol, reduzindo sua absorção gastrointestinal e eficácia antituberculosa.',
        conduta: 'Tomar etambutol 2 horas antes ou 4 horas após antiácidos com alumínio.'
      },
      {
        com: ['Outros agentes nefrotóxicos', 'Aminoglicosídeos', 'Anfotericina B'],
        nivel: 'moderado',
        titulo: 'Acúmulo de etambutol em insuficiência renal',
        efeito: 'Etambutol é eliminado pelos rins; agentes nefrotóxicos reduzem sua excreção, elevando seus níveis e risco de neurite óptica.',
        conduta: 'Monitorar função renal e acuidade visual regularmente. Ajustar dose em pacientes com comprometimento renal.'
      },
      {
        com: ['Isoniazida', 'Rifampicina', 'Pirazinamida'],
        nivel: 'leve',
        titulo: 'Monitoramento da hepatotoxicidade no esquema RIPE',
        efeito: 'Embora o etambutol em si tenha baixa hepatotoxicidade, faz parte do esquema com outros três hepatotóxicos que exigem vigilância.',
        conduta: 'Monitorar função hepática e acuidade visual mensalmente durante o tratamento.'
      },
      {
        tipo: 'duplicacao',
        classe: 'antituberculoso',
        nivel: 'moderado',
        titulo: 'Esquema antituberculoso — não modificar sem indicação',
        efeito: 'Etambutol é parte do esquema RIPE padronizado. Modificações não protocoladas aumentam risco de resistência.',
        conduta: 'Seguir protocolo do Ministério da Saúde. Modificações apenas por especialista.'
      }
    ]
  },
  {
    slug: 'sulfassalazina-500mg',
    nome: 'Sulfassalazina 500mg',
    interacoes: [
      {
        com: ['Metotrexato'],
        nivel: 'grave',
        titulo: 'Toxicidade hematológica aditiva',
        efeito: 'Sulfassalazina e metotrexato têm efeitos mielossupressores aditivos, aumentando o risco de leucopenia grave e infecções oportunistas.',
        conduta: 'Combinação usada em artrite reumatoide (DMARD duplo), mas exige monitoramento frequente do hemograma completo.'
      },
      {
        com: ['Varfarina', 'Acenocumarol'],
        nivel: 'moderado',
        titulo: 'Potencialização do efeito anticoagulante',
        efeito: 'Sulfassalazina pode deslocar a varfarina de ligações proteicas plasmáticas, elevando a fração livre e o risco de sangramento.',
        conduta: 'Monitorar INR com maior frequência ao iniciar ou suspender sulfassalazina.'
      },
      {
        com: ['Digoxina'],
        nivel: 'moderado',
        titulo: 'Redução da absorção da digoxina',
        efeito: 'Sulfassalazina reduz a absorção intestinal da digoxina, podendo diminuir seus níveis plasmáticos e eficácia.',
        conduta: 'Monitorar níveis séricos de digoxina e efeito clínico (frequência cardíaca) ao iniciar ou suspender sulfassalazina.'
      },
      {
        com: ['Ácido fólico', 'Sulfato ferroso'],
        nivel: 'moderado',
        titulo: 'Redução da absorção da sulfassalazina',
        efeito: 'Ferro e ácido fólico podem reduzir a absorção da sulfassalazina quando tomados simultaneamente.',
        conduta: 'Tomar sulfassalazina e suplementos com intervalo de 2 horas.'
      },
      {
        tipo: 'duplicacao',
        classe: 'aminossalicilato',
        nivel: 'moderado',
        titulo: 'Duplicação de aminossalicilato',
        efeito: 'Associação com mesalazina sem indicação formal aumenta o risco de toxicidade renal e hematológica.',
        conduta: 'Não combinar sulfassalazina com mesalazina sem orientação do reumatologista ou gastroenterologista.'
      }
    ]
  },
  {
    slug: 'ivermectina-6mg',
    nome: 'Ivermectina 6mg',
    interacoes: [
      {
        com: ['Varfarina', 'Acenocumarol'],
        nivel: 'moderado',
        titulo: 'Aumento do efeito anticoagulante',
        efeito: 'Ivermectina pode elevar o INR em pacientes anticoagulados, provavelmente por inibição do metabolismo da varfarina via CYP450.',
        conduta: 'Monitorar INR 3–7 dias após uso de ivermectina em pacientes anticoagulados. Ajustar dose de varfarina se necessário.'
      },
      {
        com: ['Benzodiazepínicos', 'Diazepam', 'Alprazolam', 'Barbitúricos'],
        nivel: 'leve',
        titulo: 'Potencial aumento da sedação',
        efeito: 'Ivermectina pode intensificar efeitos depressores do SNC de benzodiazepínicos e barbitúricos, especialmente em doses altas ou em crianças.',
        conduta: 'Monitorar sedação. Evitar doses altas de ivermectina em pacientes em uso de sedativos.'
      },
      {
        com: ['Álcool'],
        nivel: 'leve',
        titulo: 'Aumento de efeitos adversos',
        efeito: 'Álcool pode potencializar tontura e efeitos no SNC associados à ivermectina.',
        conduta: 'Evitar álcool no dia da tomada da ivermectina.'
      },
      {
        tipo: 'duplicacao',
        classe: 'antiparasitario',
        nivel: 'leve',
        titulo: 'Avaliação de duplicação antiparasitária',
        efeito: 'Uso simultâneo com albendazol é às vezes intencional (filariose), mas deve ser prescrito com indicação específica.',
        conduta: 'Associação só se indicada por protocolo específico (ex: filariose linfática). Consultar infectologista.'
      }
    ]
  },
  {
    slug: 'bromocriptina-25mg',
    nome: 'Bromocriptina 2,5mg',
    interacoes: [
      {
        com: ['Ergotamina'],
        nivel: 'grave',
        titulo: 'Vasoconstrição aditiva e ergotismo',
        efeito: 'Bromocriptina é derivado do ergot; associada à ergotamina, potencializa vasoconstrição periférica grave, podendo causar isquemia de extremidades.',
        conduta: 'CONTRAINDICADO. Não combinar bromocriptina com ergotamina ou outros derivados do ergot.'
      },
      {
        com: ['Antipsicóticos', 'Haloperidol', 'Risperidona', 'Clorpromazina'],
        nivel: 'grave',
        titulo: 'Antagonismo dopaminérgico',
        efeito: 'Antipsicóticos bloqueiam receptores de dopamina, antagonizando diretamente o mecanismo de ação da bromocriptina e eliminando seu benefício.',
        conduta: 'Evitar associação. Se necessário antipsicótico, discutir substituição da bromocriptina com o neurologista/endocrinologista.'
      },
      {
        com: ['Macrolídeos', 'Eritromicina', 'Claritromicina'],
        nivel: 'moderado',
        titulo: 'Aumento dos níveis de bromocriptina',
        efeito: 'Macrolídeos inibem o CYP3A4, reduzindo o metabolismo da bromocriptina e elevando seus níveis plasmáticos com risco de hipotensão e náuseas.',
        conduta: 'Monitorar efeitos adversos (hipotensão ortostática, náuseas). Considerar antibiótico alternativo.'
      },
      {
        com: ['Anti-hipertensivos'],
        nivel: 'moderado',
        titulo: 'Hipotensão aditiva',
        efeito: 'Bromocriptina pode causar hipotensão ortostática, especialmente no início do tratamento; combinada com anti-hipertensivos, o efeito é amplificado.',
        conduta: 'Iniciar bromocriptina na dose mais baixa. Monitorar pressão arterial, especialmente nas primeiras semanas.'
      },
      {
        tipo: 'duplicacao',
        classe: 'agonista_dopaminergico',
        nivel: 'moderado',
        titulo: 'Duplicação de agonista dopaminérgico',
        efeito: 'Associação com cabergolina ou pramipexol sem indicação específica aumenta risco de hipotensão, psicose e discinesias.',
        conduta: 'Usar apenas um agonista dopaminérgico por vez, salvo protocolo específico.'
      }
    ]
  },
  {
    slug: 'misoprostol-25mcg-200mcg',
    nome: 'Misoprostol 25mcg - 200mcg',
    interacoes: [
      {
        com: ['Ocitocina', 'Dinoprostona'],
        nivel: 'grave',
        titulo: 'Hiperstimulação uterina grave',
        efeito: 'Misoprostol e ocitocina têm efeitos uterotônicos aditivos; a combinação pode causar hiperstimulação uterina, sofrimento fetal e ruptura uterina.',
        conduta: 'Não administrar misoprostol e ocitocina simultaneamente. Aguardar pelo menos 4 horas após misoprostol vaginal antes de iniciar ocitocina.'
      },
      {
        com: ['AINEs', 'Ibuprofeno', 'Naproxeno', 'Diclofenaco'],
        nivel: 'moderado',
        titulo: 'Interferência na atividade uterina em contexto obstétrico',
        efeito: 'Em uso obstétrico, AINEs (inibidores da ciclo-oxigenase) podem antagonizar parcialmente o efeito uterotônico do misoprostol.',
        conduta: 'Evitar AINEs durante o processo de indução do parto com misoprostol. Em uso para gastroproteção, a combinação é intencional e geralmente segura.'
      },
      {
        com: ['Antiácidos com magnésio'],
        nivel: 'leve',
        titulo: 'Aumento da motilidade intestinal',
        efeito: 'Antiácidos com magnésio e misoprostol têm efeitos aditivos na motilidade intestinal, podendo intensificar diarreia.',
        conduta: 'Evitar antiácidos com magnésio durante uso de misoprostol. Preferir hidróxido de alumínio se necessário.'
      },
      {
        tipo: 'duplicacao',
        classe: 'uterotônico_prostaglandina',
        nivel: 'grave',
        titulo: 'Duplicação de uterotônico',
        efeito: 'Combinação com outros uterotônicos (ocitocina, metilergometrina) causa hiperstimulação uterina com risco para mãe e feto.',
        conduta: 'Não associar misoprostol com outros uterotônicos sem protocolo obstétrico específico.'
      }
    ]
  },
  {
    slug: 'progesterona-micronizada-100mg-200mg',
    nome: 'Progesterona Micronizada 100mg - 200mg',
    interacoes: [
      {
        com: ['Rifampicina', 'Rifabutina'],
        nivel: 'moderado',
        titulo: 'Redução dos níveis de progesterona por indução enzimática',
        efeito: 'Rifampicina é potente indutor do CYP3A4, aumentando o metabolismo da progesterona e reduzindo sua eficácia (suporte lúteo, anticoncepção).',
        conduta: 'Considerar forma não hormonal ou ajustar dose durante e até 4 semanas após rifampicina. Avaliar com ginecologista.'
      },
      {
        com: ['Carbamazepina', 'Fenitoína', 'Fenobarbital', 'Oxcarbazepina'],
        nivel: 'moderado',
        titulo: 'Redução da eficácia por indução do CYP3A4',
        efeito: 'Antiepilépticos indutores enzimáticos aumentam o metabolismo da progesterona, podendo reduzir sua eficácia como suporte lúteo ou contraceptivo.',
        conduta: 'Usar método contraceptivo adicional não hormonal. Discutir com médico alternativas de suporte lúteo.'
      },
      {
        com: ['Cetoconazol', 'Itraconazol', 'Inibidores de CYP3A4'],
        nivel: 'moderado',
        titulo: 'Aumento dos níveis de progesterona',
        efeito: 'Inibidores de CYP3A4 reduzem o metabolismo da progesterona, podendo elevar seus níveis e intensificar efeitos (sonolência, tontura).',
        conduta: 'Monitorar efeitos adversos. Ajustar dose de progesterona se necessário.'
      },
      {
        tipo: 'duplicacao',
        classe: 'progestagênio',
        nivel: 'moderado',
        titulo: 'Duplicação de progestagênio',
        efeito: 'Associação com acetato de medroxiprogesterona, levonorgestrel ou outro progestagênio sem indicação específica pode causar irregularidade menstrual e efeitos adversos desnecessários.',
        conduta: 'Usar apenas um progestagênio por vez, salvo protocolo específico orientado pelo ginecologista.'
      }
    ]
  },
  {
    slug: 'acido-tranexamico-500mg-1000mg',
    nome: 'Ácido Tranexâmico 500mg - 1000mg',
    interacoes: [
      {
        com: ['Anticoncepcionais orais combinados', 'Estrogênio + Progestagênio'],
        nivel: 'grave',
        titulo: 'Risco tromboembólico aditivo',
        efeito: 'Ácido tranexâmico é antifibrinolítico; combinado com anticoncepcionais que já aumentam o risco de trombose, o risco de TVP, TEP e AVC fica significativamente elevado.',
        conduta: 'Usar com extrema cautela. Avaliar risco-benefício individualmente. Monitorar sinais de trombose.'
      },
      {
        com: ['Anticoagulantes', 'Varfarina', 'Heparina', 'Rivaroxabana', 'Apixabana'],
        nivel: 'grave',
        titulo: 'Antagonismo e risco trombótico',
        efeito: 'Ácido tranexâmico antagoniza o sistema fibrinolítico; combinado com anticoagulantes em contexto inadequado, pode criar desequilíbrio hemostático com risco de trombose.',
        conduta: 'A combinação pode ser usada em hemorragias específicas (ex: pós-operatório cardíaco), mas apenas sob protocolo médico rigoroso.'
      },
      {
        com: ['Trombolíticos', 'Alteplase', 'Estreptoquinase', 'Tenecteplase'],
        nivel: 'grave',
        titulo: 'Antagonismo direto — CONTRAINDICADO',
        efeito: 'Ácido tranexâmico bloqueia a fibrinólise, antagonizando diretamente o mecanismo terapêutico dos trombolíticos.',
        conduta: 'CONTRAINDICADO. Não usar ácido tranexâmico com trombolíticos.'
      },
      {
        tipo: 'duplicacao',
        classe: 'antifibrinolítico',
        nivel: 'moderado',
        titulo: 'Duplicação de antifibrinolítico',
        efeito: 'Associação com ácido aminocaproico sem indicação aumenta o risco de trombose sem benefício adicional.',
        conduta: 'Não combinar dois antifibrinolíticos.'
      }
    ]
  },
  {
    slug: 'ergotamina-cafeina-cafertil-cafergot',
    nome: 'Ergotamina + Cafeína (Cafertil / Cafergot)',
    interacoes: [
      {
        com: ['Triptanos', 'Sumatriptano', 'Zolmitriptano', 'Naratriptano', 'Rizatriptano'],
        nivel: 'grave',
        titulo: 'Vasoconstrição aditiva grave — CONTRAINDICADO',
        efeito: 'Ergotamina e triptanos são vasoconstritores; a combinação causa vasospasmo coronariano e periférico grave, com risco de isquemia e infarto.',
        conduta: 'CONTRAINDICADO. Não usar ergotamina nas 24 horas antes ou após triptano.'
      },
      {
        com: ['Macrolídeos', 'Eritromicina', 'Claritromicina', 'Azitromicina'],
        nivel: 'grave',
        titulo: 'Ergotismo por inibição do CYP3A4 — CONTRAINDICADO',
        efeito: 'Macrolídeos inibem o CYP3A4, elevando drasticamente os níveis de ergotamina e causando ergotismo (vasospasmo, gangrena de extremidades).',
        conduta: 'CONTRAINDICADO. Usar antibiótico alternativo (doxiciclina, amoxicilina) em pacientes em uso de ergotamina.'
      },
      {
        com: ['Inibidores de protease', 'Ritonavir', 'Lopinavir', 'Indinavir'],
        nivel: 'grave',
        titulo: 'Ergotismo grave — CONTRAINDICADO',
        efeito: 'Inibidores de protease são inibidores potentes do CYP3A4, elevando os níveis de ergotamina a concentrações tóxicas.',
        conduta: 'CONTRAINDICADO. Suspender ergotamina antes de iniciar inibidores de protease.'
      },
      {
        com: ['Betabloqueadores', 'Propranolol', 'Atenolol'],
        nivel: 'moderado',
        titulo: 'Vasoconstrição periférica aditiva',
        efeito: 'Betabloqueadores podem aumentar a vasoconstrição periférica induzida pela ergotamina, com risco de isquemia de extremidades.',
        conduta: 'Usar com cautela. Monitorar sinais de isquemia periférica (palidez, frio, dor nas extremidades).'
      },
      {
        tipo: 'duplicacao',
        classe: 'derivado_ergot',
        nivel: 'grave',
        titulo: 'Duplicação de derivado do ergot',
        efeito: 'Associação com outros derivados do ergot (diidroergotamina, metilergometrina) causa vasospasmo grave e ergotismo.',
        conduta: 'CONTRAINDICADO. Nunca combinar dois derivados do ergot.'
      }
    ]
  },
  {
    slug: 'dextrometorfano-15mg5ml-xarope',
    nome: 'Dextrometorfano 15mg/5mL xarope',
    interacoes: [
      {
        com: ['IMAOs', 'Tranilcipromina', 'Fenelzina', 'Moclobemida', 'Selegilina'],
        nivel: 'grave',
        titulo: 'Síndrome serotoninérgica — CONTRAINDICADO',
        efeito: 'IMAOs inibem o metabolismo da serotonina; dextrometorfano inibe sua recaptação. A combinação pode causar síndrome serotoninérgica grave (hipertermia, rigidez, convulsões, morte).',
        conduta: 'CONTRAINDICADO. Aguardar pelo menos 14 dias após suspensão do IMAO antes de usar dextrometorfano.'
      },
      {
        com: ['Fluoxetina', 'Paroxetina'],
        nivel: 'grave',
        titulo: 'Síndrome serotoninérgica e acúmulo de dextrometorfano',
        efeito: 'Fluoxetina e paroxetina são inibidores potentes do CYP2D6, responsável pelo metabolismo do dextrometorfano. A combinação eleva drasticamente seus níveis e pode causar síndrome serotoninérgica.',
        conduta: 'Evitar associação. Considerar substituto não-serotoninérgico para tosse (guaifenesina, ibuprofeno para tosse pós-viral).'
      },
      {
        com: ['Sibutramina'],
        nivel: 'grave',
        titulo: 'Síndrome serotoninérgica',
        efeito: 'Sibutramina inibe a recaptação de serotonina; combinada com dextrometorfano, o risco de síndrome serotoninérgica é significativo.',
        conduta: 'Evitar associação. Usar alternativa para tosse sem ação serotoninérgica.'
      },
      {
        com: ['Álcool'],
        nivel: 'moderado',
        titulo: 'Depressão do SNC aditiva',
        efeito: 'Álcool potencializa os efeitos depressores do SNC do dextrometorfano, causando tontura, confusão e sedação.',
        conduta: 'Evitar álcool durante uso de dextrometorfano.'
      },
      {
        tipo: 'duplicacao',
        classe: 'antitussígeno_central',
        nivel: 'moderado',
        titulo: 'Duplicação de antitussígeno central',
        efeito: 'Associação com codeína ou outros antitussígenos centrais aumenta depressão respiratória sem benefício adicional.',
        conduta: 'Usar apenas um antitussígeno por vez.'
      }
    ]
  },
  {
    slug: 'droperidol-25mg-injetavel',
    nome: 'Droperidol 2,5mg Injetável',
    interacoes: [
      {
        com: ['Antiarrítmicos classe IA e III', 'Quinidina', 'Amiodarona', 'Sotalol', 'Quinolonas', 'Eritromicina'],
        nivel: 'grave',
        titulo: 'Prolongamento do QT e torsades de pointes',
        efeito: 'Droperidol prolonga o intervalo QT; combinado com outros prolongadores do QT, aumenta o risco de arritmias ventriculares graves potencialmente fatais.',
        conduta: 'Monitorar ECG antes e após administração de droperidol. Evitar com outros fármacos que prolongam o QT.'
      },
      {
        com: ['Opioides', 'Morfina', 'Fentanil', 'Tramadol'],
        nivel: 'grave',
        titulo: 'Potencialização da sedação e depressão respiratória',
        efeito: 'Droperidol potencializa os efeitos sedativos e depressores respiratórios dos opioides, especialmente em ambiente perioperatório.',
        conduta: 'Reduzir dose do opioide quando usado com droperidol. Manter suporte ventilatório disponível.'
      },
      {
        com: ['Anti-hipertensivos', 'Anlodipino', 'Enalapril', 'Metoprolol'],
        nivel: 'moderado',
        titulo: 'Hipotensão aditiva',
        efeito: 'Droperidol tem efeito alfa-bloqueador e pode causar hipotensão, agravada por anti-hipertensivos concomitantes.',
        conduta: 'Monitorar pressão arterial após administração de droperidol. Ter suporte vasopressor disponível em ambiente de uso hospitalar.'
      },
      {
        com: ['Levodopa', 'Agonistas dopaminérgicos'],
        nivel: 'moderado',
        titulo: 'Antagonismo dopaminérgico',
        efeito: 'Droperidol bloqueia receptores D2, antagonizando o efeito da levodopa e podendo piorar sintomas parkinsonianos.',
        conduta: 'Evitar droperidol em pacientes com doença de Parkinson. Usar antiemético alternativo (ondansetrona).'
      },
      {
        tipo: 'duplicacao',
        classe: 'antipsicótico_típico',
        nivel: 'moderado',
        titulo: 'Duplicação de bloqueador dopaminérgico',
        efeito: 'Associação com haloperidol ou outros antipsicóticos típicos aumenta risco de prolongamento do QT e efeitos extrapiramidais.',
        conduta: 'Evitar dois antipsicóticos/neurolépticos em dose antiemética sem indicação específica.'
      }
    ]
  },
  {
    slug: 'dulaglutida-trulicity',
    nome: 'Dulaglutida (Trulicity)',
    interacoes: [
      {
        com: ['Insulina', 'Glibenclamida', 'Glimepirida', 'Gliclazida', 'Sulfonilureias'],
        nivel: 'grave',
        titulo: 'Hipoglicemia potencializada',
        efeito: 'Dulaglutida aumenta a secreção de insulina dependente de glicose; combinada com insulina ou sulfonilureias, o risco de hipoglicemia é significativamente elevado.',
        conduta: 'Reduzir dose de insulina ou sulfonilureia ao iniciar dulaglutida. Monitorar glicemia com mais frequência e orientar paciente sobre sinais de hipoglicemia.'
      },
      {
        com: ['Varfarina', 'Acenocumarol'],
        nivel: 'moderado',
        titulo: 'Alteração do INR',
        efeito: 'Dulaglutida retarda o esvaziamento gástrico, podendo alterar a absorção da varfarina e modificar o INR de forma imprevisível.',
        conduta: 'Monitorar INR mais frequentemente nas primeiras semanas após início de dulaglutida em pacientes anticoagulados.'
      },
      {
        com: ['Medicamentos com janela terapêutica estreita', 'Digoxina', 'Levotiroxina', 'Anticoncepcionais orais'],
        nivel: 'moderado',
        titulo: 'Alteração da absorção por retardo do esvaziamento gástrico',
        efeito: 'Agonistas GLP-1 retardam o esvaziamento gástrico, podendo reduzir e atrasar a absorção de medicamentos de janela estreita, afetando sua eficácia.',
        conduta: 'Tomar medicamentos com janela estreita no horário habitual, mas monitorar níveis séricos ou efeito clínico. Anticoncepcionais orais devem ser tomados pelo menos 1 hora antes da injeção de dulaglutida.'
      },
      {
        tipo: 'duplicacao',
        classe: 'agonista_glp1',
        nivel: 'grave',
        titulo: 'Duplicação de agonista GLP-1',
        efeito: 'Associar dulaglutida com semaglutida, exenatida ou liraglutida causa hipoglicemia grave, náuseas intensas e pancreatite sem benefício adicional.',
        conduta: 'CONTRAINDICADO. Nunca combinar dois agonistas de GLP-1.'
      }
    ]
  },
  {
    slug: 'exenatida-byetta-bydureon',
    nome: 'Exenatida (Byetta / Bydureon)',
    interacoes: [
      {
        com: ['Insulina', 'Glibenclamida', 'Glimepirida', 'Gliclazida', 'Sulfonilureias'],
        nivel: 'grave',
        titulo: 'Hipoglicemia potencializada',
        efeito: 'Exenatida estimula a secreção de insulina; combinada com sulfonilureias ou insulina, o risco de hipoglicemia grave é significativamente elevado.',
        conduta: 'Reduzir dose de sulfonilureia ou insulina ao iniciar exenatida. Monitorar glicemia com frequência e orientar sobre sinais de hipoglicemia.'
      },
      {
        com: ['Varfarina', 'Acenocumarol'],
        nivel: 'moderado',
        titulo: 'Alteração do INR',
        efeito: 'Exenatida retarda o esvaziamento gástrico, podendo alterar a absorção da varfarina e modificar o INR de forma imprevisível.',
        conduta: 'Monitorar INR com maior frequência após início de exenatida em pacientes anticoagulados.'
      },
      {
        com: ['Digoxina', 'Levotiroxina', 'Anticoncepcionais orais', 'Medicamentos com janela estreita'],
        nivel: 'moderado',
        titulo: 'Alteração da absorção por retardo do esvaziamento gástrico',
        efeito: 'O retardo do esvaziamento gástrico causado pela exenatida pode atrasar e reduzir a absorção de outros medicamentos, afetando sua eficácia.',
        conduta: 'Tomar medicamentos orais críticos (anticoncepcionais, antibióticos) pelo menos 1 hora antes da injeção de exenatida. Monitorar níveis séricos quando aplicável.'
      },
      {
        tipo: 'duplicacao',
        classe: 'agonista_glp1',
        nivel: 'grave',
        titulo: 'Duplicação de agonista GLP-1',
        efeito: 'Combinar exenatida com dulaglutida, semaglutida ou liraglutida causa hipoglicemia grave, náuseas e pancreatite sem benefício adicional.',
        conduta: 'CONTRAINDICADO. Nunca combinar dois agonistas de GLP-1.'
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
