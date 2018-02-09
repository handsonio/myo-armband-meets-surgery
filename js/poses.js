
$(document).ready(function(){
  var myo = Myo.create(0);

  myo.on('pose', function(pose, edge){
    console.log('in pose : ' + pose);
    if(pose == 'rest') return;
    var imageName = './img/' + (edge ? 'solid_blue_RH_' : 'blue_outline_RH_') + pose + '.png'
    $('#pose_image_' + pose).attr('src', imageName);
  });


});
