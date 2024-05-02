// selection
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayScale = document.getElementById("grayScale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hueRotate");

let download = document.getElementById("download");
let reset = document.getElementById("reset");
let img = document.querySelector(".container .img .img-box #img");
let upLoad = document.getElementById("upLoad");
let imgBox = document.querySelector(".container .img .img-box");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext(`2d`);


window.onload = function() {
    download.style.display = "none";
    reset.style.display = "none";
    imgBox.style.display = "none";
}
// upload img in display 
upLoad.onchange = function() {
    resetValue();
    download.style.display = "block";
    reset.style.display = "block";
    imgBox.style.display = "block";
    let file = new FileReader();
    file.readAsDataURL(upLoad.files[0]);
    file.onload = function() {
        img.src = file.result;
    };
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0 ,0, canvas.width, canvas.height);
        img.style.display = "none";
    }
};
// addition filters
let filters = document.querySelectorAll("ul li input");

filters.forEach(filter => {
    filter.addEventListener(`input`, function() {
        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        hue-rotate(${hueRotate.value}deg)
        grayscale(${grayScale.value})
         blur(${blur.value}px)
        `
        ctx.drawImage(img, 0 ,0, canvas.width, canvas.height);
    });
});

// reset filter
function resetValue() {
    ctx.filter = "none";
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayScale.value = "0";
    blur.value = "0";
    hueRotate.value = "0";
    ctx.drawImage(img, 0 ,0, canvas.width, canvas.height);
};

// reset all filters
reset.onclick = function() {
    resetValue();
}


// download img
download.onclick = function() {
    download.href = canvas.toDataURL();
};


