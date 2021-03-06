items_url = "http://localhost:3000/items"
categories_url = "http://localhost:3000/categories"
const allItemsArray = []
// const allCategoriesArray = []
let outfits_url = "http://localhost:3000/outfits"
let outfit_items_url = "http://localhost:3000/outfit_items" 

document.addEventListener("DOMContentLoaded", () => {
    console.log("%cPage Loaded!", "color:green;")   
    
})

// START OF Amy moved these functions (Jacob's) out of DOMContentLoaded

const navBarClothes = document.getElementById("nav-bar-clothes")
// navBarClothes.addEventListener("mouseover", mouseOverToo)
// navBarClothes.addEventListener("mouseout", mouseOutToo) 

navBarClothes.addEventListener("click", () => {
    // const navBarClothesSpan = document.getElementById("nav-bar-clothes-span")
    clearShowDiv()
    clearCategoriesDiv()
    clearAddItemDiv()
    fetchItems()
    getCategories()
    makeAddItemFormButton()
})

const navBarOutfits = document.getElementById("nav-bar-outfits")
// navBarOutfits.addEventListener("mouseover", mouseOver)
// navBarOutfits.addEventListener("mouseout", mouseOut)

navBarOutfits.addEventListener("click", () => {
    clearShowDiv()
    clearCategoriesDiv()
    fetchOutfits()
})

const clearAddItemDiv = () => {
    const div = document.getElementById('add-item')
    while (div.firstChild){
        div.removeChild(div.firstChild)
    }
}
// END OF Amy moved these functions (Jacob's) out of DOMContentLoaded



// let mouseOver = () => {
//     document.getElementById("nav-bar-outfits").style.color = "aqua"
// }

// let mouseOut = () => {
//     document.getElementById("nav-bar-outfits").style.color = "black" 
// }

// let mouseOverToo = () => {
//     document.getElementById("nav-bar-clothes").style.color = "aqua"     
// }

// let mouseOutToo = () => {
//     document.getElementById("nav-bar-clothes").style.color = "black" 
// }

const clearShowDiv = () => {
    const showDiv = document.getElementById("item-container")
    while (showDiv.firstChild){
        showDiv.removeChild(showDiv.firstChild)
    }
}

const clearCategoriesDiv = () => {
    const catDiv = document.getElementById("categories")
    while (catDiv.firstChild){
        catDiv.removeChild(catDiv.firstChild)
    }
}


// START OF JOSH'S CODE
const fetchItems = () => {
    fetch("http://localhost:3000/items")
    .then(resp => resp.json())
    .then(json => seperateItems(json))
}

const seperateItems = items => {
    items.forEach(item => appendItemToShowDiv(item) )
}


const appendItemToShowDiv = (item) => {
    // const showDiv = document.getElementById("show-item")
    const container = document.getElementById("item-container")
    const itemDiv = makeItemCard(item)
    container.appendChild(itemDiv)
}

const makeItemCard = item => {
    //console.log(item)   
    allItemsArray.push(item)
    const itemDiv = document.createElement("div")
    itemDiv.className = "card" 
    itemDiv.id = `item-${item.id}`

    const categoriesSpan = document.createElement("span")
    categoriesIdArray = item.categories.map(cat => `(${cat.id})`)
    categoriesSpan.innerText = `${categoriesIdArray}`
    categoriesSpan.id = `category-span-${item.id}`
    categoriesSpan.style.display = "none"

    const img = document.createElement("img")
    img.src = item.image_url
    img.classList.add("img-fluid")
    
    // const h4 = document.createElement("h4")
    // h4.innerText = item["name"]

    itemDiv.addEventListener("click", () => {
        // this will remove items from showDiv and display this item 
        console.log(item)
        clearCategoriesDiv()
        clearShowDiv()
        makeItem(item) 
    })

    itemDiv.appendChild(img)
    // itemDiv.appendChild(h4)
    itemDiv.appendChild(categoriesSpan)

    return itemDiv
}



const getCategories = () => {
    fetch(categories_url)
    .then(res => res.json())
    .then(json => seperateCategories(json))
}

