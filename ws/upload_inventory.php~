<?php 
 error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$responce =array();

    $dbhost = 'localhost:3306';
    $dbuser = 'root';
    $dbpass = '';
    $dbName = 'test';
    $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbName);

    if(! $conn ){
       die('Could not connect: ' . mysqli_error());
    }
   
if($_POST['which_service']=="uploadcsv"){
    $picture1='';

    if(isset($_FILES['picture1'])){
        $files1=$_FILES['picture1'];
             $temp_name=$files1['tmp_name'];
        $file_name=$files1['name'];
        if (mysqli_query($conn,"select 1 from temp LIMIT 1")) {
            mysqli_query($conn,"DROP TABLE temp");
        }
     $ext = pathinfo($file_name, PATHINFO_EXTENSION);

    
        $i = 1;
        $queryCreate = '';
        if ($file_name != '') {
            if ($ext == 'csv' || $ext == 'CSV') {
                $file = fopen($temp_name, "r");
                while ($data = fgetcsv($file)) {

                    $totalCol = count($data);
                    $original_col = array('title','sku','short_description','price','quantity','category');
                    

                    if($i==1){
                        $csv_col = $data;
                        $array_diff = array_diff($original_col,$csv_col);
                        $array_intersect = array_intersect($original_col,$csv_col);
                    }
                    
                
                    if ($i == 1) {
                        $queryCreate = "CREATE TABLE temp(";
                        for ($j = 0; $j < $totalCol; $j++) {
                            $queryCreate.= str_replace(" ", "_", $data[$j]);
                            $queryCreate.=" VARCHAR(500)";
                            if ($j != $totalCol - 1) {
                                $queryCreate.=",";
                            }
                        }
                         $queryCreate.=")";

                        $res = mysqli_query($conn,$queryCreate);
                    } else {

                        $queryInsert = '';

                        for ($j = 0; $j < $totalCol; $j++) {

                            $queryInsert.= "'" . mysqli_real_escape_string($conn,$data[$j]) . "'";
                            if ($j != $totalCol - 1) {
                                $queryInsert.=",";
                            }
                        }

                         $queryInsert = "INSERT INTO temp VALUES($queryInsert)";
                        

                        $res = mysqli_query($conn,$queryInsert);
                        if ($res) {
                            
                        }
                    }
                    $i++;
                }


                if(count($array_diff)==0){
                    $query1 = "SELECT title,sku,short_description,price,quantity,category FROM temp";
                    $res1= mysqli_query($conn,$query1);
                    while($data3 = mysqli_fetch_assoc($res1)){
                        $title = $data3['title'];
                        $sku = $data3['sku'];
                        $short_description = $data3['short_description'];
                        $price = $data3['price'];
                        $quantity = $data3['quantity'];
                        $category = $data3['category'];
                        $query6 = "SELECT sku FROM product WHERE sku='".$sku."'";
                        $res6 = mysqli_query($conn,$query6);
                        if(mysqli_num_rows($res6)==0){

                            $query7 = "SELECT cat_id from category WHERE cat_name='".$category."'";
                            $res7 = mysqli_query($conn,$query7);
                            if(mysqli_num_rows($res7)>0){
                                $data7 = mysqli_fetch_assoc($res7);
                                $cat_id = $data['cat_id'];
                            }else{
                              $query8="INSERT INTO category(cat_name) VALUES('".$category."')";
                                $res8=mysqli_query($conn,$query8);
                                $cat_id=mysqli_insert_id($conn);

                            }
                        $query4="INSERT INTO product(title,sku,short_description,price,quantity,category_id) VALUES('".$title."','".$sku."'
                        ,'".$short_description."','".$price."','".$quantity."','".$cat_id."')";
                        $res4 = mysqli_query($conn,$query4);
                        }

                    }
                    $responce['msg']="matched";
                    echo json_encode($responce['msg']);
                }else{
                    $responce['msg']="notmatched";
                    echo json_encode($responce['msg']);
                }

                fclose($file);
               
            } else {
              //  $responce['msg']="Invalid File";
               // echo json_encode($responce['msg']);
            }
        }
    }

}else if($_POST['which_service']=="getColumnNames"){
    $responce =array();
    $original_col = array('title','sku','short_description','price','quantity','category');
    $csv_col = array();
   
    $data=array();
     $query_fields = "SHOW COLUMNS FROM temp";
            $res = mysqli_query($conn,$query_fields);
            while ($data = mysqli_fetch_assoc($res)) {
                $responce['csvcol'][]=$data['Field'];
               // array_push($responce,$data);
                $csv_col[]=$data['Field'];
            }

            $array_diff = array_diff($original_col,$csv_col);

            foreach($array_diff as $array_diffdata){
               $responce['tablecol'][]=$array_diffdata;
            }
            echo  json_encode($responce);
}else if($_POST['which_service']=="addProduct"){
    $responce =array();
    $original_col = array('title','sku','short_description','price','quantity','category');
    $unmatchedcol = '';
    $data = json_decode($_POST['field']);
$i=1;
$unmatchedcol ='';
foreach($data as $key=>$value){

    if($i%2==0){
    $unmatchedcol.=" As ".$value.",";
    }else{
         $unmatchedcol.=" ".$value;
    } 
$i++;
    
    
}
    $unmatchedcol = rtrim($unmatchedcol,',');
    $csv_col = array();
    $query_fields = "SHOW COLUMNS FROM temp";
    $res = mysqli_query($conn,$query_fields);
    while ($data = mysqli_fetch_assoc($res)) {
        $csv_col[]=$data['Field'];
    }

   $array_intersect = array_intersect($original_col,$csv_col);
   $str_intersect = implode(",",$array_intersect);
   $strcol=$str_intersect.",".$unmatchedcol;
   $query1 = "SELECT $strcol FROM temp";


   $res1= mysqli_query($conn,$query1);
   while($data3 = mysqli_fetch_assoc($res1)){
       $title = $data3['title'];
       $sku = $data3['sku'];
       $short_description = $data3['short_description'];
       $price = $data3['price'];
       $quantity = $data3['quantity'];
       $category = $data3['category'];
       $query6 = "SELECT sku FROM product WHERE sku='".$sku."'";
       $res6 = mysqli_query($conn,$query6);
       if(mysqli_num_rows($res6)==0){

           $query7 = "SELECT cat_id from category WHERE cat_name='".$category."'";
           $res7 = mysqli_query($conn,$query7);
           if(mysqli_num_rows($res7)>0){
               $data7 = mysqli_fetch_assoc($res7);
               $cat_id = $data7['cat_id'];
           }else{
               $query8="INSERT INTO category(cat_name) VALUES('".$category."')";
               $res8=mysqli_query($conn,$query8);
               $cat_id=mysqli_insert_id($conn);

           }

       $query4="INSERT INTO product(title,sku,short_description,price,quantity,category_id) VALUES('".$title."','".$sku."'
       ,'".$short_description."','".$price."','".$quantity."','".$cat_id."')";
       $res4 = mysqli_query($conn,$query4);
        }
        
        $responce['msg']="success";
        echo json_encode($responce['msg']);
    }
}else if($_POST['which_service']=="productlist"){
    $responce =array();
   
     $query = "SELECT * FROM product";
            $res = mysqli_query($conn,$query);
            while ($data = mysqli_fetch_assoc($res)) {               
                array_push($responce,$data);
            }
            echo  json_encode($responce);
}


