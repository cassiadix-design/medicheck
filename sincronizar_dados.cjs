// sincronizar_dados.cjs
// MediCheck — Sincroniza alerta_idoso e categoria_beers da fonte principal
// para src/data/medicamento.json e garante public/medicamentos.json atualizado.
//
// Fluxo:
//   medicamentos.json (raiz, fonte principal)
//     → src/data/medicamento.json   (usado pelo Astro nas páginas /medicamento/[slug]/)
//     → public/medicamentos.json    (servido em runtime para a SPA)
//
// Nota: public/mc-interacoes-data-v3.js contém o array mcInteracoesDB (interações),
//       não objetos de medicamento — não precisa de sincronização de Beers.

const fs   = require("fs");
const path = require("path");

const ROOT_JSON   = path.join(__dirname, "medicamentos.json");
const SRC_JSON    = path.join(__dirname, "src", "data", "medicamento.json");
const PUBLIC_JSON = path.join(__dirname, "public", "medicamentos.json");

// ─── normalização para matching ──────────────────────────────────────────────

function norm(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")       // remove diacríticos
    .replace(/[^a-z0-9]/g, "");   // só alfanuméricos
}

// ─── main ─────────────────────────────────────────────────────────────────────

function sincronizar() {
  console.log("\n══════════════════════════════════════════");
  console.log("  SINCRONIZAÇÃO DE DADOS — MediCheck");
  console.log("══════════════════════════════════════════\n");

  // 1. Lê fonte principal
  const rawRoot = fs.readFileSync(ROOT_JSON, "utf-8");
  const dbRoot  = JSON.parse(rawRoot);
  const listaRoot = Array.isArray(dbRoot) ? dbRoot : dbRoot.medicamentos || Object.values(dbRoot);

  const comAlerta = listaRoot.filter(m => m.alerta_idoso === true);
  console.log(`📦 medicamentos.json (raiz): ${listaRoot.length} total | ${comAlerta.length} com alerta_idoso`);

  // Mapa normalizado: normNome → { alerta_idoso, categoria_beers }
  const mapaBeers = new Map();
  for (const m of listaRoot) {
    if (m.alerta_idoso === true) {
      mapaBeers.set(norm(m.nome), {
        alerta_idoso:   true,
        categoria_beers: m.categoria_beers || [],
      });
    }
  }

  // ── Passo 2: atualiza src/data/medicamento.json ──────────────────────────
  console.log("\n🔄 Atualizando src/data/medicamento.json...");

  const rawSrc  = fs.readFileSync(SRC_JSON, "utf-8");
  const listaSrc = JSON.parse(rawSrc);

  let atualizadosSrc = 0;
  let naoEncontradosSrc = 0;

  for (const med of listaSrc) {
    const chave = norm(med.nome);

    // Busca exata primeiro, depois prefixo, depois substring
    let dados =
      mapaBeers.get(chave) ||
      [...mapaBeers.entries()].find(([k]) => chave.startsWith(k) || k.startsWith(chave))?.[1] ||
      [...mapaBeers.entries()].find(([k]) => chave.includes(k) || k.includes(chave))?.[1];

    if (dados) {
      const mudou =
        med.alerta_idoso !== dados.alerta_idoso ||
        JSON.stringify(med.categoria_beers) !== JSON.stringify(dados.categoria_beers);

      med.alerta_idoso   = dados.alerta_idoso;
      med.categoria_beers = dados.categoria_beers;
      if (mudou) atualizadosSrc++;
    } else {
      // Garante que não fica com valor antigo incorreto
      if (med.alerta_idoso === true) {
        // mantém — estava marcado manualmente, não encontrou correspondência na raiz
        naoEncontradosSrc++;
      }
    }
  }

  fs.writeFileSync(SRC_JSON, JSON.stringify(listaSrc, null, 2), "utf-8");
  console.log(`   ✅ ${atualizadosSrc} medicamentos atualizados`);
  if (naoEncontradosSrc > 0) {
    console.log(`   ⚠️  ${naoEncontradosSrc} já tinham alerta_idoso mas sem correspondência direta na raiz`);
  }

  // Verifica resultado
  const srcComAlerta = listaSrc.filter(m => m.alerta_idoso === true).length;
  console.log(`   📊 src/data/medicamento.json: ${srcComAlerta} com alerta_idoso=true`);

  // ── Passo 3: sincroniza public/medicamentos.json ─────────────────────────
  console.log("\n🔄 Sincronizando public/medicamentos.json...");

  fs.copyFileSync(ROOT_JSON, PUBLIC_JSON);
  const pubComAlerta = listaRoot.filter(m => m.alerta_idoso === true).length;
  console.log(`   ✅ Copiado. ${pubComAlerta} medicamentos com alerta_idoso=true`);

  // ── Resumo ────────────────────────────────────────────────────────────────
  console.log("\n──────────────────────────────────────────");
  console.log(`📋 RESUMO:`);
  console.log(`   medicamentos.json (raiz)       : ${listaRoot.length} meds | ${comAlerta.length} Beers`);
  console.log(`   src/data/medicamento.json       : ${listaSrc.length} meds | ${srcComAlerta} Beers`);
  console.log(`   public/medicamentos.json        : ${listaRoot.length} meds | ${pubComAlerta} Beers (espelho da raiz)`);
  console.log("══════════════════════════════════════════\n");
}

sincronizar();
