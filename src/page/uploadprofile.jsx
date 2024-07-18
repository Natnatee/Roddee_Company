import { useEffect, useState } from "react";
import uploadImagePhoto from "../assets/userPage/picupload.png";
import { jwtDecode } from "jwt-decode";
import { uploadProfilePicture } from "../components/API/API_Users";
import Tesla from "../../src/assets/Login/Tesla1.png";
import { useNavigate } from "react-router-dom";


function UploadProfile() {
  const [formData, setFormData] = useState({
    Profile_Image: null,
  });

  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageURL = await uploadToCloudinary(file);
      setFormData((prevState) => ({
        ...prevState,
        Profile_Image: imageURL, // Update Profile_Image with the URL
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
// ยิงภาพส่งเข้า clound เป็น url
  const uploadToCloudinary = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/dyrs3bvzj/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "freetouse");

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.secure_url; // This URL can be used to display the image
  };
// กดปุ่ม upload  ส่งรูปเข้่า db
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      const response = await uploadProfilePicture(userId, formData.Profile_Image);
      console.log('Profile image updated successfully', response);
      if (userId && formData.Profile_Image) {
        alert(
          `Profile image updated successfully`
        );
        navigate('/'); 
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to update profile image", error);
    }
  };

  //ปุ่มอัพ 
  const uploadImageButton = () => {
    document.getElementById('uploadfileinbuycar').click();
  };

  
  return (
    
    <div>
      
      <img
        src={Tesla}
        className="w-full h-[911px] absolute object-cover "
        alt="Loginbg"
      />
      
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col items-end ">
        <div className="p-4 rounded-[10px] w-[400px] relative mt-60 mr-60 bg-white shadow-md ">
        <h5 className="text-xl font-semibold  mb-[30px]">ตั้งรูปโปรไฟล์ของคุณ</h5>
      
          
            <div className=" flex flex-col justify-center items-center rounded-[10px]">
              <img
                src={formData.Profile_Image ? formData.Profile_Image : (uploadImagePhoto)} // Display uploaded image or upload icon
                alt="upload"
                className="w-[216px] h-[216px] rounded-full border-[4px]  object-cover"
                onClick={uploadImageButton}

              />
            </div>
            <button type="submit" className="btn btn-primary mt-4 bg-[#1E3769] text-white w-[368px] h-[40px] rounded-lg hover:bg-[#677FAF] duration-200">
              อัปโหลดหลังจากเลือกรูป
            </button>
            <input
              id="uploadfileinbuycar"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        
      </form>
    </div>
  );
}

export default UploadProfile;












// function UploadProfile() {
//   const [formData, setFormData] = useState({
//     Profile_Image: null,
//   });


//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value, 
//     });
//   };

//   const handleFileChange = async (e) => {
    
//     const file = e.target.files[0];

//     // Upload image to backend and get the URL
//     try {
//       const imageURL = await uploadToCloudinary(file);
//       setFormData((prevState) => ({
//         ...prevState,
//         [file]: imageURL,
//       }));
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }

//     document.getElementById("imagePreview").className = "hidden";
//     document.getElementById("image-container").className =
//       "grid grid-cols-3 gap-6 mr-[18px]";
//   };

//   const uploadToCloudinary = async (file) => {
//     const url = `https://api.cloudinary.com/v1_1/dyrs3bvzj/upload`;
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "freetouse");

//     const response = await fetch(url, {
//       method: "POST",
//       body: formData,
//     });
//     console.log("response from ☁️", response);
//     const data = await response.json();
//     return data.secure_url; // This URL can be used to display the image
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("start");
//     await createCar(formData);
//   };

//   const uploadimage = () => {
//     document.getElementById(`uploadfileinbuycar`).click();
//   };



//   // const turnImgtoURL = async () => {
//   //   const cld = new Cloudinary({ cloud: { cloudName: "dyrs3bvzj" } });

//   //   const img = await cld
//   //     .image(formData.file1)
//   //     .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
//   //     .quality("auto")
//   //     .resize(auto().gravity(autoGravity())); // Transform the image: auto-crop to square aspect_ratio

//   //   setFormData({
//   //     ...formData,
//   //     file1: img,
//   //   });
//   // };

//   return (
//     <form onSubmit={handleSubmit} className=" mx-auto flex flex-col w-[1129px]">
//       <h5 className="text-xl font-semibold mt-12 mb-[30px]">ขายรถของคุณ</h5>
//       <div className="border border-black p-4 rounded-[10px]  ">
//         {/* First image */}
//         <div className=" flex">
//           <div id="image-container" className="">
//             {formData.Profile_Image && (
//               <img
//                 src={formData.Profile_Image}
//                 className="w-[250px] border border-gray-400 rounded-2xl"
//               />
//             )}     
//           </div>
//           <img
//             src={carDefault}
//             id="imagePreview"
//             alt="default car"
//             className=" mr-4 "
//           />
//           <div className="w-[344px] flex flex-col justify-center items-center border border-gray-400 rounded-[10px]">
//             <img
//               src={uploadImage}
//               id="1"
//               alt="img_test"
//               className="w-[72px] "
//               onClick={uploadimage}
//             />
//             <div className="text-[#9E9E9E] font-medium text-[18px]">
//               อัพโหลดรูปภาพ
//             </div>
//           </div>
//           <input
//             id="uploadfileinbuycar"
//             type="file"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//         </div>
//       </div>
//       <h5 className="text-[24px] font-semibold mt-[40px] mb-[19px]">
//         รายละเอียดสินค้า
//       </h5>
//       <div className=" gap-[56px] mb-[62px] flex flex-col w-full">
//         <div className="flex items-center justify-between ">
//           <label className=" text-gray-700 text-[18px] font-medium">
//             หัวข้อรถที่ต้องการขาย
//           </label>
//           <input
//             type="text"
//             name="headline"
//             className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
//             placeholder="เช่น BMW X1 2021 สภาพดี ไมล์น้อย"
//             value={formData.headline}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center justify-between ">
//           <label className=" text-gray-700 text-[18px] font-medium">
//             แบรนด์
//           </label>
//           <input
//             type="text"
//             name="brand"
//             className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
//             placeholder="เลือกแบรนด์"
//             value={formData.brand}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center justify-between ">
//           <label className=" text-gray-700 text-[18px] font-medium">รุ่น</label>
//           <input
//             type="text"
//             name="model"
//             className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
//             placeholder="รุ่นโมเดลของรถ"
//             value={formData.model}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center justify-between ">
//           <label className=" text-gray-700 text-[18px] font-medium">
//             ประเภทรถยนต์
//           </label>
//           <input
//             type="text"
//             name="type"
//             className="w-[744px] h-[56px] p-5 text-base border border-gray-300 rounded-[15px]"
//             placeholder="เลือกประเภทรถยนต์"
//             value={formData.type}
//             onChange={handleChange}
//             required
//           />
//         </div>
//       </div>

      

//       <div className="flex justify-center gap-[23px] text-[18px] font-bold mb-[186px]">
//         <button
//           type="submit"
//           className="px-4 py-2 bg-[#3E5685] text-white rounded w-[364px] h-[50px]"
//         >
//           ลงขาย
//         </button>
//         <button
//           type="button"
//           className=" bg-[#E7E9EE] text-black rounded-[10px]  w-[361px] h-[48px] "
//         >
//           ยกเลิก
//         </button>
//       </div>
//     </form>
//   );
// }

// export default UploadProfile;
