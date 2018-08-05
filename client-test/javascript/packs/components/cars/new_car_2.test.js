import { mount } from '@vue/test-utils'
import NewCar from 'components/cars/new_car'
import { makersResponse, modelsResponse } from '../../../test-helpers/mock/car_new'
import flushPromises from 'flush-promises'
import axios from "axios";

jest.mock("axios");

describe('NewCar.vue', () => {
  it('mounted処理でメーカーを取得すること', async () => {
    // mountedで呼ぶメーカーapiのモック
    axios.get.mockImplementation(() => Promise.resolve(makersResponse))

    const wrapper = mount(NewCar)
    await flushPromises()

    expect(wrapper.vm.makers).toBe(makersResponse.data.makers)
  })

  it('メーカーを選択すると車種を取得する', async () => {
    // mountedで呼ぶメーカーapiのモック
    axios.get.mockImplementation(() => Promise.resolve(makersResponse))

    const wrapper = mount(NewCar)
    await flushPromises()

    // メーカー選択で呼ぶ車種apiのモック
    axios.get.mockImplementation(() => Promise.resolve(modelsResponse))
    // メーカーのプルダウンを選択
    const options = wrapper.find('.MakerSelectList').findAll('option')
    options.at(1).element.selected = true
    wrapper.find('.MakerSelectList').trigger('change')
    await flushPromises()
  
    expect(wrapper.vm.models).toBe(modelsResponse.data.car_models)
  });

  it('メーカーを選択すると車種を取得する(mockImplementationOnce)', async () => {
    axios.get
      .mockImplementationOnce(() => Promise.resolve(makersResponse))
      .mockImplementationOnce(() => Promise.resolve(modelsResponse))

    const wrapper = mount(NewCar)
    await flushPromises()

    const options = wrapper.find('.MakerSelectList').findAll('option')
    options.at(1).element.selected = true
    wrapper.find('.MakerSelectList').trigger('change')
    await flushPromises()

    expect(wrapper.vm.models).toBe(modelsResponse.data.car_models)
  })
})