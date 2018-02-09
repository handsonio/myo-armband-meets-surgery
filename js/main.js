
$(document).ready(function(){

  $('.patient-card').slick({
    dots: true,
    arrows: true  
  });

  var myo = Myo.create(0);
  var threshold = 50;
  var initialTheta = 0;

  var viewerCell = $('.viewer-cell');
  var thumbnails = $('.thumbnails');

  var viewerItems = [];
  var selectedItemIndex = null;

  var patientCardRemoteStatusIndicator = $('#patientcard-status');
  var patientCardStatusArmBusy = $('#patientcard-status-arm-busy');
  var viewerRemoteStatusIndicator = $('#viewer-fist-status');
  var viewerStatusArmBusy = $('#viewer-status-arm-busy');

  var patientCardActivated = true;
  
  var viewerActivated = false
  var viewerRemoteActivated = false;

  var viewerItem1 = new SuperGif({ gif: document.getElementById('viewer-item-1') } );
  var viewerItem2 = new SuperGif({ gif: document.getElementById('viewer-item-2') } );
  var viewerItem3 = new SuperGif({ gif: document.getElementById('viewer-item-3') } );

  viewerItem1.loaded = false;
  viewerItem2.loaded = false;
  viewerItem3.loaded = false;

  viewerItem1.selected = false;
  viewerItem2.selected = false;
  viewerItem3.selected = false;

  viewerItem1.frameNumber = 21;
  viewerItem2.frameNumber = 23;
  viewerItem3.frameNumber = 14;



  viewerItems.push(viewerItem1, viewerItem2, viewerItem3);

  function selectItem(itemId) {
    var i = 0;
    var index = itemId - 1;

    viewerCell.find('div.jsgif:lt('+index+')').hide();
    viewerCell.find('div.jsgif:gt('+index+')').hide();

    if(viewerItems[index].loaded !== true) {
      viewerItems[index].load(itemLoaded);   
    }

    selectedItemIndex = index;

    viewerCell.find('div.jsgif:eq('+index+')').show();

    thumbnails.find('img:lt('+index+')').removeClass('active');
    thumbnails.find('img:eq('+index+')').addClass('active');
    thumbnails.find('img:gt('+index+')').removeClass('active');
  }

  function patientCardNextItem() {
    console.log('patientCardNextItem');
    $('.patient-card').slickNext();
  }

  function patientCardPreviousItem() {
    console.log('patientCardPreviousItem');
    $('.patient-card').slickPrev();
  }

  function viewerNextItem() {
    selectedItemIndex++;
    if(selectedItemIndex > 2) selectedItemIndex = 0;
    selectItem(selectedItemIndex+1);
  }

  function viewerPreviousItem() {
    selectedItemIndex--;
    if(selectedItemIndex < 0) selectedItemIndex = 2;
    selectItem(selectedItemIndex+1); 
  }

  function itemLoaded(item) {
    viewerItems[item.dataset.index].loaded = true;
  }

  function toggleInteractiveUIComponent()
  {
      patientCardActivated = !patientCardActivated;
      viewerActivated = !viewerActivated;
      patientCardRemoteStatusIndicator.toggle(patientCardActivated);
      viewerRemoteStatusIndicator.toggle(viewerActivated);    
      console.log(patientCardActivated);
      console.log(viewerActivated);
  }

  selectItem(1);
  viewerRemoteStatusIndicator.hide();
  patientCardStatusArmBusy.toggle(patientCardActivated && myo.armIsBusy === true);
  viewerStatusArmBusy.toggle(viewerActivated && myo.armIsBusy === true);


  var a;
  var b;
  var frameNumber;

  myo.on('connected', function()  {
    console.log('connected')
    myo.setLockingPolicy('none');
    myo.unlock(200000);
    
  });

  myo.on('rest', function(edge) {
    console.log('rest:' + edge);
    viewerRemoteActivated = !viewerRemoteActivated && !edge;
    if(edge) {
      viewerRemoteStatusIndicator.removeClass('active');
    }   

  });

  myo.on('unlock', function()  {
    console.log('unlocked');    
  });

  myo.on('fingers_spread', function(edge) {
    if(!edge || myo.armIsBusy) return; // vérifier si cela améliorer l'UX
    toggleInteractiveUIComponent();
  });

  myo.on('fist', function(edge){
    if(myo.armIsBusy) return; // vérifier si cela améliorer l'UX
    myo.zeroOrientation(); // vérifier si cela améliore l'UX
    console.log(edge);
    viewerRemoteActivated = edge;
    if(edge) {
      viewerRemoteStatusIndicator.addClass('active');
    } else {
      viewerRemoteStatusIndicator.removeClass('active');
    }   
  });

  myo.on('wave_in', function(edge){
    if(!edge || myo.armIsBusy) return; // vérifier si cela améliorer l'UX
    if(edge) {
      console.log('patientCardActivated:' + patientCardActivated);
      console.log('viewerActivated:' + viewerActivated);
      if(patientCardActivated) patientCardPreviousItem();
      if(viewerActivated) viewerPreviousItem();
    }
  });

  myo.on('wave_out', function(edge) {
    if(!edge || myo.armIsBusy) return; // vérifier si cela améliorer l'UX
    if(edge) {
      console.log('patientCardActivated:' + patientCardActivated);
      console.log('viewerActivated:' + viewerActivated);

      if(patientCardActivated) patientCardNextItem();
      if(viewerActivated) viewerNextItem();
    }
  });

//Double tap to lock and unlock!
  myo.on('double_tap', function(edge){
    console.log('double_tap' + edge);

  });

  myo.on('position', function(x, y, theta){
    patientCardStatusArmBusy.toggle(patientCardActivated && myo.armIsBusy === true);
    viewerStatusArmBusy.toggle(viewerActivated && !viewerRemoteActivated && myo.armIsBusy === true);


    if(viewerItems[selectedItemIndex].loaded === true && viewerRemoteActivated && viewerActivated) {        
      var frameNumber = viewerItems[selectedItemIndex].frameNumber;
      a = (frameNumber / (2 * threshold));
      b = (frameNumber / 2);
      frameIndex = Math.round((a * (theta - initialTheta)) + b);
      
      if(frameIndex > frameNumber) frameIndex = frameNumber;
      if(frameIndex < 1) frameIndex = 1;
      /*
      console.log(frameIndex);
      */
      console.log(theta);
      
      viewerItems[selectedItemIndex].move_to(frameIndex);
    }
  });



  window.selectItem = selectItem;
  window.patientCardNextItem = patientCardNextItem;
  window.patientCardPreviousItem = patientCardPreviousItem; 
  window.viewerNextItem = viewerNextItem;
  window.viewerPreviousItem = viewerPreviousItem;
  window.toggleInteractiveUIComponent = toggleInteractiveUIComponent;
  window.myo = myo;
});


