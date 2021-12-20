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

 const getDestinationId = require("../../helper/hotelApi")
 
 const bookHotelIntent = async (df) =>{
    console.log("===============================================")
    console.log(df._request.queryResult)
    console.log("===============================================")

    console.log('given city is '+ df._request.queryResult.parameters.city);

    let response = await getDestinationId(df._request.queryResult.parameters.city);
    console.log('response from helper '+ response.response)

    if(response){
        let destinationId = response.data.suggestions[0].entities[0].destinationId
        console.log('destination id for city is ' + destinationId )
         
        df.setResponseText("adsfasdasldngasn");
    }else{
        df.setResponseText("There wwas some error in fetching.");
    }
    
 };
 
 module.exports = bookHotelIntent;
 