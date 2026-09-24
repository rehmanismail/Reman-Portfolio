import os
from email.message import EmailMessage
import aiosmtplib
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL", SMTP_USER)

# Vite's dev server runs on 5173 by default (not 3000, which is CRA's default).
# Supports a comma-separated list so you can allow multiple origins at once,
# e.g. CORS_ORIGIN=http://localhost:5173,https://your-deployed-site.com
CORS_ORIGIN = os.getenv("CORS_ORIGIN", "http://localhost:5173")
CORS_ORIGINS = [origin.strip() for origin in CORS_ORIGIN.split(",") if origin.strip()]

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=150)
    message: str = Field(..., min_length=10, max_length=5000)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Backend is running"}

@app.post("/api/contact", status_code=status.HTTP_200_OK)
async def handle_contact_form(payload: ContactRequest):
    if not SMTP_USER or not SMTP_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="SMTP credentials are not configured on the server.",
        )

    msg = EmailMessage()
    msg["From"] = SMTP_USER
    msg["To"] = RECEIVER_EMAIL
    msg["Reply-To"] = payload.email
    msg["Subject"] = f"Portfolio Inquiry: {payload.subject}"

    body_text = f"""
New message received from your portfolio contact form:

Name: {payload.name}
Email: {payload.email}
Subject: {payload.subject}

Message:
{payload.message}
"""
    msg.set_content(body_text)

    try:
        await aiosmtplib.send(
            msg,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            start_tls=True,
            username=SMTP_USER,
            password=SMTP_PASSWORD,
        )
        return {"success": True, "message": "Message sent successfully!"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to dispatch email: {str(e)}",
        )
