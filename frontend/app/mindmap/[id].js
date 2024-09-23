"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import mindmapService from "../services/mindmapService";

const MindMap = () => {
	const router = useRouter();
	const { id } = router.query;
	const [mindmap, setMindmap] = useState(null);

	useEffect(() => {
		if (id) {
			mindmapService.getMindMapById(id).then(setMindmap);
		}
	}, [id]);

	if (!mindmap) return <div>Loading...</div>;

	return (
		<div>
			<h1>{mindmap.title}</h1>
			{/* Render mind map nodes here */}
		</div>
	);
};

export default MindMap;
