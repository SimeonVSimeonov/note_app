'use strict';

let Note;
let NoteController;

exports.plugin = {
    name: 'routes-notes',
    register: async function (server, options) {

        server.route({
            method: 'GET',
            path: '/',
            handler: NoteController.findAll
        });

        server.route({
            method: 'GET',
            path: '/notes/{id}',
            handler: NoteController.findOne
        });

        server.route({
            method: "POST",
            path: '/notes',
            handler: NoteController.createNote
        });

        server.route({
            method: "DELETE",
            path: '/notes/{id}',
            handler: NoteController.deleteNote
        });

        server.route({
            method: "PUT",
            path: '/notes/{id}',
            handler: NoteController.editNote
        });
    }
};

Note = require('../models/note.model');
NoteController = require('../controllers/note.controller');
