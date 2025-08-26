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
        /* --- Global Styles --- */
        :root {
            --bg-color: #1b263b;
            --chat-bg-color: #1b263b1f;
            --border-color: rgba(255, 255, 255, 0.5);
            --user-bubble-bg: #2b6cb0;
            --ai-bubble-bg: #4a5568;
            --text-color: #e0e1dd;
            --warning-color: #ef4444;
            --border-radius-lg: 20px;
            --border-radius-sm: 5px;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        /* --- Chat Interface Layout --- */
        #chatBar {
            display: flex;
            flex-direction: column ;
            width: 100%;
            max-width: 55em; /* A good maximum width for desktop */
            height: 90vh; /* Takes up most of the viewport height */
            max-height: 50em; /* Prevents it from getting too tall */
            border: 2px solid var(--border-color);
            border-radius: var(--border-radius-lg);
            box-shadow: rgba(0, 0, 0, 0.56) 0px 10px 10px 4px;
            overflow: hidden; /* Important for the border-radius to work with inner elements */
        }

        h4.warning {
            color: var(--warning-color);
            font-weight: 500;
            text-align: center;
            padding: 0.5em 1em;
        }

        /* --- Chat Messages Container --- */
        #response {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            padding: 1em;
            overflow-y: auto;
            background-color: var(--chat-bg-color);
            border-bottom: 1px solid var(--border-color);
        }

        .responseAI, .responseUser {
            font-size: clamp(14px, 4vw, 18px); /* More appropriate clamp values for mobile/desktop */
            color: var(--text-color);
            margin-bottom: 1em;
            padding: 0.75em 1.25em;
            border-radius: var(--border-radius-lg);
            max-width: 80%; /* Adjusted max-width */
            word-wrap: break-word; /* Prevents long words from overflowing */
        }

        .responseAI {
            background-color: var(--ai-bubble-bg);
            align-self: flex-start;
            border-bottom-left-radius: var(--border-radius-sm);
        }

        .responseUser {
            background-color: var(--user-bubble-bg);
            align-self: flex-end;
            border-bottom-right-radius: var(--border-radius-sm);
        }
        
        /* Loading indicator styling for the AI response */
        .loading-indicator {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 1em;
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
            width: 10px;
            height: 10px;
            border-radius: 5px;
            background-color: #e0e1dd;
            color: #e0e1dd;
            animation: dot-flashing 1s infinite alternate;
        }
        .dot-flashing::before {
            left: -15px;
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
            0% { background-color: #e0e1dd; }
            50%, 100% { background-color: #555866; }
        }

        /* --- User Input Area --- */
        #userBox {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1em;
            background-color: var(--bg-color);
        }

        #userBox form {
            display: flex;
            width: 100%;
            gap: 1em;
        }

        #userBox input {
            flex-grow: 1;
            color: var(--text-color);
            padding: 1em;
            height: 3em;
            border: 1px solid var(--border-color);
            border-radius: 25px;
            background-color: #2d3748;
            outline: none; /* Removes the focus outline */
            transition: border-color 0.3s ease;
        }

        #userBox input:focus {
            border-color: var(--user-bubble-bg);
        }

        /* --- Button Styling --- */
        .button-54 {
            --button-bg: #2b70f0;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            font-size: 16px;
            text-transform: uppercase;
            color: var(--text-color);
            background-color: var(--button-bg);
            border: none;
            padding: 0.75em 1.5em;
            position: relative;
            user-select: none;
            cursor: pointer;
            border-radius: 25px;
            transition: background-color 0.3s ease, transform 0.1s ease, box-shadow 0.2s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            outline: none;
        }

        .button-54:hover {
            background-color: #245ea3;
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
        }

        .button-54:active {
            transform: translateY(2px);
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        /* --- Responsive adjustments with media queries --- */
        @media (max-width: 768px) {
            body {
                padding: 0.5em;
            }
            #chatBar {
                height: 95vh;
                max-height: 95vh;
                border-radius: 10px;
            }
            .responseAI, .responseUser {
                font-size: clamp(14px, 4.5vw, 16px);
            }
            #userBox {
                padding: 0.75em;
            }
            #userBox input, .button-54 {
                height: 2.5em;
                font-size: 14px;
                padding: 0.5em 1em;
            }
        }
        @media (max-width: 480px) {
            #userBox form {
                flex-direction: column;
                gap: 0.5em;
            }
            #userBox input {
                width: 100%;
            }
            .button-54 {
                width: 100%;
            }
        }
    </style>