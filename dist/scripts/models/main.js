$(document).ready(function() {

    var ImageList = new ImageCollection(); 
    ImageList.fetch();
    addimageform.hide();
    $('#btnaddphoto').click (addphoto)
    function addphoto (){
        addimageform.toggle();
    }

    
    var todoItemBuilder = _.template($('#list-template').html());

   
    $('#addimageform').on('submit', function(e) {            
        e.preventDefault();                                 
        console.log('item submitted');

        
        var newTodo = new Picture({                            
            url: $('#imageurl').val(),
            caption: $('#imagecaption').val()
        });

        if(newTodo.isValid()) {
            console.log('the todo item is valid');
            
            ImageList.add(newTodo);
            newTodo.save(); 
        }
        else {
            console.log('there was an error');
            console.log(newTodo.validationError);
        }
        addimageform.hide();
                                        
    });


    
    ImageList.on('add', function(model) {
  
        var todoHtml = todoItemBuilder(model.attributes);    
        console.log(todoHtml);

        $('#picturecontainer').append(todoHtml);
    });


});
var addimageform = $('#addimageform');
var btnaddphoto = $('btnaddphoto');
