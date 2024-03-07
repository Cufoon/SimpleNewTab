<script context="module" lang="ts">
  import { onMount } from 'svelte';
  import storage from '../lib/utils/storage';
  import { defaultSetting } from '../lib/utils/setting';
  import { engineList, engines } from '../lib/utils/search-engine';
  import type { SearchEngine } from '../lib/utils/search-engine';
  import SearchEngineComponent from './SearchEngine.svelte';
</script>

<script lang="ts">
  let searchInput = '';
  let searchEngine: SearchEngine | undefined;
  let searchEngineKey = '';

  $: searchEngine = engines[searchEngineKey];

  const relaunchSearch = () => {
    if (searchEngine) {
      // to fix chrome keep input when back
      const urlToLaunch = searchEngine.url(searchInput);
      window.location.href = urlToLaunch;
      setTimeout(() => {
        searchInput = '';
      }, 10);
    }
  };

  const onEnter = (e: { key: string; code: string }) => {
    if (e.key.toLowerCase() === 'enter' || e.code.toLowerCase() === 'enter') {
      relaunchSearch();
    }
  };

  let showEngineSelect = false;

  const onShowEngineSelect = () => (showEngineSelect = true);
  const onHideEngineSelect = () => (showEngineSelect = false);
  const onSelectSearchEngine = () => {
    storage.setSearchEngine(searchEngineKey);
    onHideEngineSelect();
  };

  onMount(() => {
    (async () => {
      const defaultSearchEngine =
        (await storage.getSearchEngine()) || defaultSetting.searchEngine;
      searchEngineKey = defaultSearchEngine;
      searchEngine = engines[defaultSearchEngine];
    })();
  });
</script>

<div class="searchBar" class:searchBarShow="{searchEngineKey !== ''}">
  <div class="lineWrapper">
    <div class="engineWrapper">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div on:click="{onShowEngineSelect}">{searchEngine?.name || ''}</div>
      <div class="engineList" class:engineListShow="{showEngineSelect}">
        {#each engineList as engine (engine.key)}
          <SearchEngineComponent
            bind:selectedKey="{searchEngineKey}"
            engineKey="{engine.key}"
            engineName="{engine.name}"
            onClick="{onSelectSearchEngine}"
          />
        {/each}
      </div>
    </div>
    <input
      class="input"
      bind:value="{searchInput}"
      on:keypress="{onEnter}"
      aria-label="search"
    />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="submit" on:click="{relaunchSearch}">
      <div class="icon"></div>
    </div>
  </div>
</div>

<style lang="scss">
  @import '../lib/scss/variable.scss';

  .searchBar {
    display: none;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 12px 16px;
    margin-top: 36px;
    border-radius: $border-radius-big;
    background-color: rgb(252, 252, 252);
    box-shadow: 2px 2px 14px 0 rgba(67, 74, 161, 0.1);
    animation: fadeInUp 0.7s cubic-bezier(0.17, 0.67, 0.05, 1.11);

    $border-radius-big: 12px;

    .lineWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      background-color: $theme-color;
      border-radius: $border-radius-big;
    }

    .engineWrapper {
      position: relative;
      width: auto;
      padding: 0 12px;
      height: 40px;
      font-size: 16px;
      line-height: 38px;
      border-radius: $border-radius-big 0 0 $border-radius-big;
      background-color: $theme-color;
      box-sizing: border-box;
      border: 0;
      cursor: pointer;
      text-align: center;
      color: rgb(252, 252, 252);
      user-select: none;
    }

    .engineList {
      position: absolute;
      box-sizing: border-box;
      padding: 0 12px;
      top: 44px;
      left: 0;
      width: auto;
      padding: 6px;
      font-size: 16px;
      line-height: 38px;
      border-radius: $border-radius-big;
      background-color: $theme-color;
      box-shadow: -5px 10px 50px 0 rgba(0, 0, 0, 0.3);
      display: none;
    }

    .engineListShow {
      display: block;
    }

    .input {
      display: block;
      box-sizing: border-box;
      width: 350px;
      height: 40px;
      padding: 0 14px;
      font-size: 16px;
      line-height: 38px;
      border: 2px solid $theme-color;
      border-right: none;
      border-left: none;
      background-color: rgb(250, 250, 250);
      color: #797979;
      outline: none;
      transition: background-color 0.3s ease-in;
      caret-color: $theme-color;
      border-radius: 14px;

      &:focus {
        outline: none;
        background-color: rgb(234, 234, 234);
      }
    }

    .submit {
      width: 56px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $theme-color;
      box-sizing: border-box;
      padding-right: 6px;
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

  .searchBarShow {
    display: flex;
  }

  @media (prefers-color-scheme: dark) {
    .searchBar {
      background-color: #252525;

      .lineWrapper {
        background-color: $theme-color-dark;
      }

      .engineWrapper {
        background-color: $theme-color-dark;
      }

      .input {
        background-color: #000;
        border-color: $theme-color-dark;

        &:focus {
          background-color: #333;
        }
      }

      .submit {
        background-color: $theme-color-dark;
      }
    }
  }
</style>
