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
            console.log(response.data);
            
        })
        .catch(function (error) {
          
            console.log('取得資料失敗:' + error);
        });


});