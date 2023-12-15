import { BASE_URL } from "./baseurl";
import { commonRequest } from "./commonRequest";

// Add vedios

// function definition for add video
export const addVideo = async(body)=>{
    return await commonRequest("POST", `${BASE_URL}/videos`,body)
}

// get video
// define a function to get video from back-end

export const getVideo = async() =>{
   return await commonRequest("GET", `${BASE_URL}/videos`, "")
}

// delete vedio
export const deleteVideo = async(id) => {
    return await commonRequest("DELETE", `${BASE_URL}/videos/${id}`,{})
}

// add category
export const addCategory = async(body) => {
    return await commonRequest("POST", `${BASE_URL}/category`, body)
}

// to get category
export const getCategory = async() =>{
    return await commonRequest("GET", `${BASE_URL}/category`, "")
 }

//  to delete category
export const deleteCategory = async(id) => {
    return await commonRequest("DELETE", `${BASE_URL}/category/${id}`,{})
}

// Get Watch History

export const getHistory=async()=>{
    return await commonRequest("GET",`${BASE_URL}/watchhistory`,"")
}

// Add history

export const addHistory=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/watchhistory`,body)
}

// To get a specific video data from resource

export const getVideos=async(id)=>{
    return await commonRequest("GET", `${BASE_URL}/videos/${id}`,"")
}

// To update video details in category

export const updateCategory=async(id,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/category/${id}`,body)
}