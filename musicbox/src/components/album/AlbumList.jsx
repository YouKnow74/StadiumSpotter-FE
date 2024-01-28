import React from 'react'
import { useEffect, useState } from "react";
import Axios from 'axios';
import Album from './Album';
import AlbumCreateForm from './AlbumCreateForm';

export default function AlbumList() {
    const [albums,setAlbums]=useState([]);
    const [isAdd,setIsAdd]=useState(false);
    const [libraries,setLibraries]=useState([])

    useEffect(() => {
      
    loadAlbumList();
    
      
    }, [])
    
    const loadAlbumList =()=>{
        Axios.get("album/index")
        .then(res=>{
            console.log(res);
            setAlbums(res.data.Albums);
        })
        .catch(err=>{
            console.log("Error fetching album list");
            console.log(err);
        })
        Axios.get("library/index", {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("loaded libraries");
            console.log(res);
            setLibraries(res.data.library)

        })
        .catch(err=>{
            console.log("error fetching libraries for albums");
            console.log(err);
        })
    }

    const addAlbum=(album)=>{
        Axios.post("album/add",album, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("album added");
            console.log(res);
            loadAlbumList();
        })
        .catch(err=>{
            console.log("error adding album");
            console.log(err);
        })
    }

    const deleteAlbum =(id)=>{
        Axios.delete(`album/delete?_id=${id}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("token")
                }
        })
        .then(res=>{
            console.log("Album Deleted");
            console.log(res);
            loadAlbumList();
        })
        .catch(err=>{
            console.log("error deleting album");
            console.log(err);
        })
    }

    const allAlbums = albums.map((oneAlbum,index)=>(
        <tr key={index}>
            <Album {...oneAlbum} delete={deleteAlbum}/>
        </tr>
    ))
  return (
    <div>

<h1>All Albums</h1>
<button class="d-flex btn btn-success p-2 m-3 g-2 " onClick={()=>setIsAdd(!isAdd)}>Add Album</button>
    {/* This is temporary only and needs to be designed diffrently */}
    <div className='d-flex '>
       
    {isAdd ?
        <AlbumCreateForm setIsAdd={setIsAdd} add={addAlbum} libraries={libraries}/>:
        ""
        }
        <table className=' justify-content-center table w-100 table-bordered '>
            <tbody >
            <tr>
                <th class="   table-success " >Album Category</th>
                <th   class="   table-success " >Album image</th> {/* Needs to be implemented with Multer / cloudinary CURRENTLY ONLY PLAIN TEXT*/ }
                <th  class="   table-success ">Album from Libraries</th>
                <th  class="   table-success ">Delete</th>
            </tr>
            {allAlbums}
            </tbody>
        </table>
        </div>
      
        
    </div>
  
  )
}
