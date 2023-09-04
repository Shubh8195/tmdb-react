import React from 'react'
import Carousel from '../../../components/carousel/Carousel'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'

function Similar({mediaType , id}) {

    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`)
    return (
        <div className='carouselSection'>
            {data?.results?.length > 0 && (
                <>
                    <ContentWrapper>
                        <span className="carouselTitle">Similar {mediaType === "tv" ? "TV Shows" : "Movies"}</span>

                    </ContentWrapper>
                    <Carousel data={data?.results} loading={loading} endpoint={mediaType} />
                </>
            )}
        </div>
    )
}

export default Similar