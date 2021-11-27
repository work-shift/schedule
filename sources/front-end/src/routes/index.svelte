<script context="module">
  export const prerender = true;
</script>

<script>
  import FingerPrintIcon from '$lib/icons/FingerPrint.svelte';

  let isActiveButton = false;

  $: {
    console.log({ isActiveButton });
  }

  const handleButtonClick = (pointerEvent) => {
    isActiveButton = true;

    const to = setTimeout(() => {
      isActiveButton = false;
    }, 100);
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
</style>

<div>
  <button type='button' on:click|trusted={handleButtonClick}>
    <FingerPrintIcon isActive={ isActiveButton } />
  </button>
</div>
