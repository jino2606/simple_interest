import { Button, Stack, TextField } from '@mui/material';
import './App.css';
import { useState } from 'react';

function App() {

  const [interest, interestState] = useState({

    intrst : 0,
    principle : 0,
    ROI : 0,
    year : 0,

  })

  /* State to check, validate  and set the user typed input as boolean or not */
  const [charCheck, setCharacter] = useState({
    principle:true,
    ROI:true,
    year:true,
  })

  console.log(interest);

  const Validite = (e)=>{
    const {name, value} = e.target
    // interestState({...interest,[name]:value}) 

    /* (value=='') i have added this becase without this the validation msg is mnot dissapperaing even if every wrong inputs are deleted */
    if ((!!value.match(/^[0-9]*.?[0-9]+$/)) || (value==='') || (value==='.')){
      console.log(value);
      setCharacter({...charCheck,[name]:true})
      interestState({...interest,[name]:value})
    }

    /* Else mark the typed letter as invalid */
    else{

      /* This is to give the check values false */
      setCharacter({...charCheck,[name]:false})

      /* the user input contains letter so */
      interestState({...interest,[name]:value})

    }

  }

  console.log(interest);

  const calculate = (e)=>{

    if (
      (interest.principle === 0 || interest.principle === '') ||
      (interest.ROI === 0 || interest.ROI === '') ||
      (interest.year === 0 || interest.year === '')
    ) {
      alert("Enter Details First");
    }
    else{
      /* P*N*R/100 */

      const total_interest = (interest.principle*interest.ROI*interest.year)/100
      interestState({...interest,["intrst"]:total_interest})

    }
    e.preventDefault()
  }

  /* To reset the form */

  const resetForm = (e)=>{

    setCharacter({...charCheck,["principle"]:true})
    interestState({...interest,["principle"]:0})
    setCharacter({...charCheck,["ROI"]:true})
    interestState({...interest,["ROI"]:0})
    setCharacter({...charCheck,["year"]:true})
    interestState({...interest,["year"]:0})

  }

  return (
    <div style={{height:'100vh'}} className="d-flex justify-content-center align-items-center bg-dark">

      <div className='bg-light p-5 rounded' style={{width:'500px'}}>
        <h1>Simple Interest App</h1>

        <p>Calculate Your Simple Interest Here</p>

        <div style={{height:'150px'}} className='flex-column mt-5 bg-warning d-flex justify-content-center align-items-center w-100 rounded'>
          <h1> ₹ {interest.intrst} </h1>
          <p>Total simple Interest</p>
        </div>
        <form onSubmit={calculate} className='mt-5'>
            <div className= 'mb-3'>
              <TextField className='w-100' value={interest.principle || ''} name='principle' onChange={(e)=>Validite(e)} id="outlined-basic" label="₹ Principle Amount" variant="outlined" />
              { !charCheck.principle &&
                <div>
                  <p className='text-danger fw-lighter  fst-italic'>*Invalid Character. Only Numbers are allowed</p>
                </div>
              }
            </div>

            <div className= 'mb-3'>
              <TextField className='w-100' value={interest.ROI || '' } name='ROI' onChange={(e)=>Validite(e)} id="outlined-basic" label="Rate of Interest (p.a) %" variant="outlined" />
              { !charCheck.ROI &&
                <div>
                  <p className='text-danger fw-lighter  fst-italic'>*Invalid Character. Only Numbers are allowed</p>
                </div>
              }
            </div>

            <div className= 'mb-3'>
              <TextField className='w-100' value={interest.year || ''} name='year' onChange={(e)=>Validite(e)} id="outlined-basic" label="Year (Yr)" variant="outlined" />
              { !charCheck.year &&
                <div>
                  <p className='text-danger fw-lighter  fst-italic'>*Invalid Character. Only Numbers are allowed</p>
                </div>
              }
            </div>
              <div className='mt-5'>
                <Stack direction="row" spacing={2}>
                  <Button type='submit' disabled={!charCheck.principle || !charCheck.ROI || !charCheck.year?true:false} className= 'bg-success' style={{width: '200px', height: '50px'}} variant="contained"> Calculate </Button>
                  <Button onClick={resetForm} style={{width: '200px', height: '50px'}} variant="outlined">Reset </Button>
                </Stack>
              </div>
        </form>
      </div>
     
    </div>
  );
}

export default App;
