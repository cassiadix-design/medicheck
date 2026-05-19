// add_prioridade1.cjs — Adiciona interações da Prioridade 1 ao mcInteracoesDB e interacoes.json
'use strict';
const fs = require('fs');
const path = require('path');

const novasInteracoes = [
  // ─── LETROZOL ───────────────────────────────────────────────────────────────
  {
    med1: ['letrozol','femara'],
    med2: ['tamoxifeno','tamoxifen','nolvadex'],
    nivel: 'grave',
    titulo: 'Letrozol + Tamoxifeno (Antagonismo Farmacológico — Contraindicado)',
    mecanismo: 'O letrozol inibe a aromatase, reduzindo os níveis de estrogênio circulante. O tamoxifeno é um modulador seletivo do receptor de estrogênio (SERM) cujo metabólito ativo (endoxifeno) compete com o estrogênio pelos receptores. Em uso simultâneo, o tamoxifeno upregula a aromatase e reduz os níveis de endoxifeno — antagonizando diretamente a ação do letrozol.',
    efeito: 'Perda de eficácia antiestrogênica. Estudos clínicos (ATAC, BIG 1-98) demonstraram que a combinação simultânea não é superior à monoterapia e pode ser inferior ao letrozol isolado em câncer de mama hormônio-positivo.',
    conduta: '🚫 Contraindicado uso concomitante. Usar letrozol ou tamoxifeno isoladamente. A transição sequencial (ex: 2–3 anos de tamoxifeno → letrozol) é estratégia validada e diferente do uso simultâneo.'
  },
  {
    med1: ['letrozol','femara'],
    med2: ['warfarina','varfarina','coumadin'],
    nivel: 'moderado',
    titulo: 'Letrozol + Warfarina (Potencialização do Efeito Anticoagulante)',
    mecanismo: 'O letrozol inibe moderadamente CYP2A6 e pode inibir CYP2C9, enzima responsável pelo metabolismo da S-warfarina (isômero mais ativo). A inibição resulta em aumento da exposição à warfarina e potencialização do efeito anticoagulante.',
    efeito: 'Aumento do RNI com risco aumentado de sangramento. Casos de hemorragia foram relatados em pós-comercialização.',
    conduta: '⚠️ Monitorar RNI mais frequentemente após início, ajuste de dose ou suspensão do letrozol. Ajustar dose de warfarina conforme necessário.'
  },

  // ─── AGOMELATINA ─────────────────────────────────────────────────────────────
  {
    med1: ['agomelatina','valdoxan'],
    med2: ['fluvoxamina','luvox'],
    nivel: 'grave',
    titulo: 'Agomelatina + Fluvoxamina (Inibição CYP1A2 — Contraindicado)',
    mecanismo: 'A agomelatina é metabolizada quase exclusivamente pela CYP1A2 (>90%). A fluvoxamina é inibidora potente e seletiva da CYP1A2. A coadministração aumenta a exposição à agomelatina em até 60 vezes (AUC ×60), saturando completamente a via de eliminação.',
    efeito: 'Toxicidade hepática grave. Hepatotoxicidade idiossincrática dose-dependente da agomelatina — risco elevado em níveis plasmáticos supraterapêuticos. Casos de hepatite fulminante descritos.',
    conduta: '🚫 Contraindicado. A combinação é explicitamente proibida na bula da agomelatina. Não coadministrar. Considerar alternativa antidepressiva sem interação CYP1A2.'
  },
  {
    med1: ['agomelatina','valdoxan'],
    med2: ['ciprofloxacino','cipro','ciprofloxacin'],
    nivel: 'grave',
    titulo: 'Agomelatina + Ciprofloxacino (Inibição CYP1A2 — Contraindicado)',
    mecanismo: 'O ciprofloxacino é inibidor moderado-forte da CYP1A2. Como a agomelatina é eliminada quase que exclusivamente por essa via, a inibição eleva de forma substancial a exposição sistêmica ao antidepressivo.',
    efeito: 'Aumento significativo dos níveis plasmáticos de agomelatina com risco de hepatotoxicidade e efeitos adversos dose-dependentes (tontura, náusea, elevação de transaminases).',
    conduta: '🚫 Contraindicado conforme bula. Evitar a combinação. Se antibioticoterapia for necessária, substituir por outro antibiótico que não iniba CYP1A2 (ex: amoxicilina, azitromicina).'
  },
  {
    med1: ['agomelatina','valdoxan'],
    med2: ['tabaco','cigarro','fumo','nicotina'],
    nivel: 'moderado',
    titulo: 'Agomelatina + Tabaco (Indução CYP1A2 — Redução de Eficácia)',
    mecanismo: 'Hidrocarbonetos policíclicos aromáticos da fumaça do cigarro são indutores potentes da CYP1A2. Fumantes podem ter exposição à agomelatina reduzida em 50–80% comparado a não-fumantes.',
    efeito: 'Redução significativa da eficácia antidepressiva. Pacientes fumantes podem não atingir concentrações plasmáticas terapêuticas com doses padrão.',
    conduta: '⚠️ Informar o paciente fumante sobre a redução de eficácia. Avaliar resposta clínica cuidadosamente. A cessação do tabagismo durante o tratamento pode elevar abruptamente os níveis de agomelatina — remonitorar após cessação.'
  },

  // ─── ATOMOXETINA ──────────────────────────────────────────────────────────────
  {
    med1: ['atomoxetina','atomoxetine','strattera','cloridrato de atomoxetina'],
    med2: ['inibidor mao','imao','fenelzina','tranilcipromina','selegilina','moclobemida','isocarboxazida'],
    nivel: 'grave',
    titulo: 'Atomoxetina + IMAOs (Crise Hipertensiva / Risco Fatal — Contraindicado)',
    mecanismo: 'A atomoxetina inibe o transportador de norepinefrina (NET), elevando norepinefrina na fenda sináptica. Os IMAOs bloqueiam a degradação de catecolaminas. A combinação resulta em acúmulo maciço de norepinefrina e dopamina — causando crise adrenérgica grave.',
    efeito: 'Crise hipertensiva grave, hipertermia, colapso cardiovascular. Potencialmente fatal. Situação de emergência médica.',
    conduta: '🚫 Contraindicado. Intervalo mínimo de 14 dias após suspensão do IMAO antes de iniciar atomoxetina (e vice-versa). Monitorar pressão arterial e pulso ao iniciar terapia.'
  },
  {
    med1: ['atomoxetina','atomoxetine','strattera','cloridrato de atomoxetina'],
    med2: ['fluoxetina','paroxetina','prozac','paxil'],
    nivel: 'moderado',
    titulo: 'Atomoxetina + Fluoxetina/Paroxetina (Inibição CYP2D6 — Toxicidade)',
    mecanismo: 'A atomoxetina é extensamente metabolizada pela CYP2D6. Fluoxetina e paroxetina são inibidores potentes desta isoenzima. A inibição aumenta a AUC da atomoxetina em 6–10 vezes em metabolizadores extensos — convertendo-os funcionalmente em metabolizadores lentos.',
    efeito: 'Taquicardia, elevação pressórica, insônia, boca seca, diminuição do apetite e irritabilidade intensificados. Risco de síndrome serotoninérgica leve. Prolongamento de QTc relatado em doses elevadas.',
    conduta: '⚠️ Se combinação necessária, iniciar atomoxetina com dose mínima (0,5 mg/kg/dia) e titular lentamente. Monitorar ECG, PA e frequência cardíaca. Considerar alternativa ao ISRS que não iniba CYP2D6 (sertralina, escitalopram afetam menos).'
  },

  // ─── CANABIDIOL ───────────────────────────────────────────────────────────────
  {
    med1: ['canabidiol','cbd','cannabidiol','canabidiol / tetrahidrocanabinol','thc'],
    med2: ['warfarina','varfarina','coumadin'],
    nivel: 'grave',
    titulo: 'Canabidiol (CBD) + Warfarina (Inibição CYP2C9 — Aumento Crítico do RNI)',
    mecanismo: 'O CBD inibe potentemente CYP2C9 e CYP2C19. A S-warfarina, isômero farmacologicamente ativo, é substrato de CYP2C9. A inibição reduz o clearance da warfarina, elevando significativamente seus níveis plasmáticos e o efeito anticoagulante.',
    efeito: 'Elevação pronunciada do RNI com risco grave de hemorragia. Casos de sangramento grave (incluindo intracraniano) relatados em uso concomitante. O efeito pode ser agudo e imprevisível.',
    conduta: '🚫 Evitar combinação. Se uso de CBD for imprescindível, monitorar RNI em 2–3 dias após início e a cada mudança de dose. Redução empírica da dose de warfarina pode ser necessária. Orientar paciente para sinais de sangramento (hematomas, fezes escuras, sangramento urinário).'
  },
  {
    med1: ['canabidiol','cbd','cannabidiol','canabidiol / tetrahidrocanabinol'],
    med2: ['clobazam','frisium','onfi'],
    nivel: 'moderado',
    titulo: 'Canabidiol (CBD) + Clobazam (Inibição CYP2C19 — Acúmulo do Metabólito Ativo)',
    mecanismo: 'O CBD inibe CYP2C19, responsável pela conversão de clobazam em N-desmetilclobazam (metabólito ativo e também sedativo). A inibição não elimina o metabólito mas pode alterar o perfil de exposição global ao clobazam e seus produtos. Estudos clínicos (Dravet, LGS) demonstraram interação significativa.',
    efeito: 'Sedação excessiva, ataxia, irritabilidade paradoxal e — com menos frequência — depressão respiratória. O efeito foi documentado em estudos do Epidiolex® em combinação com clobazam.',
    conduta: '⚠️ Reduzir dose de clobazam em 25–50% ao iniciar CBD. Monitorar sedação e nível de alerta. Esta combinação é frequentemente usada clinicamente em epilepsias refratárias — ajuste cuidadoso de dose é o padrão.'
  },
  {
    med1: ['canabidiol','cbd','cannabidiol','canabidiol / tetrahidrocanabinol'],
    med2: ['tacrolimo','prograf','ciclosporina','sandimmun','sirolimo','rapamune','everolimo'],
    nivel: 'moderado',
    titulo: 'Canabidiol (CBD) + Imunossupressores (CYP3A4/CYP2C9 — Aumento de Toxicidade)',
    mecanismo: 'O CBD inibe CYP3A4 e CYP2C9. Tacrolimo, ciclosporina, sirolimo e everolimo são substratos de CYP3A4 com janela terapêutica estreita. A inibição reduz o metabolismo destes fármacos, elevando seus níveis plasmáticos.',
    efeito: 'Nefrotoxicidade, neurotoxicidade e imunossupressão excessiva. Em transplantados, elevação do nível de tacrolimo pode precipitar rejeição paradoxal (por toxicidade que exige dose redução) ou infecção oportunista grave.',
    conduta: '⚠️ Monitorar níveis séricos dos imunossupressores com mais frequência ao iniciar, ajustar ou suspender CBD. Ajustar doses conforme necessário. Comunicar ao especialista responsável pelo transplante.'
  },

  // ─── LURASIDONA ──────────────────────────────────────────────────────────────
  {
    med1: ['lurasidona','cloridrato de lurasidona','latuda'],
    med2: ['cetoconazol','ketoconazol','itraconazol','voriconazol','posaconazol','ritonavir','claritromicina'],
    nivel: 'grave',
    titulo: 'Lurasidona + Inibidores Fortes CYP3A4 (Contraindicado)',
    mecanismo: 'A lurasidona é metabolizada quase exclusivamente pela CYP3A4. Inibidores potentes desta isoenzima (azólicos, ritonavir, claritromicina) elevam a AUC da lurasidona em 9–13 vezes — atingindo concentrações associadas a toxicidade grave.',
    efeito: 'Sedação profunda, hipotensão ortostática grave, prolongamento de QTc com risco de arritmias ventriculares (torsades de pointes). Síndrome neuroléptica maligna em doses tóxicas.',
    conduta: '🚫 Contraindicado conforme bula. Substituir o inibidor CYP3A4 por alternativa que não iniba a via (ex: fluconazol dose única tópica, azitromicina no lugar de claritromicina). Se indispensável, suspender temporariamente a lurasidona.'
  },
  {
    med1: ['lurasidona','cloridrato de lurasidona','latuda'],
    med2: ['rifampicina','rifampin','carbamazepina','fenitoína','fenobarbital'],
    nivel: 'grave',
    titulo: 'Lurasidona + Indutores Fortes CYP3A4 (Contraindicado)',
    mecanismo: 'A indução de CYP3A4 por rifampicina, carbamazepina ou fenitoína reduz a AUC da lurasidona em até 85% — eliminando virtualmente a exposição terapêutica.',
    efeito: 'Falha terapêutica. Recaída psicótica ou de episódio maníaco/depressivo bipolar. Risco de hospitalização.',
    conduta: '🚫 Contraindicado conforme bula. Substituir o indutor por alternativa sem efeito indutor relevante (ex: levetiracetam, lamotrigina no lugar de carbamazepina; levofloxacino no lugar de rifampicina, quando possível clinicamente).'
  },
  {
    med1: ['lurasidona','cloridrato de lurasidona','latuda'],
    med2: ['grapefruit','toranja','suco de toranja'],
    nivel: 'moderado',
    titulo: 'Lurasidona + Grapefruit (Inibição Intestinal CYP3A4)',
    mecanismo: 'Furanocumarinas do grapefruit inibem irreversivelmente CYP3A4 intestinal, aumentando a biodisponibilidade oral da lurasidona de forma imprevisível.',
    efeito: 'Aumento variável (20–100%) da exposição à lurasidona — sedação, hipotensão, prolongamento de QTc.',
    conduta: '⚠️ Evitar grapefruit e seu suco durante uso de lurasidona. Orientar claramente o paciente sobre esta restrição alimentar.'
  },

  // ─── SIBUTRAMINA ─────────────────────────────────────────────────────────────
  {
    med1: ['sibutramina','sibutramine','meridia'],
    med2: ['inibidor mao','imao','fenelzina','tranilcipromina','selegilina','moclobemida','isocarboxazida'],
    nivel: 'grave',
    titulo: 'Sibutramina + IMAOs (Síndrome Serotoninérgica Grave — Contraindicado)',
    mecanismo: 'A sibutramina inibe a recaptação de serotonina, norepinefrina e dopamina. Os IMAOs bloqueiam a degradação destas monoaminas. A combinação resulta em acúmulo maciço de serotonina — precipitando síndrome serotoninérgica grave.',
    efeito: 'Síndrome serotoninérgica: hipertermia, rigidez, mioclonias, agitação, confusão, instabilidade autonômica (taquicardia, hipertensão, diaforese). Pode ser fatal.',
    conduta: '🚫 Contraindicado. Intervalo mínimo de 14 dias entre suspensão do IMAO e início da sibutramina (e vice-versa). Em caso de síndrome serotoninérgica: suspender todos os agentes serotoninérgicos, suporte clínico e considerar ciproeptadina.'
  },
  {
    med1: ['sibutramina','sibutramine','meridia'],
    med2: ['fluoxetina','paroxetina','sertralina','citalopram','escitalopram','venlafaxina','duloxetina','triptano','sumatriptana','zolmitriptana','eletriptana'],
    nivel: 'grave',
    titulo: 'Sibutramina + ISRSs/SNRIs/Triptanos (Síndrome Serotoninérgica)',
    mecanismo: 'Efeito serotoninérgico aditivo. A sibutramina inibe recaptação de serotonina; ISRSs e SNRIs idem; triptanos são agonistas serotoninérgicos. A sobreposição de mecanismos eleva sinapticamente a serotonina a níveis tóxicos.',
    efeito: 'Síndrome serotoninérgica: agitação, tremores, mioclonias, hipertermia, taquicardia, diarreia. Casos graves com rabdomiólise e insuficiência renal.',
    conduta: '🚫 Contraindicado. A sibutramina não deve ser associada a nenhum agente serotoninérgico. Monitorar pacientes que iniciam sibutramina para sinais precoces de toxicidade serotoninérgica.'
  },

  // ─── BUSPIRONA ────────────────────────────────────────────────────────────────
  {
    med1: ['buspirona','buspirone','cloridrato de buspirona','buspar'],
    med2: ['inibidor mao','imao','fenelzina','tranilcipromina','selegilina','moclobemida','isocarboxazida'],
    nivel: 'grave',
    titulo: 'Buspirona + IMAOs (Hipertensão Grave — Contraindicado)',
    mecanismo: 'A buspirona tem efeito agonista parcial em receptores dopaminérgicos D2 e serotoninérgicos 5-HT1A, além de inibir fraca e indiretamente a recaptação de monoaminas. Os IMAOs amplificam este efeito ao bloquear a degradação de dopamina, serotonina e norepinefrina.',
    efeito: 'Hipertensão grave, agitação, síndrome serotoninérgica. Casos de crise hipertensiva com risco de AVC hemorrágico descritos.',
    conduta: '🚫 Contraindicado. Intervalo mínimo de 14 dias entre suspensão do IMAO e início da buspirona. Em substituição de IMAO por buspirona, o washout é obrigatório.'
  },
  {
    med1: ['buspirona','buspirone','cloridrato de buspirona','buspar'],
    med2: ['fluconazol','itraconazol','cetoconazol','ketoconazol','eritromicina','diltiazem','verapamil'],
    nivel: 'moderado',
    titulo: 'Buspirona + Inibidores CYP3A4 (Aumento da Exposição)',
    mecanismo: 'A buspirona é extensamente metabolizada por CYP3A4 (first-pass hepático e intestinal pronunciado). Inibidores desta isoenzima reduzem seu clearance, elevando a AUC em 4–13 vezes dependendo do inibidor.',
    efeito: 'Sedação excessiva, tontura, náuseas. Com diltiazem/verapamil: bradicardia e hipotensão adicionais. Risco aumentado de disfunção psicomotora.',
    conduta: '⚠️ Reduzir dose de buspirona ao iniciar inibidores CYP3A4. Com fluconazol e itraconazol: considerar dose mínima efetiva (5 mg 2×/dia). Monitorar sedação e pressão arterial. O grapefruit também inibe CYP3A4 intestinal — orientar evitar.'
  },

  // ─── CLOBAZAM ─────────────────────────────────────────────────────────────────
  {
    med1: ['clobazam','frisium','onfi'],
    med2: ['omeprazol','esomeprazol','lansoprazol','pantoprazol','fluconazol','fluvoxamina'],
    nivel: 'moderado',
    titulo: 'Clobazam + Inibidores CYP2C19 (Acúmulo de N-Desmetilclobazam)',
    mecanismo: 'O clobazam é convertido a N-desmetilclobazam (N-CLB) pelo CYP3A4, e o N-CLB é eliminado por CYP2C19. Inibidores de CYP2C19 (omeprazol, esomeprazol, fluconazol, fluvoxamina) reduzem o clearance do N-CLB, que é também farmacologicamente ativo e contribui para sedação e toxicidade.',
    efeito: 'Sedação excessiva, ataxia, confusão mental, depressão respiratória em casos graves. O acúmulo de N-CLB pode ser mais pronunciado que o do próprio clobazam.',
    conduta: '⚠️ Monitorar sedação e função neurológica. Se possível, substituir omeprazol por pantoprazol (menor inibição de CYP2C19). Com fluconazol: preferir alternativa antifúngica. Ajustar dose de clobazam se efeitos adversos persistirem.'
  },

  // ─── ETOSSUXIMIDA ────────────────────────────────────────────────────────────
  {
    med1: ['etossuximida','ethosuximide','zarontin'],
    med2: ['ácido valproico','valproato','divalproato','depakote','valproate'],
    nivel: 'moderado',
    titulo: 'Etossuximida + Ácido Valproico (Inibição Metabólica — Toxicidade)',
    mecanismo: 'O ácido valproico inibe o metabolismo hepático da etossuximida (via CYP3A4 e possivelmente glucuronidação), elevando seus níveis plasmáticos. A interação é bidirecional: em alguns pacientes, a etossuximida também altera os níveis de valproato.',
    efeito: 'Elevação dos níveis de etossuximida com risco de toxicidade: náuseas, vômitos, sedação, ataxia, psicose tóxica. Raramente perda de controle de crises por paradoxo dose-toxicidade.',
    conduta: '⚠️ Monitorar níveis séricos de ambos os fármacos após início ou ajuste. Titular etossuximida cuidadosamente. A combinação é clinicamente usada em epilepsias de ausência refratárias — o benefício pode superar o risco com monitoramento adequado.'
  },
  {
    med1: ['etossuximida','ethosuximide','zarontin'],
    med2: ['rifampicina','rifampin','carbamazepina','fenitoína','fenobarbital'],
    nivel: 'moderado',
    titulo: 'Etossuximida + Indutores Enzimáticos (Redução de Nível — Falha Terapêutica)',
    mecanismo: 'Rifampicina, carbamazepina, fenitoína e fenobarbital são potentes indutores de CYP3A4. A etossuximida é substrato desta isoenzima. A indução acelera seu metabolismo, reduzindo a concentração plasmática em 30–50%.',
    efeito: 'Perda de controle das crises de ausência — potencialmente levando a estado de mal de ausência (petit mal status). Risco de deterioração neurológica aguda.',
    conduta: '⚠️ Monitorar nível sérico de etossuximida após introdução de indutor. Aumentar dose conforme necessário. Se possível, substituir antiepiléptico indutor por não-indutor (ex: levetiracetam). Ajuste inverso ao suspender o indutor.'
  },

  // ─── PERAMPANEL ──────────────────────────────────────────────────────────────
  {
    med1: ['perampanel','fycompa'],
    med2: ['levonorgestrel','desogestrel','etonogestrel','anticoncepcional oral','contraceptivo oral','etinilestradiol'],
    nivel: 'moderado',
    titulo: 'Perampanel + Contraceptivos Orais (Indução CYP3A4 — Falha Contraceptiva)',
    mecanismo: 'Em doses ≥12 mg/dia, o perampanel induz CYP3A4 de forma clinicamente significativa, acelerando o metabolismo de progestinas (levonorgestrel, desogestrel, etonogestrel) — reduzindo sua biodisponibilidade e eficácia contraceptiva.',
    efeito: 'Falha contraceptiva com risco de gestação não planejada. Em doses menores (≤8 mg/dia), o efeito indutor é mínimo e menos preocupante.',
    conduta: '⚠️ Em doses de perampanel ≥12 mg/dia: usar método contraceptivo não hormonal ou com estrogênio (COC com etinilestradiol ≥30 mcg), ou barreira adicional. Informar a paciente sobre o risco. Planejar contracepção antes de escalar a dose.'
  },
  {
    med1: ['perampanel','fycompa'],
    med2: ['rifampicina','rifampin','carbamazepina','oxcarbazepina','fenitoína','fenobarbital'],
    nivel: 'moderado',
    titulo: 'Perampanel + Indutores CYP3A4 (Redução de Nível — Ajuste de Dose)',
    mecanismo: 'Indutores fortes de CYP3A4 (rifampicina, carbamazepina, fenitoína, fenobarbital) reduzem a meia-vida do perampanel de ~105 horas para ~25 horas e diminuem sua AUC em até 50–67%.',
    efeito: 'Redução da eficácia antiepiléptica. Risco de recorrência de crises em pacientes previamente controlados.',
    conduta: '⚠️ Em pacientes usando indutores, o perampanel geralmente requer doses maiores (dobrar a dose usual, até máximo de 12 mg/dia). Monitorar resposta clínica. Ao suspender o indutor, reduzir dose de perampanel para evitar toxicidade.'
  },

  // ─── LACOSAMIDA ──────────────────────────────────────────────────────────────
  {
    med1: ['lacosamida','vimpat'],
    med2: ['betabloqueador','atenolol','bisoprolol','metoprolol','carvedilol','propranolol','verapamil','diltiazem','digoxina','amiodarona','dronedarona','sotalol'],
    nivel: 'moderado',
    titulo: 'Lacosamida + Fármacos que Prolongam Intervalo PR (Bradicardia / BAV)',
    mecanismo: 'A lacosamida bloqueia canais de sódio voltagem-dependentes com inativação lenta, afetando a condução do nó AV. A combinação com outros fármacos que prolongam o intervalo PR (betabloqueadores, antagonistas de cálcio não-diidropiridínicos, digoxina, antiarrítmicos) produz efeito aditivo.',
    efeito: 'Bradicardia sinusal, bloqueio atrioventricular de 1.º ou 2.º grau, prolongamento de PR. Risco de síncope e parada cardíaca em pacientes com cardiopatia subjacente.',
    conduta: '⚠️ Realizar ECG antes e após início da lacosamida em pacientes em uso de tais medicamentos. Titular lacosamida lentamente. Em pacientes com BAV pré-existente ou doença do nó sinusal, a lacosamida é de uso cauteloso — avaliar implante de marca-passo se necessário antes de iniciar.'
  },

  // ─── ZONISAMIDA ──────────────────────────────────────────────────────────────
  {
    med1: ['zonisamida','zonegran'],
    med2: ['topiramato','topamax'],
    nivel: 'moderado',
    titulo: 'Zonisamida + Topiramato (Inibição Dupla da Anidrase Carbônica — Nefrolitíase)',
    mecanismo: 'Ambos inibem a anidrase carbônica renal. O efeito combinado alcaliniza a urina e reduz a excreção urinária de citrato, criando condições que favorecem a precipitação de cristais de fosfato de cálcio e a formação de cálculos renais.',
    efeito: 'Risco 2–3 vezes maior de nefrolitíase. Oligoidrose (redução da sudorese) com risco de hipertermia — especialmente em crianças. Acidose metabólica hiperclorêmica aditiva.',
    conduta: '⚠️ Manter hidratação adequada (≥2 litros/dia). Monitorar pH urinário e eletrólitos periodicamente. Considerar citrato de potássio como profilaxia de cálculos. Alertar sobre risco de hipertermia em climas quentes. Evitar a combinação em pacientes com histórico de litíase renal.'
  },
  {
    med1: ['zonisamida','zonegran'],
    med2: ['rifampicina','rifampin','carbamazepina','fenitoína','fenobarbital'],
    nivel: 'moderado',
    titulo: 'Zonisamida + Indutores CYP3A4 (Redução de Meia-Vida — Ajuste de Dose)',
    mecanismo: 'Indutores de CYP3A4 reduzem a meia-vida da zonisamida de ~63 horas para ~27 horas (carbamazepina) ou ~38 horas (fenitoína), diminuindo significativamente a exposição ao fármaco.',
    efeito: 'Redução dos níveis plasmáticos de zonisamida e perda de controle epiléptico. Risco de recorrência de crises.',
    conduta: '⚠️ Doses de zonisamida tipicamente são 33–50% maiores quando em coadministração com indutores. Monitorar resposta clínica e nível sérico quando disponível. Ajustar dose em ambas as direções ao iniciar ou suspender o indutor.'
  },

  // ─── ROFLUMILASTE ────────────────────────────────────────────────────────────
  {
    med1: ['roflumilaste','daxas','daliresp'],
    med2: ['rifampicina','rifampin'],
    nivel: 'grave',
    titulo: 'Roflumilaste + Rifampicina (Indução CYP — Contraindicado)',
    mecanismo: 'A rifampicina é indutora potente de CYP3A4 e CYP1A2 — as principais enzimas de metabolização do roflumilaste. A indução reduz a AUC total do roflumilaste e seu metabólito ativo (roflumilaste N-óxido) em ~80%, eliminando efetivamente a atividade farmacológica.',
    efeito: 'Perda completa da eficácia em DPOC. Risco de exacerbação grave. A alternativa para tuberculose concomitante exige consulta com especialistas.',
    conduta: '🚫 Contraindicado conforme bula. Roflumilaste não deve ser usado durante tratamento antituberculoso com rifampicina. Avaliar caso a caso com pneumologista e infectologista.'
  },
  {
    med1: ['roflumilaste','daxas','daliresp'],
    med2: ['teofilina','aminofilina'],
    nivel: 'moderado',
    titulo: 'Roflumilaste + Teofilina (Sinergia PDE — Aumento de Efeitos Adversos)',
    mecanismo: 'Roflumilaste inibe seletivamente PDE4; a teofilina inibe PDE de forma não-seletiva (incluindo PDE4). A inibição cumulativa de PDE4 resulta em efeito farmacológico aditivo, sem proporcionar benefício adicional sobre a broncodilatação, mas amplificando efeitos adversos.',
    efeito: 'Náuseas, vômitos, diarreia, insônia e perda de peso intensificados. Risco de arritmias e convulsões com teofilina em níveis elevados.',
    conduta: '⚠️ Evitar uso combinado quando possível. Se necessário, manter teofilina em doses mínimas e monitorar níveis séricos. Preferir broncodilatadores de ação longa (LABA, LAMA) como alternativa à teofilina.'
  },
  {
    med1: ['roflumilaste','daxas','daliresp'],
    med2: ['fluconazol','cetoconazol','ketoconazol','enoxacino','cimetidina'],
    nivel: 'moderado',
    titulo: 'Roflumilaste + Inibidores CYP3A4/CYP1A2 (Aumento de Exposição)',
    mecanismo: 'Roflumilaste é substrato de CYP3A4 e CYP1A2. Inibidores destas isoenzimas (fluconazol, cetoconazol, enoxacino, cimetidina) aumentam a AUC total do roflumilaste em 50–90%.',
    efeito: 'Amplificação de efeitos adversos dose-dependentes: náuseas, diarreia, cefaleia, insônia, perda de peso. Risco de descontinuação por intolerância.',
    conduta: '⚠️ Usar com cautela. Monitorar tolerabilidade. Com inibidores potentes (cetoconazol, fluconazol), considerar alternativa terapêutica. Informar paciente sobre possível piora de efeitos adversos gastrointestinais.'
  },

  // ─── BARICITINIBE / TOFACITINIBE ─────────────────────────────────────────────
  {
    med1: ['baricitinibe','olumiant','tofacitinibe','xeljanz','citrato de tofacitinibe'],
    med2: ['vacina viva','vacina de vírus vivo','vacina febre amarela','vacina varicela','vacina rotavírus','vacina sarampo','bcg'],
    nivel: 'grave',
    titulo: 'Inibidores JAK (Baricitinibe/Tofacitinibe) + Vacinas Vivas (Contraindicado)',
    mecanismo: 'Inibidores da via JAK-STAT suprimem a sinalização de interleucinas e interferons essenciais para a resposta imune. A imunossupressão resultante impede a geração de resposta protetora adequada a vacinas vivas e, criticamente, pode permitir que o vírus vacinal cause doença disseminada.',
    efeito: 'Infecção disseminada pelo vírus vacinal (varicela disseminada, sarampo vacinal, etc.). Risco de tuberculose reativada com BCG. Óbito descrito com febre amarela em imunossuprimidos.',
    conduta: '🚫 Contraindicado. Todas as vacinas vivas devem ser administradas ≥4 semanas antes do início do inibidor JAK. Vacinas inativadas (influenza, pneumocócica, herpes zoster recombinante Shingrix®) são seguras e recomendadas. Atualizar calendário vacinal antes de iniciar tratamento.'
  },
  {
    med1: ['baricitinibe','olumiant','tofacitinibe','xeljanz','citrato de tofacitinibe'],
    med2: ['adalimumabe','infliximabe','etanercepte','abatacepte','tocilizumabe','rituximabe','anti-tnf','biologico'],
    nivel: 'grave',
    titulo: 'Inibidores JAK + Biológicos Imunossupressores (Imunossupressão Excessiva)',
    mecanismo: 'A combinação de dois ou mais imunossupressores de mecanismos diferentes (JAK + anti-TNF, JAK + abatacepte, etc.) resulta em supressão sinérgica das defesas imunológicas, sem benefício aditivo demonstrado em indicações aprovadas.',
    efeito: 'Infecções graves e oportunistas: pneumonia por Pneumocystis jirovecii, tuberculose, infecções fúngicas invasivas, sepse. Risco aumentado de neoplasias hematológicas.',
    conduta: '🚫 Contraindicado. Inibidores JAK não devem ser associados a biológicos imunossupressores. Monoterapia ou combinação com DMARDs convencionais (metotrexato, hidroxicloroquina) é o padrão seguro.'
  },

  // ─── ANFOTERICINA B ───────────────────────────────────────────────────────────
  {
    med1: ['anfotericina b','anfotericina','amphotericin','fungizone','abelcet','ambisome'],
    med2: ['aminoglicosídeo','amicacina','gentamicina','tobramicina','estreptomicina','vancomicina'],
    nivel: 'grave',
    titulo: 'Anfotericina B + Aminoglicosídeos/Vancomicina (Nefrotoxicidade Sinérgica)',
    mecanismo: 'A anfotericina B liga-se ao ergosterol da membrana fúngica mas também à membrana do epitélio tubular renal — causando aumento de permeabilidade, perda de potássio e magnésio e redução da TFG. Aminoglicosídeos causam lesão tubular proximal por acumulação lisossômica. Os mecanismos somam-se de forma sinérgica, não apenas aditiva.',
    efeito: 'Lesão renal aguda grave, frequentemente requerendo diálise. Hipocalemia e hipomagnesemia profundas que predispõem a arritmias. Em pacientes de UTI, a combinação pode ser fatal.',
    conduta: '⚠️ Evitar combinação quando possível. Se necessário: hidratação IV vigorosa (500 mL SF 0,9% antes de cada dose de anfotericina), monitorar creatinina, eletrólitos e débito urinário diariamente. Preferir formulações lipídicas (AmBisome®) — menor nefrotoxicidade. Espaçar doses de aminoglicosídeo (dose única diária).'
  },
  {
    med1: ['anfotericina b','anfotericina','amphotericin','fungizone','abelcet','ambisome'],
    med2: ['ciclosporina','sandimmun','ciclosporin'],
    nivel: 'grave',
    titulo: 'Anfotericina B + Ciclosporina (Nefrotoxicidade Grave)',
    mecanismo: 'Mecanismos nefrotóxicos independentes e aditivos: anfotericina B causa vasoconstricção aferente renal e lesão tubular direta; a ciclosporina causa vasoconstricção aferente via tromboxano A2 e endotelina, além de fibrose intersticial crônica.',
    efeito: 'IRA grave, frequentemente irreversível em transplantados. Risco elevado de perda do enxerto renal.',
    conduta: '⚠️ Usar apenas quando não houver alternativa. Preferir formulação lipídica de anfotericina. Monitorar função renal diariamente. Reduzir dose de ciclosporina e manter seus níveis no menor intervalo terapêutico possível durante o curso de anfotericina.'
  },
  {
    med1: ['anfotericina b','anfotericina','amphotericin','fungizone','abelcet','ambisome'],
    med2: ['digoxina','digitoxina'],
    nivel: 'moderado',
    titulo: 'Anfotericina B + Digoxina (Hipocalemia → Toxicidade Digitálica)',
    mecanismo: 'A anfotericina B causa perda renal e tubular de potássio e magnésio. A hipocalemia resultante sensibiliza o miocárdio aos efeitos tóxicos da digoxina — o mesmo nível sérico de digoxina torna-se tóxico em contexto de hipocalemia.',
    efeito: 'Arritmias digitálicas (extrassístoles ventriculares, bigeminismo, bloqueios, taquicardia ventricular) mesmo com níveis séricos de digoxina "terapêuticos".',
    conduta: '⚠️ Monitorar potássio sérico e ECG diariamente durante coadministração. Repor potássio e magnésio agressivamente. Considerar suspensão temporária da digoxina ou redução de dose. Verificar nível sérico de digoxina antes de qualquer ajuste.'
  },

  // ─── GANCICLOVIR ─────────────────────────────────────────────────────────────
  {
    med1: ['ganciclovir','cytovene','cymevene'],
    med2: ['zidovudina','azt','retrovir'],
    nivel: 'grave',
    titulo: 'Ganciclovir + Zidovudina (Mielossupressão Grave — Geralmente Contraindicado)',
    mecanismo: 'Ambos os fármacos suprimem a medula óssea por mecanismos independentes: ganciclovir por toxicidade direta ao progenitor hematopoiético; zidovudina por inibição da DNA polimerase mitocondrial, causando disfunção dos precursores mieloides. Os efeitos são sinérgicos.',
    efeito: 'Neutropenia grave (CAN <500/mm³) com risco elevado de infecções bacterianas e fúngicas oportunistas. Anemia e trombocitopenia. A necessidade de G-CSF é frequente.',
    conduta: '⚠️ Evitar combinação sempre que possível. Se indispensável (CMV sistêmico em paciente com AIDS): monitorar hemograma 2×/semana. Considerar G-CSF profilático. Substituir zidovudina por tenofovir ou abacavir quando clinicamente viável.'
  },
  {
    med1: ['ganciclovir','cytovene','cymevene'],
    med2: ['mofetila de micofenolato','micofenolato','cellcept','myfortic'],
    nivel: 'moderado',
    titulo: 'Ganciclovir + Micofenolato de Mofetila (Mielossupressão e Competição Tubular)',
    mecanismo: 'Ambos competem pela secreção tubular renal via transportadores OAT1/OAT3, resultando em aumento mútuo dos níveis plasmáticos. Adicionalmente, a combinação amplifica a supressão medular de forma aditiva.',
    efeito: 'Leucopenia significativa. Risco aumentado de infecção oportunista em transplantados. Elevação dos níveis de ambos os fármacos por competição tubular.',
    conduta: '⚠️ Monitorar hemograma semanalmente durante uso conjunto. Considerar redução de dose de micofenolato (guiada por nível de MPAG, se disponível). Em episódios de neutropenia grave, G-CSF pode ser necessário.'
  },

  // ─── PIRAZINAMIDA ────────────────────────────────────────────────────────────
  {
    med1: ['pirazinamida','pyrazinamide'],
    med2: ['alopurinol','probenecida','benzbromaron'],
    nivel: 'moderado',
    titulo: 'Pirazinamida + Agentes Uricosúricos/Antigotosos (Antagonismo — Ineficácia)',
    mecanismo: 'A pirazinamida e seu metabólito ácido pirazinoico inibem a excreção tubular renal de ácido úrico (transportador URAT1), causando hiperuricemia significativa (em até 40–50% dos pacientes em esquemas com pirazinamida). O alopurinol e agentes uricosúricos não conseguem reverter adequadamente essa hiperuricemia induzida por fármaco.',
    efeito: 'Hiperuricemia persistente com risco de crises gotosas agudas durante o esquema antituberculoso. O alopurinol tem eficácia drasticamente reduzida neste contexto.',
    conduta: '⚠️ Informar o paciente sobre risco de gota durante tratamento da TB. Hidratação adequada. Anti-inflamatórios (colchicina, AINE) para crise aguda são mais eficazes que alopurinol neste contexto. Avaliar suspensão da pirazinamida após 2 meses (fase de ataque) quando possível — a hiperuricemia costuma reverter após este período.'
  },

  // ─── RIBAVIRINA ──────────────────────────────────────────────────────────────
  {
    med1: ['ribavirina','copegus','rebetol'],
    med2: ['didanosina','ddi','videx'],
    nivel: 'grave',
    titulo: 'Ribavirina + Didanosina (Toxicidade Mitocondrial Grave — Contraindicado)',
    mecanismo: 'A ribavirina inibe a inosina monofosfato desidrogenase (IMPDH), aumentando intracelularmente a concentração do trifosfato de didanosina (ddATP). Este acúmulo inibe a DNA polimerase mitocondrial (Pol-γ), causando disfunção mitocondrial grave.',
    efeito: 'Acidose láctica, pancreatite aguda, neuropatia periférica e hepatotoxicidade grave. Casos fatais descritos. Descontinuado em ensaios clínicos por toxicidade inaceitável.',
    conduta: '🚫 Contraindicado. Substituir didanosina por tenofovir ou abacavir em pacientes que necessitam de ribavirina para tratamento de hepatite C ou outras indicações.'
  },
  {
    med1: ['ribavirina','copegus','rebetol'],
    med2: ['azatioprina','imuran'],
    nivel: 'grave',
    titulo: 'Ribavirina + Azatioprina (Mielossupressão e Hepatotoxicidade)',
    mecanismo: 'A ribavirina inibe IMPDH, via compartilhada com o metabolismo da azatioprina (6-mercaptopurina → 6-tioguanina). A interação resulta em acúmulo de metabólitos citotóxicos da azatioprina (6-metiltioguanina nucleotídeos), causando toxicidade hepática nodular regenerativa e supressão medular.',
    efeito: 'Mielossupressão grave (leucopenia, anemia, trombocitopenia), hepatotoxicidade e hipertensão portal não-cirrótica (doença hepática nodular regenerativa). Risco de descontinuação de ambos os fármacos.',
    conduta: '⚠️ Evitar combinação. Se imprescindível: monitorar hemograma e provas hepáticas mensalmente, reduzir dose de azatioprina e considerar substituição por micofenolato. Comunicar ao hepatologista e ao especialista responsável pelo imunossupressor.'
  },

  // ─── VALACICLOVIR ────────────────────────────────────────────────────────────
  {
    med1: ['valaciclovir','valtrex','valcivir'],
    med2: ['aminoglicosídeo','amicacina','gentamicina','tobramicina','cisplatina','metotrexato','ciclosporina','tacrolimo','anfotericina b'],
    nivel: 'moderado',
    titulo: 'Valaciclovir + Nefrotóxicos (Toxicidade Renal Aditiva)',
    mecanismo: 'O valaciclovir é convertido a aciclovir, eliminado por filtração glomerular e secreção tubular. Em contexto de lesão renal prévia ou simultânea por nefrotóxicos, o clearance do aciclovir é reduzido, elevando seus níveis plasmáticos. Aciclovir em altas concentrações precipita em túbulo coletor causando nefrotoxicidade cristalina adicional.',
    efeito: 'IRA por nefrotoxicidade aditiva e/ou cristalúria de aciclovir. Neurotoxicidade por aciclovir (encefalopatia, alucinações, tremores) se níveis elevarem muito — mais risco com a forma IV do que oral.',
    conduta: '⚠️ Monitorar função renal, garantir hidratação adequada (≥1,5 L/dia). Em insuficiência renal prévia, ajustar dose de valaciclovir pela TFG. Monitorar sinais de neurotoxicidade.'
  },
  {
    med1: ['valaciclovir','valtrex'],
    med2: ['cimetidina','tagamet'],
    nivel: 'leve',
    titulo: 'Valaciclovir + Cimetidina (Inibição da Secreção Tubular)',
    mecanismo: 'A cimetidina inibe a secreção tubular renal catiônica e também a excreção do aciclovir por competição transportadora, reduzindo seu clearance renal em ~25%.',
    efeito: 'Elevação modesta dos níveis de aciclovir. Na maioria dos pacientes com função renal normal, a interação tem relevância clínica limitada. Em insuficiência renal, pode amplificar toxicidade.',
    conduta: '✅ Geralmente sem necessidade de ajuste em pacientes com função renal normal. Preferir ranitidina, famotidina ou IBP como alternativas ao cimetidina em pacientes com comprometimento renal.'
  },

  // ─── SULFASSALAZINA ──────────────────────────────────────────────────────────
  {
    med1: ['sulfassalazina','salazopyrin','azulfidine'],
    med2: ['ácido fólico','folato','metilfolato'],
    nivel: 'moderado',
    titulo: 'Sulfassalazina + Ácido Fólico (Inibição da Absorção — Deficiência)',
    mecanismo: 'A sulfassalazina inibe o transportador de folato reduzido (RFC/SLC19A1) no intestino delgado e inibe também a di-hidrofolato redutase, reduzindo a disponibilidade de folato ativo. Pode causar deficiência funcional de folato mesmo com níveis séricos na faixa normal.',
    efeito: 'Macrocitose, anemia megaloblástica, hiperhomocisteinemia. Em mulheres em idade fértil: risco aumentado de defeitos do tubo neural em gestação. Piora de mucosite em pacientes em esquemas combinados.',
    conduta: '⚠️ Suplementar ácido fólico 1–5 mg/dia em todos os pacientes em uso prolongado de sulfassalazina. Dose maior (5 mg) em mulheres que planejam gravidez. Monitorar hemograma anualmente.'
  },
  {
    med1: ['sulfassalazina','salazopyrin'],
    med2: ['azatioprina','imuran','mercaptopurina','purinethol'],
    nivel: 'moderado',
    titulo: 'Sulfassalazina + Azatioprina (Mielossupressão Aditiva)',
    mecanismo: 'Ambos suprimem a medula óssea. Adicionalmente, a sulfassalazina inibe TPMT (tiopurina metiltransferase), a enzima que inativa a 6-mercaptopurina derivada da azatioprina. A inibição aumenta a exposição a metabólitos citotóxicos (6-TGN), potencializando a toxicidade hematológica.',
    efeito: 'Leucopenia grave, risco elevado de infecções oportunistas e sepse. Hepatotoxicidade. A toxicidade é mais pronunciada em metabolizadores lentos de TPMT.',
    conduta: '⚠️ Monitorar hemograma mensalmente. Considerar genotipagem ou fenotipagem de TPMT antes de combinar. Reduzir dose de azatioprina se leucócitos caírem abaixo de 3.500/mm³. Avaliar sempre a necessidade da combinação versus monoterapia.'
  },

  // ─── METIMAZOL / PROPILTIOURACIL ─────────────────────────────────────────────
  {
    med1: ['metimazol','tapazole','propiltiouracil','ptu','propylthiouracil'],
    med2: ['warfarina','varfarina','coumadin','acenocumarol','sintrom'],
    nivel: 'moderado',
    titulo: 'Antitireoidianos (Metimazol/PTU) + Anticoagulantes Cumarínicos (Variação de RNI)',
    mecanismo: 'No hipertireoidismo, o metabolismo dos fatores de coagulação dependentes de vitamina K é acelerado (catabolismo aumentado) e a resposta à warfarina está aumentada. À medida que o tratamento antitireoidiano restaura o eutireoidismo, o metabolismo normaliza — os fatores de coagulação retornam aos níveis normais e a sensibilidade à warfarina diminui, exigindo doses maiores. Adicionalmente, o PTU pode ter efeito direto sobre a síntese de vitamina K.',
    efeito: 'Elevação do RNI (risco de sangramento) na fase inicial do tratamento antitireoidiano; queda do RNI (risco trombótico) ao alcançar eutireoidismo sem ajuste da warfarina.',
    conduta: '⚠️ Monitorar RNI a cada 2–4 semanas durante a fase de ajuste da tireóide. Antecipar necessidade de redução da warfarina ao atingir eutireoidismo. Educar o paciente sobre sinais de sangramento e sobre a importância de não alterar doses sem orientação médica.'
  },
  {
    med1: ['metimazol','tapazole','propiltiouracil','ptu'],
    med2: ['clozapina','carbamazepina','metamizol','dipirona','fenilbutazona'],
    nivel: 'grave',
    titulo: 'Antitireoidianos + Outros Mielossupressores (Agranulocitose Aditiva)',
    mecanismo: 'Metimazol e PTU causam agranulocitose idiossincrática em 0,2–0,5% dos pacientes — provavelmente por mecanismo imune. Outros fármacos com risco de agranulocitose (clozapina, carbamazepina, dipirona em uso prolongado) somam este risco de forma aditiva ou sinérgica.',
    efeito: 'Agranulocitose grave (neutrófilos <500/mm³) com risco muito elevado de infecções bacterianas fatais — sepse, pneumonia, infecções de partes moles necrotizantes.',
    conduta: '🚫 Evitar combinação quando possível. Se imprescindível: monitorar hemograma semanalmente nas primeiras 12 semanas. Orientar paciente a procurar atendimento de emergência imediatamente em caso de febre, calafrios ou odinofagia. Suspender antitireoidiano e/ou o outro mielossupressor na presença de neutropenia.'
  }
];

