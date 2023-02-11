import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";
import { Context } from "../index";

const Pages = observer(() => {
  const { product } = useContext(Context);
  const pageCount = Math.ceil(product.totalCount / product.limit);
  const pages = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  console.log(pages);
  return (
    <Pagination className="mt-3 fixed-bottom justify-content-center align-items-center">
      <Pagination.First />
      <Pagination.Prev />
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={product.page === page}
          onClick={() => product.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
});

export default Pages;
