<script setup>
import { ref, shallowRef } from 'vue'
import { buildData } from './data'

const selected = ref()
const rows = ref([])

function add() {
  rows.value.push(...(buildData(1000)))
}

function remove(id) {
  rows.value.splice(
    rows.value.findIndex((d) => d.id === id),
    1
  )
}

function select(id) {
  selected.value = id
}

function run() {
    rows.value = buildData();
    selected.value = -1;
}

function update() {
    const arr = rows.value;
    const n = arr.length;
    for (let i = 0; i < n; i += 10) {
        arr[i].label += ' !!!';
    }
}

function runLots() {
    rows.value = buildData(10000);
    selected.value = -1
}

function clear() {
    rows.value = [];
    selected.value = -1;
}

function swapRows() {
    const arr = rows.value;
    if (arr.length > 998) {
        const d1 = arr[1];
        arr[1] = arr[998];
        arr[998] = d1;
    }
}
</script>

<template>
  <div class="jumbotron">
    <div class="row">
      <div class="col-md-6">
        <h1>Vue.js 3.5 (non-keyed)</h1>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-sm-6 smallpad">
            <button
              type="button"
              class="btn btn-primary btn-block"
              id="run"
              @click="run"
            >
              Create 1,000 rows
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button
              type="button"
              class="btn btn-primary btn-block"
              id="runlots"
              @click="runLots"
            >
              Create 10,000 rows
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button
              type="button"
              class="btn btn-primary btn-block"
              id="add"
              @click="add"
            >
              Append 1,000 rows
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button
              type="button"
              class="btn btn-primary btn-block"
              id="update"
              @click="update"
            >
              Update every 10th row
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button
              type="button"
              class="btn btn-primary btn-block"
              id="clear"
              @click="clear"
            >
              Clear
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button
              type="button"
              class="btn btn-primary btn-block"
              id="swaprows"
              @click="swapRows"
            >
              Swap Rows
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <table class="table table-hover table-striped test-data">
    <tbody>
      <tr
        v-for="{ id, label } of rows"
        :class="{ danger: id === selected }"
        :data-label="label"
        v-memo="[label, id === selected]"
      >
        <td class="col-md-1">{{ id }}</td>
        <td class="col-md-4">
          <a @click="select(id)">{{ label }}</a>
        </td>
        <td class="col-md-1">
          <a @click="remove(id)">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </a>
        </td>
        <td class="col-md-6"></td>
      </tr>
    </tbody>
  </table>
  <span
    class="preloadicon glyphicon glyphicon-remove"
    aria-hidden="true"
  ></span>
</template>
