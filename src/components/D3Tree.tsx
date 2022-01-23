import React from "react";
import Tree from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";

interface OwnProps {
  d3Tree: RawNodeDatum | RawNodeDatum[] | undefined;
}

export const D3Tree = ({ d3Tree }: OwnProps): JSX.Element => {
  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
  }: any) => {
    return (
      <g>
        <circle onClick={toggleNode} r={15}></circle>
        <foreignObject {...foreignObjectProps}>
          <div className="bg-blue-400 rounded-lg">
            <h3 style={{ textAlign: "center" }}>
              {nodeDatum?.attributes?.value}
            </h3>
          </div>
        </foreignObject>
      </g>
    );
  };

  const rednerCustom = (rd3tProps: any) => {
    return renderForeignObjectNode({ ...rd3tProps, foreignObjectProps });
  };

  const nodeSize = { x: 200, y: 100 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    y: 30,
    x: -30,
  };

  return (
    <div id="treeWrapper" className="w-screen h-80 rounded-xl">
      <Tree
        data={d3Tree}
        initialDepth={1}
        renderCustomNodeElement={rednerCustom}
      ></Tree>
    </div>
  );
};
