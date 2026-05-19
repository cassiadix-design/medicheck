# MediCheck — Roadmap e Estado do Projeto

> Última atualização: 2026-05-19

---

## Estado Atual do Banco

| Métrica | Valor |
|---|---|
| Medicamentos no banco (`medicamentos.json`) | **518** |
| Duplicatas | **0** |
| Páginas HTML individuais (`medicamentos/*/index.html`) | **485** |
| Regras de interação (`mc-interacoes-data-v3.js`) | **821** |
| Regras de interação (`interacoes.json`) | **827** |
| Medicamentos com ao menos 1 interação cadastrada | **372 / 518 (72%)** |
| Medicamentos sem interações cadastradas | **146** |

---

## Medicamentos sem Interações — Classificação

### Prioridade Alta — Clinicamente Relevantes (cadastrar interações)

Estes têm potencial real de interação grave e deveriam ter regras no banco:

| Medicamento | Razão clínica |
|---|---|
| Warfarina / Varfarina | Anticoagulante com janela terapêutica estreitíssima; dezenas de interações críticas |
| Heparina Sódica | Anticoagulante parenteral; risco com AINEs, antiplaquetários |
| Enoxaparina Sódica | HBPM; risco com AINEs, antiplaquetários, outros anticoagulantes |
| Levotiroxina Sódica | Margem estreita; interações com ferro, cálcio, IBPs, colestiramina |
| Citrato de Fentanila | Opioide potente; interações com depressores do SNC, inibidores CYP3A4 |
| Sulfato de Morfina | Opioide; depressores do SNC, MAOIs |
| Cloridrato de Donepezila | Anticolinesterásico; risco com anticolinérgicos, betabloqueadores |
| Cloridrato de Memantina | NMDA antagonista; interações com amantadina, cetamina, dextrometorfano |
| Montelucaste de Sódio | Interações com CYP3A4/2C8 (carbamazepina, rifampicina) |
| Cloridrato de Moxifloxacino | Fluoroquinolona; risco de QT prolongado com antiarrítmicos |
| Sacubitril / Valsartana | ARNI; interações com IECAs, lítio, AINEs (idem aos BRAs) |
| Lopinavir + Ritonavir | ARV inibidor de protease; inibidor potente de CYP3A4 |
| Tenofovir Disoproxila | ARV; nefrotóxico — interações com outros nefrotóxicos |
| Mesilato de Rasagilina | IMAO-B; interações graves com antidepressivos, tramadol, simpaticomiméticos |
| Dimesilato de Lisdexanfetamina | Estimulante; risco com MAOIs, simpaticomiméticos, antihipertensivos |
| Dicloridrato de Pramipexol | Agonista dopaminérgico; interações com antipsicóticos, metoclopramida |
| Cloridrato de Tapentadol | Opioide + IRSN; risco com MAOIs, outros serotonérgicos |
| Benzoato de Rizatriptana | Triptano; interações com MAOIs, ergotamina, outros serotonérgicos |
| Succinato de Sumatriptana | Triptano; idem rizatriptana |
| Repaglinida | Glinida; metabolismo CYP3A4/CYP2C8; risco hipoglicemia |
| Diclofenaco de Sódio / Diclofenaco Potássico | AINE; idem outros AINEs (anticoagulantes, IECAs, lítio) |
| Divalproato de Sódio | Antiepiléptico; interações com outros antiepilépticos, metotrexato |
| Esomeprazol Magnésico | IBP; interações com clopidogrel, metotrexato, digoxina |
| Pantoprazol Sódico | IBP; idem esomeprazol |
| Rabeprazol Sódico | IBP; idem esomeprazol |
| Cloridrato de Oxibutinina | Anticolinérgico; risco com outros anticolinérgicos, depressores SNC |
| Cloridrato de Ciclobenzaprina | Relaxante muscular; risco com MAOIs, álcool, depressores SNC |

### Combinações Fixas — Herdam dos Componentes

Já cobertos individualmente; podem receber nota de herança na página:

- Amoxicilina + Clavulanato de Potássio
- Fexofenadina + Pseudoefedrina
- Alogliptina + Metformina
- Dapagliflozina + Metformina
- Vildagliptina + Metformina
- Anlodipino + Atorvastatina
- Anlodipino besilato + Hidroclorotiazida
- Bisoprolol + Hidroclorotiazida
- Espironolactona + Hidroclorotiazida
- Atorvastatina + Ezetimiba
- Formoterol + Budesonida
- Formoterol + Fluticasona
- Salmeterol + Propionato de Fluticasona
- Dexclorfeniramina + Betametasona
- Butilbrometo de Escopolamina + Dipirona
- Nimesulida + Ciclobenzaprina

### Tópicos / Dermatológicos — Sem Interação Sistêmica Relevante

Uso tópico; interações sistêmicas não se aplicam para o público-alvo:

Ácido Hialurônico, Ácido Salicílico, Adapaleno, Benzocaína + Tirotricina, Benzidamina, Benzoíla Peroxida, Clorexidina, Clotrimazol, Colagenase, Colagenase + Cloranfenicol, Hidroquinona, Ivermectina 1% creme, Miconazol, Mupirocina, Oximetazolina, Permetrina, Peróxido de Benzoíla, Pimecrolimo, Propionato de Clobetasol, Rifamicina SV, Sulfadiazina de prata, Tretinoína

