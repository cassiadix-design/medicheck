const fs = require('fs');
const path = require('path');

const arquivo = path.join(__dirname, 'medicamentos.json');
const dados = JSON.parse(fs.readFileSync(arquivo, 'utf8'));

const novos = [
  {
    "nome": "Acenocumarol 1mg - 4mg",
    "generico": "Acenocumarol",
    "tipo": "Anticoagulante Oral — Antagonista da Vitamina K",
    "sinonimos": ["acenocumarol", "sintrom", "acenocumarol 4mg"],
    "descricao": "Anticoagulante oral da mesma família da warfarina — age bloqueando a vitamina K para reduzir a coagulação do sangue. Usado na prevenção e tratamento de trombose venosa profunda, embolia pulmonar e em pacientes com fibrilação atrial ou válvulas cardíacas mecânicas. Menos usado que a warfarina no Brasil, mas comum em alguns países europeus.",
    "receita": "Sim",
    "receita_display": "🔴 Receita Simples",
    "receita_cor": "vermelho",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_nota": "Monitoramento regular do INR obrigatório para ajuste de dose.",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "efeitos": "Sangramento é o principal risco — gengiva, nariz, hematomas fáceis, menstruação intensa, sangramento prolongado em cortes. Em casos graves: sangramento interno ou hemorragia cerebral.",
    "aviso_grave": "MEDICAMENTO DE ALTO RISCO — janela terapêutica estreita, igual à warfarina. Exige monitoramento regular do INR. Dezenas de medicamentos e alimentos interagem. PROIBIDO na gravidez. Informe sempre ao médico e dentista que usa anticoagulante.",
    "recomendacao": "☎️ LIGUE SAMU (192) em caso de sangramento que não para, fezes escuras, vômito com sangue, urina avermelhada ou dor de cabeça intensa súbita.",
    "educacao": "Assim como a warfarina, mantenha o consumo de alimentos ricos em vitamina K (folhas verdes) constante — sem grandes variações semana a semana. O INR deve ser monitorado regularmente para manter a dose segura.",
    "resposta_rapida": [
      "Anticoagulante oral similar à warfarina",
      "Previne coágulos e AVC",
      "Exige exame de INR regular",
      "Mantenha consumo de folhas verdes CONSTANTE",
      "Informe SEMPRE ao médico e dentista que usa"
    ],
    "perguntas_frequentes": [
      {
        "pergunta": "Acenocumarol é igual à warfarina?",
        "resposta": "São da mesma família e funcionam pelo mesmo mecanismo (bloqueio da vitamina K), mas são moléculas diferentes com doses e duração de ação distintas. Ambos exigem monitoramento do INR."
      },
      {
        "pergunta": "Acenocumarol pode comer salada?",
        "resposta": "Sim, mas com quantidade constante. Alimentos ricos em vitamina K (couve, espinafre, brócolis) afetam o efeito do acenocumarol — o importante é não variar muito a quantidade semana a semana."
      },
      {
        "pergunta": "Acenocumarol pode tomar ibuprofeno?",
        "resposta": "Não. AINEs (ibuprofeno, diclofenaco, naproxeno) aumentam muito o risco de sangramento em anticoagulados. Prefira paracetamol para dor."
      }
    ]
  },
  {
    "nome": "Apixabana 2,5mg - 5mg",
    "generico": "Apixabana",
    "tipo": "Anticoagulante Oral — Inibidor Direto do Fator Xa",
    "sinonimos": ["apixabana", "eliquis", "apixabana 5mg", "apixabana 2,5mg"],
    "descricao": "Anticoagulante oral de nova geração — inibe diretamente o fator Xa da coagulação, bloqueando a formação de coágulos sem precisar de vitamina K. Usado na prevenção de AVC em fibrilação atrial, tratamento e prevenção de trombose venosa profunda (TVP) e embolia pulmonar, e prevenção de trombose após cirurgias ortopédicas.",
    "receita": "Sim",
    "receita_display": "🔴 Receita Simples",
    "receita_cor": "vermelho",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_nota": "Não exige monitoramento de INR — grande vantagem sobre warfarina.",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "efeitos": "Sangramento é o principal risco (nariz, gengiva, hematomas), porém com menor risco de sangramento grave comparado à warfarina. Pode causar náusea e anemia.",
    "aviso_grave": "Em caso de sangramento grave, não existe antídoto amplamente disponível no Brasil (o andexanet alfa é raro e caro). NÃO interromper sem orientação médica — a interrupção aumenta risco de AVC. Informar sempre ao médico e dentista. Cuidado com outros anticoagulantes, AINEs e antiplaquetários.",
    "recomendacao": "☎️ LIGUE SAMU (192) em caso de sangramento que não para, fezes escuras, vômito com sangue, urina avermelhada ou dor de cabeça intensa súbita.",
    "educacao": "Diferente da warfarina, a apixabana não é afetada por alimentos com vitamina K — pode comer folhas verdes normalmente. Não precisa de exame de INR. Tome sempre nos horários certos — não pular doses e não dobrar se esquecer.",
    "resposta_rapida": [
      "Anticoagulante moderno (NOAC/DOAC)",
      "Não precisa de INR",
      "Não é afetado por alimentos",
      "Não interromper sem orientação médica",
      "Informar sempre ao médico e dentista"
    ],
    "perguntas_frequentes": [
      {
        "pergunta": "Apixabana precisa de exame de INR?",
        "resposta": "Não. Essa é uma das grandes vantagens sobre a warfarina — a apixabana tem efeito previsível e não requer monitoramento de INR rotineiro."
      },
      {
        "pergunta": "Apixabana pode comer alface e couve?",
        "resposta": "Sim, sem restrições. Diferente da warfarina, a apixabana não é afetada por alimentos ricos em vitamina K."
      },
      {
        "pergunta": "Apixabana pode tomar ibuprofeno?",
        "resposta": "Não é recomendado. AINEs aumentam o risco de sangramento em pacientes anticoagulados. Prefira paracetamol."
      },
      {
        "pergunta": "Esqueci a dose da apixabana, o que faço?",
        "resposta": "Se lembrar no mesmo dia, tome assim que lembrar. Se já passou para o dia seguinte, pule a dose esquecida — nunca duplique."
      }
    ]
  },
  {
    "nome": "Cilostazol 50mg - 100mg",
    "generico": "Cilostazol",
    "tipo": "Antiplaquetário — Inibidor da Fosfodiesterase III",
    "sinonimos": ["cilostazol", "cebralat", "cilostazol 100mg", "pletal"],
    "descricao": "Medicamento que inibe a agregação plaquetária e causa vasodilatação — melhora o fluxo sanguíneo nas artérias periféricas. Indicado principalmente para claudicação intermitente (dor nas pernas ao caminhar por doença arterial periférica) e prevenção de AVC/AIT em pacientes que não toleram outros antiplaquetários.",
    "receita": "Sim",
    "receita_display": "🔴 Receita Simples",
    "receita_cor": "vermelho",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_nota": "Tomar em jejum ou 30 minutos antes das refeições para melhor absorção.",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "efeitos": "Dor de cabeça (muito comum, especialmente no início), palpitações, taquicardia, diarreia, tontura, edema periférico.",
    "aviso_grave": "CONTRAINDICADO em insuficiência cardíaca de qualquer grau — pode aumentar mortalidade. Não combinar com outros anticoagulantes sem orientação. Interações importantes com omeprazol, eritromicina, antifúngicos azólicos (aumentam níveis do cilostazol).",
    "recomendacao": "⚠️ Informe ao médico se tiver qualquer doença do coração antes de iniciar. A cefaleia do início do tratamento costuma melhorar em 2–4 semanas.",
    "educacao": "O cilostazol melhora a distância caminhada sem dor em pacientes com doença arterial periférica — mas o efeito leva de 4 a 12 semanas para ser percebido. Não desanime se não sentir melhora imediata.",
    "resposta_rapida": [
      "Melhora circulação periférica",
      "Dor nas pernas ao caminhar",
      "Contraindicado em insuficiência cardíaca",
      "Dor de cabeça é comum no início",
      "Efeito leva semanas para aparecer"
    ],
    "perguntas_frequentes": [
      {
        "pergunta": "Cilostazol serve para quê?",
        "resposta": "Principalmente para melhorar a circulação nas pernas em pessoas com doença arterial periférica — reduz a dor ao caminhar (claudicação). Também usado como antiplaquetário em alguns casos de AVC."
      },
      {
        "pergunta": "Cilostazol pode usar com coração?",
        "resposta": "NÃO em insuficiência cardíaca — é contraindicado e pode ser perigoso. Consulte o médico para avaliar seu caso específico."
      },
      {
        "pergunta": "Cilostazol dá dor de cabeça?",
        "resposta": "Sim, é o efeito colateral mais comum — afeta até 30% dos pacientes. Costuma diminuir com o tempo. Se for insuportável, fale com o médico."
      }
    ]
  },
  {
    "nome": "Dabigatrana 75mg - 110mg - 150mg",
    "generico": "Etexilato de dabigatrana",
    "tipo": "Anticoagulante Oral — Inibidor Direto da Trombina",
    "sinonimos": ["dabigatrana", "pradaxa", "dabigatrana 150mg", "dabigatrana 110mg"],
    "descricao": "Anticoagulante oral de nova geração — inibe diretamente a trombina, enzima central na formação de coágulos. Usado na prevenção de AVC em fibrilação atrial não valvar, tratamento e prevenção de trombose venosa profunda e embolia pulmonar, e prevenção de trombose após cirurgias ortopédicas.",
    "receita": "Sim",
    "receita_display": "🔴 Receita Simples",
    "receita_cor": "vermelho",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_nota": "Tomar com água, pode ser com ou sem alimentos. NÃO abrir a cápsula.",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "efeitos": "Sangramento (principal risco), dispepsia e dor de estômago (mais comum que com outros NOACs), náusea. Pode causar anemia.",
    "aviso_grave": "Possui antídoto específico (idarucizumabe/Praxbind) disponível em hospitais para casos de sangramento grave. NÃO interromper sem orientação médica. CONTRAINDICADO em insuficiência renal grave (clearance < 30 mL/min) — a dabigatrana é eliminada quase inteiramente pelos rins. Não abrir ou mastigar as cápsulas — altera absorção.",
    "recomendacao": "☎️ LIGUE SAMU (192) em caso de sangramento que não para, fezes escuras, vômito com sangue, urina avermelhada ou dor de cabeça intensa súbita.",
    "educacao": "A dabigatrana é eliminada pelos rins — função renal deve ser avaliada antes e periodicamente durante o tratamento. Se tiver dor de estômago persistente, fale com o médico — pode ser necessário ajuste ou troca. Não abra as cápsulas: o revestimento protege o estômago.",
    "resposta_rapida": [
      "Anticoagulante moderno (NOAC/DOAC)",
      "Não precisa de INR",
      "Antídoto disponível (idarucizumabe)",
      "Atenção à função renal",
      "NÃO abrir a cápsula"
    ],
    "perguntas_frequentes": [
      {
        "pergunta": "Dabigatrana precisa de INR?",
        "resposta": "Não. Não requer monitoramento de INR rotineiro — efeito previsível e consistente."
      },
      {
        "pergunta": "Dabigatrana pode abrir a cápsula?",
        "resposta": "Não. Jamais abra, mastigue ou dissolva as cápsulas — o revestimento é essencial para proteger o estômago e garantir a absorção correta."
      },
      {
        "pergunta": "Dabigatrana faz mal ao estômago?",
        "resposta": "É o NOAC que mais causa desconforto gástrico (dispepsia, dor de estômago) — afeta até 10% dos pacientes. Tomar com alimentos pode ajudar. Se persistir, fale com o médico."
      },
      {
        "pergunta": "Dabigatrana tem antídoto?",
        "resposta": "Sim — o idarucizumabe (Praxbind) reverte o efeito rapidamente em emergências. Está disponível em hospitais de referência."
      }
    ]
  },
  {
    "nome": "Dalteparina 2.500 - 5.000 - 10.000 UI",
    "generico": "Dalteparina sódica",
    "tipo": "Anticoagulante Injetável — Heparina de Baixo Peso Molecular",
    "sinonimos": ["dalteparina", "fragmin", "dalteparina sódica"],
    "descricao": "Heparina de baixo peso molecular (HBPM) usada por injeção subcutânea. Indicada para prevenção e tratamento de trombose venosa profunda, embolia pulmonar, e prevenção de coágulos em pacientes imobilizados ou cirúrgicos. Também usada em angina instável e pacientes com câncer com tromboembolismo.",
    "receita": "Sim",
    "receita_display": "🔴 Receita Simples",
    "receita_cor": "vermelho",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_nota": "Aplicação subcutânea no abdômen — alternar os locais de aplicação. Nunca aplicar na musculatura.",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "efeitos": "Hematoma no local da injeção (muito comum), sangramento, trombocitopenia induzida por heparina (queda de plaquetas — rara mas grave), osteoporose no uso prolongado.",
    "aviso_grave": "Risco de trombocitopenia induzida por heparina (TIH) — queda paradoxal de plaquetas com risco de coágulos graves. Monitorar plaquetas. CONTRAINDICADA em sangramento ativo e trombocitopenia grave. Atenção à função renal no idoso.",
    "recomendacao": "⚠️ Aprenda a técnica correta de aplicação subcutânea — pellizcar a pele, agulha em 90°, não esfregar após a injeção. Alterne o local diariamente.",
    "educacao": "A dalteparina tem efeito mais previsível que a heparina não fracionada e geralmente não exige monitoramento de coagulação em doses profiláticas. Em doses terapêuticas altas ou em pacientes especiais (gestantes, obesos, renais), pode ser necessário monitorar anti-Xa.",
    "resposta_rapida": [
      "Anticoagulante injetável (seringa)",
      "Aplicação subcutânea no abdômen",
      "Alternar locais de injeção",
      "Monitorar plaquetas",
      "Não esfregar após aplicar"
    ],
    "perguntas_frequentes": [
      {
        "pergunta": "Dalteparina dói na aplicação?",
        "resposta": "Pode causar leve ardência e hematoma no local. Para minimizar: pellizcar a pele, aplicar devagar e não esfregar depois."
      },
      {
        "pergunta": "Dalteparina pode ser aplicada no braço?",
        "resposta": "O local preferencial é o abdômen (região ao redor do umbigo, evitando 5cm ao redor). Coxas também são aceitas. Evitar braços e nádegas."
      },
      {
        "pergunta": "Dalteparina precisa de exame?",
        "resposta": "Em doses profiláticas geralmente não. Em doses terapêuticas ou pacientes especiais (gestantes, obesos, insuficiência renal), o médico pode pedir monitoramento com anti-Xa."
      }
    ]
  },
  {
    "nome": "Dipiridamol 25mg - 75mg - 100mg",
    "generico": "Dipiridamol",
    "tipo": "Antiplaquetário / Vasodilatador Coronariano",
    "sinonimos": ["dipiridamol", "persantin", "dipiridamol 75mg"],
    "descricao": "Antiplaquetário e vasodilatador usado principalmente em combinação com outros medicamentos. Em combinação com aspirina (AAS), é indicado para prevenção secundária de AVC e AIT. Também usado como teste de estresse farmacológico cardíaco (cintilografia miocárdica) e em pacientes com válvulas cardíacas protéticas.",
    "receita": "Sim",
    "receita_display": "🔴 Receita Simples",
    "receita_cor": "vermelho",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_nota": "Tomar com as refeições para reduzir efeitos gástricos.",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "efeitos": "Dor de cabeça (muito comum — especialmente no início), tontura, rubor facial, náusea, diarreia, palpitações. A cefaleia costuma melhorar com o tempo.",
    "aviso_grave": "Pode causar efeito de 'roubo coronariano' em pacientes com angina instável — usar com cautela em cardiopatas. Interação com adenosina (potencializa efeito — evitar combinação). Cafeína antagoniza o efeito do dipiridamol — evitar café antes de exames de estresse.",
    "recomendacao": "⚠️ Evitar cafeína (café, chá, refrigerante de cola, chocolate) durante o uso — a cafeína reduz o efeito antiplaquetário do dipiridamol.",
    "educacao": "O dipiridamol raramente é usado sozinho — sua maior eficácia na prevenção de AVC é em combinação com aspirina de liberação modificada (Aggrenox). Informe o médico se tiver angina ou doença coronariana.",
    "resposta_rapida": [
      "Antiplaquetário para prevenção de AVC",
      "Usado com aspirina",
      "Evitar cafeína",
      "Cefaleia é comum no início",
      "Tomar com refeições"
    ],
    "perguntas_frequentes": [
      {
        "pergunta": "Dipiridamol para que serve?",
        "resposta": "Principalmente para prevenir AVC e AIT em combinação com aspirina. Também é usado em testes cardíacos e em pacientes com válvulas artificiais."
      },
      {
        "pergunta": "Dipiridamol pode tomar café?",
        "resposta": "Evite. A cafeína (café, chá, cola, chocolate) interfere no efeito do dipiridamol, reduzindo sua eficácia antiplaquetária."
      },
      {
        "pergunta": "Dipiridamol dá dor de cabeça?",
        "resposta": "Sim, é o efeito mais comum, especialmente no início. Costuma melhorar após algumas semanas. Se for intensa, consulte o médico."
      }
    ]
  },
  {
    "nome": "Edoxabana 15mg - 30mg - 60mg",
    "generico": "Edoxabana",
    "tipo": "Anticoagulante Oral — Inibidor Direto do Fator Xa",
    "sinonimos": ["edoxabana", "lixiana", "savaysa", "edoxabana 60mg"],
    "descricao": "Anticoagulante oral de nova geração — inibe diretamente o fator Xa, bloqueando a cascata de coagulação. Indicado para prevenção de AVC em fibrilação atrial não valvar, e tratamento e prevenção de trombose venosa profunda e embolia pulmonar (após 5–10 dias de heparina injetável inicial).",
    "receita": "Sim",
    "receita_display": "🔴 Receita Simples",
    "receita_cor": "vermelho",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_nota": "Tomar uma vez ao dia, com ou sem alimentos. Dose ajustada pela função renal.",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "efeitos": "Sangramento (principal risco), anemia, náusea, erupção cutânea. Perfil de sangramento favorável comparado à warfarina.",
    "aviso_grave": "NÃO interromper abruptamente sem orientação médica — risco de AVC. CONTRAINDICADO em insuficiência renal grave. Paradoxalmente, doses muito altas em pacientes com clearance de creatinina entre 95–100 mL/min podem ser menos eficazes — avaliar com médico. Informar sempre ao médico e dentista.",
    "recomendacao": "☎️ LIGUE SAMU (192) em caso de sangramento que não para, fezes escuras, vômito com sangue, urina avermelhada ou dor de cabeça intensa súbita.",
    "educacao": "A edoxabana não é afetada por alimentos com vitamina K — sem restrições alimentares. Não requer INR. Para o tratamento de TVP/embolia pulmonar, começa-se com heparina injetável por 5–10 dias antes de passar para a edoxabana.",
    "resposta_rapida": [
      "Anticoagulante moderno (NOAC/DOAC)",
      "Não precisa de INR",
      "Sem restrições alimentares",
      "Dose única diária",
      "Não interromper sem orientação"
    ],
    "perguntas_frequentes": [
      {
        "pergunta": "Edoxabana precisa de INR?",
        "resposta": "Não. Como os outros NOACs, não requer monitoramento de INR rotineiro."
      },
      {
        "pergunta": "Edoxabana pode comer normalmente?",
        "resposta": "Sim, sem restrições alimentares. Pode ser tomada com ou sem alimentos, e alimentos com vitamina K não interferem no efeito."
      },
      {
        "pergunta": "Edoxabana tem antídoto?",
        "resposta": "O andexanet alfa reverte inibidores do fator Xa (incluindo edoxabana) em situações de emergência, mas disponibilidade no Brasil ainda é limitada."
      }
    ]
  },
  {
    "nome": "Fondaparinux 1,5mg - 2,5mg - 5mg - 7,5mg - 10mg",
    "generico": "Fondaparinux sódico",
    "tipo": "Anticoagulante Injetável — Inibidor Seletivo do Fator Xa",
    "sinonimos": ["fondaparinux", "arixtra", "fondaparinux sódico"],
    "descricao": "Anticoagulante injetável (subcutâneo) sintético — inibe seletivamente o fator Xa sem afetar diretamente a trombina. Usado na prevenção e tratamento de trombose venosa profunda e embolia pulmonar, e em síndrome coronariana aguda. Alternativa importante para pacientes com histórico de trombocitopenia induzida por heparina (TIH).",
    "receita": "Sim",
    "receita_display": "🔴 Receita Simples",
    "receita_cor": "vermelho",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_nota": "Aplicação subcutânea no abdômen. Não aplicar por via intravenosa (exceto em protocolos específicos).",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "efeitos": "Sangramento, hematoma no local da injeção, anemia, náusea. Risco de trombocitopenia é muito baixo (vantagem sobre heparinas).",
    "aviso_grave": "CONTRAINDICADO em insuficiência renal grave (clearance < 30 mL/min) — eliminação exclusivamente renal. Não possui antídoto específico aprovado no Brasil. Sem efeito reversor com protamina (diferente das heparinas).",
    "recomendacao": "⚠️ Alternar os locais de injeção no abdômen diariamente. Não esfregar o local após aplicação — aumenta hematoma.",
    "educacao": "O fondaparinux é sintético — não derivado de animais — e tem menor risco de trombocitopenia induzida por heparina (TIH) comparado às heparinas. É uma boa alternativa para pacientes com alergia ou histórico de TIH.",
    "resposta_rapida": [
      "Anticoagulante injetável sintético",
      "Menor risco de TIH que heparinas",
      "Aplicar no abdômen",
      "Atenção à função renal",
      "Sem antídoto específico"
    ],
    "perguntas_frequentes": [
      {
        "pergunta": "Fondaparinux é igual à enoxaparina?",
        "resposta": "São parecidos (ambos injetáveis, inibem fator Xa), mas diferentes: fondaparinux é sintético, não tem risco relevante de TIH e não é revertido por protamina."
      },
      {
        "pergunta": "Fondaparinux pode usar quem teve TIH?",
        "resposta": "Sim, é uma das alternativas recomendadas para pacientes com histórico de trombocitopenia induzida por heparina, pois raramente causa essa complicação."
      },
      {
        "pergunta": "Fondaparinux dói na injeção?",
        "resposta": "Pode causar leve ardência e hematoma. Pellizcar a pele, aplicar devagar e não esfregar ajudam a minimizar o desconforto."
      }
    ]
  },
  {
    "nome": "Nadroparina 2.850 - 3.800 - 5.700 - 7.600 - 9.500 UI",
    "generico": "Nadroparina cálcica",
    "tipo": "Anticoagulante Injetável — Heparina de Baixo Peso Molecular",
    "sinonimos": ["nadroparina", "fraxiparina", "fraxiparine", "nadroparina cálcica"],
    "descricao": "Heparina de baixo peso molecular (HBPM) injetável. Usada para prevenção e tratamento de trombose venosa profunda e embolia pulmonar, prevenção de coágulos em pacientes cirúrgicos ou imobilizados, e tratamento de síndrome coronariana aguda.",
    "receita": "Sim",
    "receita_display": "🔴 Receita Simples",
    "receita_cor": "vermelho",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_nota": "Aplicação subcutânea no abdômen. Alternar locais. Não aplicar intramuscular.",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "efeitos": "Hematoma no local da injeção (muito comum), sangramento, trombocitopenia induzida por heparina (TIH — rara mas grave), elevação de enzimas hepáticas, osteoporose no uso prolongado.",
    "aviso_grave": "Risco de TIH — monitorar plaquetas especialmente entre o 4º e 14º dia de uso. CONTRAINDICADA em sangramento ativo, trombocitopenia grave e insuficiência renal grave. Pode ser revertida com sulfato de protamina (antídoto parcial).",
    "recomendacao": "⚠️ Aprenda a técnica correta: pellizcar a pele, agulha perpendicular (90°), aplicar devagar, não esfregar após. Informe imediatamente ao médico se aparecerem hematomas incomuns ou queda brusca de plaquetas.",
    "educacao": "A nadroparina e outras HBPMs têm efeito mais previsível que a heparina não fracionada. Em doses profiláticas geralmente não requer monitoramento de coagulação. Na gravidez, é a anticoagulante de escolha quando indicada — a heparina não atravessa a placenta.",
    "resposta_rapida": [
      "Anticoagulante injetável (HBPM)",
      "Aplicação subcutânea no abdômen",
      "Monitorar plaquetas",
      "Alternar locais de injeção",
      "Antídoto parcial: protamina"
    ],
    "perguntas_frequentes": [
      {
        "pergunta": "Nadroparina é igual à enoxaparina?",
        "resposta": "São da mesma classe (HBPMs) e funcionam de forma similar, mas têm potências e dosagens diferentes — não são intercambiáveis sem orientação médica."
      },
      {
        "pergunta": "Nadroparina pode usar na gravidez?",
        "resposta": "Sim, HBPMs como a nadroparina são as anticoagulantes preferidas na gravidez quando necessário — não atravessam a placenta. Sempre com orientação do obstetra."
      },
      {
        "pergunta": "Nadroparina precisa de exame?",
        "resposta": "Em doses profiláticas geralmente não. Em doses terapêuticas ou pacientes especiais, o médico pode pedir monitoramento com anti-Xa. Plaquetas devem ser monitoradas nos primeiros 14 dias."
      }
    ]
  },
  {
    "nome": "Prasugrel 5mg - 10mg",
    "generico": "Prasugrel",
    "tipo": "Antiplaquetário — Inibidor do Receptor P2Y12",
    "sinonimos": ["prasugrel", "efient", "prasugrel 10mg"],
    "descricao": "Antiplaquetário potente da mesma classe do clopidogrel — inibe o receptor P2Y12 das plaquetas, impedindo sua agregação. Indicado em síndrome coronariana aguda (infarto, angina instável) em pacientes submetidos a angioplastia coronariana (stent). Onset mais rápido e efeito mais potente que o clopidogrel.",
    "receita": "Sim",
    "receita_display": "🔴 Receita Simples",
    "receita_cor": "vermelho",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_nota": "Geralmente usado em combinação com aspirina (dupla antiagregação). Tomar com ou sem alimentos.",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "efeitos": "Sangramento (risco maior que clopidogrel), hematomas, epistaxe. Raro: trombocitopenia trombótica trombocitopênica (PTT).",
    "aviso_grave": "CONTRAINDICADO em histórico de AVC ou AIT — aumenta risco de sangramento intracraniano. Contraindicado em pacientes acima de 75 anos (salvo situações especiais) e abaixo de 60kg (dose reduzida para 5mg). Não interromper sem orientação — risco de trombose do stent. Informar ao dentista e cirurgiões antes de qualquer procedimento.",
    "recomendacao": "⚠️ NUNCA interromper o prasugrel sem antes falar com o cardiologista — a interrupção abrupta pode causar trombose do stent, potencialmente fatal.",
    "educacao": "O prasugrel é mais potente que o clopidogrel, mas com maior risco de sangramento. É preferido em pacientes com infarto (STEMI) submetidos à angioplastia. A dupla antiagregação (prasugrel + aspirina) dura geralmente 12 meses após o stent.",
    "resposta_rapida": [
      "Antiplaquetário pós-stent coronariano",
      "Mais potente que clopidogrel",
      "Não interromper sem cardiologista",
      "Contraindicado após AVC/AIT",
      "Cuidado em idosos e baixo peso"
    ],
    "perguntas_frequentes": [
      {
        "pergunta": "Prasugrel pode parar de tomar?",
        "resposta": "Não sem orientação médica. Interromper o prasugrel após colocação de stent pode causar trombose do stent — evento grave e potencialmente fatal. Fale sempre com o cardiologista antes."
      },
      {
        "pergunta": "Prasugrel é melhor que clopidogrel?",
        "resposta": "É mais potente e de ação mais rápida, mas com maior risco de sangramento. A escolha depende do perfil do paciente — histórico de AVC, idade, peso e risco hemorrágico."
      },
      {
        "pergunta": "Prasugrel pode fazer cirurgia?",
        "resposta": "Cirurgias eletivas devem aguardar se possível. O prasugrel deve ser suspenso geralmente 7 dias antes de cirurgias com risco de sangramento — sempre com avaliação do cardiologista e cirurgião."
      }
    ]
  },
  {
    "nome": "Ticagrelor 60mg - 90mg",
    "generico": "Ticagrelor",
    "tipo": "Antiplaquetário — Inibidor Reversível do Receptor P2Y12",
    "sinonimos": ["ticagrelor", "brilique", "brilinta", "ticagrelor 90mg"],
    "descricao": "Antiplaquetário potente que inibe reversivelmente o receptor P2Y12 das plaquetas — diferente do clopidogrel e prasugrel que são irreversíveis. Indicado em síndrome coronariana aguda (infarto, angina instável) para reduzir morte cardiovascular, infarto e AVC. Também indicado em prevenção de eventos cardiovasculares em pacientes com doença arterial estabelecida.",
    "receita": "Sim",
    "receita_display": "🔴 Receita Simples",
    "receita_cor": "vermelho",
    "receita_descricao": "Exige prescrição médica. A receita não é retida na farmácia na maioria dos casos, conforme legislação vigente.",
    "receita_nota": "Tomar duas vezes ao dia, com ou sem alimentos. Usado em combinação com aspirina em dose baixa (75–100mg).",
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "efeitos": "Dispneia (falta de ar) — efeito característico e comum, geralmente leve e transitório. Sangramento, hematomas, tontura, náusea. Bradicardia (queda do ritmo cardíaco) nos primeiros dias.",
    "aviso_grave": "NÃO interromper sem orientação do cardiologista — risco de trombose do stent. CONTRAINDICADO em histórico de sangramento intracraniano e insuficiência hepática grave. Atenção: doses de aspirina acima de 100mg REDUZEM a eficácia do ticagrelor — usar aspirina apenas em dose baixa. Interação importante com inibidores/indutores fortes do CYP3A4.",
    "recomendacao": "⚠️ A falta de ar leve no início é esperada — mas informe ao médico se for intensa ou persistente. NUNCA pare de tomar por conta própria.",
    "educacao": "O ticagrelor é o único antiplaquetário P2Y12 com inibição reversível — significa que o efeito desaparece mais rapidamente após a suspensão (3–5 dias) comparado ao clopidogrel (5–7 dias) e prasugrel (7 dias). Isso é vantajoso antes de cirurgias urgentes. Use sempre a dose de aspirina prescrita — doses maiores interferem no efeito.",
    "resposta_rapida": [
      "Antiplaquetário pós-infarto / stent",
      "Tomar DUAS vezes ao dia",
      "Falta de ar leve é esperada no início",
      "Aspirina só em dose baixa junto",
      "Não interromper sem cardiologista"
    ],
    "perguntas_frequentes": [
      {
        "pergunta": "Ticagrelor dá falta de ar?",
        "resposta": "Sim — é um efeito colateral característico e comum (afeta até 15% dos pacientes). Geralmente é leve e melhora nas primeiras semanas. Se for intensa, persistente ou acompanhar dor no peito, informe ao médico."
      },
      {
        "pergunta": "Ticagrelor pode parar de tomar?",
        "resposta": "Não sem orientação. Interromper após stent coronariano pode causar trombose — evento grave. Fale sempre com o cardiologista antes de qualquer interrupção."
      },
      {
        "pergunta": "Ticagrelor pode tomar com ibuprofeno?",
        "resposta": "Não é recomendado. AINEs aumentam o risco de sangramento em pacientes antiplaquetários. Use paracetamol para dor."
      },
      {
        "pergunta": "Por que tomar aspirina com ticagrelor?",
        "resposta": "A combinação (dupla antiagregação) é mais eficaz para prevenir coágulos após stent. Mas a dose de aspirina deve ser baixa (75–100mg) — doses maiores reduzem o efeito do ticagrelor."
      }
    ]
  }
];

let adicionados = 0;
let atualizados = 0;

for (const novo of novos) {
  const idx = dados.findIndex(m => m.nome === novo.nome);
  if (idx >= 0) {
    dados[idx] = novo;
    console.log(`🔄 Atualizado: ${novo.nome}`);
    atualizados++;
  } else {
    dados.push(novo);
    console.log(`✅ Adicionado: ${novo.nome}`);
    adicionados++;
  }
}

fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2), 'utf8');
console.log(`\n✨ Concluído: ${adicionados} adicionados, ${atualizados} atualizados. Total: ${dados.length} medicamentos.`);
