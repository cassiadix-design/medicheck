'use strict';
const fs   = require('fs');
const path = require('path');

const MEDS_DIR = path.join(__dirname, 'medicamentos');

// Extrai o nome genérico da meta keywords (primeiro valor antes da vírgula)
function extractGenerico(html) {
    const m = html.match(/meta name="keywords" content="([^,"]+)/i);
    if (!m) return null;
    // Remove texto entre parênteses e dose (ex: "Warfarina (também conhecida como Varfarina)" → "Warfarina")
    return m[1].split('(')[0].replace(/\s*[\d,.-]+mg.*$/i, '').trim();
}

const BTN_MARKER = 'btn-verificar-interacoes';

const BTN_HTML = (encodedName) =>
`\n            <div id="btn-verificar-interacoes" style="text-align:center;margin:28px 0 10px;">
                <a href="https://medicheck.med.br/?med=${encodedName}"
                   style="display:inline-flex;align-items:center;gap:8px;padding:15px 30px;background:linear-gradient(135deg,#e74c3c 0%,#c0392b 100%);color:white;text-decoration:none;border-radius:12px;font-weight:700;font-size:16px;box-shadow:0 4px 18px rgba(231,76,60,.4);transition:.3s;letter-spacing:.3px;">
                    ⚡ Verificar Interações
                </a>
                <div style="font-size:12px;color:#999;margin-top:6px;">Confira se este medicamento interage com outro que você usa</div>
            </div>\n`;

// Âncora consistente em todas as páginas
const ANCHOR = '<a class="back-link" href="https://medicheck.med.br/">🔍 Consultar outros medicamentos</a>';

let updated = 0, skipped = 0, errors = 0;

const folders = fs.readdirSync(MEDS_DIR).filter(f =>
    fs.statSync(path.join(MEDS_DIR, f)).isDirectory()
);

for (const folder of folders) {
    const htmlPath = path.join(MEDS_DIR, folder, 'index.html');
    if (!fs.existsSync(htmlPath)) { errors++; continue; }

    let html = fs.readFileSync(htmlPath, 'utf8');

    if (html.includes(BTN_MARKER)) { skipped++; continue; }
    if (!html.includes(ANCHOR))    { errors++; console.log('Âncora não encontrada:', folder); continue; }

    const generico = extractGenerico(html);
    if (!generico) { errors++; console.log('Genérico não extraído:', folder); continue; }

    const encodedName = encodeURIComponent(generico);
    html = html.replace(ANCHOR, BTN_HTML(encodedName) + '            ' + ANCHOR);
    fs.writeFileSync(htmlPath, html, 'utf8');
    updated++;
}

console.log(`✅ Atualizados: ${updated} | ⏭ Já tinham: ${skipped} | ❌ Erros: ${errors}`);
