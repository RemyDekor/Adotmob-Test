let d = document;

let staticDuration = 1000;
let transitionDuration = 700;
let staggerDuration = 200;
let timeToWait = 0;

let logo = d.getElementById('logo');
let conditions = d.getElementById('conditions');

let messageDivs = d.getElementsByClassName('message');
let messageInnerElements = [];
for(i = 0 ; i < messageDivs.length ; i++) {
    messageInnerElements[i] = selectAllFinalChildren( messageDivs[i] );
    /*----- For my specific use here, I will get the parent node instead of the <small> and <br/> elements -----*/
    for(let j = 0 ; j < messageInnerElements[i].length ; j++) {
        if(messageInnerElements[i][j].tagName == 'SMALL' || messageInnerElements[i][j].tagName == 'BR') {
            messageInnerElements[i].splice(j, 1, messageInnerElements[i][j].parentNode);
        }
    }
}

/* Do not display all elements that will be animated in */
for(let i = 0 ; i < messageDivs.length ; i++) {
    messageDivs[i].style.display = 'none';
}
conditions.style.display = 'none';

/* Hide with according classes elements that will be translated-in or faded-in */
let translatedInElements = [];
translatedInElements.push(...messageInnerElements[0]);
translatedInElements.push(...messageInnerElements[1]);
translatedInElements.push(...messageInnerElements[2]);

for(let i = 0 ; i < translatedInElements.length ; i++) {
    translatedInElements[i].classList.add('translated-out');
}

let fadedInElements = [];
fadedInElements.push(...messageInnerElements[3]);
fadedInElements.push(conditions);

for(let i = 0 ; i < fadedInElements.length ; i++) {
    fadedInElements[i].classList.add('faded-out');
}



/* start the first animation (next ones are called with callbacks) */
view1();

/* ---- VIEW 1 ---- */
function view1() {
    messageDivs[0].style.display = 'flex';
    for(let i = 0 ; i < messageInnerElements[0].length ; i++) {
        setTimeout(() => {
            messageInnerElements[0][i].style.transition = transitionDuration.toString() + 'ms';
            messageInnerElements[0][i].classList.remove('translated-out');
        }, staggerDuration*(i+1));
        timeToWait += staggerDuration*(i+1);
    }

    timeToWait += staticDuration;
    setTimeout(() => {
        logo.style.transition = transitionDuration.toString() + 'ms';
        logo.classList.add('in-corner');
    
        for(let i = 0 ; i < messageInnerElements[0].length ; i++) {
            messageInnerElements[0][i].classList.add('faded-out');
        }
    }, timeToWait);

    timeToWait += transitionDuration;
    setTimeout(() => {
        view2();
    }, timeToWait);
}

/* ---- VIEW 2 ---- */
function view2() {
    timeToWait = 0;

    messageDivs[0].style.display = 'none';
    messageDivs[1].style.display = 'flex';

    conditions.style.display = 'block';

    timeToWait += staggerDuration;
    setTimeout(() => {  
    conditions.style.transition = transitionDuration.toString() + 'ms';
    conditions.classList.remove('faded-out');
    }, timeToWait);
    
    for(let i = 0 ; i < messageInnerElements[1].length ; i++) {
        setTimeout(() => {
            messageInnerElements[1][i].style.transition = transitionDuration.toString() + 'ms';
            messageInnerElements[1][i].classList.remove('translated-out');
        }, staggerDuration*(i+1));
        timeToWait += staggerDuration*(i+1);
    }
    
    timeToWait += staticDuration;
    setTimeout(() => {    
        for(let i = 0 ; i < messageInnerElements[1].length ; i++) {
            messageInnerElements[1][i].classList.add('faded-out');
        }
    }, timeToWait);
    
    timeToWait += transitionDuration;
    setTimeout(() => {
        view3();
    }, timeToWait);
}

/* ---- VIEW 3 ---- */
function view3() {
    timeToWait = 0;

    messageDivs[1].style.display = 'none';
    messageDivs[2].style.display = 'flex';

    for(let i = 0 ; i < messageInnerElements[2].length ; i++) {
        setTimeout(() => {
            messageInnerElements[2][i].style.transition = transitionDuration.toString() + 'ms';
            messageInnerElements[2][i].classList.remove('translated-out');
        }, staggerDuration*(i+1));
        timeToWait += staggerDuration*(i+1);
    }
    
    setTimeout(() => {    
        for(let i = 0 ; i < messageInnerElements[2].length ; i++) {
            messageInnerElements[2][i].classList.add('faded-out');
        }
        conditions.classList.add('faded-out');
    }, timeToWait + staticDuration);
    timeToWait += staticDuration;

    setTimeout(() => {
        view4();
    }, timeToWait + transitionDuration);
    timeToWait += transitionDuration;
}

/* ---- VIEW 4 ---- */
function view4() {
    timeToWait = 0;

    conditions.style.display = 'none';
    messageDivs[2].style.display = 'none';
    messageDivs[3].style.display = 'flex';

    for(let i = 0 ; i < messageInnerElements[3].length ; i++) {
        setTimeout(() => {
            messageInnerElements[3][i].style.transition = transitionDuration.toString() + 'ms';
            messageInnerElements[3][i].classList.remove('faded-out');
        }, staggerDuration*(i+1));
        timeToWait = staggerDuration*(i+1);
    }
    setTimeout(() => {
        maps.classList.add('covervideo');
    }, timeToWait + staggerDuration);
}





/*----- RECURSIVE FUNCTION THAT RETURNS AN ARRAY WITH EVERY "FINAL" CHILDREN OF THE PASSED ELEMENT (every children that doesnt have a child)-----*/
// Small issue here : the order of the elements inside the "finalChildren" array is not the same as in HTML, as the more nested an element is, the latter it is added to the array
function selectAllFinalChildren(el) {
    if(el.children.length == 0) {
        console.error(el, 'has no child');
        return el;
    }

    let currentElements = [el];
    let nextElements = [];
    let finalChildren = [];
    let recursions = 0;

    // A loop that recursively selects an element's child, until there is none :
    while(currentElements.length > 0) {
        recursions++;
        if (recursions > 10) {
            console.error("too much recursion")
            break;
        }
        
        for(let i = 0 ; i < currentElements.length ; i++) {
            // if the element has no child, add this element to the finalChildren array
            if(currentElements[i].children.length == 0) {
                finalChildren.push(currentElements[i]);
            } else { // else, select the children of this element and add them to the nextElements array    
                for(let j = 0; j < currentElements[i].children.length ; j++) {
                    nextElements.push(currentElements[i].children[j]);
                }
            }
        }
        currentElements = nextElements;
        nextElements = [];
    }

    return finalChildren;   
}