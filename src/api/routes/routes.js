import 'dotenv/config';

module.exports = (app) => {
    const include = require('./include')

    // ***********************************************************************
    // Get all Courses
    app.get('/', (req, res) => {
        include.all_courses.getCourses(function(data) { res.json(data) });
    });

    //Get course by ID
    app.get('/course/:id', (req, res) => {
        include.all_courses.getCourseByID(req.params.id, function(data) { res.json(data) });
    });

    // ***********************************************************************

    //Get Starters
    app.get('/starters', (req, res) => {
        include.starters.starterCourses(function(data) { res.json(data) });
    });


    // ***********************************************************************

    //Get Main Courses
    app.get('/main', (req, res) => {
        include.main_courses.mainCourses(function(data) { res.json(data) });
    });



    // ***********************************************************************

    //Get vegan Courses
    app.get('/veg_courses', (req, res) => {
        include.veg_courses.vegCourses(function(data) { res.json(data) });
    });



    // ***********************************************************************

    //Get non-vegan Courses
    app.get('/non_vecourses', (req, res) => {
        include.non_veg_courses.non_vegCourses(function(data) { res.json(data) });
    });


    // ***********************************************************************

    //Get Desserte Courses
    app.get('/desserts', (req, res) => {
        include.dessert.desserts(function(data) { res.json(data) });

    });


    // ***********************************************************************

    //Get Refreshments Courses
    app.get('/refreshments', (req, res) => {
        include.refreshment.refreshments(function(data) { res.json(data) });
    });




    // ***********************************************************************
    // Get All Stock
    app.get('/stock', (req, res) => {
        include.stock.getStock(function(data) { res.json(data) });
    })


    // GET STOCK BY ID
    app.get('/stock/:id', (req, res) => {
        include.stock.getStockByID(req.params.id, function(data) { res.json(data) });
    })


    // ***********************************************************************
    // ALL ORDERS 
    app.get('/orders', (req, res) => {
        include.order.getOrders(function(data) { res.json(data) });
    })


    // Get  OrderByID

    app.get('/orders/:id', (req, res) => {
        include.order.orderByID(req.params.id, function(data) { res.json(data) });
    })



    app.get('/customer/orders/:id', (req, res) => {
        include.customer.customerByID(req.params.id, function(data) { res.json(data) });
    })

}