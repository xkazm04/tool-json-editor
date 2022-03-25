import React, { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';
import { RawNodeDatum, Point } from 'react-d3-tree/lib/types/common';

interface OwnProps {
  d3Tree: RawNodeDatum | RawNodeDatum[] | undefined;
}
/** Displays current schema using D3Tree to have better visual understanding how shcema looks
 *
 * @param d3Tree
 * @returns JSX.Element
 */
export const D3Tree = ({ d3Tree }: OwnProps): JSX.Element => {
  const [centeredTree, setCenteredTree] = useState<Point | undefined>(
    undefined
  );

  const treeWrapperRef = useRef<HTMLDivElement | null>(null);

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
  }: any) => {
    return (
      <g>
        <circle
          onClick={toggleNode}
          className="fill-[#AF7AC5] stroke-[#9B59B6]"
          r={15}
        ></circle>
        <foreignObject {...foreignObjectProps}>
          <div className="text-white rounded-lg">
            <h3 style={{ textAlign: 'center' }}>
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

  useEffect(() => {
    const dimensions = treeWrapperRef.current?.getBoundingClientRect();
    if (!dimensions) return;
    const translateTree = {
      x: dimensions?.width / 2,
      y: dimensions.height / 2,
    };

    setCenteredTree(translateTree);
  }, []);

  const nodeSize = { x: 120, y: 100 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    y: 30,
    x: -60,
  };

  return (
    <div
      ref={treeWrapperRef}
      id="treeWrapper"
      className="w-full h-[calc(100vh-50px)]  bg-glass"
    >
      <Tree
        transitionDuration={1000}
        translate={centeredTree}
        data={d3Tree}
        initialDepth={1}
        renderCustomNodeElement={rednerCustom}
        orientation="vertical"
      ></Tree>
    </div>
  );
};
