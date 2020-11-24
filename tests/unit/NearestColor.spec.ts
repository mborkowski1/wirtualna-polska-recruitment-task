import {createLocalVue, mount, Wrapper} from "@vue/test-utils";
import NearestColor from "@/views/NearestColor.vue";
import Vuetify from 'vuetify';

describe('NearestColor.vue', () => {
  const localVue = createLocalVue();
  let vuetify;
  let wrapper: Wrapper<any>;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(NearestColor, {
      localVue,
      vuetify
    });
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('validate required base color', () => {
    const baseColorValid = '#FF00FF';
    const baseColorInvalid = '';
    expect(wrapper.vm.$data.baseColorRules[0](baseColorValid)).toBe(true);
    expect(wrapper.vm.$data.baseColorRules[0](baseColorInvalid)).toBe('Base color is required');
  });

  it('validate required colors list', () => {
    const colorsListValid = '#FF00FF,#FFFF00';
    const colorsListInvalid = '';
    expect(wrapper.vm.$data.colorsRequiredRule(colorsListValid)).toBe(true);
    expect(wrapper.vm.$data.colorsRequiredRule(colorsListInvalid)).toBe('Colors list is required');
  });

  it('validate hex format base color', () => {
    const baseColorValid = '#FF00FF';
    const baseColorInvalid = '#FF00';
    expect(wrapper.vm.$data.baseColorRules[1](baseColorValid)).toBe(true);
    expect(wrapper.vm.$data.baseColorRules[1](baseColorInvalid)).toBe('Base color should be in hex format');
  });

  it('validate hex format colors list', () => {
    const colorsListValid = '#FFFF00,#AABBCC,#FF00FF';
    const colorsListInvalid = '#FF00FF,#FF67K5, #FFFF00';
    expect(wrapper.vm.checkHexColorFormat(colorsListValid)).toBe(true);
    expect(wrapper.vm.checkHexColorFormat(colorsListInvalid)).toBe('Colors list should be in hex format separated by commas');
  });

  it('find nearest color', async () => {
    const findColor = jest.spyOn(wrapper.vm, 'findColor');
    const findColorButton = wrapper.find('#findColorButton');
    await wrapper.find('#baseColorInput').setValue('#FF00FF');
    await wrapper.find('#colorsTextarea').setValue('#BBAA33,#CCDD44,#FFFF00');
    await wrapper.vm.$nextTick();
    await findColorButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(findColor).toHaveBeenCalled();
    expect(wrapper.vm.$data.nearestColor.length).toBeTruthy();
  });
});