### Suplementos / Vitaminas / Minerais — Interações Menores

Baixa prioridade para o perfil do site; cadastrar apenas se relevante:

Biotina, Cálcio/Vitamina D, Cianocobalamina / Cobalamina, Colágeno hidrolisado, Complexo de Vitaminas do Complexo B, Curcumina, Gluconato de cobre, L-Treonato de magnésio, Levo-carnitina, Magnésio Quelato, Menaquinona-7, Ácidos graxos ômega-3, Picolinato de cromo, Selenometionina, Tiamina, Trans-resveratrol, Zinco, Colecalciferol Alta Dose

### Soluções / Eletrólitos / Produto Especial — Não Aplicável

Cloreto de Sódio, Cloreto de Sódio 0,9% Solução Nasal, Cloreto de Sódio 3% Hipertônica, Sacarato de Hidróxido Férrico, Ferro Quelato Bisglicinato, Albumina Humana, Imunoglobulina humana normal, Sulfato de condroitina + Glucosamina, Saccharomyces boulardii, Iodeto de potássio / Iodo molecular

---

## Tarefas Pendentes

### 1. Conteúdo — Interações

- [ ] Cadastrar interações dos 27 medicamentos de Prioridade Alta listados acima
- [ ] Adicionar `mcAlias` / `mcMedNomes` corretos a "Warfarina (também conhecida como Varfarina)" para que o matching automático funcione
- [ ] Verificar se Diclofenaco de Sódio / Potássico está sendo coberto pelo alias "diclofenaco" já cadastrado

### 2. Conteúdo — Medicamentos Novos a Adicionar

Fármacos relevantes ainda ausentes do banco (sugestões baseadas no perfil clínico brasileiro):

- **Oncologia**: Capecitabina, Tamoxifeno (injetável), Anastrozol, Exemestano, Imatinibe
- **Cardiologia**: Sacubitril/Valsartana (já existe, falta interação), Ivabradina
- **Neurologia**: Brivaracetam (já existe), Eslicarbazepina, Vigabatrina
- **Endocrinologia**: Canagliflozina, Ertugliflozina, Albiglutida
- **Infectologia**: Bedaquilina, Clofazimina, Delamanida (tuberculose MDR)
- **Imunologia/Reumatologia**: Secuquinumabe, Ixequizumabe, Guselcumabe, Ustecinumabe

### 3. SEO

- [ ] Adicionar meta description única a cada página de medicamento (atualmente herdam a padrão)
- [ ] Criar `robots.txt` revisado com regras explícitas para bots de IA (GPTBot, ClaudeBot, PerplexityBot)
- [ ] Revisar `sitemap.xml` — garantir que as 485 páginas estão listadas com `<lastmod>` correto
- [ ] Adicionar Open Graph tags (`og:title`, `og:description`, `og:image`) nas páginas de medicamento para compartilhamento em redes sociais
- [ ] Criar páginas de categoria (ex: `/categoria/antidepressivos/`, `/categoria/antihipertensivos/`) para captura de tráfego de cauda longa
- [ ] Adicionar schema.org `MedicalEntity` ou `Drug` structured data nas páginas de medicamento
- [ ] Verificar e corrigir links canônicos em páginas com slug renomeado (Semaglutida Oral, Valproato LP)

### 4. Páginas Pendentes de Criação

Dois medicamentos foram renomeados durante a deduplicação e não têm páginas HTML ainda:

- [ ] `medicamentos/semaglutida-oral-rybelsus/index.html` (slug novo após renomear para diferenciar do Ozempic injetável)
- [ ] `medicamentos/acido-valproico-lp-valproato-de-sodio-lp/index.html` (slug novo para a formulação LP)

### 5. Qualidade de Dados

- [ ] Auditar entradas com `generico` muito longo (ex: "Solução de sulfato de magnésio anidro com álcool...") — simplificar para melhor UX
- [ ] Padronizar campo `classe_receita` — alguns medicamentos OTC estão marcados como "TARJADO" (verificar após deduplicação)
- [ ] Revisar `sinonimos` / `mcMedNomes` para medicamentos com matching incompleto (Warfarina, Diclofenaco, IBPs)
- [ ] Garantir que todas as combinações fixas (ex: Amoxicilina + Clavulanato) têm `mcAlias` apontando para os monofármacos

### 6. Manutenção Contínua

- [ ] Manter atualizado conforme novas aprovações da ANVISA
- [ ] Revisar interações ao publicar atualizações de bulas (especialmente para medicamentos com janela terapêutica estreita)
- [ ] Monitorar erros 404 via Netlify Analytics para detectar slugs quebrados
- [ ] Validar periodicamente se `mc-interacoes-data-v3.js` e `interacoes.json` estão sincronizados (contagens divergem: 821 vs 827)

---

## Histórico Resumido de Versões

| Data | Evento |
|---|---|
| 2026-05-19 | Deduplicação completa: 536 → 518 medicamentos (0 duplicatas); 821 regras de interação adicionadas em 4 lotes (P1–P4); 485 páginas HTML geradas |
| — | 13 medicamentos especiais adicionados (ARVs, antifúngicos, metadona, tamoxifeno, ciclosporina) |
| — | 14 novos medicamentos adicionados (lote `novos14`) |
| — | Interações de dronedarona, sotalol, clortalidona adicionadas |
