const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data/medicamento.json', 'utf8'));
const dirs = fs.readdirSync('./medicamentos').filter(d => d !== '.gitkeep' && d !== 'index.html');

const MANUAL = {
  'acido-valproico-valproato-de-sodio':   'valproato-de-sodio-250mg-500mg-solucao-oral',
  'acido-valproico-valproato-de-sodio-1': 'valproato-de-sodio-lp-250mg-500mg-liberacao-prolongada',
  'acidos-graxos-omega-3-epa-dha':        'omega-3-epadha-1g',
  'aciclovir-creme':                      'aciclovir-200mg-400mg-creme',
  'allegra-fexofenadina-60mg-120mg-180mg-suspensao': 'allegra-d-fexofenadina-60mg-pseudoefedrina-120mg',
  'amoxicilina-clavulanato-de-potassio':  'amoxicilina-clavulanato-500mg125mg-875mg125mg',
  'anador-dipirona-sodica':               'dipirona-comprimido-500-mg-10-g-gotas-xarope-injetavel',
  'anlodipino-besilato-hidroclorotiazida':'anlodipino-hidroclorotiazida',
  'antiacido':                            'hidroxido-de-aluminio',
  'aspirina-100mg-acido-acetilsalicilico-100mg': 'aspirina-500mg-acido-acetilsalicilico-500mg',
  'benzilpenicilina-1':                   'benzilpenicilina-benzetacil-600000ui-1200000ui',
  'benzilpenicilina-g-benzatina':         'benzilpenicilina-benzetacil-600000ui-1200000ui',
  'benzoato-de-rizatriptana':             'rizatriptana-5mg-10mg',
  'bromidrato-de-fenoterol':              'fenoterol-01mgdose-spray-5mgml-solucao',
  'buprenorfina-1':                       'buprenorfina-adesivo-transdermico-norspan',
  'buprenorfina-5mg-10mg-20mg-30mg-e-40mg': 'buprenorfina-adesivo-transdermico-norspan',
  'buprenorfina-e':                       'buprenorfina-adesivo-transdermico-norspan',
  'calciovitamina-d':                     'calcio-vitamina-d',
  'canabidiol-tetrahidrocanabinol':       'cannabis-medicinal-cbd-thc',
  'carbidopalevodopa-25-25-50':           'carbidopalevodopa-25100mg-25250mg-50200mg',
  'cianocobalamina-cobalamina':           'vitamina-b12-500mcg-1000mcg-injetavel',
  'cloreto-de-sodio-3-solucao-nasal-hipertonica': 'cloreto-de-sodio-3-spray-nasal-hipertonico-rhinosoro',
  'cloridrato-de-tamsulosina':            'tansulosina-04mg',
  'colecalciferol':                       'vitamina-d3-1000ui-2000ui-5000ui-7000ui-10000ui-gotas',
  'colecalciferol-alta-dose':             'vitamina-d3-50000ui-capsula-semanal',
  'complexo-de-vitaminas-do-complexo-b':  'complexo-b-b1b2b3b5b6b7b9b12',
  'dabigatrana-etexilato':                'dabigatrana-75mg-110mg-150mg',
  'divalproato-de-sodio':                 'depakote-sprinkle-125mg-liberacao-enterica',
  'diclofenaco-de-sodio-diclofenaco-potassico': 'diclofenaco-sodico-voltaren',
  'diclofenaco-gel-topico':               'diclofenaco-sodico-voltaren',
  'enoxaparina-injetavel':                'enoxaparina-20mg-40mg-60mg-80mg-100mg-injetavel',
  'eritropoetina-injetavel':              'eritropoetina-alfa-epoetina-alfa-2000ui-4000ui-10000ui',
  'escopolamina':                         'brometo-de-escopolamina-hioscina-10mg',
  'esomeprazol-magnesico':                'esomeprazol-20mg-40mg',
  'estradiol-hemi-hidratado':             'estradiol-gel-topico-transdermico',
  'etinilestradiol-progestogenio':        'anticoncepcional-combinado-yasmin-diane-35-selene',
  'fumarato-de-formoterol-di-hidratado':  'formoterol-isolado-12mcg',
  'furosemida-20mg-40mg-80mg-injetavel':  'furosemida-40mg',
  'furosemida-injetavel':                 'furosemida-40mg',
  'hioscina-escopolamina-10mg-20mg':      'brometo-de-escopolamina-hioscina-10mg',
  'insulina-regular-insulina-humana-de-acao-curta': 'insulina-regular-100uml',
  'iodeto-de-potassio-iodo-molecular':    'iodo-iodeto-de-potassio',
  'ipratropio':                           'brometo-de-ipratropio',
  'levo-carnitina':                       'carnitina-500mg',
  'liraglutida':                          'saxenda-liraglutida-6mgml',
  'macrogol-3350-bicarbonato-de-sodio-cloreto-de-sodio-cloreto-de-potassio': 'polietilenoglicol-movicol-muvinlax',
  'maleato-de-indacaterol':               'indacaterol-onbrez',
  'maleato-de-levomepromazina':           'neozine-levomepromazina-gotas-25mg-100mg',
  'maleato-de-trimebutina':               'trimebutina-100mg-200mg',
  'mononitrato-ou-dinitrato-de-isossorbida': 'isossorbida-5mg-10mg-20mg-40mg',
  'montelucaste-de-sodio':                'montelucaste-4mg-5mg-10mg',
  'n-acetilcisteina-nac':                 'nac-600mg-n-acetilcisteina',
  'naproxeno-sodico-naproxeno':           'naproxeno-250mg-500mg',
  'pantoprazol-sodico-sesqui-hidratado':  'pantoprazol-20mg-40mg',
  'prednisolona-1mgml-3mgml-solucao-oral':'prednisolona-5mg-20mg-40mg-comprimido',
  'prednisolona-comprimido':              'prednisolona-5mg-20mg-40mg-comprimido',
  'rifamicina-sv':                        'rifamicina-spray',
  'salmeterol-propionato-de-fluticasona': 'salmeterol-fluticasona-25mcg125mcg-50mcg250mcg',
  'subcitrato-de-bismuto-potassico':      'bismuto-subcitrato-de-bismuto',
  'sulfato-de-morfina':                   'morfina-10mg-30mg-10mgml-injetavel',
  'tenofovir-disoproxila':                'tenofovir-300mg',
  'teriparatida-pth-1-34-recombinante':   'teriparatida-forteo',
  'tiamina-cloridrato-de-tiamina':        'vitamina-b1-tiamina-100mg-300mg',
  'tirzepatida':                          'mounjaro-tirzepatida',
  'toxina-botulinica-tipo-a':             'toxina-botulinica-botox',
  'ubiquinona':                           'coenzima-q10-100mg',
  'vitamina-b12-injetavel':               'vitamina-b12-500mcg-1000mcg-injetavel',
  'vitamina-c':                           'acido-ascorbico-5-20',
  'vitamina-d3-gotas':                    'vitamina-d3-1000ui-2000ui-5000ui-7000ui-10000ui-gotas',
  'warfarina-tambem-conhecida-como-varfarina': 'warfarina-varfarina-1mg-25mg-5mg',
  'zinco-sulfato-glicinato-ou-quelato':   'zinco-7mg-20mg-40mg',
  'acido-ibandronico-ibandronato-de-sodio': 'ibandronato-bonviva',
  'cefuroxima-axetila':                   'cefuroxima-250mg-500mg',
  'lopinavirritonavir-comprimido-solucao-oral': 'lopinavirritonavir-200mg50mg-comprimido-solucao-oral',
  // variantes de forma farmacêutica
  'azitromicina-suspensao':               'azitromicina-500mg-10g-suspensao-600mg-900mg-1500mg',
  'bromazepam-e':                         'bromazepam-3mg-e-6mg',
  'carbamazepina-suspensao':              'carbamazepina-200mg-400mg-suspensao',
  'cefalexina-suspensao':                 'cefalexina-500mg-10g-suspensao',
  'ceftriaxona-injetavel':                'ceftriaxona-250mg-500mg-10g-injetavel',
  'cetirizina-e-xarope':                  'cetirizina-10mg-e-xarope',
  'clindamicina-injetavel':               'clindamicina-150mg-300mg-injetavel',
  'clonazepam-solucao-oral-e':            'clonazepam-solucao-oral-25mgml-05mg-e-2mg-025mg',
  'epoetina-alfa':                        'eritropoetina-alfa-epoetina-alfa-2000ui-4000ui-10000ui',
  'etambutol-solucao-oral':               'etambutol-400mg-solucao-oral',
  'levetiracetam-solucao-oral':           'levetiracetam-250mg-500mg-750mg-1000mg-solucao-oral',
  'risperidona-solucao-oral':             'risperidona-05mg-1mg-2mg-3mg-4mg-solucao-oral',
  'codeina-xarope-e-injetavel':           'codeina-30mg-60mg-xarope-e-injetavel',
  'desloratadina-xarope':                 'desloratadina-5mg-xarope',
  'dexametasona-xarope-injetavel':        'dexametasona-05mg-40mg-xarope-injetavel',
  'diazepam-comprimido-injetavel':        'diazepam-comprimido-5mg-10-mg-injetavel',
  'digoxina-comprimido-solucao':          'digoxina-comprimido-025-mg-solucao',
  'dipirona-comprimido-gotas-xarope-injetavel': 'dipirona-comprimido-500-mg-10-g-gotas-xarope-injetavel',
  'dipirona-sodica-monoidratada':         'dipirona-comprimido-500-mg-10-g-gotas-xarope-injetavel',
  'domperidona-suspensao':                'domperidona-10mg-suspensao',
  'droperidol-injetavel':                 'droperidol-25mg-injetavel',
  'efavirenz-solucao':                    'efavirenz-200mg-600mg-solucao',
  'escitalopram-gotas':                   'escitalopram-10mg-15mg-20mg-gotas',
  'fenitoina-injetavel':                  'fenitoina-100mg-injetavel',
  'fentolamina-injetavel':                'fentolamina-40mg-injetavel',
  'fluconazol-suspensao-injetavel':       'fluconazol-50mg-100mg-150mg-200mg-suspensao-injetavel',
  'fluoxetina-10mg-20mg-gotas':           'fluoxetina-20mg',
  'fluoxetina-gotas':                     'fluoxetina-20mg',
  'haloperidol-gotas-injetavel':          'haloperidol-1mg-5mg-gotas-injetavel',
  'hidralazina-injetavel':                'hidralazina-25mg-50mg-injetavel',
  'ibuprofeno-gotas':                     'ibuprofeno-200mg-400mg-600mg-gotas',
  'lactulose-xarope':                     'lactulose-667mgml-xarope',
  'levofloxacina-injetavel':              'levofloxacina-500mg-750mg-injetavel',
  'loratadina-xarope':                    'loratadina-10mg-xarope',
  'mebendazol-suspensao':                 'mebendazol-100mg-suspensao',
  'metformina-xr':                        'metformina-500mg-850mg-1000mg-xr-liberacao-prolongada',
  'metoclopramida-gotas-injetavel':       'metoclopramida-10mg-gotas-injetavel',
  'metotrexato-injetavel':                'metotrexato-25mg-75mg-10mg-15mg-25mg-injetavel',
  'nimesulida-suspensao':                 'nimesulida-100mg-suspensao',
  'nitazoxanida-suspensao':               'nitazoxanida-500mg-suspensao',
  'ondansetrom-injetavel':                'ondansetrom-4mg-8mg-injetavel',
  'oseltamivir-suspensao':                'oseltamivir-75mg-suspensao',
  'paracetamol-gotas-xarope':             'paracetamol-500mg-750mg-gotas-xarope',
  'prometazina-creme-xarope-injetavel':   'prometazina-25mg-creme-xarope-injetavel',
  'quetiapina-xr':                        'quetiapina-25mg-50mg-100mg-200mg-300mg-xr-liberacao-prolongada',
  'ranitidina-solucao-injetavel':         'ranitidina-150mg-300mg-solucao-injetavel',
  'rifampicina-capsula-suspensao':        'rifampicina-300mg-capsula-suspensao',
  'secnidazol-suspensao':                 'secnidazol-1g-2g-suspensao',
  'semaglutida-1':                        'semaglutida-025mg-05mg-1mg-24mg-ozempic-wegovy-poviztra-extensior',
  'sucralfato-suspensao':                 'sucralfato-1g-suspensao',
  'terbinafina-creme':                    'terbinafina-250mg-creme',
  'tramadol-gotas-injetavel':             'tramadol-50mg-100mg-gotas-injetavel',
  'tretinoina-creme':                     'tretinoina-0025-005-01-creme',
  'venlafaxina-xr':                       'venlafaxina-375mg-75mg-150mg-xr-liberacao-prolongada',
  'verapamil-injetavel':                  'verapamil-80mg-120mg-240mg-injetavel',
  'albendazol-suspensao-e-comprimido-mastigavel': 'albendazol-400mg-suspensao-e-comprimido-mastigavel',
  'sulfametoxazol-trimetoprima-suspensao': 'sulfametoxazol-trimetoprima-400mg80mg-800mg160mg-suspensao',
  'cloreto-de-sodio-nasal-solucao-fisiologica': 'cloreto-de-sodio-09-nasal-solucao-fisiologica-neosoro',
  'minoxidil-solucao-topica-espuma':      'minoxidil-2-5-solucao-topica-espuma',
  'sulfato-ferroso-gotas-xarope-injetavel': 'sulfato-ferroso-40mg-300mg-gotas-xarope-injetavel',
  'acido-hialuronico-serum':              'acido-hialuronico-serum',
  'betametasona-topica':                  'betametasona-topica',
  'miconazol-creme-po-gel-oral':          'miconazol-creme-po-gel-oral',
  'neomicina-pomada':                     'neomicina-pomada',
  'beclometasona-spray-nasal':            'beclometasona-spray-nasal',
  'peroxido-de-hidrogenio-agua-oxigenada': 'peroxido-de-hidrogenio-3-agua-oxigenada',
  'cetoconazol-shampoo-e-creme':          'cetoconazol-shampoo-200mg-e-creme',
};

