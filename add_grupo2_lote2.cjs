// Grupo 2 — lote 2: 10 medicamentos de alta relevância clínica no Brasil
const fs   = require('fs');
const path = require('path');
const MEDS_PATH = path.join(__dirname, 'medicamentos.json');
let meds = JSON.parse(fs.readFileSync(MEDS_PATH, 'utf-8'));

const novas = [

// ── VARDENAFILA ───────────────────────────────────────────────────────────────
{
  "nome": "Vardenafila 5mg - 10mg - 20mg (Levitra / Staxyn)",
  "generico": "Vardenafila",
  "tipo": "Inibidor da PDE-5 / Disfunção Erétil",
  "descricao": "Inibidor seletivo da fosfodiesterase tipo 5 (PDE-5) indicado para disfunção erétil em homens adultos. Facilita a ereção ao relaxar a musculatura lisa dos corpos cavernosos pelo acúmulo de GMPc. Age em 25–60 minutos com duração de 4–6 horas. Levitra é o comprimido convencional; Staxyn é a versão orodispersível (dissolve na língua).",
  "receita": "Sim",
  "receita_nota": "Receita simples. Não retida na farmácia.",
  "efeitos": "Cefaleia, rubor facial, congestão nasal, dispepsia, tontura. Visão alterada (azulada ou turva) — transitória. Hipotensão postural, especialmente combinada com outros vasodilatadores.",
  "aviso_grave": "NUNCA usar junto com nitratos (isossorbida, nitroglicerina, nitrito de amila) — queda brusca e fatal da pressão arterial. Contraindicado em doenças cardiovasculares instáveis, angina, IAM recente e hipotensão. Priapismo (ereção >4h) é emergência — procure pronto-socorro imediatamente para evitar dano permanente.",
  "recomendacao": "🔴 EMERGÊNCIA: ereção persistente por mais de 4 horas (priapismo) → pronto-socorro imediato. Hipotensão grave após uso com nitrato → SAMU 192.",
  "educacao": "Tomar 60 minutos antes da relação sexual. Alimentos gordurosos retardam a absorção. Álcool aumenta o risco de hipotensão e tontura — evitar ou limitar. A estimulação sexual é necessária para que o medicamento funcione — não age automaticamente. Não tomar mais de uma dose por dia.",
  "resposta_rapida": [
    "Disfunção erétil — age em 25–60 min",
    "Duração: 4–6 horas",
    "❌ NUNCA com nitrato (queda fatal de pressão)",
    "Priapismo >4h = emergência",
    "Receita simples"
  ],
  "sinonimos": ["Levitra","Staxyn","Vardenafila","vardenafil","Vivanza"],
  "classe_receita": "RECEITA_SIMPLES",
  "receita_display": "🟡 Receita Simples",
  "receita_cor": "amarelo",
  "receita_obrigatoria": true,
  "tipo_receita": "simples",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Qual a diferença entre Vardenafila, Sildenafila e Tadalafila?",
      "resposta": "Todos são inibidores da PDE-5 para disfunção erétil. A diferença está no tempo de ação: sildenafila (Viagra) age em 30–60 min por 4–6h; vardenafila (Levitra) age em 25–60 min por 4–6h (ligeiramente mais potente que a sildenafila); tadalafila (Cialis) age em 30 min e dura até 36h. A escolha depende da preferência e do perfil de efeitos do paciente."
    },
    {
      "pergunta": "Por que não posso misturar com remédio para o coração?",
      "resposta": "Nitratos (isossorbida, nitroglicerina) também dilatam os vasos. A combinação com inibidores da PDE-5 causa queda brusca e perigosa da pressão arterial, podendo resultar em choque circulatório e morte. Essa interação é contraindicação absoluta, independentemente da dose ou do intervalo entre os medicamentos."
    },
    {
      "pergunta": "Posso tomar Vardenafila todos os dias?",
      "resposta": "Não é recomendado o uso diário de vardenafila. Para uso contínuo diário, a tadalafila em dose baixa (5mg) é a opção aprovada. Vardenafila é indicada sob demanda — quando necessário, no máximo uma vez ao dia."
    },
    {
      "pergunta": "O Staxyn dissolve na língua — pode engolir?",
      "resposta": "O Staxyn (vardenafila orodispersível) foi formulado para dissolver na língua sem água. Não deve ser engolido inteiro nem partido. Tem a mesma eficácia que o comprimido convencional, porém com absorção mais rápida em alguns casos."
    }
  ],
  "descricao_seo": "Vardenafila (Levitra/Staxyn) é indicada para disfunção erétil. Age em 25–60 min com duração de 4–6h. Nunca combinar com nitratos — risco fatal. Requer receita médica.",
  "quando_procurar_medico": "Urgência: ereção por mais de 4 horas (priapismo), dor no peito, tontura intensa ou desmaio após uso, alterações visuais súbitas ou perda de visão.",
  "alerta_farmaceutico": "Verificar uso concomitante de nitratos antes de dispensar — contraindicação absoluta. Atenção a pacientes que usam alfa-bloqueadores (doxazosina, tansulosina) — hipotensão aditiva: recomendar intervalo de pelo menos 6 horas. Não dispensar para menores de 18 anos."
},

