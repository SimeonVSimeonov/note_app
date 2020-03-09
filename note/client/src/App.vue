<template>
  <div id="app">
    <div class="container">
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
           aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Note</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
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
                    <input class="form-check-input" :value="checkNote.isChecked" v-model="checkNote.isChecked" type="checkbox" id="inlineFormCheck">
                    <input class="form-control" v-model="checkNote.text" placeholder="check note text"
                           aria-label="check note text">
                    <button class="btn btn-outline-secondary float-right" v-on:click="removeRow(index)" type="button">
                      remove check
                    </button>
                  </li>
                </ul>
                <button class="btn btn-outline-secondary float-right" v-on:click="addRow" type="button">add check
                </button>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" v-if="!isEdit" v-on:click="createNote()" class="btn btn-primary"
                      data-dismiss="modal">Add
              </button>
              <button type="submit" v-if="isEdit" v-on:click="updateNote(input.note._id)" class="btn btn-primary"
                      data-dismiss="modal">Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div>
        <button class="btn btn-outline-info btn-bg" data-toggle="modal" data-target="#exampleModal"
                v-on:click="newNote()">Add Note
        </button>
      </div>
      <br>
      <div class="row">
        <div class="col" v-for="(note, index) in notes">
          <div class="border border-info rounded bg-light">
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
                <button class="btn btn-outline-warning btn-sm" data-toggle="modal" data-target="#exampleModal"
                        @click="findNote(note._id)">edit
                </button>
                <span style="width:0.5em;"></span>
                <button class="btn btn-outline-danger btn-sm" @click="deleteNote(note._id, index)">delete</button>
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
            id: '',
            title: '',
            type: '',
            text: '',
            checkNotes: [],
          }
        },
        notes: [],
        isEdit: false,
      }
    },

    mounted() {
      axios({method: "GET", url: "http://localhost:3000/"}).then(result => {
        this.notes = result.data;
      })
    },

    methods: {
      findNote(id) {
        axios({
          method: "GET",
          url: `http://localhost:3000/notes/${id}`
        }).then(result => {
          this.isEdit = true;
          this.input.note._id = result.data._id;
          this.input.note.title = result.data.title;
          this.input.note.type = result.data.type;
          this.input.note.text = result.data.text;
          this.input.note.checkNotes = result.data.checkNotes;
        })
      },
      updateNote(id) {
        axios.put(`http://localhost:3000/notes/${id}`, this.input.note, {'headers': {'Content-Type': 'application/json'}})
          .then(result => {
            let note = this.notes.find(x => x._id === id);
            let idx = this.notes.indexOf(note);
            this.notes.splice(idx, 1, result.data)
          });
      },
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
      deleteNote(id, index) {
        axios({
          method: "DELETE",
          url: `http://localhost:3000/notes/${id}`
        }).then(() => this.notes.splice(index, 1))
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
      },
      newNote: function () {
        this.isEdit = false;
        this.input.note.title = '';
        this.input.note.type = '';
        this.input.note.text = '';
        this.input.note.checkNotes = [];
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
