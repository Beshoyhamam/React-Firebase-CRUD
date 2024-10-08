import "./AddEditUser.css"
import { useEffect, useState } from "react"
import Loading from "../../components/Loading//Loading.jsx"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { db, storage } from "../../firebase/config.js"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { useNavigate, useParams } from "react-router-dom"
import NoImage from "/public/images/no-image.png"

const initioalState = {
    name: "",
    email: "",
    info: "",
    contact: ""
}

const AddEditUser = () => {
    const [data, setData] = useState(initioalState);
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate()
    const { id } = useParams()


    useEffect(() => {
        id && getSingleUser()
    }, [id])

    const getSingleUser = async () => {
        const docRef = doc(db, "users", id)
        const snapshot = await getDoc(docRef)
        if (snapshot.exists()) {
            setData({ ...snapshot.data() })
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleDelImage = async () => {
        setFile(null)
        if (data.photo) {
            const imageRef = ref(storage, data.photo);
            await deleteObject(imageRef);
        }
        setData({ ...data, photo: "" })
    }

    const validate = () => {
        let errorsST = {};
        if (!data.name) {
            errorsST.name = "Name Is Required"
        }
        if (!data.email) {
            errorsST.email = "Email Is Required"
        }
        if (!data.info) {
            errorsST.info = "Info Is Required"
        }
        if (!data.contact) {
            errorsST.contact = "Contact Is Required"
        }

        return errorsST;
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmit(true)

        if (Object.keys(validate()).length) {
            setErrors(validate())
            setIsSubmit(false)
        } else {

            let photoURL = "";

            if (file) {
                const storageRef = ref(storage, `Images/${file.name}`);
                await uploadBytes(storageRef, file);
                photoURL = await getDownloadURL(storageRef);
            }

            if (!id) {
                try {
                    await setDoc(doc(db, "users", `user-num-${Math.random().toFixed(3)}`), {
                        ...data,
                        photo: photoURL,
                        createdAt: new Date()
                    });
                } catch {
                    console.log("Errorrrrrrrrrrrr")
                }
            } else {
                try {
                    if (data.photo && photoURL !== "") {
                        const imageRef = ref(storage, data.photo);
                        await deleteObject(imageRef);
                    }

                    await updateDoc(doc(db, "users", id), {
                        ...data,
                        photo: photoURL || data.photo,
                    });

                } catch (error) {
                    console.log(error)
                }
            }

            navigate("/")
        }
    }

    return (
        <div className="add-edit-user">
            <div className="main-container">
                {isSubmit ? <Loading /> :
                    <div className="form">
                        <h2>{id ? "Update User" : "Add User"}</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                name="name"
                                onChange={handleChange}
                                value={data.name}
                                autoFocus
                                autoComplete="off"
                            />
                            <p
                                style={{ textAlign: "left", width: "100%", maxWidth: "600px", color: "red" }}>
                                {errors.name ? errors.name : null}
                            </p>
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                autoComplete="off"
                            />
                            <p
                                style={{ textAlign: "left", width: "100%", maxWidth: "600px", color: "red" }}>
                                {errors.email ? errors.email : null}
                            </p>
                            <label>Info</label>
                            <textarea
                                placeholder="Enter Info"
                                name="info"
                                onChange={handleChange}
                                value={data.info}
                                autoComplete="off"
                            ></textarea>
                            <p
                                style={{ textAlign: "left", width: "100%", maxWidth: "600px", color: "red" }}>
                                {errors.info ? errors.info : null}
                            </p>
                            <label>Contact</label>
                            <input
                                type="text"
                                placeholder="Enter Contact"
                                name="contact"
                                onChange={handleChange}
                                value={data.contact}
                                autoComplete="off"
                            />
                            <p
                                style={{ textAlign: "left", width: "100%", maxWidth: "600px", color: "red" }}>
                                {errors.contact ? errors.contact : null}
                            </p>

                            <label>{id ? "Change Image" : "Upload Image"}</label>

                            <div className="upload-image">
                                {id &&
                                    <div>
                                        <span className="cancel" onClick={handleDelImage}>X</span>
                                        <img
                                            src={file ? URL.createObjectURL(file) : data.photo || NoImage}
                                            alt={data.name}
                                            className="image-user"
                                        />
                                    </div>
                                }

                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>

                            <button>{id ? "Update" : "Submit"}</button>
                        </form>
                    </div>
                }
            </div>
        </div>
    );
}

export default AddEditUser;