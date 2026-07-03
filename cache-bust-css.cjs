// Estampa um hash do conteúdo de med-style.css como ?v=<hash> no <link> das
// páginas de medicamento, para que o navegador busque o CSS atual sempre que
// o arquivo mudar (sem precisar incrementar um número de versão manualmente).
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const cssPath = path.join(__dirname, 'med-style.css');
const hash = crypto.createHash('md5').update(fs.readFileSync(cssPath)).digest('hex').slice(0, 10);

const medDir = path.join(__dirname, 'medicamento');
const linkPattern = /href="\/med-style\.css(?:\?v=[a-f0-9]+)?"/;
let updated = 0;

for (const nome of fs.readdirSync(medDir)) {
  const file = path.join(medDir, nome, 'index.html');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const novo = html.replace(linkPattern, `href="/med-style.css?v=${hash}"`);
  if (novo !== html) {
    fs.writeFileSync(file, novo);
    updated++;
  }
}

console.log(`med-style.css hash=${hash} — ${updated} página(s) atualizada(s)`);
