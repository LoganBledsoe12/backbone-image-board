(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//  var $ = require('jquery');
// var Backbone = require('backbone');
// Backbone.$ = $;

$(document).ready(function() {

    var ImageList = new ImageCollection(); 
    ImageList.fetch();
    addimageform.hide();
    $('#btnaddphoto').click (addphoto)
    function addphoto (){
        addimageform.slideToggle();
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
            alert(newTodo.validationError);
        }
        addimageform.hide();
        $('#imageurl').val('');
        $('#imagecaption').val('');
                                        
    });
    $('body').on ('keypress','input', function(e){
        if (e.which == 13){
            var picId = $(e.target).attr('pictureId');
            var comment = $(e.target).val();
            var picture = ImageList.get(picId);
            console.log (picture);
            var comments =(picture.get('comments'));
            if (comments==null){
                comments=new CommentCollection()
                comments.on('add', function(model){
                    $('#'+picId).append(model.get('text')+'<br>');
                })
                picture.set('comments',comments);
            }
            comments.add({text:comment});
            picture.save();


        }
    })

    
    ImageList.on('add', function(model) {
  
        var todoHtml = todoItemBuilder(model.attributes);    
        console.log(todoHtml);

        $('#picturecontainer').append(todoHtml);
    });


});
var addimageform = $('#addimageform');
var btnaddphoto = $('btnaddphoto');

},{}]},{},[1]);
