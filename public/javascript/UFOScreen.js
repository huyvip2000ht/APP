var coins = [
    [{ id: 1, number: 1, position: { left: 100, top: 0 } },
        { id: 2, number: 5, position: { left: 100, top: 300 } },
        { id: 3, number: 3, position: { left: 400, top: 300 } },
        { id: 4, number: 2, position: { left: 500, top: 170 } },
        { id: 5, number: 5, position: { left: 700, top: 350 } },
        { id: 6, number: 5, position: { left: 600, top: 0 } },
        { id: 7, number: 5, position: { left: 300, top: 180 } },
        { id: 8, number: 7, position: { left: 400, top: 0 } },
        { id: 9, number: 8, position: { left: 0, top: 100 } },
        { id: 10, number: 9, position: { left: 700, top: 150 } }
    ],
    [{ number: 1, position: { left: 100, top: 100 } },
        { number: 2, position: { left: 200, top: 100 } },
        { number: 3, position: { left: 300, top: 100 } },
        { number: 4, position: { left: 400, top: 100 } },
        { number: 5, position: { left: 400, top: 100 } },
    ]
]

var part = 0;
// load database and coin
function loadDb() {
    loadCoin();
}

function loadCoin() {
    var a = document.getElementById("coins");
    var a = document.getElementById("coins");
    var listCoin = coins[part];
    for (var i = 0; i < listCoin.length; i++) {
        var top = listCoin[i].position.top;
        var left = listCoin[i].position.left;
        var tag = document.createElement("div");
        tag.className = "coin";
        tag.innerHTML = listCoin[i].number;
        tag.style.left = left + "px";
        tag.style.top = top + "px";
        tag.id = listCoin[i].id;
        dragElement(tag, top, left);
        a.appendChild(tag);
    }
}
// set up drag and drop for coin
function dragElement(elmnt, top, left) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    var top_elm = elmnt.offsetTop;
    var left_elm = elmnt.offsetLeft;
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
    var tagCollision = elmnt;

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
        elmnt.style.zIndex = '10';
        tagCollision = CheckElementCollision(elmnt);
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.zIndex = '1';
        HandleDropElement(elmnt, top, left);
        HandleInCollisionOut(tagCollision);
        // MoveCoin(elmnt, top, left);

    }
}

function MoveCoin(elem, top, left) {
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

function checkCollision(element, other) {

    return (element.offsetLeft >= other.offsetLeft - 80 && element.offsetLeft <= other.offsetLeft + 80) &&
        (element.offsetTop > other.offsetTop - 80 && element.offsetTop <= other.offsetTop + 80);
}

function CheckElementCollision(element) {
    var listCoin = coins[part];
    var res = element;
    var id = parseInt(element.id);
    console.log(listCoin.length)
    for (var i = 0; i < listCoin.length; i++) {

        if (id != parseInt(listCoin[i].id)) {
            var tag = document.getElementById(listCoin[i].id);
            if (checkCollision(element, tag)) {
                res = tag;
                HandleInCollision(tag);
            } else {
                HandleInCollisionOut(tag);
            }
        }
    }

    return res;
}

function HandleInCollision(element) {
    element.classList.add("hight-blue");
}

function HandleInCollisionOut(element) {
    element.className = "coin";
}

// Handle Drop 
function HandleDropElement(element, top_elm, left_elm) {
    var tag = CheckElementCollision(element);
    var parent = document.getElementById("coins");
    if (tag != element) {
        var textTag = parseInt(tag.textContent);
        var textE = parseInt(element.textContent);
        var res = textE + textTag;
        tag.style.opacity = '0';
        var left = tag.offsetLeft - 100;
        var top = tag.offsetTop;

        var child = document.createElement("div");
        child.className = "Calculation";

        element.style.left = left + "px";
        element.style.top = top + "px";

        child.style.left = left + "px";
        child.style.top = top + "px";
        child.textContent = textE + " + " + textTag + " = " + res;
        element.style.opacity = 0;

        if (res == 10) {
            child.classList.add("True");
            DelayTrue(500, element, tag, child);
        } else {
            // child.classList.add("active");

            child.classList.add("Wrong");
            DelayFalse(500, element, tag, child, top_elm, left_elm);
        }
        parent.appendChild(child);

    }
}

function DelayFalse(time, element, tag, child, top_elm, left_elm) {
    var pos = 1;
    var id = setInterval(func, 5);
    var parent = document.getElementById("coins");

    function func() {
        if (pos == time) {
            element.style.opacity = '1'
            tag.style.opacity = '1';
            parent.removeChild(child);
            MoveCoin(element, top_elm, left_elm);
            clearInterval(id);
        } else {
            pos += 1;
        }
    }
}

function DelayTrue(time, element, tag, child) {
    var pos = 1;
    var id = setInterval(func, 5);
    var parent = document.getElementById("coins");

    function func() {
        if (pos == time) {
            ArrayCoinRemove(tag, element);
            parent.removeChild(tag);
            parent.removeChild(element);

            MoveCoin(child, 30, 190);
            DelayUFO(500, child);
            clearInterval(id);
        } else {
            pos += 1;
        }
    }
}

function ArrayCoinRemove(elmnt, tag) {
    var listCoin = coins[part];
    var id = parseInt(elmnt.id);
    var top = elmnt.offsetTop;
    var left = elmnt.offsetLeft;
    var found = listCoin.findIndex(function(obj) {
        return parseInt(obj.id) == id;
    });
    if (found != -1) {
        listCoin.splice(found, 1);
    }
    id = parseInt(tag.id);
    top = tag.offsetTop;
    left = tag.offsetLeft;
    found = listCoin.findIndex(function(obj) {
        return parseInt(obj.id) == id;
    });
    if (found != -1) {
        listCoin.splice(found, 1);
    }
}

function Delay(child) {
    var pos = 1;
    var id = setInterval(func, 5);
    var parent = document.getElementById("coins");
    var ray = document.getElementById("ray");
    var ufo = document.getElementById("ufo");

    function func() {
        if (pos == 200) {
            ray.style.opacity = '0';
        }
        if (pos == 250) {
            parent.removeChild(child);
        }
        if (pos == 400) {
            ufo.style.animationName = "moveUFO";
            clearInterval(id);
        } else {
            pos += 1;
        }
    }

}

function DelayUFO(time, child) {
    var pos = 1;
    var id = setInterval(func, 5);
    var ray = document.getElementById("ray");
    var ufo = document.getElementById("ufo");

    function func() {
        if (pos == time) {
            ray.style.opacity = '1';
            ufo.style.animationName = "StaticUFO"
            child.style.animationName = "moveCoinToUFO";
            Delay(child);
            clearInterval(id);
        } else {
            pos += 1;
        }
    }
}