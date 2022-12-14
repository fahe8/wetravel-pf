import React from 'react'
import Stars from '../stars/Stars'
import { AiFillHeart, AiOutlineGithub, AiOutlineLinkedin } from 'react-icons/ai'
import defect from '../../assets/img/developers/copia2.png'
import Santiago from '../../assets/img/developers/santiago.jpeg'
import Juan from '../../assets/img/developers/juan.jpeg'
import Carlos from '../../assets/img/developers/carlos.jpeg'
import Montecino from '../../assets/img/developers/montecino.jpeg'
import Fabian from '../../assets/img/developers/fabian.jpeg'
import Caro from '../../assets/img/developers/caro.jpeg'



const Cards = () => {
  return (
      
      <div className='flex flex-wrap justify-center gap-4 font-medium'>
          
              <div className='bg-white shadow-xl  w-80 rounded-3xl transition-all duration-500 ease-in-out px-2 '>
                  <div className="h-56 rounded-2xl overflow-hidden">
                  <img
                      src={Fabian}
                      alt="Fabian Carrion"
                      className="object-cover w-full h-full"
                  />
              </div>
              <div className=" flex justify-between relative">
                      <div className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500  rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                          <AiFillHeart/>
                      </div>
                  </div>
                  <div>
                      <Stars stars={5}/>
              </div>
              <hr />
              <div className='m-2 text-left'>
                   <div>
                      <h3>Fabian Carrión</h3>
                  </div>
                  <div>
                      FullStack Developer
                  </div>
                  <div>
                      Ibagué, Colombia
              </div>
                  
              </div>
                 
              <hr/>
                  <div className='flex justify-center items-center m-2'>
                    
                  <a href="https://github.com/fahe8"><AiOutlineGithub className='h-8 w-8' /></a>
                      <a href="<AiOutlineLinkedin/>"><AiOutlineLinkedin className='h-8 w-8'/></a>
                      
              </div>

              </div>
              
              <div className='bg-white shadow-xl  w-80 rounded-3xl transition-all duration-500 ease-in-out px-2'>
                  <div className="h-56 rounded-2xl overflow-hidden">
                  <img
                      src={Montecino}
                      alt="Lucas Montecino"
                      className="object-cover w-full h-full"
                  />
              </div>
              <div className=" flex justify-between relative">
                      <div className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500  rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                          <AiFillHeart/>
                      </div>
                  </div>
                  <div>
                      <Stars stars={5}/>
              </div>
              <hr />
              <div className='m-2 text-left'>
                   <div>
                      <h3>Lucas Montecino</h3>
                  </div>
                  <div>
                      FullStack Developer
                  </div>
                  <div>
                      Corrientes, Argentina
              </div>
                  
              </div>
                 
              <hr/>
                  <div className='flex justify-center items-center m-2'>
                    
                  <a href="https://github.com/LucasMontecino"><AiOutlineGithub className='h-8 w-8' /></a>
                      <a href="https://www.linkedin.com/in/lucasmontecino9"><AiOutlineLinkedin className='h-8 w-8'/></a>
                      
              </div>
          </div>
          

          <div className='bg-white shadow-xl  w-80 rounded-3xl transition-all duration-500 ease-in-out px-2 '>
                  <div className="h-56 rounded-2xl overflow-hidden">
                  <img
                      src={Carlos}
                      alt="Carlos Martínez"
                      className="object-cover w-full h-full"
                  />
              </div>
              <div className=" flex justify-between relative">
                      <div className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500  rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                          <AiFillHeart/>
                      </div>
                  </div>
                  <div>
                      <Stars stars={5}/>
              </div>
              <hr />
              <div className='m-2 text-left'>
                   <div>
                      <h3>Carlos Martínez</h3>
                  </div>
                  <div>
                      FullStack Developer
                  </div>
                  <div>
                      Bogotá, Colombia
              </div>
                  
              </div>
                 
              <hr/>
                  <div className='flex justify-center items-center m-2'>
                    
                  <a href="https://github.com/Cemb93"><AiOutlineGithub className='h-8 w-8' /></a>
                      <a href="https://www.linkedin.com/in/carlos-mart%C3%ADnez-7491776a/"><AiOutlineLinkedin className='h-8 w-8'/></a>
                      
              </div>
              </div>

          <div className='bg-white shadow-xl  w-80 rounded-3xl transition-all duration-500 ease-in-out px-2 '>
                  <div className="h-56 rounded-2xl overflow-hidden">
                  <img
                      src={Juan}
                      alt="Juan Rodríguez"
                      className="object-cover w-full h-full"
                  />
              </div>
              <div className=" flex justify-between relative">
                      <div className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500  rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                          <AiFillHeart/>
                      </div>
                  </div>
                  <div>
                      <Stars stars={5}/>
              </div>
              <hr />
              <div className='m-2 text-left'>
                   <div>
                      <h3>Juan Rodríguez</h3>
                  </div>
                  <div>
                      FullStack Developer
                  </div>
                  <div>
                      Bogotá, Colombia
              </div>
                  
              </div>
                 
              <hr/>
                  <div className='flex justify-center items-center m-2'>
                    
                  <a href='https://github.com/juan-rv'><AiOutlineGithub className='h-8 w-8' /></a>
                      <a href="https://www.linkedin.com/in/juan-rv/"><AiOutlineLinkedin className='h-8 w-8'/></a>
                      
              </div>
          </div>
          
          <div className='bg-white shadow-xl  w-80 rounded-3xl transition-all duration-500 ease-in-out px-2 '>
                  <div className="h-56 rounded-2xl overflow-hidden">
                  <img
                      src={defect}
                      alt="Lucas Andrada"
                      className="object-cover w-full h-full"
                  />
              </div>
              <div className=" flex justify-between relative">
                      <div className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500  rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                          <AiFillHeart/>
                      </div>
                  </div>
                  <div>
                      <Stars stars={5}/>
              </div>
              <hr />
              <div className='m-2 text-left'>
                   <div>
                      <h3>Lucas Andrada</h3>
                  </div>
                  <div>
                      FullStack Developer
                  </div>
                  <div>
                      Argentina
              </div>
                  
              </div>
                 
              <hr/>
                  <div className='flex justify-center items-center m-2'>
                    
                  <a href="https://github.com/andradaalucas"><AiOutlineGithub className='h-8 w-8' /></a>
                      <a href="https://www.linkedin.com/in/andradalucas/"><AiOutlineLinkedin className='h-8 w-8'/></a>
                      
              </div>

              </div>
         
            <div className='bg-white shadow-xl  w-80 rounded-3xl transition-all duration-500 ease-in-out px-2'>
                  <div className="h-56 rounded-2xl overflow-hidden">
                  <img
                      src={Caro}
                      alt="Caro Barragán"
                      className="object-cover w-full h-full"
                  />
              </div>
              <div className=" flex justify-between relative">
                      <div className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500  rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                          <AiFillHeart/>
                      </div>
                  </div>
                  <div>
                      <Stars stars={5}/>
              </div>
              <hr />
              <div className='m-2 text-left'>
                   <div>
                      <h3>Caro Barragán</h3>
                  </div>
                  <div>
                      FullStack Developer
                  </div>
                  <div>
                      Argentina
              </div>
                  
              </div>
                 
              <hr/>
                  <div className='flex justify-center items-center m-2'>
                    
                  <a href="https://github.com/carobarragan"><AiOutlineGithub className='h-8 w-8' /></a>
                      <a href="https://www.linkedin.com/in/carolina-barragan-4a5022247"><AiOutlineLinkedin className='h-8 w-8'/></a>
                      
              </div>

          </div>

           <div className='bg-white shadow-xl  w-80 rounded-3xl transition-all duration-500 ease-in-out px-2 '>
                  <div className="h-56 rounded-2xl overflow-hidden">
                  <img
                      src={Santiago}
                      alt="Santiago Gómez"
                      className="object-cover w-full h-full"
                  />
              </div>
              <div className=" flex justify-between relative">
                      <div className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500  rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                          <AiFillHeart/>
                      </div>
                  </div>
                  <div>
                      <Stars stars={5}/>
              </div>
              <hr />
              <div className='m-2 text-left'>
                   <div>
                      <h3>Santiago Gómez</h3>
                  </div>
                  <div>
                      FullStack Developer
                  </div>
                  <div>
                     Buenos Aires, Argentina
              </div>
                  
              </div>
                 
              <hr/>
                  <div className='flex justify-center items-center m-2'>
                    
                  <a href='https://github.com/santiagogomezz'><AiOutlineGithub className='h-8 w-8' /></a>
                      <a href="https://www.linkedin.com/in/santiago-gomez-410a52199/"><AiOutlineLinkedin className='h-8 w-8'/></a>
                      
              </div>
          </div>        
          </div>
    
  )
}

export default Cards