// ── ERGOTAMINA ────────────────────────────────────────────────────────────────
{
  "nome": "Ergotamina + Cafeína (Cafertil / Cafergot)",
  "generico": "Ergotamina Tartarato",
  "tipo": "Alcaloide do Ergot / Antienxaquecoso Vasoconstritores",
  "descricao": "Alcaloide vasoconstritor derivado do fungo Claviceps purpurea. A associação com cafeína potencializa a absorção e o efeito vasoconstritor. Indicado para tratamento agudo da crise de enxaqueca e cefaleia em salvas quando triptanos não são disponíveis ou contraindicados. Uso muito difundido no Brasil, especialmente em formulações magistrais. Está sendo substituído pelos triptanos (mais seguros), mas permanece amplamente usado.",
  "receita": "Sim",
  "receita_nota": "Receita simples. Uso com cautela pelo risco de dependência e uso excessivo.",
  "efeitos": "Náusea, vômitos, formigamento e dormência nos membros, fraqueza, câimbras musculares. Com uso excessivo: isquemia periférica (dedos frios, azulados), cefaleia de rebote por uso excessivo.",
  "aviso_grave": "Risco de ergotismo com uso excessivo ou prolongado: vasoespasmo grave com isquemia de membros, intestino e coração — potencialmente levando a gangrena. NUNCA exceder 6mg por crise ou 10mg por semana. Contraindicado em gravidez (pode causar aborto), doença vascular periférica, coronariopatia, hipertensão não controlada e insuficiência hepática/renal grave.",
  "recomendacao": "🔴 EMERGÊNCIA: dor intensa nas pernas, dedos azulados ou frios, dor no peito durante ou após uso — pronto-socorro imediato (isquemia por ergotismo).",
  "educacao": "Tomar ao primeiro sinal da crise — quanto mais cedo, maior a eficácia. Iniciar com a menor dose eficaz (1 comprimido) e repetir após 30 minutos se necessário, até o máximo da bula. Não ultrapassar 2 dias de uso por semana — o uso frequente causa cefaleia de rebote (cefaleia por uso excessivo de analgésico). Guardar longe do calor e umidade.",
  "resposta_rapida": [
    "Crise de enxaqueca — vasoconstritor",
    "Usar no início da crise",
    "Max: 6mg/crise, 10mg/semana",
    "❌ Contraindicado na gravidez",
    "Não combinar com triptanos"
  ],
  "sinonimos": ["Cafertil","Cafergot","Ergotamina","ergotamina tartarato","tartarato de ergotamina","ergot"],
  "classe_receita": "RECEITA_SIMPLES",
  "receita_display": "🟡 Receita Simples",
  "receita_cor": "amarelo",
  "receita_obrigatoria": true,
  "tipo_receita": "simples",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Ergotamina e triptano podem ser usados juntos?",
      "resposta": "Não — é contraindicado. Ambos são vasoconstritores e a combinação pode causar vasoespasmo grave. O intervalo mínimo entre os dois é de 24 horas (ergotamina após triptano) ou mais, dependendo de qual ergotamínico foi usado."
    },
    {
      "pergunta": "Por que a ergotamina causa cefaleia de rebote?",
      "resposta": "O uso frequente (mais de 2 dias por semana) de ergotamina — assim como outros analgésicos — pode causar 'cefaleia por uso excessivo de medicamento' (CUEM): a cabeça dói mais quando o medicamento passa do efeito, criando um ciclo vicioso. Limitar o uso a no máximo 10 dias por mês."
    },
    {
      "pergunta": "Por que a ergotamina é contraindicada na gravidez?",
      "resposta": "A ergotamina estimula a musculatura uterina e causa vasoconstrição placentária — pode provocar aborto, parto prematuro e malformações fetais graves. É contraindicação absoluta durante toda a gestação e amamentação."
    }
  ],
  "descricao_seo": "Ergotamina (Cafertil/Cafergot) é usada no tratamento agudo da enxaqueca. Vasoconstritor potente — nunca combinar com triptanos. Contraindicado na gravidez. Limite de uso: 10mg/semana.",
  "quando_procurar_medico": "Urgência: dedos ou pés frios, azulados ou com dor intensa após uso (ergotismo), dor no peito, enxaquecas mais frequentes que 2x/semana (risco de cefaleia de rebote) ou ausência de resposta ao tratamento.",
  "alerta_farmaceutico": "Verificar frequência de uso — mais de 10 dias/mês indica risco de cefaleia por uso excessivo. Contraindicado em gestantes, pacientes com doença vascular, coronariopatia ou uso de macrolídeos/azóis (elevam ergotamina a níveis tóxicos). Produto com margem de segurança estreita."
},

