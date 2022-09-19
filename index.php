<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

require_once 'db.php';
require_once 'func.php';

$method = $_SERVER['REQUEST_METHOD'];
// echo $method;

$interUrl = $_GET['z'] ?? null;
$params = explode('/',$interUrl);
$partOne = $params[0];
$id = $params[1] ?? 0; 

//pagination
$test = $params[0];
$paramsPag = explode('=',$test); //страница


// $per = 10;
// $total = getAllcount($connect);
// $total = (int) $total['total'];
// $total = ceil($total / $per);


switch ($method) {
	case 'GET':
		if($paramsPag[0] === 'posts'){
			if($id !== 0){
				$postList = getIdtend($connect,$id);
				echo $postList; 
			}else{
				$postList = getAlltends($connect, $paramsPag[1]);
				echo $postList;
				}
		}else if($paramsPag[0] === 'postsId'){
			$postList = getAlltendsByFiltData($connect,$paramsPag[1]);
			echo $postList; 
		}else if($paramsPag[0] === 'postsName'){
			$postList = getAlltendsByFiltName($connect,$paramsPag[1]);
			echo $postList; 
		}

break;
	
	case 'POST':
		if($paramsPag[0] === 'posts'){
			setNewTend($connect,$_POST);
		}	
		break;



	default:
		# code...
		break;
}

?>