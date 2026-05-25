// Corrige os sinonimos no medicamentos.json para alinhar com mc-interacoes-data-v3.js
// Estratégia: só ADICIONA sinonimos — nunca remove ou altera dados existentes
const fs = require('fs');
const path = require('path');

const MEDS_PATH = path.join(__dirname, 'medicamentos.json');
const meds = JSON.parse(fs.readFileSync(MEDS_PATH, 'utf-8'));

// ─── Helpers ──────────────────────────────────────────────────────────────────
const norm = s => s.toLowerCase().trim();

function stripSalt(generico) {
  // Remove prefixos/sufixos farmacêuticos de sal comuns
  return generico
    .replace(/^cloridrato de\s+/i, '')
    .replace(/^dicloridrato de\s+/i, '')
    .replace(/^dimesilato de\s+/i, '')
    .replace(/^sulfato de\s+/i, '')
    .replace(/^maleato de\s+/i, '')
    .replace(/^fumarato de\s+/i, '')
    .replace(/^besilato de\s+/i, '')
    .replace(/^citrato de\s+/i, '')
    .replace(/^mesilato de\s+/i, '')
    .replace(/^tartarato de\s+/i, '')
    .replace(/^gluconato de\s+/i, '')
    .replace(/^acetato de\s+/i, '')
    .replace(/^valerato de\s+/i, '')
    .replace(/^subcitrato de\s+/i, '')
    .replace(/^succinato de\s+/i, '')
    .replace(/^furoato de\s+/i, '')
    .replace(/^propionato de\s+/i, '')
    .replace(/\s+s[oó]dico[a]?$/i, '')
    .replace(/\s+magn[eé]sico[a]?$/i, '')
    .replace(/\s+pot[aá]ssico[a]?$/i, '')
    .replace(/\s+c[aá]lcico[a]?$/i, '')
    .replace(/\s+monoidi?ratada?$/i, '')
    .replace(/\s+di-?hidratada?$/i, '')
    .replace(/\s+anidro[a]?$/i, '')
    .replace(/\s+hemisuccinato$/i, '')
    .replace(/\s+s[oó]dica?$/i, '')
    .replace(/\s+disoproxila?$/i, '')   // Tenofovir Disoproxila
    .replace(/\s+de\s+s[oó]dio$/i, '') // Montelucaste de Sódio
    .trim();
}

