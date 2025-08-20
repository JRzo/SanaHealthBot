<script setup lang="ts">
import SanaHealthWordComponent from '@/components/SanaHealthWordComponent.vue';
import {useToast} from 'vue-toastification'
import {ref } from 'vue';
import ResponseComponent from '@/components/ResponseComponent.vue';

const response_user = ref("")

const toast = useToast();

const handleSubmitResponse = async () =>{


    try{
        const response_data = await fetch("http://localhost:5000/api/chat", {
            method: "POST", 
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({response: response_user.value})
        });

        if(response_data.ok){
            // Successfully received a 2xx response
            const data = await response_data.json(); // Correctly parse the JSON body
            toast.success("Thank you!");
            console.log(data);
            console.log(response_user)

            
        } else {
            // Received a non-2xx response (e.g., 404, 500)
            const errorData = await response_data.json(); // Still parse the JSON for error details
            console.error("Error with response: ", errorData);
            toast.error("Failed to submit.");
        }
    }
    catch(err) {
        console.log(err);
        toast.error("Failed to connect to the server."); 
    }

    finally{
        response_user.value = ""
    }
}


</script>

<template>
    <body>
        <SanaHealthWordComponent/>
        <div id="chatBar">
                        <h4 class="warning">
                This is not medical advice. Consult a doctor for any health concerns or emergencies.
            </h4>
            <div id="response">
                <!-- Response start -->
                 <ResponseComponent />
                <!-- Response end -->
            </div>
            <div id="userBox">
                 <form ref="form_Response" @submit.prevent="handleSubmitResponse">
                    <input type="text"
                    placeholder="Hello, I'm Sana. How are you feeling today?"
                    v-model="response_user"
                    class="text-user"
                    name="textUser"
                    id="textUser"
                    required
                    >
                    <button class="button-54" role="button">Enter</button>
                </form>
                <!-- HTML !-->


            </div>

        </div>

        
    </body>
</template>


<style>


*{
    background:#1b263b;
}
body{
    display: flex;
    flex: row wrap;
    justify-content: center;
}
#chatBar{
    display: flex;
    flex-flow: row wrap;
    width: 55em;
    height:  50em;
    border: 5px solid white;
    border-radius: 5%;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    margin-top: 2%;
    justify-content: center;
}

h4{
    color: red;
    font-weight: 300;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-top: 1%;
}


/* Divs */

#chatBar > div{
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    height: 13%;
    align-items: center;
}


#chatBar > #response{
    height: 70%;
}
/* Response */
#response{
    background: #1b263b1f;
    border: 0.1px solid white;
}

#charBar #userBox{
    display: flex;
    flex-flow: row wrap;
    justify-items: center;
    height: 100%;
    border-radius: 50%;
    font-size: 100;
    width: 50%;
    border: 5px solid white;
}

#userBox input{
    text-align: center;
    color: white;
    width:40em;
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

</style>