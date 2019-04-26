import db from './db/db'
var getEmployeeNames = function() {
    return new Promise(function(resolve, reject) {
        db.connect.query(
            "SELECT * FROM users",
            function(err, rows) {
                if (rows === undefined) {
                    reject(new Error("Error rows is undefined"));
                } else {
                    resolve(rows);
                }
            }
        )
    })
}

var data = null
getEmployeeNames()
    .then(function(results) {
        data = results
        db.connect.end();
        // }
    })

.catch(function(err) {
    console.log("Promise rejection error: " + err);
})
const timeoutObj = setTimeout(() => {
    console.log(data)
}, 1500);