// ── ETONOGESTREL ──────────────────────────────────────────────────────────────
{
  "nome": "Implanon NXT (Etonogestrel 68mg — Implante Subdérmico)",
  "generico": "Etonogestrel",
  "tipo": "Contraceptivo Progestagênico de Longa Duração (LARC)",
  "descricao": "Implante subdérmico contraceptivo com haste única de 4cm contendo 68mg de etonogestrel, liberados lentamente por até 3 anos. Um dos métodos contraceptivos mais eficazes disponíveis (>99% de eficácia). Inserido no interior do braço não dominante por profissional de saúde treinado. Disponível no SUS brasileiro desde 2011. Etonogestrel é o metabólito ativo do desogestrel.",
  "receita": "Sim",
  "receita_nota": "Receita médica obrigatória. Inserção por médico ou enfermeiro habilitado.",
  "efeitos": "Alteração do padrão menstrual (o mais comum): amenorreia, sangramento irregular, spotting. Cefaleia, acne, ganho de peso leve, mastalgia, alterações de humor. O padrão de sangramento melhora com o tempo de uso.",
  "aviso_grave": "Contraindicado em tromboembolismo venoso ativo, sangramento vaginal não esclarecido, hepatopatia grave ativa e carcinoma de mama. Não protege contra DSTs/HIV. Eficácia pode ser reduzida por indutores enzimáticos (rifampicina, fenitoína, carbamazepina) — reconsiderar o método nesses casos.",
  "recomendacao": "🔴 Procure atendimento se: dor intensa no braço no local do implante, implante não palpável (pode ter migrado), gravidez suspeita durante o uso.",
  "educacao": "O implante começa a agir em 24h se inserido nos primeiros 5 dias do ciclo. Após inserção, palpe o implante regularmente para confirmar que está no lugar. Ao término dos 3 anos, deve ser removido (mesmo se desejado novo implante). A fertilidade retorna rapidamente após a remoção. Não interfere na amamentação — pode ser usado em lactantes.",
  "resposta_rapida": [
    "Implante de 3 anos — >99% eficaz",
    "Haste no braço — inserção médica",
    "Altera o ciclo menstrual (normal)",
    "Disponível no SUS",
    "❌ Não protege contra DSTs"
  ],
  "sinonimos": ["Implanon","Implanon NXT","etonogestrel","implante subdérmico","implante contraceptivo","Nexplanon"],
  "classe_receita": "RECEITA_SIMPLES",
  "receita_display": "🟡 Receita Simples",
  "receita_cor": "amarelo",
  "receita_obrigatoria": true,
  "tipo_receita": "simples",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "O implante dói na inserção?",
      "resposta": "A inserção é feita com anestesia local — o procedimento em si não dói. Pode haver desconforto, hematoma e sensibilidade no local por alguns dias após a inserção. É realizado ambulatorialmente em cerca de 5 minutos."
    },
    {
      "pergunta": "Por que meu ciclo ficou irregular com o implante?",
      "resposta": "Alteração do padrão menstrual é o efeito mais comum e esperado do implante de etonogestrel. O efeito varia entre mulheres: algumas ficam em amenorreia (sem menstruação), outras têm spotting irregular. Isso não indica falha do implante — é uma resposta normal ao progestágeno. Com o tempo, muitas mulheres desenvolvem amenorreia. Se o sangramento for muito intenso, converse com seu médico."
    },
    {
      "pergunta": "O implante pode migrar no corpo?",
      "resposta": "A migração é rara mas possível. Sempre que sentir o implante deve estar em seu lugar — se não conseguir palpá-lo, procure seu médico. Remoções difíceis por migração profunda requerem imagem (ultrassom) para localização."
    },
    {
      "pergunta": "O implante interfere em outros remédios?",
      "resposta": "Sim — medicamentos indutores de enzimas hepáticas como rifampicina, fenitoína, carbamazepina e barbitúricos podem reduzir a eficácia do implante. Se você usa esses medicamentos por longo prazo, discuta com seu médico sobre método contraceptivo alternativo."
    }
  ],
  "descricao_seo": "Implanon NXT (etonogestrel) é implante subdérmico contraceptivo com eficácia >99% por 3 anos. Disponível no SUS. Pode causar irregularidade menstrual. Inserção por profissional habilitado.",
  "quando_procurar_medico": "Procure atendimento se: implante não palpável, dor intensa no local de inserção, suspeita de gravidez, sangramento vaginal muito intenso ou prolongado.",
  "alerta_farmaceutico": "Verificar data de validade antes de dispensar (implante pré-carregado no aplicador). Produto sensível à temperatura — não refrigerar. Remoção só por profissional treinado. Indutores enzimáticos comprometem a eficácia — verificar interações na dispensação."
},

// ── ETANERCEPTE ───────────────────────────────────────────────────────────────
{
  "nome": "Enbrel / Benepali (Etanercepte)",
  "generico": "Etanercepte",
  "tipo": "Anti-TNF / Imunobiológico",
  "descricao": "Proteína de fusão recombinante que atua como receptor solúvel do TNF-alfa (fator de necrose tumoral), bloqueando sua atividade inflamatória. Indicado para artrite reumatoide moderada a grave, artrite psoriásica, espondilite anquilosante, artrite idiopática juvenil poliarticular e psoríase em placas moderada a grave. Aplicação subcutânea 1×/semana (50mg) ou 2×/semana (25mg). Disponível via SUS para algumas indicações.",
  "receita": "Sim",
  "receita_nota": "Prescrição por reumatologista, dermatologista ou especialista. Dispensado em farmácias de alto custo (componente especializado do SUS).",
  "efeitos": "Reações no local de injeção (rubor, dor, edema — transitórios). Infecções das vias aéreas superiores. Risco aumentado de infecções graves. Raramente: desmielinização, lupus-like, insuficiência cardíaca.",
  "aviso_grave": "Risco de infecções graves, incluindo tuberculose (reativação de TB latente — rastreamento obrigatório com PPD/IGRA antes do início), fungos endêmicos (paracoccidioidomicose, histoplasmose) e sepse. Contraindicado em infecção ativa grave, ICC classe III-IV, esclerose múltipla. Risco aumentado de linfoma com uso prolongado.",
  "recomendacao": "🔴 URGÊNCIA: febre, tosse persistente, perda de peso inexplicada (possível TB reativada), sinais de infecção grave — procure seu médico imediatamente e informe que usa imunossupressor biológico.",
  "educacao": "Guardar na geladeira (2°C–8°C) — não congelar. Retirar da geladeira 30 minutos antes de aplicar (temperatura ambiente facilita a injeção). Rodar os locais de aplicação (barriga, coxas, braço). Não sacudir o frasco. Atualizar vacinas (exceto vírus vivo) antes de iniciar o tratamento.",
  "resposta_rapida": [
    "Anti-TNF: reduz inflamação crônica",
    "AR, Espondilite, Psoríase",
    "Injeção SC semanal",
    "⚠️ Rastrear TB antes obrigatório",
    "Conservar na geladeira"
  ],
  "sinonimos": ["Enbrel","Benepali","Etanercepte","etanercept","anti-TNF","TNF-alfa"],
  "classe_receita": "USO_ESPECIALIZADO",
  "receita_display": "🏥 Uso Especializado",
  "receita_cor": "roxo",
  "receita_obrigatoria": true,
  "tipo_receita": "especial",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Por que preciso fazer PPD antes de usar Etanercepte?",
      "resposta": "O TNF é essencial para manter a tuberculose latente 'contida' no granuloma. Ao bloquear o TNF, o etanercepte pode fazer com que uma infecção latente — sem sintomas — se torne tuberculose ativa, disseminada e grave. O rastreamento e tratamento profilático da TB latente antes de iniciar o biológico é obrigatório no Brasil."
    },
    {
      "pergunta": "Posso tomar vacina enquanto uso etanercepte?",
      "resposta": "Vacinas inativadas (gripe, pneumococo, hepatite) são recomendadas e devem ser mantidas em dia — mas de preferência aplicadas antes de iniciar o biológico para melhor resposta. Vacinas de vírus vivo (febre amarela, varicela, BCG) são contraindicadas durante o tratamento."
    },
    {
      "pergunta": "O etanercepte causa câncer?",
      "resposta": "Há um risco levemente aumentado de linfoma com uso prolongado de anti-TNF, embora parte desse risco seja atribuída à própria doença inflamatória subjacente (AR, psoríase). O benefício do controle da doença geralmente supera esse risco. Seu médico monitorará essa questão regularmente."
    }
  ],
  "descricao_seo": "Etanercepte (Enbrel/Benepali) é biológico anti-TNF para artrite reumatoide, psoríase e espondilite. Rastreamento de TB obrigatório antes do início. Injeção SC semanal. Disponível no SUS.",
  "quando_procurar_medico": "Urgência: febre, tosse persistente, perda de peso, qualquer infecção, dor articular nova — informe sempre que usa biológico.",
  "alerta_farmaceutico": "Confirmar rastreamento de TB e vacinas antes de dispensar. Conservação 2°C–8°C. Biossimilares disponíveis (Benepali): verificar se a prescrição especifica a marca ou aceita biossimilar. Não agitar — pode desnaturar a proteína."
},

