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

const getDestinationId = async (city) =>{
  console.log("inside getDestinationId city is " + city)
  let options = {
    method: 'GET',
    url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
    params: { query: city, locale: 'en_US', currency: 'USD' },
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


const getHotelDetails = async (destinationId, apiCheckInDate, apiCheckOutDate, budget) =>{
  console.log("inside getHotelDetails in hotelApi")
  let options = {
    method: 'GET',
    url: 'https://hotels4.p.rapidapi.com/properties/list',
    params: { 
      destinationId: destinationId,
      pageNumber: "1",
      checkIn: apiCheckInDate, //"2020-01-12", -------------> User's checkin date
      checkOut: apiCheckOutDate,
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
    console.log('hotel details api response ')
    return response;
  }).catch(function (error) {
    console.log("inside error ")
    console.error(error);
    return null;
  });

  return response;
}

module.exports =  {getDestinationId, getHotelDetails} ;