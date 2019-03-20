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

            // setTimeout(() => {
            //     $('#load-id').addClass('available');
            //     $('body').css('background-color', '#f0f0f0');
            //     $('#wrap-id').removeClass('available');
            //     $('#footer-id').removeClass('available');
            // }, 500);

            //let dataArray$ = dataArray(response.data);


        })

        .catch(function (error) {
            console.log('取得資料失敗:' + error);
        });


    
    getTime = () => {
        let myTime = new Date();
        let myYear = myTime.getFullYear();
        let myMonth = myTime.getMonth();
        let myDay =  myTime.getDate();
        let myHour = myTime.getHours();
        let myMinutes =myTime.getMinutes();
        $('#time').text(myYear+'/'+myMonth+'/'+myDay+' '+myHour+':'+myMinutes);
    }
    getTime();

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
                NO2: data[i].NO2
            }
            array.push(myObj);
        }
        return array;
    }





});