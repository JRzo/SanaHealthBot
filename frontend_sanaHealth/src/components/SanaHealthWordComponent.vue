<script setup lang="ts"></script>

<template>
    <body>
    <div class="container">
    <div class="box">

        <div class="title">
            <span class="block"></span>
            <h1>Sana Health<span></span></h1>
        </div>

        <div class="role">
            <div class="block"></div>
            <p>Less waiting, more clarity.</p>
        </div>
        
        
    </div>

</div>

<!-- Robot -->

 <div class="cute-robot-v1">
    <div class="circle-bg">
        <div class="robot-ear left"></div>
        <div class="robot-head">
            <div class="robot-face">
                <div class="eyes left"></div>
                <div class="eyes right"></div>
                <div class="mouth"></div>
            </div>
        </div>
        <div class="robot-ear right"></div>
        <div class="robot-body"></div>
    </div>

    
</div>
    </body>
    

</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:300,400|Poppins:300,400,800&display=swap');

* {
  margin: 0;
  padding: 0;
}

body, html {
   overflow: hidden;
}

.container {
  width: 40%;
  height: 100vh;
  flex-flow: column wrap;
  display: flex;


  .box {
    width: 300px;
    height: 250px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .title {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      height: 50px;

      .block {
        width: 0%;
        height: inherit;
        background: #ffb510;
        position: absolute;
        animation: mainBlock 2s cubic-bezier(.74, .06, .4, .92) forwards;
        display: flex;
      }

      h1 {
        font-family: 'Poppins';
        color: #fff;
        font-size: 32px;
        -webkit-animation: mainFadeIn 2s forwards;
        -o-animation: mainFadeIn 2s forwards;
        animation: mainFadeIn 2s forwards;
        animation-delay: 1.6s;
        opacity: 0;
        display: flex;
        align-items: baseline;
        position: relative;

        span {
          width:0px;
          height: 0px;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;

          background: #ffb510;
          -webkit-animation: load 0.6s cubic-bezier(.74, .06, .4, .92) forwards;
          animation: popIn 0.8s cubic-bezier(.74, .06, .4, .92) forwards;
          animation-delay: 2s;
          margin-left: 5px;
          margin-top: -10px;
          position: absolute;
          bottom: 13px;
          right: -12px;

        }
      }
    }

    .role {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      height: 30px;
      margin-top: -10px;

      .block {
        width: 0%;
        height: inherit;
        background: #e91e63;
        position: absolute;
        animation: secBlock 2s cubic-bezier(.74, .06, .4, .92) forwards;
        animation-delay: 2s;
        display: flex;
      }

      p {
        animation: secFadeIn 2s forwards;
        animation-delay: 3.2s;
        opacity: 0;
         font-weight: 400;
        font-family: 'Lato';
        color: #ffffff;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 5px;
      }
    }
  }
}





@keyframes mainBlock {
  0% {
    width: 0%;
    left: 0;

  }
  50% {
    width: 100%;
    left: 0;

  }
  100% {
    width: 0;
    left: 100%;
  }
}

@keyframes secBlock {
  0% {
    width: 0%;
    left: 0;

  }
  50% {
    width: 100%;
    left: 0;

  }
  100% {
    width: 0;
    left: 100%;
  }
}

@keyframes mainFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}


@keyframes popIn {
  0% {
    width: 0px;
    height: 0px;
    background: #e9d856;
    border: 0px solid #ddd;
    opacity: 0;
  }
  50% {
    width: 10px;
    height: 10px;
    background: #e9d856;
    opacity: 1;
    bottom: 45px;
  }
   65% {
      width: 7px;
    height: 7px;
      bottom: 0px;
      width: 15px
   }
   80% {
      width: 10px;
    height: 10px;
      bottom: 20px
   }
  100% {
    width: 7px;
    height: 7px;
    background: #e9d856;
    border: 0px solid #222;
    bottom: 13px;

  }
}

@keyframes secFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.5;
  }
}




