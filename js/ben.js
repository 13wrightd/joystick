var socket = io();

socket.on('message from server', function(msg){
  console.log(msg);
   $("#messages").append('<li>'+msg.username+": "+ msg.message+ '</li>');
 
});



$(document).ready(function(){
    $("#enterButt").click(function(){
      
       var data = {
        username:$('#userBox').val(),
        message:$('#messageBox').val()
     }
       socket.emit('send message',data);
       $('#messageBox').val('');
       $()
    });

     $('#messageBox').on('keypress', function (e) {
         if(e.which === 13){
      
       var data = {
        username:$('#userBox').val(),
        message:$('#messageBox').val()
     }
       socket.emit('send message',data);
       $('#messageBox').val('');	
         }

   });




});