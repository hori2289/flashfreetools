(function(){
  // BMI
  document.getElementById('bmi-calc').addEventListener('click', function(){
    var w=parseFloat(document.getElementById('bmi-weight').value), h=parseFloat(document.getElementById('bmi-height').value)/100;
    if(!w||!h){document.getElementById('bmi-result').textContent='Enter valid values.';return;}
    var b=(w/(h*h)).toFixed(1);
    var cat=b<18.5?'Underweight':b<25?'Normal weight':b<30?'Overweight':'Obese (Class '+(b<35?'I':b<40?'II':'III')+')';
    document.getElementById('bmi-result').textContent='BMI: '+b+' — '+cat;
  });

  // Body Fat % (US Navy method)
  document.getElementById('bf-calc').addEventListener('click', function(){
    var gender=document.getElementById('bf-gender').value;
    var waist=parseFloat(document.getElementById('bf-waist').value);
    var neck=parseFloat(document.getElementById('bf-neck').value);
    var height=parseFloat(document.getElementById('bf-height').value);
    var hip=parseFloat(document.getElementById('bf-hip')?document.getElementById('bf-hip').value:0);
    var r=document.getElementById('bf-result');
    if(!waist||!neck||!height){r.textContent='Fill all fields.';return;}
    var bf;
    if(gender==='male') bf=495/(1.0324-0.19077*Math.log10(waist-neck)+0.15456*Math.log10(height))-450;
    else bf=495/(1.29579-0.35004*Math.log10(waist+hip-neck)+0.22100*Math.log10(height))-450;
    var cat=gender==='male'?(bf<6?'Essential':bf<14?'Athletic':bf<18?'Fitness':bf<25?'Average':'Obese'):(bf<14?'Essential':bf<21?'Athletic':bf<25?'Fitness':bf<32?'Average':'Obese');
    r.textContent='Body Fat: '+bf.toFixed(1)+'% — '+cat;
  });

  // TDEE (calories)
  document.getElementById('tdee-calc').addEventListener('click', function(){
    var w=parseFloat(document.getElementById('tdee-weight').value);
    var h=parseFloat(document.getElementById('tdee-height').value);
    var age=parseInt(document.getElementById('tdee-age').value);
    var g=document.getElementById('tdee-gender').value;
    var a=parseFloat(document.getElementById('tdee-activity').value);
    var r=document.getElementById('tdee-result');
    if(!w||!h||!age){r.textContent='Fill all fields.';return;}
    var bmr=g==='male'?88.362+(13.397*w)+(4.799*h)-(5.677*age):447.593+(9.247*w)+(3.098*h)-(4.330*age);
    var tdee=Math.round(bmr*a);
    r.textContent='BMR: '+Math.round(bmr)+' kcal/day | TDEE: '+tdee+' kcal/day (maintenance) | Weight loss: '+(tdee-500)+' kcal/day | Weight gain: '+(tdee+500)+' kcal/day';
  });

  // Ideal Weight (Hamwi method)
  document.getElementById('iw-calc').addEventListener('click', function(){
    var h=parseFloat(document.getElementById('iw-height').value);
    var g=document.getElementById('iw-gender').value;
    var r=document.getElementById('iw-result');
    if(!h){r.textContent='Enter height.';return;}
    var base=g==='male'?48:45.5;
    var inches=(h/2.54)-60;
    var ideal=base+(inches>0?2.7*inches:0);
    r.textContent='Ideal weight: '+ideal.toFixed(1)+' kg ('+Math.round(ideal*2.205)+' lb) — Range: '+(ideal*0.9).toFixed(1)+'–'+(ideal*1.1).toFixed(1)+' kg';
  });

  // Water Intake
  document.getElementById('water-calc').addEventListener('click', function(){
    var w=parseFloat(document.getElementById('water-weight').value);
    var a=document.getElementById('water-activity').value;
    var r=document.getElementById('water-result');
    if(!w){r.textContent='Enter weight.';return;}
    var base=w*0.033;
    var extra=a==='active'?0.6:a==='very-active'?1.2:0;
    r.textContent='Recommended daily water intake: '+(base+extra).toFixed(1)+' liters ('+(((base+extra)*33.814).toFixed(0))+' fl oz)';
  });
})();
