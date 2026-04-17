const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/Usuario/Desktop/medicheck';
const filePath = path.join(baseDir, 'medicamentos.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function temPergunta(faqs, ...keywords) {
  return faqs.some(f => keywords.some(k => f.pergunta.toLowerCase().includes(k.toLowerCase()) || f.resposta.toLowerCase().includes(k.toLowerCase())));
}

function classificar(med) {
  const tipo = (med.tipo || '').toLowerCase();
  const receita = (med.receita_display || '').toLowerCase();
  const nome = (med.nome || '').toLowerCase();
  const gen = (med.generico || '').toLowerCase();
  const all = tipo + ' ' + receita + ' ' + nome + ' ' + gen;
  return {
    isBenzo: /benzodiazep|clonazepam|alprazolam|diazepam|lorazepam|bromazepam|midazolam|nitrazepam/.test(all),
    isOpioide: /opioide|opioid|tramadol|codeína|codeina|morfina|fentanila|buprenorfina|oxicodona|tapentadol/.test(all),
    isControlado: /controlad|benzodiazep|opioide|opioid|tramadol|anfetamina|sibutramina|zolpidem|zopiclona|metilfenidato|lisdexanfetamina|modafinil|clonazepam|alprazolam|diazepam|bromazepam/.test(all),
    isAntibiotico: /antibiot|antimicrobi|penicilina|cefalexina|amoxicilina|azitromicina|ciprofloxacino|levofloxacino|metronidazol|clindamicina|tetraciclina|doxiciclina|ceftriaxona|claritromicina|sulfametoxazol|nitrofurantoina|fosfomicina|vancomicina|rifampicina|isoniazida/.test(all),
    isAntifungico: /antifúngico|antifungic|fluconazol|itraconazol|cetoconazol|nistatina|terbinafina|anfotericina/.test(all),
    isAntiviral: /antiviral|aciclovir|oseltamivir|ribavirina|tenofovir|efavirenz|lopinavir|ganciclovir/.test(all),
    isAine: /aine|anti-inflamatório não esteroidal|ibuprofeno|diclofenaco|naproxeno|cetoprofeno|nimesulida|meloxicam|celecoxibe|etoricoxibe|aceclofenaco|indometacina/.test(all),
    isAnalgesicoSimples: /paracetamol|dipirona|metamizol/.test(all),
    isAntidepressivo: /antidepressiv|isrs|irsn|ssri|snri|fluoxetina|sertralina|escitalopram|citalopram|paroxetina|venlafaxina|duloxetina|mirtazapina|amitriptilina|imipramina|nortriptilina|trazodona|bupropiona|agomelatina/.test(all),
    isAntidiabetico: /antidiabét|antidiabet|hipoglicemi|glicemia|metformina|glibenclamida|glicazida|glimepirida|insulina|sitagliptina|saxagliptina|alogliptina|vildagliptina|linagliptina|dapagliflozina|empagliflozina|canagliflozina|liraglutida|semaglutida|tirzepatida|acarbose/.test(all),
    isInsulina: /insulina/.test(all),
    isBetabloqueador: /betabloqueador|beta-bloqueador|bisoprolol|atenolol|metoprolol|propranolol|carvedilol|nebivolol/.test(all),
    isAntiepiletico: /antiepilép|antiepiletic|anticonvulsivante|carbamazepina|fenitoína|fenitoina|valproato|valproico|lamotrigina|levetiracetam|topiramato|fenobarbital|oxcarbazepina|pregabalina|gabapentina/.test(all),
    isCorticoide: /corticosteroid|corticoide|prednisona|prednisolona|dexametasona|hidrocortisona|betametasona|budesonida|beclometasona|fluticasona|mometasona/.test(all),
    isAnticoagulante: /anticoagulante|varfarina|warfarina|rivaroxabana|dabigatrana|apixabana|heparina|enoxaparina/.test(all),
    isMetronidazol: /metronidazol|tinidazol|secnidazol/.test(all),
    isAntiHipertensivo: /anti-hipertensiv|antihipertensiv|losartana|enalapril|captopril|lisinopril|ramipril|anlodipino|valsartana|candesartana|hidroclorotiazida|furosemida|espironolactona|hidralazina|metildopa/.test(all),
    isBisfosfonato: /bisfosfonato|alendronato|acido zoledronico|ácido zoledrônico|ibandronato/.test(all),
    isLevotiroxina: /levotiroxina|tiroxina/.test(all),
    isSibutramina: /sibutramina/.test(all),
    isEstimulante: /metilfenidato|lisdexanfetamina|modafinil|anfetamina/.test(all),
    isZolpidem: /zolpidem|zopiclona/.test(all),
  };
}

