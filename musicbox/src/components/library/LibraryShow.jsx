import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import LibraryEditForm from './LibraryEditForm';
import LibraryCreateForm from './LibraryCreateForm';

export default function LibraryShow({user}) {
    
    const [allLibraries, setAllLibraries] = useState([])
    const [albums,setAlbums]=useState([]);
    const [communities,setCommunities]=useState([]);
    const [isEdit,setIsEdit]=useState(false);
    const [isAdd,setIsAdd]=useState(false);
    const [currentLibrary,setCurrentLibrary]=useState({});

    useEffect(() => {
        showLibraries();
    }, [])

    const changeToAdd=()=>{
        setIsAdd(!isAdd)
        setIsEdit(false)
    }
    

    const showLibraries = () => {
        console.log("show stad user",user);
        Axios.get(`library/detail?id=${user._id}`)
        .then(response => {
            Axios.get("library/add")
            .then(res=>{
                console.log("album list");
                console.log(res);
                setAlbums(res.data.albums);
            })
            .catch(err=>{
                console.log("error bringing albums list");
                console.log(err);
            })
            Axios.get("community/index")
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
            setAllLibraries(response.data.libraries)
        })
        .catch(err => {
            console.log("Error Getting all Libraries");
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
            showLibraries();
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
                'Content-Type' : 'multipart/form-data',
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("Library Updated");
            console.log(res);
            showLibraries();
            setIsEdit(false);
        })
        .catch(err=>{
            console.log("error updating library");
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
            showLibraries();
        })
        .catch(err=>{
            console.log("Error Deleting Library");
            console.log(err);
        })
    }

    const myLibraries = allLibraries.map((library,index)=>(
        <>
        <tr key={index}>
            <td>{library.name}</td>
            <td>{library.descriptin}</td>
            <td>{library.size}</td>
            <td>{library.location}</td>
            <td>{library.price}</td>
            <td>{library.communities.map((com, index) => (
                    <p key={index}>{com.community}</p>
                    ))}</td>
            <td>{library.category.category}</td>
            <td><img src={"/images/"+library.image} style={{width:"35px",height:"35px"}}/></td>
            <td><button onClick={()=>editLibrary(library._id)}>Edit</button></td>
            <td><button onClick={()=>deleteLibrary(library._id)}>Delete</button></td>
        </tr>
        
        </>
    ));

  return (
    <div>
        <h1>Libraries</h1>
        <button className='btn btn-success my-button' onClick={changeToAdd}>Add Library</button>
        {isEdit ?
        <LibraryEditForm key={currentLibrary._id} library={currentLibrary} update={updateLibrary} 
        albums={albums} communities={communities}/>
        :""}
        {isAdd ?
        <LibraryCreateForm add={addLibrary} albums={albums} communities={communities} user={user}/>:""}
        <table>
            <tbody>
                <tr>
                    <th>Library Name</th>
                    <th>Description</th>
                    <th>Size</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Communities</th>
                    <th>Category</th>
                    <th>image</th>
                </tr>
                {myLibraries}
            </tbody>
        </table>
    </div>
  )
}
