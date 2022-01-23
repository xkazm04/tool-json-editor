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
        <circle
          onClick={toggleNode}
          className='fill-[#AF7AC5] stroke-[#9B59B6]'
          r={15}
        ></circle>
        <foreignObject {...foreignObjectProps}>
          <div className='text-white rounded-lg'>
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
    x: -100,
  };

  return (
    <div id='treeWrapper' className='w-full h-[80vh] rounded-xl bg-glass'>
      <Tree
        transitionDuration={1000}
        translate={{ x: 400, y: 300 }}
        data={d3Tree}
        initialDepth={1}
        renderCustomNodeElement={rednerCustom}
      ></Tree>
    </div>
  );
};
