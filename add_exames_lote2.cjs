// add_exames_lote2.cjs
// MediCheck — Adiciona 4 exames ao exames.json (raiz do projeto)
// Grupos: Hemograma, Inflamação, Função Hepática, Minerais

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "exames.json");

const novosExames = [
  {
    nome: "Reticulócitos",
    categoria: "Hemograma",
    descricao:
      "Os reticulócitos são células vermelhas jovens recém-saídas da medula óssea, ainda em maturação. Representam entre 0,5% e 2% das células vermelhas em adultos saudáveis. Medir sua quantidade revela se a medula óssea está funcionando bem — se está produzindo glóbulos vermelhos na velocidade certa.",
    valores_normais:
      "0,5% a 2,0% do total de células vermelhas (adultos) | Em números absolutos: 25.000 a 100.000/mm³",
    o_que_significa_alto:
      "Reticulócitos acima de 2% indicam que a medula está trabalhando acelerado para compensar uma perda. Pode ocorrer em anemia hemolítica (destruição das células vermelhas), hemorragia recente ou resposta positiva ao tratamento de anemia com ferro, vitamina B12 ou ácido fólico.",
    o_que_significa_baixo:
      "Reticulócitos abaixo de 0,5% com anemia presente são sinal de alerta: a medula óssea não está produzindo células suficientes. As causas incluem anemia aplásica, deficiência de ferro, B12 ou folato, doença renal crônica e efeito de quimioterapia.",
    quando_pedir:
      "Investigação de anemia (para identificar se é por falta de produção ou por perda/destruição), monitoramento de tratamento com ferro, vitamina B12 ou ácido fólico, após transplante de medula óssea, em pacientes em uso de eritropoetina.",
    preparo:
      "Nenhum preparo especial. Não precisa de jejum. Pode ser coletado a qualquer hora do dia.",
    descricao_seo:
      "O exame de reticulócitos avalia se a medula óssea está produzindo glóbulos vermelhos adequadamente. É essencial para investigar anemias e monitorar tratamentos. Entenda o que significa seu resultado.",
    perguntas_frequentes: [
      {
        pergunta: "O que são reticulócitos?",
        resposta:
          "São glóbulos vermelhos jovens, recém-liberados pela medula óssea. Ficam cerca de 1 a 2 dias circulando como reticulócitos antes de se tornarem glóbulos vermelhos maduros. Contá-los mostra se a medula está produzindo células na velocidade correta."
      },
      {
        pergunta: "Reticulócitos altos são sempre problema?",
        resposta:
          "Não necessariamente. Reticulócitos altos podem ser uma boa notícia — significam que o corpo está respondendo a um tratamento de anemia ou se recuperando de uma hemorragia. O contexto clínico é fundamental para interpretar o resultado."
      },
      {
        pergunta: "Para que serve o reticulócito na investigação de anemia?",
        resposta:
          "Ele separa dois tipos de anemia: se o reticulócito está baixo junto com a anemia, a medula não está produzindo o suficiente (falta de nutrientes, doença da medula, doença renal). Se está alto, a medula está compensando uma destruição ou perda de glóbulos vermelhos."
      },
      {
        pergunta: "Precisa de jejum para o exame de reticulócitos?",
        resposta:
          "Não. O exame não requer jejum e pode ser realizado em qualquer horário."
      },
      {
        pergunta: "Sempre analiso reticulócitos junto com outros exames?",
        resposta:
          "Sim. O reticulócito isolado tem pouco valor. Ele deve ser interpretado sempre junto com hemoglobina, hematócrito e, idealmente, com ferritina, vitamina B12 e ácido fólico para uma conclusão mais precisa."
      }
    ]
  },

  {
    nome: "VHS (Velocidade de Hemossedimentação)",
    categoria: "Inflamação e Infecção",
    descricao:
      "O VHS mede a velocidade com que as células vermelhas do sangue se depositam no fundo de um tubo em 1 hora. Quando há inflamação no corpo, proteínas especiais fazem as células 'colarem' entre si e caírem mais rápido. É um dos marcadores de inflamação mais antigos da medicina — simples, barato e útil para acompanhamento de longo prazo.",
    valores_normais:
      "Homens até 50 anos: até 15 mm/h | Homens acima de 50 anos: até 20 mm/h | Mulheres até 50 anos: até 20 mm/h | Mulheres acima de 50 anos: até 30 mm/h",
    o_que_significa_alto:
      "VHS elevado indica inflamação ou infecção ativa no organismo, mas não identifica a causa. Pode estar alto em infecções bacterianas, doenças autoimunes (artrite reumatoide, lúpus), anemia, câncer, gravidez e idade avançada. VHS acima de 100 mm/h exige investigação urgente — pode indicar mieloma múltiplo, infecção grave ou vasculite.",
    o_que_significa_baixo:
      "VHS baixo é raramente relevante clinicamente. Pode ocorrer em policitemia (excesso de células vermelhas), insuficiência cardíaca congestiva ou uso de ácido acetilsalicílico (AAS). Em geral não representa problema.",
    quando_pedir:
      "Suspeita de inflamação crônica, investigação de artrite reumatoide, lúpus, tuberculose ou osteomielite, rastreio de mieloma múltiplo (em idosos com dor óssea), monitoramento de doenças reumáticas em acompanhamento.",
    preparo:
      "Nenhum preparo especial. Não precisa de jejum. Informar ao médico uso de AAS ou anti-inflamatórios, pois podem influenciar o resultado.",
    descricao_seo:
      "O VHS é um marcador geral de inflamação. Valores elevados indicam infecção, doença autoimune ou outras condições inflamatórias. Saiba o que significa seu resultado e como interpretá-lo junto com a PCR.",
    perguntas_frequentes: [
      {
        pergunta: "Qual a diferença entre VHS e PCR?",
        resposta:
          "Ambos marcam inflamação, mas em velocidades diferentes. A PCR sobe em horas após o início da inflamação e cai rapidamente quando melhora. O VHS demora mais para subir e para normalizar — por isso é mais útil para acompanhar doenças crônicas de longo prazo, enquanto a PCR é melhor para avaliar inflamação aguda."
      },
      {
        pergunta: "VHS alto sempre significa doença grave?",
        resposta:
          "Não. O VHS pode estar elevado em situações benignas como gravidez, menstruação, idade avançada e até anemia simples. O valor precisa ser interpretado junto com sintomas e outros exames. Somente o médico pode definir se o resultado exige investigação adicional."
      },
      {
        pergunta: "VHS de 40 é preocupante?",
        resposta:
          "Depende do sexo e da idade. Para uma mulher acima de 50 anos, 40 mm/h está acima do normal e merece atenção. Para um homem jovem, o mesmo valor é mais significativo. Sempre interprete o resultado com o seu médico, junto com outros exames e sintomas."
      },
      {
        pergunta: "O VHS pode estar alto sem nenhuma doença?",
        resposta:
          "Sim. Gravidez, obesidade, anemia e idade avançada elevam o VHS mesmo sem doença ativa. Por isso o exame é inespecífico e deve sempre ser interpretado no contexto clínico."
      },
      {
        pergunta: "Precisa de jejum para fazer o VHS?",
        resposta:
          "Não. O exame não requer jejum. Pode ser coletado em qualquer horário do dia."
      }
    ]
  },

  {
    nome: "GGT (Gama-GT)",
    categoria: "Função Hepática",
    descricao:
      "A GGT (gama-glutamiltransferase) é uma enzima produzida principalmente no fígado, rins e pâncreas. É o marcador mais sensível para detectar consumo excessivo de álcool e dano hepático causado por medicamentos. Quando o fígado ou as vias biliares estão irritados, a GGT sobe — muitas vezes antes de qualquer sintoma aparecer.",
    valores_normais:
      "Homens: até 73 U/L | Mulheres: até 38 U/L | (Valores de referência podem variar entre laboratórios)",
    o_que_significa_alto:
      "GGT elevada pode indicar consumo de álcool (mesmo moderado), esteatose hepática (gordura no fígado), hepatite, obstrução das vias biliares, cirrose ou uso de medicamentos hepatotóxicos (anticonvulsivantes, estatinas, anticoncepcional, paracetamol em doses altas). Valores muito altos sugerem doença hepática grave ou obstrução biliar.",
    o_que_significa_baixo:
      "GGT baixa não tem significado clínico relevante. Valores dentro ou abaixo da faixa normal são considerados normais.",
    quando_pedir:
      "Investigação de doença hepática ou biliar, suspeita de consumo excessivo de álcool, monitoramento de pacientes em uso de medicamentos hepatotóxicos (anticonvulsivantes, estatinas, paracetamol em doses altas), icterícia, dor no lado direito do abdômen, junto com TGO e TGP para interpretação completa da função hepática.",
    preparo:
      "Recomenda-se evitar consumo de álcool por pelo menos 24 horas antes da coleta, pois o álcool eleva rapidamente a GGT. Informar ao médico todos os medicamentos em uso.",
    descricao_seo:
      "A GGT é o exame mais sensível para detectar dano hepático por álcool e medicamentos. Saiba o que significa GGT alta, quais as causas mais comuns e como interpretar seu resultado.",
    perguntas_frequentes: [
      {
        pergunta: "GGT alta sempre significa problema no fígado?",
        resposta:
          "Nem sempre. Muitos medicamentos de uso comum — como anticonvulsivantes, estatinas e anticoncepcional oral — elevam a GGT sem causar doença hepática real. O médico avalia se a elevação é clinicamente relevante ou apenas um efeito esperado do medicamento."
      },
      {
        pergunta: "O álcool eleva a GGT mesmo em pequenas quantidades?",
        resposta:
          "Sim. A GGT é muito sensível ao álcool — até o consumo social pode elevá-la. Por isso recomenda-se evitar bebidas alcoólicas por pelo menos 24 horas antes do exame para obter um resultado mais fidedigno."
      },
      {
        pergunta: "Qual a diferença entre GGT, TGO e TGP?",
        resposta:
          "TGO e TGP indicam destruição de células do fígado (hepatite, por exemplo). A GGT é mais específica para dano nas vias biliares e para o efeito do álcool e medicamentos. Os três juntos dão uma visão mais completa da saúde hepática."
      },
      {
        pergunta: "GGT alta sem outros exames alterados é problema?",
        resposta:
          "Pode ser. GGT isoladamente alta, especialmente com histórico de consumo de álcool ou uso de medicamentos, merece atenção. O médico pode solicitar uma ultrassonografia do abdômen e outros exames para investigar a causa."
      },
      {
        pergunta: "Precisa de jejum para o exame de GGT?",
        resposta:
          "O jejum não é obrigatório, mas recomenda-se evitar álcool nas 24 horas anteriores. Confirme com o laboratório as orientações específicas, pois a GGT costuma ser solicitada junto com outros exames que podem exigir jejum."
      }
    ]
  },

  {
    nome: "Cálcio Sérico",
    categoria: "Minerais e Eletrólitos",
    descricao:
      "O cálcio sérico mede a quantidade de cálcio circulando no sangue. O cálcio é o mineral mais abundante do corpo — 99% está nos ossos, mas o 1% que circula no sangue é vital para o funcionamento dos músculos, nervos e coração. O controle do cálcio no sangue é feito principalmente pelas glândulas paratireoides e pela vitamina D.",
    valores_normais:
      "Cálcio total: 8,5 a 10,5 mg/dL (adultos) | Cálcio ionizado (forma ativa): 1,15 a 1,35 mmol/L",
    o_que_significa_alto:
      "Hipercalcemia (acima de 10,5 mg/dL) pode indicar hiperparatireoidismo (causa mais comum), câncer com metástase óssea, excesso de vitamina D ou sarcoidose. Sintomas incluem sede excessiva, vontade frequente de urinar, constipação, fraqueza e confusão mental. Valores muito altos são emergência médica.",
    o_que_significa_baixo:
      "Hipocalcemia (abaixo de 8,5 mg/dL) pode indicar hipoparatireoidismo, deficiência grave de vitamina D, doença renal crônica ou pancreatite aguda. Sintomas incluem câimbras, formigamento nos dedos e ao redor da boca, espasmos musculares e, em casos graves, convulsões.",
    quando_pedir:
      "Investigação de osteoporose ou cálculo renal, fraqueza muscular, câimbras ou formigamento sem causa aparente, suspeita de hiperparatireoidismo, monitoramento em uso de diuréticos, suplementos de cálcio ou vitamina D, acompanhamento de doenças renais ou da tireoide/paratireoide.",
    preparo:
      "Recomenda-se jejum de 4 a 8 horas. Informar ao médico uso de suplementos de cálcio, vitamina D, diuréticos ou outros medicamentos, pois podem influenciar o resultado.",
    descricao_seo:
      "O cálcio sérico avalia os níveis de cálcio no sangue, essencial para ossos, músculos e coração. Saiba o que significa cálcio alto (hipercalcemia) ou baixo (hipocalcemia) e quando investigar.",
    perguntas_frequentes: [
      {
        pergunta: "Qual a diferença entre cálcio total e cálcio ionizado?",
        resposta:
          "O cálcio total mede todo o cálcio no sangue, incluindo a parte ligada à proteína albumina. O cálcio ionizado mede apenas a fração ativa, que é a biologicamente relevante. Quando a albumina está baixa, o cálcio total pode parecer baixo sem que haja problema real — por isso o médico pode pedir o ionizado para confirmação."
      },
      {
        pergunta: "Cálcio alto no exame de sangue é sinal de câncer?",
        resposta:
          "Hipercalcemia pode ocorrer em alguns tipos de câncer, mas a causa mais comum é o hiperparatireoidismo — uma condição benigna das glândulas paratireoides. Somente o médico pode investigar a causa correta com exames complementares."
      },
      {
        pergunta: "Tomar suplemento de cálcio normaliza o resultado baixo?",
        resposta:
          "Não necessariamente. O cálcio sérico baixo pode ter causas variadas — deficiência de vitamina D, problema nas paratireoides ou doença renal. Tomar cálcio sem investigar a causa pode não resolver o problema e mascarar diagnósticos importantes. Consulte o médico antes de suplementar."
      },
      {
        pergunta: "Câimbras frequentes podem ser cálcio baixo?",
        resposta:
          "Sim, hipocalcemia é uma das causas de câimbras e espasmos musculares. No entanto, câimbras têm muitas causas — incluindo desidratação, magnésio baixo e falta de condicionamento físico. O exame de cálcio sérico ajuda a descartar ou confirmar essa causa."
      },
      {
        pergunta: "Precisa de jejum para o exame de cálcio sérico?",
        resposta:
          "Recomenda-se jejum de 4 a 8 horas. Além disso, informe ao laboratório e ao médico se você toma suplementos de cálcio ou vitamina D, pois podem elevar o resultado."
      }
    ]
  }
];

