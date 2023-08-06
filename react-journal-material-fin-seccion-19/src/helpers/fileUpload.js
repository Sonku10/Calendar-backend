

export const fileUpload = async(file) =>{
    if(!file) throw new Error('where is the file ding dong?')
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dzmxtpudb/upload'

    const formData = new FormData()

    formData.append('upload_preset', 'React-Journal')
    formData.append('file', file)

    try{
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body:formData
        })


        if(!resp.ok) throw new Error('i dunno it got fucked up')

        const cloudResp = await resp.json()


        return cloudResp.secure_url

    }catch (error){
        console.log(error)
        throw new Erorr(error.message)
    }
}