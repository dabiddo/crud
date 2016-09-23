<?php

//return all users in table
if(isset($_GET['action']) && $_GET['action'] == 'index'){
    echo execute_query("SELECT * FROM users");
}

//save new or update users info
if(isset($_POST['action']) && $_POST['action'] == 'save'){

    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $id = $_POST['id'];

    if($_POST['id'] == 0){
        $query = "INSERT INTO users (id,name,email,phone) VALUES (NULL,'$name','$email','$phone')";
    }
    else{
        $query =  "UPDATE users SET id = $id, name = '$name', email = '$email', phone = '$phone' WHERE id = $id";
    }

    echo execute_query($query);
}

//delete user
if(isset($_POST['action']) && $_POST['action'] == 'delete'){

    $id = $_POST['id'];

    execute_query("DELETE FROM users WHERE id = $id");

    echo json_encode(['message'=>'deleted']);
}

function execute_query($query)
{
    $con = new PDO('mysql:host=127.0.0.1;dbname=test', "root", "");
    $response = $con->query($query)->fetchAll(PDO::FETCH_ASSOC);
    return json_encode($response);
}