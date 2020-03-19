import FontFaceObServer from 'fontfaceobserver';
 const Fonts=()=>{
  const monst = new FontFaceObserver("Montserrat");


  monst.load().then(()=>{
    document.documentElement.classList.add('montserrat-loaded')
  })
}

export default Fonts ;