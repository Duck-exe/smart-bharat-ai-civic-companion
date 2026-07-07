import { NextResponse } from "next/server";

type Lang = "en" | "hi" | "te";

const responses: Record<Lang, Record<string, string>> = {
   en: {
      compare_pan_aadhaar: `### PAN Card vs Aadhaar Card: When is each required?

| Feature | PAN Card | Aadhaar Card |
|---|---|---|
| Main purpose | Tax and financial identity | Resident identity and address proof |
| Issued by | Income Tax Department | UIDAI |
| Used for | Income tax, bank accounts, investments, high-value transactions | Identity verification, address proof, subsidies, KYC |
| Mandatory for | ITR filing, bank KYC, credit cards, mutual funds, salary taxation | Aadhaar-based KYC, welfare schemes, address verification |
| Can replace the other? | No | No |

### When PAN is required
- Filing income tax returns.
- Opening bank accounts.
- Applying for credit cards or loans.
- Mutual funds, stocks, and high-value transactions.
- Business registration and GST-related financial compliance.

### When Aadhaar is required
- Identity and address verification.
- Updating address, mobile number, or demographic details.
- Government subsidy/welfare scheme verification.
- Aadhaar-based e-KYC.
- Passport, bank, telecom, and other verification processes.

### Best practical advice
Keep both updated. PAN is mainly for **financial/tax identity**, while Aadhaar is mainly for **identity/address verification and public-service access**.`,

      moved_city: `### Documents to update after moving to a new city

If you moved from one city to another, update documents in this order:

1. **Aadhaar Address**
   - Update first because many other services use Aadhaar as address proof.
   - Documents: rent agreement, electricity bill, bank statement, or other accepted address proof.
   - Portal: MyAadhaar.

2. **Bank KYC**
   - Update address with your bank after Aadhaar/address proof is ready.
   - Documents: Aadhaar, PAN, new address proof.

3. **Driving License**
   - Apply for address change through Sarathi Parivahan or local RTO.
   - Documents: existing DL, address proof, ID proof.

4. **Voter ID**
   - Shift voter registration to the new constituency using the Voters Service Portal.
   - Documents: photo, address proof, age/identity proof.

5. **Passport**
   - Update only if your passport address needs correction before travel or renewal.
   - Documents: current passport, address proof, supporting ID.

### Recommended order
Aadhaar → Bank KYC → Driving License → Voter ID → Passport if needed.`,

      passport: `### Indian Passport Application Guide

### Who needs this?
Citizens applying for a new passport, renewing an existing passport, or applying under Tatkaal.

### Types
- **Normal Passport:** Usually slower, lower fee.
- **Tatkaal Passport:** Faster processing, higher fee.

### Required documents
- Proof of identity: Aadhaar, PAN, Voter ID, or Driving License.
- Proof of address: Aadhaar, electricity bill, bank passbook, rent agreement, or utility bill.
- Proof of date of birth: Birth certificate, school certificate, PAN, or Aadhaar depending on case.
- Existing passport if renewing.

### Steps
1. Register on Passport Seva Portal.
2. Fill the online application.
3. Pay the fee.
4. Book Passport Seva Kendra appointment.
5. Visit with original documents.
6. Complete police verification if required.
7. Receive passport by post.

### Tips
- Make sure name, DOB, and address match across documents.
- Carry originals and photocopies.
- Use Tatkaal only when urgent.`,

      aadhaar: `### Aadhaar Card Enrollment and Update Guide

### Services available
- New Aadhaar enrollment.
- Address update.
- Mobile/email update.
- Name, DOB, gender correction.
- Biometric update.

### Documents
- Identity proof: Passport, PAN, Voter ID, Driving License.
- Address proof: Electricity bill, bank statement, rent agreement, water bill.
- DOB proof: Birth certificate, school certificate, passport.

### Steps
1. Visit MyAadhaar portal for online updates.
2. For biometric/mobile updates, visit Aadhaar Seva Kendra.
3. Submit documents.
4. Keep URN/SRN for tracking.

### Important
- New Aadhaar enrollment is free.
- Some updates may have service charges.
- Biometric updates require physical visit.`,

      pan: `### PAN Card Application Guide

### When PAN is required
- Income tax filing.
- Opening bank accounts.
- Salary and employer taxation.
- Loans, credit cards, mutual funds, stocks.
- High-value financial transactions.

### Documents required
- Identity proof: Aadhaar, passport, voter ID.
- Address proof: Aadhaar, bank statement, utility bill.
- DOB proof: Birth certificate, school certificate, passport.

### Steps
1. Visit Protean/NSDL or UTITSL portal.
2. Choose Form 49A for Indian citizens.
3. Complete Aadhaar e-KYC if available.
4. Pay fee.
5. Download e-PAN or wait for physical card.

### Tip
If Aadhaar OTP verification works, the process becomes faster and mostly paperless.`,

      license: `### Driving License Application Guide

### Stage 1: Learner License
- Eligibility: 18+ for light motor vehicles.
- Apply on Sarathi Parivahan.
- Upload age proof and address proof.
- Pass learner license test.

### Stage 2: Permanent License
- Apply after 30 days of learner license.
- Book driving test slot.
- Visit RTO with vehicle and documents.
- Pass driving test.

### Documents
- Aadhaar/PAN/passport for ID proof.
- Address proof.
- Age proof.
- Passport-size photo if required.

### Tips
- Practice traffic rules before learner test.
- Carry original documents to RTO.
- Track application on Sarathi portal.`,

      birth_certificate: `### Birth Certificate Guide

### Why it is needed
- School admission.
- Passport application.
- Aadhaar enrollment.
- Government records.
- Legal proof of age and identity.

### Required details
- Child name, date and place of birth.
- Parent names.
- Hospital record or birth report.
- Address proof of parents.

### How to apply
1. Visit local municipal corporation/Gram Panchayat portal.
2. Fill birth registration form.
3. Upload hospital birth record and parent documents.
4. Pay fee if applicable.
5. Download or collect certificate after approval.

### Tip
Apply as early as possible to avoid late-registration penalties or extra verification.`,

      income_certificate: `### Income Certificate Guide

### Used for
- Scholarships.
- Reservation benefits.
- Fee reimbursement.
- Welfare schemes.
- EWS/OBC-related applications.

### Documents
- Aadhaar.
- Address proof.
- Salary slip or income proof.
- Ration card if available.
- Self-declaration/affidavit if required.
- Passport-size photo.

### Steps
1. Apply through state e-District/MeeSeva/Seva Sindhu portal.
2. Upload documents.
3. Revenue officer verifies details.
4. Download certificate after approval.

### Tip
Income certificate rules differ by state, so use your state service portal.`,

      ration_card: `### Ration Card Guide

### Purpose
- Access subsidized food grains.
- Family identity document.
- Welfare scheme eligibility proof.

### Documents
- Aadhaar of family members.
- Address proof.
- Income proof if required.
- Passport-size photo.
- Existing ration card if transferring.

### Steps
1. Apply on your state food/civil supplies portal.
2. Add family member details.
3. Upload documents.
4. Verification by local authority.
5. Download/collect ration card.

### Tip
Ensure Aadhaar details match each family member correctly.`,

      complaint: `### How to Report a Public Issue

### Common issues
- Garbage pile-up.
- Potholes.
- Street light failure.
- Water leakage.
- Drainage overflow.
- Road damage.

### What to include
- Issue type.
- Exact location or landmark.
- Clear description.
- Date/time noticed.
- Photo if portal supports it.

### Good complaint example
"Large garbage pile has not been collected for 5 days near the main road. It is causing bad smell, attracting stray animals, and creating unsafe conditions for pedestrians."

### After submission
Save the complaint ID and use it to track progress.`,

      default: `### Smart Bharat AI Civic Assistant

I can help with Indian civic services such as:

- Aadhaar updates
- PAN card
- Passport
- Driving license
- Voter ID
- Birth certificate
- Income certificate
- Ration card
- Pension schemes
- PM Kisan / Ayushman Bharat / PMAY
- Public issue reporting
- Complaint tracking

### Try asking:
- Compare PAN and Aadhaar. When is each required?
- I moved to Bengaluru. Which documents should I update?
- What documents are required for a passport?
- How do I report garbage pile-up?
- How do I apply for an income certificate?`
   },

   hi: {
      default: `### स्मार्ट भारत एआई नागरिक साथी

मैं भारतीय नागरिक सेवाओं में मदद कर सकता हूँ:

- आधार अपडेट
- पैन कार्ड
- पासपोर्ट
- ड्राइविंग लाइसेंस
- वोटर आईडी
- जन्म प्रमाण पत्र
- आय प्रमाण पत्र
- राशन कार्ड
- पेंशन योजनाएं
- सरकारी योजनाएं
- सार्वजनिक शिकायत दर्ज करना

कृपया अपना सवाल स्पष्ट रूप से लिखें।`,
      passport: `### पासपोर्ट आवेदन गाइड

पासपोर्ट के लिए पहचान प्रमाण, पते का प्रमाण और जन्म तिथि प्रमाण आवश्यक होते हैं। Passport Seva Portal पर आवेदन करें, शुल्क भरें, अपॉइंटमेंट बुक करें और मूल दस्तावेज़ों के साथ Passport Seva Kendra जाएं।`,
      aadhaar: `### आधार अपडेट गाइड

आधार में पता, नाम, जन्म तिथि, मोबाइल और बायोमेट्रिक अपडेट किए जा सकते हैं। ऑनलाइन अपडेट के लिए MyAadhaar पोर्टल और बायोमेट्रिक/मोबाइल अपडेट के लिए आधार सेवा केंद्र जाएं।`,
      pan: `### पैन कार्ड गाइड

PAN कार्ड टैक्स, बैंकिंग, निवेश, क्रेडिट कार्ड, लोन और उच्च मूल्य वित्तीय लेनदेन के लिए आवश्यक है। आवेदन NSDL/Protean या UTITSL पोर्टल से किया जा सकता है।`,
      license: `### ड्राइविंग लाइसेंस गाइड

पहले Learner License के लिए Sarathi Parivahan पर आवेदन करें। टेस्ट पास करने के बाद 30 दिनों के बाद Permanent Driving License के लिए RTO टेस्ट स्लॉट बुक करें।`,
      scheme: `### सरकारी योजनाएं

आप PM-Kisan, Ayushman Bharat, PM Awas Yojana, Pension Schemes और अन्य योजनाओं के लिए पात्रता, दस्तावेज़ और आवेदन प्रक्रिया पूछ सकते हैं।`,
      compare_pan_aadhaar: `### PAN और Aadhaar में अंतर

- PAN मुख्य रूप से टैक्स और वित्तीय पहचान के लिए है।
- Aadhaar पहचान और पते के सत्यापन के लिए है।
- PAN बैंकिंग, ITR, निवेश और उच्च मूल्य लेनदेन में ज़रूरी है।
- Aadhaar KYC, सरकारी योजनाओं और address proof के लिए ज़रूरी है।

दोनों अलग-अलग कामों के लिए ज़रूरी हैं और एक दूसरे का पूरा विकल्प नहीं हैं।`,
      complaint: `### सार्वजनिक समस्या कैसे रिपोर्ट करें

समस्या का प्रकार, सही स्थान, landmark और clear description दें। शिकायत जमा करने के बाद complaint ID संभालकर रखें।`
   },

   te: {
      default: `### స్మార్ట్ భారత్ AI సివిక్ అసిస్టెంట్

నేను భారతీయ పౌర సేవల గురించి సహాయం చేయగలను:

- ఆధార్ అప్‌డేట్
- పాన్ కార్డ్
- పాస్‌పోర్ట్
- డ్రైవింగ్ లైసెన్స్
- ఓటర్ ఐడీ
- జనన సర్టిఫికేట్
- ఆదాయ సర్టిఫికేట్
- రేషన్ కార్డ్
- పెన్షన్ పథకాలు
- ప్రభుత్వ పథకాలు
- పబ్లిక్ సమస్య రిపోర్టింగ్

మీ ప్రశ్నను స్పష్టంగా టైప్ చేయండి.`,
      passport: `### పాస్‌పోర్ట్ దరఖాస్తు గైడ్

పాస్‌పోర్ట్ కోసం గుర్తింపు రుజువు, చిరునామా రుజువు, పుట్టిన తేదీ రుజువు అవసరం. Passport Seva Portal లో దరఖాస్తు చేసి, అపాయింట్మెంట్ బుక్ చేసి PSK కి ఒరిజినల్ పత్రాలతో వెళ్లాలి.`,
      aadhaar: `### ఆధార్ అప్‌డేట్ గైడ్

ఆధార్ లో పేరు, చిరునామా, పుట్టిన తేదీ, మొబైల్ మరియు బయోమెట్రిక్ వివరాలు అప్‌డేట్ చేయవచ్చు. చిరునామా అప్‌డేట్ కోసం MyAadhaar పోర్టల్ ఉపయోగించవచ్చు.`,
      pan: `### పాన్ కార్డ్ గైడ్

PAN కార్డ్ టాక్స్, బ్యాంకింగ్, పెట్టుబడులు, లోన్స్ మరియు ఫైనాన్షియల్ ట్రాన్సాక్షన్స్ కోసం అవసరం. NSDL/Protean లేదా UTITSL ద్వారా అప్లై చేయవచ్చు.`,
      license: `### డ్రైవింగ్ లైసెన్స్ గైడ్

మొదట Sarathi Parivahan ద్వారా Learner License కోసం అప్లై చేయాలి. తర్వాత RTO డ్రైవింగ్ టెస్ట్ పాస్ అయితే Permanent License వస్తుంది.`,
      scheme: `### ప్రభుత్వ పథకాలు

PM-Kisan, Ayushman Bharat, PMAY, Pension Schemes వంటి పథకాల eligibility, documents, application steps గురించి అడగవచ్చు.`,
      compare_pan_aadhaar: `### PAN మరియు Aadhaar తేడా

- PAN ప్రధానంగా tax మరియు financial identity కోసం.
- Aadhaar identity మరియు address verification కోసం.
- PAN banking, ITR, investments, loans కోసం అవసరం.
- Aadhaar KYC, welfare schemes, address proof కోసం అవసరం.

ఇవి రెండూ వేర్వేరు ప్రయోజనాల కోసం అవసరం.`,
      complaint: `### పబ్లిక్ సమస్యను ఎలా రిపోర్ట్ చేయాలి

సమస్య రకం, సరైన లొకేషన్, landmark మరియు పూర్తి description ఇవ్వండి. Submit చేసిన తర్వాత complaint ID సేవ్ చేసుకోండి.`
   }
};

