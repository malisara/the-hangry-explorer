import { motion } from 'framer-motion'

import HeroImage from '../assets/HeroImage.png'
import ExploreMealsBtn from './FindMealBtn'

function Home(): JSX.Element {
  return (
    <>
      <div className="relative w-screen h-screen top-0">
        {/* Hero image */}
        <img className="w-full h-full object-cover" src={HeroImage} alt="" />
        <div className="absolute inset-0 flex flex-col mt-60 text-center px-2">
          <motion.div
            className="text-5xl md:text-6xl text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            THE HANGRY EXPLORER
          </motion.div>

          <motion.div
            className="text-3xl mt-5 text-white px-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            Discover your next
            <span className="text-pink-300"> favorite meal.</span>
          </motion.div>
        </div>
      </div>

      {/* Home page text */}
      <div className="bg-pink-100 py-16 mb-10 h-fit">
        <div className="text-xl w-3/5 m-auto leading-10 text-center">
          <span className="text-pink-400 text-3xl">Let's face it,</span>

          <div className="mt-10">
            sometimes hunger can turn even the
            <span className="text-pink-400 text-2xl">
              {' '}
              happiest person{' '}
            </span>{' '}
            into an irritable mess.
          </div>
          <div className="mt-5 text-pink-400 text-2xl">
            Don't let being hangry ruin your day!
          </div>
          <div className="mt-10">
            The Hangry Explorer is here to
            <span className="text-pink-400 text-2xl"> rescue you</span> with
            tasty treats that satisfy your hunger and
            <span className="text-pink-400 text-2xl"> keep you smiling.</span>
          </div>
          <ExploreMealsBtn />
        </div>
      </div>
    </>
  )
}

export default Home
