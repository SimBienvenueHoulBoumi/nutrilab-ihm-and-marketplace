import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function MyBanner() {
    return (
        <div className="w-auto flex justify-center items-center py-8">
            <div className="flex flex-col space-y-4">
                <div className="rounded-lg w-4/5 m-auto bg-[#8cafa4] text-white shadow-lg text-center p-4">
                    <p className="font-medium text-sm">
                        Besoin d&apos;avoir une alimentation qui vous ressemble?
                        <br />
                        Faites-nous confiance pour vous accompagner dans votre démarche à la recherche du bien-être culinaire.
                    </p>
                </div>
                <div className="flex w-4/5 m-auto flex-col md:flex-row justify-center items-center md:space-x-4">
                    <Image
                        src="/images/salade-de-fruits.jpg"
                        width={500}
                        height={500}
                        alt="banner"
                        className="rounded-lg shadow-lg shadow-blue-300"
                    />
                    <div className="flex flex-col space-y-2 text-center md:text-left">
                        <h1 className="font-bold text-2xl">Immortalisons notre passion pour la gastronomie</h1>
                        <p className='text-[15px] w-4/6'>
                            Immortaliser notre passion pour la gastronomie, c&apos;est préserver
                            et célébrer cet art culinaire qui unit les gens à travers le monde.
                            En documentant et partageant des recettes via des vidéos, et des manuscrits
                            nous transmettons notre savoir-faire
                            et nos traditions aux générations futures. Au travers de recettes, partagés
                            votre savoir faire afin de faire en profiter à tout le monde.
                        </p>
                        <div className='mt-4 space-y-2'>
                            <p className='italic text-gray-500'>Vous n&apos;avez toujours pas de compte? </p>
                            <div className="bg-[#27706b] w-64 hover:cursor-pointer hover:bg-[#20847D] text-white font-bold py-2 px-4 rounded">
                                <Link href="/register" >Rejoignez-nous maintenant!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

