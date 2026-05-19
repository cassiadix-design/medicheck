// add_prioridade2.cjs — Interações da Prioridade 2
'use strict';
const fs = require('fs');

const novas = [

  // ─── MIRABEGRONA ─────────────────────────────────────────────────────────────
  {
    med1: ['mirabegrona','myrbetriq','betmiga'],
    med2: ['metoprolol','propranolol','carvedilol','nebivolol','timolol'],
    nivel: 'moderado',
    titulo: 'Mirabegrona + Betabloqueadores (Inibição CYP2D6 — Aumento da Exposição)',
    mecanismo: 'A mirabegrona é inibidora moderada da CYP2D6. Metoprolol, propranolol, carvedilol e nebivolol são substratos de CYP2D6. A inibição reduz o clearance desses betabloqueadores, podendo elevar sua AUC em 90–180% — efeito equivalente à conversão a metabolizador lento.',
    efeito: 'Bradicardia, hipotensão, broncoespasmo (com betabloqueadores não-seletivos), fadiga excessiva e tontura. Com metoprolol: risco de BAV e hipotensão sintomática aumentados.',
    conduta: '⚠️ Monitorar frequência cardíaca e pressão arterial ao iniciar mirabegrona em usuários de betabloqueadores. Com metoprolol: considerar dose mais baixa ou substituição por atenolol ou bisoprolol (menor dependência de CYP2D6). Titular com cautela.'
  },
  {
    med1: ['mirabegrona','myrbetriq','betmiga'],
    med2: ['flecainida','propafenona','encainida'],
    nivel: 'moderado',
    titulo: 'Mirabegrona + Antiarrítmicos Classe 1C (Inibição CYP2D6 — Toxicidade)',
    mecanismo: 'Flecainida e propafenona são substratos de CYP2D6 com janela terapêutica estreita. A inibição desta isoenzima pela mirabegrona pode elevar substancialmente seus níveis plasmáticos.',
    efeito: 'Toxicidade antiarrítmica: prolongamento de QRS/QTc, arritmias proarrítmicas (taquicardia ventricular, fibrilação ventricular), tontura, visão turva e sabor metálico (flecainida).',
    conduta: '⚠️ Evitar combinação quando possível. Se necessária, monitorar ECG periodicamente. Com flecainida: medir nível sérico antes e após início da mirabegrona e ajustar dose conforme necessário.'
  },
  {
    med1: ['mirabegrona','myrbetriq','betmiga'],
    med2: ['desipramina','nortriptilina','amitriptilina','clomipramina','imipramina','cloridrato de nortriptilina','cloridrato de clomipramina','cloridrato de imipramina'],
    nivel: 'moderado',
    titulo: 'Mirabegrona + Antidepressivos Tricíclicos (Inibição CYP2D6 — Toxicidade TCA)',
    mecanismo: 'TCAs são extensamente metabolizados por CYP2D6. A inibição desta via pela mirabegrona eleva seus níveis plasmáticos, potencializando tanto os efeitos terapêuticos quanto os adversos e tóxicos.',
    efeito: 'Toxicidade anticolinérgica excessiva (retenção urinária, constipação, boca seca, visão turva, confusão em idosos), sedação excessiva, prolongamento de QTc e risco de arritmias.',
    conduta: '⚠️ Monitorar sintomas anticolinérgicos e ECG. Em idosos, o risco de delirium é elevado — preferir antidepressivo não-TCA se possível. Reduzir dose do TCA em 25–50% se sintomas de toxicidade surgirem.'
  },

  // ─── DUPILUMABE ──────────────────────────────────────────────────────────────
  {
    med1: ['dupilumabe','dupixent'],
    med2: ['vacina viva','vacina de vírus vivo','vacina febre amarela','vacina varicela','vacina sarampo','bcg','vacina rotavírus'],
    nivel: 'moderado',
    titulo: 'Dupilumabe + Vacinas Vivas (Imunossupressão — Usar com Cautela)',
    mecanismo: 'O dupilumabe bloqueia a sinalização de IL-4 e IL-13, suprimindo a resposta imune Th2. Embora seu mecanismo seja mais seletivo que corticosteroides sistêmicos ou outros biológicos, a administração de vacinas vivas em contexto de imunossupressão requer avaliação cuidadosa.',
    efeito: 'Risco potencial de resposta imune inadequada à vacinação ou, teoricamente, disseminação do vírus vacinal — embora evidências sejam mais limitadas que com imunossupressores amplos.',
    conduta: '⚠️ Administrar vacinas vivas necessárias preferencialmente ≥4 semanas antes de iniciar dupilumabe. Vacinas inativadas (influenza, pneumocócica) são seguras e recomendadas durante o tratamento. Consultar infectologista em casos de necessidade urgente de vacinas vivas durante tratamento.'
  },
  {
    med1: ['dupilumabe','dupixent'],
    med2: ['ciclosporina','metotrexato','azatioprina','imunossupressor'],
    nivel: 'moderado',
    titulo: 'Dupilumabe + Imunossupressores Sistêmicos (Imunossupressão Aditiva)',
    mecanismo: 'A combinação de dupilumabe com imunossupressores sistêmicos (ciclosporina, metotrexato, azatioprina) — usados off-label em dermatite atópica grave — não tem dados robustos de segurança e pode resultar em imunossupressão mais ampla do que o desejado.',
    efeito: 'Risco aumentado de infecções, incluindo oportunistas. Reativação de hepatite B, tuberculose e infecções por herpes.',
    conduta: '⚠️ Evitar combinação sem supervisão especializada. Rastrear tuberculose e hepatite B antes de iniciar. Monitorar sinais de infecção. O dupilumabe foi desenvolvido para substituir (não combinar com) imunossupressores sistêmicos em dermatite atópica.'
  },

  // ─── ESTRADIOL ───────────────────────────────────────────────────────────────
  {
    med1: ['estradiol','estradiol hemi-hidratado','estrogênio','estrogeno','valerato de estradiol'],
    med2: ['carbamazepina','fenitoína','fenobarbital','rifampicina','topiramato','oxcarbazepina','primidona'],
    nivel: 'moderado',
    titulo: 'Estradiol + Indutores Enzimáticos (CYP3A4 — Redução de Eficácia Hormonal)',
    mecanismo: 'O estradiol é metabolizado principalmente pela CYP3A4. Indutores desta isoenzima (antiepilépticos como carbamazepina, fenitoína, fenobarbital; rifampicina; topiramato em doses maiores) aceleram seu metabolismo, reduzindo significativamente os níveis plasmáticos.',
    efeito: 'Perda de eficácia da terapia hormonal (sintomas de menopausa, irregularidade menstrual, falha contraceptiva em ACO). Sangramento de escape em doses terapêuticas convencionais.',
    conduta: '⚠️ Considerar dose maior de estradiol ou transição para via transdérmica (menor first-pass). Para contracepção: usar método de barreira adicional ou anticoncepcional não estrogênico (DIU de cobre, progestágeno de depósito). Preferir antiepiléptico sem efeito indutor (lamotrigina, levetiracetam, gabapentina) quando possível.'
  },
  {
    med1: ['estradiol','estradiol hemi-hidratado','estrogênio','valerato de estradiol','etinil estradiol','etinilestradiol'],
    med2: ['tabaco','cigarro','fumo'],
    nivel: 'moderado',
    titulo: 'Estradiol / Estrogênio + Tabaco (Risco Tromboembólico e Cardiovascular)',
    mecanismo: 'O tabaco induz CYP1A2, acelerando o metabolismo do etinilestradiol e aumentando a produção de metabólitos hidroxilados com maior potencial trombogênico. Adicionalmente, nicotina e monóxido de carbono causam disfunção endotelial e ativação plaquetária — criando sinergismo trombótico com o estrogênio.',
    efeito: 'Risco 2–4 vezes maior de trombose venosa profunda, embolia pulmonar e AVC isquêmico. O risco aumenta com a idade (especialmente >35 anos) e com o número de cigarros/dia.',
    conduta: '🚫 Estrogênios combinados (ACO, anel vaginal, adesivo) contraindicados em mulheres fumantes >35 anos. Abaixo de 35 anos: orientar fortemente sobre o risco, considerar progestágeno isolado ou DIU. A cessação do tabagismo elimina grande parte do risco residual.'
  },
  {
    med1: ['estradiol','estradiol hemi-hidratado','estrogênio','valerato de estradiol','etinil estradiol','etinilestradiol'],
    med2: ['warfarina','varfarina','acenocumarol','rivaroxabana','apixabana','heparina','anticoagulante'],
    nivel: 'moderado',
    titulo: 'Estradiol / Estrogênio + Anticoagulantes (Risco Trombótico Aditivo)',
    mecanismo: 'Os estrogênios aumentam a síntese hepática de fatores pró-coagulantes (fatores II, VII, IX, X, fibrinogênio) e reduzem os anticoagulantes naturais (proteína S, antitrombina). Esta atividade pró-trombótica pode contrariar parcialmente o efeito anticoagulante e aumentar a instabilidade do RNI com warfarina.',
    efeito: 'Maior risco de tromboembolismo venoso mesmo sob anticoagulação. Instabilidade do RNI com varfarina. Em pacientes com trombofilia, o risco é significativamente amplificado.',
    conduta: '⚠️ Estrogênios devem ser evitados em pacientes com histórico de TEV ou trombofilia. Se uso for necessário (ex: osteoporose grave), preferir via transdérmica (menor efeito pró-trombótico que via oral). Monitorar RNI mais frequentemente ao iniciar ou ajustar estrogênio.'
  },

  // ─── ACETAZOLAMIDA ───────────────────────────────────────────────────────────
  {
    med1: ['acetazolamida','diamox'],
    med2: ['carbonato de lítio','lítio','litio'],
    nivel: 'moderado',
    titulo: 'Acetazolamida + Lítio (Aumento da Excreção Renal — Redução do Nível)',
    mecanismo: 'A acetazolamida alcaliniza a urina por inibição da anidrase carbônica renal, aumentando a excreção urinária de bicarbonato e sódio. Em condições de alcalose tubular, a reabsorção de lítio é reduzida — sua excreção aumenta e os níveis plasmáticos caem.',
    efeito: 'Redução dos níveis séricos de lítio com possível perda de controle do humor. Risco de episódio maníaco ou depressivo em transtorno bipolar. O efeito é variável e depende da dose e da hidratação.',
    conduta: '⚠️ Monitorar nível sérico de lítio antes e 5–7 dias após iniciar acetazolamida. Ajustar dose se necessário. Manter hidratação adequada para estabilizar a farmacocinética do lítio.'
  },
  {
    med1: ['acetazolamida','diamox'],
    med2: ['ácido acetilsalicílico','aspirina','aas','salicilato'],
    nivel: 'moderado',
    titulo: 'Acetazolamida + AAS / Salicilatos em Altas Doses (Acidose Metabólica + Toxicidade)',
    mecanismo: 'A acetazolamida causa acidose metabólica hiperclorêmica. Salicilatos em altas doses (>2 g/dia) também causam acidose. A acidemia sistêmica aumenta a fração não-ionizada dos salicilatos, facilitando sua entrada no SNC. Adicionalmente, a acetazolamida pode reduzir a excreção renal de salicilatos em doses altas.',
    efeito: 'Toxicidade por salicilatos potencializada: zumbido, hiperpneia, confusão, coma. Em doses analgésicas/antipirético habituais, a interação tem relevância clínica mínima — o risco é principalmente com AAS antiagregante + doses anti-inflamatórias ou analgésicas plenas.',
    conduta: '⚠️ Monitorar sintomas de toxicidade por salicilatos (zumbido, alteração neurológica). Em uso de AAS 100 mg/dia profilático: risco baixo. Evitar AAS em doses anti-inflamatórias durante uso de acetazolamida.'
  },
  {
    med1: ['acetazolamida','diamox'],
    med2: ['topiramato','topamax','zonisamida','zonegran'],
    nivel: 'moderado',
    titulo: 'Acetazolamida + Topiramato/Zonisamida (Inibição Tripla de Anidrase — Nefrolitíase)',
    mecanismo: 'Todos os três inibem a anidrase carbônica renal. A combinação resulta em alcalinização urinária acentuada com redução do citrato urinário e elevação do pH — criando condições ideais para precipitação de cálcio fosfato e formação de cálculos renais.',
    efeito: 'Risco muito elevado de nefrolitíase. Oligoidrose com hipertermia (especialmente em crianças). Acidose metabólica hiperclorêmica grave.',
    conduta: '⚠️ Evitar a combinação de dois ou mais inibidores de anidrase carbônica sempre que possível. Se necessário: hidratação ≥2 L/dia, citrato de potássio profilático, monitorar pH urinário, eletrólitos e imagem renal anualmente.'
  },
  {
    med1: ['acetazolamida','diamox'],
    med2: ['fenitoína','hidantal','epelin'],
    nivel: 'moderado',
    titulo: 'Acetazolamida + Fenitoína (Osteomalácia e Risco de Toxicidade)',
    mecanismo: 'A acetazolamida pode aumentar os níveis de fenitoína em alguns pacientes (inibição do metabolismo) e, combinada com ela, amplifica a interferência no metabolismo da vitamina D e do cálcio — ambos perturbam o metabolismo ósseo por mecanismos distintos.',
    efeito: 'Risco aumentado de osteomalácia e osteoporose com uso crônico. Casos isolados de toxicidade por fenitoína foram relatados.',
    conduta: '⚠️ Em uso crônico: suplementar vitamina D e cálcio. Monitorar densitometria óssea anualmente. Verificar nível sérico de fenitoína ao iniciar ou ajustar acetazolamida.'
  },

  // ─── DULAGLUTIDA / EXENATIDA (AGONISTAS GLP-1) ──────────────────────────────
  {
    med1: ['dulaglutida','trulicity','exenatida','byetta','bydureon','liraglutida','victoza','saxenda','semaglutida','ozempic','rybelsus','wegovy'],
    med2: ['levotiroxina','tiroxina','synthroid','puran','euthyrox'],
    nivel: 'leve',
    titulo: 'Agonistas GLP-1 + Levotiroxina (Retardo de Absorção)',
    mecanismo: 'Os agonistas de GLP-1 retardam o esvaziamento gástrico de forma dose-dependente. A levotiroxina tem janela terapêutica estreita e absorção variável — qualquer alteração no trânsito gástrico pode modificar sua biodisponibilidade.',
    efeito: 'Absorção reduzida ou imprevisível da levotiroxina, podendo resultar em hipotireoidismo subclínico ou sintomático. Monitoramento de TSH mostrando elevação inesperada durante uso de GLP-1.',
    conduta: '⚠️ Administrar levotiroxina em jejum, 30–60 minutos antes da refeição e do agonista GLP-1 (quando injetável ao redor das refeições). Monitorar TSH 6–8 semanas após início do agonista GLP-1 e após mudanças de dose. Ajustar dose de levotiroxina conforme TSH.'
  },
  {
    med1: ['dulaglutida','trulicity','exenatida','byetta','bydureon','liraglutida','victoza','semaglutida','ozempic'],
    med2: ['warfarina','varfarina','acenocumarol'],
    nivel: 'leve',
    titulo: 'Agonistas GLP-1 + Warfarina (Retardo de Absorção — Instabilidade de RNI)',
    mecanismo: 'O esvaziamento gástrico retardado pelos agonistas GLP-1 pode alterar o tempo de pico de absorção da warfarina. Adicionalmente, as náuseas e vômitos frequentes no início do tratamento com GLP-1 afetam a ingestão alimentar e, portanto, a ingestão de vitamina K — fator crítico para a estabilidade do RNI.',
    efeito: 'Instabilidade do RNI nos primeiros meses de uso de GLP-1, com risco de sobreanticoagulação ou subanticicoagulação.',
    conduta: '⚠️ Monitorar RNI com maior frequência ao iniciar, aumentar dose ou trocar o agonista GLP-1. Orientar o paciente a manter ingestão consistente de alimentos ricos em vitamina K mesmo com náuseas — modificar a dieta com consistência, não eliminar os vegetais verdes.'
  },
  {
    med1: ['dulaglutida','trulicity','exenatida','byetta','semaglutida','ozempic','liraglutida'],
    med2: ['insulina','insulina nph','insulina glargina','insulina detemir','insulina asparte','insulina lispro','insulina regular'],
    nivel: 'moderado',
    titulo: 'Agonistas GLP-1 + Insulina (Hipoglicemia Aditiva)',
    mecanismo: 'Os agonistas GLP-1 estimulam a secreção de insulina de forma glicose-dependente e reduzem o glucagon. Em combinação com insulina exógena, especialmente de ação rápida, o risco de hipoglicemia pós-prandial é amplificado.',
    efeito: 'Hipoglicemia, incluindo hipoglicemia grave (< 54 mg/dL) com necessidade de assistência. O risco é maior com insulina de ação curta/rápida associada ao GLP-1.',
    conduta: '⚠️ Ao adicionar agonista GLP-1 a esquema com insulina, reduzir dose de insulina de ação rápida em 10–20% profilaticamente. Monitorar glicemia mais frequentemente nas primeiras semanas. Orientar paciente e familiares sobre reconhecimento e tratamento de hipoglicemia.'
  },

  // ─── TORASEMIDA ──────────────────────────────────────────────────────────────
  {
    med1: ['torasemida','torsemida','demadex'],
    med2: ['amicacina','gentamicina','tobramicina','estreptomicina','aminoglicosídeo'],
    nivel: 'grave',
    titulo: 'Torasemida + Aminoglicosídeos (Ototoxicidade e Nefrotoxicidade Sinérgicas)',
    mecanismo: 'Diuréticos de alça inibem o co-transportador Na-K-2Cl na estria vascular da cóclea, reduzindo o potencial endocleular e tornando as células ciliadas vulneráveis à lesão. Os aminoglicosídeos lesam diretamente as células ciliadas externas por formação de radicais livres e entrada excessiva de cálcio. Os mecanismos são sinérgicos.',
    efeito: 'Ototoxicidade grave (perda auditiva sensorineural permanente, zumbido), especialmente em altas doses de ambos ou com uso IV. Nefrotoxicidade aditiva com risco de IRA.',
    conduta: '⚠️ Evitar combinação sempre que possível — especialmente infusões IV simultâneas. Se necessária: audiometria basal, monitorar função renal e sinais de ototoxicidade (zumbido, hipoacusia). Preferir dose única diária de aminoglicosídeo e dose mínima eficaz de torasemida. Manter hidratação adequada.'
  },
  {
    med1: ['torasemida','torsemida','demadex'],
    med2: ['digoxina','digitoxina','digoxin'],
    nivel: 'moderado',
    titulo: 'Torasemida + Digoxina (Hipocalemia → Toxicidade Digitálica)',
    mecanismo: 'A torasemida, como todos os diuréticos de alça, causa perda renal de potássio e magnésio. A hipocalemia resultante aumenta a afinidade da digoxina pela Na-K-ATPase miocárdica e reduz o limiar de toxicidade digitálica — o mesmo nível sérico de digoxina torna-se tóxico.',
    efeito: 'Arritmias digitálicas: extrassístoles ventriculares, bigeminismo, bloqueio AV, taquicardia ventricular. O risco é diretamente proporcional ao grau de hipocalemia.',
    conduta: '⚠️ Monitorar potássio sérico (manter K⁺ > 4,0 mEq/L em uso de digoxina). Suplementar potássio (oral ou IV) proativamente. Associar espironolactona como poupador de potássio quando possível. Verificar ECG e nível sérico de digoxina se hipocalemia detectada.'
  },
  {
    med1: ['torasemida','torsemida','demadex','furosemida','lasix'],
    med2: ['carbonato de lítio','lítio','litio'],
    nivel: 'moderado',
    titulo: 'Diuréticos de Alça + Lítio (Deplecção de Sódio → Toxicidade por Lítio)',
    mecanismo: 'O lítio é reabsorvido no túbulo proximal junto com o sódio, competindo pelo mesmo transportador. Diuréticos de alça causam perda de sódio, desencadeando reabsorção compensatória proximal de sódio — e consequentemente de lítio. O resultado é elevação dos níveis séricos de lítio.',
    efeito: 'Toxicidade por lítio: tremor fino tornando-se grosseiro, ataxia, confusão, náuseas, vômitos, convulsões em casos graves. O lítio tem janela terapêutica estreita (0,6–1,2 mEq/L) — pequenas elevações podem causar toxicidade.',
    conduta: '⚠️ Monitorar litemia 5–7 dias após início de diurético de alça e a cada ajuste de dose. Manter hidratação e ingesta de sódio estáveis. Pode ser necessário reduzir dose de lítio. Orientar sobre sinais de toxicidade (tremor, confusão, vômitos).'
  },

  // ─── ACICLOVIR ────────────────────────────────────────────────────────────────
  {
    med1: ['aciclovir','acyclovir','zovirax'],
    med2: ['aminoglicosídeo','amicacina','gentamicina','tobramicina','cisplatina','anfotericina b','ciclosporina'],
    nivel: 'moderado',
    titulo: 'Aciclovir + Nefrotóxicos (Toxicidade Renal Aditiva e Cristalúria)',
    mecanismo: 'O aciclovir é eliminado por filtração glomerular e secreção tubular ativa. Em altas concentrações (especialmente IV), pode precipitar em cristais nos túbulos coletores — mecanismo independente. A coexistência com outros nefrotóxicos reduz adicionalmente o clearance do aciclovir, elevando sua concentração plasmática e tubular.',
    efeito: 'IRA, cristalúria com obstrução tubular, elevação de creatinina. Em doses orais padrão, o risco é menor, mas presente em pacientes com função renal comprometida.',
    conduta: '⚠️ Garantir hidratação adequada (débito urinário ≥1 mL/kg/h durante infusão IV de aciclovir). Monitorar função renal diariamente com terapia IV. Ajustar dose pela TFG. Espaçar ao máximo a administração de nefrotóxicos.'
  },
  {
    med1: ['aciclovir','acyclovir','zovirax'],
    med2: ['probenecida'],
    nivel: 'leve',
    titulo: 'Aciclovir + Probenecida (Inibição Tubular — Aumento do Nível)',
    mecanismo: 'A probenecida inibe a secreção tubular de aciclovir via transportador OAT (organic anion transporter), reduzindo seu clearance renal em ~32% e prolongando sua meia-vida.',
    efeito: 'Elevação dos níveis plasmáticos de aciclovir. Em doses orais padrão e função renal normal, o impacto clínico é geralmente limitado. Em doses altas (herpes encefalite) ou IR prévia: risco aumentado de neurotoxicidade (tremor, confusão) e nefrotoxicidade.',
    conduta: '✅ Em doses antivirais habituais com função renal normal: geralmente sem necessidade de ajuste. Monitorar em pacientes com IR ou em doses altas de aciclovir IV. Considerar redução de dose de aciclovir se toxicidade surgir.'
  },

  // ─── MAPROTILINA ──────────────────────────────────────────────────────────────
  {
    med1: ['maprotilina','ludiomil'],
    med2: ['inibidor mao','imao','fenelzina','tranilcipromina','selegilina','moclobemida','isocarboxazida'],
    nivel: 'grave',
    titulo: 'Maprotilina + IMAOs (Síndrome Serotoninérgica / Crise Hipertensiva — Contraindicado)',
    mecanismo: 'A maprotilina é um antidepressivo tetracíclico que inibe seletivamente a recaptação de norepinefrina. Os IMAOs inibem a degradação de monoaminas. A combinação resulta em acúmulo de norepinefrina e serotonina com risco de crise adrenérgica e síndrome serotoninérgica.',
    efeito: 'Crise hipertensiva, hipertermia, rigidez muscular, convulsões, colapso cardiovascular. Potencialmente fatal.',
    conduta: '🚫 Contraindicado. Washout mínimo de 14 dias entre IMAO e maprotilina (em ambas as direções). Monitorar pressão arterial ao iniciar tratamento.'
  },
  {
    med1: ['maprotilina','ludiomil'],
    med2: ['atropina','biperideno','triexifenidil','escopolamina','anti-histamínico','clorfeniramina','difenidramina','dimenidrinato','clorpromazina','olanzapina','quetiapina'],
    nivel: 'moderado',
    titulo: 'Maprotilina + Anticolinérgicos (Toxicidade Anticolinérgica Aditiva)',
    mecanismo: 'A maprotilina possui propriedades anticolinérgicas intrínsecas (bloqueio de receptores muscarínicos M1). A adição de outros fármacos anticolinérgicos (anticolinérgicos clássicos, anti-histamínicos, alguns antipsicóticos) resulta em efeito aditivo.',
    efeito: 'Síndrome anticolinérgica: boca seca intensa, retenção urinária, constipação grave, íleo paralítico, taquicardia, confusão mental e delirium (especialmente em idosos).',
    conduta: '⚠️ Avaliar o perfil anticolinérgico total do paciente (escala de carga anticolinérgica). Minimizar o número de fármacos anticolinérgicos. Em idosos: evitar a combinação — risco elevado de quedas e delirium.'
  },
  {
    med1: ['maprotilina','ludiomil'],
    med2: ['carbamazepina','fenitoína','fenobarbital','rifampicina'],
    nivel: 'moderado',
    titulo: 'Maprotilina + Indutores Enzimáticos (Redução de Nível — Falha Terapêutica)',
    mecanismo: 'A maprotilina é metabolizada por CYP2D6 e CYP3A4. Indutores de CYP3A4 (carbamazepina, fenitoína, fenobarbital, rifampicina) aceleram seu metabolismo, reduzindo os níveis plasmáticos em 50–60%.',
    efeito: 'Perda de eficácia antidepressiva. Risco de recaída depressiva em pacientes epilépticos tratados com antiepilépticos indutores.',
    conduta: '⚠️ Monitorar resposta clínica. Pode ser necessário aumentar a dose de maprotilina. Considerar antidepressivo com menor dependência de CYP3A4 em pacientes com antiepilépticos indutores (ex: mirtazapina, escitalopram).'
  },

  // ─── CARIPRAZINA ─────────────────────────────────────────────────────────────
  {
    med1: ['cariprazina','cloridrato de cariprazina','vraylar','reagila'],
    med2: ['cetoconazol','ketoconazol','itraconazol','voriconazol','claritromicina','ritonavir'],
    nivel: 'grave',
    titulo: 'Cariprazina + Inibidores Fortes CYP3A4 (Contraindicado)',
    mecanismo: 'A cariprazina e seu metabólito ativo (DCAR) são metabolizados pela CYP3A4. Inibidores potentes desta isoenzima elevam substancialmente a exposição total à cariprazina, podendo dobrar ou triplicar seus níveis plasmáticos.',
    efeito: 'Toxicidade antipsicótica: parkinsonismo, acatisia grave, sedação excessiva, hipotensão, prolongamento de QTc com risco de torsades de pointes.',
    conduta: '🚫 Contraindicado conforme bula. Reduzir dose de cariprazina pela metade se o uso de inibidor CYP3A4 for inevitável e de curta duração. Monitorar ECG e sinais extrapiramidais. Substituir o inibidor por alternativa com menor inibição de CYP3A4 quando possível.'
  },
  {
    med1: ['cariprazina','cloridrato de cariprazina','vraylar','reagila'],
    med2: ['rifampicina','rifampin','carbamazepina','fenitoína','fenobarbital'],
    nivel: 'moderado',
    titulo: 'Cariprazina + Indutores CYP3A4 (Redução de Eficácia — Contraindicado)',
    mecanismo: 'Indutores de CYP3A4 aceleram o metabolismo da cariprazina e do DCAR (metabólito ativo), reduzindo seus níveis plasmáticos de forma clinicamente relevante e potencialmente comprometendo a eficácia antipsicótica.',
    efeito: 'Falha terapêutica — recaída psicótica ou de episódio maníaco bipolar. Instabilidade clínica sem causa aparente.',
    conduta: '🚫 Contraindicado conforme bula. Substituir antiepiléptico indutor por não-indutor (levetiracetam, lamotrigina, valproato) quando clinicamente possível. Se não for possível, avaliar antipsicótico alternativo com perfil metabólico diferente.'
  },
  {
    med1: ['cariprazina','cloridrato de cariprazina','vraylar','reagila'],
    med2: ['amiodarona','sotalol','dronedarona','haloperidol','clorpromazina','tioridazina','ziprasidona','metadona','ciprofloxacino','levofloxacino','moxifloxacino','azitromicina'],
    nivel: 'moderado',
    titulo: 'Cariprazina + Fármacos que Prolongam QTc (Risco de Arritmia)',
    mecanismo: 'A cariprazina tem potencial intrínseco de prolongamento de QTc. A combinação com outros fármacos que prolongam o intervalo QT resulta em efeito aditivo sobre a repolarização ventricular.',
    efeito: 'Prolongamento excessivo do QTc (>500 ms) com risco de torsades de pointes e morte súbita cardíaca.',
    conduta: '⚠️ Realizar ECG basal antes de iniciar cariprazina em pacientes em uso de outros fármacos que prolongam QT. Monitorar QTc periodicamente. Corrigir hipocalemia, hipomagnesemia e hipocalcemia. Suspender a cariprazina se QTc >500 ms.'
  },

  // ─── BRIVARACETAM ────────────────────────────────────────────────────────────
  {
    med1: ['brivaracetam','briviact'],
    med2: ['rifampicina','rifampin'],
    nivel: 'moderado',
    titulo: 'Brivaracetam + Rifampicina (Indução CYP2C19 — Redução de Nível)',
    mecanismo: 'A rifampicina é indutora potente de CYP2C19, principal via de metabolização do brivaracetam. A indução reduz a AUC do brivaracetam em cerca de 45%, comprometendo sua exposição terapêutica.',
    efeito: 'Redução da eficácia antiepiléptica — risco de recorrência de crises epilépticas em pacientes previamente controlados.',
    conduta: '⚠️ Dobrar a dose de brivaracetam ao introduzir rifampicina. Monitorar resposta clínica e ajustar conforme necessário. Ao suspender rifampicina, reduzir dose de brivaracetam para evitar toxicidade.'
  },
  {
    med1: ['brivaracetam','briviact'],
    med2: ['carbamazepina','tegretol'],
    nivel: 'moderado',
    titulo: 'Brivaracetam + Carbamazepina (Interação Bidirecional — Toxicidade de CBZ)',
    mecanismo: 'O brivaracetam pode aumentar os níveis do metabólito ativo da carbamazepina (carbamazepina-10,11-epóxido) ao inibir a epóxido hidrolase. Simultaneamente, a carbamazepina (indutor de CYP3A4/CYP2C19) pode reduzir os níveis de brivaracetam.',
    efeito: 'Toxicidade por carbamazepina-epóxido (tontura, diplopia, ataxia, náuseas) mesmo com nível sérico de carbamazepina dentro da faixa terapêutica. Possível redução da eficácia do brivaracetam.',
    conduta: '⚠️ Monitorar sintomas de toxicidade por carbamazepina ao iniciar brivaracetam. Medir nível de carbamazepina e, se possível, do epóxido. Reduzir dose de carbamazepina se sintomas de toxicidade surgiremi. Ajustar dose de brivaracetam se perda de controle epiléptico ocorrer.'
  },
  {
    med1: ['brivaracetam','briviact'],
    med2: ['fenitoína','hidantal','epelin'],
    nivel: 'moderado',
    titulo: 'Brivaracetam + Fenitoína (Interação Bidirecional)',
    mecanismo: 'A fenitoína é indutora de CYP2C19, acelerando o metabolismo do brivaracetam. Reciprocamente, o brivaracetam pode inibir a CYP2C19, elevando os níveis de fenitoína. A intensidade de cada efeito varia entre indivíduos.',
    efeito: 'Potencial redução dos níveis de brivaracetam (risco de crises) e/ou toxicidade por fenitoína (nistagmo, ataxia, sedação) dependendo do balanço das interações.',
    conduta: '⚠️ Monitorar nível sérico de fenitoína ao iniciar brivaracetam. Ajustar doses de ambos os fármacos conforme resposta clínica e toxicidade. Titular brivaracetam lentamente.'
  },

  // ─── NITROFURANTOÍNA ─────────────────────────────────────────────────────────
  {
    med1: ['nitrofurantoína','macrobid','macrodantin','furadantina'],
    med2: ['antiácido','hidróxido de magnésio','hidróxido de alumínio','carbonato de cálcio','bicarbonato de sódio','antiácido com mg'],
    nivel: 'moderado',
    titulo: 'Nitrofurantoína + Antiácidos com Magnésio (Redução de Absorção — Falha Terapêutica)',
    mecanismo: 'Os íons Mg²⁺ (e Al³⁺) dos antiácidos quelam a nitrofurantoína no trato gastrointestinal, formando complexos insolúveis e reduzindo sua absorção em até 50%. A alcalinização urinária pelos antiácidos também reduz a atividade antibacteriana da nitrofurantoína nas vias urinárias.',
    efeito: 'Redução da concentração urinária de nitrofurantoína abaixo dos níveis bactericidas — falha no tratamento de infecção urinária, com risco de progressão para pielonefrite.',
    conduta: '⚠️ Espaçar nitrofurantoína e antiácidos por pelo menos 2 horas. Preferir administrar nitrofurantoína junto às refeições (melhora a absorção e reduz náuseas) e evitar antiácido na mesma ocasião. Considerar IBP ou bloqueador H2 como alternativa se antiácido for necessário cronicamente.'
  },
  {
    med1: ['nitrofurantoína','macrobid','macrodantin','furadantina'],
    med2: ['ciprofloxacino','norfloxacino','levofloxacino','moxifloxacino','fluoroquinolona'],
    nivel: 'moderado',
    titulo: 'Nitrofurantoína + Fluoroquinolonas (Antagonismo Farmacológico)',
    mecanismo: 'A nitrofurantoína é ativada por nitroreductases bacterianas para formar metabólitos altamente reativos que lesam múltiplos alvos celulares (DNA, ribossomos, parede celular). As fluoroquinolonas inibem as topoisomerases II e IV. A nitrofurantoína parece antagonizar o mecanismo das quinolonas ao competir pela enzima nitroreductase e alterar o estado redox bacteriano.',
    efeito: 'Redução da atividade antibacteriana de ambos os agentes quando usados simultaneamente. Falha terapêutica — especialmente preocupante em ITU complicada.',
    conduta: '🚫 Evitar combinação. Escolher apenas um agente com base no antibiograma e no perfil do paciente. Em ITU não complicada: nitrofurantoína (5–7 dias) ou fluoroquinolona (3 dias) são igualmente eficazes como monoterapia.'
  },
  {
    med1: ['nitrofurantoína','macrobid','macrodantin','furadantina'],
    med2: ['probenecida','sulfinpirazona'],
    nivel: 'moderado',
    titulo: 'Nitrofurantoína + Probenecida (Inibição Tubular — Falha Terapêutica)',
    mecanismo: 'A probenecida inibe a secreção tubular renal da nitrofurantoína, reduzindo sua excreção urinária. Como a nitrofurantoína atua localmente nas vias urinárias por concentração renal, a redução da excreção compromete diretamente sua eficácia antibacteriana.',
    efeito: 'Concentrações urinárias subterapêuticas de nitrofurantoína com risco de falha no tratamento de ITU. Paradoxalmente, os níveis séricos elevam-se levemente — sem benefício terapêutico adicional e com maior risco de toxicidade sistêmica (neuropatia, toxicidade pulmonar).',
    conduta: '⚠️ Evitar combinação. Se probenecida for necessária (p. ex., para gota), optar por outro antibiótico para a ITU (fosfomicina, cefalexina, amoxicilina-clavulanato conforme antibiograma).'
  },

  // ─── ETAMBUTOL ───────────────────────────────────────────────────────────────
  {
    med1: ['etambutol','myambutol'],
    med2: ['isoniazida','hidrazida','inh'],
    nivel: 'moderado',
    titulo: 'Etambutol + Isoniazida (Neuropatia Óptica Aditiva)',
    mecanismo: 'O etambutol inibe a arabinosiltransferase micobacteriana e também quelam zinco intracelular — afetando mitocôndrias do nervo óptico. A isoniazida depleta vitamina B6 (piridoxina) por inibição da piridoxal fosfato, causando neuropatia periférica e potencialmente neurite óptica. Os mecanismos se somam.',
    efeito: 'Risco aumentado de neurite óptica (visão turva, alteração de cor, perda de campo visual central) e neuropatia periférica. Ambos os efeitos são parcialmente reversíveis se detectados precocemente; a continuação pode causar déficit visual permanente.',
    conduta: '⚠️ Suplementar piridoxina (vitamina B6) 25–50 mg/dia em todos os pacientes em esquema com isoniazida. Avaliação oftalmológica basal (acuidade visual, visão de cores, campo visual) antes de iniciar e mensalmente durante tratamento com etambutol. Suspender etambutol imediatamente se alteração visual documentada.'
  },
  {
    med1: ['etambutol','myambutol'],
    med2: ['hidróxido de alumínio','antiácido com alumínio','sais de alumínio'],
    nivel: 'moderado',
    titulo: 'Etambutol + Antiácidos com Alumínio (Redução de Absorção)',
    mecanismo: 'Os sais de alumínio quelam o etambutol no trato gastrointestinal, formando complexos insolúveis e reduzindo sua absorção em até 30%. Os antiácidos também elevam o pH gástrico, podendo alterar adicionalmente a solubilidade do fármaco.',
    efeito: 'Redução da biodisponibilidade do etambutol, comprometendo as concentrações plasmáticas e potencialmente a eficácia antituberculosa.',
    conduta: '⚠️ Espaçar etambutol e antiácidos à base de alumínio por pelo menos 4 horas. Preferir IBP ou bloqueadores H2 como alternativas antiácidas durante tratamento antituberculoso. Administrar etambutol em jejum para maximizar absorção.'
  }
];

