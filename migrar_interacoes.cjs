/**
 * Migra todas as interações hardcoded do index.html para:
 * 1. public/interacoes.json        — fonte canônica (JSON puro)
 * 2. public/mc-interacoes-data.js  — variáveis JS globais para o verificador
 * 3. medicamentos.json             — campo "interacoes" por medicamento
 * 4. public/index.html             — remove arrays inline, adiciona <script src>
 */

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT    = __dirname;
const HTML    = path.join(ROOT, 'public', 'index.html');
const DB_FILE = path.join(ROOT, 'medicamentos.json');
const OUT_JSON = path.join(ROOT, 'public', 'interacoes.json');
const OUT_JS   = path.join(ROOT, 'public', 'mc-interacoes-data.js');

// ─── 1. Extrair os arrays do HTML ────────────────────────────────────────────

let html = fs.readFileSync(HTML, 'utf8');

function extractArray(name) {
  // Encontra "const <name> = [" até o próximo "];" sozinho na linha
  const re = new RegExp(`const ${name}\\s*=\\s*(\\[[\\s\\S]*?\\n\\s*\\]);`, 'm');
  const m = html.match(re);
  if (!m) throw new Error(`Não encontrou ${name}`);
  const ctx = {};
  vm.runInNewContext(`result = ${m[1]}`, ctx);
  return { array: ctx.result, raw: m[0] };
}

const { array: mcInteracoesDB,     raw: rawDB }   = extractArray('mcInteracoesDB');
const { array: mcClassesDuplicacao, raw: rawDup } = extractArray('mcClassesDuplicacao');

// interacoesDB (segundo verificador) — tem formato ligeiramente diferente
const re2 = /const interacoesDB\s*=\s*(\[[\s\S]*?\n\s*\]);/m;
const m2 = html.match(re2);
if (!m2) throw new Error('Não encontrou interacoesDB');
const ctxB = {};
vm.runInNewContext(`result = ${m2[1]}`, ctxB);
const interacoesDB = ctxB.result;

// mcIECAnomes / mcBRAnomes
const ieRe = /const mcIECAnomes\s*=\s*(\[[^\]]+\]);/;
const brRe = /const mcBRAnomes\s*=\s*(\[[^\]]+\]);/;
const ieM = html.match(ieRe), brM = html.match(brRe);
const ctxIE = {}, ctxBR = {};
vm.runInNewContext(`r = ${ieM[1]}`, ctxIE);
vm.runInNewContext(`r = ${brM[1]}`, ctxBR);
const mcIECAnomes = ctxIE.r;
const mcBRAnomes  = ctxBR.r;

console.log(`✅ Extraídos: ${mcInteracoesDB.length} regras + ${mcClassesDuplicacao.length} duplicação + ${interacoesDB.length} interacoesDB`);

// ─── 2. Salvar interacoes.json ────────────────────────────────────────────────

const jsonData = {
  regras:     mcInteracoesDB,
  duplicacao: mcClassesDuplicacao,
  iecas:      mcIECAnomes,
  bras:       mcBRAnomes
};
fs.writeFileSync(OUT_JSON, JSON.stringify(jsonData, null, 2), 'utf8');
console.log(`✅ public/interacoes.json salvo (${mcInteracoesDB.length} regras)`);

// ─── 3. Salvar mc-interacoes-data.js ─────────────────────────────────────────

const jsContent = `/* Gerado automaticamente — NÃO EDITAR. Edite interacoes.json e regenere. */
var mcInteracoesDB = ${JSON.stringify(mcInteracoesDB, null, 2)};

var mcClassesDuplicacao = ${JSON.stringify(mcClassesDuplicacao, null, 2)};

var mcIECAnomes = ${JSON.stringify(mcIECAnomes)};
var mcBRAnomes  = ${JSON.stringify(mcBRAnomes)};
`;
fs.writeFileSync(OUT_JS, jsContent, 'utf8');
console.log(`✅ public/mc-interacoes-data.js salvo`);

// ─── 4. Adicionar campo "interacoes" em cada medicamento ─────────────────────

const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

// Reseta interacoes para não duplicar se rodar 2x
db.forEach(m => { m.interacoes = []; });

