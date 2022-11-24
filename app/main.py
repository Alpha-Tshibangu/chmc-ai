import pandas as pd
from timefhuman import timefhuman
import moment
from fastapi import FastAPI
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline
from firebase_admin import credentials
from firebase_admin import firestore
import firebase_admin
from datetime import datetime
import random

cred = credentials.Certificate('./chmc-ai-369416-20a9bfad00fe.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()


def docId():
    lower = "abcdefghijklmnopqrstuvwxyz"
    upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    numbers = "0123456789"
    symbols = "@#$&_-()=%*:/!?+."


    string = lower + upper + numbers + symbols
    length = 20
    id = "".join(random.sample(string, length))
    return id

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/price")
def price(q:str):
    table = pd.read_csv("../assets/fees.csv")
    tqa = pipeline(task="table-question-answering", model="google/tapas-large-finetuned-wtq")
    return {"answer": tqa(table=table, query=q)['cells'][0]}

@app.get("/query")
def query(q:str):
    model_name = "deepset/roberta-base-squad2"
    context = open("../assets/context.txt", "r").read()
    nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)
    QA_input = {
    'question': q,
    'context': context
    }
    res = nlp(QA_input)
    model = AutoModelForQuestionAnswering.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
# Firebase ---
    try:
        doc_ref = db.collection(u'user-queries').document(u"{}".format(docId()))
        doc_ref.set({
        u'query': u'{}'.format(q),
        u'response': u'{}'.format(res["answer"]),
        u'timestamp': u'{}'.format(datetime.now())
        })
    finally:
        return res

@app.get("/hd")
def appointments(query):
    reasons = {
    "standard": 78264,
    "long": 78501,
    "afterhours": 95541,
    "skin check": 78538,
    "workers compensation (initial)": 78532,
    "physiotherapy": 113448,
    "physiotherapy (initial) epc": 113448,
    "physiotherapy (initial) referred no epc": 78541,
    "physiotherapy (initial) private or self-referred": 113445,
    "dietitian (initial) private no epc": 115322,
    "dietitian (initial) EPC": 115327,
    "heart health check": 78539,
    "covid-19 vaccine dose 1 pfizer": 90374,
    "covid-19 vaccine dose 2 pfizer": 90375,
    "covid-19 vaccine dose 3 pfizer": 90376,
    "covid-19 vaccine dose 4 pfizer": 106756,
    "private flu vaccination": 78529,
    "government flu vaccination": 99898,
    "cervical screening test (pap)": 78533,
    "actewagl injury management initial": 99736,
    "actewagl injury management follow-up": 99737,
    "depot injection": 103683,
    "prolia injection": 103684
    }

    hd = {
    "for": "you",
    "history": "first-visit",
    "reason": reasons,
    "timezone": "Australia Sydney",
    }

    doctors = {
    "dr eugene tshibangu": 106141, 
    "dr karim ahmed": 117697,
    "dr diaa attallah": 137023
    }

    lquery = query.lower()
    tok_query = lquery.split(" ")

    def drName(tok_query):
        for token in tok_query:
            if token == 'eugene':
                return token 
            elif token == "karim":
                return token
            elif token == "diaa":
                return token
            else:
                ""

    name = drName(tok_query)

    def apptReason(tok_query):
        for token in tok_query:
            for reason in reasons:
                if token == reason:
                    return reason
                else:
                    ""

    reason = apptReason(tok_query)

    doctor_found = ([value for key, value in doctors.items() if name in key.lower()])
    reason_found = ([value for key, value in reasons.items() if reason in key.lower()])

    for a in doctor_found:
        doctorNum = a

    for b in reason_found:
        reasonFound = b

    dateTime = f"{timefhuman(query)}"

    date = dateTime.split("-")
    year = int(date[0])
    month = int(date[1])
    day = int(date[2].split(" ")[0])
    time = dateTime.split(" ")[1]
    hour = int(time.split(":")[0])
    minute = int(time.split(":")[1])

    dateTime = f"{moment.date(year, month, day, hour, minute, 0).subtract(hours=11)}"
    adjustedDateTime = dateTime.split("+")[0] + ".000Z"

    def url(whoFor, history, reason, doctor, when):
        url = f"https://www.hotdoc.com.au/medical-centres/book/appointment/authenticate?clinic=6848&doctor={doctor}&for={whoFor}&history={history}&reason={reason}&timezone=Australia%2FSydney&when={when}"
        return {"link": url, "doctor": drName(tok_query), "type": apptReason(tok_query)}
# Firebase ---
    try:
        doc_ref = db.collection(u'user-appointments').document(u"{}".format(docId()))
        doc_ref.set({
        u'query': u'{}'.format(query),
        u'response': u'{}'.format(url(hd["for"], hd["history"], reasonFound, doctorNum, adjustedDateTime)),
        u'appointment-time': u'{}'.format(adjustedDateTime),
        u'timestamp': u'{}'.format(datetime.now())
        })
    finally:
        return url(hd["for"], hd["history"], reasonFound, doctorNum, adjustedDateTime)
