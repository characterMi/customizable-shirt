import CustomButton from "./CustomButton"

const AIPicker = ({prompt, setPrompt, generateImg, handleSubmit}) => {
  return (
    <div className="aipicker-container">
      <textarea className="aipicker-textarea" placeholder="Ask AI..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <div className="flex flex-wrap gap-3">
        {generateImg ? (
          <CustomButton type="outlined" title="Asking AI..." styles="text-xs" />
        ) : (
          <>
          <CustomButton 
            type="outlined"
            title="AI Logo"
            handleClick={() => handleSubmit('logo')}
            styles="text-xs"
          />
          <CustomButton 
            type="filled"
            title="AI Full"
            handleClick={() => handleSubmit('full')}
            styles="text-xs"
          />
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker