document.addEventListener("DOMContentLoaded", function() {
    const colorSwatches = document.querySelectorAll('.color-swatch');

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const newImage = this.getAttribute('data-image');
            const targetImageId = this.getAttribute('data-target');
            const productImage = document.getElementById(targetImageId);

            if (productImage) {
                productImage.src = newImage;
            }
        });
    });
});