function gerarAlcool(med, c) {
  const nome = med.generico || med.nome.split(' ')[0];
  if (c.isBenzo || c.isOpioide || c.isZolpidem) {
    return { pergunta: `Posso beber álcool tomando ${nome}?`, resposta: `Não. A combinação com álcool potencializa a depressão do sistema nervoso central, causando sedação excessiva, risco de parada respiratória e overdose. Evite álcool completamente durante o tratamento.` };
  }
  if (c.isAnticoagulante) {
    return { pergunta: `Posso beber álcool tomando ${nome}?`, resposta: `Evite. O álcool potencializa o efeito anticoagulante, elevando o risco de sangramento grave. Mesmo pequenas quantidades podem ser perigosas.` };
  }
  if (c.isMetronidazol) {
    return { pergunta: `Posso beber álcool tomando ${nome}?`, resposta: `Não. A combinação causa reação grave tipo dissulfiram: rubor intenso, palpitações, náusea e vômitos. Evite álcool durante o tratamento e por 48 horas após terminar.` };
  }
  if (c.isAntidepressivo) {
    return { pergunta: `Posso beber álcool tomando ${nome}?`, resposta: `Evite. O álcool reduz o efeito do antidepressivo, piora a depressão e pode causar sedação excessiva. Não combina com o tratamento.` };
  }
  if (c.isAntiepiletico) {
    return { pergunta: `Posso beber álcool tomando ${nome}?`, resposta: `Evite. O álcool pode baixar o limiar convulsivo e reduzir a eficácia do medicamento. Risco de convulsão.` };
  }
  if (c.isAntidiabetico) {
    return { pergunta: `Posso beber álcool tomando ${nome}?`, resposta: `Evite. O álcool pode causar hipoglicemia grave, especialmente em jejum. Se consumir eventualmente, faça-o com alimentos e monitore a glicemia.` };
  }
  if (c.isAine) {
    return { pergunta: `Posso beber álcool tomando ${nome}?`, resposta: `Evite. A combinação aumenta o risco de sangramento gástrico e úlceras. Use com extrema cautela se necessário.` };
  }
  if (c.isAntiHipertensivo || c.isBetabloqueador) {
    return { pergunta: `Posso beber álcool tomando ${nome}?`, resposta: `Evite. O álcool pode causar queda brusca de pressão (hipotensão) e potencializar tontura. Prejudica o controle da pressão.` };
  }
  if (c.isCorticoide) {
    return { pergunta: `Posso beber álcool tomando ${nome}?`, resposta: `Evite. A combinação aumenta o risco de úlcera gástrica e pode interferir no sistema imune. Limite ao máximo durante o tratamento.` };
  }
  return { pergunta: `Posso beber álcool tomando ${nome}?`, resposta: `Evite ou consuma com muita moderação. O álcool pode reduzir a eficácia do tratamento e aumentar o risco de efeitos adversos como tontura e náusea.` };
}

