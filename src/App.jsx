import { useState, useEffect } from "react";
import MainPanel from "./components/MainPanel"
import SideBar from "./components/SideBar"
import Footer from "./components/Footer"

function App() {
  const [showModal, setshowModal] = useState(false);
  const [pageData, setpageData] = useState(null);
  function handleToggleModal() {
    setshowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const API_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${API_KEY}`
      
      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`

      if(localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setpageData(apiData);
        console.log("Fetching from Storage");
        return;
      }
      localStorage.clear()

      try {
        const res = await fetch(url)
        const apiData = await res.json()
        setpageData(apiData)
        localStorage.setItem(localKey, JSON.stringify(apiData))
        console.log('Fetched from API today')
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchAPIData()
  }, []);
  return (
    <>
      {pageData ? (
        <MainPanel data={pageData} />
        ):
        (<div className="loadingState">
          <i className="fa-solid fa-spinner"></i>
        </div>
      )}
      {showModal &&(
        <SideBar data={pageData} handleToggleModal={handleToggleModal} />
      )}
      {pageData &&(
        <Footer data={pageData} handleToggleModal={handleToggleModal} />
      )}
    </>
  )
}

export default App
