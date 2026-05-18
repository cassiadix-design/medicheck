const fs = require('fs');
const path = require('path');

const MEDS_PATH = path.join(__dirname, 'medicamentos.json');
const INPUT_PATH = path.join(__dirname, 'cardiovasculares.json');

if (!fs.existsSync(INPUT_PATH)) {
  console.error('❌ Arquivo cardiovasculares.json não encontrado na pasta do projeto.');
  process.exit(1);
}

const meds = JSON.parse(fs.readFileSync(MEDS_PATH, 'utf8'));
const novos = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf8'));

if (!Array.isArray(novos)) {
  console.error('❌ cardiovasculares.json deve ser um array de medicamentos.');
  process.exit(1);
}

const CAMPOS_OBRIGATORIOS = ['nome', 'generico', 'tipo', 'sinonimos', 'descricao',
  'receita', 'receita_display', 'receita_cor', 'receita_descricao', 'receita_nota',
  'efeitos', 'aviso_grave', 'recomendacao', 'educacao', 'resposta_rapida',
  'receita_obrigatoria', 'tipo_receita', 'retencao_receita', 'perguntas_frequentes',
  'descricao_seo', 'alerta_farmaceutico', 'quando_procurar_medico', 'interacoes'];

const genericos = new Set(meds.map(m => m.generico?.toLowerCase().trim()));

let adicionados = 0;
let duplicatas = 0;
let invalidos = 0;

for (const med of novos) {
  const faltando = CAMPOS_OBRIGATORIOS.filter(c => !(c in med));
  if (faltando.length > 0) {
    console.warn(`⚠️  "${med.nome || med.generico || '?'}" ignorado — campos ausentes: ${faltando.join(', ')}`);
    invalidos++;
    continue;
  }

  const chave = med.generico.toLowerCase().trim();
  if (genericos.has(chave)) {
    console.warn(`⚠️  "${med.nome}" já existe (generico: "${med.generico}") — pulando.`);
    duplicatas++;
    continue;
  }

  meds.push(med);
  genericos.add(chave);
  console.log(`✅ Adicionado: ${med.nome}`);
  adicionados++;
}

if (adicionados > 0) {
  fs.writeFileSync(MEDS_PATH, JSON.stringify(meds, null, 2), 'utf8');
}

console.log(`\n📊 Resultado:`);
console.log(`   Total anterior : ${meds.length - adicionados} medicamentos`);
console.log(`   Adicionados    : ${adicionados}`);
console.log(`   Duplicatas     : ${duplicatas}`);
console.log(`   Inválidos      : ${invalidos}`);
console.log(`   Total atual    : ${meds.length}`);
