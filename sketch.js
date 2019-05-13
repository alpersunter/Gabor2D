var gabor_params = {
    // Width and height of the square kernel. kernel_size: 50 means 50x50 matrix of gabor coefficients
    kernel_size: 100,
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

    // Dimensions. Kernel can be as small as 3x3 and as large as 500x500
    let dimensions_slider = document.getElementById("dimensions_slider");
    let dimensions_label = document.getElementById("dimensions_p");
    dimensions_slider.oninput = function () {
        dimensions_label.innerText = "Kernel size: (" + this.value + "x" + this.value + ")";
        gabor_params.kernel_size = this.value;
        redraw();
    }

    // Sigma. Maps 0-30 to 1-250
    let sigma_slider = document.getElementById("sigma_slider");
    let sigma_label = document.getElementById("sigma_p");
    sigma_slider.oninput = function () {
        sigma_label.innerText = "Sigma: " + (1 + this.value * 8);
        gabor_params.sigma = (1 + this.value * 8);
        redraw();
    }

    // Theta. Maps 0-16 to 0-PI
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

    // These are kernels. Their size should change with slider
    let img_real = createImage(gabor_params.kernel_size, gabor_params.kernel_size);
    let img_imaginary = createImage(gabor_params.kernel_size, gabor_params.kernel_size);
    img_real.loadPixels();
    img_imaginary.loadPixels();
    drawGabor(img_real, gabor_params);
    drawGabor(img_imaginary, gabor_params, true);

    let size = 500;
    let img_real_big = createImage(size, size);
    let img_imaginary_big = createImage(size, size);
    img_real_big.loadPixels();
    img_imaginary_big.loadPixels();
    blockResize(img_real, img_real_big);
    blockResize(img_imaginary, img_imaginary_big);

    // Green for x, red for y axis.
    let centerY = Math.floor(img_real_big.height / 2);
    let centerX = Math.floor(img_real_big.width / 2);
    for (let x = 0; x < img_real_big.width; x++) {
        writeColor(img_real_big, x, centerY, 0, 0, 255, 255);
        writeColor(img_imaginary_big, x, centerY, 0, 0, 255, 255);
    }
    for (let y = 0; y < img_real_big.height; y++) {
        writeColor(img_real_big, centerX, y, 0, 0, 255, 255);
        writeColor(img_imaginary_big, centerX, y, 0, 0, 255, 255);
    }
    img_real_big.updatePixels();
    img_imaginary_big.updatePixels();

    image(img_real_big, 0, 0);
    image(img_imaginary_big, 500, 0);
}