function gerarParar(med, c) {
  const nome = med.generico || med.nome.split(' ')[0];
  if (c.isAntibiotico || c.isAntifungico || c.isAntiviral) {
    return { pergunta: `Posso parar de tomar ${nome} antes de terminar?`, resposta: `Não. Sempre complete o curso completo prescrito, mesmo sentindo melhora. Interromper cedo favorece resistência e recaída da infecção.` };
  }
  if (c.isBetabloqueador) {
    return { pergunta: `Posso parar de tomar ${nome} de repente?`, resposta: `Nunca pare abruptamente. A suspensão brusca pode causar angina rebote, infarto ou arritmia grave. O desmame deve ser gradual, sempre com orientação médica.` };
  }
  if (c.isAntidepressivo) {
    return { pergunta: `Posso parar de tomar ${nome} de repente?`, resposta: `Nunca pare abruptamente. A interrupção causa síndrome de descontinuação: tontura, choques elétricos, náusea e ansiedade. Reduza gradualmente em semanas a meses.` };
  }
  if (c.isAntiepiletico) {
    return { pergunta: `Posso interromper ${nome} por conta própria?`, resposta: `Nunca. Parar abruptamente pode desencadear crises convulsivas graves. Qualquer ajuste deve ser feito sob orientação médica, com redução gradual.` };
  }
  if (c.isAntiHipertensivo) {
    return { pergunta: `Posso parar de tomar ${nome} se me sentir bem?`, resposta: `Não. A pressão alta raramente causa sintomas — sentir-se bem não significa que está curado. Interromper sem orientação médica pode causar crise hipertensiva.` };
  }
  if (c.isAntidiabetico) {
    return { pergunta: `Posso parar de tomar ${nome} por conta própria?`, resposta: `Não. Interromper pode causar descontrole glicêmico grave. Qualquer alteração no tratamento deve ser feita sob orientação médica.` };
  }
  if (c.isCorticoide) {
    return { pergunta: `Posso parar de tomar ${nome} de repente?`, resposta: `Não, se estiver usando por mais de poucos dias. A suspensão abrupta pode causar insuficiência adrenal. O desmame deve ser gradual, sob orientação médica.` };
  }
  return { pergunta: `Posso parar o tratamento com ${nome} antes do prazo?`, resposta: `Siga exatamente o prazo prescrito pelo seu médico. Interromper antes pode comprometer a eficácia e aumentar o risco de recaída.` };
}

function gerarDiarreia(med, c) {
  const nome = med.generico || med.nome.split(' ')[0];
  const efeitos = (med.efeitos || '').toLowerCase();
  const temDiarreia = efeitos.includes('diarreia') || efeitos.includes('intestin') || efeitos.includes('fezes');
  if (c.isAntibiotico) {
    return { pergunta: `${nome} pode causar diarreia?`, resposta: `Sim. Antibióticos alteram a flora intestinal e frequentemente causam diarreia. Se for intensa, com sangue ou muco, pode ser colite associada a antibióticos — procure o médico imediatamente.` };
  }
  if (temDiarreia) {
    return { pergunta: `${nome} pode causar diarreia?`, resposta: `Sim, diarreia está entre os efeitos relatados. Se for intensa, persistente ou com sangue, informe seu médico e mantenha boa hidratação.` };
  }
  return { pergunta: `${nome} pode causar diarreia?`, resposta: `Pode ocorrer em algumas pessoas, mas não é o efeito mais comum. Mantenha hidratação adequada. Se persistir ou for intensa, informe seu médico.` };
}

