<?php
////Общее кол-во записей
function getAllcount($connect){
        $query = mysqli_query($connect, "SELECT COUNT(*) as 'total' FROM `test_task_data`");
        $row = mysqli_fetch_assoc($query);
	return $row;
}
//Получить все записи из бд
function getAlltends($connect, $paramsPag = 3){
      $start = ($paramsPag - 1) * 10;
      if($start == 0 || $start == 1){
            $start = 1;
      }
      $query = mysqli_query($connect, "SELECT * FROM `test_task_data` LIMIT 10 OFFSET $start");
      $postList = [];
      while ($row = mysqli_fetch_assoc($query)) {
            $postList[] = $row; 
      }
      //  echo json_encode($get, JSON_UNESCAPED_UNICODE);
       echo json_encode($postList, JSON_UNESCAPED_UNICODE);
}

//Получить все записи из бд отфильтрованный по дате
function getAlltendsByFiltData($connect,$paramsPag = 3){
      $start = ($paramsPag - 1) * 10;
      if($start == 0 || $start == 1){
            $start = 1;
      }
      $query = mysqli_query($connect, "SELECT * FROM `test_task_data` ORDER BY `test_task_data`.`COL 5` DESC LIMIT 10 OFFSET $start");
      $postList = [];
      while ($row = mysqli_fetch_assoc($query)) {
            $postList[] = $row; 
      }
     
       echo json_encode($postList, JSON_UNESCAPED_UNICODE);
}
//Получить все записи из бд отфильтрованный по name
function getAlltendsByFiltName($connect,$paramsPag = 3){
      $start = ($paramsPag - 1) * 10;
      if($start == 0 || $start == 1){
            $start = 1;
      }
      $query = mysqli_query($connect, "SELECT * FROM `test_task_data` ORDER BY `test_task_data`.`COL 4` ASC LIMIT 10 OFFSET $start");
      $postList = [];
      while ($row = mysqli_fetch_assoc($query)) {
            $postList[] = $row; 
      }
     
       echo json_encode($postList, JSON_UNESCAPED_UNICODE);
}

//Получить определенный тендер по COL 1
function getIdtend($connect,$id){
      $query = mysqli_query($connect, "SELECT * FROM `test_task_data` WHERE `COL 1` = '$id'");
      if(mysqli_num_rows($query) === 0) {
            $res = [
                "status" => false,
                "message" => "Dont have informations"      
            ];
            http_response_code(404); 
            echo json_encode($res, JSON_UNESCAPED_UNICODE);

      }else {
            $row = mysqli_fetch_assoc($query);
            $postList = [];
            echo json_encode($row, JSON_UNESCAPED_UNICODE);
      }  
      
}

 //Добавить тендер  
 function setNewTend($connect,$data = 1){
      $col1 = $data['col1']?? 1;
      $col2 = $data['col2']?? 1;
      $col3 = $data['col3']?? 1;
      $col4 = $data['col4']?? 1;
      $col5 = date('d.m.Y H:i:s'); //data

      $insert = "INSERT INTO `test_task_data`(`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`) VALUES ($col1,$col2,'$col3','$col4','$col5')";
      $query = mysqli_query($connect, $insert);
      if($query === true){
            $res = [
                  "status" => true,
                  "message" => "Add tend"    
              ];
              echo json_encode($res, JSON_UNESCAPED_UNICODE);
              http_response_code(201); 
      }else{
            $res = [
                  "status" => false,
                  "message" => "Dont have informations"      
              ];
              http_response_code(404); 
              echo json_encode($res, JSON_UNESCAPED_UNICODE);
      }
 }  




?>