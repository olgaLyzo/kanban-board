import { createContext, useEffect, useState } from "react";

export const LayoutContext = createContext(null);

export const LayoutProvider = (props)=>{
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
    height: window.innerHeight
	})
	const [headerHeight, setHeaderHeight] = useState(0);
	const [footerHeight, setFooterHeight] = useState(0);

	useEffect(()=>{
			const handleWindowResize = ()=> {
				setWindowSize({
					width: window.innerWidth, 
					height: window.innerHeight
				})
			}
			window.addEventListener('resize', handleWindowResize)
			return ()=> window.removeEventListener('resize', handleWindowResize)
	})

	useEffect(()=>{
		setHeaderHeight(document.getElementsByTagName('header')[0].clientHeight);
    setFooterHeight(document.getElementsByTagName('footer')[0].clientHeight);
  }, [])

	const context = {
		mainContentHeight: windowSize ? windowSize.height - headerHeight- footerHeight : 0
	}

	return (
		<LayoutContext.Provider value={context}>
      {props.children}
    </LayoutContext.Provider>
	)
}