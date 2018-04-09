<template>
  <div class="container">
    <h1 class="title">メーカーと車種を選択してください</h1>
    <div class="box">
      <div class="field">
        <label class="label">メーカー: {{ car.maker.name }} </label>
        <div class="control">
          <div class="select is-medium">
            <select v-model="car.maker.id" class="MakerSelectList" @change="setMaker">
              <option v-for="maker in makers" v-bind:value="maker.id">
                  {{ maker.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">車種: {{ car.model ? car.model.name : "" }}</label>
        <div class="control">
          <div class="select is-medium">
            <select v-model="car.model.id" class="CarModelSelectList" @change="setModel" >
              <option v-for="model in models" v-bind:value="model.id">
                  {{ model.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <button class="button is-info is-outlined" v-on:click="nextPage()" :disabled="!isValid">次へ</button>
    </div>
  </div>
</template>

// javascript
<script>
  import axios from 'axios';
  import { find } from "lodash";
  export default {
    data: function () {
      return {
        car: {
          maker: { name: "", id: null },
          model: { name: "", id: null },
        },
        makers: [],
        models: [],
      }
    },
    mounted: function() {
      this.fetchMakers();
    },
    methods: {
      setMaker: function() {
        let maker = find(this.makers, elm => ( elm.id === this.car.maker.id))
        if(maker) {
          this.car.maker.name = maker.name
          this.fetchModels()
        }
      },
      setModel: function() {
        let model = find(this.models, elm => ( elm.id === this.car.model.id))
        if(model) {
          this.car.model.name = model.name
        }
      },
      async fetchMakers () {
        const res = await axios.get(`../api/makers`)
        this.makers = res.data.makers;
      },
      async fetchModels () {
        const res = await axios.get(`../api/car_models/${this.car.maker.id}`)
        this.models = res.data.car_models;
      },
      nextPage: function() {
        //  console.log('clicked!!!');
        //  this.$store.commit('setCar', this.car);
        //  this.$router.push('/cars/new_price');
      },
    },
    computed: {
      isValid: function() {
        return this.car.maker.id && this.car.model.id
      },
    },
  }
</script>