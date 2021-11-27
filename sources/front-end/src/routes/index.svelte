<script context="module">
  export const prerender = true;
</script>

<script>
  import FingerPrintIcon from '$lib/icons/FingerPrint.svelte';

  let isCreatingCredentials = false;

  const publicKeyCredentialCreationOptions = {
    challenge: Uint8Array.from('random-bytes-from-server', (c) =>  c.charCodeAt(0)),
    rp: {
      name: 'schedule',
      id: 'localhost',
    },
    user: {
      id: Uint8Array.from('user-random-id', (c) => c.charCodeAt(0)),
      name: 'user-random-name',
      displayName: 'user-random-displayName',
    },
    pubKeyCredParams: [
      {
        alg: -7,
        type: 'public-key',
      },
    ],
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      userVerification: 'required',
    },
    timeout: 60000,
    attestation: 'enterprise', // direct
  };

  const createCredentials = async () => {
    try {
      const publicKeyCredential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      });

      console.log({
        publicKeyCredential,
      });
    } catch(credentialsError) {
      console.error(credentialsError);
    } finally {
      isCreatingCredentials = false;
    }
  }

  const handleButtonKeyDown = (pointerEvent) => {
    isCreatingCredentials = true;

    createCredentials();
  }
  
  const handleButtonKeyUp = (pointerEvent) => {
    isCreatingCredentials = false;
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
