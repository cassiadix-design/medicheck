const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const ARQUIVO = path.join(__dirname, 'medicamentos.json');
const DELAY_MS = 500; // meio segundo entre requisições

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function buildPrompt(med) {
  const perguntas = med.perguntas_frequentes.map(f => f.pergunta).join('\n- ');
  return `Você é um farmacêutico especialista. Crie 5 perguntas de cauda longa (long-tail) em português brasileiro sobre o medicamento "${med.generico}" (${med.tipo}), com suas respectivas respostas.

Perguntas já existentes (NÃO repita nem varie estas):
- ${perguntas}

Contexto do medicamento:
- Descrição: ${med.descricao}
- Principais efeitos: ${med.efeitos}
- Receita: ${med.receita_display}

Regras:
1. Perguntas devem ser específicas e de busca real (ex: "Posso tomar ${med.generico} com álcool?", "Quanto tempo demora para ${med.generico} fazer efeito?")
2. Respostas curtas e diretas (1-3 frases), linguagem acessível ao paciente
3. NÃO repita temas já cobertos pelas perguntas existentes
4. Retorne APENAS JSON válido, sem explicações, no formato:
[
  {"pergunta": "...", "resposta": "..."},
  {"pergunta": "...", "resposta": "..."},
  {"pergunta": "...", "resposta": "..."},
  {"pergunta": "...", "resposta": "..."},
  {"pergunta": "...", "resposta": "..."}
]`;
}

async function gerarFaqs(med) {
  const resposta = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [{ role: 'user', content: buildPrompt(med) }]
  });

  const texto = resposta.content[0].text.trim();
  // extrai o JSON mesmo se vier com texto ao redor
  const match = texto.match(/\[[\s\S]*\]/);
  if (!match) throw new Error('Resposta sem JSON válido: ' + texto.slice(0, 200));
  return JSON.parse(match[0]);
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Erro: defina a variável ANTHROPIC_API_KEY');
    process.exit(1);
  }

  const meds = JSON.parse(fs.readFileSync(ARQUIVO, 'utf8'));
  const inicio = parseInt(process.env.START_INDEX || '0');
  const fim = parseInt(process.env.END_INDEX || String(meds.length));
  let processados = 0, erros = 0;

  console.log(`Processando índices ${inicio}–${fim - 1} (${fim - inicio} medicamento(s))`);

  for (let i = inicio; i < fim; i++) {
    const med = meds[i];
    try {
      const novasFaqs = await gerarFaqs(med);
      med.perguntas_frequentes = [...(med.perguntas_frequentes || []), ...novasFaqs];
      processados++;

      // salva a cada 10 medicamentos para não perder progresso
      if (processados % 10 === 0) {
        fs.writeFileSync(ARQUIVO, JSON.stringify(meds, null, 2), 'utf8');
        console.log(`[${i + 1}/${meds.length}] Salvo após ${processados} processados`);
      } else {
        process.stdout.write(`[${i + 1}/${meds.length}] ${med.generico}\r`);
      }
    } catch (err) {
      erros++;
      console.error(`\nErro em ${med.generico} (índice ${i}): ${err.message}`);
      // salva o que tem até agora antes de continuar
      fs.writeFileSync(ARQUIVO, JSON.stringify(meds, null, 2), 'utf8');
    }

    if (i < meds.length - 1) await sleep(DELAY_MS);
  }

  // salva final
  fs.writeFileSync(ARQUIVO, JSON.stringify(meds, null, 2), 'utf8');
  console.log(`\nConcluído: ${processados} processados, ${erros} erros`);
}

main().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
