// Example parameter object
// 
// let gabor_params = {
//     // sigma – Standard deviation of the gaussian envelope.
//     sigma : 10,
//     // theta – Orientation of the normal to the parallel stripes of a Gabor function.
//     theta : 0,
//     // lambda – Wavelength of the sinusoidal factor.
//     lambda : 1,
//     // gamma – Spatial aspect ratio.
//     gamma : 1,
//     // psi – Phase offset.
//     psi : 0
// };

function gabor_real(x, y, par) {
    x_ = +x * Math.cos(par.theta) + y * Math.sin(par.theta);
    y_ = -x * Math.sin(par.theta) + y * Math.cos(par.theta);
    exponent = - (Math.pow(x_, 2) + Math.pow(par.gamma * y_, 2)) / (2 * Math.pow(par.sigma, 2));
    cosine = 2 * Math.PI * x_ / par.lambda + par.psi;
    return Math.exp(exponent) * Math.cos(cosine);
}

function gabor_imaginary(x, y, par) {
    x_ = +x * Math.cos(par.theta) + y * Math.sin(par.theta);
    y_ = -x * Math.sin(par.theta) + y * Math.cos(par.theta);
    exponent = - (Math.pow(x_, 2) + Math.pow(par.gamma * y_, 2)) / (2 * Math.pow(par.sigma, 2));
    sine = 2 * Math.PI * x_ / par.lambda + par.psi;
    return Math.exp(exponent) * Math.sin(sine);
}

// Writes pixel values of gabor kernel on img considering gabor_params.
function drawGabor(img, gabor_params, imaginary = false) {
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
            writeColor(img, x, y, 255, gray, 0, 255);
        }
    }
}