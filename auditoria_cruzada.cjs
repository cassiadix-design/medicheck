// Auditoria cruzada: medicamentos.json × mc-interacoes-data-v3.js
// Grupo 1: medicamentos no JSON sem nenhuma interação cadastrada
// Grupo 2: nomes nas interações que não têm entrada no JSON
const fs   = require('fs');
const path = require('path');

const MEDS_PATH = path.join(__dirname, 'medicamentos.json');
const INT_PATH  = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');
const OUT_PATH  = path.join(__dirname, 'auditoria_cruzada.txt');

// ─── Normalização ─────────────────────────────────────────────────────────────
const removerAcentos = s =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

// ─── 1. Carregar medicamentos.json ────────────────────────────────────────────
const meds = JSON.parse(fs.readFileSync(MEDS_PATH, 'utf-8'));

// Excluir tópicos, vitaminas simples e insumos de saúde (não são sistêmicos/interativos)
const EXCLUIR_TIPOS = new Set([
  'tópico','topico','vitamina','suplemento','insumo','curativo','cosmético',
  'dermatológico','dermatologico','higiene','antisséptico','antisseptico',
]);
function isExcluido(med) {
  const tipo = (med.tipo || '').toLowerCase();
  return EXCLUIR_TIPOS.has(tipo) ||
         tipo.includes('tópic') || tipo.includes('topic') ||
         tipo.includes('vitamina') || tipo.includes('suplemento') ||
         tipo.includes('insumo') || tipo.includes('cosmét');
}

// Construir mapa: nome_normalizado → {nome, generico}
const medsMap = new Map();
for (const m of meds) {
  const chaves = [m.generico, m.nome, ...(m.sinonimos || [])].filter(Boolean);
  for (const c of chaves) {
    medsMap.set(removerAcentos(c), { nome: m.nome, generico: m.generico, tipo: m.tipo, excluido: isExcluido(m) });
  }
}

// ─── 2. Carregar interações ───────────────────────────────────────────────────
const raw = fs.readFileSync(INT_PATH, 'utf-8');
const arr1 = JSON.parse(raw.match(/var\s+mcInteracoesDB\s*=\s*(\[[\s\S]*?\]);\s*\n/)[1]);
const allInteracoes = [...arr1];
for (const m of raw.matchAll(/mcInteracoesDB\s*=\s*mcInteracoesDB\.concat\s*\(\s*(\[[\s\S]*?\])\s*\)/g)) {
  allInteracoes.push(...JSON.parse(m[1]));
}

// Todos os nomes/alias nas interações (med1 e med2)
const nomesNasInteracoes = new Set();
for (const inter of allInteracoes) {
  for (const n of [...(inter.med1 || []), ...(inter.med2 || [])]) {
    nomesNasInteracoes.add(removerAcentos(n));
  }
}

// ─── 3. Medicamentos no JSON sem interações ───────────────────────────────────
// Para cada entrada de medicamentos.json, verificar se algum dos seus nomes/sinônimos
// aparece como med1 ou med2 em alguma interação do DB
const semInteracao = [];
const comInteracao = new Set();

for (const med of meds) {
  if (isExcluido(med)) continue;

  const chaves = [med.generico, med.nome, ...(med.sinonimos || [])].filter(Boolean);
  const normalizado = chaves.map(removerAcentos);

  let found = false;
  for (const n of normalizado) {
    if (nomesNasInteracoes.has(n)) { found = true; break; }
  }

  if (found) {
    comInteracao.add(med.generico || med.nome);
  } else {
    semInteracao.push(med.generico || med.nome);
  }
}

semInteracao.sort((a, b) => a.localeCompare(b, 'pt'));

