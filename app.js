document.addEventListener('DOMContentLoaded', () => {
    
    // array of objects, each object's name is now foodCards[i], i 0 to 11
    // each object represents the food card with its name (optional as not used anywhere) 
    // and its url/src that the canvas image will get converted into
    // there're 12 objects in total for 6 different types of foods
    let foodCards = [
        {
            name: 'Cheese Burger',
            url: 'images/cheeseburger.png',
        },
        {
            name: 'Cheese Burger',
            url: 'images/cheeseburger.png'
        },
        {
            name: 'French Fries',
            url: 'images/fries.png'
        },
        {
            name: 'French Fries',
            url: 'images/fries.png'
        },
        {
            name: 'Hot Dog',
            url: 'images/hotdog.png'
        },
        {
            name: 'Hot Dog',
            url: 'images/hotdog.png'
        },
        {
            name: 'Pizza',
            url: 'images/pizza.png'
        },
        {
            name: 'Pizza',
            url: 'images/pizza.png'
        },
        {
            name: 'Milk Shake',
            url: 'images/milkshake.png'
        },
        {
            name: 'Milk Shake',
            url: 'images/milkshake.png'
        },
        {
            name: 'Ice Cream',
            url: 'images/ice-cream.png'
        },
        {
            name: 'Ice Cream',
            url: 'images/ice-cream.png'
        },
    ]
    
    // jumbling array of objects when page refreshes
    // every object (of 12 total) will be at different position of array every time page loads
    foodCards.sort(function() {return 0.5 - Math.random();});

    // show score by filling empty <span> tag
    // score variable changes as player keeps winning
    let score = 0;
    let scoreElement = document.querySelector('span');
    scoreElement.textContent = score;
    
    // appending 12 canvas images in div
    // canvas is the total playable area, canvas image is the individual image which form the 
    // whole canvas
    let div = document.querySelector('div');
    for(let i = 0; i < 12; i ++) {

        // creating canvas image 12 times, assigning an id attribute to all canvas images: 0 to 11
        let canvasImage = document.createElement('img');
        canvasImage.setAttribute('src', 'images/blank.png');
        canvasImage.setAttribute('class', 'canvas-image');
        canvasImage.setAttribute('id', i);

        // Now append each canvas image in div
        div.appendChild(canvasImage);
    }

    // need to add event listener of click to every canvas image so first fetching all canvas
    // images in array allCanvasImages
    let allCanvasImages = document.querySelectorAll('.canvas-image');

    // canvasImageIds array of size 2 will contain ids of those canvas images which are clicked  
    // and have thier urls changed to foodCard's when clicked, need - so we can keep track of those 
    // canvas images which are clicked and check if they're same foodCards. Counter clickCount lets us  
    // know when 2 clicks are made so we can stop player from making more clicks and check if the two
    // cards match
    let canvasImageIds = [];
    let clickCount = 0;

    for(let i = 0; i < 12; i ++) {

        // adding click event to every BLANK(not already clicked) canvas image to increment counter clickCount,
        // save its id in array canvasImageIds and changing it's url to a foodCard's with same index as canvas 
        // image's id. Note we're mapping canvas image's id with foodCard array's index - a particular object
        allCanvasImages[i].addEventListener('click', () => {
            // necessary to check if we're clicking a BLANK canvas image otherwise 2 problems - 
            // 1. score increases if we're clicking same image twice
            // 2. score increases if we're click again 2 same cards whose score is already counted (means 
            // which are already flipped) 
            if(allCanvasImages[i].getAttribute('src') == 'images/blank.png'){
                clickCount ++;
                canvasImageIds.push(allCanvasImages[i].getAttribute('id'));
                allCanvasImages[i].setAttribute('src', foodCards[i].url);
            }
            if(clickCount == 2) {
                check();
            }
        });
    }

    // checking if 2 same foodCards are clicked
    function check() {
        // fact used id of canvasImage is index of foodCards Array and if 2 same foodCards are clicked
        // then their urls will also be same
        if(foodCards[canvasImageIds[0]].url == foodCards[canvasImageIds[1]].url) {
            // add 10 score on every match (so max score is 60)
            score += 10;
            scoreElement.textContent = score;

            // if user has finished dont show congrats message otherwise just MATCH
            // both after 500 ms
            if(score == 60) {
                setTimeout(() => {alert('Congratulations! You\'ve Won');}, 500);
            }
            else {
                setTimeout(() => {alert('MATCH');}, 500);
            }
        }
        // if clicked cards not same need to display MISMATCH (after 500 ms delay) and revert 
        // both card's urls back to canvas image's src
        else {
            // reason for not using canvasImageIds[0] and canvasImageIds[1] directly and instead using id0 and id1
            // - due to some unknown reason, canvasImageIds[0]'s and canvasImageIds[1]'s value inside the arrow
            // function of setTimeout function is always undefined, but id0 and id1 retain their value 
            let id0 = canvasImageIds[0];
            let id1 = canvasImageIds[1];

            setTimeout(() => {
                alert('MISMATCH');
                // reset canvas image of unmatched cards inside setTimeout and not outside as
                // it gets reset quickly if kept outside as code below setTimeout is executed
                // simultaneously
                document.getElementById(id0).setAttribute('src', 'images/blank.png');
                document.getElementById(id1).setAttribute('src', 'images/blank.png');
            }, 500);
        }
        // reset counter so we can start counting for next 2, make canvasImageIds array null again
        clickCount = 0;
        canvasImageIds = [];
    }    

    // reloading webpage when clicking reset button
    let btn = document.querySelector('button');
    btn.addEventListener('click', () => {location.reload();});
});