// ─── Mapeamento manual para casos que a lógica automática não cobre ───────────
// Chave: generico exato (lowercase) → array de sinonimos adicionais
const MANUAL_SINONIMOS = {
  // Warfarina tem nome longo especial com parênteses
  'warfarina (também conhecida como varfarina)': ['warfarina', 'varfarina', 'coumadin', 'marevan'],
  // Valproatos — variações usadas nas interações
  'ácido valproico / valproato de sódio': ['valproato', 'ácido valproico', 'valproato de sódio', 'depakene', 'valpakine'],
  'ácido valproico lp / valproato de sódio lp': ['valproato', 'ácido valproico', 'divalproato', 'depakote er', 'depakote lp', 'valpakine cr'],
  'divalproato de sódio': ['divalproato', 'valproato', 'ácido valproico', 'depakote'],
  // Levotiroxina
  'levotiroxina sódica': ['levotiroxina', 't4', 'puran t4', 'euthyrox', 'synthroid', 'tiroxina'],
  // Enoxaparina / Heparina
  'enoxaparina sódica': ['enoxaparina', 'clexane', 'lovenox'],
  'heparina sódica': ['heparina', 'heparina não fracionada'],
  // Esomeprazol
  'esomeprazol magnésico': ['esomeprazol', 'nexium'],
  // Pantoprazol / Rabeprazol
  'pantoprazol sódico': ['pantoprazol', 'pantozol', 'zurcal'],
  'rabeprazol sódico': ['rabeprazol', 'pariet'],
  // Diclofenaco — a entrada genérica "X de Sódio / X Potássico" não tem sinonimos
  'diclofenaco de sódio / diclofenaco potássico': ['diclofenaco', 'diclofenaco de sódio', 'diclofenaco de potassio', 'diclofenaco sodico', 'diclofenaco potassico', 'voltaren', 'cataflam'],
  // Combinação diclofenaco injetável
  'diclofenaco de sódio injetável': ['diclofenaco', 'diclofenaco de sódio', 'diclofenaco sodico'],
  // Lopinavir+Ritonavir
  'lopinavir + ritonavir': ['lopinavir', 'ritonavir', 'kaletra'],
  'lopinavir/ritonavir': ['lopinavir', 'ritonavir', 'kaletra'],
  // Espironolactona+HCT
  'espironolactona + hidroclorotiazida': ['espironolactona', 'hidroclorotiazida', 'aldactazine'],
  // Insulina Regular longa
  'insulina regular': ['insulina', 'insulina humana', 'humulin r', 'novolin r'],
  // Combinações de drogas onde o genérico é a combinação mas a interação usa a base
  'nimesulida + ciclobenzaprina': ['nimesulida', 'ciclobenzaprina'],
  'alogliptina + metformina': ['alogliptina', 'metformina'],
  'dapagliflozina + metformina': ['dapagliflozina', 'metformina'],
  'anlodipino + atorvastatina': ['anlodipino', 'atorvastatina', 'amlodipino'],
  'anlodipino besilato + hidroclorotiazida': ['anlodipino', 'hidroclorotiazida', 'amlodipino'],
  'bisoprolol + hidroclorotiazida': ['bisoprolol', 'hidroclorotiazida'],
  'formoterol + budesonida': ['formoterol', 'budesonida'],
  'formoterol + fluticasona': ['formoterol', 'fluticasona'],
  'salmeterol + propionato de fluticasona': ['salmeterol', 'fluticasona'],
  'atorvastatina + ezetimiba': ['atorvastatina', 'ezetimiba'],
  'butilbrometo de escopolamina + dipirona': ['butilbrometo de escopolamina', 'escopolamina', 'dipirona', 'hioscina', 'buscopan composto'],
  'dipirona + adifenina + prometazina': ['dipirona', 'prometazina'],
  'dipirona + cafeína + isometepteno': ['dipirona', 'cafeína', 'isometepteno'],
  'dipirona + orfenadrina + cafeína': ['dipirona', 'orfenadrina', 'cafeína'],
  'dipirona sódica monoidratada': ['dipirona', 'metamizol', 'novalgina'],
  'dexclorfeniramina + betametasona': ['dexclorfeniramina', 'betametasona'],
  'sacubitril / valsartana': ['sacubitril', 'valsartana', 'entresto'],
  'etinilestradiol + progestogênio': ['etinilestradiol', 'progestogênio', 'anticoncepcional oral', 'estroprogestativo'],
  // Vitaminas/suplementos com interações
  'ácidos graxos ômega-3 (epa + dha)': ['ômega-3', 'epa', 'dha', 'ácido eicosapentaenoico', 'acidos graxos omega-3'],
  'ácidos graxos ômega-3 (epa + dha concentrado)': ['ômega-3', 'epa', 'dha', 'acidos graxos omega-3'],
  'calcitriol 0,25mcg': ['calcitriol', '1,25-dihidroxivitamina d', 'rocaltrol', 'calcijex'],
  'calcitriol': ['calcitriol', '1,25-dihidroxivitamina d'],
  'colecalciferol alta dose': ['colecalciferol', 'vitamina d', 'vitamina d3'],
  // Eritropoetina
  'epoetina alfa': ['epoetina', 'eritropoetina', 'alfaepoetina', 'epoetina alfa', 'eritropoetina alfa'],
  // Heparina baixo peso
  'dalteparina sódica': ['dalteparina', 'fragmin'],
  'fondaparinux sódico': ['fondaparinux', 'arixtra'],
  // Imunossupressores
  'ciclosporina': ['ciclosporina', 'ciclosporin', 'sandimmun', 'neoral'],
  // Fentanila
  'citrato de fentanila': ['fentanila', 'fentanyl', 'duragesic'],
  // Cálcio
  'carbonato de cálcio': ['carbonato de cálcio', 'cálcio', 'calcio', 'antiácido'],
  'cálcio/vitamina d': ['cálcio', 'calcio', 'vitamina d', 'cálcio + vitamina d'],
  'calciovitamina d': ['cálcio', 'calcio', 'vitamina d'],
  // Ferro
  'ferro quelato bisglicinato': ['ferro', 'ferro quelato', 'bisglicinato de ferro', 'ferro oral'],
  'sacarato de hidróxido férrico': ['ferro', 'ferro injetável', 'ferro iv', 'sacarato'],
  // Ácido tranexâmico
  'ácido tranexâmico 500mg - 1000mg': ['ácido tranexâmico', 'acido tranexamico', 'transamine', 'cyklokapron'],
  'ácido tranexâmico': ['ácido tranexâmico', 'acido tranexamico', 'transamine'],
  // Insulina Regular — o genérico tem sufixo longo entre parênteses
  'insulina regular (insulina humana de ação curta)': ['insulina regular', 'insulina', 'insulina humana', 'humulin r', 'novolin r'],
  // Montelucaste
  'montelucaste de sódio': ['montelucaste', 'singulair', 'montelair'],
  // Cianocobalamina
  'cianocobalamina / cobalamina': ['cianocobalamina', 'vitamina b12', 'cobalamina', 'b12'],
  // Eritromicina (base — mesma substância ativa)
  'eritromicina base': ['eritromicina'],
  // Tenofovir (tratado no stripSalt agora, mas adicionando aliases)
  'tenofovir disoproxila': ['tenofovir', 'viread'],
  // Lisdexanfetamina (tratado no stripSalt agora)
  'dimesilato de lisdexanfetamina': ['lisdexanfetamina', 'vyvanse', 'venvanse'],
  // Sumatriptana (tratado no stripSalt agora)
  'succinato de sumatriptana': ['sumatriptana', 'imigran', 'imitrex'],
};

