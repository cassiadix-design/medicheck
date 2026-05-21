// Auditoria cruzada: mc-interacoes-data-v3.js × mcMedNomes (index.html)
// Adiciona ao mcMedNomes todos os nomes de medicamentos/substâncias que aparecem
// nas interações mas não estão no array de autocomplete.
const fs = require('fs');
const path = require('path');

const INT_PATH  = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');
const HTML_PATH = path.join(__dirname, 'index.html');

// ─── Termos excluídos: alimentos, bebidas, tabaco, classes genéricas ──────────
const EXCLUIR = new Set([
  // Alimentos e vegetais
  'alface','couve','couve-de-bruxelas','brócolis','espinafre','repolho','salsinha','coentro',
  'laranja','limão','toranja','grapefruit','arando','cranberry',
  'suco de grapefruit','suco de laranja','suco de toranja','suco de maçã','suco de cranberry','sumo de toranja',
  'leite','laticínios','leite de soja','tofu','soja',
  'carne','carne defumada','frango','frios','salaminho','embutidos','linguiça','peixe','fígado',
  'queijo curado','queijo maturado','molho de soja',
  'farelo de aveia','farelo de trigo','fibras','psyllium','proteína',

  // Bebidas
  'álcool','alcool','etanol','bebida','bebida alcoólica','bebida energética',
  'cerveja','vinho','vinho tinto','cachaça',
  'café','café coado','café expresso','chá','chá preto','chá verde',

  // Tabaco
  'tabaco','tabagismo','nicotina','fumo','cigarro',

  // Classes genéricas de medicamentos (não são termos de busca individuais)
  'aine','anti-inflamatório','antiácido','antiácido com alumínio','antiácido com mg',
  'ieca','inibidor da eca','bra','sartana',
  'betabloqueador','betabloqueadores',
  'opioide','opioides','triptano',
  'anticoagulante','anticoagulante oral',
  'corticoide','corticosteroide','corticosteroide sistêmico',
  'imunossupressor',
  'anti-hipertensivo','antiarrítmico','antidepressivo','antidiabético',
  'anti-histamínico','antiretroviral','antirretroviral','anti-tnf',
  'antidepressivo tricíclico','antipsicótico típico','anticontraceptivo',
  'barbitúrico','benzodiazepínico','biologico',
  'bloqueador neuromuscular',
  'depressor snc','descongestionante',
  'diurético','diurético tiazídico','diuréticos tiazídicos','tiazídico',
  'estatinas','cefalosporinas','fluoroquinolona','quinolona',
  'aminoglicosídeo','aminoglicosídeos','penicilina',
  'sulfonilureia',
  'inibidor cox-2','inibidor de bomba de prótons','inibidor de mao','inibidor mao','inibidor pde5',
  'imao','isrs','laba','ibp',
  'contraceptivo','contraceptivo oral','contraceptivo oral combinado','anticoncepcional oral',
  'estrogeno','estrogênio','progestogênio',

  // Vacinas genéricas
  'vacina bcg','vacina de vírus vivo','vacina febre amarela','vacina rotavírus',
  'vacina sarampo','vacina varicela','vacina viva','bcg',

  // Fatores de coagulação genéricos
  'fator ix','fator vii',

  // Eletrólitos / minerais genéricos (representações vagas)
  'potássio','cálcio','ferro','sais de potássio','sais de alumínio','sal de potássio',
  'sal diet','sal light','cloreto de potássio','gluconato de potássio',
  'ferro oral','ferro iv','ferro sacarato',
  'bicarbonato','bicarbonato de sódio',
  'hidróxido de alumínio','hidróxido de magnésio',
  'citrato de cálcio','carbonato de cálcio',

  // Substâncias / termos gerais não-medicamentos
  'tiramina','mucolytic','amilase','amilase pancreática','enzimas digestivas','gadolínio',
  'insulina', // já há insulinas específicas no mcMedNomes
]);

// ─── Capitalização ────────────────────────────────────────────────────────────
const MAIUSCULAS = new Set(['nac','cbd','thc','azt','ddi','epa','dha','ptu','ibp','t4','iv','im']);
const MINUSCULAS_INTERNAS = new Set(['de','do','da','dos','das','e','em','por','para','com','a','o','+','/']);

function capitalizar(s) {
  return s.split(/\s+/).map((word, idx) => {
    const lw = word.toLowerCase();
    if (MAIUSCULAS.has(lw)) return lw.toUpperCase();
    if (idx > 0 && MINUSCULAS_INTERNAS.has(lw)) return lw;
    // Preservar acento na primeira letra
    return lw.charAt(0).toUpperCase() + lw.slice(1);
  }).join(' ');
}

