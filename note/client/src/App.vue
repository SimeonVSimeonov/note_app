<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col" v-for="note in notes">
          <div class="border border-info">
            <h3><span class="badge badge-warning">{{note.title}}</span></h3>
            <span>{{note.type}}</span>
            <hr>
            <span v-if="note.type === 'checkbox'">  </span>
            <ul v-for="checkNote in note.checkNotes" class="list-group">
              <li class="list-group-item" v-bind:class="{active: checkNote.isChecked}">{{checkNote.text}}</li>
            </ul>
            <h4 v-if="note.type === 'note'">{{note.text}}</h4>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'app',
    data() {
      return {
        input: {
          note: {
            title: '',
            type: '',
            text: '',
            checkNotes: [],
          }
        },
        notes: []
      }
    },

    mounted() {
      axios({method: "GET", url: "http://localhost:3000/"}).then(result => {
        this.notes = result.data;
      })
    },

    methods() {

    },


  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
