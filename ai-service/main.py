from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import io
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

RISK_PATTERNS = {
    "excessive_penalty": ["penalty", "fine", "forfeit", "liquidated damages"],
    "unfair_termination": ["terminate immediately", "without notice", "no refund"],
    "hidden_fees": ["maintenance fee", "service charge", "processing fee", "non-refundable"],
    "discriminatory_clause": ["only vegetarians", "no students", "no pets allowed"],
    "unlimited_liability": ["liable for all", "unlimited liability", "full responsibility"],
    "privacy_violation": ["inspect anytime", "no prior notice", "landlord access"],
    "unfair_deposit": ["deposit forfeited", "no deposit return", "advance forfeited"],
}

def extract_text(file_bytes, filename):
    """Extract text from PDF or TXT file"""
    if filename.endswith('.pdf'):
        pdf_file = io.BytesIO(file_bytes)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    else:
        return file_bytes.decode('utf-8')

@app.post("/scan")
async def scan_contract(file: UploadFile = File(...)):
    content = await file.read()
    text = extract_text(content, file.filename)
    
    flagged = []
    total_risk = 0
    
    for category, keywords in RISK_PATTERNS.items():
        found_keywords = []
        for keyword in keywords:
            if keyword.lower() in text.lower():
                found_keywords.append(keyword)
        
        if found_keywords:
            severity = len(found_keywords) * 15
            total_risk += severity
            flagged.append({
                "category": category.replace("_", " ").title(),
                "keywords": found_keywords,
                "severity": min(severity, 100),
                "description": get_description(category)
            })
    
    risk_score = min(total_risk, 100)
    risk_level = "Low" if risk_score < 20 else "Medium" if risk_score < 50 else "High"
    
    return {
        "riskScore": risk_score,
        "riskLevel": risk_level,
        "totalClauses": len(text.split("\n")),
        "flaggedClauses": flagged,
        "summary": f"Found {len(flagged)} risky clause categories. Overall risk: {risk_level}"
    }

def get_description(category):
    descriptions = {
        "excessive_penalty": "Contract contains excessive penalty clauses",
        "unfair_termination": "Landlord can terminate without proper notice",
        "hidden_fees": "Additional fees not clearly disclosed upfront",
        "discriminatory_clause": "Contains potentially discriminatory restrictions",
        "unlimited_liability": "Places unlimited liability on tenant",
        "privacy_violation": "Allows landlord access without proper notice",
        "unfair_deposit": "Deposit terms may be unfair to tenant"
    }
    return descriptions.get(category, "Potentially risky clause")

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "contract-scanner"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)