// ─── 1. Extrair todos os nomes das interações ─────────────────────────────────
const raw = fs.readFileSync(INT_PATH, 'utf-8');
const arr1 = JSON.parse(raw.match(/var\s+mcInteracoesDB\s*=\s*(\[[\s\S]*?\]);\s*\n/)[1]);
const allInteracoes = [...arr1];
for (const cm of raw.matchAll(/mcInteracoesDB\s*=\s*mcInteracoesDB\.concat\s*\(\s*(\[[\s\S]*?\])\s*\)/g)) {
  allInteracoes.push(...JSON.parse(cm[1]));
}

const nomesInteracoes = new Set();
for (const inter of allInteracoes) {
  for (const n of [...(inter.med1 || []), ...(inter.med2 || [])]) {
    nomesInteracoes.add(n.toLowerCase().trim());
  }
}

// ─── 2. Carregar mcMedNomes ───────────────────────────────────────────────────
let html = fs.readFileSync(HTML_PATH, 'utf-8');
const mcLine = html.split('\n').find(l => l.includes('const mcMedNomes'));
let mcArr = JSON.parse(mcLine.match(/const mcMedNomes = (\[.*\])/)[1]);
const mcSet = new Set(mcArr.map(n => n.toLowerCase().trim()));

// ─── 3. Classificar: o que adicionar vs excluir ───────────────────────────────
const paraAdicionar = [];
const excluidos     = [];

for (const nome of [...nomesInteracoes].sort()) {
  if (mcSet.has(nome)) continue; // já existe
  if (EXCLUIR.has(nome)) {
    excluidos.push(nome);
    continue;
  }
  paraAdicionar.push(nome);
}

// ─── 4. Adicionar ao mcArr (ordem alfabética) ─────────────────────────────────
for (const nome of paraAdicionar) {
  const display = capitalizar(nome);
  // Inserir em posição alfabética
  const idx = mcArr.findIndex(n => n.toLowerCase().localeCompare(display.toLowerCase(), 'pt') > 0);
  if (idx === -1) {
    mcArr.push(display);
  } else {
    mcArr.splice(idx, 0, display);
  }
  mcSet.add(nome);
}

// ─── 5. Salvar index.html ─────────────────────────────────────────────────────
if (paraAdicionar.length > 0) {
  const novaLinha = 'const mcMedNomes = ' + JSON.stringify(mcArr) + ';';
  html = html.replace(/const mcMedNomes = \[.*?\];/, novaLinha);
  fs.writeFileSync(HTML_PATH, html, 'utf-8');
}

// ─── 6. Relatório ─────────────────────────────────────────────────────────────
const linhas = [];
linhas.push('═══════════════════════════════════════════════════════════════════');
linhas.push('  AUDITORIA: mc-interacoes-data-v3.js × mcMedNomes (index.html)');
linhas.push(`  Data: ${new Date().toLocaleDateString('pt-BR')}`);
linhas.push('═══════════════════════════════════════════════════════════════════');
linhas.push('');
linhas.push(`  Nomes únicos nas interações:  ${nomesInteracoes.size}`);
linhas.push(`  Já presentes no mcMedNomes:   ${nomesInteracoes.size - paraAdicionar.length - excluidos.length}`);
linhas.push(`  Excluídos (alimentos/classes): ${excluidos.length}`);
linhas.push(`  ADICIONADOS ao mcMedNomes:    ${paraAdicionar.length}`);
linhas.push(`  Total mcMedNomes após update:  ${mcArr.length}`);
linhas.push('');
linhas.push('─── ADICIONADOS ────────────────────────────────────────────────────');
linhas.push(`  (${paraAdicionar.length} nomes)`);
linhas.push('');
for (const n of paraAdicionar) linhas.push(`  + ${capitalizar(n)}`);
linhas.push('');
linhas.push('─── EXCLUÍDOS (alimentos, bebidas, classes genéricas) ───────────────');
linhas.push(`  (${excluidos.length} termos)`);
linhas.push('');
for (const n of excluidos) linhas.push(`  ✗ ${n}`);
linhas.push('');
linhas.push('═══════════════════════════════════════════════════════════════════');

const relatorio = linhas.join('\n');
console.log(relatorio);
fs.writeFileSync(path.join(__dirname, 'auditoria_mcMedNomes.txt'), relatorio, 'utf-8');
console.log('\n✓ Relatório salvo em auditoria_mcMedNomes.txt');
if (paraAdicionar.length > 0) {
  console.log(`✓ index.html atualizado — ${paraAdicionar.length} nomes adicionados ao mcMedNomes`);
}
