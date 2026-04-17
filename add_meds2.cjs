const fs = require('fs');
const FILE = 'C:/Users/Usuario/Desktop/medicheck/medicamentos.json';
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

const novos = [
  {
    nome: 'Dexclorfeniramina + Betametasona (Celestamine)',
    generico: 'Dexclorfeniramina + Betametasona',
    tipo: 'Anti-histamínico + Corticoide',
    sinonimos: ['celestamine','dexclorfeniramina betametasona','anti-histamínico corticoide','alergia corticoide'],
    descricao: 'Combinação de anti-histamínico de primeira geração (dexclorfeniramina 2mg) com corticoide sistêmico (betametasona 0,25mg). Indicado para reações alérgicas agudas moderadas a graves: urticária intensa, angioedema, rinite alérgica grave e dermatoses alérgicas que não respondem a anti-histamínico isolado.',
    receita: 'Sim',
    receita_display: '🔴 Receita Simples',
    receita_cor: 'vermelho',
    receita_descricao: 'Exige prescrição médica. A receita não é retida na farmácia.',
    receita_nota: 'Dose usual: 1 comprimido, 2 a 3 vezes ao dia. Não deve ser usado por períodos prolongados devido ao corticoide.',
    efeitos: 'Sonolência intensa (dexclorfeniramina), aumento do apetite, retenção hídrica, elevação da glicemia, insônia paradoxal (betametasona) e boca seca.',
    aviso_grave: 'Não usar em infecções ativas sem tratamento — o corticoide suprime a resposta imune e pode mascarar ou agravar infecções. Não usar cronicamente — causa supressão adrenal, diabetes e osteoporose.',
    recomendacao: 'Uso destinado a curtos períodos, máximo 5 a 7 dias. Evitar dirigir — a dexclorfeniramina causa sedação intensa. Tomar com alimentos para reduzir irritação gástrica.',
    educacao: 'O Celestamine contém corticoide sistêmico além do anti-histamínico — por isso age mais rapidamente em crises alérgicas graves. O corticoide não deve ser usado de forma habitual para qualquer alergia pela gravidade dos efeitos com uso prolongado.',
    resposta_rapida: [
      'Alergia aguda moderada a grave',
      'Receita simples',
      'Máximo 5 a 7 dias de uso',
      'Causa sonolência intensa',
      'Não misturar com álcool'
    ],
    receita_obrigatoria: true,
    tipo_receita: 'simples',
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: 'Celestamine dá sono?', resposta: 'Sim, sonolência intensa é o efeito mais comum — é um anti-histamínico de primeira geração. Evitar dirigir ou operar máquinas durante o uso.' },
      { pergunta: 'Posso tomar Celestamine para qualquer alergia?', resposta: 'Não. Por conter corticoide, deve ser reservado para alergias moderadas a graves que não respondem a anti-histamínico simples. Uso habitual e prolongado não é recomendado.' },
      { pergunta: 'Posso beber álcool tomando Celestamine?', resposta: 'Não. O álcool potencializa a sedação da dexclorfeniramina e pode causar depressão intensa do sistema nervoso central.' },
      { pergunta: 'Posso parar o Celestamine de repente?', resposta: 'Para uso curto de até 7 dias, pode ser interrompido sem desmame. Uso prolongado exige retirada gradual do corticoide para evitar insuficiência adrenal.' },
      { pergunta: 'Celestamine pode causar diarreia?', resposta: 'Raramente. Os efeitos mais comuns são sonolência, aumento do apetite e retenção hídrica. Desconforto gástrico leve pode ocorrer — tomar com alimento.' },
      { pergunta: 'Posso tomar Celestamine com estômago vazio?', resposta: 'Prefira tomar com alimentos — o corticoide pode causar irritação gástrica em jejum.' }
    ],
    alerta_farmaceutico: 'Erro comum no balcão: paciente usa Celestamine cronicamente para qualquer coceira ou rinite, comprando repetidamente sem consulta — o corticoide sistêmico causa supressão adrenal, diabetes e osteoporose com uso prolongado. Orientar que é para uso agudo e curto.',
    quando_procurar_medico: 'Procure médico se: inchaço no rosto, lábios ou garganta (angioedema — emergência), falta de ar, urticária que não cede após 1 a 2 doses, febre junto com alergia ou sintomas que retornam repetidamente.',
    descricao_seo: 'Dexclorfeniramina + Betametasona (Celestamine) é um anti-histamínico com corticoide indicado para alergias agudas moderadas a graves. Exige receita médica. Não usar por períodos prolongados.'
  },
  {
    nome: 'Carbocisteína 250mg - 375mg — Xarope e Cápsulas',
    generico: 'Carbocisteína',
    tipo: 'Mucolítico / Expectorante',
    sinonimos: ['carbocisteína','mucosolvan','fluimucil','expectorante','muco','catarro','tosse com catarro','mucolítico'],
    descricao: 'Mucolítico que age diretamente na estrutura do muco, reduzindo sua viscosidade e facilitando a expectoração. Indicado para tosse produtiva com muco espesso em bronquite, gripe, sinusite e doenças respiratórias com hipersecreção. Regula a produção de muco pelo epitélio respiratório.',
    receita: 'Não',
    receita_display: '🟢 Venda Livre — MIP',
    receita_cor: 'verde',
    receita_descricao: 'Venda livre — MIP (Medicamento Isento de Prescrição). Pode ser adquirido sem receita médica.',
    receita_nota: 'Adultos: 750mg, 3 vezes ao dia. Crianças: dose conforme peso, preferencialmente xarope pediátrico. Tomar com bastante água.',
    efeitos: 'Náusea, diarreia, dor abdominal — geralmente leves. Raramente reação alérgica cutânea.',
    aviso_grave: 'Contraindicado em úlcera gástrica ativa. Usar com cautela em crianças menores de 2 anos. Não usar em tosse seca — não tem efeito e pode aumentar o desconforto.',
    recomendacao: 'Beber bastante água durante o tratamento — a hidratação potencializa o efeito mucolítico. Indicado apenas para tosse produtiva, não para tosse seca.',
    educacao: 'A carbocisteína é diferente da acetilcisteína: age regulando as células que produzem muco, normalizando a proporção entre muco espesso e fluido, tornando o catarro mais fácil de eliminar com a tosse.',
    resposta_rapida: [
      'Tosse com catarro espesso',
      'Venda livre — MIP',
      'Beber bastante água',
      'Não usar em tosse seca',
      'Contraindicado em úlcera gástrica ativa'
    ],
    receita_obrigatoria: false,
    tipo_receita: 'MIP',
    retencao_receita: false,
    perguntas_frequentes: [
      { pergunta: 'Carbocisteína é o mesmo que acetilcisteína?', resposta: 'Não. Ambas são mucolíticas mas agem de formas diferentes. A carbocisteína regula a produção de muco; a acetilcisteína quebra pontes dissulfeto do muco. Ambas fluidificam o catarro mas por mecanismos distintos.' },
      { pergunta: 'Posso beber álcool tomando carbocisteína?', resposta: 'Evite. O álcool pode irritar a mucosa respiratória e reduzir a eficácia do tratamento.' },
      { pergunta: 'Posso parar de tomar carbocisteína por conta própria?', resposta: 'Sim, para tosse aguda pode ser interrompida quando os sintomas melhoram. Se a tosse produtiva persistir por mais de 2 semanas, busque avaliação médica.' },
      { pergunta: 'Carbocisteína pode causar diarreia?', resposta: 'Sim, diarreia e náusea são efeitos possíveis, geralmente leves. Tomar com alimento pode reduzir o desconforto gástrico.' },
      { pergunta: 'Posso tomar carbocisteína com estômago vazio?', resposta: 'Prefira tomar com alimentos — reduz a chance de irritação gástrica. Contraindicada em úlcera gástrica ativa.' }
    ],
    alerta_farmaceutico: 'Erro comum no balcão: dispensar carbocisteína para tosse seca — mucolíticos só têm efeito em tosse produtiva com catarro. Em tosse seca, o medicamento não ajuda e pode aumentar o desconforto. Perguntar sempre o tipo de tosse antes de dispensar.',
    quando_procurar_medico: 'Procure médico se: tosse com catarro persistir por mais de 2 semanas, catarro com sangue ou coloração verde-escura com febre (infecção bacteriana), falta de ar associada à tosse ou piora progressiva dos sintomas.',
    descricao_seo: 'Carbocisteína 250mg-375mg (xarope e cápsulas) é um mucolítico de venda livre indicado para tosse produtiva com catarro espesso. Age regulando a produção de muco. Não usar em tosse seca.'
  }
];

for (const novo of novos) {
  const jaExiste = data.some(m => m.nome === novo.nome);
  if (!jaExiste) { data.push(novo); console.log('Adicionado:', novo.nome); }
  else console.log('Ja existe:', novo.nome);
}

data.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');
console.log('Total:', data.length);
