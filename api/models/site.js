const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    origin: { type: String, required: true },
    generalResult: { type: String, required: false},
    timeToFirstPaint: { type: Object, required: false },
    domSize: { type: Object, required: false}
});

module.exports = mongoose.model('Site', siteSchema);