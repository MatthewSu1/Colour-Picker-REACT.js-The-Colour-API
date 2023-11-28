
import './App.css';
import {useEffect, useState} from 'react'


function App() {
  const clouds = require('./cloud.jpg')
  const [color, setColor] = useState("#b5d4ec");
  const [image, setImage] = useState(null)
  const [api, setapi] = useState('')
  const[selectedhex, sethex] = useState()

  const[hex, sethexx] = useState('')
  const[rgb, setrgb] = useState('')
  
  const colorpick = async () => {
    let eyeDropper =  new window.EyeDropper();
    const {sRGBHex} = await eyeDropper.open();
    sethex((sRGBHex.slice(1,50)))
    console.log(selectedhex)

    fetch(`https://www.thecolorapi.com/id?hex=${selectedhex}`)
    .then((response)=> response.json())
    .then((data) => {
      setapi(data);
      setColor(data.hex.value)
      setrgb(data.rgb.value)
      console.log(data.rgb.value); 
    });
  };
  const handlefile = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  const colorcopy = async () => {
    await navigator.clipboard.writeText(color)
    alert("Copied Color")
  }

  useEffect(()=> {
      
  },[])
    


  return (
    <div className='container'>
      <div className='inner-container'>

      <div className='left-column'>
        {image ? (
          <img src={image} alt='user-picture' width={700} height={400} />
        ) : (
          <img src={clouds} alt='picture-clouds' className='clouds-picture' width={700} height={400}/>
        )}
        <div>
          <button onClick={colorpick} className='openpicker'>Open Colour Picker</button>
        </div>
      </div>
      <div className='right-column'>
        <div className='right-column-upper'>
            <div className='right-top-inner'>
              <button className='colour-button-hex' style={{backgroundColor: color}}></button>
              <div className='hex-code-box'><p>Hex: <span>{color} {'\n'}RGB: {rgb}</span> </p></div>
            </div>            
        </div>
        <div className='right-bottom'>
          <button type="button" className='upload' onChange={handlefile}><input type='file'/>Upload Your Image</button>
          <p>We think data protection is important! No data is sent. The magic happens in your browser.</p>
        </div>
      </div>
      </div>
    </div>
  );  
}

export default App;
