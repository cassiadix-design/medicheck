/**
 * Regenera public/mc-interacoes-data-v3.js e public/interacoes.json
 * a partir do array mcInteracoesDB inline no index.html raiz.
 * Uso: node regenerar_v3.cjs
 */

'use strict';
const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT      = __dirname;
const HTML      = path.join(ROOT, 'index.html');
const OUT_V3    = path.join(ROOT, 'public', 'mc-interacoes-data-v3.js');
const OUT_JSON  = path.join(ROOT, 'public', 'interacoes.json');

const html = fs.readFileSync(HTML, 'utf8');

function extractArray(name) {
  const re = new RegExp(`const ${name}\\s*=\\s*(\\[[\\s\\S]*?\\n\\s*\\]);`, 'm');
  const m = html.match(re);
  if (!m) throw new Error(`Array não encontrado: ${name}`);
  const ctx = {};
  vm.runInNewContext(`result = ${m[1]}`, ctx);
  return ctx.result;
}

const mcInteracoesDB = extractArray('mcInteracoesDB');

// mcClassesDuplicacao, mcIECAnomes, mcBRAnomes vivem no v3.js — ler de lá
const v3js = fs.readFileSync(OUT_V3, 'utf8');
const ctxV3 = {};
vm.runInNewContext(v3js, ctxV3);
const mcClassesDuplicacao = ctxV3.mcClassesDuplicacao;
const mcIECAnomes         = ctxV3.mcIECAnomes;
const mcBRAnomes          = ctxV3.mcBRAnomes;

console.log(`✅ Extraídos: ${mcInteracoesDB.length} regras + ${mcClassesDuplicacao.length} duplicação`);

// ── Escrever mc-interacoes-data-v3.js ──────────────────────────────────────

const v3Content = `/* Gerado automaticamente — NÃO EDITAR. Edite index.html e rode regenerar_v3.cjs. */
var mcInteracoesDB = ${JSON.stringify(mcInteracoesDB, null, 2)};

var mcClassesDuplicacao = ${JSON.stringify(mcClassesDuplicacao, null, 2)};

var mcIECAnomes = ${JSON.stringify(mcIECAnomes)};
var mcBRAnomes  = ${JSON.stringify(mcBRAnomes)};
`;

fs.writeFileSync(OUT_V3, v3Content, 'utf8');
console.log(`✅ public/mc-interacoes-data-v3.js atualizado (${mcInteracoesDB.length} regras)`);

// ── Escrever interacoes.json ───────────────────────────────────────────────

const jsonData = {
  regras:     mcInteracoesDB,
  duplicacao: mcClassesDuplicacao,
  iecas:      mcIECAnomes,
  bras:       mcBRAnomes
};
fs.writeFileSync(OUT_JSON, JSON.stringify(jsonData, null, 2), 'utf8');
console.log(`✅ public/interacoes.json atualizado`);

console.log('\n══════════════════════════════════');
console.log(`Regras:    ${mcInteracoesDB.length}`);
console.log(`Duplicação: ${mcClassesDuplicacao.length}`);
console.log('══════════════════════════════════\n');
