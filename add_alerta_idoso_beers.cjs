// add_alerta_idoso_beers.cjs
// MediCheck — Marca alerta_idoso: true e categoria_beers nos medicamentos
// Baseado nos Critérios de Beers 2023 (American Geriatrics Society)

const fs   = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "medicamentos.json");

// ─── mapeamento termo → categorias ───────────────────────────────────────────
// Cada entrada: { termos: [...], categorias: [...] }
// Um medicamento pode ter múltiplas categorias (ex: Tramadol: cautela+queda+cognitivo)

const MAPEAMENTO = [

  // ══════════════════════════════════════════
  // GRUPO EVITAR
  // ══════════════════════════════════════════

  // Benzodiazepínicos
  { termos: ["alprazolam"],                     categorias: ["evitar"] },
  { termos: ["bromazepam"],                     categorias: ["evitar"] },
  { termos: ["clonazepam"],                     categorias: ["evitar"] },
  { termos: ["diazepam"],                       categorias: ["evitar"] },
  { termos: ["lorazepam"],                      categorias: ["evitar"] },
  { termos: ["midazolam"],                      categorias: ["evitar"] },
  { termos: ["nitrazepam"],                     categorias: ["evitar"] },
  { termos: ["triazolam"],                      categorias: ["evitar"] },
  { termos: ["clobazam"],                       categorias: ["evitar"] },

  // Z-drugs
  { termos: ["zolpidem"],                       categorias: ["evitar"] },
  { termos: ["zopiclona"],                      categorias: ["evitar"] },
  { termos: ["zaleplon", "zaleplom"],           categorias: ["evitar"] },

  // Anti-histamínicos 1ª geração (também cognitivo — anticolinérgicos)
  { termos: ["prometazina"],                    categorias: ["evitar", "cognitivo"] },
  { termos: ["hidroxizina"],                    categorias: ["evitar", "cognitivo"] },
  { termos: ["difenidramina"],                  categorias: ["evitar", "cognitivo"] },
  { termos: ["dexclorfeniramina"],              categorias: ["evitar", "cognitivo"] },
  { termos: ["clemastina"],                     categorias: ["evitar", "cognitivo"] },

  // Antidepressivos tricíclicos (também cognitivo — anticolinérgicos)
  { termos: ["amitriptilina"],                  categorias: ["evitar", "cognitivo"] },
  { termos: ["nortriptilina"],                  categorias: ["evitar", "cognitivo"] },
  { termos: ["imipramina"],                     categorias: ["evitar", "cognitivo"] },
  { termos: ["clomipramina"],                   categorias: ["evitar", "cognitivo"] },
  { termos: ["desipramina"],                    categorias: ["evitar", "cognitivo"] },

  // Antipsicóticos típicos (também cognitivo — anticolinérgicos)
  { termos: ["haloperidol"],                    categorias: ["evitar", "cognitivo"] },
  { termos: ["clorpromazina"],                  categorias: ["evitar", "cognitivo"] },
  { termos: ["levomepromazina"],                categorias: ["evitar", "cognitivo"] },
  { termos: ["trifluoperazina"],                categorias: ["evitar", "cognitivo"] },
  { termos: ["flufenazina"],                    categorias: ["evitar", "cognitivo"] },
  { termos: ["periciazina"],                    categorias: ["evitar", "cognitivo"] },
  { termos: ["pimozida"],                       categorias: ["evitar", "cognitivo"] },

  // AINEs
  { termos: ["ibuprofeno"],                     categorias: ["evitar"] },
  { termos: ["diclofenaco"],                    categorias: ["evitar"] },
  { termos: ["naproxeno"],                      categorias: ["evitar"] },
  { termos: ["cetoprofeno"],                    categorias: ["evitar"] },
  { termos: ["piroxicam"],                      categorias: ["evitar"] },
  { termos: ["meloxicam"],                      categorias: ["evitar"] },
  { termos: ["indometacina"],                   categorias: ["evitar"] },

  // Relaxantes musculares
  { termos: ["carisoprodol"],                   categorias: ["evitar"] },
  { termos: ["ciclobenzaprina"],                categorias: ["evitar"] },
  { termos: ["metaxalona"],                     categorias: ["evitar"] },

  // Anticolinérgicos bexiga (também cognitivo)
  { termos: ["oxibutinina"],                    categorias: ["evitar", "cognitivo"] },
  { termos: ["solifenacina"],                   categorias: ["evitar", "cognitivo"] },
  { termos: ["fesoterodina"],                   categorias: ["evitar", "cognitivo"] },
  { termos: ["tolterodina"],                    categorias: ["evitar", "cognitivo"] },

  // Outros evitar
  { termos: ["digoxina"],                       categorias: ["evitar", "cognitivo"] },
  { termos: ["glibenclamida"],                  categorias: ["evitar"] },
  { termos: ["clorpropamida"],                  categorias: ["evitar"] },
  { termos: ["metoclopramida"],                 categorias: ["evitar", "cognitivo"] },
  { termos: ["domperidona"],                    categorias: ["evitar", "cognitivo"] },
  { termos: ["meperidina", "petidina"],         categorias: ["evitar"] },
  { termos: ["nitrofurantoína","nitrofurantoina"], categorias: ["evitar"] },

  // ══════════════════════════════════════════
  // GRUPO CAUTELA
  // ══════════════════════════════════════════

  // IECAs
  { termos: ["captopril"],                      categorias: ["cautela"] },
  { termos: ["enalapril"],                      categorias: ["cautela"] },
  { termos: ["losartana"],                      categorias: ["cautela"] },
  { termos: ["valsartana"],                     categorias: ["cautela"] },
  { termos: ["ramipril"],                       categorias: ["cautela"] },

  // Diuréticos de alça
  { termos: ["furosemida"],                     categorias: ["cautela"] },
  { termos: ["bumetanida"],                     categorias: ["cautela"] },

  // Anticoagulantes
  { termos: ["varfarina", "warfarina"],         categorias: ["cautela"] },
  { termos: ["rivaroxabana"],                   categorias: ["cautela"] },
  { termos: ["apixabana"],                      categorias: ["cautela"] },
  { termos: ["dabigatrana"],                    categorias: ["cautela"] },

  // Opioides (também queda e cognitivo)
  { termos: ["tramadol"],                       categorias: ["cautela", "queda", "cognitivo"] },
  { termos: ["codeína","codeina"],              categorias: ["cautela", "queda"] },
  { termos: ["morfina"],                        categorias: ["cautela", "queda", "cognitivo"] },
  { termos: ["fentanila"],                      categorias: ["cautela", "queda", "cognitivo"] },

  // IBPs
  { termos: ["omeprazol"],                      categorias: ["cautela"] },
  { termos: ["pantoprazol"],                    categorias: ["cautela"] },
  { termos: ["esomeprazol"],                    categorias: ["cautela"] },
  { termos: ["lansoprazol"],                    categorias: ["cautela"] },

  // Insulinas
  { termos: ["insulina"],                       categorias: ["cautela"] },

  // Antipsicóticos atípicos
  { termos: ["quetiapina"],                     categorias: ["cautela"] },
  { termos: ["risperidona"],                    categorias: ["cautela"] },
  { termos: ["olanzapina"],                     categorias: ["cautela"] },
  { termos: ["aripiprazol"],                    categorias: ["cautela"] },

  // ══════════════════════════════════════════
  // GRUPO QUEDA
  // ══════════════════════════════════════════

  // ISRS
  { termos: ["fluoxetina"],                     categorias: ["queda"] },
  { termos: ["sertralina"],                     categorias: ["queda"] },
  { termos: ["escitalopram"],                   categorias: ["queda"] },
  { termos: ["paroxetina"],                     categorias: ["queda"] },
  { termos: ["citalopram"],                     categorias: ["queda"] },

  // IRSN
  { termos: ["venlafaxina"],                    categorias: ["queda"] },
  { termos: ["duloxetina"],                     categorias: ["queda"] },

  // Anti-hipertensivos
  { termos: ["anlodipino", "amlodipino"],       categorias: ["queda"] },
  { termos: ["nifedipino"],                     categorias: ["queda"] },
  { termos: ["atenolol"],                       categorias: ["queda"] },
  { termos: ["propranolol"],                    categorias: ["queda"] },
  { termos: ["metoprolol"],                     categorias: ["queda"] },
  { termos: ["doxazosina"],                     categorias: ["queda"] },
  { termos: ["clonidina"],                      categorias: ["queda"] },

  // Antiepilépticos
  { termos: ["carbamazepina"],                  categorias: ["queda"] },
  { termos: ["valproato", "ácido valpróico", "acido valproico"], categorias: ["queda"] },
  { termos: ["fenitoína","fenitoina"],          categorias: ["queda"] },
  { termos: ["gabapentina"],                    categorias: ["queda"] },
  { termos: ["pregabalina"],                    categorias: ["queda"] },

  // ══════════════════════════════════════════
  // GRUPO COGNITIVO (além dos já marcados acima)
  // ══════════════════════════════════════════

  // Corticoides sistêmicos
  { termos: ["prednisona"],                     categorias: ["cognitivo"] },
  { termos: ["prednisolona"],                   categorias: ["cognitivo"] },
  { termos: ["dexametasona"],                   categorias: ["cognitivo"] },
];

