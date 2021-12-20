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

const getDestinationId = async (cityName) =>{
  console.log("inside getDestinationId city is " + cityName)
  let options = {
    method: 'GET',
    url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
    params: { query: cityName, locale: 'en_US', currency: 'USD' },
    headers: {
      'x-rapidapi-host': 'hotels4.p.rapidapi.com',
      'x-rapidapi-key': config.key
    }
  };

  let response = axios.request(options).then(function (response) {    
    return response;
  }).catch(function (error) {
    console.log("inside error ")
    console.error(error);
    return null;
  });

  return response;
}


const getHotelDetails = async (destinationId, checkInDate, checkOutDate, budget) =>{
  console.log("inside getDestinationId city is " + cityName)
  let options = {
    method: 'GET',
    url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
    params: { 
      destinationId: destinationId,
      pageNumber: "1",
      checkIn: checkInDate, //"2020-01-12", -------------> User's checkin date
      checkOut: checkOutDate,
      pageSize: "10",
      adults1: "1",
      currency: "USD",
      priceMax: budget,
      starRatings: "5",
      locale: "en_US",
      sortOrder: "PRICE_HIGHEST_FIRST"

     },
    headers: {
      'x-rapidapi-host': 'hotels4.p.rapidapi.com',
      'x-rapidapi-key': config.key
    }
  };

  let response = axios.request(options).then(function (response) {    
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log('hotel details api response ')
    console.log(response)
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    return response;
  }).catch(function (error) {
    console.log("inside error ")
    console.error(error);
    return null;
  });

  return response;
}

module.exports =  {getDestinationId, getHotelDetails} ;