// ── MICOFENOLATO ──────────────────────────────────────────────────────────────
{
  "nome": "CellCept / Myfortic (Micofenolato)",
  "generico": "Micofenolato de Mofetila / Micofenolato Sódico",
  "tipo": "Imunossupressor / Inibidor da Síntese de Purinas",
  "descricao": "Imunossupressor que inibe a inosina monofosfato desidrogenase (IMPDH), bloqueando a síntese de novo de purinas em linfócitos T e B. Amplamente usado na prevenção de rejeição de transplantes renais, hepáticos e cardíacos (em associação com tacrolimo ou ciclosporina + corticoide). Também indicado em doenças autoimunes refratárias (lúpus nefrítico, vasculites, miopatias). CellCept contém mofetila de micofenolato; Myfortic contém micofenolato sódico (formulação com menor irritação GI).",
  "receita": "Sim",
  "receita_nota": "Uso restrito a centros especializados em transplante ou reumatologia/imunologia. Controle rigoroso.",
  "efeitos": "Diarreia, náusea, vômitos, dor abdominal (muito comuns — reduzidos com Myfortic). Leucopenia, neutropenia, anemia, trombocitopenia. Risco aumentado de infecções oportunistas e neoplasias.",
  "aviso_grave": "Teratogênico — causa malformações fetais graves (fenda labial/palatina, malformações cardíacas). Contracepção eficaz obrigatória durante o tratamento e por 6 semanas após a interrupção. Risco de infecções oportunistas graves (CMV, BK vírus, PML). Risco aumentado de linfoma e câncer de pele — proteção solar diária obrigatória.",
  "recomendacao": "🔴 URGÊNCIA: febre persistente, infecção suspeita, hematúria (BK vírus no rim transplantado), confusão mental (LMP), sangramento intenso (plaquetopenia).",
  "educacao": "Tomar em doses divididas (CellCept 2×/dia; Myfortic 2×/dia). Não abrir, triturar ou mastigar os comprimidos/cápsulas de revestimento entérico (Myfortic) — afeta a liberação. Mulheres em idade fértil devem usar dois métodos contraceptivos simultaneamente. Monitorar hemograma regularmente.",
  "resposta_rapida": [
    "Imunossupressor pós-transplante",
    "CellCept = mofetila | Myfortic = sódico",
    "⚠️ Teratogênico — contracepção dupla",
    "Monitorar hemograma regularmente",
    "Risco de infecções oportunistas"
  ],
  "sinonimos": ["CellCept","Myfortic","micofenolato","mofetila de micofenolato","micofenolato sódico","MMF","micofenolate"],
  "classe_receita": "RECEITA_ESPECIAL",
  "receita_display": "🔴 Controle Especial",
  "receita_cor": "vermelho",
  "receita_obrigatoria": true,
  "tipo_receita": "especial",
  "retencao_receita": true,
  "perguntas_frequentes": [
    {
      "pergunta": "Qual a diferença entre CellCept e Myfortic?",
      "resposta": "Ambos contêm micofenolato, mas em sais diferentes. CellCept = mofetila de micofenolato (pro-droga, convertida a ácido micofenólico no corpo). Myfortic = micofenolato sódico com revestimento entérico, que libera o fármaco no intestino delgado — isso reduz os efeitos colaterais gástricos (náusea, diarreia). As doses não são diretamente intercambiáveis sem ajuste."
    },
    {
      "pergunta": "Por que não posso engravidar tomando micofenolato?",
      "resposta": "O micofenolato é teratogênico comprovado — causa malformações graves no bebê (fenda labial, malformações cardíacas, atresia de conduto auditivo). Dois métodos contraceptivos são necessários simultaneamente durante o tratamento e por 6 semanas após parar. Em caso de gravidez durante o uso, contate imediatamente seu médico."
    },
    {
      "pergunta": "Com que outros remédios o micofenolato não pode ser combinado?",
      "resposta": "Evitar com: rifampicina (reduz muito seus níveis), antiácidos com alumínio/magnésio e colestiramina (reduzem absorção), colchicina (mielossupressão aditiva). Ciclosporina reduz os níveis de micofenolato — o esquema com tacrolimo resulta em níveis mais altos que com ciclosporina."
    }
  ],
  "descricao_seo": "Micofenolato (CellCept/Myfortic) é imunossupressor para transplantes e doenças autoimunes. Teratogênico — requer dois métodos contraceptivos. Monitorar hemograma e sinais de infecção.",
  "quando_procurar_medico": "Urgência: febre, infecção suspeita, sangramento, fraqueza extrema, hematúria persistente, qualquer sinal neurológico (confusão, perda visual).",
  "alerta_farmaceutico": "NUNCA dispensar sem confirmação de contracepção eficaz em mulheres em idade fértil. CellCept e Myfortic NÃO são bioequivalentes — não substituir sem ajuste. Separar administração de antiácidos e colestiramina por ≥2h. Produto teratogênico — manusear com cuidado."
},

