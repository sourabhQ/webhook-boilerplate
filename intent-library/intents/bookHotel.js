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
    console.log('providedDate date is ' + providedDate);
    let nights = queryResult.outputContexts[0].parameters.nights
    let city = queryResult.outputContexts[0].parameters.city
    console.log(`given city is ${city}`);
    let budget = queryResult.outputContexts[0].parameters.budget
    console.log(`provided budget is ${budget}`);

    const { checkInDate, checkOutDate, apiCheckInDate, apiCheckOutDate } = dateTimeConvert(providedDate, nights)
    console.log("checkInDate is " + checkInDate)
    console.log("checkOutDate is " + checkOutDate)

    console.log("apiCheckInDate is " + apiCheckInDate)
    console.log("apiCheckOutDate is " + apiCheckOutDate)

    

    let hotelList = ["The Venetian",
        "Spotlight Hotel",
        "The Mississippi Hotel",
        "Green Tortoise Hostel",
        "The Orchard Hotel",
        "Spring Brook",
        "Hotel Agoura",
        "Wonder Hill Inn",
        "The New Yorker",
        "Beachwalk Resort",
        "Etiquette Suites",
        "Water Vibe Resorts",
        "Consulate Hotel",
        "Quaint Motel",
        "Cape Grace",
        "Fountain Fun",
        "Element",
        "The New View",
        "White Season Resort",
        "Hotel Occazia",
        "Purple Orchid",
        "Prestige proga Inn",
        "The Manhattan",
        "Lime Wood",
        "Parallel Shine"];

    let hotel = hotelList[Math.floor(Math.random() * hotelList.length)];
    console.log('hotel name is '+hotel)

    let parameterObject = {
        hotel,
        checkInDate,
        checkOutDate,
        apiCheckInDate,
        apiCheckOutDate,
        ...queryResult.outputContexts[0].parameters
    }


    df.setOutputContext('nextsteps', 5, parameterObject)
    df.setEvent('nextStepsEvent', "en-US", parameterObject)


};

module.exports = bookHotelIntent;
