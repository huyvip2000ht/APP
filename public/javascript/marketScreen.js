// const db = require('./../../Database/database')
// var GameDataBase = db.get("Game").find({ id: 1 }).value();
// var GameData = GameDataBase.GameData;
var box_coin = [];
var part = 0;
var position_coinInBox = [{ left: 30, top: 270 }, { left: 260, top: 270 }, { left: 30, top: 450 }, { left: 130, top: 270 }, { left: 130, top: 350 }, { left: 130, top: 440 }, { left: 30, top: 350 }, { left: 230, top: 350 }, { left: 230, top: 450 }]

var GameData = [{
            coins: [{ number: 1, left: 30, top: 270 }, { number: 7, left: 30, top: 450 },
                { number: 5, left: 130, top: 250 }, { number: 6, left: 130, top: 450 },
                { number: 3, left: 230, top: 450 }, { number: 4, left: 30, top: 350 }
            ],
            product: "lollipop"
        },
        {
            coins: [{ number: 1, left: 30, top: 270 }, { number: 9, left: 30, top: 450 },
                { number: 4, left: 130, top: 270 }, { number: 7, left: 130, top: 350 },
                { number: 3, left: 230, top: 450 }
            ],
            product: "Ice-Cream"
        },
        {
            coins: [{ number: 1, left: 30, top: 270 }, { number: 5, left: 30, top: 450 },
                { number: 6, left: 130, top: 270 }, { number: 2, left: 230, top: 360 }, { number: 9, left: 350, top: 350 },
                { number: 3, left: 230, top: 450 }, { number: 4, left: 30, top: 350 }
            ],
            product: "lollipop"
        },
        {
            coins: [{ number: 5, left: 30, top: 270 }, { number: 3, left: 30, top: 450 },
                { number: 6, left: 130, top: 270 }, { number: 4, left: 270, top: 350 },
                { number: 9, left: 130, top: 450 }
            ],
            product: "Ice-Cream"
        },
        {
            coins: [{ number: 1, left: 30, top: 270 }, { number: 5, left: 30, top: 450 },
                { number: 6, left: 130, top: 270 }, { number: 9, left: 130, top: 450 },
                { number: 3, left: 230, top: 450 }, { number: 4, left: 30, top: 350 }
            ],
            product: "Ice-Cream"
        }
    ]
    // var GameData = [];
var coin = []
var productName;

function loadGame() {
    loadData();
    loadDb();
}

function loadDb() {
    loadCoin();
    loadProduct();
    SetupDragCoin();
    SetUpButtonEvent();
}
/* Load Coin when you join game or next game*/
function loadData() {
    // GameData = Data;
    coin = GameData[part].coins;
    productName = GameData[part].product;
}

function loadCoin() {
    var parents = document.getElementById("drop-coin");

    for (var i = 0; i < coin.length; i++) {
        var tag = document.createElement("div");
        tag.classList.add("coin", "coin-" + coin[i].number);
        tag.id = i + 1;
        tag.style.top = coin[i].top + "px";
        tag.style.left = coin[i].left + "px";
        parents.appendChild(tag);
    }
}

function loadProduct() {
    var product = document.getElementById("product");
    var tag = document.createElement("img");
    tag.src = "./../../public/image/Game-2/" + productName + ".png";
    tag.id = "thing";
    tag.draggable = false;
    tag.className = "product-img"
    product.appendChild(tag);

    var productNameTag = document.getElementById("nameProduct");
    productNameTag.innerHTML = productName;
}

/* Set up drag and drop coin*/
function SetupDragCoin() {
    for (var i = 1; i < 10; i++) {
        var tag = document.getElementById(i.toString());

        if (tag == null) continue;
        else {
            dragElement(tag);
        }
    }

    function dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        var id_str = elmnt.id;
        var id = parseInt(id_str);
        var top_elm = tag.offsetTop;
        var left_elm = tag.offsetLeft;

        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            dragCoinToBgFrame(elmnt.offsetLeft, elmnt.offsetTop);
            elmnt.style.zIndex = '10';
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
            addCoinIntoFrameBox(elmnt.offsetLeft, elmnt.offsetTop, id);
            setSlotForCoin(elmnt, elmnt.offsetTop, elmnt.offsetLeft, top_elm, left_elm, id);
            elmnt.style.zIndex = '8';
        }
    }

    function dragCoinToBgFrame(left, top) {
        var frame = document.getElementById("drop");
        if (left >= frame.offsetLeft && left <= frame.offsetWidth + frame.offsetLeft &&
            top >= frame.offsetTop && top <= frame.offsetTop + frame.offsetHeight) {
            document.getElementById("drop-bg").style.backgroundColor = "red";
            document.getElementById("drop-bg").style.opacity = "0.5";
        } else {
            document.getElementById("drop-bg").style.backgroundColor = "";
            document.getElementById("drop-bg").style.opacity = "100%"
        }
    }
}

