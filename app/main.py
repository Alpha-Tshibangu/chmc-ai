import pandas as pd
from fastapi import FastAPI
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

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
    table = pd.read_csv(r"C:\Users\shamm\price-model\assets\fees.csv")
    tqa = pipeline(task="table-question-answering", model="google/tapas-large-finetuned-wtq")
    return {"answer": tqa(table=table, query=q)['cells'][0]}