const seperateCategories = categories => {
    const categoriesDiv = document.getElementById("categories")
    while (categoriesDiv.firstChild){
        categoriesDiv.removeChild(categoriesDiv.firstChild)
    }
    const ul = document.createElement("ul")
    ul.id = "category-display-ul"
    categoriesDiv.appendChild(ul)

    let categoryHeader = document.createElement("h5")
    categoryHeader.textContent = "Categories:"
    categoriesDiv.appendChild(categoryHeader)

    const ul2 = document.createElement('ul')
    ul2.id ="category-display-form-ul"
    const addItemForm = document.getElementById("add-item-form")
    addItemForm.appendChild(ul2)

    categories.forEach(category => appendToCategoriesDiv(category))

    categories.forEach(category => {
        const li = document.createElement("li")
        const input = document.createElement("INPUT")
        input.setAttribute("type", "checkbox")
        input.name = category.id
        input.className = "checkbox-submit"
        li.innerText = category["name"]
        li.appendChild(input)
        ul2.appendChild(li)
    })
}

const addCheckboxForCategories = categories => {
    categories.forEach(category => {
        const li = document.createElement("li")
        const input = document.createElement("INPUT")
        input.setAttribute("type", "checkbox")
        input.name = category.id
        input.className = "checkbox-submit"
        li.innerText = category["name"]
        li.appendChild(input)
        // ul2.appendChild(li)
    })
}

const appendToCategoriesDiv = (category)  => {
    const categoriesDiv = document.getElementById("categories")
    const liCategory= makeCategoriesCard(category)
    categoriesDiv.appendChild(liCategory)
}

const makeCategoriesCard = category => {
    const li = document.createElement("li")
    const input = document.createElement("INPUT")
    input.setAttribute("type", "checkbox")
    li.innerText = category["name"]
    input.id = `category-${category.id}` 
    input.addEventListener("change", (e) => {
        if (input.checked === true){
            allItemsArray.forEach(item => {
                const span = document.getElementById(`category-span-${item.id}`)
                const itemDiv = document.getElementById(`item-${item.id}`)
                if (!span.innerText.includes(`(${category.id})`)){
                    itemDiv.style.display = "none"
                } else 
                    itemDiv.style.display = ""
            })

        } else 
        allItemsArray.forEach(item => {
            const span = document.getElementById(`category-span-${item.id}`)
            const itemDiv = document.getElementById(`item-${item.id}`)
            if (span.innerText.includes(`(${category.id})`)){
                itemDiv.style.display = ""
            } else 
                itemDiv.style.display = ""
        })
    })
    li.appendChild(input)
    return li 
}

const makeAddItemFormButton = () => {
    const addFormDiv = document.getElementById("add-item") 
    const button = document.createElement("button")
    button.innerText = "Add Clothing"
    addFormDiv.appendChild(button)
    button.addEventListener("click", () => {
        button.style.display = "none"
        showAddItemForm()
    })
}


const showAddItemForm = () => {
    const form = document.getElementById("add-item-form")
    const addFormDiv = document.getElementById("add-item")
    addFormDiv.appendChild.form
    const submitButton = document.createElement("INPUT")
    submitButton.setAttribute("type", "submit")
    submitButton.innerText = "submit"
    form.appendChild(submitButton)
    form.style.display = ""
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let checkboxes = Array.from(document.getElementsByClassName("checkbox-submit"))
        let checked = []
        checkboxes.forEach(checkbox => {
            if (checkbox.checked === true){
                console.log(checkbox['name'])
                checked.push(parseInt(checkbox['name']))
            } 
        })
        const newItem = {
            name: e.target["clothing-name"].value,
            image_url: e.target["image-url"].value,
            user_id: 1,
            category_ids: checked, 
            times_worn: 0,
            favortite: false
        } 
        addItemtoDB(newItem)
    })
}

const addItemtoDB = item => {
    console.log(item)
    fetch(items_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(item)
    }).then(res => res.json()).then(json => appendItemToShowDiv(json))
}
// END OF JOSH'S CODE


// START OF JACOB'S CODE
const fetchOutfits = () => {
    fetch(outfits_url)   
    .then(resp => resp.json())
    //.then(json => console.log(json))
    .then(json => outfitItemsArray(json))
}

const outfitItemsArray = (outfitItemsArray) => {
    //outfitsArray.forEach(outfit => console.log(outfit)) 
    outfitItemsArray.forEach(outfit => displayOutfit(outfit)) 
}