// ─────────────────────────────────────────────
// FUNÇÃO PRINCIPAL
// ─────────────────────────────────────────────

function adicionarExames() {
  if (!fs.existsSync(DB_PATH)) {
    console.error(`❌ Arquivo não encontrado: ${DB_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(DB_PATH, "utf-8");
  const db = JSON.parse(raw);
  const lista = Array.isArray(db) ? db : db.exames || Object.values(db);

  let adicionados = 0;
  const jaExistiam = [];

  for (const exame of novosExames) {
    const duplicado = lista.some(
      (e) => e.nome?.toLowerCase().trim() === exame.nome.toLowerCase().trim()
    );
    if (duplicado) {
      jaExistiam.push(exame.nome);
      console.log(`⚠️  "${exame.nome}" já existe — ignorado`);
    } else {
      lista.push(exame);
      adicionados++;
      console.log(`✅ "${exame.nome}" adicionado`);
    }
  }

  const dbAtualizado = Array.isArray(db) ? lista : { ...db, exames: lista };
  fs.writeFileSync(DB_PATH, JSON.stringify(dbAtualizado, null, 2), "utf-8");

  console.log("\n─────────────────────────────────────────");
  console.log(`💊 Exames adicionados : ${adicionados}`);
  console.log(`📦 Total no banco     : ${lista.length}`);
  if (jaExistiam.length > 0) {
    console.log(`⚠️  Já existiam       : ${jaExistiam.join(", ")}`);
  }
  console.log("─────────────────────────────────────────\n");
}

adicionarExames();