footer {
  width: 350px;
  height: 80px;
  background: #ffb510;
  position: absolute;
  right: 0;
  bottom: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
   animation: top 0.8s forwards;
   animation-delay: 4s;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #232323;
    font-family: 'Poppins';

    i {
      margin-right: 25px;
      font-size: 22px;
      color: #232323;
      animation: icon 2s forwards;
      animation-delay: 4s;
      opacity: 0;
    }
  }
}

@keyframes top {
  0% {
    opacity: 0;
     bottom: -80px
  }
  100% {
    opacity: 1;
     bottom: 0px

  }
}

@keyframes icon {
  0% {
    opacity: 0;
     transform: scale(0.0);
  }
   50% {
      opacity: 1;
     transform: scale(1.3) rotate(-02deg);
   }
  100% {
    opacity: 1;
     bottom: 0px;
  }
}

.example-text{
  display: flex;
  flex-flow: column wrap;
}



.cute-robot-v1 {
  height: 440px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cute-robot-v1 * {
  box-sizing: border-box;
}
.cute-robot-v1 .circle-bg {
  background: #cedbdd;
  width: 250px;
  height: 250px;
  border-radius: 100%;
  border: 8px solid #195272;
  position: relative;
}
.cute-robot-v1 .circle-bg:after {
  content: "";
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 100%;
  top: -3px;
  left: 0;
  border-radius: 100%;
  border-bottom: 10px solid #195272;
}
.cute-robot-v1 .circle-bg:hover .robot-face {
  top: 40px !important;
}
.cute-robot-v1 .circle-bg:hover .eyes {
  top: 30px !important;
}
.cute-robot-v1 .circle-bg:hover .mouth {
  background: #195272;
  border: none;
  clip-path: polygon(0% 30%, 100% 30%, 100% 100%, 0% 100%);
}
.cute-robot-v1 .circle-bg:hover .mouth:after {
  content: "";
  position: absolute;
  height: 80%;
  width: 80%;
  bottom: -30%;
  left: 50%;
  transform: translateX(-50%);
  background: #f9bbbb;
  border-radius: 100%;
}
.cute-robot-v1 .circle-bg .robot-head {
  height: 200px;
  width: 200px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -20px;
  border: 8px solid #195272;
  border-radius: 85px/60px;
  background: #ffffff;
  z-index: 4;
}
.cute-robot-v1 .circle-bg .robot-head:after {
  content: "";
  position: absolute;
  top: -30px;
  height: 30px;
  width: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: #195272;
}
.cute-robot-v1 .circle-bg .robot-head:before {
  content: "";
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-0%);
  height: 20px;
  width: 20px;
  background: #cedbdd;
  border: 8px solid #195272;
  border-radius: 100%;
}
.cute-robot-v1 .circle-bg .robot-head .robot-face {
  height: 120px;
  width: 160px;
  background: #cedbdd;
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid #195272;
  transition: all 200ms;
  border-radius: 45px;
}
.cute-robot-v1 .circle-bg .robot-head .robot-face .eyes {
  height: 20px;
  width: 20px;
  background: #195272;
  border-radius: 100%;
  position: absolute;
  transition: all 200ms;
  top: 40px;
}
.cute-robot-v1 .circle-bg .robot-head .robot-face .eyes.left {
  left: 30px;
}
.cute-robot-v1 .circle-bg .robot-head .robot-face .eyes.right {
  right: 30px;
}
.cute-robot-v1 .circle-bg .robot-head .robot-face .mouth {
  height: 40px;
  width: 45px;
  border-radius: 100%;
  border: 8px solid transparent;
  border-bottom-color: #195272;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50px;
  overflow: hidden;
}
.cute-robot-v1 .circle-bg .robot-ear {
  position: absolute;
  height: 100px;
  width: 100px;
  border-radius: 100%;
  background: #ffffff;
  border: 8px solid #195272;
  z-index: 3;
  top: 30px;
}
.cute-robot-v1 .circle-bg .robot-ear.left {
  left: -20px;
}
.cute-robot-v1 .circle-bg .robot-ear.right {
  right: -20px;
}
.cute-robot-v1 .circle-bg .robot-body {
  height: 50px;
  width: 100
}

</style>