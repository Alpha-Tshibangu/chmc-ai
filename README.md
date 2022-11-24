# Chisholm Medical Centre Artificial Intelligence Web Application

![logo](https://user-images.githubusercontent.com/107289998/203362314-7a5bae56-6b64-4438-86ce-0aebd281adf2.png)

## Extractive Question-Answering

This web application can answer questions about the things associated with the Chisholm Medical Centre. On the backend, the QA model extracts the answer from the context it's given. This is a variant of QA known as Extractive Question Answering. Click [here](https://huggingface.co/tasks/question-answering) to read more.

## Open Generative Question-Answering

My further ambitions for this web application include implementing an Open Generative QA model. This would see the model generate free text directly based on context, and enable longer more natural responses.

### Current Limitations:

1. Appointments booked with "Hey HotDoc" key-phrase must include:

   - Practitioner's first name. Currently these are:
     1. Eugene
     2. Karim
     3. Diaa
   - Appointment type

   Appointment types are currently limited to standard, long, afterhours, and physiotherapy.

2. Not that suitable for mobile (small-medium) screen sizes.

### Current Development Issues:

1. Firestore value error on requests.

   - ValueError: A document must have an even number of path elements

   This value error persists when requesting information a couple of times before it starts working. When it will error is still somewhat random but the suspicion is it does so because the code responsible for creating "documents" (database records)executes synchronously.

   **The current working fix is to wrap the firebase code in a try-finally block. But, that's not really a fix.**

2. "Hey HotDoc" key-phrase result displays weirdly on the webpage.

3. Ngrok is used in this application to expose services running on the local host at certain ports to be exposed to remote public servers so that they can be accessed via the internet. Currently the website can be accessed via the domain "beta.chmc.live". This domain points to a tcp ngrok address (masked forwarding) which points to a local host port (5500) where the webpage is being run. At the moment, the issue resides where, when exposing the python backend running on port 8000 (w/ FastAPI) via ngrok remote server tunneling, the application is inaccessible via the domain address, but can be accessed via the tcp address which is what the cnamed domain "app.chmc.server" points to.

### Recommended Features:

1. Voice activated requests and responses.

- Potential Text-to-Speech models:
  1. [Open AI Whisper](https://github.com/openai/whisper)
  2. [NVIDIA FastPitch](https://huggingface.co/nvidia/tts_en_fastpitch)
  3. [Meta FastSpeech 2](https://huggingface.co/facebook/fastspeech2-en-ljspeech)

2. Javascript have a speech rec API that could also potentially be of use.

### Version History

_26/11/2022_
Version: **Closed Beta Release Version 1**
