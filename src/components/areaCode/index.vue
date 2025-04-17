<template>
  <div
    class="intl-tel-input allow-dropdown"
    style="position:absolute"
    v-clickoutside="doHideSubMenu"
  >
    <div class="flag-container">
      <div
        class="selected-flag"
        :title="currentData.name + ': +' + currentData.dialCode"
        @click="hideSubMenu = !hideSubMenu"
      >
        <!-- <div :class="'iti-flag ' + currentData.code"></div> -->
        <span :style="{'line-height':height}">+{{currentData.dialCode}}</span>
        <div class="iti-arrow"></div>
      </div>
      <ul class="country-list" v-show="!hideSubMenu">
        <li
          v-for="item in frontCountriesArray"
          :key="item.id"
          :class="'country ' + (item.code == currentCode ? 'highlight' : '')"
          @click="currentCode = item.code; hideSubMenu = true; setCountry(item);"
        >
          <div class="flag-box">
            <div :class="'iti-flag ' + item.code"></div>
          </div>
          <span class="country-name">{{ item.name }}</span>
          <span class="dial-code">+{{ item.dialCode }}</span>
        </li>
        <li class="divider"></li>
        <li
          v-for="item in countriesArray"
          :key="item.id"
          :class="'country ' + (item.code == currentCode ? 'highlight' : '')"
          @click="currentCode = item.code; hideSubMenu = true; setCountry(item);"
        >
          <div class="flag-box">
            <div :class="'iti-flag ' + item.code"></div>
          </div>
          <span class="country-name">{{ item.name }}</span>
          <span class="dial-code">+{{ item.dialCode }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import clickoutside from "../../directives/clickoutside";
import countries from "./countryList";
export default {
  props: {
    areaHeight: {
      type: String,
      default: ""
    },
    toFront: {
      type: Array,
      default: () => {
        return [];
      }
    },
    countryCode: {
      type: String,
      default: Object.keys(countries)[0],
      validator(code) {
        
        var clearCode = String(code).toLowerCase();
        return !!countries[clearCode];
      }
    }
  },
  directives: { clickoutside },
  data() {
    return {
      height: this.areaHeight ? this.areaHeight : "38px",
      currentCode: this.countryCode,
      hideSubMenu: true
    };
  },

  computed: {
    currentData() {
      return countries[this.currentCode];
    },
    frontCountriesArray() {
      const toFrontCodes = {};
      this.toFront.forEach(code => {
        const stringCode = String(code);
        const needObj = countries[stringCode];
        if (needObj) {
          toFrontCodes[stringCode] = needObj;
        }
      });
      return toFrontCodes;
    },
    countriesArray() {
      const countryCopie = { ...countries };
      this.toFront.forEach(code => {
        delete countryCopie[code];
      });
      return countryCopie;
    }
  },

  watch: {
    countryCode(newCode) {
      this.setCountry(countries[newCode]);
    }
  },

  methods: {
    setCountry(item) {
      this.currentCode = item.code;
      this.toFront.push(String(item.code));
      this.$emit("excountry", item);
    },
    doHideSubMenu() {
      this.hideSubMenu = true;
    }
  },

  mounted() {
    this.$emit("excountry", countries[this.countryCode]);
  }
};
</script>


<style lang="scss" scoped>
@import "intl.css";

.intl-tel-input {
  /*height: 40px;*/
  width: 20px;
  color: #666;
  font-size: 14px;
  .country-list {
    width: 296px;
    height: 250px;
    margin-top: 2px;
    line-height: 16px;
  }
}
</style>
