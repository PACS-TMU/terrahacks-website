import Image from 'next/image';

export default function Hero() {
    return (
        <>
            {/* The hidden headers are for reader mode accessibility */}
            <h1 className='opacity-0 w-full text-3xl'>TerraHacks</h1>
            <h2 className='opacity-0 w-3/4 text-xl'>Hosted at Toronto Metropolitan University, August 2nd - August 4th</h2>
            <Image
                src="/assets/th-text.png"
                alt='TerraHacks Text'
                width={1534}
                height={227}
                priority={true}
                className='absolute w-full mx-auto px-6 md:px-10 lg:px-36 xl:px-48 3xl:px-56 top-[2.5%] md:top-[2%] lg:top-[5%] xl:top-[3.5%] z-20 float-in pointer-events-none'
            />
            <div className='flex flex-col gap-1 lg:gap-4 items-center justify-center text-center text-xs md:text-lg lg:text-2xl xl:text-4xl text-[#1E1E1E] absolute w-full mx-auto px-6 md:px-10 lg:px-36 xl:px-48 3xl:px-56 top-[8.5%] md:top-[8.5%] lg:top-[7.5%] xl:top-[6.5%] z-20 float-in'>
                <p className=''>
                    {/*Applications now <span className="font-bold text-red-600">EXTENDED</span> until July 26th, 11:59 PM!*/}
                    TerraHacks 2024 has concluded. Join us again next year!
                </p>
                {/*<a*/}
                {/*    aria-label='Apply to TerraHacks 2024'*/}
                {/*    href='https://portal.terrahacks.ca/dashboard/application'*/}
                {/*    rel='noopener noreferrer'*/}
                {/*    target='_blank'*/}
                {/*    className='bg-[#FAFAFA] hover:bg-gray-200 p-2 lg:p-4 rounded-md shadow-md ease-in-out duration-300 text-sm md:text-lg lg:text-2xl xl:text-4xl'*/}
                {/*>*/}
                {/*    Apply here!*/}
                {/*</a>*/}
            </div>
            <Image
                src="/assets/signs/sign.png"
                alt="TerraHacks Sign"
                width={1090}
                height={730}
                priority={true}
                className='absolute hidden lg:block right-[5%] lg:top-[10.1%] 2xl:top-[8.9%] lg:w-[30%] 2xl:w-[25%] h-auto z-20 pointer-events-none'
            />
            <Image
                src="/assets/signs/sign-mobile.png"
                alt="TerraHacks Sign"
                width={1090}
                height={557}
                priority={true}
                className='absolute lg:hidden w-full mx-auto px-[15%] top-[4.2%] z-20 pointer-events-none'
            />
            <div className="absolute w-[20%] 2xl:w-[17%] left-[-2%] lg:left-0 top-[9.2%] lg:top-[10.9%] 2xl:top-[9.8%]">
                <Image
                    src="/assets/moles/miner_mole.png"
                    alt="TerraHacks Logo"
                    width={1500}
                    height={1500}
                    priority={true}
                    className="w-full scale-x-[-1]"
                />
            </div>
        </>
    )
}
