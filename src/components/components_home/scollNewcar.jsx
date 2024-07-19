import { useRef, useState, useEffect } from 'react';
import { NewCard } from './newcard';
import example_products from '../../data/example_products';//เป็นการใช้ API DATABASE เข้ามาเพื่อแทนที่ example
import leftArrow from '../../assets/Logo/logo_product_card/left_slide.png';
import rightArrow from '../../assets/Logo/logo_product_card/right_slide.png';


const scrollContainerStyles = {
  scrollbarWidth: 'none',
  // scrollbarWidth: 'thin',
  // scrollbarColor: '#040575 #f1f1f1',
};

function ScrollNewCar() {
  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const [products, setProducts] = useState([]);
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const products = await example_products();
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  fetchProducts();
}, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -1152, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 1152, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section>
      <div className="flex flex-col">
        <h1 className="text-xl mb-6 mt-8 font-bold">🏷️รถเข้าใหม่ประจำเดือน</h1>
        <div className="relative w-[1128px] mx-auto">
          {!isAtStart && (
            <img
              src={leftArrow}
              alt="Scroll Left"
              onClick={scrollLeft}
              className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 cursor-pointer rounded-full shadow-md hover:scale-110 duration-200"
            />
          )}
          <div className="flex w-full overflow-x-auto whitespace-nowrap shadow rounded gap-[24px]" ref={scrollRef} style={scrollContainerStyles}>
            {products.slice(0, 9).map(product => (
              <div key={product.id} className="">
                <NewCard product={product} />
              </div>
            ))}
          </div>
          {!isAtEnd && (
            <img
              src={rightArrow}
              alt="Scroll Right"
              onClick={scrollRight}
              className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 cursor-pointer rounded-full shadow-md hover:scale-110 duration-200"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default ScrollNewCar;