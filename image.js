// Resize image without blurring. Keep the box shape of pixels when resize.
// This code assumes small_img to be a square
function blockResize(small_img, big_img){
    let small_w = small_img.width;
    let big_w = big_img.width;
    for(let x = 0; x < small_w; x++){
        for(let y = 0; y < small_w; y++){
            let [r, g, b, a] = readColor(small_img, x, y);
            let bigX = Math.floor((x / small_w)*big_w);
            let bigX_plus1 = Math.floor(((x + 1) / small_w)*big_w);
            let bigY = Math.floor((y / small_w)*big_w);
            let bigY_plus1 = Math.floor(((y + 1) / small_w)*big_w);
            for(let inner_x = bigX; inner_x < bigX_plus1; inner_x++){
                for(let inner_y = bigY; inner_y < bigY_plus1; inner_y++){
                    writeColor(big_img, inner_x, inner_y, r, g, b, a);
                }
            }
        }
    }
}

// Write individual pixels of image
// from: https://p5js.org/reference/#/p5.Image
function writeColor(image, x, y, red, green, blue, alpha) {
    let index = (x + y * image.width) * 4;
    image.pixels[index] = red;
    image.pixels[index + 1] = green;
    image.pixels[index + 2] = blue;
    image.pixels[index + 3] = alpha;
}

// Read individual pixels of image
function readColor(image, x, y){
    let index = (x + y * image.width) * 4;
    let red = image.pixels[index];
    let green = image.pixels[index + 1];
    let blue = image.pixels[index + 2];
    let alpha = image.pixels[index + 3];
    return [red, green, blue, alpha];
}