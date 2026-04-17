const fs = require('fs');

const data = JSON.parse(fs.readFileSync('C:/Users/Usuario/Desktop/medicheck/medicamentos.json', 'utf8'));

const classes = [
  {
    texto: 'Procure médico se: febre não ceder em 48h após início do antibiótico, surgir rash cutâneo, urticária ou dificuldade para respirar, diarreia intensa com sangue ou muco, sintomas piorarem em vez de melhorar, ou aparecer candidíase oral ou vaginal intensa.',
    termos: ['amoxicilina','azitromicina','cefalexina','cefalosporina','cefadroxil','cefuroxima','cefpodoxima','ciprofloxacin','doxiciclina','metronidazol','nitrofurantoín','sulfametoxazol','trimetoprima','levofloxacin','moxifloxacin','vancomicina','rifampicina','rifamicina','clindamicina','eritromicina','ampicilina','tetraciclina','gentamicina','tobramicina','linezolida','tigeciclina','cefazolina','ceftriaxona','cefepime','imipenem','meropenem','ertapenem','piperacilina','tazobactam','colistina','fosfomicina','norfloxacin','cloranfenicol','benzilpenicilina','fenoximetilpenicilina','penicilina','claritromicina','espiramicina','pristinamicina','rifaximina','bismuto','secnidazol','tinidazol','oxacilina','cefaclor','cefdinir','minociclina','etambutol','isoniazida','pirazinamida']
  },
  {
    texto: 'Procure médico se: pressão acima de 180/110 mesmo tomando o remédio, dor de cabeça intensa e súbita, visão turva, falta de ar, dor no peito, inchaço súbito nos pés e pernas, ou pressão muito baixa com tontura ao levantar.',
    termos: ['losartana','enalapril','ramipril','anlodipino','metoprolol','propranolol','hidroclorotiazida','valsartana','olmesartana','telmisartana','nebivolol','carvedilol','bisoprolol','atenolol','lisinopril','captopril','perindopril','candesartana','irbesartana','furosemida','espironolactona','eplerenona','indapamida','clortalidona','amlodipino','nifedipino','diltiazem','verapamil','clonidina','hidralazina','minoxidil','doxazosina','prazosina','terazosina','aliscireno','sacubitril + valsartana','sacubitril','azilsartana','nilvadipino','felodipino','nitrendipino','lercanidipino','nisoldipino','lacidipino','barnidipino','combinação losartana','combinação valsartana','combinação telmisartana','combinação olmesartana','combinação enalapril','combinação atenolol','combinação anlodipino']
  },
  {
    texto: 'Procure médico se: dor de estômago intensa, fezes escuras ou com sangue, vômito com sangue, inchaço nos pés, falta de ar, pressão muito elevada, ou sintomas alérgicos como urticária e dificuldade para respirar.',
    termos: ['ibuprofeno','diclofenaco','naproxeno','nimesulida','cetoprofeno','meloxicam','tenoxicam','etoricoxibe','piroxicam','indometacina','celecoxibe','lornoxicam','flurbiprofeno','aceclofenaco','sulindaco','tolmetina','diflunisal']
  },
  {
    texto: 'Procure médico se: pensamentos de automutilação ou suicídio, agitação intensa ou piora do humor nos primeiros dias, febre alta com rigidez muscular e confusão (síndrome serotoninérgica), convulsões, ou incapacidade de continuar o tratamento.',
    termos: ['sertralina','fluoxetina','escitalopram','paroxetina','citalopram','venlafaxina','duloxetina','bupropiona','mirtazapina','trazodona','amitriptilina','nortriptilina','imipramina','clomipramina','desvenlafaxina','fluvoxamina','vilazodona','vortioxetina','maprotilina','moclobemida','tranilcipromina']
  },
  {
    texto: 'Procure médico se: dificuldade para respirar durante o sono, confusão mental intensa, comportamentos automáticos sem memória, dependência (necessidade de doses maiores), ou crise de abstinência ao tentar parar (tremores, suor, convulsão).',
    termos: ['alprazolam','clonazepam','diazepam','lorazepam','bromazepam','midazolam','nitrazepam','oxazepam','zolpidem','zopiclona','zaleplon','temazepam','triazolam','clobazam','clorazepato','estazolam','clordiazepóxido']
  },
  {
    texto: 'Procure médico se: aumento na frequência de crises, surgir rash cutâneo (pode ser grave — síndrome de Stevens-Johnson), confusão mental, tontura intensa, visão dupla, ou alterações no hemograma.',
    termos: ['carbamazepina','valproato','ácido valpróico','fenitoína','lamotrigina','topiramato','levetiracetam','oxcarbazepina','pregabalina','gabapentina','fenobarbital','primidona','vigabatrina','tiagabina','zonisamida','lacosamida','perampanel','eslicarbazepina','brivaracetam','stiripentol','rufinamida','clobazam anticonvulsivante','etossuximida']
  },
  {
    texto: 'Procure médico se: febre alta com rigidez muscular e confusão (síndrome neuroléptica maligna — emergência), movimentos involuntários da face ou corpo (discinesia), ou sonolência excessiva que impeça atividades diárias.',
    termos: ['risperidona','olanzapina','quetiapina','haloperidol','clozapina','ziprasidona','paliperidona','aripiprazol','lurasidona','amisulprida','sulpirida','clorpromazina','levomepromazina','trifluoperazina','flufenazina','pimozida','brexpiprazol','cariprazina','asenapina','iloperidona','periciazina','droperidol']
  },
  {
    texto: 'Procure médico se: sangramento que não para, urina cor de rosa ou vermelha, fezes pretas ou com sangue, hematomas grandes sem causa aparente, dor de cabeça súbita e intensa, ou qualquer sangramento espontâneo.',
    termos: ['warfarina','rivaroxabana','apixabana','dabigatrana','edoxabana','enoxaparina','heparina','fondaparinux','clopidogrel','ticagrelor','prasugrel','ticlopidina','dipiridamol','cilostazol','ácido acetilsalicílico anticoagulante','aas','aspirina']
  },
  {
    texto: 'Procure médico se: inchaço intenso no rosto ou pernas, pressão muito elevada, febre alta (pode mascarar infecção), confusão mental, fraqueza muscular intensa, ou nunca interromper abruptamente sem orientação médica — pode causar crise adrenal.',
    termos: ['prednisona','prednisolona','dexametasona','betametasona','hidrocortisona','budesonida oral','triancinolona','fludrocortisona','deflazacorte','metilprednisolona','clobetasol']
  },
  {
    texto: 'Procure médico se: dor muscular intensa e generalizada, urina escura (cor de chá — sinal de rabdomiólise), fraqueza muscular progressiva, ou alteração em exames de função hepática.',
    termos: ['atorvastatina','rosuvastatina','sinvastatina','pravastatina','lovastatina','fluvastatina','pitavastatina','ezetimiba + sinvastatina','rosuvastatina + ezetimiba','atorvastatina + ezetimiba']
  },
  {
    texto: 'Procure médico se: icterícia (pele ou olhos amarelados), dor abdominal intensa, escurecimento da urina, sintomas alérgicos graves, ou ausência de melhora após 7 dias de tratamento.',
    termos: ['fluconazol','itraconazol','voriconazol','anfotericina','terbinafina','cetoconazol','clotrimazol','miconazol','nistatina','griseofulvina','posaconazol','anidulafungina','micafungina','caspofungina']
  },
  {
    texto: 'Procure médico se: respiração muito lenta ou dificuldade para respirar, confusão mental intensa, lábios ou pele azulados, incapacidade de urinar, ou sinais de dependência. Em caso de overdose ligar imediatamente para o SAMU 192.',
    termos: ['tramadol','morfina','codeína','tapentadol','metadona','oxicodona','fentanila','buprenorfina','hidromorfona','naloxona','naltrexona','meperidina']
  },
  {
    texto: 'Procure médico se: falta de ar não melhora após uso do broncodilatador, frequência cardíaca muito elevada, tremores intensos, ou crises de asma que não cedem com o inalador de resgate — procure pronto-socorro.',
    termos: ['salbutamol','formoterol','salmeterol','tiotrópio','ipratrópio','brometo de ipratrópio','montelucaste','teofilina','fenoterol','terbutalina','indacaterol','glicopirrônio','umeclidínio','aclidínio','vilanterol','brometo de tiotrópio','zileutona','omalizumabe','mepolizumabe','benralizumabe','dupilumabe']
  },
  {
    texto: 'Procure médico se: febre acima de 38°C (risco de infecção grave), feridas que não cicatrizam, tosse persistente, urina escura, icterícia, ou qualquer infecção que não melhore rapidamente.',
    termos: ['metotrexato','azatioprina','ciclosporina','tacrolimo','micofenolato','tofacitinibe','baricitinibe','upadacitinibe','leflunomida','ciclofosfamida','clorambucil','mofetila','everolimo','sirolimo','belimumabe','rituximabe','adalimumabe','etanercepte','infliximabe','certolizumabe','golimumabe','abatacepte','tocilizumabe','secuquinumabe','ixequizumabe','guselcumabe']
  },
  {
    texto: 'Procure médico se: palpitações, tremores, insônia, perda de peso acelerada (excesso de hormônio), ou piora do cansaço e ganho de peso (dose insuficiente). Realizar TSH de controle conforme orientado.',
    termos: ['levotiroxina','liotironina','metimazol','propiltiouracil']
  },
  {
    texto: 'Procure médico se: sintomas não melhorarem em 3 dias, surgir febre alta, icterícia, diarreia com sangue, ou reação alérgica intensa.',
    termos: ['albendazol','mebendazol','ivermectina','nitazoxanida','praziquantel','pirantel','tiabendazol','dietilcarbamazina']
  },
  {
    texto: 'Procure médico se: dor intensa na mandíbula, dificuldade para engolir, dor óssea muito intensa, ou nova fratura mesmo fazendo o tratamento.',
    termos: ['alendronato','risedronato','zoledronato','zolendronato','ácido zoledrónic','ácido zoledrônic','denosumabe','teriparatida','raloxifeno','ibandronato','clodronato']
  },
  {
    texto: 'Procure médico se: incapacidade total de urinar, dor ao urinar, sangue na urina, febre com calafrios, ou piora progressiva dos sintomas urinários.',
    termos: ['tansulosina','silodosina','finasterida','dutasterida','alfuzosina','doxazosina urológico','terazosina urológico']
  },
  {
    texto: 'Procure médico se: sintomas não melhorarem em 48-72h, surgir febre muito alta, dificuldade para respirar, confusão mental, ou sinais de desidratação grave.',
    termos: ['aciclovir','oseltamivir','tenofovir','lopinavir','ritonavir','ribavirina','valaciclovir','famciclovir','ganciclovir','valganciclovir','entecavir','sofosbuvir','ledipasvir','daclatasvir','efavirenz','lamivudina','zidovudina','abacavir','emtricitabina','atazanavir','darunavir','raltegravir','dolutegravir','bictegravir','cobicistate','zanamivir','baloxavir']
  },
  {
    texto: 'Procure médico se: sintomas que motivaram o uso não melhorarem após 30 dias, surgir náusea ou dor abdominal intensa, ou exames mostrarem valores muito acima do normal (hipervitaminose).',
    termos: ['vitamina d','vitamina b12','ácido fólico','ferro','magnésio','zinco','ômega','cálcio','vitamina c','vitamina a','vitamina e','vitamina k','biotina','colecalciferol','ergocalciferol','cianocobalamina','sulfato ferroso','fumarato ferroso','gluconato ferroso','carbonato de cálcio','citrato de cálcio','óxido de magnésio','cloreto de magnésio','complexo b','vitamina b1','vitamina b6','niacina','ácido pantotênico']
  },
  {
    texto: 'Procure médico se: a pior dor de cabeça da vida de início súbito, dor acompanhada de febre e rigidez de nuca, perda de visão, fraqueza em um lado do corpo, ou crises não controladas com o tratamento atual.',
    termos: ['sumatriptana','rizatriptana','naratriptana','eletriptana','zolmitriptana','almotriptana','frovatriptana']
  }
];