module.exports = novas;
if (require.main === module) {
  console.log(`Novas interações P2: ${novas.length}`);

  // ── mc-interacoes-data-v3.js ──
  const jsRaw = fs.readFileSync('public/mc-interacoes-data-v3.js', 'utf8');
  const matchJs = jsRaw.match(/(var mcInteracoesDB\s*=\s*\[)([\s\S]*?)(\];\s*\n\s*var)/);
  if (!matchJs) { console.error('Não encontrou mcInteracoesDB em mc-interacoes-data-v3.js'); process.exit(1); }
  const newJs = jsRaw.replace(
    matchJs[0],
    matchJs[1] + matchJs[2] + ',\n' + novas.map(o => JSON.stringify(o)).join(',\n') + '\n' + matchJs[3]
  );
  fs.writeFileSync('public/mc-interacoes-data-v3.js', newJs, 'utf8');

  const dbNovo = JSON.parse(matchJs[1].replace('var mcInteracoesDB = ','') + matchJs[2] + ',\n' + novas.map(o => JSON.stringify(o)).join(',\n') + '\n]');
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

  // Contar entradas no index.html
  const count = (html.match(/\{ med1:/g) || []).length;
  console.log(`✅ index.html: ${count} entradas no mcInteracoesDB`);

  console.log('\n🎉 Prioridade 2 concluída!');
}
