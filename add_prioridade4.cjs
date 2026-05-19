// add_prioridade4.cjs — 16 medicamentos restantes com interações relevantes
'use strict';
const fs = require('fs');

const novas = [

  // ─── FESOTERODINA ────────────────────────────────────────────────────────────
  {
    med1: ['fesoterodina','fumarato de fesoterodina','toviaz'],
    med2: ['cetoconazol','ketoconazol','itraconazol','voriconazol','claritromicina','ritonavir'],
    nivel: 'grave',
    titulo: 'Fesoterodina + Inibidores Fortes CYP3A4 (Contraindicado em IR/IH)',
    mecanismo: 'A fesoterodina é hidrolisada a 5-HMT (metabólito ativo), que é metabolizado por CYP3A4 e CYP2D6. Inibidores potentes de CYP3A4 (cetoconazol, itraconazol, claritromicina, ritonavir) elevam a AUC da fesoterodina em ~2×, aumentando a exposição ao metabólito ativo.',
    efeito: 'Toxicidade anticolinérgica excessiva: retenção urinária, constipação grave, íleo paralítico, taquicardia, visão turva e confusão mental. Em pacientes com IR ou IH moderada/grave, o risco de toxicidade é ainda maior.',
    conduta: '🚫 Contraindicado em pacientes com IR moderada-grave ou IH moderada-grave em uso de inibidores fortes de CYP3A4. Em pacientes sem comprometimento orgânico: limitar a dose a 4 mg/dia. Monitorar sintomas anticolinérgicos. Preferir solifenacina ou oxibutinina se inibidor CYP3A4 for necessário a longo prazo.'
  },
  {
    med1: ['fesoterodina','fumarato de fesoterodina','toviaz'],
    med2: ['fluoxetina','paroxetina','bupropiona'],
    nivel: 'moderado',
    titulo: 'Fesoterodina + Inibidores CYP2D6 (Aumento de Exposição)',
    mecanismo: 'O metabólito ativo da fesoterodina (5-HMT) é também substrato de CYP2D6. Inibidores desta isoenzima (fluoxetina, paroxetina, bupropiona) reduzem seu clearance, elevando a exposição ao metabólito anticolinérgico.',
    efeito: 'Amplificação dos efeitos anticolinérgicos — retenção urinária, constipação, taquicardia, boca seca intensa. Em pacientes metabolizadores lentos de CYP2D6, o efeito é ainda mais pronunciado.',
    conduta: '⚠️ Limitar fesoterodina a 4 mg/dia em pacientes usando inibidores de CYP2D6. Monitorar sintomas anticolinérgicos, especialmente em idosos. Considerar escitalopram ou sertralina como alternativas ao ISRS (menor inibição de CYP2D6).'
  },
  {
    med1: ['fesoterodina','fumarato de fesoterodina','toviaz'],
    med2: ['atropina','biperideno','triexifenidil','escopolamina','dimenidrinato','clorfeniramina','difenidramina','clorpromazina','olanzapina','quetiapina','maprotilina','amitriptilina','imipramina'],
    nivel: 'moderado',
    titulo: 'Fesoterodina + Outros Anticolinérgicos (Toxicidade Anticolinérgica Aditiva)',
    mecanismo: 'A fesoterodina é antagonista muscarínico com efeitos anticolinérgicos sistêmicos. A adição de outros fármacos com atividade anticolinérgica resulta em carga anticolinérgica cumulativa.',
    efeito: 'Síndrome anticolinérgica: boca seca grave, constipação intestinal, retenção urinária aguda, taquicardia, confusão mental e delirium (especialmente em idosos >65 anos). Risco de íleo paralítico.',
    conduta: '⚠️ Avaliar a carga anticolinérgica total do paciente (escala ACB ou Anticholinergic Risk Scale). Minimizar o número de agentes anticolinérgicos concomitantes. Em idosos: a fesoterodina já está incluída nos critérios de Beers como fármaco potencialmente inapropriado — revisar a necessidade.'
  },

  // ─── BRONCODILATADORES INALATÓRIOS ANTICOLINÉRGICOS (LAMA) ───────────────────
  {
    med1: ['brometo de glicopirrônio','glicopirrônio','seebri','brometo de umeclidínio','umeclidínio','incruse','tiotrópio','spiriva','aclidínio','bretaris'],
    med2: ['atropina','biperideno','escopolamina','fesoterodina','solifenacina','oxibutinina','tolterodina','darifenacina','ipratrópio','clorfeniramina','difenidramina','dimenidrinato','amitriptilina','clomipramina','imipramina','clorpromazina','olanzapina','quetiapina'],
    nivel: 'moderado',
    titulo: 'LAMAs Inalatórios + Outros Anticolinérgicos Sistêmicos (Toxicidade Aditiva)',
    mecanismo: 'Os broncodilatadores anticolinérgicos inalatórios de longa ação (LAMAs) bloqueiam receptores muscarínicos M3 brônquicos. Embora a absorção sistêmica seja baixa, em combinação com anticolinérgicos sistêmicos orais, a carga anticolinérgica total pode atingir níveis clinicamente problemáticos.',
    efeito: 'Retenção urinária (especialmente em homens com HPB), constipação, visão turva, boca seca grave, taquicardia. Em idosos com comprometimento cognitivo: confusão e agravamento do delirium.',
    conduta: '⚠️ Revisar o perfil anticolinérgico total do paciente. Em homens com HPB sintomática, monitorar sintomas urinários ao iniciar LAMA. Se anticolinérgico oral sistêmico for necessário, preferir agentes com menor penetração no SNC (solifenacina, fesoterodina) e avaliar necessidade de alfabloqueador urinário.'
  },
  {
    med1: ['brometo de glicopirrônio','glicopirrônio','brometo de umeclidínio','umeclidínio','tiotrópio','aclidínio'],
    med2: ['atenolol','bisoprolol','metoprolol','carvedilol','propranolol','nadolol','timolol'],
    nivel: 'moderado',
    titulo: 'LAMAs + Betabloqueadores Não-Seletivos (Antagonismo Broncodilatador)',
    mecanismo: 'Os LAMAs causam broncodilatação via bloqueio muscarínico M3. Os betabloqueadores não-seletivos (propranolol, carvedilol, nadolol) bloqueiam receptores β2 brônquicos, causando broncoconstricção que antagoniza parcialmente o efeito broncodilatador.',
    efeito: 'Redução da eficácia broncodilatadora do LAMA. Em pacientes com DPOC grave, pode precipitar broncoespasmo clinicamente relevante. O risco é maior com betabloqueadores não-seletivos do que com cardiosseletivos (bisoprolol, metoprolol).',
    conduta: '⚠️ Preferir betabloqueadores cardiosseletivos (bisoprolol, metoprolol) em pacientes com DPOC. Em cardiopatas com DPOC grave que necessitam de betabloqueador não-seletivo: titular cuidadosamente e monitorar função pulmonar (VEF1). O benefício cardiovascular dos betabloqueadores em ICC supera o risco em DPOC na maioria dos casos — não contraindicar absolutamente.'
  },

  // ─── INDACATEROL (LABA) ──────────────────────────────────────────────────────
  {
    med1: ['indacaterol','maleato de indacaterol','onbrez','arcapta'],
    med2: ['atenolol','bisoprolol','metoprolol','carvedilol','propranolol','nadolol'],
    nivel: 'moderado',
    titulo: 'Indacaterol + Betabloqueadores (Antagonismo Broncodilatador)',
    mecanismo: 'O indacaterol é agonista β2-adrenérgico de longa ação. Os betabloqueadores, especialmente os não-seletivos, bloqueiam receptores β2 brônquicos — antagonizando diretamente o efeito broncodilatador do indacaterol e podendo causar broncoespasmo paradoxal.',
    efeito: 'Redução da eficácia broncodilatadora e risco de broncoespasmo, com queda do VEF1. O risco é maior com betabloqueadores não-seletivos. Em DPOC grave, pode precipitar insuficiência respiratória.',
    conduta: '⚠️ Usar betabloqueadores cardiosseletivos (bisoprolol, metoprolol) quando necessários em pacientes com DPOC em uso de LABA. Monitorar função pulmonar ao iniciar ou ajustar betabloqueador. Em emergência de broncoespasmo: salbutamol inalatório tem efeito parcial mesmo sob bloqueio β.'
  },
  {
    med1: ['indacaterol','maleato de indacaterol','onbrez','formoterol','salmeterol','vilanterol','laba'],
    med2: ['corticosteroide sistêmico','prednisona','dexametasona','hidroclorotiazida','furosemida','teofilina','aminofilina'],
    nivel: 'leve',
    titulo: 'LABAs + Corticosteroides/Diuréticos/Xantinas (Hipocalemia Aditiva)',
    mecanismo: 'Os β2-agonistas de longa ação causam hipocalemia por estimulação da Na-K-ATPase muscular (entrada de K⁺ na célula). Corticosteroides sistêmicos, diuréticos de alça e tiazídicos aumentam a perda renal de potássio. Xantinas (teofilina) têm efeito hipocalemiante independente. Os efeitos somam-se.',
    efeito: 'Hipocalemia clinicamente relevante com risco de arritmias ventriculares, fraqueza muscular e paralisia hipocalêmica em casos graves. O risco é maior em exacerbações de DPOC tratadas com nebulizações frequentes de β2-agonistas.',
    conduta: '⚠️ Monitorar potássio sérico em pacientes usando combinação de LABA + diurético ou corticoide sistêmico, especialmente durante exacerbações de DPOC/asma. Repor potássio proativamente. Manter K⁺ sérico > 3,5 mEq/L.'
  },

  // ─── BROMOPRIDA ──────────────────────────────────────────────────────────────
  {
    med1: ['bromoprida','bromoprida','digesan'],
    med2: ['levodopa','carbidopa','levodopa + carbidopa','sinemet','pramipexol','ropinirol','cabergolina','bromocriptina'],
    nivel: 'moderado',
    titulo: 'Bromoprida + Agonistas Dopaminérgicos (Antagonismo Terapêutico)',
    mecanismo: 'A bromoprida é antagonista dopaminérgico D2 (mecanismo pró-cinético). Os agonistas dopaminérgicos usados no Parkinson e distúrbios hipotalâmicos estimulam justamente os receptores D2 periféricos e centrais. Há antagonismo direto do efeito terapêutico.',
    efeito: 'Piora dos sintomas parkinsonianos (rigidez, tremor, bradicinesia) e perda de controle de discinesias. Elevação de prolactina com retorno de galactorreia ou disfunção erétil.',
    conduta: '🚫 Contraindicado em pacientes com Parkinson. Para náuseas/vômitos em parkinsonianos: usar domperidona com cautela (menor penetração no SNC) ou ondansetrom (sem antagonismo dopaminérgico central). A bromoprida está incluída na lista de fármacos que devem ser evitados no Parkinson.'
  },
  {
    med1: ['bromoprida','digesan'],
    med2: ['inibidor mao','imao','fenelzina','tranilcipromina','selegilina','moclobemida'],
    nivel: 'grave',
    titulo: 'Bromoprida + IMAOs (Crise Hipertensiva e Síndrome Serotoninérgica)',
    mecanismo: 'A bromoprida tem propriedades serotoninérgicas além do antagonismo dopaminérgico. Os IMAOs amplificam efeitos serotoninérgicos e adrenérgicos. A combinação pode precipitar crise hipertensiva e síndrome serotoninérgica.',
    efeito: 'Crise hipertensiva, hipertermia, agitação, mioclonias, taquicardia. Potencialmente fatal.',
    conduta: '🚫 Contraindicado. Washout mínimo de 14 dias após suspensão do IMAO antes de iniciar bromoprida. Usar ondansetrom ou metoclopramida (apenas com monitoramento rigoroso) como alternativa antiemética.'
  },
  {
    med1: ['bromoprida','digesan'],
    med2: ['haloperidol','clorpromazina','tioridazina','ziprasidona','amiodarona','sotalol','domperidona','ciprofloxacino','moxifloxacino','azitromicina','eritromicina'],
    nivel: 'moderado',
    titulo: 'Bromoprida + Fármacos que Prolongam QTc (Risco Aditivo)',
    mecanismo: 'A bromoprida bloqueia canais de potássio cardíacos (IKr/hERG), prolongando o intervalo QTc. A combinação com outros fármacos que prolongam o QT — antipsicóticos, antiarrítmicos, macrólidos, fluoroquinolonas — é aditiva.',
    efeito: 'Prolongamento excessivo do QTc com risco de torsades de pointes. O risco é maior em mulheres, hipocalemia e cardiopatia estrutural.',
    conduta: '⚠️ Evitar combinação com outros prolongadores de QT. Realizar ECG basal em pacientes com fatores de risco. Corrigir hipocalemia antes de iniciar. Preferir ondansetrom (menor risco de QTc) como antiemético alternativo.'
  },

  // ─── BETAISTINA ──────────────────────────────────────────────────────────────
  {
    med1: ['betaistina','betahistine','serc','betaserc'],
    med2: ['cetirizina','loratadina','desloratadina','fexofenadina','levocetirizina','bilastina','rupatadina','anti-histamínico'],
    nivel: 'moderado',
    titulo: 'Betaistina + Anti-histamínicos H1 (Antagonismo Farmacológico)',
    mecanismo: 'A betaistina age como agonista parcial dos receptores H1 e H3 histaminérgicos no sistema vestibular — melhorando a microcirculação coclear e reduzindo a pressão endolinfática. Os anti-histamínicos H1 bloqueiam competitivamente os receptores H1, antagonizando diretamente o mecanismo de ação da betaistina.',
    efeito: 'Redução ou anulação da eficácia da betaistina no tratamento de vertigem (doença de Ménière, vertigem posicional). Perda de controle dos episódios vertiginosos.',
    conduta: '⚠️ Evitar combinação. Se anti-histamínico for necessário para rinite ou alergia em paciente com Ménière, considerar alternativas com menor antagonismo H1 central (montelucaste) ou avaliar necessidade da betaistina. A combinação não é absolutamente contraindicada em todos os guias, mas é farmacologicamente irracional.'
  },
  {
    med1: ['betaistina','betahistine','serc'],
    med2: ['inibidor mao','imao','fenelzina','tranilcipromina','selegilina','moclobemida'],
    nivel: 'moderado',
    titulo: 'Betaistina + IMAOs (Aumento dos Níveis de Histamina)',
    mecanismo: 'A histamina é parcialmente degradada pela MAO-B. Os IMAOs inibem a MAO, reduzindo o catabolismo da histamina e potencializando seus efeitos. Como a betaistina atua no sistema histaminérgico, os IMAOs podem amplificar imprevisavelmente seu efeito farmacológico.',
    efeito: 'Potencialização dos efeitos da betaistina com possível hipotensão e aumento de efeitos adversos (cefaleia, náusea, flushing).',
    conduta: '⚠️ Evitar combinação. Washouout de 14 dias após IMAOs irreversíveis antes de iniciar betaistina. Com moclobemida (IMAO reversível): intervalo de 24h é geralmente suficiente.'
  },

  // ─── ÁCIDO TRANEXÂMICO ───────────────────────────────────────────────────────
  {
    med1: ['ácido tranexâmico','acido tranexamico','transamine','hemoblock','cyklokapron'],
    med2: ['anticoncepcional oral','etinilestradiol','progestogênio','acetato de medroxiprogesterona','contraceptivo oral combinado'],
    nivel: 'moderado',
    titulo: 'Ácido Tranexâmico + Contraceptivos Orais Combinados (Risco Trombótico Aditivo)',
    mecanismo: 'O ácido tranexâmico inibe a fibrinólise ao bloquear a ligação do plasminogênio à fibrina, deslocando o equilíbrio hemostático para o estado pró-trombótico. Os estrogênios dos contraceptivos orais aumentam fatores de coagulação pró-trombóticos. Os mecanismos somam-se.',
    efeito: 'Risco aumentado de trombose venosa profunda, embolia pulmonar e trombose em outros territórios (retiniana, cerebral). O risco é especialmente elevado no período peri-menstrual quando o ácido tranexâmico é prescrito para menorragia.',
    conduta: '⚠️ Usar ácido tranexâmico com cautela em usuárias de COC. Para menorragia em mulheres usando COC: avaliar ajuste do anticoncepcional (dose hormonal, mudança de progestágeno) antes de acrescentar ácido tranexâmico. Se uso for inevitável: menor dose e menor duração possíveis, monitorar sinais de trombose.'
  },
  {
    med1: ['ácido tranexâmico','acido tranexamico','transamine','cyklokapron'],
    med2: ['fator vii','fator ix','complexo protrombínico','novacseven','feiba','concentrado de complexo protrombínico'],
    nivel: 'grave',
    titulo: 'Ácido Tranexâmico + Concentrados de Fatores de Coagulação (Trombose Grave)',
    mecanismo: 'Os concentrados de fatores de coagulação (especialmente os ativados — Fator VIIa, FEIBA) já carregam risco trombótico intrínseco. O ácido tranexâmico, ao inibir a fibrinólise, amplifica drasticamente o estado pró-trombótico criado pelos fatores administrados.',
    efeito: 'Trombose arterial ou venosa grave — infarto do miocárdio, AVC isquêmico, trombose intravascular disseminada e coagulação intravascular disseminada paradoxal. Casos fatais descritos com FEIBA + ácido tranexâmico.',
    conduta: '🚫 Contraindicado com FEIBA (complexo protrombínico ativado). Com Fator VIIa recombinante: evitar salvo em situações de emergência com monitoramento intensivo. Em hemofilia com inibidor: discutir com hematologista antes de usar a combinação.'
  },

  // ─── MEBENDAZOL ──────────────────────────────────────────────────────────────
  {
    med1: ['mebendazol','vermox','pantelmin'],
    med2: ['cimetidina','tagamet'],
    nivel: 'leve',
    titulo: 'Mebendazol + Cimetidina (Aumento dos Níveis Plasmáticos)',
    mecanismo: 'A cimetidina inibe CYP1A2 e CYP3A4, as principais enzimas de metabolização do mebendazol, além de inibir a secreção tubular renal. Em tratamento de infecções sistêmicas (equinococose, larva migrans), onde níveis plasmáticos importam, a interação tem relevância clínica.',
    efeito: 'Elevação dos níveis plasmáticos de mebendazol em 2–3 vezes. Na helmintíase intestinal (onde a ação é local), o efeito é irrelevante. Em tratamentos sistêmicos: pode ser benéfico (maiores níveis teciduais) ou aumentar toxicidade hepática.',
    conduta: '✅ Em helmintíase intestinal: interação sem importância clínica. Em equinococose/cisticercose com uso sistêmico: a cimetidina foi intencionalmente usada para elevar níveis teciduais em alguns protocolos. Monitorar transaminases em tratamentos prolongados.'
  },
  {
    med1: ['mebendazol','vermox','pantelmin'],
    med2: ['carbamazepina','tegretol','fenitoína','hidantal','fenobarbital'],
    nivel: 'moderado',
    titulo: 'Mebendazol + Indutores Enzimáticos (Redução de Eficácia Sistêmica)',
    mecanismo: 'Carbamazepina, fenitoína e fenobarbital são indutores de CYP3A4 e CYP1A2, acelerando o metabolismo do mebendazol e reduzindo drasticamente seus níveis plasmáticos.',
    efeito: 'Na helmintíase intestinal (dose única de 100 mg): impacto mínimo pois a ação é local e não depende da absorção sistêmica. Em equinococose hepática ou pulmonar (onde altas doses e níveis sistêmicos são necessários): risco de falha terapêutica.',
    conduta: '⚠️ Em tratamento sistêmico de equinococose: monitorar níveis plasmáticos de mebendazol (ou sulfóxido de albendazol, se este for usado alternativamente). Considerar aumento de dose ou substituição por albendazol em pacientes com carbamazepina ou fenitoína. Em helmintíase intestinal: sem necessidade de ajuste.'
  },

  // ─── ALBENDAZOL ──────────────────────────────────────────────────────────────
  {
    med1: ['albendazol','zentel','eskazole'],
    med2: ['cimetidina','praziquantel'],
    nivel: 'leve',
    titulo: 'Albendazol + Cimetidina / Praziquantel (Aumento do Sulfóxido de Albendazol)',
    mecanismo: 'A cimetidina inibe o metabolismo hepático do albendazol, elevando os níveis do sulfóxido de albendazol (metabólito ativo). O praziquantel aumenta a Cmax do sulfóxido de albendazol em ~50% por mecanismo ainda não completamente esclarecido (possível inibição do metabolismo de first-pass ou da P-gp).',
    efeito: 'Aumento dos níveis do metabólito ativo. Em neurocisticercose e equinococose, este efeito pode ser benéfico (maior concentração tecidual). Em doses convencionais de albendazol, a toxicidade raramente é aumentada.',
    conduta: '✅ A combinação albendazol + praziquantel é usada intencionalmente em neurocisticercose em alguns protocolos — o aumento do sulfóxido de albendazol é considerado vantajoso. Monitorar transaminases em tratamentos prolongados. Em helmintíase intestinal de curto prazo: sem relevância clínica.'
  },
  {
    med1: ['albendazol','zentel','eskazole'],
    med2: ['dexametasona','carbamazepina','fenitoína','fenobarbital','rifampicina'],
    nivel: 'moderado',
    titulo: 'Albendazol + Indutores CYP / Dexametasona (Alteração dos Níveis)',
    mecanismo: 'A dexametasona inibe a sulfoxidação do albendazol, reduzindo a formação do metabólito ativo (sulfóxido) e elevando o metabólito inativo (sulfona). Indutores enzimáticos (rifampicina, carbamazepina) aceleram o metabolismo geral do albendazol, reduzindo ambos os metabólitos.',
    efeito: 'Alteração imprevisível da eficácia em neurocisticercose. Com dexametasona (frequentemente usada para edema cerebral na cisticercose): paradoxalmente pode elevar os níveis plasmáticos totais do albendazol em alguns estudos, com efeito clínico variável.',
    conduta: '⚠️ A combinação albendazol + dexametasona é frequentemente usada em neurocisticercose (esteroide para edema pericístico). Monitorar resposta clínica e de imagem. Evitar antiepilépticos indutores quando possível — preferir levetiracetam ou lamotrigina para controle de crises em cisticercose.'
  },

  // ─── NITAZOXANIDA ────────────────────────────────────────────────────────────
  {
    med1: ['nitazoxanida','annita','alinia'],
    med2: ['warfarina','varfarina','acenocumarol'],
    nivel: 'moderado',
    titulo: 'Nitazoxanida + Warfarina (Deslocamento Proteico — Elevação do RNI)',
    mecanismo: 'A nitazoxanida e seu metabólito ativo (tizoxanida) são altamente ligados a proteínas plasmáticas (>99%). Podem deslocar a warfarina de seus sítios de ligação à albumina, aumentando transitoriamente a fração livre (ativa) da warfarina. Adicionalmente, há relato de inibição leve de CYP2C9.',
    efeito: 'Elevação do RNI com risco de sangramento. O efeito pode ser transitório mas clinicamente relevante, especialmente nas primeiras doses de nitazoxanida.',
    conduta: '⚠️ Monitorar RNI nos primeiros dias após início da nitazoxanida em anticoagulados. Ajustar dose de warfarina se necessário. Como o tratamento com nitazoxanida é geralmente de curta duração (3 dias), monitorar RNI ao final do curso e após a suspensão.'
  },

  // ─── TENOXICAM ───────────────────────────────────────────────────────────────
  {
    med1: ['tenoxicam','tilatil','mobiflex'],
    med2: ['warfarina','varfarina','acenocumarol','heparina','apixabana','rivaroxabana','dabigatrana'],
    nivel: 'moderado',
    titulo: 'Tenoxicam + Anticoagulantes (Risco de Sangramento)',
    mecanismo: 'O tenoxicam inibe COX-1 (reduzindo tromboxano A2 e agregação plaquetária) e lesa a mucosa gastrointestinal por inibição de prostaglandinas protetoras. Em combinação com anticoagulantes, o risco de sangramento gastrointestinal é aditivo.',
    efeito: 'Sangramento GI (úlcera, gastrite hemorrágica), hematúria e equimoses. O tenoxicam tem meia-vida muito longa (~60–75 horas) — o efeito anticoagulante pode persistir por dias após a suspensão.',
    conduta: '⚠️ Evitar em anticoagulados. Se AINE for necessário: preferir agentes de meia-vida curta (ibuprofeno, diclofenaco) para facilitar o manejo. Sempre associar proteção gástrica com IBP (omeprazol, pantoprazol). Monitorar RNI com warfarina. Paracetamol é a alternativa de primeira linha.'
  },
  {
    med1: ['tenoxicam','tilatil','mobiflex'],
    med2: ['carbonato de lítio','lítio','litio'],
    nivel: 'moderado',
    titulo: 'Tenoxicam + Lítio (Redução do Clearance Renal — Toxicidade)',
    mecanismo: 'O tenoxicam inibe prostaglandinas renais vasodilatadoras (PGE2, PGI2), reduzindo o fluxo sanguíneo renal e a taxa de filtração glomerular. Como o lítio é eliminado exclusivamente por via renal, seu clearance diminui e seus níveis séricos elevam. A meia-vida longa do tenoxicam (~60–75h) prolonga a interação.',
    efeito: 'Toxicidade por lítio: tremor, ataxia, confusão, poliúria paradoxal, convulsões em casos graves. A interação pode se manifestar mesmo com uso breve de tenoxicam.',
    conduta: '⚠️ Monitorar litemia 5–7 dias após início do tenoxicam. Preferir paracetamol como analgésico em usuários de lítio. Se AINE for necessário, optar por sulindac (menor efeito sobre a excreção renal de lítio) com monitoramento rigoroso.'
  },
  {
    med1: ['tenoxicam','tilatil','mobiflex'],
    med2: ['metotrexato','methotrexate'],
    nivel: 'grave',
    titulo: 'Tenoxicam + Metotrexato (Toxicidade Grave por MTX)',
    mecanismo: 'O tenoxicam reduz o fluxo sanguíneo renal e inibe transportadores tubulares OAT1/OAT3, comprometendo a eliminação renal do metotrexato. A meia-vida prolongada do tenoxicam (~3 dias) significa que a interação persiste por mais tempo do que com AINEs de ação curta.',
    efeito: 'Acúmulo de metotrexato com mucosites graves, mielossupressão, hepatotoxicidade e nefrotoxicidade. Em doses oncológicas: risco fatal.',
    conduta: '🚫 Contraindicado com metotrexato em doses oncológicas. Em doses antirreumatológicas: evitar tenoxicam na semana da tomada de metotrexato — a meia-vida longa o torna especialmente problemático. Usar paracetamol como alternativa analgésica. Monitorar hemograma e função renal.'
  },

  // ─── RIFAXIMINA ──────────────────────────────────────────────────────────────
  {
    med1: ['rifaximina','xifaxan','normix'],
    med2: ['ciclosporina','sandimmun'],
    nivel: 'moderado',
    titulo: 'Rifaximina + Ciclosporina (Inibição P-gp — Aumento de Rifaximina)',
    mecanismo: 'A rifaximina é substrato da P-glicoproteína intestinal, que normalmente limita sua absorção sistêmica (<1%). A ciclosporina é inibidora potente da P-gp. Em combinação, a absorção sistêmica da rifaximina pode aumentar significativamente — embora ainda permaneça baixa em termos absolutos.',
    efeito: 'Elevação dos níveis plasmáticos de rifaximina com possível aumento de efeitos adversos sistêmicos (náusea, elevação de transaminases). Em transplantados hepáticos (principal indicação de ciclosporina + rifaximina para encefalopatia hepática), o risco merece monitoramento.',
    conduta: '⚠️ Monitorar função hepática e efeitos adversos ao combinar rifaximina com ciclosporina. Ajustar dose de rifaximina se necessário. A combinação é clinicamente relevante em pacientes transplantados com encefalopatia hepática recorrente.'
  },
  {
    med1: ['rifaximina','xifaxan','normix'],
    med2: ['warfarina','varfarina','acenocumarol'],
    nivel: 'leve',
    titulo: 'Rifaximina + Warfarina (Alteração da Microbiota — Variação de RNI)',
    mecanismo: 'A rifaximina, ao alterar a microbiota intestinal, pode reduzir a síntese bacteriana de vitamina K2 (menaquinona) no cólon. Em pacientes com ingestão marginal de vitamina K1, esta redução pode elevar o RNI. O efeito é geralmente modesto por ser a vitamina K bacteriana de absorção limitada.',
    efeito: 'Variação modesta do RNI durante o curso de rifaximina. Clinicamente relevante principalmente em pacientes com dieta pobre em vegetais (baixa reserva de vitamina K1).',
    conduta: '✅ Monitorar RNI ao iniciar rifaximina em anticoagulados, especialmente se curso prolongado (uso profilático de encefalopatia hepática). Em cursos curtos (3 dias), o impacto é geralmente mínimo.'
  },

  // ─── SECNIDAZOL ──────────────────────────────────────────────────────────────
  {
    med1: ['secnidazol','secnidal','flagentyl'],
    med2: ['álcool','bebida alcoólica','etanol'],
    nivel: 'moderado',
    titulo: 'Secnidazol + Álcool (Reação Antabuse / Efeito Dissulfiram)',
    mecanismo: 'O secnidazol, como todos os nitroimidazóis (metronidazol, tinidazol, ornidazol), inibe a aldeído desidrogenase mitocondrial. O álcool é metabolizado a acetaldeído (por álcool desidrogenase), que normalmente é convertido a acetato pela aldeído desidrogenase. A inibição causa acúmulo de acetaldeído tóxico.',
    efeito: 'Reação antabuse: flushing (rubor facial intenso), cefaleia pulsátil, náuseas, vômitos, taquicardia, hipotensão e sensação de morte iminente. Geralmente auto-limitada mas muito desconfortável. Raramente grave (colapso cardiovascular).',
    conduta: '⚠️ Orientar firmemente a evitar álcool durante o tratamento. A meia-vida longa do secnidazol (~17–29h) significa que o risco persiste por 2–3 dias após a última dose. Incluir alertas sobre álcool em medicamentos, bebidas fermentadas e enxaguatórios bucais com álcool.'
  },
  {
    med1: ['secnidazol','secnidal'],
    med2: ['warfarina','varfarina','acenocumarol'],
    nivel: 'moderado',
    titulo: 'Secnidazol + Warfarina (Potencialização do Efeito Anticoagulante)',
    mecanismo: 'Como o metronidazol, o secnidazol inibe CYP2C9 — a principal enzima responsável pelo metabolismo da S-warfarina (isômero ativo). A inibição reduz o clearance da warfarina e eleva seus níveis plasmáticos.',
    efeito: 'Elevação do RNI com risco aumentado de sangramento. Embora o secnidazol seja geralmente usado em dose única ou curso de 1–2 dias, a elevação do RNI pode persistir por alguns dias.',
    conduta: '⚠️ Monitorar RNI no início e ao final do curso de secnidazol. Pode ser necessária redução temporária da dose de warfarina. Para tricomoníase e giardíase em anticoagulados: comunicar ao paciente sobre o risco de sangramento e sinais de alerta.'
  },

  // ─── FUROATO DE MOMETASONA ───────────────────────────────────────────────────
  {
    med1: ['furoato de mometasona','mometasona','nasonex','asmanex','elocon'],
    med2: ['cetoconazol','ketoconazol','itraconazol','ritonavir','cobicistate','claritromicina'],
    nivel: 'moderado',
    titulo: 'Furoato de Mometasona + Inibidores Fortes CYP3A4 (Aumento da Absorção Sistêmica)',
    mecanismo: 'A mometasona inalatória ou nasal tem baixíssima biodisponibilidade sistêmica normalmente (<1%). No entanto, CYP3A4 é responsável por seu metabolismo de first-pass. Inibidores potentes desta enzima podem elevar a absorção sistêmica para níveis clinicamente relevantes em uso prolongado.',
    efeito: 'Efeitos sistêmicos de corticosteroides em uso prolongado: supressão do eixo HPA (insuficiência adrenal ao suspender abruptamente), síndrome de Cushing iatrogênica (ganho de peso, hiperglicemia, osteoporose), cataratas.',
    conduta: '⚠️ Monitorar sinais de hipercortisolismo em uso prolongado de mometasona com inibidores fortes de CYP3A4 (especialmente ritonavir/cobicistate em TARV). Considerar dose menor de mometasona ou alternativa com menor dependência de CYP3A4 (beclometasona, budesonida). Não suspender abruptamente a mometasona após uso prolongado.'
  },

  // ─── ACETILCISTEÍNA / NAC ────────────────────────────────────────────────────
  {
    med1: ['acetilcisteína','acetilcisteina','n-acetilcisteína','nac','fluimucil','mucolytic'],
    med2: ['nitroglicerina','nitrato','mononitrato de isossorbida','dinitrato de isossorbida','nitratos'],
    nivel: 'moderado',
    titulo: 'N-Acetilcisteína (NAC) + Nitratos (Potencialização da Vasodilatação)',
    mecanismo: 'A NAC doa grupos tiol (-SH) que potencializam a bioativação do óxido nítrico (NO) derivado dos nitratos. Adicionalmente, a NAC pode restaurar a responsividade dos nitratos em pacientes com tolerância adquirida. O resultado é uma potencialização do efeito vasodilatador.',
    efeito: 'Hipotensão acentuada e cefaleia intensa (cefaleia por nitrato amplificada). Em pacientes com angina usando nitratos e NAC para mucolítico ou proteção hepática, o efeito pode ser surpreendentemente pronunciado.',
    conduta: '⚠️ Monitorar pressão arterial ao iniciar NAC em pacientes usando nitratos. Orientar sobre possível aumento de cefaleia. Em uso IV de NAC (intoxicação por paracetamol): monitorar hemodinâmica e reduzir taxa de infusão se hipotensão. A combinação foi estudada em angina refratária a nitratos — neste contexto o efeito pode ser terapeuticamente aproveitado.'
  },
  {
    med1: ['acetilcisteína','acetilcisteina','n-acetilcisteína','nac'],
    med2: ['carvão ativado','carvao ativado'],
    nivel: 'moderado',
    titulo: 'N-Acetilcisteína (NAC) + Carvão Ativado (Adsorção — Redução de Eficácia)',
    mecanismo: 'O carvão ativado adsorve a NAC no trato gastrointestinal, reduzindo significativamente sua absorção quando administrados simultaneamente por via oral. Esta interação é relevante especialmente no contexto de overdose de paracetamol, onde ambos podem ser usados.',
    efeito: 'Redução da absorção e eficácia da NAC oral no tratamento de intoxicação por paracetamol — comprometendo a proteção hepática.',
    conduta: '⚠️ Na intoxicação por paracetamol com necessidade de carvão ativado: preferir NAC IV (sem interação). Se apenas NAC oral estiver disponível: espaçar ≥1–2 horas do carvão ativado. Em contexto de intoxicação múltipla, o benefício do carvão para outros tóxicos deve ser sopesado contra o risco de comprometer a NAC.'
  },

  // ─── FOSFOMICINA ────────────────────────────────────────────────────────────
  {
    med1: ['trometamol de fosfomicina','fosfomicina','monurol'],
    med2: ['metoclopramida','domperidona','bromoprida'],
    nivel: 'moderado',
    titulo: 'Fosfomicina + Procinéticos (Redução de Absorção)',
    mecanismo: 'Os procinéticos (metoclopramida, domperidona) aceleram o esvaziamento gástrico e o trânsito intestinal. A fosfomicina trometamol é absorvida no intestino delgado de forma tempo-dependente — o trânsito acelerado reduz o tempo de contato com a mucosa absortiva, diminuindo sua biodisponibilidade.',
    efeito: 'Redução da Cmax e AUC da fosfomicina em 25–40%, comprometendo as concentrações urinárias necessárias para a eficácia antibacteriana na ITU.',
    conduta: '⚠️ Evitar procinéticos nas 2–4 horas ao redor da tomada de fosfomicina. Como fosfomicina trometamol é geralmente dose única, planejar a administração afastada do horário do procinético maximiza a absorção.'
  },

  // ─── FENTOLAMINA ────────────────────────────────────────────────────────────
  {
    med1: ['fentolamina','mesilato de fentolamina','regitine'],
    med2: ['epinefrina','adrenalina','epinephrine'],
    nivel: 'grave',
    titulo: 'Fentolamina + Epinefrina (Inversão do Efeito Adrenérgico — Hipotensão Paradoxal)',
    mecanismo: 'A epinefrina tem efeitos α-adrenérgicos (vasoconstrição) e β-adrenérgicos (vasodilatação, inotropia). A fentolamina bloqueia os receptores α. Com o bloqueio α, apenas os efeitos β (vasodilatação periférica via β2) permanecem — resultando em queda pressórica paradoxal. Este é o clássico fenômeno de "reversão da epinefrina".',
    efeito: 'Hipotensão grave paradoxal em pacientes que recebem epinefrina para tratar hipotensão durante bloqueio adrenérgico alfa. O efeito esperado da epinefrina (vasoconstrição) é revertido para vasodilatação.',
    conduta: '🚫 Em pacientes sob bloqueio alfa (incluindo intoxicação por alfa-bloqueadores ou feocromocitoma tratado): usar norepinefrina (noradrenalina) ou vasopressina — não epinefrina — para correção de hipotensão. Informar equipe de emergência sobre o risco de reversão da epinefrina.'
  },
  {
    med1: ['fentolamina','mesilato de fentolamina','regitine'],
    med2: ['sildenafila','tadalafila','vardenafila','avanafila','inibidor pde5'],
    nivel: 'moderado',
    titulo: 'Fentolamina + Inibidores de PDE5 (Hipotensão Aditiva)',
    mecanismo: 'A fentolamina bloqueia receptores α1 e α2 adrenérgicos, causando vasodilatação periférica. Os inibidores de PDE5 promovem vasodilatação via GMPc. Os dois mecanismos se somam de forma aditiva sobre o tônus vascular.',
    efeito: 'Hipotensão sintomática grave — tontura, pré-síncope, síncope. O risco é maior em pacientes com volume circulante reduzido ou cardiopatia.',
    conduta: '⚠️ Evitar combinação. Monitorar pressão arterial se uso for necessário. A fentolamina é usada principalmente em contexto hospitalar (crise hipertensiva por feocromocitoma, reversão de vasoconstrição local) — avaliar cuidadosamente antes de administrar em pacientes em uso de inibidores de PDE5.'
  }
];

module.exports = novas;

if (require.main === module) {
  console.log(`Novas interações P4: ${novas.length}`);

  // ── mc-interacoes-data-v3.js ──
  const jsRaw = fs.readFileSync('public/mc-interacoes-data-v3.js', 'utf8');
  const matchJs = jsRaw.match(/(var mcInteracoesDB\s*=\s*\[)([\s\S]*?)(\];\s*\n\s*var)/);
  if (!matchJs) { console.error('Não encontrou mcInteracoesDB'); process.exit(1); }
  const newJs = jsRaw.replace(
    matchJs[0],
    matchJs[1] + matchJs[2] + ',\n' + novas.map(o => JSON.stringify(o)).join(',\n') + '\n' + matchJs[3]
  );
  fs.writeFileSync('public/mc-interacoes-data-v3.js', newJs, 'utf8');
  console.log(`✅ mc-interacoes-data-v3.js: ${789 + novas.length} entradas`);

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
  const jsCount = (html.match(/\{ med1:/g) || []).length;
  const jsonCount = (html.match(/\{\"med1\":/g) || []).length;
  console.log(`✅ index.html: ${jsCount + jsonCount} entradas no mcInteracoesDB`);

  console.log('\n🎉 Prioridade 4 concluída!');
}
