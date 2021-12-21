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

 const hotelApi = require("../../helper/hotelApi")
 const {dateTimeConvert} = require("../../helper/dateTimeUtil")
 
 const bookHotelIntent = async (df, queryResult) =>{

    let providedDate = queryResult.outputContexts[0].parameters.providedDate

    console.log('providedDate city is '+ providedDate);
    let nights = queryResult.outputContexts[0].parameters.nights

    const {checkInDate, checkOutDate} = dateTimeConvert(providedDate, nights)
    console.log("checkInDate is "+ checkInDate)
    console.log("checkOutDate is "+ checkOutDate)

    console.log('given city is '+ queryResult.outputContexts[0].parameters.city);

    let response = await hotelApi.getDestinationId(queryResult.outputContexts[0].parameters.city);
    
    console.log('response from helper '+ response)

    if(response){
        let destinationId = response.data.suggestions[0].entities[0].destinationId
        console.log('destination id for city is ' + destinationId )
        df.setOutputContext('nextsteps', 5, {
            destinationId,
            checkInDate, 
            "checkOutDate": checkOutDate,
            ...queryResult.outputContexts[0].parameters
        })
        df.setEvent('nextStepsEvent', "en-US", {
            destinationId,
            "checkInDate": checkInDate, 
            checkOutDate,
            ...queryResult.outputContexts[0].parameters
        })
        //df.setResponseText("adsfasdasldngasn");
    }else{
        df.setResponseText("There wwas some error in fetching.");
    }
    
 };
 
 module.exports = bookHotelIntent;
 