import React, { useState, useEffect, useRef } from "react";

// frame for outliers

import frame from "public/images/network/frame.png";
import comp_host from "public/images/network/compromised_host.png";
import comp_action from "public/images/network/compromised_action.png";
import comp_hash from "public/images/network/compromised_hash.png";
import comp_object from "public/images/network/compromised_object.png";
import comp_process from "public/images/network/compromised_process.png";
import comp_url from "public/images/network/compromised_url.png";
import comp_user from "public/images/network/compromised_user.png";
import comp_resource from "public/images/network/Compromised_resource.png";
// target images
import target_user from "public/images/network/target_user.png";
import target_host from "public/images/network/target_host.png";
import target_action from "public/images/network/target_action.png";
import target_hash from "public/images/network/target_hash.png";
import target_object from "public/images/network/target_object.png";
import target_process from "public/images/network/target_process.png";
import target_url from "public/images/network/target_url.png";
import target_resource from "public/images/network/target_resource.png";
// suspect images
import suspect_user from "public/images/network/suspect_user.png";
import suspect_action from "public/images/network/suspect_action.png";
import suspect_hash from "public/images/network/suspect_hash.png";
import suspect_object from "public/images/network/suspect_object.png";
import suspect_process from "public/images/network/suspect_process.png";
import suspect_url from "public/images/network/suspect_url.png";
import suspect_host from "public/images/network/suspect_host.png";
import suspect_resource from "public/images/network/suspect_resource.png";
// signal image
import signal_stream from "public/images/network/signal.png";
import dynamic from 'next/dynamic'

const ForceGraph2D = dynamic(() => import('./forcegraph'), {
  loading: () => <p>Loading...</p>,
});

const Graph= (props) => {
  const fgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodePosition, setNodePosition] = useState(null);
  const [stopEngine, setStopEngine] = useState(false);
  const [graphData, setGraphData] = useState(props.signalData);

  const setPosition = (e) => {
    let position = {};
    position.x = e?.pageX;
    position.y = e?.pageY;
    setNodePosition(position);
  };


    useEffect(() => {}, [graphData]);

  return (
    <div onMouseMove={setPosition}>
  
  <ForceGraph2D
        ref={fgRef}
        graphData={props.signalData}
        backgroundColor={"#18191d"}
        height={600}
        width={800}
        nodeId="id"
        linkSource="source"
        linkTarget="target"
        autoPauseRedraw={false}
        nodeCanvasObject={(node, ctx) => {
          const size = 15;
          const img = new Image();
          if (node.group !== "signal") {
            const label = node.id;
            const textWidth = ctx.measureText(label).width;
            const bgDimensions = [textWidth, 2].map((n) => n + 10 * 0.2); // some padding
            ctx.fillStyle = "#2d343c"; //background color
            ctx.fillRect(
              node.x - bgDimensions[0] / 2,
              node.y - bgDimensions[1] / 2 + 9.5,
              ...bgDimensions
            );
            ctx.font = `3px mukta`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#d3d3d3"; //node.color;
            ctx.fillText(label, node.x, node.y + 10.1);
          }
          img.src =
            node.group === "compromised"
              ? node.field === "Host"
                ? comp_host
                : node.field === "User"
                ? comp_user
                : node.field === "Action"
                ? comp_action
                : node.field === "Process"
                ? comp_process
                : node.field === "Hash"
                ? comp_hash
                : node.field === "Object"
                ? comp_object
                : node.field === "Url"
                ? comp_url
                : null
              : node.group === "signal"
              ? signal_stream
              : node.group === "target"
              ? node.field === "User"
                ? target_user
                : node.field === "Host"
                ? target_host
                : node.field === "Action"
                ? target_action
                : node.field === "Process"
                ? target_process
                : node.field === "Hash"
                ? target_hash
                : node.field === "Object"
                ? target_object
                : node.field === "Url"
                ? target_url
                : null
              : node.group === "suspect"
              ? node.field === "Host"
                ? suspect_host
                : node.field === "User"
                ? suspect_user
                : node.field === "Action"
                ? suspect_action
                : node.field === "Process"
                ? suspect_process
                : node.field === "Hash"
                ? suspect_hash
                : node.field === "Object"
                ? suspect_object
                : node.field === "Url"
                ? suspect_url
                : null
              : null;

          node.img = img;
          // for highlighting
          const outline = new Image();
          // outline.src = node.current_case === true ? frame : null
          outline.src = frame;
          ctx.drawImage(
            outline,
            node.x - size / 2 + 0.7,
            node.y - size / 2 + 1.5,
            size + 0.5,
            size - 0.5
          ); //frame image

          ctx.drawImage(img, node.x - size / 2, node.y - size / 2, size, size);
          return ctx;
        }}
        // minZoom={1}
        maxZoom={8}
        onEngineStop={() => {
          if (!stopEngine) {
            fgRef.current.zoomToFit(1000, 10);
            setStopEngine(true);
          }
        }}
        cooldownTicks={100}
        linkColor={() => "#757575"}
        // linkDirectionalParticles={4}
        // linkDirectionalParticleWidth={2}
        // linkDirectionalParticleSpeed={(d) => 10 * 0.001}
        // linkDirectionalParticleColor={() => "lightgrey"}
        linkDirectionalParticles={(link) => 5}
        linkDirectionalParticleColor={["lightgrey"]}
        linkDirectionalParticleWidth={(link) => (link.current_case ? 0 : 3)}
        linkDirectionalParticleSpeed={() => 1 * 0.01}
      />
    </div>
  );
}


export default Graph;
