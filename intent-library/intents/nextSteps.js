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

const config = require("../../config")();

const bookingCollectionRef = config.db.collection('booking');

const nextStepsIntent = async (df, queryResult) => {
    console.log('inside next step intent')
    // let abc = await bookingCollectionRef.doc('123456').get()
    // console.log(abc.data())

    console.log("parameters are " + JSON.stringify(queryResult.outputContexts[1].parameters))

    const bookingId = (Math.floor(100000 + Math.random() * 900000)).toString();

    const { hotel, checkInDate,checkOutDate,city,budget,givenName,roomType} = queryResult.outputContexts[1].parameters;

    let data = {
        'Booking Id': bookingId,
        Price: budget,
        'Hotel Name': hotel,
        'Checkout Date': checkOutDate,
        'Room Type': roomType,
        'Booking Id': bookingId,
        'User Name': givenName,
        'Check In Date': checkInDate,
        City: city
      }

    let status = await bookingCollectionRef.doc(bookingId).set(data);
    console.log("database status is",status);

    df.setResponseText(`Awesome, Your hotel is booked. Your booking id is: ${bookingId}. Is there anything else I can help you with?`);


};

module.exports = nextStepsIntent;
