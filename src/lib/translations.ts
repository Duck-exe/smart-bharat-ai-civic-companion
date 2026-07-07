export type Language = "en" | "hi" | "te";

export interface TranslationSet {
  title: string;
  subtitle: string;
  nav: {
    dashboard: string;
    aiAssistant: string;
    serviceFinder: string;
    reportIssue: string;
    trackComplaint: string;
    documentAssistant: string;
  };
  dashboard: {
    welcome: string;
    desc: string;
    viewAll: string;
    quickStats: string;
    activeReports: string;
    servicesIndexed: string;
    assistantQueries: string;
    helpDescription: string;
  };
  aiAssistant: {
    welcomeChat: string;
    chatPlaceholder: string;
    send: string;
    clear: string;
    suggestions: string[];
    disclaimer: string;
    demoNotice: string;
    suggestedLabel: string;
  };
  serviceFinder: {
    searchPlaceholder: string;
    allCategories: string;
    processingTime: string;
    fees: string;
    steps: string;
    documents: string;
    eligibility: string;
    applyNow: string;
    categoryLabels: {
      identity: string;
      travel: string;
      finance: string;
      utility: string;
      certificates: string;
      social: string;
    };
  };
  documentAssistant: {
    title: string;
    desc: string;
    selectLabel: string;
    placeholder: string;
    checklistTitle: string;
    whyRequired: string;
  };
  reportIssue: {
    title: string;
    desc: string;
    typeLabel: string;
    selectType: string;
    locationLabel: string;
    locationPlaceholder: string;
    descLabel: string;
    descPlaceholder: string;
    submitBtn: string;
    successTitle: string;
    successText: string;
    complaintIdLabel: string;
    copyBtn: string;
    copiedText: string;
    issueTypes: {
      pothole: string;
      garbage: string;
      water_leakage: string;
      street_light: string;
      road_damage: string;
      drainage: string;
    };
  };
  trackComplaint: {
    title: string;
    desc: string;
    inputPlaceholder: string;
    trackBtn: string;
    notFound: string;
    statusLabel: string;
    reportedOn: string;
    historyLabel: string;
    complaintDetails: string;
    statusList: {
      submitted: string;
      under_review: string;
      dispatched: string;
      resolved: string;
    };
  };
  common: {
    loading: string;
    home: string;
    back: string;
  };
}

