const fs = require('fs');
const path = require('path');

const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'medicamentos.json'), 'utf8'));

const slugMap = {
  'Gliclazida': 'gliclazida',
  'Acarbose': 'acarbose',
  'Norfloxacino': 'norfloxacino',
  'Apixabana': 'apixabana',
  'Clobazam': 'clobazam',
  'Buspirona': 'buspirona',
  'Nortriptilina': 'nortriptilina',
  'Fexofenadina': 'fexofenadina',
  'Carbonato de Cálcio': 'carbonato-de-calcio',
  'Isossorbida Mononitrato': 'isossorbida-mononitrato',
};

function corReceita(cor) {
  if (cor === 'verde') return '#28a745';
  if (cor === 'azul') return '#1565C0';
  return '#dc3545';
}

function gerarPagina(m, slug) {
  const url = `https://medicheck.med.br/medicamentos/${slug}/`;
  const descShort = m.descricao_seo || m.descricao.slice(0, 155);
  const keywords = [m.nome, m.generico, ...(m.sinonimos || [])].join(', ');

  const faqSchema = (m.perguntas_frequentes || []).map(faq => `    {
      "@type": "Question",
      "name": "${faq.pergunta.replace(/"/g, '\\"')}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${faq.resposta.replace(/"/g, '\\"')}"
      }
    }`).join(',\n');

  const respostaRapidaTags = (m.resposta_rapida || []).map(r =>
    `<span style="background:#e8f4fd;border:1px solid #90CAF9;border-radius:20px;padding:5px 13px;font-size:13.5px;color:#1565C0;font-weight:500;">${r.titulo}: ${r.texto}</span>`
  ).join('');

  const faqHtml = (m.perguntas_frequentes || []).map(faq => `
                    <details style="background:#f8f9fa;border:1px solid #dee2e6;border-radius:10px;padding:14px 18px;cursor:pointer;">
                        <summary style="font-weight:700;font-size:15px;color:#333;list-style:none;display:flex;justify-content:space-between;align-items:center;">
                            ${faq.pergunta}
                            <span style="font-size:18px;color:#667eea;">＋</span>
                        </summary>
                        <div style="margin-top:10px;font-size:15px;color:#555;line-height:1.8;">${faq.resposta}</div>
                    </details>`).join('\n');

  const receitaCor = corReceita(m.receita_cor);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${m.nome}: para que serve, como tomar e efeitos colaterais | MediCheck</title>
    <meta name="description" content="${descShort.slice(0, 155)}..." />
    <meta name="keywords" content="${keywords}" />
    <meta property="og:title" content="${m.nome}: para que serve, como tomar e efeitos colaterais | MediCheck" />
    <meta property="og:description" content="${descShort.slice(0, 155)}..." />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="https://medicheck.med.br/icons/icon-512.png" />
    <meta property="og:site_name" content="MediCheck" />
    <link rel="canonical" href="${url}" />
    <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "${m.nome}",
  "description": "${m.descricao.replace(/"/g, '\\"')}",
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
${faqSchema}
  ]
}
</script>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="https://medicheck.med.br/">← Voltar ao MediCheck</a>
            <h1>${m.nome}</h1>
            <div class="tipo">${m.tipo}</div>
            <span style="background:${receitaCor};color:white;padding:6px 14px;border-radius:20px;font-size:14px;font-weight:700;">${m.receita_display}</span>
        </div>

        <div class="content">

        <div style="background:linear-gradient(135deg,#e8f4fd,#d0e8f8);border:2px solid #2196F3;border-radius:12px;padding:16px 20px;margin:16px 0 20px;">
            <div style="font-weight:700;font-size:15px;color:#1565C0;margin-bottom:10px;letter-spacing:.5px;">⚡ RESPOSTA RÁPIDA</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin:12px 0;">${respostaRapidaTags}</div>
        </div>

            <div class="section-title">💊 O que é e para que serve</div>
            <div class="section-body">${m.descricao}</div>

        <div style="margin-bottom:20px;">
            <div style="font-size:20px;font-weight:700;color:#333;margin-bottom:12px;">💊 Receita Médica</div>
            <div style="padding-left:30px;">
                <span style="background:${receitaCor};color:white;padding:6px 14px;border-radius:20px;font-size:14px;font-weight:700;">${m.receita_display}</span>
                <p style="font-size:15px;color:#555;margin-top:10px;line-height:1.7;">${m.receita_descricao}</p>
                <p style="font-size:14px;color:#777;margin-top:6px;font-style:italic;">${m.receita_nota}</p>
            </div>
        </div>

            <div class="section-title">⚠️ Efeitos Colaterais</div>
            <div class="section-body">${m.efeitos}</div>

        <div style="background:#ffe6e6;border-left:8px solid #dc3545;border-radius:8px;padding:20px;margin:20px 0;font-size:16px;color:#721c24;line-height:1.8;font-weight:600;">
            ⚠️ <strong>Aviso Importante:</strong> ${m.aviso_grave}
        </div>

        <div style="background:#fff3cd;border-left:8px solid #ffc107;border-radius:8px;padding:20px;margin:15px 0;font-size:16px;color:#856404;line-height:1.8;font-weight:600;">
            ☎️ ${m.quando_procurar_medico}
        </div>

        <div style="margin-top:25px;">
            <div style="font-size:20px;font-weight:700;color:#333;margin-bottom:12px;">📚 Orientações de Uso</div>
            <div style="background:#d4edda;border-left:8px solid #28a745;border-radius:8px;padding:20px;font-size:16px;color:#155724;line-height:1.8;">
                ⚠️ ${m.recomendacao}

${m.educacao}
            </div>
        </div>

            <div style="margin-top:30px;">
                <div class="section-title">❓ Perguntas Frequentes</div>
                <div style="display:flex;flex-direction:column;gap:12px;">${faqHtml}
                </div>
            </div>

            <a href="https://medicheck.med.br/" class="back-link">← Verificar outra interação</a>
        </div>

        <div class="footer-crf">
            Conteúdo elaborado por <strong>Rita de Cássia Oliveira Soares da Silva — Farmacêutica CRF-SP 33.109</strong><br>
            Para fins informativos. Consulte sempre um profissional de saúde.
        </div>
    </div>
</body>
</html>`;
}

let criados = 0;
for (const [nome, slug] of Object.entries(slugMap)) {
  const m = db.find(x => x.nome === nome);
  if (!m) { console.log(`❌ Não encontrado no banco: ${nome}`); continue; }

  const dir = path.join(__dirname, 'medicamentos', slug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const html = gerarPagina(m, slug);
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`✅ ${nome} → /medicamentos/${slug}/`);
  criados++;
}

console.log(`\n✨ ${criados} páginas criadas.`);
