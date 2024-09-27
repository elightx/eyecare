import Navbar from '@/components/Navbar'
import Glasses0 from '@/assets/glasses0.webp'
import Sunglass0 from '@/assets/sunglass0.webp'
import Contact0 from '@/assets/contact0.jpeg'
import Brands from '@/assets/brands.png'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="flex flex-col w-full items-center text-3xl">
        OUR PRODUCTS
      </div>
      <br />
      <br />
      <div className="flex justify-evenly gap-10 px-10">
        {[
          {
            name: 'Glasses',
            image: Glasses0,
            link: '/shop/glasses',
          },
          {
            name: 'Sunglasses',
            image: Sunglass0,
            link: '/shop/sunglasses',
          },
          {
            name: 'Contact Lenses',
            image: Contact0,
            link: '/shop/contacts',
          },
        ].map((item, index) => {
          return (
            <Link to={item.link}>
              <div
                key={index}
                className="flex flex-col items-center hover:text-primary transition ease-in-out hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-56 aspect-square rounded-3xl"
                />
                <div className="text-2xl">{item.name}</div>
              </div>
            </Link>
          )
        })}
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="flex flex-col w-full items-center text-3xl">
        OUR BRANDS
      </div>
      <br />
      <br />
      <br />
      <div className='flex items-center justify-center'>
      <img src={Brands} alt="Brands" className="w-[92%]" />
      </div>
    </>
  )
}
