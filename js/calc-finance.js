(function(){
  // Loan Payment
  document.getElementById('loan-calc').addEventListener('click', function(){
    var p=parseFloat(document.getElementById('loan-principal').value);
    var r=parseFloat(document.getElementById('loan-rate').value)/100/12;
    var n=parseInt(document.getElementById('loan-months').value);
    var el=document.getElementById('loan-result');
    if(!p||!n){el.textContent='Fill all fields.';return;}
    var monthly=r===0?p/n:p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
    el.textContent='Monthly payment: $'+monthly.toFixed(2)+' | Total paid: $'+(monthly*n).toFixed(2)+' | Total interest: $'+(monthly*n-p).toFixed(2);
  });

  // Compound Interest
  document.getElementById('ci-calc').addEventListener('click', function(){
    var p=parseFloat(document.getElementById('ci-principal').value);
    var r=parseFloat(document.getElementById('ci-rate').value)/100;
    var n=parseInt(document.getElementById('ci-compound').value);
    var t=parseFloat(document.getElementById('ci-years').value);
    var el=document.getElementById('ci-result');
    if(!p||!t){el.textContent='Fill all fields.';return;}
    var a=p*Math.pow(1+r/n,n*t);
    el.textContent='Final amount: $'+a.toFixed(2)+' | Interest earned: $'+(a-p).toFixed(2);
  });

  // Tip
  document.getElementById('tip-calc').addEventListener('click', function(){
    var bill=parseFloat(document.getElementById('tip-bill').value);
    var pct=parseFloat(document.getElementById('tip-pct').value);
    var people=parseInt(document.getElementById('tip-people').value)||1;
    var el=document.getElementById('tip-result');
    if(!bill){el.textContent='Enter bill amount.';return;}
    var tip=bill*pct/100;
    var total=bill+tip;
    el.textContent='Tip: $'+tip.toFixed(2)+' | Total: $'+total.toFixed(2)+' | Per person: $'+(total/people).toFixed(2);
  });

  // Sales Tax
  document.getElementById('tax-calc').addEventListener('click', function(){
    var price=parseFloat(document.getElementById('tax-price').value);
    var rate=parseFloat(document.getElementById('tax-rate').value);
    var el=document.getElementById('tax-result');
    if(!price||!rate){el.textContent='Fill all fields.';return;}
    var tax=price*rate/100;
    el.textContent='Tax amount: $'+tax.toFixed(2)+' | Total price: $'+(price+tax).toFixed(2);
  });

  // Savings Goal
  document.getElementById('savings-calc').addEventListener('click', function(){
    var goal=parseFloat(document.getElementById('savings-goal').value);
    var saved=parseFloat(document.getElementById('savings-have').value)||0;
    var months=parseInt(document.getElementById('savings-months').value);
    var el=document.getElementById('savings-result');
    if(!goal||!months){el.textContent='Fill all fields.';return;}
    var needed=(goal-saved)/months;
    el.textContent='Save $'+needed.toFixed(2)+'/month to reach $'+goal.toFixed(2)+' in '+months+' months.';
  });
})();
