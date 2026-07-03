(function(){
  // Percentage (3 modes)
  document.getElementById('pct-calc').addEventListener('click', function(){
    var mode=document.getElementById('pct-mode').value;
    var a=parseFloat(document.getElementById('pct-a').value);
    var b=parseFloat(document.getElementById('pct-b').value);
    var el=document.getElementById('pct-result');
    if(isNaN(a)||isNaN(b)){el.textContent='Enter valid numbers.';return;}
    if(mode==='whatpct') el.textContent=a+' is '+(a/b*100).toFixed(4)+'% of '+b;
    else if(mode==='pctof') el.textContent=a+'% of '+b+' = '+(a/100*b).toFixed(6);
    else el.textContent='% change from '+a+' to '+b+': '+((b-a)/a*100).toFixed(2)+'%';
  });

  // Fraction Simplifier
  function gcd(a,b){return b?gcd(b,a%b):a;}
  document.getElementById('frac-calc').addEventListener('click', function(){
    var n=parseInt(document.getElementById('frac-num').value);
    var d=parseInt(document.getElementById('frac-den').value);
    var el=document.getElementById('frac-result');
    if(!d){el.textContent='Denominator cannot be 0.';return;}
    var g=gcd(Math.abs(n),Math.abs(d));
    el.textContent='Simplified: '+(n/g)+'/'+(d/g)+' = '+(n/d).toFixed(8);
  });

  // Average / Mean
  document.getElementById('avg-calc').addEventListener('click', function(){
    var nums=document.getElementById('avg-input').value.split(/[,\s]+/).map(Number).filter(function(n){return !isNaN(n);});
    var el=document.getElementById('avg-result');
    if(!nums.length){el.textContent='Enter comma-separated numbers.';return;}
    var sum=nums.reduce(function(a,b){return a+b;},0);
    var sorted=nums.slice().sort(function(a,b){return a-b;});
    var median=sorted.length%2===0?(sorted[sorted.length/2-1]+sorted[sorted.length/2])/2:sorted[Math.floor(sorted.length/2)];
    el.textContent='Mean: '+( sum/nums.length).toFixed(4)+' | Median: '+median+' | Sum: '+sum+' | Count: '+nums.length+' | Min: '+sorted[0]+' | Max: '+sorted[sorted.length-1];
  });

  // Power & Root
  document.getElementById('pow-calc').addEventListener('click', function(){
    var base=parseFloat(document.getElementById('pow-base').value);
    var exp=parseFloat(document.getElementById('pow-exp').value);
    var el=document.getElementById('pow-result');
    if(isNaN(base)||isNaN(exp)){el.textContent='Enter valid numbers.';return;}
    el.textContent=base+' ^ '+exp+' = '+Math.pow(base,exp)+' | √'+base+' = '+Math.sqrt(base).toFixed(8)+' | ∛'+base+' = '+Math.cbrt(base).toFixed(8);
  });

  // Prime Checker
  function isPrime(n){if(n<2)return false;if(n<4)return true;if(n%2===0||n%3===0)return false;for(var i=5;i*i<=n;i+=6)if(n%i===0||n%(i+2)===0)return false;return true;}
  document.getElementById('prime-calc').addEventListener('click', function(){
    var n=parseInt(document.getElementById('prime-input').value);
    var el=document.getElementById('prime-result');
    if(isNaN(n)||n<0){el.textContent='Enter a positive integer.';return;}
    if(isPrime(n)){el.textContent=n+' is a prime number.';return;}
    var factors=[];
    var temp=n;
    for(var i=2;i*i<=temp;i++)while(temp%i===0){factors.push(i);temp/=i;}
    if(temp>1)factors.push(temp);
    el.textContent=n+' is not prime. Prime factors: '+factors.join(' × ');
  });
})();
