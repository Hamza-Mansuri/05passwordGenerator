import { useCallback, useEffect, useRef, useState } from 'react'

//Flow:-
//1 decalre varriable length, numberallowed, cahrallowed
//2 password generator method
//3 setPassword
//4 password generator me useCalback liya, uska kaam function ko memorize krna hota he.
//5 copytoclipboard method
//6 useref method by useRef


function App() {

  // useCallback is a React Hook that lets you cache(memory) a function definition between re-renders.

  const [length, setLength] = useState(8)

  const [numberAllowed, setnumberAllowed] = useState(false)

  const [charAllowed, setcharAllowed] = useState(false)

  const [password, setPassword] = useState("")

  

                                      //first parameter of useCallback is function
                                      //arrow function () => {}
                                      //JS basics
                                      //usecallback me Optiization ki baat kr rahe he.
                                      //useEffect me kuch bhi chhed chhad ho to firse run krna.

  //passwordGenerator Method
  const passwordGenerator = useCallback(() =>{

    //let:- jb bhi variable ki value change ho tb usko let krna he
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    //str me number aur character daalne hena isliye.
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"


                //  =1       <=    
    for (let index = 1; index <= length; index++){
      
      let char = Math.floor(Math.random() * str.length + 1) //ye sirf character aaya he
      
      //append krna he saare characters ko
      pass += str.charAt(char) //characters ko password me daalna he
    }

    setPassword(pass)
                                          //zaruri nahi he set password likhna
                                          //kyu ki ye sb memorization me run ho rahi he, idea way he ek setPassword rakhna.
  }, [length, numberAllowed, charAllowed, setPassword]) //ye sb DEPENDECIES he useCallback function ki.

  

  //useEffect is a React Hook that lets you synchronize a component with an external system.

          //function(callback fn)
          //length, number,character,passwordGenerator ka pura function :- chhed di to firse call karunga.
  useEffect(() => {

    //run the passwordGenerator
    //IMP
                  //  ()
    passwordGenerator() 
    
  }, [length,numberAllowed,charAllowed,passwordGenerator]) //dependencies.


  //useRef hook
  //useref ko use krne ke liye usko ek variable banana padta he.

  let passwordRef = useRef(null)
  
  const copyPasswordToclipboard = useCallback(()=> {

    //        .        ?.
    passwordRef.current?.select()

    passwordRef.current?.setSelectionRange(0, 101)

    window.navigator.clipboard.writeText(password) //window pre-defined function
  }, [password])

  return (
    <>
      <h1 className='text-4xl text-center'>Password Generator</h1>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        
        <h1 className='text-white text-center my-3'>Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              ref={passwordRef}
              readOnly />

          <button
          onClick={copyPasswordToclipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>

        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
                    //IMP
                    //event
            onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberinput'
            
                    //IMP
                    //event
            onChange={() => {
                              //previous value jo bhi he usko revrese krlo.
                              //CallBack function fire kiya he, jisme humko previous value ka Access milta he.
              setnumberAllowed( (prev) => !prev );
            }}
              />
              <label>Number</label>
          </div>

          <div className='flex items-center gap-x-1'>

            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id='charinput'

            onChange={()=> {

              setcharAllowed( (prev) => !prev )
            }}
            />
            <label> Characters</label>

          </div>

        </div>

      </div>
    </>
  )
}

export default App
