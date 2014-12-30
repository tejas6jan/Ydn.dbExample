


var schema = {
  stores:[{
    name:'expenseManager',
    keyPath:"timeStamp"
  }]
};



var db = new ydn.db.Storage('expense', schema);


var txtPrice,txtPmode,txtDate,txtDesc,chkStatus;
txtPMode = document.getElementById("txtPMode");
txtprice = document.getElementById("txtPrice");
txtDate = document.getElementById("txtDate");
txtDesc = document.getElementById("txtDesc");
chkStatus = document.getElementById("chkStatus");

var add = function () {
	var price= txtprice.value;
	var Pmode= txtPMode.value;
	var date = txtDate.value;
	var Desc = txtDesc.value;
	var status = chkStatus.value;
	var data ={
	"price" : price,
	"Pmode" : Pmode,
	"date" : date,
	"Desc" : Desc,
	"status" : status,	
	"timeStamp":new Date().getTime()
 }; 	

db.put('expenseManager',data).fail(function (e){
	throw e;
})
};

function rem(id)
{
	alert ('removing '+ id );
var d = db.remove('expenseManager', id).fail(function(e) {
    
  });
	show();
	
};
	
function show(){
	
	document.getElementById("tbody").innerHTML="";
	
	var rows= db.values('expenseManager');
	
	rows.done(function (items){
		var len= items.length;
		for(var i= 0 ; i<len;i++){
	
	renderRow(items[i]);
		}
	});
	
	rows.fail(function (e){
	throw e;
	});
	
};
	

function renderRow(row){
	 var r=document.createElement("tr");
	 r.setAttribute("id","row");
	 document.getElementById("tbody").appendChild(r);
	 var tdPrice = document.createElement("td");
	 var tdMode = document.createElement("td");
	 var tdDate = document.createElement("td");
	 var tdDesc = document.createElement("td");
	var tdStatus = document.createElement("td");
	var action =  document.createElement("td");

	var cell1= document.createTextNode(row.price);
	var cell2= document.createTextNode(row.Pmode);
	var cell3= document.createTextNode(row.date);
	var cell4= document.createTextNode(row.Desc);
	var cell5= document.createTextNode(row.status );
	
	var del = document.createElement("a");
	var cell6= document.createTextNode("Delete" );
	del.setAttribute("onclick","rem("+row.timeStamp+")")
		
	tdPrice.appendChild(cell1);
	r.appendChild(tdPrice);	
		
tdMode.appendChild(cell2);
	r.appendChild(tdMode);
	
		tdDate.appendChild(cell3);
	r.appendChild(tdDate);
	
	
	tdDesc.appendChild(cell4);
	r.appendChild(tdDesc);

	tdStatus.appendChild(cell5);	
	r.appendChild(tdStatus);
	del.appendChild(cell6);
	
	action.appendChild(del);
	r.appendChild(action);
}


