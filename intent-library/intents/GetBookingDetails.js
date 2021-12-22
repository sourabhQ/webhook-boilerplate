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

const GetBookingDetails = async (df, queryResult) => {
  console.log('inside GetBookingDetails intent')
  // let abc = await bookingCollectionRef.doc('123456').get()
  // console.log(abc.data())

  console.log("parameters are " + JSON.stringify(queryResult.outputContexts[0].parameters))

  const bookingId = queryResult.outputContexts[0].parameters.bookingId;

  // {
  //   Price: 180,
  //   'Hotel Name': 'Taj Hotel',
  //   'Checkout Date': '17th March',
  //   'Room Type': 'Single Room',
  //   'Booking Id': '123456',
  //   'User Name': 'Jack',
  //   'Check In Date': '15th March',
  //   City: 'Mumbai'
  // }

  let doc = await bookingCollectionRef.doc(bookingId).get();


  if (!doc.exists) {
    console.log('No such document!');
    df.setResponseText(`No booking details found for the given booking id ${bookingId}`);
  } else {
    let data = doc.data();
    console.log('Document data:', data);
    df.setResponseText(`Got it, You have a reservation in ${data['Hotel Name']} from ${data['Check In Date']} to ${data['Checkout Date']} in ${data.City}. \n Is there anything else I can help you with?`);
  }


};

module.exports = GetBookingDetails;