function gerarJejum(med, c) {
  const nome = med.generico || med.nome.split(' ')[0];
  if (c.isLevotiroxina) {
    return { pergunta: `${nome} deve ser tomado em jejum?`, resposta: `Sim. Deve ser tomado em jejum, com água, 30 a 60 minutos antes do café da manhã. Alimentos, café e cálcio reduzem significativamente a absorção.` };
  }
  if (c.isBisfosfonato) {
    return { pergunta: `${nome} pode ser tomado com comida?`, resposta: `Não. Deve ser tomado em jejum, com copo cheio de água (200mL), 30 minutos antes de comer. Permaneça em pé por pelo menos 30 minutos após para evitar esofagite.` };
  }
  if (c.isAine) {
    return { pergunta: `Posso tomar ${nome} em jejum?`, resposta: `Não. Tome sempre com alimentos, leite ou após uma refeição. AINEs irritam a mucosa gástrica e causam úlceras se tomados com o estômago vazio.` };
  }
  if (c.isAnalgesicoSimples) {
    return { pergunta: `Posso tomar ${nome} em jejum?`, resposta: `Pode ser tomado em jejum, mas se causar desconforto gástrico, prefira tomar com alimentos ou leite.` };
  }
  if (c.isAntidiabetico && !c.isInsulina) {
    return { pergunta: `${nome} deve ser tomado com comida?`, resposta: `Sim. Tome sempre com as refeições para reduzir o desconforto intestinal e potencializar o efeito no controle glicêmico pós-prandial.` };
  }
  if (c.isAntibiotico) {
    const rec = (med.receita_nota || '').toLowerCase();
    if (rec.includes('jejum') || rec.includes('vazio')) {
      return { pergunta: `Devo tomar ${nome} em jejum?`, resposta: `Sim. Este antibiótico é melhor absorvido em jejum. Tome com água, uma hora antes das refeições, salvo orientação médica.` };
    }
    return { pergunta: `Posso tomar ${nome} com comida?`, resposta: `Sim. Pode ser tomado com ou sem alimentos. Com comida ajuda a reduzir náusea e desconforto gástrico.` };
  }
  return { pergunta: `Posso tomar ${nome} com o estômago vazio?`, resposta: `Prefira tomar com alimentos para reduzir o risco de irritação gástrica, salvo orientação específica do médico ou bula.` };
}

function gerarDependencia(med, c) {
  const nome = med.generico || med.nome.split(' ')[0];
  if (c.isBenzo) {
    return { pergunta: `${nome} causa dependência?`, resposta: `Sim. Benzodiazepínicos causam dependência física e psicológica, especialmente com uso prolongado. Nunca aumente a dose sozinho. A interrupção deve ser sempre gradual.` };
  }
  if (c.isOpioide) {
    return { pergunta: `${nome} causa dependência?`, resposta: `Sim, há risco significativo de dependência física e psicológica. Use pelo menor tempo necessário, exatamente como prescrito. Nunca aumente a dose sem orientação médica.` };
  }
  if (c.isZolpidem) {
    return { pergunta: `${nome} causa dependência?`, resposta: `Sim. Zolpidem e similares causam dependência física e psicológica com uso prolongado. Indicado apenas para uso de curta duração. Nunca aumente a dose.` };
  }
  if (c.isEstimulante) {
    return { pergunta: `${nome} causa dependência?`, resposta: `Há potencial de dependência psicológica e abuso quando usado de forma incorreta. Use exatamente como prescrito, no horário e dose indicados pelo médico.` };
  }
  if (c.isSibutramina) {
    return { pergunta: `${nome} causa dependência?`, resposta: `Pode causar dependência psicológica. É substância controlada C2, com prescrição e venda rigorosamente regulamentadas. Use apenas com acompanhamento médico.` };
  }
  return { pergunta: `${nome} causa dependência?`, resposta: `Este medicamento é controlado. Use exatamente como prescrito. Não aumente a dose nem use por período mais longo que o indicado pelo médico.` };
}

function gerarCursoCompleto(med) {
  const nome = med.generico || med.nome.split(' ')[0];
  return { pergunta: `Posso parar ${nome} antes de completar o tratamento?`, resposta: `Não. Complete sempre o curso completo prescrito, mesmo sentindo melhora antes do prazo. Interromper cedo favorece resistência e risco de recaída da infecção.` };
}

