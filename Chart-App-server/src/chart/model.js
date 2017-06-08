var mongoose = require('mongoose');

var chartSchema = new mongoose.Schema({
    xData: String,
    yData: Number,
    bColor: String,
    iconClass: String,
    title: String,
    height: Number,
    width: Number,
    maxY: Number,
    chartKey: String,


});

var mulptiChartId = new mongoose.Schema({
    charts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chartModel'
    }]
})

var chartModel = mongoose.model('chartModel', chartSchema)
var mulptiChartId = mongoose.model('multi_charts_obj', mulptiChartId)


module.exports = {
    chartSchema: chartModel,
    mulptiChartId: mulptiChartId
};