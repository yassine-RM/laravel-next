<?php

return [

'paths' => ['api/*', 'sanctum/csrf-cookie'],

'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Be explicit

'allowed_origins' => ['http://localhost:3301'],  // Allow your frontend origin

'allowed_origins_patterns' => [],

'allowed_headers' => ['Content-Type', 'X-Requested-With', 'Authorization', 'Accept'],  // List essential headers

'exposed_headers' => ['Authorization'],  // Expose headers if needed (optional)

'max_age' => 86400,  // Cache CORS preflight requests for 1 day

'supports_credentials' => true,  // Set this to true if you are using cookies or auth
];
