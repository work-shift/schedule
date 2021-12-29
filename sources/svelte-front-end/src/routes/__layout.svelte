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
  import {
    ProtocolEventNames,
  } from '$lib/constants/ProtocolEventNames.mjs';
  import '../app.css';

  const kernelConfig = Object.freeze({
    kernel: {
      channels: {
        UI: ChannelNames.UI,
      },
    },
    worker: {
      communicator: {
        address: 'ws://127.0.0.1:9090/',
      },
    },
  });
  let kernel = null;
  let kernelChannel = null;
  let isKernelReady = true;

  const handleKernelChannelMessage = (messageEvent = null) => {
    const {
      data: {
        type,
        payload,
      },
    } = messageEvent;

    switch (type) {
      case ProtocolEventNames.KERNEL_READY: {
        isKernelReady = true;

        break;
      }
      // case ProtocolEventNames.KERNEL_UNLOADED: {
      //   console.log('__layout', type, payload);

      //   isKernelReady = false;

      //   break;
      // }
      default: {
        break;
      }
    }
  }

  onMount(() => {
    kernelChannel = new BroadcastChannel(ChannelNames.KERNEL);
    kernelChannel.addEventListener('message', handleKernelChannelMessage);

    kernel = new Kernel(kernelConfig);

    kernel.start();

    return () => {
      console.log('__layout.svelte is unmounted');
    }
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

    console.log('__layout.svelte before unmounting');
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
  {#if isKernelReady === false}
    loading...
  {:else}
    <slot />
  {/if}
</main>