const PREFIXES = ['cloridrato-de-','brometo-de-','citrato-de-','fumarato-de-',
  'mesilato-de-','succinato-de-','acetato-de-','dicloridrato-de-','dimesilato-de-',
  'trometamol-de-','subcitrato-de-','medoxomila-de-','proxetila-de-','etexilato-de-'];

function stripPrefix(slug) {
  for (const p of PREFIXES) if (slug.startsWith(p)) return slug.slice(p.length);
  return slug.replace(/-(sodico|sodica|calcica|potassica|potassico|monoidratada|anidro|anidra)$/, '');
}

const dbSlugs = new Set(data.map(m => m.slug));

function findMatch(slug) {
  if (MANUAL[slug] && dbSlugs.has(MANUAL[slug])) return MANUAL[slug];
  let m = data.find(d => d.slug === slug); if (m) return m.slug;
  m = data.find(d => d.slug.startsWith(slug + '-')); if (m) return m.slug;
  m = data.find(d => slug.startsWith(d.slug + '-')); if (m) return m.slug;
  const stripped = stripPrefix(slug);
  if (stripped !== slug) {
    m = data.find(d => d.slug === stripped); if (m) return m.slug;
    m = data.find(d => d.slug.startsWith(stripped + '-')); if (m) return m.slug;
  }
  const words = slug.split('-').filter(w => w.length > 4 && !['injetavel','comprimido','suspensao','solucao','xarope','capsulas','pomada','creme','gotas','spray','adesivo','topico','liberacao','prolongada','sodica','sodico'].includes(w));
  if (words.length >= 2) { m = data.find(d => words.every(w => d.slug.includes(w))); if (m) return m.slug; }
  return null;
}

const lines = [];
const unmatched = [];
dirs.forEach(shortSlug => {
  const target = findMatch(shortSlug);
  if (target && dbSlugs.has(target)) {
    lines.push('/medicamentos/' + shortSlug + '/ /medicamento/' + target + '/ 301!');
  } else {
    unmatched.push(shortSlug);
    lines.push('/medicamentos/' + shortSlug + '/ / 301!');
  }
});

console.log('Redirects com destino correto:', lines.filter(l => !l.endsWith('/ 301') || l.includes('/medicamento/')).length);
console.log('Redirecionando para home:', unmatched.length);
if (unmatched.length) console.log('Sem match:', unmatched.join(', '));

const content = lines.join('\n') + '\n';
fs.writeFileSync('./_redirects', content, 'utf8');
fs.writeFileSync('./public/_redirects', content, 'utf8');
fs.writeFileSync('./redirects_gerados.txt', content, 'utf8');
console.log('\nSalvo em _redirects, public/_redirects e redirects_gerados.txt');
