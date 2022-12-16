import React from "react";

const GetImage = ({ url }) => {
    let [img, setImg] = React.useState('');
    React.useEffect(() =>{
        fetch(`https://avatars.dicebear.com/v2/avataaars/${url}.svg?options[mood][]=happy`)
        .then(reponse => 
            setImg(reponse.url))
    },[url])
    return (
        <img className="w-full" src={img}/>
       
    )

}

export default GetImage;