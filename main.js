var prev_label =""; 



function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet' , modelLoaded);
}
 function modelLoaded()
{
  console.log("modal loaded");
   
}
function draw()
{
  image(video , 0 , 0 , 300 , 300);
  classifier.classify(video , gotResult);
}

function gotResult(error,results)
{
  if(error)
  {
    console.error(error);

  } 

  if(results)
  {
    console.log(results);

    var_label = results[0].label;
    var_confidence = results[0].confidence.toFixed(3);

    if((prev_label != var_label)&&(var_confidence>0.5))
    {
      prev_label = var_label;
      document.getElementById("result_object_name").innerHTML = var_label;

      document.getElementById("result_object_accuracy").innerHTML = var_confidence;

      var synth = window.speechSynthesis;
      var speak_data = "object detected is -" + var_label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis); 
    }
  }
  
}



