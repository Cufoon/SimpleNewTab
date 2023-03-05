<script context="module">
  import { onMount } from 'svelte';
  import Pickr from '@simonwep/pickr';
</script>

<script lang="ts">
  export let onSave: (value: string) => any;
  export let initialColor: string;
  export let defaultColor: string;
  let color = initialColor;
  let picker: Pickr | null = null;
  let showPicker = false;

  const updatePickColor = (v: string) => {
    picker?.setColor(v, true);
  };

  $: updatePickColor(initialColor);

  $: console.log(initialColor);

  const onOpenColorPicker = () => {
    showPicker = !showPicker;
  };

  onMount(() => {
    console.log(document.getElementById('cx'));
    picker = Pickr.create({
      el: '#cx',
      theme: 'classic',
      container: '#app',
      default: initialColor,
      appClass: 'colorPicker',
      showAlways: false,
      useAsButton: true,
      swatches: ['rgba(252, 252, 252, 1)', 'rgba(244, 244, 244, 1)', 'rgba(212, 212, 212, 1)'],
      position: 'top-end',
      adjustableNumbers: true,
      autoReposition: true,
      defaultRepresentation: 'RGBA',
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          input: true,
          cancel: true,
          clear: true,
          save: true
        }
      },
      i18n: {
        'ui:dialog': '选择背景颜色',
        'btn:swatch': '历史颜色',
        'btn:last-color': '使用之前的颜色',
        'btn:save': '保存',
        'btn:cancel': '取消',
        'btn:clear': '恢复默认',
        'aria:btn:save': '保存',
        'aria:btn:cancel': '取消',
        'aria:btn:clear': '恢复默认',
        'aria:input': '颜色输入框',
        'aria:palette': '颜色选择面板',
        'aria:hue': '色相滑动选择条',
        'aria:opacity': '透明度滑动选择条'
      }
    });
    picker
      ?.on('save', (hsva: Pickr.HSVaColor, instance: Pickr) => {
        const newColor = hsva?.toRGBA().toString() || defaultColor;
        color = newColor;
        onSave(newColor);
        instance?.hide();
      })
      .on('cancel', (instance: Pickr) => {
        instance?.hide();
      });
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={onOpenColorPicker} class="colorBtn" style="background-color: {color}" />
<div class="wrapper" style="display: {showPicker ? 'block' : 'none'}">
  <div id="cx" class="colorBtn" />
</div>

<style lang="scss">
  .colorBtn {
    width: 24px;
    height: 24px;
    background-color: #000000;
    border-radius: 100%;
    border: 2px solid #757575;
  }

  .wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 50vw;
    height: 50vh;
    display: none;
    background-color: #000000;
  }
</style>
