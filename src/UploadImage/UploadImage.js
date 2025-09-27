import React, { useState } from 'react'
import {BlobServiceClient} from '@azure/storage-blob'

function UploadImage() {
    const [file,setFile]= useState(null);

    const handleFileChange=(e)=>{
        alert("onchange")
        setFile(e.target.files[0]);
    }
    const upLoadToAzure= async()=>{
        alert("upload")
        const SaSToken = "sv=2024-11-04&ss=b&srt=co&sp=rwdlaciytfx&se=2025-09-28T15:17:25Z&st=2025-09-27T07:02:25Z&spr=https&sig=kEOaWM5IMDbkGeLwOMLwGb3azI82XQMMnjDz0G7zaeQ%3D"
        const ContainerName = "hospitalimagecontainer";
        const storageAccountName = "hospitalimagestorage"

        const blobServiceClient = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${SaSToken}`
        );

    const containerClient = blobServiceClient.getContainerClient(ContainerName);
    const blobClient = containerClient.getBlockBlobClient(file.name);

    await blobClient.uploadBrowserData(file, {
      blobHTTPHeaders: { blobContentType: file.type },
    });

    alert('Upload successful!');
  };
    

  return (
    <div>
      <input type='file' onChange={handleFileChange}/>
      <button onClick={upLoadToAzure}>upload</button>
    </div>
  )
}

export default UploadImage;
