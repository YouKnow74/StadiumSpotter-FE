import React,{useEffect,useState} from 'react';
import  Axios  from 'axios';
import  Library from './Library';
import  LibraryCreateForm from './LibraryCreateForm';
import "bootstrap/dist/css/bootstrap.min.css"
import LibraryEditForm from './LibraryEditForm';
import { useNavigate } from 'react-router-dom';



export default function LibraryList(props) {
    const [libraries,setLibraries]=useState([]);
    const [albums,setAlbums]=useState([]);
    const [communities,setCommunities]=useState([]);
    const [isEdit,setIsEdit]=useState(false);
    const [isAdd,setIsAdd]=useState(false);
    const [currentLibrary,setCurrentLibrary]=useState({});
    const [userDetails, setUserDetails]=useState({});
    const navigate = useNavigate();

    useEffect(() => {
      
    loadLibrariesList();
      
    }, []);

    const changeToAdd=()=>{
        setIsAdd(!isAdd)
        setIsEdit(false)
        }

    
    const loadLibrariesList = ()=>{
        // console.log("user:",user.id);
        Axios.get("library/index",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        })
        .then(response=>{
            Axios.get("library/add", {
                headers: {
                    "Authorization":"Bearer "+localStorage.getItem("token")
                    }
            })
            .then(res=>{
                console.log("album list");
                console.log(res);
                setAlbums(res.data.albums);
            })
            .catch(err=>{
                console.log("error bringing albums list");
                console.log(err);
            })
            Axios.get("community/index", {
                headers: {
                    "Authorization":"Bearer "+localStorage.getItem("token")
                    }
            })
            .then(res=>{
                console.log("Communities list");
                console.log(res);
                setCommunities(res.data.community);
            })
            .catch(err=>{
                console.log("error bringing communities list");
                console.log(err);
            })

            console.log(response);
            setLibraries(response.data.library);
        })
        .catch(err=>{
            console.log("Error in bringing list of libraries ");
            console.log(err);
        })
    }

    const addLibrary =(library)=>{
        Axios.post("library/add",library, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("Library Added");
            console.log(res);
            loadLibrariesList();
        })
        .catch(err=>{
            console.log("Error Adding Library ");
            console.log(err);
        })
    }

    const editLibrary = (id)=>{
        Axios.get(`library/edit?id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("info good for editing");
            console.log(res.data.library);
            setIsEdit(!isEdit);
            setIsAdd(false)
            setCurrentLibrary(res.data.library);

        })
        .catch(err=>{
            console.log("error in editing library");
            console.log(err);
        })

    }
    
    const updateLibrary =(library)=>{
        Axios.put("library/update",library , {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
        .then(res=>{
            console.log("Library Updated");
            console.log(res);
            loadLibrariesList();
            setIsEdit(false);
        })
        .catch(err=>{
            console.log("error updating libraries");
            console.log(err);
        })
    }

    const deleteLibrary = (id)=>{
        Axios.delete(`library/delete?id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("deleted");
            console.log(res);
            loadLibrariesList();
        })
        .catch(err=>{
            console.log("Error Deleting Library");
            console.log(err);
        })
    }

    const reserveLibrary = (id) => {
        Axios.get(`reservation/add?id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then((response) => {
            const libraryData = response.data.library
            setCurrentLibrary(libraryData)
            console.log(response.data.library);
            navigate(`/reservation/${libraryData._id}`)
        })
        .catch(err=>{
            console.log("Error Reserving Library");
            console.log(err);
        })
    }


    const allLibraries = libraries.map((library,index)=>(
        
        <div className='col'>
            <div className='card shadow-sm' key={index}> 
                <Library  {...library} edit={editLibrary} delete={deleteLibrary} reserve={reserveLibrary} userDetails={props.user} />
            </div>
        </div>
    ));

  return (
   <div>
    <h1>All Libraries</h1>
   
    <button className='btn btn-success my-button' onClick={changeToAdd}>Add Library</button>
    <div>
        {isEdit ?
        <LibraryEditForm key={currentLibrary._id} library={currentLibrary} update={updateLibrary} 
        albums={albums} communities={communities} setIsEdit={setIsEdit} user={props.user} />
        :null}
        {isAdd?
        <LibraryCreateForm setIsAdd={setIsAdd} add={addLibrary} albums={albums} communities={communities} user={props.user}/>:""}

        <div className='album py-5 bg-body-tertiary'>
            <div className='container'>
                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                    {allLibraries}
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
