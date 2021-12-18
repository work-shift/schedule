<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    Kernel,
  } from '$lib/Kernel/Kernel.mjs';
  import {
    ChannelNames,
  } from '$lib/constants/ChannelNames.mjs';
  import '../app.css';

  const kernelConfig = Object.freeze({
    communicator: {
      address: 'ws://127.0.0.1:9090/',
    },
  });
  let uiChannel = null;
  let kernel = null;
  let isLoading = true;

  const handleUIMessage = (messageEvent = null) => {
    console.log('__layout.handleUIMessage', messageEvent.data);
  };

  onMount(async () => {
    uiChannel = new BroadcastChannel(ChannelNames.UI);

    uiChannel.addEventListener('message', handleUIMessage);

    kernel = new Kernel(kernelConfig);

    return await kernel.start();
  });

  onDestroy(async () => {
    if (uiChannel !== null) {
      uiChannel.removeEventListener('message', handleUIMessage);
      uiChannel.close();
      uiChannel = null;
    }

    if (kernel !== null) {
      await kernel.stop();

      kernel = null;
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
  {#if isLoading === true}
    loading...
  {:else}
    <slot />
  {/if}
</main>
