var gabor_params = {
    // sigma – Standard deviation of the gaussian envelope.
    sigma: 76,
    // theta – Orientation of the normal to the parallel stripes of a Gabor function.
    theta: 0,
    // lambda – Wavelength of the sinusoidal factor.
    lambda: 50,
    // gamma – Spatial aspect ratio.
    gamma: 1,
    // psi – Phase offset.
    psi: 0
};

function setup() {
    var canvas = createCanvas(1000, 500);
    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');
    noLoop();

    // Sigma. Maps 0-10 to 1-250
    let sigma_slider = document.getElementById("sigma_slider");
    let sigma_label = document.getElementById("sigma_p");
    sigma_slider.oninput = function () {
        sigma_label.innerText = "Sigma: " + (1 + this.value * 25);
        gabor_params.sigma = (1 + this.value * 25);
        redraw();
    }

    // Theta. 
    let theta_slider = document.getElementById("theta_slider");
    let theta_label = document.getElementById("theta_p");
    theta_slider.oninput = function () {
        theta_label.innerText = "Theta: " + (this.value / 16) * 180;
        gabor_params.theta = (this.value / 16) * Math.PI;
        redraw();
    }

    // Lambda. In range of 1-250
    let lambda_slider = document.getElementById("lambda_slider");
    let lambda_label = document.getElementById("lambda_p");
    lambda_slider.oninput = function () {
        lambda_label.innerText = "Lambda: " + this.value;
        gabor_params.lambda = this.value;
        redraw();
    }

    // Gamma. Maps 0-10 to 0.5-2.0
    let gamma_slider = document.getElementById("gamma_slider");
    let gamma_label = document.getElementById("gamma_p");
    gamma_slider.oninput = function () {
        let g = (0.5 * Math.pow(4, this.value / 10)).toFixed(2); // Halfway will yield 1.0 (Hence 0.5 * 4^0.5 = 1.0)
        gamma_label.innerText = "Gamma: " + g;
        gabor_params.gamma = g;
        redraw();
    }

    // Psi. Maps 0-16 to 0-PI
    var psi_slider = document.getElementById("psi_slider");
    var psi_label = document.getElementById("psi_p");
    psi_slider.oninput = function () {
        psi_label.innerText = "Psi: " + (this.value / 16) * 180;
        gabor_params.psi = (this.value / 16) * Math.PI;
        redraw();
    }
}
function draw() {
    background(0);
    let img_real = createImage(500, 500);
    let img_imaginary = createImage(500, 500)
    img_real.loadPixels();
    img_imaginary.loadPixels();
    drawGabor(img_real, gabor_params);
    drawGabor(img_imaginary, gabor_params, true);


    // Green for x, red for y axis.
    let centerY = Math.floor(img_real.height / 2);
    let centerX = Math.floor(img_real.width / 2);
    for (let x = 0; x < img_real.width; x++) {
        writeColor(img_real, x, centerY, 0, 255, 0, 255);
        writeColor(img_imaginary, x, centerY, 0, 255, 0, 255);
    }
    for (let y = 0; y < img_real.height; y++) {
        writeColor(img_real, centerX, y, 255, 0, 0, 255);
        writeColor(img_imaginary, centerX, y, 255, 0, 0, 255);
    }

    img_real.updatePixels();
    img_imaginary.updatePixels();
    image(img_real, 0, 0);
    image(img_imaginary, 500, 0);
}

// I need this to draw axes
function writeColor(image, x, y, red, green, blue, alpha) {
    let index = (x + y * image.width) * 4;
    image.pixels[index] = red;
    image.pixels[index + 1] = green;
    image.pixels[index + 2] = blue;
    image.pixels[index + 3] = alpha;
}

// Writes pixel values of gabor kernel on img considering gabor_params.
function drawGabor(img, gabor_params, imaginary = false) {
    // helper for writing color to array
    // (based on https://p5js.org/reference/#/p5.Image)
    function writeGray(image, x, y, gray) {
        let index = (x + y * image.width) * 4;
        image.pixels[index] = gray;
        image.pixels[index + 1] = gray;
        image.pixels[index + 2] = gray;
        image.pixels[index + 3] = 255;
    }
    let x, y;
    let x_offset = Math.floor(img.width / 2);
    let y_offset = Math.floor(img.height / 2)

    // fill with Gabor
    for (y = 0; y < img.height; y++) {
        for (x = 0; x < img.width; x++) {
            let gabor;
            if (imaginary) {
                gabor = gabor_imaginary(x - x_offset, y - y_offset, gabor_params);
            } else {
                gabor = gabor_real(x - x_offset, y - y_offset, gabor_params);
            }
            let gray = Math.floor(((gabor + 1) / 2) * 255);
            writeGray(img, x, y, gray);
        }
    }
}