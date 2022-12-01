# Chisholm Medical Centre Artificial Intelligence Web Application

![logo](https://user-images.githubusercontent.com/107289998/203362314-7a5bae56-6b64-4438-86ce-0aebd281adf2.png)

## Extractive Question-Answering

This web application can answer questions about the things associated with the Chisholm Medical Centre. On the backend, the QA model extracts the answer from the context it's given. This is a variant of QA known as Extractive Question Answering. Click [here](https://huggingface.co/tasks/question-answering) to read more.

## Open Generative Question-Answering

My further ambitions for this web application include implementing an Open Generative QA model. This would see the model generate free text directly based on context (This task is also known as Reading Comprehension), and enable longer more natural responses.

## Knowledge Base (Context)

The model derives it's answers from a provided context (which can be found in this repo). It's evident that the more structured the knowledge base, the better the model performs (high quality answers to questions). Work must be done to determine how the knowledge base can be best structured and develop a method where this can be done objectively. 

1. Potential Models:
   - [DrQA](https://github.com/facebookresearch/DrQA)
     * DrQA is a system for reading comprehension applied to open-domain question answering.

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

### Recommended Features:

1. Voice activated requests and responses.

- Potential Text-to-Speech models:
  1. [Open AI Whisper](https://github.com/openai/whisper)
  2. [NVIDIA FastPitch](https://huggingface.co/nvidia/tts_en_fastpitch)
  3. [Meta FastSpeech 2](https://huggingface.co/facebook/fastspeech2-en-ljspeech)

2. Javascript have a speech rec API that could also potentially be of use.

### Version History

_26/11/2022_
**Closed Beta Version 1**
