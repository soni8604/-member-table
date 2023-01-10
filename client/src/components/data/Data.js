import React, { useState, useEffect } from "react";
import "./Data.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Data = () => {
  const [show, setshow] = useState(0);
  const [data, setData] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [pageNo, setpageNo] = useState(1);
  const [res, setRes] = useState([]);
  const[ allData,setallData]=useState([])


  const handleFilter = (e) => {
    const word = e.target.value;
    setshow(word);
    console.log(show);
  };
  useEffect(() => {
    fetch(`http://localhost:3001/alldata`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((datas) => setallData(datas));
  }, [rerender]);
  useEffect(() => {
    fetch(`http://localhost:3001/alldata/${Number(show)}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((datas) => setRes(datas));
  }, [show, rerender]);

  useEffect(() => {
    fetch(`http://localhost:3001/all?page=${pageNo}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((datas) => setData(datas));
  }, [rerender,pageNo]);
  const deleteSingleData = (e) => {
    console.log(e.target.id);
    const id = e.target.id;
    fetch(`http://localhost:3001/delete/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((datas) => {
        
        toast.success("data deleted");
        setRerender(!rerender);
      });
  };
  const handlepageclick = (data) => {
    setpageNo(data.selected + 1);
    console.log(pageNo);
  };
  return (
    <>
      <div className="conainer">
        <input
          type="number"
          className="searchBox"
          placeholder="search"
          onChange={handleFilter}
        />
        <div className="tableHeading">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Flat-No</th>
                <th>FName</th>
                <th>LName</th>
                <th>Mobile-no</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {show == "" &&
                data.map((datas, i) => {
                  return (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{datas.flatNo}</td>
                      <td>
                        {datas.fName.charAt(0).toUpperCase() +
                          datas.fName.slice(1)}
                      </td>
                      <td>
                        {datas.lName.charAt(0).toUpperCase() +
                          datas.lName.slice(1)}
                      </td>
                      <td>{datas.mobileNo}</td>

                      <td >
                          <span onClick={(e) => deleteSingleData(e)}>
                              <div className="delIcon" id={datas._id}>
                              <FontAwesomeIcon icon={faTrash} color="red"  />
                              </div>
                          
                            </span>
                      </td>
                    </tr>
                  );
                })}
              {show.length > 0 &&
                res.map((datas, i) => {
                  return (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{datas.flatNo}</td>
                      <td>
                        {datas.fName.charAt(0).toUpperCase() +
                          datas.fName.slice(1)}
                      </td>
                      <td>
                        {datas.lName.charAt(0).toUpperCase() +
                          datas.lName.slice(1)}
                      </td>
                      <td>{datas.mobileNo} </td>
                      <td>
                      <span onClick={(e) => deleteSingleData(e)}>
                            <div className="delIcon" id={datas._id}>
                                <FontAwesomeIcon icon={faTrash} color="red"  />
                            </div>
                        
                          </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="cont-footer-container">
          <div className="pages">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={Math.ceil(allData.length / 8)}
              breakLabel={"..."}
              marginPagesDisplayed={3}
              pageRangeDisplayed={3}
              onPageChange={handlepageclick}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>

        </div>
        <ToastContainer autoClose={3000} />
      </div>
    </>
  );
};

export default Data;
