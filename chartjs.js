$(document).ready(function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", domain + "/DieLists/getData", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var content = xhr.responseText;
            var data = JSON.parse(content);
           
            if (data) {
                console.log(countMo(data));
                console.log(getQtyForAeachMaker(data));
            } else {
                alert("can not get data");
            }
        }
    }
    xhr.send();


    function countMo(dies) {
        var dem = 0;
        for (die of dies) { // lap qua mang dung "of"
            if (die.Process == 'Mo') {
                dem++;
            }
        }
        return {
            Mo: dem,
            Px: dies.length - dem
        }
    }

    function getQtyForAeachMaker(dies) {
        var makers = [];
        for (die of dies) { // lap qua mang dung "of"
            if (makers.indexOf(die.Maker) == -1) {
                makers.push(die.Maker);
            }
        }
       var  makerQty = [];
        for (maker of makers) {
            var count = 0;
            for (die of dies) {
                if (die.Maker === maker) {
                    count++;
                }
            }
            makerQty.push({
                maker: maker,
                Qty : count
            });
        }
        return makerQty.sort(function (a, b) {
            return b.Qty - a.Qty;
        })
    }
    



});

