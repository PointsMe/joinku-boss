module.exports = {
    options: [
      {
        label: 'IVA ad esigibilità immediata',
        value: 'I'
      },
      {
        label: 'IVA ad esegibilità differita',
        value: 'D'
      },
      {
        label: 'Scissione dei pagamenti',
        value: 'S'
      }
    ],
    strList: [
      {
        name: 'Esigibilità IVA',
        sitem:
          'Attraverso questa sezione puoi indicare il regime di esigibilità dell' +
          'IVA (differita o immediata) o la modalità di versamento dell' +
          '\'' +
          'imposta (scissione dei pagamenti)'
      },
      {
        name: 'Cassa previdenziale',
        sitem:
          'Attraverso questa sezione puoi impostare i dati relativi alla cassa professionale di appartenenza da applicare nella fattura che stai creando'
      },
      {
        name: 'Ritenuta',
        sitem:
          'Qualora la tua cassa previdenziale di appartenenza oppure il tipo di prodotto o servizio inserito in fattura, sia soggetto a ritenuta d' +
          '\'' +
          'acconto, all' +
          '\'' +
          'interno di questa sezione dovranno essere inseriti i dati relativi alla ritenuta da applicare'
      },
      {
        name: 'Documenti correlati',
        sitem:
          'Attraverso questa sezione puoi inserire i dati relativi ad ulteriori documenti collegati alla fattura che stai creando'
      },
      {
        name: 'Allegati',
        sitem:
          'Attraverso questa sezione puoi aggiungere uno o più allegati da collegare alla fattura che stai creando'
      },
      {
        name: 'Dati bollo',
        sitem:
          'Attivando e compilando questa sezione, dichiari di aver assolto il bollo ai sensi del decreto MEF 17 giugno 2014 (art. 6)'
      },
      {
        name: 'Causale documento',
        sitem:
          'Attraverso questa sezione puoi indicare la causale della fattura che stai creando.'
      },
      {
        name: 'Art. 73 DPR 633/72',
        sitem:
          'Attraverso questa sezione puoi indicare se la fattura è emessa secondo modalità e termini stabiliti con decreto ministeriale ai sensi dell' +
          '\'' +
          'articolo 73 del DPR 633/72 che disciplina l' +
          '\'' +
          'emissione di più documenti riportanti lo stesso numero nell' +
          '\'' +
          'arco dello stesso anno'
      },
      {
        name: 'Sconto/magg.',
        sitem:
          'Attraverso questa sezione è possibile gestire l' +
          '\'' +
          'aggiunta di eventuali sconti o maggiorazioni che avranno effetto sull' +
          '\'' +
          'importo totale del documento in creazione'
      },
      {
        name: 'Fattura principal',
        sitem:
          'I dati presenti in questa sezione devono essere compilati in caso di creazione di fatture per operazioni accessorie, emesse dagli autotrasportatori per usufruire delle agevolazioni in materia di registrazione e pagamento dell' +
          '\'' +
          'IVA'
      },
      {
        name: 'Dati SAL',
        sitem:
          'In caso di creazione fatture per stato di avanzamento, all' +
          '\'' +
          'interno di questa sezione puoi inserire i dati della fase cui la fattura si riferisce'
      },
      {
        name: 'Dati trasporto/veicolo',
        sitem:
          'Attraverso questa sezione puoi indicare le informazioni relative ai veicoli (art. 38, comma 4 del DL 331 del 1993) in caso di fattura emessa per cessioni tra paesi membri di mezzi di trasporto nuovi'
      }
    ],
    cassaOneOption: [
      {
        label:
          'Cassa nazionale previdenza e assistenza avvocati e procuratori legali',
        value: 'TC01'
      },
      { label: 'Cassa previdenza dottori commercialisti',
        value: 'TC02'
      },
      { label: 'Cassa previdenza e assistenza geometri',
        value: 'TC03' },
      {
        label:
          'Cassa nazionale previdenza e assistenza ingegneri e architetti liberi professionisti',
        value: 'TC04'
      },
      { label: 'Cassa nazionale del notariato',
        value: 'TC05' },
      {
        label:
          'Cassa nazionale previdenza e assistenza ragionieri e periti commerciali',
        value: 'TC06'
      },
      {
        label:
          'Ente nazionale assistenza agenti e rappresentanti di commercio (ENASARCO)',
        value: 'TC07'
      },
      {
        label:
          'Ente nazionale previdenza e assistenza consulenti del lavoro (ENPACL)',
        value: 'TC08'
      },
      {
        label: 'Ente nazionale previdenza e assistenza medici (ENPAM)',
        value: 'TC09'
      },
      {
        label:
          'Ente nazionale previdenza e assistenza farmacisti (ENPAF)',
        value: 'TC10'
      },
      {
        label:
          'Ente nazionale previdenza e assistenza veterinari (ENPAV)',
        value: 'TC11'
      },
      {
        label:
          'Ente nazionale previdenza e assistenza impiegati dell' +
          '\'' +
          'agricoltura (ENPAIA)',
        value: 'TC12'
      },
      {
        label:
          'Fondo previdenza impiegati imprese di spedizione e agenzie marittime',
        value: 'TC13'
      },
      {
        label:
          'Istituto nazionale previdenza giornalisti italiani (INPGI)',
        value: 'TC14'
      },
      {
        label:
          'Opera nazionale assistenza orfani sanitari italiani (ONAOSI)',
        value: 'TC15'
      },
      {
        label:
          'Cassa autonoma assistenza integrativa giornalisti italiani (CASAGIT)',
        value: 'TC16'
      },
      {
        label:
          'Ente previdenza periti industriali e periti industriali laureati (EPPI)',
        value: 'TC17'
      },
      {
        label: 'Ente previdenza e assistenza pluricategoriale (EPAP)',
        value: 'TC18'
      },
      {
        label: 'Ente nazionale previdenza e assistenza biologi (ENPAB)',
        value: 'TC19'
      },
      {
        label:
          'Ente nazionale previdenza e assistenza professione infermieristica (ENPAPI)',
        value: 'TC20'
      },
      {
        label:
          'Ente nazionale previdenza e assistenza psicologi (ENPAP)',
        value: 'TC21'
      },
      { label: 'INPS',
        value: 'TC22'
      }
    ],
    cassaThreeOption: [
      { label: '22%' },
      { label: '10%' },
      { label: '4%' },
      { label: '0%' }
    ],
    cassaThreeShowOption: [
      { label: 'N1 - Escluso Art. 15 DPR 633/72' },
      { label: 'N2 - Escluso Art. 13 5C DPR 633/72' },
      { label: 'N2 - Fuori campo IVA Art. 2 DPR 633/72' },
      { label: 'N2 - Fuori campo IVA Art. 3 DPR 633/72' },
      { label: 'N2 - Fuori campo IVA Art. 4 DPR 633/72' },
      { label: 'N2 - Fuori campo IVA Art. 5 DPR 633/72' },
      { label: 'N2 - Fuori campo IVA Art. 6 DPR 633/72' },
      { label: 'N2 - Fuori campo IVA Art. 7 DPR 633/72' },
      { label: 'N2 - Regime dei minimi Art. 1 L. 244/2007' },
      { label: 'N2 - Regime forfettario Art. 1 L. 190/2014' },
      { label: 'N3 - Non Imponibile Art. 41 DL 331/93' },
      { label: 'N3 - Non Imponibile Art. 74 DPR 633/72' },
      { label: 'N3 - Non Imponibile Art. 8 DPR 633/72' },
      { label: 'N3 - Non Imponibile Art. 9 DPR 633/72' },
      { label: 'N4 - Esente Art. 10 DPR 633/72' },
      { label: 'N5 - Escluso Art. 74 DPR 633/72' },
      { label: 'N5 - Regime del margine Art. 36 41/95' },
      { label: 'N6 - Reverse charge Art. 17 DPR 633/72' },
      { label: 'N6 - Reverse charge Art. 74 DPR 633/72' },
      { label: 'N7 - Vendite a distanza Art. 40/41 DL 331/93' }
    ],
  
    ritenutaTwoOption: [
      {
        label:
          'Prestazioni di lavoro autonomo rientranti nell' +
          '\'' +
          'esercizio di arte o professione abituale',
        value: 'A'
      },
      {
        label:
          'Utilizzazione economica, da parte dell' +
          '\'' +
          'autore o dell' +
          '\'' +
          'inventore, di opere dell' +
          '\'' +
          'ingegno, di brevetti industriali e di processi, formule o informazioni relativi ad esperienze acquisite in campo industriale, commerciale o scientifico',
        value: 'B'
      },
      {
        label:
          'Utili derivanti da contratti di associazione in partecipazione e da contratti di cointeressenza, quando l' +
          '\'' +
          'apporto è costituito esclusivamente dalla prestazione di lavoro',
        value: 'C'
      },
      {
        label:
          'Utili spettanti ai soci promotori ed ai soci fondatori delle società di capitali',
        value: 'D'
      },
      {
        label:
          'Levata di protesti cambiari da parte dei segretari comunali',
        value: 'E'
      },
      {
        label:
          'Indennità corrisposte per la cessazione di attività sportiva professionale',
        value: 'G'
      },
      {
        label:
          'Indennità corrisposte per la cessazione dei rapporti di agenzia delle persone fisiche e delle società di persone con esclusione delle somme maturate entro il 31 dicembre 2003, già imputate per competenza e tassate come reddito d' +
          '\'' +
          'impresa',
        value: 'H'
      },
      {
        label:
          'Indennità corrisposte per la cessazione da funzioni notarili',
        value: 'I'
      },
      {
        label:
          'Redditi derivanti dall' +
          '\'' +
          'utilizzazione economica di opere dell' +
          '\'' +
          'ingegno, di brevetti industriali e di processi, formule e informazioni relativi a esperienze acquisite in campo industriale, commerciale o scientifico, che sono percepiti dagli aventi causa a titolo gratuito (ad es. eredi e legatari dell' +
          '\'' +
          'autore e inventore)',
        value: 'L'
      },
      {
        label:
          'Redditi derivanti dall' +
          '\'' +
          'utilizzazione economica di opere dell' +
          '\'' +
          'ingegno, di brevetti industriali e di processi, formule e informazioni relativi a esperienze acquisite in campo industriale, commerciale o scientifico, che sono percepiti da soggetti che abbiano acquistato a titolo oneroso i diritti alla loro utilizzazione',
        value: 'L1 '
      },
      {
        label:
          'Prestazioni di lavoro autonomo non esercitate abitualmente',
        value: 'M'
      },
      {
        label:
          'Redditi derivanti dall' +
          '\'' +
          'assunzione di obblighi di fare, di non fare o permettere',
        value: 'M1'
      },
      {
        label:
          'Indennità di trasferta, rimborso forfetario di spese, premi e compensi erogati: – nell' +
          '\'' +
          'esercizio diretto di attività sportive dilettantistiche – in relazione a rapporti di collaborazione coordinata e continuativa di carattere amministrativo-gestionale di natura non professionale resi a favore di società e associazioni sportive dilettantistiche e di cori, bande e filodrammatiche da parte del direttore e dei collaboratori tecnici',
        value: 'N'
      },
      {
        label:
          'Prestazioni di lavoro autonomo non esercitate abitualmente, per le quali non sussiste l' +
          '\'' +
          'obbligo di iscrizione alla gestione separata (Circ. INPS n. 104/2001)',
        value: 'O'
      },
      {
        label:
          'Redditi derivanti dall' +
          '\'' +
          'assunzione di obblighi di fare, di non fare o permettere, per le quali non sussiste l' +
          '\'' +
          'obbligo di iscrizione alla gestione separata (Circ. INPS n. 104/2001)',
        value: 'O1'
      },
      {
        label:
          'Compensi corrisposti a soggetti non residenti privi di stabile organizzazione per l' +
          '\'' +
          'uso o la concessione in uso di attrezzature industriali, commerciali o scientifiche che si trovano nel territorio dello Stato ovvero a società svizzere o stabili organizzazioni di società svizzere che possiedono i requisiti di cui all' +
          '\'' +
          'art. 15, comma 2 dell' +
          '\'' +
          'Accordo tra la Comunità europea e la Confederazione svizzera del 26 ottobre 2004 (pubblicato in G.U.C.E. del 29 dicembre 2004 n. L385/30)',
        value: 'P'
      },
      {
        label:
          'Provvigioni corrisposte ad agente o rappresentante di commercio monomandatario',
        value: 'Q'
      },
      {
        label:
          'Provvigioni corrisposte ad agente o rappresentante di commercio plurimandatario',
        value: 'R'
      },
      { label: 'Provvigioni corrisposte a commissionario',
        value: 'S' },
      { label: 'Provvigioni corrisposte a mediatore',
        value: 'T' },
      { label: 'Provvigioni corrisposte a procacciatore di affari',
        value: 'U' },
      {
        label:
          'Provvigioni corrisposte a incaricato per le vendite a domicilio provvigioni corrisposte a incaricato per la vendita porta a porta e per la vendita ambulante di giornali quotidiani e periodici (L. 25 febbraio 1987, n. 67)',
        value: 'V'
      },
      {
        label:
          'Redditi derivanti da attività commerciali non esercitate abitualmente (ad esempio, provvigioni corrisposte per prestazioni occasionali ad agente o rappresentante di commercio, mediatore, procacciatore d' +
          '\'' +
          'affari)',
        value: 'V1'
      },
      {
        label:
          'Corrispettivi erogati nel 2017 per prestazioni relative a contratti d' +
          '\'' +
          'appalto cui si sono resi applicabili le disposizioni contenute nell' +
          '\'' +
          'art. 25-ter del D.P.R. n. 600 del 29 settembre 1973',
        value: 'W'
      },
      {
        label:
          'Canoni corrisposti nel 2004 da società o enti residenti ovvero da stabili organizzazioni di società estere di cui all' +
          '\'' +
          'art. 26-quater, comma 1, lett. a) e b) del D.P.R. 600 del 29 settembre 1973, a società o stabili organizzazioni di società, situate in altro stato membro dell' +
          '\'' +
          'Unione Europea in presenza dei requisiti di cui al citato art. 26-quater, del D.P.R. 600 del 29 settembre 1973, per i quali è stato effettuato, nell' +
          '\'' +
          'anno 2006, il rimborso della ritenuta ai sensi dell' +
          '\'' +
          'art. 4 del D.Lgs. 30 maggio 2005 n. 143',
        value: 'X'
      },
      {
        label:
          'Canoni corrisposti dal 1° gennaio 2005 al 26 luglio 2005 da società o enti residenti ovvero da stabili organizzazioni di società estere di cui all' +
          '\'' +
          'art. 26-quater, comma 1, lett. a) e b) del D.P.R. n. 600 del 29 settembre 1973, a società o stabili organizzazioni di società, situate in altro stato membro dell' +
          '\'' +
          'Unione Europea in presenza dei requisiti di cui al citato art. 26-quater, del D.P.R. n. 600 del 29 settembre 1973, per i quali è stato effettuato, nell' +
          '\'' +
          'anno 2006, il rimborso della ritenuta ai sensi dell' +
          '\'' +
          'art. 4 del D.Lgs. 30 maggio 2005 n. 143',
        value: 'Y'
      },
      { label: 'Titolo diverso dai precedenti',
        value: 'Z' }
    ],
    veicoloIdPaeseOption: [
      { label: 'Afghanistan' },
      { label: 'Albania' },
      { label: 'Algeria' },
      { label: 'Andorra' },
      { label: 'Angola' },
      { label: 'Anguilla' },
      { label: 'Antartide' },
      { label: 'Antigua e Barbuda' },
      { label: 'Arabia Saudita' },
      { label: 'Argentina' },
      { label: 'Armenia' },
      { label: 'Aruba' },
      { label: 'Australia' },
      { label: 'Azerbaigian' },
      { label: 'Bahamas' },
      { label: 'Bahrein' },
      { label: 'Bangladesh' },
      { label: 'Barbados' },
      { label: 'Belgio' },
      { label: 'Belize' },
      { label: 'Benin' },
      { label: 'Bermuda' },
      { label: 'Bhutan' },
      { label: 'Bielorussia' },
      { label: 'Birmania' },
      { label: 'Bolivia' },
      { label: 'Bosnia ed Erzegovina' },
      { label: 'Botswana' },
      { label: 'Brasile' },
      { label: 'Brunei' },
  
      { label: 'Bulgaria' },
      { label: 'Burkina Faso' },
      { label: 'Burundi' },
      { label: 'Cambogia' },
      { label: 'Camerun' },
      { label: 'Canada' },
      { label: 'Capo Verde' },
      { label: 'Ciad' },
      { label: 'Cile' },
      { label: 'Cina' },
      { label: 'Cipro' },
      { label: 'Città del Vaticano' },
      { label: 'Colombia' },
      { label: 'Comore' },
      { label: 'Corea del Nord' },
      { label: 'Corea del Sud' },
      { label: 'Costa d' + '\'' + 'Avorio' },
      { label: 'Costa Rica' },
      { label: 'Croazia' },
      { label: 'Cuba' },
      { label: 'Curaçao' },
      { label: 'Danimarca' },
      { label: 'Dominica' },
      { label: 'Ecuador' },
      { label: 'Egitto' },
      { label: 'El Salvador' },
      { label: 'Emirati Arabi Uniti' },
      { label: 'Eritrea' },
      { label: 'Estonia' },
      { label: 'Etiopia' },
  
      { label: 'Figi' },
      { label: 'Filippine' },
      { label: 'Finlandia' },
      { label: 'Francia' },
      { label: 'Gabon' },
      { label: 'Gambia' },
      { label: 'Georgia' },
      { label: 'Georgia del Sud e isole Sandwich meridionali' },
      { label: 'Germania' },
      { label: 'Ghana' },
      { label: 'Giamaica' },
      { label: 'Giappone' },
      { label: 'Gibilterra' },
      { label: 'Gibuti' },
      { label: 'Giordania' },
      { label: 'Grecia' },
      { label: 'Grenada' },
      { label: 'Groenlandia' },
      { label: 'Guadalupa' },
      { label: 'Guam' },
      { label: 'Guatemala' },
      { label: 'Guernsey' },
      { label: 'Guinea' },
      { label: 'Guinea-Bissau' },
      { label: 'Guinea Equatoriale' },
      { label: 'Guyana' },
      { label: 'Guyana francese' },
      { label: 'Haiti' },
      { label: 'Honduras' },
      { label: 'Hong Kong' },
  
      { label: 'India' },
      { label: 'Indonesia' },
      { label: 'Iran' },
      { label: 'Iraq' },
      { label: 'Irlanda' },
      { label: 'Islanda' },
      { label: 'Isola Bouvet' },
      { label: 'Isola di Man' },
      { label: 'Isola di Natale' },
      { label: 'Isola Norfolk' },
      { label: 'Isole Åland' },
      { label: 'Isole BES' },
      { label: 'Isole Cayman' },
      { label: 'Isole Cocos (Keeling)' },
      { label: 'Isole Cook' },
      { label: 'Fær Øer' },
      { label: 'Isole Falkland' },
      { label: 'Isole Heard e McDonald' },
      { label: 'Isole Marianne Settentrionali' },
      { label: 'Isole Marshall' },
      { label: 'Isole minori esterne degli Stati Uniti' },
      { label: 'Isole Pitcairn' },
      { label: 'Isole Salomone' },
      { label: 'Isole Vergini britanniche' },
      { label: 'Isole Vergini americane' },
      { label: 'Israele' },
      { label: 'Italia' },
      { label: 'Jersey' },
      { label: 'Kazakistan' },
      { label: 'Kenya' },
      { label: 'Kirghizistan' },
      { label: 'Kiribati' },
      { label: 'Kuwait' },
      { label: 'Laos' },
      { label: 'Lesotho' },
      { label: 'Lettonia' },
      { label: 'Libano' },
      { label: 'Liberia' },
      { label: 'Libia' },
      { label: 'Liechtenstein' },
      { label: 'Lituania' },
      { label: 'Lussemburgo' },
      { label: 'Macao' },
      { label: 'Macedonia' },
      { label: 'Madagascar' },
      { label: 'Malawi' },
      { label: 'Malesia' },
      { label: 'Maldive' },
      { label: 'Mali' },
      { label: 'Malta' },
      { label: 'Marocco' },
      { label: 'Martinica' },
      { label: 'Mauritania' },
      { label: 'Mauritius' },
      { label: 'Mayotte' },
      { label: 'Messico' },
      { label: 'Micronesia' },
      { label: 'Moldavia' },
      { label: 'Mongolia' },
      { label: 'Montenegro' },
      { label: 'Montserrat' },
      { label: 'Mozambico' },
      { label: 'Namibia' },
      { label: 'Nauru' },
      { label: 'Nepal' },
      { label: 'Nicaragua' },
      { label: 'Niger' },
      { label: 'Nigeria' },
      { label: 'Niue' },
      { label: 'Norvegia' },
      { label: 'Nuova Caledonia' },
      { label: 'Nuova Zelanda' },
      { label: 'Oman' },
      { label: 'Paesi Bassi' },
      { label: 'Pakistan' },
      { label: 'Palau' },
      { label: 'Palestina' },
      { label: 'Panama' },
      { label: 'Papua Nuova Guinea' },
      { label: 'Paraguay' },
      { label: 'Perù' },
      { label: 'Polinesia Francese' },
      { label: 'Polonia' },
      { label: 'Porto Rico' },
      { label: 'Portogallo' },
      { label: 'Monaco' },
      { label: 'Qatar' },
      { label: 'Regno Unito' },
      { label: 'RD del Congo' },
      { label: 'Rep. Ceca' },
      { label: 'Rep. Centrafricana' },
      { label: 'Rep. del Congo' },
      { label: 'Rep. Dominicana' },
      { label: 'Riunione' },
      { label: 'Romania' },
      { label: 'Ruanda' },
      { label: 'Russia' },
      { label: 'Sahara Occidentale' },
      { label: 'Saint Kitts e Nevis' },
      { label: 'Santa Lucia' },
      { label: 'Sant' + '\'' + 'Elena, Ascensione Tristan da Cunha' },
      { label: 'Saint Vincent e Grenadine' },
      { label: 'Saint-Barthélemy' },
      { label: 'Saint-Martin' },
      { label: 'Saint-Pierre e Miquelon' },
      { label: 'Samoa' },
      { label: 'Samoa Americane' },
      { label: 'San Marino' },
      { label: 'São Tomé e Príncipe' },
      { label: 'Senegal' },
      { label: 'Serbia' },
      { label: 'Seychelles' },
      { label: 'Sierra Leone' },
      { label: 'Singapore' },
      { label: 'Sint Maarten' },
      { label: 'Siria' },
      { label: 'Slovacchia' },
      { label: 'Slovenia' },
      { label: 'Somalia' },
      { label: 'Spagna' },
      { label: 'Sri Lanka' },
      { label: 'Stati Uniti' },
      { label: 'Sudafrica' },
      { label: 'Sudan' },
      { label: 'Sudan del Sud' },
      { label: 'Suriname' },
      { label: 'Svalbard e Jan Mayen' },
      { label: 'Svezia' },
      { label: 'Svizzera' },
      { label: 'Swaziland' },
      { label: 'Taiwan' },
      { label: 'Tagikistan' },
      { label: 'Tanzania' },
      { label: 'Terre australi e antartiche francesi' },
      { label: 'Territorio britannico dell' + '\'' + 'Oceano Indiano' },
      { label: 'Thailandia' },
      { label: 'Timor Est' },
      { label: 'Togo' },
      { label: 'Tokelau' },
      { label: 'Tonga' },
      { label: 'Trinidad e Tobago' },
      { label: 'Tunisia' },
      { label: 'Turchia' },
      { label: 'Turkmenistan' },
      { label: 'Turks e Caicos' },
      { label: 'Tuvalu' },
      { label: 'Ucraina' },
      { label: 'Uganda' },
      { label: 'Ungheria' },
      { label: 'Uruguay' },
      { label: 'Uzbekistan' },
      { label: 'Vanuatu' },
      { label: 'Venezuela' },
      { label: 'Vietnam' },
      { label: 'Wallis e Futuna' },
      { label: 'Yemen' },
      { label: 'Zambia' },
      { label: 'Zimbabwe' }
    ],
    ritenutaTipoOption: [
      { label: 'Ritenuta pers.fisiche',
        value: 'RT01'
      },
      { label: 'Ritenuta pers.giurid.',
        value: 'RT02'
      }
    ],
    datiDestinatarioOption: [
      { label: 'Denominazione' },
      { label: 'Nome e Cognome' }
    ],
    veicoloProvinciaOption: [
      { label: 'Agrigento' },
      { label: 'Alessandria' },
      { label: 'Ancona' },
      { label: 'Arezzo' },
      { label: 'Ascoli Piceno' },
      { label: 'Asti' },
      { label: 'Avellino' },
      { label: 'Bari' },
      { label: 'Barletta-Andria-Trani' },
      { label: 'Belluno' },
      { label: 'Benevento' },
      { label: 'Bergamo' },
      { label: 'Biella' },
  
      { label: 'Bologna' },
      { label: 'Bolzano' },
      { label: 'Brescia' },
  
      { label: 'Brindisi' },
      { label: 'Cagliari' },
      { label: 'Caltanissetta' },
  
      { label: 'Campobasso' },
      { label: 'Carbonia-Iglesias' },
      { label: 'Caserta' },
      { label: 'Catania' },
      { label: 'Catanzaro' },
      { label: 'Chieti' },
      { label: 'Como' },
      { label: 'Cosenza' },
      { label: 'Cremona' },
      { label: 'Crotone' },
      { label: 'Cuneo' },
      { label: 'Enna' },
      { label: 'Fermo' },
      { label: 'Ferrara' },
      { label: 'Firenze' },
      { label: 'Foggia' },
  
      { label: 'Forlì-Cesena' },
      { label: 'Frosinone' },
      { label: 'Genova' },
      { label: 'Gorizia' },
      { label: 'Grosseto' },
      { label: 'Imperia' },
      { label: 'Isernia' },
      { label: 'La Spezia' },
      { label: 'L' + '\'' + 'Aquila' },
      { label: 'Latina' },
      { label: 'Lecce' },
      { label: 'Lecco' },
      { label: 'Livorno' },
      { label: 'Lodi' },
      { label: 'Lucca' },
      { label: 'Macerata' },
      { label: 'Mantova' },
      { label: 'Massa-Carrara' },
      { label: 'Matera' },
      { label: 'Messina' },
      { label: 'Milano' },
      { label: 'Modena' },
      { label: 'Monza e della Brianza' },
  
      { label: 'Napoli' },
      { label: 'Novara' },
      { label: 'Nuoro' },
      { label: 'Olbia-Tempio' },
      { label: 'Oristano' },
      { label: 'Padova' },
      { label: 'Palermo' },
      { label: 'Parma' },
      { label: 'Pavia' },
      { label: 'Perugia' },
      { label: 'Pesaro e Urbino' },
      { label: 'Pescara' },
      { label: 'Piacenza' },
      { label: 'Pisa' },
      { label: 'Pistoia' },
      { label: 'Pordenone' },
      { label: 'Potenza' },
      { label: 'Prato' },
      { label: 'Ragusa' },
      { label: 'Ravenna' },
      { label: 'Reggio Calabria' },
      { label: 'Reggio Emilia' },
      { label: 'Rieti' },
      { label: 'Rimini' },
      { label: 'Roma' },
      { label: 'Rovigo' },
      { label: 'Salerno' },
      { label: 'Medio Campidano' },
      { label: 'Sassari' },
      { label: 'Savona' },
      { label: 'Siena' },
      { label: 'Siracusa' },
      { label: 'Sondrio' },
      { label: 'Sud Sardegna' },
      { label: 'Taranto' },
      { label: 'Teramo' },
      { label: 'Terni' },
      { label: 'Torino' },
  
      { label: 'Ogliastra' },
      { label: 'Trapani' },
      { label: 'Trento' },
      { label: 'Treviso' },
      { label: 'Trieste' },
      { label: 'Udine' },
      { label: 'Varese' },
      { label: 'Venezia' },
      { label: 'Verbano-Cusio-Ossola' },
      { label: 'Vercelli' },
      { label: 'Verona' },
      { label: 'Vibo Valentia' },
      { label: 'Vicenza' },
      { label: 'Viterbo' }
  
    ]
  }
  