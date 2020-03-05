const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['note', 'checkbox'],
        required: true
    },
    text: {
        type: String,
        default: null
    },
    checkNotes: {
        type: [{
            text: String,
            isChecked: {type: Boolean, default: false}
        }],
        default: undefined
    }
});

module.exports = mongoose.model('Note', NoteSchema);
