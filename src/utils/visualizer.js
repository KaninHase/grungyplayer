let analyser;
let request;

export const visualizer = (audioElement, canvas, play) => {
  if(!analyser){
    const AudioCotext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioCotext();
    // Copy audio source data to manipulate later
    let source = audioCtx.createMediaElementSource(audioElement);
    // Create audio analyser
    analyser = audioCtx.createAnalyser();
    // Bind our analyser to the media element source
    source.connect(analyser);
    source.connect(audioCtx.destination);
  }

  // Set audio analyser
  analyser.fftSize = 64; // 32, 64, 128, 256 .... 1024, 2048;
  let bufferLength = analyser.frequencyBinCount; // analyser.fftSize / 2;
  let dataArray = new Uint8Array(bufferLength); 


  // Draw visualizer
  const ctx = canvas.getContext("2d");
  const WIDTH = canvas.width = canvas.clientWidth;
  const HEIGHT = canvas.height = canvas.clientHeight;

  function draw(){
    request = requestAnimationFrame(draw);
    // extract data
    analyser.getByteTimeDomainData(dataArray);
    ctx.beginPath();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    for(let i = 0; i < bufferLength; i++){
      let v = dataArray[i] / 10; // dataArray[i] = 0-255
      ctx.arc(WIDTH/2, HEIGHT/2, Math.abs(100 + v), 0, 2*Math.PI);
      ctx.shadowColor = '#b2277a';
      ctx.shadowBlur = 3;
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }

  }

  if(play){
    cancelAnimationFrame(request);
  }else { draw() };
}