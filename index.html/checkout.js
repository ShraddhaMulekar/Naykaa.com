let name = document.getElementById("name");
let email = document.getElementById("email");
let mobNum = document.getElementById("mobNum");
let address = document.getElementById("address");
let submit = document.getElementById("submit");
submit.addEventListener("click",()=>{
    if(name.value && email.value && mobNum.value && address.value){
        alert("Place Order Sucessfully")
        // clear the form
        name.value = "";
        email.value = "";
        mobNum.value = "";
        address.value = "";
        
    }
    else{
        alert("Please fill all the fields")
    }
})
let homeBtn = document.getElementById("home");
homeBtn.addEventListener("click",()=>{
    window.location.href = "shoppingCart.html";
});