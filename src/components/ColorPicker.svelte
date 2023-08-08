<script context="module">
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { Color, ColorPicker } from 'color-picker-svelte';
</script>

<script lang="ts">
  export let color: Color;
  export let positionRelativeElmt: HTMLElement;
  export let isOpenColorPicker = false;
  export let onChange = (color: string) => {};
  export let onSave = (color: string) => {};
  export let onCancel = (color?: string) => {};
  export let onReset: ((...args: any[]) => any) | null = null;

  const changeColorPickerOpenState = () => {
    isOpenColorPicker = !isOpenColorPicker;
  };

  const onClickSave = () => {
    onSave(color.toHex8String());
    isOpenColorPicker = false;
  };

  const onClickCancel = () => {
    onCancel(color.toHex8String());
    isOpenColorPicker = false;
  };

  $: onChange(color.toHex8String());

  function transitionHideHeader(node: Element, param?: { delay: any }) {
    return {
      delay: param?.delay || 0,
      duration: 200,
      easing: cubicOut,
      css: (t: number, u: number) =>
        `opacity:${t}; transform: translate3d(0,${Math.floor(u * 100)}%,0)`
    };
  }

  function transitionHidePicker(node: Element, param?: { delay: any }) {
    return {
      delay: param?.delay || 0,
      duration: 200,
      easing: cubicIn,
      css: (t: number, u: number) =>
        `opacity:${t}; transform: translate3d(0,${Math.floor(u * 50)}px,0)`
    };
  }
</script>

<svelte:head>
  <title>测试</title>
  <meta name="description" content="Simple Newtab developed by Lin Cufoon" />
</svelte:head>

{#if isOpenColorPicker}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="mask" on:click="{changeColorPickerOpenState}"></div>
  <div class="pickerContainerHeader" out:transitionHideHeader>
    <div class="pickerContainerHeaderText">{color.toHex8String()}</div>
    <div>
      {#if onReset !== null}
        <button
          class="pickerContainerHeaderButton pickerContainerHeaderButtonCancel"
          on:click="{onReset}">重置</button
        >
      {/if}
      <button
        class="pickerContainerHeaderButton pickerContainerHeaderButtonCancel"
        on:click="{onClickCancel}">取消</button
      >
      <button
        class="pickerContainerHeaderButton pickerContainerHeaderButtonOK"
        on:click="{onClickSave}">确认</button
      >
    </div>
  </div>
  <div class="pickerContainer" out:transitionHidePicker="{{ delay: 100 }}">
    <ColorPicker
      positioningContextElement="{positionRelativeElmt}"
      bind:color
      isOpen="{isOpenColorPicker}"
      position="{2}"
      showAlphaSlider
    />
  </div>
{/if}

<style lang="scss">
  @import '../lib/scss/variable.scss';

  .mask {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
  }

  .pickerContainerHeader {
    width: 300px;
    position: absolute;
    z-index: 299;
    right: 50px;
    background-color: white;
    margin-top: 150px;
    padding: 15px 10px 60px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-radius: $border-radius-big;
    box-shadow: 2px 2px 20px 1px rgba(67, 74, 161, 0.1);
    opacity: 0;
    transform: translate3d(0, 100%, 0);
    animation: fadeInUp 0.4s cubic-bezier(0.17, 0.87, 0.15, 1.11) 0.2s forwards;

    &Text {
      color: black;
    }

    &Button {
      cursor: pointer;
      background: none;
      border-radius: 8px;
      // border: 1px solid hsla(222, 14%, 47%, 0.3);
      color: white;
      padding: 4px 6px;

      &Cancel {
        background-color: hsl(0, 66%, 50%);
      }

      &OK {
        background-color: hsl(206, 88%, 38%);
      }
    }
  }

  .pickerContainer {
    width: 300px;
    height: 0;
    background-color: white;
    position: absolute;
    z-index: 299;
    right: 50px;
    margin-top: 150px;

    :global(.color-picker) {
      animation: fadeInUpSmall 0.5s cubic-bezier(0.57, 0.37, 0.05, 1.11);
      border-radius: $border-radius-big;
      border: none;
      box-shadow: 2px 2px 32px 3px rgba(67, 74, 161, 0.1);
    }
  }
</style>
