import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Spinner from './spinner/spinner';

const FiniteScrollItem = React.memo(
  ({ finiteScrollChildren = () => null, item, itemRef }) => {
    return <div ref={itemRef}>{finiteScrollChildren(item)}</div>;
  }
);

export const FiniteScroll = React.memo((props) => {
  const {
    onLastScroll = () => null,
    itemList = [],
    children,
    lastScrollOffset = 3,
    totalPage = 1,
    currentPage = 1,
    isLoading,
    ...atributtes
  } = props;
  const [lastRowRef, lastRowInView] = useInView({
    root: document.getElementById('#FiniteScroll'),
  });
  console.log(currentPage, totalPage);
  useEffect(() => {
    lastRowInView && currentPage < totalPage && onLastScroll();
  }, [lastRowInView]);

  const renderItems = () => {
    if (!itemList.length) return null;

    return itemList.map((item, i) => {
      const props = { key: i, finiteScrollChildren: children, item };
      const shouldAssignRefIndicator = i === itemList.length - lastScrollOffset;
      console.log(shouldAssignRefIndicator);
      if (shouldAssignRefIndicator) {
        props.itemRef = lastRowRef;
      }
      return <FiniteScrollItem {...props} index={i} />;
    });
  };

  return (
    <div id="finiteScroll" {...atributtes}>
      {renderItems()}
      {isLoading && (
        <div className="flex-column y-center">
          <Spinner />
        </div>
      )}
    </div>
  );
});
