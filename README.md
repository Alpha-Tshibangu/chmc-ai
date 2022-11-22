**Chisholm Medical Centre Artificial Intelligence Web Application**

![logo](https://user-images.githubusercontent.com/107289998/203362314-7a5bae56-6b64-4438-86ce-0aebd281adf2.png)

# Open Generative Question-Answering (QA) AI

This web application can answer questions about the things associated with the Chisholm Medical Centre. On the backend, the QA model generates free text directly based on the context it's given. This is a variant of QA known as open generative QA. Click [here](https://huggingface.co/tasks/question-answering) to read more.

### Current Limitations:

1. Appointments booked with "Hey HotDoc" keyphrase must include:

   - Practitioner's first name
   - Appointment type (standard/long)

   Appointment types are currently limited to standard and long appointments.

### Current Development Issues:

1. CHMC Logo on index.html shifts left/right depending on screen-width.

2. Uncaught SyntaxError: Cannot use import statement outside a module (at index.mjs:1:1)

   - This reference error makes it difficult to use firebase/firestore in src/index.js (or mjs) which would otherwise allow data collection on user queries and server responses (as well as timestamps of course).
