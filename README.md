# Chisholm Medical Centre Artificial Intelligence Web Application

![logo](https://user-images.githubusercontent.com/107289998/203362314-7a5bae56-6b64-4438-86ce-0aebd281adf2.png)

## Open Generative Question-Answering (QA) AI

This web application can answer questions about the things associated with the Chisholm Medical Centre. On the backend, the QA model generates free text directly based on the context it's given. This is a variant of QA known as open generative QA. Click [here](https://huggingface.co/tasks/question-answering) to read more.

### Current Limitations:

1. Appointments booked with "Hey HotDoc" keyphrase must include:

   - Practitioner's first name. Currently these are:
     1. Eugene
     2. Karim
     3. Diaa
   - Appointment type

   Appointment types are currently limited to standard, long, afterhours, and physiotherapy.

### Current Development Issues:

1. Firestore value error on requests.

   - ValueError: A document must have an even number of path elements

   This value error pesists when requesting information a couple of times before it starts working. When it will error is still somewhat random but the suspicion is it does so because the code responsible for creating "documents" (database records)executes synchronously.

2. "Hey HotDoc" keyphrase result dispays weirdly on the webpage.

### Recommended Features:

1. Voice activated requests and responses.

- Potential Text-to-Speech models:
  1. [Open AI Whisper](https://github.com/openai/whisper)
  2. [NVIDIA FastPitch](https://huggingface.co/nvidia/tts_en_fastpitch)
  3. [Meta FastSpeech 2](https://huggingface.co/facebook/fastspeech2-en-ljspeech)

2. Javascript have a speech rec library that could also potentially be of use.