const displayOutfit = outfit => {
    console.log(outfit) 
    //let outfitList = document.getElementById("show-item") 
    let outfitList = document.getElementById("item-container") 
    let outfitSpan = document.createElement("span")
    outfitSpan.textContent = `Outfit Name- ${outfit.name}`
    let outfitImg = document.createElement("img")
    //console.log(outfit.items) 
    //outfitImg.src = outfit.items[0].image_url  
    outfit.items.forEach(item => 
        outfitImg.src = item.image_url 
    )
  //outfitImg.src = outfit.items[0].image_url  
    let wornOutfit = document.createElement("p") 
    outfit.items.forEach(item =>
        wornOutfit.textContent = item.times_worn 
    )

    let favoriteOutfit = document.createElement("p")
        outfit.items.forEach(item =>
        favoriteOutfit.textContent = item.favorite  
    )

    outfitImg.addEventListener("click", () => {
        clearShowDiv()
        showOutfit(outfit)
    })

    
    outfitList.appendChild(outfitImg)  
    outfitList.appendChild(outfitSpan)
    outfitList.appendChild(wornOutfit)
    outfitList.appendChild(favoriteOutfit)
    //outfitList.appendChild(createdAt)    
}
// END OF JACOB'S CODE


// START OF AMY'S CODE
const itemsArray = (itemsArray) => {
    // itemsArray.forEach(item => console.log(item))
    itemsArray.forEach(item => makeItem(item))
}

const makeItem = (item) => {
    let itemDiv = document.getElementById("item-container")

    let img = document.createElement("img")
    img.classList.add("item-image")
    img.src = item.image_url
    // console.log(item)

    let ul = document.createElement("ul")
    ul.setAttribute("id", "item-info")

    let favoriteDisplay = document.createElement('p')
    updateFavoriteDisplay(item, favoriteDisplay)


    // let nameLi = document.createElement("h2")
    let nameLi = document.createElement("h5")
    nameLi.setAttribute("id", "item-name")
    nameLi.textContent = item.name

    let timesWornLi = document.createElement("li")
    timesWornLi.textContent = `Times Worn: ${item.times_worn}`

    let categoriesLi = document.createElement("li")
    categoriesLi.textContent = "Categories:"

    let itemCategoriesUl = document.createElement("ul")
    item.categories.forEach(outfit => {
        let itemCategoriesLi = document.createElement("li")
        itemCategoriesLi.textContent = outfit.name

        itemCategoriesUl.appendChild(itemCategoriesLi)
    })

    let outfitsLi = document.createElement("li")
    outfitsLi.textContent = "Outfits:"

    // iterate thru outfits array
    let itemOutfitsUl = document.createElement("ul")
    itemOutfitsUl.id = "item-outfits-display"
    
    // updateOutfitsDisplayDOM(item)
    item.outfits.forEach(outfit => {
        let itemOutfitsLi = document.createElement("li")
        itemOutfitsLi.textContent = `${outfit.name} ` 
        const removeButton = document.createElement('button')
        removeButton.innerText = "Remove"
        removeButton.addEventListener("click", () => {
            deleteItemOutFit(item, outfit)
            itemOutfitsLi.remove()
        })
        itemOutfitsLi.appendChild(removeButton)   
        itemOutfitsUl.appendChild(itemOutfitsLi)
    })
    
    let buttonsUl = document.createElement("ul")
    let buttonsLi = document.createElement("li")
    // buttonsLi.classList.add("item-info-buttons")
    // buttonsLi.setAttribute("id", "item-info-buttons")
    
    // add to favorites (toggle heart button)
    let favItemBtn = document.createElement("button")
    favItemBtn.textContent = "Add to Favorites"
    favItemBtn.addEventListener("click", () => {
        // console.log(e)
        item.favorite = !item.favorite 
        updateItem(item).then(json => updateFavoriteDisplay(json, favoriteDisplay))
    })
    
    // add to outfit button (drop down menu)
    let addItemToOutfitBtn = document.createElement("button")
    addItemToOutfitBtn.textContent = "Add to Outfit"
    addItemToOutfitBtn.addEventListener("click", () => {
        const dropDown = document.getElementById('dropdown')
        dropDown.style.display = ''
        clearCategoriesDiv()
        showAddToOutfitForm(item)
        // console.log(e)
    })

    // edit item button
    let editItemBtn = document.createElement("button")
    editItemBtn.textContent = "Edit Item"
    editItemBtn.addEventListener("click", () => {
        // console.log(e)
        clearCategoriesDiv()
        showEditItemForm(item) 
    })
    
    // delete item button
    let deleteItemBtn = document.createElement("button")
    deleteItemBtn.textContent = "Remove From Closet"
    deleteItemBtn.addEventListener("click", () => {
        deleteItem(item)
        itemDiv.remove()
    })
    
    ul.appendChild(nameLi)
    ul.appendChild(timesWornLi)
    ul.appendChild(categoriesLi)
    ul.appendChild(itemCategoriesUl)
    ul.appendChild(outfitsLi)
    ul.appendChild(itemOutfitsUl)
    
    itemDiv.appendChild(img)

    itemDiv.appendChild(favoriteDisplay)

    itemDiv.appendChild(ul)
    itemDiv.appendChild(buttonsUl)

    buttonsUl.appendChild(buttonsLi)
    buttonsLi.appendChild(favItemBtn)
    buttonsLi.appendChild(addItemToOutfitBtn)
    buttonsLi.appendChild(editItemBtn)
    buttonsLi.appendChild(deleteItemBtn)

    // console.log(item)
}

