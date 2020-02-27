'use strict';

let Note;

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
            let note = new Note(req.payload);
            let result = await note.save();
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
            let note = await Note.findByIdAndUpdate(req.params.id, req.payload, {new: true});
            return reply.response(note);
        } catch (err) {
            return reply.response(err).code(500);
        }
    }
};

Note = require('../models/note.model');
