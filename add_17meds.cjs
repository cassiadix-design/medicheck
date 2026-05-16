const fs = require('fs');
const path = require('path');

const arquivo = path.join(__dirname, 'medicamentos.json');
const dados = JSON.parse(fs.readFileSync(arquivo, 'utf8'));

const novos = [
  // ===== BATCH 1 — ANTIDIABÉTICOS =====
  {
    nome: "Gliclazida",
    generico: "Gliclazida",
    tipo: "Antidiabético Oral — Sulfonilureia de 2ª Geração",
    sinonimos: ["diamicron","diamicron mr","gliclazida mr","glyclazide","gliclazida de liberação modificada"],
    descricao: "Medicamento para diabetes tipo 2 que age estimulando o pâncreas a produzir mais insulina quando o açúcar no sangue sobe. É uma sulfonilureia de segunda geração — classe dos antidiabéticos mais usados há décadas no Brasil e disponível gratuitamente no Farmácia Popular. A versão de liberação modificada (MR) é tomada uma vez ao dia com o café da manhã, facilitando a adesão ao tratamento.",
    receita: "Sim",
    receita_display: "🔴 Receita Simples",
    receita_cor: "vermelho",
    receita_descricao: "Exige receita médica simples (branca). O médico avalia seu perfil antes de prescrever, pois a gliclazida pode causar hipoglicemia se você ficar sem comer.",
    receita_nota: "Receita válida por 30 dias. Disponível no Farmácia Popular gratuitamente ou com copagamento reduzido.",
    efeitos: "O efeito colateral mais importante é a hipoglicemia (açúcar baixo no sangue): tontura, sudorese fria, tremores nas mãos, fome intensa, fraqueza, visão embaçada e palpitações. Podem ocorrer também enjoo, dor de estômago e, raramente, reações alérgicas na pele (coceira, vermelhidão).",
    aviso_grave: "HIPOGLICEMIA — AÇÚCAR MUITO BAIXO: Se sentir tremores intensos, confusão mental, desmaio ou perder a consciência, é uma emergência. Tome açúcar imediatamente (suco, refrigerante comum, balas) e chame socorro. Nunca pule refeições enquanto usa gliclazida — o medicamento age independentemente de você comer.",
    recomendacao: "Tome sempre com a primeira refeição do dia (café da manhã). Nunca interrompa sem falar com o médico. Mantenha sempre açúcar ou suco por perto para emergências de hipoglicemia. Meça a glicemia regularmente e informe ao médico qualquer episódio de fraqueza ou tontura.",
    educacao: "A gliclazida estimula o pâncreas a produzir insulina — por isso é fundamental comer. Se você jejuar ou atrasar uma refeição, o medicamento pode baixar demais o açúcar no sangue. Com o tempo, o diabetes pode progredir e pode ser necessário combinar com outros medicamentos ou ajustar a dose. Informe sempre outros médicos e dentistas que usa gliclazida.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Controla o diabetes tipo 2 estimulando o pâncreas a produzir mais insulina" },
      { titulo: "Quando tomar?", texto: "Uma vez ao dia com o café da manhã" },
      { titulo: "Principal risco?", texto: "Hipoglicemia (açúcar baixo) se pular refeições" },
      { titulo: "Está no Farmácia Popular?", texto: "Sim — disponível gratuitamente ou com copagamento reduzido" }
    ],
    receita_obrigatoria: true,
    tipo_receita: "simples",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Gliclazida pode ser tomada com metformina?", resposta: "Sim, é uma combinação muito usada e bem tolerada. A metformina age de forma diferente (reduz a resistência à insulina) e complementa a gliclazida. Muitos pacientes usam os dois juntos." },
      { pergunta: "O que fazer se esquecer uma dose?", resposta: "Se lembrar ainda durante a refeição ou logo após, tome. Se já passou mais de 2 horas e a próxima refeição está próxima, pule essa dose e tome normalmente na próxima refeição. Nunca dobre a dose." },
      { pergunta: "Posso beber álcool com gliclazida?", resposta: "Álcool pode provocar hipoglicemia grave com gliclazida — evite ou consuma apenas moderadamente, sempre com alimentação. O álcool mascara os sintomas de hipoglicemia (confunde com embriaguez)." },
      { pergunta: "Gliclazida engorda?", resposta: "Pode causar leve ganho de peso, especialmente se houver episódios frequentes de hipoglicemia (que levam o paciente a comer mais para se recuperar). Manter alimentação equilibrada e atividade física ajuda." },
      { pergunta: "Por quanto tempo terei que usar?", resposta: "Em geral, é um tratamento de longa duração. O diabetes tipo 2 é uma condição crônica — a gliclazida pode ser necessária por anos ou pela vida toda, conforme a progressão da doença." }
    ],
    descricao_seo: "Gliclazida (Diamicron MR) é um antidiabético oral sulfonilureia para diabetes tipo 2, disponível no Farmácia Popular. Saiba como tomar, riscos de hipoglicemia e cuidados.",
    alerta_farmaceutico: "Atenção especial em idosos — maior risco de hipoglicemia prolongada. Pacientes com insuficiência renal ou hepática podem precisar de doses menores. Verificar interação com fluconazol (eleva muito a glicemia) e AAS em altas doses (potencializa efeito hipoglicemiante).",
    quando_procurar_medico: "Imediatamente: tremores intensos, confusão, desmaio, dificuldade para falar (sinais de hipoglicemia grave). Em consulta rotineira: glicemia acima da meta estabelecida pelo médico, ganho de peso súbito, lesões nos pés, alterações na visão."
  },
  {
    nome: "Glimepirida",
    generico: "Glimepirida",
    tipo: "Antidiabético Oral — Sulfonilureia de 3ª Geração",
    sinonimos: ["amaryl","glimepiride","glimepirida 1mg","glimepirida 2mg","glimepirida 4mg","amaryl m"],
    descricao: "Antidiabético oral para diabetes tipo 2 que estimula o pâncreas a liberar insulina de forma mais eficiente e sensibiliza os tecidos à sua ação. É a sulfonilureia de terceira geração mais usada no Brasil — tomada uma única vez ao dia, geralmente no café da manhã ou primeira refeição principal. Tem menor risco de hipoglicemia que sulfonilureias antigas (glibenclamida) e não costuma causar tanto ganho de peso.",
    receita: "Sim",
    receita_display: "🔴 Receita Simples",
    receita_cor: "vermelho",
    receita_descricao: "Exige receita médica simples (branca). O médico avalia a função renal e hepática antes de prescrever.",
    receita_nota: "Receita válida por 30 dias. Disponível em farmácias comerciais e em alguns programas de assistência do laboratório.",
    efeitos: "Hipoglicemia (açúcar baixo) é o efeito mais importante: sudorese fria, tremores, tontura, fome repentina. Podem ocorrer também enjoo, dor de estômago e, raramente, reações alérgicas cutâneas. Ganho de peso leve é possível.",
    aviso_grave: "HIPOGLICEMIA GRAVE: Confusão mental, tremores intensos, desmaio ou convulsão com açúcar baixo é uma emergência. Oferecer açúcar de ação rápida (suco, gel de glicose) e acionar o SAMU (192). INSUFICIÊNCIA RENAL: pode acumular no organismo em IR grave — monitoramento necessário.",
    recomendacao: "Tome uma vez ao dia com o café da manhã. Nunca pule refeições. Mantenha balas ou suco à disposição para emergências. Informe ao médico qualquer episódio de fraqueza ou confusão. Realize exames de glicemia e hemoglobina glicada conforme orientado.",
    educacao: "A glimepirida tem ação dupla: estimula o pâncreas a produzir insulina e ajuda os músculos a usá-la melhor — por isso é considerada mais moderna que glibenclamida. Pode ser combinada com metformina, pioglitazona ou insulina conforme a evolução do diabetes.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Controla o diabetes tipo 2 estimulando insulina e melhorando sua ação" },
      { titulo: "Quando tomar?", texto: "Uma vez ao dia com o café da manhã" },
      { titulo: "Diferença da glibenclamida?", texto: "Menor risco de hipoglicemia prolongada e menos ganho de peso" },
      { titulo: "Pode combinar com metformina?", texto: "Sim — combinação muito usada e eficaz para diabetes tipo 2" }
    ],
    receita_obrigatoria: true,
    tipo_receita: "simples",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Glimepirida e glibenclamida são a mesma coisa?", resposta: "Não. Pertencem à mesma classe (sulfonilureias), mas glimepirida é mais nova, tem ação mais precisa, menor risco de hipoglicemia prolongada e menor impacto no peso. Médicos têm preferido glimepirida." },
      { pergunta: "Posso tomar glimepirida se tiver problema nos rins?", resposta: "Depende do grau. Em insuficiência renal leve a moderada pode ser usada com cautela. Em IR grave, é contraindicada — o médico avaliará alternativas como insulina ou alguns iSGLT2." },
      { pergunta: "O que fazer em caso de hipoglicemia?", resposta: "Tome imediatamente açúcar de rápida absorção: ½ copo de suco de fruta, refrigerante comum ou 3 balas. Sente-se, espere 15 minutos e remeça. Se não melhorar ou perder a consciência, chame o SAMU (192)." },
      { pergunta: "Álcool é permitido?", resposta: "Evite. Álcool potencializa a hipoglicemia e pode mascarar seus sintomas. Se consumir socialmente, faça junto com alimentação e com moderação absoluta." },
      { pergunta: "Glimepirida pode ser tomada na gravidez?", resposta: "Não — contraindicada na gravidez. Mulheres diabéticas que engravidam precisam usar insulina, que é segura e não passa para o bebê em quantidade significativa." }
    ],
    descricao_seo: "Glimepirida (Amaryl) é um antidiabético oral para diabetes tipo 2. Saiba para que serve, como tomar, riscos de hipoglicemia e como diferencia da glibenclamida.",
    alerta_farmaceutico: "Interações importantes: fluconazol e ciprofloxacino potencializam efeito hipoglicemiante. AAS em doses altas, sulfametoxazol-trimetoprima e warfarina podem elevar risco de hipoglicemia. Rifampicina reduz o efeito da glimepirida.",
    quando_procurar_medico: "Imediatamente: confusão mental, desmaio, tremores intensos que não melhoram com açúcar. Consulta programada: glicemia sistematicamente fora da meta, infecções recorrentes, alterações nos pés ou visão."
  },
  {
    nome: "Acarbose",
    generico: "Acarbose",
    tipo: "Antidiabético Oral — Inibidor de Alfa-Glicosidase",
    sinonimos: ["glucobay","acarbose 50mg","acarbose 100mg","aglucose"],
    descricao: "Medicamento para diabetes tipo 2 que age de forma completamente diferente das sulfonilureias e metformina: não estimula o pâncreas nem aumenta a insulina — em vez disso, retarda a digestão dos carboidratos no intestino delgado. Com isso, o açúcar entra na corrente sanguínea de forma muito mais lenta após as refeições, evitando picos glicêmicos. É especialmente útil quando a glicemia pós-prandial (após as refeições) está alta, mesmo com boa glicemia de jejum.",
    receita: "Sim",
    receita_display: "🔴 Receita Simples",
    receita_cor: "vermelho",
    receita_descricao: "Exige receita médica simples (branca). Deve ser iniciada em dose baixa para minimizar os efeitos gastrointestinais.",
    receita_nota: "Receita válida por 30 dias. Disponível em farmácias comerciais.",
    efeitos: "Os efeitos colaterais gastrointestinais são muito comuns e fazem parte do mecanismo de ação: gases, flatulência, distensão abdominal e diarreia — especialmente nas primeiras semanas. Esses efeitos tendem a reduzir com o tempo se a dose for ajustada gradualmente. Não causa hipoglicemia quando usada sozinha.",
    aviso_grave: "HIPOGLICEMIA AO COMBINAR COM OUTROS ANTIDIABÉTICOS: Quando acarbose é associada à insulina ou sulfonilureias, o risco de hipoglicemia existe. IMPORTANTE: em caso de hipoglicemia com acarbose, use apenas glicose pura (gel de glicose, suco de fruta) — açúcar de mesa (sacarose) pode não funcionar rápido porque a acarbose retarda sua digestão também.",
    recomendacao: "Tome sempre com a primeira garfada de cada refeição principal (café da manhã, almoço, jantar) — engolir no meio ou após a refeição reduz muito a eficácia. Inicie com dose baixa (25mg) e aumente gradualmente conforme orientação médica para reduzir os gases. Reduza o consumo de alimentos muito fermentáveis (repolho, feijão, brócolis) nas primeiras semanas.",
    educacao: "A acarbose não entra na corrente sanguínea em quantidade significativa — age exclusivamente no intestino. Por isso não causa problemas renais e é uma boa opção para idosos com diabetes. Sozinha raramente causa hipoglicemia. Os gases que ela provoca são consequência do carboidrato não digerido que chega ao intestino grosso — reduzem com o tempo e com a adaptação alimentar.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Reduz o açúcar alto após as refeições (pós-prandial)" },
      { titulo: "Quando tomar?", texto: "Com a primeira garfada de cada refeição principal" },
      { titulo: "Causa hipoglicemia?", texto: "Sozinha, não. Combinada com insulina ou sulfonilureia, pode" },
      { titulo: "Efeito esperado?", texto: "Gases e distensão abdominal são comuns e reduzem com o tempo" }
    ],
    receita_obrigatoria: true,
    tipo_receita: "simples",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Por que a acarbose causa tanto gás?", resposta: "Porque ela retarda a digestão dos carboidratos — esses carboidratos chegam ao intestino grosso e são fermentados pelas bactérias intestinais, gerando gases. É um efeito esperado do mecanismo de ação. Tende a diminuir após algumas semanas." },
      { pergunta: "Posso pular a dose se não vou comer carboidratos?", resposta: "Sim. A acarbose só faz sentido quando há carboidratos na refeição. Em refeições com proteínas e gorduras apenas, pode ser omitida com orientação médica." },
      { pergunta: "Acarbose funciona em diabetes tipo 1?", resposta: "Raramente é usada, mas pode ser associada à insulina em alguns casos para reduzir picos pós-prandiais. Não é a indicação principal — seu uso em tipo 1 é off-label." },
      { pergunta: "Tive hipoglicemia usando acarbose com insulina. O que usar?", resposta: "Glicose pura (gel de glicose ou suco de fruta). Não use balas ou açúcar de mesa como primeira opção — a acarbose bloqueia a digestão da sacarose e o efeito pode ser lento demais em emergência." },
      { pergunta: "Posso tomar acarbose com doença intestinal?", resposta: "Não. Acarbose é contraindicada em doenças inflamatórias intestinais (Crohn, colite ulcerativa), obstrução intestinal ou cirrose hepática grave. Informe seu médico sobre qualquer condição digestiva." }
    ],
    descricao_seo: "Acarbose (Glucobay) é um antidiabético que reduz o açúcar após as refeições agindo no intestino. Saiba como tomar, por que causa gases e como lidar com hipoglicemia.",
    alerta_farmaceutico: "Atenção: neomicina e colestiramina potencializam o efeito da acarbose (maior risco de hipoglicemia e diarreia). Enzimas digestivas e carvão ativado reduzem o efeito — não usar junto. Monitorar função hepática em tratamentos prolongados (hepatotoxicidade rara).",
    quando_procurar_medico: "Dor abdominal intensa (descartar obstrução ou íleo paralítico raro), diarreia persistente por mais de 1 semana, icterícia (pele ou olhos amarelados — sinal de hepatotoxicidade), hipoglicemia que não responde a glicose."
  },

  // ===== BATCH 2 — ITU E INFECÇÕES =====
  {
    nome: "Nitrofurantoína",
    generico: "Nitrofurantoína",
    tipo: "Antibiótico — Antisséptico Urinário (Nitrofurano)",
    sinonimos: ["macrodantina","macrobid","nitrofurantoina","nitrofurantoína macrocristalina","macrocristalina"],
    descricao: "Antibiótico específico para infecções urinárias baixas (cistite — bexiga e uretra). Age concentrando-se diretamente na urina e nos tecidos urinários, atacando as bactérias com múltiplos mecanismos simultâneos — o que reduz muito o risco de resistência bacteriana. É uma das melhores opções para cistite não complicada em mulheres, recomendada pelas principais diretrizes mundiais por preservar a flora intestinal e ter baixa resistência bacteriana.",
    receita: "Sim",
    receita_display: "🔴 Receita Simples",
    receita_cor: "vermelho",
    receita_descricao: "Exige receita médica simples (branca). Para ITU de repetição, pode ser prescrita também como profilaxia de longa duração.",
    receita_nota: "Receita válida por 30 dias. Disponível em farmácias comerciais.",
    efeitos: "Náusea, vômito e dor de estômago — muito comuns, especialmente na versão de liberação imediata (reduzem muito com a versão macrocristalina e se tomada com alimentos. A urina fica marrom ou laranja-escuro durante o tratamento — é normal e não perigoso. Raramente: reação pulmonar aguda (falta de ar) com uso prolongado.",
    aviso_grave: "NÃO USAR PARA INFECÇÃO RENAL (PIELONEFRITE): Nitrofurantoína não atinge concentrações terapêuticas no rim — funciona apenas na bexiga e uretra. Se tiver febre alta, calafrios e dor nas costas/flancos (sinal de infecção renal), procure médico imediatamente — antibiótico diferente é necessário. CONTRAINDICADA EM INSUFICIÊNCIA RENAL GRAVE: não funciona e pode acumular com toxicidade. EVITAR NO FINAL DA GRAVIDEZ (semanas 36 em diante): risco para o recém-nascido.",
    recomendacao: "Tome com alimento ou leite para reduzir náusea e melhorar a absorção. Beba bastante água durante o tratamento (2 a 3 litros por dia) para ajudar a eliminar as bactérias. Complete todo o tratamento mesmo que os sintomas melhorem em 1 a 2 dias. Não tome antiácidos com magnésio perto do horário — reduzem a absorção.",
    educacao: "A cor escura da urina durante o tratamento é normal — é o próprio medicamento sendo eliminado. Nitrofurantoína não é adequada para infecções em outras partes do corpo porque não alcança concentrações suficientes no sangue. Por isso é considerada segura para a flora intestinal — menos resistência bacteriana a longo prazo do que quinolonas.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Infecção urinária baixa (cistite, bexiga, uretra)" },
      { titulo: "Quando tomar?", texto: "Com alimentação ou leite, 3 a 4 vezes ao dia conforme prescrição" },
      { titulo: "Urina escura?", texto: "Normal — é o medicamento sendo eliminado pela urina" },
      { titulo: "Serve para infecção no rim?", texto: "Não — apenas para bexiga e uretra" }
    ],
    receita_obrigatoria: true,
    tipo_receita: "simples",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Nitrofurantoína é melhor que ciprofloxacino para cistite?", resposta: "Para cistite simples não complicada em mulheres, as diretrizes recomendam nitrofurantoína antes de ciprofloxacino — exatamente para preservar o ciprofloxacino para infecções mais graves e evitar resistência bacteriana crescente às quinolonas." },
      { pergunta: "Minha urina ficou marrom. Devo parar?", resposta: "Não. É uma reação normal — o próprio medicamento deixa a urina com coloração marrom ou laranja-escuro. Não é sangue. A coloração desaparece quando o tratamento termina." },
      { pergunta: "Posso tomar na gravidez?", resposta: "Pode ser usada no 1º e 2º trimestre. No 3º trimestre (especialmente a partir da 36ª semana), deve ser evitada — risco de anemia hemolítica no recém-nascido. Informe sempre o médico sobre a gravidez." },
      { pergunta: "Quanto tempo dura o tratamento?", resposta: "Para cistite não complicada em mulheres: geralmente 5 a 7 dias. Para profilaxia de ITU de repetição, pode ser usada em dose única diária noturna por meses — conforme avaliação médica." },
      { pergunta: "Por que não posso usar se tiver problema nos rins?", resposta: "A nitrofurantoína precisa ser filtrada pelos rins para chegar à urina em concentração suficiente. Em IR grave, essa concentração não é atingida e o medicamento pode acumular no sangue, causando toxicidade nervosa e pulmonar." }
    ],
    descricao_seo: "Nitrofurantoína (Macrodantina) é antibiótico para infecção urinária baixa (cistite). Saiba por que a urina fica escura, quando não usar e como tomar corretamente.",
    alerta_farmaceutico: "Não usar em insuficiência renal com ClCr < 30 mL/min. Antiácidos com magnésio reduzem absorção — separar por 2h. Probenecida reduz excreção urinária e diminui eficácia. Risco de neuropatia periférica em uso prolongado — monitorar. Não usar em combinação com quinolonas para mesma infecção (interação antagonista).",
    quando_procurar_medico: "Imediatamente: febre acima de 38°C com calafrios e dor nas costas ou flancos (infecção renal), falta de ar ou tosse durante o tratamento (reação pulmonar rara), sintomas que não melhoram após 48h de tratamento. Retorno: ITU de repetição (mais de 3 episódios por ano)."
  },
  {
    nome: "Norfloxacino",
    generico: "Norfloxacino",
    tipo: "Antibiótico — Fluoroquinolona de 2ª Geração",
    sinonimos: ["floxacin","norfloxacino 400mg","chibroxin","noroxin","norofar"],
    descricao: "Antibiótico da classe das fluoroquinolonas usado principalmente para infecções do trato urinário (cistite, pielonefrite leve) e diarreias infecciosas bacterianas. Age bloqueando enzimas essenciais para a replicação do DNA bacteriano, eliminando as bactérias de forma eficaz. Diferente de ciprofloxacino e levofloxacino (que atingem todo o organismo), norfloxacino concentra-se principalmente no trato urinário e intestinal — por isso é usado especificamente para essas infecções.",
    receita: "Sim",
    receita_display: "🔴 Receita Simples",
    receita_cor: "vermelho",
    receita_descricao: "Exige receita médica simples (branca). Devido ao crescimento de resistência bacteriana, as diretrizes recomendam uso criterioso.",
    receita_nota: "Receita válida por 30 dias. Disponível em farmácias comerciais.",
    efeitos: "Náusea, dor de estômago e diarreia são os mais comuns. Tontura, dor de cabeça. Fotossensibilidade (pele mais sensível ao sol, risco de queimadura rápida). Raramente: tendopatia (dor nos tendões, especialmente calcâneo/Aquiles) — risco maior em idosos e em quem usa corticoide.",
    aviso_grave: "RISCO DE RUPTURA DO TENDÃO DE AQUILES: Quinolonas como norfloxacino aumentam o risco de inflamação e ruptura do tendão, especialmente em idosos, em quem usa corticosteroides ou fez transplante de órgão. Pare imediatamente e procure médico se sentir dor ou estalido no tornozelo ou calcanhar. EVITAR NA GRAVIDEZ E EM CRIANÇAS: pode afetar o desenvolvimento das cartilagens. PROLONGAMENTO DO QT: Monitorar em pacientes com arritmias.",
    recomendacao: "Tome em jejum (estômago vazio) ou pelo menos 1 hora antes das refeições para melhor absorção. Beba bastante água. Evite sol e use protetor solar durante o tratamento. Não tome junto com antiácidos, leite, cálcio ou suplementos de ferro/zinco — separe por pelo menos 2 horas (reduzem muito a absorção).",
    educacao: "Norfloxacino deve ser reservado para quando há necessidade real — o uso excessivo de quinolonas está criando bactérias resistentes difíceis de tratar. Se o médico indicou norfloxacino, complete todo o tratamento. Para cistites simples sem complicações, nitrofurantoína ou fosfomicina podem ser melhores opções segundo diretrizes atuais.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Infecção urinária e diarreia bacteriana" },
      { titulo: "Quando tomar?", texto: "Em jejum ou 1h antes das refeições, com bastante água" },
      { titulo: "Cuidado com sol?", texto: "Sim — evite exposição solar intensa durante o tratamento" },
      { titulo: "Pode tomar com antiácido?", texto: "Não — separar por pelo menos 2 horas" }
    ],
    receita_obrigatoria: true,
    tipo_receita: "simples",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Norfloxacino pode ser tomado com leite ou iogurte?", resposta: "Não junto com o comprimido. O cálcio do leite e do iogurte forma um complexo com o norfloxacino no intestino e reduz muito sua absorção. Tome em jejum e espere pelo menos 2h antes de consumir laticínios." },
      { pergunta: "Posso tomar com anti-inflamatório (ibuprofeno, nimesulida)?", resposta: "Com cautela. AINEs combinados com quinolonas aumentam o risco de convulsões e prolongamento do QT. Se precisar de analgésico, prefira paracetamol e informe o médico." },
      { pergunta: "Quanto tempo dura o tratamento para ITU?", resposta: "Para cistite não complicada em mulheres: geralmente 3 a 7 dias. Para pielonefrite: 10 a 14 dias. Siga exatamente o que o médico prescreveu." },
      { pergunta: "Norfloxacino é seguro para idosos?", resposta: "Com cautela. Idosos têm risco maior de ruptura do tendão de Aquiles e alterações no ritmo cardíaco (QT). Se possível, preferir alternativas. Se usado, monitorar dor em tendões e não exceder a dose." },
      { pergunta: "A infecção voltou logo após o tratamento. O que pode ser?", resposta: "Pode ser resistência bacteriana (bactéria não sensível ao norfloxacino), re-infecção ou infecção renal não completamente tratada. Refazer a urocultura com antibiograma é essencial antes de usar o mesmo antibiótico." }
    ],
    descricao_seo: "Norfloxacino é um antibiótico fluoroquinolona para infecção urinária e diarreia bacteriana. Saiba como tomar corretamente, cuidados com sol, antiácidos e riscos em idosos.",
    alerta_farmaceutico: "Não usar com antiácidos que contêm magnésio, alumínio ou cálcio — quelação que reduz absorção em até 90%. Risco de QT longo com amiodarona, antipsicóticos e antidepressivos tricíclicos. Potencializa anticoagulação com warfarina — monitorar INR. Teofilina: norfloxacino eleva seus níveis — risco de toxicidade.",
    quando_procurar_medico: "Imediatamente: febre alta com calafrios e dor intensa nas costas (pielonefrite ou sepse urinária), dor súbita ou estalido no tendão do calcanhar, convulsão, arritmia cardíaca. Consulta: sintomas que não melhoram em 48h, ITU de repetição frequente."
  },

  // ===== BATCH 3 — ANTICOAGULANTE E ANTICONVULSIVANTES =====
  {
    nome: "Apixabana",
    generico: "Apixabana",
    tipo: "Anticoagulante Oral — Inibidor Direto do Fator Xa (NOAC)",
    sinonimos: ["eliquis","apixaban","apixabana 2.5mg","apixabana 5mg"],
    descricao: "Anticoagulante oral moderno que previne a formação de coágulos sanguíneos, bloqueando diretamente o Fator Xa — uma proteína essencial na cascata de coagulação. É usado para prevenir AVC em pacientes com fibrilação atrial não valvar, tratar e prevenir trombose venosa profunda (TVP) e embolia pulmonar, e como prevenção de coágulos após cirurgias ortopédicas. Diferente da warfarina, não exige exames de INR regulares e tem menos interações com alimentos.",
    receita: "Sim",
    receita_display: "🔴 Receita Simples",
    receita_cor: "vermelho",
    receita_descricao: "Exige receita médica simples (branca). Prescrição geralmente feita por cardiologista, neurologista ou hematologista.",
    receita_nota: "Receita válida por 30 dias. Disponível em farmácias comerciais — custo elevado, verificar cobertura de plano de saúde.",
    efeitos: "O principal efeito é o risco de sangramento, inerente a qualquer anticoagulante: hematomas fáceis, sangramento prolongado em cortes, sangramento menstrual aumentado. Podem ocorrer também náusea e reação alérgica rara.",
    aviso_grave: "RISCO DE SANGRAMENTO GRAVE: Sangramento interno pode ser silencioso. Sinais de alerta: fezes escuras ou com sangue, vômito com sangue ou aspecto de borra de café, urina com sangue vivo (rosa ou vermelha), tontura intensa e fraqueza repentina (sangramento interno). Procure emergência imediatamente. NÃO EXISTE ANTÍDOTO AMPLAMENTE DISPONÍVEL NO BRASIL (andexanet alfa é o antídoto, mas de acesso limitado). NÃO INTERROMPA SEM ORIENTAÇÃO MÉDICA — risco de AVC ou coágulo grave.",
    recomendacao: "Tome dois vezes ao dia, nos mesmos horários, com ou sem alimentos. Nunca esqueça uma dose — se esquecer, tome assim que lembrar no mesmo dia; se já for o dia seguinte, pule e retome normalmente. Informe todo profissional de saúde (dentistas, cirurgiões, enfermeiros) que usa apixabana antes de qualquer procedimento. Antes de cirurgia ou extração dentária, discutir com o médico sobre quando parar.",
    educacao: "A apixabana pertence à família dos NOACs (anticoagulantes orais diretos), mais modernos que a warfarina. Vantagens: não precisa de controle de INR, menos interações com alimentos, dose mais previsível. Desvantagem: custo mais alto e sem antídoto acessível no Brasil para emergências graves. Não tome AAS ou ibuprofeno sem orientação — amplificam muito o risco de sangramento.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Previne AVC em FA, trata trombose e embolia pulmonar" },
      { titulo: "Precisa de exame de INR?", texto: "Não — essa é uma vantagem sobre a warfarina" },
      { titulo: "Posso tomar com ibuprofeno?", texto: "Não — risco grave de sangramento gastrointestinal" },
      { titulo: "E se esquecer uma dose?", texto: "Tome no mesmo dia que lembrar; no dia seguinte, retome normalmente" }
    ],
    receita_obrigatoria: true,
    tipo_receita: "simples",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Qual a diferença entre apixabana e warfarina?", resposta: "Apixabana bloqueia diretamente o Fator Xa; warfarina bloqueia a produção de vários fatores dependentes de vitamina K. Apixabana tem efeito mais previsível, menos interações com alimentos e não exige controle de INR. A warfarina tem antídoto (vitamina K) mais acessível e custo menor." },
      { pergunta: "Posso comer vitamina K (brócolis, couve) com apixabana?", resposta: "Sim, sem restrições — essa é uma vantagem sobre a warfarina. Alimentos com vitamina K não afetam a ação da apixabana." },
      { pergunta: "Preciso parar antes de cirurgia ou extração de dente?", resposta: "Sim, geralmente sim. Para procedimentos de alto risco, suspender 48h antes; para baixo risco, pode ser 24h. Mas a decisão é do médico — nunca pare por conta própria." },
      { pergunta: "Apixabana engravida ou afeta anticoncepção?", resposta: "É contraindicada na gravidez. Mulheres em idade fértil devem usar anticoncepção eficaz durante o tratamento. Não interfere com o efeito dos anticoncepcionais, mas discutir com médico o método mais seguro." },
      { pergunta: "O que acontece se eu parar de tomar abruptamente?", resposta: "Alto risco de AVC ou novo episódio de trombose, especialmente em fibrilação atrial. A apixabana deve ser suspensa somente com orientação médica, e geralmente com plano de transição ou monitoramento." }
    ],
    descricao_seo: "Apixabana (Eliquis) é um anticoagulante oral NOAC para prevenção de AVC na fibrilação atrial e tratamento de trombose. Saiba diferenças da warfarina, riscos de sangramento e cuidados.",
    alerta_farmaceutico: "Interações críticas: rifampicina, carbamazepina, fenitoína (indutores CYP3A4/P-gp) reduzem 54% os níveis de apixabana — contraindicado. Cetoconazol, itraconazol, ritonavir (inibidores CYP3A4/P-gp) aumentam 2x — cautela extrema. AINEs e AAS amplificam risco de sangramento. Amiodarona eleva apixabana modamente — monitorar.",
    quando_procurar_medico: "Emergência: fezes pretas/com sangue, vômito com sangue, urina vermelha, dor de cabeça intensa súbita (sangramento cerebral), fraqueza súbita de um lado do corpo (AVC). Programada: qualquer procedimento cirúrgico ou dentário planejado, gravidez."
  },
  {
    nome: "Fenobarbital",
    generico: "Fenobarbital",
    tipo: "Anticonvulsivante / Sedativo — Barbitúrico",
    sinonimos: ["gardenal","phenobarbital","fenobarbital 100mg","fenobarbital 50mg","luminal"],
    descricao: "Um dos anticonvulsivantes mais antigos e ainda amplamente usados no SUS para controle de epilepsia. Age potencializando o efeito do GABA (principal neurotransmissor inibitório do cérebro), reduzindo a excitabilidade neuronal e prevenindo crises convulsivas. Também usado como sedativo e em síndrome de abstinência a álcool. Apesar de ser um medicamento antigo, continua sendo eficaz e acessível para epilepsia, especialmente em epilepsia focal e crises tônico-clônicas generalizadas.",
    receita: "Sim",
    receita_display: "🔵 Receita Azul — Controle Especial (Lista B1)",
    receita_cor: "azul",
    receita_descricao: "Exige receita de controle especial (azul, em duas vias). Uma via fica retida na farmácia. A receita é válida por 30 dias e pode ser aviada apenas uma vez.",
    receita_nota: "Sujeito a controle especial (Lista B1 — ANVISA). Somente farmácias habilitadas podem dispensar.",
    efeitos: "Sonolência, tontura, lentidão de raciocínio — comuns especialmente no início e em doses altas. Hiperatividade paradoxal em crianças. Com uso prolongado: déficit cognitivo leve, osteoporose (reduz vitamina D), déficit de folato. Dependência física — retirada abrupta pode desencadear convulsões graves.",
    aviso_grave: "NUNCA INTERROMPA ABRUPTAMENTE: A suspensão súbita do fenobarbital pode precipitar estado de mal epiléptico (convulsões contínuas) — emergência médica grave. A retirada deve ser SEMPRE gradual, em meses, com orientação do neurologista. DEPENDÊNCIA FÍSICA: o organismo se adapta ao fenobarbital — a retirada provoca síndrome de abstinência. INDUTOR ENZIMÁTICO POTENTE: reduz drasticamente o efeito de dezenas de outros medicamentos (anticoncepcionais, anticoagulantes, antibióticos, imunossupressores).",
    recomendacao: "Tome no mesmo horário todos os dias — preferencialmente à noite pela sonolência. Nunca interrompa sem orientação do neurologista. Evite álcool — potencializa muito a depressão do SNC e o risco de overdose. Informe todo médico, dentista e farmacêutico que usa fenobarbital — há muitas interações medicamentosas. Mulheres em idade fértil devem usar método anticoncepcional não hormonal (ou discutir com médico) — o fenobarbital reduz a eficácia da pílula.",
    educacao: "O fenobarbital é um indutor enzimático potente — acelera o metabolismo de muitos medicamentos, reduzindo sua eficácia. Isso inclui anticoncepcionais orais (risco de gravidez indesejada), warfarina (risco de trombose), ciclosporina, tacrolimo e muitos anticonvulsivantes modernos. Suplementação de vitamina D e folato pode ser necessária em uso prolongado.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Controla crises de epilepsia (convulsões)" },
      { titulo: "Posso parar de tomar?", texto: "Nunca abruptamente — a retirada é sempre gradual com o neurologista" },
      { titulo: "Pílula anticoncepcional funciona?", texto: "Não confiável — fenobarbital reduz muito a eficácia" },
      { titulo: "Receita especial?", texto: "Sim — receita azul (controle especial), retida na farmácia" }
    ],
    receita_obrigatoria: true,
    tipo_receita: "b1",
    retencao_receita: true,
    perguntas_frequentes: [
      { pergunta: "Fenobarbital deixa a pessoa 'lenta' para sempre?", resposta: "A sonolência e lentidão costumam ser maiores no início do tratamento e tendem a reduzir com a adaptação. Alguns pacientes sentem impacto cognitivo leve com uso prolongado, especialmente em doses altas. O neurologista avalia se os benefícios superam os efeitos." },
      { pergunta: "Meu filho usa fenobarbital. Ele pode estudar normalmente?", resposta: "Muitas crianças usam fenobarbital com desempenho escolar preservado, mas doses altas podem causar dificuldades de aprendizado e atenção. Discutir com o neurologista pediátrico a possibilidade de anticonvulsivantes mais modernos com menos impacto cognitivo." },
      { pergunta: "O fenobarbital pode ser substituído por outro medicamento?", resposta: "Sim. Anticonvulsivantes mais modernos (levetiracetam, lamotrigina, oxcarbazepina) têm menos efeitos cognitivos e menos interações. A troca deve ser feita gradualmente pelo neurologista." },
      { pergunta: "Posso beber álcool usando fenobarbital?", resposta: "Não. O álcool potencializa muito o efeito depressor do SNC — risco de sedação profunda, parada respiratória e overdose. Também piora as convulsões a longo prazo. Evitar completamente." },
      { pergunta: "Por que o fenobarbital afeta a pílula?", resposta: "Fenobarbital induz fortemente as enzimas hepáticas que metabolizam os hormônios da pílula — reduz os níveis de etinilestradiol e progesterona no sangue, podendo tornar a pílula ineficaz. Usar DIU de cobre, preservativo ou discutir com médico." }
    ],
    descricao_seo: "Fenobarbital (Gardenal) é anticonvulsivante usado no SUS para epilepsia. Saiba por que nunca interromper abruptamente, interações com anticoncepcionais e outras drogas.",
    alerta_farmaceutico: "Indutor enzimático CYP2C9, CYP2C19, CYP3A4 extremamente potente. Reduz eficácia de: anticoncepcionais hormonais, warfarina, ciclosporina, tacrolimo, tamoxifeno, letrozol, antirretrovirais, rifampicina, corticoides, antifúngicos azólicos, muitos outros. Risco de toxicidade por acúmulo se combinado com outros barbitúricos ou valproato (que inibe metabolismo do fenobarbital).",
    quando_procurar_medico: "Emergência: crise convulsiva que não cede em 5 minutos ou segunda crise em sequência (estado de mal epiléptico), sedação extrema ou dificuldade para respirar. Programada: qualquer novo medicamento prescrito (interações), planejamento de gravidez, exames de densidade óssea e vitamina D anuais."
  },
  {
    nome: "Clobazam",
    generico: "Clobazam",
    tipo: "Anticonvulsivante / Ansiolítico — Benzodiazepínico (1,5-benzodiazepínico)",
    sinonimos: ["urbanyl","onfi","frisium","clobazam 10mg","clobazam 20mg","clobazam 5mg"],
    descricao: "Benzodiazepínico anticonvulsivante amplamente usado no tratamento de epilepsias refratárias, especialmente a Síndrome de Lennox-Gastaut (uma forma grave de epilepsia infantil). Diferente dos benzodiazepínicos clássicos como diazepam e clonazepam (1,4-benzodiazepínicos), o clobazam tem uma estrutura química diferente (1,5) que confere ação anticonvulsivante mais prolongada com menor sedação relativa. Também usado como coadjuvante em outras epilepsias e, menos frequentemente, para ansiedade.",
    receita: "Sim",
    receita_display: "🔵 Receita Azul — Controle Especial (Lista B1)",
    receita_cor: "azul",
    receita_descricao: "Exige receita de controle especial (azul, em duas vias). A via retida fica na farmácia. Válida por 30 dias, aviada uma única vez.",
    receita_nota: "Sujeito a controle especial (Lista B1 — ANVISA). Dispensação apenas em farmácias habilitadas.",
    efeitos: "Sonolência, tontura, problemas de equilíbrio, lentidão de raciocínio — comuns especialmente no início. Irritabilidade e hiperatividade paradoxal em crianças. Com uso prolongado: tolerância (necessidade de doses maiores para o mesmo efeito) e dependência física.",
    aviso_grave: "NUNCA INTERROMPA ABRUPTAMENTE: A retirada abrupta do clobazam pode causar crises convulsivas graves, ansiedade intensa, tremores e convulsões de abstinência — emergência médica. A retirada deve ser sempre lenta e gradual (semanas a meses), sob orientação do neurologista. DEPENDÊNCIA: o uso prolongado gera dependência física — o organismo precisa do medicamento para funcionar normalmente. TOLERÂNCIA: com o tempo, o efeito anticonvulsivante pode diminuir (tolerância), exigindo ajuste de dose.",
    recomendacao: "Tome nos horários exatos prescritos pelo neurologista. Nunca altere a dose ou interrompa sem orientação médica. Evite álcool e outros depressores do SNC. Se sentir sonolência excessiva, informe o médico antes de qualquer ajuste. Para crianças: medir com seringa oral para garantir a dose exata.",
    educacao: "O clobazam tem meia-vida longa (36 a 46 horas) e um metabólito ativo (N-desmetilclobazam) com meia-vida ainda mais longa — o que explica o efeito anticonvulsivante prolongado. Em Lennox-Gastaut, é um dos medicamentos aprovados com maior evidência de redução de crises. O médico pode preferir que seja tomado em dose única à noite ou dividido em duas doses.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Controla crises epilépticas, especialmente em epilepsias refratárias" },
      { titulo: "Posso parar de tomar?", texto: "Nunca abruptamente — sempre redução gradual com neurologista" },
      { titulo: "É para Lennox-Gastaut?", texto: "Sim — é um dos medicamentos aprovados para essa síndrome grave" },
      { titulo: "Diferença do clonazepam?", texto: "Estrutura química diferente — geralmente menos sedativo que o clonazepam" }
    ],
    receita_obrigatoria: true,
    tipo_receita: "b1",
    retencao_receita: true,
    perguntas_frequentes: [
      { pergunta: "Clobazam é o mesmo que clonazepam?", resposta: "Não. Ambos são benzodiazepínicos anticonvulsivantes, mas com estruturas diferentes. Clobazam (1,5-BZD) tem perfil de sedação diferente do clonazepam (1,4-BZD). Não são substituíveis entre si sem orientação do neurologista." },
      { pergunta: "Meu filho tem Lennox-Gastaut. Por que o clobazam foi indicado?", resposta: "O clobazam é um dos poucos medicamentos com aprovação específica para a Síndrome de Lennox-Gastaut em estudos clínicos controlados. Ele pode reduzir significativamente crises drop (quedas) e outras crises características da síndrome." },
      { pergunta: "O clobazam pode ser tomado com outros anticonvulsivantes?", resposta: "Sim — geralmente é usado como coadjuvante (junto com valproato, lamotrigina ou outros). Mas carbamazepina aumenta o metabólito ativo do clobazam (N-desmetilclobazam), podendo intensificar efeitos. O neurologista monitora isso." },
      { pergunta: "Como é feita a retirada do clobazam?", resposta: "De forma muito gradual — geralmente redução de 5 a 10mg a cada 1 a 2 semanas, conforme tolerância. Pode levar meses. A velocidade depende do tempo de uso, da dose e da resposta do paciente." },
      { pergunta: "Posso guardar em temperatura ambiente?", resposta: "Sim, guardar em temperatura ambiente (abaixo de 30°C), protegido da luz e umidade. Manter fora do alcance de crianças. Não descarte em lixo comum — levar à farmácia para descarte correto." }
    ],
    descricao_seo: "Clobazam (Urbanyl) é anticonvulsivante benzodiazepínico para epilepsia refratária e Síndrome de Lennox-Gastaut. Saiba como usar, por que não parar abruptamente e diferenças do clonazepam.",
    alerta_farmaceutico: "Carbamazepina e oxcarbazepina induzem metabolismo do clobazam, reduzindo sua concentração mas aumentando o metabólito ativo N-desmetilclobazam (sedação). Fluconazol, fluvoxamina e omeprazol inibem CYP2C19 e elevam o N-desmetilclobazam — maior sedação. Álcool e outros depressores do SNC potencializam sedação.",
    quando_procurar_medico: "Emergência: crises convulsivas sem controle, agitação extrema ou confusão após redução de dose (abstinência), sedação muito profunda com dificuldade para respirar. Programada: perda gradual de eficácia (tolerância), comportamento incomum em crianças, planejamento de gravidez."
  },

  // ===== BATCH 4 — SAÚDE MENTAL =====
  {
    nome: "Melatonina",
    generico: "Melatonina",
    tipo: "Regulador do Ritmo Circadiano — Hormônio da Glândula Pineal",
    sinonimos: ["melatonina 0.5mg","melatonina 1mg","melatonina 2mg","melatonina 3mg","melatonina 5mg","melatonina 10mg","melatocaps","melatonina prolonged release"],
    descricao: "Hormônio produzido naturalmente pela glândula pineal durante a noite, responsável por sinalizar ao corpo que é hora de dormir. Como suplemento, é usada para ajudar a regular o ritmo circadiano (relógio biológico) em situações como insônia de início de sono, jet lag (mudança de fuso horário), trabalho em turnos noturnos e distúrbios do sono em crianças com autismo ou TDAH. A ANVISA regulamentou a melatonina no Brasil como suplemento alimentar — venda sem receita em doses de até 0,21 mg (doses maiores podem exigir prescrição).",
    receita: "Não",
    receita_display: "🟢 Venda Livre — Sem Receita",
    receita_cor: "verde",
    receita_descricao: "Disponível sem receita nas doses padronizadas como suplemento pela ANVISA. Doses médicas maiores podem ser manipuladas com prescrição.",
    receita_nota: "Verificar o registro na embalagem — produtos não registrados na ANVISA podem não ter segurança garantida.",
    efeitos: "Geralmente bem tolerada. Pode causar sonolência residual (principalmente com doses altas), tontura leve, dor de cabeça e vivacidade nos sonhos. Em crianças pequenas: irritabilidade no dia seguinte. Doses muito altas (acima de 5mg) sem necessidade podem causar mais efeitos adversos sem benefício adicional.",
    aviso_grave: "MENOS É MAIS: A dose eficaz de melatonina é muito menor do que a maioria imagina. Doses de 0,5 a 1mg são frequentemente suficientes — doses de 10mg podem causar mais sonolência e efeitos adversos sem vantagem. Não é um sedativo — não 'derruba' como um remédio para dormir. Age sinalizando ao cérebro que é hora de descansar, não induzindo sono forçado.",
    recomendacao: "Tome 30 a 60 minutos antes de dormir no horário que deseja que seu sono comece. Diminua a exposição à luz azul (celular, TV) na hora de dormir — ela inibe a produção natural de melatonina. Para jet lag: tome no horário de dormir do destino, iniciando 1 a 2 dias antes da viagem. Para trabalho em turnos: discutir com médico a melhor estratégia.",
    educacao: "A melatonina não é um hipnótico (não induz sono diretamente) — ela sintoniza o relógio biológico. Por isso funciona melhor para problemas de ritmo circadiano do que para insônia de manutenção (ficar acordado no meio da noite). Luz artificial à noite é o principal inimigo da melatonina natural — reduzir telas antes de dormir ajuda tanto quanto o suplemento.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Regula o horário do sono — especialmente para jet lag e dificuldade de iniciar o sono" },
      { titulo: "Qual dose usar?", texto: "0,5 a 3mg é suficiente — doses altas raramente ajudam mais" },
      { titulo: "Quando tomar?", texto: "30 a 60 minutos antes do horário desejado para dormir" },
      { titulo: "Cria dependência?", texto: "Não — é um hormônio natural, sem dependência química" }
    ],
    receita_obrigatoria: false,
    tipo_receita: "sem_receita",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Melatonina vicia?", resposta: "Não. Por ser um hormônio natural produzido pelo próprio organismo, a melatonina não cria dependência química. Mas é importante não usá-la indefinidamente sem investigar a causa da insônia." },
      { pergunta: "Posso dar melatonina para meu filho?", resposta: "Em crianças com TDAH, autismo ou distúrbios de ritmo circadiano, a melatonina pode ser indicada pelo médico. Em crianças saudáveis sem diagnóstico, prefira orientar a higiene do sono antes de iniciar suplemento. Sempre consultar o pediatra antes." },
      { pergunta: "A melatonina interage com medicamentos?", resposta: "Sim. Fluvoxamina e cimetidina inibem seu metabolismo — melatonina pode acumular e causar sedação excessiva. Benzodiazepínicos e zolpidem amplificam a sedação. Anticoagulantes: melatonina pode potencializar levemente. Informar médico sobre todos os medicamentos em uso." },
      { pergunta: "Posso tomar melatonina todos os dias?", resposta: "Para insônia circadiana ou jet lag, sim — é segura a curto e médio prazo (até 3 meses estudados). Para uso prolongado além de 6 meses, discutir com médico e investigar causa da insônia." },
      { pergunta: "Devo tomar na mesma dose para sempre?", resposta: "Não. A dose mínima eficaz é a ideal. Se 0,5mg funcionar, não aumente para 5mg. Tente usar a menor dose possível por um período determinado e reavaliar com o médico." }
    ],
    descricao_seo: "Melatonina é o hormônio do sono vendido sem receita para insônia, jet lag e distúrbios do ritmo circadiano. Saiba a dose certa, horário de tomar e interações medicamentosas.",
    alerta_farmaceutico: "Fluvoxamina é o inibidor mais potente do metabolismo da melatonina (CYP1A2) — cautela extrema. Cimetidina e anticontraceptivos orais também elevam melatonina. Sedação aditiva com benzodiazepínicos, zolpidem e álcool. Em pacientes com epilepsia — melatonina pode alterar o limiar convulsivante em altas doses.",
    quando_procurar_medico: "Insônia persistente há mais de 4 semanas (investigar causa), crianças com problemas de sono para diagnóstico adequado, uso de outros medicamentos que possam interagir, doenças autoimunes (melatonina pode estimular o sistema imune)."
  },
  {
    nome: "Buspirona",
    generico: "Buspirona",
    tipo: "Ansiolítico Não Benzodiazepínico — Agonista Parcial 5-HT1A",
    sinonimos: ["buspanil","buspar","buspirona 10mg","buspirona 5mg","calmday"],
    descricao: "Ansiolítico para tratamento do transtorno de ansiedade generalizada (TAG) que funciona de forma completamente diferente dos benzodiazepínicos (diazepam, clonazepam, alprazolam). Age como agonista parcial dos receptores de serotonina 5-HT1A no cérebro, modulando gradualmente a ansiedade sem causar sedação, dependência ou comprometimento cognitivo. É uma alternativa segura e não viciante para ansiedade crônica, especialmente em idosos ou pacientes que precisam manter alerta para trabalho ou condução de veículos.",
    receita: "Sim",
    receita_display: "🔴 Receita Simples",
    receita_cor: "vermelho",
    receita_descricao: "Exige receita médica simples (branca). Não é controlado pela ANVISA — não precisa de receita azul como os benzodiazepínicos.",
    receita_nota: "Receita válida por 30 dias. Disponível em farmácias comerciais.",
    efeitos: "Tontura leve, dor de cabeça e náusea nas primeiras semanas são os mais comuns — geralmente passam. Menos sonolência que benzodiazepínicos. Raramente: nervosismo inicial (piora da ansiedade nas primeiras 1 a 2 semanas antes de melhorar).",
    aviso_grave: "NÃO TEM EFEITO IMEDIATO: Ao contrário dos benzodiazepínicos, a buspirona precisa de 2 a 4 semanas de uso contínuo para fazer efeito — não serve para crises agudas de ansiedade ou ataques de pânico. Pacientes acostumados com benzodiazepínicos podem achar que 'não está funcionando' nas primeiras semanas. NÃO SUBSTITUI BENZODIAZEPÍNICO EM ABSTINÊNCIA: nunca use buspirona para substituir abruptamente um benzodiazepínico — risco de abstinência grave.",
    recomendacao: "Tome 2 a 3 vezes ao dia nos mesmos horários, com ou sem alimentos. Seja paciente — o efeito começa a aparecer após 1 a 2 semanas e é pleno em 4 semanas. Não abandone nas primeiras semanas achando que não funciona. Não tomar com suco de toranja (grapefruit) — eleva muito os níveis no sangue.",
    educacao: "A buspirona é um avanço para pacientes com ansiedade crônica que precisam de tratamento de longa duração sem risco de dependência. Não causa tolerância (não precisa de doses cada vez maiores para o mesmo efeito) e não prejudica a memória ou o raciocínio. Pode ser combinada com ISRSs para ansiedade resistente. Não é indicada para situações pontuais de estresse — é para ansiedade crônica.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Transtorno de ansiedade generalizada — uso contínuo, não para crises" },
      { titulo: "Quando faz efeito?", texto: "Após 2 a 4 semanas de uso regular" },
      { titulo: "Vicia?", texto: "Não — sem dependência física ou tolerância" },
      { titulo: "Pode dirigir?", texto: "Geralmente sim — menos sedação que benzodiazepínicos" }
    ],
    receita_obrigatoria: true,
    tipo_receita: "simples",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Buspirona é mais fraca que o clonazepam?", resposta: "São medicamentos diferentes para propósitos diferentes. Buspirona para ansiedade crônica diária — é mais segura a longo prazo. Clonazepam para crises agudas — efeito imediato mas com risco de dependência. 'Mais fraca' não é a comparação certa: são indicadas para situações distintas." },
      { pergunta: "Senti minha ansiedade piorar nas primeiras semanas. O que faço?", resposta: "É possível e relatado — alguns pacientes sentem leve piora ou nervosismo inicial antes de melhorar. Informe o médico, mas não abandone o tratamento sem orientação. Geralmente passa em 1 a 2 semanas." },
      { pergunta: "Posso tomar buspirona e antidepressivo juntos?", resposta: "Sim, muitas vezes são combinados — especialmente buspirona com ISRSs (sertralina, escitalopram) para ansiedade resistente. Mas com IMAOs (tranilcipromina, selegilina) há risco de síndrome serotoninérgica — contraindicado." },
      { pergunta: "Posso parar de tomar de uma hora para outra?", resposta: "Sim, a buspirona não causa dependência física — pode ser suspensa sem síndrome de abstinência. Mas o ideal é sempre conversar com o médico antes de interromper." },
      { pergunta: "Buspirona serve para pânico ou fobia?", resposta: "Para transtorno do pânico e fobias específicas, a buspirona tem eficácia limitada. ISRSs são geralmente mais eficazes. Para TAG (ansiedade generalizada crônica), buspirona é uma boa opção." }
    ],
    descricao_seo: "Buspirona (Buspanil) é ansiolítico para transtorno de ansiedade generalizada sem dependência. Saiba que o efeito demora 2 a 4 semanas e como diferencia dos benzodiazepínicos.",
    alerta_farmaceutico: "IMAOs são contraindicados (síndrome serotoninérgica). Fluoxetina e outros ISRSs podem ser combinados, mas fluvoxamina inibe fortemente CYP1A2 — pode elevar buspirona. Toranja (grapefruit) inibe CYP3A4 — eleva buspirona significativamente. Rifampicina reduz muito seus níveis. Haloperidol: buspirona pode elevar seus níveis.",
    quando_procurar_medico: "Ausência de melhora após 6 semanas de uso regular (reavaliar diagnóstico e dose), aparecimento de sintomas de síndrome serotoninérgica ao combinar com outros medicamentos (febre, agitação, tremores), pensamentos de autoagressão."
  },
  {
    nome: "Nortriptilina",
    generico: "Nortriptilina",
    tipo: "Antidepressivo Tricíclico — Inibidor da Recaptação de Noradrenalina e Serotonina",
    sinonimos: ["pamelor","nortriptilina 10mg","nortriptilina 25mg","nortriptilina 50mg","nortrilen"],
    descricao: "Antidepressivo tricíclico de segunda geração, metabólito ativo da amitriptilina. Amplamente usado no Brasil para depressão, mas sua maior utilidade atual é no tratamento de dores crônicas: dor neuropática (queimação, choque, formigamento), enxaqueca profilática, fibromialgia e dor na síndrome do intestino irritável. Tem menos efeitos anticolinérgicos (boca seca, prisão de ventre) e menor sedação do que a amitriptilina — por isso é preferida em muitos contextos, especialmente em idosos.",
    receita: "Sim",
    receita_display: "🔴 Receita Simples",
    receita_cor: "vermelho",
    receita_descricao: "Exige receita médica simples (branca). Geralmente prescrita por neurologistas, psiquiatras ou clínicos gerais.",
    receita_nota: "Receita válida por 30 dias. Disponível em farmácias comerciais.",
    efeitos: "Boca seca, sonolência (especialmente nas primeiras semanas), constipação intestinal, retenção urinária leve, visão embaçada, tontura ao levantar rápido (hipotensão ortostática), ganho de peso. Esses efeitos tendem a reduzir com a adaptação. Podem ocorrer também alterações do ritmo cardíaco — exige cuidado em pacientes cardíacos.",
    aviso_grave: "RISCO CARDÍACO: Nortriptilina prolonga o intervalo QT do eletrocardiograma — cuidado em pacientes com cardiopatias, arritmias ou que usam outros medicamentos que afetam o ritmo cardíaco. ECG antes de iniciar é recomendado em cardíacos. OVERDOSE É MUITO PERIGOSA: Quantidades pequenas acima do terapêutico podem causar arritmias fatais — guardar longe de crianças e de pessoas com risco de suicídio. EFEITO LENTO: o efeito antidepressivo demora 2 a 4 semanas para aparecer.",
    recomendacao: "Tome preferencialmente à noite pela sonolência. Inicie em dose baixa (10 a 25mg) e aumente gradualmente conforme orientação médica. Não dirija ou opere máquinas nas primeiras semanas. Levante devagar da cama (deite → sente → levante em etapas) para evitar tontura. Não interrompa abruptamente — reduza gradualmente.",
    educacao: "Para dor neuropática, a dose eficaz (25 a 75mg) é geralmente menor do que a dose antidepressiva (75 a 150mg). O paciente não precisa de diagnóstico de depressão para usar nortriptilina para dor crônica — é um uso estabelecido e baseado em evidências. O efeito na dor também demora algumas semanas para se consolidar.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Depressão, dor crônica, dor neuropática e prevenção de enxaqueca" },
      { titulo: "Quando tomar?", texto: "À noite — pela sonolência que causa" },
      { titulo: "Quando faz efeito?", texto: "2 a 4 semanas para depressão; para dor, pode levar até 6 semanas" },
      { titulo: "Causa dependência?", texto: "Não — mas deve ser retirado gradualmente para evitar mal-estar" }
    ],
    receita_obrigatoria: true,
    tipo_receita: "simples",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Nortriptilina é melhor que amitriptilina?", resposta: "Para dor crônica e em idosos, a nortriptilina costuma ser preferida — causa menos sedação, menos boca seca e menos alteração de pressão ao levantar. O médico escolhe baseado no perfil individual do paciente." },
      { pergunta: "Posso tomar com ISRSs (fluoxetina, sertralina)?", resposta: "Com muita cautela. Fluoxetina e paroxetina inibem fortemente CYP2D6 — elevam muito os níveis de nortriptilina, aumentando risco cardíaco. Se necessário, o médico monitora o nível sérico e faz ECG. Sertralina e escitalopram são mais seguros para a combinação." },
      { pergunta: "Para dor nas pernas (neuropatia diabética), qual dose?", resposta: "Geralmente inicia-se com 10 a 25mg à noite e aumenta gradualmente até 50 a 75mg conforme resposta e tolerância. A dose para dor é menor do que para depressão. O médico ajusta conforme a resposta." },
      { pergunta: "Posso tomar com álcool?", resposta: "Não. O álcool amplifica a sedação e a tontura da nortriptilina, e pode provocar quedas — especialmente em idosos. Também pode potencializar efeitos cardiovasculares." },
      { pergunta: "É segura para idosos?", resposta: "Com cautela. Dos tricíclicos, é considerada mais segura para idosos do que amitriptilina, mas ainda tem risco de queda (hipotensão ortostática), constipação e retenção urinária. Dose baixa, ECG antes de iniciar e monitoramento regular são essenciais." }
    ],
    descricao_seo: "Nortriptilina (Pamelor) é antidepressivo tricíclico usado para depressão, dor neuropática e prevenção de enxaqueca. Saiba como usar, efeitos cardíacos e diferenças da amitriptilina.",
    alerta_farmaceutico: "Janela terapêutica estreita: monitorar nível sérico. Fluoxetina e paroxetina (CYP2D6 inibidores potentes) elevam nortriptilina 3 a 5x — evitar combinação. QT prolongado com antipsicóticos, amiodarona, quinolonas. IMAOs contraindicados — intervalo mínimo de 14 dias. Risco de síndrome serotoninérgica com tramadol, linezolida.",
    quando_procurar_medico: "Palpitações ou batimentos cardíacos irregulares (arritmia), retenção urinária, glaucoma de ângulo fechado (nortriptilina é contraindicada), confusão mental em idosos, pensamentos suicidas (atenção — tricíclicos são perigosos em overdose)."
  },

  // ===== BATCH 5 — OTC POPULARES =====
  {
    nome: "Fexofenadina",
    generico: "Fexofenadina",
    tipo: "Anti-histamínico de 2ª Geração — Não Sedante",
    sinonimos: ["allegra","allegra d","fexofenadina 60mg","fexofenadina 120mg","fexofenadina 180mg","fexofenadin"],
    descricao: "Anti-histamínico de segunda geração para alergias — rinite alérgica sazonal e perene, urticária e coceira. Bloqueia os receptores H1 de histamina sem cruzar a barreira hematoencefálica, por isso não causa sonolência na grande maioria das pessoas. É uma das opções preferidas para adultos que precisam de antihistamínico durante o trabalho, estudo ou condução de veículos. Metabolizado da terfenadina (retirada do mercado por problemas cardíacos), a fexofenadina manteve a eficácia sem o risco cardíaco.",
    receita: "Não",
    receita_display: "🟢 Venda Livre — Sem Receita",
    receita_cor: "verde",
    receita_descricao: "Disponível sem receita médica em farmácias.",
    receita_nota: "Verificar apresentação e dose na embalagem. Allegra-D (com pseudoefedrina) pode ter restrições de venda em algumas farmácias.",
    efeitos: "Geralmente muito bem tolerada. Pode causar leve dor de cabeça, náusea ou tontura em algumas pessoas. Raramente: sonolência leve em doses altas. A versão com pseudoefedrina (Allegra-D) pode causar agitação, insônia e aumento da pressão arterial.",
    aviso_grave: "CUIDADO COM SUCO DE TORANJA, LARANJA E MAÇÃ: Esses sucos reduzem a absorção da fexofenadina em até 36%. Tome sempre com água pura — não com sucos de fruta. A formulação Allegra-D (com pseudoefedrina) não deve ser usada em pacientes com hipertensão, doenças cardíacas, glaucoma ou hipertireoidismo.",
    recomendacao: "Tome sempre com água — nunca com suco de fruta. A versão de 120mg é tomada duas vezes ao dia; a de 180mg uma vez ao dia. Para rinite alérgica, o efeito é melhor quando tomada regularmente durante toda a estação do que sob demanda. Antiácidos com magnésio e alumínio reduzem a absorção — separar por 2h.",
    educacao: "A fexofenadina não cruza a barreira hematoencefálica — por isso não causa sonolência. Isso a torna ideal para quem trabalha com maquinaria, dirige ou estuda. No entanto, álcool pode aumentar levemente a sedação mesmo com anti-histamínicos não sedantes. Ela não trata a causa da alergia — apenas bloqueia a histamina liberada.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Rinite alérgica, urticária e coceiras — sem sonolência" },
      { titulo: "Pode dirigir?", texto: "Sim — não causa sonolência na maioria das pessoas" },
      { titulo: "Pode tomar com suco?", texto: "Não — use sempre com água pura (suco reduz absorção em 36%)" },
      { titulo: "Qual a diferença do Allegra-D?", texto: "Allegra-D tem pseudoefedrina para desobstrução nasal — não usar com hipertensão" }
    ],
    receita_obrigatoria: false,
    tipo_receita: "sem_receita",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Posso tomar fexofenadina durante a gravidez?", resposta: "Com cautela e somente sob orientação médica. Não há estudos controlados em humanas gestantes suficientes. Em caso de necessidade, o médico avalia o risco. Loratadina tem mais dados de segurança na gravidez." },
      { pergunta: "Fexofenadina é melhor que loratadina ou cetirizina?", resposta: "Todos são anti-histamínicos de 2ª geração eficazes. Fexofenadina tem menor risco de sonolência que cetirizina. Loratadina tem perfil similar. A escolha depende do perfil individual e resposta de cada paciente." },
      { pergunta: "Posso tomar com antibióticos (eritromicina, claritromicina)?", resposta: "Atenção. Eritromicina e cetoconazol elevam os níveis de fexofenadina significativamente — aumentam a exposição em até 2 a 3 vezes. Embora não cause arritmias como a terfenadina original, o risco de efeitos adversos aumenta. Informar o médico." },
      { pergunta: "Serve para reação alérgica grave (anafilaxia)?", resposta: "Não. Para reação alérgica grave com dificuldade para respirar, inchaço de garganta e queda de pressão, o tratamento é adrenalina (epinefrina), não anti-histamínico. Vá imediatamente à emergência." },
      { pergunta: "Posso tomar com hidroxizina ou prometazina?", resposta: "Evitar. Combinar dois anti-histamínicos não aumenta a eficácia e soma os efeitos adversos — especialmente a sedação da prometazina/hidroxizina." }
    ],
    descricao_seo: "Fexofenadina (Allegra) é anti-histamínico não sedante para rinite alérgica e urticária. Saiba por que não tomar com suco de fruta e diferenças da versão Allegra-D.",
    alerta_farmaceutico: "Eritromicina e cetoconazol inibem P-gp e CYP3A4 — elevam fexofenadina 2-3x, aumentando risco de QT (embora menor que terfenadina). Sucos de toranja, laranja e maçã inibem OATP (transportador intestinal) — reduzem absorção em 36 a 75%. Antiácidos com Mg/Al: reduzem absorção se tomados juntos. Rifampicina reduz significativamente os níveis de fexofenadina.",
    quando_procurar_medico: "Reação alérgica grave com dificuldade para respirar ou inchaço de garganta (emergência — adrenalina), urticária que não melhora em 6 semanas (urticária crônica espontânea — investigar), uso em gravidez ou amamentação."
  },
  {
    nome: "Dexclorfeniramina",
    generico: "Dexclorfeniramina",
    tipo: "Anti-histamínico de 1ª Geração — Sedante (Alquilamina)",
    sinonimos: ["polaramine","dexclorfeniramina 2mg","alergimed","cloridrato de dexclorfeniramina","dexclorofeniramina"],
    descricao: "Anti-histamínico de primeira geração para alergias — rinite, urticária, prurido (coceira), picadas de inseto e reações alérgicas. Ao contrário dos anti-histamínicos modernos (loratadina, fexofenadina), a dexclorfeniramina cruza a barreira hematoencefálica e causa sonolência — efeito que muitas pessoas usam deliberadamente para dormir melhor em situações de alergia com prurido noturno. Muito popular no Brasil e disponível sem receita na maioria das apresentações.",
    receita: "Não",
    receita_display: "🟢 Venda Livre — Sem Receita",
    receita_cor: "verde",
    receita_descricao: "Disponível sem receita médica. Algumas apresentações combinadas (com descongestionantes) podem ter restrições.",
    receita_nota: "Medicamento OTC. Verificar a dose na embalagem — adultos e crianças têm doses diferentes.",
    efeitos: "Sonolência (muito comum — efeito esperado), boca seca, visão embaçada, dificuldade para urinar, prisão de ventre. Em idosos: confusão mental e queda de pressão ao levantar. Em crianças pequenas: hiperatividade paradoxal (ao contrário de sonolência).",
    aviso_grave: "NÃO DIRIGIR NEM OPERAR MÁQUINAS: A dexclorfeniramina causa sonolência significativa — não dirija, não use máquinas e não tome decisões de alta responsabilidade após o uso. O efeito persiste por 4 a 6 horas mas pode durar mais. ÁLCOOL AMPLIFICA A SEDAÇÃO: Combinação muito perigosa — pode causar sedação profunda e acidentes. CUIDADO EM IDOSOS: maior risco de confusão mental, retenção urinária e quedas.",
    recomendacao: "Tome com alimento para reduzir o desconforto gástrico. Prefira tomar à noite se precisar dormir — é quando a sonolência é bem-vinda. Se precisar de anti-histamínico durante o dia sem sonolência, preferir loratadina, desloratadina ou fexofenadina. Não usar com álcool.",
    educacao: "A dexclorfeniramina é o isômero ativo da clorfeniramina — a metade que faz efeito. Por isso é mais potente em dose menor. Para alergia com prurido intenso noturno, pode ser muito útil pela sedação que proporciona. Para uso diurno, os anti-histamínicos de 2ª geração são mais adequados.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Alergia, urticária, coceira e rinite — causa sonolência" },
      { titulo: "Pode dirigir?", texto: "Não — causa sonolência significativa" },
      { titulo: "Quando tomar?", texto: "Preferencialmente à noite ou quando não precisar de atenção plena" },
      { titulo: "Vs. loratadina?", texto: "Dexclorfeniramina dorme mais. Loratadina não seda — para uso diurno" }
    ],
    receita_obrigatoria: false,
    tipo_receita: "sem_receita",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Posso dar para crianças?", resposta: "Com cautela e somente conforme dose do pediatra. Em crianças menores de 2 anos é contraindicada sem prescrição médica. Algumas crianças têm reação paradoxal — ficam hiperativas em vez de sonolentas." },
      { pergunta: "Dexclorfeniramina é igual ao Polaramine?", resposta: "Sim. Polaramine é a marca mais conhecida de dexclorfeniramina no Brasil. O princípio ativo é o mesmo." },
      { pergunta: "Posso tomar todos os dias por longo tempo?", resposta: "Não é recomendado para uso crônico diário sem orientação médica. Pode causar tolerância (necessidade de doses maiores) e tem efeitos anticolinérgicos cumulativos. Para alergia crônica, anti-histamínicos de 2ª geração são mais adequados." },
      { pergunta: "Serve para enjoo de viagem?", resposta: "Não é a melhor opção. Dimenidrinato (Dramin) é mais indicado para náusea e enjoo de viagem. Dexclorfeniramina é mais para alergia e prurido." },
      { pergunta: "Posso usar na gravidez?", resposta: "Com orientação médica. É uma das opções consideradas quando o benefício supera o risco. Loratadina tem perfil de segurança melhor estudado na gestação. Sempre informar o médico." }
    ],
    descricao_seo: "Dexclorfeniramina (Polaramine) é anti-histamínico sedante para alergia, urticária e prurido. Saiba por que não dirigir após o uso e diferenças dos anti-histamínicos modernos.",
    alerta_farmaceutico: "Efeitos anticolinérgicos somados com tricíclicos, antipsicóticos, escopolamina — risco de retenção urinária, glaucoma, confusão. Depressores do SNC (álcool, opioides, benzodiazepínicos) somam sedação — risco elevado. Contraindicada em glaucoma de ângulo fechado, hipertrofia de próstata e asma grave. IMAOs prolongam e intensificam o efeito anticolinérgico.",
    quando_procurar_medico: "Reação alérgica grave com dificuldade para respirar (emergência), sintomas de retenção urinária, visão muito embaçada, confusão mental em idosos, uso em crianças menores de 2 anos ou na gravidez."
  },
  {
    nome: "Nistatina",
    generico: "Nistatina",
    tipo: "Antifúngico Poliênico — Uso Tópico e Oral (não absorvido sistemicamente)",
    sinonimos: ["micostatin","nistatina suspensão","nistatina creme","nistatina 100.000ui","nystatin"],
    descricao: "Antifúngico específico para candidíase (infecção por Candida) em mucosas e pele. Disponível como suspensão oral (para candidíase na boca e garganta — aftas), creme vaginal (para candidíase vaginal) e creme dermatológico (para candida na pele, fraldas, dobras). Uma característica importante: a nistatina praticamente não é absorvida pelo intestino — age localmente onde é aplicada e é eliminada nas fezes. Isso a torna muito segura, sem efeitos sistêmicos.",
    receita: "Não",
    receita_display: "🟢 Venda Livre — Sem Receita",
    receita_cor: "verde",
    receita_descricao: "Disponível sem receita médica para uso tópico e suspensão oral. Uso interno de nistatina comprimidos pode requerer prescrição.",
    receita_nota: "Medicamento OTC para as formas tópicas. Verificar apresentação na farmácia.",
    efeitos: "Suspensão oral: sabor amargo — normal. Raramente: náusea, vômito, diarreia em doses muito altas. Uso vaginal e tópico: irritação local, sensação de queimação leve no início. A nistatina não tem efeitos sistêmicos pois não é absorvida.",
    aviso_grave: "NÃO TRATA CANDIDÍASE SISTÊMICA: Para infecções por Candida na corrente sanguínea, fígado, pulmões ou outros órgãos (candida invasiva), a nistatina oral é ineficaz — tratamento sistêmico com fluconazol ou anfotericina IV é necessário. CANDIDÍASE RECORRENTE: Se a infecção voltar frequentemente, investigar causas subjacentes (diabetes não controlada, imunodepressão, uso crônico de antibióticos ou corticoides).",
    recomendacao: "Suspensão oral: faça bochecho e engula ou mantenha na boca por 2 a 3 minutos antes de engolir — para melhor contato com as lesões. Não coma nem beba por 30 minutos após. Continue o tratamento por todos os dias prescritos mesmo que as lesões melhorem antes. Creme vaginal: aplicar com o aplicador incluído, à noite ao deitar.",
    educacao: "A nistatina funciona perfurando a membrana da Candida (ao contrário do fluconazol que bloqueia uma enzima de síntese). Por isso não tem problemas de resistência cruzada com azólicos como fluconazol. Quando a candidíase não responde ao fluconazol, a nistatina ainda pode funcionar. Em bebês com candidíase oral (sapinho), é muito segura e eficaz.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Candidíase oral (sapinho), vaginal e de pele" },
      { titulo: "É absorvida pelo corpo?", texto: "Não — age só localmente, sem efeitos no sangue" },
      { titulo: "Suspensão oral: como usar?", texto: "Faça bochecho por 2 a 3 minutos e engula, 4x ao dia" },
      { titulo: "Tratamento genital: pode usar na gravidez?", texto: "Sim — é uma das opções mais seguras na gestação" }
    ],
    receita_obrigatoria: false,
    tipo_receita: "sem_receita",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Nistatina é melhor que fluconazol para candidíase vaginal?", resposta: "Para candidíase vaginal simples, fluconazol oral em dose única é mais prático. A nistatina vaginal precisa de 14 dias de aplicação diária. Contudo, nistatina é segura na gravidez enquanto fluconazol é contraindicado no 1º trimestre." },
      { pergunta: "Posso usar nistatina nos primeiros meses de gravidez?", resposta: "Sim — a nistatina tópica e vaginal é considerada segura na gestação, pois não é absorvida. É uma das opções preferidas para candidíase vaginal em grávidas. Confirmar com obstetra." },
      { pergunta: "Bebê com sapinho: como usar a suspensão?", resposta: "Aplique com swab (cotonete), conta-gotas ou seringa oral nas lesões brancas na boca do bebê, após as mamadas. A dose é prescrita pelo pediatra conforme o peso. Não use mamadeiras ou bicos por 30 minutos após." },
      { pergunta: "Posso usar o creme de nistatina dentro da vagina?", resposta: "Sim — há apresentações vaginais específicas (creme vaginal + aplicador). Aplique à noite ao deitar. Não use a forma dermatológica comum (para pele) no interior da vagina — concentração e formulação são diferentes." },
      { pergunta: "Candidíase voltou logo após o tratamento. O que pode ser?", resposta: "Investigar: diabetes não controlada (glicose alta facilita Candida), uso de antibióticos ou corticoides, parceiro sexual não tratado (candidíase vaginal de repetição), HIV ou imunossupressão. Uma ou duas recaídas ao ano pode ser normal — mais que isso, investigar causa." }
    ],
    descricao_seo: "Nistatina (Micostatin) é antifúngico para candidíase oral (sapinho), vaginal e de pele. Saiba como usar a suspensão oral, segurança na gravidez e diferença do fluconazol.",
    alerta_farmaceutico: "Nistatina praticamente não tem interações medicamentosas sistêmicas pois não é absorvida. Interações locais: não usar junto com ácido bórico vaginal (inativa a nistatina). Amphotericin B e nistatina têm mecanismo similar — não há razão para combinar. Em candidíase resistente ao fluconazol, a nistatina mantém atividade.",
    quando_procurar_medico: "Candidíase oral em adulto sem uso de corticoide inalatório ou antibiótico recente (investigar imunossupressão), candidíase recorrente mais de 3 vezes ao ano, lesões que não melhoram após 14 dias de tratamento correto, candidíase na garganta com dificuldade para engolir (pode ser candidíase esofágica — exige tratamento sistêmico)."
  },
  {
    nome: "Simeticona",
    generico: "Simeticona",
    tipo: "Antiflatulento / Digestivo — Agente Antiespumante",
    sinonimos: ["dimeticona","luftal","sab simplex","esputikon","mylicon","dimeticone","luftal gotas","simeticona gotas"],
    descricao: "Medicamento para alívio de gases, flatulência excessiva, distensão abdominal e cólicas associadas ao acúmulo de gás no intestino. Age de forma puramente física: junta as bolhas de gás no estômago e intestino em bolhas maiores, facilitando a eliminação por arroto ou flatulência. Não é absorvida pelo intestino, não entra na corrente sanguínea e é eliminada nas fezes. Considerada extremamente segura — usada em bebês desde o nascimento, grávidas e idosos.",
    receita: "Não",
    receita_display: "🟢 Venda Livre — Sem Receita",
    receita_cor: "verde",
    receita_descricao: "Disponível sem receita médica. Medicamento OTC de venda livre.",
    receita_nota: "Presente em muitas formulações combinadas com antiácidos. Verificar se o produto é apenas simeticona ou combinado.",
    efeitos: "Praticamente ausentes. Por não ser absorvida, não tem efeitos sistêmicos. Raramente pode causar leve desconforto gástrico. É considerada um dos medicamentos mais seguros disponíveis.",
    aviso_grave: "GASES PODEM SER SINTOMA DE ALGO MAIOR: Flatulência excessiva e distensão abdominal persistentes (por semanas) podem ser sinais de síndrome do intestino irritável, intolerância à lactose, doença celíaca ou outras condições. A simeticona alivia o sintoma mas não trata a causa. Procure médico se os gases persistirem por mais de 2 semanas sem melhora.",
    recomendacao: "Tome após as refeições e ao deitar. Para bebês com cólicas de gases: seguir a dose indicada pelo pediatra em gotas, geralmente após as mamadas. Agitar bem a emulsão antes de usar. Para adultos: comprimidos mastigáveis ou cápsulas gelatinosas podem ser mais convenientes.",
    educacao: "A simeticona é inerte no organismo — apenas quebra a tensão superficial das bolhas de gás. Não trata excesso de produção de gás — esse excesso geralmente vem da dieta (leguminosas, repolho, brócolis, refrigerantes) ou de disbiose intestinal. Para gases crônicos intensos, investigar intolerância alimentar ou causa digestiva.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Gases, flatulência, distensão abdominal e cólicas por gás" },
      { titulo: "É absorvida pelo corpo?", texto: "Não — age só no intestino, totalmente segura" },
      { titulo: "Pode dar para bebê?", texto: "Sim — segura desde o nascimento conforme dose pediátrica" },
      { titulo: "Pode usar na gravidez?", texto: "Sim — uma das mais seguras na gestação" }
    ],
    receita_obrigatoria: false,
    tipo_receita: "sem_receita",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Simeticona e dimeticona são a mesma coisa?", resposta: "Essencialmente sim — têm mecanismo de ação idêntico (agentes antiespumantes). A simeticona é uma mistura de polidimetilsiloxano e sílica — muito similar à dimeticona. Os nomes são usados de forma intercambiável em muitas formulações no Brasil." },
      { pergunta: "Pode tomar com outros remédios?", resposta: "A simeticona não tem interações medicamentosas clinicamente significativas — não é absorvida. Pode ser tomada junto com a maioria dos medicamentos sem preocupação. Em caso de dúvida, separe por 1 a 2h." },
      { pergunta: "Por que meu bebê continua com cólicas mesmo com simeticona?", resposta: "Cólicas em bebês têm várias causas — nem todas são por gás. Técnica de amamentação, intolerância à proteína do leite de vaca (APLV) e imaturidade intestinal também causam cólicas. Se as cólicas forem intensas ou o bebê não ganhar peso adequadamente, consultar o pediatra." },
      { pergunta: "Posso tomar todos os dias?", resposta: "Sim, é segura para uso regular. Mas gases diários intensos devem ser investigados para identificar a causa — dieta, intolerância alimentar ou condição digestiva." },
      { pergunta: "A versão em gotas é diferente da em comprimido?", resposta: "O princípio ativo é o mesmo, mas a concentração e a forma de uso diferem. As gotas são mais usadas em bebês e crianças menores; os comprimidos mastigáveis e cápsulas, em adultos. Verificar a dose e a forma correta para cada faixa etária." }
    ],
    descricao_seo: "Simeticona (Luftal, Sab Simplex) é antiflatulento seguro para gases, distensão e cólicas em adultos, bebês e grávidas. Saiba diferenças da dimeticona e quando procurar médico.",
    alerta_farmaceutico: "Sem interações medicamentosas clinicamente relevantes — não absorvida sistemicamente. Atenção: alguns produtos combinam simeticona com hidróxido de alumínio ou magnésio (antiácidos) — essas associações têm interações com quinolonas, ferro, levotiroxina e fluoretos (separar por 2h dos outros medicamentos).",
    quando_procurar_medico: "Dor abdominal intensa ou súbita, distensão abdominal persistente sem relação com alimentação, perda de peso involuntária, sangue nas fezes ou fezes muito escuras, vômitos frequentes associados à distensão (possível obstrução intestinal)."
  },
  {
    nome: "Carbonato de Cálcio",
    generico: "Carbonato de Cálcio",
    tipo: "Suplemento Mineral / Antiácido — Fonte de Cálcio Elementar",
    sinonimos: ["calcio","calcio carbonato","cálcio 500mg","cálcio 1000mg","calcium carbonate","calsan","calbion","vitacalcin","osteo-vite"],
    descricao: "Principal suplemento de cálcio usado no Brasil para prevenir e tratar osteoporose, raquitismo e hipocalcemia. O carbonato de cálcio contém a maior proporção de cálcio elementar entre os suplementos (40%) — por isso as cápsulas/comprimidos precisam ser menores para fornecer a mesma quantidade de cálcio que o citrato de cálcio. Também funciona como antiácido (neutraliza o ácido do estômago) e é ingrediente de marmoraria, mas nas formulações farmacêuticas é de grau alimentício.",
    receita: "Não",
    receita_display: "🟢 Venda Livre — Sem Receita",
    receita_cor: "verde",
    receita_descricao: "Disponível sem receita. Suplemento alimentar vendido em farmácias e drogarias.",
    receita_nota: "Para doses terapêuticas altas (hipocalcemia, hipoparatireoidismo), geralmente prescrito pelo médico.",
    efeitos: "Gases, constipação intestinal — especialmente com doses altas. Hipercalciúria (excesso de cálcio na urina) com doses muito elevadas — risco de pedras nos rins. Raramente: hipercalcemia (cálcio alto no sangue) com uso excessivo associado a vitamina D em altas doses.",
    aviso_grave: "PEDRAS NOS RINS: Doses acima do necessário, especialmente combinadas com vitamina D em excesso, aumentam o risco de cálculo renal. Quem já teve pedra no rim deve discutir com o médico a necessidade de suplementação. INTERAÇÕES CRÍTICAS: O cálcio interfere com a absorção de muitos medicamentos — deve ser separado por pelo menos 2 horas de: levotiroxina (hipotireoidismo), antibióticos (ciprofloxacino, tetraciclina), ferro, zinco, bisfosfonatos (alendronato) e fluoreto.",
    recomendacao: "Tome com alimentos — o carbonato de cálcio precisa de ácido gástrico para ser bem absorvido (diferente do citrato de cálcio, que pode ser tomado em jejum). Divida a dose — o intestino absorve melhor em porções de até 500mg de cálcio elementar por vez. Se usar vitamina D, tomar junto melhora a absorção do cálcio. Separe por 2 horas de qualquer outro medicamento.",
    educacao: "O carbonato de cálcio precisa de ácido estomacal para se dissolver e ser absorvido — por isso pacientes que usam IBP (omeprazol, pantoprazol) ou têm acloridria (falta de ácido gástrico, comum em idosos) absorvem melhor o citrato de cálcio, que não depende do ácido. A dose diária de cálcio recomendada varia: mulheres pós-menopausa e idosos precisam de 1200mg/dia (somando dieta + suplemento).",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Previne e trata osteoporose e hipocalcemia" },
      { titulo: "Quando tomar?", texto: "Com alimentos — precisa de ácido gástrico para absorver" },
      { titulo: "Pode tomar com remédio da tireoide?", texto: "Não junto — separar por pelo menos 2 horas" },
      { titulo: "Dose máxima?", texto: "Não exceder 2500mg de cálcio elementar por dia (dieta + suplemento)" }
    ],
    receita_obrigatoria: false,
    tipo_receita: "sem_receita",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Qual a diferença entre carbonato de cálcio e citrato de cálcio?", resposta: "Carbonato de cálcio: mais cálcio por comprimido (40% elementar), mais barato, precisa ser tomado com refeição. Citrato de cálcio: menor concentração (21% elementar), pode ser tomado em jejum, melhor para quem usa omeprazol ou tem pouco ácido estomacal. Para a maioria das pessoas, o carbonato é suficiente." },
      { pergunta: "Posso tomar cálcio com vitamina D juntos?", resposta: "Sim — na verdade é recomendado. A vitamina D é essencial para absorver o cálcio no intestino. Muitas formulações já combinam os dois. A dose de vitamina D depende do nível sérico de cada paciente — exame de 25-OH vitamina D orienta a suplementação." },
      { pergunta: "Cálcio aumenta risco de infarto?", resposta: "Há debate científico sobre isso. Alguns estudos associaram suplementação excessiva de cálcio (sem vitamina D adequada) com leve aumento de risco cardiovascular. A orientação atual é manter a dose necessária — não exagerar — e priorizar cálcio da dieta (laticínios, folhas verdes) antes do suplemento." },
      { pergunta: "Posso tomar cálcio e ferro no mesmo horário?", resposta: "Não. O cálcio compete com o ferro pela absorção intestinal — ambos usam os mesmos transportadores. Separar por pelo menos 2 horas. Idealmente tomar ferro em jejum e cálcio com as refeições." },
      { pergunta: "Usei cálcio por anos. Preciso parar?", resposta: "Reavalie com o médico. A necessidade de suplementação depende da ingestão alimentar de cálcio, da vitamina D e do risco de osteoporose. Se a dieta for rica em laticínios e o risco for baixo, o suplemento pode não ser mais necessário." }
    ],
    descricao_seo: "Carbonato de Cálcio é suplemento para osteoporose e hipocalcemia. Saiba como tomar com alimentação, diferenças do citrato de cálcio e por que separar de outros medicamentos.",
    alerta_farmaceutico: "Interações críticas por redução de absorção: levotiroxina (separar 4h), bisfosfonatos — alendronato, risedronato (separar 2h e tomar os bisfosfonatos em jejum), fluoroquinolonas e tetraciclinas (separar 2h), ferro e zinco (separar 2h). IBPs reduzem absorção do carbonato de cálcio — preferir citrato de cálcio em pacientes com hipocloridria.",
    quando_procurar_medico: "Sintomas de hipercalcemia (constipação intensa, confusão, fraqueza, polidipsia), cólica renal ou passagem de cálculo, nível sérico de cálcio ou vitamina D para orientar a suplementação correta, osteoporose — densitometria óssea e avaliação de risco de fratura."
  },
  {
    nome: "Isossorbida Mononitrato",
    generico: "Isossorbida Mononitrato",
    tipo: "Vasodilatador Coronariano — Nitrato Orgânico",
    sinonimos: ["monocordil","isossorb","ismo","monoket","isordil","mononitrato de isossorbida","isossorbida dinitrato","sorbitrate"],
    descricao: "Medicamento da família dos nitratos para prevenir e tratar a angina pectoris (dor no peito causada por redução do fluxo sanguíneo para o coração). Age liberando óxido nítrico que relaxa e dilata os vasos sanguíneos — reduz o trabalho do coração e aumenta o fluxo coronariano. Também usado na insuficiência cardíaca como vasodilatador. Disponível em comprimidos de liberação imediata (para crises agudas — menos comum para mononitrato) e liberação prolongada (para prevenção diária).",
    receita: "Sim",
    receita_display: "🔴 Receita Simples",
    receita_cor: "vermelho",
    receita_descricao: "Exige receita médica simples (branca). Geralmente prescrito por cardiologista.",
    receita_nota: "Receita válida por 30 dias. Disponível em farmácias comerciais.",
    efeitos: "Cefaleia (dor de cabeça) — muito comum, especialmente no início do tratamento — é causada pela vasodilatação e geralmente melhora em 1 a 2 semanas. Tontura, vermelhidão na face, hipotensão (queda de pressão) ao levantar rápido. Taquicardia reflexa.",
    aviso_grave: "CONTRAINDICADO COM SILDENAFILA (VIAGRA), TADALAFILA (CIALIS) E VARDENAFILA: A combinação de nitratos com inibidores da PDE-5 causa queda grave e súbita da pressão arterial que pode ser fatal. Se usar qualquer medicamento para disfunção erétil, informe o cardiologista imediatamente. TOLERÂNCIA AOS NITRATOS: Com uso contínuo sem intervalo, o corpo perde a resposta ao medicamento (tolerância). É necessário um intervalo diário sem nitrato de 8 a 12 horas (geralmente à noite) para manter a eficácia.",
    recomendacao: "Tome em horários programados — geralmente de manhã e início da tarde, deixando um intervalo livre de nitrato à noite (8 a 12h sem o medicamento para evitar tolerância). Nunca interrompa abruptamente. Levante devagar da cama (hipotensão ortostática). Se sentir dor no peito não aliviada, procure emergência — o mononitrato não é substituto da nitroglicerina sublingual em crises agudas.",
    educacao: "A tolerância aos nitratos é o maior problema do uso crônico — acontece porque os vasos se adaptam ao óxido nítrico constante e param de responder. O intervalo livre de nitrato (janela sem medicamento, geralmente à noite) previne isso. O cardiologista define o horário ideal. Pacientes com angina noturna precisam de esquema diferente.",
    resposta_rapida: [
      { titulo: "Para que serve?", texto: "Previne dor no peito (angina) e trata insuficiência cardíaca" },
      { titulo: "Pode combinar com Viagra?", texto: "Não — risco de queda grave de pressão, pode ser fatal" },
      { titulo: "Dor de cabeça é normal?", texto: "Sim — muito comum no início, melhora em dias a semanas" },
      { titulo: "Por que ter intervalo noturno?", texto: "Evita tolerância — o coração para de responder se ficar 24h com nitrato" }
    ],
    receita_obrigatoria: true,
    tipo_receita: "simples",
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: "Qual a diferença entre isossorbida mononitrato e dinitrato?", resposta: "O mononitrato é a forma ativa — não precisa de conversão hepática como o dinitrato. Tem biodisponibilidade mais previsível (quase 100%) e pode ser tomado uma ou duas vezes ao dia. O dinitrato precisa ser tomado com mais frequência. Na prática clínica, o mononitrato é mais confiável." },
      { pergunta: "Já tomei sildenafila (Viagra) ontem. Posso tomar isossorbida hoje?", resposta: "Com sildenafila, o intervalo de segurança é de pelo menos 24 horas antes de usar qualquer nitrato. Com tadalafila (Cialis), o intervalo é de pelo menos 48 horas. Nunca combine sem essa espera mínima — a queda de pressão pode ser perigosa." },
      { pergunta: "A cefaleia vai passar?", resposta: "Sim, geralmente melhora bastante nas primeiras 1 a 2 semanas de tratamento à medida que o organismo se adapta. Paracetamol pode ajudar no início. Se a dor for insuportável, consultar o cardiologista — há alternativas como betabloqueadores ou bloqueadores de canal de cálcio." },
      { pergunta: "Posso parar o mononitrato se não sentir mais dor no peito?", resposta: "Não pare sem orientação do cardiologista. O medicamento previne a angina — sua ausência de sintomas pode ser justamente porque ele está funcionando. Interrupção abrupta pode desencadear angina de rebote." },
      { pergunta: "Posso tomar com hipotensores (enalapril, losartana)?", resposta: "Com cuidado. A combinação de nitratos com anti-hipertensivos pode causar hipotensão excessiva. O cardiologista avalia e ajusta as doses. Monitore a pressão regularmente e levante devagar." }
    ],
    descricao_seo: "Isossorbida Mononitrato (Monocordil) é nitrato para angina e insuficiência cardíaca. Saiba por que é proibido com Viagra, como evitar tolerância e o que fazer com a dor de cabeça inicial.",
    alerta_farmaceutico: "Contraindicação absoluta com inibidores da PDE-5 (sildenafila, tadalafila, vardenafila, avanafila) — hipotensão grave potencialmente fatal. Hipotensores, álcool e diuréticos amplificam queda de pressão. Heparina: nitratos IV podem reduzir seu efeito anticoagulante. Tolerância farmacodinâmica: esquema com intervalo de 8 a 12h sem nitrato é obrigatório para manter eficácia.",
    quando_procurar_medico: "Emergência: dor no peito que não alivia com 3 doses de nitroglicerina sublingual em 15 min (infarto em curso — SAMU 192), pressão muito baixa com desmaio. Programada: dor de cabeça insuportável que não melhora com tratamento, perda de eficácia do medicamento (angina voltando apesar do uso correto), planejamento de qualquer medicamento para disfunção erétil."
  }
];

// Verificar duplicatas pelo nome
const nomesExistentes = dados.map(d => d.nome.toLowerCase());
const paraAdicionar = novos.filter(n => {
  if (nomesExistentes.includes(n.nome.toLowerCase())) {
    console.log(`PULANDO (já existe): ${n.nome}`);
    return false;
  }
  return true;
});

paraAdicionar.forEach(m => dados.push(m));

fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2), 'utf8');
console.log(`\n✅ Adicionados ${paraAdicionar.length} medicamentos. Total agora: ${dados.length}`);
paraAdicionar.forEach(m => console.log(`  + ${m.nome}`));
