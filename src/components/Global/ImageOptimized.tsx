import Image from 'next/image'
const ImageOptimized = (src : string , alt : string , w : number , h : number) => {
  return (
    <Image src={src} alt={alt} width={w} height={h}  className={`optimize-gpu object-cover `}  />
  )
}

// Image Fill the Realtive Parent

const ImageFill = (src : string , alt : string ) => {
  
  return (
    <>
    <Image src={src} alt={alt} priority loading='lazy' fill   className={`optimize-gpu object-cover w-full h-full absolute `}  />
    </>
  )
}


export  {ImageOptimized , ImageFill }