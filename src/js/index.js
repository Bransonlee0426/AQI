$(document).ready(function () {

    const apiUrl = 'https://script.google.com/macros/s/AKfycbwIwK5IvP8akMgltDOyVhRrYASO8eQD2A7oFVVZ8VkM3-_ANAfT/exec?url=http://opendata.epa.gov.tw/webapi/Data/REWIQA/?format=json';
    //promise practice
    // let promise = new Promise((resolve, reject) => {
    //     let xhr = new XMLHttpRequest();
    //     xhr.open('get', apiUrl, true);
    //     xhr.send(null);
    //     xhr.onload = () => {
    //         if (xhr.status >= 200 && xhr.status < 400) {
    //             resolve(xhr.response);
    //         } else {
    //             reject("取得資料失敗: " + xhr.status);
    //         }
    //     }
    // });
    // promise.then((res) => {
    //     console.log(res);
    // });
    // promise.catch((error) => {
    //     console.log('error');
    // });

    axios({
            method: 'get',
            url: apiUrl,
        })
        .then(function (response) {
            dataArray$ = dataArray(response.data);
            setCountyDate(dataArray$);

            setTimeout(() => {
                $('#load-id').addClass('available');
                $('body').css('background-color', '#f0f0f0');
                $('#wrap-id').removeClass('available');
                $('#footer-id').removeClass('available');
                $('#time').text(response.data[0].PublishTime);
            }, 500);


        })

        .catch(function (error) {
            console.log('取得資料失敗:' + error);
        });


    let dataArray = (data) => {
        //get data's lenght
        let dataLenght = 0;
        let array = [];
        let item;
        for (item in data) {
            if (data.hasOwnProperty(item)) {
                dataLenght++;
            }
        }
        for (let i = 0; i < dataLenght; i++) {
            let myObj = {
                County: data[i].County,
                SiteName: data[i].SiteName,
                AQI: data[i].AQI,
                O3: data[i].O3,
                PM10: data[i].PM10,
                ['PM2.5']: data[i]['PM2.5'],
                CO: data[i].CO,
                SO2: data[i].SO2,
                NO2: data[i].NO2,
                Status: data[i].Status,
                PublishTime: data[i].PublishTime
            }
            array.push(myObj);
        }

        return array;
    }

    let setCountyDate = (data) => {
        let allCountyArray = [];
        let dataLenght = 0;
        let item;
        for (item in data) {
            if (data.hasOwnProperty(item)) {
                dataLenght++;
            }
        }
        for (let i = 0; i < dataLenght; i++) {
            allCountyArray.push(data[i].County);
            //$('.selectbox').append('<option value=' + +'>' + +'</option>');
        }
        let countyArray = allCountyArray.filter(function (item, index, arr) {
            return arr.indexOf(item) === index;
        });
        for (let i = 0; i < countyArray.length; i++) {
            $('.selectbox').append('<option value=' + countyArray[i] + '>' + countyArray[i] + '</option>');
        }
    }
    $('.selectbox').on('change', function () {
        $('.locations').empty();
        //如果有第二個class就刪除


        let result = dataArray$.filter((item, index, array) => {
            return item.County === $(this).val() ? true : false;
        });

        let curdata = result.forEach((item, index, array) => {

            switch (item.Status) {
                case '良好':
                    color = 'lv1'
                    break;
                case '普通':
                    color = 'lv2'
                    break;
                case '對敏感族群不健康':
                    color = 'lv3'
                    break;
                case '對所有族群不健康':
                    color = 'lv4'
                    break;
                case '非常不健康':
                    color = 'lv5'
                    break;
                case '危害':
                    color = 'lv6'
                    break;
                default:
                    color = '';
                    console.log('數值過低或超標啦！');
                    break;
            }

            let locList = '<li class="locations-list">' +
                '                            <span class="locations-name middle-font-size">' + item.SiteName + '</span>' +
                '                            <span id="location-id" class="locations-aqi huge-font-size ' + color + '">' + item.AQI + '</span>' +
                '                        </li>';
            $('.locations').append(locList);
            //左邊顏色區塊
            index === 0 ? $('#aside-aqi-id').removeClass() & $('#aside-aqi-id').addClass('aside-aqi' + ' ' + color) : false;

        });


        $('#o3').text(result[0].O3===''?'-':result[0].O3);
        $('#pm10').text(result[0].PM10===''?'-':result[0].PM10);
        $('#pm25').text(result[0]['PM2.5']===''?'-':result[0]['PM2.5']);
        $('#co').text(result[0].CO===''?'-':result[0].CO);
        $('#so2').text(result[0].SO2===''?'-':result[0].SO2);
        $('#no2').text(result[0].NO2===''?'-':result[0].NO2);
        $('.aside-aqi').text(result[0].AQI===''?'-':result[0].AQI);
        $('.aside-name').text(result[0].SiteName===''?'-':result[0].SiteName);
        $('#title-county').text($(this).val());

    });
    //右邊點擊事件
    $('.locations').on('click', '.locations-list', function () {

        let curname = $(this).find('.locations-name').text(); //點到的地點
        let curcolor = $(this).find('.locations-aqi').attr('class').split(' ').pop();
        let result = dataArray$.filter((item, index, array) => {
            return item.County === $('.selectbox').val() ? true : false;
        });
        $('#aside-aqi-id').removeClass();
        $('#aside-aqi-id').addClass('aside-aqi' + ' ' + curcolor);

        result.forEach((element, index, array) => {
            if (element.SiteName === curname) {
                $('#o3').text(result[index].O3===''?'-':result[index].O3);
                $('#pm10').text(result[index].PM10===''?'-':result[index].PM10);
                $('#pm25').text(result[index]['PM2.5']===''?'-':result[index]['PM2.5']);
                $('#co').text(result[index].CO===''?'-':result[index].CO);
                $('#so2').text(result[index].SO2===''?'-':result[index].SO2);
                $('#no2').text(result[index].NO2===''?'-':result[index].NO2);
                $('.aside-name').text(result[index].SiteName===''?'-':result[index].SiteName);
                $('.aside-aqi').text(result[index].AQI===''?'-':result[index].AQI);
            }
        });

    });

});