#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const JS_PATH = path.join(__dirname, 'public', 'mc-interacoes-data-v3.js');
const MARKER = '\nvar mcIECAnomes';

const novas = [
  // ── AMBROXOL ──────────────────────────────────────────────────────────────
  {
    med1: ['ambroxol','mucosolvan','bisolvon','fluibron'],
    med2: ['codeina','dextrometorfano','antitussigeno'],
    nivel: 'alto',
    titulo: 'Ambroxol + Antitussígeno (Codeína, Dextrometorfano)',
    mecanismo: 'Ambroxol fluidifica e mobiliza o muco, enquanto antitussígenos suprimem o reflexo da tosse. A combinação resulta em acúmulo de secreção nas vias aéreas.',
    efeito: 'Obstrução respiratória por acúmulo de muco; risco aumentado de infecção respiratória secundária.',
    conduta: 'Combinação contraindicada. Orientar paciente a não associar mucolítico com supressor de tosse. Se tosse for produtiva, manter o mucolítico e suspender o antitussígeno.'
  },
  {
    med1: ['ambroxol','mucosolvan','bisolvon'],
    med2: ['amoxicilina','eritromicina','cefuroxima','doxiciclina','antibiotico betalactamico'],
    nivel: 'info',
    titulo: 'Ambroxol + Antibiótico (Amoxicilina, Eritromicina)',
    mecanismo: 'Ambroxol aumenta a concentração tissular pulmonar de vários antibióticos (amoxicilina, eritromicina, cefuroxima) em 20–100% por mecanismo de redistribuição tecidual.',
    efeito: 'Sinergia terapêutica benéfica: melhora a eficácia antibiótica nas infecções respiratórias.',
    conduta: 'Combinação favorável e frequente na prática clínica. Não é necessário ajustar dose do antibiótico. Informar o paciente sobre o benefício da associação.'
  },
  {
    med1: ['ambroxol','mucosolvan','bisolvon'],
    med2: ['lidocaina','anestesico local','benzocaina'],
    nivel: 'moderado',
    titulo: 'Ambroxol + Anestésico Local (Lidocaína)',
    mecanismo: 'Ambroxol possui atividade bloqueadora de canais de sódio (efeito anestésico local intrínseco em mucosas). A combinação com anestésicos locais pode potencializar o bloqueio.',
    efeito: 'Potencialização do efeito anestésico local em mucosas; pode aumentar risco de anestesia local excessiva em procedimentos orofaríngeos.',
    conduta: 'Monitorar em procedimentos com anestesia tópica. Em uso domiciliar, a associação é pouco relevante clinicamente, mas deve ser considerada em ambiente hospitalar.'
  },

  // ── BENZILPENICILINA BENZATINA ────────────────────────────────────────────
  {
    med1: ['benzilpenicilina','benzetacil','penicilina g','penicilina benzatina'],
    med2: ['probenecida'],
    nivel: 'moderado',
    titulo: 'Benzilpenicilina + Probenecida',
    mecanismo: 'Probenecida inibe a secreção tubular renal da penicilina, reduzindo sua eliminação e elevando as concentrações plasmáticas e a meia-vida.',
    efeito: 'Aumento das concentrações de penicilina — pode ser intencional (p.ex. em gonorreia) ou acidental, aumentando risco de neurotoxicidade em doses altas.',
    conduta: 'Associação às vezes intencional para prolongar a ação da penicilina. Se não intencional, monitorar sinais de toxicidade (convulsões, encefalopatia em doses altas IV).'
  },
  {
    med1: ['benzilpenicilina','benzetacil','penicilina g','penicilina benzatina'],
    med2: ['metotrexato','mtx'],
    nivel: 'alto',
    titulo: 'Benzilpenicilina + Metotrexato',
    mecanismo: 'Penicilinas competem com o metotrexato pela secreção tubular renal, reduzindo sua eliminação e elevando os níveis plasmáticos de MTX.',
    efeito: 'Toxicidade por acúmulo de metotrexato: mielossupressão, mucosite, hepatotoxicidade, nefrotoxicidade.',
    conduta: 'Evitar associação quando possível. Se necessária, monitorar hemograma e função renal. Uso de leucovorina (ácido folínico) como "resgate" pode ser necessário.'
  },
  {
    med1: ['benzilpenicilina','benzetacil','penicilina g','penicilina benzatina'],
    med2: ['tetraciclina','doxiciclina','cloranfenicol'],
    nivel: 'moderado',
    titulo: 'Benzilpenicilina + Tetraciclina / Cloranfenicol',
    mecanismo: 'Antibióticos bacteriostáticos (tetraciclina, cloranfenicol) inibem a multiplicação bacteriana, reduzindo a ação dos betalactâmicos que precisam de bactérias em divisão ativa para agir.',
    efeito: 'Antagonismo farmacológico: redução da eficácia bactericida da penicilina.',
    conduta: 'Evitar combinação quando possível. Se ambos forem necessários, avaliar alternativas. Em situações de emergência (ex: meningite), pode ser necessária a cobertura sobreposta mesmo com o antagonismo.'
  },
  {
    med1: ['benzilpenicilina','benzetacil','penicilina g','penicilina benzatina'],
    med2: ['warfarina','anticoagulante oral'],
    nivel: 'moderado',
    titulo: 'Benzilpenicilina + Anticoagulante Oral (Warfarina)',
    mecanismo: 'Penicilinas em doses altas podem reduzir a síntese de vitamina K pela flora intestinal e, em alguns casos, deslocar a warfarina de ligações proteicas plasmáticas.',
    efeito: 'Elevação do INR; aumento do risco de sangramento.',
    conduta: 'Monitorar INR durante e após o curso do antibiótico. Ajustar dose de warfarina se necessário.'
  },

  // ── LENALIDOMIDA ─────────────────────────────────────────────────────────
  {
    med1: ['lenalidomida','revlimid'],
    med2: ['dexametasona'],
    nivel: 'alto',
    titulo: 'Lenalidomida + Dexametasona — Risco de Tromboembolismo',
    mecanismo: 'A combinação lenalidomida + dexametasona é altamente trombogênica, com risco de TVP/TEP de até 15% sem profilaxia, provavelmente por efeitos pró-coagulatórios sinérgicos.',
    efeito: 'Tromboembolismo venoso (TVP e TEP): risco de vida. Esta é a combinação padrão no mieloma múltiplo.',
    conduta: 'Profilaxia antitrombótica obrigatória: AAS 100 mg/dia (baixo risco) ou HBPM/anticoagulante oral (alto risco). Avaliar fatores de risco individuais.'
  },
  {
    med1: ['lenalidomida','revlimid'],
    med2: ['digoxina','lanoxin'],
    nivel: 'alto',
    titulo: 'Lenalidomida + Digoxina',
    mecanismo: 'Lenalidomida inibe a glicoproteína-P intestinal, aumentando a biodisponibilidade e os níveis plasmáticos de digoxina.',
    efeito: 'Toxicidade digitálica: bradicardia, arritmias, distúrbios visuais, náusea.',
    conduta: 'Monitorar níveis séricos de digoxina e ECG ao iniciar lenalidomida. Reduzir dose de digoxina se necessário.'
  },
  {
    med1: ['lenalidomida','revlimid'],
    med2: ['eritropoetina','alfaepoetina','epoetina alfa','darbepoetina'],
    nivel: 'alto',
    titulo: 'Lenalidomida + Eritropoetina — Trombose Aditiva',
    mecanismo: 'Ambos os agentes aumentam o risco trombótico. Eritropoetina estimula eritropoiese e pode aumentar viscosidade sanguínea; lenalidomida tem efeito pró-coagulatório.',
    efeito: 'Risco aditivo de tromboembolismo venoso (TVP, TEP).',
    conduta: 'Se necessário usar eritropoetina concomitantemente (anemia grave), intensificar profilaxia antitrombótica e monitorar regularmente.'
  },

  // ── TALIDOMIDA ───────────────────────────────────────────────────────────
  {
    med1: ['talidomida','thalidomide'],
    med2: ['dexametasona'],
    nivel: 'alto',
    titulo: 'Talidomida + Dexametasona — Tromboembolismo Venoso',
    mecanismo: 'Combinação altamente trombogênica: talidomida aumenta expressão de fatores pró-coagulatórios e a dexametasona eleva o estado hipercoagulável, especialmente no contexto do mieloma múltiplo.',
    efeito: 'TVP/TEP com risco de morte. Risco de até 30% sem profilaxia.',
    conduta: 'Profilaxia antitrombótica obrigatória (AAS 100 mg/dia ou HBPM). Avaliar fatores de risco individuais para decidir intensidade da anticoagulação.'
  },
  {
    med1: ['talidomida','thalidomide'],
    med2: ['sedativo','benzo','benzodiazepínico','alprazolam','diazepam','clonazepam','lorazepam'],
    nivel: 'alto',
    titulo: 'Talidomida + Sedativo / Benzodiazepínico',
    mecanismo: 'Talidomida causa sedação intensa por si mesma. A associação com sedativos potencializa a depressão do SNC.',
    efeito: 'Sedação excessiva, risco de queda, depressão respiratória em idosos ou pacientes debilitados.',
    conduta: 'Evitar combinação. Se necessária, reduzir doses e monitorar estado de consciência. Talidomida preferencialmente à noite.'
  },
  {
    med1: ['talidomida','thalidomide'],
    med2: ['bortezomibe','velcade'],
    nivel: 'alto',
    titulo: 'Talidomida + Bortezomibe — Neuropatia Periférica Aditiva',
    mecanismo: 'Ambos causam neuropatia periférica por mecanismos distintos (talidomida: angiogênica; bortezomibe: apoptose neuronal). O efeito é aditivo.',
    efeito: 'Neuropatia periférica grave e potencialmente irreversível: dor, formigamento, perda de sensibilidade e força nos membros.',
    conduta: 'Monitorar sinais precoces de neuropatia. Reduzir dose de talidomida ou descontinuar se neuropatia grau 2+ aparecer.'
  },
  {
    med1: ['talidomida','thalidomide'],
    med2: ['eritropoetina','alfaepoetina','epoetina alfa'],
    nivel: 'alto',
    titulo: 'Talidomida + Eritropoetina — Trombose Aditiva',
    mecanismo: 'Ambos aumentam o risco trombótico: talidomida por efeitos pró-coagulatórios e eritropoetina por aumento de viscosidade sanguínea.',
    efeito: 'Risco aditivo de TVP e TEP.',
    conduta: 'Se necessária a combinação, intensificar profilaxia antitrombótica. Avaliar relação risco/benefício.'
  },

  // ── UPADACITINIBE ────────────────────────────────────────────────────────
  {
    med1: ['upadacitinibe','rinvoq'],
    med2: ['vacina vivo','vacina vírus vivo','febre amarela','varicela vivo','herpes zoster vivo'],
    nivel: 'contraindicado',
    titulo: 'Upadacitinibe + Vacina de Vírus Vivo',
    mecanismo: 'Upadacitinibe causa imunossupressão sistêmica por inibição da JAK1. Vacinas de vírus vivos podem causar doença disseminada em imunossuprimidos.',
    efeito: 'Infecção disseminada pelo agente vacinal (varicela, febre amarela).',
    conduta: 'Contraindicado. Vacinas de vírus vivos devem ser administradas pelo menos 4 semanas antes de iniciar upadacitinibe. Vacinas inativadas são permitidas.'
  },
  {
    med1: ['upadacitinibe','rinvoq'],
    med2: ['cetoconazol','itraconazol','ritonavir','cobicistate','inibidor cyp3a4 forte'],
    nivel: 'alto',
    titulo: 'Upadacitinibe + Inibidor Forte do CYP3A4',
    mecanismo: 'Upadacitinibe é metabolizado predominantemente pelo CYP3A4. Inibidores potentes elevam significativamente sua exposição sistêmica.',
    efeito: 'Aumento do risco de infecções graves, mielossupressão e eventos adversos dose-dependentes.',
    conduta: 'Reduzir dose de upadacitinibe (ex: 15 mg → 7,5 mg se disponível, ou reavaliar a indicação). Monitorar efeitos adversos.'
  },
  {
    med1: ['upadacitinibe','rinvoq'],
    med2: ['ciclosporina','metotrexato','azatioprina','micofenolato','imunossupressor potente'],
    nivel: 'alto',
    titulo: 'Upadacitinibe + Imunossupressor Potente',
    mecanismo: 'Imunossupressão aditiva por mecanismos complementares (JAK1 + outros alvos). Aumenta risco de infecções oportunistas.',
    efeito: 'Infecções graves (bacterianas, fúngicas, virais), reativação de TB e herpes zóster.',
    conduta: 'Evitar combinação com imunossupressores potentes (ciclosporina). Com metotrexato em baixa dose (artrite), a combinação é monitorada na prática clínica — usar com cautela.'
  },
  {
    med1: ['upadacitinibe','rinvoq'],
    med2: ['outro inibidor jak','tofacitinibe','baricitinibe','ruxolitinibe','filgotinibe'],
    nivel: 'contraindicado',
    titulo: 'Upadacitinibe + Outro Inibidor JAK',
    mecanismo: 'Imunossupressão aditiva sem benefício terapêutico adicional.',
    efeito: 'Risco grave de infecções, mielossupressão, trombose e eventos adversos graves.',
    conduta: 'Contraindicado. Usar apenas um inibidor JAK por vez.'
  },

  // ── NATALIZUMABE ─────────────────────────────────────────────────────────
  {
    med1: ['natalizumabe','tysabri'],
    med2: ['imunossupressor','ciclosporina','azatioprina','metotrexato','interferon beta','glatiramer'],
    nivel: 'contraindicado',
    titulo: 'Natalizumabe + Imunossupressor / Outro Imunobiológico',
    mecanismo: 'Natalizumabe impede a migração de linfócitos para o SNC. Associado a imunossupressores, aumenta drasticamente o risco de LMP (leucoencefalopatia multifocal progressiva) pelo vírus JC.',
    efeito: 'LMP: infecção cerebral grave, potencialmente fatal ou causadora de incapacidade grave permanente.',
    conduta: 'Contraindicado. Natalizumabe deve ser usado em monoterapia. Monitorar anticorpos anti-JCV regularmente.'
  },
  {
    med1: ['natalizumabe','tysabri'],
    med2: ['anti-tnf','adalimumabe','infliximabe','etanercepte','certolizumabe','golimumabe'],
    nivel: 'contraindicado',
    titulo: 'Natalizumabe + Anti-TNF',
    mecanismo: 'Dupla imunossupressão profunda com aumento sinérgico do risco de LMP e outras infecções graves oportunistas.',
    efeito: 'Infecções oportunistas graves, LMP, sepse.',
    conduta: 'Contraindicado. Natalizumabe não deve ser associado a outros biológicos imunossupressores.'
  },
  {
    med1: ['natalizumabe','tysabri'],
    med2: ['vacina vivo','febre amarela','varicela vivo'],
    nivel: 'contraindicado',
    titulo: 'Natalizumabe + Vacina de Vírus Vivo',
    mecanismo: 'Imunossupressão por bloqueio da vigilância imunológica sistêmica pode comprometer a resposta adequada à vacina e favorecer infecção ativa.',
    efeito: 'Infecção disseminada pelo agente vacinal.',
    conduta: 'Contraindicado durante o tratamento. Vacinas de vírus vivos devem ser administradas antes do início do natalizumabe.'
  },

  // ── ABATACEPTE ───────────────────────────────────────────────────────────
  {
    med1: ['abatacepte','orencia'],
    med2: ['adalimumabe','infliximabe','etanercepte','certolizumabe','golimumabe','anti-tnf'],
    nivel: 'contraindicado',
    titulo: 'Abatacepte + Anti-TNF (Adalimumabe, Infliximabe)',
    mecanismo: 'Dupla imunossupressão biológica sem benefício terapêutico adicional demonstrado em estudos clínicos.',
    efeito: 'Infecções graves (bacterianas, fúngicas, oportunistas) sem ganho de eficácia.',
    conduta: 'Contraindicado. Usar apenas um biológico por vez. Ao trocar de anti-TNF para abatacepte, respeitar o período de washout.'
  },
  {
    med1: ['abatacepte','orencia'],
    med2: ['anakinra','kineret','anti-il-1'],
    nivel: 'contraindicado',
    titulo: 'Abatacepte + Anakinra (Anti-IL-1)',
    mecanismo: 'Combinação de dois mecanismos imunossupressores biológicos distintos resulta em imunossupressão excessiva.',
    efeito: 'Infecções graves e neutropenia — sem benefício clínico adicional estabelecido.',
    conduta: 'Contraindicado. Evitar associação.'
  },
  {
    med1: ['abatacepte','orencia'],
    med2: ['vacina vivo','febre amarela','varicela vivo'],
    nivel: 'contraindicado',
    titulo: 'Abatacepte + Vacina de Vírus Vivo',
    mecanismo: 'Abatacepte suprime a ativação de linfócitos T, comprometendo a imunidade contra vacinas de vírus vivos.',
    efeito: 'Infecção disseminada pelo agente vacinal.',
    conduta: 'Contraindicado durante o tratamento. Imunizar com pelo menos 4 semanas de antecedência ao início.'
  },

  // ── CERTOLIZUMABE ─────────────────────────────────────────────────────────
  {
    med1: ['certolizumabe','cimzia','certolizumab pegol'],
    med2: ['anakinra','kineret'],
    nivel: 'contraindicado',
    titulo: 'Certolizumabe + Anakinra — Infecção Grave / Neutropenia',
    mecanismo: 'Bloqueio de TNF-α (certolizumabe) combinado ao bloqueio de IL-1 (anakinra) resulta em imunossupressão severa sem benefício adicional comprovado.',
    efeito: 'Infecções graves e neutropenia; relato de casos fatais em estudos clínicos.',
    conduta: 'Contraindicado. A combinação foi abandonada nos estudos clínicos por excesso de eventos adversos.'
  },
  {
    med1: ['certolizumabe','cimzia','certolizumab pegol'],
    med2: ['abatacepte','orencia'],
    nivel: 'contraindicado',
    titulo: 'Certolizumabe + Abatacepte',
    mecanismo: 'Dupla imunossupressão biológica (anti-TNF + modulador de co-estimulação T) sem eficácia adicional.',
    efeito: 'Infecções graves e maior risco de neoplasias sem ganho terapêutico.',
    conduta: 'Contraindicado. Usar apenas um biológico por vez na artrite reumatoide.'
  },
  {
    med1: ['certolizumabe','cimzia','certolizumab pegol'],
    med2: ['vacina vivo','febre amarela','varicela vivo'],
    nivel: 'contraindicado',
    titulo: 'Certolizumabe + Vacina de Vírus Vivo',
    mecanismo: 'Bloqueio do TNF-α compromete a resposta imune adequada e pode permitir infecção ativa pelo agente vacinal.',
    efeito: 'Infecção disseminada pelo agente vacinal.',
    conduta: 'Contraindicado durante o tratamento. Vacinar pelo menos 4 semanas antes de iniciar certolizumabe.'
  },
  {
    med1: ['certolizumabe','cimzia','certolizumab pegol'],
    med2: ['azatioprina','mercaptopurina','tiopurina'],
    nivel: 'alto',
    titulo: 'Certolizumabe + Tiopurina (Azatioprina, Mercaptopurina)',
    mecanismo: 'Combinação frequente na doença de Crohn. Dupla imunossupressão aumenta risco de infecções oportunistas e linfomas (hepatoesplênico em especial).',
    efeito: 'Infecções oportunistas graves; risco aumentado de linfoma hepatoesplênico de células T (especialmente em homens jovens).',
    conduta: 'Usar com cautela monitorada — combinação às vezes necessária no Crohn. Monitorar hemograma e função hepática. Considerar descontinuar tiopurina após resposta clínica.'
  }
];

let js = fs.readFileSync(JS_PATH, 'utf-8');
if (!js.includes(MARKER)) {
  console.error('ERRO: marcador não encontrado no arquivo!');
  process.exit(1);
}

const bloco = `\nmcInteracoesDB = mcInteracoesDB.concat(${JSON.stringify(novas, null, 2)});\n`;
js = js.replace(MARKER, bloco + MARKER);
fs.writeFileSync(JS_PATH, js, 'utf-8');
console.log(`✓ ${novas.length} interações inseridas:`);
novas.forEach(b => console.log('  +', b.titulo));