// Texto padrão para medicamentos sem classe definida que já tenham um texto genérico insuficiente
const textoGenerico = 'Procure médico se: sintomas não melhorarem no tempo esperado, surgirem efeitos colaterais intensos, a condição piorar durante o tratamento, surgir febre ou reação alérgica (urticária, inchaço, dificuldade para respirar).';

function encontrarClasse(med) {
  const nome = (med.nome || '').toLowerCase();
  const tipo = (med.tipo || '').toLowerCase();
  const sins = (med.sinonimos || []).map(s => s.toLowerCase()).join(' ');
  const busca = nome + ' ' + tipo + ' ' + sins;

  for (const cls of classes) {
    if (cls.termos.some(t => busca.includes(t))) {
      return cls.texto;
    }
  }
  return null;
}

let atualizados = 0;
let semClasse = [];

data.forEach((med, i) => {
  const novoTexto = encontrarClasse(med);
  if (novoTexto && med.quando_procurar_medico !== novoTexto) {
    med.quando_procurar_medico = novoTexto;
    atualizados++;
    console.log('ATUALIZADO [' + i + '] ' + med.nome);
  } else if (!novoTexto) {
    semClasse.push('[' + i + '] ' + med.nome);
  }
});

fs.writeFileSync('C:/Users/Usuario/Desktop/medicheck/medicamentos.json', JSON.stringify(data, null, 2), 'utf8');

console.log('\n=== RESULTADO ===');
console.log('Atualizados:', atualizados);
console.log('Sem classe definida (' + semClasse.length + '):');
semClasse.forEach(s => console.log(' -', s));
