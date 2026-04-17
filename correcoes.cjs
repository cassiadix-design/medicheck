const fs = require('fs');
const FILE = 'C:/Users/Usuario/Desktop/medicheck/medicamentos.json';
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// ── 1. CORRIGIR DIPIRONA SOLO (Anador e Novalgina) ──────────────────────────
const dipisoloFix = ['Anador — Dipirona Sódica', 'Novalgina — Dipirona Sódica'];
for (const med of data) {
  if (dipisoloFix.includes(med.nome)) {
    med.receita = 'Não';
    med.receita_display = '🟢 Venda Livre — MIP';
    med.receita_cor = 'verde';
    med.receita_descricao = 'Venda livre — MIP (Medicamento Isento de Prescrição). Pode ser adquirido sem receita médica.';
    med.receita_obrigatoria = false;
    med.tipo_receita = 'MIP';
    console.log('Corrigido:', med.nome);
  }
  // Dipirona comprimido tem receita:Sim mas display venda livre — corrigir campo receita
  if (med.nome === 'Dipirona comprimido 500 mg - 1,0 g - Gotas - Xarope - Injetável') {
    med.receita = 'Não';
    console.log('Corrigido receita:', med.nome);
  }
}

// ── 2. NOVOS MEDICAMENTOS ────────────────────────────────────────────────────
const novos = [
  {
    "nome": "Buscopan — Butilbrometo de Escopolamina 10mg",
    "generico": "Butilbrometo de Escopolamina",
    "tipo": "Antiespasmódico / Anticolinérgico",
    "sinonimos": ["buscopan", "escopolamina", "butilbrometo", "antiespasmódico", "cólica", "espasmo intestinal", "buscopan simples"],
    "descricao": "Antiespasmódico anticolinérgico de ação periférica. Relaxa a musculatura lisa do trato gastrointestinal, urinário e biliar. Indicado para cólicas abdominais, espasmos gastrointestinais e biliares, dismenorreia e cólica renal. Não atravessa a barreira hematoencefálica.",
    "receita": "Não",
    "receita_display": "🟢 Venda Livre — MIP",
    "receita_cor": "verde",
    "receita_descricao": "Venda livre — MIP (Medicamento Isento de Prescrição). Pode ser adquirido sem receita médica.",
    "receita_nota": "Adultos: 1–2 comprimidos, 3–5 vezes ao dia. Crianças acima de 6 anos: 1 comprimido, 3 vezes ao dia.",
    "efeitos": "Boca seca, visão turva, taquicardia, retenção urinária — efeitos anticolinérgicos, geralmente leves e temporários com o uso oral.",
    "aviso_grave": "Contraindicado em glaucoma de ângulo fechado, hiperplasia prostática com retenção urinária e miastenia grave. Em crianças menores de 6 anos, usar apenas sob orientação médica.",
    "recomendacao": "⚠️ Cólica que não mede em minutos com antiespasmódico deve ser avaliada por médico — pode indicar apendicite, obstrução intestinal ou outras causas que requerem diagnóstico.",
    "educacao": "O Buscopan simples (escopolamina pura) age somente no espasmo muscular — não tem efeito analgésico. Para dores associadas ao espasmo, o Buscopan Composto (com Dipirona) oferece também analgesia.",
    "resposta_rapida": [
      "Cólica intestinal e biliar",
      "Venda livre — MIP",
      "Não é analgésico — só antiespasmódico",
      "Cuidado em glaucoma e próstata aumentada",
      "Buscopan Composto tem Dipirona + escopolamina"
    ],
    "receita_obrigatoria": false,
    "tipo_receita": "MIP",
    "retencao_receita": false,
    "perguntas_frequentes": [
      {
        "pergunta": "Buscopan dói estômago?",
        "resposta": "Não costuma causar dor gástrica. Age na musculatura lisa sem irritar a mucosa. Pode causar boca seca e, raramente, desconforto digestivo leve."
      },
      {
        "pergunta": "Buscopan simples e Buscopan Composto são a mesma coisa?",
        "resposta": "Não. O Buscopan simples contém apenas butilbrometo de escopolamina (antiespasmódico). O Buscopan Composto tem escopolamina mais Dipirona (analgésico). Para dores com espasmo, o Composto é mais eficaz."
      },
      {
        "pergunta": "Posso beber álcool tomando Buscopan?",
        "resposta": "Evite. O álcool pode potencializar os efeitos anticolinérgicos (boca seca, taquicardia). Para uso ocasional em cólica aguda, o risco é baixo, mas não é recomendado."
      },
      {
        "pergunta": "Posso parar de tomar Buscopan por conta própria?",
        "resposta": "Sim, é usado sob demanda para alívio de cólica. Não há necessidade de curso contínuo. Se as cólicas forem frequentes, busque avaliação médica para investigar a causa."
      },
      {
        "pergunta": "Buscopan pode causar diarreia?",
        "resposta": "Ao contrário — pode causar leve constipação pelos efeitos anticolinérgicos na motilidade intestinal. Diarreia não é efeito esperado."
      },
      {
        "pergunta": "Posso tomar Buscopan com estômago vazio?",
        "resposta": "Sim, pode ser tomado com ou sem alimentos. Para cólicas em jejum, pode ser usado normalmente."
      },
      {
        "pergunta": "Buscopan funciona para cólica menstrual?",
        "resposta": "Sim, a escopolamina relaxa a musculatura uterina e alivia cólicas menstruais (dismenorreia). O Buscopan Composto (com Dipirona) oferece efeito adicional analgésico."
      }
    ],
    "alerta_farmaceutico": "Erro comum no balcão: paciente com glaucoma de ângulo fechado ou hiperplasia prostática solicita Buscopan sem informar as condições — anticolinérgicos podem precipitar crise de glaucoma agudo ou retenção urinária. Sempre perguntar sobre essas condições.",
    "quando_procurar_medico": "Procure médico se: cólica não ceder após 1–2 comprimidos, dor abdominal intensa e progressiva (pode ser apendicite ou obstrução), cólica com febre e calafrios (infecção), vômitos persistentes ou rigidez abdominal.",
    "descricao_seo": "Buscopan (Butilbrometo de Escopolamina 10mg) é um antiespasmódico de venda livre indicado para cólicas intestinais, biliares e menstruais. Não contém analgésico — para dor associada, usar Buscopan Composto."
  },
  {
    "nome": "Tropinal — Butilbrometo de Escopolamina 10mg",
    "generico": "Butilbrometo de Escopolamina",
    "tipo": "Antiespasmódico / Anticolinérgico",
    "sinonimos": ["tropinal", "escopolamina", "butilbrometo", "antiespasmódico", "cólica", "tropinal comprimido"],
    "descricao": "Antiespasmódico anticolinérgico de ação periférica — mesma substância ativa do Buscopan simples. Relaxa a musculatura lisa do trato gastrointestinal, urinário e biliar. Indicado para cólicas abdominais, espasmos gastrointestinais e biliares e dismenorreia.",
    "receita": "Não",
    "receita_display": "🟢 Venda Livre — MIP",
    "receita_cor": "verde",
    "receita_descricao": "Venda livre — MIP (Medicamento Isento de Prescrição). Pode ser adquirido sem receita médica.",
    "receita_nota": "Adultos: 1–2 comprimidos, 3–5 vezes ao dia. Crianças acima de 6 anos: 1 comprimido, 3 vezes ao dia.",
    "efeitos": "Boca seca, visão turva, taquicardia leve, retenção urinária — efeitos anticolinérgicos periféricos, geralmente leves com o uso oral.",
    "aviso_grave": "Contraindicado em glaucoma de ângulo fechado, hiperplasia prostática com retenção urinária e miastenia grave. Em crianças menores de 6 anos, usar apenas sob orientação médica.",
    "recomendacao": "⚠️ Cólica que não melhora em minutos com antiespasmódico deve ser avaliada por médico — pode indicar apendicite, obstrução intestinal ou outras causas que requerem diagnóstico imediato.",
    "educacao": "Tropinal e Buscopan simples têm a mesma substância ativa (butilbrometo de escopolamina) e são bioequivalentes. A escolha entre eles é apenas de marca e disponibilidade. Nenhum dos dois tem efeito analgésico.",
    "resposta_rapida": [
      "Mesma substância do Buscopan simples",
      "Venda livre — MIP",
      "Somente antiespasmódico — sem analgesia",
      "Não usar em glaucoma de ângulo fechado",
      "Cólica recorrente requer investigação médica"
    ],
    "receita_obrigatoria": false,
    "tipo_receita": "MIP",
    "retencao_receita": false,
    "perguntas_frequentes": [
      {
        "pergunta": "Tropinal é igual ao Buscopan?",
        "resposta": "Sim, Tropinal e Buscopan simples têm a mesma substância ativa (butilbrometo de escopolamina 10mg) e o mesmo mecanismo. São bioequivalentes — a diferença é apenas o fabricante."
      },
      {
        "pergunta": "Posso beber álcool tomando Tropinal?",
        "resposta": "Evite. O álcool pode potencializar efeitos anticolinérgicos como taquicardia e boca seca. Para uso pontual em cólica aguda, o risco é baixo, mas não é recomendado."
      },
      {
        "pergunta": "Posso parar de tomar Tropinal por conta própria?",
        "resposta": "Sim, é usada sob demanda. Se as cólicas forem frequentes ou intensas, busque avaliação médica para investigar a causa."
      },
      {
        "pergunta": "Tropinal pode causar diarreia?",
        "resposta": "Não — pelo contrário, pode causar leve constipação pelos efeitos anticolinérgicos na motilidade intestinal."
      },
      {
        "pergunta": "Posso tomar Tropinal com estômago vazio?",
        "resposta": "Sim, pode ser tomado com ou sem alimentos."
      }
    ],
    "alerta_farmaceutico": "Erro comum no balcão: paciente com glaucoma ou próstata aumentada solicita Tropinal sem informar as condições — anticolinérgicos podem precipitar retenção urinária aguda ou crise de glaucoma. Perguntar sempre sobre essas condições antes de dispensar.",
    "quando_procurar_medico": "Procure médico se: cólica não ceder após 1–2 comprimidos, dor abdominal intensa e progressiva, cólica acompanhada de febre, vômitos persistentes ou rigidez abdominal — podem indicar condição cirúrgica urgente.",
    "descricao_seo": "Tropinal (Butilbrometo de Escopolamina 10mg) é um antiespasmódico de venda livre, bioequivalente ao Buscopan simples, indicado para cólicas intestinais, biliares e menstruais."
  },
  {
    "nome": "Fexofenadina 60mg - 120mg - 180mg — Suspensão (Allegra)",
    "generico": "Fexofenadina",
    "tipo": "Anti-histamínico",
    "sinonimos": ["fexofenadina", "allegra", "allegra 120", "allegra 180", "allegra 60", "fexofenadina 120mg", "fexofenadina 180mg", "anti-histamínico"],
    "descricao": "Anti-histamínico de segunda geração, não sedativo. Bloqueia os receptores H1 periféricos sem atravessar significativamente a barreira hematoencefálica. Indicado para rinite alérgica sazonal e perene e urticária crônica idiopática. Uma das opções com menor efeito sedativo entre os anti-histamínicos disponíveis.",
    "receita": "Não",
    "receita_display": "🟢 Venda Livre — MIP",
    "receita_cor": "verde",
    "receita_descricao": "Venda livre — MIP (Medicamento Isento de Prescrição). Pode ser adquirido sem receita médica.",
    "receita_nota": "Adultos: 120mg 1x/dia (rinite) ou 180mg 1x/dia (urticária). Crianças 6–11 anos: 30mg 2x/dia (suspensão). Tomar com água — evitar sucos cítricos.",
    "efeitos": "Cefaleia, náusea, tontura, sonolência (rara). Considerado um dos anti-histamínicos mais bem tolerados, com mínimo efeito sedativo.",
    "aviso_grave": "Evitar suco de pomelo (grapefruit), laranja ou maçã no horário da dose — reduzem a absorção em até 36%. Reduzir dose em insuficiência renal grave.",
    "recomendacao": "Tomar com água, 30 minutos antes ou 2h após sucos cítricos. Pode ser tomado com ou sem alimentos. Comprimidos não devem ser partidos.",
    "educacao": "Diferente dos anti-histamínicos de 1ª geração (clorfeniramina, difenidramina), a fexofenadina não causa sonolência e não prejudica dirigir ou trabalhar. Ótima opção para pacientes que precisam de anti-histamínico durante o dia.",
    "resposta_rapida": [
      "Rinite alérgica e urticária crônica",
      "Venda livre — MIP",
      "Mínima ou nenhuma sonolência",
      "Evitar sucos cítricos no horário da dose",
      "120mg (rinite) ou 180mg (urticária)"
    ],
    "receita_obrigatoria": false,
    "tipo_receita": "MIP",
    "retencao_receita": false,
    "perguntas_frequentes": [
      {
        "pergunta": "Fexofenadina dá sono?",
        "resposta": "Raramente. É um dos anti-histamínicos com menor efeito sedativo — pode ser usado durante o dia sem prejudicar dirigir ou trabalhar, diferente dos de primeira geração."
      },
      {
        "pergunta": "Posso tomar fexofenadina com suco?",
        "resposta": "Não com sucos cítricos (laranja, maçã, grapefruit) — reduzem a absorção em até 36%, comprometendo o efeito. Tomar sempre com água."
      },
      {
        "pergunta": "Qual a diferença entre Allegra 120 e 180?",
        "resposta": "Allegra 120mg é indicado para rinite alérgica, 1x ao dia. Allegra 180mg é indicado para urticária crônica idiopática, também 1x ao dia. Ambos são venda livre."
      },
      {
        "pergunta": "Posso beber álcool tomando fexofenadina?",
        "resposta": "Com cautela. Embora a fexofenadina cause pouca sedação, o álcool pode potencializar qualquer efeito sobre o sistema nervoso. Modere o consumo."
      },
      {
        "pergunta": "Posso parar de tomar fexofenadina por conta própria?",
        "resposta": "Sim, para crises agudas pode ser interrompida quando os sintomas cessam. Para rinite crônica ou urticária contínua, siga a orientação médica sobre a duração."
      },
      {
        "pergunta": "Fexofenadina pode causar diarreia?",
        "resposta": "Raramente. Náusea e desconforto digestivo são possíveis mas incomuns. Se ocorrer diarreia intensa, informe seu médico."
      },
      {
        "pergunta": "Posso tomar fexofenadina com estômago vazio?",
        "resposta": "Sim, pode ser tomada com ou sem alimentos. O importante é evitar sucos cítricos no horário da dose."
      }
    ],
    "alerta_farmaceutico": "Erro comum no balcão: paciente toma fexofenadina com suco de laranja ou maçã — esses sucos reduzem a absorção em até 36%, comprometendo o efeito antialérgico. Orientar sempre a tomar com água.",
    "quando_procurar_medico": "Procure médico se: sintomas alérgicos não melhorarem em 3–5 dias, surgir inchaço nos lábios, língua ou garganta (angioedema — emergência), febre junto com urticária ou piora progressiva dos sintomas.",
    "descricao_seo": "Fexofenadina (Allegra) 60mg, 120mg e 180mg é um anti-histamínico de segunda geração, venda livre, indicado para rinite alérgica e urticária crônica. Causa mínima sonolência. Evitar sucos cítricos no horário da dose."
  },
  {
    "nome": "Allegra D — Fexofenadina 60mg + Pseudoefedrina 120mg",
    "generico": "Fexofenadina + Pseudoefedrina",
    "tipo": "Anti-histamínico + Descongestionante",
    "sinonimos": ["allegra d", "fexofenadina pseudoefedrina", "allegra d 60/120", "anti-histamínico descongestionante", "allegra d tarjado"],
    "descricao": "Combinação de anti-histamínico não sedativo (fexofenadina 60mg) com descongestionante simpatomimético de ação central (pseudoefedrina 120mg, liberação prolongada). Indicado para rinite alérgica sazonal com congestão nasal. A pseudoefedrina estimula receptores alfa-adrenérgicos da mucosa nasal, reduzindo o edema e a obstrução.",
    "receita": "Sim",
    "receita_display": "🔴 Receita Simples",
    "receita_cor": "vermelho",
    "receita_descricao": "Exige prescrição médica. Contém pseudoefedrina — substância sujeita a rastreamento especial pela Anvisa (Portaria SVS/MS 344/98 atualizada). A receita não é retida na farmácia.",
    "receita_nota": "1 comprimido de liberação prolongada, 2x ao dia (manhã e tarde). Não partir, mastigar ou triturar. Tomar com água — evitar sucos cítricos.",
    "efeitos": "Insônia, nervosismo, taquicardia, palpitações, aumento da pressão arterial, boca seca — principalmente relacionados à pseudoefedrina.",
    "aviso_grave": "Contraindicado em hipertensão não controlada, doenças cardíacas, hipertireoidismo, glaucoma de ângulo fechado, uso de IMAO (14 dias de intervalo) e crianças menores de 12 anos. Não usar por mais de 7 dias seguidos.",
    "recomendacao": "⚠️ Não usar à noite — a pseudoefedrina é estimulante e causa insônia. Preferir pela manhã e início da tarde. Hipertensos devem consultar o médico antes do uso.",
    "educacao": "Apesar do nome similar, o Allegra D e o Allegra comum são muito diferentes: o D contém pseudoefedrina (controlada), eleva a pressão, causa insônia e exige receita. O comum (fexofenadina pura) é venda livre e não tem esses riscos.",
    "resposta_rapida": [
      "Rinite alérgica com congestão nasal",
      "Receita simples obrigatória",
      "Contém pseudoefedrina — controla a pressão",
      "Não usar à noite (insônia)",
      "Diferente do Allegra comum (venda livre)"
    ],
    "receita_obrigatoria": true,
    "tipo_receita": "simples",
    "retencao_receita": false,
    "perguntas_frequentes": [
      {
        "pergunta": "Allegra D eleva a pressão?",
        "resposta": "Sim. A pseudoefedrina pode elevar a pressão arterial. Hipertensos devem evitar ou usar apenas com autorização e monitoramento médico regular."
      },
      {
        "pergunta": "Posso tomar Allegra D à noite?",
        "resposta": "Não. A pseudoefedrina é estimulante e causa insônia intensa se tomada à noite. Tomar pela manhã e, no máximo, início da tarde."
      },
      {
        "pergunta": "Allegra D é o mesmo que Allegra?",
        "resposta": "Não. O Allegra D contém fexofenadina mais pseudoefedrina (descongestionante controlado) e exige receita. O Allegra comum tem apenas fexofenadina e é venda livre."
      },
      {
        "pergunta": "Posso beber álcool tomando Allegra D?",
        "resposta": "Evitar. O álcool pode interagir com a pseudoefedrina causando aumento da frequência cardíaca e da pressão arterial."
      },
      {
        "pergunta": "Posso parar de tomar Allegra D por conta própria?",
        "resposta": "Sim para uso sintomático. Não deve ser usado por mais de 7 dias seguidos sem reavaliação médica."
      },
      {
        "pergunta": "Allegra D pode causar diarreia?",
        "resposta": "Raramente. Os efeitos mais comuns são os da pseudoefedrina: insônia, nervosismo, taquicardia. Desconforto digestivo é possível mas incomum."
      },
      {
        "pergunta": "Posso tomar Allegra D com estômago vazio?",
        "resposta": "Pode ser tomado com ou sem alimentos. Evitar sucos cítricos (laranja, maçã, grapefruit) — reduzem a absorção da fexofenadina."
      }
    ],
    "alerta_farmaceutico": "Erro comum no balcão: dispensar Allegra D sem receita por confundir com o Allegra comum (venda livre) — o Allegra D contém pseudoefedrina e exige prescrição. Verificar sempre se o produto solicitado é o simples ou o D antes de dispensar.",
    "quando_procurar_medico": "Procure médico se: pressão arterial subir significativamente após o uso, surgir palpitações intensas ou dor no peito, insônia grave que interfira nas atividades, ou sintomas nasais não melhorarem em 7 dias.",
    "descricao_seo": "Allegra D (Fexofenadina 60mg + Pseudoefedrina 120mg) é indicado para rinite alérgica com congestão nasal. Exige receita médica. Contém pseudoefedrina — contraindicado em hipertensão não controlada."
  }
];

// Adicionar apenas os que não existem
for (const novo of novos) {
  const jaExiste = data.some(m => m.nome === novo.nome);
  if (!jaExiste) {
    data.push(novo);
    console.log('Adicionado:', novo.nome);
  } else {
    console.log('Já existe:', novo.nome);
  }
}

data.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');
console.log('\nTotal medicamentos:', data.length);
