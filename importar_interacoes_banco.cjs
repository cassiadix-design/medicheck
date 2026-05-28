// importar_interacoes_banco.cjs
// Importa interacoes[] do medicamentos.json → mcInteracoesDB no index.html
// Roda regenerar_v3.cjs ao final para atualizar mc-interacoes-data-v3.js

'use strict';
const fs            = require('fs');
const path          = require('path');
const { execSync }  = require('child_process');

const ROOT       = __dirname;
const MED_JSON   = path.join(ROOT, 'medicamentos.json');
const INDEX_HTML = path.join(ROOT, 'index.html');

// ─── helpers ──────────────────────────────────────────────────────────────────

function semAcento(s) {
  return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function norm(s) {
  return semAcento(s).toLowerCase().trim();
}

function mapNivel(nivel) {
  const mapa = { contraindicado: 'alto', leve: 'baixo' };
  return mapa[nivel] || nivel || 'moderado';
}

// Extrai med2 do titulo: "MedA + MedB / MedC (texto)" → ["medb", "medc"]
function med2DoTitulo(titulo) {
  // pega tudo após o primeiro " + "
  const idx = titulo.indexOf(' + ');
  if (idx === -1) return [];
  let parte = titulo.slice(idx + 3);
  // remove conteúdo entre parênteses
  parte = parte.replace(/\s*\([^)]*\)/g, '').trim();
  // split por " / " ou "," — preserva termos compostos
  const termos = parte
    .split(/\s*[\/,]\s*/)
    .map(t => norm(t))
    .filter(t => t.length > 1);
  return [...new Set(termos)];
}

// Extrai todos os títulos já presentes no mcInteracoesDB do index.html
function extrairTitulosAtuais(html) {
  const set = new Set();
  // captura tanto aspas simples quanto duplas
  const re = /titulo\s*:\s*(['"])(.*?)\1/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    set.add(m[2].toLowerCase().trim());
  }
  return set;
}

// Encontra o índice do "]" que fecha o mcInteracoesDB (contagem de colchetes)
function encontrarFimArray(html) {
  const marcador = 'const mcInteracoesDB = [';
  const start = html.indexOf(marcador);
  if (start === -1) throw new Error('const mcInteracoesDB não encontrado no index.html');

  let abreIdx = html.indexOf('[', start);
  let depth    = 0;
  let inStr    = false;
  let strChar  = '';

  for (let i = abreIdx; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (c === '\\')   { i++; continue; }
      if (c === strChar) inStr = false;
    } else {
      if (c === '"' || c === "'") { inStr = true; strChar = c; }
      else if (c === '[') depth++;
      else if (c === ']') {
        depth--;
        if (depth === 0) return i;
      }
    }
  }
  throw new Error('Fechamento do array mcInteracoesDB não encontrado');
}

// Serializa uma entrada como linha JS (double-quotes, sem mecanismo/conduta)
function serializar(e) {
  const f = (v) => JSON.stringify(v);
  let s = `{ med1: ${f(e.med1)}, med2: ${f(e.med2)}, nivel: ${f(e.nivel)}, titulo: ${f(e.titulo)}`;
  if (e.efeito)  s += `, efeito: ${f(e.efeito)}`;
  if (e.conduta) s += `, conduta: ${f(e.conduta)}`;
  s += ' }';
  return s;
}

// ─── main ─────────────────────────────────────────────────────────────────────

console.log('\n══════════════════════════════════════════');
console.log('  IMPORTAR INTERAÇÕES → mcInteracoesDB');
console.log('══════════════════════════════════════════\n');

// 1. Lê medicamentos.json
const rawDb = fs.readFileSync(MED_JSON, 'utf8');
const db    = JSON.parse(rawDb);
const lista = Array.isArray(db) ? db : db.medicamentos || Object.values(db);
console.log(`📦 Medicamentos no banco : ${lista.length}`);

