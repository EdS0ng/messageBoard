'use strict';

$(document).ready(init);

function init() {
  $('.post').click(postMessage);
  $('.displayMessages').click(eventRouter);
  $('.submit').click(putEdit);

}

var editTarget;

function eventRouter (e){
  if ($(e.target).hasClass('edit')){
    editMessage(e);
  }
  if ($(e.target).hasClass('remove')){
    removeMessage(e);
  }
}

function postMessage (){
  var userName = $('#userName').val();
  var message = $('#message').val();
  $('#userName').val('');
  $('#message').val('');
  var time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  var fullDiv = createMessage(userName, message, time);
  var toSend = {name: userName, message: message, timePosted: time}
  $.post('/', toSend).done(function (data){
    fullDiv.children('.edit').attr('id', data);
    fullDiv.children('.remove').attr('id', data);
    $('.displayMessages').append(fullDiv);
  });
}

function createMessage (userName, message, time){
  var messageDiv = $(document.createElement('div'));
  var fullDiv = $(document.createElement('div'));
  var editBtn = $(document.createElement('button'));
  var delBtn = $(document.createElement('button'));
  var nameSpan = $(document.createElement('span'));
  var timeSpan = $(document.createElement('span'));
  timeSpan.text(time).attr('class', 'time');
  messageDiv.text(message).attr('class', 'comment');
  nameSpan.text(userName);
  editBtn.attr('class', 'btn btn-default edit').attr("data-toggle", 'modal').attr('data-target','#editModal').text('Edit');
  fullDiv.attr('class', 'fullComment');
  delBtn.attr('class', 'btn btn-default remove').text('Delete');
  fullDiv.append(nameSpan, timeSpan, messageDiv, editBtn, delBtn);
  return fullDiv;
}

function removeMessage (e){
  var dbId = e.target.id;
  if (window.confirm('Delete your message?')){
    $.ajax({
    url: '/'+dbId,
    method: 'DELETE',
    success: function(result) {
      $(e.target).closest('.fullComment').remove();
    }
  });
      
  }
}

function putEdit (){
  var edited = $('.newMessage').val();
  var time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  var dataObject = {id: editTarget.id, message: edited, timePosted: time};
  $.ajax({
    url: '/',
    method: 'PUT',    
    data: dataObject,
    // dataType: 'json',
    success: function(result) {
        $(editTarget).siblings('.comment').text(edited);
        $(editTarget).siblings('.time').text('edited: ' +time);
    }
  });
}

function editMessage (e){
  editTarget = e.target;

}