<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6" lg="4">
      <h2 class="text-center mb-3">Find Nearest Color</h2>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
            v-model="baseColor"
            label="Base Color Hex"
            class="mb-4"
            :rules="baseColorRules"
            required>
        </v-text-field>

        <v-textarea
            v-model="colors"
            auto-grow
            label="Colors List Hex"
            class="mb-4"
            :rules="[colorsRequiredRule, checkHexColorFormat]"
            required>
        </v-textarea>

        <v-btn @click="findColor" :disabled="!valid" color="primary">
          Find
        </v-btn>
      </v-form>

      <div v-if="nearestColor" class="d-flex align-center mt-4">
        <div class="mr-2">Nearest color:</div>
        <div class="colorIcon" :style="{backgroundColor: nearestColor}"></div>
        <div class="ml-2">{{nearestColor}}</div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from 'vue';
  import hexRgb from "hex-rgb";

  interface Data {
    baseColor: string
    colors: string
    nearestColor: string | undefined
    baseColorRules: ((v: string) => boolean | string)[]
    colorsRequiredRule: (v:string) => boolean | string
    valid: boolean
  }

  type TColorRGB = {
    red: number
    green: number
    blue: number
  }

  export default Vue.extend({
    name: "NearestColor",

    data(): Data {
      return {
        baseColor: '',
        colors: '',
        nearestColor: '',
        valid: true,
        colorsRequiredRule: (v: string) => !!v || 'Colors list is required',
        baseColorRules: [
          (v: string) => !!v || 'Base color is required',
          (v: string) => !!(v || '').match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ig) || 'Base color should be in hex format'
        ]
      }
    },

    methods: {
      findColor(): void {
        const isFormValid = this.form.validate();

        if (isFormValid) {
          const distances: Array<number> = [];
          const searchedColors: Array<{distance: number, color: string}> = [];
          const baseColorRGB: TColorRGB = hexRgb(this.baseColor);
          const colorsList: Array<string> = this.colors.split(",");

          for (let color of colorsList) {
            const colorRGB: TColorRGB = hexRgb(color);
            const d: number = Math.sqrt(
              Math.pow(colorRGB.red - baseColorRGB.red, 2) +
              Math.pow(colorRGB.green - baseColorRGB.green, 2) +
              Math.pow(colorRGB.blue - baseColorRGB.blue, 2)
            );

            searchedColors.push({
              distance: d,
              color: color
            });
            distances.push(d);
          }

          this.nearestColor = searchedColors.find(el => el.distance === Math.min(...distances))?.color;
        }
      },

      checkHexColorFormat(text: string): boolean | string {
        const colorsList: Array<string> = text.split(",");

        for (let color of colorsList) {
          if (!color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ig)) {
            return 'Colors should be in hex format separated by commas';
          }
        }

        return true;
      }
    },

    computed: {
      form(): Vue & { validate: () => boolean } {
        return this.$refs.form as Vue & { validate: () => boolean };
      }
    }
  })
</script>

<style scoped lang="scss">
  .colorIcon {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .errorMsg {
    color: red;
    font-size: 12px;
  }
</style>
