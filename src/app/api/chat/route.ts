import { NextResponse } from "next/server";

// Fallback intelligent answers for Demo Mode when GEMINI_API_KEY is not configured
const mockResponses: Record<"en" | "hi" | "te", Record<string, string>> = {
  en: {
    passport: `### **Indian Passport Application Guide**
1. **Types of Applications**:
   * **Normal**: Processing takes 15–30 days. Fee: ₹1,500.
   * **Tatkaal**: Processing takes 1–3 days. Fee: ₹3,500.
2. **Key Documents Required**:
   * **Proof of Address**: Aadhaar Card, Water Bill, or Electricity Bill.
   * **Proof of Date of Birth**: Birth Certificate, Matriculation Certificate, or PAN Card.
3. **Application Process**:
   * Register on the [Passport Seva Portal](https://www.passportindia.gov.in/).
   * Fill out the online application form and pay the fee.
   * Book an appointment and visit the nearest **Passport Seva Kendra (PSK)** with original documents.
   * Complete police verification at your address. The passport is delivered via Speed Post.`,
    aadhaar: `### **Aadhaar Card Enrollment & Updates**
1. **New Enrollment**: 
   * Always **Free of cost** at all authorized centers.
2. **Demographic Details Update (Name, Address, DOB, Gender)**:
   * Fee: **₹50**. Can be done online via the [MyAadhaar Portal](https://myaadhaar.uidai.gov.in/) or at any Aadhaar Kendra.
3. **Biometric Details Update (Fingerprints, Iris, Photograph)**:
   * Fee: **₹100**. Must visit a physical center for biometrics verification.
4. **Important Documents**:
   * **Identity Proof**: Passport, PAN, Voter ID, or Driving License.
   * **Address Proof**: Electricity Bill, Bank Passbook, Water Bill, or Rent Agreement.`,
    pan: `### **Permanent Account Number (PAN Card) Guide**
1. **Purpose**: Essential for banking transactions, income tax filing, and as a national identity proof.
2. **Fees**: 
   * **e-PAN (Digital Only)**: ₹66 (Ready in 15 minutes).
   * **Physical Card Delivery**: ₹107 (Delivered to residential address in 7–15 days).
3. **How to Apply**:
   * Visit the Protean (NSDL) or UTITSL portal.
   * Complete **Form 49A** using Aadhaar e-KYC (uses OTP verification).
   * No physical document submission is required if Aadhaar OTP is used.`,
    license: `### **Driving License (DL) Process**
1. **Stage 1: Learner's License (LL)**:
   * **Eligibility**: Age 16+ for gearless vehicles <50cc, Age 18+ for light motor vehicles.
   * Apply on [Sarathi Parivahan](https://sarathi.parivahan.gov.in/).
   * Upload Age Proof (PAN/Class 10 Certificate) and Address Proof.
   * Pass the online computer traffic test. LL is valid for 6 months.
2. **Stage 2: Permanent Driving License**:
   * Apply after 30 days and before 6 months from LL issue date.
   * Book a driving test slot online and bring your vehicle to the RTO.
   * Pass the track test to receive the permanent license card via speed post.`,
    voter: `### **Voter ID (EPIC Card) Registration**
1. **Eligibility**: Indian citizen, aged 18 or above on the qualifying date of the year.
2. **Registration Steps**:
   * Sign up on the [Voters Service Portal](https://voters.eci.gov.in/) or download the **Voter Helpline App**.
   * Fill out **Form 6** for new voters.
   * Upload passport size photograph, age proof, and residence proof.
   * Local Booth Level Officer (BLO) will visit your address for verification.
   * Your Voter ID card will be dispatched via post for free.`,
    pension: `### **National Pension Schemes (NSAP)**
1. **Indira Gandhi National Old Age Pension Scheme (IGNOAPS)**:
   * **Eligibility**: 60 years and above, belonging to Below Poverty Line (BPL) families.
   * **Benefits**: Financial support of ₹200–₹500/month (varies by state).
2. **Widow & Disability Pension**:
   * Available for BPL widows aged 40–79 and severely disabled individuals.
3. **How to Apply**:
   * Visit the local Gram Panchayat, Block Development Office (BDO), or apply on your state's social welfare portal.
   * Provide BPL Card copy, Age Certificate, and Bank Account details for Direct Benefit Transfer.`,
    scheme: `### **Key Government Welfare Schemes (India)**
* **Ayushman Bharat (PM-JAY)**: Provides free health insurance cover of up to ₹5 Lakh per family per year for secondary and tertiary care hospitalization to eligible families.
* **PM-Kisan Samman Nidhi**: Provides ₹6,000 per year in three equal installments to all landholding farmer families.
* **PM Awas Yojana (PMAY)**: Provides financial assistance/interest subsidies to build affordable houses for urban and rural families.
* **Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY)**: Free food grain distribution program for eligible ration card holders.`,
    default: `### **Smart Bharat AI Civic Assistant**
I can guide you through various Indian public services. Please try asking about:
* **Aadhaar**: Address updates, biometric fees, tracking URN.
* **Passport**: Fees, document checklists, Tatkaal vs Normal.
* **PAN Card**: Instant e-PAN, links, income tax registration.
* **Driving License**: Learner's license, RTO booking, fees.
* **Voter ID**: New registration Form 6, voter lists.
* **Pensions**: Welfare schemes, old age pension eligibility.
* **Government Schemes**: PM-Kisan, Ayushman Bharat health card.`
  },
  hi: {
    passport: `### **भारतीय पासपोर्ट आवेदन गाइड**
1. **आवेदन के प्रकार**:
   * **सामान्य (Normal)**: प्रोसेसिंग में 15-30 दिन लगते हैं। शुल्क: ₹1,500।
   * **तत्काल (Tatkaal)**: प्रोसेसिंग में 1-3 दिन लगते हैं। शुल्क: ₹3,500।
2. **आवश्यक दस्तावेज़**:
   * **पते का प्रमाण**: आधार कार्ड, पानी का बिल, या बिजली बिल।
   * **जन्म तिथि का प्रमाण**: जन्म प्रमाण पत्र, मैट्रिक प्रमाणपत्र, या पैन कार्ड।
3. **आवेदन प्रक्रिया**:
   * [पासपोर्ट सेवा पोर्टल](https://www.passportindia.gov.in/) पर पंजीकरण करें।
   * ऑनलाइन आवेदन भरें और शुल्क का भुगतान करें।
   * अपॉइंटमेंट बुक करें और मूल दस्तावेजों के साथ निकटतम **पासपोर्ट सेवा केंद्र (PSK)** पर जाएं।
   * पुलिस सत्यापन पूरा होने के बाद पासपोर्ट स्पीड पोस्ट से घर पहुंच जाएगा।`,
    aadhaar: `### **आधार कार्ड नामांकन और अपडेट**
1. **नया नामांकन**: सभी अधिकृत केंद्रों पर हमेशा **निःशुल्क**।
2. **जनसांख्यिकी अपडेट (नाम, पता, जन्म तिथि)**:
   * शुल्क: **₹50**। इसे [माईआधार पोर्टल](https://myaadhaar.uidai.gov.in/) या किसी भी आधार केंद्र पर ऑनलाइन किया जा सकता है।
3. **बायोमेट्रिक अपडेट (उंगलियों के निशान, आईरिस, फोटो)**:
   * शुल्क: **₹100**। बायोमेट्रिक्स सत्यापन के लिए आधार केंद्र जाना अनिवार्य है।
4. **महत्वपूर्ण दस्तावेज़**:
   * **पहचान प्रमाण**: पासपोर्ट, पैन कार्ड, वोटर आईडी, या ड्राइविंग लाइसेंस।
   * **पता प्रमाण**: बिजली बिल, बैंक पासबुक, पानी का बिल, या किराया समझौता।`,
    pan: `### **स्थायी खाता संख्या (PAN Card) गाइड**
1. **महत्व**: बैंकिंग लेनदेन, आयकर रिटर्न दाखिल करने और राष्ट्रीय पहचान प्रमाण के लिए आवश्यक।
2. **शुल्क**:
   * **e-PAN (केवल डिजिटल)**: ₹66 (15 मिनट में तैयार)।
   * **भौतिक कार्ड**: ₹107 (7-15 दिनों में आवासीय पते पर वितरित)।
3. **आवेदन कैसे करें**:
   * Protean (NSDL) या UTITSL पोर्टल पर जाएं।
   * आधार ओटीपी सत्यापन का उपयोग करके **फॉर्म 49A** भरें।
   * डिजिटल मोड का उपयोग करने पर किसी भौतिक दस्तावेज़ को भेजने की आवश्यकता नहीं है।`,
    license: `### **ड्राइविंग लाइसेंस (DL) प्रक्रिया**
1. **चरण 1: लर्नर लाइसेंस (LL)**:
   * **पात्रता**: बिना गियर वाले वाहनों के लिए 16+ वर्ष, हल्के मोटर वाहनों के लिए 18+ वर्ष।
   * [सारथी परिवहन पोर्टल](https://sarathi.parivahan.gov.in/) पर आवेदन करें।
   * आयु और पते का प्रमाण अपलोड करें और ऑनलाइन यातायात नियमों की परीक्षा पास करें।
2. **चरण 2: स्थायी ड्राइविंग लाइसेंस**:
   * लर्नर लाइसेंस जारी होने के 30 दिनों के बाद और 6 महीने से पहले आवेदन करें।
   * ऑनलाइन टेस्ट स्लॉट बुक करें और वाहन के साथ आरटीओ (RTO) जाएं।
   * परीक्षा पास करने पर स्पीड पोस्ट से स्थायी लाइसेंस कार्ड भेजा जाएगा।`,
    voter: `### **वoter ID (EPIC Card) पंजीकरण**
1. **पात्रता**: भारतीय नागरिक, पात्रता तिथि पर 18 वर्ष या उससे अधिक आयु।
2. **पंजीकरण के चरण**:
   * [मतदाता सेवा पोर्टल](https://voters.eci.gov.in/) पर पंजीकरण करें या **Voter Helpline App** डाउनलोड करें।
   * नए मतदाताओं के लिए **फॉर्म 6** भरें।
   * फोटो, आयु प्रमाण और पते का प्रमाण अपलोड करें।
   * बूथ स्तर के अधिकारी (BLO) सत्यापन के लिए आपके घर आएंगे।
   * आपका वोटर आईडी कार्ड डाक द्वारा निःशुल्क भेज दिया जाएगा।`,
    pension: `### **राष्ट्रीय पेंशन योजनाएं (NSAP)**
1. **इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना (IGNOAPS)**:
   * **पात्रता**: 60 वर्ष या उससे अधिक, गरीबी रेखा से नीचे (BPL) परिवार।
   * **लाभ**: ₹200-₹500/माह वित्तीय सहायता (राज्यों के अनुसार भिन्न)।
2. **विधवा और विकलांगता पेंशन**:
   * बीपीएल विधवाओं (आयु 40-79) और गंभीर रूप से विकलांग व्यक्तियों के लिए उपलब्ध।
3. **आवेदन कैसे करें**:
   * स्थानीय ग्राम पंचायत, ब्लॉक विकास कार्यालय (BDO) में जाएं या अपने राज्य के सामाजिक कल्याण पोर्टल पर ऑनलाइन आवेदन करें।`,
    scheme: `### **प्रमुख सरकारी योजनाएं (भारत)**
* **आयुष्मान भारत (PM-JAY)**: पात्र परिवारों को प्रति वर्ष ₹5 लाख का मुफ्त स्वास्थ्य बीमा प्रदान करता है।
* **पीएम-किसान सम्मान निधि**: सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता (तीन किश्तों में) प्रदान करता है।
* **प्रधानमंत्री आवास योजना (PMAY)**: शहरी और ग्रामीण गरीब परिवारों को घर बनाने के लिए वित्तीय सहायता प्रदान करता है।
* **पीएम गरीब कल्याण अन्न योजना (PMGKAY)**: पात्र राशन कार्ड धारकों को मुफ्त खाद्यान्न वितरण।`,
    default: `### **स्मार्ट भारत एआई नागरिक साथी**
मैं भारतीय नागरिक सेवाओं के बारे में मार्गदर्शन कर सकता हूँ। कृपया इनके बारे में पूछें:
* **आधार**: पता अपडेट, बायोमेट्रिक शुल्क, यूआरएन ट्रैकिंग।
* **पासपोर्ट**: शुल्क, आवश्यक दस्तावेज़, तत्काल बनाम सामान्य।
* **पैन कार्ड**: त्वरित ई-पैन, लिंक, आयकर पंजीकरण।
* **ड्राइविंग लाइसेंस**: लर्नर लाइसेंस, आरटीओ बुकिंग, शुल्क।
* **वोटर आईडी**: नया पंजीकरण फॉर्म 6, मतदाता सूची।
* **पेंशन**: कल्याणकारी योजनाएं, वृद्धावस्था पेंशन पात्रता।
* **सरकारी योजनाएं**: पीएम-किसान, आयुष्मान भारत स्वास्थ्य कार्ड।`
  },
  te: {
    passport: `### **భారతీయ పాస్‌పోర్ట్ దరఖాస్తు గైడ్**
1. **దరఖాస్తు రకాలు**:
   * **సాధారణ (Normal)**: సమయం 15-30 రోజులు. రుసుము: ₹1,500.
   * **తత్కాల్ (Tatkaal)**: సమయం 1-3 రోజులు. రుసుము: ₹3,500.
2. **కావలసిన పత్రాలు**:
   * **చిరునామా రుజువు**: ఆధార్ కార్డ్, నీటి బిల్లు, లేదా విద్యుత్ బిల్లు.
   * **వయస్సు రుజువు**: పుట్టిన తేదీ ధృవీకరణ పత్రం, పదో తరగతి సర్టిఫికేట్, లేదా పాన్ కార్డ్.
3. **దరఖాస్తు విధానం**:
   * [పాస్‌పోర్ట్ సేవా పోర్టల్](https://www.passportindia.gov.in/)లో నమోదు చేసుకోండి.
   * ఆన్‌లైన్ ఫారమ్ పూర్తి చేసి, రుసుము చెల్లించి, స్లాట్ బుక్ చేసుకోండి.
   * ఒరిజినల్ పత్రాలతో సమీపంలోని **పాస్‌పోర్ట్ సేవా కేంద్రం (PSK)**ను సందర్శించండి.
   * పోలీస్ వెరిఫికేషన్ పూర్తయిన తర్వాత పాస్‌పోర్ట్ పోస్ట్ ద్వారా అందుతుంది.`,
    aadhaar: `### **ఆధార్ కార్డు నమోదు & అప్‌డేట్**
1. **కొత్త నమోదు**: అధికారిక కేంద్రాల్లో ఎల్లప్పుడూ **ఉచితం**.
2. **డెమోగ్రాఫిక్ వివరాల అప్‌డేట్ (పేరు, చిరునామా, పుట్టిన తేదీ)**:
   * రుసుము: **₹50**. [MyAadhaar Portal](https://myaadhaar.uidai.gov.in/) లో లేదా ఆధార్ కేంద్రంలో అప్‌డేట్ చేసుకోవచ్చు.
3. **బయోమెట్రిక్ అప్‌డేట్ (వేలిముద్రలు, ఐరిస్, ఫోటో)**:
   * రుసుము: **₹100**. బయోమెట్రిక్ వెరిఫికేషన్ కోసం ఆధార్ కేంద్రానికి వెళ్ళాలి.
4. **ముఖ్యమైన పత్రాలు**:
   * **గుర్తింపు రుజువు**: పాస్‌పోర్ట్, పాన్ కార్డ్, ఓటర్ ఐడీ, లేదా డ్రైవింగ్ లైసెన్స్.
   * **చిరునామా రుజువు**: విద్యుత్ బిల్లు, బ్యాంక్ పాస్‌బుక్, నీటి బిల్లు, అద్దె ఒప్పందం.`,
    pan: `### **పాన్ కార్డ్ (PAN Card) గైడ్**
1. **ఉద్దేశ్యం**: బ్యాంకింగ్ లావాదేవీలు, ఐటీ రిటర్న్స్ ఫైలింగ్ మరియు గుర్తింపు రుజువు కోసం తప్పనిసరి.
2. **రుసుము**:
   * **ఈ-పాన్ (e-PAN డిజిటల్)**: ₹66 (15 నిమిషాల్లో సిద్ధం అవుతుంది).
   * **భౌతిక కార్డు**: ₹107 (7-15 రోజుల్లో రిజిస్టర్డ్ చిరునామాకు వస్తుంది).
3. **ఎలా దరఖాస్తు చేయాలి**:
   * Protean (NSDL) లేదా UTITSL వెబ్‌సైట్ సందర్శించండి.
   * ఆధార్ OTP వెరిఫికేషన్ ఉపయోగించి **ఫారమ్ 49A** నింపండి.
   * డిజిటల్ విధానంలో పత్రాలు పోస్ట్ ద్వారా పంపాల్సిన అవసరం లేదు.`,
    license: `### **డ్రైవింగ్ లైసెన్స్ (DL) విధానం**
1. **దశ 1: లర్నర్ లైసెన్స్ (LL)**:
   * **అర్హత**: గేర్ లేని వాహనాలకు 16+ సంవత్సరాలు, లైట్ మోటార్ వాహనాలకు 18+ సంవత్సరాలు.
   * [సారథి పరివాహన్ పోర్టల్](https://sarathi.parivahan.gov.in/)లో దరఖాస్తు చేయండి.
   * వయస్సు, చిరునామా రుజువులను అప్‌లోడ్ చేసి ఆన్‌లైన్ పరీక్ష రాయండి.
2. **దశ 2: పర్మనెంట్ డ్రైవింగ్ లైసెన్స్**:
   * లర్నర్ లైసెన్స్ వచ్చిన 30 రోజుల నుండి 6 నెలల లోపు దరఖాస్తు చేసుకోవాలి.
   * ఆన్‌లైన్ స్లాట్ బుక్ చేసుకుని, వాహనంతో RTO ఆఫీస్ వద్ద డ్రైవింగ్ టెస్ట్ పాస్ అవ్వాలి.`,
    voter: `### **ఓటర్ ఐడీ (EPIC Card) నమోదు**
1. **అర్హత**: భారత పౌరుడు, ఓటరుగా నమోదు చేసుకునే సంవత్సరంలో 18 ఏళ్లు నిండి ఉండాలి.
2. **నమోదు దశలు**:
   * [Voters Service Portal](https://voters.eci.gov.in/) లో లేదా **Voter Helpline App** ద్వారా నమోదు చేసుకోవచ్చు.
   * కొత్త ఓటరు కోసం **ఫారమ్ 6** నింపండి.
   * ఫోటో, వయస్సు మరియు నివాస ధృవీకరణ పత్రాలు అప్‌లోడ్ చేయండి.
   * బూత్ స్థాయి అధికారి (BLO) వెరిఫికేషన్ కోసం మీ ఇంటికి వస్తారు.
   * ఆమోదం పొందిన తర్వాత ఓటర్ ఐడీ పోస్ట్ ద్వారా ఉచితంగా పంపబడుతుంది.`,
    pension: `### **జాతీయ పెన్షన్ పథకాలు (NSAP)**
1. **ఇందిరా గాంధీ జాతీయ వృద్ధాప్య పెన్షన్**:
   * **అర్హత**: 60 ఏళ్లు పైబడి ఉండి, దారిద్య్ర రేఖకు దిగువన (BPL) ఉన్న కుటుంబాలు.
   * **ప్రయోజనాలు**: నెలకు ₹200 నుండి ₹500 ఆర్థిక సహాయం (రాష్ట్రాలను బట్టి మారుతుంది).
2. **వితంతు & వికలాంగుల పెన్షన్**:
   * BPL వితంతువులు (వయస్సు 40-79) మరియు తీవ్ర వైకల్యం ఉన్నవారికి లభిస్తుంది.
3. **ఎలా దరఖాస్తు చేయాలి**:
   * స్థానిక గ్రామ పంచాయతీ, బ్లాక్ డెవలప్‌మెంట్ ఆఫీస్ (BDO) ద్వారా లేదా సామాజిక సంక్షేమ వెబ్‌సైట్‌లో దరఖాస్తు చేయండి.`,
    scheme: `### **ప్రభుత్వ సంక్షేమ పథకాలు (భారతదేశం)**
* **ఆయుష్మాన్ భారత్ (PM-JAY)**: అర్హులైన కుటుంబాలకు సంవత్సరానికి ₹5 లక్షల విలువైన ఉచిత వైద్య బీమా అందిస్తుంది.
* **పీఎం किसान సమ్మాన్ నిధి**: రైతు కుటుంబాలకు ఏడాదికి ₹6,000 చొప్పున మూడు వాయిదాలలో నేరుగా ఖాతాలో జమ చేస్తుంది.
* **పీఎం ఆవాస్ యోజన (PMAY)**: పేద కుటుంబాలకు ఇల్లు నిర్మించుకోవడానికి ఆర్థిక సహాయాన్ని అందిస్తుంది.
* **పీఎం గరీబ్ కళ్యాణ్ అన్న యోజన**: అర్హులైన రేషన్ కార్డ్ హోల్డర్లకు ఉచిత బియ్యం/గోధుమల పంపిణీ.`,
    default: `### **స్మార్ట్ భారత్ AI సివిక్ అసిస్టెంట్**
నేను భారతీయ పౌర సేవలకు సంబంధించిన సమాచారాన్ని అందించగలను. కింది వాటి గురించి అడగండి:
* **ఆధార్**: చిరునామా మార్పు, బయోమెట్రిక్ రుసుము, URN ట్రాకింగ్.
* **పాస్‌పోర్ట్**: దరఖాస్తు రుసుము, కావాల్సిన పత్రాలు, తత్కాల్ vs నార్మల్.
* **పాన్ కార్డ్**: తక్షణ ఈ-పాన్, లింకులు, ఆదాయపు పన్ను వివరాలు.
* **డ్రైవింగ్ లైసెన్స్**: లర్నర్ లైసెన్స్, RTO టెస్ట్ బుకింగ్, రుసుము.
* **ఓటర్ ఐడీ**: కొత్త ఓటర్ నమోదు ఫారమ్ 6, జాబితా వివరాలు.
* **పెన్షన్లు**: వృద్ధాప్య పెన్షన్, వితంతు పెన్షన్ అర్హతలు.
* **ప్రభుత్వ పథకాలు**: పీఎం-కిసాన్, ఆయుష్మాన్ భారత్ హెల్త్ కార్డ్.`
  }
};

