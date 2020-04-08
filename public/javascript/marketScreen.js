var box_coin = [];
var coins = [
    [1, 2, 5, 6, 8, 9, 3, 4, 7],
    [6, 8, 9, 3, 4, 7],
    [1, 2, 5, 6, 8, 9, 3, 4, 7]
];
var part = 0;
var products = ["lollipop", "Ice-Cream", "lollipop"];
var position_coinInBox = [
    { left: 30, top: 240 },
    { left: 260, top: 240 },
    { left: 30, top: 420 },
    { left: 130, top: 240 },
    { left: 130, top: 320 },
    { left: 130, top: 420 },
    { left: 30, top: 320 },
    { left: 230, top: 320 },
    { left: 230, top: 420 }
]
var position_coin = [
    { top: 400, left: 200 },
    { top: 300, left: 200 },
    { top: 400, left: 300 },
    { top: 400, left: 100 },
    { top: 300, left: 100 },
    { top: 200, left: 200 },
    { top: 200, left: 300 },
    { top: 300, left: 300 },
    { top: 200, left: 100 }
]

function loadDb() {
    loadCoin();
    loadProduct();
    SetupDragCoin();
    SetUpButtonEvent();
}
/* Load Coin when you join game or next game*/
function loadCoin() {
    var parents = document.getElementById("drop-coin");
    coin = coins[part];
    for (var i = 0; i < coin.length; i++) {
        var tag = document.createElement("div");
        tag.classList.add("coin");
        tag.classList.add("coin-" + coin[i]);
        tag.id = coin[i];
        parents.appendChild(tag);
    }
}

function loadProduct() {
    var product = document.getElementById("product");
    var tag = document.createElement("img");
    tag.src = "./../../public/image/Game-2/" + products[part] + ".png";
    tag.id = "thing";
    tag.draggable = false;
    tag.style.position = "absolute";
    tag.style.left = "200px";
    tag.style.top = "50px";
    product.appendChild(tag);
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
        console.log(top_elm, left_elm);

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
            dragCoinToBgFrame(elmnt.offsetLeft, elmnt.offsetTop)
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
            addCoinIntoFrameBox(elmnt.offsetLeft, elmnt.offsetTop, id);
            setSlotForCoin(elmnt, elmnt.offsetTop, elmnt.offsetLeft, top_elm, left_elm, id);
        }
    }

    function dragCoinToBgFrame(left, top) {
        var frame = document.getElementById("drop");
        if (left >= frame.offsetLeft && left <= frame.offsetWidth + frame.offsetLeft &&
            top >= frame.offsetTop && top <= frame.offsetTop + frame.offsetHeight) {
            frame.style.border = "solid 1px red";
            document.getElementById("drop-bg").style.backgroundColor = "red";
            document.getElementById("drop-bg").style.opacity = "0.5";

        } else {
            frame.style.border = "solid 1px green";
            document.getElementById("drop-bg").style.backgroundColor = "";
            document.getElementById("drop-bg").style.opacity = "100%"
        }
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
        if (box_coin.length == 0) flag = 404;
        if (sum == result) flag = 200;
        if (sum != result && sum != 0) flag = 404;
        switch (flag) {
            case 404:
                tag.style.backgroundPosition = "0 -118px";
                MoveFirstPosition();
                break;
            case 200:
                tag.style.backgroundPosition = "0 -177px";
                showPaid();
                nextGame();

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
function addCoinIntoFrameBox(left, top, id) {
    var frame = document.getElementById("drop");
    if (left >= frame.offsetLeft && left <= frame.offsetWidth + frame.offsetLeft &&
        top >= frame.offsetTop && top <= frame.offsetTop + frame.offsetHeight) {
        if (box_coin == null) box_coin.push(id);
        else {
            var found = box_coin.findIndex(function(number) {
                return number == id;
            });
            if (found == -1) {
                box_coin.push(id);
            }
        }
    } else {
        var found = box_coin.findIndex(function(number) {
            return number == id;
        });
        if (found != -1) {
            box_coin.splice(found, 1);
        }
    }
    // alert(box_coin);
    console.log("box" + box_coin)
}


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
        var id = box_coin[i];
        var tag = document.getElementById(id.toString());
        myMove(tag, position_coin[id - 1].top, position_coin[id - 1].left);
    }
    box_coin = []
}

function setSlotForCoin(element, top, left, top_elm, left_elm, id) {
    var frame = document.getElementById("drop");

    if (left >= frame.offsetLeft && left <= frame.offsetWidth + frame.offsetLeft &&
        top >= frame.offsetTop && top <= frame.offsetTop + frame.offsetHeight) {
        myMove(element, position_coinInBox[id - 1].top, position_coinInBox[id - 1].left + frame.offsetLeft);
    } else {
        myMove(element, top_elm, left_elm);
    }
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
    //reload coin
    var tag = document.getElementById("drop-coin")
    tag.innerHTML = ""
        // reload product
    var product = document.getElementById("product");
    var thing = document.getElementById("thing");
    product.removeChild(thing)
        //paid display
        // task-scrore
    var task = document.getElementById("task-" + (part + 1));
    task.style.backgroundColor = "green";
    // reser box coin 
    box_coin = [];
    // part 
    part++;
    window.setTimeout(loadDb, 1000);
    // loadDb();
}

function showPaid() {
    show();
    window.setTimeout(hidden, 1000);

}

function show() {
    document.getElementById("paid").style.opacity = "80%";
}

function hidden() {
    document.getElementById("paid").style.opacity = "0%";
}