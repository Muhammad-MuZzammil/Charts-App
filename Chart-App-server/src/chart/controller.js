var express = require("express");
var chartModel = require('./model');


var controller = {
    getChart_Values: (function (req, res) {

        var chartResult;
        //  Find  All Single Chart
        chartModel.chartSchema.find({ chartKey: 'Single Chart' }, function (err, singleChartsResult) {
            if (err)
                res.status(500).send(err);
            else
                chartResult = {
                    singleCharts: singleChartsResult
                }
            chartModel.mulptiChartId.find({})
                .populate('charts')
                .exec(function (err, multiChartsResult) {
                    if (err)
                        res.status(500).send(err);
                    else
                        console.log('multiChartsResult', multiChartsResult);
                    chartResult.multiCharts = multiChartsResult;
                    res.json(chartResult);
                })
        });
    }),

    postChart_Data: (function (req, res) {
        console.log('req.body', req.body)
        var singleChartObj = req.body;  // declare this variable to store single chart object data 
        singleChartObj.chartKey = 'Single Chart' // add one more property 'chartKey'  in singleCharObj  
        var chartObj = new chartModel.chartSchema(singleChartObj) // create instance to save data in mongoose
        chartObj.save() // save method will call to save data in database
        res.status(201).send(chartObj); // send response to client after save data 
    }),
    // Post Multiple Dimension Char Data Request
postMultipleChart_Data:(function (req, res) {
    var multiCharts = req.body; // declare multi chare variable to store array [{chart1 obj} , ..]

    var getMultiChartsID = [] // collection of multiple charts ID

    for (var i = 0; i < multiCharts.length; i++) { //

        multiCharts[i].chartKey = 'Multi Chart'; // add property in multiChart obj 

        var multipleChartObj = new chartModel.chartSchema(multiCharts[i])
        multipleChartObj.save(

            function (err, save) {

                if (save) {
                    getMultiChartsID.push(save._doc._id) // push multiple charts ID in Array to store

                    var multChartIndex = multiCharts.length; // assign multiCharts objects length
                    var saveMultiChartsID = {
                        charts: getMultiChartsID
                    }
                    if (getMultiChartsID.length == multChartIndex) { // checking getMultiChartsID length  to save the id of nested charts in one card

                        var multChartObj = new chartModel.mulptiChartId(saveMultiChartsID);
                        multChartObj.save(function (err, suc) {
                            if (suc)
                                console.log(suc);
                            else
                                console.log(err);
                        })
                    }
                }

                else
                    console.log(err);
            }

        )
        res.status(200).send(multipleChartObj)

    }

}),

share_chart:(function (req, res) {
    // var id = req.params;
    var id = new mongoose.Types.ObjectId(req.params.id);
    console.log('req.params', req.params);
    chartModel.chartSchema.findById(id, function (err, singleChart) {
        if (err) {
            console.log('Error 404', err)
        }
        else
            console.log('singleChart', singleChart)
        res.render('./view', { wrapper: singleChart })
    })

})
}
module.exports= controller;