// ── DOXAZOSINA ────────────────────────────────────────────────────────────────
{
  "nome": "Doxazosina 2mg - 4mg - 8mg (Carduran / Aradois)",
  "generico": "Doxazosina",
  "tipo": "Alfabloqueador Seletivo (α1) / Anti-hipertensivo e HPB",
  "descricao": "Bloqueador seletivo dos receptores alfa-1 adrenérgicos, com dupla indicação: hipertensão arterial e hiperplasia prostática benigna (HPB) com sintomas do trato urinário inferior. Na HPB, relaxa a musculatura lisa da próstata e colo vesical, melhorando o fluxo urinário. Disponível em formulação convencional (1-2×/dia) e de liberação prolongada (GITS — 1×/dia).",
  "receita": "Sim",
  "receita_nota": "Receita simples.",
  "efeitos": "Hipotensão postural (especialmente na 1ª dose e ao levantar rapidamente) — principal efeito adverso. Tontura, cefaleia, cansaço, edema periférico, ejaculação retrógrada.",
  "aviso_grave": "Efeito de primeira dose: hipotensão postural significativa após a 1ª dose, especialmente em idosos ou pacientes em uso de outros anti-hipertensivos. Iniciar sempre com dose baixa (1mg) à noite. Síndrome da íris flácida intraoperatória (IFIS) — pode ocorrer durante cirurgia de catarata mesmo após suspensão do medicamento: informar o oftalmologista antes de qualquer cirurgia ocular.",
  "recomendacao": "🔴 Queda súbita de pressão com síncope (desmaio) após a primeira dose ou levantada rápida — deitar imediatamente, elevar as pernas e acionar o SAMU se não recuperar em minutos.",
  "educacao": "Tomar a primeira dose à noite, antes de dormir — para reduzir o impacto da hipotensão postural. Levantar devagar da cama e cadeiras, especialmente nos primeiros dias. Se tiver cirurgia de catarata programada, avise o médico e o anestesista que usa ou usou doxazosina — mesmo que tenha parado há meses.",
  "resposta_rapida": [
    "HPB (próstata) e hipertensão",
    "Alfa-1 bloqueador",
    "1ª dose à noite — risco de queda de pressão",
    "Avise o médico antes de cirurgia ocular",
    "Receita simples"
  ],
  "sinonimos": ["Carduran","Aradois","Doxazosina","doxazosin","Cardura","Flomax complementar"],
  "classe_receita": "RECEITA_SIMPLES",
  "receita_display": "🟡 Receita Simples",
  "receita_cor": "amarelo",
  "receita_obrigatoria": true,
  "tipo_receita": "simples",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Doxazosina serve para próstata ou para pressão?",
      "resposta": "Para ambos. Na hiperplasia prostática benigna (HPB), relaxa a musculatura da próstata e da bexiga, melhorando o jato urinário e reduzindo a frequência. Na hipertensão, dilata os vasos sanguíneos. Em homens hipertensos com HPB, é especialmente vantajosa por tratar ambas as condições com um único medicamento."
    },
    {
      "pergunta": "Por que devo tomar a 1ª dose à noite?",
      "resposta": "A doxazosina pode causar queda brusca de pressão após a primeira dose. Tomando à noite (deitado para dormir), o risco de desmaio ao se levantar é minimizado. Após os primeiros dias, o corpo se adapta e a hipotensão postural reduz."
    },
    {
      "pergunta": "O que é a síndrome da íris flácida e por que preciso avisar o médico?",
      "resposta": "Durante a cirurgia de catarata, os bloqueadores alfa-1 podem fazer com que a pupila se contraia inesperadamente e a íris fique flácida — dificultando o procedimento e aumentando complicações. Isso pode ocorrer mesmo se você parou a doxazosina meses antes. O cirurgião deve saber para usar instrumentos e técnicas específicas."
    }
  ],
  "descricao_seo": "Doxazosina (Carduran/Aradois) trata hipertensão e HPB (próstata). Risco de hipotensão postural na primeira dose. Avisar médico antes de cirurgia de catarata. Receita simples.",
  "quando_procurar_medico": "Urgência: desmaio ou queda após início do tratamento, dificuldade total de urinar (retenção urinária), pressão muito baixa com mal-estar.",
  "alerta_farmaceutico": "Síndrome da íris flácida — orientar pacientes a informar o oftalmologista antes de cirurgia de catarata (risco mesmo após descontinuação). Cautela em idosos: risco de queda. Não substituir formulação convencional por GITS sem ajuste de dose."
},

