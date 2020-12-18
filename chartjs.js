$(document).ready(function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", domain + "/DieLists/getData", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var content = xhr.responseText;
            var data = JSON.parse(content);

            if (data) {
                console.log(getDieforeachMaker(data))
                //console.log(getQtyForAeachMaker(data))
            } else {
                alert("can not get data");
            }
        }
    }
    xhr.send();

    function count(dies) {
        var dem = 0;
        for (var i = 1; i < dies.length; i++) {
            if (dies[i].Process == 'Mo') {
                dem++;
            }
        }
        return {
            Mo: dem,
            Px: dies.length - dem
        }
    }

    function getDieforeachMaker(dies) {
        var makers = [];
        for (var i = 1; i < dies.length; i++) {
            if (makers.indexOf(dies[i].Maker) == -1) {
                makers.push(dies[i].Maker);
            }
        }
        var cal = [];

        for (var i = 0; i < makers.length; i++) {

            var dem = 0;
            for (var j = 0; j < dies.length; j++) {
                if (makers[i] === dies[j].Maker) {
                    dem++
                }
            }
            result = {
                Maker: makers[i],
                Qty: dem
            }

            cal.push(result)
        }

        return cal.sort(function (a, b) {
            return (b.Qty - a.Qty);
        });
    }
});