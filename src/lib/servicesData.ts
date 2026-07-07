export interface DocumentChecklistItem {
  name: string;
  explanation: string;
}

export interface ServiceDetail {
  id: string;
  name: string;
  category: "identity" | "travel" | "finance" | "utility" | "certificates" | "social";
  description: string;
  eligibility: string;
  processingTime: string;
  fees: string;
  steps: string[];
  documents: DocumentChecklistItem[];
}

export type ServicesData = Record<string, ServiceDetail>;

export const servicesData: Record<"en" | "hi" | "te", ServicesData> = {
  en: {
    aadhaar: {
      id: "aadhaar",
      name: "Aadhaar Card Update & Enrollment",
      category: "identity",
      description: "Aadhaar is a 12-digit unique identity number issued by UIDAI. This service enables citizens to apply for a new Aadhaar card or update demographics (name, address, date of birth) and biometrics.",
      eligibility: "Any resident of India (including infants and foreigners residing in India for >182 days).",
      processingTime: "5 to 90 days depending on verification checks.",
      fees: "New Enrollment: Free. Demographic Update: ₹50. Biometric Update: ₹100.",
      steps: [
        "Locate an authorized Aadhaar Enrollment Centre or log in to the MyAadhaar online portal.",
        "Book an appointment online or walk in with the required documents.",
        "Fill out the Enrollment/Correction Form.",
        "Submit biometric details (iris scan, fingerprints, and photograph) at the centre.",
        "Provide Proof of Identity (POI) and Proof of Address (POA) documents.",
        "Collect the acknowledgment slip containing the Update Request Number (URN) to track status."
      ],
      documents: [
        {
          name: "Proof of Identity (POI)",
          explanation: "Required to verify your legal name, signature, and face photograph (e.g., Passport, PAN Card, Voter ID, or Driving License)."
        },
        {
          name: "Proof of Address (POA)",
          explanation: "Required to verify your residential address where your Aadhaar card will be delivered (e.g., Electricity Bill, Bank Statement, Water Bill, Rent Agreement)."
        },
        {
          name: "Proof of Date of Birth (DOB)",
          explanation: "Required to establish your date of birth if demographic update includes age changes (e.g., Birth Certificate, SSLC Book/Certificate, Passport)."
        }
      ]
    },
    passport: {
      id: "passport",
      name: "Indian Passport (Normal / Tatkaal)",
      category: "travel",
      description: "Apply for a fresh passport or re-issue of passport for travel abroad. Tatkaal scheme allows fast-track processing for urgent travel requirements.",
      eligibility: "Indian citizens residing in India who are at least 18 years old (minor passports are applied via guardians).",
      processingTime: "Normal: 15-30 days. Tatkaal: 1-3 days.",
      fees: "Normal (36 pages): ₹1,500. Tatkaal: ₹3,500.",
      steps: [
        "Register on the official Passport Seva online portal.",
        "Fill and submit the online application form.",
        "Pay the processing fee online and book an appointment slot at the nearest Passport Seva Kendra (PSK).",
        "Visit the PSK with original documents for document verification, biometric data capture, and photograph.",
        "Undergo police verification at your permanent address (if required).",
        "Receive your passport via Speed Post."
      ],
      documents: [
        {
          name: "Proof of Address (POA)",
          explanation: "Verifies your present residential address for security checks and physical delivery (e.g., Water Bill, Telephone Bill, Electricity Bill, Aadhaar Card, Rent Agreement)."
        },
        {
          name: "Proof of Date of Birth (DOB)",
          explanation: "Confirms your birth details as printed on the travel document (e.g., Birth Certificate, Matriculation Certificate, PAN Card)."
        },
        {
          name: "Non-ECR Category Proof",
          explanation: "Required to clear emigration check requirements if you have passed Matriculation (Class 10) or above (e.g., Matriculation Certificate, Degree Certificate)."
        }
      ]
    },
    pan: {
      id: "pan",
      name: "Permanent Account Number (PAN Card)",
      category: "finance",
      description: "A 10-digit alphanumeric identifier issued by the Income Tax Department. Essential for financial transactions, opening bank accounts, and filing income tax returns.",
      eligibility: "Any individual, company, or entity (Indian or foreign) who is a taxpayer or needs a PAN.",
      processingTime: "e-PAN: 10-15 minutes. Physical Card: 7-15 working days.",
      fees: "Physical Card: ₹107 (within India). e-PAN only: ₹66.",
      steps: [
        "Visit the official NSDL (Protean) or UTITSL online application portal.",
        "Select Form 49A (for Indian Citizens) and fill out personal details.",
        "Select the mode of submission: Digital (e-KYC via Aadhaar OTP) or Physical.",
        "Make the online payment using credit card, debit card, or net banking.",
        "For digital mode, verify details via Aadhaar OTP. For physical mode, mail signed application printout along with documents to the NSDL office.",
        "Track delivery status using the 15-digit Acknowledgment Number."
      ],
      documents: [
        {
          name: "Aadhaar Card (e-KYC)",
          explanation: "Acts as a single proof of identity, address, and date of birth, facilitating instant digital processing."
        },
        {
          name: "Proof of Identity (POI)",
          explanation: "Only needed if Aadhaar is not used (e.g., Voter ID, Driving License, Passport)."
        },
        {
          name: "Proof of Address (POA)",
          explanation: "Only needed if Aadhaar is not used (e.g., Utility Bills, Bank Account Statement)."
        }
      ]
    },
    driving_license: {
      id: "driving_license",
      name: "Driving License (Learner's & Permanent)",
      category: "certificates",
      description: "Obtain an official authorization to operate motor vehicles on public roads. First, a Learner's License is issued, followed by a driving test for the Permanent License.",
      eligibility: "Age >= 16 for gearless vehicles up to 50cc; Age >= 18 for light motor vehicles with gear; Age >= 20 for commercial transport vehicles.",
      processingTime: "Learner's License: 1 day (online test). Permanent License: 7-14 days after passing driving test.",
      fees: "Learner's: ₹150 per class. Permanent Test & Issue: ₹700 - ₹1000 depending on vehicle class.",
      steps: [
        "Apply online on the Sarathi Parivahan portal.",
        "Fill application details and select class of vehicles.",
        "Upload required documents and medical certificate (Form 1A, if applicable).",
        "Pay fees and book slot for Learner's test (online or at RTO).",
        "Clear the computer-based traffic rules test to receive your Learner's License.",
        "After 30 days (and before 6 months), book a slot for the physical driving test at the RTO.",
        "Pass the driving track test to get your permanent Driving License dispatched."
      ],
      documents: [
        {
          name: "Age Proof",
          explanation: "Ensures you meet the minimum statutory age requirements for driving (e.g., Birth Certificate, School Leaving Certificate, PAN Card, Passport)."
        },
        {
          name: "Address Proof",
          explanation: "Establishes jurisdiction of the RTO where you are applying (e.g., Voter ID, Ration Card, Aadhaar Card, Electricity Bill)."
        },
        {
          name: "Medical Certificate (Form 1A)",
          explanation: "Required for transport vehicles or applicants above 40 years to certify physical fitness to drive safely."
        }
      ]
    },
    voter_id: {
      id: "voter_id",
      name: "Voter ID Card (Voter Enrollment)",
      category: "identity",
      description: "Register as a voter with the Election Commission of India. A Voter ID (EPIC card) is issued to citizens enabling them to cast votes in national, state, and local elections.",
      eligibility: "Indian citizen, aged 18 or above on the qualifying date, and ordinarily resident in the constituency.",
      processingTime: "30 to 45 days including field verification.",
      fees: "Free of cost.",
      steps: [
        "Register on the Voter Service Portal (VSP) or download the Voter Helpline App.",
        "Fill out 'Form 6' for fresh registration.",
        "Upload a recent passport-sized color photograph.",
        "Upload age proof and address proof documents.",
        "Submit the form. A Booth Level Officer (BLO) will conduct physical verification at your residence.",
        "Once approved, your EPIC number is generated, and the card is dispatched by post."
      ],
      documents: [
        {
          name: "Passport-sized Photograph",
          explanation: "Required to print your photo on the Voter ID Card and the electoral roll."
        },
        {
          name: "Proof of Age",
          explanation: "Verifies you are at least 18 years old (e.g., Birth Certificate, Class 10 Marksheet, Aadhaar Card, PAN Card)."
        },
        {
          name: "Proof of Ordinary Residence",
          explanation: "Verifies that you live in the constituency where you are registering (e.g., Aadhaar Card, Bank Passbook, Gas Bill, Water Bill)."
        }
      ]
    },
    pension: {
      id: "pension",
      name: "National Social Assistance Scheme (Pension)",
      category: "social",
      description: "Apply for monthly financial support under government social welfare schemes including Indira Gandhi National Old Age Pension, Widow Pension, or Disability Pension.",
      eligibility: "Aged 60 or above (for old age pension), widows, or disabled individuals who belong to a Below Poverty Line (BPL) household.",
      processingTime: "30 to 60 days.",
      fees: "Free of cost.",
      steps: [
        "Obtain the Pension Application Form from the local Block Development Office (BDO), Gram Panchayat, or Social Welfare Portal.",
        "Fill personal details, income details, and bank account information.",
        "Attach passport size photograph and copy of BPL Card.",
        "Submit the application to the Gram Panchayat or BDO for validation.",
        "A verification officer will verify the economic and age status.",
        "Once approved, monthly pension is directly credited to the beneficiary's bank account."
      ],
      documents: [
        {
          name: "BPL Certificate / Card",
          explanation: "Crucial proof that the applicant falls under the Below Poverty Line category, which is the primary economic eligibility criterion."
        },
        {
          name: "Age Proof Certificate",
          explanation: "Confirms the applicant meets the age threshold (e.g., 60 years or older) for Old Age Pension (e.g., Birth Certificate, Medical Board Certificate)."
        },
        {
          name: "Bank Account Details (Passbook copy)",
          explanation: "Required to facilitate Direct Benefit Transfer (DBT) of the pension amount safely without intermediaries."
        }
      ]
    }
  },
  hi: {
    aadhaar: {
      id: "aadhaar",
      name: "आधार कार्ड अपडेट और नामांकन",
      category: "identity",
      description: "आधार यूआईडीएआई द्वारा जारी 12 अंकों की एक विशिष्ट पहचान संख्या है। यह सेवा नागरिकों को नया आधार कार्ड बनवाने या जनसांख्यिकी (नाम, पता, जन्म तिथि) और बायोमेट्रिक्स को अपडेट करने में सक्षम बनाती है।",
      eligibility: "भारत का कोई भी निवासी (शिशुओं और भारत में >182 दिनों से रहने वाले विदेशी नागरिकों सहित)।",
      processingTime: "सत्यापन जांच के आधार पर 5 से 90 दिन।",
      fees: "नया नामांकन: निःशुल्क। जनसांख्यिकी अपडेट: ₹50। बायोमेट्रिक अपडेट: ₹100।",
      steps: [
        "अधिकृत आधार नामांकन केंद्र का पता लगाएं या माईआधार ऑनलाइन पोर्टल पर लॉग इन करें।",
        "ऑनलाइन अपॉइंटमेंट बुक करें या आवश्यक दस्तावेजों के साथ केंद्र पर जाएं।",
        "नामांकन/सुधार फॉर्म भरें।",
        "केंद्र पर बायोमेट्रिक विवरण (आईरिस स्कैन, उंगलियों के निशान और तस्वीर) जमा करें।",
        "पहचान का प्रमाण (POI) और पते का प्रमाण (POA) दस्तावेज प्रदान करें।",
        "स्थिति को ट्रैक करने के लिए अपडेट अनुरोध संख्या (URN) वाली पावती पर्ची लें।"
      ],
      documents: [
        {
          name: "पहचान का प्रमाण (POI)",
          explanation: "आपके कानूनी नाम, हस्ताक्षर और चेहरे की तस्वीर को सत्यापित करने के लिए आवश्यक (जैसे, पासपोर्ट, पैन कार्ड, वोटर आईडी, या ड्राइविंग लाइसेंस)।"
        },
        {
          name: "पते का प्रमाण (POA)",
          explanation: "आपके आवासीय पते को सत्यापित करने के लिए आवश्यक है जहां आपका आधार कार्ड वितरित किया जाएगा (जैसे, बिजली बिल, बैंक स्टेटमेंट, पानी का बिल, किराया समझौता)।"
        },
        {
          name: "जन्म तिथि का प्रमाण (DOB)",
          explanation: "यदि जनसांख्यिकी अपडेट में आयु परिवर्तन शामिल है तो आपकी जन्म तिथि को स्थापित करने के लिए आवश्यक है (जैसे, जन्म प्रमाण पत्र, स्कूल छोड़ने का प्रमाण पत्र, पासपोर्ट)।"
        }
      ]
    },
    passport: {
      id: "passport",
      name: "भारतीय पासपोर्ट (सामान्य / तत्काल)",
      category: "travel",
      description: "विदेश यात्रा के लिए नया पासपोर्ट या पासपोर्ट दोबारा जारी करने के लिए आवेदन करें। तत्काल योजना तत्काल यात्रा आवश्यकताओं के लिए तेजी से प्रसंस्करण की अनुमति देती है।",
      eligibility: "भारत में रहने वाले भारतीय नागरिक जिनकी आयु कम से कम 18 वर्ष है (नाबालिगों के पासपोर्ट अभिभावकों के माध्यम से लागू होते हैं)।",
      processingTime: "सामान्य: 15-30 दिन। तत्काल: 1-3 दिन।",
      fees: "सामान्य (36 पृष्ठ): ₹1,500। तत्काल: ₹3,500।",
      steps: [
        "आधिकारिक पासपोर्ट सेवा ऑनलाइन पोर्टल पर पंजीकरण करें।",
        "ऑनलाइन आवेदन पत्र भरें और जमा करें।",
        "प्रसंस्करण शुल्क का ऑनलाइन भुगतान करें और निकटतम पासपोर्ट सेवा केंद्र (PSK) में अपॉइंटमेंट बुक करें।",
        "दस्तावेज़ सत्यापन, बायोमेट्रिक डेटा कैप्चर और फ़ोटोग्राफ़ के लिए मूल दस्तावेज़ों के साथ पीएसके पर जाएँ।",
        "अपने स्थायी पते पर पुलिस सत्यापन से गुजरें (यदि आवश्यक हो)।",
        "स्पीड पोस्ट के माध्यम से अपना पासपोर्ट प्राप्त करें।"
      ],
      documents: [
        {
          name: "पते का प्रमाण (POA)",
          explanation: "सुरक्षा जांच और भौतिक वितरण के लिए आपके वर्तमान आवासीय पते की पुष्टि करता है (जैसे, पानी का बिल, टेलीफोन बिल, बिजली बिल, आधार कार्ड, किराया समझौता)।"
        },
        {
          name: "जन्म तिथि का प्रमाण (DOB)",
          explanation: "यात्रा दस्तावेज़ पर मुद्रित आपके जन्म विवरण की पुष्टि करता है (जैसे, जन्म प्रमाण पत्र, मैट्रिकुलेशन प्रमाण पत्र, पैन कार्ड)।"
        },
        {
          name: "गैर-ईसीआर श्रेणी का प्रमाण (Non-ECR)",
          explanation: "यदि आपने मैट्रिक (कक्षा 10) या उससे ऊपर की परीक्षा उत्तीर्ण की है तो उत्प्रवास जांच आवश्यकताओं को हटाने के लिए आवश्यक है (जैसे, मैट्रिकुलेशन प्रमाण पत्र, डिग्री प्रमाण पत्र)।"
        }
      ]
    },
    pan: {
      id: "pan",
      name: "स्थायी खाता संख्या (PAN Card)",
      category: "finance",
      description: "आयकर विभाग द्वारा जारी 10 अंकों का अल्फ़ान्यूमेरिक पहचानकर्ता। वित्तीय लेनदेन, बैंक खाते खोलने और आयकर रिटर्न दाखिल करने के लिए आवश्यक।",
      eligibility: "कोई भी व्यक्ति, कंपनी या संस्था (भारतीय या विदेशी) जो करदाता है या जिसे पैन की आवश्यकता है।",
      processingTime: "ई-पैन (e-PAN): 10-15 मिनट। भौतिक कार्ड: 7-15 कार्य दिवस।",
      fees: "भौतिक कार्ड: ₹107 (भारत के भीतर)। केवल ई-पैन: ₹66।",
      steps: [
        "आधिकारिक NSDL (Protean) या UTITSL ऑनलाइन आवेदन पोर्टल पर जाएं।",
        "फॉर्म 49A (भारतीय नागरिकों के लिए) चुनें और व्यक्तिगत विवरण भरें।",
        "जमा करने का तरीका चुनें: डिजिटल (आधार ओटीपी के माध्यम से ई-केवाईसी) या भौतिक।",
        "क्रेडिट कार्ड, डेबिट कार्ड या नेट बैंकिंग का उपयोग करके ऑनलाइन भुगतान करें।",
        "डिजिटल मोड के लिए, आधार ओटीपी के माध्यम से विवरण सत्यापित करें। भौतिक मोड के लिए, दस्तावेज़ों के साथ हस्ताक्षरित आवेदन पत्र का प्रिंटआउट एनएसडीएल कार्यालय में डाक से भेजें।",
        "15 अंकों की पावती संख्या का उपयोग करके वितरण स्थिति को ट्रैक करें।"
      ],
      documents: [
        {
          name: "आधार कार्ड (e-KYC)",
          explanation: "पहचान, पते और जन्म तिथि के एकल प्रमाण के रूप में कार्य करता है, जिससे तत्काल डिजिटल प्रसंस्करण आसान हो जाता है।"
        },
        {
          name: "पहचान का प्रमाण (POI)",
          explanation: "केवल तभी आवश्यक है जब आधार का उपयोग नहीं किया जा रहा हो (जैसे, वोटर आईडी, ड्राइविंग लाइसेंस, पासपोर्ट)।"
        },
        {
          name: "पते का प्रमाण (POA)",
          explanation: "केवल तभी आवश्यक है जब आधार का उपयोग नहीं किया जा रहा हो (जैसे, उपयोगिता बिल, बैंक खाता विवरण)।"
        }
      ]
    },
    driving_license: {
      id: "driving_license",
      name: "ड्राइविंग लाइसेंस (लर्नर और स्थायी)",
      category: "certificates",
      description: "सार्वजनिक सड़कों पर मोटर वाहन चलाने के लिए आधिकारिक प्राधिकरण प्राप्त करें। सबसे पहले, एक लर्नर लाइसेंस जारी किया जाता है, उसके बाद स्थायी लाइसेंस के लिए ड्राइविंग टेस्ट होता है।",
      eligibility: "बिना गियर वाले वाहनों (50cc तक) के लिए आयु >= 16 वर्ष; गियर वाले हल्के मोटर वाहनों के लिए आयु >= 18 वर्ष; वाणिज्यिक परिवहन वाहनों के लिए आयु >= 20 वर्ष।",
      processingTime: "लर्नर लाइसेंस: 1 दिन (ऑनलाइन टेस्ट)। स्थायी लाइसेंस: ड्राइविंग टेस्ट पास करने के बाद 7-14 दिन।",
      fees: "लर्नर लाइसेंस: ₹150 प्रति श्रेणी। स्थायी टेस्ट और जारी करना: ₹700 - ₹1000 वाहन श्रेणी के आधार पर।",
      steps: [
        "सारथी परिवहन पोर्टल पर ऑनलाइन आवेदन करें।",
        "आवेदन का विवरण भरें और वाहनों की श्रेणी चुनें।",
        "आवश्यक दस्तावेज और चिकित्सा प्रमाण पत्र (फॉर्म 1A, यदि लागू हो) अपलोड करें।",
        "शुल्क का भुगतान करें और लर्नर टेस्ट (ऑनलाइन या आरटीओ में) के लिए स्लॉट बुक करें।",
        "लर्नर लाइसेंस प्राप्त करने के लिए कंप्यूटर आधारित यातायात नियमों की परीक्षा पास करें।",
        "30 दिनों के बाद (और 6 महीने से पहले), आरटीओ में शारीरिक ड्राइविंग टेस्ट के लिए स्लॉट बुक करें।",
        "स्थायी ड्राइविंग लाइसेंस प्राप्त करने के लिए ड्राइविंग ट्रैक टेस्ट पास करें।"
      ],
      documents: [
        {
          name: "आयु का प्रमाण",
          explanation: "यह सुनिश्चित करता है कि आप ड्राइविंग के लिए न्यूनतम कानूनी आयु आवश्यकताओं को पूरा करते हैं (जैसे, जन्म प्रमाण पत्र, स्कूल छोड़ने का प्रमाण पत्र, पैन कार्ड, पासपोर्ट)।"
        },
        {
          name: "पते का प्रमाण",
          explanation: "उस आरटीओ के क्षेत्राधिकार को स्थापित करता है जहां आप आवेदन कर रहे हैं (जैसे, वोटर आईडी, राशन कार्ड, आधार कार्ड, बिजली बिल)।"
        },
        {
          name: "चिकित्सा प्रमाण पत्र (फॉर्म 1A)",
          explanation: "परिवहन वाहनों या 40 वर्ष से अधिक आयु के आवेदकों के लिए सुरक्षित रूप से गाड़ी चलाने के लिए शारीरिक फिटनेस प्रमाणित करने के लिए आवश्यक।"
        }
      ]
    },
    voter_id: {
      id: "voter_id",
      name: "वोटर आईडी कार्ड (मतदाता पंजीकरण)",
      category: "identity",
      description: "भारत निर्वाचन आयोग के साथ मतदाता के रूप में पंजीकरण करें। नागरिकों को राष्ट्रीय, राज्य और स्थानीय चुनावों में वोट डालने में सक्षम बनाने के लिए वोटर आईडी (EPIC कार्ड) जारी किया जाता है।",
      eligibility: "भारतीय नागरिक, जो पात्रता तिथि पर 18 वर्ष या उससे अधिक आयु का हो, और आमतौर पर निर्वाचन क्षेत्र का निवासी हो।",
      processingTime: "क्षेत्र सत्यापन सहित 30 से 45 दिन।",
      fees: "निःशुल्क।",
      steps: [
        "मतदाता सेवा पोर्टल (VSP) पर पंजीकरण करें या वोटर हेल्पलाइन ऐप डाउनलोड करें।",
        "नए पंजीकरण के लिए 'फॉर्म 6' भरें।",
        "हाल ही की एक पासपोर्ट आकार की रंगीन तस्वीर अपलोड करें।",
        "आयु प्रमाण और पता प्रमाण दस्तावेज अपलोड करें।",
        "फॉर्म जमा करें। एक बूथ स्तर का अधिकारी (BLO) आपके आवास पर जाकर भौतिक सत्यापन करेगा।",
        "स्वीकृति के बाद, आपकी ईपीआईसी (EPIC) संख्या उत्पन्न होगी और कार्ड डाक द्वारा भेजा जाएगा।"
      ],
      documents: [
        {
          name: "पासपोर्ट आकार की तस्वीर",
          explanation: "वोटर आईडी कार्ड और मतदाता सूची पर आपकी फोटो प्रिंट करने के लिए आवश्यक है।"
        },
        {
          name: "आयु का प्रमाण",
          explanation: "यह सत्यापित करता है कि आपकी आयु कम से कम 18 वर्ष है (जैसे, जन्म प्रमाण पत्र, कक्षा 10 की मार्कशीट, आधार कार्ड, पैन कार्ड)।"
        },
        {
          name: "सामान्य निवास का प्रमाण",
          explanation: "सत्यापित करता है कि आप उस निर्वाचन क्षेत्र में रहते हैं जहां आप पंजीकरण कर रहे हैं (जैसे, आधार कार्ड, बैंक पासबुक, गैस बिल, पानी का बिल)।"
        }
      ]
    },
    pension: {
      id: "pension",
      name: "राष्ट्रीय सामाजिक सहायता योजना (पेंशन)",
      category: "social",
      description: "इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन, विधवा पेंशन, या विकलांगता पेंशन सहित सरकारी सामाजिक कल्याण योजनाओं के तहत मासिक वित्तीय सहायता के लिए आवेदन करें।",
      eligibility: "60 वर्ष या उससे अधिक आयु (वृद्धावस्था पेंशन के लिए), विधवाएं, या विकलांग व्यक्ति जो गरीबी रेखा से नीचे (BPL) परिवार से संबंधित हैं।",
      processingTime: "30 से 60 दिन।",
      fees: "निःशुल्क।",
      steps: [
        "स्थानीय ब्लॉक विकास कार्यालय (BDO), ग्राम पंचायत या सामाजिक कल्याण पोर्टल से पेंशन आवेदन पत्र प्राप्त करें।",
        "व्यक्तिगत विवरण, आय विवरण और बैंक खाते की जानकारी भरें।",
        "पासपोर्ट आकार की फोटो और बीपीएल कार्ड की प्रति संलग्न करें।",
        "सत्यापन के लिए आवेदन ग्राम पंचायत या बीडीओ को जमा करें।",
        "एक सत्यापन अधिकारी आर्थिक और आयु की स्थिति की जांच करेगा।",
        "स्वीकृति के बाद, मासिक पेंशन सीधे लाभार्थी के बैंक खाते में जमा की जाती है।"
      ],
      documents: [
        {
          name: "बीपीएल प्रमाण पत्र / कार्ड",
          explanation: "महत्वपूर्ण प्रमाण कि आवेदक गरीबी रेखा से नीचे की श्रेणी में आता है, जो प्राथमिक पात्रता मानदंड है।"
        },
        {
          name: "आयु प्रमाण पत्र",
          explanation: "पुष्टि करता है कि आवेदक वृद्धावस्था पेंशन के लिए आयु सीमा (जैसे, 60 वर्ष या उससे अधिक) को पूरा करता है (जैसे, जन्म प्रमाण पत्र, मेडिकल बोर्ड प्रमाण पत्र)।"
        },
        {
          name: "बैंक खाते का विवरण (पासबुक की प्रति)",
          explanation: "बिना किसी बिचौलिए के पेंशन राशि के सीधे बैंक खाते में सुरक्षित अंतरण (DBT) की सुविधा के लिए आवश्यक।"
        }
      ]
    }
  },
  te: {
    aadhaar: {
      id: "aadhaar",
      name: "ఆధార్ కార్డు అప్‌డేట్ & నమోదు",
      category: "identity",
      description: "ఆధార్ అనేది UIDAI జారీ చేసే 12 అంకెల విశిష్ట గుర్తింపు సంఖ్య. ఈ సేవ పౌరులు కొత్త ఆధార్ కార్డు కోసం దరఖాస్తు చేసుకోవడానికి లేదా తమ వివరాలను (పేరు, చిరునామా, పుట్టిన తేదీ) మరియు బయోమెట్రిక్స్ అప్‌డేట్ చేసుకోవడానికి అనుమతిస్తుంది.",
      eligibility: "భారతదేశంలో నివసిస్తున్న ఎవరైనా (శిశువులు మరియు 182 రోజుల కంటే ఎక్కువ కాలం నివసించిన విదేశీయులతో సహా).",
      processingTime: "ధృవీకరణ ఆధారంగా 5 నుండి 90 రోజులు.",
      fees: "కొత్త నమోదు: ఉచితం. డెమోగ్రాఫిక్ అప్‌డేట్: ₹50. బయోమెట్రిక్ అప్‌డేట్: ₹100.",
      steps: [
        "అధికారిక ఆధార్ నమోదు కేంద్రాన్ని కనుగొనండి లేదా MyAadhaar పోర్టల్‌లో లాగిన్ అవ్వండి.",
        "ఆన్‌లైన్ అపాయింట్‌మెంట్ బుక్ చేసుకోండి లేదా అవసరమైన పత్రాలతో కేంద్రానికి వెళ్లండి.",
        "నమోదు/సవరణ ఫారమ్‌ను నింపండి.",
        "కేంద్రంలో బయోమెట్రిక్ వివరాలను (ఐరిస్ స్కాన్, వేలిముద్రలు మరియు ఫోటో) సమర్పించండి.",
        "గుర్తింపు గుర్తింపు పత్రం (POI) మరియు చిరునామా ధృవీకరణ పత్రం (POA) సమర్పించండి.",
        "స్థితిని ట్రాక్ చేయడానికి అప్‌డేట్ అభ్యర్థన సంఖ్య (URN) ఉన్న రశీదును తీసుకోండి."
      ],
      documents: [
        {
          name: "గుర్తింపు ధృవీకరణ పత్రం (POI)",
          explanation: "మీ చట్టపరమైన పేరు, సంతకం మరియు ఫోటోను ధృవీకరించడానికి అవసరం (ఉదా, పాస్‌పోర్ట్, పాన్ కార్డ్, ఓటర్ ఐడీ, లేదా డ్రైవింగ్ లైసెన్స్)."
        },
        {
          name: "చిరునామా ధృవీకరణ పత్రం (POA)",
          explanation: "మీ ఆధార్ కార్డు పంపబడే చిరునామాను ధృవీకరించడానికి అవసరం (ఉదా, విద్యుత్ బిల్లు, బ్యాంక్ స్టేట్‌మెంట్, నీటి బిల్లు, అద్దె ఒప్పందం)."
        },
        {
          name: "పుట్టిన తేదీ ధృవీకరణ పత్రం (DOB)",
          explanation: "వయస్సు మార్పులు ఉన్నప్పుడు పుట్టిన తేదీని ధృవీకరించడానికి అవసరం (ఉదా, పుట్టిన తేదీ పత్రం, పదో తరగతి సర్టిఫికేట్, పాస్‌పోర్ట్)."
        }
      ]
    },
    passport: {
      id: "passport",
      name: "భారతీయ పాస్‌పోర్ట్ (సాధారణ / తత్కాల్)",
      category: "travel",
      description: "విదేశీ ప్రయాణాల కోసం కొత్త పాస్‌పోర్ట్ లేదా రీ-ఇష్యూ కోసం దరఖాస్తు చేసుకోండి. అత్యవసర ప్రయాణ అవసరాల కోసం తత్కాల్ పథకం వేగవంతమైన ప్రాసెసింగ్‌ను అందిస్తుంది.",
      eligibility: "కనీసం 18 సంవత్సరాల వయస్సు కలిగిన భారతదేశంలో నివసిస్తున్న భారతీయ పౌరులు (మైనర్ పాస్‌పోర్ట్‌ల కోసం తల్లిదండ్రులు దరఖాస్తు చేయాలి).",
      processingTime: "సాధారణ: 15-30 రోజులు. తత్కాల్: 1-3 రోజులు.",
      fees: "సాధారణ (36 పేజీలు): ₹1,500. తత్కాల్: ₹3,500.",
      steps: [
        "అధికారిక పాస్‌పోర్ట్ సేవా ఆన్‌లైన్ పోర్టల్‌లో నమోదు చేసుకోండి.",
        "ఆన్‌లైన్ దరఖాస్తు ఫారమ్‌ను పూర్తి చేసి సమర్పించండి.",
        "ప్రాసెసింగ్ రుసుమును ఆన్‌లైన్‌లో చెల్లించి, సమీపంలోని పాస్‌పోర్ట్ సేవా కేంద్రం (PSK)లో అపాయింట్‌మెంట్ బుక్ చేసుకోండి.",
        "పత్రాల ధృవీకరణ, బయోమెట్రిక్ డేటా సేకరణ మరియు ఫోటో కోసం అసలు పత్రాలతో PSKని సందర్శించండి.",
        "మీ శాశ్వత చిరునామా వద్ద పోలీస్ వెరిఫికేషన్ చేయించుకోండి (అవసరమైతే).",
        "స్పీడ్ పోస్ట్ ద్వారా మీ పాస్‌పోర్ట్‌ను అందుకోండి."
      ],
      documents: [
        {
          name: "చిరునామా ధృవీకరణ పత్రం (POA)",
          explanation: "భద్రతా తనిఖీలు మరియు డెలివరీ కోసం ప్రస్తుత నివాస చిరునామాను ధృవీకరిస్తుంది (ఉదా, నీటి బిల్లు, టెలిఫోన్ బిల్లు, విద్యుత్ బిల్లు, ఆధార్ కార్డ్, అద్దె ఒప్పందం)."
        },
        {
          name: "పుట్టిన తేదీ ధృవీకరణ పత్రం (DOB)",
          explanation: "ట్రావెల్ డాక్యుమెంట్‌పై ముద్రించాల్సిన మీ పుట్టిన వివరాలను నిర్ధారిస్తుంది (ఉదా, పుట్టిన తేదీ పత్రం, పదో తరగతి సర్టిఫికేట్, పాన్ కార్డ్)."
        },
        {
          name: "నాన్-ECR కేటగిరీ రుజువు (Non-ECR)",
          explanation: "మీరు పదో తరగతి లేదా అంతకంటే ఎక్కువ చదివినట్లయితే వలస తనిఖీ అవసరాల నుండి మినహాయింపు కోసం అవసరం (ఉదా, పదో తరగతి సర్టిఫికేట్, డిగ్రీ సర్టిఫికేట్)."
        }
      ]
    },
    pan: {
      id: "pan",
      name: "శాశ్వత ఖాతా సంఖ్య (PAN Card)",
      category: "finance",
      description: "ఆదాయపు పన్ను శాఖ జారీ చేసే 10 అంకెల ఆల్ఫాన్యూమరిక్ గుర్తింపు సంఖ్య. ఆర్థిక లావాదేవీలు, బ్యాంక్ ఖాతాలు తెరవడం మరియు ఐటీ రిటర్న్స్ దాఖలు చేయడానికి ఇది చాలా అవసరం.",
      eligibility: "పన్ను చెల్లింపుదారులు లేదా పాన్ అవసరమైన ఏ వ్యక్తైనా, కంపెనీ లేదా సంస్థ అయినా (భారతీయ లేదా విదేశీ) అర్హులు.",
      processingTime: "ఈ-పాన్ (e-PAN): 10-15 నిమిషాలు. భౌతిక కార్డు: 7-15 పని దినాలు.",
      fees: "భౌతిక కార్డు: ₹107 (భారతదేశంలో). కేవలం ఈ-పాన్ మాత్రమే: ₹66.",
      steps: [
        "అధికారిక NSDL (Protean) లేదా UTITSL ఆన్‌లైన్ దరఖాస్తు పోర్టల్‌ను సందర్శించండి.",
        "ఫారమ్ 49A (భారతీయ పౌరుల కోసం) ఎంచుకుని, వ్యక్తిగత వివరాలను నింపండి.",
        "సమర్పించే విధానాన్ని ఎంచుకోండి: డిజిటల్ (ఆధార్ OTP ద్వారా e-KYC) లేదా భౌతిక విధానం.",
        "క్రెడిట్ కార్డ్, డెబిట్ కార్డ్ లేదా నెట్ బ్యాంకింగ్ ఉపయోగించి ఆన్‌లైన్ చెల్లింపు చేయండి.",
        "డిజిటల్ విధానం కోసం, ఆధార్ OTP ద్వారా వివరాలను ధృవీకరించండి. భౌతిక విధానం కోసం, సంతకం చేసిన దరఖాస్తు పత్రాన్ని పత్రాలతో పాటు NSDL కార్యాలయానికి పోస్ట్ ద్వారా పంపండి.",
        "15 అంకెల రశీదు సంఖ్యను ఉపయోగించి డెలివరీ స్థితిని ట్రాక్ చేయండి."
      ],
      documents: [
        {
          name: "ఆధార్ కార్డ్ (e-KYC)",
          explanation: "గుర్తింపు, చిరునామా మరియు పుట్టిన తేదీకి ఏకైక రుజువుగా పనిచేస్తుంది, తక్షణ డిజిటల్ ప్రాసెసింగ్‌ను సులభతరం చేస్తుంది."
        },
        {
          name: "గుర్తింపు ధృవీకరణ పత్రం (POI)",
          explanation: "ఆధార్ ఉపయోగించనప్పుడు మాత్రమే అవసరం (ఉదా, ఓటర్ ఐడీ, డ్రైవింగ్ లైసెన్స్, పాస్‌పోర్ట్)."
        },
        {
          name: "చిరునామా ధృవీకరణ పత్రం (POA)",
          explanation: "ఆధార్ ఉపయోగించనప్పుడు మాత్రమే అవసరం (ఉదా, కరెంట్ బిల్లు, బ్యాంక్ స్టేట్‌మెంట్)."
        }
      ]
    },
    driving_license: {
      id: "driving_license",
      name: "డ్రైవింగ్ లైసెన్స్ (లర్నర్ & పర్మనెంట్)",
      category: "certificates",
      description: "రోడ్లపై వాహనాలను నడపడానికి అధికారిక అనుమతి పత్రాన్ని పొందండి. మొదట, లర్నర్ లైసెన్స్ జారీ చేయబడుతుంది, ఆ తర్వాత శాశ్వత లైసెన్స్ కోసం డ్రైవింగ్ పరీక్ష ఉంటుంది.",
      eligibility: "గేర్ లేని వాహనాలకు (50cc వరకు) వయస్సు >= 16 సంవత్సరాలు; గేర్ ఉన్న వాహనాలకు వయస్సు >= 18 సంవత్సరాలు; రవాణా వాహనాలకు వయస్సు >= 20 సంవత్సరాలు.",
      processingTime: "లర్నర్ లైసెన్స్: 1 రోజు (ఆన్‌లైన్ పరీక్ష). పర్మనెంట్ లైసెన్స్: పరీక్ష పాసైన 7-14 రోజులలో జారీ అవుతుంది.",
      fees: "లర్నర్: ఒక్కో విభాగానికి ₹150. పర్మనెంట్ టెస్ట్ & జారీ: వాహన రకాన్ని బట్టి ₹700 - ₹1000.",
      steps: [
        "సారథి పరివాహన్ పోర్టల్‌లో ఆన్‌లైన్‌లో దరఖాస్తు చేసుకోండి.",
        "దరఖాస్తు వివరాలను పూరించి, వాహన రకాలను ఎంచుకోండి.",
        "అవసరమైన పత్రాలను మరియు వైద్య ధృవీకరణ పత్రాన్ని (ఫారమ్ 1A, వర్తిస్తే) అప్‌లోడ్ చేయండి.",
        "ఫీజు చెల్లించి, లర్నర్ పరీక్ష (ఆన్‌లైన్ లేదా RTO వద్ద) కోసం స్లాట్ బుక్ చేసుకోండి.",
        "లర్నర్ లైసెన్స్ పొందడానికి కంప్యూటర్ ఆధారిత పరీక్షలో పాస్ అవ్వండి.",
        "30 రోజుల తర్వాత (మరియు 6 నెలల లోపు), RTO వద్ద డ్రైవింగ్ పరీక్ష కోసం స్లాట్ బుక్ చేసుకోండి.",
        "శాశ్వత డ్రైవింగ్ లైసెన్స్ పొందడానికి డ్రైవింగ్ పరీక్షలో పాస్ అవ్వండి."
      ],
      documents: [
        {
          name: "వయస్సు ధృవీకరణ పత్రం",
          explanation: "డ్రైవింగ్ కోసం అవసరమైన కనీస వయస్సు మీకు ఉందని నిర్ధారిస్తుంది (ఉదా, పుట్టిన తేదీ పత్రం, స్కూల్ లీవింగ్ సర్టిఫికేట్, పాన్ కార్డ్, పాస్‌పోర్ట్)."
        },
        {
          name: "చిరునామా ధృవీకరణ పత్రం",
          explanation: "మీరు దరఖాస్తు చేస్తున్న RTO పరిధిని నిర్ధారిస్తుంది (ఉదా, ఓటర్ ఐడీ, రేషన్ కార్డ్, ఆధార్ కార్డ్, విద్యుత్ బిల్లు)."
        },
        {
          name: "వైద్య ధృవీకరణ పత్రం (ఫారమ్ 1A)",
          explanation: "రవాణా వాహనాలకు లేదా 40 సంవత్సరాల కంటే ఎక్కువ వయస్సు ఉన్న దరఖాస్తుదారులకు శారీరక దృఢత్వాన్ని ధృవీకరించడానికి అవసరం."
        }
      ]
    },
    voter_id: {
      id: "voter_id",
      name: "ఓటర్ ఐడీ కార్డ్ (ఓటరు నమోదు)",
      category: "identity",
      description: "భారత ఎన్నికల సంఘంలో ఓటరుగా నమోదు చేసుకోండి. జాతీయ, రాష్ట్ర మరియు స్థానిక ఎన్నికలలో ఓటు వేయడానికి పౌరులకు ఓటర్ ఐడీ (EPIC కార్డ్) జారీ చేయబడుతుంది.",
      eligibility: "భారతీయ పౌరుడై ఉండాలి, కనీసం 18 సంవత్సరాల వయస్సు నిండి ఉండాలి మరియు సంబంధిత నియోజకవర్గంలో నివాసి అయి ఉండాలి.",
      processingTime: "ఫీల్డ్ వెరిఫికేషన్‌తో కలిపి 30 నుండి 45 రోజులు.",
      fees: "ఉచితం.",
      steps: [
        "ఓటర్ సర్వీస్ పోర్టల్ (VSP) లో నమోదు చేసుకోండి లేదా ఓటర్ హెల్ప్‌లైన్ యాప్ డౌన్‌లోడ్ చేసుకోండి.",
        "కొత్త నమోదు కోసం 'ఫారమ్ 6' నింపండి.",
        "ఇటీవలి పాస్‌పోర్ట్ సైజు రంగు ఫోటోను అప్‌లోడ్ చేయండి.",
        "వయస్సు మరియు చిరునామా ధృవీకరణ పత్రాలను అప్‌లోడ్ చేయండి.",
        "దరఖాస్తును సమర్పించండి. బూత్ స్థాయి అధికారి (BLO) మీ నివాసానికి వచ్చి వెరిఫికేషన్ చేస్తారు.",
        "ఆమోదం పొందిన తర్వాత, మీ EPIC నంబర్ జనరేట్ చేయబడుతుంది మరియు కార్డు పోస్ట్ ద్వారా పంపబడుతుంది."
      ],
      documents: [
        {
          name: "పాస్‌పోర్ట్ సైజు ఫోటో",
          explanation: "ఓటర్ ఐడీ కార్డుపై మరియు ఓటర్ల జాబితాలో మీ ఫోటోను ముద్రించడానికి అవసరం."
        },
        {
          name: "వయస్సు ధృవీకరణ పత్రం",
          explanation: "మీకు కనీసం 18 సంవత్సరాల వయస్సు ఉందని ధృవీకరిస్తుంది (ఉదా, పుట్టిన తేదీ పత్రం, పదో తరగతి మార్కుల జాబితా, ఆధార్ కార్డ్, పాన్ కార్డ్)."
        },
        {
          name: "నివాస ధృవీకరణ పత్రం",
          explanation: "మీరు నమోదు చేసుకుంటున్న నియోజకవర్గంలో నివసిస్తున్నారని ధృవీకరిస్తుంది (ఉదా, ఆధార్ కార్డ్, బ్యాంక్ పాస్‌బుక్, గ్యాస్ బిల్లు, నీటి బిల్లు)."
        }
      ]
    },
    pension: {
      id: "pension",
      name: "జాతీయ సామాజిక సహాయ పథకం (పెన్షన్)",
      category: "social",
      description: "ఇందిరాగాంధీ జాతీయ వృద్ధాప్య పెన్షన్, వితంతు పెన్షన్ లేదా వికలాంగుల పెన్షన్ వంటి ప్రభుత్వ సామాజిక సంక్షేమ పథకాల కింద నెలవారీ ఆర్థిక సహాయం కోసం దరఖాస్తు చేసుకోండి.",
      eligibility: "60 సంవత్సరాలు లేదా అంతకంటే ఎక్కువ వయస్సు ఉన్నవారు (వృద్ధాప్య పెన్షన్ కోసం), వితంతువులు లేదా దారిద్య్ర రేఖకు దిగువన ఉన్న (BPL) కుటుంబానికి చెందిన వికలాంగులు.",
      processingTime: "30 నుండి 60 రోజులు.",
      fees: "ఉచితం.",
      steps: [
        "స్థానిక బ్లాక్ డెవలప్‌మెంట్ ఆఫీస్ (BDO), గ్రామ పంచాయితీ లేదా సామాజిక సంక్షేమ పోర్టల్ నుండి దరఖాస్తును పొందండి.",
        "వ్యక్తిగత వివరాలు, ఆదాయ వివరాలు మరియు బ్యాంక్ ఖాతా సమాచారాన్ని నింపండి.",
        "పాస్‌పోర్ట్ సైజు ఫోటో మరియు BPL కార్డు కాపీని జత చేయండి.",
        "ధృవీకరణ కోసం దరఖాస్తును గ్రామ పంచాయితీ లేదా BDO కార్యాలయంలో సమర్పించండి.",
        "ఒక వెరిఫికేషన్ ఆఫీసర్ మీ ఆర్థిక మరియు వయస్సు స్థితిని తనిఖీ చేస్తారు.",
        "ఆమోదించబడిన తర్వాత, నెలవారీ పెన్షన్ నేరుగా లబ్ధిదారుని బ్యాంక్ ఖాతాలో జమ చేయబడుతుంది."
      ],
      documents: [
        {
          name: "BPL సర్టిఫికేట్ / కార్డ్",
          explanation: "దరఖాస్తుదారు దారిద్య్ర రేఖకు దిగువన ఉన్నారని నిరూపించే అత్యంత కీలకమైన పత్రం, ఇది ప్రాథమిక అర్హత ప్రమాణం."
        },
        {
          name: "వయస్సు ధృవీకరణ పత్రం",
          explanation: "వృద్ధాప్య పెన్షన్ కోసం కనీస వయస్సు (60 సంవత్సరాలు) నిండిందని నిర్ధారిస్తుంది (ఉదా, పుట్టిన తేదీ పత్రం, మెడికల్ బోర్డ్ సర్టిఫికేట్)."
        },
        {
          name: "బ్యాంక్ ఖాతా వివరాలు (పాస్‌బుక్ కాపీ)",
          explanation: "ఎటువంటి మధ్యవర్తులు లేకుండా పెన్షన్ మొత్తం నేరుగా బ్యాంక్ ఖాతాకు (DBT ద్వారా) సురక్షితంగా బదిలీ కావడానికి అవసరం."
        }
      ]
    }
  }
};