// ── CICLOFOSFAMIDA ────────────────────────────────────────────────────────────
{
  "nome": "Endoxan (Ciclofosfamida)",
  "generico": "Ciclofosfamida",
  "tipo": "Agente Alquilante / Imunossupressor e Antineoplásico",
  "descricao": "Agente alquilante bifuncional que forma ligações cruzadas no DNA, impedindo a replicação celular. Pro-droga ativada pelo CYP2B6 hepático a metabólitos citotóxicos (fosforamida mustarda e acroleína). Dupla indicação: oncológica (linfomas, leucemias, carcinomas) e imunossupressora (lúpus nefrítico, vasculites ANCA, síndrome nefrótica, esclerose múltipla agressiva). Apresenta-se em comprimidos (oral) e frasco para uso IV.",
  "receita": "Sim",
  "receita_nota": "Uso oncológico/hospitalar ou dispensação em farmácias de alto custo (componente especializado). Prescrição exclusiva por especialista.",
  "efeitos": "Mielossupressão (neutropenia, anemia, trombocitopenia). Náuseas e vômitos intensos (especialmente IV). Cistite hemorrágica (por acroleína — urotóxico). Alopecia. Infertilidade (homens e mulheres — dose-cumulativa). Aumento do risco de neoplasias secundárias (câncer de bexiga, leucemias).",
  "aviso_grave": "Cistite hemorrágica — acroleína (metabólito tóxico) danifica a mucosa vesical. Hidratação abundante obrigatória e uso de mesna (protetor vesical) em doses altas/IV. Mielossupressão grave — risco de infecção fatal. Teratogênico. Pneumonia por Pneumocystis jirovecii — profilaxia com cotrimoxazol frequentemente necessária.",
  "recomendacao": "🔴 URGÊNCIA: hematúria (sangue na urina) durante tratamento — parar e procurar emergência (cistite hemorrágica). Febre com neutropenia — emergência oncológica.",
  "educacao": "Beber muito líquido (mínimo 2–3L/dia) durante o tratamento oral para diluir os metabólitos tóxicos na urina e proteger a bexiga. Urinar frequentemente e não reter urina. Em uso IV hospitalar, o mesna é administrado junto para proteção. Mulheres em idade fértil devem usar contracepção eficaz.",
  "resposta_rapida": [
    "Quimioterapia e imunossupressor",
    "Linfoma, Lúpus, Vasculite",
    "⚠️ Beber muito líquido (proteger bexiga)",
    "Sangue na urina = emergência",
    "Mielossupressão grave"
  ],
  "sinonimos": ["Endoxan","Ciclofosfamida","ciclofosfamide","cyclophosphamide","CFA"],
  "classe_receita": "USO_HOSPITALAR",
  "receita_display": "🏥 Uso Especializado",
  "receita_cor": "roxo",
  "receita_obrigatoria": true,
  "tipo_receita": "hospitalar",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Por que preciso beber muita água tomando ciclofosfamida?",
      "resposta": "A ciclofosfamida é convertida em acroleína, um metabólito tóxico que é excretado pela urina e pode inflamar e sangrar a bexiga (cistite hemorrágica). Beber muitos líquidos dilui a acroleína na urina e reduz o tempo de contato com a mucosa vesical. Em doses altas, usa-se mesna IV como protetor adicional."
    },
    {
      "pergunta": "Ciclofosfamida causa infertilidade definitiva?",
      "resposta": "Pode causar infertilidade, especialmente em doses cumulativas altas. O risco é maior em mulheres acima de 30 anos e em homens. Em jovens que desejam ter filhos, é possível realizar criopreservação de gametas (espermatozoides ou óvulos) antes do tratamento. Converse com seu médico sobre essa possibilidade antes de iniciar."
    },
    {
      "pergunta": "Ciclofosfamida para lúpus ou vasculite é a mesma coisa que para câncer?",
      "resposta": "É o mesmo medicamento, mas em doses muito diferentes. Para condições autoimunes (lúpus nefrítico, vasculites), usa-se em doses imunossupressoras — menores que as oncológicas, com esquemas em pulso mensal ou oral em doses baixas. Os efeitos colaterais existem, mas são proporcionalmente menores."
    }
  ],
  "descricao_seo": "Ciclofosfamida (Endoxan) é usado em quimioterapia de linfomas e como imunossupressor em lúpus e vasculites. Requer hidratação intensa para evitar cistite hemorrágica. Mielossupressor grave.",
  "quando_procurar_medico": "Urgência: sangue na urina, febre com neutropenia, tosse com dispneia (pneumonia oportunista), qualquer sinal de infecção durante tratamento.",
  "alerta_farmaceutico": "Dispensar com orientação rigorosa sobre hidratação. Em doses altas ou IV: verificar prescrição de mesna (uroprotétor). Teratogênico — confirmar contracepção. Produto citotóxico — manusear com EPI. Monitorar hemograma antes de cada ciclo."
},

// ── BUSPIRONA ─────────────────────────────────────────────────────────────────
{
  "nome": "Buspirona 5mg - 10mg - 30mg (Buspar / Ansitec)",
  "generico": "Buspirona",
  "tipo": "Ansiolítico Não-Benzodiazepínico / Agonista Parcial 5-HT1A",
  "descricao": "Ansiolítico agonista parcial dos receptores de serotonina 5-HT1A e antagonista dos receptores de dopamina D2. Indicado para transtorno de ansiedade generalizada (TAG). Não causa sedação, tolerância, dependência nem síndrome de abstinência — diferenciais importantes em relação aos benzodiazepínicos. O efeito ansiolítico demora 2–4 semanas para se instalar. Amplamente usada como alternativa ou adjuvante em pacientes com risco de dependência.",
  "receita": "Sim",
  "receita_nota": "Receita simples. Não controlado (sem retenção).",
  "efeitos": "Tontura, cefaleia, náusea, nervosismo paradoxal transitório no início do tratamento. Raramente: taquicardia, agitação. Sem sedação significativa — não prejudica a direção em doses normais.",
  "aviso_grave": "Não usar com IMAOs — risco de síndrome serotonérgica. Não tem efeito imediato nas crises de ansiedade aguda (pânico) — não serve como medicamento de resgate. Não interromper abruptamente após uso prolongado (embora sem dependência física real, a interrupção abrupta pode causar recorrência dos sintomas de ansiedade).",
  "recomendacao": "🟡 Não é medicamento de emergência para crise de pânico — não funciona na hora. Para crise aguda, discuta com seu médico sobre resgate adequado.",
  "educacao": "Tomar sempre nos mesmos horários, com ou sem alimento. O efeito pleno leva 2–4 semanas — não desistir nas primeiras semanas. A buspirona NÃO tem efeito imediato — se você estava usando benzodiazepínicos, a troca deve ser feita gradualmente sob supervisão médica. Álcool deve ser evitado.",
  "resposta_rapida": [
    "Ansiedade generalizada (TAG)",
    "Não causa dependência nem sedação",
    "Efeito começa em 2–4 semanas",
    "NÃO serve para crise aguda",
    "Não controlado — receita simples"
  ],
  "sinonimos": ["Buspar","Ansitec","Buspirona","buspirón","buspirona cloridrato","buspirone"],
  "classe_receita": "RECEITA_SIMPLES",
  "receita_display": "🟡 Receita Simples",
  "receita_cor": "amarelo",
  "receita_obrigatoria": true,
  "tipo_receita": "simples",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Buspirona vicia como o diazepam?",
      "resposta": "Não. A buspirona não age nos receptores GABA (receptor dos benzodiazepínicos) e não causa tolerância, dependência física nem síndrome de abstinência clássica. É uma das principais vantagens sobre os benzodiazepínicos, especialmente em pacientes com histórico de dependência."
    },
    {
      "pergunta": "Por que a buspirona não funciona na hora como o rivotril?",
      "resposta": "Buspirona e benzodiazepínicos têm mecanismos totalmente diferentes. Os benzodiazepínicos agem em segundos a minutos por ativação do GABA. A buspirona modula a serotonina gradualmente — requer semanas de uso contínuo para reorganizar o sistema. Não é uma droga de alívio imediato, mas de tratamento preventivo da ansiedade crônica."
    },
    {
      "pergunta": "Posso dirigir tomando buspirona?",
      "resposta": "Sim, geralmente. A buspirona não causa sedação significativa — diferente dos benzodiazepínicos. Porém, especialmente no início do tratamento (quando pode causar tontura), recomenda-se cautela. Após algumas semanas, a maioria dos pacientes não apresenta comprometimento da direção."
    },
    {
      "pergunta": "Posso tomar buspirona e clonazepam juntos?",
      "resposta": "Não existe contraindicação formal, mas a combinação deve ser avaliada pelo médico. Geralmente a buspirona é prescrita quando se deseja reduzir ou substituir o benzodiazepínico — a transição deve ser gradual para evitar rebote de ansiedade."
    }
  ],
  "descricao_seo": "Buspirona (Ansitec/Buspar) é ansiolítico sem dependência para transtorno de ansiedade generalizada. Não tem efeito imediato — leva 2–4 semanas. Não sedativo. Não controlado.",
  "quando_procurar_medico": "Procure médico se: ansiedade piorando após 4 semanas de uso, crises de pânico frequentes (buspirona não é o medicamento adequado para isso), agitação ou piora dos sintomas.",
  "alerta_farmaceutico": "Orientar que efeito demora 2–4 semanas — evitar abandono precoce. Não é medicamento de resgate para crises agudas. Atenção à transição de benzodiazepínicos: reduzir gradualmente para evitar abstinência (a abstinência é do benzo, não da buspirona)."
},

