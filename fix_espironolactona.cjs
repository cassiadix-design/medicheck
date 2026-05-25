// Corrige Espironolactona: adiciona sinonimos + interação com Lítio
const fs = require('fs');
const path = require('path');

const MEDS_PATH = path.join(__dirname, 'medicamentos.json');
const INT_PATH  = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');

// ─── 1. Adicionar sinonimos em medicamentos.json ──────────────────────────────
const meds = JSON.parse(fs.readFileSync(MEDS_PATH, 'utf-8'));
const espi = meds.find(m => m.generico === 'Espironolactona');

if (!espi) {
  console.error('Espironolactona não encontrada em medicamentos.json');
  process.exit(1);
}

if (Array.isArray(espi.sinonimos) && espi.sinonimos.length > 0) {
  console.log('sinonimos já existem:', espi.sinonimos);
} else {
  espi.sinonimos = ['aldactone', 'spirotone', 'espiro', 'espironolactona aldoril'];
  fs.writeFileSync(MEDS_PATH, JSON.stringify(meds, null, 2), 'utf-8');
  console.log('✓ sinonimos adicionados à Espironolactona:', espi.sinonimos);
}

// ─── 2. Adicionar Espironolactona + Lítio em mc-interacoes-data-v3.js ─────────
let raw = fs.readFileSync(INT_PATH, 'utf-8');

if (raw.includes('Espironolactona + Lítio') || raw.includes('Espironolactona + L\\u00edtio')) {
  console.log('Interação Espironolactona + Lítio já existe — pulando.');
  process.exit(0);
}

const novaInteracao = [
  {
    "med1": ["espironolactona", "aldactone", "spirotone"],
    "med2": ["carbonato de lítio", "lítio", "litio"],
    "nivel": "moderado",
    "titulo": "Espironolactona + Lítio (Variação dos Níveis Séricos — Monitorar Toxicidade)",
    "mecanismo": "A espironolactona, ao antagonizar a aldosterona, reduz a reabsorção de sódio no túbulo coletor e pode interferir na manipulação renal de lítio — íon cujo transporte tubular compete com o sódio. Diferentemente dos diuréticos tiazídicos (que retêm lítio de forma consistente), a espironolactona pode tanto elevar quanto reduzir os níveis séricos de lítio dependendo do estado de sódio e hidratação do paciente. O risco clínico é de flutuação imprevisível do nível sérico, com potencial para toxicidade por lítio em casos de depleção de sódio concomitante.",
    "efeito": "Variação dos níveis séricos de lítio com risco de toxicidade: tremores finos que progridem para grosseiros, confusão mental, ataxia, náuseas, diarreia, e em casos graves — convulsões e insuficiência renal. A janela terapêutica do lítio é estreita (0,6–1,2 mEq/L), e pequenas elevações podem ser clinicamente significativas.",
    "conduta": "⚠️ Monitorar litemia 5–7 dias após iniciar ou ajustar dose de espironolactona, e a cada mudança de dose subsequente. Manter hidratação adequada e evitar dieta hipossódica excessiva. Orientar paciente sobre sinais de toxicidade por lítio (tremores intensos, confusão, diarreia persistente). Considerar redução preventiva da dose de lítio se houver depleção de sódio associada."
  }
];

const novoBloco = '\n\nmcInteracoesDB = mcInteracoesDB.concat(' +
  JSON.stringify(novaInteracao, null, 2) +
  ');\n';

const markerAux = '\nvar mcIECAnomes';
const posAux = raw.indexOf(markerAux);
if (posAux === -1) {
  console.error('Marcador das variáveis auxiliares não encontrado — abortando.');
  process.exit(1);
}

raw = raw.slice(0, posAux) + novoBloco + raw.slice(posAux);
fs.writeFileSync(INT_PATH, raw, 'utf-8');
console.log('✓ Interação Espironolactona + Lítio adicionada ao mc-interacoes-data-v3.js');
