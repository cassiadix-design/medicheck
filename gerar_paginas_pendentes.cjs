'use strict';
const fs = require('fs');
const path = require('path');

// ── SLUGS A IGNORAR (tópicos, suplementos, cosméticos, OTC sem relevância clínica) ──
const SKIP_NOMES = [
  'ácido hialurônico sérum','água inglesa','almeida prado nº 35','almeida prado nº 46',
  'bálsamo branco','benalet','benzidamina','benzoíla peroxida','biotina',
  'cloreto de sódio 0,9% nasal','cloreto de sódio 0,9% spray','cloreto de sódio 3%',
  'cobre —','colagenase + cloranfenicol','colagenase pomada','colágeno hidrolisado',
  'condroitina + glucosamina','curcumina','elixir de inhame','elixir paregórico',
  'eritromicina tópica','hidróxido de alumínio','hidróxido de magnésio',
  'ivermectina tópica','leucogen','lidocaína gel','magnésio quelato','magnésio treonato',
  'neo-angin','ômega 3 concentrado','ômega-3 (epa','peróxido de benzoíla',
  'peróxido de hidrogênio','pimecrolimo','propionato de clobetasol','resveratrol',
  'saccharomyces boulardii','selênio','strepsils','sulfadiazina de prata',
  'tropinal','vitamina e (tocoferol)','vitamina k2 (mk-7)','ácido salicílico 2%',
  'álcool etílico 70%','cafeína','clobutinol — hytos','eritromicina tópica',
  'neuleptil — periciazina' // tem página separada de haloperidol/antipsicótico
];

function deveIgnorar(nome) {
  const n = (nome || '').toLowerCase();
  return SKIP_NOMES.some(s => n.includes(s));
}

// ── CORREÇÃO DE DUPLICATAS ──
console.log('\n🔧 Corrigindo duplicatas...');
let meds = JSON.parse(fs.readFileSync('medicamentos.json', 'utf8'));

// Pantoprazol: manter o de índice mais baixo (mais campos de efeitos), remover o outro
{
  const idxs = meds.reduce((acc, m, i) => {
    if ((m.nome || '').toLowerCase().includes('pantoprazol')) acc.push(i);
    return acc;
  }, []);
  if (idxs.length > 1) {
    // Mantém o de maior conteúdo (efeitos + desc)
    idxs.sort((a, b) =>
      ((meds[b].efeitos || '').length + (meds[b].descricao || '').length) -
      ((meds[a].efeitos || '').length + (meds[a].descricao || '').length)
    );
    const [manter, ...remover] = idxs;
    // Remover do maior índice para o menor para não deslocar
    remover.sort((a, b) => b - a).forEach(i => meds.splice(i, 1));
    console.log(`  Pantoprazol: mantido índice ${manter}, removidos ${remover.length} duplicata(s)`);
  }
}

// Dabigatrana: manter o mais completo (mais keys + interações)
{
  const idxs = meds.reduce((acc, m, i) => {
    if ((m.nome || '').toLowerCase().includes('dabigatrana') ||
        (m.generico || '').toLowerCase().includes('dabigatrana')) acc.push(i);
    return acc;
  }, []);
  if (idxs.length > 1) {
    idxs.sort((a, b) => Object.keys(meds[b]).length - Object.keys(meds[a]).length);
    const [manter, ...remover] = idxs;
    // Atualiza nome para incluir todas as doses
    meds[manter].nome = 'Dabigatrana 75mg - 110mg - 150mg';
    remover.sort((a, b) => b - a).forEach(i => meds.splice(i, 1));
    console.log(`  Dabigatrana: mantido o mais completo, removidos ${remover.length} duplicata(s)`);
  }
}