// ── GOLIMUMABE ────────────────────────────────────────────────────────────────
{
  "nome": "Simponi (Golimumabe)",
  "generico": "Golimumabe",
  "tipo": "Anticorpo Monoclonal Anti-TNF-alfa / Imunobiológico",
  "descricao": "Anticorpo monoclonal humano que neutraliza o TNF-alfa solúvel e transmembrana, bloqueando a cascata inflamatória. Indicado para artrite reumatoide moderada a grave (em combinação com metotrexato), artrite psoriásica, espondilite anquilosante e colite ulcerativa moderada a grave. Diferencial: aplicação subcutânea uma vez por mês (50mg/mês). Disponível também em formulação IV para colite ulcerativa. Disponível via SUS para algumas indicações.",
  "receita": "Sim",
  "receita_nota": "Prescrição por reumatologista, gastroenterologista ou especialista. Dispensado em farmácias de alto custo (componente especializado do SUS).",
  "efeitos": "Infecções do trato respiratório superior. Reações no local de injeção. Risco aumentado de infecções graves. Reativação de tuberculose. Cefaleia, hipertensão.",
  "aviso_grave": "Rastreamento obrigatório para tuberculose latente (PPD/IGRA) e hepatite B (HBsAg, anti-HBc) antes do início do tratamento. Contraindicado em infecção ativa grave, ICC classe III-IV, desmielinização e tuberculose ativa não tratada. Risco aumentado de linfoma e neoplasias.",
  "recomendacao": "🔴 URGÊNCIA: febre, tosse persistente, perda de peso (possível TB), qualquer infecção — procure seu médico imediatamente.",
  "educacao": "Aplicação SC no abdômen, coxas ou braço uma vez por mês. Retirar da geladeira 30 minutos antes. Não agitar. Registrar a data de cada aplicação para não perder o prazo mensal. Atualizar cartão de vacinas (exceto vírus vivo) antes de iniciar.",
  "resposta_rapida": [
    "Anti-TNF mensal — 1 injeção/mês",
    "AR, Espondilite, Colite Ulcerativa",
    "⚠️ Rastrear TB e Hepatite B antes",
    "Conservar na geladeira",
    "Disponível no SUS"
  ],
  "sinonimos": ["Simponi","Golimumabe","golimumab","anti-TNF","TNF-alfa"],
  "classe_receita": "USO_ESPECIALIZADO",
  "receita_display": "🏥 Uso Especializado",
  "receita_cor": "roxo",
  "receita_obrigatoria": true,
  "tipo_receita": "especial",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Qual a diferença do Golimumabe para outros anti-TNF?",
      "resposta": "O diferencial do golimumabe é a comodidade: é o único anti-TNF SC com dosagem mensal (1 injeção por mês), enquanto adalimumabe exige a cada 2 semanas e etanercepte semanalmente. Para colite ulcerativa, há opção IV (a cada 8 semanas após indução). O mecanismo de ação é o mesmo dos demais anti-TNF."
    },
    {
      "pergunta": "Por que preciso fazer exame de tuberculose antes de tomar Golimumabe?",
      "resposta": "O TNF é essencial para conter o bacilo da tuberculose nos granulomas pulmonares. Ao bloqueá-lo, o golimumabe pode reativar uma infecção latente (sem sintomas) e transformá-la em tuberculose ativa grave, disseminada e potencialmente fatal. PPD/IGRA positivo requer tratamento preventivo antes de iniciar o biológico."
    }
  ],
  "descricao_seo": "Golimumabe (Simponi) é anticorpo anti-TNF de aplicação mensal para artrite reumatoide, espondilite anquilosante, artrite psoriásica e colite ulcerativa. Rastreamento de TB obrigatório.",
  "quando_procurar_medico": "Urgência: febre, sintomas de infecção, icterícia (hepatite B reativada), dor articular nova ou piora acentuada.",
  "alerta_farmaceutico": "Confirmar rastreamento de TB e hepatite B antes de dispensar. Conservação 2°C–8°C. Apresentações: 50mg/0,5mL e 100mg/1mL (IV) — verificar indicação e dose. Não agitar."
},

