import Navbar from '@/components/Navbar'
import Wishlist from '@/components/Wishlist'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full items-center mt-10">
        <div className="text-primary font-extrabold text-7xl relative my-32">
          LOOK COOL AND FASHIONABLE
          <img
            src="https://www.sliderrevolution.com/wp-content/uploads/revslider/Optic-shop-showcase-slider/glassess-red.png"
            className="w-1/3 absolute -top-10 right-[50%] translate-x-[50%] scale-150"
          />
        </div>
        <div className="text-secondary font-bold text-3xl w-2/3 flex items-center justify-center text-center">
          <span>
            Experience clarity like never before with our exquisite eyewear
            collection. Our expertly crafted glasses combine fashion-forward
            design with top-notch quality, ensuring both style and
            functionality. From timeless classics to trendy frames, we offer a
            wide range to suit every taste and face shape. Elevate your vision
            with us today!
          </span>
        </div>
        <Link to="/shop">
          <Button className=" text-3xl p-8 m-4 rounded hover:scale-125 transition ease-in-out">
            GET YOURS
          </Button>
        </Link>
      </div>
    </>
  )
}
