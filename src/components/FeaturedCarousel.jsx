// FeaturedCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const featuredImages = [
  "https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg",
  "https://static01.nyt.com/images/2022/07/11/dining/ss-bulgogi-style-tofu/merlin_209335170_48189dad-00d2-46b3-8673-e540119aacf3-jumbo.jpg",
  "https://images.ctfassets.net/uexfe9h31g3m/6F6XJqeQuirD60ckcR5KdB/0600991f7b19f20367309157b6de03f9/MeatballsPastaBake_1950x1300.jpg?w=768&h=512&fm=webp&fit=thumb&q=90"
];

const FeaturedCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      {featuredImages.map((url, index) => (
        <SwiperSlide key={index}>
          <img
            src={url}
            alt={`Slide ${index}`}
            style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '20px' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FeaturedCarousel;
