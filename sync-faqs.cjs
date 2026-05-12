const fs = require('fs');
const path = require('path');
const meds = require('./medicamentos.json');

function slugify(t) {
  return t.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-').trim();
}

const byGenerico = {}, byGenericoSlug = {};
for (const m of meds) {
  if (!byGenerico[m.generico]) byGenerico[m.generico] = m;
  const s = slugify(m.generico);
  if (!byGenericoSlug[s]) byGenericoSlug[s] = m;
}

const overrides = {
  'eritropoetina-injetavel': meds.find(m => m.generico === 'Epoetina Alfa'),
  'diclofenaco-gel-topico':  meds.find(m => m.generico === 'Diclofenaco sódico'),
};

function findEntry(dir, h1) {
  if (overrides[dir]) return overrides[dir];
  if (h1 && byGenerico[h1]) return byGenerico[h1];
  return byGenericoSlug[dir] || null;
}

function buildDetailsHtml(faqs) {
  return faqs.map(f => `
                    <details style="background:#f8f9fa;border:1px solid #dee2e6;border-radius:10px;padding:14px 18px;cursor:pointer;">
                        <summary style="font-weight:700;font-size:15px;color:#333;list-style:none;display:flex;justify-content:space-between;align-items:center;">
                            ${f.pergunta}
                            <span style="font-size:18px;color:#667eea;">＋</span>
                        </summary>
                        <div style="margin-top:10px;font-size:15px;color:#555;line-height:1.8;">${f.resposta}</div>
                    </details>`).join('\n');
}

function buildFaqSchema(faqs) {
  return '<script type="application/ld+json">\n' + JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: f.resposta }
    }))
  }, null, 2) + '\n</script>';
}

const base = path.join(__dirname, 'medicamentos');
const dirs = fs.readdirSync(base).filter(f => fs.statSync(path.join(base, f)).isDirectory());

let updated = 0, skipped = 0, noEntry = [];

for (const dir of dirs) {
  const file = path.join(base, dir, 'index.html');
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('FAQPage')) { skipped++; continue; }

  const h1 = (content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.trim();
  const entry = findEntry(dir, h1);
  if (!entry || !entry.perguntas_frequentes?.length) { noEntry.push(dir); continue; }

  const faqs = entry.perguntas_frequentes;
  const newFaqBlock = `
            <div style="margin-top:30px;">
                <div class="section-title">❓ Perguntas Frequentes</div>
                <div style="display:flex;flex-direction:column;gap:12px;">${buildDetailsHtml(faqs)}
                </div>
            </div>`;

  const faqBlockRegex = /<div[^>]*>\s*<div class="section-title">❓ Perguntas Frequentes<\/div>[\s\S]*?<\/div>\s*<\/div>/;
  if (!faqBlockRegex.test(content)) { noEntry.push('NO_REGEX:' + dir); continue; }
  content = content.replace(faqBlockRegex, newFaqBlock);

  const schemaRegex = /<script type="application\/ld\+json">\s*\{\s*"@context"[^<]*"FAQPage"[\s\S]*?<\/script>/;
  if (schemaRegex.test(content)) {
    content = content.replace(schemaRegex, buildFaqSchema(faqs));
  }

  fs.writeFileSync(file, content, 'utf8');
  updated++;
}

console.log(`Atualizadas: ${updated}`);
console.log(`Ignoradas (sem FAQ): ${skipped}`);
if (noEntry.length) console.log(`Sem entrada/regex (${noEntry.length}):`, noEntry);
