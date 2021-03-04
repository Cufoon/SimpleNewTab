const search = () => {
  window.location.href = `https://www.baidu.com/s?ie=UTF-8&wd=${encodeURIComponent($('search').node.value)}`;
};

const addClassHandle = (element, value) => {
  if (!element.className) {
    element.className = value;
  } else {
    element.className = element.className + ' ' + value;
  }
};

const removeClassHandle = (element, value) => {
  if (!element.className) {
    element.className = '';
  } else {
    if (element.className.indexOf(value) > -1) {
      var result = element.className.replace(value, '');
      element.className = result.trim().split(/\s+/).join(' ');
    }
  }
};

const $ = (id) => {
  const element = document.getElementById(id);
  const nodeObject = {
    node: element,
    addClass: (value) => {
      addClassHandle(element, value);
      return nodeObject;
    },
    removeClass: (value) => {
      removeClassHandle(element, value);
      return nodeObject;
    },
    show: () => {
      element.style.display = 'block';
      return nodeObject;
    },
    hide: () => {
      element.style.display = 'none';
      return nodeObject;
    }
  };
  return nodeObject;
};

(() => {
  const inputElement = $('search');
  const underlineElement = $('underline');
  const searchElement = $('submit');

  inputElement.node.onkeypress = function (e) {
    if (e.key === 'Enter' || e.code === 'Enter') {
      search();
    }
  };

  inputElement.node.onfocus = function () {
    underlineElement.show();
  };

  inputElement.node.onblur = function () {
    underlineElement.hide();
  };

  searchElement.node.onclick = search;
})();

const appElement = $('app');
const settingElement = $('setting');

appElement.node.addEventListener(
  'transitionend',
  () => {
    appElement.node.style.transition = 'none';
  },
  true
);

let oldColor = 'rgb(246, 246, 246)';

const rgbaReg = /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i;

const originBackgroundColor = 'rgb(246, 246, 246)';

const myPickr = Pickr;
const initColorPicker = () => {
  const pickr = myPickr.create({
    el: '#setting',
    theme: 'nano',
    container: '#color-picker',
    default: oldColor,
    appClass: 'color-picker',
    showAlways: false,
    useAsButton: true,
    padding: 8,
    swatches: [
      'rgba(244, 67, 54, 1)',
      'rgba(233, 30, 99, 0.95)',
      'rgba(156, 39, 176, 0.9)',
      'rgba(103, 58, 183, 0.85)',
      'rgba(63, 81, 181, 0.8)',
      'rgba(33, 150, 243, 0.75)',
      'rgba(3, 169, 244, 0.7)',
      'rgba(0, 188, 212, 0.7)',
      'rgba(0, 150, 136, 0.75)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(139, 195, 74, 0.85)',
      'rgba(205, 220, 57, 0.9)',
      'rgba(255, 235, 59, 0.95)',
      'rgba(255, 193, 7, 1)'
    ],
    position: 'top-start',
    adjustableNumbers: true,
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
      'btn:clear': '重置',
      'aria:btn:save': '保存',
      'aria:btn:cancel': '取消',
      'aria:btn:clear': '重置',
      'aria:input': '颜色输入框',
      'aria:palette': '颜色选择面板',
      'aria:hue': '色相滑动选择条',
      'aria:opacity': '透明度滑动选择条'
    }
  });

  pickr
    .on('init', (instance) => {})
    .on('hide', (instance) => {
      $('setting').removeClass('setting-checked');
      appElement.node.style.background = oldColor;
    })
    .on('show', (color, instance) => {
      $('setting').addClass('setting-checked');
      instance.setColor(oldColor);
    })
    .on('save', (color, instance) => {
      if (color) {
        const newColor = color.toRGBA().toString();
        oldColor = newColor;
        appElement.node.style.background = newColor;
      }
    })
    .on('clear', (instance) => {
      instance.setColor(originBackgroundColor);
      appElement.node.style.background = originBackgroundColor;
      chrome.storage.local.set({ backgroundColor: originBackgroundColor }, () => {});
    })
    .on('change', (color, source, instance) => {
      if (color) {
        appElement.node.style.background = color.toRGBA().toString();
      }
    })
    .on('cancel', (instance) => {
      instance.hide();
    })
    .on('swatchselect', (color, instance) => {
      if (color) {
        oldColor = color.toRGBA().toString();
      }
    });

  document.getElementsByClassName('pcr-save')[0].addEventListener('click', () => {
    pickr.setColor(oldColor);
    pickr.hide();
    chrome.storage.local.set({ backgroundColor: oldColor }, () => {});
  });
};

chrome.storage.local.get('backgroundColor', function (result) {
  if (result && result.backgroundColor && rgbaReg.test(result.backgroundColor)) {
    oldColor = result.backgroundColor;
    appElement.node.style.background = oldColor;
  }
  initColorPicker();
  if (oldColor === 'rgb(246, 246, 246)') {
    appElement.node.style.transition = 'none';
  }
});
