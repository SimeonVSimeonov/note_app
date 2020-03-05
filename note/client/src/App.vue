<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col text-center">
          <form>
            <div class="form-group">
              <label for="title" class="font-weight-bold">Title</label>
              <input type="text" v-model="input.note.title" required class="form-control" id="title"
                     placeholder="title for note">
            </div>
            <div class="form-group">
              <label for="type" class="font-weight-bold">Type</label>
              <select class="form-control" v-model="input.note.type" required id="type">
                <option value="note">note</option>
                <option value="checkbox">check box</option>
              </select>
            </div>
            <div v-show="shownType('note')" class="form-group">
              <label for="noteText">note text</label>
              <textarea v-model="input.note.text" class="form-control" id="noteText" rows="3"></textarea>
            </div>
            <div v-show="shownType('checkbox')">
              <ul class="input-group">
                <li class="input-group" v-for="(checkNote, index) in input.note.checkNotes">
                  <input class="form-control" id="checkNote" v-model="checkNote.text" placeholder="check note text"
                         aria-label="check note text">
                  <button class="btn btn-outline-secondary float-right" v-on:click="removeRow(index)" type="button">
                    remove check
                  </button>
                </li>
              </ul>
              <button class="btn btn-outline-secondary float-right" v-on:click="addRow" type="button">add check</button>
            </div>
            <br>
            <button type="submit" v-on:click="createNote()" class="btn btn-primary">Add Note</button>
          </form>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col" v-for="note in notes">
          <div class="border border-info">
            <h3><span class="badge badge-warning">{{note.title}}</span></h3>
            <span>{{note.type}}</span>
            <hr>
            <span v-if="note.type === 'checkbox'"></span>
            <div class="container">
              <ul v-for="checkNote in note.checkNotes" class="list-group">
                <li class="list-group-item" v-bind:class="{active: checkNote.isChecked}">{{checkNote.text}}</li>
                <br>
              </ul>
            </div>
            <div class="container">
              <h4 v-if="note.type === 'note'">{{note.text}}</h4>
              <br>
              <div class="btn-toolbar float-right">
                <button class="btn btn-outline-warning btn-sm">edit</button>
                <span style="width:0.5em;"></span>
                <button class="btn btn-outline-danger btn-sm">delete</button>
              </div>
              <br>
            </div>
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
        notes: [],
      }
    },

    mounted() {
      axios({method: "GET", url: "http://localhost:3000/"}).then(result => {
        this.notes = result.data;
      })
    },

    methods: {
      createNote() {
        axios({
          method: "POST",
          url: "http://localhost:3000/notes",
          data: this.input.note,
          headers: {"content-type": "application/json"}
        }).then(result => {
          this.notes.push(result.data);
          this.input.note.title = '';
          this.input.note.type = '';
          this.input.note.text = '';
          this.input.note.checkNotes = [];
        })
      },
      shownType: function (value) {
        return this.input.note.type === value;
      },
      addRow: function () {
        this.input.note.checkNotes.push({
          text: '',
        })
      },
      removeRow: function (index) {
        this.input.note.checkNotes.splice(index, 1)
      }
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
