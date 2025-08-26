<script setup lang="ts">
import SanaHealthWordComponent from '@/components/SanaHealthWordComponent.vue';
import { useToast } from 'vue-toastification'
import { ref, onMounted } from 'vue';

const response_user = ref("")
const messages = ref<{ user: string; content: string }[]>([]);
const userId = ref(""); // This will be dynamically set
const isLoading = ref(false); // New reactive property for the loading state

const toast = useToast();

// Function to generate a unique user ID and store it in localStorage
const generateUserId = (): string => {
    const storedId = localStorage.getItem('sana_user_id');
    if (storedId) {
        return storedId;
    }
    const newId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sana_user_id', newId);
    return newId;
};

// On component mount, generate or retrieve the user ID
onMounted(() => {
    userId.value = generateUserId();
    // Add the initial bot greeting
    messages.value.push({ user: 'Sana', content: "Hello, I'm Sana. How are you feeling today?" });
});

const handleSubmitResponse = async () => {
    const userMessage = response_user.value.trim();
    if (!userMessage) {
        toast.error("Please enter a message.");
        return;
    }

    // Immediately display the user's message
    messages.value.push({ user: 'You', content: userMessage });
    response_user.value = ""; // Clear the input field
    isLoading.value = true; // Set loading state to true

    try {
        const response_data = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ response: userMessage, userId: userId.value })
        });

        if (response_data.ok) {
            const data = await response_data.json();
            messages.value.push({ user: 'Sana', content: data.aiResponse });
            toast.success("Thank you for your response!");
        } else {
            const errorData = await response_data.json();
            console.error("Error with backend response: ", errorData);
            toast.error("Failed to get a response from the bot. Please try again.");
            // Re-add the user's message to the input field for easy re-submission
            response_user.value = userMessage;
        }

    } catch (err) {
        console.error("Error connecting to the server:", err);
        toast.error("Failed to connect to the server.");
        // Re-add the user's message to the input field
        response_user.value = userMessage;
    } finally {
        isLoading.value = false; // Set loading state back to false
    }
}
</script>

<template>
    <body>
        <SanaHealthWordComponent />
        <div id="chatBar">
            <h4 class="warning">
                This is not medical advice. Consult a doctor for any health concerns or emergencies.
            </h4>
            <div id="response">
                <div v-for="(message, index) in messages" :key="index" :class="{'responseUser': message.user === 'You', 'responseAI': message.user === 'Sana'}">
                    <h3>{{ message.content }}</h3>
                </div>
                 <!-- Loading indicator will appear here -->
                <div v-if="isLoading" class="loading-indicator">
                    <div class="dot-flashing"></div>
                </div>
            </div>
            <div id="userBox">
                <form @submit.prevent="handleSubmitResponse">
                    <input type="text"
                           placeholder="How are you feeling today?"
                           v-model="response_user"
                           class="text-user"
                           name="textUser"
                           id="textUser"
                           required>
                    <button class="button-54" role="button">Enter</button>
                </form>
            </div>
        </div>
    </body>
</template>

<style>
/* CSS is largely untouched, but a few key things to note: */
/* I've removed the direct h3 selectors in favor of more specific class-based styling */
/* The layout and responsive design are still handled by your original CSS */

* {
    background: #1b263b;
}

body {
    display: flex;
    flex: row wrap;
    justify-content: center;
}

#chatBar {
    display: flex;
    flex-flow: row wrap;
    width: 55em;
    height: 50em;
    border: 5px solid white;
    border-radius: 5%;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    margin-top: 2%;
    justify-content: center;
}

h4 {
    color: red;
    font-weight: 300;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-top: 1%;
}


/* Divs */

#chatBar>div {
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    height: 13%;
    align-items: center;
}


#chatBar>#response {
    height: 70%;
    display: flex;
    flex-flow: column wrap;
    align-self: flex-start;
    border: 1px solid white;
    background: #1b263b1f;
    overflow-y: auto; /* Added for scrollable chat history */
}

.responseAI, .responseUser {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 25px;
    color: white;
    margin: 2% 35% 2% 0%;
    font-size: 25px;
}

.responseUser {
    text-align: right;
    margin: 2% 0% 2% 50%;
}

/* Response */

#charBar #userBox {
    display: flex;
    flex-flow: row wrap;
    justify-items: center;
    height: 100%;
    border-radius: 50%;
    font-size: 100;
    width: 50%;
    border: 5px solid white;
}

#userBox input {
    text-align: center;
    color: white;
    width: 40em;
    height: 5em;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    margin: auto;
    padding: auto;
}

/* Button */
.button-54 {
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    letter-spacing: 2px;
    margin-top: 2%;
    text-decoration: none;
    text-transform: uppercase;
    color: #e0e1dd50;
    cursor: pointer;
    border: 3px solid #000000;
    padding: 0.25em 0.5em;
    box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.button-54:active {
    box-shadow: 0px 0px 0px 0px;
    top: 5px;
    left: 5px;
}

@media (min-width: 768px) {
    .button-54 {
        padding: 0.25em 0.75em;
    }
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5em;
}

.dot-flashing {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #e0e1dd;
  color: #e0e1dd;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}

.dot-flashing::before, .dot-flashing::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #e0e1dd;
  color: #e0e1dd;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #e0e1dd;
  color: #e0e1dd;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dot-flashing {
  0% {
    background-color: #e0e1dd;
  }
  50%,
  100% {
    background-color: #555866;
  }
}
</style>
