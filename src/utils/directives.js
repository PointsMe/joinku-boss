import Vue from "vue";
import store from "@/store";

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时
  inserted: function (el) {
    if (el.tagName.toLocaleLowerCase() == 'input') {
      // input
      el.focus()
    } else {
      // el-input
      el.querySelector('input').focus()
    }
  }
})

Vue.directive('resize', {
  bind (el, binding) {
    let width = '', height = '';
    function get () {
      const style = document.defaultView.getComputedStyle(el);
      if (width !== style.width || height !== style.height) {
        binding.value({ width, height });
      }
      width = style.width;
      height = style.height;
    }

    el.__vueReize__ = setInterval(get, 200);
  },
  unbind (el) {
    clearInterval(el.__vueReize__);
  },
});

/**
 * 控制表单只能输入正整数和0
 * 用法：v-input-number
 */
Vue.directive('inputNumber', {
  inserted(el) {
      el.oninput = () => {
          if (el.tagName.toLocaleLowerCase() == 'input') {
              // input
              el.value = el.value.replace(/\D/g, '');
          } else {
              // el-input
              el.querySelector('input').value = el.querySelector('input').value.replace(/\D/g, '');
          }
      };
  }
})

/**
* 控制表单只能输入正整数
* 用法：v-input-integer
*/
Vue.directive('inputInteger', {
  inserted(el) {
      el.oninput = () => {
          if (el.tagName.toLocaleLowerCase() == 'input') {
              // input
              el.value = el.value.replace(/\D|^0/g, '');
          } else {
              // el-input
              el.querySelector('input').value = el.querySelector('input').value.replace(/\D|^0/g, '');
          }
      }
  }
})

/**
* 控制表单只能输入正数或0
* 用法：v-input-float
*/
Vue.directive('inputFloat', {
  inserted(el) {
      el.oninput = () => {
          if (el.tagName.toLocaleLowerCase() == 'input') {
              // input
              el.value = el.value.replace(/[^\d.]|^\D/g, '');
          } else {
              // el-input
              el.querySelector('input').value = el.querySelector('input').value.replace(/[^\d.]|^\D/g, '');
          }
      }
  }
})

/**
 * 控制表单只能输入正数或0
 * 用法：v-permission="['code']"
 */
Vue.directive('permission', {
    inserted(el, binding) {
        // 当前用户权限
        const nowPerms = store.state.user.perms
        // 当前用户是否是超级管理员
        const owner = store.state.user.owner
        // code参数
        const { value } = binding
        if (value && value instanceof Array && value.length > 0) {
            const hasPermission = nowPerms.some((item) => {
                return value.includes(item)
            })
            // 如果为false删除节点
            if (!hasPermission && !owner) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        }
    }
})
