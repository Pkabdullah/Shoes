
const imgContainer = document.querySelector(".showcase > div");
const img = document.querySelector(".showcase img");
const shadow = document.querySelector(".shadow");

const thumb = document.querySelectorAll(".thumbs img");
const titleOverlay = document.querySelector(".titleOverlay");
const title = document.querySelector(".titleText");
const desc = document.querySelector(".description");

const sizes = document.querySelectorAll(".sizes > li");
const stars = document.querySelectorAll(".stars span");
const price = document.querySelector(".price");
const colorBtn = document.querySelectorAll(".color");

const pag = document.querySelectorAll(".pag");
const prev = document.querySelector(".arr-left");
const next = document.querySelector(".arr-right");
const shoeNum = document.querySelector(".shoe-num");
const shoeTotal = document.querySelector(".shoe-total");

// id variables

let id = 1;
let colorType = 1;
let shoe = 1;

const colors = [
    [
        "#ae001b",
        "#111111"
    ],
    [
        "linear-gradient(0deg,orange,red)",
        "#bda08e"
    ],
    [
        "linear-gradient(0deg, #00b8ea 0% ,#e6882d 50% ,  #e56da6 100%)",
        "linear-gradient(0deg,#dae766,#b2afaa)"

    ],
];

const prices = ["200000", "450000", "120000"];

const names = [
    [
        "Red Kie Jordan Max Aura 3",
        "Black Nike Jordan Max Aura 3"
    ],
    [
        "Black/Orange Nike Air Max 95",
        "Beige/Gray Nike Air Max 95"
    ],
    [
        "Colorful Nike Jordan Delta 2 SP",
        "Gray Nike Jorsan Delta 2 SP"
    ],
]

const descriptions = [
    [
        "Introducing the Nike Air Velocity XT: a cutting-edge fusion of style, performance, and innovation. These shoes are not just footwear; they are a statement, a commitment to excellence in every stride. Designed for the modern athlete, the Air Velocity XT seamlessly blends functionality with aesthetics, ensuring you look as good as you feel on the track, court, or streets",
    ],

    [
        "Beneath your feet, the Nike Air cushioning technology revolutionizes your experience with responsive and lightweight support. Whether you're jumping, running, or simply walking, the Air Velocity XT delivers an unparalleled level of comfort, absorbing impact and propelling you forward with each step."
    ],
    ["From the gym to the urban jungle, the Nike Air Velocity XT is a symbol of confidence and style. The iconic Nike Swoosh adorns the sides, representing a legacy of excellence in athletic footwear. Elevate your game, express your style, and celebrate the journey with the Nike Air Velocity XT – where performance meets fashion."
    ],
];

const ratings = [4, 5, 3];

function getImage(id, imgType, shoe, colorType, extension) {
    return ("img/" + imgType + "/shoe" + shoe + "-" + colorType + "/img" + id + "." + extension);
}
// reset active state to buttons

function resetActive(element, elementClass, i) {
    for (let i = 0; i < element.length; i++) {
        element[i].classList.remove(elementClass + "-active");
    }
    element[i].classList.add(elementClass + "-active");
}

// this function will activate an animation and then deactivate it so that it can be  activate again later

function animate(element, time, anim) {
    element.style.animation = anim;

    setTimeout(() => {
        element.style.animation = "none";
    }, time);
}

// This function reassigns the color for the color buttons, you can look back at this effect in the app preview , For example when the is changes you can see the buttons switch colors for the new shoes

function assignColors(i, shoe) {
    colorBtn[i].style.background = colors[shoe - 1][i];
}

// This function takes the numbers from the rating array and fills out the dame ammountt of star

function resetStars(shoe) {
    for (let i = 0; i < stars.length; i++) {
        stars[i].innerText = "star_outline";
    }

    for (let i = 0; i < ratings[shoe]; i++) {
        stars[i].innerText = "star";
    }
}

//  changing shoe sizes

for (let i = 0; i < sizes.length; i++) {
    sizes[i].addEventListener("click", (e) => {
        resetActive(sizes, "size", i)
    });
}


// setting up all of the initital data for the first shoes

shoeTotal.innerText = "0" + pag.length;
shoeNum.innerText = "0" + shoe;
price.innerText = "PKR" + prices[0];
resetStars(shoe - 1);
title.innerText = names[0][0];
desc.innerText = descriptions[0]

// // changing images

for (let i = 0; i < thumb.length; i++) {
    thumb[i].addEventListener("click", (e) => {

        id = i + 1;

        img.src = getImage(
            "showcase", shoe, colorType, id, "png"
        );

        resetActive(thumb, "thumb", i)

        animate(imgContainer, 550, "fade 500ms ease-in-out")
    });

};


for (let i = 0; i < colorBtn.length; i++) {

    assignColors(i, shoe);

    colorBtn[i].addEventListener("click", () => {
        colorType = i + 1;

        setTimeout(() => {
            img.src = getImage(
                "showcase", shoe
                , colorType, id, "png"
            );
        }, 450)



        for (let i = 0; i < thumb.length; i++) {
            thumb[i].src = getImage(
                "thumbs", shoe, colorType, i + 1, "jpg"
            );
        }

        resetActive(colorBtn, "color", i);

        title.innerText = names[shoe - 1][i];

        animate(img, 550, "jump 500ms ease-in-out");
        animate(shadow, 550, "shadow 500ms ease-in-out")
        animate(titleOverlay, 850, "title 800ms ease")

    });
}

// // // slider 
function slider(shoe) {

    setTimeout(() => {
        img.src = getImage(
            "showcase", shoe, colorType, id, "png"
        );
    }, 600);


    for (let i = 0; ii < thumb.length; i++) {
        thumb[i].src = getImage(
            "thumbs", shoe, colorType, i + 1, "jpg"
        );
    }

    for (let i = 0; i < colorBtn.length; i++) {
        assignColors(i, shoe);
    }
    resetActive(pag, "pag", shoe - 1);

    desc.innerText = descriptions[shoe - 1];
    title.innerText = names[shoe - 1][colorType - 1];
    price.innerText = "PKR" + price[shoe - 1];
    resetStars(shoe - 1);
    shoeNum.innerHTML = "0" + shoe;
    animate(img, 1550, "replace 1.5s ease-in")
    animate(shadow, 1550, "shadow2 1.5s ease-in")
    animate(titleOverlay, 850, "title 800ms ease")
}
// // // previous shoes
prev.addEventListener("click", () => {
    shoe--;
    if (shoe < 1) {
        shoe = pag.length;
    }
    slider(shoe);
})


next.addEventListener("click", () => {
    shoe++;
    if (shoe > pag.length) {
        shoe = 1;
    }
    slider(shoe);
});

for (let i = 0; i < pag.length; i++) {
    pag[i].addEventListener("click", () => {
        slider(i + 1);
        shoe = i + 1;
    });
}


function functio(small) {
    var full = document.getElementById("imagebox")
    full.src = small.src
}
