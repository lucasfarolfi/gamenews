import api from './api'

export const getUsers = () =>{
    return api()
    .get("/usuarios")
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err
    })
}

export const getUserById = (id) =>{
    return api()
    .get("/usuario/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err
    })
}

export const registerUser = (name,email,password) =>{
    return api()
    .post("/usuario", {name, email, password})
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err.response
    })
}

export const deleteUser = (id) =>{
    return api()
    .delete("/usuario/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err.response
    })
}

export const updateUser = (id, name,email,role,password) =>{
    return api()
    .patch("/admin/usuario/"+id, {name, email,role, password})
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err.response
    })
}

export const loginUser = (email,password) =>{
    return api()
    .post("/login", {email,password})
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err.response
    })
}