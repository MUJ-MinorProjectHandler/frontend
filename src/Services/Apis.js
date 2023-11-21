import { commonrequest } from "./ApiCall";
import {BACKEND_URL} from "./helper";
//main

export const setOtpFunction = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/login`,data)
}

export const userVerify = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/otpverify`,data)
}

//admin
// export const studentUpdate = async(data)=>{
//     console.log("data",data);
//     return await filerequest("POST", `${BACKEND_URL}/upload/student`, data)
// }

// export const facultyUpdate = async(data)=>{
//     console.log("data",data);
//     return await commonrequest("POST", `${BACKEND_URL}/upload/faculty`, data)
// }

export const rejectAdminStudent = async(data)=>{
    return await commonrequest("POST", `${BACKEND_URL}/admin/rejectstudent`, data)
}
export const findMaximum = async()=>{
    return await commonrequest("GET", `${BACKEND_URL}/admin/findmaxnum`)
}

export const setMaximum = async(data)=>{
    return await commonrequest("POST", `${BACKEND_URL}/admin/setmaxnum`, data)
}

export const datadownstudent = async()=>{
    return await commonrequest("GET", `${BACKEND_URL}/admin/downloadstudent`,"")
}

export const datadownfaculty = async()=>{
    return await commonrequest("GET", `${BACKEND_URL}/admin/downloadfaculty`,"")
}

export const getFullList = async (search, page)=>{
    return await commonrequest("GET", `${BACKEND_URL}/admin/fulllist?search=${search}&page=${page}`,"");
}


//faculty

// export const checkNum = async()=>{
//     return await commonrequest("POST", `${BACKEND_URL}/faculty/checknum`+sessionStorage.getItem("email"),"")
// }
export const findMaxNum = async()=>{
    return await commonrequest("GET", `${BACKEND_URL}/faculty/maxnum`)
}

export const findNum = async()=>{
    return await commonrequest("GET", `${BACKEND_URL}/faculty/num/`+sessionStorage.getItem("email"))

}

export const sendDescriptionLink = async(data)=>{
    return await commonrequest("POST", `${BACKEND_URL}/faculty/setlink/`+sessionStorage.getItem("email"), data)
}

export const reqStudents = async()=>{
    return await commonrequest("GET", `${BACKEND_URL}/faculty/reqstu/`+sessionStorage.getItem("email"))
}

export const declineSelectedStudent = async(data)=>{
    return await commonrequest("POST", `${BACKEND_URL}/faculty/declineselceted`, data)
}

export const declineStudent = async(data)=>{
    return await commonrequest("POST", `${BACKEND_URL}/faculty/decline`, data)
}

export const acceptStudent = async(data)=>{
    return await commonrequest("POST", `${BACKEND_URL}/faculty/accept`, data)
}

export const selStudents = async()=>{
    return await commonrequest("GET", `${BACKEND_URL}/faculty/selstu/`+sessionStorage.getItem("email"))
}

export const datapersonaldown = async()=>{
    return await commonrequest("GET", `${BACKEND_URL}/faculty/download/`+sessionStorage.getItem("email"))
}
//student
export const getFacultyInfo = async()=>{
    return await commonrequest("GET", `${BACKEND_URL}/student/facultyinfo`)
}

export const getFacultyFullInfo = async()=>{
    return await commonrequest("GET", `${BACKEND_URL}/student/facultyfullinfo`)
}

export const generateRequest = async(data)=>{
    return await commonrequest("POST", `${BACKEND_URL}/student/request`, data)
}

export const studentStatus = async()=>{
    return await commonrequest("GET", `${BACKEND_URL}/student/`+sessionStorage.getItem("email"))
}
