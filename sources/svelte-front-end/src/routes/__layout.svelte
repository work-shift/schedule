<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    Kernel,
  } from '$lib/Kernel/Kernel.mjs';
  import '../app.css';

  const kernelConfig = Object.freeze({
    communicator: {
      address: 'ws://127.0.0.1:9090/',
    },
  });
  let kernel = null;

  onMount(async () => {
    kernel = new Kernel(kernelConfig);

    return await kernel.start();
  });

  onDestroy(async () => {
    if (typeof kernel !== 'undefined') {
      await kernel.stop();

      kernel = undefined;
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