const showAddToOutfitForm = item => {
    // clearCategoriesDiv()
    const dropDown = document.getElementById("dropdown")
    dropDown.style.display = ''
    const dropDownDiv = document.getElementById('categories')
    dropDownDiv.appendChild(dropDown) 
    fetchOutfitsForDropDown().then(json => displayOutfitsDropDown(json, item))
}

//trying to make so outfits wont display if item is alrwady if outfit 
// const displayOutfitsDropDown = (outfits, item) => {
//     const outfitIds = outfits.map(outfit => outfit.id)
//     const outfitArray = Array.from(outfits)
//     console.log(outfitArray)
//     if (item.outfits){
//         const itemOutfitIds = item.outfits.map(outfit => outfit.id)
//         itemOutfitIds.forEach(id => {
//             if (!outfitIds.includes(id)) {
//                 outfitArray.filter( out => {
//                     out.id === id 
//                 })
//             }

//         })

//     } 
//     console.log(outfitArray)
//     console.log(outfitIds)
// }

const deleteItem = item => {
    fetch(`http://localhost:3000/items/${item.id}`, {
        method: "DELETE"
    })
}

const displayOutfitsDropDown = (outfits, item) => {
    // const dropDownContent = document.getElementById("dropdown-content")
    const dropDownSelect = document.getElementById("dropdown-select")
    outfits.forEach(outfit => {
        const option = document.createElement('option')
        option.value = outfit.id 
        option.innerText = outfit.name
        dropDownSelect.appendChild(option)
    })
    const dropDownForm = document.getElementById("dropdown")
    dropDownForm.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(e)
        console.log(e.target[0].value)
        itemOutfit = {
            item_id: item.id,
            outfit_id: parseInt(e.target[0].value)
        }
        addItemToOutfit(itemOutfit).then(json => {
            clearItemOutfitDisplay()
            updateOutfitsDisplayDOM(json["item"])
        })
        dropDownForm.style.display = 'none'
    })
}

const clearItemOutfitDisplay = () => {
    let itemOutfitsUl = document.getElementById('item-outfits-display')
    while (itemOutfitsUl.firstChild) {
        itemOutfitsUl.removeChild(itemOutfitsUl.firstChild)
    }
}

const updateOutfitsDisplayDOM = (item) => {
    let itemOutfitsUl = document.getElementById('item-outfits-display')
    item.outfits.forEach(outfit => {
        let itemOutfitsLi = document.createElement("li")
        itemOutfitsLi.textContent = outfit.name
        const removeButton = document.createElement('button')
        removeButton.innerText = "Remove"
        removeButton.addEventListener("click", () => {
            deleteItemOutFit(item, outfit)
            itemOutfitsLi.remove()
        })
        itemOutfitsLi.appendChild(removeButton)
        itemOutfitsUl.appendChild(itemOutfitsLi)
    })
}

const deleteItemOutFit = (item, outfit) => {
    fetch(`http://localhost:3000/outfit_items/1`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            item_id: item.id,
            outfit_id: outfit.id 
        })
    })
}


const addItemToOutfit = itemOutfit => {
    return fetch(`http://localhost:3000/outfit_items`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify(itemOutfit)
    }).then(res => res.json())
}


const fetchOutfitsForDropDown = () => {
    return fetch('http://localhost:3000/outfits')   
    .then(resp => resp.json())
}

