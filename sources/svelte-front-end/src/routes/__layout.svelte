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
    worker: {
      communicator: {
        address: 'ws://127.0.0.1:9090/',
      },
    },
  });
  let kernel = null;
  let kernelChannel = null;
  let isLoading = true;

  const handleKernelChannelMessage = (messageEvent = null) => {
    console.log('handleKernelChannelMessage', messageEvent);
  }

  onMount(() => {
    kernelChannel = new BroadcastChannel(ChannelNames.KERNEL);
    kernelChannel.addEventListener('message', handleKernelChannelMessage);

    kernel = new Kernel(kernelConfig);

    return kernel.start();
  });

  onDestroy(async () => {
    if (kernel !== null) {
      await kernel.stop();

      kernel = null;
    }

    if (kernelChannel !== null) {
      kernelChannel.removeEventListener('message', handleKernelChannelMessage);
      kernelChannel.close();

      kernelChannel = null;
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
