'use strict';

var Note;
const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');

exports.plugin = {
    name: 'routes-notes',
    register: async function (server, options) {

        server.route({
            method: 'GET',
            path: '/',
            handler: async (req, reply) => {
                try {
                    let notes = await Note.find().exec();
                    return reply.response(notes);
                } catch (err) {
                    return reply.response(err).code(500);
                }
            }
        });

        server.route({
            method: 'GET',
            path: '/notes/{id}',
            handler: async (req, reply) => {
                try {
                    let note = await Note.findById(req.params.id).exec();
                    return reply.response(note);
                } catch (err) {
                    return reply.response(err).code(500);
                }
            }
        });

        server.route({
            method: "POST",
            path: '/notes',
            handler: async (req, reply) => {
                try {
                    let note = new Note(req.payload);
                    let result = await note.save();
                    return reply.response(result);
                } catch (err) {
                    return reply.response(err).code(500);
                }
            }
        });

        server.route({
            method: "DELETE",
            path: '/notes/{id}',
            handler: async (req, reply) => {
                try {
                    let note = await Note.findByIdAndDelete(req.params.id);
                    return reply.response(note);
                } catch (err) {
                    return reply.response(err).code(500);
                }
            }
        });

        server.route({
            method: "PUT",
            path: '/notes/{id}',
            handler: async (req, reply) => {
                try {
                    let note = await Note.findByIdAndUpdate(req.params.id, req.payload, {new: true});
                    return reply.response(note);
                } catch (err) {
                    return reply.response(err).code(500);
                }
            }
        });
    }
};

Note = require('../models/note.model');
