<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    WorkerManager,
  } from '$lib/workers/WorkerManager.mjs';
  import '../app.css';

  let workerManager;
  const communicatorConfig = Object.freeze({
    address: 'ws://127.0.0.1:9090/',
  });

  onMount(async () => {
    workerManager = new WorkerManager(communicatorConfig);

    return await workerManager.start();
  });

  onDestroy(async () => {
    if (typeof workerManager !== 'undefined') {
      await workerManager.stop();

      workerManager = undefined;
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