// Simple helper to find matched topic keywords
function getFallbackResponse(query: string, lang: "en" | "hi" | "te"): string {
  const normalized = query.toLowerCase();
  
  if (normalized.includes("passport") || normalized.includes("पासपोर्ट") || normalized.includes("పాస్‌పోర్ట్")) {
    return mockResponses[lang].passport;
  }
  if (normalized.includes("aadhaar") || normalized.includes("aadhar") || normalized.includes("आधार") || normalized.includes("ఆధార్")) {
    return mockResponses[lang].aadhaar;
  }
  if (normalized.includes("pan") || normalized.includes("पैन") || normalized.includes("పాన్")) {
    return mockResponses[lang].pan;
  }
  if (normalized.includes("license") || normalized.includes("licence") || normalized.includes("ड्राइविंग") || normalized.includes("లైసెన్స్")) {
    return mockResponses[lang].driving_license || mockResponses[lang].license; // fallback
  }
  if (normalized.includes("voter") || normalized.includes("vote") || normalized.includes("चुनाव") || normalized.includes("ఓటర్")) {
    return mockResponses[lang].voter;
  }
  if (normalized.includes("pension") || normalized.includes("पेंशन") || normalized.includes("పెన్షన్")) {
    return mockResponses[lang].pension;
  }
  if (normalized.includes("scheme") || normalized.includes("yojana") || normalized.includes("योजना") || normalized.includes("పథకం") || normalized.includes("కళ్యాణ్") || normalized.includes("kalyan")) {
    return mockResponses[lang].scheme;
  }
  return mockResponses[lang].default;
}

