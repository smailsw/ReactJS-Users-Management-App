const SpinnerComponent = () => {
  return (
    <div className="fallback-spinner app-loader">
      <p>NESTJS Users Management Tool</p>
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
