import * as React from 'react'

const Collection: React.FC = () => {
    return (
        <div>
            <section>
                <p className='text-4xl mt-[6rem] mb-2'>Collections</p>
                <p className='w-96 m-auto'>Explore the world through collections of beautiful photos free to use under the <strong className='underline underline-offset-2'>Unsplash License.</strong></p>
            </section>
            <section>
                <div className='flex mt-5 w-11/12 m-auto'>
                    <div className='w-1/3 p-5'>
                        image
                        <p className='font-bold text-left'>Water</p>
                        <p className='text-[#6C727F] text-left'>23 photos</p>
                    </div>
                    <div className='w-1/3 p-5'>
                        image
                        <p className='font-bold text-left'>Water</p>
                        <p className='text-[#6C727F] text-left'>23 photos</p>
                    </div>
                    <div className='w-1/3 p-5'>
                        image
                        <p className='font-bold text-left'>Water</p>
                        <p className='text-[#6C727F] text-left'>23 photos</p>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Collection