function addCoinIntoFrameBox(left, top, id) {
    var frame = document.getElementById("drop");
    var value = coin[id - 1].number;
    if (checkCollision(top, left, frame)) {
        if (box_coin == null) box_coin.push(id);
        else {
            var found = box_coin.findIndex(function(number) {
                return number == value;
            });
            if (found == -1) {
                box_coin.push(value);
            }
        }
    } else {
        var found = box_coin.findIndex(function(number) {
            return number == value;
        });
        if (found != -1) {
            box_coin.splice(found, 1);
        }
    }
    console.log("box" + box_coin)
}

function setSlotForCoin(element, top, left, top_elm, left_elm, id) {
    var frame = document.getElementById("drop");
    var value = coin[id - 1].number - 1;
    if (checkCollision(top, left, frame)) {
        myMove(element, position_coinInBox[value].top, position_coinInBox[value].left + frame.offsetLeft);
    } else {
        myMove(element, top_elm, left_elm);
    }
}

/* Set up Button Buy Event*/
function SetUpButtonEvent() {
    var buttonBuy = document.getElementById("myBtn");
    buttonBuy.onmouseup = ButtonOnMouseUp;
    buttonBuy.onmousedown = ButtonOnMouseDown;
    buttonBuy.onmouseover = ButtonOnOver;
    buttonBuy.onmouseleave = ButtonOnMouseUp;

    function ButtonOnMouseDown() {
        var tag = document.getElementById("myBtn");
        var result = 10;
        var sum = sumBoxCoin();
        var flag;
        if (box_coin.length == 0 || (sum != result && sum != 0)) flag = 404;
        if (sum == result) flag = 200;
        switch (flag) {
            case 404:
                tag.style.backgroundPosition = "0 -118px";
                MoveFirstPosition();
                break;
            case 200:
                tag.style.backgroundPosition = "0 -177px";
                document.getElementById("paid").style.opacity = "80%";
                window.setTimeout(moveBoxDrop, 2000);
                window.setTimeout(nextGame, 2500);
                RemoveDataTurnGame();
                break;
            default:
        }
    }

    function ButtonOnMouseUp() {
        var tag = document.getElementById("myBtn");
        tag.style.backgroundPosition = "0 0";
    }

    function ButtonOnOver() {
        var tag = document.getElementById("myBtn");
        tag.style.backgroundPosition = " 0 -59px";
    }
}
/* Add coin to Frame box when coin Drop to Frame Box */

/* setup Move coin */
function myMove(elem, top, left) {
    var pos_top = elem.offsetTop;
    var pos_left = elem.offsetLeft;
    var value_top = Math.abs(top - pos_top);
    var value_left = Math.abs(left - pos_left);
    var id = setInterval(frame, 5);

    function frame() {
        if (pos_top == top && pos_left == left) {
            clearInterval(id);
        } else {
            if (pos_top < top) {
                pos_top += value_top / 100;
            }
            if (pos_top > top) {
                pos_top -= value_top / 100;
            }
            if (pos_left < left) {
                pos_left += value_left / 100;
            }
            if (pos_left > left) {
                pos_left -= value_left / 100;
            }
            if (pos_left > left - value_left / 100 && pos_left < left + value_left / 100) pos_left = left;
            if (pos_top > top - value_top / 100 && pos_top < top + value_top / 100) pos_top = top;
            elem.style.top = pos_top + "px";
            elem.style.left = pos_left + "px";
        }
    }
}

function MoveFirstPosition() {
    for (var i = 0; i < box_coin.length; i++) {
        var value = box_coin[i];
        var found = coin.findIndex(function(obj) { return obj.number == value; });
        var tag = document.getElementById(found + 1)
        myMove(tag, coin[found].top, coin[found].left);
    }
    box_coin = []
}

/* check Result*/
function sumBoxCoin() {
    var sum = 0;
    box_coin.forEach(element =>
        sum += element
    )
    return sum;
}
/* Set up next Game when you win */
function nextGame() {
    document.getElementById("paid").style.opacity = "0%";
    box_coin = [];
    part++;
    if (part >= coin.length) part = 0;

    coin = GameData[part].coins;
    productName = GameData[part].product;
    window.setTimeout(loadDb, 1000);
}
// Animation when next Game
function animationWhenWin(elem, top) {
    var pos_top = elem.offsetTop;
    var value_top = 3;
    var id = setInterval(frame, 1);

    function frame() {
        if (pos_top == top) {
            elem.style.top = 0 + "px";
            clearInterval(id);
        } else {
            pos_top += value_top;
            if (pos_top > top - value_top && pos_top < top + value_top) pos_top = top;
            elem.style.top = pos_top + "px";
        }
    }
}

function RemoveDataTurnGame() {
    var tag = document.getElementById("drop-coin")
    tag.innerHTML = ""

    var product = document.getElementById("product");
    product.removeChild(thing)

    var task = document.getElementById("task-" + (part + 1));
    task.style.backgroundColor = "green";
}

function moveBoxDrop() {
    var drop = document.getElementById('drop');
    var product = document.getElementById("product")
    animationWhenWin(drop, 600);
    animationWhenWin(product, 600)
}
// Check Collision
function checkCollision(top, left, frame) {
    return (left >= frame.offsetLeft && left <= frame.offsetWidth + frame.offsetLeft &&
        top >= frame.offsetTop && top <= frame.offsetTop + frame.offsetHeight)
}