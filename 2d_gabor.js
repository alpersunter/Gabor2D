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