import { useState, useRef, useMemo, useEffect } from "react";
import "./index.css";
import theSimpsons from "./assets/images/simpsons.jpeg";

function App() {
	const [isVisible, setIsVisible] = useState(false);

	const targetRef = useRef(null);

	const callbackFn = (entries) => {
		const [entry] = entries;
		setIsVisible(entry.isIntersecting);
	};

	const options = useMemo(() => {
		return {
			root: null,
			rootMargin: "0px",
			threshold: 0.3,
		};
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(callbackFn, options);
		const currentTarget = targetRef.current;
		if (currentTarget) observer.observe(currentTarget);

		return () => {
			if (currentTarget) observer.unobserve(currentTarget);
		};
	}, [targetRef, options]);

	return (
		<>
			<h1 className="header">
				<p>{!isVisible ? "not in viewport" : "in viewport"}</p>
			</h1>
			<div className="gap"></div>
			<img src={theSimpsons} alt="moe-simpson-binoculars" ref={targetRef} />
		</>
	);
}

export default App;
