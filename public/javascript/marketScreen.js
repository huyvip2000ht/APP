var box_coin = [];

function loadDb() {
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
        }
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

function changeValue(id) {
    var x = document.getElementById("myBtn").value;
    var a = parseInt(x) + id;
    document.getElementById("myBtn").value = a;
}

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
                changeValue(id);
            }
        }
    } else {
        var found = box_coin.findIndex(function(number) {
            return number == id;
        });
        if (found != -1) {
            box_coin.splice(found, 1);
            changeValue(-id);
        }
    } // alert(box_coin);
}

function sumBoxCoin() {
    var sum = 0;
    box_coin.forEach(element =>
        sum += element
    )
    return sum;
}

function ButtonAddClassName(className) {
    var a = document.getElementById("myBtn");
    a.classList.add(className);

}

function ButtonClick() {

    var flag;
    if (box_coin.length == 0) flag = 404;
    if (box_coin.length > 0) flag = 200;
    switch (flag) {
        case 404:
            ButtonAddClassName("button-error")
            break;
        case 200:
            ButtonAddClassName("button-fail")
            break;
        default:
    }
}

function ButtonLoadClass() {
    var a = document.getElementById("myBtn");
    while (a.classList.length > 2) {
        a.classList.replace(2, 1);
    }
}