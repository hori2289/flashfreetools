(function(){
  // Age
  document.getElementById('age-calc').addEventListener('click', function(){
    var dob=new Date(document.getElementById('age-dob').value);
    var now=new Date();
    var el=document.getElementById('age-result');
    if(isNaN(dob)){el.textContent='Enter a valid date.';return;}
    var y=now.getFullYear()-dob.getFullYear(),m=now.getMonth()-dob.getMonth(),d=now.getDate()-dob.getDate();
    if(d<0){m--;d+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
    if(m<0){y--;m+=12;}
    var totalDays=Math.floor((now-dob)/86400000);
    el.textContent=y+' years, '+m+' months, '+d+' days old ('+totalDays.toLocaleString()+' total days)';
  });

  // Date Difference
  document.getElementById('diff-calc').addEventListener('click', function(){
    var d1=new Date(document.getElementById('diff-from').value);
    var d2=new Date(document.getElementById('diff-to').value);
    var el=document.getElementById('diff-result');
    if(isNaN(d1)||isNaN(d2)){el.textContent='Enter valid dates.';return;}
    var ms=Math.abs(d2-d1);
    var days=Math.floor(ms/86400000);
    var weeks=Math.floor(days/7);
    var months=Math.floor(days/30.44);
    var years=(days/365.25).toFixed(2);
    el.textContent=days+' days | '+weeks+' weeks | ~'+months+' months | ~'+years+' years';
  });

  // Days Until
  document.getElementById('until-calc').addEventListener('click', function(){
    var target=new Date(document.getElementById('until-date').value);
    var now=new Date(); now.setHours(0,0,0,0);
    var el=document.getElementById('until-result');
    if(isNaN(target)){el.textContent='Enter a valid date.';return;}
    var diff=Math.round((target-now)/86400000);
    if(diff===0) el.textContent="That's today!";
    else if(diff>0) el.textContent=diff+' days remaining ('+Math.floor(diff/7)+' weeks and '+(diff%7)+' days)';
    else el.textContent=Math.abs(diff)+' days ago';
  });

  // Sleep Time
  document.getElementById('sleep-calc').addEventListener('click', function(){
    var mode=document.getElementById('sleep-mode').value;
    var time=document.getElementById('sleep-time').value;
    var el=document.getElementById('sleep-result');
    if(!time){el.textContent='Enter a time.';return;}
    var parts=time.split(':').map(Number);
    var base=new Date(); base.setHours(parts[0],parts[1],0,0);
    var cycles=[1,2,3,4,5,6].map(function(c){
      var t=new Date(mode==='wake'?base-c*5400000:base.getTime()+c*5400000);
      return t.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    });
    el.textContent=(mode==='sleep'?'Wake up at: ':'Go to sleep at: ')+cycles.join(' / ')+' (based on 90-min sleep cycles)';
  });

  // GPA
  document.getElementById('gpa-add').addEventListener('click', function(){
    var row=document.createElement('div');
    row.className='field-row gpa-row';
    row.innerHTML='<div class="field"><input type="number" placeholder="Grade (0-100)" class="gpa-grade"></div><div class="field"><input type="number" placeholder="Credits" value="3" class="gpa-credits"></div>';
    document.getElementById('gpa-courses').appendChild(row);
  });
  document.getElementById('gpa-calc').addEventListener('click', function(){
    var grades=document.querySelectorAll('.gpa-grade');
    var credits=document.querySelectorAll('.gpa-credits');
    var totalPoints=0,totalCredits=0;
    grades.forEach(function(g,i){
      var grade=parseFloat(g.value),credit=parseFloat(credits[i].value)||3;
      if(isNaN(grade))return;
      var points=grade>=90?4:grade>=80?3:grade>=70?2:grade>=60?1:0;
      totalPoints+=points*credit;
      totalCredits+=credit;
    });
    var el=document.getElementById('gpa-result');
    if(!totalCredits){el.textContent='Add at least one course.';return;}
    el.textContent='GPA: '+(totalPoints/totalCredits).toFixed(2)+' ('+totalCredits+' total credits)';
  });
})();