function normalize(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

function encontrarMeds(keyword) {
  const k = normalize(keyword);
  if (k.length < 4) return []; // ignora termos genéricos muito curtos
  return db.filter(m => {
    const nome     = normalize(m.nome);
    const generico = normalize(m.generico || '');
    const sins     = (m.sinonimos || []).map(normalize);
    return (
      nome.includes(k) || k.includes(generico) ||
      generico.includes(k) || generico === k ||
      sins.some(s => s === k || s.includes(k) || k.includes(s))
    );
  });
}

let totalLinks = 0;

for (const rule of mcInteracoesDB) {
  const entrada = { nivel: rule.nivel, titulo: rule.titulo, efeito: rule.efeito, conduta: rule.conduta };

  // Para cada palavra-chave em med1: esse med interage com med2
  for (const kw of rule.med1) {
    for (const med of encontrarMeds(kw)) {
      if (!med.interacoes.some(i => i.titulo === rule.titulo && JSON.stringify(i.com) === JSON.stringify(rule.med2))) {
        med.interacoes.push({ com: rule.med2, ...entrada });
        totalLinks++;
      }
    }
  }

  // Para cada palavra-chave em med2: esse med interage com med1
  for (const kw of rule.med2) {
    for (const med of encontrarMeds(kw)) {
      if (!med.interacoes.some(i => i.titulo === rule.titulo && JSON.stringify(i.com) === JSON.stringify(rule.med1))) {
        med.interacoes.push({ com: rule.med1, ...entrada });
        totalLinks++;
      }
    }
  }
}

// Duplicação terapêutica → também adiciona ao interacoes de cada med
for (const cls of mcClassesDuplicacao) {
  const dup = {
    tipo: 'duplicacao',
    classe: cls.classe,
    nivel: cls.nivel,
    titulo: cls.titulo,
    efeito: cls.efeito,
    conduta: cls.conduta
  };
  for (const kw of cls.medicamentos) {
    for (const med of encontrarMeds(kw)) {
      if (!med.interacoes.some(i => i.tipo === 'duplicacao' && i.classe === cls.classe)) {
        med.interacoes.push(dup);
        totalLinks++;
      }
    }
  }
}

// Remove meds sem interações (mantém campo mas vazio)
const comInteracoes = db.filter(m => m.interacoes.length > 0).length;
console.log(`✅ ${comInteracoes} medicamentos com interações registradas (${totalLinks} links totais)`);

fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log(`✅ medicamentos.json atualizado`);

// ─── 5. Atualizar index.html ──────────────────────────────────────────────────

// 5a. Remove mcInteracoesDB inline
html = html.replace(rawDB, '/* mcInteracoesDB movido para mc-interacoes-data.js */');

// 5b. Remove mcClassesDuplicacao inline
html = html.replace(rawDup, '/* mcClassesDuplicacao movido para mc-interacoes-data.js */');

// 5c. Remove mcIECAnomes e mcBRAnomes inline (serão globais do arquivo externo)
html = html.replace(/\s*const mcIECAnomes\s*=\s*\[[^\]]+\];/, '');
html = html.replace(/\s*const mcBRAnomes\s*=\s*\[[^\]]+\];/, '');

// 5d. Remove interacoesDB inline (segundo verificador) — substitui por referência ao mcInteracoesDB
html = html.replace(
  /\/\/ Dados de interações para busca\s*\nconst interacoesDB\s*=\s*\[[\s\S]*?\];/m,
  '// interacoesDB removido — usa mcInteracoesDB global (mc-interacoes-data.js)'
);

// 5e. Atualiza buscarInteracao() para usar mcInteracoesDB em vez de interacoesDB
html = html.replace(
  'for (const inter of interacoesDB) {',
  'for (const inter of mcInteracoesDB) {'
);

// 5f. Adiciona <script src> antes do primeiro <script> que continha mcInteracoesDB
//     (procura pelo script que vem antes da linha onde estava a declaração)
html = html.replace(
  /<script>\s*\n\s*\/\* mcInteracoesDB/,
  '<script src="/mc-interacoes-data.js"></script>\n\n                <script>\n                /* mcInteracoesDB'
);

fs.writeFileSync(HTML, html, 'utf8');
console.log(`✅ public/index.html atualizado`);

// ─── 6. Relatório final ───────────────────────────────────────────────────────

console.log('\n══════════════════════════════════════════');
console.log('MIGRAÇÃO CONCLUÍDA');
console.log(`  Regras de interação:   ${mcInteracoesDB.length}`);
console.log(`  Regras de duplicação:  ${mcClassesDuplicacao.length}`);
console.log(`  Medicamentos com int.: ${comInteracoes} / ${db.length}`);
console.log(`  Links med→interação:   ${totalLinks}`);
console.log('══════════════════════════════════════════\n');
