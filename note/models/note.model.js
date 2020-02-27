const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    type: {
        type: String,
        enum: ['note', 'checkbox'],
        default: 'note'
    },
    text: [String]
});

module.exports = mongoose.model('Note', NoteSchema);
