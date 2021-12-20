/**
 * Copyright 2020 Quantiphi Inc. All Rights Reserved.
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

/**
 * Configures the application based on the NODE_ENV eg: "production, qa and develop"
 * return application configurations   
 */
 const dotenv = require('dotenv');
 dotenv.config();

const admin = require("firebase-admin");

const serviceAccount = require("../../hotel-335214-firebase-adminsdk-mnkjw-1e14681739.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const loadConfig = () => {
    return {
        "port": process.env.PORT || 8080,
        "fullfillmentConfig": {
            "platformsEnabled": ["TEXT", "TELEPHONY"]
        },
        "auth": {
            "enable": true,
            "username": process.env.USER_NAME || "Test123",
            "password": process.env.PASSWORD || "12345678"
        },
        "logger": {
            "piiFields": []
        },
        "db":db
    };
};

module.exports = loadConfig;