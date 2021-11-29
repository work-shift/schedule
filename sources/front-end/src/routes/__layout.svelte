<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    Ldr,
  } from '$lib/logic/ldr.mjs';
  import '../app.css';

  let ldr;
  const communicatorConfig = Object.freeze({
    address: 'ws://127.0.0.1:9090',
    endpoints: {
      register: 'register',
    },
  });

  onMount(async () => {
    ldr = new Ldr(communicatorConfig);

    return await ldr.start();
  });

  onDestroy(async () => {
    if (typeof ldr !== 'undefined') {
      await ldr.stop();

      ldr = undefined;
    }
  });
</script>

<style>
  main {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    min-width: 100vw;
    min-height: 100vh;
  }
</style>

<main>
  <slot />
</main>
