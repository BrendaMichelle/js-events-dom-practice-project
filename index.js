// Write your code here
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const contentContainer = document.querySelector("div#content-container")

const img = contentContainer.querySelector("img")
const p1 = contentContainer.querySelector("p")
const p2 = contentContainer.getElementsByTagName("p")[1]

let currContentId;

function renderNewContent(){
    const content = contentArray[getRandomInt(contentArray.length-1)]
    renderContent(content)
}

function renderContent(content){
    currContentId = content.id

    img.src = content.photo
    img.alt = content.description
        
    p1.textContent = content.description
    p2.textContent = `${content.likes} Likes`
}

renderNewContent()

const showRandomPicBtn = document.querySelector("#content-container > button:nth-child(5)")

showRandomPicBtn.addEventListener('click', ()=> {
    renderNewContent()
})

const likeBtn = document.querySelector("#content-container > button:nth-child(4)")

likeBtn.addEventListener('click', ()=> {
    let likedContent = contentArray.find((cnt)=>{
        return cnt.id === currContentId
    })
    likedContent.likes = likedContent.likes + 1
    p2.textContent = `${likedContent.likes} Likes`
})

const addForm = document.getElementsByTagName("form")[1]
addForm.addEventListener("submit", (event)=> {
    event.preventDefault()
    let currId = contentArray.length + 1

    let urlInput = event.target[0].value
    let descriptionInput = event.target[1].value
    let likesVal;

    if (event.target[2].checked){
        likesVal = 10
    } else {
        likesVal = 0
    }

    let newContent = {
        id: currId,
        photo: urlInput,
        description: descriptionInput,
        likes: likesVal
    }

    contentArray.push(newContent)
    renderContent(newContent)

    addForm.reset()

})

const updateForm = document.getElementsByTagName("form")[0]

updateForm.addEventListener('submit', (event)=> {
    event.preventDefault()

    let urlUpdate = event.target[0].value
    let descriptionUpdate = event.target[1].value

    let updatedContent = contentArray.find((cnt)=>{
        return cnt.id === currContentId
    })

    updatedContent.photo = urlUpdate
    updatedContent.description = descriptionUpdate

    renderContent(updatedContent)
    updateForm.reset()
})