// ─── 4. Nomes nas interações sem entrada no medicamentos.json ─────────────────
// Filtros: excluir alimentos, bebidas, classes genéricas, eletrólitos, etc.
const EXCLUIR_INTERACOES = new Set([
  // Alimentos e vegetais
  'alface','couve','couve-de-bruxelas','brocolis','espinafre','repolho','salsinha','coentro',
  'laranja','limao','toranja','grapefruit','arando','cranberry',
  'suco de grapefruit','suco de laranja','suco de toranja','suco de maca','suco de cranberry',
  'sumo de toranja','suco de maca','suco de romã',
  'leite','laticinios','leite de soja','tofu','soja',
  'carne','carne defumada','frango','frios','salaminho','embutidos','linguica','peixe','figado',
  'queijo curado','queijo maturado','molho de soja',
  'farelo de aveia','farelo de trigo','fibras','psyllium','proteina',
  'alho','gengibre','curcuma','ginkgo','ginkgo biloba','alcachofra',
  // Bebidas
  'alcool','etanol','bebida','bebida alcoolica','bebida energetica',
  'cerveja','vinho','vinho tinto','cachaca',
  'cafe','cafe coado','cafe expresso','cha','cha preto','cha verde',
  // Tabaco (tem suas próprias entradas no DB de interações)
  'tabaco','tabagismo','nicotina','fumo','cigarro',
  // Classes genéricas
  'aine','anti-inflamatorio','antiacido','antiacido com aluminio','antiacido com mg',
  'ieca','inibidor da eca','bra','sartana',
  'betabloqueador','betabloqueadores',
  'opioide','opioides','triptano',
  'anticoagulante','anticoagulante oral',
  'corticoide','corticosteroide','corticosteroide sistemico',
  'imunossupressor',
  'anti-hipertensivo','antiarritmico','antidepressivo','antidiabetico',
  'anti-histaminico','antiretroviral','antirretroviral','anti-tnf',
  'antidepressivo triciclico','antipsicótico tipico','anticontraceptivo',
  'barbiturico','benzodiazepínico','biologico',
  'bloqueador neuromuscular','depressor snc','descongestionante',
  'diuretico','diuretico tiazidico','diureticos tiazidicos','tiazidico',
  'estatinas','cefalosporinas','fluoroquinolona','quinolona',
  'aminoglicosideo','aminoglicosideos','penicilina',
  'sulfonilureia',
  'inibidor cox-2','inibidor de bomba de protons','inibidor de mao','inibidor mao','inibidor pde5',
  'imao','isrs','laba','ibp',
  'contraceptivo','contraceptivo oral','contraceptivo oral combinado','anticoncepcional oral',
  'estrogeno','estrogênio','progestogeênio','progesterona generica',
  // Vacinas genéricas
  'vacina bcg','vacina de virus vivo','vacina febre amarela','vacina rotavirus',
  'vacina sarampo','vacina varicela','vacina viva','bcg',
  // Eletrólitos / minerais
  'potassio','calcio','ferro','sais de potassio','sais de aluminio','sal de potassio',
  'sal diet','sal light','cloreto de potassio','gluconato de potassio',
  'ferro oral','ferro iv','ferro sacarato',
  'bicarbonato','bicarbonato de sodio',
  'hidroxido de aluminio','hidroxido de magnesio',
  'citrato de calcio','carbonato de calcio',
  // Substâncias / termos gerais
  'tiramina','mucolytic','amilase','amilase pancreatica','enzimas digestivas','gadolinio',
  'insulina',
]);

const semEntradaNoJson = [];
const medsNormalizados = new Set(medsMap.keys());

for (const nomeNorm of nomesNasInteracoes) {
  if (medsNormalizados.has(nomeNorm)) continue;
  if (EXCLUIR_INTERACOES.has(nomeNorm)) continue;
  semEntradaNoJson.push(nomeNorm);
}
semEntradaNoJson.sort((a, b) => a.localeCompare(b, 'pt'));

// ─── 5. Relatório ─────────────────────────────────────────────────────────────
const linhas = [];
const now = new Date().toLocaleDateString('pt-BR');

linhas.push('═══════════════════════════════════════════════════════════════════════════');
linhas.push('  AUDITORIA CRUZADA: medicamentos.json × mc-interacoes-data-v3.js');
linhas.push(`  Data: ${now}`);
linhas.push('═══════════════════════════════════════════════════════════════════════════');
linhas.push('');
linhas.push(`  Total medicamentos.json:              ${meds.length}`);
linhas.push(`  Excluídos (tópicos/vitaminas/insumos): analisados individualmente`);
linhas.push(`  Com interação cadastrada:              ${comInteracao.size}`);
linhas.push(`  SEM interação cadastrada:              ${semInteracao.length}`);
linhas.push('');
linhas.push(`  Nomes únicos nas interações:           ${nomesNasInteracoes.size}`);
linhas.push(`  Sem entrada no medicamentos.json:      ${semEntradaNoJson.length}`);
linhas.push('');

linhas.push('───────────────────────────────────────────────────────────────────────────');
linhas.push(`  GRUPO 1 — No medicamentos.json mas SEM interação cadastrada (${semInteracao.length})`);
linhas.push('───────────────────────────────────────────────────────────────────────────');
linhas.push('  (excluídos tópicos, vitaminas simples e insumos)');
linhas.push('');
for (const n of semInteracao) linhas.push(`  ○ ${n}`);
linhas.push('');

linhas.push('───────────────────────────────────────────────────────────────────────────');
linhas.push(`  GRUPO 2 — Nas interações mas SEM entrada no medicamentos.json (${semEntradaNoJson.length})`);
linhas.push('───────────────────────────────────────────────────────────────────────────');
linhas.push('  (filtradas classes genéricas, alimentos, eletrólitos e inespecíficos)');
linhas.push('');
for (const n of semEntradaNoJson) linhas.push(`  ✗ ${n}`);
linhas.push('');
linhas.push('═══════════════════════════════════════════════════════════════════════════');

const relatorio = linhas.join('\n');
console.log(relatorio);
fs.writeFileSync(OUT_PATH, relatorio, 'utf-8');
console.log('\n✓ Relatório salvo em auditoria_cruzada.txt');
