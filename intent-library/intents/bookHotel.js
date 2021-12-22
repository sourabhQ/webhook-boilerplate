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
const { dateTimeConvert } = require("../../helper/dateTimeUtil")

const bookHotelIntent = async (df, queryResult) => {

    let providedDate = queryResult.outputContexts[0].parameters.providedDate
    console.log('providedDate city is ' + providedDate);
    let nights = queryResult.outputContexts[0].parameters.nights
    let city = queryResult.outputContexts[0].parameters.city
    console.log(`given city is ${city}`);
    let budget = queryResult.outputContexts[0].parameters.budget
    console.log(`given city is ${budget}`);

    const { checkInDate, checkOutDate, apiCheckInDate, apiCheckOutDate } = dateTimeConvert(providedDate, nights)
    console.log("checkInDate is " + checkInDate)
    console.log("checkOutDate is " + checkOutDate)

    console.log("apiCheckInDate is " + apiCheckInDate)
    console.log("apiCheckOutDate is " + apiCheckOutDate)



    let response = await hotelApi.getDestinationId(city);

    console.log(`response from getDestinationId ${response}`)

    if (response) {
        let destinationId = response.data.suggestions[0].entities[0].destinationId
        console.log('destination id for city is ' + destinationId)

        let parameterObject = {
            destinationId,
            checkInDate,
            checkOutDate,
            apiCheckInDate,
            apiCheckOutDate,
            ...queryResult.outputContexts[0].parameters
        }

        let responseGetHotelDetails = await hotelApi.getHotelDetails(destinationId, apiCheckInDate, apiCheckOutDate, budget)
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
        //console.log(responseGetHotelDetails)
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
        console.log('hotel name is '+ responseGetHotelDetails.data.data.body.searchResults.results[0].name)
        console.log('hotel price is '+ responseGetHotelDetails.data.data.body.searchResults.results[0].ratePlan.price.current
        )
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')

        df.setOutputContext('nextsteps', 5, parameterObject)
        df.setEvent('nextStepsEvent', "en-US", parameterObject)
    } else {
        df.setResponseText("There was some error in fetching.");
    }

};

module.exports = bookHotelIntent;
