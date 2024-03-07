<script context="module">
  import { printCopyright } from './lib/utils/copyright';
  import './lib/css/normalize.css';
  import './lib/scss/global.scss';

  printCopyright();

  import { onMount } from 'svelte';
  import SearchBar from './components/SearchBar.svelte';
  import SwitchSetting from './components/SwitchSetting.svelte';
  import IconTop from './icons/IconTop.svelte';
  import IconTopSelected from './icons/IconTopSelected.svelte';
  import IconMiddle from './icons/IconMiddle.svelte';
  import IconMiddleSelected from './icons/IconMiddleSelected.svelte';
  import storage from './lib/utils/storage';
  import { defaultSetting } from './lib/utils/setting';
</script>

<script lang="ts">
  let showSetting = false;
  const switchShowSetting = () => {
    showSetting = !showSetting;
  };

  let searchPosition = 'top';

  let isSearchPositionTop = true;
  let isSearchPositionMiddle = false;

  $: isSearchPositionTop = searchPosition === 'top';
  $: isSearchPositionMiddle = searchPosition === 'middle';

  const onSelectSearchPosition = (v: string) => {
    storage.setSearchPosition(v);
    searchPosition = v;
  };

  const onSelectSearchPositionTop = () => onSelectSearchPosition('top');
  const onSelectSearchPositionMiddle = () => onSelectSearchPosition('middle');

  onMount(() => {
    (async () => {
      const defaultSearchPosition =
        (await storage.getSearchPosition()) || defaultSetting.searchPosition;
      searchPosition = defaultSearchPosition;
    })();
  });
</script>

<svelte:head>
  <title>新标签页</title>
  <meta name="description" content="Simple Newtab developed by Lin Cufoon" />
</svelte:head>

<div class="container">
  <div class="header">
    <div class="settingIcon">
      <SwitchSetting open="{showSetting}" changeOpen="{switchShowSetting}" />
    </div>
  </div>
  <div class="main">
    <div class="leftPart" class:leftPartPlaceMiddle="{isSearchPositionMiddle}">
      <div
        class="title web_font"
        class:titleWhenPlaceCenter="{isSearchPositionMiddle}"
      >
        遇见更好的自己，和更好的你。
      </div>
      <SearchBar />
    </div>
    <div class="rightPart" class:rightPartOpen="{showSetting}">
      <div class="settingPanel">
        <div class="option">
          <div>搜索位置</div>
          <div>
            <button
              class="positionPickerButton"
              class:positionPickerButtonSelected="{isSearchPositionTop}"
              on:click="{onSelectSearchPositionTop}"
            >
              {#if isSearchPositionTop}
                <IconTopSelected />
              {:else}
                <IconTop />
              {/if}
            </button>
            <button
              class="positionPickerButton"
              class:positionPickerButtonSelected="{isSearchPositionMiddle}"
              on:click="{onSelectSearchPositionMiddle}"
            >
              {#if isSearchPositionMiddle}
                <IconMiddleSelected />
              {:else}
                <IconMiddle />
              {/if}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import './lib/scss/variable.scss';

  $header-height: 72px;
  $title-height: 36px;
  $title-top-margin: 40px;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
    width: 100vw;
    height: 100vh;
    border: 0;
    box-sizing: border-box;
    overflow: hidden;
    background-color: rgb(240, 240, 240);
    will-change: background-color;
    transition: background-color 0.5s cubic-bezier(0.32, 0.05, 0.06, 0.98) 0.07s;

    .header {
      width: 100%;
      height: $header-height;
      position: relative;

      .settingIcon {
        position: absolute;
        right: 5vw;
        top: 30px;
      }
    }

    .main {
      width: 100%;
      display: flex;
      flex: 1;
      justify-content: space-around;
      align-items: flex-start;
      padding: 30px;
      box-sizing: border-box;

      .leftPart {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        flex-grow: 1;
        height: 100%;
        overflow: hidden;
      }

      .leftPartPlaceMiddle {
        justify-content: center;
      }

      .rightPart {
        width: 0;
        flex-grow: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        background-color: #ffffff;
        border-radius: $border-radius-big;
        box-shadow: 2px 2px 14px 0 rgba(67, 74, 161, 0.1);
        transition: width 0.5s cubic-bezier(0.67, 0.27, 0, 0.93);
        overflow: hidden;
      }

      .rightPartOpen {
        width: 280px;
      }
    }

    .title {
      margin-top: $title-top-margin;
      font-size: 25px;
      height: $title-height;
      line-height: 36px;
      transition: 0.2s;
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
      text-align: center;
      // color: #6d75e2;
      color: $theme-color;
      animation: fadeInDown 0.25s cubic-bezier(1, 0.67, 1, 1.39);
      text-shadow: 1px 1px 16px rgba(79, 85, 168, 0.3);

      &:hover {
        font-size: 26px;
      }
    }

    .titleWhenPlaceCenter {
      margin-top: -($title-height + 110px) * 2;
    }

    .settingPanel {
      width: 280px;
      padding: 20px;
      box-sizing: border-box;

      .option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 12px;
        color: #757575;
        font-size: 16px;
        user-select: none;
      }

      .positionPickerButton {
        background-color: #f0f0f0;
        width: 32px;
        height: 32px;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        border-radius: 6px;
        border: 2px transparent solid;
      }

      .positionPickerButtonSelected {
        border: 2px $theme-color solid;
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    .container {
      background-color: #000000;

      .main .rightPart {
        background-color: #252525;
      }
      .main .title {
        color: $theme-color-dark;
      }

      .settingPanel .positionPickerButton {
        background-color: #777;
      }
    }
  }
</style>