function pickFallback(query: string, lang: Lang): string {
   const q = query.toLowerCase();

   if (
      (q.includes("compare") || q.includes("difference") || q.includes("vs")) &&
      (q.includes("pan") || q.includes("aadhaar") || q.includes("aadhar"))
   ) {
      return responses[lang].compare_pan_aadhaar || responses.en.compare_pan_aadhaar;
   }

   if (
      q.includes("moved") ||
      q.includes("married") ||
      q.includes("change address") ||
      q.includes("new city") ||
      q.includes("relocated") ||
      q.includes("bengaluru") ||
      q.includes("bangalore")
   ) {
      return responses.en.moved_city;
   }

   if (q.includes("passport") || q.includes("पासपोर्ट") || q.includes("పాస్‌పోర్ట్")) return responses[lang].passport;
   if (q.includes("aadhaar") || q.includes("aadhar") || q.includes("आधार") || q.includes("ఆధార్")) return responses[lang].aadhaar;
   if (q.includes("pan") || q.includes("पैन") || q.includes("పాన్")) return responses[lang].pan;
   if (q.includes("license") || q.includes("licence") || q.includes("driving") || q.includes("ड्राइविंग") || q.includes("లైసెన్స్")) return responses[lang].license;
   if (q.includes("birth")) return responses.en.birth_certificate;
   if (q.includes("income")) return responses.en.income_certificate;
   if (q.includes("ration")) return responses.en.ration_card;
   if (q.includes("garbage") || q.includes("pothole") || q.includes("streetlight") || q.includes("water leakage") || q.includes("complaint")) return responses[lang].complaint || responses.en.complaint;
   if (q.includes("scheme") || q.includes("yojana") || q.includes("pm kisan") || q.includes("ayushman") || q.includes("pension")) return responses[lang].scheme;

   return responses[lang].default;
}

