<?php

require_once 'db.php';
require_once 'func.php';

$test = "posts=1";
$params = explode('=',$test);
print_r($params);

$per = ceil(4.3);
$total = getAllcount($connect);
$total = (int) $total['total'];
var_dump($total);