// ── EPLERENONA ────────────────────────────────────────────────────────────────
{
  "nome": "Inspra (Eplerenona)",
  "generico": "Eplerenona",
  "tipo": "Antagonista Seletivo da Aldosterona / Diurético Poupador de K⁺",
  "descricao": "Antagonista seletivo dos receptores de mineralocorticoide (aldosterona), com alta seletividade para o receptor de aldosterona em relação aos receptores androgênicos e progestagênicos — isso resulta em muito menos efeitos endócrinos que a espironolactona (sem ginecomastia). Indicado para insuficiência cardíaca pós-infarto do miocárdio (IAM) com disfunção ventricular esquerda, reduzindo mortalidade cardiovascular. Também usado em hipertensão refratária.",
  "receita": "Sim",
  "receita_nota": "Receita simples.",
  "efeitos": "Hipercalemia (principal — monitoração obrigatória), hipotensão, tontura, cefaleia, elevação de creatinina. Sem ginecomastia nem disfunção sexual (diferencial frente à espironolactona).",
  "aviso_grave": "Hipercalemia grave — potencialmente fatal (parada cardíaca). Contraindicada em K⁺ sérico >5,0 mEq/L, TFG <30 mL/min, diabetes com proteinúria grave e uso concomitante de outros poupadores de K⁺ ou IECAs em dose alta. Monitoração do potássio sérico obrigatória nas primeiras semanas e periodicamente.",
  "recomendacao": "🔴 URGÊNCIA: fraqueza muscular intensa, palpitações, alteração do ritmo cardíaco, confusão mental durante o tratamento → dosagem de K⁺ sérico urgente.",
  "educacao": "Monitorar potássio sérico com frequência (1ª semana, 1 mês, depois periodicamente). Evitar alimentos ricos em potássio em excesso (banana, laranja, abacate, amendoim). Comunicar todos os medicamentos ao médico — muitos anti-hipertensivos e suplementos de potássio agravam a hipercalemia. Não tomar sem monitoração regular.",
  "resposta_rapida": [
    "Insuficiência cardíaca pós-IAM",
    "Poupador de potássio seletivo",
    "⚠️ Risco de hipercalemia fatal",
    "Monitorar K⁺ regularmente",
    "Sem ginecomastia (diferencial)"
  ],
  "sinonimos": ["Inspra","Eplerenona","eplerenone","Inspira","antagonista aldosterona"],
  "classe_receita": "RECEITA_SIMPLES",
  "receita_display": "🟡 Receita Simples",
  "receita_cor": "amarelo",
  "receita_obrigatoria": true,
  "tipo_receita": "simples",
  "retencao_receita": false,
  "perguntas_frequentes": [
    {
      "pergunta": "Qual a diferença entre Eplerenona e Espironolactona?",
      "resposta": "Ambas bloqueiam a aldosterona. A espironolactona é não-seletiva e também bloqueia receptores de androgênio e progesterona — causando ginecomastia (crescimento de mama em homens), disfunção erétil e irregularidade menstrual. A eplerenona é seletiva para a aldosterona — sem esses efeitos hormonais. Porém, a eplerenona é mais cara e a espironolactona tem mais evidências em insuficiência cardíaca com FE reduzida."
    },
    {
      "pergunta": "Por que o potássio é tão importante monitorar?",
      "resposta": "A eplerenona retém potássio ao bloquear a aldosterona. Em excesso, o potássio alto (hipercalemia) perturba o ritmo cardíaco — podendo causar arritmias graves e parada cardíaca. Monitorar o K⁺ sérico regularmente é fundamental, especialmente no início do tratamento e ao associar com outros medicamentos que também retêm potássio."
    },
    {
      "pergunta": "Posso comer banana à vontade tomando eplerenona?",
      "resposta": "Não em excesso. Banana, laranja, abacate, amendoim e água de coco são ricos em potássio. Com a eplerenona retendo potássio, consumo excessivo pode elevar ainda mais o K⁺ sérico. Uma dieta equilibrada é suficiente — não precisa eliminar esses alimentos, mas evitar exageros."
    }
  ],
  "descricao_seo": "Eplerenona (Inspra) é antagonista seletivo da aldosterona para insuficiência cardíaca pós-IAM. Risco de hipercalemia — monitoração de K⁺ obrigatória. Sem ginecomastia (diferencial da espironolactona).",
  "quando_procurar_medico": "Urgência: fraqueza muscular intensa, batimento cardíaco irregular, confusão mental, baixa produção de urina — sinais de hipercalemia ou insuficiência renal.",
  "alerta_farmaceutico": "Contraindicada em K⁺ >5,0 mEq/L — verificar exame recente antes de dispensar. Não combinar com espironolactona, amilorida ou IECA em dose alta sem monitoração rigorosa. Monitorar creatinina e K⁺ regularmente. Verificar interações com cetoconazol e itraconazol (inibidores CYP3A4 — elevam muito os níveis de eplerenona)."
}

];

// ── Inserção com verificação de duplicatas ────────────────────────────────────
let adicionados = 0;
for (const nova of novas) {
  const existe = meds.find(m =>
    (m.generico||'').toLowerCase().replace(/\s/g,'') ===
    (nova.generico||'').toLowerCase().replace(/\s/g,'') ||
    (m.nome||'').toLowerCase() === (nova.nome||'').toLowerCase()
  );
  if (existe) {
    console.log('⚠️  Já existe (pulando):', nova.nome);
  } else {
    meds.push(nova);
    console.log('✓  Adicionado:', nova.nome);
    adicionados++;
  }
}

fs.writeFileSync(MEDS_PATH, JSON.stringify(meds, null, 2), 'utf-8');
console.log(`\nAdicionados: ${adicionados} | Total medicamentos.json: ${meds.length}`);
