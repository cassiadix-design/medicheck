// Auditoria de consistência: medicamentos.json × mc-interacoes-data-v3.js
const fs = require('fs');
const path = require('path');

// ─── 1. Carregar banco principal ───────────────────────────────────────────
const medsJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'medicamentos.json'), 'utf-8'));

// Extrair todos os nomes/sinônimos do banco principal (em lowercase)
const bancoPrincipal = new Map(); // slug → { nome, generico, sinonimos }
const todosNomesPrincipal = new Set();

for (const med of medsJson) {
  const nomes = [];
  if (med.nome) nomes.push(med.nome.toLowerCase().trim());
  if (med.generico) nomes.push(med.generico.toLowerCase().trim());
  if (Array.isArray(med.sinonimos)) {
    for (const s of med.sinonimos) nomes.push(s.toLowerCase().trim());
  }
  const chave = (med.generico || med.nome || '').toLowerCase().trim();
  bancoPrincipal.set(chave, { nome: med.nome, generico: med.generico, sinonimos: med.sinonimos || [], todosNomes: nomes });
  for (const n of nomes) todosNomesPrincipal.add(n);
}

// ─── 2. Carregar banco de interações ──────────────────────────────────────
const interacoesRaw = fs.readFileSync(path.join(__dirname, 'public', 'mc-interacoes-data-v3.js'), 'utf-8');

// Extrair o array principal: var mcInteracoesDB = [...];
const match1 = interacoesRaw.match(/var\s+mcInteracoesDB\s*=\s*(\[[\s\S]*?\]);\s*\n/);
if (!match1) {
  console.error('Não conseguiu extrair array principal de interações');
  process.exit(1);
}
const interacoes = JSON.parse(match1[1]);

// Extrair todos os blocos concat: mcInteracoesDB = mcInteracoesDB.concat([...]);
for (const cm of interacoesRaw.matchAll(/mcInteracoesDB\s*=\s*mcInteracoesDB\.concat\s*\(\s*(\[[\s\S]*?\])\s*\)/g)) {
  interacoes.push(...JSON.parse(cm[1]));
}

// Coletar todos os nomes únicos citados nas interações
const nomesNasInteracoes = new Set();
const interacoesPorMed = new Map(); // nome → Set de índices de interações

for (let i = 0; i < interacoes.length; i++) {
  const int = interacoes[i];
  const todos = [...(int.med1 || []), ...(int.med2 || [])];
  for (const n of todos) {
    const nome = n.toLowerCase().trim();
    nomesNasInteracoes.add(nome);
    if (!interacoesPorMed.has(nome)) interacoesPorMed.set(nome, new Set());
    interacoesPorMed.get(nome).add(i);
  }
}

// ─── 3. Análise cruzada ───────────────────────────────────────────────────

// Medicamentos do banco principal SEM interações cadastradas
const semInteracao = [];
for (const [chave, med] of bancoPrincipal) {
  const temInteracao = med.todosNomes.some(n => interacoesPorMed.has(n));
  if (!temInteracao) {
    semInteracao.push({ generico: med.generico, nome: med.nome });
  }
}

// Nomes citados nas interações que NÃO aparecem no banco principal
const palavrasIgnorar = new Set([
  'álcool', 'alcool', 'etanol', 'bebida alcoólica', 'bebida', 'vinho', 'cerveja', 'cachaça',
  'suco de grapefruit', 'toranja', 'grapefruit', 'sumo de toranja', 'suco de toranja',
  'vitamina k', 'couve', 'espinafre', 'brócolis', 'repolho', 'couve-de-bruxelas', 'alface',
  'salsinha', 'coentro', 'leite', 'tiramina', 'teofilina', 'cafeína',
  'antiácido', 'ibp', 'ieca', 'bra', 'aine', 'sulfonilureia', 'anticoncepcional',
  'contraceptivo', 'antirretroviral', 'aminoglicosídeo', 'betabloqueador', 'triptano',
  'opioide', 'opioides', 'imao', 'magnésio', 'potássio', 'cálcio', 'zinco', 'ferro',
  'erva de são joão', 'hipericão', 'hypericum', 'erva-de-são-joão', 'hypericum perforatum',
  'ginkgo biloba', 'ginkgo', 'extrato de ginkgo', 'fluoroquinolona',
  'diurético', 'suplemento de potássio', 'cloreto de potássio', 'eplerenona'
]);

const citadosSemCadastro = [];
for (const nome of nomesNasInteracoes) {
  if (!todosNomesPrincipal.has(nome) && !palavrasIgnorar.has(nome)) {
    citadosSemCadastro.push(nome);
  }
}
citadosSemCadastro.sort();

// ─── 4. Estatísticas gerais ───────────────────────────────────────────────
const totalPrincipal = medsJson.length;
const totalInteracoes = interacoes.length;
const totalNomesInteracoes = nomesNasInteracoes.size;
const totalComInteracao = totalPrincipal - semInteracao.length;

// ─── 5. Relatório ─────────────────────────────────────────────────────────
const linhas = [];

linhas.push('═══════════════════════════════════════════════════════════════════');
linhas.push('  AUDITORIA DE CONSISTÊNCIA — MEDICHECK');
linhas.push(`  Data: ${new Date().toLocaleDateString('pt-BR')}`);
linhas.push('═══════════════════════════════════════════════════════════════════');
linhas.push('');

linhas.push('─── NÚMEROS GERAIS ─────────────────────────────────────────────────');
linhas.push(`  Total de medicamentos no banco principal (medicamentos.json): ${totalPrincipal}`);
linhas.push(`  Total de pares de interação em mc-interacoes-data-v3.js:      ${totalInteracoes}`);
linhas.push(`  Nomes únicos citados nas interações (excl. alimentos/classes): ${totalNomesInteracoes}`);
linhas.push(`  Medicamentos do banco principal COM interação cadastrada:      ${totalComInteracao}`);
linhas.push(`  Medicamentos do banco principal SEM nenhuma interação:         ${semInteracao.length}`);
linhas.push(`  Nomes nas interações que não estão no banco principal:         ${citadosSemCadastro.length}`);
linhas.push('');

linhas.push('─── MEDICAMENTOS DO BANCO PRINCIPAL SEM INTERAÇÃO CADASTRADA ───────');
linhas.push(`  (${semInteracao.length} medicamentos)`);
linhas.push('');
semInteracao.sort((a, b) => (a.generico || a.nome).localeCompare(b.generico || b.nome));
for (const m of semInteracao) {
  linhas.push(`  • ${m.generico || m.nome}`);
}
linhas.push('');

linhas.push('─── NOMES NAS INTERAÇÕES NÃO ENCONTRADOS NO BANCO PRINCIPAL ─────────');
linhas.push(`  (${citadosSemCadastro.length} nomes — excluídos alimentos, bebidas e classes genéricas)`);
linhas.push('');
for (const n of citadosSemCadastro) {
  linhas.push(`  • ${n}`);
}
linhas.push('');

linhas.push('═══════════════════════════════════════════════════════════════════');

const relatorio = linhas.join('\n');
console.log(relatorio);
fs.writeFileSync(path.join(__dirname, 'auditoria_consistencia.txt'), relatorio, 'utf-8');
console.log('\n✓ Relatório salvo em auditoria_consistencia.txt');
