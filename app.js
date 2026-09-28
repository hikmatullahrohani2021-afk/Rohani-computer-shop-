const K="rohani_shop_v1";let d=JSON.parse(localStorage.getItem(K)||'{"products":[],"sales":[],"customers":[]}');
function save(){localStorage.setItem(K,JSON.stringify(d));render()}
function show(id){document.querySelectorAll(".page").forEach(x=>x.classList.add("hidden"));document.getElementById(id).classList.remove("hidden");render()}
function money(x){return Number(x||0).toLocaleString("en-US")}
function render(){
 pc.textContent=d.products.length;sc.textContent=d.sales.length;cc.textContent=d.customers.length;
 let total=d.sales.reduce((a,x)=>a+x.price*x.qty,0);rev.textContent=money(total);
 rproducts.textContent=d.products.length;rsales.textContent=money(total);rcustomers.textContent=d.customers.length;
 productList.innerHTML=d.products.map((x,i)=>`<div class=item><b>${x.name}</b> — ${money(x.price)} ؋ — موجودي: ${x.qty}<button onclick="del('products',${i})">حذف</button></div>`).join("")||"<p>تر اوسه محصول نشته.</p>";
 saleList.innerHTML=d.sales.map((x,i)=>`<div class=item>${x.product} — ${money(x.price*x.qty)} ؋ — ${x.customer||"بې نومه"} <button onclick="del('sales',${i})">حذف</button></div>`).join("")||"<p>تر اوسه خرڅلاو نشته.</p>";
 customerList.innerHTML=d.customers.map((x,i)=>`<div class=item><b>${x.name}</b> — ${x.phone||"شمېره نشته"} <button onclick="del('customers',${i})">حذف</button></div>`).join("")||"<p>تر اوسه مشتری نشته.</p>";
}
productForm.onsubmit=e=>{e.preventDefault();d.products.push({name:pname.value,price:+pprice.value,qty:+pqty.value});e.target.reset();save()}
saleForm.onsubmit=e=>{e.preventDefault();d.sales.push({product:sproduct.value,price:+sprice.value,qty:+sqty.value,customer:scustomer.value,date:new Date().toLocaleString()});e.target.reset();save()}
customerForm.onsubmit=e=>{e.preventDefault();d.customers.push({name:cname.value,phone:cphone.value});e.target.reset();save()}
function del(t,i){d[t].splice(i,1);save()}
function backup(){let a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(d,null,2)],{type:"application/json"}));a.download="rohani-shop-backup.json";a.click()}
function clearData(){if(confirm("ایا ټول معلومات پاکول غواړئ؟")){d={products:[],sales:[],customers:[]};save()}}
render();