import React, { useEffect, useState } from "react";

export default function Watch() {
	const [type, setType] = useState(window.location.href.split('?')[1].split('&')[0]);
	const [movie, setMovie] = useState(window.location.href.split('&')[1]);

	return (<div></div>)
}