console.log(`Novas interações preparadas: ${novasInteracoes.length}`);

// ── Atualizar public/mc-interacoes-data-v3.js ──
const js = fs.readFileSync('public/mc-interacoes-data-v3.js', 'utf8');
const jsMatch = js.match(/(var mcInteracoesDB\s*=\s*\[)([\s\S]*?)(\];\s*\n\s*var)/);
if (!jsMatch) { console.error('Não encontrou mcInteracoesDB'); process.exit(1); }

const newEntries = novasInteracoes.map(o => JSON.stringify(o)).join(',\n');
const newJs = js.replace(
  jsMatch[0],
  jsMatch[1] + jsMatch[2] + ',\n' + newEntries + jsMatch[3]
);
fs.writeFileSync('public/mc-interacoes-data-v3.js', newJs, 'utf8');
console.log('✅ public/mc-interacoes-data-v3.js atualizado');

// ── Atualizar public/interacoes.json ──
const interacoes = JSON.parse(fs.readFileSync('public/interacoes.json', 'utf8'));
const antes = interacoes.regras.length;
interacoes.regras.push(...novasInteracoes);
fs.writeFileSync('public/interacoes.json', JSON.stringify(interacoes, null, 2), 'utf8');
console.log(`✅ public/interacoes.json: ${antes} → ${interacoes.regras.length} regras`);

// ── Atualizar index.html (mcInteracoesDB inline) ──
let indexHtml = fs.readFileSync('index.html', 'utf8');
// Encontrar o fechamento do array mcInteracoesDB
const closeMarker = '\n];\n';
const idx = indexHtml.lastIndexOf(closeMarker);
if (idx === -1) { console.error('Não encontrou fechamento de mcInteracoesDB no index.html'); process.exit(1); }

const injection = ',\n' + novasInteracoes.map(o => JSON.stringify(o)).join(',\n');
indexHtml = indexHtml.slice(0, idx) + injection + indexHtml.slice(idx);
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('✅ index.html atualizado');

console.log('\n🎉 Concluído! Total de novas interações:', novasInteracoes.length);
