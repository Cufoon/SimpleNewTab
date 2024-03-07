<script lang="ts">
  export let selectedKey: string;
  export let engineName: string;
  export let engineKey: string;
  export let onClick: (...args: any[]) => any;

  const _onClick = () => {
    selectedKey = engineKey;
    onClick();
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class:selected="{selectedKey === engineKey}"
  class="line"
  on:click="{_onClick}"
>
  {engineName}
</div>

<style lang="scss">
  @import '../lib/scss/variable.scss';

  .line {
    padding: 0 12px;
  }

  .selected {
    background-color: white;
    color: black;
    border-radius: $border-radius-big;
  }
</style>