// ─── Função: adiciona sinonimos sem duplicar ──────────────────────────────────
function addSinonimos(med, extras) {
  if (!Array.isArray(med.sinonimos)) med.sinonimos = [];
  const existentes = new Set(med.sinonimos.map(norm));
  const adicionados = [];
  for (const extra of extras) {
    const n = norm(extra);
    // Não adicionar se já está nos sinonimos, no nome ou no generico
    if (!existentes.has(n) && norm(med.nome || '') !== n && norm(med.generico || '') !== n) {
      med.sinonimos.push(extra);
      existentes.add(n);
      adicionados.push(extra);
    }
  }
  return adicionados;
}

// ─── Processar cada medicamento ───────────────────────────────────────────────
let totalAdicionados = 0;
const log = [];

for (const med of meds) {
  const gen = med.generico || '';
  const genNorm = norm(gen);
  let adicionados = [];

  // 1. Aplicar mapeamento manual se existir
  if (MANUAL_SINONIMOS[genNorm]) {
    adicionados = addSinonimos(med, MANUAL_SINONIMOS[genNorm]);
  }

  // 2. Derivar nome curto automaticamente removendo sal/prefixo
  const stripped = stripSalt(gen);
  const strippedNorm = norm(stripped);
  if (strippedNorm !== genNorm && strippedNorm.length > 3) {
    const mais = addSinonimos(med, [stripped]);
    adicionados.push(...mais);
  }

  // 3. Para genéricos com "(também conhecido como X)", extrair o X
  const parens = gen.match(/\((?:também conhecido[a]? como|also known as)\s+([^)]+)\)/i);
  if (parens) {
    const alt = parens[1].trim();
    const mais = addSinonimos(med, [alt, norm(alt)]);
    adicionados.push(...mais);
  }

  if (adicionados.length > 0) {
    totalAdicionados += adicionados.length;
    log.push(`  ${gen} → +[${adicionados.join(', ')}]`);
  }
}

// ─── Salvar ───────────────────────────────────────────────────────────────────
fs.writeFileSync(MEDS_PATH, JSON.stringify(meds, null, 2), 'utf-8');

console.log(`\n✓ medicamentos.json atualizado — ${totalAdicionados} sinonimos adicionados em ${log.length} medicamentos\n`);
console.log('Detalhes:');
log.forEach(l => console.log(l));
