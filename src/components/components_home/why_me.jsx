import backgroundImage from "../../assets/Logo/logo_footer/why-me-1.png";

function WhyMe() {
  const sectionStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section
      className="h-[604px] w-auto flex flex-col text-center justify-center py-16 text-white mt-20"
      style={sectionStyle}
    >
      <div className=" text-[48px] font-extrabold">
        ทำไมต้องใช้บริการกับเรา?
      </div><br/> 
      <div className="text-[16px] w-[1128px] font-light whitespace-pre-line  place-self-center">
        <p>เรามีความเชี่ยวชาญและประสบการณ์ในวงการรถยนต์มายาวนาน มีบริการที่หลากหลายและครบวงจรทั้งการเช่า การซื้อขายรถยนต์ที่ตอบโจทย์ทุกความต้องการของลูกค้า</p><br/>
        <p>- บริการซื้อรถ: เรามีรถยนต์มือสองคุณภาพสูง ผ่านการตรวจสอบมาตรฐาน พร้อมให้คำแนะนำจากผู้เชี่ยวชาญในการเลือกซื้อรถที่เหมาะสม</p><br/>
        <p>- บริการขายรถ: เราช่วยท่านในการขายรถได้รวดเร็วและสะดวกสบาย ด้วยทีมงานที่มีความชำนาญในการประเมินราคาที่ยุติธรรม เรายินดีให้บริการด้วยความใส่ใจและมุ่งมั่นในการตอบสนองความต้องการของลูกค้าเพื่อความพึงพอใจสูงสุด</p><br/> 
      </div>
    </section>
  );
}

export default WhyMe;