<script context="module">
  import _ from 'lodash';
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const container = document.getElementById('container');
    const pointer = document.getElementById('pointer');
    const wheel = document.getElementById('wheel');

    function keepIn(radius: number, x: number, y: number) {
      if (wheel !== null) {
        const cx = wheel.offsetLeft + radius;
        const cy = wheel.offsetTop + radius;
        const h = y - cy;
        const w = x - cx;
        const distance = Math.sqrt(h * h + w * w);
        if (distance >= radius) {
          const k = h / w;
          const b = cy - k * cx;
          const l = Math.sqrt((radius * radius) / (k * k + 1));
          const rx = w > 0 ? l + cx : -l + cx;
          const ry = k * rx + b;
          return [rx - 10, ry - 10];
        }
      }
      return [x - 10, y - 10];
    }

    function updatePointerPos(container: HTMLElement, pointer: HTMLElement, e: MouseEvent) {
      const pp = container.getBoundingClientRect();
      const mxPos = e.clientX - pp.left;
      const myPos = e.clientY - pp.top;
      const [xPos, yPos] = keepIn(150, mxPos, myPos);
      // console.log(`(${xPos},${yPos})`);
      pointer.style.left = `${xPos}px`;
      pointer.style.top = `${yPos}px`;
    }

    function wrapperAny() {
      let isMoving = false;
      let needRecover = false;
      if (container !== null && pointer !== null) {
        const movePointer = _.debounce((e: MouseEvent) => {
          if (isMoving) {
            console.log('body', 'mousemove', 'triggered');
            updatePointerPos(container, pointer, e);
          }
        });
        const releaseLeftKey = () => {
          console.log('body', 'mouseup', 'triggered');
          isMoving = false;
          needRecover = false;
          document.body.removeEventListener('mouseup', releaseLeftKey);
          document.body.removeEventListener('mousemove', movePointer);
        };
        container.addEventListener('mousedown', () => {
          console.log('container', 'mousedown', 'triggered');
          isMoving = true;
        });
        container.addEventListener('mouseup', (e) => {
          console.log('container', 'mouseup', 'triggered');
          isMoving = false;
          updatePointerPos(container, pointer, e);
        });
        container.addEventListener('mouseleave', () => {
          console.log('container', 'mouseleave', 'triggered');
          if (isMoving) {
            needRecover = true;
            document.body.addEventListener('mouseup', releaseLeftKey);
            document.body.addEventListener('mousemove', movePointer);
          }
        });
        container.addEventListener('mouseenter', () => {
          console.log('container', 'mouseenter', 'triggered');
          if (isMoving && needRecover) {
            needRecover = false;
            document.body.removeEventListener('mousemove', movePointer);
            container.dispatchEvent(new MouseEvent('mousedown'));
          }
        });
        container.addEventListener('mousemove', movePointer);
      }
    }
    wrapperAny();

    console.log('the component has mounted');
  });
</script>

<svelte:head>
  <title>测试</title>
  <meta name="description" content="Simple Newtab developed by Lin Cufoon" />
</svelte:head>

<div class="container">
  <div
    style="margin: 50px 0 0 50px;width: 500px; height: 500px;box-sizing: border-box; position: relative; border:1px solid black"
  >
    <div
      id="wheel"
      style="width: 300px; height: 300px; position: absolute; top: 100px; left: 100px"
      class="wheel"
    />
    <div id="pointer" style="position: absolute; top: 240px; left: 240px" class="wheel-point" />
    <div id="container" style="position: absolute; top: 0; left: 0; width:100%; height:100%" />
  </div>
</div>

<style lang="scss">
  @keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }

  .container {
    width: 100vw;
    height: 100vh;
    border: 0;
    box-sizing: border-box;
    overflow: hidden;
    background-color: rgb(240, 240, 240);
    transition: 0.88s cubic-bezier(0.32, 0.05, 0.06, 0.98) 0.08s;
  }

  .wheel {
    cursor: pointer;
    border-radius: 100%;
    background: radial-gradient(
        circle at 50% 0,
        red,
        rgba(242, 13, 13, 0.8) 10%,
        rgba(230, 26, 26, 0.6) 20%,
        rgba(204, 51, 51, 0.4) 30%,
        rgba(166, 89, 89, 0.2) 40%,
        hsla(0, 0%, 50%, 0) 50%
      ),
      radial-gradient(
        circle at 85.35533905932738% 14.644660940672622%,
        #ffbf00,
        rgba(242, 185, 13, 0.8) 10%,
        rgba(230, 179, 26, 0.6) 20%,
        rgba(204, 166, 51, 0.4) 30%,
        rgba(166, 147, 89, 0.2) 40%,
        hsla(45, 0%, 50%, 0) 50%
      ),
      radial-gradient(
        circle at 100% 50%,
        #80ff00,
        rgba(128, 242, 13, 0.8) 10%,
        rgba(128, 230, 26, 0.6) 20%,
        rgba(128, 204, 51, 0.4) 30%,
        rgba(128, 166, 89, 0.2) 40%,
        hsla(90, 0%, 50%, 0) 50%
      ),
      radial-gradient(
        circle at 85.35533905932738% 85.35533905932738%,
        #00ff40,
        rgba(13, 242, 70, 0.8) 10%,
        rgba(26, 230, 77, 0.6) 20%,
        rgba(51, 204, 89, 0.4) 30%,
        rgba(89, 166, 108, 0.2) 40%,
        hsla(135, 0%, 50%, 0) 50%
      ),
      radial-gradient(
        circle at 50.00000000000001% 100%,
        #0ff,
        rgba(13, 242, 242, 0.8) 10%,
        rgba(26, 230, 230, 0.6) 20%,
        rgba(51, 204, 204, 0.4) 30%,
        rgba(89, 166, 166, 0.2) 40%,
        hsla(180, 0%, 50%, 0) 50%
      ),
      radial-gradient(
        circle at 14.64466094067263% 85.35533905932738%,
        #0040ff,
        rgba(13, 70, 242, 0.8) 10%,
        rgba(26, 77, 230, 0.6) 20%,
        rgba(51, 89, 204, 0.4) 30%,
        rgba(89, 108, 166, 0.2) 40%,
        hsla(225, 0%, 50%, 0) 50%
      ),
      radial-gradient(
        circle at 0 50.00000000000001%,
        #7f00ff,
        rgba(128, 13, 242, 0.8) 10%,
        rgba(128, 26, 230, 0.6) 20%,
        rgba(128, 51, 204, 0.4) 30%,
        rgba(128, 89, 166, 0.2) 40%,
        hsla(270, 0%, 50%, 0) 50%
      ),
      radial-gradient(
        circle at 14.644660940672615% 14.64466094067263%,
        #ff00bf,
        rgba(242, 13, 185, 0.8) 10%,
        rgba(230, 26, 179, 0.6) 20%,
        rgba(204, 51, 166, 0.4) 30%,
        rgba(166, 89, 147, 0.2) 40%,
        hsla(315, 0%, 50%, 0) 50%
      );
  }

  .wheel-point {
    width: 20px;
    height: 20px;
    background-color: black;
    border-radius: 100%;
  }
  @media (prefers-color-scheme: dark) {
    .container {
      background-color: #000000;
    }
  }
</style>
