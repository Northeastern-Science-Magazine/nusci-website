class ImageInfo {
    constructor(src, alt, pos) {
      this.src = src;
      this.alt = alt;
      this.pos = pos;
    }
  }
  
  // Example images
  const images = [
    new ImageInfo('public/assets/carousel_images/image1.jpeg', 'Image 1 Alt Text', 0),
    new ImageInfo('public/assets/carousel_images/image1.jpeg', 'Image 2 Alt Text', -1),
    new ImageInfo('public/assets/carousel_images/image1.jpeg', 'Image 3 Alt Text', -2),
    new ImageInfo('public/assets/carousel_images/image1.jpeg', 'Image 3 Alt Text', 1),
    new ImageInfo('public/assets/carousel_images/image1.jpeg', 'Image 3 Alt Text', 2),
  
  ];
  
  document.addEventListener('DOMContentLoaded', function () {
    const carouselList = document.querySelector('.carousel__list');
    const elems = [];
  
    // Create the carousel items dynamically
    images.forEach(image => {
      const carouselItem = document.createElement('li');
      carouselItem.classList.add('carousel__item');
      carouselItem.dataset.pos = image.pos;
  
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
  
      carouselItem.appendChild(img);
      carouselList.appendChild(carouselItem);
  
      elems.push(carouselItem);
    });
  
    carouselList.addEventListener('click', function (event) {
      var newActive = event.target.closest('.carousel__item');
  
      if (!newActive || newActive.classList.contains('carousel__item_active')) {
        return;
      };
      console.log(newActive);
  
      update(newActive);
    });
  
    const update = function(newActive) {
      const newActivePos = newActive.dataset.pos;
  
      const current = elems.find((elem) => elem.dataset.pos == 0);
      const prev = elems.find((elem) => elem.dataset.pos == -1);
      const next = elems.find((elem) => elem.dataset.pos == 1);
      const first = elems.find((elem) => elem.dataset.pos == -2);
      const last = elems.find((elem) => elem.dataset.pos == 2);
      
      current.classList.remove('carousel__item_active');
      
      [current, prev, next, first, last].forEach(item => {
        var itemPos = item.dataset.pos;
  
        item.dataset.pos = getPos(itemPos, newActivePos)
      });
  
      newActive.classList.add('carousel__item_active');
    };
  
    const getPos = function (current, active) {
      const diff = current - active;
  
      if (Math.abs(current - active) > 2) {
        return -current
      }
  
      return diff;
    }
  });