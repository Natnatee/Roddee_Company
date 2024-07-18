import { useContext, useState, useEffect } from "react";///1
import { UserContext } from "../../context_component/Usercontext";///2
import { ProductCard } from "../components_home/ProductCard";
import { getCarById } from "../API/API_Cars"; // ตรวจสอบให้แน่ใจว่า path ถูกต้อง

function CarFavourite() {
    const { User } = useContext(UserContext);///3
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            if (User && User.pinned) {
                const carPromises = User.pinned.map(id => getCarById(id));
                const carResults = await Promise.all(carPromises);
                setCars(carResults);
            }
        };

        fetchCars();
    }, [User]);

    return (
        <div >
            <div className="flex flex-col border border-[#E1E1E1] rounded-[20px] px-6 pt-[28px] ">
                <p className="font text-[24px] font-semibold  mb-6">รายการโปรด</p>
                <div className="grid grid-cols-2 mb-6">
                    {cars.map((car, index) => (
                        <div key={car._id || index}>
                            <ProductCard product={car} />
                        </div>  
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CarFavourite;
