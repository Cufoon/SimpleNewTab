<script context="module">
  import { printCopyright } from './lib/utils/copyright';
  import './lib/css/normalize.css';
  import './lib/scss/global.scss';

  printCopyright();

  import { onMount } from 'svelte';
  import { Color } from 'color-picker-svelte';
  import storage from './lib/utils/storage';
  import { defaultSetting } from './lib/utils/setting';
  import SearchBar from './components/SearchBar.svelte';
  import SwitchSetting from './components/SwitchSetting.svelte';
  import ColorPicker from './components/ColorPicker.svelte';
</script>

<script lang="ts">
  let bgColor = '#f0f0f0';
  let showSetting = false;
  const switchShowSetting = () => {
    showSetting = !showSetting;
  };
  const onBgColorSave = (value: string) => {
    bgColor = value;
    storage.setBackgroundColor(value);
  };

  let nowColor = bgColor;
  let color = new Color(bgColor);
  let positionRelativeElmt: HTMLDivElement;
  let isOpenColorPicker = false;

  const openColorPicker = () => {
    if (isOpenColorPicker === false) {
      nowColor = bgColor;
      previewColor = bgColor;
      color = new Color(bgColor);
      isOpenColorPicker = true;
    }
  };

  let previewColor = bgColor;

  const onColorPickerChange = (color: string) => {
    previewColor = color;
    bgColor = color;
  };

  const onColorPickerCancel = () => {
    color = new Color(nowColor);
    previewColor = nowColor;
    bgColor = nowColor;
  };

  const onColorPickerSave = (color: string) => {
    onBgColorSave(color);
    bgColor = color;
  };

  const onResetDefaultColor = () => {
    color = new Color(defaultSetting.backgroundColor);
    bgColor = defaultSetting.backgroundColor;
    previewColor = defaultSetting.backgroundColor;
  };

  onMount(() => {
    (async () => {
      const defaultColor =
        (await storage.getBackgroundColor()) || defaultSetting.backgroundColor;
      bgColor = defaultColor;
      nowColor = defaultColor;
      previewColor = defaultColor;
    })();
  });
</script>

<svelte:head>
  <title>新标签页</title>
  <meta name="description" content="Simple Newtab developed by Lin Cufoon" />
</svelte:head>

<div class="container" style="background-color: {bgColor}">
  <div class="header">
    <div class="settingIcon">
      <SwitchSetting
        open="{showSetting}"
        changeOpen="{switchShowSetting}"
        {bgColor}
      />
    </div>
  </div>
  <div class="main">
    <div class="leftPart">
      <div class="title web_font">遇见更好的自己，和更好的你。</div>
      <SearchBar />
    </div>
    <div class="rightPart" class:rightPartOpen="{showSetting}">
      <div class="settingPanel">
        <div class="option" bind:this="{positionRelativeElmt}">
          <div>背景颜色设置</div>
          <div>
            <button
              class="colorPickerButton"
              style="{`background-color: ${previewColor}`}"
              on:click="{openColorPicker}"
            ></button>
          </div>
          <ColorPicker
            bind:color
            bind:positionRelativeElmt
            bind:isOpenColorPicker
            onChange="{onColorPickerChange}"
            onCancel="{onColorPickerCancel}"
            onSave="{onColorPickerSave}"
            onReset="{onResetDefaultColor}"
          />
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import './lib/scss/variable.scss';

  .container {
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
      height: 72px;
      position: relative;

      .settingIcon {
        position: absolute;
        right: 5vw;
        top: 30px;
      }
    }

    .main {
      display: flex;
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
      margin-top: 40px;
      font-size: 25px;
      height: 36px;
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

      .colorPickerButton {
        width: 32px;
        height: 32px;
        border-radius: 100%;
        border: 4px #f0f0f0 solid;
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    .container {
      background-color: #000000;
    }
  }
</style>
