// fix_duplicatas2.cjs — Corrige 19 duplicatas no medicamentos.json
'use strict';
const fs = require('fs');

let meds = JSON.parse(fs.readFileSync('medicamentos.json', 'utf8'));
console.log('Antes:', meds.length, 'entradas');

// ── Regra: dado dois índices, remover o indicado ───────────────────────────
// remove por índice (em ordem decrescente para não deslocar outros)
const remover = new Set();

// 1. ACARBOSE — manter [465] (462 chars desc), remover [0]
remover.add(0);

// 2. FEXOFENADINA — manter [474] (502 chars), remover [18]
remover.add(18);

// 3. MEDICAMENTO HOMEOPÁTICO COMPOSTO — remover ambos [20] e [21]
remover.add(20);
remover.add(21);

// 4. DIPIRONA SÓDICA MONOIDRATADA — manter [321] (258 chars), remover [33]
remover.add(33);

// 5. APIXABANA — manter [468] (23 chaves + 454 chars), remover [39]
remover.add(39);

// 6. ÁCIDO ACETILSALICÍLICO — manter [42] (165 chars), remover [41]
remover.add(41);

// 7. BUPRENORFINA — manter [74] (24 chaves + 372 chars), remover [73]
remover.add(73);

// 8. BUTILBROMETO DE ESCOPOLAMINA — [76] foca no Buscopan (268 chars + bem completo)
//    [225] foca em "Hioscina" generic com nome diferente — remover [225]
remover.add(225);

// 9. DEXCLORFENIRAMINA — [145] tem 24 chaves, [475] tem 466 chars desc
//    [475] tem alerta_farmaceutico mais rico sobre interações; [145] tem classe_receita
//    Manter [475] (mais educativo), remover [145]
remover.add(145);

// 10. FENOBARBITAL — [469] tem 483 chars + alerta_farmaceutico rico, [187] tem 24 chaves
//     Manter [469], remover [187]
remover.add(187);

// 11. FLUOXETINA — manter [199] (415 chars), remover [198]
remover.add(198);

// 12. FUROSEMIDA — manter [206] (393 chars), remover [205]
remover.add(205);

// 13. GLIMEPIRIDA — [464] tem 410 chars + alerta interações (mais educativo), remover [213]
remover.add(213);

// 14. MELATONINA — [471] tem mais chaves (23 vs 22) + sinonimos + receita_nota, desc similar
//     Manter [471], remover [278]
remover.add(278);

// 15. NISTATINA — [476] tem informação de prescrição correta (OTC) + 456 chars desc
//     [316] marca como "TARJADO" incorretamente para suspensão OTC — remover [316]
remover.add(316);

// 16. PREDNISOLONA — manter [352] (477 chars), remover [351]
remover.add(351);

// 17. SEMEGLUTIDA — produtos DIFERENTES (oral vs injetável): diferenciar o generico
//     [378] = Rybelsus (oral) → generico: "Semaglutida Oral (Rybelsus)"
//     [387] = Ozempic/Wegovy (injetável) → generico: "Semaglutida"
//     Não remover nenhum; apenas renomear o oral
meds[378].generico = 'Semaglutida Oral (Rybelsus)';

// 18. SIMETICONA — manter [477] (23 chaves + 455 chars), remover [392]
remover.add(392);

// 19. ÁCIDO VALPROICO — produtos DIFERENTES (solução vs LP): diferenciar
//     [429] "Solução Oral" → generico: "Ácido Valproico / Valproato de Sódio"  (manter)
//     [430] "LP" → generico: "Ácido Valproico LP / Valproato de Sódio LP"
meds[430].generico = 'Ácido Valproico LP / Valproato de Sódio LP';

// ── Aplicar remoções ───────────────────────────────────────────────────────
const removidos = [...remover].sort((a, b) => b - a); // ordem decrescente
removidos.forEach(i => {
  console.log('  Removendo [' + i + ']:', meds[i].generico);
  meds.splice(i, 1);
});

console.log('\nDiferenciados (não removidos):');
console.log('  Semaglutida Oral → generico: "Semaglutida Oral (Rybelsus)"');
console.log('  Valproato LP → generico: "Ácido Valproico LP / Valproato de Sódio LP"');

console.log('\nDepois:', meds.length, 'entradas');

fs.writeFileSync('medicamentos.json', JSON.stringify(meds, null, 2), 'utf8');
console.log('✅ medicamentos.json salvo');

// Verificar se ainda há duplicatas
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
const grupos = {};
meds.forEach(m => {
  const k = norm(m.generico);
  grupos[k] = (grupos[k] || 0) + 1;
});
const restantes = Object.entries(grupos).filter(([, v]) => v > 1);
console.log('\nDuplicatas restantes:', restantes.length);
restantes.forEach(([k]) => console.log('  -', k));
