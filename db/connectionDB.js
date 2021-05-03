const sqlite = require("sqlite3");

module.exports = {
    init() {
        new sqlite.Database('Events.db', (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("Database connected succesfully");
        })
    }
}