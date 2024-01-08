<script lang="ts">
  export let name = "Svelte";
  import logoSrc from "./assets/logo.png";
</script>

<main class="main">
  <img
    width="160"
    height="160"
    src={logoSrc}
    alt="javascript logo"
    class="logo"
  />
  <div class="content">
    <h1 class="title">
      {name}&nbsp;<span class="logo-text">TS</span> template
    </h1>
    <p class="sub-title">Figma Plugin CLI</p>
  </div>
</main>

<style lang="scss">
  .main {
    display: grid;
    place-content: center;
    justify-items: center;
    gap: 24px;

    height: 100%;
    width: 100%;
    background-color: var(--figma-color-bg, #2c2c2c);

    text-align: center;
    font-family: "Inter", sans-serif;
    color: var(--figma-color-text, #ffffff);
  }

  .content {
    display: grid;
    place-content: center;
    gap: 16px;
  }

  .logo {
    width: 160px;
    height: 160px;
  }

  .title {
    font-size: 3rem;
    font-weight: 500;
  }

  .logo-text {
    color: #358ef1;
  }

  .sub-title {
    font-size: 1.5rem;
    color: var(--figma-color-text-secondary, #ffffffb2);
  }
</style>
