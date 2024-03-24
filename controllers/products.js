const product = require("../models/product");

const getAllProducts = async (req, res) => {

    const { brand, name, featured, sort, select } = req.query;
    const queryObject = {}

    if (brand) {
        queryObject.brand = brand;
    }

    if (featured) {
        queryObject.featured = featured;
    }

    if (name) {
        // queryObject.name = name;
        queryObject.name = { $regex: name, $options: 'i' };//case senstivity
    }


    // console.log(queryObject.name);

    // 1. normal find//
    // const myData = await product.find({})

    //2. req query to enable search using specific category// 
    // const myData = await product.find(req.query)

    // 3. hardcode sorting
    // const myData = await product.find(queryObject).sort("-name")
    // const myData = await product.find(queryObject).sort("price")//normal for asscending & - for descending

    // 4. to enable sort & select only if we use "sort" & "select" method // "sort=price,name", "select=name,price"

    let apiData = product.find(queryObject);
    if (sort) {
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }
    if (select) {
        let selectFix = select.replace(",", " ");
        apiData = apiData.select(selectFix);
    }


    // 5. pagination - adding limit to pages // "page=2&limit=2"
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 3; // limit 3 per page so we gotta skip 3 elements

    let skip = (page - 1) * limit; // will skip previous "limit i.e 3" and will show next 3.
    apiData = apiData.skip(skip).limit(limit);// to change the value for page and limit

    const myData = await apiData; // always at end to receive data

    // res.status(200).json({ msg: "I am getAllProducts" })
    // res.status(200).json({ myData })
    res.status(200).json({ myData, length: myData.length }) //adds a total length
    console.log(req.query)
}


const getAllProductsTesting = async (req, res) => {
    res.status(200).json({ msg: "I am getAllProductsTesting" })
}

module.exports = { getAllProducts, getAllProductsTesting };