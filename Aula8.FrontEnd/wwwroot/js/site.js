$(document).ready(function () {

    var responseStatusLabel = document.getElementById("responseStatusLabel");
    var responseData = document.getElementById("responseData");


    //LOGIN
    $("#login").click(function () {
        var options = {};
        options.url = "https://localhost:5001/api/account";
        options.type = "POST";

        var body = {};
        body.username = document.getElementById("username").value;
        body.password = document.getElementById("password").value;

        options.data = JSON.stringify(body);
        options.contentType = "application/json";
        options.dataType = "json";
        options.success = function (response) {
            sessionStorage.setItem("token", response.token); //Guarda o Token

            let content = `<h2>Login bem sucedido</h2>`;
            content += `<br/>`;
            content += `<b>Token</b>:` + response.token;

            responseStatusLabel.innerHTML = content;
        };
        options.error = function () {
            responseStatusLabel.innerHTML = `<h1>Erro ao chamar a Web API!</h1>`;
        };

        $.ajax(options);
    });


    // LOGOUT
    $("#logout").click(function () {
        sessionStorage.removeItem("token");
        let content = `<h2>Logout bem sucedido</h2>`;
        responseStatusLabel.innerHTML = content;
    });


    //FETCH
    $("#showData").click(function () {

        let token = sessionStorage.getItem("token");
        console.log(token);

        fetch(`https://localhost:5001/api/weatherforecast`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => {
                if (response.ok) {

                    response.json().then(json => {
                        let li = `<thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Temperature C</th>
                                        <th scope="col">Temperature F</th>
                                        <th scope="col">Summary</th>
                                    </tr>
                                </thead>`;

                        li += `<tbody>`;

                        json.forEach((forecast) => {
                            li += `<tr>
                                <td>${forecast.date}</td>
                                <td>${forecast.temperatureC}</td>
                                <td>${forecast.temperatureF}</td>
                                <td>${forecast.summary}</td>
                               </tr>`;
                        });

                        li += `</tbody>`;

                        responseData.innerHTML = li;


                    });
                }
                else {
                    responseStatusLabel.innerText = JSON.stringify(response.status);
                    responseData.innerHTML = null;
                }
            })
            .catch(() => responseStatusLabel.innerText = 'An error occurred, might be CORS?! :) Press F12 to open the web debug tools');
    });
});
