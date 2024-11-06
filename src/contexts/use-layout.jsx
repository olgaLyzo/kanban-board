import {LayoutContext} from "../contexts/layout-provider";
import {useContext} from "react";

export const useLayout = ()=>{
	return useContext(LayoutContext)
}