export const translations: Record<Language, TranslationSet> = {
  en: {
    title: "Smart Bharat",
    subtitle: "AI Civic Companion",
    nav: {
      dashboard: "Dashboard",
      aiAssistant: "AI Civic Assistant",
      serviceFinder: "Service Finder",
      reportIssue: "Report Public Issue",
      trackComplaint: "Track Complaint",
      documentAssistant: "Document Checklist",
    },
    dashboard: {
      welcome: "Welcome to Smart Bharat",
      desc: "Your unified digital gateway to government schemes, document checklists, instant AI assistance, and hassle-free public issue reporting.",
      viewAll: "Open Feature",
      quickStats: "Portal Quick Activity",
      activeReports: "Public Complaints Filed",
      servicesIndexed: "Government Services Available",
      assistantQueries: "AI Interactions Handled",
      helpDescription: "Select one of the modules below to get started or ask the AI assistant directly for guidance on any public service."
    },
    aiAssistant: {
      welcomeChat: "Namaste! I am your AI Civic Companion. Ask me anything about Indian government schemes, passports, driving licenses, taxes, or civic procedures.",
      chatPlaceholder: "e.g., How can I apply for a Tatkaal Passport? or What is the PM Kisan scheme?",
      send: "Send Query",
      clear: "Clear Chat",
      suggestedLabel: "Suggested Queries:",
      suggestions: [
        "How do I update my address in Aadhaar card?",
        "What are the documents needed for a driving license?",
        "How to apply for a senior citizen pension?",
        "What is the processing time for a new PAN card?"
      ],
      disclaimer: "Disclaimer: This is an AI assistant providing informational guidance. Please refer to official portals for formal requests.",
      demoNotice: "Running in smart demo mode. Gemini API key is not configured, providing localized contextual responses."
    },
    serviceFinder: {
      searchPlaceholder: "Search services (e.g., Aadhaar, License, Voter ID)...",
      allCategories: "All Categories",
      processingTime: "Processing Time",
      fees: "Estimated Fees",
      steps: "Application Steps",
      documents: "Required Documents",
      eligibility: "Eligibility Criteria",
      applyNow: "Official Portal Information",
      categoryLabels: {
        identity: "Identity & Citizenship",
        travel: "Travel & Passport",
        finance: "Tax & Finance",
        utility: "Utilities & Registry",
        certificates: "Certificates & Licenses",
        social: "Social Welfare & Pensions"
      }
    },
    documentAssistant: {
      title: "Document Requirement Assistant",
      desc: "Select a government service to generate a complete checklist of required documents and understand exactly why each one is necessary.",
      selectLabel: "Choose Government Service",
      placeholder: "-- Select a Service --",
      checklistTitle: "Required Document Checklist",
      whyRequired: "Why is this required?"
    },
    reportIssue: {
      title: "Report a Public Issue",
      desc: "Report local infrastructure issues like potholes, street lights, or garbage directly to civic authorities. Your report will be saved locally and given a tracking ID.",
      typeLabel: "Issue Type",
      selectType: "Select issue type...",
      locationLabel: "Location / Landmark",
      locationPlaceholder: "Enter location details (e.g., Sector 4, near Central Library)",
      descLabel: "Description",
      descPlaceholder: "Provide details of the issue (e.g., deep pothole causing traffic slowdown)",
      submitBtn: "Submit Complaint",
      successTitle: "Complaint Filed Successfully!",
      successText: "Thank you for being a responsible citizen. Your complaint has been recorded locally.",
      complaintIdLabel: "Your Complaint ID:",
      copyBtn: "Copy ID",
      copiedText: "Copied!",
      issueTypes: {
        pothole: "Pothole / Road Damage",
        garbage: "Garbage Pile-up",
        water_leakage: "Water Leakage",
        street_light: "Broken Street Light",
        road_damage: "Road Blockage / Damage",
        drainage: "Overflowing Drainage"
      }
    },
    trackComplaint: {
      title: "Complaint Tracker",
      desc: "Track the status of your reported civic issues. Enter your unique Complaint ID below to check active progress.",
      inputPlaceholder: "Enter Complaint ID (e.g., SB-123456)",
      trackBtn: "Track Status",
      notFound: "No complaint found with this ID. Please make sure you entered it correctly.",
      statusLabel: "Current Status",
      reportedOn: "Reported On",
      historyLabel: "Status Timeline",
      complaintDetails: "Complaint Details",
      statusList: {
        submitted: "Submitted Successfully",
        under_review: "Under Review by Ward Officer",
        dispatched: "Field Team Dispatched",
        resolved: "Resolved & Closed"
      }
    },
    common: {
      loading: "Loading...",
      home: "Home Dashboard",
      back: "Back"
    }
  },
  hi: {
    title: "स्मार्ट भारत",
    subtitle: "एआई नागरिक साथी",
    nav: {
      dashboard: "डैशबोर्ड",
      aiAssistant: "एआई नागरिक सहायक",
      serviceFinder: "सेवा खोजक",
      reportIssue: "सार्वजनिक समस्या दर्ज करें",
      trackComplaint: "शिकायत ट्रैक करें",
      documentAssistant: "दस्तावेज़ चेकलिस्ट",
    },
    dashboard: {
      welcome: "स्मार्ट भारत में आपका स्वागत है",
      desc: "सरकारी योजनाओं, दस्तावेज़ों की चेकलिस्ट, त्वरित एआई सहायता और परेशानी मुक्त सार्वजनिक समस्याओं की रिपोर्टिंग के लिए आपका एकीकृत डिजिटल प्रवेश द्वार।",
      viewAll: "सुविधा खोलें",
      quickStats: "पोर्टल की त्वरित गतिविधियां",
      activeReports: "दर्ज की गई सार्वजनिक शिकायतें",
      servicesIndexed: "उपलब्ध सरकारी सेवाएं",
      assistantQueries: "एआई द्वारा हल किए गए प्रश्न",
      helpDescription: "शुरू करने के लिए नीचे दिए गए मॉड्यूल में से किसी एक को चुनें या किसी भी सार्वजनिक सेवा पर मार्गदर्शन के लिए सीधे एआई सहायक से पूछें।"
    },
    aiAssistant: {
      welcomeChat: "नमस्ते! मैं आपका एआई नागरिक साथी हूँ। मुझसे भारतीय सरकारी योजनाओं, पासपोर्ट, ड्राइविंग लाइसेंस, कर या नागरिक प्रक्रियाओं के बारे में कुछ भी पूछें।",
      chatPlaceholder: "जैसे, मैं तत्काल पासपोर्ट के लिए कैसे आवेदन कर सकता हूँ? या पीएम किसान योजना क्या है?",
      send: "प्रश्न भेजें",
      clear: "चैट साफ़ करें",
      suggestedLabel: "सुझाए गए प्रश्न:",
      suggestions: [
        "आधार कार्ड में पता कैसे बदलें?",
        "ड्राइविंग लाइसेंस के लिए किन दस्तावेज़ों की आवश्यकता है?",
        "वरिष्ठ नागरिक पेंशन के लिए आवेदन कैसे करें?",
        "नए पैन कार्ड के लिए कितना समय लगता है?"
      ],
      disclaimer: "अस्वीकरण: यह केवल सूचनात्मक मार्गदर्शन प्रदान करने वाला एआई सहायक है। औपचारिक अनुरोधों के लिए कृपया आधिकारिक पोर्टलों पर जाएँ।",
      demoNotice: "स्मार्ट डेमो मोड में चल रहा है। जेमिनी एपीआई की (API Key) कॉन्फ़िगर नहीं है, स्थानीय संदर्भ के आधार पर जवाब दिए जा रहे हैं।"
    },
    serviceFinder: {
      searchPlaceholder: "सेवा खोजें (जैसे, आधार, लाइसेंस, वोटर आईडी)...",
      allCategories: "सभी श्रेणियां",
      processingTime: "प्रसंस्करण समय",
      fees: "अनुमानित शुल्क",
      steps: "आवेदन के चरण",
      documents: "आवश्यक दस्तावेज़",
      eligibility: "पात्रता मापदंड",
      applyNow: "आधिकारिक पोर्टल की जानकारी",
      categoryLabels: {
        identity: "पहचान और नागरिकता",
        travel: "यात्रा और पासपोर्ट",
        finance: "कर और वित्त",
        utility: "उपयोगिताएं और रजिस्ट्री",
        certificates: "प्रमाण पत्र और लाइसेंस",
        social: "सामाजिक कल्याण और पेंशन"
      }
    },
    documentAssistant: {
      title: "दस्तावेज़ आवश्यकता सहायक",
      desc: "आवश्यक दस्तावेज़ों की पूरी चेकलिस्ट बनाने के लिए एक सरकारी सेवा चुनें और समझें कि प्रत्येक दस्तावेज़ क्यों आवश्यक है।",
      selectLabel: "सरकारी सेवा चुनें",
      placeholder: "-- एक सेवा चुनें --",
      checklistTitle: "आवश्यक दस्तावेज़ चेकलिस्ट",
      whyRequired: "यह क्यों आवश्यक है?"
    },
    reportIssue: {
      title: "सार्वजनिक समस्या की रिपोर्ट करें",
      desc: "गड्ठे, स्ट्रीट लाइट या कचरे जैसी स्थानीय बुनियादी ढांचे की समस्याओं की रिपोर्ट सीधे नागरिक अधिकारियों को करें। आपकी रिपोर्ट स्थानीय रूप से सहेजी जाएगी और एक ट्रैकिंग आईडी दी जाएगी।",
      typeLabel: "समस्या का प्रकार",
      selectType: "समस्या का प्रकार चुनें...",
      locationLabel: "स्थान / लैंडमार्क",
      locationPlaceholder: "स्थान का विवरण दर्ज करें (जैसे, सेक्टर 4, सेंट्रल लाइब्रेरी के पास)",
      descLabel: "विवरण",
      descPlaceholder: "समस्या का विवरण प्रदान करें (जैसे, यातायात को धीमा करने वाला गहरा गड्ढा)",
      submitBtn: "शिकायत दर्ज करें",
      successTitle: "शिकायत सफलतापूर्वक दर्ज की गई!",
      successText: "एक जिम्मेदार नागरिक बनने के लिए धन्यवाद। आपकी शिकायत स्थानीय स्तर पर दर्ज कर ली गई है।",
      complaintIdLabel: "आपकी शिकायत आईडी (ID):",
      copyBtn: "आईडी कॉपी करें",
      copiedText: "कॉपी हो गया!",
      issueTypes: {
        pothole: "सड़क का गड्ढा / क्षति",
        garbage: "कचरे का ढेर",
        water_leakage: "पानी का रिसाव",
        street_light: "टूटी हुई स्ट्रीट लाइट",
        road_damage: "सड़क अवरोध / क्षति",
        drainage: "उफनती हुई नाली"
      }
    },
    trackComplaint: {
      title: "शिकायत ट्रैकर",
      desc: "अपनी रिपोर्ट की गई नागरिक समस्याओं की स्थिति को ट्रैक करें। सक्रिय प्रगति की जांच करने के लिए नीचे अपनी अनूठी शिकायत आईडी दर्ज करें।",
      inputPlaceholder: "शिकायत आईडी दर्ज करें (जैसे, SB-123456)",
      trackBtn: "स्थिति ट्रैक करें",
      notFound: "इस आईडी के साथ कोई शिकायत नहीं मिली। कृपया सुनिश्चित करें कि आपने इसे सही ढंग से दर्ज किया है।",
      statusLabel: "वर्तमान स्थिति",
      reportedOn: "रिपोर्ट करने की तिथि",
      historyLabel: "स्थिति समयरेखा",
      complaintDetails: "शिकायत का विवरण",
      statusList: {
        submitted: "सफलतापूर्वक सबमिट किया गया",
        under_review: "वार्ड अधिकारी द्वारा समीक्षा की जा रही है",
        dispatched: "फील्ड टीम को भेजा गया",
        resolved: "समाधान और बंद"
      }
    },
    common: {
      loading: "लोड हो रहा है...",
      home: "मुख्य डैशबोर्ड",
      back: "पीछे"
    }
  },
  te: {
    title: "స్మార్ట్ భారత్",
    subtitle: "AI సివిక్ సహాయకుడు",
    nav: {
      dashboard: "డ్యాష్‌బోర్డ్",
      aiAssistant: "AI సివిక్ అసిస్టెంట్",
      serviceFinder: "సేవా అన్వేషణ",
      reportIssue: "సమస్యను నివేదించండి",
      trackComplaint: "ఫిర్యాదు ట్రాకింగ్",
      documentAssistant: "పత్రాల చెక్‌లిస్ట్",
    },
    dashboard: {
      welcome: "స్మార్ట్ భారత్‌కు స్వాగతం",
      desc: "ప్రభుత్వ పథకాలు, డాక్యుమెంట్ల చెక్‌లిస్ట్‌లు, తక్షణ AI సహాయం మరియు ఇబ్బంది లేని ప్రజా సమస్యల నివేదికల కోసం మీ ఏకీకృత డిజిటల్ పోర్టల్.",
      viewAll: "ఫీచర్‌ను తెరువు",
      quickStats: "పోర్టల్ శీఘ్ర కార్యాచరణ",
      activeReports: "నమోదైన ప్రజా ఫిర్యాదులు",
      servicesIndexed: "అందుబాటులో ఉన్న ప్రభుత్వ సేవలు",
      assistantQueries: "AI పరిష్కరించిన ప్రశ్నలు",
      helpDescription: "ప్రారంభించడానికి దిగువ ఉన్న మాడ్యూళ్లలో ఒకదాన్ని ఎంచుకోండి లేదా ఏదైనా ప్రజా సేవపై మార్గదర్శకత్వం కోసం నేరుగా AI అసిస్టెంట్‌ని అడగండి."
    },
    aiAssistant: {
      welcomeChat: "నమస్తే! నేను మీ AI సివిక్ సహాయకుడిని. భారత ప్రభుత్వ పథకాలు, పాస్‌పోర్ట్‌లు, డ్రైవింగ్ లైసెన్స్‌లు, పన్నులు లేదా పౌర విధానాల గురించి నన్ను ఏదైనా అడగండి.",
      chatPlaceholder: "ఉదాహరణకు, తత్కాల్ పాస్‌పోర్ట్ కోసం నేను ఎలా దరఖాస్తు చేయాలి? లేదా పీఎం కిసాన్ పథకం అంటే ఏమిటి?",
      send: "ప్రశ్న పంపు",
      clear: "చాట్ క్లియర్ చేయి",
      suggestedLabel: "సూచించబడిన ప్రశ్నలు:",
      suggestions: [
        "ఆధార్ కార్డులో చిరునామాను ఎలా అప్‌డేట్ చేయాలి?",
        "డ్రైవింగ్ లైసెన్స్ కోసం ఏ పత్రాలు అవసరం?",
        "సీనియర్ సిటిజన్ పెన్షన్ కోసం ఎలా దరఖాస్తు చేయాలి?",
        "కొత్త పాన్ కార్డ్ కోసం ఎంత సమయం పడుతుంది?"
      ],
      disclaimer: "గమనిక: ఇది సమాచార మార్గదర్శకత్వాన్ని అందించే ఒక AI సహాయకుడు మాత్రమే. అధికారిక దరఖాస్తుల కోసం దయచేసి ప్రభుత్వ వెబ్‌సైట్‌లను సందర్శించండి.",
      demoNotice: "స్మార్ట్ డెమో మోడ్‌లో నడుస్తోంది. జెమిని API కీ కాన్ఫిగర్ చేయబడలేదు, స్థానిక సందర్భ ఆధారిత సమాధానాలు అందించబడుతున్నాయి."
    },
    serviceFinder: {
      searchPlaceholder: "సేవల కోసం వెతకండి (ఉదా, ఆధార్, లైసెన్స్, ఓటర్ ఐడీ)...",
      allCategories: "అన్ని విభాగాలు",
      processingTime: "పట్టే సమయం",
      fees: "అంచనా రుసుము",
      steps: "దరఖాస్తు దశలు",
      documents: "అవసరమైన పత్రాలు",
      eligibility: "అర్హత ప్రమాణాలు",
      applyNow: "అధికారిక పోర్టల్ సమాచారం",
      categoryLabels: {
        identity: "గుర్తింపు & పౌరసత్వం",
        travel: "ప్రయాణం & పాస్‌పోర్ట్",
        finance: "పన్ను & ఆర్థికం",
        utility: "ఉపయోగాలు & రిజిస్ట్రీ",
        certificates: "ధృవీకరణ పత్రాలు & లైసెన్స్‌లు",
        social: "సాంఘిక సంక్షేమం & పెన్షన్లు"
      }
    },
    documentAssistant: {
      title: "పత్రాల అవసరాల సహాయకుడు",
      desc: "అవసరమైన పత్రాల పూర్తి చెక్‌లిస్ట్‌ను పొందడానికి మరియు ప్రతి పత్రం ఎందుకు అవసరమో అర్థం చేసుకోవడానికి ఒక ప్రభుత్వ సేవను ఎంచుకోండి.",
      selectLabel: "ప్రభుత్వ సేవను ఎంచుకోండి",
      placeholder: "-- సేవను ఎంచుకోండి --",
      checklistTitle: "అవసరమైన పత్రాల చెక్‌లిస్ట్",
      whyRequired: "ఇది ఎందుకు అవసరం?"
    },
    reportIssue: {
      title: "ప్రజా సమస్యను నివేదించండి",
      desc: "రోడ్లపై గుంతలు, వీధి దీపాలు వెలగకపోవడం లేదా చెత్త పేరుకుపోవడం వంటి స్థానిక మౌలిక సదుపాయాల సమస్యలను నేరుగా అధికారులకు నివేదించండి. మీ నివేదిక స్థానికంగా సేవ్ చేయబడుతుంది మరియు ట్రాకింగ్ ఐడీ ఇవ్వబడుతుంది.",
      typeLabel: "సమస్య రకం",
      selectType: "సమస్య రకాన్ని ఎంచుకోండి...",
      locationLabel: "ప్రదేశం / ల్యాండ్‌మార్క్",
      locationPlaceholder: "ప్రదేశం వివరాలు నమోదు చేయండి (ఉదా, సెక్టార్ 4, సెంట్రల్ లైబ్రరీ దగ్గర)",
      descLabel: "వివరణ",
      descPlaceholder: "సమస్య వివరాలను అందించండి (ఉదా, ట్రాఫిక్‌కు ఆటంకం కలిగిస్తున్న పెద్ద గుంత)",
      submitBtn: "ఫిర్యాదు సమర్పించు",
      successTitle: "ఫిర్యాదు విజయవంతంగా నమోదైంది!",
      successText: "బాధ్యతాయుతమైన పౌరుడిగా ఉన్నందుకు ధన్యవాదాలు. మీ ఫిర్యాదు స్థానికంగా రికార్డ్ చేయబడింది.",
      complaintIdLabel: "మీ ఫిర్యాదు ఐడీ (ID):",
      copyBtn: "ఐడీ కాపీ చేయి",
      copiedText: "కాపీ చేయబడింది!",
      issueTypes: {
        pothole: "రోడ్డు గుంత / దెబ్బతినడం",
        garbage: "చెత్త పేరుకుపోవడం",
        water_leakage: "నీటి లీకేజీ",
        street_light: "పాడైపోయిన వీధి దీపం",
        road_damage: "రోడ్డు మూసివేత / నష్టం",
        drainage: "కాలువ పొంగిపారడం"
      }
    },
    trackComplaint: {
      title: "ఫిర్యాదు ట్రాకర్",
      desc: "మీరు నివేదించిన పౌర సమస్యల స్థితిని ట్రాక్ చేయండి. పురోగతిని తనిఖీ చేయడానికి దిగువన మీ ప్రత్యేక ఫిర్యాదు ఐడీని నమోదు చేయండి.",
      inputPlaceholder: "ఫిర్యాదు ఐడీని నమోదు చేయండి (ఉదా, SB-123456)",
      trackBtn: "స్థితిని ట్రాక్ చేయి",
      notFound: "ఈ ఐడీతో ఎటువంటి ఫిర్యాదు కనుగొనబడలేదు. దయచేసి సరిగ్గా నమోదు చేశారని నిర్ధారించుకోండి.",
      statusLabel: "ప్రస్తుత స్థితి",
      reportedOn: "నివేదించిన తేదీ",
      historyLabel: "స్థితి కాలక్రమం",
      complaintDetails: "ఫిర్యాదు వివరాలు",
      statusList: {
        submitted: "విజయవంతంగా సమర్పించబడింది",
        under_review: "వార్డు అధికారి పరిశీలనలో ఉంది",
        dispatched: "ఫీల్డ్ బృందం పంపబడింది",
        resolved: "పరిష్కరించబడింది & మూసివేయబడింది"
      }
    },
    common: {
      loading: "లోడ్ అవుతోంది...",
      home: "ప్రధాన డ్యాష్‌బోర్డ్",
      back: "వెనుకకు"
    }
  }
};