// Nitrofurantoína: manter o com mais conteúdo, remover os outros
{
  const idxs = meds.reduce((acc, m, i) => {
    if ((m.nome || '').toLowerCase().includes('nitrofurantoí') ||
        (m.generico || '').toLowerCase().includes('nitrofurantoí')) acc.push(i);
    return acc;
  }, []);
  if (idxs.length > 1) {
    idxs.sort((a, b) =>
      ((meds[b].efeitos || '').length + (meds[b].descricao || '').length) -
      ((meds[a].efeitos || '').length + (meds[a].descricao || '').length)
    );
    const [manter, ...remover] = idxs;
    meds[manter].nome = 'Nitrofurantoína 100mg - 100mg macrocristal';
    remover.sort((a, b) => b - a).forEach(i => meds.splice(i, 1));
    console.log(`  Nitrofurantoína: mantido o mais completo, removidos ${remover.length} duplicata(s)`);
  }
}

fs.writeFileSync('medicamentos.json', JSON.stringify(meds, null, 2), 'utf8');
console.log(`  ✅ medicamentos.json salvo: ${meds.length} entradas\n`);

// ── GERAÇÃO DE PÁGINAS HTML ──
const medsDir = 'medicamentos';
const existentes = new Set(
  fs.readdirSync(medsDir).filter(f => {
    const full = path.join(medsDir, f);
    return fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, 'index.html'));
  })
);

