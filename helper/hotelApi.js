/**
 * Copyright 2020 Quantiphi, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

const config = require("./../config")();
const axios = require("axios").default;

const getDestinationId = (cityName) => {
    console.log("inside getDestinationId city is "+ cityName)
    let options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
        params: {query: cityName, locale: 'en_US', currency: 'USD'},
        headers: {
          'x-rapidapi-host': 'hotels4.p.rapidapi.com',
          'x-rapidapi-key': '3cf2fc45abmshe6ae3494a82c830p1fda53jsna8c9f7674646'
        }
      };
    
      let res = null;
    axios.request(options).then(function (response) {
        console.log('just before returning response')
        res = response;
    }).catch(function (error) {
        console.error(error);
        res = null;
    });

    return res;
}


module.exports = getDestinationId;




// /**
//  * Authorization (basic auth) for dialogflow fulfillment request
//  * @param {object} req http request 
//  * @param {object} res http response
//  * @param {function} next invokes the succeeding middleware/function
//  */
//  const basicAuth = (req, res, next) => {
//     const auth = req.get("authorization");
//     if (req.path === "/healthcheck") {
//         next();
//     }
//     else if (!auth) {
//         res.status(401).send({ "status": 401, "message": "Unauthorized" });
//     } else {
//         const credentials = new Buffer.from(auth.split(" ").pop(), "base64").toString("ascii").split(":");
//         if (credentials[0] === config.auth.username && credentials[1] === config.auth.password) {
//             next();
//         } else {
//             res.status(401).send({ "status": 401, "message": "Unauthorized" });
//         }
//     }
// };