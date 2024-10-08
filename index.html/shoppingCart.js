let productDiv = document.getElementById("productCards");
let selectCards = document.getElementById("selectCards");
let dynamicNum = document.querySelector(".dynamicNum");
let totalCount = document.getElementById("totalCount");
let CheckOutBtn = document.getElementById("CheckOutBtn");
let emptyCard = document.getElementById("emptyCard");
let filter_Data = document.getElementById("filter");
let sort_Data = document.getElementById("sort");
let dynamicNumOfArr=[]
let currentVal = []

//get product
let getData = async function(){
    try{
        let res = await fetch(`https://fakestoreapi.com/products`);
        let data = await res.json();
        console.log(data)
        displayProduct(data)
        filter_Data.addEventListener("click", function(e){
            let check = filterData(data, e.target.value)
            console.log(check)
        })
        sort_Data.addEventListener("click", function(e){
            let sortedData = sortData(data, e.target.value)
            console.log(sortedData)
        });
    }
    catch(err){
        console.log("Error", err)
    }
}
getData();

//display product

let displayProduct = function(data){
    productDiv.innerHTML = "";
    data.forEach((ele)=>{
        let card = document.createElement("div");
        card.className = "card";

        let title = document.createElement("h3");
        title.textContent = (`${ele.title.slice(0,30)}...`);

        let description = document.createElement("h5");
        description.textContent = ele.description;

        let price = document.createElement("h3");
        price.textContent = `Price: $${ele.price}`;

        let category = document.createElement("h3");
        category.textContent = ele.category;

        let img = document.createElement("img");
        img.src = ele.image;

        let btn = document.createElement("button");
        btn.textContent = "Add to Cart";
        btn.addEventListener("click", ()=>{
            addToCart(ele.image, ele.price);
        })
        //Add to Card clickable event handler
        let addToCart = (img, price)=>{
            dynamicNumOfArr.push({i:img, p:price})
            console.log(dynamicNumOfArr);

            alert("Product Added to Cart")
            dynamicNum.innerHTML++
            let addCard = document.createElement("div");
            addCard.className = "addCard";
            emptyCard.style.display = "none";
            CheckOutBtn.style.display = "block"

            //Delete button click handler
            let trashbtn = document.createElement("i");
            trashbtn.className = "fa-solid fa-trash";

            let deleteProduct = ()=>{
                const index = currentVal.indexOf(price);
                if (index > -1) {
                    currentVal.splice(index, 1, 0); // Remove the price
                }
                let decPrice = currentVal.reduce((acc, cur)=>{
                    return acc - cur;
                }, 0)
                totalCount.innerHTML = `Total Count: $${decPrice}`;
                addCard.remove()
                dynamicNum.innerHTML= parseInt(dynamicNum.innerHTML)-1
            }
            
            trashbtn.addEventListener("click", deleteProduct)            

            let image = document.createElement("img");
            image.src = ele.image;

            // total number of price
            let prices = document.createElement("h3");
            prices.textContent = `$${ele.price}`;
            currentVal.push(price)
            let totalPrice = currentVal.reduce((acc, cur)=>{
                return acc + cur;
            }, 0)

            totalCount.innerHTML = `Total Count: $${totalPrice}`;
            console.log(totalPrice)

            addCard.append(image, prices, trashbtn);
            selectCards.append(addCard);

            // console.log(img)
            // console.log(price)
        }

        card.append(img, title, category, price, description, btn);

        productDiv.append(card);

    })
}

//filter data

let filterData = (data, value)=>{
    let filteringData = data?.filter((ele)=>{
        if(ele.category === value){
            return ele
        }
        console.log(value)
    })
    console.log("filter",filteringData)
    displayProduct(filteringData)
    return filteringData;
}

// sort products

let sortData = (data, value)=>{
    let sortedData = data?.sort((a, b)=>{
        if(value === "ascending"){
            return a.price - b.price
        }
        else if(value === "descending"){
            return b.price - a.price
        }
    })
    console.log("sort",sortedData)
    displayProduct(sortedData)
    return sortedData;
}
