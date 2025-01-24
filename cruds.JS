let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');

let search_By = 'searchTitle';

let del_all = document.getElementById('deleteAll');

let mode = 'create';
let tmp;

let items;
if (localStorage.product !='')
{
    items = JSON.parse(localStorage.product);
}else{
    items = [];
}


show_items();

// get total
function get_total()
{
    let result=0;
    if (price.value!='')
    {
        result= (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value);
        total.innerHTML= result;
        total.style.background = '#040';
    }else{
        total.innerHTML= '';
        total.style.background = '#a00d02';
    }
    
}


// create item
submit.onclick = function ()
{
    let item = {
        title:title.value.toLowerCase(), 
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    };

    if(title.value !='' && price.value !='' && category.value !='' && count.value <= 50)
    {
        // create mode
        if(mode == 'create')
        {
            if(item.count > 1)
            {
                for(let i = 0 ; i < item.count ; i++)
                {
                    items.push(item);
                }
            }else{
                items.push(item);
            }
        }else{  // update mode
            items[tmp] = item;
            mode = 'create';
            count.style.display = "block";
            submit.innerHTML = "Create";
        }

        clear_inputs();
    }
    
    
    
    // if we reload the page the items will be deleted 
    // so we should store it in the local storage
    localStorage.setItem('product', JSON.stringify(items));

    show_items();
    get_total();
}

// clear inputs
function clear_inputs()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// show items
function show_items()
{
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    for(let i =0 ; i < items.length ; i++)
    {
        tbody.innerHTML += `
        <tr>
            <td>${i+1}</td>
            <td>${items[i].title}</td>
            <td>${items[i].price}</td>
            <td>${items[i].taxes}</td>
            <td>${items[i].ads}</td>
            <td>${items[i].discount}</td>
            <td>${items[i].total}</td>
            <td>${items[i].category}</td>
            <td><button onclick="update_item(${i})" id="update">Update</button></td>
            <td><button onclick="delete_item(${i})" id="delete">Delete</button></td>
        </tr>`
    }

    if (items.length > 0)
    {
        del_all.innerHTML = `
        <button onclick="deleteall()" >Delete All (${items.length})</button>
        `;
    }else{
        del_all.innerHTML = '';
    }
    
    
}

//delete item
function delete_item(i)
{   
    items.splice(i,1);
    localStorage.setItem('product', JSON.stringify(items));
    search.value = '';
    show_items();
}

// delete all
function deleteall()
{
    localStorage.setItem('product','');
    items.splice(0);
    search.value = '';
    show_items();
}

// update item
function update_item(i)
{
    title.value = items[i].title;
    price.value = items[i].price;
    taxes.value = items[i].taxes;
    ads.value = items[i].ads;
    discount.value = items[i].discount;
    get_total();    // total.value = items[i].total; 
    count.style.display = "none";
    category.value = items[i].category;
    submit.innerHTML = "Update";
    // i have 2 modes in one button --> Create and Update
    // we need to make 2 function for each mode

    mode = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
    search.value = '';
}


// search item
function searchby(id)
{
    search.focus();
    search_By = id;
    if(search_By == 'searchTitle')
    {
        search.placeholder = 'Search By Title';
    }else{
        search.placeholder = 'Search By Category';
    }
    search.value = '';
    show_items();
}

function search_data()
{
    if(search_By == 'searchTitle')
    {   
        tbody.innerHTML = '';
        for(let i=0 ; i < items.length ; i++)
        {
            if(items[i].title.includes(search.value.toLowerCase()))
            {
                tbody.innerHTML +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${items[i].title}</td>
                    <td>${items[i].price}</td>
                    <td>${items[i].taxes}</td>
                    <td>${items[i].ads}</td>
                    <td>${items[i].discount}</td>
                    <td>${items[i].total}</td>
                    <td>${items[i].category}</td>
                    <td><button onclick="update_item(${i})" id="update">Update</button></td>
                    <td><button onclick="delete_item(${i})" id="delete">Delete</button></td>
                </tr>`
            }
        }
    }else{      //searchBy == 'searchCategory'
        
        tbody.innerHTML = '';
        for(let i=0 ; i < items.length ; i++)
            {
                if(items[i].category.includes(search.value.toLowerCase()))
                {
                    tbody.innerHTML +=`
                    <tr>
                        <td>${i+1}</td>
                        <td>${items[i].title}</td>
                        <td>${items[i].price}</td>
                        <td>${items[i].taxes}</td>
                        <td>${items[i].ads}</td>
                        <td>${items[i].discount}</td>
                        <td>${items[i].total}</td>
                        <td>${items[i].category}</td>
                        <td><button onclick="update_item(${i})" id="update">Update</button></td>
                        <td><button onclick="delete_item(${i})" id="delete">Delete</button></td>
                    </tr>`
                }
            }
    }

}



