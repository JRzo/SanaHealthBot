<script setup lang="ts"></script>

<template>
    <section>
        <div class="login">
            <h2>Login</h2>
            <form action="/login" method="POST">
                <label for="email"> Email</label>
                <input type="email" id="email" name="email" required>
                <label for="password">Password</label>
                <input type="password" name="password" id="password">
                <input type="button" value="Enter">
            </form>
        </div>
        <div class="signup">
            <h2>Sign Up</h2>
            <form action="/signup" method="POST">
                <label for="email">Email</label>
                <input type="email" name="emailPassword" id="emailPassword">
                <label for="confirmEmail">Confirm Email</label>
                <input type="email" name="emailPassword" id="emailPassword">
                <label for="signPassword">Password</label>
                <input type="password" name="signPassword" id="signPassword">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword">
                <input type="button" value="Enter">
            </form>
        </div>
    </section>
    
</template>

<style scoped>

section{
    display: flex;
    width: 85em;
    height: 50em;
    border: 1px solid white;
}

section > div{
    display: flex;
    width: 50%;
    border: 1px solid;
    background: #333446;
    flex-flow: column wrap;
    align-items: center;
}

section > div > form{
    display: flex;
    margin-top: 5%;
    flex-flow: column wrap;
    font-size: 20px;
    text-align: center;
}

form > label{
    margin-top: 2%;
}

form > input{
    height: 2em;
    width: 20em;
    margin-top: 2%;
}
</style>