export async function POST(request: Request) {
  try {
    const { messages, lang = "en" } = await request.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const apiKey = process.env.GEMINI_API_KEY;

    // Check if API key is present
    if (!apiKey) {
      const fallbackText = getFallbackResponse(lastUserMessage, lang as "en" | "hi" | "te");
      return NextResponse.json({
        content: fallbackText,
        demoMode: true
      });
    }

    // Call Gemini API directly using native fetch
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: messages.map((m: any) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }]
          })),
          systemInstruction: {
            parts: [{
              text: `You are Smart Bharat - AI Civic Companion, an advanced virtual portal for Indian citizen services.
Your role is to help citizens answer questions about Indian government schemes, municipal services, taxes (GST, IT), pensions, documents (Aadhaar, Passport, PAN, Driving License, Voter ID), birth/death certificates, utility connections, etc.
Guidelines:
1. Provide accurate, structured, and informative answers using markdown formatting (bullet points, bold text, numbered lists).
2. Write responses in the language of the request: English, Hindi, or Telugu. The parameter lang specifies the requested output language code: '${lang}'.
3. Always maintain a polite, civil, and professional tone.
4. Keep the context focused strictly on India's public administration, government portals, and municipal procedures.`
            }]
          },
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 800
          }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      // Fallback on HTTP error
      const fallbackText = getFallbackResponse(lastUserMessage, lang as "en" | "hi" | "te");
      return NextResponse.json({
        content: `${fallbackText}\n\n*(Note: Gemini API returned an error, falling back to smart demo response)*`,
        demoMode: true
      });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      const fallbackText = getFallbackResponse(lastUserMessage, lang as "en" | "hi" | "te");
      return NextResponse.json({
        content: fallbackText,
        demoMode: true
      });
    }

    return NextResponse.json({
      content: replyText,
      demoMode: false
    });

  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
