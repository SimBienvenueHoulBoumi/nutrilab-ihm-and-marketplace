import React from 'react'
import MyCard from './myCard.components'

function Offres() {
    return (
        <div className="w-5/6 m-auto space-x-2 py-2 space-y-4 text-black text-left py-auto sm:px-6 lg:px-8">
            <div>
                <p className='text-lg font-bold'>
                    Treat yourself to your favorite foods
                </p>
                <p>
                    The dishes have diverse origins and varied compositions
                </p>

            </div>
            <div className='grid grid-cols-3 gap-2'>
                <MyCard
                    image='/images/salade-de-fruits.jpg'
                    CardDescription='Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna 
                    aliqua.'
                    Button='Order by Categories'
                    btnHref='/'
                    isMarketable={false}
                />
                <MyCard
                    image='/images/salade-de-fruits.jpg'
                    CardDescription='Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna 
                    aliqua.'
                    Button='Order by Area'
                    btnHref='/'
                    isMarketable={false}
                />
                <MyCard
                    image='/images/salade-de-fruits.jpg'
                    CardDescription='Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna 
                    aliqua.'
                    Button='Order Now'
                    btnHref='/'
                    isMarketable={false}
                />
            </div>
        </div>
    )
}

export default Offres