// ─── helpers ─────────────────────────────────────────────────────────────────

function normStr(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function nomeBate(nomed, termo) {
  const n = normStr(nomed);
  const t = normStr(termo);
  return n.startsWith(t) || n.includes(t);
}

// ─── main ─────────────────────────────────────────────────────────────────────

function marcarAlertas() {
  if (!fs.existsSync(DB_PATH)) {
    console.error("❌ medicamentos.json não encontrado");
    process.exit(1);
  }

  const raw  = fs.readFileSync(DB_PATH, "utf-8");
  const db   = JSON.parse(raw);
  const lista = Array.isArray(db) ? db : db.medicamentos || Object.values(db);

  // Para cada medicamento, acumula o conjunto de categorias Beers
  // Mapa: índice na lista → Set de categorias
  const categoriasPorIdx = new Map();

  const naoEncontrados = [];

  for (const entrada of MAPEAMENTO) {
    let encontrouAlgum = false;

    for (const termo of entrada.termos) {
      const matches = lista
        .map((m, i) => ({ m, i }))
        .filter(({ m }) => nomeBate(m.nome, termo));

      if (matches.length > 0) {
        encontrouAlgum = true;
        for (const { i } of matches) {
          if (!categoriasPorIdx.has(i)) categoriasPorIdx.set(i, new Set());
          for (const cat of entrada.categorias) {
            categoriasPorIdx.get(i).add(cat);
          }
        }
      }
    }

    if (!encontrouAlgum) {
      // Só reporta não encontrado pelo termo principal
      naoEncontrados.push(entrada.termos[0]);
    }
  }

  // Aplica ao banco
  let totalMarcados = 0;
  for (const [idx, cats] of categoriasPorIdx.entries()) {
    const med = lista[idx];
    const jaEra = med.alerta_idoso === true;
    med.alerta_idoso   = true;
    med.categoria_beers = Array.from(cats).sort();
    if (!jaEra) totalMarcados++;
  }

  // Salva
  const dbAtualizado = Array.isArray(db)
    ? lista
    : { ...db, medicamentos: lista };
  fs.writeFileSync(DB_PATH, JSON.stringify(dbAtualizado, null, 2), "utf-8");

  // Relatório por categoria
  const porCat = { evitar: [], cautela: [], queda: [], cognitivo: [] };
  for (const [idx, cats] of categoriasPorIdx.entries()) {
    const nome = lista[idx].nome;
    for (const cat of cats) {
      if (porCat[cat]) porCat[cat].push(nome);
    }
  }

  console.log("\n══════════════════════════════════════════");
  console.log("  RELATÓRIO — Critérios de Beers 2023");
  console.log("══════════════════════════════════════════");

  for (const [cat, nomes] of Object.entries(porCat)) {
    const emoji = { evitar: "🚫", cautela: "⚠️ ", queda: "🦯", cognitivo: "🧠" }[cat];
    console.log(`\n${emoji} ${cat.toUpperCase()} (${nomes.length} medicamentos):`);
    nomes.sort().forEach(n => console.log(`   ✅ ${n}`));
  }

  if (naoEncontrados.length > 0) {
    console.log(`\n❓ NÃO ENCONTRADOS no banco (${naoEncontrados.length}):`);
    naoEncontrados.forEach(n => console.log(`   - ${n}`));
  }

  console.log("\n──────────────────────────────────────────");
  console.log(`📦 Medicamentos marcados no total : ${categoriasPorIdx.size}`);
  console.log(`   (sendo ${totalMarcados} novos + ${categoriasPorIdx.size - totalMarcados} já marcados anteriormente)`);
  console.log("══════════════════════════════════════════\n");
}

marcarAlertas();
