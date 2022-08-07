const express = require("express");
const port = process.env.port || 3000;
const app = express();
app.use(express.json());
let initial_location = "";
let current_location = "";
let obstacles = []
app.post("/api/initialise_location/", (req, res) => {
    initial_location = req.body;
    current_location = initial_location;
    res.send({current_location});
});
app.post("/api/add_obstacle/", (req, res) => {
    obstacles.push(req.body.points);
    res.send({obstacles});
}); 
app.post("/api/command/", (req, res) => {
    var response = "sucess";
    let command = req.body.command;
    command = command.split('');
    let safeArea = true;
    command.forEach(element => {
        if (element === "F" || element === "f") {
            if (current_location.direction === "N") {
                obstacles.forEach(obstacle => {
                    if (inside(current_location.x, current_location.y + 1, obstacle)) {
                        safeArea = false;
                    }
                })
                if (!safeArea) {
                    response="sorry you had touched an obstacle :(";
                }
                 else {
                    current_location.y += 1;
                }
            } else if (current_location.direction === "S") {
                obstacles.forEach(obstacle => {

                    if (inside(current_location.x, current_location.y - 1, obstacle)) {
                        safeArea = false;
                    }
                })
                if (!safeArea) {
                    response="sorry you had touched an obstacle :(";
                } else {
                    current_location.y -= 1;
                }
            } else if (current_location.direction === "W") {
                obstacles.forEach(obstacle => {

                    if (inside(current_location.x - 1, current_location.y, obstacle)) {
                        safeArea = false;
                    }
                })
                if (!safeArea) {
                    response="sorry you had touched an obstacle :(";
                } else {
                    current_location.x -= 1;
                }
            } else if (current_location.direction === "E") {
                obstacles.forEach(obstacle => {

                    if (inside(current_location.x + 1, current_location.y, obstacle)) {
                        safeArea = false;
                    }
                })
                if (!safeArea) {
                    response="sorry you had touched an obstacle :(";
                } else {
                    current_location.x += 1;
                }
            }
        } else if (element === "B" || element === "b") {
            if (current_location.direction === "N") {
                obstacles.forEach(obstacle => {

                    if (inside(current_location.x, current_location.y - 1, obstacle)) {
                        safeArea = false;
                    }
                })
                if (!safeArea) {
                    response="sorry you had touched an obstacle :(";
                } else {
                    current_location.y -= 1;
                }
            } else if (current_location.direction === "S") {
                obstacles.forEach(obstacle => {

                    if (inside(current_location.x, current_location.y + 1, obstacle)) {
                        safeArea = false;
                    }
                })
                if (!safeArea) {
                    response="sorry you had touched an obstacle :(";
                } else {
                    current_location.y += 1;
                }
            } else if (current_location.direction === "W") {
                obstacles.forEach(obstacle => {

                    if (inside(current_location.x + 1, current_location.y, obstacle)) {
                        safeArea = false;
                    }
                })
                if (!safeArea) {
                    response="sorry you had touched an obstacle :(";
                } else {
                    current_location.x += 1;
                }
            } else if (current_location.direction === "E") {
                obstacles.forEach(obstacle => {

                    if (inside(current_location.x - 1, current_location.y, obstacle)) {
                        safeArea = false;
                    }
                })
                if (!safeArea) {
                    response="sorry you had touched an obstacle :(";
                } else {
                    current_location.x -= 1;
                }
            }
        } else if (element === "L" || element === "l") {
            if (current_location.direction === "N") {
                current_location.direction = "W";
            } else if (current_location.direction === "S") {
                current_location.direction = "E";
            } else if (current_location.direction === "W") {
                current_location.direction = "S";
            } else if (current_location.direction === "E") {
                current_location.direction = "N";
            }
        } else if (element === "R" || element === "r") {
            if (current_location.direction === "N") {
                current_location.direction = "E";
            } else if (current_location.direction === "S") {
                current_location.direction = "W";
            } else if (current_location.direction === "W") {
                current_location.direction = "N";
            } else if (current_location.direction === "E") {
                current_location.direction = "S";
            }
        }
    })
    res.send({"message":response,"current_location":current_location});
});
app.get("/api/current_location/", (req, res) => {
    res.send({current_location});
});
app.listen(port, () => {
    console.log(`Listening to ${port}....`);
});
function inside(x, y, vs) {
    let inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0], yi = vs[i][1];
        let xj = vs[j][0], yj = vs[j][1];
        let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}