function gerarAineJejum(med) {
  const nome = med.generico || med.nome.split(' ')[0];
  return { pergunta: `Posso tomar ${nome} em jejum?`, resposta: `Não. Tome sempre com alimentos ou após refeição. Anti-inflamatórios irritam a mucosa do estômago e podem causar úlceras quando tomados com o estômago vazio.` };
}

function gerarPararRepente(med) {
  const nome = med.generico || med.nome.split(' ')[0];
  return { pergunta: `Posso parar ${nome} de repente?`, resposta: `Não. A interrupção abrupta causa síndrome de descontinuação: tontura, sensação de choques elétricos, náusea, irritabilidade e ansiedade. O desmame deve ser gradual, em semanas a meses, sempre com orientação médica.` };
}

function gerarDoseEsquecida(med, c) {
  const nome = med.generico || med.nome.split(' ')[0];
  if (c.isInsulina) {
    return { pergunta: `O que fazer se esquecer uma dose de ${nome}?`, resposta: `Para insulina, siga as orientações específicas do seu médico, pois depende do tipo (basal ou rápida) e da glicemia atual. Nunca improvise com insulina — contate seu médico ou enfermeiro.` };
  }
  return { pergunta: `O que fazer se esquecer uma dose de ${nome}?`, resposta: `Se lembrar logo, tome assim que possível. Se já estiver perto da próxima dose, pule e continue normalmente. Nunca dobre a dose para compensar a esquecida.` };
}

let modificados = 0;
data.forEach(med => {
  const faqs = med.perguntas_frequentes || [];
  const c = classificar(med);
  const novas = [];

  // Universal: álcool
  if (!temPergunta(faqs, 'álcool', 'alcool')) {
    novas.push(gerarAlcool(med, c));
  }

  // Universal: parar
  if (!temPergunta(faqs, 'parar', 'interromper', 'suspender')) {
    novas.push(gerarParar(med, c));
  }

  // Universal: diarreia
  if (!temPergunta(faqs, 'diarreia', 'intestin', 'fezes')) {
    novas.push(gerarDiarreia(med, c));
  }

  // Universal: jejum/estômago
  if (!temPergunta(faqs, 'jejum', 'estômago vazio', 'estomago vazio', 'com comida', 'refeição', 'alimenta')) {
    novas.push(gerarJejum(med, c));
  }

  // Classe: controlados → dependência
  if (c.isControlado && !temPergunta(faqs, 'dependência', 'dependencia', 'vicia', 'vício')) {
    novas.push(gerarDependencia(med, c));
  }

  // Classe: antibióticos → curso completo
  if ((c.isAntibiotico || c.isAntifungico || c.isAntiviral) && !temPergunta(faqs, 'parar antes', 'curso completo', 'terminar o curso', 'antes de terminar', 'antes do prazo')) {
    novas.push(gerarCursoCompleto(med));
  }

  // Classe: AINEs → jejum (específico se a genérica não foi adicionada)
  if (c.isAine && !temPergunta(faqs, 'jejum', 'estômago vazio', 'estomago vazio', 'com comida', 'refeição', 'alimenta') && novas.every(n => !n.pergunta.includes('jejum') && !n.pergunta.includes('estômago'))) {
    novas.push(gerarAineJejum(med));
  }

  // Classe: antidepressivos → parar de repente
  if (c.isAntidepressivo && !temPergunta(faqs, 'repente', 'abruptamente') && novas.every(n => !n.pergunta.includes('repente'))) {
    novas.push(gerarPararRepente(med));
  }

  // Classe: antidiabéticos → dose esquecida
  if (c.isAntidiabetico && !temPergunta(faqs, 'esquec', 'dose atrasada', 'dose esquecida')) {
    novas.push(gerarDoseEsquecida(med, c));
  }

  if (novas.length > 0) {
    med.perguntas_frequentes = [...faqs, ...novas];
    modificados++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Processados: ${data.length} | Modificados: ${modificados}`);
console.log('Arquivo salvo com sucesso.');
