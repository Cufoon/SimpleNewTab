<script lang="ts">
  let searchInput = '';

  const relaunchSearch = () => {
    window.location.href = `https://bing.com/search?q=${encodeURIComponent(searchInput)}`;
  };

  const onEnter = (e: { key: string; code: string }) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      relaunchSearch();
    }
  };

  const onInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    searchInput = e.currentTarget.value;
  };
</script>

<div class="searchBar">
  <input class="input" on:input={onInput} on:keypress={onEnter} aria-label="search" />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="submit" on:click={relaunchSearch}>
    <div class="icon" />
  </div>
</div>

<style lang="scss">
  @import '../lib/scss/variable.scss';

  .searchBar {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 12px;
    margin-top: 36px;
    border-radius: $border-radius-big;
    background-color: rgb(252, 252, 252);
    box-shadow: 2px 2px 14px 0 rgba(67, 74, 161, 0.1);
    animation: fadeInUp 0.7s cubic-bezier(0.17, 0.67, 0.05, 1.11);

    .input {
      display: block;
      box-sizing: border-box;
      width: 350px;
      height: 40px;
      padding: 0 14px;
      font-size: 16px;
      line-height: 38px;
      border: 2px solid #cfcfcf;
      border-right: none;
      border-radius: $border-radius-big 0 0 $border-radius-big;
      background-color: rgb(250, 250, 250);
      color: #797979;
      outline: none;
      transition: background-color 0.3s ease-in;
      caret-color: $theme-color;

      &:focus {
        outline: none;
        border-color: $theme-color;
        background-color: rgb(244, 244, 244);
      }
    }

    .submit {
      width: 64px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $theme-color;
      box-sizing: border-box;
      border-radius: 0 $border-radius-big $border-radius-big 0;
      cursor: pointer;

      .icon {
        background-image: url('/images/search.svg');
        background-size: cover;
        width: 25px;
        height: 25px;
        box-sizing: border-box;
        color: rgb(252, 252, 252);
      }
    }
  }
</style>