<script context="module">
  export const prerender = true;
</script>

<script>
  import {
    CustomEventTypes,
  } from '../lib/constants/CustomEventTypes.mjs';
  import FingerPrintIcon from '$lib/icons/FingerPrint.svelte';

  let isCreatingCredentials = false;

  const handleButtonKeyDown = (pointerEvent) => {
    isCreatingCredentials = true;


    window.postMessage({
      type: CustomEventTypes.START_REGISTRATION,
      payload: null,
    });
  }
  
  const handleButtonKeyUp = (pointerEvent) => {
    // isCreatingCredentials = false;
  }
</script>

<style>
  div, div > button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  div > button {
    display: flex;
    justify-self: center;
    align-self: center;

    margin: 0;
    padding: 0;

    border: none;

    background-color: transparent;

    width: min(25vw, 25vh);
    height: min(25vw, 25vh);
  }

  .isCreatingCredentials {
    pointer-events: none;
  }
</style>

<div>
  <button
    type='button'
    on:mousedown={handleButtonKeyDown}
    on:mouseup={handleButtonKeyUp}
    on:touchstart|trusted|passive={handleButtonKeyDown}
    on:touchend|trusted|passive={handleButtonKeyUp}
    class:isCreatingCredentials
  >
    <FingerPrintIcon isActive={ isCreatingCredentials } />
  </button>
</div>
