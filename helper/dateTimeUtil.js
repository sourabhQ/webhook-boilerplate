const config = require('../config')

const dateTimeConvert = (startDate, nights) => {
    let checkInDate = new Date(startDate);
    let result = new Date(startDate);
    result.setDate(result.getDate() + nights);
    let checkOutDate = result

    const longEnUSFormatter = new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const pluralRules = new Intl.PluralRules('en-US', {
        type: 'ordinal'
    })
    const suffixes = {
        'one': 'st',
        'two': 'nd',
        'few': 'rd',
        'other': 'th'
    }
    const convertToOrdinal = (number) => `${number}${suffixes[pluralRules.select(number)]}`
    // At this point:
    // convertToOrdinal("1") === "1st"
    // convertToOrdinal("2") === "2nd"
    // etc.

    const extractValueAndCustomizeDayOfMonth = (part) => {
        if (part.type === "day") {
            return convertToOrdinal(part.value);
        }
        return part.value;
    };
    console.log(
        longEnUSFormatter.formatToParts(checkInDate)
            .map(extractValueAndCustomizeDayOfMonth)
            .join("")
    );
    return {
        "checkInDate": longEnUSFormatter.formatToParts(checkInDate)
        .map(extractValueAndCustomizeDayOfMonth)
        .join(""),

        "checkOutDate": longEnUSFormatter.formatToParts(checkOutDate)
        .map(extractValueAndCustomizeDayOfMonth)
        .join("")
    }
};

module.exports = {dateTimeConvert};