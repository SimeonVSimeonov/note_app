'use strict';

let Note;

function createNoteDto(vm) {
    switch (vm.type) {
        case 'note':
            return new Note({
                title: vm.title,
                type: vm.type,
                text: vm.text,
                checkNotes: null
            });

        case 'checkbox':
            return new Note({
                title: vm.title,
                type: vm.type,
                checkNotes: vm.checkNotes,
                text: null
            });
    }
}

module.exports = {
    async findAll(req, reply) {
        try {
            let notes = await Note.find().exec();
            return reply.response(notes);
        } catch (err) {
            return reply.response(err).code(500);
        }
    },

    async findOne(req, reply) {
        try {
            let note = await Note.findById(req.params.id).exec();
            return reply.response(note);
        } catch (err) {
            return reply.response(err).code(500);
        }
    },


    async createNote(req, reply) {
        try {
            let noteDto = createNoteDto(req.payload);
            let result = await noteDto.save();
            return reply.response(result);
        } catch (err) {
            return reply.response(err).code(500);
        }
    },

    async deleteNote(req, reply) {
        try {
            let note = await Note.findByIdAndDelete(req.params.id);
            return reply.response(note);
        } catch (err) {
            return reply.response(err).code(500);
        }
    },

    async editNote(req, reply) {
        try {
            let noteDto = createNoteDto(req.payload);
            noteDto._id = req.params.id;
            let result = await Note.findByIdAndUpdate(req.params.id, noteDto, {new: true, runValidators: true});
            return reply.response(result);
        } catch (err) {
            return reply.response(err).code(500);
        }
    }
};

Note = require('../models/note.model');
