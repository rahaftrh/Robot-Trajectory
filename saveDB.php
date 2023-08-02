<?php 
	$path=json_decode($_POST['path'],true);
	$pathname=array_pop($path);

	$host='localhost';
	$user='root';
	$password='';
	$database='robot';
	$connect=new mysqli($host,$user,$password,$database) or die ("Unable to connect");
	
	foreach ($path as $component ) {
		$sql = "INSERT INTO robot_auto_path_direction (direction, magnitude, path_name)VALUES ('" .$component["direction"]."', '".$component["magnitude"]."', '".$pathname."')"  ;
		if ($connect->query($sql) === TRUE) {
  		echo "\nNew record created successfully";
} 	
	else {
  		echo "Error: " . $sql . "<br>" . $connect->error;
}
	}
	$connect->close();
	
	





	