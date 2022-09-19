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


switch ($method) {
	case 'GET':
			if($partOne === 'posts'){
      			if($id !== 0){
            			$postList = getIdtend($connect,$id);
            			echo $postList; 
      			}else{
            			$postList = getAlltends($connect);
           				 echo $postList;  
     				 }
			}

	break;
	
	case 'POST':
		if($partOne === 'posts'){
			setNewTend($connect,$_POST);
		}	
		break;



	default:
		# code...
		break;
}


?>