import React from 'react'
import NavBar from '../navBar/NavBar';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className=''>
        <NavBar/>
        <div className='bg-[color:var(--about-color)] flex flex-row rounded-lg relative mt-5 mx-5' >
            <img className='rounded-lg' src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80"alt="iconWeTravel" width="800px" />
            <div className='block'>
              <h2 className='text-5xl mb-6 mt-4 text-left ml-5 '>Acerca de nosotros</h2>
              <p className='text-xl text-left ml-5 mr-2'>WeTrevel es una plataforma donde podes conseguir hospedaje y tambien ser hospedador, facilicitamos todo el entorno de busqueda ya que podes usar multiples filtros para conseguir un lugar a tu medida</p>
              <p className='text-xl text-left ml-5 mr-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla aut similique tempora commodi optio porro delectus ad, eum nobis aperiam natus at consectetur dolor perferendis ullam earum harum? Illo, facilis.
              Iusto soluta voluptates magni quam maiores voluptatibus tenetur eaque molestiae nam natus quasi nulla provident non, tempora mollitia error rem ex velit illo exercitationem, ipsa ea rerum blanditiis. Recusandae, facilis.
              Blanditiis alias itaque unde quo perspiciatis minima exercitationem, sapiente officia fugit ea beatae repellat neque iusto excepturi sed sit? At recusandae possimus quae provident quibusdam, porro itaque ut veritatis fugit.
              Aperiam ex totam ipsum reprehenderit! Laboriosam quasi debitis odit dicta vel earum rerum maiores numquam porro architecto. Praesentium nulla, mollitia adipisci animi voluptatem omnis unde molestias porro delectus doloremque laboriosam?
              Provident, numquam nemo sapiente veritatis maxime est laboriosam aperiam tempora ad cumque consectetur deleniti quos recusandae hic odit minima animi ab, pariatur voluptate saepe sequi reiciendis eius molestiae alias! Earum.
              Sint distinctio quos esse recusandae doloremque. Officiis enim molestiae laborum dolorem nostrum quos amet illum, maiores quis asperiores temporibus earum, autem fugiat velit sunt, magni quibusdam totam error. Soluta, eius.
              Facere sapiente dolorem cumque, ad qui, quod perferendis doloremque esse quam ratione quibusdam voluptatibus nesciunt natus rerum dicta assumenda numquam. Ratione dignissimos maiores consequatur officia explicabo omnis nobis sequi expedita.</p>
              <Link to="/home">
                <button className='bg-white border-2 p-2 rounded hover:bg-black hover:rounded hover:text-white mt-5 text-xl flex ml-5'>Comenzar</button>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default About;