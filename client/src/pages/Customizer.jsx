import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useSnapshot } from "valtio"
import config from "../config/config"
import { state } from "../store"
import { download } from "../assets"
import { downloadCanvasToImage, reader } from "../config/helpers"
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants"
import { fadeAnimation, slideAnimation } from "../config/motion"
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from "../components"


const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)
  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  })

  const showTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker': return <ColorPicker />
      case "filepicker": return <FilePicker readFile={readFile} file={file} setFile={setFile} />
      case "aipicker": return <AIPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit} />
      default: return null;
    }
  }

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt")
    try {
      setGeneratingImg(true)

    const response = await fetch('http://localhost:8080/api/v1/dalle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
      })
    })


    const data = await response.json();
    handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (err) {
      alert(err)
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab('')
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName]
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName]
        break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
        break;
    }
    setActiveFilterTab(((prev) => {
      return {
        ...prev,
        [tabName]: !prev[tabName]
      }
    }))
  }

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab('')
    })
  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation('left')}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab, index) => (
                  <Tab key={index} tab={tab} handleClick={() => {
                    if (activeEditorTab !== tab.name) setActiveEditorTab(tab.name)
                    else setActiveEditorTab('')
                  }
                  } />
                ))}
                {showTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton type="filled" handleClick={() => state.intro = true} title="Go Back" styles="w-fit px-4 py-2.5 font-bold text-sm" />
          </motion.div>
          <motion.div className="filtertabs-container" {...slideAnimation('up')}>
            {FilterTabs.map((tab, index) => (
              <Tab isFilterTab isActiveTab={activeFilterTab[tab.name]} key={index} tab={tab} handleClick={() => handleActiveFilterTab(tab.name)} />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer