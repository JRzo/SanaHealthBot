<script setup lang="ts">
import SanaHealthWordComponent from '@/components/SanaHealthWordComponent.vue';
</script>

<template>
    <body>
        <SanaHealthWordComponent/>
        <div id="chatBar">
                        <h4 class="warning">
                This is not medical advice. Consult a doctor for any health concerns or emergencies.
            </h4>
            <div id="response">
            </div>
            <div id="userBox">
                 <form action="" method="POST">
                    <input type="text"
                    placeholder="Hello, I'm Sana. How are you feeling today?"
                    class="text-user"
                    name="textUser"
                    id="textUser"
                    required
                    >
                    
                </form>
                <!-- HTML !-->
                <button class="button-54" role="button">Enter</button>


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
    border: 4px solid white;
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
    height: 45%;
    align-items: center;

}

/* Response */
#response{
    background: #1b263b1f;
    border: 5px solid white;
}

#charBar #userBox{
    display: flex;
    flex-flow: row wrap;
    justify-items: center;
    height: 100%;
    font-size: 100;
    width: 50%;
}

#userBox input{
    text-align: center;
    color: white;
    width:40em;
    height: 5em;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
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