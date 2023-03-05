<script context="module">
  import { defaultSetting } from '$lib/utils/setting';
  import { storage } from '$lib/utils/chrome';
  import SearchBar from './SearchBar.svelte';
  import SwitchSetting from './SwitchSetting.svelte';
  import ColorPicker from './ColorPicker.svelte';
</script>

<script lang="ts">
  let bgColor = '#f0f0f0ff';
  let showSetting = false;
  const switchShowSetting = () => {
    showSetting = !showSetting;
  };
  const onBgColorSave = (value: string) => {
    bgColor = value;
    storage.setBackgroundColor(value);
  };

  (async () => {
    const defaultColor = await storage.getBackgroundColor();
    bgColor = defaultColor;
  })();
</script>

<svelte:head>
  <title>新标签页</title>
  <meta name="description" content="Simple Newtab developed by Lin Cufoon" />
</svelte:head>

<div class="container" style="backgroundColor: {bgColor}">
  <div class="header">
    <div class="settingIcon">
      <SwitchSetting open={showSetting} changeOpen={switchShowSetting} {bgColor} />
    </div>
  </div>
  <div class="main">
    <div class="leftPart">
      <div class="title web_font">遇见更好的自己，和更好的你。</div>
      <SearchBar />
    </div>
    <div class={showSetting ? 'rightPart rightPartOpen' : 'rightPart'}>
      <div class="settingPanel">
        <div class="option">
          <div>背景颜色设置</div>
          <ColorPicker
            defaultColor={defaultSetting.backgroundColor}
            initialColor={bgColor}
            onSave={onBgColorSave}
          />
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }

  .container {
    width: 100vw;
    height: 100vh;
    border: 0;
    box-sizing: border-box;
    overflow: hidden;
    background-color: rgb(240, 240, 240);
    transition: 0.88s cubic-bezier(0.32, 0.05, 0.06, 0.98) 0.08s;

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
        border-radius: 8px;
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
      color: #6d75e2;
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
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    .container {
      background-color: #000000;
    }
  }
</style>
