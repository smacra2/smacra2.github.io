
const baseDecks = {

diagnoses:[
"Acute myocardial infarction","Aortic dissection","Heart failure","Atrial fibrillation","Stroke",
"Pulmonary embolism","Asthma","COPD","Pneumonia","Tuberculosis","Sepsis","Anaphylaxis",
"Diabetic ketoacidosis","Hypothyroidism","Hyperthyroidism","Cushing syndrome","Addison disease",
"Appendicitis","Pancreatitis","Cholecystitis","Peptic ulcer disease","Crohn disease",
"Ulcerative colitis","Chronic kidney disease","Acute kidney injury","Nephrotic syndrome",
"Systemic lupus erythematosus","Rheumatoid arthritis","Sickle cell disease","Iron deficiency anemia"
],

microbiology:[
"Staphylococcus aureus","Streptococcus pneumoniae","Streptococcus pyogenes","Enterococcus",
"Escherichia coli","Klebsiella pneumoniae","Pseudomonas aeruginosa","Salmonella","Shigella",
"Campylobacter jejuni","Helicobacter pylori","Mycobacterium tuberculosis","Clostridium difficile",
"Clostridium tetani","Listeria monocytogenes","Neisseria meningitidis","Neisseria gonorrhoeae",
"Borrelia burgdorferi","Treponema pallidum","Chlamydia trachomatis","Mycoplasma pneumoniae",
"Candida albicans","Aspergillus fumigatus","Cryptococcus neoformans","Toxoplasma gondii",
"Giardia lamblia","Entamoeba histolytica"
],

antibiotics:[
"Penicillin","Amoxicillin","Ampicillin","Piperacillin-tazobactam","Cefazolin","Ceftriaxone",
"Cefepime","Meropenem","Imipenem","Vancomycin","Linezolid","Daptomycin","Azithromycin",
"Clarithromycin","Doxycycline","Gentamicin","Amikacin","Ciprofloxacin","Levofloxacin",
"Moxifloxacin","Metronidazole","Clindamycin","Trimethoprim-sulfamethoxazole",
"Rifampin","Isoniazid","Pyrazinamide","Ethambutol"
],

anatomy:[
"Aorta","Left ventricle","Right ventricle","Mitral valve","Aortic valve","Pulmonary valve",
"Tricuspid valve","Coronary artery","Left anterior descending artery","Carotid artery",
"Jugular vein","Trachea","Bronchi","Alveoli","Diaphragm","Liver","Gallbladder","Pancreas",
"Spleen","Duodenum","Jejunum","Ileum","Colon","Kidney","Ureter","Bladder","Urethra",
"Cerebrum","Cerebellum","Brainstem","Spinal cord","Femur","Tibia","Fibula","Humerus",
"Radius","Ulna"
],

clinical_signs:[
"Babinski sign","Kernig sign","Brudzinski sign","Murphy sign","McBurney point tenderness",
"Cullen sign","Grey Turner sign","Janeway lesions","Osler nodes","Roth spots",
"Kussmaul respirations","Cheyne-Stokes breathing","Trousseau sign","Chvostek sign",
"Pulsus paradoxus","Romberg test","Trendelenburg gait","Clubbing","Cyanosis","Jaundice"
],

imaging:[
"Chest X-ray","CT scan","MRI","Ultrasound","Echocardiogram","Doppler ultrasound",
"CT pulmonary angiography","Abdominal ultrasound","Mammography","Bone scan",
"PET scan","Head CT","Brain MRI","Spine MRI"
]

}

// Expand decks to ~1000 cards by repeating terms
const decks = {}
Object.keys(baseDecks).forEach(cat=>{
let arr=[]
while(arr.length<1000){
arr = arr.concat(baseDecks[cat])
}
decks[cat] = arr.slice(0,1000)
})
