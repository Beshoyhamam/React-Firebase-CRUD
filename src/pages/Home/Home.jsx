import "./Home.css"
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../firebase/config.js"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading.jsx"
import { useNavigate } from "react-router-dom";
import ModelComp from "../../components/ModelComp/ModelComp.jsx";
import { deleteObject, ref } from "firebase/storage";

const Home = () => {
    const [usersData, setUsersData] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [userdetails, setUserDetails] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        // const fetchData = async () => {
        //     const queryData = await getDocs(collection(db, "users"), orderBy("createdAt", "desc"));
        //     const reversedData = queryData.docs.reverse()
        //     setUsersData(reversedData)
        //     setLoading(false)
        // }

        // fetchData()

        const fetchData = () => {
            const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
                const sortedData = snapshot.docs.reverse()
                setUsersData(sortedData);
                setLoading(false);
            },
                (error) => {
                    console.error("Error fetching data: ", error);
                }
            );

            return unsubscribe;
        };

        const unsubscribe = fetchData();
        return () => unsubscribe();
    }, [])

    const handleDelete = async (id, imagePath) => {
        try {
            setOpen(false)

            const docRef = doc(db, "users", id);
            await deleteDoc(docRef);

            const imageRef = ref(storage, imagePath);
            await deleteObject(imageRef);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    const handleDetailsUser = (ele) => {
        setUserDetails(ele)
        setOpen(true)
    }

    const closeInfo = () => {
        setOpen(false)
        setUserDetails(null)
    }

    if (loading) {
        return (
            <div className="no-users">
                <Loading />
            </div>
        )
    }

    if (usersData.length === 0) {
        return (
            <div className="no-users">
                <p>No Users</p>
            </div>
        )
    }

    return (
        <div className="home">
            <div className="main-container">
                <h2 className="title">Users Data</h2>
                <div className="all-users">
                    {usersData.map((el) => (
                        <div key={el.id} className="cart-user">
                            <img src={el.data().photo} alt={el.data().name} />
                            <p>{`Name: ${el.data().name}`}</p>
                            <p>{`Email: ${el.data().email}`}</p>

                            <div className="btns">
                                <button onClick={() => navigate(`/update/${el.id}`)}>Update</button>
                                <button onClick={() => handleDetailsUser(el)}>View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {open &&
                <div className="details">
                    <ModelComp
                        userData={userdetails}
                        handleDelete={handleDelete}
                        closeInfo={closeInfo}
                    />
                </div>
            }
        </div>
    );
}

export default Home;