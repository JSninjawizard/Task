### ### ### ### ### ### ###
### Home Assignment Summary
### ### ### ### ### ### ###


##Phase 1: Frontend Logic

All core requirements were implemented and verified:
    #Navigation: Works as expected, switching between Home, Login, Payment, and Logout views.

   #Session Security: Automated unique Session ID generation for every user session using the crypto.randomUUID() method.

   #Logic: Implemented logic to ensure the getScore action is available until successful init response is triggered. Even though the API (Zapier endpoint) was unreachable, I believe the code is functional.


##Phase 2: API Integration (Blocked)

Integration with the Zapier endpoint was implemented but was blocked server-side restrictions.
1. Root Cause: CORS Preflight Failure

There was CORS (Cross-Origin Resource Sharing) violation.
(Preflight) handshake returned a 404 Not Found from the Zapier server, which forced the browser to block data fetching from end-point.

2. Testing and Validation

    Online Tools: I used a manual REST API Client (ReqBin) to bypass browser-based CORS checks.
    I tried to test it with required payload still resulted in a hardcoded "please unsubscribe me!" response, confirming the endpoint is rejecting requests regardless of the client used.

    Code Implementation: The logic was coded regardless of the server error to show how I would approach the implementation.

    Header Modification: I tried to remove headers to downgrade the call to a "Simple Request" (to bypass the Preflight check), but the server either remained unreachable.

##Technical Evidence

Dev Tools -->  Network Tab --> consistently confirmed that the server failed to provide the data.