function slugify(generico) {
  return (generico || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-');
}

function esc(str) {
  return (str || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escJS(str) {
  return (str || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
}

function gerarHTML(drug) {
  const slug = slugify(drug.generico);
  const nomeDisplay = drug.generico.split('(')[0].trim().toLowerCase();

  const receita_display = drug.receita_display || (drug.receita === 'Sim' ? '🔴 Receita Obrigatória' : '⚪ Venda Livre');
  const receita_descricao = drug.receita_descricao || '';
  const receita_nota = drug.receita_nota || '';
  const aviso_grave = drug.aviso_grave || '';
  const quando = drug.quando_procurar_medico || '';
  const alerta = drug.alerta_farmaceutico || '';
  const recomendacao = drug.recomendacao || '';
  const educacao = drug.educacao || '';
  const descricao_seo = drug.descricao_seo || `${drug.nome}: para que serve, como tomar e efeitos colaterais.`;

  const rapidaTags = (drug.resposta_rapida || []).map(t =>
    `<span style="background:#e8f4fd;border:1px solid #90CAF9;border-radius:20px;padding:5px 13px;font-size:13.5px;color:#1565C0;font-weight:500;">${esc(t)}</span>`
  ).join('');

  const faqJsonLD = (drug.perguntas_frequentes || []).slice(0, 5).map(pf => `    {
      "@type": "Question",
      "name": "${escJS(pf.pergunta)}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${escJS(pf.resposta)}"
      }
    }`).join(',\n');

  const faqHTML = (drug.perguntas_frequentes || []).map(pf => `
                    <details style="background:#f8f9fa;border:1px solid #dee2e6;border-radius:10px;padding:14px 18px;cursor:pointer;">
                        <summary style="font-weight:700;font-size:15px;color:#333;list-style:none;display:flex;justify-content:space-between;align-items:center;">
                            ${esc(pf.pergunta)}
                            <span style="font-size:18px;color:#667eea;">＋</span>
                        </summary>
                        <div style="margin-top:10px;font-size:15px;color:#555;line-height:1.8;">${esc(pf.resposta)}</div>
                    </details>`).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${nomeDisplay}: para que serve, como tomar e efeitos colaterais | MediCheck</title>
    <meta name="description" content="${esc(descricao_seo)}" />
    <meta name="keywords" content="${slug}, ${esc(drug.nome)}, para que serve ${slug}, efeitos colaterais ${slug}, bula ${slug}" />
    <meta property="og:title" content="${nomeDisplay}: para que serve, como tomar e efeitos colaterais | MediCheck" />
    <meta property="og:description" content="${esc(descricao_seo)}" />
    <meta property="og:url" content="https://medicheck.med.br/medicamentos/${slug}/" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="https://medicheck.med.br/icons/icon-512.png" />
    <meta property="og:site_name" content="MediCheck" />
    <link rel="canonical" href="https://medicheck.med.br/medicamentos/${slug}/" />
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "${escJS(drug.nome)}",
  "description": "${escJS((drug.descricao || '').substring(0, 300))}",
  "url": "https://medicheck.med.br/medicamentos/${slug}/",
  "publisher": { "@type": "Organization", "name": "MediCheck", "url": "https://medicheck.med.br" },
  "author": { "@type": "Person", "name": "Rita de Cássia Oliveira Soares da Silva", "honorificSuffix": "Farmacêutica CRF-SP 33.109" }
}
    </script>${faqJsonLD ? `
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${faqJsonLD}
  ]
}
    </script>` : ''}
    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif; background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); min-height:100vh; padding:20px; }
        .container { background:white; border-radius:20px; box-shadow:0 20px 60px rgba(0,0,0,.3); max-width:900px; width:100%; margin:0 auto; overflow:hidden; }
        .header { background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); color:white; padding:40px 30px 30px; text-align:center; }
        .header a { color:rgba(255,255,255,.85); text-decoration:none; font-size:14px; display:inline-block; margin-bottom:16px; border:1px solid rgba(255,255,255,.4); padding:5px 14px; border-radius:20px; transition:.2s; }
        .header a:hover { background:rgba(255,255,255,.15); }
        .header h1 { font-size:36px; font-weight:700; margin-bottom:8px; }
        .header .tipo { font-size:16px; opacity:.9; margin-bottom:12px; }
        .content { padding:35px 30px; }
        .section-title { font-size:20px; font-weight:700; color:#333; margin:25px 0 12px; display:flex; align-items:center; gap:10px; }
        .section-body { font-size:16px; color:#555; line-height:1.9; padding-left:30px; margin-bottom:15px; }
        .back-link { display:inline-block; margin-top:30px; padding:14px 28px; background:linear-gradient(135deg,#667eea,#764ba2); color:white; text-decoration:none; border-radius:10px; font-weight:700; font-size:16px; transition:.3s; }
        .back-link:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(102,126,234,.4); }
        .footer-crf { text-align:center; padding:18px 30px; font-size:13px; color:#888; border-top:1px solid #eee; background:#fafafa; }
        @media(max-width:600px) { .header h1 { font-size:26px; } .content { padding:20px 16px; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="https://medicheck.med.br/">← Voltar ao MediCheck</a>
            <h1>${nomeDisplay}</h1>
            <div class="tipo">${esc(drug.tipo || '')}</div>
            <span style="background:#dc3545;color:white;padding:6px 14px;border-radius:20px;font-size:14px;font-weight:700;">${receita_display}</span>
        </div>

        <div class="content">
${rapidaTags ? `
        <div style="background:linear-gradient(135deg,#e8f4fd,#d0e8f8);border:2px solid #2196F3;border-radius:12px;padding:16px 20px;margin:16px 0 20px;">
            <div style="font-weight:700;font-size:15px;color:#1565C0;margin-bottom:10px;letter-spacing:.5px;">⚡ RESPOSTA RÁPIDA</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin:12px 0;">${rapidaTags}</div>
        </div>
` : ''}
            <div class="section-title">💊 O que é e para que serve</div>
            <div class="section-body">${esc(drug.descricao || '')}</div>

        <div style="margin-bottom:20px;">
            <div style="font-size:20px;font-weight:700;color:#333;margin-bottom:12px;">💊 Receita Médica</div>
            <div style="padding-left:30px;">
                <span style="background:#dc3545;color:white;padding:6px 14px;border-radius:20px;font-size:14px;font-weight:700;">${receita_display}</span>
                ${receita_descricao ? `<p style="font-size:15px;color:#555;margin-top:10px;line-height:1.7;">${esc(receita_descricao)}</p>` : ''}
                ${receita_nota ? `<p style="font-size:14px;color:#777;margin-top:6px;line-height:1.6;">${esc(receita_nota)}</p>` : ''}
            </div>
        </div>

            <div class="section-title">⚠️ Efeitos Colaterais</div>
            <div class="section-body">${esc(drug.efeitos || '')}</div>

${aviso_grave ? `
        <div style="background:#ffe6e6;border-left:8px solid #dc3545;border-radius:8px;padding:20px;margin:20px 0;font-size:16px;color:#721c24;line-height:1.8;font-weight:600;">
            ⚠️ <strong>Aviso Importante:</strong> ${esc(aviso_grave)}
        </div>
` : ''}
${quando ? `
        <div style="background:#fff3cd;border-left:8px solid #ffc107;border-radius:8px;padding:20px;margin:15px 0;font-size:16px;color:#856404;line-height:1.8;font-weight:600;">
            ☎️ ${esc(quando)}
        </div>
` : ''}
${(recomendacao || educacao) ? `
        <div style="margin-top:25px;">
            <div style="font-size:20px;font-weight:700;color:#333;margin-bottom:12px;">📚 Orientações de Uso</div>
            <div style="background:#d4edda;border-left:8px solid #28a745;border-radius:8px;padding:20px;font-size:16px;color:#155724;line-height:1.8;">
                ${esc(recomendacao)}${recomendacao && educacao ? '<br><br>' : ''}${esc(educacao)}
            </div>
        </div>
` : ''}
${alerta ? `
        <div style="background:#e8f0fe;border-left:8px solid #3f51b5;border-radius:8px;padding:20px;margin:20px 0;font-size:15px;color:#283593;line-height:1.8;">
            🏥 <strong>Alerta Farmacêutico:</strong> ${esc(alerta)}
        </div>
` : ''}
${faqHTML ? `
            <div style="margin-top:30px;">
                <div class="section-title">❓ Perguntas Frequentes</div>
                <div style="display:flex;flex-direction:column;gap:12px;">
                    ${faqHTML}
                </div>
            </div>
` : ''}
            <a class="back-link" href="https://medicheck.med.br/">← Buscar outro medicamento</a>
        </div>

        <div class="footer-crf">
            Informações revisadas por Rita de Cássia Oliveira Soares da Silva — Farmacêutica CRF-SP 33.109 &nbsp;|&nbsp;
            <strong>Este conteúdo é educacional e não substitui consulta médica ou farmacêutica.</strong>
        </div>
    </div>
</body>
</html>`;
}

// ── GERAR PÁGINAS ──
console.log('📄 Gerando páginas HTML...\n');
const hoje = '2026-05-19';
let criadas = 0;
let ignoradas = 0;
let jaExistia = 0;
const novosSlugs = [];

for (const drug of meds) {
  const slug = slugify(drug.generico);
  if (!slug) continue;

  if (existentes.has(slug)) { jaExistia++; continue; }

  if (deveIgnorar(drug.nome)) { ignoradas++; continue; }

  const dir = path.join(medsDir, slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), gerarHTML(drug), 'utf8');
  novosSlugs.push(slug);
  criadas++;
}

console.log(`✅ Páginas criadas: ${criadas}`);
console.log(`⏭️  Já existiam: ${jaExistia}`);
console.log(`🚫 Ignoradas (tópicos/suplementos): ${ignoradas}`);
console.log('\nNovas páginas:', novosSlugs.join(', '));

// ── ATUALIZAR SITEMAP ──
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
let novasEntradas = '';
for (const slug of novosSlugs) {
  const url = `https://medicheck.med.br/medicamentos/${slug}/`;
  if (!sitemap.includes(url)) {
    novasEntradas += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${hoje}</lastmod>\n    <priority>0.8</priority>\n    <changefreq>monthly</changefreq>\n  </url>\n`;
  }
}
sitemap = sitemap.replace('</urlset>', novasEntradas + '</urlset>');
fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
console.log(`\n✅ sitemap.xml atualizado com ${novosSlugs.length} novos URLs`);
