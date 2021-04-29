export interface FlightBookingDetails {
    from : string,
    to : string,
    tripType : string,
    departureDate? : string,
    returnDate? : string,
    passengers : string,
    shopWithMiles? : boolean,
    refundableFares? : boolean,
    myDatesAreFlexible? : boolean,
    includeNearByAirports? : boolean,
    fares? : string,
    meetingCode? : string
}