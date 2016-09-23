var single_user = {id:0,name:'David',email:'dabiddo@gmail.com',phone:'6260145'};
var array_users = [];

$(document).ready(function(){
    _index();
    
    $('#save_button').click(function(){
        _store();
    });
    
    $('th').click(function(){
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc){rows = rows.reverse()}
        for (var i = 0; i < rows.length; i++){table.append(rows[i])}
    })
});

function _index(){
    //load DB
    _clear();
    //array_users.push(single_user);
    $.get('php/users.php',{action:'index'},function(result){
        for(x=0;x<=result.length-1;x++){
            var new_user = new Object();
            new_user.id = result[x].id;
            new_user.name = result[x].name;
            new_user.email = result[x].email;
            new_user.phone = result[x].phone;
            array_users.push(new_user);
        }
        _render();
    },'json');
}

function _store(){
    //save new
    var new_user = new Object();
    new_user.id = $('#id_input').val();
    new_user.name = $('#name_input').val();
    new_user.email = $('#email_input').val();
    new_user.phone = $('#phone_input').val();
    new_user.action = 'save';
    //array_users.push(new_user);
    $.post('php/users.php',new_user,function(result){
        _index();
    },'json');
}

function _delete(id){
    //delete record
     single_user = array_users.filter(function(element){
        return element.id == id;
    })
    user = single_user[0];
    user.action = 'delete';
    $.post('php/users.php',user,function(result){
        _index();
    },'json');
}

function _clear(){
    array_users = [];
    $('#tbbody').empty();
}

function _load(id){
    console.log(id);
    single_user = array_users.filter(function(element){
        return element.id == id;
    })
    _render_single(single_user[0]);
}

function _render(){
    //alert(array_users.length)
    $.each(array_users,function(i,user){
        $('#tbbody').append(
        "<tr>"
            +"<td>"+array_users[i].id+"</td>"
            +"<td>"+array_users[i].name+"</td>"
            +"<td>"+array_users[i].email+"</td>"
            +"<td>"+array_users[i].phone+"</td>"
            +"<td><button class='btn btn-default btn-edit' id='"+array_users[i].id+"'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button></td>"
            +"<td><button class='btn btn-default btn-delete' id='"+array_users[i].id+"'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button></td>"
            +"</tr>"
        );
    });
    
    $('.btn-edit').click(function(event){
        _load(event.target.id)
    });
    
    $('.btn-delete').click(function(event){
        _delete(event.target.id)
    });
}

function _render_single(user){
    console.log(user);
    $('#name_input').val(user.name);
    $('#email_input').val(user.email);
    $('#phone_input').val(user.phone);
    $('#id_input').val(user.id);
}


function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
    }
}
function getCellValue(row, index){ return $(row).children('td').eq(index).html() }
