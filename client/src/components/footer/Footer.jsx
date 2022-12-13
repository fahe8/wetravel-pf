import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillYoutube, AiFillFacebook, AiFillInstagram, AiFillTwitterSquare } from 'react-icons/ai'
import './footer.css'


export const Footer = () => {

    return (

      <div className='grid grid-cols-3 footer mt-8'>
          <div className='col-span-2 '>
              <div>
                  <h4 className='text-2xl m-2 font-semibold'>About WeTravel</h4>
                  <p className='m-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem in veritatis quod debitis atque saepe, recusandae, iusto unde mollitia, eius molestias ab dicta nulla totam est autem rem error aliquam.</p>
                  
                  <div className='flex justify-center m-3 text-lg'>
                      <ul className='flex items-center'>
                          <li><AiFillFacebook /></li>
                          <li><AiFillYoutube /></li>
                          <a href='https://www.instagram.com/wetravelpf/'><li><AiFillInstagram /></li></a>
                          <a href='https://twitter.com/WetravelW'><li><AiFillTwitterSquare /></li></a>
                      </ul>
                  </div>
                  
              </div>
          </div>

          <div>
              <div className='m-2'>
                  <h3 className='text-xl font-semibold'>Contact :</h3>
                  <ul>
                      <li>We Travel</li>
                      <li>app_wetravel767@gmail.com</li>
                      <li> +54 548675136.</li>
                  </ul>
              </div>
              <hr/>
              <div>
                  <h3 className='text-base font-medium'>Pages</h3>
                  <ul>
                      <li> <Link to='/home'> All Hotels </Link></li>
                      <li> <Link to='/about'> About </Link> </li>
                  </ul>
              </div>
          </div>
    </div>
    
  )
}
