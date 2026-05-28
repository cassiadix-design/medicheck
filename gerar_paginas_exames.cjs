// gerar_paginas_exames.cjs
// MediCheck — Gera páginas HTML estáticas para todos os exames do exames.json

const fs   = require("fs");
const path = require("path");

const EXAMES_JSON = path.join(__dirname, "exames.json");
const OUTPUT_DIR  = path.join(__dirname, "exames");

// ─── slug ────────────────────────────────────────────────────────────────────

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── escape HTML ─────────────────────────────────────────────────────────────

function esc(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── gera o HTML de um exame ─────────────────────────────────────────────────

function gerarHTML(exame, slug) {
  const url       = `https://medicheck.med.br/exames/${slug}/`;
  const titulo    = `${exame.nome} — O que significa, valores normais e quando pedir | MediCheck`;
  const descSeo   = esc(exame.descricao_seo || exame.descricao || "");
  const perguntas = Array.isArray(exame.perguntas_frequentes)
    ? exame.perguntas_frequentes
    : [];

  // Schema FAQPage entries
  const faqEntries = perguntas
    .map(
      (p) => `    {
      "@type": "Question",
      "name": ${JSON.stringify(p.pergunta)},
      "acceptedAnswer": {
        "@type": "Answer",
        "text": ${JSON.stringify(p.resposta)}
      }
    }`
    )
    .join(",\n");

  // FAQ HTML accordion
  const faqHTML = perguntas
    .map(
      (p) => `
                    <details style="background:#f8f9fa;border:1px solid #dee2e6;border-radius:10px;padding:14px 18px;cursor:pointer;">
                        <summary style="font-weight:700;font-size:15px;color:#333;list-style:none;display:flex;justify-content:space-between;align-items:center;">
                            ${esc(p.pergunta)}
                            <span style="font-size:18px;color:#667eea;">＋</span>
                        </summary>
                        <div style="margin-top:10px;font-size:15px;color:#555;line-height:1.8;">${esc(p.resposta)}</div>
                    </details>`
    )
    .join("\n");

  // Chips de resposta rápida
  const chips = [
    { label: "Categoria", valor: exame.categoria },
    { label: "Valores normais", valor: (exame.valores_normais || "").split("|")[0].trim() },
    { label: "Preparo", valor: (exame.preparo || "").length > 60
        ? exame.preparo.substring(0, 60).trim() + "…"
        : exame.preparo },
  ]
    .filter((c) => c.valor)
    .map(
      (c) =>
        `<span style="background:#e8f4fd;border:1px solid #90CAF9;border-radius:20px;padding:5px 13px;font-size:13.5px;color:#1565C0;font-weight:500;">${esc(c.label)}: ${esc(c.valor)}</span>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(titulo)}</title>
    <meta name="description" content="${descSeo}" />
    <meta name="keywords" content="${esc(exame.nome)}, exame ${esc(exame.nome.toLowerCase())}, valores normais ${esc(exame.nome.toLowerCase())}, resultado ${esc(exame.nome.toLowerCase())}" />
    <meta property="og:title" content="${esc(titulo)}" />
    <meta property="og:description" content="${descSeo}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="https://medicheck.med.br/icons/icon-512.png" />
    <meta property="og:site_name" content="MediCheck" />
    <link rel="canonical" href="${url}" />
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": ${JSON.stringify(exame.nome)},
  "description": ${JSON.stringify(exame.descricao_seo || exame.descricao || "")},
  "url": "${url}",
  "publisher": {
    "@type": "Organization",
    "name": "MediCheck",
    "url": "https://medicheck.med.br"
  },
  "author": {
    "@type": "Person",
    "name": "Rita de Cássia Oliveira Soares da Silva",
    "honorificSuffix": "Farmacêutica CRF-SP 33.109"
  }
}
    </script>
    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body {
            font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
            background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);
            min-height:100vh;
            padding:20px;
        }
        .container {
            background:white;
            border-radius:20px;
            box-shadow:0 20px 60px rgba(0,0,0,.3);
            max-width:900px;
            width:100%;
            margin:0 auto;
            overflow:hidden;
        }
        .header {
            background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);
            color:white;
            padding:40px 30px 30px;
            text-align:center;
        }
        .header a {
            color:rgba(255,255,255,.85);
            text-decoration:none;
            font-size:14px;
            display:inline-block;
            margin-bottom:16px;
            border:1px solid rgba(255,255,255,.4);
            padding:5px 14px;
            border-radius:20px;
            transition:.2s;
        }
        .header a:hover { background:rgba(255,255,255,.15); }
        .header h1 { font-size:36px; font-weight:700; margin-bottom:8px; }
        .header .tipo { font-size:16px; opacity:.9; margin-bottom:12px; }
        .content { padding:35px 30px; }
        .section-title {
            font-size:20px;
            font-weight:700;
            color:#333;
            margin:25px 0 12px;
            display:flex;
            align-items:center;
            gap:10px;
        }
        .section-body {
            font-size:16px;
            color:#555;
            line-height:1.9;
            padding-left:30px;
            margin-bottom:15px;
        }
        .back-link {
            display:inline-block;
            margin-top:30px;
            padding:14px 28px;
            background:linear-gradient(135deg,#667eea,#764ba2);
            color:white;
            text-decoration:none;
            border-radius:10px;
            font-weight:700;
            font-size:16px;
            transition:.3s;
        }
        .back-link:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(102,126,234,.4); }
        .footer-crf {
            text-align:center;
            padding:18px 30px;
            font-size:13px;
            color:#888;
            border-top:1px solid #eee;
            background:#fafafa;
        }
        @media(max-width:600px) {
            .header h1 { font-size:26px; }
            .content { padding:20px 16px; }
        }
    </style>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${faqEntries}
  ]
}
</script>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="https://medicheck.med.br/">← Voltar ao MediCheck</a>
            <h1>${esc(exame.nome)}</h1>
            <div class="tipo">Exame Laboratorial — ${esc(exame.categoria)}</div>
        </div>

        <div class="content">

        <div style="background:linear-gradient(135deg,#e8f4fd,#d0e8f8);border:2px solid #2196F3;border-radius:12px;padding:16px 20px;margin:16px 0 20px;">
            <div style="font-weight:700;font-size:15px;color:#1565C0;margin-bottom:10px;letter-spacing:.5px;">⚡ RESPOSTA RÁPIDA</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin:12px 0;">${chips}</div>
        </div>

            <div class="section-title">🔬 O que é e para que serve</div>
            <div class="section-body">${esc(exame.descricao)}</div>

        <div style="background:#e8f5e9;border-left:8px solid #43a047;border-radius:8px;padding:20px;margin:20px 0;">
            <div style="font-size:17px;font-weight:700;color:#2e7d32;margin-bottom:10px;">📊 Valores Normais</div>
            <div style="font-size:16px;color:#1b5e20;line-height:1.9;">${esc(exame.valores_normais)}</div>
        </div>

            <div class="section-title">📈 O que significa quando está alto</div>
            <div class="section-body">${esc(exame.o_que_significa_alto)}</div>

            <div class="section-title">📉 O que significa quando está baixo</div>
            <div class="section-body">${esc(exame.o_que_significa_baixo)}</div>

        <div style="margin-top:25px;">
            <div style="font-size:20px;font-weight:700;color:#333;margin-bottom:12px;">🩺 Quando pedir este exame</div>
            <div style="background:#f3e5f5;border-left:8px solid #8e24aa;border-radius:8px;padding:20px;font-size:16px;color:#4a148c;line-height:1.8;">
                ${esc(exame.quando_pedir)}
            </div>
        </div>

        <div style="margin-top:20px;">
            <div style="font-size:20px;font-weight:700;color:#333;margin-bottom:12px;">📋 Preparo para o exame</div>
            <div style="background:#fff3cd;border-left:8px solid #ffc107;border-radius:8px;padding:20px;font-size:16px;color:#856404;line-height:1.8;">
                ${esc(exame.preparo)}
            </div>
        </div>

            <div style="margin-top:30px;">
                <div class="section-title">❓ Perguntas Frequentes</div>
                <div style="display:flex;flex-direction:column;gap:12px;">${faqHTML}
                </div>
            </div>

            <a href="https://medicheck.med.br/" class="back-link">← Voltar ao MediCheck</a>
        </div>

        <div class="footer-crf">
            Conteúdo elaborado por <strong>Rita de Cássia Oliveira Soares da Silva — Farmacêutica CRF-SP 33.109</strong><br>
            Para fins informativos. Consulte sempre um profissional de saúde.
        </div>
    </div>
</body>
</html>`;
}

// ─── função principal ─────────────────────────────────────────────────────────

function gerarPaginas() {
  if (!fs.existsSync(EXAMES_JSON)) {
    console.error(`❌ Arquivo não encontrado: ${EXAMES_JSON}`);
    process.exit(1);
  }

  const raw    = fs.readFileSync(EXAMES_JSON, "utf-8");
  const db     = JSON.parse(raw);
  const lista  = Array.isArray(db) ? db : db.exames || Object.values(db);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let criadas = 0;

  for (const exame of lista) {
    if (!exame.nome) continue;

    const slug    = toSlug(exame.nome);
    const dir     = path.join(OUTPUT_DIR, slug);
    const arquivo = path.join(dir, "index.html");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const html = gerarHTML(exame, slug);
    fs.writeFileSync(arquivo, html, "utf-8");
    criadas++;
    console.log(`✅ exames/${slug}/index.html`);
  }

  console.log("\n─────────────────────────────────────────");
  console.log(`📄 Páginas criadas : ${criadas}`);
  console.log(`📁 Pasta de saída  : exames/`);
  console.log("─────────────────────────────────────────\n");
}

gerarPaginas();
