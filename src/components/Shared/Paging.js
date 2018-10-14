import React from 'react';

const LIMIT = 20;

const Paginator = (props) => {
  const {
    paging,
    leftPages = 2,
    rightPages = 2,
    changeParams,
  } = props;

  const {
    page,
    max_page,
    total_count,
  } = paging;

  const startIndex = Math.max(1, page - leftPages);
  const endIndex = Math.min(max_page, page + rightPages);

  const links = [];

  if (page - leftPages > 1) {
    links.push(
      <div
        key="left-end"
        className="c-paginator__page"
        onClick={() => changeParams({key: 'page', value: 1})}
      >1 - {LIMIT}</div>
    );
  }

  if (page - leftPages > 2) {
    links.push(<div key="left-prtiod">･･･</div>);
  }

  for (let i = startIndex; i <= endIndex; i++) {
    links.push(
      <div
        key={i}
        className={`c-paginator__page ${i === page ? "c-paginator__page--current" : ""}`}
        onClick={() => changeParams({key: 'page', value: i})}
      >
        {(i - 1) * LIMIT + 1} - {i * LIMIT > total_count ? total_count : i * LIMIT}
      </div>
    );
  }

  if (max_page - page - rightPages > 1) {
    links.push(<div key="right-prtiod">･･･</div>);
  }

//   if (max_page - page - rightPages > 0) {
//     links.push(
//       <div
//         key="right-end"
//         className="c-paginator__page"
//         onClick={() => changeParams({key: 'page', value: max_page})}
//       >
//         {max_page * LIMIT - LIMIT + 1} - {total_count}
//       </div>
//     );
//   }

  return (
    <div className="c-paginator">
      {links}
    </div>
  );
};

export default Paginator;
