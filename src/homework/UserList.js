
import { useState, useEffect } from "react";
import GetImage from "./GetImage";

export default function UserList() {


    let [user, setUser] = useState([]);
    let [heart, setHeart] = useState(false);
    let [showModal, setShowModal] = useState(false);
    let [one_user, setOneUser] = useState({});
    let [userName, setUserName] = useState('');
    let [userPhone, setUserPhone] = useState('');
    let [userMail, setUserMail] = useState('');
    let [id, setId] = useState(0);
    // let [userWebsite, setUserWebsite]=useState('');

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(reponse => reponse.json())
            .then(data => { setUser(data) })

    }, [])

    const handleChangeHeart = (data_id) => {
        let curentHeart = document.querySelectorAll(".heart");

        setHeart(!heart)
        curentHeart[data_id].classList.toggle("text-red-500");

    }

    const deleteUser = (id) => {
        let user_new = user;
        user_new = user_new.filter(iteam =>
            iteam.id !== id
        )
        setUser(user_new)
    }
    const editUser = (id) => {
        let user_new = user;
        user_new = user_new.find(iteam =>
            iteam.id === id
        )
        setId(id);
        setOneUser(user_new)
        setShowModal(true)
    }

    const handleUpdateUser = () => {
        let data = {
          userName,
          userMail,
          userPhone,
          id
        }
        let user_new = user;
        user_new = user_new.find(iteam => {
          if (iteam.id === data.id) {
            iteam.email = data.userMail;
            iteam.name = data.userName;
            iteam.phone = data.userPhone;
          }
        }
        )
        // id:data.id;
        setOneUser(user_new)
    
      }

    return (
        <>
            <div className="App">
                <div className="grid grid-cols-4 gap-4">
                    {user.map((item, index) => (
                        <div key={index} className='p-2 border-[1px]'>
                            <div className='h-auto bg-gray-500'>

                                <GetImage url={item.username} />
                            </div>
                            <div className='p-5'>

                                <p className="text-dark mb-2 text-[rgba(0,0,0,.85)]">{item.name}</p>
                                <p className="text-gray-500 mb-2">
                                    <i className="fa-solid fa-envelope mr-2"></i>
                                    {item.email}</p>
                                <p className="text-gray-500 mb-2">
                                    <i className="fa-solid fa-phone mr-2"></i>
                                    {item.phone}</p>
                                <p className="text-gray-500 mb-2">{item.company[0]}</p>
                                <p className="text-gray-500 mb-2">
                                    <i className="mr-2 fa-solid fa-globe">
                                    </i>{item.website}</p>
                                <p className="text-gray-500 mb-2 pb-5">{item.Address}</p>

                            </div>
                            <ul className="bg-gray-300 border-[1px] h-[40px] flex items-center ">
                                <li className="text-center w-[33%]">
                                    <i onClick={(e) => {

                                        handleChangeHeart(e.target.getAttribute('data-id'))
                                    }}
                                        data-id={index}
                                        className="cursor-pointer fa-solid fa-heart heart" ></i>

                                </li>
                                <li className="text-center w-[33%] border-x-[1px] ">
                                    <i
                                        onClick={() => { editUser(item.id) }}
                                        className="cursor-pointer fa-solid  fa-pen " data-modal-toggle="defaultModal"></i>

                                </li>
                                <li className="text-center w-[33%]">

                                    <i
                                        onClick={() => { deleteUser(item.id) }}
                                        className="cursor-pointer fa-regular fa-trash-can"></i>
                                </li>
                            </ul>

                        </div>
                    ))}
                </div>
            </div>



            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Basic Modal
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form className="w-full ">
                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                Name
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input hidden readOnly={id} />
                                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" name='userName' defaultValue={one_user.name}
                                                onChange={e => {
                                                    setUserName(e.target
                                                        .value)
                                                }} />
                                        </div>
                                    </div>
                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                Email
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" defaultValue={one_user.email} name="userMail"
                                                onChange={e => {
                                                    setUserMail(e.target
                                                        .value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                Phone
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" defaultValue={one_user.phone} name="userPhone"
                                                onChange={e => {
                                                    setUserPhone(e.target
                                                        .value)
                                                }}
                                            />
                                        </div>
                                    </div>


                                </form>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {

                                            setShowModal(false)
                                            handleUpdateUser();
                                        }
                                        }

                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}


        </>)
}