const showEditItemForm = item => {
    const editForm = document.getElementById('edit-form')
    const catDiv = document.getElementById('categories')
    catDiv.appendChild(editForm)
    editForm.style.display = ''
    editForm['item-name'].value = item.name 
    editForm['item-image-url'].value = item.image_url 
    item.categories.forEach(category => {
        const li = document.createElement("li")
        const input = document.createElement("INPUT")
        input.setAttribute("type", "checkbox")
        input.name = category.id
        input.checked = true 
        input.className = "checkbox-edit-submit"
        li.innerText = category["name"]
        li.appendChild(input)
        editForm.appendChild(li)
    })
    editForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let checkboxes = Array.from(document.getElementsByClassName("checkbox-edit-submit"))
        let checked = []
        checkboxes.forEach(checkbox => {
            if (checkbox.checked === true){
                console.log(checkbox['name'])
                checked.push(parseInt(checkbox['name']))
            } 
        })
        editedItem = {
            name: e.target['item-name'].value,
            image_url: e.target['item-image-url'].value,
            category_ids: checked,
            favorite: item.favorite,
            times_worn: item.times_worn,
            id: item.id 
        }
        updateItem(editedItem).then(json => console.log(json))
    })
} 



const updateFavoriteDisplay = (item, favoriteDisplay) => {
    if (item.favorite === true){
        favoriteDisplay.innerText = "<3"
    } else {
        favoriteDisplay.innerText = '</3'
    }
}

const updateItem = item => {
    return fetch(`http://localhost:3000/items/${item.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify(item)
    }).then(res => res.json())
}
// add deleteItem() to 
// const deleteItem = (item) => {
//     fetch(`http://localhost:3000/items/${item}`, {
//         method: "DELETE"
//     })
// }

// END OF AMY'S CODE


// START OF JACOB'S CODE #2
const showOutfit = outfit => {
    clearShowDiv()
    const container = document.getElementById("item-container")
    const outFitDiv = document.createElement("div")
    const h2 = document.createElement('h2')
    h2.innerText = outfit.name 
    outFitDiv.appendChild(h2)
    const editOutfitbutton = document.createElement('button')
    editOutfitbutton.innerText = 'Edit Outfit'
    outFitDiv.appendChild(editOutfitbutton)
    editOutfitbutton.addEventListener("click", () => {
        displayEditOutfitForm(outfit)
        editOutfit(outfit)
        console.log(outfit)
    })
    const deleteOutfitButton = document.createElement("button")
    container.appendChild(deleteOutfitButton)
    deleteOutfitButton.innerText = "Delete Outfit"
    deleteOutfitButton.addEventListener("click", () => {
        deleteOutfit(outfit)
        outFitDiv.remove()
    })
    
    outfit.items.forEach(item => {
        const itemDiv = document.createElement("div")
        const img = document.createElement('img')
        itemDiv.innerText = item['name']
        img.src = item.image_url 
        const removeButton = document.createElement("button")
        removeButton.innerText = "Remove from Outfit"
        removeButton.addEventListener("click", () => {
            removeItemFromOutfit(outfit, item)
            itemDiv.remove()
        })
        itemDiv.appendChild(img)
        itemDiv.appendChild(removeButton)
        outFitDiv.appendChild(itemDiv)
    })
    container.appendChild(outFitDiv)
}

const removeItemFromOutfit = (outfit, item) => {
    fetch("http://localhost:3000/outfit_items/1", {
        method: "DELETE",
        headers: {
            "Content_type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
           outfit: outfit.id,
           item: item.id
        })
    })
}

const deleteOutfit = outfit => {
    console.log(outfit)
    fetch(`http://localhost:3000/outfits/${outfit.id}`, {
        method: "DELETE"
    })
}

const displayEditOutfitForm = outfit => {
    const editFormDiv = document.getElementById('add-item')
    const editForm = document.getElementById("outfit-edit-form")
    editFormDiv.appendChild(editForm)
    editForm.style.display = ''
    editForm['name'].value = outfit.name
}

const editOutfit = outfit => {
    const editForm = document.getElementById('outfit-edit-form')
    editForm.addEventListener("submit", (e) => {
        e.preventDefault()
        editedOutfit = {
            name: e.target.name.value,
            id: outfit.id 
        }
        editForm.style.display = 'none'
        updateOutfit(editedOutfit)
    })
}

const updateOutfit = outfit => {
    fetch(`http://localhost:3000/outfits/${outfit.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(outfit)
    }).then(res => res.json()).then(json => showOutfit(json))
}
// END OF JACOB'S CODE #2
