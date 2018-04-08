import { mount } from '@vue/test-utils'
import NewCar from 'components/cars/new_car'

describe('NewCar.vue', () => {
  it('タイトルが表示できる', () => {
    const wrapper = mount(NewCar)

    const title = wrapper.find('.title')
    expect(title.html()).toContain('メーカーと車種を選択してください')
  })

  it('dataプロパティの値に応じてラベルが表示される', () => {
    const wrapper = mount(NewCar)

    // メーカー: トヨタが表示されていないこと
    expect(wrapper.html()).not.toContain('メーカー: トヨタ')

    let carData = {
      car: {
        maker: { name: "トヨタ", id: 1 },
        model: { name: "クラウン", id: 2 },
      }
    }
    // dataの操作
    wrapper.setData(carData)

    // dataが変更されていることを確認
    // wrapperにdataを参照するgetterは用意されていないので注意
    // https://github.com/vuejs/vue-test-utils/issues/16
    // dataを取得する場合はvmから行う
    expect(wrapper.vm.car).toEqual(carData.car)

    expect(wrapper.html()).toContain('メーカー: トヨタ')
  })
})