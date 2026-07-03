(function(){
  // Running Pace
  document.getElementById('pace-calc').addEventListener('click', function(){
    var dist=parseFloat(document.getElementById('pace-dist').value);
    var unit=document.getElementById('pace-unit').value;
    var h=parseInt(document.getElementById('pace-h').value)||0;
    var m=parseInt(document.getElementById('pace-m').value)||0;
    var s=parseInt(document.getElementById('pace-s').value)||0;
    var el=document.getElementById('pace-result');
    if(!dist){el.textContent='Enter distance.';return;}
    var totalSecs=h*3600+m*60+s;
    if(!totalSecs){el.textContent='Enter time.';return;}
    var kmDist=unit==='mi'?dist*1.60934:dist;
    var mphSpeed=(dist/(totalSecs/3600));
    var kphSpeed=(kmDist/(totalSecs/3600));
    var secsPerKm=totalSecs/kmDist;
    var secsPerMi=totalSecs/(dist*(unit==='mi'?1:0.621371));
    var fmt=function(sec){return Math.floor(sec/60)+':'+(Math.round(sec%60)).toString().padStart(2,'0');};
    el.textContent='Pace: '+fmt(secsPerKm)+'/km | '+fmt(secsPerMi)+'/mi | Speed: '+kphSpeed.toFixed(2)+' km/h ('+mphSpeed.toFixed(2)+' mph)';
  });

  // Heart Rate Zones
  document.getElementById('hr-calc').addEventListener('click', function(){
    var age=parseInt(document.getElementById('hr-age').value);
    var rest=parseInt(document.getElementById('hr-resting').value)||60;
    var el=document.getElementById('hr-result');
    if(!age){el.textContent='Enter age.';return;}
    var max=220-age;
    var hrr=max-rest;
    var zones=[['Zone 1 — Warm-up (50-60%)',0.5,0.6],['Zone 2 — Fat Burn (60-70%)',0.6,0.7],['Zone 3 — Aerobic (70-80%)',0.7,0.8],['Zone 4 — Anaerobic (80-90%)',0.8,0.9],['Zone 5 — Max (90-100%)',0.9,1.0]];
    el.innerHTML=zones.map(function(z){ return '<div>'+z[0]+': '+(Math.round(rest+hrr*z[1]))+'-'+(Math.round(rest+hrr*z[2]))+' bpm</div>'; }).join('');
    el.innerHTML='Max HR: '+max+' bpm<br>'+el.innerHTML;
  });

  // Calories Burned
  document.getElementById('cal-calc').addEventListener('click', function(){
    var w=parseFloat(document.getElementById('cal-weight').value);
    var met=parseFloat(document.getElementById('cal-activity').value);
    var mins=parseFloat(document.getElementById('cal-mins').value);
    var el=document.getElementById('cal-result');
    if(!w||!mins){el.textContent='Fill all fields.';return;}
    var cals=met*3.5*w/200*mins;
    el.textContent='Calories burned: ~'+Math.round(cals)+' kcal in '+mins+' minutes';
  });

  // Protein Intake
  document.getElementById('protein-calc').addEventListener('click', function(){
    var w=parseFloat(document.getElementById('protein-weight').value);
    var goal=document.getElementById('protein-goal').value;
    var el=document.getElementById('protein-result');
    if(!w){el.textContent='Enter weight.';return;}
    var factor=goal==='maintain'?0.8:goal==='build'?1.6:goal==='sport'?2.0:1.2;
    el.textContent='Recommended: '+Math.round(w*factor)+'g protein/day ('+factor+'g per kg bodyweight)';
  });

  // One Rep Max (Epley formula)
  document.getElementById('orm-calc').addEventListener('click', function(){
    var w=parseFloat(document.getElementById('orm-weight').value);
    var reps=parseInt(document.getElementById('orm-reps').value);
    var el=document.getElementById('orm-result');
    if(!w||!reps){el.textContent='Fill all fields.';return;}
    var orm=reps===1?w:w*(1+reps/30);
    var pcts=[0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,1].map(function(p){ return Math.round(p*100)+'%: '+Math.round(orm*p)+'kg'; });
    el.innerHTML='<strong>Estimated 1RM: '+orm.toFixed(1)+'kg ('+Math.round(orm*2.205)+'lb)</strong><br>'+pcts.join(' | ');
  });
})();
