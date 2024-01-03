<?php

// this legacy code won't work for the current version

define('verbose', 1);

define('root', dirname(__FILE__));

$env = $_ENV ? $_ENV : parse_ini_file(root.'/.env'); // $env['FOO']
if (verbose > 1) error_log('env: '.print_r($env, 1));

/**
 * send a http response and exit
 * @param integer $code numerical http code
 * @param string $msg message to send
 * @return void
 */
function hresp ($code, $msg) {
  http_response_code($code);
  echo $msg;
  exit;
}

// TODO restrict for production
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$method = strtolower($_SERVER['REQUEST_METHOD']);

switch ($method) {
case 'post':
case 'get':
  // if ...
  // hresp(400, "bad");
  http_response_code(200);
  header('Content-Type: application/json');
  echo json_encode([
    'outputs' => [
      [
        'id' => 'output1',
        'data' => [-1, 0, 1]
      ],
      [
        'id' => 'output2',
        'data' => [-1, 1, 0.5]
      ],
      [
        'id' => 'output3',
        'data' => [1, 0, -0.5]
      ]
    ],
    'result' => 'ok',
    'requestEcho' => $_REQUEST
  ]);
  break;
}