function sanitizeInput(text: string): string {
   if (typeof text !== "string") return "";
   return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
   try {
      const { messages, lang = "en" } = await request.json();
      const safeLang: Lang = ["en", "hi", "te"].includes(lang) ? lang : "en";

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
         return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
      }

      // Limit messages list size to prevent excessive payload or loop exploits
      if (messages.length > 20) {
         return NextResponse.json({ error: "Too many messages in history" }, { status: 400 });
      }

      // Validate each message structure and content length
      for (const m of messages) {
         if (!m || typeof m !== "object") {
            return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
         }
         if (m.role !== "user" && m.role !== "assistant") {
            return NextResponse.json({ error: "Invalid message role" }, { status: 400 });
         }
         if (typeof m.content !== "string") {
            return NextResponse.json({ error: "Message content must be a string" }, { status: 400 });
         }
         // Limit length of messages to prevent API abuse and large payloads
         if (m.content.length > 1000) {
            return NextResponse.json({ error: "Message content exceeds limit of 1000 characters" }, { status: 400 });
         }
      }

      // Sanitize inputs
      const sanitizedMessages = messages.map((m: any) => ({
         role: m.role,
         content: sanitizeInput(m.content)
      }));

      const lastUserMessage = sanitizedMessages[sanitizedMessages.length - 1]?.content || "";
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
         return NextResponse.json({
            content: pickFallback(lastUserMessage, safeLang),
            demoMode: true
         });
      }

      const response = await fetch(
         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               contents: sanitizedMessages.map((m: any) => ({
                  role: m.role === "user" ? "user" : "model",
                  parts: [{ text: m.content }]
               })),
               systemInstruction: {
                  parts: [
                     {
                        text: `You are Smart Bharat - AI Civic Companion, a helpful assistant for Indian citizens.

Answer only about Indian civic services, public services, documents, government schemes, municipal complaints, and citizen support.

Use the requested language: ${safeLang}.
Keep answers clear, structured, practical, and citizen-friendly.

For every answer, include:
1. Short direct answer
2. Required documents if relevant
3. Steps to complete the process
4. Official portal or department if known
5. Important caution to verify final details on official government portals`
                     }
                  ]
               },
               generationConfig: {
                  temperature: 0.25,
                  maxOutputTokens: 1000
               }
            })
         }
      );

      if (!response.ok) {
         const fallback = pickFallback(lastUserMessage, safeLang);
         return NextResponse.json({
            content: `${fallback}\n\n*Note: Live Gemini response was unavailable, so Smart Bharat used its offline civic knowledge fallback.*`,
            demoMode: true
         });
      }

      const data = await response.json();

      console.log("Gemini Response:", JSON.stringify(data, null, 2));

      const replyText =
         data?.candidates?.[0]?.content?.parts
            ?.map((p: any) => p.text)
            .filter(Boolean)
            .join("\n") ||
         null;

      if (!replyText) {
         return NextResponse.json({
            content: pickFallback(lastUserMessage, safeLang),
            demoMode: true
         });
      }

      return NextResponse.json({
         content: replyText,
         demoMode: false
      });
   } catch (error: any) {
      console.error("Chat API error details omitted from response for security.");
      return NextResponse.json(
         { error: "Failed to process chat request. Please try again later." },
         { status: 500 }
      );
   }
}