// 2. Lê index.html e extrai títulos existentes
const html            = fs.readFileSync(INDEX_HTML, 'utf8');
const titulosExist    = extrairTitulosAtuais(html);
const titulosVistos   = new Set(titulosExist);
console.log(`📋 Títulos no mcInteracoesDB atual : ${titulosExist.size}`);

// 3. Converte interacoes[] → entradas mcInteracoesDB
let totalBanco     = 0;
let totalDuplicata = 0;
let totalNovas     = 0;
let semMed2        = 0;
const novas = [];

for (const med of lista) {
  if (!Array.isArray(med.interacoes) || med.interacoes.length === 0) continue;

  // med1: nome + sinonimos[] se existirem
  const med1 = [norm(med.nome || '')].filter(Boolean);
  if (Array.isArray(med.sinonimos)) {
    med.sinonimos.forEach(s => {
      const sn = norm(s);
      if (sn && !med1.includes(sn)) med1.push(sn);
    });
  }

  for (const inter of med.interacoes) {
    totalBanco++;
    const titulo = (inter.titulo || '').trim();
    if (!titulo) continue;

    const chave = titulo.toLowerCase().trim();
    if (titulosVistos.has(chave)) {
      totalDuplicata++;
      continue;
    }
    titulosVistos.add(chave);

    // med2: extraído do título
    let med2 = med2DoTitulo(titulo);
    // fallback: usa com[] se titulo não produziu resultado
    if (med2.length === 0 && Array.isArray(inter.com)) {
      med2 = inter.com.map(c => norm(c)).filter(Boolean);
    }
    if (med2.length === 0) semMed2++;

    const entrada = {
      med1,
      med2,
      nivel:   mapNivel(inter.nivel),
      titulo,
      efeito:  inter.descricao || inter.efeito  || '',
      conduta: inter.conduta   || '',
    };
    // remove campos vazios
    if (!entrada.efeito)  delete entrada.efeito;
    if (!entrada.conduta) delete entrada.conduta;

    novas.push(entrada);
    totalNovas++;
  }
}

console.log(`\n📊 Total interações no banco    : ${totalBanco}`);
console.log(`⏭️  Duplicatas ignoradas         : ${totalDuplicata}`);
console.log(`✅ Novas a importar             : ${totalNovas}`);
if (semMed2 > 0) console.log(`⚠️  Sem med2 extraível do título: ${semMed2}`);

if (totalNovas === 0) {
  console.log('\nNenhuma nova interação para importar. index.html não alterado.');
  process.exit(0);
}

// 4. Injeta novas entradas no array do index.html
const indent     = '                    '; // 20 espaços (nível do array)
const linhas     = novas.map(e => indent + serializar(e));
const blocoNovo  = ',\n' + linhas.join(',\n') + '\n                ';

const fimIdx     = encontrarFimArray(html);
const htmlNovo   = html.slice(0, fimIdx) + blocoNovo + html.slice(fimIdx);

fs.writeFileSync(INDEX_HTML, htmlNovo, 'utf8');
console.log(`\n✅ index.html salvo com ${totalNovas} novas entradas`);

// 5. Roda regenerar_v3.cjs
console.log('\n🔄 Rodando regenerar_v3.cjs...');
try {
  const out = execSync('node regenerar_v3.cjs', { cwd: ROOT, encoding: 'utf8' });
  process.stdout.write(out);
} catch (err) {
  console.error('❌ Erro em regenerar_v3.cjs:', err.message);
  process.exit(1);
}

// 6. Relatório final
const htmlFinal    = fs.readFileSync(INDEX_HTML, 'utf8');
const totalFinal   = extrairTitulosAtuais(htmlFinal).size;

console.log('\n══════════════════════════════════════════');
console.log('  RELATÓRIO FINAL');
console.log('══════════════════════════════════════════');
console.log(`📦 Interações no medicamentos.json : ${totalBanco}`);
console.log(`⏭️  Duplicatas ignoradas            : ${totalDuplicata}`);
console.log(`✅ Novas importadas                : ${totalNovas}`);
console.log(`📋 Total no mcInteracoesDB agora   : ${totalFinal}`);
console.log('══════════════════════════════════════════\n');
