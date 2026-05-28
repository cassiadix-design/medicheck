const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'medicamentos.json');
const meds = JSON.parse(fs.readFileSync(FILE, 'utf8'));

let fixedReceita = 0;
const log = [];

// ─── PARTE 1: Corrigir campo `receita` ───────────────────────────────────────

for (const med of meds) {
  const obrig = med.receita_obrigatoria;
  const receita = med.receita;
  const tipo = med.tipo_receita;

  // Caso especial: Toxina Botulínica → receita="Sim", mantém receita_obrigatoria=false e tipo=procedimento_clinico
  if (med.nome.includes('Toxina Botulínica')) {
    if (receita !== 'Sim') {
      log.push(`[ESPECIAL] ${med.nome}: "${receita}" → "Sim"  (procedimento clínico requer autorização médica)`);
      med.receita = 'Sim';
      fixedReceita++;
    }
    continue;
  }

  // Grupo A: receita_obrigatoria=true mas receita!="Sim"
  if (obrig === true && receita !== 'Sim') {
    log.push(`[A] ${med.nome}: "${receita}" → "Sim"  (receita_obrigatoria=true)`);
    med.receita = 'Sim';
    fixedReceita++;
    continue;
  }

  // Grupo B: receita_obrigatoria=false mas receita!="Não"
  if (obrig === false && receita !== 'Não') {
    log.push(`[B] ${med.nome}: "${receita}" → "Não"  (receita_obrigatoria=false, tipo=${tipo})`);
    med.receita = 'Não';
    fixedReceita++;
  }
}

// ─── PARTE 2: Interações corretas da Acetilcisteína/NAC ──────────────────────

const interacoesCorretasNAC = [
  {
    com: ['nitroglicerina', 'isossorbida', 'nitrato'],
    nivel: 'alto',
    titulo: 'NAC + Nitrato Orgânico',
    efeito: 'NAC potencializa a vasodilatação via óxido nítrico — pode causar cefaleia intensa e hipotensão grave.',
    conduta: '❌ Evitar combinação. Se necessário, iniciar nitrato em dose baixa e monitorar pressão arterial.'
  },
  {
    com: ['carvão ativado'],
    nivel: 'alto',
    titulo: 'NAC + Carvão Ativado',
    efeito: 'Carvão ativado adsorve a NAC no trato gastrointestinal, reduzindo sua absorção e eficácia antidotal em casos de intoxicação por paracetamol.',
    conduta: '❌ Administrar NAC intravenosa ou com intervalo mínimo de 2 horas se via oral. Preferir NAC IV em intoxicações graves.'
  },
  {
    com: ['codeína', 'dextrometorfano', 'noscapina'],
    nivel: 'moderado',
    titulo: 'Mucolítico + Antitussígeno',
    efeito: 'NAC fluidifica as secreções, mas antitussígenos suprimem o reflexo da tosse que as elimina — pode causar acúmulo de muco nas vias aéreas.',
    conduta: '⚠️ Evitar combinação. Tratar a causa da tosse produtiva, não suprimi-la.'
  },
  {
    com: ['amoxicilina', 'tetraciclina', 'ampicilina'],
    nivel: 'baixo',
    titulo: 'NAC + Antibiótico (espaçamento)',
    efeito: 'NAC pode reduzir a absorção de alguns antibióticos por quelação ou alteração do pH local.',
    conduta: '✅ Tomar com intervalo de 2 horas entre o mucolítico e o antibiótico.'
  }
];

const alvosNAC = [
  'Acetilcisteína 100mg - 200mg - 600mg - Injetável',
  'NAC 600mg — N-Acetilcisteína'
];

let nacLog = [];

for (const med of meds) {
  if (!alvosNAC.includes(med.nome)) continue;

  const antes = Array.isArray(med.interacoes) ? med.interacoes.length : 0;
  const titlesAntes = Array.isArray(med.interacoes)
    ? med.interacoes.map(i => `  - [${i.nivel || '?'}] ${i.titulo}`)
    : [];

  med.interacoes = interacoesCorretasNAC;

  log.push(`[NAC] ${med.nome}: ${antes} interações removidas, ${med.interacoes.length} corretas inseridas`);
  nacLog.push({ nome: med.nome, removidas: titlesAntes });
}

// ─── SALVAR ──────────────────────────────────────────────────────────────────

fs.writeFileSync(FILE, JSON.stringify(meds, null, 4), 'utf8');

// ─── RELATÓRIO ───────────────────────────────────────────────────────────────

console.log('\n════════════════════════════════════════════════════');
console.log('  MEDICHECK — CORREÇÕES APLICADAS');
console.log('════════════════════════════════════════════════════\n');

console.log('── Campo `receita` ──────────────────────────────────');
log.filter(l => !l.startsWith('[NAC]')).forEach(l => console.log(l));
console.log(`\nTotal campo receita corrigido: ${fixedReceita} medicamentos\n`);

console.log('── Interações Acetilcisteína/NAC ────────────────────');
log.filter(l => l.startsWith('[NAC]')).forEach(l => console.log(l));

console.log('\n── Diff: interações REMOVIDAS ───────────────────────');
nacLog.forEach(n => {
  console.log(`\n${n.nome}:`);
  n.removidas.forEach(t => console.log(t));
});

console.log('\n── Interações INSERIDAS (iguais nos 2 registros) ────');
interacoesCorretasNAC.forEach(i => {
  console.log(`  + [${i.nivel}] ${i.titulo}  (com: ${i.com.join(', ')})`);
});

console.log('\n════════════════════════════════════════════════════');
console.log('  medicamentos.json salvo com sucesso.');
console.log('════════════════════════════════════════════════════\n');
