const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/Usuario/Desktop/medicheck';
const data = JSON.parse(fs.readFileSync(path.join(BASE, 'medicamentos.json'), 'utf8'));

function slugify(text) {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-').replace(/^-|-$/g, '');
}

// Mapa: slug completo do nome → medicamento
const slugNomeMap = {};
data.forEach(m => { slugNomeMap[slugify(m.nome)] = m; });

function findMedByH1(h1) {
  const s = slugify(h1);

  // 1. exact slug match
  if (slugNomeMap[s]) return slugNomeMap[s];

  // 2. exact object search
  const exact = data.find(m => slugify(m.nome) === s);
  if (exact) return exact;

  // 3. prefix/contains match — find all candidates
  const candidates = data.filter(m => {
    const ms = slugify(m.nome);
    return ms.startsWith(s) || s.startsWith(ms);
  });
  if (candidates.length === 1) return candidates[0];
  if (candidates.length > 1) {
    // pick longest med slug (most specific)
    return candidates.reduce((a, b) => slugify(a.nome).length >= slugify(b.nome).length ? a : b);
  }

  // 4. h1 words contained in nome
  const words = s.split('-').filter(w => w.length > 3);
  if (words.length > 0) {
    const byWords = data.filter(m => words.every(w => slugify(m.nome).includes(w)));
    if (byWords.length === 1) return byWords[0];
    if (byWords.length > 1) {
      return byWords.reduce((a, b) => slugify(a.nome).length >= slugify(b.nome).length ? a : b);
    }
  }

  return null;
}

function faqHtml(faqs) {
  if (!faqs || faqs.length === 0) return '';
  const items = faqs.map(f => `
                    <details style="background:#f8f9fa;border:1px solid #dee2e6;border-radius:10px;padding:14px 18px;cursor:pointer;">
                        <summary style="font-weight:700;font-size:15px;color:#333;list-style:none;display:flex;justify-content:space-between;align-items:center;">
                            ${f.pergunta}
                            <span style="font-size:18px;color:#667eea;">＋</span>
                        </summary>
                        <div style="margin-top:10px;font-size:15px;color:#555;line-height:1.8;">${f.resposta}</div>
                    </details>`).join('\n');
  return `
            <div style="margin-top:30px;">
                <div class="section-title">❓ Perguntas Frequentes</div>
                <div style="display:flex;flex-direction:column;gap:12px;">
${items}
                </div>
            </div>
`;
}

function alertaHtml(texto) {
  if (!texto) return '';
  return `
            <div style="background:#fff8e1;border-left:8px solid #ff8f00;border-radius:8px;padding:20px;margin:25px 0;font-size:15px;color:#4e3200;line-height:1.8;">
                <div style="font-weight:700;font-size:16px;margin-bottom:8px;">⚠️ Alerta do Farmacêutico</div>
                ${texto}
            </div>
`;
}

function quandoHtml(texto) {
  if (!texto) return '';
  return `
            <div style="background:#fde8e8;border-left:8px solid #c0392b;border-radius:8px;padding:20px;margin:15px 0;font-size:15px;color:#721c24;line-height:1.8;">
                <div style="font-weight:700;font-size:16px;margin-bottom:8px;">🏥 Quando Procurar Médico</div>
                ${texto}
            </div>
`;
}

// Âncoras de inserção (em ordem de preferência)
const ANCHORS = [
  '<div style="text-align:center;margin-top:35px;">',  // template novo
  '<div class="nota">',                                 // template antigo
];

const medDir = path.join(BASE, 'medicamentos');
const dirs = fs.readdirSync(medDir).filter(d => fs.statSync(path.join(medDir, d)).isDirectory());

let atualizados = 0, jaCompleto = 0, semMatch = 0, semAncora = 0, redirects = 0;
const semMatchList = [];

dirs.forEach(dir => {
  const filePath = path.join(medDir, dir, 'index.html');
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');
  if (html.trim().length === 0) return;

  // Pular redirects
  if (html.includes('http-equiv="refresh"') || html.includes('window.location.replace')) {
    redirects++;
    return;
  }

  // Extrair h1
  const h1Match = html.match(/<h1>([^<]+)<\/h1>/);
  if (!h1Match) { semMatchList.push(dir + ' (sem h1)'); semMatch++; return; }
  const h1 = h1Match[1].trim();

  const med = findMedByH1(h1);
  if (!med) { semMatchList.push(dir + ' → "' + h1 + '"'); semMatch++; return; }

  const hasFaq = html.includes('Perguntas Frequentes') || html.includes('<details');
  const hasAlerta = html.includes('Alerta do Farmacêutico');
  const hasQuando = html.includes('Quando Procurar Médico');

  if (hasFaq && hasAlerta && hasQuando) { jaCompleto++; return; }

  // Encontrar âncora disponível
  const anchor = ANCHORS.find(a => html.includes(a));
  if (!anchor) { semAncora++; return; }

  let inserir = '';
  if (!hasFaq) inserir += faqHtml(med.perguntas_frequentes);
  if (!hasAlerta) inserir += alertaHtml(med.alerta_farmaceutico);
  if (!hasQuando) inserir += quandoHtml(med.quando_procurar_medico);

  if (!inserir.trim()) { jaCompleto++; return; }

  html = html.replace(anchor, inserir + '\n            ' + anchor);
  fs.writeFileSync(filePath, html, 'utf8');
  atualizados++;
  if (atualizados % 50 === 0) process.stdout.write('.');
});

console.log(`\n✅ Atualizados: ${atualizados}`);
console.log(`✔️  Já completos: ${jaCompleto}`);
console.log(`🔀 Redirects pulados: ${redirects}`);
console.log(`⚠️  Sem match no JSON: ${semMatch}`);
console.log(`🔗 Sem âncora HTML: ${semAncora}`);
if (semMatchList.length > 0) {
  console.log('\nSem match (primeiros 30):');
  semMatchList.slice(0, 30).forEach(s => console.log(' -', s));
  if (semMatchList.length > 30) console.log('  ... e mais', semMatchList.length - 30);
}
