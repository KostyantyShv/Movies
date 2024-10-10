import { useState } from "react";
import PersonDefaultImage from "../../assets/images/default-person.jpg";

type Props = {
    imgUrl: string
    name: string
}



const PeopleCard = ({imgUrl, name}: Props) => {
  
  const [imgSrc, setImgSrc] = useState<string>(imgUrl);
  
  return (
    <div className="mt-7 flex flex-col items-center w-[100px] h-[250px] sm:w-[150px] sm:h-[300px]">
        <img className="h-[240px] object-fill rounded-lg w-full" src={imgSrc} alt={name} onError={() => setImgSrc(PersonDefaultImage)}/>
        <h4 className="font-bold mt-5 text-center">{name}</h4>
    </div>
  )
}

export default PeopleCard 