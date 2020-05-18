import styled from 'styled-components'

import { useAcey } from 'acey'

import { Adlist } from '../src/@acey'
import SearchBar from '../src/@components/search-bar'
import AdCase from '../src/@components/ad-case'
import { useState } from 'react'

const Home = () => {

  const [loading, setLoadingStatus] = useState(false)
  useAcey([ Adlist ])
 
  const onSearch = async (field) => {
    setLoadingStatus(true)
    await Adlist.fetch(field)
    setLoadingStatus(false)
  }

  const renderList = () => !loading && Adlist.sortByTitle().selectStartingFTitle().map((ad, index) =><div key={index}><AdCase ad={ad} /></div>)

  const renderLoading = () => loading && <p>Loading...</p>

  return (
    <div style={{margin: 100}}>
      <SearchBar onSearch={onSearch} />
      {renderList()}
      {renderLoading()}
    </div>
  )
}

Home.getInitialProps = async ctx => {
  await Adlist.fetch('node')
}

export default Home