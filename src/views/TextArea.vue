<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6" lg="4">
      <h2 class="text-center mb-3">Text Area</h2>
      <v-form>
        <v-textarea
            filled
            label="Textarea"
            auto-grow
            v-model="textarea"
            error-count="3"
            :rules="[charactersRule, newLinesValidate, parenthesesValidate]">
        </v-textarea>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from 'vue';

  interface Data {
    textarea: string,
    charactersRule: (v:string) => boolean | string
  }

  export default Vue.extend({
    name: "TextArea",

    data(): Data {
      return {
        textarea: '',
        charactersRule: (v: string) => !!(v || '').match(/^[a-zA-z{}\[\]\(\)\-+= \n]*$/ig) || 'Can contain only letters, {}[]()-+=, spaces and new lines'
      }
    },

    methods: {
      newLinesValidate(text: string): boolean | string {
        const textLines: Array<string> = text.split("\n");

        if (textLines.length === 1 && textLines[0].length === 0) {
          return true;
        }

        for (let textLine of textLines) {
          if (!textLine.charAt(0).match(/^[A-Z]+$/))
            return 'Each line should start with uppercase letter';
        }

        return true;
      },

      parenthesesValidate(text: string): boolean | string {
        const leftArr: Array<string> = [];

        for (let t of text) {
          if (t === '(' || t === '[' || t === "{") {
            leftArr.push(t);
          }

          const leftArrLength: number = leftArr.length;

          if (t === ')' && leftArr[leftArrLength - 1] === '(') {
            leftArr.pop();
          } else if (t === '}' && leftArr[leftArrLength - 1] === '{') {
            leftArr.pop();
          } else if (t === ']' && leftArr[leftArrLength - 1] === '[') {
            leftArr.pop();
          } else if (t === ')' || t === '}' || t === ']') {
            return 'Each parenthesis should be closed and different types of parentheses cannot interweave';
          }
        }

        if (leftArr.length === 0) {
          return true;
        } else {
          return 'Each parenthesis should be closed and different types of parentheses cannot interweave';
        }
      }
    }
  })
</script>
