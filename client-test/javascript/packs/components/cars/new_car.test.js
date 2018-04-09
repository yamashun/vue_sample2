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

  it('メーカー、車種が選択されると次へボタンが活性化される', () => {
    const wrapper = mount(NewCar)

    const button = wrapper.find('button')

    // disabled属性が設定されていること
    expect(button.element.getAttribute('disabled')).toBe('disabled')
  
    // メーカーを設定する
    wrapper.setData({
      car: {
        maker: { name: "トヨタ", id: 1 },
        model: { name: "", id: null },
      }
    })

    // computedへの反映のさせ方は別のやり方がありそう。issueはv-modelの話だが関連してそう。
    // https://github.com/vuejs/vue-test-utils/issues/514
    // 一旦はissueにのっている $forceUpdate()を使って回避
    wrapper.vm.$forceUpdate()

    // メーカのみ設定されている場合はdisabled属性が設定されている
    expect(button.element.getAttribute('disabled')).toBe('disabled')

    wrapper.setData({
      car: {
        maker: { name: "トヨタ", id: 1 },
        model: { name: "クラウン", id: 2 },
      }
    })

    wrapper.vm.$forceUpdate()

    // disabled属性が外れていること
    expect(button.element.getAttribute('disabled')).toBe(null)
  })

  describe('nextPage', () => {
    let nextPageMock

    beforeEach(() => {
      nextPageMock = jest.fn()
    })

    it('活性化後にクリックするとnextPageが呼ばれる', () => {
      const wrapper = mount(NewCar)
      wrapper.setMethods({ nextPage: nextPageMock })

      const button = wrapper.find('button')

      wrapper.setData({
        car: {
          maker: { name: "トヨタ", id: 1 },
          model: { name: "クラウン", id: 2 },
        }
      })
      wrapper.vm.$forceUpdate()

      // クリック前に活性であること
      expect(button.element.getAttribute('disabled')).toBe(null)
      button.trigger('click')

      expect(nextPageMock).toHaveBeenCalled()
    })
    it('活性化前にクリックしてもnextPageは呼ばれない', () => {
      const wrapper = mount(NewCar)
      wrapper.setMethods({ nextPage: nextPageMock })

      const button = wrapper.find('button')

      // クリック前に非活性であること
      expect(button.element.getAttribute('disabled')).toBe('disabled')
      button.trigger('click')

      expect(nextPageMock).not.toHaveBeenCalled()
    })
  })
})